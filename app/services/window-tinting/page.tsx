'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  CheckCircle, ArrowRight, Phone, Shield, Sun, Eye,
  Thermometer, Lock, Zap, Car, Star, MapPin
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const GOLD = '#C9A84C'
const GOLD2 = '#E8C96A'
const GOLD3 = '#A07830'
const goldGrad = `linear-gradient(135deg,${GOLD},${GOLD2},${GOLD3})`

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.1,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
}

// ─── DATA ──────────────────────────────────────────────────────────────────

const benefits = [
  {
    icon: Sun,
    title: 'Blocks 99% of UV Rays',
    desc: 'Our nano ceramic films block up to 99% of harmful UV radiation — protecting your skin from darkening, premature aging, and reducing the long-term risk of UV-related skin damage on every drive.',
  },
  {
    icon: Thermometer,
    title: 'Reduces Heat by Up to 95%',
    desc: 'High-performance films with hybrid nanotechnology reduce infrared heat waves by up to 95%, keeping your cabin significantly cooler in Dubai\'s extreme summer temperatures.',
  },
  {
    icon: Eye,
    title: 'Reduces Glare — Day & Night',
    desc: 'Window tinting reduces sun glare during the day and headlight glare at night. Less glare means better visibility, reduced driver fatigue, and a safer driving experience overall.',
  },
  {
    icon: Lock,
    title: 'Privacy & Security',
    desc: 'Tinted windows prevent prying eyes from seeing into your vehicle. This deters opportunistic theft and provides peace of mind when your valuables are inside a parked car.',
  },
  {
    icon: Shield,
    title: 'Shatter Protection',
    desc: 'Window film adds a bonded layer to the glass. In the event of an accident or impact, the film holds shattered glass together — reducing the risk of glass-related injuries significantly.',
  },
  {
    icon: Zap,
    title: 'Preserves Interior',
    desc: 'UV and infrared rays cause upholstery, dashboards, and leather to fade, crack, and discolour. Window tinting blocks the radiation that causes this damage, keeping interiors looking newer for longer.',
  },
]

const films = [
  {
    name: 'Nano Ceramic Film',
    brand: '3M · Totalgard · XPEL',
    tag: 'Best Performer',
    features: [
      'Blocks up to 99% UV rays',
      'Reduces IR heat up to 95%',
      'Non-metallic — zero signal interference',
      'Crystal clarity, no colour shift',
      'Hybrid nanotechnology',
    ],
    warranty: 'Up to 15-year warranty',
    price: 'From AED 799',
    best: 'Best for: Luxury, performance & daily drivers',
  },
  {
    name: 'Carbon Film',
    brand: '3M · Totalgard',
    tag: 'Most Popular',
    features: [
      'Superior heat rejection',
      'Matte or standard finish',
      'No GPS/signal interference',
      'Excellent UV protection',
      'Durable & scratch resistant',
    ],
    warranty: 'Up to 10-year warranty',
    price: 'From AED 499',
    best: 'Best for: SUVs, family cars & pickups',
  },
  {
    name: 'Dyed / Standard Film',
    brand: 'Totalgard · SunTek',
    tag: 'Budget Friendly',
    features: [
      'UAE RTA law compliant',
      'Privacy enhancement',
      'Basic UV protection',
      'Available in multiple shades',
      'Quick same-day install',
    ],
    warranty: 'Up to 5-year warranty',
    price: 'From AED 299',
    best: 'Best for: Budget-conscious owners',
  },
]

const pricing = [
  { type: 'Coupe', range: 'AED 300 – 1,400', note: 'Both sides + rear' },
  { type: 'Saloon', range: 'AED 350 – 1,700', note: 'Both sides + rear' },
  { type: '4x4 / SUV', range: 'AED 400 – 1,900', note: 'Both sides + rear' },
  { type: 'Station Wagon', range: 'AED 450 – 2,100', note: 'Both sides + rear' },
]

const stats = [
  { value: '99%', label: 'UV Rays Blocked' },
  { value: '95%', label: 'IR Heat Reduced' },
  { value: '15 Yr', label: 'Max Warranty' },
  { value: '600+', label: 'Google Reviews' },
]

