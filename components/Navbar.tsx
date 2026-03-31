'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Phone, Menu, X, ChevronDown } from 'lucide-react'

const GOLD = '#C9A84C'
const goldGrad = 'linear-gradient(135deg,#C9A84C,#E8C96A,#A07830)'

const navLinks = [
  { label: 'Home', href: '/' },
  {
    label: 'Services',
    href: '#services',
    children: [
      { label: 'Window Tinting',        href: '/services/window-tinting' },
      { label: 'Paint Protection Film', href: '/services/ppf' },
      { label: 'Ceramic Coating',       href: '/services/ceramic-coating' },
      { label: 'Car Detailing',         href: '/services/car-detailing' },
      { label: 'Car Wrapping',          href: '/services/car-wrapping' },
      { label: 'Car Accessories',       href: '/services/car-accessories' },
    ],
  },
  { label: 'About',    href: '/about' },
  { label: 'Gallery',  href: '/gallery' },
  { label: 'Branches', href: '/#branches' },
  { label: 'FAQ',      href: '/#faq' },
  { label: 'Contact',  href: '/contact' },
]

export default function Navbar() {
  const [scrolled,     setScrolled]     = useState(false)
  const [mobileOpen,   setMobileOpen]   = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change / resize
  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <header
        role="banner"
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 100,
          transition: 'background 300ms ease, border-color 300ms ease, backdrop-filter 300ms ease',
          background: scrolled ? 'rgba(5,5,5,0.96)' : 'transparent',
          borderBottom: scrolled ? '1px solid rgba(201,168,76,0.12)' : '1px solid transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
        }}
      >
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem', height: 72, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          {/* ── LOGO ── */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', flexShrink: 0 }}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
              <polygon points="16,2 30,9 30,23 16,30 2,23 2,9" stroke={GOLD} strokeWidth="1.2" fill="none" />
              <polygon points="16,8 24,12 24,20 16,24 8,20 8,12" fill={GOLD} opacity="0.15" />
              <polygon points="16,11 21,14 21,20 16,22 11,20 11,14" fill={GOLD} opacity="0.5" />
            </svg>
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
              <span style={{ fontFamily: 'var(--font-playfair),serif', fontSize: '1rem', fontWeight: 700, color: '#fff', letterSpacing: '0.06em' }}>
                SMART AUTO
              </span>
              <span style={{ fontSize: '0.625rem', letterSpacing: '0.25em', textTransform: 'uppercase', background: goldGrad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                UAE
              </span>
            </div>
          </Link>

          {/* ── DESKTOP NAV ── */}
          <nav aria-label="Primary navigation" style={{ display: 'flex', alignItems: 'center', gap: 2 }} className="hidden lg:flex">
            {navLinks.map((link) =>
              link.children ? (
                <div
                  key={link.label}
                  style={{ position: 'relative' }}
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <button
                    style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '0.5rem 0.875rem', fontSize: '0.8125rem', letterSpacing: '0.04em', color: 'rgba(255,255,255,0.6)', background: 'none', border: 'none', cursor: 'pointer', transition: 'color 150ms ease', fontFamily: 'var(--font-inter),sans-serif' }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = GOLD }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.6)' }}
                    aria-expanded={dropdownOpen}
                    aria-haspopup="true"
                  >
                    {link.label}
                    <ChevronDown size={13} style={{ transition: 'transform 200ms', transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0)' }} />
                  </button>

                  {/* Dropdown */}
                  {dropdownOpen && (
                    <div
                      style={{ position: 'absolute', top: 'calc(100% + 8px)', left: 0, minWidth: 220, background: 'rgba(10,10,10,0.98)', border: '1px solid rgba(201,168,76,0.15)', borderRadius: '0.75rem', padding: '0.5rem', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', boxShadow: '0 16px 48px rgba(0,0,0,0.6)' }}
                      role="menu"
                    >
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          role="menuitem"
                          onClick={() => setDropdownOpen(false)}
                          style={{ display: 'block', padding: '0.6rem 0.875rem', fontSize: '0.8125rem', color: 'rgba(255,255,255,0.55)', borderRadius: '0.5rem', textDecoration: 'none', transition: 'all 150ms ease', fontFamily: 'var(--font-inter),sans-serif' }}
                          onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.color = GOLD; el.style.background = 'rgba(201,168,76,0.08)' }}
                          onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.color = 'rgba(255,255,255,0.55)'; el.style.background = 'transparent' }}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{ padding: '0.5rem 0.875rem', fontSize: '0.8125rem', letterSpacing: '0.04em', color: 'rgba(255,255,255,0.6)', textDecoration: 'none', transition: 'color 150ms ease', fontFamily: 'var(--font-inter),sans-serif' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = GOLD }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.6)' }}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* ── DESKTOP CTA ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }} className="hidden lg:flex">
            <a
              href="tel:+971524403677"
              style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8125rem', color: GOLD, fontWeight: 500, textDecoration: 'none', letterSpacing: '0.04em', transition: 'opacity 150ms ease' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = '0.75' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = '1' }}
            >
              <Phone size={13} aria-hidden="true" />
              +971 52 440 3677
            </a>
            <a
              href="https://wa.me/971524403677"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '0.5rem 1.25rem', fontSize: '0.8125rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#000', background: goldGrad, borderRadius: '0.5rem', textDecoration: 'none', transition: 'opacity 200ms ease, box-shadow 200ms ease', boxShadow: '0 0 20px rgba(201,168,76,0.2)', whiteSpace: 'nowrap', fontFamily: 'var(--font-inter),sans-serif' }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.opacity = '0.9'; el.style.boxShadow = '0 0 32px rgba(201,168,76,0.4)' }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.opacity = '1'; el.style.boxShadow = '0 0 20px rgba(201,168,76,0.2)' }}
            >
              Book Now
            </a>
          </div>

          {/* ── HAMBURGER ── */}
          <button
            type="button"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 44, height: 44, color: '#fff', background: 'none', border: 'none', cursor: 'pointer', flexShrink: 0 }}
            className="lg:hidden"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

        </div>
      </header>

      {/* ── MOBILE MENU ── */}
      {mobileOpen && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 99, background: 'rgba(5,5,5,0.98)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', display: 'flex', flexDirection: 'column', paddingTop: 88, paddingBottom: 32, paddingLeft: 24, paddingRight: 24, overflowY: 'auto' }}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          {/* Phone */}
          <a
            href="tel:+971524403677"
            style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.875rem', color: GOLD, fontWeight: 600, textDecoration: 'none', marginBottom: 24, letterSpacing: '0.04em' }}
          >
            <Phone size={15} /> +971 52 440 3677
          </a>

          <div style={{ width: '100%', height: 1, background: 'rgba(201,168,76,0.1)', marginBottom: 24 }} />

          <nav aria-label="Mobile navigation links">
            {navLinks.map((link) => (
              <div key={link.label}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  style={{ display: 'block', padding: '0.875rem 0', fontSize: '1.0625rem', fontWeight: 500, color: 'rgba(255,255,255,0.7)', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.04)', fontFamily: 'var(--font-inter),sans-serif', letterSpacing: '0.02em' }}
                >
                  {link.label}
                </Link>
                {link.children && (
                  <div style={{ paddingLeft: 16, paddingBottom: 8 }}>
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setMobileOpen(false)}
                        style={{ display: 'block', padding: '0.6rem 0', fontSize: '0.875rem', color: 'rgba(255,255,255,0.4)', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.03)', fontFamily: 'var(--font-inter),sans-serif' }}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div style={{ marginTop: 'auto', paddingTop: 32, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <a
              href="https://wa.me/971524403677"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '1rem', fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#000', background: goldGrad, borderRadius: '0.75rem', textDecoration: 'none' }}
            >
              Book on WhatsApp
            </a>
            <a
              href="tel:+971524403677"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '1rem', fontSize: '0.875rem', fontWeight: 600, color: GOLD, border: '1px solid rgba(201,168,76,0.3)', borderRadius: '0.75rem', textDecoration: 'none' }}
            >
              <Phone size={15} /> Call Us Now
            </a>
          </div>
        </div>
      )}
    </>
  )
}