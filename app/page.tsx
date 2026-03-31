import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from './components/Navbar'
import {
  SkipLink,
  ServiceCard,
  BookNowButton,
  ContactForm,
  FooterLink,
} from './components/HomeInteractive'

export const metadata: Metadata = {
  title: 'Car Detailing, Window Tinting & Ceramic Coating Dubai',
  description:
    "Smart Auto UAE — Dubai's trusted car care specialists. Professional window tinting, nano ceramic coating, PPF, car detailing, polishing, and car wrapping. UAE authorised 3M & XPEL applicator. Doorstep service. 15-year warranty.",
  alternates: { canonical: 'https://smartautouae.com' },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Does Smart Auto UAE offer doorstep car tinting in Dubai?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Smart Auto UAE provides a fully mobile doorstep service for car window tinting, ceramic coating, and detailing across all areas of Dubai and Sharjah. Our technicians come to your home, office, or any location of your choice.',
      },
    },
    {
      '@type': 'Question',
      name: 'What window tint brands does Smart Auto UAE use?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Smart Auto UAE is a UAE authorised distributor and applicator for 3M, XPEL, and TotalGard window film. All films comply fully with UAE RTA regulations on visible light transmission.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does nano ceramic coating last in Dubai?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "A professional nano ceramic coating applied by Smart Auto UAE typically lasts between 2 to 5 years depending on the coating grade selected and your maintenance routine. Dubai's intense UV and heat make proper multi-layer application critical — we use premium formulations suited to UAE conditions.",
      },
    },
    {
      '@type': 'Question',
      name: 'What is the warranty on your window tinting services?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Smart Auto UAE backs all window tinting installations with a comprehensive 15-year warranty, covering film peeling, bubbling, delamination, and significant colour change. The warranty is honoured directly by our team.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is paint protection film (PPF) worth it in Dubai?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes. Dubai's sand, grit, high-speed motorway driving, and intense UV make PPF one of the most effective investments for preserving a vehicle's paintwork. Paint Protection Film forms a self-healing barrier against stone chips, light scratches, and UV degradation that ceramic coating alone cannot provide.",
      },
    },
    {
      '@type': 'Question',
      name: 'Does Smart Auto UAE service boats and yachts?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Smart Auto UAE provides marine glass coating and tinting for boats and yachts. Our marine tinting service reduces heat and UV intrusion in vessel cabins and is trusted by UAE boat owners across Dubai and the coast.',
      },
    },
  ],
}

const services = [
  {
    title: 'Window Tinting',
    slug: 'window-tinting',
    description:
      'UAE authorised 3M, XPEL, and TotalGard film installation. Block heat, UV, and glare — fully compliant with UAE RTA regulations. 15-year warranty on every job.',
    tag: 'Most Popular',
  },
  {
    title: 'Nano Ceramic Coating',
    slug: 'ceramic-coating',
    description:
      'Professional-grade hydrophobic nano ceramic coating that bonds to your paintwork at a molecular level. UV resistance, self-cleaning properties, and deep gloss for up to 5 years.',
    tag: null,
  },
  {
    title: 'Paint Protection Film',
    slug: 'ppf',
    description:
      'Military-grade XPEL and 3M PPF that shields your paint from stone chips, scratches, and UV damage. Self-healing, optically clear, and virtually invisible.',
    tag: null,
  },
  {
    title: 'Car Detailing',
    slug: 'car-detailing',
    description:
      'Full interior and exterior detailing using professional-grade products. Paintwork decontamination, leather conditioning, engine bay cleaning, and headlight restoration.',
    tag: null,
  },
  {
    title: 'Car Polishing',
    slug: 'car-polishing',
    description:
      'Machine paint correction to eliminate swirl marks, light scratches, water spots, and oxidation. Restores paintwork clarity and prepares the surface for coating.',
    tag: null,
  },
  {
    title: 'Car Wrapping',
    slug: 'car-wrapping',
    description:
      'Full colour-change and partial vinyl wraps. Matte, gloss, satin, chrome, and custom finishes. Full RTA documentation support for colour-change registrations in Dubai.',
    tag: null,
  },
  {
    title: 'Smart Film',
    slug: 'smart-film',
    description:
      'Switchable privacy glass film for homes, offices, and commercial spaces. Control transparency at the touch of a button — privacy on demand without sacrificing natural light.',
    tag: 'New',
  },
  {
    title: 'Marine Tinting',
    slug: 'marine-tinting',
    description:
      'Specialised glass coating and tinting for boats and yachts. Trusted by UAE boat owners for cabin heat reduction, UV protection, and enhanced comfort on the water.',
    tag: null,
  },
  {
    title: 'Commercial Tinting',
    slug: 'commercial-tinting',
    description:
      'Energy-efficient window film for offices, showrooms, and commercial buildings. Reduce solar gain, lower cooling costs, and improve employee comfort and productivity.',
    tag: null,
  },
  {
    title: 'Home Glass Tinting',
    slug: 'home-glass-tinting',
    description:
      'Residential window film that blocks UV radiation, reduces glare, saves energy, and protects occupants from the dangers of glass breakage.',
    tag: null,
  },
  {
    title: 'Car Upholstery',
    slug: 'upholstery',
    description:
      'Full and partial upholstery replacement and repair. Leather, Alcantara, and fabric options for seats, door panels, and dashboards.',
    tag: null,
  },
  {
    title: 'Vehicle Graphics',
    slug: 'vehicle-graphics',
    description:
      'Custom vinyl graphics, fleet branding, and full vehicle livery for commercial and personal vehicles across the UAE.',
    tag: null,
  },
]

