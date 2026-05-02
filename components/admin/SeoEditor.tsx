'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { SeoPage } from '@/lib/seo'

const gold     = '#C9A84C'
const goldGrad = 'linear-gradient(135deg,#C9A84C,#E8C96A)'

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
  route:      string
  pageLabel:  string
  initialData: SeoPage | null
}

type Tab = 'basic' | 'og' | 'twitter' | 'schema' | 'advanced'

export default function SeoEditor({ route, pageLabel, initialData }: Props) {
  const init = initialData

  const [tab, setTab] = useState<Tab>('basic')
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

  const [schemaJson, setSchemaJson] = useState(
    init?.structured_data
      ? JSON.stringify(init.structured_data, null, 2)
      : JSON.stringify(SCHEMA_TEMPLATES['LocalBusiness'](route), null, 2)
  )
  const [schemaError, setSchemaError] = useState('')

  const set = (key: string, value: string) => setFields((f) => ({ ...f, [key]: value }))

  const loadTemplate = (type: string) => {
    const fn = SCHEMA_TEMPLATES[type]
    if (fn) {
      setSchemaJson(JSON.stringify(fn(route), null, 2))
      setSchemaError('')
    }
    set('schema_type', type)
  }

  const save = async () => {
    setSaving(true)
    setError('')

    let structured_data = null
    if (schemaJson.trim()) {
      try {
        structured_data = JSON.parse(schemaJson)
        setSchemaError('')
      } catch {
        setSchemaError('Invalid JSON — fix the structured data before saving')
        setSaving(false)
        setTab('schema')
        return
      }
    }

    const res = await fetch(`/api/admin/seo/${encodeURIComponent(route)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...fields, structured_data }),
    })

    if (res.ok) {
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    } else {
      setError('Failed to save. Please try again.')
    }
    setSaving(false)
  }

  const inputStyle: React.CSSProperties = {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '0.75rem',
    color: '#fff',
    padding: '0.75rem 1rem',
    fontSize: '0.875rem',
    width: '100%',
    outline: 'none',
  }

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '10px',
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
    color: 'rgba(255,255,255,0.4)',
    marginBottom: 6,
  }

  const counter = (val: string, max: number) => (
    <span style={{ float: 'right', color: val.length > max ? '#f87171' : 'rgba(255,255,255,0.2)' }}>
      {val.length}/{max}
    </span>
  )

  const tabs: { key: Tab; label: string }[] = [
    { key: 'basic',    label: 'Basic SEO' },
    { key: 'og',       label: 'Open Graph' },
    { key: 'twitter',  label: 'Twitter / X' },
    { key: 'schema',   label: 'Structured Data' },
    { key: 'advanced', label: 'Advanced' },
  ]

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">

      {/* Header */}
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <Link href="/admin/seo" className="text-[11px] no-underline transition-colors"
            style={{ color: 'rgba(255,255,255,0.3)' }}>← All Pages</Link>
          <p className="text-[11px] tracking-[0.3em] uppercase mt-2 mb-1" style={{ color: gold }}>
            SEO Editor
          </p>
          <h1 className="font-bold text-[24px] text-white" style={{ fontFamily: 'var(--font-playfair),serif' }}>
            {pageLabel}
          </h1>
          <code className="text-[12px]" style={{ color: 'rgba(255,255,255,0.3)' }}>{route}</code>
        </div>
        <div className="flex items-center gap-3">
          <a href={route} target="_blank" rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl text-[13px] font-semibold border no-underline"
            style={{ borderColor: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.4)' }}>
            View Page ↗
          </a>
          <button onClick={save} disabled={saving}
            className="px-6 py-2.5 rounded-xl text-[13px] font-bold text-black transition-all"
            style={{ background: saved ? '#4ade80' : goldGrad, opacity: saving ? 0.7 : 1 }}>
            {saving ? 'Saving...' : saved ? '✓ Saved!' : 'Save SEO'}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-5 px-5 py-3 rounded-xl text-[13px]"
          style={{ background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.2)', color: '#f87171' }}>
          {error}
        </div>
      )}

      {/* SERP Preview */}
      <div className="rounded-2xl p-6 mb-6 border"
        style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
        <p className="text-[10px] uppercase tracking-[0.2em] mb-3" style={{ color: 'rgba(255,255,255,0.3)' }}>
          Google Search Preview
        </p>
        <div style={{ fontFamily: 'Arial,sans-serif' }}>
          <div className="text-[12px] mb-0.5" style={{ color: 'rgba(255,255,255,0.3)' }}>
            smartautouae.ae{route}
          </div>
          <div className="text-[18px] font-medium mb-1" style={{ color: '#8ab4f8' }}>
            {fields.title || <em style={{ opacity: 0.4 }}>Page title not set</em>}
          </div>
          <div className="text-[13px] leading-snug" style={{ color: '#bdc1c6', maxWidth: 560 }}>
            {fields.description || <em style={{ opacity: 0.4 }}>Meta description not set</em>}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 flex-wrap">
        {tabs.map((t) => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className="px-4 py-2 rounded-xl text-[12px] font-semibold transition-all"
            style={{
              background: tab === t.key ? 'rgba(201,168,76,0.1)' : 'rgba(255,255,255,0.03)',
              border: `1px solid ${tab === t.key ? 'rgba(201,168,76,0.3)' : 'rgba(255,255,255,0.07)'}`,
              color: tab === t.key ? gold : 'rgba(255,255,255,0.4)',
            }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="rounded-2xl p-7 border flex flex-col gap-5"
        style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>

        {/* ── BASIC SEO ── */}
        {tab === 'basic' && <>
          <div>
            <label style={labelStyle}>Title Tag {counter(fields.title, 60)}</label>
            <input style={inputStyle} value={fields.title}
              onChange={(e) => set('title', e.target.value)}
              placeholder="Car Window Tinting Dubai | Smart Auto UAE" />
            <p className="text-[11px] mt-1.5" style={{ color: 'rgba(255,255,255,0.25)' }}>
              Recommended: 50–60 characters. Appears in Google results and browser tabs.
            </p>
          </div>
          <div>
            <label style={labelStyle}>Meta Description {counter(fields.description, 160)}</label>
            <textarea style={{ ...inputStyle, resize: 'none', lineHeight: 1.6 }} rows={3}
              value={fields.description} onChange={(e) => set('description', e.target.value)}
              placeholder="Premium car window tinting in Dubai. 3M and TotalGard films. UAE RTA compliant. 5-year warranty. 4 branches..." />
            <p className="text-[11px] mt-1.5" style={{ color: 'rgba(255,255,255,0.25)' }}>
              Recommended: 150–160 characters. Shown below the title in search results.
            </p>
          </div>
          <div>
            <label style={labelStyle}>Keywords (comma separated)</label>
            <input style={inputStyle} value={fields.keywords}
              onChange={(e) => set('keywords', e.target.value)}
              placeholder="car window tinting dubai, 3m window film uae, window tint dubai" />
          </div>
        </>}

        {/* ── OPEN GRAPH ── */}
        {tab === 'og' && <>
          <div className="text-[12px] px-4 py-3 rounded-xl" style={{ background: 'rgba(201,168,76,0.05)', border: '1px solid rgba(201,168,76,0.15)', color: 'rgba(255,255,255,0.5)' }}>
            Open Graph tags control how your page appears when shared on WhatsApp, Facebook, LinkedIn, etc. Leave blank to inherit from Basic SEO.
          </div>
          <div>
            <label style={labelStyle}>OG Title {counter(fields.og_title, 60)}</label>
            <input style={inputStyle} value={fields.og_title}
              onChange={(e) => set('og_title', e.target.value)}
              placeholder={fields.title || 'Inherits from title if blank'} />
          </div>
          <div>
            <label style={labelStyle}>OG Description {counter(fields.og_description, 160)}</label>
            <textarea style={{ ...inputStyle, resize: 'none', lineHeight: 1.6 }} rows={3}
              value={fields.og_description} onChange={(e) => set('og_description', e.target.value)}
              placeholder={fields.description || 'Inherits from description if blank'} />
          </div>
          <div>
            <label style={labelStyle}>OG Image URL</label>
            <input style={inputStyle} value={fields.og_image}
              onChange={(e) => set('og_image', e.target.value)}
              placeholder="/images/og/car-tinting.webp or https://..." />
            <p className="text-[11px] mt-1.5" style={{ color: 'rgba(255,255,255,0.25)' }}>
              Recommended size: 1200×630px. Use an absolute URL or /public path.
            </p>
            {fields.og_image && (
              <img src={fields.og_image} alt="OG preview" className="mt-3 rounded-xl w-full object-cover"
                style={{ maxHeight: 200 }}
                onError={(e) => ((e.target as HTMLImageElement).style.display = 'none')} />
            )}
          </div>
          <div>
            <label style={labelStyle}>OG Type</label>
            <select style={{ ...inputStyle, colorScheme: 'dark' }} value={fields.og_type}
              onChange={(e) => set('og_type', e.target.value)}>
              <option value="website">website</option>
              <option value="article">article</option>
              <option value="business.business">business.business</option>
            </select>
          </div>
        </>}

        {/* ── TWITTER ── */}
        {tab === 'twitter' && <>
          <div className="text-[12px] px-4 py-3 rounded-xl" style={{ background: 'rgba(201,168,76,0.05)', border: '1px solid rgba(201,168,76,0.15)', color: 'rgba(255,255,255,0.5)' }}>
            Twitter / X card tags. Leave blank to fall back to Open Graph values.
          </div>
          <div>
            <label style={labelStyle}>Twitter Card Type</label>
            <select style={{ ...inputStyle, colorScheme: 'dark' }} value={fields.twitter_card}
              onChange={(e) => set('twitter_card', e.target.value)}>
              <option value="summary_large_image">summary_large_image (recommended)</option>
              <option value="summary">summary</option>
            </select>
          </div>
          <div>
            <label style={labelStyle}>Twitter Title {counter(fields.twitter_title, 70)}</label>
            <input style={inputStyle} value={fields.twitter_title}
              onChange={(e) => set('twitter_title', e.target.value)}
              placeholder={fields.og_title || fields.title || 'Inherits from OG / title'} />
          </div>
          <div>
            <label style={labelStyle}>Twitter Description {counter(fields.twitter_description, 200)}</label>
            <textarea style={{ ...inputStyle, resize: 'none', lineHeight: 1.6 }} rows={3}
              value={fields.twitter_description} onChange={(e) => set('twitter_description', e.target.value)}
              placeholder={fields.og_description || fields.description || 'Inherits from OG / description'} />
          </div>
          <div>
            <label style={labelStyle}>Twitter Image URL</label>
            <input style={inputStyle} value={fields.twitter_image}
              onChange={(e) => set('twitter_image', e.target.value)}
              placeholder={fields.og_image || '/images/og/default.webp'} />
          </div>
        </>}

        {/* ── STRUCTURED DATA ── */}
        {tab === 'schema' && <>
          <div>
            <label style={labelStyle}>Schema Type — Load Template</label>
            <div className="flex flex-wrap gap-2">
              {Object.keys(SCHEMA_TEMPLATES).map((type) => (
                <button key={type} onClick={() => loadTemplate(type)}
                  className="px-3 py-1.5 rounded-lg text-[12px] font-semibold border transition-all"
                  style={{
                    borderColor: fields.schema_type === type ? 'rgba(201,168,76,0.4)' : 'rgba(255,255,255,0.08)',
                    color: fields.schema_type === type ? gold : 'rgba(255,255,255,0.4)',
                    background: fields.schema_type === type ? 'rgba(201,168,76,0.08)' : 'transparent',
                  }}>
                  {type}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label style={labelStyle}>
              JSON-LD Structured Data
              {schemaError && <span style={{ color: '#f87171', float: 'right', textTransform: 'none', fontSize: 11 }}>{schemaError}</span>}
            </label>
            <textarea
              value={schemaJson}
              onChange={(e) => { setSchemaJson(e.target.value); setSchemaError('') }}
              style={{
                ...inputStyle,
                fontFamily: "'Fira Code',monospace",
                fontSize: 12,
                lineHeight: 1.7,
                resize: 'vertical',
                minHeight: 380,
                borderColor: schemaError ? 'rgba(248,113,113,0.4)' : 'rgba(255,255,255,0.08)',
              }}
            />
            <p className="text-[11px] mt-1.5" style={{ color: 'rgba(255,255,255,0.25)' }}>
              Valid JSON-LD. Will be injected as{' '}
              <code style={{ color: gold }}>{`<script type="application/ld+json">`}</code> in the page head.
            </p>
          </div>
        </>}

        {/* ── ADVANCED ── */}
        {tab === 'advanced' && <>
          <div>
            <label style={labelStyle}>Canonical URL</label>
            <input style={inputStyle} value={fields.canonical}
              onChange={(e) => set('canonical', e.target.value)}
              placeholder={`https://smartautouae.ae${route}`} />
            <p className="text-[11px] mt-1.5" style={{ color: 'rgba(255,255,255,0.25)' }}>
              Use this to prevent duplicate content issues. Usually the full URL of this page.
            </p>
          </div>
          <div>
            <label style={labelStyle}>Robots</label>
            <select style={{ ...inputStyle, colorScheme: 'dark' }} value={fields.robots}
              onChange={(e) => set('robots', e.target.value)}>
              <option value="index, follow">index, follow (default — recommended)</option>
              <option value="noindex, follow">noindex, follow</option>
              <option value="index, nofollow">index, nofollow</option>
              <option value="noindex, nofollow">noindex, nofollow (block from Google)</option>
            </select>
          </div>
        </>}
      </div>

      {/* Bottom save */}
      <div className="flex justify-end mt-6">
        <button onClick={save} disabled={saving}
          className="px-8 py-3 rounded-xl text-[14px] font-bold text-black"
          style={{ background: saved ? '#4ade80' : goldGrad, opacity: saving ? 0.7 : 1 }}>
          {saving ? 'Saving...' : saved ? '✓ Saved to Supabase!' : 'Save SEO Changes'}
        </button>
      </div>
    </div>
  )
}