const process = [
  { num: '01', title: 'Free Inspection', desc: 'We inspect your vehicle and recommend the right film grade for your budget and driving needs.' },
  { num: '02', title: 'Film Selection', desc: 'Choose from nano ceramic, carbon, or standard dyed film across multiple tint shades.' },
  { num: '03', title: 'Professional Installation', desc: 'Certified technicians apply the film using professional-grade tools in a dust-controlled environment.' },
  { num: '04', title: 'Quality Check & Handover', desc: 'Every installation is inspected for clarity, adhesion, and compliance before handover with warranty documentation.' },
]

const faqs = [
  {
    q: 'Is car window tinting legal in Dubai?',
    a: 'Yes, car window tinting in Dubai is legal when it follows UAE RTA regulations. Vehicles are permitted up to the approved tint percentage for side and rear windows. At Smart Auto UAE, we only install RTA-approved films, ensuring your vehicle remains fully compliant and inspection-ready.',
  },
  {
    q: 'What are the benefits of car window tinting in Dubai?',
    a: 'Window tinting in Dubai offers multiple benefits: blocks up to 99% of UV rays protecting skin and interior, reduces cabin heat by up to 95% improving comfort, reduces glare for safer driving, adds privacy and security, and prevents interior fading. Given Dubai\'s extreme solar conditions, professional window tinting is one of the most practical upgrades for any vehicle.',
  },
  {
    q: 'Which is the best car tinting option for Dubai\'s climate?',
    a: 'For Dubai\'s intense heat and UV conditions, nano ceramic film is the highest-performing option. It uses hybrid nanotechnology to reject both UV and infrared rays without affecting visibility or GPS signals. 3M Crystalline and Totalgard Nano Ceramic are our top recommendations for UAE conditions.',
  },
  {
    q: 'How much heat does car window tinting reduce?',
    a: 'High-performance nano ceramic films can reduce infrared heat by up to 95% and overall solar heat gain by up to 60%. Even entry-level carbon films provide significant heat reduction compared to untinted glass.',
  },
  {
    q: 'Does car tinting affect night driving visibility?',
    a: 'No — and in fact it improves it. RTA-compliant window tints do not reduce visibility below safe levels. They reduce the glare from streetlights and oncoming headlights, which actually improves night driving safety. Illegally dark tints are never installed by Smart Auto UAE.',
  },
  {
    q: 'How long does car window tinting last?',
    a: 'Our nano ceramic films from 3M and Totalgard carry warranties of up to 15 years. Standard and carbon films carry 3–10 year warranties. Film longevity depends on the product grade, care routine, and whether the vehicle is parked indoors or outdoors.',
  },
  {
    q: 'How long does the car tinting installation take?',
    a: 'A full vehicle window tinting job takes 2–4 hours at any of our 4 branches in Dubai and Sharjah. Same-day service is available in most cases. We also offer mobile doorstep tinting across Dubai at your home or office.',
  },
  {
    q: 'Can car tinting protect my car interior?',
    a: 'Yes. UV and infrared radiation cause upholstery, leather, dashboards, and plastics to fade and crack over time. Window tinting blocks the radiation responsible for this damage — preserving your interior and maintaining your vehicle\'s resale value.',
  },
  {
    q: 'Why choose Smart Auto UAE for car window tinting in Dubai?',
    a: 'Smart Auto UAE is a UAE authorised distributor and installer for 3M, Totalgard, and XPEL window films. We have 4 branches across Dubai and Sharjah, over 600 verified Google reviews, certified technicians, and offer warranties of up to 15 years. We also offer mobile doorstep tinting across Dubai.',
  },
  {
    q: 'Do you offer car tinting services across Dubai?',
    a: 'Yes. Smart Auto UAE has 4 branches — MotorCity, Al Quoz, Mirdif, and Sharjah Central Mall. We also offer mobile tinting services at your home or office across all areas of Dubai.',
  },
  {
    q: 'Is ceramic car tinting worth the cost?',
    a: 'Yes. In Dubai\'s climate, the heat and UV reduction from a nano ceramic film translates directly into lower air conditioning load, reduced fuel consumption, a cooler cabin, protected interior materials, and long-term skin protection. The higher upfront cost is offset by the 10–15 year warranty and significantly better performance compared to standard films.',
  },
]

