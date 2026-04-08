'use client'

import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { motion } from 'framer-motion'
import { CheckCircle, ArrowRight, Phone, Shield, Sun, Eye, Zap, Thermometer, Home } from 'lucide-react'
import type { Metadata } from 'next'

const GOLD = '#C9A84C'
const GOLD2 = '#E8C96A'
const GOLD3 = '#A07830'
const goldGrad = `linear-gradient(135deg,${GOLD},${GOLD2},${GOLD3})`

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1, ease } }),
}
const fadeLeft  = { hidden: { opacity: 0, x: -28 }, show: { opacity: 1, x: 0, transition: { duration: 0.7, ease } } }
const fadeRight = { hidden: { opacity: 0, x: 28 },  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease } } }

// ─── DATA ────────────────────────────────────────────────────────────────────

const stats = [
  { value: '90%', label: 'Solar Heat Rejection', desc: 'Keeps your home cool without blocking natural light' },
  { value: '99%', label: 'UV Ray Blockage', desc: 'Protects skin, furniture, floors and valuables' },
  { value: '95%', label: 'Glare Reduction', desc: 'Eliminates glare on screens and reflective surfaces' },
  { value: '30%', label: 'Energy Cost Saving', desc: 'Reduced air conditioning load lowers electricity bills' },
]

const benefits = [
  {
    icon: Thermometer,
    title: 'Heat Control',
    desc: 'Dubai\'s intense summer sun raises indoor temperatures dramatically through untreated glass. Our residential window films reject up to 90% of incoming solar heat, reducing air conditioning load and keeping every room cooler throughout the day.',
  },
  {
    icon: Sun,
    title: 'UV Protection',
    desc: 'UAE has one of the world\'s highest UV indices. Our 3M and Totalgard residential films block 99% of harmful UV-A and UV-B radiation — protecting your skin during daily indoor exposure and preventing furniture, flooring, artwork, and fabrics from fading and yellowing.',
  },
  {
    icon: Eye,
    title: 'Privacy Without Darkness',
    desc: 'One-way privacy films allow you to see clearly outdoors while preventing neighbours and passersby from seeing into your home. Maintain full natural light and your view while enjoying complete daytime privacy — ideal for ground-floor apartments and villas.',
  },
  {
    icon: Shield,
    title: 'Safety & Security',
    desc: 'Safety and security films hold shattered glass together on impact, dramatically reducing injury risk from accidental breakage, forced entry attempts, or extreme weather. Our security-grade films meet international safety standards and are particularly recommended for children\'s rooms and ground-floor windows.',
  },
  {
    icon: Zap,
    title: 'Energy Savings',
    desc: 'By reducing solar heat gain, residential window film significantly lowers your HVAC system\'s workload. Independent studies show energy savings of up to 30% on cooling costs — making window film one of the highest-return home improvements available in the UAE.',
  },
  {
    icon: Home,
    title: 'Interior Protection',
    desc: 'Prolonged UV and infrared exposure bleaches and degrades furniture upholstery, wooden floors, marble surfaces, rugs, curtains, and electronic displays. Window film acts as a permanent invisible sunscreen for everything inside your home.',
  },
]

const filmTypes = [
  {
    name: 'Solar Control Film',
    brand: '3M · Totalgard',
    best: 'Villas, apartments, offices with direct sun exposure',
    features: ['Maximum heat rejection', 'High clarity — no visible tint', 'Reduces glare on screens', 'Energy savings from day one', '5–10 year warranty'],
    price: 'From AED 25/sqft',
  },
  {
    name: 'Privacy Film',
    brand: 'Totalgard · Llumar',
    best: 'Ground-floor rooms, bathrooms, street-facing windows',
    features: ['One-way daytime privacy', 'Full outward visibility retained', 'Available in multiple opacities', 'No adhesive marks on removal', '3–5 year warranty'],
    price: 'From AED 20/sqft',
  },
  {
    name: 'Decorative Film',
    brand: 'Totalgard · 3M',
    best: 'Bathrooms, glass partitions, entrance doors',
    features: ['Frosted, patterned & etched options', 'Permanent privacy solution', 'Easy to clean', 'No alteration to glass structure', '5-year warranty'],
    price: 'From AED 18/sqft',
  },
  {
    name: 'Safety & Security Film',
    brand: '3M Safety Series',
    best: 'Ground floor windows, sliding doors, children\'s rooms',
    features: ['Holds glass together on impact', 'Slows forced entry attempts', 'Meets international safety standards', 'Optically clear — no visual change', '10-year warranty'],
    price: 'From AED 35/sqft',
  },
  {
    name: 'Anti-Glare Film',
    brand: '3M · Totalgard',
    best: 'Home offices, living rooms with TV screens',
    features: ['95% glare reduction', 'Diffuses bright light evenly', 'Reduces eye strain', 'UV protection included', '5-year warranty'],
    price: 'From AED 22/sqft',
  },
  {
    name: 'All-Seasons Ceramic Film',
    brand: '3M All Seasons',
    best: 'Premium villas and apartments seeking maximum performance',
    features: ['Nano ceramic technology', 'Superior heat and UV rejection', 'Non-metallic — no signal interference', 'Crystal clarity, no colour change', '10-year warranty'],
    price: 'From AED 40/sqft',
  },
]

