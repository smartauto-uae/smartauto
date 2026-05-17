import { getPostBySlug } from '@/lib/actions/blog'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Tag, Calendar, ArrowLeft } from 'lucide-react'
import BlogLayout from '@/components/blog/BlogLayout'

export const revalidate = 0

type Props = { params: Promise<{ slug: string }> }

// ── Metadata ─────────────────────────────────────────────────────────────────
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug).catch(() => null)
  if (!post) return { title: 'Post Not Found' }

  return {
    title:       post.meta_title   || post.title,
    description: post.meta_desc    || post.excerpt || '',
    openGraph: {
      title:         post.meta_title  || post.title,
      description:   post.meta_desc   || post.excerpt || '',
      type:          'article',
      publishedTime: post.published_at ?? undefined,
      tags:          post.tags ?? [],
      images:        post.og_image || post.cover_image
        ? [{ url: post.og_image || post.cover_image! }]
        : [],
    },
    twitter: {
      card:        'summary_large_image',
      title:       post.meta_title || post.title,
      description: post.meta_desc  || post.excerpt || '',
      images:      post.og_image || post.cover_image
        ? [post.og_image || post.cover_image!]
        : [],
    },
  }
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug).catch(() => null)

  if (!post || post.status !== 'published') notFound()

  return (
    <>
      {post.schema_custom && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: post.schema_custom }}
        />
      )}

      <main style={{ background: '#f7f6f2', minHeight: '100vh' }}>

        {/* Cover image */}
        {post.cover_image && (
          <div style={{ width: '100%', maxHeight: 480, overflow: 'hidden' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.cover_image}
              alt={post.title}
              width={1200}
              height={480}
              style={{ width: '100%', height: 480, objectFit: 'cover', display: 'block' }}
            />
          </div>
        )}

        {/* Outer container- wider to fit sidebar */}
        <div style={{ maxWidth: 1080, margin: '0 auto', padding: '3rem 1.5rem 5rem' }}>

          <Link
            href="/blog"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              fontSize: '0.78rem', fontWeight: 500, color: '#7a7264',
              textDecoration: 'none', marginBottom: '2rem',
            }}
          >
            <ArrowLeft size={13} aria-hidden="true" />
            Back to Blog
          </Link>

          {/* Header */}
          <header style={{ marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
              {post.category && (
                <span style={{
                  fontSize: '0.68rem', fontWeight: 700,
                  textTransform: 'uppercase', letterSpacing: '0.12em',
                  color: '#b8860b', background: '#fdf8ee',
                  border: '1px solid #e8d48a',
                  padding: '0.2rem 0.65rem', borderRadius: 999,
                }}>
                  {post.category}
                </span>
              )}
              {post.published_at && (
                <time
                  dateTime={post.published_at}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: '0.78rem', color: '#7a7264' }}
                >
                  <Calendar size={12} aria-hidden="true" />
                  {new Date(post.published_at).toLocaleDateString('en-AE', {
                    year: 'numeric', month: 'long', day: 'numeric',
                  })}
                </time>
              )}
            </div>

            <h1 style={{
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              fontWeight: 800, color: '#1a1814',
              lineHeight: 1.2, marginBottom: '1rem',
            }}>
              {post.title}
            </h1>

            {post.excerpt && (
              <p style={{ fontSize: '1.05rem', color: '#7a7264', lineHeight: 1.7, maxWidth: '65ch' }}>
                {post.excerpt}
              </p>
            )}

            {post.tags && post.tags.length > 0 && (
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: '1rem' }}>
                {post.tags.map((tag: string) => (
                  <span key={tag} style={{
                    display: 'inline-flex', alignItems: 'center', gap: 4,
                    fontSize: '0.7rem', padding: '0.2rem 0.55rem', borderRadius: 999,
                    background: '#f5f3ef', border: '1px solid #e8e3d8', color: '#7a7264',
                  }}>
                    <Tag size={9} aria-hidden="true" />
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* Divider */}
          <div style={{ height: 1, background: '#e8e3d8', marginBottom: '2.5rem' }} />

          {/* ── Content + TOC ── */}
          <BlogLayout content={post.content ?? ''} />

          {/* Footer */}
          <div style={{
            marginTop: '4rem', paddingTop: '2rem',
            borderTop: '1px solid #e8e3d8',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            flexWrap: 'wrap', gap: '1rem',
          }}>
            <Link
              href="/blog"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                fontSize: '0.82rem', fontWeight: 600, color: '#b8860b',
                textDecoration: 'none',
                padding: '0.5rem 1rem', borderRadius: 999,
                border: '1px solid #e8d48a', background: '#fdf8ee',
              }}
            >
              <ArrowLeft size={13} aria-hidden="true" />
              Back to Blog
            </Link>

            <p style={{ fontSize: '0.75rem', color: '#b8b0a0' }}>
              Smart Auto UAE
              {post.published_at && (
                <> · {new Date(post.published_at).toLocaleDateString('en-AE', { year: 'numeric', month: 'long' })}</>
              )}
            </p>
          </div>

        </div>
      </main>
    </>
  )
}