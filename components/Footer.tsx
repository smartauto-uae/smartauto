'use client'

import Link from 'next/link'
import { Phone, Mail, MapPin, AtSign, MessageCircle } from 'lucide-react'

const GOLD = '#C9A84C'
const goldGrad = 'linear-gradient(135deg,#C9A84C,#E8C96A,#A07830)'

const services = [
  { label: 'Window Tinting',        href: '/services/window-tinting' },
  { label: 'Paint Protection Film', href: '/services/ppf' },
  { label: 'Ceramic Coating',       href: '/services/ceramic-coating' },
  { label: 'Car Detailing',         href: '/services/car-detailing' },
  { label: 'Car Wrapping',          href: '/services/car-wrapping' },
  { label: 'Car Accessories',       href: '/services/car-accessories' },
]

const company = [
  { label: 'About Us',  href: '/about' },
  { label: 'Gallery',   href: '/gallery' },
  { label: 'Branches',  href: '/#branches' },
  { label: 'FAQ',       href: '/#faq' },
  { label: 'Contact',   href: '/contact' },
]

const branches = [
  'Smart Auto MotorCity · Dubai',
  'Smart Auto Al Quoz · Dubai',
  'Smart Auto Mirdif · Dubai',
  'Smart Auto Sharjah · Central Mall',
]

const socials = [
  { label: 'WhatsApp',  href: 'https://wa.me/971524403677',         icon: MessageCircle },
  { label: 'Instagram', href: 'https://instagram.com/smartautouae', icon: AtSign },
  { label: 'Call',      href: 'tel:+971524403677',                   icon: Phone },
  { label: 'Email',     href: 'mailto:info@smartautouae.ae',         icon: Mail },
]

const brands = ['3M', 'Totalgard', 'XPEL', 'Gyeon', 'Gtechniq', 'IGL Coatings', 'Avery Dennison']

export default function Footer() {
  return (
    <footer role="contentinfo" style={{ background: '#060606', borderTop: '1px solid rgba(201,168,76,0.1)' }}>

      {/* ── UPPER FOOTER ── */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: 'clamp(3rem,6vw,5rem) 1.5rem 3rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(220px,100%),1fr))', gap: '2.5rem', marginBottom: '3rem' }}>

          {/* Brand column */}
          <div style={{ gridColumn: 'span 1' }}>
            {/* Logo mark */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                <polygon points="16,2 30,9 30,23 16,30 2,23 2,9" stroke={GOLD} strokeWidth="1.2" fill="none" />
                <polygon points="16,8 24,12 24,20 16,24 8,20 8,12" fill={GOLD} opacity="0.15" />
                <polygon points="16,11 21,14 21,20 16,22 11,20 11,14" fill={GOLD} opacity="0.5" />
              </svg>
              <div style={{ lineHeight: 1 }}>
                <p style={{ fontFamily: 'var(--font-playfair),serif', fontSize: '1rem', fontWeight: 700, color: '#fff', letterSpacing: '0.06em', marginBottom: 2 }}>
                  SMART AUTO
                </p>
                <p style={{ fontSize: '0.625rem', letterSpacing: '0.25em', textTransform: 'uppercase', background: goldGrad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  UAE
                </p>
              </div>
            </div>

            <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.8, maxWidth: '26ch', marginBottom: 20 }}>
              Dubai &amp; Sharjah&apos;s most trusted car protection centre since 2014. Authorised installer for 3M, Totalgard, XPEL, Gyeon &amp; Gtechniq.
            </p>

            {/* Social icons */}
            <div style={{ display: 'flex', gap: 10 }}>
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={s.label}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 38, height: 38, borderRadius: '0.625rem', background: 'rgba(201,168,76,0.07)', border: '1px solid rgba(201,168,76,0.15)', color: GOLD, textDecoration: 'none', transition: 'all 150ms ease' }}
                  onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(201,168,76,0.15)'; el.style.borderColor = 'rgba(201,168,76,0.4)' }}
                  onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(201,168,76,0.07)'; el.style.borderColor = 'rgba(201,168,76,0.15)' }}
                >
                  <s.icon size={16} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <p style={{ fontSize: '0.625rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)', marginBottom: 16 }}>
              Services
            </p>
            <nav aria-label="Footer services navigation">
              {services.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  style={{ display: 'block', fontSize: '0.875rem', color: 'rgba(255,255,255,0.4)', marginBottom: 10, textDecoration: 'none', transition: 'color 150ms ease' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = GOLD }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.4)' }}
                >
                  {s.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Company */}
          <div>
            <p style={{ fontSize: '0.625rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)', marginBottom: 16 }}>
              Company
            </p>
            <nav aria-label="Footer company navigation">
              {company.map((c) => (
                <Link
                  key={c.href}
                  href={c.href}
                  style={{ display: 'block', fontSize: '0.875rem', color: 'rgba(255,255,255,0.4)', marginBottom: 10, textDecoration: 'none', transition: 'color 150ms ease' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = GOLD }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.4)' }}
                >
                  {c.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Branches & Contact */}
          <div>
            <p style={{ fontSize: '0.625rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)', marginBottom: 16 }}>
              Branches
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
              {branches.map((b) => (
                <div key={b} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                  <MapPin size={13} style={{ color: GOLD, flexShrink: 0, marginTop: 2 }} aria-hidden="true" />
                  <span style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.5 }}>{b}</span>
                </div>
              ))}
            </div>
            <p style={{ fontSize: '0.625rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)', marginBottom: 12 }}>
              Contact
            </p>
            <a href="tel:+971524403677" style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: '0.9375rem', color: GOLD, fontWeight: 600, textDecoration: 'none', marginBottom: 8 }}>
              <Phone size={14} aria-hidden="true" /> +971 52 440 3677
            </a>
            <a href="mailto:info@smartautouae.ae" style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: '0.8125rem', color: 'rgba(255,255,255,0.4)', textDecoration: 'none', transition: 'color 150ms ease' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = GOLD }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.4)' }}>
              <Mail size={13} aria-hidden="true" /> info@smartautouae.ae
            </a>
          </div>

        </div>
        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: 20, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
          <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.22)' }}>
            &copy; {new Date().getFullYear()} Smart Auto UAE · Smart Auto Accessories Fitting LLC. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: 20 }}>
            {['Privacy Policy', 'Terms of Service'].map((t) => (
              <Link key={t} href="#" style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.22)', textDecoration: 'none', transition: 'color 150ms ease' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = GOLD }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.22)' }}>
                {t}
              </Link>
            ))}
          </div>
        </div>
      </div>

    </footer>
  )
}