'use client'

import Link from 'next/link'

/* ── SKIP LINK ── */
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="skip-link"
      onFocus={(e) => { e.currentTarget.style.left = '1rem' }}
      onBlur={(e) => { e.currentTarget.style.left = '-9999px' }}
      style={{
        position: 'absolute',
        left: '-9999px',
        top: 0,
        zIndex: 999,
        background: '#d4a017',
        color: '#0a0a0a',
        padding: '0.5rem 1rem',
        fontSize: '0.875rem',
      }}
    >
      Skip to content
    </a>
  )
}

/* ── SERVICE CARD (hover state) ── */
export function ServiceCard({
  title,
  slug,
  description,
  tag,
}: {
  title: string
  slug: string
  description: string
  tag: string | null
}) {
  return (
    <Link
      href={`/services/${slug}`}
      style={{
        display: 'block',
        background: '#0a0a0a',
        padding: '2rem',
        transition: 'background 200ms ease',
        position: 'relative',
        textDecoration: 'none',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.background = '#111111'
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.background = '#0a0a0a'
      }}
    >
      {tag && (
        <span
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            fontSize: '0.625rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#d4a017',
            border: '1px solid rgba(212, 160, 23, 0.3)',
            padding: '0.2rem 0.5rem',
            borderRadius: '2px',
            fontFamily: 'Satoshi, Inter, sans-serif',
          }}
        >
          {tag}
        </span>
      )}
      <h3
        style={{
          fontFamily: 'Cormorant Garamond, Georgia, serif',
          fontSize: 'clamp(1.25rem, 1rem + 0.75vw, 1.625rem)',
          fontWeight: 500,
          color: '#f0ede8',
          marginBottom: '0.75rem',
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontSize: 'clamp(0.875rem, 0.8rem + 0.35vw, 1rem)',
          color: '#9a9590',
          lineHeight: 1.65,
          fontFamily: 'Satoshi, Inter, sans-serif',
        }}
      >
        {description}
      </p>
      <span
        style={{
          display: 'inline-block',
          marginTop: '1.25rem',
          fontSize: '0.75rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: '#d4a017',
          fontFamily: 'Satoshi, Inter, sans-serif',
          fontWeight: 600,
        }}
      >
        Learn More &rarr;
      </span>
    </Link>
  )
}

/* ── BOOK NOW BUTTON (hover glow) ── */
export function BookNowButton() {
  return (
    <Link
      href="/contact"
      style={{
        display: 'inline-block',
        padding: '0.875rem 2rem',
        fontSize: '0.8125rem',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        fontWeight: 700,
        color: '#0a0a0a',
        background: 'linear-gradient(135deg, #f5d060, #d4a017)',
        borderRadius: '2px',
        fontFamily: 'Satoshi, Inter, sans-serif',
        boxShadow: '0 0 24px oklch(0.72 0.15 85 / 0.2)',
        transition: 'box-shadow 200ms ease, transform 200ms ease',
        textDecoration: 'none',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow =
          '0 0 40px oklch(0.72 0.15 85 / 0.45)'
        ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow =
          '0 0 24px oklch(0.72 0.15 85 / 0.2)'
        ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
      }}
    >
      Book a Free Consultation
    </Link>
  )
}

/* ── CONTACT FORM (focus states on inputs) ── */
export function ContactForm() {
  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.75rem 1rem',
    background: '#1a1a1a',
    border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: '2px',
    color: '#f0ede8',
    fontSize: '0.9375rem',
    fontFamily: 'Satoshi, Inter, sans-serif',
    outline: 'none',
    transition: 'border-color 180ms ease',
  }

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '0.75rem',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: '#9a9590',
    marginBottom: '0.5rem',
    fontFamily: 'Satoshi, Inter, sans-serif',
  }

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.target.style.borderColor = 'rgba(212, 160, 23, 0.4)'
  }
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.target.style.borderColor = 'rgba(255,255,255,0.06)'
  }

  return (
    <form
      action="/api/contact"
      method="POST"
      style={{
        background: '#111111',
        border: '1px solid rgba(212, 160, 23, 0.12)',
        padding: '2rem',
        borderRadius: '2px',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
      }}
    >
      <div>
        <label htmlFor="name" style={labelStyle}>Full Name</label>
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder="Your name"
          style={inputStyle}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>

      <div>
        <label htmlFor="phone" style={labelStyle}>Phone Number</label>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          placeholder="+971 XX XXX XXXX"
          style={inputStyle}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>

      <div>
        <label htmlFor="email" style={labelStyle}>Email Address</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="your@email.com"
          style={inputStyle}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>

      <div>
        <label htmlFor="service" style={labelStyle}>Service Required</label>
        <select
          id="service"
          name="service"
          style={{ ...inputStyle, appearance: 'none', color: '#9a9590' }}
          onFocus={handleFocus}
          onBlur={handleBlur}
        >
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
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Vehicle type, your location, any specific requirements..."
          style={{ ...inputStyle, resize: 'vertical' }}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>

      <button
        type="submit"
        style={{
          width: '100%',
          padding: '0.9375rem',
          background: 'linear-gradient(135deg, #f5d060, #d4a017)',
          color: '#0a0a0a',
          fontSize: '0.8125rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          fontWeight: 700,
          fontFamily: 'Satoshi, Inter, sans-serif',
          borderRadius: '2px',
          cursor: 'pointer',
          border: 'none',
          transition: 'box-shadow 180ms ease',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow =
            '0 0 32px oklch(0.72 0.15 85 / 0.3)'
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow = 'none'
        }}
      >
        Submit Booking Request
      </button>
    </form>
  )
}

/* ── FOOTER LINKS (hover color) ── */
export function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      style={{
        display: 'block',
        fontSize: '0.875rem',
        color: '#5a5753',
        marginBottom: '0.5rem',
        fontFamily: 'Satoshi, Inter, sans-serif',
        transition: 'color 150ms ease',
        textDecoration: 'none',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.color = '#d4a017'
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.color = '#5a5753'
      }}
    >
      {label}
    </Link>
  )
}