'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  Loader2, Save, Send, Eye, ArrowLeft, Plus, Trash2, Wand2,
  Image as ImageIcon, X,
} from 'lucide-react'
import { createPost, updatePost } from '@/lib/actions/blog'
import type { BlogPost } from '@/types/blog'
import RichEditor from '@/components/admin/RichEditor'

// ── Theme tokens ──────────────────────────────────────────────────────────────
const GOLD        = '#b8860b'
const GOLD_BG     = '#fdf8ee'
const GOLD_BORDER = '#e8d48a'

const CATEGORIES = [
  'General', 'Window Tinting', 'Smart Film', 'PPF',
  'Ceramic Coating', 'Car Detailing', 'Car Wrapping', 'Marble Protection',
]

const SCHEMA_TEMPLATES: Record<string, string> = {
  Article: JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "",
    "description": "",
    "author": { "@type": "Organization", "name": "Smart Auto UAE" },
    "publisher": {
      "@type": "Organization",
      "name": "Smart Auto UAE",
      "logo": { "@type": "ImageObject", "url": "https://smartautouae.com/logo.png" }
    },
    "datePublished": "",
    "dateModified": "",
    "image": ""
  }, null, 2),
  BlogPosting: JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "",
    "description": "",
    "author": { "@type": "Organization", "name": "Smart Auto UAE" },
    "datePublished": "",
    "image": ""
  }, null, 2),
  FAQPage: JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "Question 1?", "acceptedAnswer": { "@type": "Answer", "text": "Answer 1." } },
      { "@type": "Question", "name": "Question 2?", "acceptedAnswer": { "@type": "Answer", "text": "Answer 2." } }
    ]
  }, null, 2),
  HowTo: JSON.stringify({
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "",
    "description": "",
    "step": [
      { "@type": "HowToStep", "name": "Step 1", "text": "Description of step 1." },
      { "@type": "HowToStep", "name": "Step 2", "text": "Description of step 2." }
    ]
  }, null, 2),
  Service: JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "",
    "description": "",
    "provider": { "@type": "Organization", "name": "Smart Auto UAE" },
    "areaServed": { "@type": "City", "name": "Dubai" },
    "serviceType": ""
  }, null, 2),
  Product: JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "",
    "description": "",
    "brand": { "@type": "Brand", "name": "Smart Auto UAE" }
  }, null, 2),
  NewsArticle: JSON.stringify({
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": "",
    "description": "",
    "datePublished": "",
    "author": { "@type": "Organization", "name": "Smart Auto UAE" }
  }, null, 2),
  Custom: '{\n  "@context": "https://schema.org",\n  "@type": ""\n}',
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function slugify(str: string) {
  return str.toLowerCase().trim()
    .replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '')
}

async function compressToBlob(file: File, maxW = 1200): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const url = URL.createObjectURL(file)
    img.onload = () => {
      let { width, height } = img
      if (width > maxW) { height = Math.round((height * maxW) / width); width = maxW }
      const canvas = document.createElement('canvas')
      canvas.width = width; canvas.height = height
      canvas.getContext('2d')!.drawImage(img, 0, 0, width, height)
      URL.revokeObjectURL(url)
      const tryQ = (q: number) => {
        canvas.toBlob((b) => {
          if (!b) { reject(new Error('Blob failed')); return }
          if (b.size < 200_000 || q <= 0.4) resolve(b)
          else tryQ(Math.round((q - 0.1) * 100) / 100)
        }, 'image/webp', q)
      }
      tryQ(0.85)
    }
    img.onerror = reject
    img.src = url
  })
}

async function uploadToSupabase(blob: Blob, filename: string): Promise<string> {
  const { createClient } = await import('@supabase/supabase-js')
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  const { error } = await supabase.storage
    .from('blog-images')
    .upload(filename, blob, { upsert: true, contentType: 'image/webp' })
  if (error) throw error
  const { data: { publicUrl } } = supabase.storage
    .from('blog-images')
    .getPublicUrl(filename)
  return publicUrl
}

// ── Shared styles ─────────────────────────────────────────────────────────────
const card: React.CSSProperties = {
  background: '#ffffff',
  border: '1px solid #e8e3d8',
  borderRadius: '0.75rem',
  padding: '1.25rem',
}

const labelSt: React.CSSProperties = {
  display: 'block',
  fontSize: '0.65rem',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.14em',
  color: '#7a7264',
  marginBottom: '0.4rem',
}

