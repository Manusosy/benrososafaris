/**
 * Media library data access (browser side).
 *
 * Uploads, lists, edits, and permanently deletes assets in the public `media`
 * Storage bucket and the `media_assets` table. Runs through the browser
 * Supabase client so uploads stream directly from the user's session — RLS
 * (public read, staff-only write) enforces permissions server-side.
 */
import { createClient } from '@/lib/supabase/browser';
import type { Tables } from '@/types/database.types';
import {
  MEDIA_BUCKET,
  MEDIA_PAGE_SIZE,
  type MediaAsset,
  type MediaListParams,
  type MediaListResult
} from './types';

type MediaRow = Tables<'media_assets'>;

function toAsset(row: MediaRow): MediaAsset {
  return {
    id: row.id,
    bucket: row.bucket,
    path: row.path,
    url: row.url,
    title: row.title,
    alt: row.alt,
    caption: row.caption,
    createdAt: row.created_at
  };
}

/** Builds a stable, collision-resistant object path: `YYYY/MM/<uuid>.<ext>`. */
function buildPath(file: File): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const ext = file.name.includes('.') ? file.name.split('.').pop()!.toLowerCase() : 'bin';
  const id = crypto.randomUUID();
  return `${year}/${month}/${id}.${ext}`;
}

/** Default alt text derived from the original file name (sans extension). */
function altFromName(file: File): string {
  return file.name
    .replace(/\.[^.]+$/, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export async function listMedia(params: MediaListParams = {}): Promise<MediaListResult> {
  const supabase = createClient();
  const page = Math.max(1, params.page ?? 1);
  const pageSize = params.pageSize ?? MEDIA_PAGE_SIZE;
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from('media_assets')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, to);

  const search = params.search?.trim();
  if (search) {
    query = query.or(
      `title.ilike.%${search}%,alt.ilike.%${search}%,caption.ilike.%${search}%,path.ilike.%${search}%`
    );
  }

  const { data, error, count } = await query;
  if (error) throw new Error(error.message);

  return {
    items: (data ?? []).map(toAsset),
    total: count ?? 0
  };
}

export async function getMediaByIds(ids: string[]): Promise<MediaAsset[]> {
  if (ids.length === 0) return [];
  const supabase = createClient();
  const { data, error } = await supabase.from('media_assets').select('*').in('id', ids);
  if (error) throw new Error(error.message);

  const byId = new Map((data ?? []).map((row) => [row.id, toAsset(row)]));
  // Preserve the caller's ordering.
  return ids.map((id) => byId.get(id)).filter((asset): asset is MediaAsset => Boolean(asset));
}

export async function uploadMediaFile(file: File): Promise<MediaAsset> {
  const supabase = createClient();
  const path = buildPath(file);

  const { error: uploadError } = await supabase.storage
    .from(MEDIA_BUCKET)
    .upload(path, file, { cacheControl: '31536000', upsert: false, contentType: file.type });
  if (uploadError) throw new Error(uploadError.message);

  const { data: publicUrl } = supabase.storage.from(MEDIA_BUCKET).getPublicUrl(path);
  const { data: auth } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from('media_assets')
    .insert({
      bucket: MEDIA_BUCKET,
      path,
      url: publicUrl.publicUrl,
      title: altFromName(file),
      alt: altFromName(file),
      created_by: auth.user?.id ?? null
    })
    .select('*')
    .single();

  if (error) {
    // Roll back the orphaned object so storage and the table stay in sync.
    await supabase.storage.from(MEDIA_BUCKET).remove([path]);
    throw new Error(error.message);
  }

  return toAsset(data);
}

export async function updateMediaAsset(
  id: string,
  patch: { title?: string; alt?: string; caption?: string }
): Promise<MediaAsset> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('media_assets')
    .update({ title: patch.title ?? null, alt: patch.alt ?? null, caption: patch.caption ?? null })
    .eq('id', id)
    .select('*')
    .single();
  if (error) throw new Error(error.message);
  return toAsset(data);
}

/** Permanently removes the object from Storage and its row. Irreversible. */
export async function deleteMediaAsset(asset: Pick<MediaAsset, 'id' | 'path'>): Promise<void> {
  const supabase = createClient();
  const { error: storageError } = await supabase.storage.from(MEDIA_BUCKET).remove([asset.path]);
  if (storageError) throw new Error(storageError.message);

  const { error } = await supabase.from('media_assets').delete().eq('id', asset.id);
  if (error) throw new Error(error.message);
}
