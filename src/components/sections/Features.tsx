import { useTranslations } from 'next-intl'

const features = ['balanceWheel', 'spaces', 'gamification', 'ai'] as const

export function Features() {
  const t = useTranslations('features')

  return (
    <section id="features" className="border-b border-[var(--color-border)] py-24 md:py-32">
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
          {features.map((key) => (
            <article
              key={key}
              className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 transition-colors hover:border-[var(--color-border-hover)]"
            >
              <h3 className="text-xl font-bold text-[var(--color-ink)]">
                {t(`${key}.title`)}
              </h3>
              <p className="mt-3 text-[var(--color-ink-secondary)] leading-relaxed">
                {t(`${key}.body`)}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
