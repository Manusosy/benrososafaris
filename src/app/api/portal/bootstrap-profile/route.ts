import { NextResponse } from 'next/server';

import { ensurePortalProfile } from '@/lib/auth/ensure-portal-profile';
import { createClient } from '@/lib/supabase/server';

export async function POST() {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const result = await ensurePortalProfile(supabase, user);

  if (!result.ok) {
    const status = result.error.includes('service role') ? 503 : 500;
    return NextResponse.json({ error: result.error }, { status });
  }

  return NextResponse.json({ success: true });
}
