import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

/**
 * Patched useMediaQuery for SSR
 * Until https://github.com/contra/react-responsive/issues/162 resolved
 */
export function useBreakpoint(
  query: string,
  fallback = true,
  callback?: () => any
) {
  const [browserFlushed, setBrowserFlushed] = useState(false);
  const matched = useMediaQuery({ query }, undefined, callback);
  useEffect(() => setBrowserFlushed(true), []);

  if (typeof window !== 'undefined' && browserFlushed) {
    return matched;
  }
  return fallback;
}

/**
 * Set styles on a page and remove on dismount
 */
export function usePageStyles(styles: object) {
  useEffect(() => {
    Object.keys(styles).forEach((style) => {
      document.body.style[style as any] = styles[style as keyof typeof styles];
    });

    return () =>
      Object.keys(styles).forEach((style) => {
        document.body.style.removeProperty(style);
      });
  }, [styles]);
}
