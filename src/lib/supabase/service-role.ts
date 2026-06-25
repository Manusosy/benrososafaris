import { createClient, type SupabaseClient } from '@supabase/supabase-js';

import type { Database } from '@/types/database.types';

const serverClientOptions = {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
} as const;

function getSupabaseUrl() {
  return process.env.NEXT_PUBLIC_SUPABASE_URL;
}

function getServiceRoleKey() {
  return process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SECRET_KEY;
}

function getPublishableKey() {
  return process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
}

function createServerSupabaseClient(apiKey: string) {
  const supabaseUrl = getSupabaseUrl();

  if (!supabaseUrl) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL.');
  }

  return createClient<Database>(supabaseUrl, apiKey, serverClientOptions);
}

export function createServiceRoleClient() {
  const serviceRoleKey = getServiceRoleKey();

  if (!serviceRoleKey) {
    throw new Error('Missing Supabase service role environment variables.');
  }

  return createServerSupabaseClient(serviceRoleKey);
}

export function createEnquiryPublicClient(): SupabaseClient<Database> {
  const publishableKey = getPublishableKey();

  if (!publishableKey) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY.');
  }

  return createServerSupabaseClient(publishableKey);
}

export function hasServiceRoleKey() {
  return Boolean(getServiceRoleKey());
}
