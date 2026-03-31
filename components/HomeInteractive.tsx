'use client'

import Link from 'next/link'

export function SkipLink() {
  return (
    <a
      href="#main-content"
      onFocus={(e) => { e.currentTarget.style.left = '1rem' }}
      onBlur={(e) => { e.currentTarget.style.left = '-9999px' }}
      style={{
        position: 'absolute', left: '-9999px', top: 0, zIndex: 999,
        background: '#d4a017', color: '#080808', padding: '0.5rem 1rem',
        fontSize: '0.875rem', borderRadius: '8px',
      }}
    >
      Skip to content
    </a>
  )
}

export function BookNowButton() {
  return (
    <Link
      href="/contact"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.9375rem 2.25rem',
        fontSize: '0.8125rem',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        fontWeight: 700,
        color: '#080808',
        background: 'linear-gradient(135deg, #f5d060, #d4a017, #b8860b)',
        borderRadius: '50px',
        fontFamily: 'Satoshi, Inter, sans-serif',
        boxShadow: '0 0 28px rgba(212,160,23,0.3), 0 4px 20px rgba(0,0,0,0.4)',
        transition: 'box-shadow 250ms ease, transform 250ms ease',
        textDecoration: 'none',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.boxShadow = '0 0 50px rgba(212,160,23,0.55), 0 8px 30px rgba(0,0,0,0.5)'
        el.style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.boxShadow = '0 0 28px rgba(212,160,23,0.3), 0 4px 20px rgba(0,0,0,0.4)'
        el.style.transform = 'translateY(0)'
      }}
    >
      Book a Free Consultation
    </Link>
  )
}

export function ServiceCard({ title, slug, description, tag }: {
  title: string; slug: string; description: string; tag: string | null
}) {
  return (
    <Link
      href={`/services/${slug}`}
      style={{
        display: 'block',
        background: 'rgba(255,255,255,0.025)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '20px',
        padding: '2rem',
        position: 'relative',
        textDecoration: 'none',
        transition: 'background 250ms ease, border-color 250ms ease, transform 250ms ease, box-shadow 250ms ease',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.background = 'rgba(212,160,23,0.06)'
        el.style.borderColor = 'rgba(212,160,23,0.2)'
        el.style.transform = 'translateY(-3px)'
        el.style.boxShadow = '0 12px 40px rgba(0,0,0,0.4), 0 0 20px rgba(212,160,23,0.08)'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.background = 'rgba(255,255,255,0.025)'
        el.style.borderColor = 'rgba(255,255,255,0.06)'
        el.style.transform = 'translateY(0)'
        el.style.boxShadow = 'none'
      }}
    >
      {tag && (
        <span style={{
          position: 'absolute', top: '1.25rem', right: '1.25rem',
          fontSize: '0.625rem', letterSpacing: '0.2em', textTransform: 'uppercase',
          color: '#d4a017', border: '1px solid rgba(212,160,23,0.35)',
          padding: '0.25rem 0.625rem', borderRadius: '50px',
          fontFamily: 'Satoshi, Inter, sans-serif',
          background: 'rgba(212,160,23,0.06)',
        }}>
          {tag}
        </span>
      )}
      <h3 style={{
        fontFamily: 'Cormorant Garamond, Georgia, serif',
        fontSize: 'clamp(1.25rem, 1rem + 0.75vw, 1.625rem)',
        fontWeight: 500, color: '#f0ede8', marginBottom: '0.75rem',
      }}>
        {title}
      </h3>
      <p style={{
        fontSize: 'clamp(0.875rem, 0.8rem + 0.35vw, 1rem)',
        color: 'rgba(240,237,232,0.5)', lineHeight: 1.65,
        fontFamily: 'Satoshi, Inter, sans-serif',
      }}>
        {description}
      </p>
      <span style={{
        display: 'inline-block', marginTop: '1.5rem',
        fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase',
        color: '#d4a017', fontFamily: 'Satoshi, Inter, sans-serif', fontWeight: 600,
      }}>
        Learn More &rarr;
      </span>
    </Link>
  )
}

