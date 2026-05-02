import { getPosts } from '@/lib/actions/blog'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Read our latest articles and updates.',
}

export default async function BlogPage() {
  const posts = await getPosts()
  const published = posts.filter((p) => p.status === 'published')

  return (
    <main className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-2">Blog</h1>
      <p className="text-muted-foreground mb-12">Latest articles and updates.</p>

      {published.length === 0 ? (
        <p className="text-muted-foreground">No posts published yet.</p>
      ) : (
        <div className="grid gap-8">
          {published.map((post) => (
            <article
              key={post.id}
              className="border border-border rounded-xl p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                {post.published_at && (
                  <time dateTime={post.published_at}>
                    {new Date(post.published_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                )}
                {post.tags && post.tags.length > 0 && (
                  <>
                    <span>·</span>
                    <div className="flex gap-1 flex-wrap">
                      {post.tags.map((tag: string) => (
                        <span
                          key={tag}
                          className="bg-secondary text-secondary-foreground text-xs px-2 py-0.5 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </div>

              <h2 className="text-2xl font-semibold mb-2 leading-snug">
                <Link
                  href={`/blog/${post.slug}`}
                  className="hover:text-primary transition-colors"
                >
                  {post.title}
                </Link>
              </h2>

              {post.excerpt && (
                <p className="text-muted-foreground line-clamp-3 mb-4">
                  {post.excerpt}
                </p>
              )}

              <Link
                href={`/blog/${post.slug}`}
                className="text-sm font-medium text-primary hover:underline"
              >
                Read more →
              </Link>
            </article>
          ))}
        </div>
      )}
    </main>
  )
}