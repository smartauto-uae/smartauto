'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Phone, Menu, X, ChevronDown } from 'lucide-react'

const GOLD = '#C9A84C'
const goldGrad = 'linear-gradient(135deg,#C9A84C,#E8C96A,#A07830)'

const navLinks = [
  { label: 'Home', href: '/' },
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'Window Tinting',        href: '/services/window-tinting' },
      { label: 'Paint Protection Film', href: '/services/paint-protection-films' },
      { label: 'Nano Ceramic Coating',  href: '/services/nano-ceramic-coating' },
      { label: 'Car Detailing',         href: '/services/car-detailing' },
      { label: 'Car Wrapping',          href: '/services/car-wrapping' },
      { label: 'Commercial Tinting',    href: '/services/commercial-window-tinting' },
      { label: 'Smart Film',    href: '/services/smart-film' },
      { label: 'Marine Tinting',        href: '/services/marine-window-tinting' },
      { label: 'Residential Tinting',   href: '/services/residential-window-tinting' },
    ],
  },
  { label: 'About',    href: '/about' },
  { label: 'FAQ',      href: '/faq' },
  { label: 'Branches', href: '/#branches' },
  { label: 'Contact',  href: '/contact-us' },
]

export default function Navbar() {
  const [scrolled,     setScrolled]     = useState(false)
  const [mobileOpen,   setMobileOpen]   = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [isDesktop,    setIsDesktop]    = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    setIsDesktop(mq.matches)
    const handler = (e: MediaQueryListEvent) => {
      setIsDesktop(e.matches)
      if (e.matches) {
        setMobileOpen(false)
        setServicesOpen(false)
      }
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const closeMobile = () => {
    setMobileOpen(false)
    setServicesOpen(false)
  }

  return (
    <>
      <header
        role="banner"
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 200,
          transition: 'background 300ms ease, border-color 300ms ease',
          background: scrolled || mobileOpen ? 'rgba(5,5,5,0.98)' : 'transparent',
          borderBottom: scrolled ? '1px solid rgba(201,168,76,0.12)' : '1px solid transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
        }}
      >
        <div
          style={{
            maxWidth: 1280, margin: '0 auto',
            padding: '0 1.25rem',
            height: 68,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}
        >

          {/* ── LOGO ── */}
          <Link
            href="/"
            onClick={closeMobile}
            style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0 }}
          >
            <Image
              src="/logo.png"
              alt="Smart Auto UAE — Window Tinting, PPF and Ceramic Coating Dubai"
              width={130}
              height={40}
              priority
              style={{ height: 40, width: 'auto', objectFit: 'contain' }}
            />
          </Link>

          {/* ── DESKTOP NAV ── only rendered on lg+ ── */}
          {isDesktop && (
            <nav
              aria-label="Primary navigation"
              style={{ display: 'flex', alignItems: 'center', gap: 2 }}
            >
              {navLinks.map((link) =>
                link.children ? (
                  <div
                    key={link.label}
                    style={{ position: 'relative' }}
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    <button
                      aria-expanded={dropdownOpen}
                      aria-haspopup="true"
                      style={{
                        display: 'flex', alignItems: 'center', gap: 4,
                        padding: '0.5rem 0.875rem',
                        fontSize: '0.8125rem', letterSpacing: '0.04em',
                        color: 'rgba(255,255,255,0.6)',
                        background: 'none', border: 'none', cursor: 'pointer',
                        transition: 'color 150ms ease',
                        fontFamily: 'var(--font-inter),sans-serif',
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = GOLD }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.6)' }}
                    >
                      {link.label}
                      <ChevronDown
                        size={13}
                        style={{
                          transition: 'transform 200ms',
                          transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        }}
                      />
                    </button>

                    {dropdownOpen && (
                      <div
                        role="menu"
                        style={{
                          position: 'absolute', top: 'calc(100% + 8px)', left: 0,
                          minWidth: 240,
                          background: 'rgba(10,10,10,0.98)',
                          border: '1px solid rgba(201,168,76,0.15)',
                          borderRadius: 12, padding: '0.5rem',
                          backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
                          boxShadow: '0 16px 48px rgba(0,0,0,0.6)',
                        }}
                      >
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            role="menuitem"
                            onClick={() => setDropdownOpen(false)}
                            style={{
                              display: 'flex', alignItems: 'center', gap: 10,
                              padding: '0.6rem 0.875rem',
                              fontSize: '0.8125rem',
                              color: 'rgba(255,255,255,0.55)',
                              borderRadius: 8,
                              textDecoration: 'none',
                              transition: 'all 150ms ease',
                              fontFamily: 'var(--font-inter),sans-serif',
                            }}
                            onMouseEnter={(e) => {
                              const el = e.currentTarget as HTMLElement
                              el.style.color = GOLD
                              el.style.background = 'rgba(201,168,76,0.08)'
                            }}
                            onMouseLeave={(e) => {
                              const el = e.currentTarget as HTMLElement
                              el.style.color = 'rgba(255,255,255,0.55)'
                              el.style.background = 'transparent'
                            }}
                          >
                            <span
                              style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(201,168,76,0.4)', flexShrink: 0 }}
                              aria-hidden="true"
                            />
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
                    style={{
                      padding: '0.5rem 0.875rem',
                      fontSize: '0.8125rem', letterSpacing: '0.04em',
                      color: 'rgba(255,255,255,0.6)',
                      textDecoration: 'none',
                      transition: 'color 150ms ease',
                      fontFamily: 'var(--font-inter),sans-serif',
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = GOLD }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.6)' }}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>
          )}

          {/* ── DESKTOP CTA ── only rendered on lg+ ── */}
          {isDesktop && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <a
                href="tel:+971524403677"
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  fontSize: '0.8125rem', color: GOLD, fontWeight: 500,
                  textDecoration: 'none', letterSpacing: '0.04em',
                  transition: 'opacity 150ms ease',
                }}
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
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  padding: '0.5rem 1.25rem',
                  fontSize: '0.8125rem', fontWeight: 700,
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                  color: '#000', background: goldGrad,
                  borderRadius: 8, textDecoration: 'none',
                  transition: 'opacity 200ms ease, box-shadow 200ms ease',
                  boxShadow: '0 0 20px rgba(201,168,76,0.2)',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.opacity = '0.9'
                  el.style.boxShadow = '0 0 32px rgba(201,168,76,0.4)'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.opacity = '1'
                  el.style.boxShadow = '0 0 20px rgba(201,168,76,0.2)'
                }}
              >
                Book Now
              </a>
            </div>
          )}

          {/* ── HAMBURGER ── only rendered on mobile ── */}
          {!isDesktop && (
            <button
              type="button"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: 44, height: 44,
                color: mobileOpen ? GOLD : '#fff',
                background: mobileOpen ? 'rgba(201,168,76,0.08)' : 'none',
                border: mobileOpen ? '1px solid rgba(201,168,76,0.2)' : 'none',
                borderRadius: 10,
                cursor: 'pointer', flexShrink: 0,
                transition: 'all 200ms ease',
              }}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          )}

        </div>
      </header>

      {/* ── MOBILE BACKDROP ── */}
      {mobileOpen && !isDesktop && (
        <div
          onClick={closeMobile}
          style={{
            position: 'fixed', inset: 0, zIndex: 150,
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
          }}
          aria-hidden="true"
        />
      )}

      {/* ── MOBILE DRAWER ── */}
      {!isDesktop && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          aria-hidden={!mobileOpen}
          style={{
            position: 'fixed',
            top: 68, left: 0, right: 0,
            zIndex: 190,
            maxHeight: mobileOpen ? 'calc(100dvh - 68px)' : 0,
            overflow: 'hidden',
            transition: 'max-height 380ms cubic-bezier(0.16,1,0.3,1)',
            background: '#080808',
            borderBottom: mobileOpen ? '1px solid rgba(201,168,76,0.12)' : 'none',
            boxShadow: mobileOpen ? '0 24px 48px rgba(0,0,0,0.6)' : 'none',
          }}
        >
          <div
            style={{
              overflowY: 'auto',
              maxHeight: 'calc(100dvh - 68px)',
              padding: '20px 20px 32px',
              display: 'flex', flexDirection: 'column',
            }}
          >

            {/* Quick contact row */}
            <div
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '12px 16px', marginBottom: 16,
                borderRadius: 12,
                background: 'rgba(201,168,76,0.05)',
                border: '1px solid rgba(201,168,76,0.1)',
              }}
            >
              <div>
                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 2 }}>
                  Need help?
                </p>
                <a
                  href="tel:+971524403677"
                  style={{ fontSize: '0.875rem', color: GOLD, fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}
                >
                  <Phone size={13} aria-hidden="true" />
                  +971 52 440 3677
                </a>
              </div>
              <a
                href="https://wa.me/971524403677"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '8px 14px',
                  fontSize: '0.75rem', fontWeight: 700,
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                  color: '#000', background: goldGrad,
                  borderRadius: 8, textDecoration: 'none',
                  whiteSpace: 'nowrap',
                }}
              >
                Book Now
              </a>
            </div>

            {/* Nav links */}
            <nav aria-label="Mobile navigation links">
              {navLinks.map((link) =>
                link.children ? (
                  <div key={link.label}>
                    <button
                      onClick={() => setServicesOpen((v) => !v)}
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        width: '100%', padding: '14px 0',
                        fontSize: '1rem', fontWeight: 600,
                        color: servicesOpen ? GOLD : 'rgba(255,255,255,0.8)',
                        background: 'none', border: 'none', cursor: 'pointer',
                        borderBottom: '1px solid rgba(255,255,255,0.05)',
                        fontFamily: 'var(--font-inter),sans-serif',
                        letterSpacing: '0.02em', textAlign: 'left',
                        transition: 'color 150ms ease',
                      }}
                    >
                      {link.label}
                      <span
                        style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          width: 28, height: 28, borderRadius: 8, flexShrink: 0,
                          background: servicesOpen ? 'rgba(201,168,76,0.12)' : 'rgba(255,255,255,0.04)',
                          border: servicesOpen ? '1px solid rgba(201,168,76,0.25)' : '1px solid rgba(255,255,255,0.07)',
                          transition: 'all 200ms ease',
                        }}
                      >
                        <ChevronDown
                          size={14}
                          style={{
                            color: servicesOpen ? GOLD : 'rgba(255,255,255,0.4)',
                            transition: 'transform 300ms ease',
                            transform: servicesOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                          }}
                        />
                      </span>
                    </button>

                    <div
                      style={{
                        maxHeight: servicesOpen ? '500px' : 0,
                        overflow: 'hidden',
                        transition: 'max-height 350ms cubic-bezier(0.16,1,0.3,1)',
                      }}
                    >
                      <div
                        style={{
                          display: 'grid', gridTemplateColumns: '1fr 1fr',
                          gap: 6, padding: '10px 0 14px',
                        }}
                      >
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={closeMobile}
                            style={{
                              display: 'flex', alignItems: 'center', gap: 7,
                              padding: '10px 12px',
                              fontSize: '0.8125rem',
                              color: 'rgba(255,255,255,0.55)',
                              textDecoration: 'none',
                              borderRadius: 10,
                              background: 'rgba(255,255,255,0.03)',
                              border: '1px solid rgba(255,255,255,0.05)',
                              fontFamily: 'var(--font-inter),sans-serif',
                              lineHeight: 1.35,
                            }}
                          >
                            <span
                              style={{ width: 4, height: 4, borderRadius: '50%', background: GOLD, flexShrink: 0, opacity: 0.6 }}
                              aria-hidden="true"
                            />
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMobile}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '14px 0',
                      fontSize: '1rem', fontWeight: 500,
                      color: 'rgba(255,255,255,0.75)',
                      textDecoration: 'none',
                      borderBottom: '1px solid rgba(255,255,255,0.05)',
                      fontFamily: 'var(--font-inter),sans-serif',
                      letterSpacing: '0.02em',
                    }}
                  >
                    {link.label}
                    <span style={{ fontSize: 18, color: 'rgba(255,255,255,0.15)' }} aria-hidden="true">›</span>
                  </Link>
                )
              )}
            </nav>

            {/* Bottom CTAs */}
            <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
              <a
                href="https://wa.me/971524403677"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  padding: '14px',
                  fontSize: '0.875rem', fontWeight: 700,
                  letterSpacing: '0.06em', textTransform: 'uppercase',
                  color: '#000', background: goldGrad,
                  borderRadius: 12, textDecoration: 'none',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </a>
              <a
                href="tel:+971524403677"
                style={{
                  flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  padding: '14px',
                  fontSize: '0.875rem', fontWeight: 600,
                  color: GOLD,
                  border: '1px solid rgba(201,168,76,0.3)',
                  borderRadius: 12, textDecoration: 'none',
                  background: 'rgba(201,168,76,0.05)',
                }}
              >
                <Phone size={15} aria-hidden="true" /> Call Us
              </a>
            </div>

          </div>
        </div>
      )}
    </>
  )
}