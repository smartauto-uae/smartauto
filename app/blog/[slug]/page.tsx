import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { listBlogFiles, getBlogFile } from '@/lib/github'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const gold = '#C9A84C'
const goldGrad = 'linear-gradient(135deg,#C9A84C,#E8C96A)'

// ── Frontmatter parser ──────────────────────────────────────────────────────
type PostMeta = {
  title:       string
  description: string
  date:        string
  author:      string
  category:    string
  tags:        string[]
  image:       string
  published:   boolean
  readingTime: string
}

function parseFrontmatter(raw: string): { meta: PostMeta; body: string } {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n+/)
  const body  = raw.replace(/^---[\s\S]*?---\n+/, '')

  if (!match) {
    return {
      meta: { title: '', description: '', date: '', author: 'Smart Auto UAE', category: '', tags: [], image: '', published: true, readingTime: '1 min read' },
      body,
    }
  }

  const lines  = match[1].split('\n')
  const fields: Record<string, string> = {}
  for (const line of lines) {
    const idx = line.indexOf(':')
    if (idx === -1) continue
    const key = line.slice(0, idx).trim()
    const val = line.slice(idx + 1).trim().replace(/^"(.*)"$/, '$1')
    fields[key] = val
  }

  const tags = fields.tags
    ? fields.tags.replace(/^\[|\]$/g, '').split(',').map((t) => t.trim().replace(/^"|"$/g, '')).filter(Boolean)
    : []

  // Estimate reading time from HTML word count
  const words        = body.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length
  const readingTime  = `${Math.max(1, Math.ceil(words / 200))} min read`

  return {
    meta: {
      title:       fields.title       ?? '',
      description: fields.description ?? '',
      date:        fields.date        ?? '',
      author:      fields.author      ?? 'Smart Auto UAE',
      category:    fields.category    ?? '',
      tags,
      image:       fields.image       ?? '/images/blog/default.webp',
      published:   fields.published !== 'false',
      readingTime,
    },
    body,
  }
}

// ── Data fetchers ───────────────────────────────────────────────────────────

async function getPost(slug: string) {
  const file = await getBlogFile(slug)
  if (!file) return null
  const { meta, body } = parseFrontmatter(file.content)
  if (!meta.published) return null
  return { slug, meta, body, sha: file.sha }
}

async function getAllPosts() {
  const files = await listBlogFiles()
  const posts = await Promise.all(
    files.map(async (f) => {
      const slug = f.name.replace('.mdx', '').replace('.md', '')
      return getPost(slug)
    })
  )
  return posts.filter(Boolean) as NonNullable<Awaited<ReturnType<typeof getPost>>>[]
}

// ── Static params ───────────────────────────────────────────────────────────

export async function generateStaticParams() {
  try {
    const files = await listBlogFiles()
    return files.map((f) => ({
      slug: f.name.replace('.mdx', '').replace('.md', ''),
    }))
  } catch {
    return []
  }
}

