import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import type { Locale } from '@/i18n/routing'

export type PostMeta = {
  slug: string
  title: string
  description: string
  date: string
  tags?: string[]
  author?: string
}

export type Post = {
  meta: PostMeta
  content: string
}

const CONTENT_DIR = path.join(process.cwd(), 'src/content/blog')

function readPostFile(locale: Locale, slug: string): Post | null {
  const filepath = path.join(CONTENT_DIR, locale, `${slug}.mdx`)
  if (!fs.existsSync(filepath)) return null
  const raw = fs.readFileSync(filepath, 'utf8')
  const { data, content } = matter(raw)
  return {
    meta: { slug, ...(data as Omit<PostMeta, 'slug'>) },
    content,
  }
}

export function getAllPosts(locale: Locale): PostMeta[] {
  const dir = path.join(CONTENT_DIR, locale)
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, '')
      const post = readPostFile(locale, slug)
      return post?.meta
    })
    .filter((m): m is PostMeta => !!m)
    .sort((a, b) => b.date.localeCompare(a.date))
}

export function getPost(slug: string, locale: Locale): Post | null {
  return readPostFile(locale, slug)
}

export function getAllSlugs(): string[] {
  const slugs = new Set<string>()
  for (const locale of ['pl', 'en'] as const) {
    const dir = path.join(CONTENT_DIR, locale)
    if (!fs.existsSync(dir)) continue
    for (const file of fs.readdirSync(dir)) {
      if (file.endsWith('.mdx')) slugs.add(file.replace(/\.mdx$/, ''))
    }
  }
  return [...slugs]
}

export function formatDate(date: string, locale: Locale): string {
  return new Date(date).toLocaleDateString(locale === 'pl' ? 'pl-PL' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
