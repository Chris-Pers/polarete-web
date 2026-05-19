import { useTranslations } from 'next-intl'

import { PricingCta } from '@/components/PricingCta'

type Plan = {
  name: string
  price: string
  period: string
  tagline: string
  features: string[]
  cta: string
  badge?: string
}

export function Pricing() {
  const t = useTranslations('pricing')
  const free = t.raw('free') as Plan
  const pro = t.raw('pro') as Plan

  return (
    <section id="pricing" className="border-b border-[var(--color-border)] py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-5xl">
            {t('title')}
          </h2>
          <p className="mt-4 text-base text-[var(--color-ink-secondary)] md:text-lg">
            {t('subtitle')}
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          <PricingCard plan={free} variant="free" />
          <PricingCard plan={pro} variant="pro" />
        </div>
      </div>
    </section>
  )
}

function PricingCard({ plan, variant }: { plan: Plan; variant: 'free' | 'pro' }) {
  const isPro = variant === 'pro'

  // The free plan renders the `pricing-cta-copy` experiment (#381). Pro keeps
  // the static "Join the waitlist" CTA — pre-launch funnel is a different
  // intent and shouldn't be bucketed against the free-tier copy test.
  const ctaClassName =
    'mt-10 inline-flex h-11 w-full items-center justify-center rounded-full text-sm font-medium transition-colors ' +
    (isPro
      ? 'bg-[var(--color-spark)] text-white hover:bg-[var(--color-spark-hover)]'
      : 'border border-[var(--color-border)] text-[var(--color-ink)] hover:border-[var(--color-border-hover)]')

  return (
    <article
      className={
        'relative flex flex-col rounded-2xl border p-8 transition-colors ' +
        (isPro
          ? 'border-[var(--color-anchor)] bg-[var(--color-surface)]'
          : 'border-[var(--color-border)] bg-[var(--color-surface-muted)]')
      }
    >
      {plan.badge && (
        <span className="absolute -top-3 right-8 inline-flex h-6 items-center rounded-full bg-[var(--color-anchor)] px-3 text-xs font-medium uppercase tracking-wider text-[var(--color-canvas)]">
          {plan.badge}
        </span>
      )}

      <h3 className="text-2xl font-bold text-[var(--color-ink)]">{plan.name}</h3>
      <p className="mt-2 text-sm text-[var(--color-ink-secondary)]">{plan.tagline}</p>

      <div className="mt-6 flex items-baseline gap-2">
        <span className="text-4xl font-bold text-[var(--color-ink)]">{plan.price}</span>
        <span className="text-sm text-[var(--color-ink-tertiary)]">/ {plan.period}</span>
      </div>

      <ul className="mt-8 flex flex-1 flex-col gap-3">
        {plan.features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-2 text-sm text-[var(--color-ink-secondary)]">
            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[var(--color-spark)]" aria-hidden />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {isPro ? (
        <a href="#waitlist" className={ctaClassName}>
          {plan.cta}
        </a>
      ) : (
        <PricingCta
          plan="free"
          href="#waitlist"
          defaultCopy={plan.cta}
          className={ctaClassName}
        />
      )}
    </article>
  )
}
