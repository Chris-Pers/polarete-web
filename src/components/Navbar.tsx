import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'

export function Navbar() {
  const t = useTranslations('nav')

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-canvas)]/85 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2 text-ink">
          <Image
            src="/polarete-mark.svg"
            alt="Polarete"
            width={28}
            height={28}
            priority
          />
          <span className="text-base font-bold tracking-tight">Polarete</span>
        </Link>

        <ul className="hidden items-center gap-8 text-sm text-[var(--color-ink-secondary)] md:flex">
          <li><a href="#features" className="hover:text-[var(--color-ink)] transition-colors">{t('features')}</a></li>
          <li><a href="#how" className="hover:text-[var(--color-ink)] transition-colors">{t('howItWorks')}</a></li>
          <li><a href="#pricing" className="hover:text-[var(--color-ink)] transition-colors">{t('pricing')}</a></li>
          <li><a href="#faq" className="hover:text-[var(--color-ink)] transition-colors">{t('faq')}</a></li>
          <li><Link href="/blog" className="hover:text-[var(--color-ink)] transition-colors">{t('blog')}</Link></li>
        </ul>

        <a
          href="#waitlist"
          className="inline-flex h-9 items-center rounded-full bg-[var(--color-ink)] px-4 text-sm font-medium text-[var(--color-canvas)] transition-opacity hover:opacity-90"
        >
          {t('joinWaitlist')}
        </a>
      </nav>
    </header>
  )
}