const marbleBenefits = [
  'Protects marble, stone, and quartz countertops from staining',
  'Invisible ultra-thin film — preserves natural texture and appearance',
  'Scratch resistance against daily wear from utensils and cookware',
  'Easy to clean — wipe away spills without penetrating the surface',
  'Extends the life of premium marble without costly resealing',
]

const process = [
  { num: '01', title: 'Free Site Survey', desc: 'Our team visits your home or villa to measure windows, assess sun exposure, and recommend the most suitable film type for each area.' },
  { num: '02', title: 'Film Selection', desc: 'We present samples on your actual glass so you can see exactly how each film looks and performs in your space before committing.' },
  { num: '03', title: 'Professional Installation', desc: 'Our certified installers apply the film with precision — no bubbles, no edges, clean lines. Most residential installations complete in a single day.' },
  { num: '04', title: 'Curing & Handover', desc: 'Films are left to cure and you receive full warranty documentation and aftercare instructions. Visible results from day one.' },
]

const faqs = [
  {
    q: 'Is residential window tinting legal in Dubai?',
    a: 'Yes. Residential window tinting is fully legal in Dubai and the wider UAE. There are no VLT (visible light transmission) restrictions for homes, apartments, and villas — unlike automotive tinting which is regulated by the RTA.',
  },
  {
    q: 'How long does home window tinting last in Dubai?',
    a: 'Premium 3M and Totalgard residential films are rated for 10–15 years in UAE conditions. They are UV-stabilised and tested specifically for high-heat, high-sun environments like the Gulf. Our films carry a 5–10 year manufacturer warranty.',
  },
  {
    q: 'Will window film make my home too dark?',
    a: "No. Modern solar control films reject heat and UV through advanced nano-ceramic and spectrally selective technology — not by darkening the glass. You can reject 70%+ of solar heat while keeping the glass looking nearly clear. We carry a full range of visible light transmission levels from lightly tinted to virtually clear.",
  },
  {
    q: 'Can window film be installed on double-glazed or tinted glass?',
    a: 'Yes, in most cases. We assess your existing glass type during the free site survey to confirm compatibility. Certain high-performance films require specific glass specifications — we advise you honestly before any installation.',
  },
  {
    q: 'Does window film protect marble and stone surfaces?',
    a: 'Window film does not go on countertops directly, but our separate marble and stone protection film service does. We apply a dedicated ultra-thin protective film to marble, quartz, and stone surfaces to prevent staining and scratching.',
  },
  {
    q: 'How long does the installation take for a villa?',
    a: 'A standard 3–4 bedroom villa typically takes 1–2 days depending on the number of windows and film type selected. Individual apartments can usually be completed in a single day.',
  },
  {
    q: 'Can I clean my windows after tinting?',
    a: 'We recommend waiting 30 days before the first wet clean to allow the film to cure fully. After that, clean normally with a soft cloth and non-abrasive, ammonia-free glass cleaner.',
  },
]

