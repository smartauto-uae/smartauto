'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AdminHeader from './AdminHeader'

const gold     = '#C9A84C'
const goldGrad = 'linear-gradient(135deg,#C9A84C,#E8C96A)'

type Props = {
  mode: 'new' | 'edit'
  initialSlug?: string
  initialContent?: string
  sha?: string
}

const CATEGORIES = [
  'Window Tinting', 'Smart Film', 'PPF', 'Ceramic Coating',
  'Car Detailing', 'Car Wrapping', 'Marble Protection', 'General',
]

function buildFrontmatter(fields: Record<string, string>) {
  return `---
title: "${fields.title}"
description: "${fields.description}"
date: "${fields.date}"
author: "${fields.author || 'Smart Auto UAE'}"
category: "${fields.category}"
tags: [${fields.tags.split(',').map((t) => `"${t.trim()}"`).join(', ')}]
image: "${fields.image || '/images/blog/default.webp'}"
published: ${fields.published === 'true' ? 'true' : 'false'}
---

`
}

function parseFrontmatter(raw: string) {
  const match = raw.match(/^---\n([\s\S]*?)\n---/)
  if (!match) return { fields: {}, body: raw }

  const lines = match[1].split('\n')
  const fields: Record<string, string> = {}
  for (const line of lines) {
    const [key, ...rest] = line.split(':')
    if (key && rest.length) {
      let val = rest.join(':').trim().replace(/^"(.*)"$/, '$1')
      if (val.startsWith('[')) {
        val = val.replace(/^\[|\]$/g, '').split(',').map((s) => s.trim().replace(/^"|"$/g, '')).join(', ')
      }
      fields[key.trim()] = val
    }
  }
  const body = raw.replace(/^---\n[\s\S]*?\n---\n+/, '')
  return { fields, body }
}

