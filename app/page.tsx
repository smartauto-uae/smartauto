'use client'

import { useState, useRef, useEffect, ReactNode } from 'react'
import Link from 'next/link'
import { motion, Variants, useInView } from 'framer-motion'
import {
  Star, CheckCircle, ArrowRight, Phone, ChevronDown,
  Shield, Sparkles, Layers, Car, Paintbrush, Settings,
  MapPin, Clock, Mail, AtSign, MessageCircle,
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'


// ─── DESIGN TOKENS ──────────────────────────────────────────────────────────
const GOLD  = '#C9A84C'
const GOLD2 = '#E8C96A'
const GOLD3 = '#A07830'
const goldGrad = `linear-gradient(135deg,${GOLD},${GOLD2},${GOLD3})`

// ─── INLINE COMPONENTS ──────────────────────────────────────────────────────

function GlassCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={className}
      style={{
        background: 'rgba(17,17,17,0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(201,168,76,0.12)',
        borderRadius: '1rem',
      }}
    >
      {children}
    </div>
  )
}

function GoldBtn({ href, children }: { href: string; children: ReactNode }) {
  const cls = 'inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-black transition-all duration-300 hover:opacity-90 active:scale-[0.98] no-underline'
  const style = { background: goldGrad }
  if (href.startsWith('http') || href.startsWith('tel') || href.startsWith('https://wa')) {
    return <a href={href} target="_blank" rel="noopener noreferrer" className={cls} style={style}>{children}</a>
  }
  return <Link href={href} className={cls} style={style}>{children}</Link>
}

function OutlineBtn({ href, children }: { href: string; children: ReactNode }) {
  const cls = 'inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm border transition-all duration-300 active:scale-[0.98] no-underline'
  const style = { color: GOLD, borderColor: 'rgba(201,168,76,0.3)', background: 'rgba(201,168,76,0.05)' }
  if (href.startsWith('http') || href.startsWith('tel') || href.startsWith('https://wa')) {
    return <a href={href} target="_blank" rel="noopener noreferrer" className={cls} style={style}>{children}</a>
  }
  return <Link href={href} className={cls} style={style}>{children}</Link>
}

