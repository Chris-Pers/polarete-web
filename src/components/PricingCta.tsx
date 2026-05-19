'use client';

import { useTranslations } from 'next-intl';

import { EXPERIMENTS, trackExperimentGoal, useFeatureFlag } from '@/lib/posthog';

type PricingCtaProps = {
  /** Copy to render when no experiment variant is assigned (PostHog disabled or flag missing). */
  defaultCopy: string;
  /** Plan identifier — attached as a property on the goal event for filtering. */
  plan: 'free' | 'pro';
  /** Anchor href — same for all variants (the experiment is on copy, not destination). */
  href: string;
  className: string;
};

/**
 * Pricing-page CTA wired to the `pricing-cta-copy` experiment (#381).
 *
 * Variant selection:
 *   - `try_free`     → "Try free" / "Wypróbuj za darmo"
 *   - `start_trial`  → "Start trial" / "Zacznij okres próbny"
 *   - no flag / not yet hydrated / PostHog disabled → `defaultCopy`
 *
 * On click the component records `experiment_goal: cta_click` so PostHog can
 * compute conversion against the assigned variant. The variant property is
 * also attached to the event so dashboards don't depend on the join through
 * `$feature_flag_called` exposure events.
 *
 * Fallback `defaultCopy` ensures SSR + first-paint-before-flag-cache don't
 * flicker — PostHog's `onFeatureFlags()` listener swaps the copy in once the
 * variant is known. We accept a brief cross-fade on assignment as the cost
 * of staying client-side without a flag-payload SSR pre-fetch.
 */
export function PricingCta({ defaultCopy, plan, href, className }: PricingCtaProps) {
  const variant = useFeatureFlag(EXPERIMENTS.pricingCtaCopy.key);
  const t = useTranslations('experiment.pricingCta');

  const copy =
    variant === 'try_free'
      ? t('tryFree')
      : variant === 'start_trial'
        ? t('startTrial')
        : defaultCopy;

  const handleClick = () => {
    trackExperimentGoal(EXPERIMENTS.pricingCtaCopy.key, 'cta_click', { plan });
  };

  return (
    <a href={href} onClick={handleClick} className={className} data-plan={plan}>
      {copy}
    </a>
  );
}