export default function PostEditor({ mode, initialSlug = '', initialContent = '', sha }: Props) {
  const router = useRouter()
  const [slug, setSlug] = useState(initialSlug)
  const [body, setBody] = useState('')
  const [sha_, setSha]  = useState(sha ?? '')
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [saved, setSaved]   = useState(false)
  const [error, setError]   = useState('')
  const [tab, setTab] = useState<'write' | 'preview'>('write')

  const [fields, setFields] = useState({
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    author: 'Smart Auto UAE',
    category: 'Window Tinting',
    tags: '',
    image: '',
    published: 'true',
  })

  // Parse initial content on edit
  useEffect(() => {
    if (initialContent) {
      const { fields: f, body: b } = parseFrontmatter(initialContent)
      setFields((prev) => ({ ...prev, ...f }))
      setBody(b)
    }
  }, [initialContent])

  // Auto-generate slug from title
  useEffect(() => {
    if (mode === 'new' && fields.title) {
      setSlug(
        fields.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
      )
    }
  }, [fields.title, mode])

  const fullContent = buildFrontmatter(fields) + body

  const save = async () => {
    if (!slug || !body) { setError('Slug and content are required'); return }
    setSaving(true)
    setError('')

    if (mode === 'new') {
      const res = await fetch('/api/admin/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, content: fullContent }),
      })
      if (res.ok) {
        setSaved(true)
        setTimeout(() => router.push('/admin'), 1200)
      } else {
        const d = await res.json()
        setError(d.error ?? 'Failed to save')
      }
    } else {
      const res = await fetch(`/api/admin/posts/${slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: fullContent, sha: sha_ }),
      })
      if (res.ok) {
        // Refresh sha after update
        const fresh = await fetch(`/api/admin/posts/${slug}`)
        if (fresh.ok) { const d = await fresh.json(); setSha(d.sha) }
        setSaved(true)
        setTimeout(() => setSaved(false), 2500)
      } else {
        setError('Failed to update')
      }
    }
    setSaving(false)
  }

  const deletePost = async () => {
    if (!confirm(`Delete "${slug}"? This cannot be undone.`)) return
    setDeleting(true)
    const res = await fetch(`/api/admin/posts/${slug}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sha: sha_ }),
    })
    if (res.ok) {
      router.push('/admin')
    } else {
      setError('Failed to delete')
      setDeleting(false)
    }
  }

  const inputStyle = {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '0.75rem',
    color: '#fff',
    padding: '0.75rem 1rem',
    fontSize: '0.875rem',
    width: '100%',
    outline: 'none',
  }

  const labelStyle = {
    display: 'block',
    fontSize: '10px',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.15em',
    color: 'rgba(255,255,255,0.4)',
    marginBottom: '6px',
  }

  return (
    <main style={{ backgroundColor: '#080808', minHeight: '100vh', color: '#fff' }}>
      <AdminHeader />

      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* Top bar */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <p className="text-[11px] tracking-[0.3em] uppercase mb-1" style={{ color: gold }}>
              {mode === 'new' ? 'New Post' : 'Edit Post'}
            </p>
            <h1
              className="font-bold text-[24px] text-white"
              style={{ fontFamily: 'var(--font-playfair),serif' }}
            >
              {mode === 'new' ? 'Create Blog Post' : slug}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {mode === 'edit' && (
              <button
                onClick={deletePost}
                disabled={deleting}
                className="px-5 py-2.5 rounded-xl text-[13px] font-semibold border transition-all"
                style={{
                  borderColor: 'rgba(248,113,113,0.3)',
                  color: '#f87171',
                  background: 'rgba(248,113,113,0.05)',
                }}
              >
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            )}
            <button
              onClick={save}
              disabled={saving}
              className="px-6 py-2.5 rounded-xl text-[13px] font-bold text-black transition-opacity"
              style={{ background: saved ? '#4ade80' : goldGrad, opacity: saving ? 0.7 : 1 }}
            >
              {saving ? 'Saving...' : saved ? '✓ Saved!' : mode === 'new' ? 'Publish Post' : 'Save Changes'}
            </button>
          </div>
        </div>

        {error && (
          <div
            className="mb-6 px-5 py-3 rounded-xl text-[13px]"
            style={{ background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.2)', color: '#f87171' }}
          >
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6">

          {/* LEFT — editor */}
          <div className="flex flex-col gap-5">

            {/* Slug */}
            <div
              className="rounded-2xl p-6 border"
              style={{ border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}
            >
              <label style={labelStyle}>URL Slug</label>
              <div className="flex items-center gap-2">
                <span className="text-[13px]" style={{ color: 'rgba(255,255,255,0.3)' }}>/blog/</span>
                <input
                  style={{ ...inputStyle, flex: 1 }}
                  value={slug}
                  onChange={(e) => mode === 'new' && setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))}
                  readOnly={mode === 'edit'}
                  placeholder="my-blog-post-slug"
                />
              </div>
            </div>

            {/* Rich text editor area */}
            <div
              className="rounded-2xl border overflow-hidden"
              style={{ border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}
            >
              {/* Tab bar */}
              <div
                className="flex items-center gap-1 px-4 pt-4 pb-0"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
              >
                {(['write', 'preview'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className="px-4 py-2 text-[12px] font-semibold capitalize rounded-t-lg transition-all"
                    style={{
                      color:      tab === t ? '#fff'                        : 'rgba(255,255,255,0.3)',
                      background: tab === t ? 'rgba(255,255,255,0.05)'      : 'transparent',
                      borderBottom: tab === t ? `2px solid ${gold}` : '2px solid transparent',
                    }}
                  >
                    {t}
                  </button>
                ))}

                {/* Toolbar (write only) */}
                {tab === 'write' && (
                  <div className="ml-auto flex items-center gap-1 pb-1">
                    {[
                      { label: 'B', action: () => insertMd('**', '**', 'bold text') },
                      { label: 'I', action: () => insertMd('*', '*', 'italic text') },
                      { label: 'H2', action: () => insertMd('\n## ', '', 'Heading') },
                      { label: 'H3', action: () => insertMd('\n### ', '', 'Heading') },
                      { label: '—', action: () => insertMd('\n> ', '', 'Blockquote text') },
                      { label: '• List', action: () => insertMd('\n- ', '', 'List item') },
                      { label: 'Link', action: () => insertMd('[', '](https://)', 'link text') },
                      { label: 'Img', action: () => insertMd('![', '](/images/)', 'alt text') },
                    ].map((btn) => (
                      <button
                        key={btn.label}
                        onClick={btn.action}
                        className="px-2.5 py-1 rounded text-[11px] font-bold transition-all"
                        style={{
                          color: gold,
                          background: 'rgba(201,168,76,0.07)',
                          border: '1px solid rgba(201,168,76,0.15)',
                        }}
                        title={btn.label}
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {tab === 'write' ? (
                <textarea
                  id="body-editor"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Write your blog post in Markdown / MDX...

## Getting Started

Your content here..."
                  className="w-full resize-none outline-none font-mono text-[13px] leading-[1.8]"
                  style={{
                    background: 'transparent',
                    color: 'rgba(255,255,255,0.8)',
                    padding: '1.25rem 1.5rem',
                    minHeight: '500px',
                    caretColor: gold,
                  }}
                />
              ) : (
                <div
                  className="p-6 mdx-content"
                  style={{ minHeight: '500px', color: 'rgba(255,255,255,0.7)' }}
                  dangerouslySetInnerHTML={{
                    __html: renderMarkdownPreview(body),
                  }}
                />
              )}
            </div>
          </div>

          {/* RIGHT — SEO + meta fields */}
          <div className="flex flex-col gap-5">

            {/* Publish status */}
            <div
              className="rounded-2xl p-6 border"
              style={{ border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}
            >
              <label style={labelStyle}>Status</label>
              <div className="flex gap-2">
                {[
                  { val: 'true', label: 'Published', color: '#4ade80' },
                  { val: 'false', label: 'Draft', color: 'rgba(255,255,255,0.3)' },
                ].map((s) => (
                  <button
                    key={s.val}
                    onClick={() => setFields({ ...fields, published: s.val })}
                    className="flex-1 py-2 rounded-xl text-[12px] font-semibold border transition-all"
                    style={{
                      borderColor: fields.published === s.val ? s.color : 'rgba(255,255,255,0.08)',
                      color:       fields.published === s.val ? s.color : 'rgba(255,255,255,0.3)',
                      background:  fields.published === s.val ? `${s.color}10` : 'transparent',
                    }}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* SEO fields */}
            <div
              className="rounded-2xl p-6 border flex flex-col gap-4"
              style={{ border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}
            >
              <p
                className="text-[11px] tracking-[0.2em] uppercase font-semibold"
                style={{ color: gold }}
              >
                SEO &amp; Metadata
              </p>

              {/* Title */}
              <div>
                <label style={labelStyle}>
                  Title
                  <span style={{ color: fields.title.length > 60 ? '#f87171' : 'rgba(255,255,255,0.2)', float: 'right' }}>
                    {fields.title.length}/60
                  </span>
                </label>
                <input
                  style={inputStyle}
                  value={fields.title}
                  onChange={(e) => setFields({ ...fields, title: e.target.value })}
                  placeholder="SEO-optimised post title"
                  maxLength={80}
                />
              </div>

              {/* Description */}
              <div>
                <label style={labelStyle}>
                  Meta Description
                  <span style={{ color: fields.description.length > 160 ? '#f87171' : 'rgba(255,255,255,0.2)', float: 'right' }}>
                    {fields.description.length}/160
                  </span>
                </label>
                <textarea
                  style={{ ...inputStyle, resize: 'none', lineHeight: 1.6 }}
                  rows={3}
                  value={fields.description}
                  onChange={(e) => setFields({ ...fields, description: e.target.value })}
                  placeholder="Compelling meta description (150-160 chars)"
                  maxLength={200}
                />
              </div>

              {/* Category */}
              <div>
                <label style={labelStyle}>Category</label>
                <select
                  style={{ ...inputStyle, colorScheme: 'dark' }}
                  value={fields.category}
                  onChange={(e) => setFields({ ...fields, category: e.target.value })}
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Tags */}
              <div>
                <label style={labelStyle}>Tags (comma separated)</label>
                <input
                  style={inputStyle}
                  value={fields.tags}
                  onChange={(e) => setFields({ ...fields, tags: e.target.value })}
                  placeholder="window tinting, dubai, uv protection"
                />
              </div>

              {/* Date */}
              <div>
                <label style={labelStyle}>Publish Date</label>
                <input
                  type="date"
                  style={{ ...inputStyle, colorScheme: 'dark' }}
                  value={fields.date}
                  onChange={(e) => setFields({ ...fields, date: e.target.value })}
                />
              </div>

              {/* Author */}
              <div>
                <label style={labelStyle}>Author</label>
                <input
                  style={inputStyle}
                  value={fields.author}
                  onChange={(e) => setFields({ ...fields, author: e.target.value })}
                  placeholder="Smart Auto UAE"
                />
              </div>

              {/* OG Image */}
              <div>
                <label style={labelStyle}>Featured Image Path</label>
                <input
                  style={inputStyle}
                  value={fields.image}
                  onChange={(e) => setFields({ ...fields, image: e.target.value })}
                  placeholder="/images/blog/my-post.webp"
                />
                {fields.image && (
                  <img
                    src={fields.image}
                    alt="preview"
                    className="mt-2 rounded-xl w-full object-cover"
                    style={{ height: 120 }}
                    onError={(e) => ((e.target as HTMLImageElement).style.display = 'none')}
                  />
                )}
              </div>
            </div>

            {/* Raw MDX preview */}
            <details
              className="rounded-2xl border overflow-hidden"
              style={{ border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <summary
                className="px-5 py-4 cursor-pointer text-[12px] font-semibold"
                style={{ color: 'rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.02)' }}
              >
                Raw MDX Output
              </summary>
              <pre
                className="p-5 text-[11px] leading-[1.7] overflow-auto"
                style={{ color: 'rgba(255,255,255,0.4)', maxHeight: 300 }}
              >
                {fullContent}
              </pre>
            </details>
          </div>
        </div>
      </div>
    </main>
  )

  function insertMd(before: string, after: string, placeholder: string) {
    const ta = document.getElementById('body-editor') as HTMLTextAreaElement
    if (!ta) return
    const start = ta.selectionStart
    const end   = ta.selectionEnd
    const sel   = body.slice(start, end) || placeholder
    const next  = body.slice(0, start) + before + sel + after + body.slice(end)
    setBody(next)
    setTimeout(() => {
      ta.focus()
      ta.setSelectionRange(start + before.length, start + before.length + sel.length)
    }, 10)
  }
}

// Very basic markdown → html for preview (no extra deps)
function renderMarkdownPreview(md: string): string {
  return md
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>[\s\S]*?<\/li>)/g, '<ul>$1</ul>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank">$1</a>')
    .replace(/!\[(.+?)\]\((.+?)\)/g, '<img src="$2" alt="$1" style="border-radius:8px;max-width:100%;margin:12px 0">')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<[h|u|b|l|i|a|p])(.+)$/gm, '<p>$1</p>')
}