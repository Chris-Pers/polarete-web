import { getAllPosts } from '@/lib/blog'
import type { Locale } from '@/i18n/routing'

const BASE_URL = 'https://polarete.com'

function escape(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function renderChannel(locale: Locale, title: string, description: string): string {
  const posts = getAllPosts(locale)
  const localePath = locale === 'pl' ? '' : '/en'

  const items = posts
    .map((post) => {
      const url = `${BASE_URL}${localePath}/blog/${post.slug}`
      return `    <item>
      <title>${escape(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escape(post.description)}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      ${post.author ? `<author>${escape(post.author)}</author>` : ''}
    </item>`
    })
    .join('\n')

  return `  <channel>
    <title>${escape(title)}</title>
    <link>${BASE_URL}${localePath}/blog</link>
    <description>${escape(description)}</description>
    <language>${locale === 'pl' ? 'pl-PL' : 'en-US'}</language>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>`
}

export async function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
${renderChannel('pl', 'Polarete — Blog', 'Filozofia równowagi, kulisy budowy Polarete.')}
${renderChannel('en', 'Polarete — Blog', 'Philosophy of balance, behind the scenes of building Polarete.')}
</rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
