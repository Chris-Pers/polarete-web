import { useTranslations } from 'next-intl'

export function Hero() {
  const t = useTranslations('hero')

  return (
    <section className="relative overflow-hidden border-b border-[var(--color-border)]">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute left-1/2 top-1/3 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-3xl"
          style={{ background: 'radial-gradient(closest-side, var(--color-spark), transparent)' }}
          aria-hidden
        />
      </div>

      <div className="mx-auto max-w-6xl px-6 py-24 text-center md:py-36">
        <span className="inline-block rounded-full border border-[var(--color-border)] px-3 py-1 text-xs font-medium uppercase tracking-widest text-[var(--color-ink-secondary)]">
          {t('tagline')}
        </span>

        <h1 className="mx-auto mt-8 max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight text-[var(--color-ink)] md:text-6xl">
          {t('title')}
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[var(--color-ink-secondary)] md:text-xl">
          {t('subtitle')}
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#waitlist"
            className="inline-flex h-12 items-center rounded-full bg-[var(--color-spark)] px-8 text-base font-medium text-white transition-colors hover:bg-[var(--color-spark-hover)]"
          >
            {t('ctaPrimary')}
          </a>
          <a
            href="#how"
            className="inline-flex h-12 items-center rounded-full border border-[var(--color-border)] px-8 text-base font-medium text-[var(--color-ink)] transition-colors hover:border-[var(--color-border-hover)]"
          >
            {t('ctaSecondary')}
          </a>
        </div>

        <p className="mt-6 text-sm text-[var(--color-ink-tertiary)]">{t('social')}</p>
      </div>
    </section>
  )
}
