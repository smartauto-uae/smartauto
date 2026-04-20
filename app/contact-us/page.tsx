'use client'

import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, MessageCircle, ArrowRight, ChevronRight } from 'lucide-react'
const GOLD = '#C9A84C'
const GOLD2 = '#E8C96A'
const GOLD3 = '#A07830'
const goldGrad = `linear-gradient(135deg,${GOLD},${GOLD2},${GOLD3})`

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]
const fadeUp    = { hidden: { opacity: 0, y: 28 }, show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1, ease } }) }
const fadeLeft  = { hidden: { opacity: 0, x: -28 }, show: { opacity: 1, x: 0, transition: { duration: 0.7, ease } } }
const fadeRight = { hidden: { opacity: 0, x: 28 },  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease } } }

const branches = [
  {
    name: 'MotorCity',
    badge: 'Main Branch',
    city: 'Dubai',
    address: 'MotorCity, Dubai, UAE',
    phone: '+971 56 726 9666',
    whatsapp: '971567269666',
    hours: '11:00 AM – 9:00 PM',
    days: 'Every Day',
    mapsUrl: 'https://maps.google.com/?q=MotorCity+Dubai+Smart+Auto',
  },
  {
    name: 'Al Quoz',
    badge: null,
    city: 'Dubai',
    address: 'D16 Road, Al Quoz 4, Warehouse 6\nBehind JOTUN Warehouse, Dubai',
    phone: '+971 56 726 9666',
    whatsapp: '971567269666',
    hours: '11:00 AM – 9:30 PM',
    days: 'Every Day',
    mapsUrl: 'https://maps.google.com/?q=Al+Quoz+4+Warehouse+6+D16+Road+Dubai',
  },
  {
    name: 'Mirdif · Uptown Mall',
    badge: null,
    city: 'Dubai',
    address: 'Uptown Mall, Mirdif\nDubai, UAE',
    phone: '+971 55 782 3731',
    whatsapp: '971557823731',
    hours: '11:00 AM – 10:00 PM',
    days: 'Every Day',
    mapsUrl: 'https://maps.google.com/?q=Uptown+Mall+Mirdif+Dubai',
  },
  {
    name: 'Central Mall',
    badge: 'Sharjah',
    city: 'Sharjah',
    address: 'Central Mall\nSharjah, UAE',
    phone: '+971 56 425 5770',
    whatsapp: '971564255770',
    hours: '10:00 AM – 10:00 PM',
    days: 'Every Day',
    mapsUrl: 'https://maps.google.com/?q=Central+Mall+Sharjah',
  },
]

const services = [
  'Car Window Tinting',
  'Residential Window Tinting',
  'Commercial Window Tinting',
  'Marine Window Tinting',
  'Paint Protection Film (PPF)',
  'Colour PPF',
  'Nano Ceramic Coating',
  'Smart Film',
  'Surface Protection Film',
  'Marble Protection Film',
]

