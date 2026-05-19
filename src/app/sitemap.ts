import type { MetadataRoute } from 'next'
import { getAllSlugs, getPost } from '@/lib/blog'

const BASE_URL = 'https://polarete.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
      alternates: {
        languages: {
          pl: BASE_URL,
          en: `${BASE_URL}/en`,
        },
      },
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: {
        languages: {
          pl: `${BASE_URL}/blog`,
          en: `${BASE_URL}/en/blog`,
        },
      },
    },
  ]

  const posts: MetadataRoute.Sitemap = getAllSlugs().map((slug) => {
    const pl = getPost(slug, 'pl')
    const en = getPost(slug, 'en')
    const lastModified = pl?.meta.date ?? en?.meta.date ?? now

    return {
      url: `${BASE_URL}/blog/${slug}`,
      lastModified: new Date(lastModified),
      changeFrequency: 'monthly',
      priority: 0.6,
      alternates: {
        languages: {
          ...(pl ? { pl: `${BASE_URL}/blog/${slug}` } : {}),
          ...(en ? { en: `${BASE_URL}/en/blog/${slug}` } : {}),
        },
      },
    }
  })

  return [...staticPages, ...posts]
}
