import { ImageResponse } from 'next/og'
import { getLocale } from 'next-intl/server'
import { getPost } from '@/lib/blog'
import type { Locale } from '@/i18n/routing'

export const alt = 'Polarete blog post'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OgImage({
  params,
}: {
  params: { slug: string }
}) {
  const locale = (await getLocale()) as Locale
  const post = getPost(params.slug, locale)
  const title = post?.meta.title ?? 'Polarete'
  const description = post?.meta.description ?? 'Życie w równowadze'

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px',
          background: '#F3F2F2',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            color: '#3D2B23',
          }}
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '999px',
              background: '#d63729',
            }}
          />
          <div style={{ fontSize: '28px', fontWeight: 700, letterSpacing: '-0.02em' }}>
            Polarete
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div
            style={{
              fontSize: '64px',
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              color: '#151413',
              maxWidth: '900px',
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: '28px',
              lineHeight: 1.4,
              color: '#3F3D3A',
              maxWidth: '1000px',
            }}
          >
            {description}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '22px',
            color: '#6B6864',
          }}
        >
          <div>polarete.com/blog</div>
          {post?.meta.author && <div>{post.meta.author}</div>}
        </div>
      </div>
    ),
    { ...size },
  )
}
