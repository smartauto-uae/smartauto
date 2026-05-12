import { getPublishedPosts } from '@/lib/actions/blog'
import Link from 'next/link'
import { Calendar, Tag } from 'lucide-react'
import type { Metadata } from 'next'

export const revalidate = 0

export const metadata: Metadata = {
  title: 'Blog | Smart Auto UAE',
  description: 'Read our latest articles on window tinting, PPF, ceramic coating and more.',
}

export default async function BlogPage() {
  const posts = await getPublishedPosts()

  return (
    <main style={{ background: '#f7f6f2', minHeight: '100vh' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '4rem 1.5rem' }}>

        {/* Header */}
        <div style={{ marginBottom: '3rem' }}>
          <p style={{
            fontSize: '0.7rem', fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '0.18em',
            color: '#b8860b', marginBottom: '0.5rem',
          }}>
            Smart Auto UAE
          </p>
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 800, color: '#1a1814', marginBottom: '0.75rem',
          }}>
            Blog & Insights
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#7a7264', maxWidth: '55ch' }}>
            Tips, guides and news on window tinting, PPF, ceramic coating and car care in Dubai.
          </p>
        </div>

        {/* Empty state */}
        {posts.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '5rem 1rem',
            background: '#fff', borderRadius: '0.75rem',
            border: '1px solid #e8e3d8',
          }}>
            <p style={{ fontSize: '0.9rem', color: '#b8b0a0' }}>
              No posts published yet. Check back soon.
            </p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '1.25rem' }}>
            {posts.map(post => (
              <article
                key={post.id}
                style={{
                  background: '#ffffff',
                  border: '1px solid #e8e3d8',
                  borderRadius: '0.75rem',
                  overflow: 'hidden',
                  display: 'grid',
                  gridTemplateColumns: post.cover_image ? '1fr 260px' : '1fr',
                }}
              >
                {/* Text */}
                <div style={{ padding: '1.5rem' }}>

                  {/* Category + Date */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                    {post.category && (
                      <span style={{
                        fontSize: '0.65rem', fontWeight: 700,
                        textTransform: 'uppercase', letterSpacing: '0.1em',
                        color: '#b8860b', background: '#fdf8ee',
                        border: '1px solid #e8d48a',
                        padding: '0.15rem 0.55rem', borderRadius: 999,
                      }}>
                        {post.category}
                      </span>
                    )}
                    {post.published_at && (
                      <time
                        dateTime={post.published_at}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: '0.75rem', color: '#7a7264' }}
                      >
                        <Calendar size={11} aria-hidden="true" />
                        {new Date(post.published_at).toLocaleDateString('en-AE', {
                          year: 'numeric', month: 'short', day: 'numeric',
                        })}
                      </time>
                    )}
                  </div>

                  {/* Title */}
                  <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#1a1814', lineHeight: 1.3, marginBottom: '0.5rem' }}>
                    <Link
                      href={`/blog/${post.slug}`}
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      {post.title}
                    </Link>
                  </h2>

                  {/* Excerpt */}
                  {post.excerpt && (
                    <p style={{
                      fontSize: '0.875rem', color: '#7a7264',
                      lineHeight: 1.65, marginBottom: '1rem',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}>
                      {post.excerpt}
                    </p>
                  )}

                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: '1rem' }}>
                      {post.tags.slice(0, 4).map((tag: string) => (
                        <span key={tag} style={{
                          display: 'inline-flex', alignItems: 'center', gap: 3,
                          fontSize: '0.68rem', padding: '0.15rem 0.5rem', borderRadius: 999,
                          background: '#f5f3ef', border: '1px solid #e8e3d8', color: '#7a7264',
                        }}>
                          <Tag size={8} aria-hidden="true" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Read more */}
                  <Link
                    href={`/blog/${post.slug}`}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 4,
                      fontSize: '0.78rem', fontWeight: 600, color: '#b8860b',
                      textDecoration: 'none',
                    }}
                  >
                    Read more →
                  </Link>
                </div>

                {/* Cover image */}
                {post.cover_image && (
                  <div style={{ overflow: 'hidden' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.cover_image}
                      alt={post.title}
                      width={260}
                      height={200}
                      loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  </div>
                )}
              </article>
            ))}
          </div>
        )}

      </div>
    </main>
  )
}