import { redirect } from 'next/navigation';

import { ensurePortalProfile } from '@/lib/auth/ensure-portal-profile';
import { isPortalRole, type PortalRole } from '@/lib/auth/roles';
import { createClient } from '@/lib/supabase/server';

export interface PortalSession {
  userId: string;
  email: string;
  fullName: string | null;
  role: PortalRole;
}

export async function getPortalSession(): Promise<PortalSession | null> {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, role, status')
    .eq('id', user.id)
    .maybeSingle();

  if (!profile || profile.status !== 'active' || !isPortalRole(profile.role)) {
    return null;
  }

  return {
    userId: user.id,
    email: user.email ?? '',
    fullName: profile.full_name,
    role: profile.role
  };
}

export async function requirePortalSession(redirectTo = '/portal/login'): Promise<PortalSession> {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(redirectTo);
  }

  let session = await getPortalSession();
  if (session) return session;

  const ensured = await ensurePortalProfile(supabase, user);
  if (ensured.ok) {
    session = await getPortalSession();
    if (session) return session;
  }

  redirect('/portal/login?setup=1');
}

export async function requireSuperAdmin(): Promise<PortalSession> {
  const session = await requirePortalSession();
  if (session.role !== 'admin' && session.role !== 'owner') {
    redirect('/portal');
  }
  return session;
}
