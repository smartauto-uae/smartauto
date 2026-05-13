'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { Upload, Loader2, X } from 'lucide-react'
import type { SeoPage } from '@/lib/seo'

const gold       = '#b8860b'
const goldBg     = '#fdf8ee'
const goldBorder = '#e8d48a'

const SCHEMA_TEMPLATES: Record<string, (route: string) => Record<string, unknown>> = {
  LocalBusiness: (route) => ({
    '@context': 'https://schema.org',
    '@type': 'AutoRepair',
    name: 'Smart Auto UAE',
    url: `https://smartautouae.ae${route}`,
    telephone: '+971524403677',
    address: { '@type': 'PostalAddress', addressLocality: 'Dubai', addressCountry: 'AE' },
    priceRange: '$$',
  }),
  Service: (route) => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: '',
    provider: { '@type': 'AutoRepair', name: 'Smart Auto UAE', url: 'https://smartautouae.ae' },
    areaServed: { '@type': 'City', name: 'Dubai' },
    url: `https://smartautouae.ae${route}`,
  }),
  FAQPage: () => ({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'Question here?', acceptedAnswer: { '@type': 'Answer', text: 'Answer here.' } },
    ],
  }),
  BreadcrumbList: (route) => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://smartautouae.ae' },
      { '@type': 'ListItem', position: 2, name: 'Service', item: `https://smartautouae.ae${route}` },
    ],
  }),
  Article: (route) => ({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: '',
    author: { '@type': 'Organization', name: 'Smart Auto UAE' },
    publisher: { '@type': 'Organization', name: 'Smart Auto UAE', logo: { '@type': 'ImageObject', url: 'https://smartautouae.ae/images/logo.png' } },
    url: `https://smartautouae.ae${route}`,
  }),
}

type Props = {
  route:       string
  pageLabel:   string
  initialData: SeoPage | null
}

type Tab = 'basic' | 'og' | 'twitter' | 'schema' | 'advanced'

// ── Shared styles ─────────────────────────────────────────────────────────────
const inputSt: React.CSSProperties = {
  width: '100%', padding: '0.6rem 0.875rem',
  border: '1px solid #e8e3d8', borderRadius: '0.5rem',
  fontSize: '0.875rem', color: '#1a1814',
  background: '#fafaf9', outline: 'none',
}

const labelSt: React.CSSProperties = {
  display: 'block', fontSize: '0.65rem', fontWeight: 700,
  textTransform: 'uppercase', letterSpacing: '0.14em',
  color: '#7a7264', marginBottom: '0.4rem',
}

const cardSt: React.CSSProperties = {
  background: '#ffffff', border: '1px solid #e8e3d8',
  borderRadius: '0.75rem', padding: '1.5rem',
  display: 'flex', flexDirection: 'column', gap: '1.25rem',
}

const hintSt: React.CSSProperties = {
  fontSize: '0.7rem', color: '#b8b0a0', marginTop: '0.3rem',
}

// ── Image compressor ──────────────────────────────────────────────────────────
async function compressToWebP(file: File, targetW = 1200): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const url = URL.createObjectURL(file)
    img.onload = () => {
      let { width, height } = img
      if (width > targetW) { height = Math.round((height * targetW) / width); width = targetW }
      const canvas = document.createElement('canvas')
      canvas.width = width; canvas.height = height
      canvas.getContext('2d')!.drawImage(img, 0, 0, width, height)
      const tryQ = (q: number) => {
        const d = canvas.toDataURL('image/webp', q)
        const bytes = Math.round((d.length * 3) / 4)
        if (bytes < 200_000 || q <= 0.4) { URL.revokeObjectURL(url); resolve(d) }
        else tryQ(Math.round((q - 0.1) * 100) / 100)
      }
      tryQ(0.85)
    }
    img.onerror = reject
    img.src = url
  })
}