const branches = [
  { name: 'Smart Auto MotorCity', address: 'MotorCity, Dubai', phone: '+971 52 440 3677' },
  { name: 'Smart Auto Al Quoz', address: 'Al Quoz Industrial Area, Dubai', phone: '+971 52 440 3677' },
  { name: 'Smart Auto Mirdif', address: 'Uptown Mirdif Mall, Dubai', phone: '+971 52 440 3677' },
  { name: 'Smart Auto Sharjah', address: 'Central Mall, Sharjah', phone: '+971 52 440 3677' },
]

const relatedServices = [
  { name: 'Paint Protection Film (PPF)', href: '/services/ppf', desc: 'Shield your paint from stone chips and UV damage.' },
  { name: 'Nano Ceramic Coating', href: '/services/ceramic-coating', desc: '9H hydrophobic paint coating. Lasts 2–5 years.' },
  { name: 'Car Detailing', href: '/services/car-detailing', desc: 'Full interior and exterior detailing services.' },
  { name: 'Car Wrapping', href: '/services/car-wrapping', desc: 'Colour-change and custom vinyl wraps in Dubai.' },
]

// ─── FAQ ITEM ──────────────────────────────────────────────────────────────

function FAQItem({ q, a, i }: { q: string; a: string; i: number }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      className="rounded-2xl overflow-hidden transition-all duration-300"
      style={{ border: `1px solid ${open ? 'rgba(201,168,76,0.3)' : 'rgba(255,255,255,0.06)'}`, background: 'rgba(255,255,255,0.02)' }}
    >
      <button
        type="button"
        className="w-full flex items-center justify-between gap-4 px-7 py-5 text-left"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={`faq-${i}`}
      >
        <span className="text-white font-medium text-[15px] leading-snug">{q}</span>
        <span
          className="text-xl flex-shrink-0 transition-transform duration-300"
          style={{ color: GOLD, transform: open ? 'rotate(45deg)' : 'rotate(0)' }}
          aria-hidden="true"
        >
          +
        </span>
      </button>
      {open && (
        <div id={`faq-${i}`} className="px-7 pb-6">
          <p className="text-white/50 text-sm leading-[1.85]">{a}</p>
        </div>
      )}
    </div>
  )
}

// ─── PAGE ──────────────────────────────────────────────────────────────────

