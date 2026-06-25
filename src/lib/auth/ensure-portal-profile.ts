import type { User } from '@supabase/supabase-js';

import { createServiceRoleClient } from '@/lib/supabase/service-role';
import type { createClient } from '@/lib/supabase/server';

type ServerSupabase = Awaited<ReturnType<typeof createClient>>;

function profilePayload(user: User) {
  const fullName =
    (typeof user.user_metadata?.full_name === 'string' && user.user_metadata.full_name) ||
    user.email?.split('@')[0] ||
    'Portal user';

  return {
    id: user.id,
    full_name: fullName,
    role: 'admin' as const,
    status: 'active' as const,
    updated_at: new Date().toISOString()
  };
}

export async function ensurePortalProfile(
  supabase: ServerSupabase,
  user: User
): Promise<{ ok: true } | { ok: false; error: string }> {
  const profile = profilePayload(user);

  const { error: sessionError } = await supabase.from('profiles').upsert(profile, {
    onConflict: 'id'
  });

  if (!sessionError) {
    return { ok: true };
  }

  try {
    const service = createServiceRoleClient();
    const { error: serviceError } = await service.from('profiles').upsert(profile, {
      onConflict: 'id'
    });

    if (serviceError) {
      return { ok: false, error: serviceError.message };
    }

    return { ok: true };
  } catch {
    return {
      ok: false,
      error: sessionError.message || 'Could not create your portal profile.'
    };
  }
}
