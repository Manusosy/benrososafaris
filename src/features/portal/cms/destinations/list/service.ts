'use server';

import { revalidatePath } from 'next/cache';

import type { SupabaseClient } from '@supabase/supabase-js';

import { requirePortalSession } from '@/lib/auth/portal';
import { createClient } from '@/lib/supabase/server';
import {
  DESTINATIONS_PAGE_SIZE,
  type DestinationListItem,
  type DestinationListParams,
  type DestinationListResult,
  type DestinationQuickEditInput,
  type DestinationStatusCounts
} from './types';

/** Editors and super admins only. */
const WRITE_ROLES = new Set(['owner', 'admin', 'editor']);

async function assertCanWrite() {
  const session = await requirePortalSession();
  if (!WRITE_ROLES.has(session.role)) {
    throw new Error('You do not have permission to manage destinations.');
  }
}

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** `YYYY-MM` → ISO range [start, nextMonthStart). */
function monthRange(month: string): { start: string; end: string } | null {
  const match = /^(\d{4})-(\d{2})$/.exec(month);
  if (!match) return null;
  const year = Number(match[1]);
  const monthIndex = Number(match[2]) - 1;
  const start = new Date(Date.UTC(year, monthIndex, 1));
  const end = new Date(Date.UTC(year, monthIndex + 1, 1));
  return { start: start.toISOString(), end: end.toISOString() };
}

function monthLabel(value: string): string {
  const range = monthRange(value);
  if (!range) return value;
  return new Date(range.start).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC'
  });
}

/**
 * Paginated, filtered destinations list for the WordPress-style admin table.
 *
 * Reads from `destination_translations` (which holds the title/slug/publish
 * date) with an inner join to the base row so we can filter by status, country,
 * and trash state in a single query. Status-tab counts, country options, and
 * publish-month options are computed alongside so the client has everything to
 * render the toolbar in one round trip.
 */
export async function listDestinations(
  params: DestinationListParams
): Promise<DestinationListResult> {
  // The list filters on embedded-resource paths (e.g. `destinations.status`),
  // which the typed client's column-key signatures reject. Use the untyped
  // surface for this query only.
  const supabase = (await createClient()) as unknown as SupabaseClient;
  const page = Math.max(1, params.page);
  const from = (page - 1) * DESTINATIONS_PAGE_SIZE;
  const to = from + DESTINATIONS_PAGE_SIZE - 1;

  let query = supabase
    .from('destination_translations')
    .select(
      'destination_id, name, slug, published_at, destinations!inner(id, status, country, region, updated_at, deleted_at)',
      { count: 'exact' }
    )
    .eq('locale', 'en');

  // Status / trash view.
  if (params.status === 'trash') {
    query = query.not('destinations.deleted_at', 'is', null);
  } else {
    query = query.is('destinations.deleted_at', null);
    if (params.status === 'published') query = query.eq('destinations.status', 'published');
    if (params.status === 'draft') query = query.eq('destinations.status', 'draft');
  }

  if (params.search.trim()) {
    const term = `%${params.search.trim()}%`;
    query = query.or(`name.ilike.${term},slug.ilike.${term}`);
  }
  if (params.country) query = query.eq('destinations.country', params.country);

  const range = monthRange(params.month);
  if (range) query = query.gte('published_at', range.start).lt('published_at', range.end);

  query = query
    .order('published_at', { ascending: false, nullsFirst: false })
    .order('name', { ascending: true })
    .range(from, to);

  const { data, count } = await query;

  type Row = {
    destination_id: string;
    name: string | null;
    slug: string | null;
    published_at: string | null;
    destinations: {
      id: string;
      status: string;
      country: string | null;
      region: string | null;
      updated_at: string;
      deleted_at: string | null;
    } | null;
  };

  const items: DestinationListItem[] = ((data as Row[] | null) ?? [])
    .filter((row) => row.destinations)
    .map((row) => ({
      id: row.destination_id,
      name: row.name ?? 'Untitled',
      slug: row.slug ?? '',
      status: row.destinations!.status,
      country: row.destinations!.country,
      region: row.destinations!.region,
      publishedAt: row.published_at,
      updatedAt: row.destinations!.updated_at,
      trashed: row.destinations!.deleted_at !== null
    }));

  const [counts, countries, months] = await Promise.all([
    getStatusCounts(),
    getCountryOptions(),
    getMonthOptions()
  ]);

  return {
    items,
    total: count ?? 0,
    page,
    pageSize: DESTINATIONS_PAGE_SIZE,
    counts,
    countries,
    months
  };
}