export default function ContactPage() {
  return (
    <main style={{ background: '#0A0A0A', paddingTop: '80px' }}>
<Navbar/>
      {/* ── HERO ── */}
      <section
        className="relative py-20 overflow-hidden"
        style={{ background: 'linear-gradient(180deg,#050505 0%,#080808 100%)' }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{ background: 'radial-gradient(ellipse at 50% 60%,rgba(201,168,76,0.06) 0%,transparent 60%)' }}
        />
        <div
          className="absolute top-0 left-0 right-0 h-px pointer-events-none"
          aria-hidden="true"
          style={{ background: 'linear-gradient(to right,transparent,rgba(201,168,76,0.2),transparent)' }}
        />
        <div className="w-full max-w-7xl mx-auto px-6 text-center">
          <motion.div variants={fadeUp} initial="hidden" animate="show">
            <p
              className="text-[11px] tracking-[0.3em] uppercase mb-4"
              style={{ color: GOLD }}
            >
              4 Branches · Open Every Day · Free Consultation
            </p>
            <h1
              className="font-bold text-white leading-[1.1] mb-5"
              style={{ fontFamily: 'var(--font-playfair),serif', fontSize: 'clamp(2.5rem,5vw,4rem)' }}
            >
              Get in Touch with{' '}
              <span
                style={{
                  background: goldGrad,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Smart Auto UAE
              </span>
            </h1>
            <p className="text-white/50 text-base leading-[1.85] max-w-2xl mx-auto mb-10">
              4 branches across Dubai and Sharjah, open 7 days a week — including weekends and
              public holidays. Call, WhatsApp, or visit us for a free consultation on window
              tinting, PPF, ceramic coating, and surface protection.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <a
                href="https://wa.me/971567269666"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl font-semibold text-sm text-black"
                style={{ background: goldGrad }}
              >
                <MessageCircle size={16} aria-hidden="true" /> WhatsApp Us
              </a>
              <a
                href="tel:+971567269666"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl font-semibold text-sm border"
                style={{ color: GOLD, borderColor: 'rgba(201,168,76,0.3)', background: 'rgba(201,168,76,0.05)' }}
              >
                <Phone size={15} aria-hidden="true" /> +971 56 726 9666
              </a>
              <a
                href="mailto:info@smartautouae.ae"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl font-semibold text-sm border"
                style={{ color: 'rgba(255,255,255,0.6)', borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)' }}
              >
                <Mail size={15} aria-hidden="true" /> info@smartautouae.ae
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CONTACT METHODS ── */}
      <section
        className="py-14"
        style={{
          backgroundColor: '#060606',
          borderTop: '1px solid rgba(201,168,76,0.08)',
          borderBottom: '1px solid rgba(201,168,76,0.08)',
        }}
      >
        <div className="w-full max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: MessageCircle,
                label: 'WhatsApp',
                value: '+971 56 726 9666',
                note: 'Fastest response · Chat instantly',
                href: 'https://wa.me/971567269666',
                cta: 'Message on WhatsApp',
                primary: true,
              },
              {
                icon: Phone,
                label: 'Phone',
                value: '+971 56 726 9666',
                note: 'Call us · Any day 11AM – 9PM',
                href: 'tel:+971567269666',
                cta: 'Call Now',
                primary: false,
              },
              {
                icon: Mail,
                label: 'Email',
                value: 'info@smartautouae.ae',
                note: 'Quotes, projects & partnerships',
                href: 'mailto:info@smartautouae.ae',
                cta: 'Send Email',
                primary: false,
              },
            ].map((method, i) => (
              <motion.div
                key={method.label}
                variants={fadeUp} custom={i}
                initial="hidden" whileInView="show" viewport={{ once: true }}
              >
                <div
                  className="rounded-2xl p-8 h-full flex flex-col"
                  style={{
                    background: method.primary ? 'rgba(201,168,76,0.06)' : 'rgba(17,17,17,0.85)',
                    border: method.primary ? '1px solid rgba(201,168,76,0.25)' : '1px solid rgba(201,168,76,0.08)',
                  }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)', color: GOLD }}
                  >
                    <method.icon size={20} aria-hidden="true" />
                  </div>
                  <p className="text-[11px] tracking-[0.2em] uppercase mb-1" style={{ color: GOLD }}>
                    {method.label}
                  </p>
                  <p
                    className="text-white font-bold text-lg mb-1"
                    style={{ fontFamily: 'var(--font-playfair),serif' }}
                  >
                    {method.value}
                  </p>
                  <p className="text-white/35 text-[12px] mb-6 flex-1">{method.note}</p>
                  <a
                    href={method.href}
                    target={method.href.startsWith('http') ? '_blank' : undefined}
                    rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="inline-flex items-center gap-2 font-semibold text-sm"
                    style={{ color: GOLD }}
                  >
                    {method.cta} <ArrowRight size={13} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BRANCHES ── */}
      <section className="py-24" style={{ background: 'linear-gradient(180deg,#080808 0%,#0A0A0A 100%)' }}>
        <div className="w-full max-w-7xl mx-auto px-6">
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="mb-14"
          >
            <p className="text-[11px] tracking-[0.3em] uppercase mb-3 text-center" style={{ color: GOLD }}>
              Our Locations
            </p>
            <h2
              className="font-bold text-white text-center"
              style={{ fontFamily: 'var(--font-playfair),serif', fontSize: 'clamp(1.8rem,3vw,2.8rem)' }}
            >
                           4 Branches Across{' '}
              <span
                style={{
                  background: goldGrad,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Dubai &amp; Sharjah
              </span>
            </h2>
            <p className="text-white/40 text-sm text-center mt-4 max-w-xl mx-auto">
              Walk in, call ahead, or book a free on-site consultation. All branches open every
              day including weekends and public holidays.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {branches.map((branch, i) => (
              <motion.div
                key={branch.name}
                variants={fadeUp} custom={i}
                initial="hidden" whileInView="show" viewport={{ once: true }}
              >
                <div
                  className="rounded-2xl p-8 h-full flex flex-col"
                  style={{ background: 'rgba(17,17,17,0.85)', border: '1px solid rgba(201,168,76,0.12)' }}
                >
                  <div className="flex items-start justify-between gap-3 mb-5">
                    <div>
                      <div className="flex items-center gap-2.5 mb-1">
                        <h3
                          className="text-white font-bold text-xl"
                          style={{ fontFamily: 'var(--font-playfair),serif' }}
                        >
                          {branch.name}
                        </h3>
                        {branch.badge && (
                          <span
                            className="text-[10px] tracking-[0.15em] uppercase px-2.5 py-0.5 rounded-full font-semibold"
                            style={{
                              background: 'rgba(201,168,76,0.12)',
                              color: GOLD,
                              border: '1px solid rgba(201,168,76,0.25)',
                            }}
                          >
                            {branch.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[12px] font-medium" style={{ color: 'rgba(201,168,76,0.65)' }}>
                        {branch.city}, UAE
                      </p>
                    </div>
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.15)', color: GOLD }}
                    >
                      <MapPin size={16} aria-hidden="true" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 flex-1">
                    <div className="flex items-start gap-3">
                      <MapPin size={14} style={{ color: 'rgba(201,168,76,0.5)', flexShrink: 0, marginTop: 2 }} aria-hidden="true" />
                      <p className="text-white/50 text-[13px] leading-snug whitespace-pre-line">
                        {branch.address}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone size={14} style={{ color: 'rgba(201,168,76,0.5)', flexShrink: 0 }} aria-hidden="true" />
                      <a
                        href={`tel:${branch.phone}`}
                        className="text-white/50 text-[13px] hover:text-white transition-colors"
                      >
                        {branch.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock size={14} style={{ color: 'rgba(201,168,76,0.5)', flexShrink: 0 }} aria-hidden="true" />
                      <p className="text-white/50 text-[13px]">
                        <span className="text-white/75">{branch.hours}</span>
                        {'  ·  '}{branch.days}
                      </p>
                    </div>
                  </div>

                  <div
                    className="flex gap-3 mt-6 pt-6"
                    style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
                  >
                    <a
                      href={branch.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-[13px] border transition-colors"
                      style={{ borderColor: 'rgba(201,168,76,0.2)', color: GOLD, background: 'rgba(201,168,76,0.04)' }}
                    >
                      <MapPin size={13} /> Get Directions
                    </a>
                    <a
                      href={`https://wa.me/${branch.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-[13px] text-black"
                      style={{ background: goldGrad }}
                    >
                      <MessageCircle size={13} /> WhatsApp
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT FORM + SIDEBAR ── */}
      <section className="py-24" style={{ backgroundColor: '#060606' }}>
        <div className="w-full max-w-7xl mx-auto px-6">
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="mb-14"
          >
            <p className="text-[11px] tracking-[0.3em] uppercase mb-3 text-center" style={{ color: GOLD }}>
              Send a Message
            </p>
            <h2
              className="font-bold text-white text-center"
              style={{ fontFamily: 'var(--font-playfair),serif', fontSize: 'clamp(1.8rem,3vw,2.8rem)' }}
            >
              Tell Us About Your{' '}
              <span
                style={{
                  background: goldGrad,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Project
              </span>
            </h2>
            <p className="text-white/40 text-sm text-center mt-4 max-w-xl mx-auto">
              Fill in the form and our team will respond within a few hours. For an instant
              reply, message us directly on WhatsApp.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

            {/* ── FORM ── */}
            <motion.div
              variants={fadeLeft} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <form
                className="rounded-2xl p-8 md:p-10"
                style={{ background: 'rgba(17,17,17,0.85)', border: '1px solid rgba(201,168,76,0.12)' }}
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="name"
                      className="text-[12px] font-semibold tracking-wide uppercase"
                      style={{ color: 'rgba(201,168,76,0.7)' }}
                    >
                      Full Name *
                    </label>
                    <input
                      id="name" name="name" type="text" required
                      placeholder="Your name"
                      className="rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="phone"
                      className="text-[12px] font-semibold tracking-wide uppercase"
                      style={{ color: 'rgba(201,168,76,0.7)' }}
                    >
                      Phone / WhatsApp *
                    </label>
                    <input
                      id="phone" name="phone" type="tel" required
                      placeholder="+971 5X XXX XXXX"
                      className="rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="email"
                      className="text-[12px] font-semibold tracking-wide uppercase"
                      style={{ color: 'rgba(201,168,76,0.7)' }}
                    >
                      Email Address
                    </label>
                    <input
                      id="email" name="email" type="email"
                      placeholder="you@example.com"
                      className="rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="branch"
                      className="text-[12px] font-semibold tracking-wide uppercase"
                      style={{ color: 'rgba(201,168,76,0.7)' }}
                    >
                      Preferred Branch
                    </label>
                    <select
                      id="branch" name="branch"
                      className="rounded-xl px-4 py-3 text-sm text-white/70 outline-none appearance-none"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                    >
                      <option value="" style={{ background: '#111' }}>Any branch</option>
                      <option value="motorcity" style={{ background: '#111' }}>MotorCity · Dubai</option>
                      <option value="alquoz" style={{ background: '#111' }}>Al Quoz · Dubai</option>
                      <option value="mirdif" style={{ background: '#111' }}>Mirdif · Uptown Mall · Dubai</option>
                      <option value="sharjah" style={{ background: '#111' }}>Central Mall · Sharjah</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-2 mb-5">
                  <label
                    className="text-[12px] font-semibold tracking-wide uppercase"
                    style={{ color: 'rgba(201,168,76,0.7)' }}
                  >
                    Service Required
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {services.map((svc) => (
                      <label
                        key={svc}
                        className="flex items-center gap-2 px-3.5 py-2 rounded-xl cursor-pointer text-[12px] border transition-colors hover:border-[rgba(201,168,76,0.3)] hover:text-white/70"
                        style={{
                          borderColor: 'rgba(255,255,255,0.08)',
                          background: 'rgba(255,255,255,0.02)',
                          color: 'rgba(255,255,255,0.45)',
                        }}
                      >
                        <input type="checkbox" name="service" value={svc} className="sr-only" />
                        {svc}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2 mb-7">
                  <label
                    htmlFor="message"
                    className="text-[12px] font-semibold tracking-wide uppercase"
                    style={{ color: 'rgba(201,168,76,0.7)' }}
                  >
                    Message / Details
                  </label>
                  <textarea
                    id="message" name="message" rows={5}
                    placeholder="Tell us about your car, home, yacht, or project — include any specific requirements."
                    className="rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none resize-none"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm text-black"
                  style={{ background: goldGrad }}
                >
                  Send Message <ArrowRight size={16} />
                </button>
                <p className="text-white/25 text-[11px] text-center mt-4">
                  We typically respond within 2–4 hours. For instant help, WhatsApp us directly.
                </p>
              </form>
            </motion.div>

            {/* ── SIDEBAR ── */}
            <motion.div
              variants={fadeRight} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="flex flex-col gap-5"
            >

              {/* Opening hours */}
              <div
                className="rounded-2xl p-7"
                style={{ background: 'rgba(17,17,17,0.85)', border: '1px solid rgba(201,168,76,0.12)' }}
              >
                <div className="flex items-center gap-2.5 mb-5">
                  <Clock size={16} style={{ color: GOLD }} aria-hidden="true" />
                  <h3 className="text-white font-semibold text-base">Opening Hours</h3>
                </div>
                <p
                  className="text-[11px] tracking-[0.15em] uppercase mb-4 font-medium"
                  style={{ color: 'rgba(201,168,76,0.55)' }}
                >
                  All branches · 7 days a week
                </p>
                <div className="flex flex-col gap-3">
                  {branches.map((b) => (
                    <div key={b.name} className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-white text-[13px] font-medium">{b.name}</p>
                        <p className="text-white/30 text-[11px]">{b.city}</p>
                      </div>
                      <p className="text-white/50 text-[12px] text-right leading-snug">{b.hours}</p>
                    </div>
                  ))}
                </div>
                <div
                  className="mt-5 pt-5 flex items-center gap-2"
                  style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
                >
                  <div
                    className="w-2 h-2 rounded-full animate-pulse flex-shrink-0"
                    style={{ background: '#4ade80' }}
                    aria-hidden="true"
                  />
                  <p className="text-[12px] text-white/40">Including weekends &amp; public holidays</p>
                </div>
              </div>

              {/* Social */}
<div
  className="rounded-2xl p-7"
  style={{ background: 'rgba(17,17,17,0.85)', border: '1px solid rgba(201,168,76,0.12)' }}
>
  <h3 className="text-white font-semibold text-base mb-4">Follow Us</h3>
  <div className="flex flex-col gap-3">

    {/* Instagram */}
    <a
      href="https://www.instagram.com/smartautouae/"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3"
    >
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.15)', color: GOLD }}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      </div>
      <div className="flex-1">
        <p className="text-white text-[13px] font-medium">@smartautouae</p>
        <p className="text-white/35 text-[11px]">Instagram</p>
      </div>
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="9 18 15 12 9 6" />
      </svg>
    </a>

    {/* Facebook */}
    <a
      href="https://www.facebook.com/smartautoaccessories/"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3"
    >
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.15)', color: GOLD }}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      </div>
      <div className="flex-1">
        <p className="text-white text-[13px] font-medium">Smart Auto Accessories</p>
        <p className="text-white/35 text-[11px]">Facebook</p>
      </div>
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="9 18 15 12 9 6" />
      </svg>
    </a>

  </div>
</div>
              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/971567269666"
                target="_blank" rel="noopener noreferrer"
                className="rounded-2xl p-7 flex flex-col gap-3 relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg,rgba(201,168,76,0.12) 0%,rgba(201,168,76,0.05) 100%)',
                  border: '1px solid rgba(201,168,76,0.22)',
                }}
              >
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'radial-gradient(ellipse at top left,rgba(201,168,76,0.08) 0%,transparent 60%)' }}
                  aria-hidden="true"
                />
                <MessageCircle size={22} style={{ color: GOLD }} aria-hidden="true" />
                <div>
                  <p
                    className="text-white font-bold text-base mb-1"
                    style={{ fontFamily: 'var(--font-playfair),serif' }}
                  >
                    Instant Reply on WhatsApp
                  </p>
                  <p className="text-white/45 text-[13px] leading-snug">
                    Fastest way to reach us. Send photos, ask questions, or book a consultation
                    — we reply instantly.
                  </p>
                </div>
                <div className="inline-flex items-center gap-1.5 font-semibold text-sm" style={{ color: GOLD }}>
                  Open WhatsApp <ArrowRight size={13} />
                </div>
              </a>

            </motion.div>
          </div>
        </div>
      </section>

      {/* ── MAP ── */}
      <section className="pb-24" style={{ backgroundColor: '#080808' }}>
        <div className="w-full max-w-7xl mx-auto px-6">
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="mb-8"
          >
            <h2
              className="font-bold text-white text-center"
              style={{ fontFamily: 'var(--font-playfair),serif', fontSize: 'clamp(1.6rem,2.5vw,2.2rem)' }}
            >
              Find Us on{' '}
              <span
                style={{
                  background: goldGrad,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                the Map
              </span>
            </h2>
          </motion.div>

          <motion.div
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="rounded-2xl overflow-hidden"
            style={{ border: '1px solid rgba(201,168,76,0.15)', height: '400px' }}
          >
            <iframe
              title="Smart Auto UAE — Al Quoz Dubai location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3611.2!2d55.2345!3d25.1312!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f69d7a0000001%3A0x0!2sAl+Quoz+4+Dubai!5e0!3m2!1sen!2sae!4v1000000"
              width="100%"
              height="400"
              style={{ border: 0, filter: 'grayscale(1) invert(1) brightness(0.35) sepia(0.2)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>

          {/* Branch quick links below map */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5">
            {branches.map((b) => (
              <a
                key={b.name}
                href={b.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-3 rounded-xl border transition-colors"
                style={{
                  borderColor: 'rgba(201,168,76,0.12)',
                  background: 'rgba(255,255,255,0.02)',
                  color: 'rgba(255,255,255,0.45)',
                }}
              >
                <MapPin size={13} style={{ color: GOLD, flexShrink: 0 }} aria-hidden="true" />
                <div>
                  <p className="text-white text-[12px] font-semibold leading-tight">{b.name}</p>
                  <p className="text-[11px] text-white/30">{b.city}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
<Footer/>
    </main>
  )
}