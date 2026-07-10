const VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

export {
  isTurnstileConfigured,
  isTurnstileSiteKeyConfigured
} from '@/lib/security/turnstile-config';

export async function verifyTurnstileToken(
  token: string,
  remoteIp?: string | null
): Promise<{ ok: true } | { ok: false; error: string }> {
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim();

  if (!secret) {
    return { ok: false, error: 'Turnstile is not configured on the server.' };
  }

  const body = new URLSearchParams({
    secret,
    response: token
  });

  if (remoteIp) {
    body.set('remoteip', remoteIp);
  }

  const response = await fetch(VERIFY_URL, {
    body,
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  });

  if (!response.ok) {
    return { ok: false, error: 'Turnstile verification service unavailable.' };
  }

  const result = (await response.json()) as { success?: boolean; 'error-codes'?: string[] };

  if (result.success) {
    return { ok: true };
  }

  const codes = result['error-codes']?.join(', ') || 'verification failed';
  return { ok: false, error: codes };
}