const reviews = [
  {
    name: 'Ken Mayala',
    date: '7 December 2025',
    rating: 5,
    text: 'The team did an amazing job tinting my Mercedes S. I appreciate the timely, professional work.',
  },
  {
    name: 'Derrick Best',
    date: '6 December 2025',
    rating: 5,
    text: "Anoob took my booking late and made sure my car was done to the highest standard, communicating with me throughout while I was at work. Customer service like this is rare. I wouldn't dream of taking my car anywhere else.",
  },
  {
    name: 'Don Hacbang',
    date: '28 November 2025',
    rating: 5,
    text: 'The job was completed promptly and I am fully satisfied with the results. I appreciate the effort in following up and resolving the minor issues with the installed window tints.',
  },
  {
    name: 'Tasha Dewan',
    date: '4 November 2025',
    rating: 5,
    text: 'Quick service, well explained, thorough work done efficiently. One of the more reasonable places to get car tinting in Dubai.',
  },
  {
    name: 'Rob Rees',
    date: '8 November 2025',
    rating: 5,
    text: 'My third vehicle completed by Smart Auto. They continue to improve on their customer service — this time offering home collection and drop-off, which I took full advantage of.',
  },
  {
    name: 'Stuart',
    date: '22 November 2025',
    rating: 5,
    text: 'Easy transaction. Fast, neat service and the car looks great.',
  },
]

const steps = [
  {
    step: '01',
    title: 'Book Your Service',
    body: 'Call, WhatsApp, or submit the online form. Our team confirms your appointment and preferred location — workshop or doorstep.',
  },
  {
    step: '02',
    title: 'Vehicle Assessment',
    body: 'Our technician inspects your vehicle, discusses your requirements, and recommends the right product and grade for your needs and budget.',
  },
  {
    step: '03',
    title: 'Professional Installation',
    body: 'All work is performed by certified installers using genuine 3M, XPEL, and premium-grade products in a controlled, dust-free environment.',
  },
  {
    step: '04',
    title: 'Quality Check & Handover',
    body: 'Every job undergoes a thorough quality inspection before handover. You receive your warranty documentation and aftercare guidance.',
  },
]

const stats = [
  { value: '5,000+', label: 'Vehicles Serviced' },
  { value: '233', label: 'Google Reviews' },
  { value: '15 Yr', label: 'Tinting Warranty' },
  { value: '10+', label: 'Years in Dubai' },
]

const brands = ['3M', 'XPEL', 'TotalGard', 'Gtechniq', 'Gyeon']

