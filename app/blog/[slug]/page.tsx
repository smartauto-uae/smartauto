import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getBlogPost, getBlogSlugs, getRelatedPosts } from '@/lib/blog'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const gold     = '#C9A84C'
const goldGrad = 'linear-gradient(135deg,#C9A84C,#E8C96A)'

// Generate all static paths at build time
export async function generateStaticParams() {
  return getBlogSlugs().map((slug) => ({ slug }))
}

// Generate per-post metadata
export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const post = getBlogPost(params.slug)
  if (!post) return {}
  return {
    title:       `${post.title} | Smart Auto UAE Blog`,
    description: post.description,
    openGraph: {
      title:     post.title,
      description: post.description,
      images:    [post.image],
      type:      'article',
      publishedTime: post.date,
    },
    alternates: {
      canonical: `https://smartautouae.ae/blog/${params.slug}`,
    },
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post    = getBlogPost(params.slug)
  if (!post) notFound()

  const related = getRelatedPosts(params.slug, 3)

  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: '#080808', color: '#fff', paddingTop: '80px' }}>

        {/* Hero */}
        <section
          className="relative py-20 overflow-hidden"
          style={{ backgroundColor: '#050505' }}
        >
          <div className="max-w-4xl mx-auto px-6">

            {/* Breadcrumb */}
            <div
              className="flex items-center gap-2 text-[12px] mb-8"
              style={{ color: 'rgba(255,255,255,0.3)' }}
            >
              <Link href="/" style={{ color: 'rgba(255,255,255,0.3)' }} className="no-underline hover:text-white/60">Home</Link>
              <span>/</span>
              <Link href="/blog" style={{ color: 'rgba(255,255,255,0.3)' }} className="no-underline hover:text-white/60">Blog</Link>
              <span>/</span>
              <span style={{ color: gold }}>{post.category}</span>
            </div>

            {/* Category + reading time */}
            <div className="flex items-center gap-3 mb-5">
              <span
                className="px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-[0.1em]"
                style={{
                  background: 'rgba(201,168,76,0.08)',
                  border: '1px solid rgba(201,168,76,0.2)',
                  color: gold,
                }}
              >
                {post.category}
              </span>
              <span className="text-[12px]" style={{ color: 'rgba(255,255,255,0.3)' }}>
                {post.readingTime}
              </span>
            </div>

            {/* Title */}
            <h1
              className="font-bold leading-[1.1] mb-5"
              style={{
                fontFamily: 'var(--font-playfair),serif',
                fontSize: 'clamp(2rem,4vw,3.2rem)',
                color: '#fff',
              }}
            >
              {post.title}
            </h1>

            {/* Description */}
            <p
              className="text-base leading-[1.8] mb-8 max-w-2xl"
              style={{ color: 'rgba(255,255,255,0.5)' }}
            >
              {post.description}
            </p>

            {/* Meta row */}
            <div
              className="flex items-center gap-6 pb-8"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
            >
              <div>
                <div className="text-[13px] font-semibold" style={{ color: '#fff' }}>
                  {post.author}
                </div>
                <div className="text-[11px]" style={{ color: 'rgba(255,255,255,0.3)' }}>
                  {new Date(post.date).toLocaleDateString('en-AE', {
                    day: 'numeric', month: 'long', year: 'numeric',
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cover image */}
        {post.image && (
          <div className="max-w-4xl mx-auto px-6 -mt-1">
            <div className="rounded-2xl overflow-hidden" style={{ height: 420 }}>
              <img
                src={post.image}
                alt={post.title}
                width={896}
                height={420}
                loading="eager"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        {/* MDX Content */}
        <article className="max-w-4xl mx-auto px-6 py-16">
          <div className="mdx-content">
            <MDXRemote source={post.content} />
          </div>
        </article>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div
            className="max-w-4xl mx-auto px-6 pb-12"
          >
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-full text-[11px]"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: 'rgba(255,255,255,0.4)',
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Related posts */}
        {related.length > 0 && (
          <section
            className="py-16"
            style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div className="max-w-7xl mx-auto px-6">
              <h2
                className="font-bold text-[22px] mb-8"
                style={{ fontFamily: 'var(--font-playfair),serif', color: '#fff' }}
              >
                Related Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/blog/${r.slug}`}
                    className="group rounded-2xl border overflow-hidden no-underline transition-all duration-300 hover:-translate-y-1"
                    style={{
                      border: '1px solid rgba(255,255,255,0.06)',
                      background: 'rgba(255,255,255,0.02)',
                    }}
                  >
                    <div style={{ height: 160, overflow: 'hidden' }}>
                      <img
                        src={r.image}
                        alt={r.title}
                        width={400}
                        height={160}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-5">
                      <span
                        className="text-[10px] uppercase tracking-[0.1em] font-semibold"
                        style={{ color: gold }}
                      >
                        {r.category}
                      </span>
                      <h3
                        className="font-bold text-[15px] leading-snug mt-1"
                        style={{ fontFamily: 'var(--font-playfair),serif', color: '#fff' }}
                      >
                        {r.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

      </main>
      <Footer />
    </>
  )
}