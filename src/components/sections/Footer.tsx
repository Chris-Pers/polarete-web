import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'

export function Footer() {
  const t = useTranslations('footer')

  return (
    <footer className="bg-[var(--color-surface-muted)] py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 md:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-2 text-[var(--color-ink)]">
              <Image src="/polarete-mark.svg" alt="Polarete" width={28} height={28} />
              <span className="text-base font-bold tracking-tight">Polarete</span>
            </Link>
            <p className="mt-4 text-sm text-[var(--color-ink-secondary)]">{t('tagline')}</p>
          </div>

          <FooterColumn
            title={t('sections.product')}
            links={[
              { href: '#features', label: t('links.features') },
              { href: '#pricing', label: t('links.pricing') },
              { href: '/changelog', label: t('links.changelog') },
            ]}
          />

          <FooterColumn
            title={t('sections.company')}
            links={[
              { href: '/about', label: t('links.about') },
              { href: '/blog', label: t('links.blog') },
              { href: '/contact', label: t('links.contact') },
            ]}
          />

          <FooterColumn
            title={t('sections.legal')}
            links={[
              { href: '/privacy', label: t('links.privacy') },
              { href: '/terms', label: t('links.terms') },
              { href: '/cookies', label: t('links.cookies') },
            ]}
          />
        </div>

        <p className="mt-12 border-t border-[var(--color-border)] pt-8 text-center text-xs text-[var(--color-ink-tertiary)]">
          {t('rights')}
        </p>
      </div>
    </footer>
  )
}

function FooterColumn({
  title,
  links,
}: {
  title: string
  links: Array<{ href: string; label: string }>
}) {
  return (
    <div>
      <h4 className="text-xs font-bold uppercase tracking-widest text-[var(--color-ink-tertiary)]">
        {title}
      </h4>
      <ul className="mt-4 space-y-2 text-sm">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="text-[var(--color-ink-secondary)] transition-colors hover:text-[var(--color-ink)]"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