export function ContactForm() {
  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.875rem 1.125rem',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '12px',
    color: '#f0ede8',
    fontSize: '0.9375rem',
    fontFamily: 'Satoshi, Inter, sans-serif',
    outline: 'none',
    transition: 'border-color 200ms ease, background 200ms ease',
    backdropFilter: 'blur(8px)',
  }
  const labelStyle: React.CSSProperties = {
    display: 'block', fontSize: '0.75rem', letterSpacing: '0.12em',
    textTransform: 'uppercase', color: 'rgba(240,237,232,0.45)',
    marginBottom: '0.5rem', fontFamily: 'Satoshi, Inter, sans-serif',
  }
  const onFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.target.style.borderColor = 'rgba(212,160,23,0.5)'
    e.target.style.background = 'rgba(212,160,23,0.04)'
  }
  const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.target.style.borderColor = 'rgba(255,255,255,0.08)'
    e.target.style.background = 'rgba(255,255,255,0.04)'
  }

  return (
    <form
      action="/api/contact"
      method="POST"
      style={{
        background: 'rgba(255,255,255,0.03)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(212,160,23,0.12)',
        borderRadius: '24px',
        padding: '2.25rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
      }}
    >
      <div>
        <label htmlFor="name" style={labelStyle}>Full Name</label>
        <input id="name" name="name" type="text" required placeholder="Your name" style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
      </div>
      <div>
        <label htmlFor="phone" style={labelStyle}>Phone Number</label>
        <input id="phone" name="phone" type="tel" required placeholder="+971 XX XXX XXXX" style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
      </div>
      <div>
        <label htmlFor="email" style={labelStyle}>Email Address</label>
        <input id="email" name="email" type="email" placeholder="your@email.com" style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
      </div>
      <div>
        <label htmlFor="service" style={labelStyle}>Service Required</label>
        <select id="service" name="service" style={{ ...inputStyle, appearance: 'none', color: 'rgba(240,237,232,0.45)' }} onFocus={onFocus} onBlur={onBlur}>
          <option value="">Select a service</option>
          <option value="window-tinting">Car Window Tinting</option>
          <option value="ceramic-coating">Nano Ceramic Coating</option>
          <option value="ppf">Paint Protection Film (PPF)</option>
          <option value="car-detailing">Car Detailing</option>
          <option value="car-polishing">Car Polishing</option>
          <option value="car-wrapping">Car Wrapping</option>
          <option value="interior-cleaning">Car Interior Cleaning</option>
          <option value="headlight-restoration">Headlight Restoration</option>
          <option value="upholstery">Car Upholstery</option>
          <option value="smart-film">Smart Film</option>
          <option value="marine-tinting">Marine Tinting</option>
          <option value="commercial-tinting">Commercial Window Tinting</option>
          <option value="residential-tinting">Home Glass Tinting</option>
          <option value="vehicle-graphics">Vehicle Graphics</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div>
        <label htmlFor="message" style={labelStyle}>Message (Optional)</label>
        <textarea id="message" name="message" rows={4} placeholder="Vehicle type, your location, any specific requirements..." style={{ ...inputStyle, resize: 'vertical' }} onFocus={onFocus} onBlur={onBlur} />
      </div>
      <button
        type="submit"
        style={{
          width: '100%', padding: '1rem',
          background: 'linear-gradient(135deg, #f5d060, #d4a017)',
          color: '#080808', fontSize: '0.8125rem', letterSpacing: '0.15em',
          textTransform: 'uppercase', fontWeight: 700,
          fontFamily: 'Satoshi, Inter, sans-serif', borderRadius: '50px',
          cursor: 'pointer', border: 'none',
          boxShadow: '0 0 24px rgba(212,160,23,0.2)',
          transition: 'box-shadow 180ms ease, transform 180ms ease',
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement
          el.style.boxShadow = '0 0 40px rgba(212,160,23,0.45)'
          el.style.transform = 'translateY(-1px)'
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement
          el.style.boxShadow = '0 0 24px rgba(212,160,23,0.2)'
          el.style.transform = 'translateY(0)'
        }}
      >
        Submit Booking Request
      </button>
    </form>
  )
}

export function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      style={{
        display: 'block', fontSize: '0.875rem', color: 'rgba(240,237,232,0.35)',
        marginBottom: '0.625rem', fontFamily: 'Satoshi, Inter, sans-serif',
        transition: 'color 150ms ease', textDecoration: 'none',
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#d4a017' }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(240,237,232,0.35)' }}
    >
      {label}
    </Link>
  )
}