function SectionHeader({ eyebrow, title, highlight }: { eyebrow: string; title: string; highlight: string }) {
  return (
    <div className="text-center mb-16">
      <p className="text-[11px] tracking-[0.35em] uppercase mb-4" style={{ color: GOLD }}>{eyebrow}</p>
      <h2 className="font-bold text-white leading-[1.15]"
        style={{ fontFamily: 'var(--font-playfair),serif', fontSize: 'clamp(2rem,3.5vw,3rem)' }}>
        {title}{' '}
        <span style={{ background: goldGrad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
          {highlight}
        </span>
      </h2>
    </div>
  )
}

function StatusBadge({ hours }: { hours: string }) {
  const [isOpen, setIsOpen] = useState(false)
  useEffect(() => {
    const h = new Date().getHours()
    setIsOpen(h >= 10 && h < 22)
  }, [])
  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-[11px] tracking-wide"
      style={{
        background: isOpen ? 'rgba(34,197,94,0.08)' : 'rgba(239,68,68,0.08)',
        borderColor: isOpen ? 'rgba(34,197,94,0.25)' : 'rgba(239,68,68,0.25)',
        color: isOpen ? 'rgb(134,239,172)' : 'rgb(252,165,165)',
      }}>
      <span className="w-1.5 h-1.5 rounded-full"
        style={{ background: isOpen ? '#22c55e' : '#ef4444', boxShadow: `0 0 6px ${isOpen ? '#22c55e' : '#ef4444'}` }} />
      {isOpen ? `Open Now · ${hours}` : 'Closed · Opens 10:00 AM'}
    </div>
  )
}

function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="rounded-2xl overflow-hidden transition-all duration-300"
      style={{ border: `1px solid ${open ? 'rgba(201,168,76,0.25)' : 'rgba(255,255,255,0.06)'}`, background: 'rgba(255,255,255,0.02)' }}>
      <button type="button" className="w-full flex items-center justify-between gap-4 px-7 py-5 text-left"
        onClick={() => setOpen(!open)} aria-expanded={open} aria-controls={`faq-${index}`}>
        <span className="text-white font-medium text-[15px] leading-snug">{question}</span>
        <ChevronDown size={18} style={{ color: GOLD, flexShrink: 0, transform: open ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 300ms' }} aria-hidden="true" />
      </button>
      {open && (
        <div id={`faq-${index}`} className="px-7 pb-6">
          <p className="text-white/50 text-sm leading-[1.8]">{answer}</p>
        </div>
      )}
    </div>
  )
}

// ─── DATA ────────────────────────────────────────────────────────────────────

const stripItems = [
  'Window Tinting Dubai', 'PPF Dubai', 'Ceramic Coating Dubai',
  'Car Detailing Dubai', 'Car Wrapping Dubai', 'Car Accessories Dubai',
  'Window Tinting Sharjah', 'PPF Sharjah', 'Ceramic Coating Sharjah',
  '3M Authorised Installer UAE', 'TotalGard UAE', 'XPEL Installer Dubai',
]

const services = [
  {
    title: 'Car Window Tinting',
    slug: 'window-tinting',
    description: 'Premium 3M, XPEL, and TotalGard nano ceramic window films. Block up to 99% UV rays and reduce heat by up to 60%. RTA law compliant for all UAE vehicles.',
    features: ['3M · XPEL · TotalGard Films', 'UAE RTA Law Compliant', '5-Year Warranty', 'Same-Day Service Available'],
    image: '/images/services/window-tinting-1.webp',
    href: '/services/window-tinting',
    icon: Layers,
  },
  {
    title: 'Paint Protection Film',
    slug: 'ppf',
    description: 'Self-healing TPU-based PPF from TotalGard, 3M, and XPEL. Invisible shield against stone chips, scratches, and UV damage. Certified installation.',
    features: ['TotalGard · 3M · XPEL PPF', 'Self-Healing Technology', '10-Year Warranty', 'Full & Partial Coverage'],
    image: '/images/services/PPF-1.webp',
    href: '/services/ppf',
    icon: Shield,
  },
  {
    title: 'Nano Ceramic Coating',
    slug: 'ceramic-coating',
    description: '9H hardness ceramic coatings from Gyeon, Gtechniq, and IGL. Hydrophobic protection, deep gloss, and UV resistance lasting 2–5 years.',
    features: ['Gyeon · Gtechniq · IGL Coatings', '9H Hardness Rating', 'Hydrophobic Protection', 'Paint Correction Included'],
    image: '/images/services/ceramic-coating-1.webp',
    href: '/services/ceramic-coating',
    icon: Sparkles,
  },
  {
    title: 'Car Detailing',
    slug: 'car-detailing',
    description: 'Professional interior and exterior detailing. Paint decontamination, leather conditioning, engine bay cleaning, and full paint correction services.',
    features: ['Interior & Exterior', 'Paint Correction', 'Engine Bay Cleaning', 'Headlight Restoration'],
    image: '/images/services/car-detailing.webp',
    href: '/services/car-detailing',
    icon: Car,
  },
  {
    title: 'Car Wrapping',
    slug: 'car-wrapping',
    description: 'Full colour-change and partial vinyl wraps. Matte, gloss, satin, chrome, and custom finishes. Full RTA documentation support for Dubai colour-change registrations.',
    features: ['Full & Partial Wraps', 'Matte · Gloss · Satin · Chrome', 'RTA Colour Change Support', '3M & Avery Dennison Vinyl'],
    image: '/images/services/car-wrapping.webp',
    href: '/services/car-wrapping',
    icon: Paintbrush,
  },
  {
    title: 'Car Accessories',
    slug: 'car-accessories',
    description: 'Professional fitting of dashcams, parking sensors, ambient lighting, remote starters, reverse cameras, and a full range of premium car accessories.',
    features: ['Dashcam Installation', 'Parking Sensors', 'Ambient Lighting', 'Reverse Cameras'],
    image: '/images/services/car-accessories.webp',
    href: '/services/car-accessories',
    icon: Settings,
  },
]

const whyFeatures = [
  { title: '3M Authorised Dealer', description: 'Official UAE distributor and certified installer for 3M, TotalGard, XPEL, Gyeon, and Gtechniq.', icon: Shield },
  { title: '5-Year Warranty', description: 'All window tinting and PPF installations are backed by a comprehensive manufacturer warranty.', icon: CheckCircle },
  { title: '4 Branches UAE', description: 'MotorCity, Al Quoz, Mirdif, and Sharjah Central Mall. Always close to you.', icon: MapPin },
  { title: 'Open Every Day', description: 'All 4 branches open 7 days a week, 10 AM to 10 PM. No appointment needed.', icon: Clock },
]

const steps = [
  { num: '01', title: 'Contact Us', desc: 'Call, WhatsApp, or walk in to any of our 4 branches. Our team advises on the right service for your vehicle.' },
  { num: '02', title: 'Free Inspection', desc: 'We inspect your vehicle and provide a transparent, no-hidden-charge quote before any work begins.' },
  { num: '03', title: 'Expert Installation', desc: 'Certified technicians complete your service using genuine manufacturer-grade products and materials.' },
  { num: '04', title: 'Handover & Warranty', desc: 'Your vehicle is inspected, cleaned, and handed back with full warranty documentation.' },
]

const brands = [
  '3M', 'TotalGard', 'XPEL', 'Gyeon', 'Gtechniq', 'IGL Coatings',
  'Avery Dennison', 'Llumar', 'SunTek', 'Hexis',
]

const testimonials = [
  {
    name: 'Ken Mayala', role: 'Mercedes S-Class Owner · MotorCity Branch', rating: 5,
    date: '7 December 2025',
    text: 'The team did an amazing job tinting my Mercedes S-Class. Timely, professional work at a fair price. Will definitely be back for my other vehicles.',
  },
  {
    name: 'Derrick Best', role: 'Regular Client · Al Quoz Branch', rating: 5,
    date: '6 December 2025',
    text: 'Anoob took my booking late and ensured my car was done to the highest standard while I was at work. The communication throughout was exceptional. I would not dream of going anywhere else.',
  },
  {
    name: 'Don Hacbang', role: 'Window Tinting Client · Dubai', rating: 5,
    date: '28 November 2025',
    text: 'Completed promptly and I am fully satisfied with the results. They followed up to resolve a minor issue with the installed window tints — that level of service is rare.',
  },
  {
    name: 'Rob Rees', role: 'Returning Client · 3rd Vehicle', rating: 5,
    date: '8 November 2025',
    text: 'My third vehicle done by Smart Auto. They keep improving — this time offering home collection and drop-off, which I took full advantage of. Outstanding service.',
  },
  {
    name: 'Tasha Dewan', role: 'Window Tinting · Dubai', rating: 5,
    date: '4 November 2025',
    text: 'Quick, well explained, and thorough. One of the more reasonably priced places to get car tinting in Dubai without compromising on quality.',
  },
  {
    name: 'Stuart', role: 'Satisfied Client · Dubai', rating: 5,
    date: '22 November 2025',
    text: 'Easy transaction. Fast, neat service and the car looks great. No drama, no hidden charges. Exactly what you want.',
  },
]

const branches = [
  {
    city: 'Dubai', name: 'Smart Auto MotorCity',
    address: 'MotorCity, Dubai — near Dubai Autodrome',
    phone: '+971 52 440 3677',
    mapUrl: 'https://maps.google.com/?q=Smart+Auto+MotorCity+Dubai',
    hours: '10:00 AM – 10:00 PM · Every Day',
  },
  {
    city: 'Dubai', name: 'Smart Auto Al Quoz',
    address: 'Al Quoz Industrial Area, Dubai',
    phone: '+971 52 440 3677',
    mapUrl: 'https://maps.google.com/?q=Smart+Auto+Al+Quoz+Dubai',
    hours: '10:00 AM – 10:00 PM · Every Day',
  },
  {
    city: 'Dubai', name: 'Smart Auto Mirdif',
    address: 'Uptown Mirdif Mall, Mirdif, Dubai',
    phone: '+971 52 440 3677',
    mapUrl: 'https://maps.google.com/?q=Smart+Auto+Mirdif+Dubai',
    hours: '10:00 AM – 10:00 PM · Every Day',
  },
  {
    city: 'Sharjah', name: 'Smart Auto Sharjah',
    address: 'Central Mall, Sharjah',
    phone: '+971 52 440 3677',
    mapUrl: 'https://maps.google.com/?q=Smart+Auto+Sharjah+Central+Mall',
    hours: '10:00 AM – 10:00 PM · Every Day',
  },
]

const faqs = [
  { q: 'How much does window tinting cost in Dubai?', a: 'Window tinting prices at Smart Auto UAE start from AED 299 depending on film type and vehicle size. We offer nano ceramic, carbon, and dyed films — all UAE RTA law compliant. Contact us for a free quote.' },
  { q: 'What is the best PPF for cars in the UAE?', a: 'For UAE conditions, self-healing TPU-based PPF from TotalGard, 3M, or XPEL offers the best protection. Smart Auto UAE is an authorised installer for all three brands, ensuring genuine product and certified installation.' },
  { q: 'How long does ceramic coating last in Dubai?', a: 'A professional 9H ceramic coating lasts 2–5 years in Dubai\'s climate, depending on the product tier. We use Gyeon, Gtechniq, and IGL coatings — all formulated for high UV and heat environments.' },
  { q: 'Does Smart Auto UAE have a branch in Sharjah?', a: 'Yes. Smart Auto UAE has a branch at Central Mall, Sharjah, offering window tinting, PPF, ceramic coating, car detailing, and car wrapping services.' },
  { q: 'How long does a full car wrap take?', a: 'A full vinyl car wrap takes 2–4 days depending on vehicle size and finish complexity. Partial wraps and accents can be completed in a single day.' },
  { q: 'Is Smart Auto UAE an authorised 3M installer?', a: 'Yes. Smart Auto UAE is an authorised UAE dealer and certified installer for 3M window film and paint protection products.' },
]

const contactItems = [
  { label: 'Phone / WhatsApp', value: '+971 52 440 3677', href: 'tel:+971524403677', icon: Phone },
  { label: 'WhatsApp Chat', value: 'Chat with us directly', href: 'https://wa.me/971524403677', icon: MessageCircle },
  { label: 'Email', value: 'info@smartautouae.ae', href: 'mailto:info@smartautouae.ae', icon: Mail },
  { label: 'Instagram', value: '@smartautouae', href: 'https://instagram.com/smartautouae', icon: AtSign },
]

// ─── ANIMATION VARIANTS ──────────────────────────────────────────────────────

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: EASE },
  }),
}

