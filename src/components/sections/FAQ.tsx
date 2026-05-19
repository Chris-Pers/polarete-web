import { useTranslations } from 'next-intl'

export function FAQ() {
  const t = useTranslations('faq')
  const items = t.raw('items') as Array<{ q: string; a: string }>

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }

  return (
    <section id="faq" className="border-b border-[var(--color-border)] py-24 md:py-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-3xl px-6">
        <h2 className="text-center text-3xl font-bold tracking-tight text-[var(--color-ink)] md:text-5xl">
          {t('title')}
        </h2>

        <div className="mt-16 divide-y divide-[var(--color-border)] rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]">
          {items.map((item, idx) => (
            <details key={idx} className="group p-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-base font-bold text-[var(--color-ink)]">
                {item.q}
                <span
                  className="text-[var(--color-ink-tertiary)] transition-transform group-open:rotate-45"
                  aria-hidden
                >
                  +
                </span>
              </summary>
              <p className="mt-4 text-[var(--color-ink-secondary)] leading-relaxed">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
