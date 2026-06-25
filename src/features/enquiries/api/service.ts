'use server';

import { revalidatePath } from 'next/cache';

import { requirePortalSession } from '@/lib/auth/portal';
import { createClient } from '@/lib/supabase/server';
import type {
  Enquiry,
  EnquiryFormData,
  EnquiryListParams,
  EnquiryListResult,
  EnquiryStatus,
  EnquiryTrashedListParams,
  EnquiryTrashedListResult,
  UpdateEnquiryStatusInput
} from './types';

const PAGE_SIZE = 20;
const MANAGE_ROLES = new Set(['owner', 'admin', 'sales']);

function mapRow(row: Record<string, unknown>): Enquiry {
  return {
    assignedTo: (row.assigned_to as string | null) ?? null,
    bookingReference: (row.booking_reference as string | null) ?? null,
    budget: (row.budget as string | null) ?? null,
    country: (row.country as string | null) ?? null,
    createdAt: row.created_at as string,
    deletedAt: (row.deleted_at as string | null) ?? null,
    destinations: (row.destinations as string | null) ?? null,
    email: row.email as string,
    enquiryType: row.enquiry_type as Enquiry['enquiryType'],
    formData: ((row.form_data as EnquiryFormData | null) ?? {}) as EnquiryFormData,
    id: row.id as string,
    locale: row.locale as string,
    message: row.message as string,
    name: row.name as string,
    phone: (row.phone as string | null) ?? null,
    preferredDates: (row.preferred_dates as string | null) ?? null,
    referenceCode: (row.reference_code as string | null) ?? 'BENS-PENDING',
    sourcePath: (row.source_path as string | null) ?? null,
    status: row.status as EnquiryStatus,
    topic: (row.topic as string | null) ?? null,
    travelers: (row.travelers as number | null) ?? null,
    updatedAt: row.updated_at as string
  };
}

async function assertCanManageEnquiries() {
  const session = await requirePortalSession();
  if (!MANAGE_ROLES.has(session.role)) {
    throw new Error('You do not have permission to manage enquiries.');
  }
  return session;
}

export async function listEnquiries(params: EnquiryListParams = {}): Promise<EnquiryListResult> {
  await requirePortalSession();
  const supabase = await createClient();

  const page = Math.max(1, params.page ?? 1);
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  let query = supabase
    .from('enquiries')
    .select('*', { count: 'exact' })
    .is('deleted_at', null)
    .order('created_at', { ascending: false });

  if (params.status && params.status !== 'all') {
    query = query.eq('status', params.status);
  }

  if (params.enquiryType && params.enquiryType !== 'all') {
    query = query.eq('enquiry_type', params.enquiryType);
  }

  if (params.search?.trim()) {
    const term = `%${params.search.trim()}%`;
    query = query.or(
      `name.ilike.${term},email.ilike.${term},message.ilike.${term},reference_code.ilike.${term}`
    );
  }

  const { data, count, error } = await query.range(from, to);

  if (error) {
    throw new Error(error.message);
  }

  const [{ count: pendingCount }, { count: trashCount }] = await Promise.all([
    supabase
      .from('enquiries')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'pending')
      .is('deleted_at', null),
    supabase
      .from('enquiries')
      .select('*', { count: 'exact', head: true })
      .not('deleted_at', 'is', null)
  ]);

  return {
    counts: {
      all: count ?? 0,
      pending: pendingCount ?? 0,
      trash: trashCount ?? 0
    },
    items: (data ?? []).map((row) => mapRow(row as Record<string, unknown>)),
    page,
    pageSize: PAGE_SIZE,
    total: count ?? 0
  };
}

export async function getEnquiry(id: string): Promise<Enquiry | null> {
  await requirePortalSession();
  const supabase = await createClient();
  const { data, error } = await supabase.from('enquiries').select('*').eq('id', id).maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data ? mapRow(data as Record<string, unknown>) : null;
}

export async function updateEnquiryStatus(input: UpdateEnquiryStatusInput): Promise<Enquiry> {
  await assertCanManageEnquiries();
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('enquiries')
    .update({ status: input.status, updated_at: new Date().toISOString() })
    .eq('id', input.id)
    .select('*')
    .single();

  if (error || !data) {
    throw new Error(error?.message ?? 'Unable to update enquiry.');
  }

  revalidatePath('/portal/enquiries');
  revalidatePath('/portal/enquiries/trash');
  return mapRow(data as Record<string, unknown>);
}

export async function listTrashedEnquiries(
  params: EnquiryTrashedListParams = {}
): Promise<EnquiryTrashedListResult> {
  await requirePortalSession();
  const supabase = await createClient();

  const page = Math.max(1, params.page ?? 1);
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  let query = supabase
    .from('enquiries')
    .select('*', { count: 'exact' })
    .not('deleted_at', 'is', null)
    .order('deleted_at', { ascending: false });

  if (params.search?.trim()) {
    const term = `%${params.search.trim()}%`;
    query = query.or(
      `name.ilike.${term},email.ilike.${term},message.ilike.${term},reference_code.ilike.${term}`
    );
  }

  const { data, count, error } = await query.range(from, to);

  if (error) {
    throw new Error(error.message);
  }

  const { count: trashCount } = await supabase
    .from('enquiries')
    .select('*', { count: 'exact', head: true })
    .not('deleted_at', 'is', null);

  return {
    items: (data ?? []).map((row) => mapRow(row as Record<string, unknown>)),
    page,
    pageSize: PAGE_SIZE,
    total: count ?? 0,
    trashCount: trashCount ?? 0
  };
}

export async function restoreEnquiry(id: string): Promise<void> {
  await assertCanManageEnquiries();
  const supabase = await createClient();
  const now = new Date().toISOString();

  const { error } = await supabase
    .from('enquiries')
    .update({ deleted_at: null, updated_at: now })
    .eq('id', id)
    .not('deleted_at', 'is', null);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/portal/enquiries');
  revalidatePath('/portal/enquiries/trash');
}

export async function trashEnquiry(id: string): Promise<void> {
  await assertCanManageEnquiries();
  const supabase = await createClient();
  const now = new Date().toISOString();

  const { error } = await supabase
    .from('enquiries')
    .update({ deleted_at: now, updated_at: now })
    .eq('id', id)
    .is('deleted_at', null);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/portal/enquiries');
  revalidatePath('/portal/enquiries/trash');
}