export default function WindowTintingPage() {
  return (
    <main style={{ background: '#0A0A0A', paddingTop: '80px' }}>
<Navbar/>
      {/* ── HERO ── */}
      <section
        className="relative py-28 overflow-hidden"
        style={{ background: 'linear-gradient(180deg,#050505 0%,#080808 100%)' }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 65% 50%,rgba(201,168,76,0.08) 0%,transparent 60%)' }}
          aria-hidden="true"
        />
        <div
          className="absolute top-0 left-0 right-0 h-px pointer-events-none"
          style={{ background: 'linear-gradient(to right,transparent,rgba(201,168,76,0.2),transparent)' }}
          aria-hidden="true"
        />

        <div className="w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div variants={fadeUp} initial="hidden" animate="show">
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 text-[10px] tracking-[0.25em] uppercase"
              style={{ border: '1px solid rgba(201,168,76,0.3)', background: 'rgba(201,168,76,0.06)', color: GOLD }}
            >
              <Star size={10} fill={GOLD} aria-hidden="true" />
              UAE Authorised 3M · Totalgard · XPEL Installer
              <Star size={10} fill={GOLD} aria-hidden="true" />
            </div>
            <h1
              className="font-bold text-white leading-[1.05] mb-5"
              style={{ fontFamily: 'var(--font-playfair),serif', fontSize: 'clamp(2.5rem,5vw,4.5rem)' }}
            >
              Car Window Tinting<br />
              <span
                style={{
                  background: goldGrad,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Dubai &amp; UAE
              </span>
            </h1>

            <div
              className="flex items-center gap-3 mb-6"
              style={{ borderLeft: `3px solid ${GOLD}`, paddingLeft: '1rem' }}
            >
              <p className="text-white/60 text-base leading-[1.8] italic">
                Stay cool with our specially designed window films engineered for GCC weather conditions.
                Mobile tinting available at your doorstep — all across Dubai.
              </p>
            </div>

            <div className="flex flex-col gap-2.5 mb-8">
              {[
                'UAE RTA law compliant — all vehicle types',
                '3M, Totalgard & XPEL authorised installer',
                'Up to 15-year warranty on nano ceramic films',
                'Same-day service · Mobile doorstep tinting available',
                'Free inspection before every installation',
              ].map((p) => (
                <div key={p} className="flex items-center gap-3">
                  <CheckCircle size={15} style={{ color: GOLD, flexShrink: 0 }} aria-hidden="true" />
                  <span className="text-white/60 text-sm">{p}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-3 flex-wrap">
              <a
                href="https://wa.me/971524403677"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm text-black transition-all duration-300 hover:opacity-90"
                style={{ background: goldGrad }}
              >
                Book on WhatsApp <ArrowRight size={15} />
              </a>
              <a
                href="tel:+971567269666"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm border transition-all duration-300"
                style={{ color: GOLD, borderColor: 'rgba(201,168,76,0.3)', background: 'rgba(201,168,76,0.05)' }}
              >
                <Phone size={14} /> +971 56 726 9666
              </a>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} custom={1} initial="hidden" animate="show">
            <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(201,168,76,0.15)' }}>
              <img
                src="/images/services/window-tinting-1.webp"
                alt="Professional car window tinting Dubai — 3M, Totalgard and XPEL nano ceramic film installation by Smart Auto UAE"
                width={700}
                height={500}
                loading="eager"
                decoding="async"
                className="w-full object-cover"
                style={{ maxHeight: '500px' }}
              />
            </div>
            {/* Stats bar */}
            <div
              className="grid grid-cols-4 mt-4 rounded-2xl p-5"
              style={{ background: 'rgba(17,17,17,0.85)', border: '1px solid rgba(201,168,76,0.1)' }}
            >
              {stats.map((s, i) => (
                <div key={s.label} className={`text-center ${i !== 3 ? 'border-r' : ''}`} style={{ borderColor: 'rgba(201,168,76,0.12)' }}>
                  <p
                    className="font-bold leading-none mb-1"
                    style={{ fontFamily: 'var(--font-playfair),serif', fontSize: '1.5rem', background: goldGrad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
                  >
                    {s.value}
                  </p>
                  <p className="text-white/35 text-[10px] tracking-[0.1em] uppercase">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section className="py-24" style={{ backgroundColor: '#060606' }}>
        <div className="w-full max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[11px] tracking-[0.3em] uppercase mb-3" style={{ color: GOLD }}>
              Why Tint Your Car in Dubai
            </p>
            <h2
              className="font-bold text-white"
              style={{ fontFamily: 'var(--font-playfair),serif', fontSize: 'clamp(1.8rem,3vw,2.8rem)' }}
            >
              6 Key Benefits of{' '}
              <span style={{ background: goldGrad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Window Tinting
              </span>
            </h2>
            <p className="text-white/40 text-sm mt-4 max-w-2xl mx-auto leading-relaxed">
              Window tinting is one of the most practical upgrades for any vehicle in the UAE. Dubai&apos;s extreme UV index, intense heat, and long driving hours make professionally installed window film essential — not just cosmetic.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map((b, i) => (
              <motion.div key={b.title} variants={fadeUp} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }}>
                <div
                  className="rounded-2xl p-7 h-full transition-all duration-300 hover:border-gold/30 group"
                  style={{ background: 'rgba(17,17,17,0.85)', border: '1px solid rgba(201,168,76,0.1)' }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:bg-gold/15"
                    style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)', color: GOLD }}
                  >
                    <b.icon size={22} aria-hidden="true" />
                  </div>
                  <h3 className="text-white font-semibold text-base mb-2.5">{b.title}</h3>
                  <p className="text-white/45 text-[13px] leading-[1.75]">{b.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FILM OPTIONS ── */}
      <section className="py-24" style={{ background: 'linear-gradient(180deg,#080808 0%,#0A0A0A 100%)' }}>
        <div className="w-full max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[11px] tracking-[0.3em] uppercase mb-3" style={{ color: GOLD }}>
              3M · Totalgard · XPEL · SunTek
            </p>
            <h2
              className="font-bold text-white"
              style={{ fontFamily: 'var(--font-playfair),serif', fontSize: 'clamp(1.8rem,3vw,2.8rem)' }}
            >
              Window Tint Films We{' '}
              <span style={{ background: goldGrad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Install in UAE
              </span>
            </h2>
            <p className="text-white/40 text-sm mt-4 max-w-xl mx-auto">
              All our automotive window films are UAE RTA compliant, manufactured with hybrid nanotechnology, and warranted for up to 15 years.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {films.map((film, i) => (
              <motion.div key={film.name} variants={fadeUp} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }}>
                <div
                  className="rounded-2xl p-8 h-full flex flex-col relative overflow-hidden"
                  style={{ background: 'rgba(17,17,17,0.85)', border: '1px solid rgba(201,168,76,0.12)' }}
                >
                  <span
                    className="absolute top-4 right-4 text-[9px] tracking-[0.15em] uppercase px-3 py-1 rounded-full"
                    style={{ background: 'rgba(201,168,76,0.12)', color: GOLD, border: '1px solid rgba(201,168,76,0.25)' }}
                  >
                    {film.tag}
                  </span>
                  <p className="text-[10px] tracking-[0.2em] uppercase mb-1.5" style={{ color: GOLD }}>{film.brand}</p>
                  <h3
                    className="text-white font-bold text-xl mb-1"
                    style={{ fontFamily: 'var(--font-playfair),serif' }}
                  >
                    {film.name}
                  </h3>
                  <p
                    className="font-semibold text-base mb-5"
                    style={{ background: goldGrad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
                  >
                    {film.price}
                  </p>
                  <ul className="flex flex-col gap-2.5 mb-5 flex-1">
                    {film.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-[13px] text-white/55">
                        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: GOLD }} aria-hidden="true" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4 mt-auto" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <p className="text-[11px] mb-1" style={{ color: 'rgba(201,168,76,0.7)' }}>{film.warranty}</p>
                    <p className="text-white/35 text-[11px] tracking-wide">{film.best}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="py-24" style={{ backgroundColor: '#060606' }}>
        <div className="w-full max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[11px] tracking-[0.3em] uppercase mb-3" style={{ color: GOLD }}>
              Transparent Pricing
            </p>
            <h2
              className="font-bold text-white"
              style={{ fontFamily: 'var(--font-playfair),serif', fontSize: 'clamp(1.8rem,3vw,2.8rem)' }}
            >
              Window Tinting Price{' '}
              <span style={{ background: goldGrad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                in Dubai
              </span>
            </h2>
            <p className="text-white/40 text-sm mt-4 max-w-xl mx-auto">
              Pricing varies by vehicle type and film grade selected. All packages include both side windows and rear glass. Contact us for an exact quote.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {pricing.map((p, i) => (
              <motion.div key={p.type} variants={fadeUp} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }}>
                <div
                  className="rounded-2xl p-8 text-center h-full flex flex-col items-center"
                  style={{ background: 'rgba(17,17,17,0.85)', border: '1px solid rgba(201,168,76,0.12)' }}
                >
                  <Car size={32} className="mb-4" style={{ color: GOLD }} aria-hidden="true" />
                  <h3 className="text-white font-bold text-lg mb-2" style={{ fontFamily: 'var(--font-playfair),serif' }}>
                    {p.type}
                  </h3>
                  <p
                    className="font-bold text-xl mb-2"
                    style={{ background: goldGrad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
                  >
                    {p.range}
                  </p>
                  <p className="text-white/35 text-[11px] mb-4">{p.note}</p>
                  <div className="flex flex-col gap-1.5 mt-auto w-full pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    {['Up to 15 years warranty', 'Up to 90% heat reduction'].map((f) => (
                      <div key={f} className="flex items-center gap-2 justify-center">
                        <div className="w-1 h-1 rounded-full" style={{ background: GOLD }} aria-hidden="true" />
                        <span className="text-white/40 text-[11px]">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-white/35 text-sm">
              Prices vary by film grade. Contact us for your exact quote —{' '}
              <a href="tel:+971567269666" className="underline" style={{ color: GOLD }}>+971 56 726 9666</a>
            </p>
          </div>
        </div>
      </section>

      {/* ── ABOUT 3M & BRANDS ── */}
      <section className="py-24" style={{ background: 'linear-gradient(180deg,#080808 0%,#0A0A0A 100%)' }}>
        <div className="w-full max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <p className="text-[11px] tracking-[0.3em] uppercase mb-4" style={{ color: GOLD }}>
                Why 3M &amp; Totalgard
              </p>
              <h2
                className="font-bold text-white leading-[1.15] mb-6"
                style={{ fontFamily: 'var(--font-playfair),serif', fontSize: 'clamp(1.8rem,3vw,2.6rem)' }}
              >
                Premium Brands Engineered for{' '}
                <span style={{ background: goldGrad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  UAE Conditions
                </span>
              </h2>
              <p className="text-white/50 text-base leading-[1.85] mb-5">
                Smart Auto UAE is a <strong className="text-white/70 font-medium">UAE authorised distributor and applicator</strong> for 3M, Totalgard, XPEL, and SunTek window films. Our automotive products are manufactured using hybrid nanotechnology, specifically engineered to perform in extreme climates like the UAE — where UV index regularly exceeds 11 and cabin temperatures can reach 70°C+ in parked vehicles.
              </p>
              <p className="text-white/50 text-base leading-[1.85] mb-7">
                All Smart Auto UAE window films are <strong className="text-white/70 font-medium">highly durable, warranted from 3 to 15 years</strong>, and combine leading-edge thermal insulation technology with a range of styles and tint shades suited to every vehicle type and personal preference.
              </p>
              <div className="flex flex-wrap gap-3">
                {['3M', 'Totalgard', 'XPEL', 'SunTek', 'Llumar'].map((brand) => (
                  <span
                    key={brand}
                    className="px-5 py-2 rounded-full text-[12px] font-semibold tracking-wide"
                    style={{ border: '1px solid rgba(201,168,76,0.2)', color: 'rgba(201,168,76,0.7)', background: 'rgba(201,168,76,0.04)' }}
                  >
                    {brand}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeUp} custom={1} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(201,168,76,0.1)' }}>
                  <img
                    src="/images/services/window-tinting-2.webp"
                    alt="3M nano ceramic window tint film installation Dubai"
                    width={350}
                    height={280}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-52 object-cover"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(201,168,76,0.1)' }}>
                  <img
                    src="/images/services/window-tinting-3.webp"
                    alt="Totalgard window film applied at Smart Auto UAE Dubai"
                    width={350}
                    height={280}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-52 object-cover"
                  />
                </div>
                <div className="col-span-2 rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(201,168,76,0.1)' }}>
                  <img
                    src="/images/services/window-tinting-4.webp"
                    alt="Mobile car window tinting at your doorstep Dubai — Smart Auto UAE"
                    width={700}
                    height={280}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-52 object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="py-24" style={{ backgroundColor: '#060606' }}>
        <div className="w-full max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[11px] tracking-[0.3em] uppercase mb-3" style={{ color: GOLD }}>Simple Process</p>
            <h2
              className="font-bold text-white"
              style={{ fontFamily: 'var(--font-playfair),serif', fontSize: 'clamp(1.8rem,3vw,2.8rem)' }}
            >
              How Our Window Tinting{' '}
              <span style={{ background: goldGrad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Process Works
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            <div
              className="absolute top-9 left-[12%] w-[76%] h-px pointer-events-none hidden lg:block"
              style={{ background: 'linear-gradient(to right,transparent,rgba(201,168,76,0.2),transparent)' }}
              aria-hidden="true"
            />
            {process.map((step, i) => (
              <motion.div key={step.num} variants={fadeUp} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }}>
                <div
                  className="rounded-2xl p-9 text-center"
                  style={{ background: 'rgba(17,17,17,0.85)', border: '1px solid rgba(201,168,76,0.1)' }}
                >
                  <div
                    className="rounded-full flex items-center justify-center mx-auto mb-5"
                    style={{
                      width: 72, height: 72,
                      background: 'rgba(201,168,76,0.06)',
                      border: '1px solid rgba(201,168,76,0.25)',
                      color: GOLD,
                      fontFamily: 'var(--font-playfair),serif',
                      fontSize: 22,
                      fontWeight: 700,
                    }}
                    aria-hidden="true"
                  >
                    {step.num}
                  </div>
                  <h3 className="text-white font-semibold text-base mb-2">{step.title}</h3>
                  <p className="text-white/40 text-[13px] leading-[1.65]">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LONG FORM SEO CONTENT ── */}
      <section className="py-24" style={{ background: 'linear-gradient(180deg,#080808 0%,#0A0A0A 100%)' }}>
        <div className="w-full max-w-4xl mx-auto px-6">
          <div className="space-y-10">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <h2
                className="font-bold text-white mb-5"
                style={{ fontFamily: 'var(--font-playfair),serif', fontSize: 'clamp(1.5rem,2.5vw,2.2rem)' }}
              >
                Window Tinting Dubai —{' '}
                <span style={{ background: goldGrad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  Does It Reduce Visibility?
                </span>
              </h2>
              <p className="text-white/50 text-base leading-[1.9] mb-4">
                Some drivers worry that adding a window tint will reduce their visibility when driving. The truth is this is only a concern with extreme, illegal window tints. Tints that are dark enough to genuinely limit visibility are not permitted under UAE traffic law — so you do not need to worry when working with a reputable installer.
              </p>
              <p className="text-white/50 text-base leading-[1.9]">
                Any window tint installed by Smart Auto UAE is fully RTA compliant. Rather than reducing visibility, our films <strong className="text-white/70 font-medium">improve daytime driving comfort</strong> by reducing harsh sun glare — the same blinding effect that poses a genuine safety hazard on UAE roads during peak sunlight hours.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} custom={1} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <h2
                className="font-bold text-white mb-5"
                style={{ fontFamily: 'var(--font-playfair),serif', fontSize: 'clamp(1.5rem,2.5vw,2.2rem)' }}
              >
                Reduces Glare at{' '}
                <span style={{ background: goldGrad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  Night &amp; Day
                </span>
              </h2>
              <p className="text-white/50 text-base leading-[1.9] mb-4">
                One of the most underrated safety benefits of window tinting is the reduction in glare during night driving. Many drivers feel less confident at night due to the harsh glare of streetlights and oncoming headlights, which can momentarily blind or disorient them — increasing accident risk.
              </p>
              <p className="text-white/50 text-base leading-[1.9]">
                With a properly applied window tint from Smart Auto UAE, glare from both headlights and streetlights is significantly softened — allowing drivers to maintain better focus on the road, react more quickly, and drive with greater confidence at night.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} custom={2} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <h2
                className="font-bold text-white mb-5"
                style={{ fontFamily: 'var(--font-playfair),serif', fontSize: 'clamp(1.5rem,2.5vw,2.2rem)' }}
              >
                Protection from{' '}
                <span style={{ background: goldGrad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  Shattered Glass
                </span>
              </h2>
              <p className="text-white/50 text-base leading-[1.9] mb-4">
                Every component of a vehicle, including the window glass, is designed to minimise safety risks in the event of a collision. Window tinting film adds another bonded layer to this protection. Because the film adheres to the entire glass surface, it significantly reduces the risk of glass shattering and flying outward in an accident.
              </p>
              <p className="text-white/50 text-base leading-[1.9]">
                While the glass itself may still crack on impact, the tint film holds the pieces together — preventing glass fragments from entering the cabin and reducing the risk of lacerations to occupants. This is a genuine, underappreciated safety benefit that applies to every quality window tint installation.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24" style={{ backgroundColor: '#060606' }}>
        <div className="w-full max-w-4xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-[11px] tracking-[0.3em] uppercase mb-3" style={{ color: GOLD }}>Common Questions</p>
            <h2
              className="font-bold text-white"
              style={{ fontFamily: 'var(--font-playfair),serif', fontSize: 'clamp(1.8rem,3vw,2.8rem)' }}
            >
              Window Tinting{' '}
              <span style={{ background: goldGrad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                FAQs — Dubai
              </span>
            </h2>
            <p className="text-white/40 text-sm mt-4 max-w-xl mx-auto">
              Frequently asked questions about car window tinting in Dubai and the UAE.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── BRANCHES ── */}
      <section className="py-24" style={{ background: 'linear-gradient(180deg,#080808 0%,#0A0A0A 100%)' }}>
        <div className="w-full max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-[11px] tracking-[0.3em] uppercase mb-3" style={{ color: GOLD }}>Window Tinting Near Me</p>
            <h2
              className="font-bold text-white"
              style={{ fontFamily: 'var(--font-playfair),serif', fontSize: 'clamp(1.8rem,3vw,2.8rem)' }}
            >
              4 Branches Across{' '}
              <span style={{ background: goldGrad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Dubai &amp; Sharjah
              </span>
            </h2>
            <p className="text-white/40 text-sm mt-4 max-w-xl mx-auto">
              Walk in to any branch — no appointment needed. Or book our mobile doorstep tinting service to have your car tinted at your home or office.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {branches.map((b, i) => (
              <motion.div key={b.name} variants={fadeUp} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }}>
                <div
                  className="rounded-2xl p-7 flex items-start gap-5"
                  style={{ background: 'rgba(17,17,17,0.85)', border: '1px solid rgba(201,168,76,0.1)' }}
                >
                  <div
                    className="w-11 h-11 min-w-[44px] rounded-xl flex items-center justify-center"
                    style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)', color: GOLD }}
                  >
                    <MapPin size={18} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-base mb-1">{b.name}</h3>
                    <p className="text-white/45 text-sm mb-2">{b.address}</p>
                    <a href={`tel:${b.phone}`} className="text-sm font-medium" style={{ color: GOLD }}>{b.phone}</a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RELATED SERVICES ── */}
      <section className="py-20" style={{ backgroundColor: '#060606' }}>
        <div className="w-full max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2
              className="font-bold text-white"
              style={{ fontFamily: 'var(--font-playfair),serif', fontSize: 'clamp(1.5rem,2.5vw,2.2rem)' }}
            >
              Complete Your Car Protection with{' '}
              <span style={{ background: goldGrad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Our Other Services
              </span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {relatedServices.map((s, i) => (
              <motion.div key={s.name} variants={fadeUp} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }}>
                <a
                  href={s.href}
                  className="block rounded-2xl p-6 h-full transition-all duration-300 hover:border-gold/30 no-underline"
                  style={{ background: 'rgba(17,17,17,0.85)', border: '1px solid rgba(201,168,76,0.1)' }}
                >
                  <h3 className="text-white font-semibold text-base mb-2">{s.name}</h3>
                  <p className="text-white/40 text-[13px] leading-relaxed mb-4">{s.desc}</p>
                  <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold" style={{ color: GOLD }}>
                    Learn More <ArrowRight size={12} />
                  </span>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-24" style={{ background: 'linear-gradient(180deg,#080808 0%,#060606 100%)' }}>
        <div className="w-full max-w-3xl mx-auto px-6 text-center">
          <p className="text-[11px] tracking-[0.3em] uppercase mb-4" style={{ color: GOLD }}>
            Dubai · Sharjah · Doorstep Service · Open Every Day
          </p>
          <h2
            className="font-bold text-white mb-4"
            style={{ fontFamily: 'var(--font-playfair),serif', fontSize: 'clamp(2rem,4vw,3rem)' }}
          >
            Book Your Window Tinting<br />
            <span
              style={{
                background: goldGrad,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              in Dubai Today
            </span>
          </h2>
          <p className="text-white/45 text-base mb-8 max-w-lg mx-auto">
            4 branches across Dubai &amp; Sharjah — or book our mobile doorstep tinting service at your home or office. Free inspection. No hidden charges. Up to 15-year warranty.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="https://wa.me/971524403677"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-sm text-black transition-all duration-300 hover:opacity-90"
              style={{ background: goldGrad }}
            >
              Book on WhatsApp <ArrowRight size={15} />
            </a>
            <a
              href="tel:+971567269666"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-sm border transition-all duration-300"
              style={{ color: GOLD, borderColor: 'rgba(201,168,76,0.3)', background: 'rgba(201,168,76,0.05)' }}
            >
              <Phone size={14} /> +971 56 726 9666
            </a>
          </div>
        </div>
      </section>
<Footer/>
    </main>
  )
}