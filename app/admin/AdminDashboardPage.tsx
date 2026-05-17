'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  Search, FileText, Eye, CheckCircle, AlertCircle,
  Clock, TrendingUp, ArrowRight, RefreshCw,
  Globe, Layers, MessageSquare, Star,
} from 'lucide-react'

const GOLD      = '#b8860b'
const GOLD2     = '#d4a017'
const GOLD3     = '#8b6508'
const GOLD_BG   = '#fdf8ee'
const GOLD_MID  = '#fef3c7'

// ─── Types ────────────────────────────────────────────────────────────────────
type SeoSummary = {
  total:      number
  complete:   number
  incomplete: number
  noTitle:    number
  noDesc:     number
  noOgImage:  number
}

type RecentPost = {
  id:         string
  title:      string
  slug:       string
  status:     'published' | 'draft'
  created_at: string
}

type DashboardData = {
  seo:         SeoSummary
  recentPosts: RecentPost[]
  totalPosts:  number
}

// ─── Quick links ──────────────────────────────────────────────────────────────
const QUICK_LINKS = [
  { label: 'Edit SEO',      href: '/admin/seo',      icon: Search,        desc: 'Manage metadata for all pages' },
  { label: 'New Blog Post', href: '/admin/blog/new',  icon: FileText,      desc: 'Write and publish a new article' },
  { label: 'View Site',     href: '/',                icon: Globe,         desc: 'Open smartautouae.com', external: true },
  { label: 'Services',      href: '/admin/services',  icon: Layers,        desc: 'Manage service pages' },
  { label: 'Reviews',       href: '/admin/reviews',   icon: Star,          desc: 'Customer reviews' },
  { label: 'Messages',      href: '/admin/messages',  icon: MessageSquare, desc: 'Contact form submissions' },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────
function pct(n: number, total: number) {
  if (!total) return 0
  return Math.round((n / total) * 100)
}

function timeAgo(dateStr: string) {
  const diff  = Date.now() - new Date(dateStr).getTime()
  const mins  = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days  = Math.floor(diff / 86400000)
  if (mins  < 60) return `${mins}m ago`
  if (hours < 24) return `${hours}h ago`
  return `${days}d ago`
}

// ─── StatCard ─────────────────────────────────────────────────────────────────
function StatCard({
  label, value, sub, icon: Icon, accent = false,
}: {
  label: string
  value: string | number
  sub?: string
  icon: React.ElementType
  accent?: boolean
}) {
  return (
    <div style={{
      background: accent ? GOLD_BG : '#fafaf9',
      border: `1px solid ${accent ? '#e8d48a' : '#e8e3d8'}`,
      borderRadius: '0.75rem',
      padding: '1.25rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <p style={{
          fontSize: '0.7rem',
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          fontWeight: 600,
          color: accent ? GOLD3 : '#7a7264',
        }}>
          {label}
        </p>
        <div style={{
          width: 32, height: 32,
          borderRadius: '0.5rem',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: accent ? GOLD_MID : '#f0ece4',
          color: accent ? GOLD : '#7a7264',
        }}>
          <Icon size={15} aria-hidden="true" />
        </div>
      </div>
      <div>
        <p style={{
          fontSize: 'clamp(1.4rem,2.5vw,1.9rem)',
          fontWeight: 700,
          lineHeight: 1,
          marginBottom: '0.25rem',
          color: accent ? GOLD : '#1a1814',
        }}>
          {value}
        </p>
        {sub && (
          <p style={{ fontSize: '0.72rem', color: '#7a7264' }}>{sub}</p>
        )}
      </div>
    </div>
  )
}

// ─── SeoProgressBar ───────────────────────────────────────────────────────────
function SeoProgressBar({ label, value, total, color = GOLD }: {
  label: string; value: number; total: number; color?: string
}) {
  const p = pct(value, total)
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
        <span style={{ fontSize: '0.75rem', color: '#7a7264' }}>{label}</span>
        <span style={{ fontSize: '0.75rem', fontWeight: 600, color }}>{value}/{total}</span>
      </div>
      <div style={{ height: 6, borderRadius: 999, background: '#ede8de', overflow: 'hidden' }}>
        <div style={{
          height: '100%',
          borderRadius: 999,
          width: `${p}%`,
          background: color,
          transition: 'width 0.7s ease',
        }} />
      </div>
    </div>
  )
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────
function Skeleton({ h = 40 }: { h?: number }) {
  return (
    <div style={{
      height: h,
      borderRadius: '0.5rem',
      background: 'linear-gradient(90deg,#f0ece4 25%,#e8e3d8 50%,#f0ece4 75%)',
      backgroundSize: '200% 100%',
      animation: 'shimmer 1.5s ease-in-out infinite',
    }} />
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function AdminDashboardPage() {
  const [data,    setData]    = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState('')

  const load = async () => {
    setLoading(true)
    setError('')
    try {
      const [seoRes, blogRes] = await Promise.all([
        fetch('/api/admin/seo'),
        fetch('/api/admin/blog?limit=5'),
      ])

      const seoPages: Record<string, unknown>[] = seoRes.ok ? await seoRes.json() : []
      const blogData = blogRes.ok ? await blogRes.json() : { posts: [], total: 0 }

      const complete  = seoPages.filter((p) => p.title && p.description && p.og_image).length
      const noTitle   = seoPages.filter((p) => !p.title).length
      const noDesc    = seoPages.filter((p) => !p.description).length
      const noOgImage = seoPages.filter((p) => !p.og_image).length

      setData({
        seo: { total: seoPages.length, complete, incomplete: seoPages.length - complete, noTitle, noDesc, noOgImage },
        recentPosts: blogData.posts ?? [],
        totalPosts:  blogData.total ?? 0,
      })
    } catch {
      setError('Failed to load dashboard data.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const seoScore = data ? pct(data.seo.complete, data.seo.total) : 0
const [dateStr, setDateStr] = useState('')

useEffect(() => {
  setDateStr(new Date().toLocaleDateString('en-AE', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  }))
}, [])

return (
  <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

    {/* ── Header ── */}
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
      <div>
        <p style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: GOLD, marginBottom: '0.25rem' }}>
          Admin Panel
        </p>
        <h1 style={{ fontSize: 'clamp(1.4rem,3vw,1.9rem)', fontWeight: 700, color: '#1a1814', lineHeight: 1.2 }}>
          Dashboard
        </h1>
        <p style={{ fontSize: '0.8rem', color: '#7a7264', marginTop: '0.25rem' }}>
          smartautouae.com{dateStr ? ` · ${dateStr}` : ''}
        </p>
      </div>

      <button
        onClick={load}
        disabled={loading}
        style={{
          display: 'flex', alignItems: 'center', gap: '0.4rem',
          padding: '0.4rem 1rem',
          borderRadius: '0.5rem',
          fontSize: '0.8rem',
          fontWeight: 500,
          border: '1px solid #e8e3d8',
          background: '#fafaf9',
          color: '#7a7264',
          cursor: loading ? 'not-allowed' : 'pointer',
          opacity: loading ? 0.6 : 1,
          transition: 'border-color 150ms',
        }}
        aria-label="Refresh dashboard"
      >
        <RefreshCw size={13} style={{ animation: loading ? 'spin 1s linear infinite' : 'none' }} aria-hidden="true" />
        Refresh
      </button>
    </div>

    {error && (
      <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', color: '#b91c1c', borderRadius: '0.5rem', padding: '0.75rem 1rem', fontSize: '0.8rem', marginBottom: '1.25rem' }}>
        {error}
      </div>
    )}
        {/* ── KPI row ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          {loading ? (
            [128, 128, 128, 128].map((h, i) => <Skeleton key={i} h={h} />)
          ) : data ? (
            <>
              <StatCard label="SEO Score"  value={`${seoScore}%`}    sub={`${data.seo.complete} of ${data.seo.total} pages complete`} icon={TrendingUp}   accent />
              <StatCard label="SEO Pages"  value={data.seo.total}     sub={`${data.seo.incomplete} need attention`}                    icon={Search} />
              <StatCard label="Blog Posts" value={data.totalPosts}    sub="Total published + drafts"                                   icon={FileText} />
              <StatCard label="Incomplete" value={data.seo.incomplete} sub="Pages missing SEO data"                                   icon={AlertCircle} />
            </>
          ) : null}
          
        </div>
        

        {/* ── Main grid ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1.25rem' }}>

          {/* SEO Health */}
          <div style={{ background: '#fafaf9', border: '1px solid #e8e3d8', borderRadius: '0.75rem', padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <h2 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#1a1814' }}>SEO Health</h2>
              <Link href="/admin/seo" style={{ fontSize: '0.75rem', fontWeight: 600, color: GOLD, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
                View all <ArrowRight size={11} />
              </Link>
            </div>

            {loading ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[1,2,3,4].map(i => <Skeleton key={i} h={32} />)}
              </div>
            ) : data ? (
              <>
                {/* Score ring */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div style={{ position: 'relative', width: 64, height: 64, flexShrink: 0 }}>
                    <svg viewBox="0 0 64 64" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }} aria-hidden="true">
                      <circle cx="32" cy="32" r="26" fill="none" stroke="#ede8de" strokeWidth="6" />
                      <circle
                        cx="32" cy="32" r="26" fill="none"
                        stroke={GOLD} strokeWidth="6"
                        strokeDasharray={`${2 * Math.PI * 26}`}
                        strokeDashoffset={`${2 * Math.PI * 26 * (1 - seoScore / 100)}`}
                        strokeLinecap="round"
                        style={{ transition: 'stroke-dashoffset 1s ease' }}
                      />
                    </svg>
                    <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, color: GOLD }}>
                      {seoScore}%
                    </span>
                  </div>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: '0.85rem', color: '#1a1814' }}>Overall Score</p>
                    <p style={{ fontSize: '0.72rem', color: '#7a7264', marginTop: 2 }}>
                      {seoScore >= 80 ? '🟢 Good' : seoScore >= 50 ? '🟡 Needs work' : '🔴 Critical'}
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                  <SeoProgressBar label="Has Title"       value={data.seo.total - data.seo.noTitle}   total={data.seo.total} />
                  <SeoProgressBar label="Has Description" value={data.seo.total - data.seo.noDesc}    total={data.seo.total} />
                  <SeoProgressBar label="Has OG Image"    value={data.seo.total - data.seo.noOgImage} total={data.seo.total} color="#16a34a" />
                  <SeoProgressBar label="Fully Complete"  value={data.seo.complete}                   total={data.seo.total} color={GOLD2} />
                </div>

                {data.seo.incomplete > 0 && (
                  <Link href="/admin/seo" style={{
                    marginTop: '1.25rem',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '0.6rem 0.8rem',
                    borderRadius: '0.5rem',
                    background: '#fef2f2',
                    border: '1px solid #fca5a5',
                    textDecoration: 'none',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <AlertCircle size={13} style={{ color: '#dc2626' }} aria-hidden="true" />
                      <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#dc2626' }}>
                        {data.seo.incomplete} pages need attention
                      </span>
                    </div>
                    <ArrowRight size={11} style={{ color: '#dc2626' }} aria-hidden="true" />
                  </Link>
                )}
              </>
            ) : null}
          </div>

          {/* Right column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

            {/* Recent posts */}
            <div style={{ background: '#fafaf9', border: '1px solid #e8e3d8', borderRadius: '0.75rem', padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <h2 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#1a1814' }}>Recent Posts</h2>
                <Link href="/admin/blog" style={{ fontSize: '0.75rem', fontWeight: 600, color: GOLD, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
                  View all <ArrowRight size={11} />
                </Link>
              </div>

              {loading ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {[1,2,3,4].map(i => <Skeleton key={i} h={44} />)}
                </div>
              ) : data?.recentPosts.length ? (
                <div>
                  {data.recentPosts.map((post, i) => (
                    <Link
                      key={post.id}
                      href={`/admin/blog/edit/${post.id}`}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '0.75rem',
                        padding: '0.65rem 0',
                        borderBottom: i < data.recentPosts.length - 1 ? '1px solid #ede8de' : 'none',
                        textDecoration: 'none',
                      }}
                    >
                      <div style={{
                        width: 32, height: 32, borderRadius: '0.4rem', flexShrink: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: post.status === 'published' ? '#f0fdf4' : '#f5f3ef',
                        border: `1px solid ${post.status === 'published' ? '#86efac' : '#e8e3d8'}`,
                      }}>
                        {post.status === 'published'
                          ? <CheckCircle size={13} style={{ color: '#16a34a' }} aria-hidden="true" />
                          : <Clock       size={13} style={{ color: '#7a7264' }} aria-hidden="true" />
                        }
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: '0.82rem', fontWeight: 500, color: '#1a1814', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {post.title}
                        </p>
                        <p style={{ fontSize: '0.7rem', color: '#b8b0a0' }}>{timeAgo(post.created_at)}</p>
                      </div>
                      <span style={{
                        fontSize: '0.65rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em',
                        padding: '0.2rem 0.6rem', borderRadius: 999, flexShrink: 0,
                        background: post.status === 'published' ? '#f0fdf4' : '#f5f3ef',
                        border: `1px solid ${post.status === 'published' ? '#86efac' : '#e8e3d8'}`,
                        color: post.status === 'published' ? '#16a34a' : '#7a7264',
                      }}>
                        {post.status}
                      </span>
                    </Link>
                  ))}
                </div>
              ) : (
                <div style={{ padding: '2.5rem 0', textAlign: 'center' }}>
                  <FileText size={28} style={{ color: '#d4cfc8', margin: '0 auto 0.75rem' }} aria-hidden="true" />
                  <p style={{ fontSize: '0.82rem', color: '#7a7264', marginBottom: '0.75rem' }}>No blog posts yet</p>
                  <Link href="/admin/blog/new" style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                    padding: '0.5rem 1rem', borderRadius: '0.5rem',
                    background: GOLD, color: '#fff',
                    fontSize: '0.8rem', fontWeight: 600, textDecoration: 'none',
                  }}>
                    Write first post <ArrowRight size={13} />
                  </Link>
                </div>
              )}
            </div>

            {/* Quick actions */}
            <div style={{ background: '#fafaf9', border: '1px solid #e8e3d8', borderRadius: '0.75rem', padding: '1.5rem' }}>
              <h2 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#1a1814', marginBottom: '1rem' }}>Quick Actions</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '0.75rem' }}>
                {QUICK_LINKS.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      target={item.external ? '_blank' : undefined}
                      rel={item.external ? 'noopener noreferrer' : undefined}
                      style={{
                        display: 'flex', flexDirection: 'column', gap: '0.5rem',
                        padding: '0.875rem',
                        borderRadius: '0.5rem',
                        background: '#ffffff',
                        border: '1px solid #e8e3d8',
                        textDecoration: 'none',
                        transition: 'border-color 150ms, background 150ms',
                      }}
                      className="admin-quick-link"
                    >
                      <Icon size={15} style={{ color: GOLD }} aria-hidden="true" />
                      <div>
                        <p style={{ fontSize: '0.8rem', fontWeight: 600, color: '#1a1814' }}>{item.label}</p>
                        <p style={{ fontSize: '0.7rem', color: '#7a7264', lineHeight: 1.4, marginTop: 2 }}>{item.desc}</p>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>

          </div>
        </div>

        {/* Incomplete SEO notice */}
        {!loading && data && data.seo.incomplete > 0 && (
          <div style={{ marginTop: '1.25rem', background: '#fafaf9', border: '1px solid #e8e3d8', borderRadius: '0.75rem', padding: '1.25rem 1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <h2 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#1a1814', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                Incomplete SEO Pages
                <span style={{ fontSize: '0.65rem', fontWeight: 600, padding: '0.15rem 0.5rem', borderRadius: 999, background: '#fef2f2', border: '1px solid #fca5a5', color: '#dc2626' }}>
                  {data.seo.incomplete}
                </span>
              </h2>
              <Link href="/admin/seo" style={{ fontSize: '0.75rem', fontWeight: 600, color: GOLD, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
                Fix all <ArrowRight size={11} />
              </Link>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#7a7264' }}>
              Go to{' '}
              <Link href="/admin/seo" style={{ color: GOLD }}>SEO Management</Link>
              {' '}to fill in missing titles, descriptions, and OG images.
            </p>
          </div>
        )}

      </div>
      
  )
}