async function getStatusCounts(): Promise<DestinationStatusCounts> {
  const supabase = await createClient();
  const head = () => supabase.from('destinations').select('id', { count: 'exact', head: true });

  const [all, published, draft, trash] = await Promise.all([
    head().is('deleted_at', null),
    head().is('deleted_at', null).eq('status', 'published'),
    head().is('deleted_at', null).eq('status', 'draft'),
    head().not('deleted_at', 'is', null)
  ]);

  return {
    all: all.count ?? 0,
    published: published.count ?? 0,
    draft: draft.count ?? 0,
    trash: trash.count ?? 0
  };
}

async function getCountryOptions(): Promise<string[]> {
  const supabase = await createClient();
  const { data } = await supabase.from('destinations').select('country').is('deleted_at', null);
  const set = new Set<string>();
  for (const row of data ?? []) if (row.country) set.add(row.country);
  return [...set].toSorted((a, b) => a.localeCompare(b));
}

async function getMonthOptions(): Promise<Array<{ value: string; label: string }>> {
  const supabase = await createClient();
  const { data } = await supabase
    .from('destination_translations')
    .select('published_at')
    .eq('locale', 'en')
    .not('published_at', 'is', null);

  const set = new Set<string>();
  for (const row of data ?? []) {
    if (!row.published_at) continue;
    set.add(row.published_at.slice(0, 7)); // YYYY-MM
  }
  return [...set]
    .toSorted((a, b) => b.localeCompare(a))
    .map((value) => ({ value, label: monthLabel(value) }));
}

/** Moves destinations to the trash (soft delete). */
export async function trashDestinations(ids: string[]): Promise<void> {
  if (!ids.length) return;
  await assertCanWrite();
  const supabase = await createClient();
  const { error } = await supabase
    .from('destinations')
    .update({ deleted_at: new Date().toISOString(), status: 'trash' })
    .in('id', ids);
  if (error) throw new Error(error.message);
  revalidatePath('/portal/destinations');
}

/** Restores trashed destinations, re-deriving status from the publish date. */
export async function restoreDestinations(ids: string[]): Promise<void> {
  if (!ids.length) return;
  await assertCanWrite();
  const supabase = await createClient();

  const { data: translations } = await supabase
    .from('destination_translations')
    .select('destination_id, published_at')
    .eq('locale', 'en')
    .in('destination_id', ids);

  const publishedIds = new Set(
    (translations ?? []).filter((t) => t.published_at).map((t) => t.destination_id)
  );

  const toPublished = ids.filter((id) => publishedIds.has(id));
  const toDraft = ids.filter((id) => !publishedIds.has(id));

  if (toPublished.length) {
    const { error } = await supabase
      .from('destinations')
      .update({ deleted_at: null, status: 'published' })
      .in('id', toPublished);
    if (error) throw new Error(error.message);
  }
  if (toDraft.length) {
    const { error } = await supabase
      .from('destinations')
      .update({ deleted_at: null, status: 'draft' })
      .in('id', toDraft);
    if (error) throw new Error(error.message);
  }

  revalidatePath('/portal/destinations');
}

/** Permanently deletes destinations (and their translations). */
export async function deleteDestinationsPermanently(ids: string[]): Promise<void> {
  if (!ids.length) return;
  await assertCanWrite();
  const supabase = await createClient();

  await supabase.from('destination_translations').delete().in('destination_id', ids);
  const { error } = await supabase.from('destinations').delete().in('id', ids);
  if (error) throw new Error(error.message);

  revalidatePath('/portal/destinations');
}

/** Empties the trash — permanently deletes every trashed destination. */
export async function emptyDestinationsTrash(): Promise<void> {
  await assertCanWrite();
  const supabase = await createClient();

  const { data } = await supabase.from('destinations').select('id').not('deleted_at', 'is', null);
  const ids = (data ?? []).map((row) => row.id);
  await deleteDestinationsPermanently(ids);
}

/** Inline Quick Edit save: title, slug, country, status, and publish date. */
export async function quickEditDestination(input: DestinationQuickEditInput): Promise<void> {
  await assertCanWrite();

  const name = input.name.trim();
  const slug = input.slug.trim().toLowerCase();
  if (name.length < 2) throw new Error('Name must be at least 2 characters.');
  if (!SLUG_PATTERN.test(slug)) {
    throw new Error('Slug may only contain lowercase letters, numbers, and hyphens.');
  }

  const supabase = await createClient();
  const now = new Date().toISOString();
  const publishedAt = input.status === 'published' ? input.publishedAt.trim() || now : null;

  const { error: baseError } = await supabase
    .from('destinations')
    .update({
      status: input.status,
      country: input.country.trim() || null,
      updated_at: now
    })
    .eq('id', input.id);
  if (baseError) throw new Error(baseError.message);

  const { error: translationError } = await supabase
    .from('destination_translations')
    .update({ name, slug, published_at: publishedAt, updated_at: now })
    .eq('destination_id', input.id)
    .eq('locale', 'en');
  if (translationError) throw new Error(translationError.message);

  revalidatePath('/portal/destinations');
}