const whyPoints = [
  {
    title: 'UAE Authorised Applicator',
    body: 'Official distributor and installer for 3M, XPEL, and TotalGard. Genuine products, certified installation.',
  },
  {
    title: '15-Year Warranty',
    body: 'Industry-leading warranty on all window tinting installations. Your investment is protected.',
  },
  {
    title: 'Doorstep Service',
    body: 'Our mobile technicians come to your home, office, or any location across Dubai and Sharjah.',
  },
  {
    title: 'RTA Compliant',
    body: 'All automotive tinting is installed to UAE RTA specifications. No fines, no re-tests.',
  },
  {
    title: '233 Google Reviews',
    body: "Rated 5 stars by over 233 verified customers on Google. Consistently rated Dubai's top tinting service.",
  },
  {
    title: 'Premium Materials Only',
    body: 'We use only manufacturer-certified films and coatings. No off-brand substitutions, ever.',
  },
]

const footerServices = [
  ['Window Tinting', '/services/window-tinting'],
  ['Ceramic Coating', '/services/ceramic-coating'],
  ['Paint Protection Film', '/services/ppf'],
  ['Car Detailing', '/services/car-detailing'],
  ['Car Wrapping', '/services/car-wrapping'],
  ['Smart Film', '/services/smart-film'],
  ['Marine Tinting', '/services/marine-tinting'],
]

const footerCompany = [
  ['About Us', '/about'],
  ['Gallery', '/gallery'],
  ['FAQ', '/faq'],
  ['Contact', '/contact'],
]

