'use client'

import { useEffect, useState } from 'react'
import { List, ChevronDown } from 'lucide-react'

interface Heading {
  id:    string
  text:  string
  level: number
}

export default function TableOfContents({ content }: { content: string }) {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string>('')
  const [expanded, setExpanded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Parse headings from HTML content
  useEffect(() => {
    const parser = new DOMParser()
    const doc    = parser.parseFromString(content, 'text/html')
    const nodes  = Array.from(doc.querySelectorAll('h2, h3'))

    const parsed: Heading[] = nodes.map((node, i) => {
      const text  = node.textContent ?? ''
      const id    = node.id || `heading-${i}-${text.toLowerCase().replace(/[^\w]+/g, '-')}`
      const level = parseInt(node.tagName[1])
      return { id, text, level }
    })

    setHeadings(parsed)
  }, [content])

  // Inject IDs into rendered article headings
  useEffect(() => {
    if (!headings.length) return
    const article = document.querySelector('article.blog-content')
    if (!article) return
    const nodes = Array.from(article.querySelectorAll('h2, h3'))
    nodes.forEach((node, i) => {
      if (headings[i]) node.id = headings[i].id
    })
  }, [headings])

  // Highlight active heading on scroll
  useEffect(() => {
    if (!headings.length) return

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        })
      },
      { rootMargin: '0px 0px -70% 0px', threshold: 0 }
    )

    headings.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [headings])

  if (headings.length < 2) return null

  const collapsible = isMobile
  const showNav     = !collapsible || expanded

  return (
    <div style={{
      borderRadius: '0.75rem',
      border: '1px solid #e8d48a',
      background: '#fff',
      boxShadow: '0 1px 4px rgba(184,134,11,0.06)',
      overflow: 'hidden',
      marginBottom: '2rem',
    }}>

      {/* Header */}
      <button
        type="button"
        onClick={() => collapsible && setExpanded(v => !v)}
        aria-expanded={collapsible ? expanded : undefined}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.875rem 1.25rem',
          borderBottom: showNav ? '1px solid #e8d48a' : 'none',
          background: 'linear-gradient(135deg, #b8860b, #d4a017, #c9920c)',
          cursor: collapsible ? 'pointer' : 'default',
          border: 'none',
          textAlign: 'left',
        }}
      >
        <List size={13} aria-hidden="true" style={{ color: 'rgba(255,255,255,0.85)', flexShrink: 0 }} />
        <span style={{
          fontSize: '0.65rem', fontWeight: 700,
          textTransform: 'uppercase', letterSpacing: '0.18em',
          color: '#fff', flex: 1,
        }}>
          Table of Contents
        </span>
        {collapsible && (
          <ChevronDown
            size={15}
            aria-hidden="true"
            style={{
              color: 'rgba(255,255,255,0.8)',
              flexShrink: 0,
              transition: 'transform 200ms',
              transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
          />
        )}
      </button>

      {/* Nav */}
      {showNav && (
        <nav aria-label="Table of contents" style={{ padding: '1rem 1.25rem' }}>
          <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
            {headings.map(({ id, text, level }) => (
              <li key={id} style={{ paddingLeft: level === 3 ? '1rem' : 0 }}>
                <a
                  href={`#${id}`}
                  onClick={e => {
                    e.preventDefault()
                    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    setActiveId(id)
                    if (collapsible) setExpanded(false)
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.5rem',
                    padding: '0.25rem 0.4rem',
                    borderRadius: '0.375rem',
                    textDecoration: 'none',
                    fontSize: '0.8rem',
                    lineHeight: 1.45,
                    transition: 'all 150ms',
                    fontWeight:  activeId === id ? 600 : 400,
                    color:       activeId === id ? '#b8860b' : '#7a7264',
                    background:  activeId === id ? '#fdf8ee' : 'transparent',
                  }}
                >
                  <span style={{
                    marginTop: '0.45rem',
                    flexShrink: 0,
                    borderRadius: '50%',
                    width:      level === 2 ? 6 : 4,
                    height:     level === 2 ? 6 : 4,
                    background: activeId === id ? '#b8860b' : '#d4cfc7',
                    transition: 'background 150ms',
                  }} />
                  {text}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      )}
    </div>
  )
}