import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllBlogPosts, getAllCategories } from '@/lib/blog'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Blog — Window Tinting & Smart Film Tips | Smart Auto UAE',
  description:
    'Expert guides on window tinting, smart film, PPF, and car care in Dubai and Sharjah from the Smart Auto UAE team.',
  alternates: { canonical: 'https://smartautouae.ae/blog' },
}

const gold     = '#C9A84C'
const goldGrad = 'linear-gradient(135deg,#C9A84C,#E8C96A)'

export default function BlogPage() {
  const posts      = getAllBlogPosts()
  const categories = getAllCategories()

  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: '#080808', color: '#fff', paddingTop: '80px' }}>

        {/* Hero */}
        <section className="py-20" style={{ backgroundColor: '#050505' }}>
          <div className="max-w-7xl mx-auto px-6 text-center">
            <span
              className="text-[11px] tracking-[0.35em] uppercase mb-4 block"
              style={{ color: gold }}
            >
              Expert Guides & Tips
            </span>
            <h1
              className="font-bold mb-4"
              style={{
                fontFamily: 'var(--font-playfair),serif',
                fontSize: 'clamp(2rem,4vw,3.5rem)',
                color: '#fff',
              }}
            >
              Smart Auto UAE{' '}
              <span
                style={{
                  background: goldGrad,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Blog
              </span>
            </h1>
            <p
              className="max-w-xl mx-auto text-sm leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.4)' }}
            >
              Window tinting, smart glass, PPF, detailing and car care — expert advice
              from Dubai's most trusted auto accessories specialists.
            </p>
          </div>
        </section>

        {/* Category filter */}
        {categories.length > 0 && (
          <section
            className="py-6 sticky top-20 z-30"
            style={{
              backgroundColor: 'rgba(8,8,8,0.95)',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <div className="max-w-7xl mx-auto px-6 flex items-center gap-3 flex-wrap">
              <span className="text-[11px] uppercase tracking-[0.2em]" style={{ color: 'rgba(255,255,255,0.3)' }}>
                Filter:
              </span>
              {categories.map((cat) => (
                <span
                  key={cat}
                  className="px-4 py-1.5 rounded-full text-[12px] font-medium border cursor-pointer"
                  style={{
                    borderColor: 'rgba(201,168,76,0.2)',
                    color: 'rgba(255,255,255,0.5)',
                    background: 'rgba(201,168,76,0.04)',
                  }}
                >
                  {cat}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Posts grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6">
            {posts.length === 0 ? (
              <div className="text-center py-24">
                <p style={{ color: 'rgba(255,255,255,0.3)' }}>No posts yet. Check back soon.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group rounded-2xl border overflow-hidden no-underline flex flex-col transition-all duration-300 hover:-translate-y-1"
                    style={{
                      border: '1px solid rgba(255,255,255,0.06)',
                      background: 'rgba(255,255,255,0.02)',
                    }}
                  >
                    {/* Thumbnail */}
                    <div
                      className="overflow-hidden"
                      style={{ height: 200, background: 'rgba(255,255,255,0.04)' }}
                    >
                      <img
                        src={post.image}
                        alt={post.title}
                        width={600}
                        height={200}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <span
                          className="px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-[0.1em]"
                          style={{
                            background: 'rgba(201,168,76,0.08)',
                            border: '1px solid rgba(201,168,76,0.2)',
                            color: gold,
                          }}
                        >
                          {post.category}
                        </span>
                        <span className="text-[11px]" style={{ color: 'rgba(255,255,255,0.25)' }}>
                          {post.readingTime}
                        </span>
                      </div>

                      <h2
                        className="font-bold text-[17px] leading-snug mb-2 flex-1"
                        style={{
                          fontFamily: 'var(--font-playfair),serif',
                          color: '#fff',
                        }}
                      >
                        {post.title}
                      </h2>

                      <p
                        className="text-[13px] leading-[1.65] mb-4"
                        style={{ color: 'rgba(255,255,255,0.4)' }}
                      >
                        {post.description}
                      </p>

                      <div
                        className="flex items-center justify-between pt-4 mt-auto"
                        style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
                      >
                        <span className="text-[11px]" style={{ color: 'rgba(255,255,255,0.3)' }}>
                          {new Date(post.date).toLocaleDateString('en-AE', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </span>
                        <span
                          className="text-[12px] font-semibold transition-colors duration-200"
                          style={{ color: gold }}
                        >
                          Read more →
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}