import { useTranslations } from 'next-intl'

export function HowItWorks() {
  const t = useTranslations('how')
  const steps = t.raw('steps') as Array<{ title: string; body: string }>

  return (
    <section id="how" className="border-b border-[var(--color-border)] py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-5xl">
            {t('title')}
          </h2>
          <p className="mt-4 text-base text-[var(--color-ink-secondary)] md:text-lg">
            {t('subtitle')}
          </p>
        </div>

        <ol className="mt-16 grid gap-6 md:grid-cols-3">
          {steps.map((step, idx) => (
            <li
              key={idx}
              className="relative rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-8"
            >
              <div className="absolute -top-4 left-8 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-anchor)] text-sm font-bold text-[var(--color-canvas)]">
                {idx + 1}
              </div>
              <h3 className="mt-2 text-lg font-bold text-[var(--color-ink)]">
                {step.title}
              </h3>
              <p className="mt-3 text-[var(--color-ink-secondary)] leading-relaxed">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
