'use client';

import { useEffect } from 'react';

const META_THEME_COLORS = {
  light: '#ffffff',
  dark: '#09090b'
};

export function MetaThemeColorSync() {
  useEffect(() => {
    try {
      const isDark =
        localStorage.theme === 'dark' ||
        ((!('theme' in localStorage) || localStorage.theme === 'system') &&
          window.matchMedia('(prefers-color-scheme: dark)').matches);

      document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute('content', isDark ? META_THEME_COLORS.dark : META_THEME_COLORS.light);
    } catch {
      // localStorage unavailable in some browsers
    }
  }, []);

  return null;
}
