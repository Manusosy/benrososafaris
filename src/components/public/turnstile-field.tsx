'use client';

import { useEffect, useRef, useState } from 'react';

import { isTurnstileSiteKeyConfigured } from '@/lib/security/turnstile-config';

type TurnstileApi = {
  render: (
    container: HTMLElement,
    options: {
      callback: (token: string) => void;
      'error-callback'?: () => void;
      'expired-callback'?: () => void;
      sitekey: string;
      theme?: 'light' | 'dark' | 'auto';
    }
  ) => string;
  remove: (widgetId: string) => void;
  reset: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

const TURNSTILE_SCRIPT_ID = 'cloudflare-turnstile-script';
const TURNSTILE_SCRIPT_SRC =
  'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

type TurnstileFieldProps = {
  onTokenChange: (token: string | null) => void;
  resetSignal?: number;
};

function loadTurnstileScript() {
  return new Promise<void>((resolve, reject) => {
    if (window.turnstile) {
      resolve();
      return;
    }

    const existing = document.getElementById(TURNSTILE_SCRIPT_ID) as HTMLScriptElement | null;

    if (existing) {
      existing.addEventListener('load', () => resolve(), { once: true });
      existing.addEventListener('error', () => reject(new Error('Turnstile failed to load')), {
        once: true
      });
      return;
    }

    const script = document.createElement('script');
    script.id = TURNSTILE_SCRIPT_ID;
    script.src = TURNSTILE_SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Turnstile failed to load'));
    document.head.appendChild(script);
  });
}

export function TurnstileField({ onTokenChange, resetSignal = 0 }: TurnstileFieldProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [loadError, setLoadError] = useState(false);

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim();

  useEffect(() => {
    if (!isTurnstileSiteKeyConfigured() || !siteKey || !containerRef.current) {
      return;
    }

    let cancelled = false;

    void loadTurnstileScript()
      .then(() => {
        if (cancelled || !containerRef.current || !window.turnstile) return;

        if (widgetIdRef.current) {
          window.turnstile.remove(widgetIdRef.current);
          widgetIdRef.current = null;
        }

        onTokenChange(null);

        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          theme: 'light',
          callback: (token) => onTokenChange(token),
          'error-callback': () => onTokenChange(null),
          'expired-callback': () => onTokenChange(null)
        });
      })
      .catch(() => {
        if (!cancelled) {
          setLoadError(true);
          onTokenChange(null);
        }
      });

    return () => {
      cancelled = true;
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [onTokenChange, resetSignal, siteKey]);

  if (!isTurnstileSiteKeyConfigured()) {
    return null;
  }

  if (loadError) {
    return (
      <p className='text-sm text-red-700'>
        Security check failed to load. Please refresh the page and try again.
      </p>
    );
  }

  return <div className='min-h-[65px]' ref={containerRef} />;
}

export function useTurnstileGate() {
  const [token, setToken] = useState<string | null>(null);
  const [resetSignal, setResetSignal] = useState(0);
  const required = isTurnstileSiteKeyConfigured();

  return {
    canSubmit: !required || Boolean(token),
    resetTurnstile: () => {
      setToken(null);
      setResetSignal((value) => value + 1);
    },
    setToken,
    resetSignal,
    required,
    token
  };
}
