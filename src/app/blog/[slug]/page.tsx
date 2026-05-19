import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { compileMDX } from 'next-mdx-remote/rsc'
import { getLocale, getTranslations } from 'next-intl/server'
import { Navbar } from '@/components/Navbar'
import { mdxComponents } from '@/components/MdxComponents'
import { Footer } from '@/components/sections/Footer'
import { formatDate, getAllSlugs, getPost } from '@/lib/blog'
import type { Locale } from '@/i18n/routing'

type Params = { slug: string }

export function generateStaticParams(): Params[] {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { slug } = await params
  const locale = (await getLocale()) as Locale
  const post = getPost(slug, locale)
  if (!post) return {}

  return {
    title: `${post.meta.title} — Polarete`,
    description: post.meta.description,
    alternates: {
      canonical: `/blog/${slug}`,
      languages: {
        pl: `/blog/${slug}`,
        en: `/en/blog/${slug}`,
      },
    },
    openGraph: {
      title: post.meta.title,
      description: post.meta.description,
      url: `/blog/${slug}`,
      type: 'article',
      publishedTime: post.meta.date,
      authors: post.meta.author ? [post.meta.author] : undefined,
      tags: post.meta.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.meta.title,
      description: post.meta.description,
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>
}) {
  const { slug } = await params
  const locale = (await getLocale()) as Locale
  const post = getPost(slug, locale)
  if (!post) notFound()

  const t = await getTranslations('blog')
  const { content } = await compileMDX({
    source: post.content,
    components: mdxComponents,
  })

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-3xl px-6 py-20">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-sm text-[var(--color-ink-tertiary)] transition-colors hover:text-[var(--color-ink)]"
        >
          ← {t('backToBlog')}
        </Link>

        <article className="mt-8">
          <header className="mb-12 border-b border-[var(--color-border)] pb-8">
            <time
              dateTime={post.meta.date}
              className="text-xs uppercase tracking-widest text-[var(--color-ink-tertiary)]"
            >
              {formatDate(post.meta.date, locale)}
              {post.meta.author && (
                <span> · {t('by')} {post.meta.author}</span>
              )}
            </time>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-[var(--color-ink)] md:text-5xl">
              {post.meta.title}
            </h1>
            <p className="mt-4 text-lg text-[var(--color-ink-secondary)]">
              {post.meta.description}
            </p>
          </header>

          <div>{content}</div>
        </article>
      </main>
      <Footer />
    </>
  )
}
