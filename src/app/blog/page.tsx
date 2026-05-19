import type { Metadata } from 'next'
import Link from 'next/link'
import { getLocale, getTranslations } from 'next-intl/server'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/sections/Footer'
import { formatDate, getAllPosts } from '@/lib/blog'
import type { Locale } from '@/i18n/routing'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('blog')
  return {
    title: `${t('title')} — Polarete`,
    description: t('description'),
    alternates: {
      canonical: '/blog',
      languages: {
        pl: '/blog',
        en: '/en/blog',
      },
    },
    openGraph: {
      title: `${t('title')} — Polarete`,
      description: t('description'),
      url: '/blog',
      type: 'website',
    },
  }
}

export default async function BlogIndexPage() {
  const locale = (await getLocale()) as Locale
  const t = await getTranslations('blog')
  const posts = getAllPosts(locale)

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-3xl px-6 py-20">
        <header className="mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-[var(--color-ink)] md:text-5xl">
            {t('title')}
          </h1>
          <p className="mt-4 text-lg text-[var(--color-ink-secondary)]">
            {t('description')}
          </p>
        </header>

        {posts.length === 0 ? (
          <p className="text-[var(--color-ink-tertiary)]">{t('empty')}</p>
        ) : (
          <ul className="space-y-12">
            {posts.map((post) => (
              <li key={post.slug} className="border-b border-[var(--color-border)] pb-12 last:border-0">
                <article>
                  <time
                    dateTime={post.date}
                    className="text-xs uppercase tracking-widest text-[var(--color-ink-tertiary)]"
                  >
                    {formatDate(post.date, locale)}
                  </time>
                  <h2 className="mt-3 text-2xl font-bold tracking-tight text-[var(--color-ink)]">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="transition-colors hover:text-[var(--color-spark)]"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <p className="mt-3 text-[var(--color-ink-secondary)]">
                    {post.description}
                  </p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[var(--color-spark)] transition-opacity hover:opacity-80"
                  >
                    {t('readMore')} →
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        )}
      </main>
      <Footer />
    </>
  )
}