// ── Image upload field ────────────────────────────────────────────────────────
function ImageField({
  label, value, onChange, hint,
}: {
  label: string
  value: string
  onChange: (val: string) => void
  hint?: string
}) {
  const [uploading, setUploading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const webp = await compressToWebP(file)
      onChange(webp)
    } catch {
      alert('Image compression failed.')
    }
    setUploading(false)
    e.target.value = ''
  }

  return (
    <div>
      <label style={labelSt}>{label}</label>

      {/* URL input + upload button row */}
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <input
          style={{ ...inputSt, flex: 1 }}
          value={value.startsWith('data:') ? '(uploaded image)' : value}
          readOnly={value.startsWith('data:')}
          onChange={e => onChange(e.target.value)}
          placeholder="https://… or upload →"
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          title="Upload image"
          style={{
            flexShrink: 0,
            display: 'flex', alignItems: 'center', gap: 5,
            padding: '0.55rem 0.875rem',
            borderRadius: '0.5rem',
            fontSize: '0.75rem', fontWeight: 600,
            cursor: uploading ? 'not-allowed' : 'pointer',
            border: `1px solid ${goldBorder}`,
            background: goldBg, color: gold,
            whiteSpace: 'nowrap',
            opacity: uploading ? 0.6 : 1,
          }}
        >
          {uploading
            ? <Loader2 size={13} className="animate-spin" />
            : <Upload size={13} aria-hidden="true" />
          }
          {uploading ? 'Uploading…' : 'Upload'}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleFile}
        />
      </div>

      {hint && <p style={hintSt}>{hint}</p>}

      {/* Preview */}
      {value && (
        <div style={{ marginTop: '0.625rem', position: 'relative', display: 'inline-block', width: '100%' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt="Preview"
            style={{
              width: '100%', maxHeight: 200,
              objectFit: 'cover', borderRadius: '0.5rem',
              border: '1px solid #e8e3d8', display: 'block',
            }}
            onError={e => ((e.target as HTMLImageElement).style.display = 'none')}
          />
          <button
            type="button"
            onClick={() => onChange('')}
            aria-label="Remove image"
            style={{
              position: 'absolute', top: 6, right: 6,
              width: 24, height: 24, borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: '#fff', border: '1px solid #e8e3d8',
              cursor: 'pointer', color: '#dc2626',
            }}
          >
            <X size={12} aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
export default function SeoEditor({ route, pageLabel, initialData }: Props) {
  const init = initialData

  const [tab,    setTab]    = useState<Tab>('basic')
  const [saving, setSaving] = useState(false)
  const [saved,  setSaved]  = useState(false)
  const [error,  setError]  = useState('')

  const [fields, setFields] = useState({
    title:               init?.title               ?? '',
    description:         init?.description         ?? '',
    keywords:            init?.keywords            ?? '',
    og_title:            init?.og_title            ?? '',
    og_description:      init?.og_description      ?? '',
    og_image:            init?.og_image            ?? '',
    og_type:             init?.og_type             ?? 'website',
    twitter_card:        init?.twitter_card        ?? 'summary_large_image',
    twitter_title:       init?.twitter_title       ?? '',
    twitter_description: init?.twitter_description ?? '',
    twitter_image:       init?.twitter_image       ?? '',
    canonical:           init?.canonical           ?? `https://smartautouae.ae${route}`,
    robots:              init?.robots              ?? 'index, follow',
    schema_type:         init?.schema_type         ?? 'LocalBusiness',
  })

  const [schemaJson,  setSchemaJson]  = useState(
    init?.structured_data
      ? JSON.stringify(init.structured_data, null, 2)
      : JSON.stringify(SCHEMA_TEMPLATES['LocalBusiness'](route), null, 2)
  )
  const [schemaError, setSchemaError] = useState('')

  const set = (key: string, value: string) => setFields(f => ({ ...f, [key]: value }))

  const loadTemplate = (type: string) => {
    const fn = SCHEMA_TEMPLATES[type]
    if (fn) { setSchemaJson(JSON.stringify(fn(route), null, 2)); setSchemaError('') }
    set('schema_type', type)
  }

  const save = async () => {
    setSaving(true); setError('')
    let structured_data = null
    if (schemaJson.trim()) {
      try { structured_data = JSON.parse(schemaJson); setSchemaError('') }
      catch { setSchemaError('Invalid JSON — fix before saving'); setSaving(false); setTab('schema'); return }
    }
    const res = await fetch(`/api/admin/seo/${encodeURIComponent(route)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...fields, structured_data }),
    })
    if (res.ok) { setSaved(true); setTimeout(() => setSaved(false), 2500) }
    else setError('Failed to save. Please try again.')
    setSaving(false)
  }

  const counter = (val: string, max: number) => (
    <span style={{ float: 'right', fontSize: '0.68rem', color: val.length > max ? '#dc2626' : '#b8b0a0', fontVariantNumeric: 'tabular-nums' }}>
      {val.length}/{max}
    </span>
  )

  const infoBox = (text: string) => (
    <div style={{ padding: '0.65rem 0.875rem', borderRadius: '0.5rem', background: goldBg, border: `1px solid ${goldBorder}`, fontSize: '0.78rem', color: '#7a7264' }}>
      {text}
    </div>
  )

  const tabs: { key: Tab; label: string }[] = [
    { key: 'basic',    label: 'Basic SEO' },
    { key: 'og',       label: 'Open Graph' },
    { key: 'twitter',  label: 'Twitter / X' },
    { key: 'schema',   label: 'Structured Data' },
    { key: 'advanced', label: 'Advanced' },
  ]

  return (
    <div style={{ maxWidth: 860, margin: '0 auto', padding: '2.5rem 1.5rem' }}>

      {/* ── Header ── */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
        <div>
          <Link href="/admin/seo" style={{ fontSize: '0.72rem', color: '#b8b0a0', textDecoration: 'none' }}>
            ← All Pages
          </Link>
          <p style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.18em', color: gold, marginTop: '0.75rem', marginBottom: '0.25rem' }}>
            SEO Editor
          </p>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1a1814', fontFamily: 'var(--font-playfair),serif', marginBottom: '0.25rem' }}>
            {pageLabel}
          </h1>
          <code style={{ fontSize: '0.75rem', color: '#b8b0a0' }}>{route}</code>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <a href={route} target="_blank" rel="noopener noreferrer"
            style={{ padding: '0.5rem 1rem', borderRadius: 999, fontSize: '0.78rem', fontWeight: 500, border: '1px solid #e8e3d8', color: '#7a7264', background: '#fff', textDecoration: 'none' }}>
            View Page ↗
          </a>
          <button onClick={save} disabled={saving}
            style={{
              padding: '0.5rem 1.25rem', borderRadius: 999,
              fontSize: '0.82rem', fontWeight: 700, border: 'none', cursor: saving ? 'not-allowed' : 'pointer',
              background: saved ? '#16a34a' : gold,
              color: '#fff', opacity: saving ? 0.7 : 1,
            }}>
            {saving ? 'Saving…' : saved ? '✓ Saved!' : 'Save SEO'}
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div style={{ marginBottom: '1rem', padding: '0.65rem 1rem', borderRadius: '0.5rem', background: '#fef2f2', border: '1px solid #fca5a5', color: '#dc2626', fontSize: '0.82rem' }}>
          {error}
        </div>
      )}

      {/* ── SERP Preview ── */}
      <div style={{ background: '#ffffff', border: '1px solid #e8e3d8', borderRadius: '0.75rem', padding: '1.25rem', marginBottom: '1.25rem' }}>
        <p style={{ fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#b8b0a0', marginBottom: '0.75rem' }}>
          Google Search Preview
        </p>
        <div style={{ fontFamily: 'Arial, sans-serif' }}>
          <div style={{ fontSize: '0.72rem', color: '#16a34a', marginBottom: 2 }}>
            smartautouae.ae{route}
          </div>
          <div style={{ fontSize: '1.1rem', fontWeight: 500, color: '#1a6ef5', marginBottom: 4 }}>
            {fields.title || <em style={{ color: '#b8b0a0', fontStyle: 'italic' }}>Page title not set</em>}
          </div>
          <div style={{ fontSize: '0.82rem', color: '#4a4a4a', lineHeight: 1.5, maxWidth: 560 }}>
            {fields.description || <em style={{ color: '#b8b0a0', fontStyle: 'italic' }}>Meta description not set</em>}
          </div>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
        {tabs.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            style={{
              padding: '0.4rem 0.875rem', borderRadius: 999,
              fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer',
              background: tab === t.key ? goldBg     : '#ffffff',
              border:     tab === t.key ? `1px solid ${goldBorder}` : '1px solid #e8e3d8',
              color:      tab === t.key ? gold        : '#7a7264',
            }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* ── Tab content ── */}
      <div style={cardSt}>

        {/* BASIC SEO */}
        {tab === 'basic' && <>
          <div>
            <label style={labelSt}>Title Tag {counter(fields.title, 60)}</label>
            <input style={inputSt} value={fields.title} onChange={e => set('title', e.target.value)}
              placeholder="Car Window Tinting Dubai | Smart Auto UAE" />
            <p style={hintSt}>Recommended: 50–60 characters. Appears in Google results and browser tabs.</p>
          </div>
          <div>
            <label style={labelSt}>Meta Description {counter(fields.description, 160)}</label>
            <textarea style={{ ...inputSt, resize: 'none', lineHeight: 1.6 }} rows={3}
              value={fields.description} onChange={e => set('description', e.target.value)}
              placeholder="Premium car window tinting in Dubai. 3M and TotalGard films. UAE RTA compliant. 5-year warranty…" />
            <p style={hintSt}>Recommended: 150–160 characters. Shown below the title in search results.</p>
          </div>
          <div>
            <label style={labelSt}>Keywords (comma separated)</label>
            <input style={inputSt} value={fields.keywords} onChange={e => set('keywords', e.target.value)}
              placeholder="car window tinting dubai, 3m window film uae, window tint dubai" />
          </div>
        </>}

        {/* OPEN GRAPH */}
        {tab === 'og' && <>
          {infoBox('Open Graph tags control how your page appears when shared on WhatsApp, Facebook, LinkedIn, etc. Leave blank to inherit from Basic SEO.')}
          <div>
            <label style={labelSt}>OG Title {counter(fields.og_title, 60)}</label>
            <input style={inputSt} value={fields.og_title} onChange={e => set('og_title', e.target.value)}
              placeholder={fields.title || 'Inherits from title if blank'} />
          </div>
          <div>
            <label style={labelSt}>OG Description {counter(fields.og_description, 160)}</label>
            <textarea style={{ ...inputSt, resize: 'none', lineHeight: 1.6 }} rows={3}
              value={fields.og_description} onChange={e => set('og_description', e.target.value)}
              placeholder={fields.description || 'Inherits from description if blank'} />
          </div>

          {/* ── OG Image with upload ── */}
          <ImageField
            label="OG Image (1200×630px recommended)"
            value={fields.og_image}
            onChange={v => set('og_image', v)}
            hint="Shown when shared on WhatsApp, Facebook, LinkedIn. Compressed to WebP automatically."
          />

          <div>
            <label style={labelSt}>OG Type</label>
            <select style={inputSt} value={fields.og_type} onChange={e => set('og_type', e.target.value)}>
              <option value="website">website</option>
              <option value="article">article</option>
              <option value="business.business">business.business</option>
            </select>
          </div>
        </>}

        {/* TWITTER */}
        {tab === 'twitter' && <>
          {infoBox('Twitter / X card tags. Leave blank to fall back to Open Graph values.')}
          <div>
            <label style={labelSt}>Twitter Card Type</label>
            <select style={inputSt} value={fields.twitter_card} onChange={e => set('twitter_card', e.target.value)}>
              <option value="summary_large_image">summary_large_image (recommended)</option>
              <option value="summary">summary</option>
            </select>
          </div>
          <div>
            <label style={labelSt}>Twitter Title {counter(fields.twitter_title, 70)}</label>
            <input style={inputSt} value={fields.twitter_title} onChange={e => set('twitter_title', e.target.value)}
              placeholder={fields.og_title || fields.title || 'Inherits from OG / title'} />
          </div>
          <div>
            <label style={labelSt}>Twitter Description {counter(fields.twitter_description, 200)}</label>
            <textarea style={{ ...inputSt, resize: 'none', lineHeight: 1.6 }} rows={3}
              value={fields.twitter_description} onChange={e => set('twitter_description', e.target.value)}
              placeholder={fields.og_description || fields.description || 'Inherits from OG / description'} />
          </div>

          {/* ── Twitter Image with upload ── */}
          <ImageField
            label="Twitter Image"
            value={fields.twitter_image}
            onChange={v => set('twitter_image', v)}
            hint="Shown on Twitter/X cards. Falls back to OG image if blank."
          />
        </>}

        {/* STRUCTURED DATA */}
        {tab === 'schema' && <>
          <div>
            <label style={labelSt}>Schema Type — Load Template</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {Object.keys(SCHEMA_TEMPLATES).map(type => (
                <button key={type} onClick={() => loadTemplate(type)}
                  style={{
                    padding: '0.3rem 0.75rem', borderRadius: 999,
                    fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer',
                    background: fields.schema_type === type ? goldBg     : '#fafaf9',
                    border:     fields.schema_type === type ? `1px solid ${goldBorder}` : '1px solid #e8e3d8',
                    color:      fields.schema_type === type ? gold        : '#7a7264',
                  }}>
                  {type}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label style={labelSt}>
              JSON-LD Structured Data
              {schemaError && <span style={{ color: '#dc2626', float: 'right', textTransform: 'none', fontSize: '0.72rem' }}>{schemaError}</span>}
            </label>
            <textarea
              value={schemaJson}
              onChange={e => { setSchemaJson(e.target.value); setSchemaError('') }}
              style={{
                ...inputSt,
                fontFamily: 'ui-monospace, "Cascadia Code", monospace',
                fontSize: '0.78rem', lineHeight: 1.7,
                resize: 'vertical', minHeight: 360,
                borderColor: schemaError ? '#fca5a5' : '#e8e3d8',
              }}
            />
            <p style={hintSt}>
              Valid JSON-LD. Will be injected as{' '}
              <code style={{ background: '#f5f3ef', padding: '0 4px', borderRadius: 3, color: gold }}>
                {'<script type="application/ld+json">'}
              </code>
            </p>
          </div>
        </>}

        {/* ADVANCED */}
        {tab === 'advanced' && <>
          <div>
            <label style={labelSt}>Canonical URL</label>
            <input style={inputSt} value={fields.canonical} onChange={e => set('canonical', e.target.value)}
              placeholder={`https://smartautouae.ae${route}`} />
            <p style={hintSt}>Prevents duplicate content issues. Usually the full URL of this page.</p>
          </div>
          <div>
            <label style={labelSt}>Robots</label>
            <select style={inputSt} value={fields.robots} onChange={e => set('robots', e.target.value)}>
              <option value="index, follow">index, follow (default — recommended)</option>
              <option value="noindex, follow">noindex, follow</option>
              <option value="index, nofollow">index, nofollow</option>
              <option value="noindex, nofollow">noindex, nofollow (block from Google)</option>
            </select>
          </div>
        </>}

      </div>

      {/* Bottom save */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.25rem' }}>
        <button onClick={save} disabled={saving}
          style={{
            padding: '0.65rem 2rem', borderRadius: 999,
            fontSize: '0.875rem', fontWeight: 700, border: 'none', cursor: saving ? 'not-allowed' : 'pointer',
            background: saved ? '#16a34a' : gold,
            color: '#fff', opacity: saving ? 0.7 : 1,
          }}>
          {saving ? 'Saving…' : saved ? ' Changes Saved' : 'Save SEO Changes'}
        </button>
      </div>

    </div>
  )
}