// Shared style tokens as plain objects — no event handlers, safe for server
const S = {
  section: (bg: string, borderTop?: boolean): React.CSSProperties => ({
    padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 4rem)',
    background: bg,
    borderTop: borderTop ? '1px solid rgba(212, 160, 23, 0.08)' : undefined,
  }),
  eyebrow: {
    fontSize: '0.75rem',
    letterSpacing: '0.25em',
    textTransform: 'uppercase' as const,
    color: '#d4a017',
    marginBottom: '1rem',
    fontFamily: 'Satoshi, Inter, sans-serif',
  } as React.CSSProperties,
  heading: {
    fontFamily: 'Cormorant Garamond, Georgia, serif',
    fontSize: 'clamp(2rem, 1.2rem + 2.5vw, 3.5rem)',
    fontWeight: 300,
    color: '#f0ede8',
    lineHeight: 1.1,
  } as React.CSSProperties,
  body: {
    fontSize: 'clamp(1rem, 0.95rem + 0.25vw, 1.125rem)',
    color: '#9a9590',
    lineHeight: 1.7,
    fontFamily: 'Satoshi, Inter, sans-serif',
  } as React.CSSProperties,
  wrap: {
    maxWidth: '1200px',
    margin: '0 auto',
  } as React.CSSProperties,
  goldLine: {
    width: '24px',
    height: '1px',
    background: 'linear-gradient(90deg, #d4a017, transparent)',
    marginBottom: '0.875rem',
  } as React.CSSProperties,
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <SkipLink />
      <Navbar />

      <main id="main-content">

        {/* ── HERO ── */}
        <section
          aria-label="Hero"
          style={{
            minHeight: '100svh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: 'clamp(6rem, 10vw, 10rem) clamp(1.5rem, 5vw, 4rem) clamp(4rem, 8vw, 7rem)',
            background: '#0a0a0a',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              bottom: '20%',
              right: '-5%',
              width: '50vw',
              height: '50vw',
              maxWidth: '600px',
              maxHeight: '600px',
              background: 'radial-gradient(circle, oklch(0.72 0.15 85 / 0.06) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          <div style={{ ...S.wrap, position: 'relative', width: '100%' }}>
            <p style={S.eyebrow}>
              UAE Authorised Distributor — 3M · XPEL · TotalGard
            </p>

            <h1
              style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize: 'clamp(3rem, 2rem + 5vw, 7rem)',
                fontWeight: 300,
                lineHeight: 1.0,
                letterSpacing: '-0.01em',
                color: '#f0ede8',
                marginBottom: '2rem',
                maxWidth: '14ch',
              }}
            >
              Car Window{' '}
              <span
                style={{
                  background:
                    'linear-gradient(135deg, #f5d060 0%, #d4a017 35%, #f0c040 65%, #b8860b 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Tinting
              </span>{' '}
              &amp; Car Care Dubai
            </h1>

            <p
              style={{
                ...S.body,
                maxWidth: '56ch',
                marginBottom: '2.5rem',
              }}
            >
              Smart Auto UAE is Dubai&apos;s trusted specialist in window tinting,
              nano ceramic coating, paint protection film, detailing, polishing,
              and car wrapping. Professional installation at your doorstep —
              all across Dubai and Sharjah.
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <BookNowButton />
              <a
                href="tel:+971567269666"
                style={{
                  display: 'inline-block',
                  padding: '0.875rem 1.5rem',
                  fontSize: '0.8125rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  color: '#d4a017',
                  border: '1px solid rgba(212, 160, 23, 0.3)',
                  borderRadius: '2px',
                  fontFamily: 'Satoshi, Inter, sans-serif',
                }}
              >
                056 726 9666
              </a>
            </div>
          </div>
        </section>

        {/* ── STATS BAR ── */}
        <section
          aria-label="Key statistics"
          style={{
            background: '#111111',
            borderTop: '1px solid rgba(212, 160, 23, 0.12)',
            borderBottom: '1px solid rgba(212, 160, 23, 0.12)',
            padding: '2.5rem clamp(1.5rem, 5vw, 4rem)',
          }}
        >
          <div
            style={{
              ...S.wrap,
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: '2rem',
            }}
          >
            {stats.map((stat) => (
              <div key={stat.label} style={{ textAlign: 'center' }}>
                <p
                  style={{
                    fontFamily: 'Cormorant Garamond, Georgia, serif',
                    fontSize: 'clamp(2rem, 1.5rem + 1.5vw, 2.75rem)',
                    fontWeight: 600,
                    background: 'linear-gradient(135deg, #f5d060, #d4a017)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    lineHeight: 1.1,
                    marginBottom: '0.375rem',
                  }}
                >
                  {stat.value}
                </p>
                <p
                  style={{
                    fontSize: '0.8125rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: '#5a5753',
                    fontFamily: 'Satoshi, Inter, sans-serif',
                  }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section
          aria-labelledby="services-heading"
          style={S.section('#0a0a0a')}
        >
          <div style={S.wrap}>
            <div style={{ marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
              <p style={S.eyebrow}>What We Do</p>
              <h2 id="services-heading" style={{ ...S.heading, maxWidth: '20ch' }}>
                Premium Car Care Services in Dubai
              </h2>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(300px, 100%), 1fr))',
                gap: '1px',
                background: 'rgba(212, 160, 23, 0.08)',
              }}
            >
              {services.map((service) => (
                <ServiceCard
                  key={service.slug}
                  title={service.title}
                  slug={service.slug}
                  description={service.description}
                  tag={service.tag}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY SMART AUTO ── */}
        <section
          aria-labelledby="why-heading"
          style={S.section('#111111', true)}
        >
          <div
            style={{
              ...S.wrap,
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(480px, 100%), 1fr))',
              gap: 'clamp(3rem, 6vw, 6rem)',
              alignItems: 'start',
            }}
          >
            {/* Left — copy */}
            <div>
              <p style={S.eyebrow}>Why Choose Us</p>
              <h2
                id="why-heading"
                style={{ ...S.heading, marginBottom: '1.5rem' }}
              >
                Dubai&apos;s Trusted Car Care Professionals
              </h2>
              <p style={{ ...S.body, marginBottom: '1.25rem' }}>
                Smart Auto Accessories Fitting LLC has been serving Dubai and
                Sharjah&apos;s vehicle owners for over a decade. As a UAE
                authorised distributor and applicator for 3M, XPEL, and
                TotalGard, we operate to the highest standards of installation
                quality in the market.
              </p>
              <p style={{ ...S.body, marginBottom: '2rem' }}>
                Every service — from a basic window tint to a full-body PPF
                installation — is performed by certified technicians using
                genuine manufacturer products. We back every tinting job with a
                comprehensive 15-year warranty.
              </p>
              <Link
                href="/about"
                style={{
                  fontSize: '0.8125rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#d4a017',
                  fontWeight: 600,
                  fontFamily: 'Satoshi, Inter, sans-serif',
                  borderBottom: '1px solid rgba(212, 160, 23, 0.3)',
                  paddingBottom: '2px',
                }}
              >
                About Smart Auto UAE &rarr;
              </Link>
            </div>

            {/* Right — grid of trust points */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1px',
                background: 'rgba(212, 160, 23, 0.1)',
              }}
            >
              {whyPoints.map((item) => (
                <div
                  key={item.title}
                  style={{ background: '#111111', padding: '1.5rem' }}
                >
                  <div style={S.goldLine} />
                  <h3
                    style={{
                      fontFamily: 'Satoshi, Inter, sans-serif',
                      fontSize: '0.9375rem',
                      fontWeight: 600,
                      color: '#f0ede8',
                      marginBottom: '0.5rem',
                      lineHeight: 1.3,
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      fontSize: '0.875rem',
                      color: '#5a5753',
                      lineHeight: 1.6,
                      fontFamily: 'Satoshi, Inter, sans-serif',
                    }}
                  >
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── OUR PROCESS ── */}
        <section
          aria-labelledby="process-heading"
          style={S.section('#0a0a0a')}
        >
          <div style={S.wrap}>
            <div style={{ marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
              <p style={S.eyebrow}>How It Works</p>
              <h2 id="process-heading" style={S.heading}>
                The Smart Auto Process
              </h2>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(240px, 100%), 1fr))',
                gap: '2px',
                background: 'rgba(212, 160, 23, 0.06)',
              }}
            >
              {steps.map((step) => (
                <div
                  key={step.step}
                  style={{ background: '#0a0a0a', padding: '2rem 1.75rem' }}
                >
                  <p
                    style={{
                      fontFamily: 'Cormorant Garamond, Georgia, serif',
                      fontSize: '3rem',
                      fontWeight: 300,
                      color: 'rgba(212, 160, 23, 0.2)',
                      lineHeight: 1,
                      marginBottom: '1rem',
                    }}
                  >
                    {step.step}
                  </p>
                  <h3
                    style={{
                      fontFamily: 'Satoshi, Inter, sans-serif',
                      fontSize: 'clamp(0.9375rem, 0.875rem + 0.35vw, 1.0625rem)',
                      fontWeight: 600,
                      color: '#f0ede8',
                      marginBottom: '0.625rem',
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    style={{
                      fontSize: '0.9rem',
                      color: '#9a9590',
                      lineHeight: 1.65,
                      fontFamily: 'Satoshi, Inter, sans-serif',
                    }}
                  >
                    {step.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── BRANDS ── */}
        <section
          aria-label="Approved brands and manufacturers"
          style={{
            padding: '2.5rem clamp(1.5rem, 5vw, 4rem)',
            background: '#111111',
            borderTop: '1px solid rgba(212, 160, 23, 0.08)',
            borderBottom: '1px solid rgba(212, 160, 23, 0.08)',
          }}
        >
          <div style={S.wrap}>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '1rem 2rem',
              }}
            >
              <p
                style={{
                  fontSize: '0.75rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: '#5a5753',
                  fontFamily: 'Satoshi, Inter, sans-serif',
                  flexShrink: 0,
                }}
              >
                Approved Products
              </p>
              <div style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.08)' }} />
              {brands.map((brand) => (
                <span
                  key={brand}
                  style={{
                    fontFamily: 'Cormorant Garamond, Georgia, serif',
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    color: '#9a9590',
                  }}
                >
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section
          aria-labelledby="reviews-heading"
          style={S.section('#0a0a0a')}
        >
          <div style={S.wrap}>
            <div style={{ marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
              <p style={S.eyebrow}>Client Feedback</p>
              <h2 id="reviews-heading" style={S.heading}>
                What Dubai Car Owners Say
              </h2>
              <p
                style={{
                  marginTop: '0.75rem',
                  fontSize: '0.875rem',
                  color: '#5a5753',
                  fontFamily: 'Satoshi, Inter, sans-serif',
                }}
              >
                Smart Auto Motorcity &mdash; 5.0 / 233 Google Reviews
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(320px, 100%), 1fr))',
                gap: '1px',
                background: 'rgba(212, 160, 23, 0.06)',
              }}
            >
              {reviews.map((review) => (
                <article
                  key={review.name}
                  itemScope
                  itemType="https://schema.org/Review"
                  style={{ background: '#0a0a0a', padding: '1.75rem' }}
                >
                  <div
                    style={{ display: 'flex', gap: '2px', marginBottom: '1rem' }}
                    aria-label={`${review.rating} out of 5 stars`}
                  >
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <span
                        key={i}
                        aria-hidden="true"
                        style={{ color: '#d4a017', fontSize: '0.875rem' }}
                      >
                        &#9733;
                      </span>
                    ))}
                  </div>
                  <blockquote
                    itemProp="reviewBody"
                    style={{
                      fontSize: '0.9375rem',
                      color: '#9a9590',
                      lineHeight: 1.7,
                      fontFamily: 'Satoshi, Inter, sans-serif',
                      marginBottom: '1.25rem',
                      fontStyle: 'italic',
                    }}
                  >
                    &ldquo;{review.text}&rdquo;
                  </blockquote>
                  <footer>
                    <p
                      itemProp="author"
                      style={{
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        color: '#f0ede8',
                        fontFamily: 'Satoshi, Inter, sans-serif',
                      }}
                    >
                      {review.name}
                    </p>
                    <time
                      dateTime={review.date}
                      style={{
                        fontSize: '0.75rem',
                        color: '#5a5753',
                        fontFamily: 'Satoshi, Inter, sans-serif',
                        letterSpacing: '0.04em',
                      }}
                    >
                      {review.date}
                    </time>
                  </footer>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section
          aria-labelledby="faq-heading"
          style={S.section('#111111', true)}
        >
          <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 clamp(1.5rem, 5vw, 4rem)' }}>
            <div style={{ marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
              <p style={S.eyebrow}>Common Questions</p>
              <h2 id="faq-heading" style={S.heading}>
                Frequently Asked Questions
              </h2>
            </div>

            <div>
              {faqSchema.mainEntity.map((faq, i) => (
                <details
                  key={i}
                  style={{ borderBottom: '1px solid rgba(212, 160, 23, 0.1)' }}
                >
                  <summary
                    style={{
                      padding: '1.5rem 0',
                      cursor: 'pointer',
                      fontFamily: 'Satoshi, Inter, sans-serif',
                      fontSize: 'clamp(0.9375rem, 0.875rem + 0.35vw, 1.0625rem)',
                      fontWeight: 600,
                      color: '#f0ede8',
                      listStyle: 'none',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '1rem',
                    }}
                  >
                    <span>{faq.name}</span>
                    <span
                      aria-hidden="true"
                      style={{ color: '#d4a017', fontSize: '1.25rem', flexShrink: 0, lineHeight: 1 }}
                    >
                      +
                    </span>
                  </summary>
                  <p
                    style={{
                      paddingBottom: '1.5rem',
                      fontSize: '0.9375rem',
                      color: '#9a9590',
                      lineHeight: 1.75,
                      fontFamily: 'Satoshi, Inter, sans-serif',
                    }}
                  >
                    {faq.acceptedAnswer.text}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── BOOKING CTA ── */}
        <section
          aria-labelledby="cta-heading"
          style={S.section('#0a0a0a')}
        >
          <div
            style={{
              ...S.wrap,
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(420px, 100%), 1fr))',
              gap: '3rem',
              alignItems: 'start',
            }}
          >
            {/* Left — copy */}
            <div>
              <p style={S.eyebrow}>Get in Touch</p>
              <h2
                id="cta-heading"
                style={{ ...S.heading, marginBottom: '1.25rem' }}
              >
                Book Your Car Care Service in Dubai
              </h2>
              <p style={{ ...S.body, marginBottom: '2rem' }}>
                Send us your details and our team will contact you to confirm
                your appointment. We offer doorstep service across all areas of
                Dubai and Sharjah — at no additional charge.
              </p>
              <a
                href="tel:+971567269666"
                style={{
                  fontSize: '0.9375rem',
                  color: '#d4a017',
                  fontFamily: 'Satoshi, Inter, sans-serif',
                  fontWeight: 500,
                  letterSpacing: '0.04em',
                }}
              >
                Call / WhatsApp: 056 726 9666
              </a>
            </div>

            {/* Right — interactive form (Client Component) */}
            <ContactForm />
          </div>
        </section>

      </main>

      {/* ── FOOTER ── */}
      <footer
        role="contentinfo"
        style={{
          background: '#111111',
          borderTop: '1px solid rgba(212, 160, 23, 0.1)',
          padding: 'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 5vw, 4rem) 2rem',
        }}
      >
        <div
          style={{
            ...S.wrap,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(220px, 100%), 1fr))',
            gap: '2.5rem',
            marginBottom: '3rem',
          }}
        >
          {/* Brand */}
          <div>
            <p
              style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize: '1.375rem',
                fontWeight: 600,
                letterSpacing: '0.08em',
                color: '#f0ede8',
                marginBottom: '0.375rem',
              }}
            >
              SMART AUTO UAE
            </p>
            <p
              style={{
                fontSize: '0.75rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#d4a017',
                marginBottom: '1.25rem',
              }}
            >
              Accessories Fitting LLC
            </p>
            <p
              style={{
                fontSize: '0.875rem',
                color: '#5a5753',
                lineHeight: 1.7,
                fontFamily: 'Satoshi, Inter, sans-serif',
                maxWidth: '28ch',
              }}
            >
              UAE authorised distributor and applicator for 3M, XPEL, and TotalGard.
              Professional car care across Dubai and Sharjah.
            </p>
          </div>

          {/* Services */}
          <div>
            <p
              style={{
                fontSize: '0.75rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#9a9590',
                marginBottom: '1rem',
                fontFamily: 'Satoshi, Inter, sans-serif',
              }}
            >
              Services
            </p>
            <nav aria-label="Footer services navigation">
              {footerServices.map(([label, href]) => (
                <FooterLink key={href} href={href} label={label} />
              ))}
            </nav>
          </div>

          {/* Company */}
          <div>
            <p
              style={{
                fontSize: '0.75rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#9a9590',
                marginBottom: '1rem',
                fontFamily: 'Satoshi, Inter, sans-serif',
              }}
            >
              Company
            </p>
            <nav aria-label="Footer company navigation">
              {footerCompany.map(([label, href]) => (
                <FooterLink key={href} href={href} label={label} />
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p
              style={{
                fontSize: '0.75rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#9a9590',
                marginBottom: '1rem',
                fontFamily: 'Satoshi, Inter, sans-serif',
              }}
            >
              Contact
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              <a
                href="tel:+971567269666"
                style={{
                  fontSize: '0.9375rem',
                  color: '#d4a017',
                  fontFamily: 'Satoshi, Inter, sans-serif',
                  fontWeight: 500,
                }}
              >
                056 726 9666
              </a>
              <p style={{ fontSize: '0.875rem', color: '#5a5753', fontFamily: 'Satoshi, Inter, sans-serif' }}>
                Dubai, UAE
              </p>
              <p style={{ fontSize: '0.875rem', color: '#5a5753', fontFamily: 'Satoshi, Inter, sans-serif' }}>
                Doorstep service available
                <br />
                across Dubai &amp; Sharjah
              </p>
            </div>
          </div>
        </div>

        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.04)',
            paddingTop: '1.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            gap: '0.75rem',
            alignItems: 'center',
          }}
        >
          <p style={{ fontSize: '0.8125rem', color: '#5a5753', fontFamily: 'Satoshi, Inter, sans-serif' }}>
            &copy; {new Date().getFullYear()} Smart Auto Accessories Fitting LLC. All rights reserved.
          </p>
          <p
            style={{
              fontSize: '0.75rem',
              color: '#5a5753',
              fontFamily: 'Satoshi, Inter, sans-serif',
              letterSpacing: '0.08em',
            }}
          >
            UAE Authorised 3M &middot; XPEL &middot; TotalGard Applicator
          </p>
        </div>
      </footer>
    </>
  )
}