/**
 * PostHog client init for the landing site (#381 follow-up).
 *
 * Mirror of `apps/desktop/src/analytics.ts` minus desktop-only concerns
 * (Electron user-agent, Lingui locale wiring). Two responsibilities:
 *   1. `initLandingAnalytics()` — call once on the client; no-ops without
 *      `NEXT_PUBLIC_POSTHOG_KEY`.
 *   2. `useExperiment()` / `trackExperimentGoal()` — variant lookup +
 *      conversion tracking, contract-compatible with the desktop helpers in
 *      `apps/desktop/src/featureFlags.ts` so dashboards see one schema.
 *
 * The helpers live here (instead of being imported from `@polarete/lib`)
 * because the lib package is SSR/Node-safe — pulling `posthog-js` in would
 * break that purity invariant. See `scripts/check-package-purity.sh`.
 *
 * EXPERIMENTS registry mirrors the desktop one. Keep both in sync until we
 * extract a thin "experiment registry" package (post-MVP refactor).
 */

'use client';

import { useEffect, useState } from 'react';
import posthog from 'posthog-js';

// ─── Experiment registry (mirror of apps/desktop/src/featureFlags.ts) ────────

export const EXPERIMENTS = {
  pricingCtaCopy: {
    key: 'pricing-cta-copy',
    variants: ['try_free', 'start_trial'] as const,
    default: 'try_free' as const,
    goals: ['cta_click', 'signup_started', 'signup_completed'] as const,
  },
} as const;

export type ExperimentKey = (typeof EXPERIMENTS)[keyof typeof EXPERIMENTS]['key'];

// ─── Init ────────────────────────────────────────────────────────────────────

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://eu.i.posthog.com';

let initialized = false;

export function initLandingAnalytics(): void {
  if (initialized) return;
  if (typeof window === 'undefined') return;
  if (!POSTHOG_KEY) return;

  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    // Visitors are anonymous on the landing page until they sign up. Once
    // they hit the app and authenticate, the desktop analytics module calls
    // `identify()` with the Supabase user_id; PostHog merges the prior
    // anonymous bucket so the experiment exposure stays consistent.
    person_profiles: 'identified_only',
    // Don't autoload session-replay on the landing — landing has zero PII
    // and replay would inflate cost. Desktop replay decision lives there.
    disable_session_recording: true,
    // Capture initial pageview manually after init so we can attach
    // app=landing distinguisher; otherwise PostHog auto-captures it.
    capture_pageview: true,
    loaded: () => {
      // Mark scope so dashboard filters can isolate landing vs desktop traffic.
      posthog.register({ app: 'landing' });
    },
  });

  initialized = true;
}

export function isLandingAnalyticsEnabled(): boolean {
  return initialized;
}

// ─── Hooks ───────────────────────────────────────────────────────────────────

/**
 * Subscribe to a PostHog feature flag. Returns the assigned variant string
 * (multivariate flags), `true`/`false` (boolean flags), or `undefined` while
 * the flag cache is loading or analytics is disabled.
 */
export function useFeatureFlag(name: string): string | boolean | undefined {
  const [value, setValue] = useState<string | boolean | undefined>(() => {
    if (!initialized) return undefined;
    return posthog.getFeatureFlag(name);
  });

  useEffect(() => {
    if (!initialized) return;
    const unsubscribe = posthog.onFeatureFlags(() => {
      setValue(posthog.getFeatureFlag(name));
    });
    return () => {
      unsubscribe?.();
    };
  }, [name]);

  return value;
}

/**
 * Typed variant getter. Returns the assigned variant, or `fallback` when the
 * flag is missing, disabled, or still loading. Use the experiment's `default`
 * as the fallback so first paint is consistent for users who land before the
 * flag cache hydrates.
 */
export function useExperiment<T extends string>(name: string, fallback: T): T | string {
  const value = useFeatureFlag(name);
  if (typeof value === 'string') return value;
  return fallback;
}

// ─── Goal tracking ───────────────────────────────────────────────────────────

/**
 * Record an experiment goal event. PostHog auto-correlates with the user's
 * assigned variant via `$feature_flag_called` exposure events (no manual
 * variant join needed) — but we attach `variant` as a property anyway for
 * easier filtering in the dashboard.
 */
export function trackExperimentGoal(
  experiment: string,
  goal: string,
  properties: Record<string, unknown> = {},
): void {
  if (!initialized) return;
  posthog.capture('experiment_goal', {
    experiment,
    goal,
    variant: posthog.getFeatureFlag(experiment),
    ...properties,
  });
}
