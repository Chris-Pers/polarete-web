'use client';

import { useEffect, type ReactNode } from 'react';

import { initLandingAnalytics } from '@/lib/posthog';

/**
 * Boots the PostHog landing client once on the first client render. Lives in
 * its own `'use client'` boundary so the Next.js root layout can stay a
 * server component (and pre-render the marketing copy without a hydration
 * waterfall).
 *
 * No-op when `NEXT_PUBLIC_POSTHOG_KEY` is unset — production sets it via
 * Vercel env vars; CI/local dev runs without it.
 */
export function PostHogProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    initLandingAnalytics();
  }, []);

  return <>{children}</>;
}