const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } },
}

const fadeRight: Variants = {
  hidden: { opacity: 0, x: 32 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } },
}
// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const servicesRef    = useRef(null)
  const whyUsRef       = useRef(null)
  const processRef     = useRef(null)
  const brandsRef      = useRef(null)
  const testimonialsRef = useRef(null)
  const branchesRef    = useRef(null)
  const ctaRef         = useRef(null)
  const contactRef     = useRef(null)

  const sInView  = useInView(servicesRef,    { once: true, margin: '-80px' })
  const wInView  = useInView(whyUsRef,       { once: true, margin: '-80px' })
  const pInView  = useInView(processRef,     { once: true, margin: '-80px' })
  const bInView  = useInView(brandsRef,      { once: true, margin: '-80px' })
  const tInView  = useInView(testimonialsRef,{ once: true, margin: '-80px' })
  const brInView = useInView(branchesRef,    { once: true, margin: '-80px' })
  const ctaInView = useInView(ctaRef,        { once: true, margin: '-80px' })
  const cInView  = useInView(contactRef,     { once: true, margin: '-80px' })

  return (
    
    <main style={{ background: '#0A0A0A' }}>
      <Navbar />

      {/* ── HERO ── */}
      <section id="home" className="relative min-h-screen flex items-center justify-center text-center overflow-hidden" style={{ background: '#050505' }}>
        <div className="absolute inset-0 bg-cover bg-center pointer-events-none" style={{ backgroundImage: "url('/images/nano-ceramic-2.webp')", opacity: 0.18 }} aria-hidden="true" />
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{ background: 'radial-gradient(ellipse at center,transparent 20%,rgba(0,0,0,0.85) 100%)' }} />
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{ background: 'radial-gradient(ellipse at center,rgba(201,168,76,0.07) 0%,transparent 65%)' }} />
        <div className="absolute top-0 left-0 right-0 h-px pointer-events-none" aria-hidden="true" style={{ background: 'linear-gradient(to right,transparent,rgba(201,168,76,0.25),transparent)' }} />
        <div className="absolute bottom-0 left-0 right-0 h-px pointer-events-none" aria-hidden="true" style={{ background: 'linear-gradient(to right,transparent,rgba(201,168,76,0.12),transparent)' }} />
        <div className="absolute top-0 bottom-0 w-px pointer-events-none" aria-hidden="true" style={{ left: '8%', background: 'linear-gradient(to bottom,transparent,rgba(201,168,76,0.12),transparent)' }} />
        <div className="absolute top-0 bottom-0 w-px pointer-events-none" aria-hidden="true" style={{ right: '8%', background: 'linear-gradient(to bottom,transparent,rgba(201,168,76,0.12),transparent)' }} />

        <div className="relative z-10 max-w-3xl mx-auto px-6 flex flex-col items-center pt-24">
          <motion.div
            className="inline-flex items-center gap-2 border rounded-full px-4 py-1.5 mb-10 backdrop-blur-sm text-[10px] tracking-[0.25em] uppercase"
            style={{ borderColor: 'rgba(201,168,76,0.3)', background: 'rgba(201,168,76,0.06)', color: GOLD }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          >
            <Star size={11} fill={GOLD} aria-hidden="true" />
            600+ Google Reviews · 4 Branches in Dubai &amp; Sharjah
            <Star size={11} fill={GOLD} aria-hidden="true" />
          </motion.div>

          <motion.h1
            className="font-bold text-white leading-[1.05] mb-3"
            style={{ fontFamily: 'var(--font-playfair),serif', fontSize: 'clamp(2.5rem,8vw,7rem)' }}
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.9 }}
          >
            Premium Car Protection
            <span className="block" style={{ background: goldGrad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              in UAE
            </span>
          </motion.h1>

          <motion.div
            className="flex items-center gap-4 mb-6 w-full justify-center"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}
          >
            <div className="h-px flex-1 max-w-[80px]" style={{ background: 'linear-gradient(to right,transparent,rgba(201,168,76,0.5))' }} />
            <span className="text-[10px] tracking-[0.2em] uppercase text-center" style={{ color: 'rgba(201,168,76,0.6)' }}>
              Window Tinting · PPF · Ceramic Coating · Detailing · Car Wrapping
            </span>
            <div className="h-px flex-1 max-w-[80px]" style={{ background: 'linear-gradient(to left,transparent,rgba(201,168,76,0.5))' }} />
          </motion.div>

          <motion.p
            className="text-white/50 leading-[1.9] mb-8 max-w-xl"
            style={{ fontSize: 'clamp(0.95rem,1.4vw,1.1rem)' }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}
          >
            Smart Auto UAE is the trusted car protection centre for{' '}
            <strong className="text-white/75 font-medium">window tinting in the UAE</strong>,{' '}
            <strong className="text-white/75 font-medium">PPF</strong>,{' '}
            <strong className="text-white/75 font-medium">nano ceramic coating</strong>, car detailing, and car
            wrapping — serving car owners across{' '}
            <strong className="text-white/75 font-medium">MotorCity, Al Quoz, Mirdif</strong> and{' '}
            <strong className="text-white/75 font-medium">Sharjah</strong> since 2014.
          </motion.p>

          <motion.div
            className="flex items-center justify-center gap-6 mb-8 flex-wrap"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.75 }}
          >
            {['3M Authorised Dealer', '5-Year Warranty', 'RTA Law Compliant'].map((t) => (
              <div key={t} className="flex items-center gap-1.5">
                <CheckCircle size={13} style={{ color: GOLD }} aria-hidden="true" />
                <span className="text-[11px] text-white/50 tracking-wide">{t}</span>
              </div>
            ))}
          </motion.div>

          <motion.p
            className="text-[12px] tracking-[0.18em] uppercase mb-10"
            style={{ color: 'rgba(201,168,76,0.55)' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.78 }}
          >
            MotorCity · Al Quoz · Mirdif · Sharjah Central Mall
          </motion.p>

          <motion.div
            className="flex items-center justify-center gap-4 flex-wrap mb-16"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}
          >
            <GoldBtn href="#services">Explore Services <ArrowRight size={15} /></GoldBtn>
            <OutlineBtn href="https://wa.me/971524403677"><Phone size={14} /> WhatsApp Us</OutlineBtn>
          </motion.div>

          <motion.div
            className="grid grid-cols-4 pt-8 w-full max-w-md"
            style={{ borderTop: '1px solid rgba(201,168,76,0.15)' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.05 }}
          >
            {[
              { value: '600+', label: 'Google Reviews' },
              { value: '4',    label: 'Branches' },
              { value: '20+',  label: 'Years in UAE' },
              { value: '5★',   label: 'Avg Rating' },
            ].map((s, i) => (
              <div key={s.label} className={`text-center px-3 ${i !== 3 ? 'border-r' : ''}`} style={{ borderColor: 'rgba(201,168,76,0.15)' }}>
                <div className="font-bold leading-none mb-1.5"
                  style={{ fontFamily: 'var(--font-playfair),serif', fontSize: 'clamp(1.4rem,2.5vw,2rem)', background: goldGrad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  {s.value}
                </div>
                <div className="text-white/35 text-[9px] tracking-[0.12em] uppercase">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
          animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2.5 }}
          aria-hidden="true"
        >
          <span className="text-[9px] tracking-[0.2em] uppercase" style={{ color: 'rgba(201,168,76,0.4)' }}>Scroll</span>
          <ChevronDown size={22} style={{ color: 'rgba(201,168,76,0.45)' }} />
        </motion.div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="overflow-hidden py-4" style={{ borderTop: '1px solid rgba(201,168,76,0.08)', borderBottom: '1px solid rgba(201,168,76,0.08)', background: 'rgba(201,168,76,0.03)' }} aria-hidden="true">
        <div className="flex gap-12 whitespace-nowrap animate-marquee">
          {[...stripItems, ...stripItems, ...stripItems].map((item, i) => (
            <div key={i} className="flex items-center gap-2.5 text-[11px] tracking-[0.15em] uppercase flex-shrink-0" style={{ color: 'rgba(201,168,76,0.55)' }}>
              <div className="w-1 h-1 rounded-full" style={{ background: GOLD }} />
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* ── SERVICES ── */}
      <section id="services" className="py-24" style={{ background: 'linear-gradient(180deg,#080808 0%,#0A0A0A 100%)' }}>
        <div className="w-full max-w-7xl mx-auto px-6">
          <motion.div ref={servicesRef} variants={fadeUp} initial="hidden" animate={sInView ? 'show' : 'hidden'}>
            <SectionHeader eyebrow="Window Tinting · PPF · Ceramic Coating · Detailing · Wrapping" title="Premium Car Protection" highlight="Services in UAE" />
            <p className="text-center text-white/40 text-sm -mt-10 mb-14 max-w-2xl mx-auto leading-relaxed">
              From car window tinting and paint protection film to nano ceramic coating and car detailing — all services available across our 4 branches in{' '}
              <strong className="text-white/60 font-medium">Dubai</strong> and{' '}
              <strong className="text-white/60 font-medium">Sharjah</strong>.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <motion.div key={s.title} variants={fadeUp} custom={i} initial="hidden" animate={sInView ? 'show' : 'hidden'}>
                <GlassCard className="relative p-8 h-full group overflow-hidden">
                  <div className="rounded-xl overflow-hidden h-64 mb-6">
                    <img src={s.image} alt={s.title} width={400} height={256} loading="lazy" decoding="async"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  </div>
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:border-gold/50"
                    style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)', color: GOLD }}>
                    <s.icon size={24} aria-hidden="true" />
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2.5 transition-colors duration-300 group-hover:text-gold leading-snug" style={{}}>
                    {s.title}
                  </h3>
                  <p className="text-white/45 text-[13px] leading-[1.7] mb-4">{s.description}</p>
                  <ul className="flex flex-col gap-2 mb-5" role="list">
                    {s.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-[12px] text-white/45">
                        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: GOLD }} aria-hidden="true" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a href={s.href} className="inline-flex items-center gap-1.5 text-[13px] font-semibold no-underline hover:gap-3 transition-all duration-300" style={{ color: GOLD }}>
                    Learn More <ArrowRight size={14} />
                  </a>
                  <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500 rounded-full"
                    style={{ background: 'linear-gradient(to right,#C9A84C,#E8C96A)' }} aria-hidden="true" />
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section id="why-us" className="py-24" style={{ backgroundColor: '#060606' }}>
        <div className="w-full max-w-7xl mx-auto px-6">
          <div ref={whyUsRef} className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div variants={fadeLeft} initial="hidden" animate={wInView ? 'show' : 'hidden'}>
              <span className="text-[11px] tracking-[0.35em] uppercase mb-4 block" style={{ color: GOLD }}>Why Choose Smart Auto UAE</span>
              <h2 className="text-white font-bold mb-5 leading-[1.2]"
                style={{ fontFamily: 'var(--font-playfair),serif', fontSize: 'clamp(2rem,3.5vw,2.8rem)' }}>
                The Best Car Protection Centre<br />
                <span style={{ background: goldGrad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>in the UAE</span>
              </h2>
              <p className="text-white/50 text-base leading-[1.8] mb-7">
                Smart Auto has been the trusted car protection centre for thousands of vehicle owners in Dubai, Sharjah and across the UAE since 2014. Whether you need the{' '}
                <strong className="text-white/70 font-medium">best PPF installer in Dubai</strong>, professional{' '}
                <strong className="text-white/70 font-medium">ceramic coating for luxury cars</strong>, or affordable{' '}
                <strong className="text-white/70 font-medium">window tinting</strong> — we deliver premium results with manufacturer-backed warranties.
              </p>
              <div className="flex flex-col gap-3.5 mb-9">
                {[
                  'TotalGard, 3M & XPEL authorised installer in UAE',
                  'Ceramic coating price Dubai — competitive & transparent',
                  'All PPF, tinting & coating work backed by warranty',
                  '4 branches — MotorCity, Al Quoz, Mirdif & Sharjah',
                  'No hidden charges · Open every day',
                ].map((p) => (
                  <div key={p} className="flex items-center gap-3">
                    <CheckCircle size={16} style={{ color: GOLD, flexShrink: 0 }} aria-hidden="true" />
                    <span className="text-white/60 text-sm">{p}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-3 flex-wrap">
                <GoldBtn href="/contact">Get a Free Quote <ArrowRight size={16} /></GoldBtn>
                <OutlineBtn href="https://wa.me/971524403677"><Phone size={15} /> WhatsApp</OutlineBtn>
              </div>
            </motion.div>

            <motion.div variants={fadeRight} initial="hidden" animate={wInView ? 'show' : 'hidden'}>
              <div className="grid grid-cols-2 gap-3.5" style={{ gridTemplateRows: '260px 260px' }}>
                <div className="rounded-2xl overflow-hidden relative row-span-2 group" style={{ border: '1px solid rgba(201,168,76,0.1)' }}>
                  <img src="/images/services/PPF-1.webp" alt="TotalGard PPF installation by Smart Auto UAE — best PPF installer Dubai"
                    width={400} height={520} loading="lazy" decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <span className="absolute bottom-3.5 left-3.5 text-[10px] tracking-[0.15em] uppercase px-3 py-1 rounded-md backdrop-blur-sm"
                    style={{ color: GOLD, border: '1px solid rgba(201,168,76,0.2)', background: 'rgba(0,0,0,0.8)' }}>
                    TotalGard PPF
                  </span>
                </div>
                <div className="rounded-2xl overflow-hidden relative group" style={{ border: '1px solid rgba(201,168,76,0.1)' }}>
                  <img src="/images/services/ceramic-coating-1.webp" alt="9H nano ceramic coating Dubai and Sharjah — Smart Auto UAE"
                    width={400} height={260} loading="lazy" decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <span className="absolute bottom-3.5 left-3.5 text-[10px] tracking-[0.15em] uppercase px-3 py-1 rounded-md backdrop-blur-sm"
                    style={{ color: GOLD, border: '1px solid rgba(201,168,76,0.2)', background: 'rgba(0,0,0,0.8)' }}>
                    Ceramic Coating
                  </span>
                </div>
                <div className="rounded-2xl overflow-hidden relative group" style={{ border: '1px solid rgba(201,168,76,0.1)' }}>
                  <img src="/images/services/window-tinting-1.webp" alt="Car window tinting Dubai — 3M and TotalGard film by Smart Auto UAE"
                    width={400} height={260} loading="lazy" decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <span className="absolute bottom-3.5 left-3.5 text-[10px] tracking-[0.15em] uppercase px-3 py-1 rounded-md backdrop-blur-sm"
                    style={{ color: GOLD, border: '1px solid rgba(201,168,76,0.2)', background: 'rgba(0,0,0,0.8)' }}>
                    Window Tinting
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-16">
            {whyFeatures.map((f, i) => (
              <motion.div key={f.title} variants={fadeUp} custom={i} initial="hidden" animate={wInView ? 'show' : 'hidden'}>
                <GlassCard className="p-6">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-3.5"
                    style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.15)', color: GOLD }}>
                    <f.icon size={20} aria-hidden="true" />
                  </div>
                  <h3 className="text-white font-semibold text-[15px] mb-1.5">{f.title}</h3>
                  <p className="text-white/40 text-[12px] leading-[1.6]">{f.description}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="process" className="py-24" style={{ background: 'linear-gradient(180deg,#080808 0%,#0A0A0A 100%)' }}>
        <div className="w-full max-w-7xl mx-auto px-6">
          <motion.div ref={processRef} variants={fadeUp} initial="hidden" animate={pInView ? 'show' : 'hidden'}>
            <SectionHeader eyebrow="Simple 4-Step Process" title="How to Book Your" highlight="Car Protection Service" />
            <p className="text-center text-white/40 text-sm -mt-10 mb-14 max-w-xl mx-auto leading-relaxed">
              Booking car detailing, PPF, window tinting, or ceramic coating in Dubai &amp; Sharjah is simple.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            <div className="absolute top-9 left-[12%] w-[76%] h-px pointer-events-none hidden lg:block"
              style={{ background: 'linear-gradient(to right,transparent,rgba(201,168,76,0.25),transparent)' }} aria-hidden="true" />
            {steps.map((step, i) => (
              <motion.div key={step.num} variants={fadeUp} custom={i} initial="hidden" animate={pInView ? 'show' : 'hidden'}>
                <GlassCard className="p-9 text-center">
                  <div className="rounded-full flex items-center justify-center mx-auto mb-5"
                    style={{ width: 72, height: 72, background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.25)', color: GOLD, fontFamily: 'var(--font-playfair),serif', fontSize: 22, fontWeight: 700 }}
                    aria-hidden="true">
                    {step.num}
                  </div>
                  <h3 className="text-white font-semibold text-base mb-2.5">{step.title}</h3>
                  <p className="text-white/40 text-[13px] leading-[1.6]">{step.desc}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BRANDS ── */}
      <section className="py-16" style={{ backgroundColor: '#060606' }}>
        <div className="w-full max-w-7xl mx-auto px-6">
          <motion.div ref={brandsRef} variants={fadeUp} initial="hidden" animate={bInView ? 'show' : 'hidden'}>
            <SectionHeader eyebrow="Authorised UAE Installer" title="Premium Brands We" highlight="Install Across the UAE" />
            <p className="text-center text-white/40 text-sm -mt-10 mb-12 max-w-xl mx-auto">
              We are authorised dealers and certified installers for the world&apos;s leading PPF, window film, and ceramic coating brands in Dubai, Sharjah and across the UAE.
            </p>
          </motion.div>
          <div className="flex items-center justify-center flex-wrap gap-3">
            {brands.map((brand, i) => (
              <motion.div key={brand}
                className="px-6 py-2.5 rounded-full border text-[13px] font-semibold tracking-wide transition-all duration-300 hover:text-gold cursor-default"
                style={{ borderColor: 'rgba(201,168,76,0.15)', background: 'rgba(255,255,255,0.03)', color: 'rgba(255,255,255,0.45)' }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={bInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: i * 0.07 }}
              >
                {brand}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="testimonials" className="py-24" style={{ backgroundColor: '#080808' }}>
        <div className="w-full max-w-7xl mx-auto px-6">
          <motion.div ref={testimonialsRef} variants={fadeUp} initial="hidden" animate={tInView ? 'show' : 'hidden'}>
            <SectionHeader eyebrow="600+ Verified Google Reviews" title="Trusted Car Protection in" highlight="the UAE" />
            <div className="flex items-center justify-center gap-2 -mt-10 mb-14">
              {[...Array(5)].map((_, i) => <Star key={i} size={20} fill={GOLD} style={{ color: GOLD }} aria-hidden="true" />)}
              <span className="text-white/50 text-sm ml-2">4.9 / 5 · Smart Auto UAE</span>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={t.name} variants={fadeUp} custom={i} initial="hidden" animate={tInView ? 'show' : 'hidden'}>
                <GlassCard className="p-9">
                  <div className="mb-4 leading-none" style={{ fontFamily: 'var(--font-playfair),serif', fontSize: 64, color: 'rgba(201,168,76,0.15)' }} aria-hidden="true">&ldquo;</div>
                  <div className="flex gap-1 mb-1" aria-label={`${t.rating} out of 5 stars`}>
                    {[...Array(t.rating)].map((_, j) => <Star key={j} size={13} fill={GOLD} style={{ color: GOLD }} aria-hidden="true" />)}
                  </div>
                  <span className="text-white/25 text-[11px] mb-3 block">{t.date} · Google Review</span>
                  <p className="text-white/55 text-sm leading-[1.8] mb-6">{t.text}</p>
                  <hr style={{ borderColor: 'rgba(255,255,255,0.06)', marginBottom: '1rem' }} />
                  <div className="text-white font-semibold text-[15px]">{t.name}</div>
                  <div className="text-[12px] mt-1" style={{ color: 'rgba(201,168,76,0.65)' }}>{t.role}</div>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          <motion.div className="text-center mt-10" variants={fadeUp} initial="hidden" animate={tInView ? 'show' : 'hidden'}>
            <a href="https://g.page/r/review" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold px-6 py-2.5 rounded-full no-underline transition-all duration-300"
              style={{ color: GOLD, border: '1px solid rgba(201,168,76,0.25)', background: 'rgba(201,168,76,0.05)' }}>
              <Star size={14} fill={GOLD} aria-hidden="true" /> Write a Google Review
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── BRANCHES ── */}
      <section id="branches" className="py-24" style={{ background: 'linear-gradient(180deg,#060606 0%,#0A0A0A 100%)' }}>
        <div className="w-full max-w-7xl mx-auto px-6">
          <motion.div ref={branchesRef} variants={fadeUp} initial="hidden" animate={brInView ? 'show' : 'hidden'}>
            <SectionHeader eyebrow="Car Tinting & Car Protection Near Me" title="4 Branches Across" highlight="the UAE" />
            <p className="text-center text-white/40 text-sm -mt-10 mb-10 max-w-xl mx-auto">
              Car window tinting in Al Quoz, PPF in MotorCity, ceramic coating in Mirdif, or car protection in Sharjah — Smart Auto UAE is always near you.
            </p>
          </motion.div>

          <motion.div className="flex justify-center mb-10" initial={{ opacity: 0, y: 10 }} animate={brInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}>
            <StatusBadge hours="10:00 AM – 10:00 PM" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {branches.map((branch, i) => (
              <motion.div key={branch.name} variants={fadeUp} custom={i} initial="hidden" animate={brInView ? 'show' : 'hidden'}>
                <div className="rounded-2xl p-7 flex flex-col gap-4 transition-all duration-300"
                  style={{ border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
                  <div>
                    <p className="text-[10px] tracking-[0.2em] uppercase mb-1" style={{ color: GOLD }}>{branch.city}</p>
                    <h3 className="text-white font-semibold text-lg leading-snug">{branch.name}</h3>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-start gap-3">
                      <MapPin size={15} style={{ color: GOLD, flexShrink: 0, marginTop: 2 }} aria-hidden="true" />
                      <span className="text-white/50 text-sm">{branch.address}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone size={15} style={{ color: GOLD, flexShrink: 0 }} aria-hidden="true" />
                      <a href={`tel:${branch.phone}`} className="text-white/50 text-sm hover:text-gold transition-colors">{branch.phone}</a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock size={15} style={{ color: GOLD, flexShrink: 0 }} aria-hidden="true" />
                      <span className="text-white/50 text-sm">{branch.hours}</span>
                    </div>
                  </div>
                  <a href={branch.mapUrl} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[13px] font-semibold mt-1 no-underline hover:gap-3 transition-all duration-300"
                    style={{ color: GOLD }}>
                    Get Directions <ArrowRight size={13} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-24" style={{ backgroundColor: '#0A0A0A' }}>
        <div className="w-full max-w-4xl mx-auto px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <SectionHeader eyebrow="Common Questions" title="FAQs About" highlight="Car Care" />
            <p className="text-center text-white/40 text-sm -mt-10 mb-12 max-w-xl mx-auto">
              Everything you need to know about window tinting, PPF cost, ceramic coating, and car detailing in UAE.
            </p>
          </motion.div>
          <div className="flex flex-col gap-3">
            {faqs.map((faq, i) => <FAQItem key={i} question={faq.q} answer={faq.a} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24" style={{ backgroundColor: '#060606' }}>
        <div className="w-full max-w-7xl mx-auto px-6">
          <motion.div ref={ctaRef} variants={fadeUp} initial="hidden" animate={ctaInView ? 'show' : 'hidden'}
            className="relative rounded-3xl p-16 md:p-20 text-center overflow-hidden backdrop-blur-sm"
            style={{ border: '1px solid rgba(201,168,76,0.2)', background: 'linear-gradient(135deg,rgba(201,168,76,0.1) 0%,rgba(201,168,76,0.04) 50%,rgba(201,168,76,0.08) 100%)' }}>
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center,rgba(201,168,76,0.06) 0%,transparent 60%)' }} aria-hidden="true" />
            <p className="text-[11px] tracking-[0.3em] uppercase mb-4 relative z-10" style={{ color: GOLD }}>
              Premium Car Protection · Dubai &amp; Sharjah · Open Every Day 10AM – 10PM
            </p>
            <h2 className="text-white font-bold mb-4 relative z-10"
              style={{ fontFamily: 'var(--font-playfair),serif', fontSize: 'clamp(2rem,4vw,3rem)' }}>
              Book Your Car Protection Service<br />
              <span style={{ background: goldGrad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Today</span>
            </h2>
            <p className="text-white/50 text-base mb-6 max-w-lg mx-auto relative z-10">
              Window tinting, PPF, ceramic coating, detailing, car wrapping — book at any of our 4 branches across Dubai &amp; Sharjah. Free inspection. No hidden charges.
            </p>
            <div className="flex justify-center mb-9 relative z-10">
              <StatusBadge hours="10:00 AM – 10:00 PM" />
            </div>
            <div className="flex gap-4 justify-center flex-wrap relative z-10">
              <GoldBtn href="https://wa.me/971524403677">Book on WhatsApp <ArrowRight size={16} /></GoldBtn>
              <OutlineBtn href="tel:+971524403677"><Phone size={16} /> +971 52 440 3677</OutlineBtn>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-24" style={{ backgroundColor: '#0A0A0A' }}>
        <div className="w-full max-w-7xl mx-auto px-6">
          <motion.div ref={contactRef} variants={fadeUp} initial="hidden" animate={cInView ? 'show' : 'hidden'}>
            <SectionHeader eyebrow="Get In Touch" title="Book Your Car Care" highlight="Appointment Today" />
            <p className="text-center text-white/40 text-sm -mt-10 mb-12 max-w-xl mx-auto">
              Call, WhatsApp, or fill the form — our team at any Dubai or Sharjah branch responds within the hour.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-12 items-start">
            <motion.div variants={fadeLeft} initial="hidden" animate={cInView ? 'show' : 'hidden'}>
              <p className="text-white/50 text-base leading-[1.8] mb-8">
                Reach out via any channel — walk-ins welcome at all 4 branches across Dubai &amp; Sharjah. No appointment needed.
              </p>
              <div className="flex flex-col gap-3.5">
                {contactItems.map((item) => (
                  <a key={item.label} href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-4 p-5 rounded-2xl no-underline transition-all duration-200"
                    style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)' }}>
                    <div className="w-12 h-12 min-w-[48px] rounded-xl flex items-center justify-center"
                      style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)', color: GOLD }}>
                      <item.icon size={18} aria-hidden="true" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.12em] text-white/35 mb-0.5">{item.label}</div>
                      <div className="text-white text-[15px]">{item.value}</div>
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeRight} initial="hidden" animate={cInView ? 'show' : 'hidden'}>
              <form className="rounded-2xl p-10" style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)' }}
                onSubmit={(e) => e.preventDefault()} noValidate>
                <div className="grid grid-cols-2 gap-4 mb-5">
                  {[
                    { label: 'Full Name', type: 'text', name: 'name', placeholder: 'Full Name' },
                    { label: 'Phone Number', type: 'tel', name: 'phone', placeholder: 'Phone Number' },
                  ].map((f) => (
                    <div key={f.label}>
                      <label htmlFor={f.name} className="block text-[10px] uppercase tracking-[0.12em] text-white/35 mb-2">{f.label}</label>
                      <input id={f.name} type={f.type} name={f.name} placeholder={f.placeholder}
                        className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-all duration-300 focus:border-gold/45"
                        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }} />
                    </div>
                  ))}
                </div>
                {[
                  { label: 'Email Address', id: 'email', type: 'email', placeholder: 'your@email.com' },
                  { label: 'Your Car Model', id: 'carModel', type: 'text', placeholder: 'e.g. Toyota Camry 2024' },
                ].map((f) => (
                  <div key={f.label} className="mb-5">
                    <label htmlFor={f.id} className="block text-[10px] uppercase tracking-[0.12em] text-white/35 mb-2">{f.label}</label>
                    <input id={f.id} type={f.type} name={f.id} placeholder={f.placeholder}
                      className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-all duration-300"
                      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }} />
                  </div>
                ))}
                <div className="mb-5">
                  <label htmlFor="branch" className="block text-[10px] uppercase tracking-[0.12em] text-white/35 mb-2">Preferred Branch</label>
                  <select id="branch" name="branch" style={{ colorScheme: 'dark', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
                    className="w-full rounded-xl px-4 py-3 text-sm text-white outline-none transition-all duration-300">
                    <option value="">Select Branch</option>
                    <option>MotorCity - Dubai</option>
                    <option>Al Quoz - Dubai</option>
                    <option>Mirdif (Uptown Mall) - Dubai</option>
                    <option>Central Mall - Sharjah</option>
                  </select>
                </div>
                <div className="mb-5">
                  <label htmlFor="service" className="block text-[10px] uppercase tracking-[0.12em] text-white/35 mb-2">Service Needed</label>
                  <select id="service" name="service" style={{ colorScheme: 'dark', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
                    className="w-full rounded-xl px-4 py-3 text-sm text-white outline-none transition-all duration-300">
                    <option value="">Select a Service</option>
                    {services.map((s) => <option key={s.title}>{s.title}</option>)}
                  </select>
                </div>
                <div className="mb-6">
                  <label htmlFor="message" className="block text-[10px] uppercase tracking-[0.12em] text-white/35 mb-2">Message</label>
                  <textarea id="message" name="message" rows={4} placeholder="Tell us more about your requirements..."
                    className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-all duration-300 resize-none"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }} />
                </div>
                <button type="submit"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-black transition-all duration-300 hover:opacity-90 active:scale-[0.98]"
                  style={{ background: goldGrad }}>
                  Send Message <ArrowRight size={16} />
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer role="contentinfo" className="py-14" style={{ backgroundColor: '#060606', borderTop: '1px solid rgba(201,168,76,0.1)' }}>
        <div className="w-full max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            <div className="md:col-span-2">
              <p className="font-bold text-white text-xl mb-1" style={{ fontFamily: 'var(--font-playfair),serif' }}>Smart Auto UAE</p>
              <p className="text-[11px] tracking-[0.2em] uppercase mb-4"
                style={{ background: goldGrad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Premium Car Protection
              </p>
              <p className="text-white/40 text-sm leading-[1.8] max-w-xs">
                Dubai &amp; Sharjah&apos;s most trusted car protection centre since 2014. Authorised installer for 3M, TotalGard, XPEL, Gyeon &amp; Gtechniq.
              </p>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.2em] uppercase text-white/30 mb-4">Services</p>
              <nav aria-label="Footer services">
                {services.map((s) => (
                  <Link key={s.slug} href={s.href} className="block text-white/40 text-sm mb-2.5 hover:text-gold transition-colors">{s.title}</Link>
                ))}
              </nav>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.2em] uppercase text-white/30 mb-4">Branches</p>
              {branches.map((b) => <p key={b.name} className="text-white/40 text-sm mb-2.5">{b.name}</p>)}
              <a href="tel:+971524403677" className="text-sm font-semibold mt-4 block hover:opacity-80 transition-opacity" style={{ color: GOLD }}>
                +971 52 440 3677
              </a>
            </div>
          </div>
          <div className="pt-6 flex flex-wrap justify-between items-center gap-4" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
            <p className="text-white/25 text-[12px]">&copy; {new Date().getFullYear()} Smart Auto UAE. All rights reserved.</p>
            <p className="text-white/25 text-[12px] tracking-wide">UAE Authorised · 3M · TotalGard · XPEL · Gyeon · Gtechniq</p>
          </div>
        </div>
      </footer>
      <Footer />

    </main>
  )
}