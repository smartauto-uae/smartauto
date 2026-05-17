'use client'

import Link from 'next/link'
import { useState, useTransition } from 'react'
import { Plus, Search, Pencil, Trash2, Eye, EyeOff, ExternalLink, Tag } from 'lucide-react'
import { deletePost, toggleStatus } from '@/lib/actions/blog'

const GOLD = '#b8860b'

function StatusBadge({ status }: { status: string }) {
  const published = status === 'published'
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '0.2rem 0.6rem', borderRadius: 999,
      fontSize: '0.7rem', fontWeight: 600,
      background: published ? '#f0fdf4' : '#f5f3ef',
      color: published ? '#16a34a' : '#7a7264',
      border: `1px solid ${published ? '#86efac' : '#e8e3d8'}`,
    }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: published ? '#16a34a' : '#b8b0a0', flexShrink: 0 }} aria-hidden="true" />
      {published ? 'Published' : 'Draft'}
    </span>
  )
}

const actionBtn: React.CSSProperties = {
  width: 36, height: 36, borderRadius: '0.4rem',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  background: '#f5f3ef', border: '1px solid #e8e3d8',
  color: '#7a7264', cursor: 'pointer', flexShrink: 0,
  transition: 'border-color 150ms, color 150ms',
}

export default function PostsTable({ posts }: { posts: any[] }) {
  const [query,     setQuery]     = useState('')
  const [deleting,  setDeleting]  = useState<string | null>(null)
  const [confirmId, setConfirmId] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const filtered = posts.filter(p =>
    p.title.toLowerCase().includes(query.toLowerCase()) ||
    (p.tags ?? []).some((t: string) => t.toLowerCase().includes(query.toLowerCase()))
  )

  const handleDelete = (id: string) => {
    setDeleting(id)
    startTransition(async () => {
      await deletePost(id)
      setDeleting(null)
      setConfirmId(null)
    })
  }

  const handleToggle = (id: string, status: string) => {
    startTransition(async () => { await toggleStatus(id, status as any) })
  }

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.5rem', gap: '1rem', flexWrap: 'wrap' }}>
        <div>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1a1814' }}>Blog Posts</h1>
          <p style={{ fontSize: '0.8rem', color: '#7a7264', marginTop: '0.2rem' }}>
            {posts.length} total · {posts.filter(p => p.status === 'published').length} published
          </p>
        </div>
        <Link
          href="/admin/blog/new"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '0.6rem 1rem', borderRadius: '0.5rem', minHeight: 44,
            fontSize: '0.82rem', fontWeight: 600,
            background: GOLD, color: '#fff', textDecoration: 'none',
          }}
        >
          <Plus size={14} aria-hidden="true" />
          New Post
        </Link>
      </div>

      {/* Search */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '0.75rem',
        padding: '0.6rem 1rem', borderRadius: '0.5rem', marginBottom: '1.25rem',
        background: '#fafaf9', border: '1px solid #e8e3d8',
      }}>
        <Search size={14} style={{ color: '#b8b0a0', flexShrink: 0 }} aria-hidden="true" />
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search by title or tag…"
          style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', fontSize: '0.82rem', color: '#1a1814', minHeight: 32 }}
        />
        {query && (
          <button onClick={() => setQuery('')} style={{ fontSize: '0.75rem', color: '#7a7264', cursor: 'pointer', background: 'none', border: 'none' }}>
            Clear
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4rem 1rem', gap: '0.75rem', background: '#fafaf9', border: '1px solid #e8e3d8', borderRadius: '0.75rem' }}>
          <p style={{ color: '#b8b0a0', fontSize: '0.85rem' }}>No posts found</p>
          <Link href="/admin/blog/new" style={{ fontSize: '0.82rem', fontWeight: 600, color: GOLD, textDecoration: 'none' }}>
            + Create your first post
          </Link>
        </div>
      ) : (
        <>
          {/* ── Desktop Table ── */}
          <div className="blog-table-wrap" style={{ background: '#fafaf9', border: '1px solid #e8e3d8', borderRadius: '0.75rem', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #e8e3d8' }}>
                  {['Title', 'Status', 'Tags', 'Updated', 'Actions'].map(h => (
                    <th key={h} style={{
                      padding: '0.75rem 1rem', textAlign: 'left',
                      fontSize: '0.68rem', fontWeight: 600,
                      textTransform: 'uppercase', letterSpacing: '0.1em', color: '#b8b0a0',
                      whiteSpace: 'nowrap',
                    }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((post, i) => (
                  <tr key={post.id} style={{ borderBottom: i < filtered.length - 1 ? '1px solid #ede8de' : 'none' }}>
                    <td style={{ padding: '0.875rem 1rem' }}>
                      <p style={{ fontSize: '0.82rem', fontWeight: 500, color: '#1a1814', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 260, marginBottom: 2 }}>
                        {post.title}
                      </p>
                      <p style={{ fontSize: '0.7rem', color: '#b8b0a0' }}>/{post.slug}</p>
                    </td>
                    <td style={{ padding: '0.875rem 1rem' }}>
                      <StatusBadge status={post.status} />
                    </td>
                    <td style={{ padding: '0.875rem 1rem' }}>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                        {(post.tags ?? []).slice(0, 3).map((tag: string) => (
                          <span key={tag} style={{
                            display: 'inline-flex', alignItems: 'center', gap: 3,
                            padding: '0.15rem 0.5rem', borderRadius: 999, fontSize: '0.68rem',
                            background: '#fdf8ee', border: '1px solid #e8d48a', color: GOLD,
                          }}>
                            <Tag size={8} aria-hidden="true" />{tag}
                          </span>
                        ))}
                        {(post.tags ?? []).length > 3 && (
                          <span style={{ fontSize: '0.68rem', color: '#b8b0a0' }}>+{post.tags.length - 3}</span>
                        )}
                      </div>
                    </td>
                    <td style={{ padding: '0.875rem 1rem' }}>
                      <span style={{ fontSize: '0.75rem', color: '#7a7264', whiteSpace: 'nowrap' }}>
                        {new Date(post.updated_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </span>
                    </td>
                    <td style={{ padding: '0.875rem 1rem' }}>
                      <RowActions post={post} confirmId={confirmId} setConfirmId={setConfirmId} deleting={deleting} isPending={isPending} handleDelete={handleDelete} handleToggle={handleToggle} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ── Mobile Cards ── */}
          <div className="blog-cards-wrap" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {filtered.map((post) => (
              <div key={post.id} style={{
                background: '#fafaf9', border: '1px solid #e8e3d8',
                borderRadius: '0.75rem', padding: '1rem',
              }}>
                {/* Top row — title + status */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1a1814', marginBottom: '0.2rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {post.title}
                    </p>
                    <p style={{ fontSize: '0.7rem', color: '#b8b0a0' }}>/{post.slug}</p>
                  </div>
                  <StatusBadge status={post.status} />
                </div>

                {/* Tags */}
                {(post.tags ?? []).length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: '0.75rem' }}>
                    {(post.tags ?? []).slice(0, 4).map((tag: string) => (
                      <span key={tag} style={{
                        display: 'inline-flex', alignItems: 'center', gap: 3,
                        padding: '0.15rem 0.5rem', borderRadius: 999, fontSize: '0.68rem',
                        background: '#fdf8ee', border: '1px solid #e8d48a', color: GOLD,
                      }}>
                        <Tag size={8} aria-hidden="true" />{tag}
                      </span>
                    ))}
                    {(post.tags ?? []).length > 4 && (
                      <span style={{ fontSize: '0.68rem', color: '#b8b0a0' }}>+{post.tags.length - 4}</span>
                    )}
                  </div>
                )}

                {/* Bottom row — date + actions */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
                  <span style={{ fontSize: '0.72rem', color: '#b8b0a0' }}>
                    {new Date(post.updated_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </span>
                  <RowActions post={post} confirmId={confirmId} setConfirmId={setConfirmId} deleting={deleting} isPending={isPending} handleDelete={handleDelete} handleToggle={handleToggle} />
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <style>{`
        .blog-cards-wrap { display: none; }
        @media (max-width: 768px) {
          .blog-table-wrap { display: none; }
          .blog-cards-wrap { display: flex; }
        }
      `}</style>
    </div>
  )
}

// Extracted so it's reused in both table row and mobile card
function RowActions({ post, confirmId, setConfirmId, deleting, isPending, handleDelete, handleToggle }: {
  post: any
  confirmId: string | null
  setConfirmId: (id: string | null) => void
  deleting: string | null
  isPending: boolean
  handleDelete: (id: string) => void
  handleToggle: (id: string, status: string) => void
}) {
  const actionBtn: React.CSSProperties = {
    width: 36, height: 36, borderRadius: '0.4rem',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: '#f5f3ef', border: '1px solid #e8e3d8',
    color: '#7a7264', cursor: 'pointer', flexShrink: 0,
    transition: 'border-color 150ms, color 150ms',
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
      <Link href={`/admin/blog/edit/${post.id}`} style={{ ...actionBtn, textDecoration: 'none' }} aria-label={`Edit ${post.title}`}>
        <Pencil size={13} aria-hidden="true" />
      </Link>

      <button
        onClick={() => handleToggle(post.id, post.status)}
        disabled={isPending}
        style={{ ...actionBtn, color: post.status === 'published' ? '#16a34a' : '#7a7264' }}
        aria-label={post.status === 'published' ? 'Unpublish' : 'Publish'}
      >
        {post.status === 'published' ? <Eye size={13} aria-hidden="true" /> : <EyeOff size={13} aria-hidden="true" />}
      </button>

      {post.status === 'published' && (
        <a href={`/blog/${post.slug}`} target="_blank" rel="noopener noreferrer" style={{ ...actionBtn, textDecoration: 'none' }} aria-label="View live post">
          <ExternalLink size={13} aria-hidden="true" />
        </a>
      )}

      {confirmId === post.id ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <button
            onClick={() => handleDelete(post.id)}
            disabled={deleting === post.id}
            style={{ padding: '0.35rem 0.6rem', borderRadius: '0.375rem', fontSize: '0.72rem', fontWeight: 600, background: '#fef2f2', color: '#dc2626', border: '1px solid #fca5a5', cursor: 'pointer', minHeight: 36 }}
          >
            {deleting === post.id ? '…' : 'Confirm'}
          </button>
          <button
            onClick={() => setConfirmId(null)}
            style={{ padding: '0.35rem 0.6rem', borderRadius: '0.375rem', fontSize: '0.72rem', color: '#7a7264', border: '1px solid #e8e3d8', background: 'transparent', cursor: 'pointer', minHeight: 36 }}
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          onClick={() => setConfirmId(post.id)}
          style={{ ...actionBtn, color: '#dc2626' }}
          aria-label={`Delete ${post.title}`}
        >
          <Trash2 size={13} aria-hidden="true" />
        </button>
      )}
    </div>
  )
}