const inpSt: React.CSSProperties = {
  width: '100%',
  padding: '0.5rem 0.75rem',
  border: '1px solid #e8e3d8',
  borderRadius: '0.4rem',
  fontSize: '0.8rem',
  color: '#1a1814',
  background: '#fafaf9',
  outline: 'none',
  transition: 'border-color 150ms',
}

function CharCount({ value, max }: { value: string; max: number }) {
  const len = value.length
  const color = len > max ? '#dc2626' : len > max - 15 ? GOLD : '#b8b0a0'
  return (
    <span style={{ fontSize: '0.68rem', color, fontVariantNumeric: 'tabular-nums' }}>
      {len}/{max}
    </span>
  )
}

// ── Component ─────────────────────────────────────────────────────────────────
type Mode = 'new' | 'edit'

export default function PostEditor({ mode, post }: { mode: Mode; post?: BlogPost }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [saved,        setSaved]        = useState(false)
  const [preview,      setPreview]      = useState(false)
  const [uploadingImg, setUploadingImg] = useState(false)
  const [uploadingOg,  setUploadingOg]  = useState(false)
  const [error,        setError]        = useState<string | null>(null)

  // ── Fields ──────────────────────────────────────────────────────────────────
  const [title,        setTitle]        = useState(post?.title         ?? '')
  const [slug,         setSlug]         = useState(post?.slug          ?? '')
  const [excerpt,      setExcerpt]      = useState(post?.excerpt       ?? '')
  const [content,      setContent]      = useState(post?.content       ?? '')
  const [coverImage,   setCoverImage]   = useState(post?.cover_image   ?? '')
  const [category,     setCategory]     = useState(post?.category      ?? 'General')
  const [tags,         setTags]         = useState<string[]>(post?.tags ?? [])
  const [tagInput,     setTagInput]     = useState('')
  const [status,       setStatus]       = useState<'draft' | 'published'>(post?.status ?? 'draft')
  const [metaTitle,    setMetaTitle]    = useState(post?.meta_title    ?? '')
  const [metaDesc,     setMetaDesc]     = useState(post?.meta_desc     ?? '')
  const [ogImage,      setOgImage]      = useState(post?.og_image      ?? '')
  const [schemaType,   setSchemaType]   = useState(post?.schema_type   ?? 'Article')
  const [schemaCustom, setSchemaCustom] = useState(post?.schema_custom ?? '')
  const [schemaOpen,   setSchemaOpen]   = useState(false)

  const handleTitleChange = (val: string) => {
    setTitle(val)
    if (mode === 'new') setSlug(slugify(val))
    if (!metaTitle) setMetaTitle(val.slice(0, 60))
  }

  const addTag = () => {
    const t = tagInput.trim().toLowerCase()
    if (t && !tags.includes(t)) setTags(prev => [...prev, t])
    setTagInput('')
  }

  const handleFeaturedImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadingImg(true)
    try {
      const blob = await compressToBlob(file)
      const url  = await uploadToSupabase(blob, `cover-${slug || Date.now()}.webp`)
      setCoverImage(url)
    } catch (err) {
      console.error(err)
      alert('Cover image upload failed.')
    }
    setUploadingImg(false)
    e.target.value = ''
  }

  const handleOgImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadingOg(true)
    try {
      const blob = await compressToBlob(file)
      const url  = await uploadToSupabase(blob, `og-${slug || Date.now()}.webp`)
      setOgImage(url)
    } catch (err) {
      console.error(err)
      alert('OG image upload failed.')
    }
    setUploadingOg(false)
    e.target.value = ''
  }

  const autoFillSEO = () => {
    if (title   && !metaTitle) setMetaTitle(title.slice(0, 60))
    if (excerpt && !metaDesc)  setMetaDesc(excerpt.slice(0, 160))
  }

  // ── Save ─────────────────────────────────────────────────────────────────────
  const save = (publishNow?: boolean) => {
    if (!title.trim())   { setError('Title is required'); return }
    if (!content.trim()) { setError('Content is required'); return }
    setError(null)

    const finalStatus: 'draft' | 'published' = publishNow ? 'published' : status
    const payload = {
      title,
      slug,
      excerpt:       excerpt     || null,
      content:       content     || null,
      cover_image:   coverImage  || null,
      category,
      status:        finalStatus,
      meta_title:    metaTitle   || null,
      meta_desc:     metaDesc    || null,
      og_image:      ogImage     || null,
      tags:          tags.length ? tags : null,
      schema_type:   schemaType  || null,
      schema_custom: schemaCustom || null,
      published_at:  finalStatus === 'published'
        ? (post?.published_at ?? new Date().toISOString())
        : null,
    }

    startTransition(async () => {
      try {
        if (mode === 'new') await createPost(payload)
        else                await updatePost(post!.id, payload)
        setSaved(true)
        setTimeout(() => setSaved(false), 3000)
        if (mode === 'new') router.push('/admin/blog')
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : 'Something went wrong')
      }
    })
  }

  // ── Render ───────────────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: '100vh', background: '#f7f6f2' }}>

      {/* ── Sticky top bar ── */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 40,
        background: 'rgba(255,255,255,0.9)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid #e8e3d8',
        padding: '0 1.5rem',
        height: 56,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Link
            href="/admin/blog"
            aria-label="Back"
            style={{
              width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '1px solid #e8e3d8', color: '#7a7264',
              textDecoration: 'none', background: '#fff',
            }}
          >
            <ArrowLeft size={13} aria-hidden="true" />
          </Link>
          <div>
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1a1814' }}>
              {mode === 'new' ? 'New Post' : 'Edit Post'}
            </span>
            {slug && (
              <span style={{ fontSize: '0.68rem', color: '#b8b0a0', marginLeft: '0.5rem', fontFamily: 'monospace' }}>
                /blog/{slug}
              </span>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            onClick={() => setPreview(v => !v)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              padding: '0.35rem 0.85rem', borderRadius: 999,
              fontSize: '0.75rem', fontWeight: 500, cursor: 'pointer',
              border: '1px solid #e8e3d8', background: preview ? GOLD_BG : '#fff',
              color: preview ? GOLD : '#7a7264',
              borderColor: preview ? GOLD_BORDER : '#e8e3d8',
            }}
          >
            <Eye size={13} aria-hidden="true" />
            {preview ? 'Edit' : 'Preview'}
          </button>

          <button
            onClick={() => save()}
            disabled={isPending}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              padding: '0.35rem 0.85rem', borderRadius: 999,
              fontSize: '0.75rem', fontWeight: 600,
              cursor: isPending ? 'not-allowed' : 'pointer',
              border: '1px solid #e8e3d8', background: '#f5f3ef', color: '#1a1814',
              opacity: isPending ? 0.6 : 1,
            }}
          >
            {isPending
              ? <Loader2 size={13} className="animate-spin" />
              : <Save size={13} aria-hidden="true" />
            }
            {saved ? '✓ Saved' : 'Save'}
          </button>

          {status === 'draft' && (
            <button
              onClick={() => save(true)}
              disabled={isPending}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 5,
                padding: '0.35rem 0.85rem', borderRadius: 999,
                fontSize: '0.75rem', fontWeight: 600,
                cursor: isPending ? 'not-allowed' : 'pointer',
                background: GOLD, border: 'none', color: '#fff',
                opacity: isPending ? 0.6 : 1,
              }}
            >
              <Send size={13} aria-hidden="true" />
              Publish
            </button>
          )}
        </div>
      </header>

      {/* ── Body ── */}
      <main style={{ maxWidth: 1100, margin: '0 auto', padding: '1.5rem' }}>

        {error && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.65rem 1rem', borderRadius: '0.5rem', marginBottom: '1rem',
            background: '#fef2f2', border: '1px solid #fca5a5',
            color: '#dc2626', fontSize: '0.8rem',
          }}>
            {error}
            <button
              onClick={() => setError(null)}
              style={{ marginLeft: 'auto', background: 'none', border: 'none', color: '#dc2626', cursor: 'pointer' }}
              aria-label="Dismiss"
            >
              <X size={13} aria-hidden="true" />
            </button>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '1.25rem', alignItems: 'start' }}>

          {/* ── Main column ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

            {/* Title + slug */}
            <div style={card}>
              <label style={labelSt}>Title *</label>
              <input
                value={title}
                onChange={e => handleTitleChange(e.target.value)}
                placeholder="Your post title…"
                style={{
                  ...inpSt,
                  fontSize: '1.1rem', fontWeight: 700,
                  background: 'transparent', border: 'none', padding: '0',
                  marginBottom: '0.5rem',
                }}
              />
              {slug && (
                <p style={{ fontSize: '0.68rem', color: '#b8b0a0', fontFamily: 'monospace', marginBottom: '0.5rem' }}>
                  /blog/{slug}
                </p>
              )}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                paddingTop: '0.5rem', borderTop: '1px solid #f0ece4',
              }}>
                <label style={{ ...labelSt, marginBottom: 0, whiteSpace: 'nowrap' }}>Slug</label>
                <input
                  value={slug}
                  onChange={e => setSlug(slugify(e.target.value))}
                  readOnly={mode === 'edit'}
                  placeholder="post-slug"
                  style={{ ...inpSt, flex: 1, fontSize: '0.78rem' }}
                />
              </div>
            </div>

            {/* Excerpt */}
            <div style={card}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                <label style={labelSt}>Excerpt</label>
                <CharCount value={excerpt} max={200} />
              </div>
              <textarea
                value={excerpt}
                onChange={e => setExcerpt(e.target.value)}
                rows={2}
                placeholder="Short description for post cards and SEO…"
                style={{ ...inpSt, resize: 'none' }}
              />
            </div>

            {/* ── Rich editor / Preview ── */}
            {preview ? (
              <div style={{ ...card }}>
                <p style={{ ...labelSt, marginBottom: '1rem' }}>Preview</p>
                <div
                  className="prose prose-neutral max-w-none text-sm"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              </div>
            ) : (
              <RichEditor value={content} onChange={setContent} />
            )}

          </div>

          {/* ── Right sidebar ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', position: 'sticky', top: 68 }}>

            {/* Status */}
            <div style={card}>
              <label style={labelSt}>Status</label>
              <select
                value={status}
                onChange={e => setStatus(e.target.value as 'draft' | 'published')}
                style={{
                  ...inpSt,
                  fontWeight: 600,
                  marginBottom: mode === 'edit' && post?.status === 'published' ? '0.75rem' : 0,
                  background: status === 'published' ? '#f0fdf4' : '#fafaf9',
                  color:      status === 'published' ? '#16a34a' : '#7a7264',
                  border: `1px solid ${status === 'published' ? '#86efac' : '#e8e3d8'}`,
                }}
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>

              {mode === 'edit' && post?.status === 'published' && (
                <a
                  href={`/blog/${post.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
                    padding: '0.5rem', borderRadius: '0.4rem', marginTop: '0.75rem',
                    background: '#f5f3ef', border: '1px solid #e8e3d8',
                    color: '#7a7264', fontSize: '0.78rem', textDecoration: 'none',
                  }}
                >
                  <Eye size={13} aria-hidden="true" /> View live post
                </a>
              )}
            </div>

            {/* Post settings */}
            <div style={{ ...card, display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              <p style={labelSt}>Post Settings</p>

              {/* Category */}
              <div>
                <label style={labelSt}>Category</label>
                <select value={category} onChange={e => setCategory(e.target.value)} style={inpSt}>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              {/* Tags */}
              <div>
                <label style={labelSt}>Tags</label>
                <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '0.5rem' }}>
                  <input
                    value={tagInput}
                    onChange={e => setTagInput(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTag() } }}
                    placeholder="Add tag…"
                    style={{ ...inpSt, flex: 1 }}
                  />
                  <button
                    onClick={addTag}
                    aria-label="Add tag"
                    style={{
                      width: 34, height: 34, flexShrink: 0,
                      borderRadius: '0.4rem', cursor: 'pointer',
                      background: GOLD_BG, border: `1px solid ${GOLD_BORDER}`, color: GOLD,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                  >
                    <Plus size={14} aria-hidden="true" />
                  </button>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                  {tags.map(tag => (
                    <span key={tag} style={{
                      display: 'inline-flex', alignItems: 'center', gap: 4,
                      padding: '0.15rem 0.5rem', borderRadius: 999, fontSize: '0.7rem',
                      background: GOLD_BG, border: `1px solid ${GOLD_BORDER}`, color: GOLD,
                    }}>
                      {tag}
                      <button
                        onClick={() => setTags(tags.filter(t => t !== tag))}
                        aria-label={`Remove ${tag}`}
                        style={{ background: 'none', border: 'none', color: GOLD, cursor: 'pointer', padding: 0, lineHeight: 1, fontSize: '0.7rem' }}
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Cover image */}
              <div>
                <label style={labelSt}>Cover Image</label>
                <label style={{
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                  padding: '0.6rem 0.75rem', borderRadius: '0.4rem', cursor: uploadingImg ? 'not-allowed' : 'pointer',
                  border: '1px dashed #e8e3d8', color: '#7a7264', fontSize: '0.78rem',
                  opacity: uploadingImg ? 0.6 : 1,
                }}>
                  {uploadingImg
                    ? <Loader2 size={14} className="animate-spin" />
                    : <ImageIcon size={14} aria-hidden="true" />
                  }
                  {uploadingImg ? 'Uploading…' : coverImage ? 'Change image' : 'Upload — auto WebP compressed'}
                  <input type="file" accept="image/*" style={{ display: 'none' }} disabled={uploadingImg} onChange={handleFeaturedImage} />
                </label>
                {coverImage && (
                  <div style={{ marginTop: '0.5rem', position: 'relative' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={coverImage}
                      alt="Cover preview"
                      style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', borderRadius: '0.4rem', border: '1px solid #e8e3d8' }}
                      onError={e => ((e.target as HTMLImageElement).style.display = 'none')}
                    />
                    <button
                      onClick={() => setCoverImage('')}
                      style={{
                        position: 'absolute', top: 6, right: 6,
                        background: '#fff', border: '1px solid #e8e3d8',
                        borderRadius: '50%', width: 22, height: 22,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer', color: '#dc2626',
                      }}
                      aria-label="Remove cover image"
                    >
                      <Trash2 size={11} aria-hidden="true" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* SEO */}
            <div style={{ ...card, display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <p style={labelSt}>SEO & Open Graph</p>
                <button
                  onClick={autoFillSEO}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 4,
                    padding: '0.2rem 0.6rem', borderRadius: 999,
                    fontSize: '0.68rem', fontWeight: 600,
                    border: '1px solid #e8e3d8', background: '#fafaf9',
                    color: '#7a7264', cursor: 'pointer',
                  }}
                >
                  <Wand2 size={10} aria-hidden="true" /> Auto-fill
                </button>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                  <label style={labelSt}>Meta Title</label>
                  <CharCount value={metaTitle} max={60} />
                </div>
                <input
                  value={metaTitle}
                  onChange={e => setMetaTitle(e.target.value)}
                  placeholder={title || 'SEO title…'}
                  style={inpSt}
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                  <label style={labelSt}>Meta Description</label>
                  <CharCount value={metaDesc} max={160} />
                </div>
                <textarea
                  value={metaDesc}
                  onChange={e => setMetaDesc(e.target.value)}
                  rows={3}
                  placeholder="SEO description…"
                  style={{ ...inpSt, resize: 'none' }}
                />
              </div>

              {/* OG Image upload */}
              <div>
                <label style={labelSt}>OG Image (1200×630px)</label>
                <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                  <input
                    value={ogImage}
                    onChange={e => setOgImage(e.target.value)}
                    placeholder="https://… or upload →"
                    style={{ ...inpSt, flex: 1 }}
                  />
                  <label style={{
                    flexShrink: 0, display: 'flex', alignItems: 'center', gap: 4,
                    padding: '0.45rem 0.65rem', borderRadius: '0.4rem',
                    cursor: uploadingOg ? 'not-allowed' : 'pointer',
                    border: `1px solid ${GOLD_BORDER}`, background: GOLD_BG, color: GOLD,
                    fontSize: '0.72rem', fontWeight: 600, whiteSpace: 'nowrap',
                    opacity: uploadingOg ? 0.6 : 1,
                  }}>
                    {uploadingOg
                      ? <Loader2 size={12} className="animate-spin" />
                      : <ImageIcon size={12} aria-hidden="true" />
                    }
                    {uploadingOg ? 'Uploading…' : 'Upload'}
                    <input
                      type="file" accept="image/*"
                      style={{ display: 'none' }}
                      disabled={uploadingOg}
                      onChange={handleOgImage}
                    />
                  </label>
                </div>
                {ogImage && (
                  <div style={{ marginTop: '0.5rem', position: 'relative' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={ogImage} alt="OG preview"
                      style={{ width: '100%', aspectRatio: '1200/630', objectFit: 'cover', borderRadius: '0.4rem', border: '1px solid #e8e3d8' }}
                      onError={e => ((e.target as HTMLImageElement).style.display = 'none')}
                    />
                    <button
                      onClick={() => setOgImage('')}
                      style={{
                        position: 'absolute', top: 6, right: 6,
                        background: '#fff', border: '1px solid #e8e3d8',
                        borderRadius: '50%', width: 22, height: 22,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer', color: '#dc2626',
                      }}
                      aria-label="Remove OG image"
                    >
                      <Trash2 size={11} aria-hidden="true" />
                    </button>
                  </div>
                )}
              </div>

              {(metaTitle || title) && (
                <div style={{
                  background: '#fafaf9', border: '1px solid #e8e3d8',
                  borderRadius: '0.4rem', padding: '0.75rem',
                }}>
                  <p style={{ fontSize: '0.58rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#b8b0a0', marginBottom: '0.35rem' }}>
                    Google Preview
                  </p>
                  <p style={{ fontSize: '0.82rem', fontWeight: 500, color: '#1a6ef5', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {metaTitle || title}
                  </p>
                  <p style={{ fontSize: '0.68rem', color: '#16a34a' }}>
                    smartautouae.com › blog › {slug || 'post-slug'}
                  </p>
                  <p style={{
                    fontSize: '0.7rem', color: '#7a7264', marginTop: 2, lineHeight: 1.5,
                    display: '-webkit-box', WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical', overflow: 'hidden',
                  }}>
                    {metaDesc || excerpt || 'No description set.'}
                  </p>
                </div>
              )}

              {/* Structured Data */}
              <div style={{ borderTop: '1px solid #f0ece4', paddingTop: '0.875rem' }}>
                <button
                  onClick={() => setSchemaOpen(v => !v)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center',
                    justifyContent: 'space-between', background: 'none',
                    border: 'none', cursor: 'pointer', padding: 0,
                  }}
                >
                  <label style={{ ...labelSt, marginBottom: 0, cursor: 'pointer' }}>
                    Structured Data (Schema)
                  </label>
                  <span style={{ fontSize: '0.68rem', color: '#b8b0a0' }}>
                    {schemaOpen ? '▲ Hide' : '▼ Show'}
                  </span>
                </button>

                {schemaOpen && (
                  <div style={{ marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div>
                      <label style={labelSt}>Schema Type</label>
                      <select
                        value={schemaType}
                        onChange={e => {
                          setSchemaType(e.target.value)
                          if (!schemaCustom) setSchemaCustom(SCHEMA_TEMPLATES[e.target.value] ?? '')
                        }}
                        style={inpSt}
                      >
                        <option value="Article">Article</option>
                        <option value="BlogPosting">Blog Posting</option>
                        <option value="NewsArticle">News Article</option>
                        <option value="FAQPage">FAQ Page</option>
                        <option value="HowTo">HowTo</option>
                        <option value="Product">Product</option>
                        <option value="Service">Service</option>
                        <option value="Custom">Custom JSON-LD</option>
                      </select>
                    </div>

                    <button
                      onClick={() => setSchemaCustom(SCHEMA_TEMPLATES[schemaType] ?? '')}
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: 4,
                        padding: '0.3rem 0.75rem', borderRadius: 999, width: 'fit-content',
                        fontSize: '0.68rem', fontWeight: 600, cursor: 'pointer',
                        border: `1px solid ${GOLD_BORDER}`, background: GOLD_BG, color: GOLD,
                      }}
                    >
                      <Wand2 size={10} aria-hidden="true" /> Load template
                    </button>

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                        <label style={labelSt}>JSON-LD Code</label>
                        {schemaCustom && (
                          <button
                            onClick={() => {
                              try { JSON.parse(schemaCustom); alert('✓ Valid JSON') }
                              catch (e: unknown) { alert(`Invalid JSON: ${e instanceof Error ? e.message : 'Parse error'}`) }
                            }}
                            style={{
                              fontSize: '0.65rem', color: '#7a7264', background: 'none',
                              border: '1px solid #e8e3d8', borderRadius: 999,
                              padding: '0.15rem 0.5rem', cursor: 'pointer',
                            }}
                          >
                            Validate
                          </button>
                        )}
                      </div>
                      <textarea
                        value={schemaCustom}
                        onChange={e => setSchemaCustom(e.target.value)}
                        rows={10}
                        spellCheck={false}
                        placeholder={'{\n  "@context": "https://schema.org",\n  "@type": "Article",\n  ...\n}'}
                        style={{
                          ...inpSt,
                          fontFamily: 'ui-monospace, "Cascadia Code", monospace',
                          fontSize: '0.72rem',
                          lineHeight: 1.7,
                          resize: 'vertical',
                        }}
                      />
                      <p style={{ fontSize: '0.65rem', color: '#b8b0a0', marginTop: '0.3rem' }}>
                        Paste or edit raw JSON-LD. Will be injected as{' '}
                        <code style={{ background: '#f5f3ef', padding: '0 3px', borderRadius: 3 }}>
                          {'<script type="application/ld+json">'}
                        </code>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  )
}