// ── Metadata ────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return {}

  return {
    title:       `${post.meta.title} | Smart Auto UAE Blog`,
    description: post.meta.description,
    keywords:    post.meta.tags.join(', '),
    authors:     [{ name: post.meta.author }],
    openGraph: {
      title:         post.meta.title,
      description:   post.meta.description,
      images:        [{ url: post.meta.image, width: 1200, height: 630 }],
      type:          'article',
      publishedTime: post.meta.date,
    },
    twitter: {
      card:        'summary_large_image',
      title:       post.meta.title,
      description: post.meta.description,
      images:      [post.meta.image],
    },
    alternates: {
      canonical: `https://smartautouae.ae/blog/${slug}`,
    },
  }
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post     = await getPost(slug)
  if (!post) notFound()

  // Related posts — same category, exclude current
  let related: typeof allPosts = []
  try {
    const allPosts = await getAllPosts()
    related = allPosts
      .filter((p) => p.slug !== slug && p.meta.category === post.meta.category)
      .slice(0, 3)
    // If not enough from same category, fill with recent posts
    if (related.length < 3) {
      const others = allPosts
        .filter((p) => p.slug !== slug && !related.find((r) => r.slug === p.slug))
        .slice(0, 3 - related.length)
      related = [...related, ...others]
    }
  } catch {
    // related stays empty — non-critical
  }

  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: '#080808', color: '#fff', paddingTop: '80px' }}>

        {/* ── Hero ── */}
        <section className="relative py-20 overflow-hidden" style={{ backgroundColor: '#050505' }}>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 60% 0%,rgba(201,168,76,0.06) 0%,transparent 60%)' }}
            aria-hidden="true"
          />
          <div className="max-w-4xl mx-auto px-6 relative z-10">

            {/* Breadcrumb */}
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-2 text-[12px] mb-8"
              style={{ color: 'rgba(255,255,255,0.3)' }}
            >
              <Link href="/" style={{ color: 'rgba(255,255,255,0.3)' }} className="no-underline hover:text-white/60 transition-colors">Home</Link>
              <span aria-hidden="true">/</span>
              <Link href="/blog" style={{ color: 'rgba(255,255,255,0.3)' }} className="no-underline hover:text-white/60 transition-colors">Blog</Link>
              <span aria-hidden="true">/</span>
              <span style={{ color: gold }}>{post.meta.category || slug}</span>
            </nav>

            {/* Category + reading time */}
            <div className="flex items-center gap-3 mb-5">
              <span
                className="px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-[0.1em]"
                style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)', color: gold }}
              >
                {post.meta.category}
              </span>
              <span className="text-[12px]" style={{ color: 'rgba(255,255,255,0.3)' }}>
                {post.meta.readingTime}
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
              {post.meta.title}
            </h1>

            {/* Description */}
            <p className="text-base leading-[1.8] mb-8 max-w-2xl" style={{ color: 'rgba(255,255,255,0.5)' }}>
              {post.meta.description}
            </p>

            {/* Author + Date */}
            <div
              className="flex items-center gap-6 pb-8"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-[13px] text-black flex-shrink-0"
                style={{ background: goldGrad }}
                aria-hidden="true"
              >
                {post.meta.author.charAt(0)}
              </div>
              <div>
                <div className="text-[13px] font-semibold" style={{ color: '#fff' }}>
                  {post.meta.author}
                </div>
                {post.meta.date && (
                  <div className="text-[11px]" style={{ color: 'rgba(255,255,255,0.3)' }}>
                    {new Date(post.meta.date).toLocaleDateString('en-AE', {
                      day: 'numeric', month: 'long', year: 'numeric',
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ── Cover image ── */}
        {post.meta.image && (
          <div className="max-w-4xl mx-auto px-6 -mt-1 mb-2">
            <div className="rounded-2xl overflow-hidden" style={{ height: 420 }}>
              <img
                src={post.meta.image}
                alt={post.meta.title}
                width={896}
                height={420}
                loading="eager"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        {/* ── HTML Content ── */}
        <article className="max-w-4xl mx-auto px-6 py-16">
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: post.body }}
          />
        </article>

        {/* ── Tags ── */}
        {post.meta.tags.length > 0 && (
          <div className="max-w-4xl mx-auto px-6 pb-12">
            <div className="flex flex-wrap gap-2">
              {post.meta.tags.map((tag) => (
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

        {/* ── Share strip ── */}
        <div
          className="max-w-4xl mx-auto px-6 pb-14"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '2rem' }}
        >
          <p className="text-[11px] uppercase tracking-[0.2em] mb-3" style={{ color: 'rgba(255,255,255,0.3)' }}>
            Share this article
          </p>
          <div className="flex gap-3 flex-wrap">
            {[
              {
                label: 'WhatsApp',
                href: `https://wa.me/?text=${encodeURIComponent(`${post.meta.title} — https://smartautouae.ae/blog/${slug}`)}`,
                color: '#25D366',
              },
              {
                label: 'Twitter / X',
                href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.meta.title)}&url=${encodeURIComponent(`https://smartautouae.ae/blog/${slug}`)}`,
                color: '#1DA1F2',
              },
              {
                label: 'Copy Link',
                href: `https://smartautouae.ae/blog/${slug}`,
                color: gold,
              },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl text-[12px] font-semibold border no-underline transition-all hover:opacity-80"
                style={{
                  borderColor: `${s.color}30`,
                  color: s.color,
                  background: `${s.color}08`,
                }}
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {/* ── Related posts ── */}
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
                    style={{ border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}
                  >
                    <div style={{ height: 160, overflow: 'hidden' }}>
                      <img
                        src={r.meta.image}
                        alt={r.meta.title}
                        width={400}
                        height={160}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={undefined}
                      />
                    </div>
                    <div className="p-5">
                      <span
                        className="text-[10px] uppercase tracking-[0.1em] font-semibold"
                        style={{ color: gold }}
                      >
                        {r.meta.category}
                      </span>
                      <h3
                        className="font-bold text-[15px] leading-snug mt-1 text-white"
                        style={{ fontFamily: 'var(--font-playfair),serif' }}
                      >
                        {r.meta.title}
                      </h3>
                      <p className="text-[12px] mt-1.5 line-clamp-2" style={{ color: 'rgba(255,255,255,0.4)' }}>
                        {r.meta.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

      </main>

      {/* ── Blog content styles ── */}
      <style>{`
        .blog-content { color: rgba(255,255,255,0.72); font-size: 16px; line-height: 1.9; }
        .blog-content h2 { font-family: var(--font-playfair),serif; font-size: clamp(1.4rem,2.5vw,1.8rem); font-weight: 700; color: #fff; margin: 2.5rem 0 0.75rem; line-height: 1.2; }
        .blog-content h3 { font-family: var(--font-playfair),serif; font-size: clamp(1.15rem,2vw,1.35rem); font-weight: 600; color: #fff; margin: 2rem 0 0.6rem; }
        .blog-content h4 { font-size: 1.05rem; font-weight: 600; color: rgba(255,255,255,0.9); margin: 1.5rem 0 0.5rem; }
        .blog-content p  { margin-bottom: 1.15rem; }
        .blog-content strong { color: #fff; font-weight: 700; }
        .blog-content em { font-style: italic; color: rgba(255,255,255,0.65); }
        .blog-content u  { text-decoration-color: rgba(201,168,76,0.5); }
        .blog-content mark { background: rgba(201,168,76,0.2); color: ${gold}; border-radius: 3px; padding: 0 4px; }
        .blog-content a  { color: ${gold}; text-decoration: underline; text-decoration-color: rgba(201,168,76,0.35); transition: opacity 0.15s; }
        .blog-content a:hover { opacity: 0.75; }
        .blog-content ul { list-style: disc; padding-left: 1.6rem; margin: 0.75rem 0 1rem; }
        .blog-content ol { list-style: decimal; padding-left: 1.6rem; margin: 0.75rem 0 1rem; }
        .blog-content li { margin-bottom: 0.4rem; }
        .blog-content blockquote { border-left: 3px solid ${gold}; padding: 0.5rem 0 0.5rem 1.25rem; margin: 1.5rem 0; color: rgba(255,255,255,0.5); font-style: italic; background: rgba(201,168,76,0.03); border-radius: 0 8px 8px 0; }
        .blog-content code { background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.1); border-radius: 4px; padding: 2px 7px; font-size: 0.84em; color: #e8c96a; font-family: 'Fira Code',monospace; }
        .blog-content pre { background: rgba(0,0,0,0.45); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 1.25rem 1.5rem; margin: 1.25rem 0; overflow-x: auto; }
        .blog-content pre code { background: none; border: none; padding: 0; font-size: 13px; color: rgba(255,255,255,0.8); }
        .blog-content img { border-radius: 12px; max-width: 100%; margin: 1.5rem 0; display: block; }
        .blog-content hr  { border: none; border-top: 1px solid rgba(255,255,255,0.08); margin: 2rem 0; }
        .blog-content table { width: 100%; border-collapse: collapse; margin: 1.5rem 0; font-size: 14px; }
        .blog-content th  { padding: 10px 14px; text-align: left; font-weight: 600; color: #fff; background: rgba(255,255,255,0.04); border-bottom: 1px solid rgba(255,255,255,0.1); }
        .blog-content td  { padding: 10px 14px; border-bottom: 1px solid rgba(255,255,255,0.05); }
        .blog-content tr:last-child td { border-bottom: none; }
      `}</style>

      <Footer />
    </>
  )
}