const serviceAreas = [
  'Dubai Marina', 'JBR', 'Palm Jumeirah', 'Downtown Dubai', 'Business Bay',
  'JVC', 'JLT', 'Arabian Ranches', 'Mirdif', 'Al Quoz', 'Al Barsha',
  'Jumeirah', 'Umm Suqeim', 'Silicon Oasis', 'Sports City', 'Sharjah',
  'Discovery Gardens', 'International City', 'Motor City', 'The Greens',
]

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function ResidentialWindowTintingPage() {
  return (
    <main style={{ background: '#0A0A0A', paddingTop: '80px' }}>
<Navbar/>
      {/* ── HERO ── */}
      <section
        className="relative py-24 overflow-hidden"
        style={{ background: 'linear-gradient(180deg,#050505 0%,#080808 100%)' }}
      >
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
          style={{ background: 'radial-gradient(ellipse at 70% 50%,rgba(201,168,76,0.07) 0%,transparent 60%)' }} />
        <div className="absolute top-0 left-0 right-0 h-px pointer-events-none" aria-hidden="true"
          style={{ background: 'linear-gradient(to right,transparent,rgba(201,168,76,0.2),transparent)' }} />

        <div className="w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div variants={fadeLeft} initial="hidden" animate="show">
            <p className="text-[11px] tracking-[0.3em] uppercase mb-4" style={{ color: GOLD }}>
              3M · Totalgard · Llumar — Authorised UAE Installer
            </p>
            <h1
              className="font-bold text-white leading-[1.1] mb-5"
              style={{ fontFamily: 'var(--font-playfair),serif', fontSize: 'clamp(2.5rem,5vw,4rem)' }}
            >
              Residential Window
              <br />
              <span style={{ background: goldGrad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Tinting Dubai & UAE
              </span>
            </h1>
            <p className="text-white/50 text-base leading-[1.85] mb-8 max-w-xl">
              Smart Auto UAE installs premium <strong className="text-white/75 font-medium">residential window tinting</strong> for homes, villas, apartments, and flat glass across Dubai and Sharjah. Our 3M and Totalgard films block up to 99% UV rays, reject 90% of solar heat, and reduce energy bills by up to 30% — while maintaining your view and filling your home with natural light. UAE authorised installer. Free site survey included.
            </p>
            <div className="flex flex-col gap-2.5 mb-8">
              {[
                'Free site survey & film consultation',
                '3M, Totalgard & Llumar authorised installer',
                'No VLT restrictions — full range of tints',
                'Villas, apartments, flat glass & skylights',
                'Marble & surface protection film also available',
              ].map((p) => (
                <div key={p} className="flex items-center gap-3">
                  <CheckCircle size={15} style={{ color: GOLD, flexShrink: 0 }} />
                  <span className="text-white/60 text-sm">{p}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-3 flex-wrap">
              <a
                href="https://wa.me/971524403677"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-black"
                style={{ background: goldGrad }}
              >
                Book Free Survey <ArrowRight size={15} />
              </a>
              <a
                href="tel:+971524403677"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm border"
                style={{ color: GOLD, borderColor: 'rgba(201,168,76,0.3)', background: 'rgba(201,168,76,0.05)' }}
              >
                <Phone size={14} /> +971 52 440 3677
              </a>
            </div>
          </motion.div>

          <motion.div variants={fadeRight} initial="hidden" animate="show"
            className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(201,168,76,0.15)' }}>
            <img
              src="/images/services/residential-tinting-hero.webp"
              alt="Residential window tinting Dubai — 3M and Totalgard home window film installation by Smart Auto UAE"
              width={700} height={500} loading="eager" decoding="async"
              className="w-full h-full object-cover" style={{ maxHeight: '480px' }}
            />
          </motion.div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section
        className="py-14"
        style={{ backgroundColor: '#060606', borderTop: '1px solid rgba(201,168,76,0.08)', borderBottom: '1px solid rgba(201,168,76,0.08)' }}
      >
        <div className="w-full max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="text-center"
              >
                <p
                  className="font-bold leading-none mb-2"
                  style={{
                    fontFamily: 'var(--font-playfair),serif',
                    fontSize: 'clamp(2.2rem,4vw,3rem)',
                    background: goldGrad,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {stat.value}
                </p>
                <p className="text-white font-semibold text-sm mb-1">{stat.label}</p>
                <p className="text-white/35 text-[12px] leading-snug">{stat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section className="py-24" style={{ background: 'linear-gradient(180deg,#080808 0%,#0A0A0A 100%)' }}>
        <div className="w-full max-w-7xl mx-auto px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-16">
            <p className="text-[11px] tracking-[0.3em] uppercase mb-3 text-center" style={{ color: GOLD }}>
              Home Window Film Benefits
            </p>
            <h2
              className="font-bold text-white text-center"
              style={{ fontFamily: 'var(--font-playfair),serif', fontSize: 'clamp(1.8rem,3vw,2.8rem)' }}
            >
              Why Dubai Homeowners Choose{' '}
              <span style={{ background: goldGrad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Window Tinting
              </span>
            </h2>
            <p className="text-white/40 text-sm text-center mt-4 max-w-2xl mx-auto leading-relaxed">
              The UAE has one of the world&apos;s highest UV indices and extreme summer temperatures. Home window film is not a luxury — it is one of the most practical investments a Dubai homeowner can make.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <motion.div key={b.title} variants={fadeUp} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }}>
                <div
                  className="rounded-2xl p-8 h-full"
                  style={{ background: 'rgba(17,17,17,0.85)', border: '1px solid rgba(201,168,76,0.1)' }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                    style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)', color: GOLD }}
                  >
                    <b.icon size={22} aria-hidden="true" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-3" style={{ fontFamily: 'var(--font-playfair),serif' }}>
                    {b.title}
                  </h3>
                  <p className="text-white/45 text-sm leading-[1.8]">{b.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FILM TYPES ── */}
      <section className="py-24" style={{ backgroundColor: '#060606' }}>
        <div className="w-full max-w-7xl mx-auto px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-14">
            <p className="text-[11px] tracking-[0.3em] uppercase mb-3 text-center" style={{ color: GOLD }}>
              Film Options
            </p>
            <h2
              className="font-bold text-white text-center"
              style={{ fontFamily: 'var(--font-playfair),serif', fontSize: 'clamp(1.8rem,3vw,2.8rem)' }}
            >
              Residential Window Films We{' '}
              <span style={{ background: goldGrad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Install in UAE
              </span>
            </h2>
            <p className="text-white/40 text-sm text-center mt-4 max-w-xl mx-auto">
              Every home is different. We help you choose the right film for each window based on orientation, sun exposure, and your priorities.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filmTypes.map((film, i) => (
              <motion.div key={film.name} variants={fadeUp} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }}>
                <div
                  className="rounded-2xl p-8 h-full flex flex-col"
                  style={{ background: 'rgba(17,17,17,0.85)', border: '1px solid rgba(201,168,76,0.12)' }}
                >
                  <p className="text-[10px] tracking-[0.2em] uppercase mb-1.5" style={{ color: GOLD }}>{film.brand}</p>
                  <h3
                    className="text-white font-bold text-xl mb-2"
                    style={{ fontFamily: 'var(--font-playfair),serif' }}
                  >
                    {film.name}
                  </h3>
                  <p className="text-white/35 text-[12px] mb-5 leading-snug">Best for: {film.best}</p>
                  <ul className="flex flex-col gap-2.5 mb-6 flex-1">
                    {film.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-[13px] text-white/55">
                        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: GOLD }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <span
                      className="font-bold text-lg"
                      style={{ background: goldGrad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
                    >
                      {film.price}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-24" style={{ background: 'linear-gradient(180deg,#080808 0%,#0A0A0A 100%)' }}>
        <div className="w-full max-w-7xl mx-auto px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-14">
            <p className="text-[11px] tracking-[0.3em] uppercase mb-3 text-center" style={{ color: GOLD }}>Installation Process</p>
            <h2
              className="font-bold text-white text-center"
              style={{ fontFamily: 'var(--font-playfair),serif', fontSize: 'clamp(1.8rem,3vw,2.8rem)' }}
            >
              How Residential Window Tinting{' '}
              <span style={{ background: goldGrad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Works
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            <div
              className="absolute top-9 left-[12%] w-[76%] h-px pointer-events-none hidden lg:block"
              style={{ background: 'linear-gradient(to right,transparent,rgba(201,168,76,0.25),transparent)' }}
              aria-hidden="true"
            />
            {process.map((step, i) => (
              <motion.div key={step.num} variants={fadeUp} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }}>
                <div
                  className="rounded-2xl p-8 text-center h-full"
                  style={{ background: 'rgba(17,17,17,0.85)', border: '1px solid rgba(201,168,76,0.1)' }}
                >
                  <div
                    className="rounded-full flex items-center justify-center mx-auto mb-5"
                    style={{
                      width: 64, height: 64,
                      background: 'rgba(201,168,76,0.06)',
                      border: '1px solid rgba(201,168,76,0.25)',
                      color: GOLD,
                      fontFamily: 'var(--font-playfair),serif',
                      fontSize: 20,
                      fontWeight: 700,
                    }}
                    aria-hidden="true"
                  >
                    {step.num}
                  </div>
                  <h3 className="text-white font-semibold text-base mb-2.5">{step.title}</h3>
                  <p className="text-white/40 text-[13px] leading-[1.7]">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MARBLE PROTECTION ── */}
      <section className="py-24" style={{ backgroundColor: '#060606' }}>
        <div className="w-full max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div variants={fadeLeft} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <p className="text-[11px] tracking-[0.3em] uppercase mb-4" style={{ color: GOLD }}>Additional Service</p>
              <h2
                className="font-bold text-white leading-[1.2] mb-5"
                style={{ fontFamily: 'var(--font-playfair),serif', fontSize: 'clamp(1.8rem,3vw,2.6rem)' }}
              >
                Marble &amp; Stone Surface{' '}
                <span style={{ background: goldGrad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  Protection Film
                </span>
              </h2>
              <p className="text-white/50 text-base leading-[1.85] mb-6">
                In Dubai&apos;s luxury residential market, marble and stone countertops, floors, and feature walls are standard. Maintaining their beauty against daily wear, stains, and scratches is a constant challenge. Smart Auto UAE offers a dedicated <strong className="text-white/70 font-medium">marble and surface protection film</strong> service that applies an invisible ultra-thin barrier to your stone surfaces — preserving their natural lustre without changing their appearance.
              </p>
              <ul className="flex flex-col gap-3 mb-8">
                {marbleBenefits.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <CheckCircle size={15} style={{ color: GOLD, flexShrink: 0, marginTop: 2 }} />
                    <span className="text-white/60 text-sm">{b}</span>
                  </li>
                ))}
              </ul>
              <a
                href="https://wa.me/971524403677"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-black"
                style={{ background: goldGrad }}
              >
                Enquire About Marble Protection <ArrowRight size={15} />
              </a>
            </motion.div>

            <motion.div variants={fadeRight} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(201,168,76,0.15)' }}>
              <img
                src="/images/services/marble-protection.webp"
                alt="Marble and stone countertop protection film Dubai — Smart Auto UAE"
                width={700} height={480} loading="lazy" decoding="async"
                className="w-full h-full object-cover" style={{ maxHeight: '440px' }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── WHY SMART AUTO ── */}
      <section className="py-24" style={{ background: 'linear-gradient(180deg,#080808 0%,#0A0A0A 100%)' }}>
        <div className="w-full max-w-7xl mx-auto px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-14">
            <p className="text-[11px] tracking-[0.3em] uppercase mb-3 text-center" style={{ color: GOLD }}>Why Choose Us</p>
            <h2
              className="font-bold text-white text-center"
              style={{ fontFamily: 'var(--font-playfair),serif', fontSize: 'clamp(1.8rem,3vw,2.8rem)' }}
            >
              Dubai&apos;s Trusted Residential{' '}
              <span style={{ background: goldGrad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Window Tinting Specialists
              </span>
            </h2>
            <p className="text-white/40 text-sm text-center mt-4 max-w-2xl mx-auto leading-relaxed">
              Smart Auto UAE has been installing window film in Dubai and Sharjah homes since 2014. We are an authorised distributor and installer for 3M, Totalgard, and Llumar — using only genuine manufacturer products backed by full warranties.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Free Site Survey', body: 'We visit your home before any commitment — measure every window, assess sun exposure and privacy needs, and present honest recommendations.' },
              { title: 'Authorised Installer', body: 'Smart Auto UAE is an authorised dealer and installer for 3M, Totalgard, and Llumar residential film products. No grey-market products, ever.' },
              { title: 'Manufacturer Warranty', body: 'All residential films carry 3–10 year manufacturer warranties. We provide full documentation at handover — not just a receipt.' },
              { title: 'Minimal Disruption', body: 'Our installers work efficiently and respectfully in your home. Most residential installations are completed in a single day with no mess left behind.' },
              { title: 'Same-Day Quotation', body: 'After the site survey, you receive a detailed itemised quote the same day — broken down by room and film type. No vague estimates.' },
              { title: '4 Branches UAE', body: 'MotorCity, Al Quoz, Mirdif, and Sharjah — our teams serve all areas of Dubai and Sharjah with consistent, reliable service standards.' },
            ].map((item, i) => (
              <motion.div key={item.title} variants={fadeUp} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }}>
                <div
                  className="rounded-2xl p-7 h-full"
                  style={{ background: 'rgba(17,17,17,0.85)', border: '1px solid rgba(201,168,76,0.1)' }}
                >
                  <div
                    className="w-1 h-8 rounded-full mb-4"
                    style={{ background: goldGrad }}
                    aria-hidden="true"
                  />
                  <h3 className="text-white font-semibold text-base mb-2">{item.title}</h3>
                  <p className="text-white/40 text-[13px] leading-[1.7]">{item.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICE AREAS ── */}
      <section className="py-20" style={{ backgroundColor: '#060606' }}>
        <div className="w-full max-w-7xl mx-auto px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-10">
            <p className="text-[11px] tracking-[0.3em] uppercase mb-3 text-center" style={{ color: GOLD }}>
              Home Window Tinting Near Me
            </p>
            <h2
              className="font-bold text-white text-center"
              style={{ fontFamily: 'var(--font-playfair),serif', fontSize: 'clamp(1.8rem,3vw,2.6rem)' }}
            >
              Residential Tinting Across{' '}
              <span style={{ background: goldGrad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                All Dubai Areas
              </span>
            </h2>
            <p className="text-white/40 text-sm text-center mt-3 max-w-xl mx-auto">
              We provide home window tinting, villa window tinting, and flat glass tinting services across all Dubai communities and Sharjah.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-wrap gap-2.5 justify-center"
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          >
            {serviceAreas.map((area) => (
              <span
                key={area}
                className="px-4 py-2 rounded-full text-[13px] border"
                style={{
                  borderColor: 'rgba(201,168,76,0.15)',
                  background: 'rgba(255,255,255,0.02)',
                  color: 'rgba(255,255,255,0.45)',
                }}
              >
                {area}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24" style={{ backgroundColor: '#080808' }}>
        <div className="w-full max-w-4xl mx-auto px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-14">
            <p className="text-[11px] tracking-[0.3em] uppercase mb-3 text-center" style={{ color: GOLD }}>Common Questions</p>
            <h2
              className="font-bold text-white text-center"
              style={{ fontFamily: 'var(--font-playfair),serif', fontSize: 'clamp(1.8rem,3vw,2.6rem)' }}
            >
              Home Window Tinting{' '}
              <span style={{ background: goldGrad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                FAQs
              </span>
            </h2>
          </motion.div>

          <div className="flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="rounded-2xl overflow-hidden"
                style={{ border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}
              >
                <summary className="px-7 py-5 cursor-pointer text-white font-medium text-[15px] list-none flex justify-between items-center gap-4">
                  <span>{faq.q}</span>
                  <span style={{ color: GOLD, flexShrink: 0, fontSize: '1.2rem', lineHeight: 1 }}>+</span>
                </summary>
                <p className="px-7 pb-6 text-white/50 text-sm leading-[1.8]">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24" style={{ backgroundColor: '#060606' }}>
        <div className="w-full max-w-7xl mx-auto px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="relative rounded-3xl p-16 md:p-20 text-center overflow-hidden"
            style={{
              border: '1px solid rgba(201,168,76,0.2)',
              background: 'linear-gradient(135deg,rgba(201,168,76,0.1) 0%,rgba(201,168,76,0.04) 50%,rgba(201,168,76,0.08) 100%)',
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at center,rgba(201,168,76,0.06) 0%,transparent 60%)' }}
              aria-hidden="true"
            />
            <p className="text-[11px] tracking-[0.3em] uppercase mb-4 relative z-10" style={{ color: GOLD }}>
              Residential Window Tinting · Dubai &amp; Sharjah · Free Site Survey
            </p>
            <h2
              className="font-bold text-white mb-4 relative z-10"
              style={{ fontFamily: 'var(--font-playfair),serif', fontSize: 'clamp(2rem,4vw,3rem)' }}
            >
              Transform Your Home with<br />
              <span style={{ background: goldGrad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Window Tinting in Dubai
              </span>
            </h2>
            <p className="text-white/50 text-base mb-8 max-w-lg mx-auto relative z-10">
              Book a free site survey today. Our team visits your home, recommends the right film, and provides a detailed quote — with no obligation to proceed.
            </p>
            <div className="flex gap-4 justify-center flex-wrap relative z-10">
              <a
                href="https://wa.me/971524403677"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm text-black"
                style={{ background: goldGrad }}
              >
                Book Free Survey on WhatsApp <ArrowRight size={16} />
              </a>
              <a
                href="tel:+971524403677"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm border"
                style={{ color: GOLD, borderColor: 'rgba(201,168,76,0.3)', background: 'rgba(201,168,76,0.05)' }}
              >
                <Phone size={16} /> +971 52 440 3677
              </a>
            </div>
          </motion.div>
        </div>
      </section>
<Footer/>
    </main>
  )
}