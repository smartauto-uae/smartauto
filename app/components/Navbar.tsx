'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const navLinks = [
  { label: 'Services', href: '/services' },
  { label: 'Window Tinting', href: '/services/window-tinting' },
  { label: 'Ceramic Coating', href: '/services/ceramic-coating' },
  { label: 'PPF', href: '/services/ppf' },
  { label: 'Smart Film', href: '/services/smart-film' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      role="banner"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: 'background 300ms ease, border-color 300ms ease',
        background: scrolled
          ? 'rgba(10, 10, 10, 0.96)'
          : 'transparent',
        borderBottom: scrolled
          ? '1px solid rgba(212, 160, 23, 0.12)'
          : '1px solid transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 1.5rem',
          height: '72px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <Link href="/" aria-label="Smart Auto UAE — Home">
          <svg
            width="160"
            height="36"
            viewBox="0 0 160 36"
            fill="none"
            aria-label="Smart Auto UAE logo"
            role="img"
          >
            {/* Abstract car-shield mark */}
            <path
              d="M8 18 L14 8 L22 8 L28 18 L22 28 L14 28 Z"
              stroke="#d4a017"
              strokeWidth="1.2"
              fill="none"
            />
            <path
              d="M14 18 L18 12 L22 18 L18 24 Z"
              fill="#d4a017"
              opacity="0.6"
            />
            {/* Wordmark */}
            <text
              x="38"
              y="21"
              fontFamily="Cormorant Garamond, Georgia, serif"
              fontSize="15"
              fontWeight="600"
              letterSpacing="0.08em"
              fill="#f0ede8"
            >
              SMART AUTO
            </text>
            <text
              x="38"
              y="31"
              fontFamily="Satoshi, Inter, sans-serif"
              fontSize="8"
              fontWeight="400"
              letterSpacing="0.2em"
              fill="#d4a017"
            >
              UAE
            </text>
          </svg>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary navigation" style={{ display: 'flex', gap: '0.25rem' }} className="hidden-mobile">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                padding: '0.5rem 0.875rem',
                fontSize: 'clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: '#9a9590',
                transition: 'color 180ms ease',
                fontFamily: 'Satoshi, Inter, sans-serif',
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.color = '#d4a017'
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.color = '#9a9590'
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <a
            href="tel:+971567269666"
            style={{
              fontSize: '0.8125rem',
              letterSpacing: '0.04em',
              color: '#d4a017',
              fontWeight: 500,
              display: 'none',
            }}
            className="show-desktop"
          >
            056 726 9666
          </a>
          <Link
            href="/contact"
            style={{
              padding: '0.5rem 1.25rem',
              fontSize: '0.8125rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              fontWeight: 600,
              color: '#0a0a0a',
              background: 'linear-gradient(135deg, #f5d060, #d4a017)',
              borderRadius: '2px',
              whiteSpace: 'nowrap',
            }}
          >
            Book Now
          </Link>

          {/* Hamburger */}
          <button
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ color: '#f0ede8', padding: '0.5rem' }}
            className="show-mobile"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              {menuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <>
                  <path d="M3 8h18M3 16h18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav
          aria-label="Mobile navigation"
          style={{
            background: '#111111',
            borderTop: '1px solid rgba(212, 160, 23, 0.12)',
            padding: '1rem 1.5rem 1.5rem',
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'block',
                padding: '0.75rem 0',
                fontSize: '0.9375rem',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: '#9a9590',
                borderBottom: '1px solid rgba(255,255,255,0.04)',
              }}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="tel:+971567269666"
            style={{
              display: 'block',
              marginTop: '1rem',
              fontSize: '1rem',
              color: '#d4a017',
              fontWeight: 600,
            }}
          >
            Call: 056 726 9666
          </a>
        </nav>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-desktop { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
          .show-desktop { display: block !important; }
          .hidden-mobile { display: flex !important; }
        }
      `}</style>
    </header>
  )
}