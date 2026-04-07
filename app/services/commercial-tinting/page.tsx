'use client'

import { motion } from 'framer-motion'
import {
  CheckCircle, ArrowRight, Phone,
  Shield, Sun, Eye, Zap, Thermometer,
  Building2, Store, Coffee, Landmark,
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

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

// ─── DATA ──────────────────────────────────────────────────────────────────

const stats = [
  { value: '90%', label: 'Solar Heat Rejection',  desc: 'Eliminating hot spots and reducing HVAC load across entire floors' },
  { value: '99%', label: 'UV Ray Blockage',        desc: 'Protecting staff, merchandise, and interior finishes from UV damage' },
  { value: '95%', label: 'Glare Reduction',        desc: 'Reducing screen glare and improving visual comfort at workstations' },
  { value: '30%', label: 'Energy Cost Reduction',  desc: 'Proven savings on cooling costs — improving your building\'s energy rating' },
]

const benefits = [
  {
    icon: Thermometer,
    title: 'Solar Heat Control',
    desc: 'Dubai\'s commercial glass facades face extreme solar heat radiation for most of the year. TotalGard and 3M architectural window films reject up to 79% of excess solar heat — eliminating hot spots near windows, reducing workstation discomfort, and allowing your HVAC system to operate at designed capacity rather than running constantly at maximum load.',
  },
  {
    icon: Zap,
    title: 'Energy Efficiency & Cost Saving',
    desc: 'Commercial buildings in the UAE can spend up to 60% of their energy budget on cooling. Window film is one of the highest-return energy efficiency upgrades available — reducing cooling energy consumption by up to 30% without any structural modification, downtime, or disruption to your business operations.',
  },
  {
    icon: Sun,
    title: 'UV Protection',
    desc: 'UV radiation bleaches and degrades office furniture, reception area finishes, display items, retail merchandise, and hotel interiors — causing premature wear that requires costly replacement. Our films block 99% of UV-A and UV-B radiation, protecting your interior investment indefinitely.',
  },
  {
    icon: Eye,
    title: 'Privacy & Confidentiality',
    desc: 'Meeting rooms, executive offices, reception areas, and glass partitions often require daytime privacy without losing natural light. Our one-way privacy films prevent external visibility during daylight hours while maintaining full interior transparency and views outward — ideal for boardrooms, consultation spaces, and street-facing offices.',
  },
  {
    icon: Shield,
    title: 'Safety & Security Film',
    desc: 'TotalGard safety and security window films hold glass together on breakage — dramatically reducing the injury risk from accidental glass failure, extreme weather events, or forced entry attempts. Essential for ground-floor retail, shopping malls, schools, and any commercial space with high foot traffic.',
  },
  {
    icon: Building2,
    title: 'Anti-Graffiti Protection',
    desc: 'Ground-floor commercial glass is vulnerable to graffiti and surface scratching. Our sacrificial anti-graffiti film absorbs the damage instead of the glass — protecting your storefront and allowing rapid, low-cost film replacement rather than expensive glass resurfacing or replacement.',
  },
]

const filmTypes = [
  {
    name: 'Solar Control Film',
    brand: 'TotalGard · 3M',
    best: 'Offices, towers, and commercial buildings with sun-facing facades',
    features: ['Up to 79% solar heat rejection', 'High visible light transmission maintained', 'No disruption to natural daylight', 'Reduces HVAC operating costs', '10-year commercial warranty'],
    price: 'From AED 20/sqft',
  },
  {
    name: 'Privacy Film (One-Way)',
    brand: 'TotalGard · Llumar',
    best: 'Meeting rooms, executive offices, reception areas, glass partitions',
    features: ['Daytime one-way visibility', 'Full view retained from inside', 'Multiple opacity levels available', 'Compatible with existing glass', '5-year warranty'],
    price: 'From AED 18/sqft',
  },
  {
    name: 'Decorative & Frosted Film',
    brand: 'TotalGard · 3M',
    best: 'Glass partitions, entrance lobbies, bathroom glass, branding applications',
    features: ['Frosted, etched & patterned options', 'Custom cut logos and graphics', 'Permanent privacy solution', 'Easy to clean and maintain', '5-year warranty'],
    price: 'From AED 16/sqft',
  },
  {
    name: 'Safety & Security Film',
    brand: '3M Safety Series · TotalGard',
    best: 'Shopping malls, schools, banks, retail stores, ground-floor glazing',
    features: ['Holds glass on breakage', 'Slows forced entry attempts', 'Meets international safety standards', 'Optically clear — no visible change', '10-year warranty'],
    price: 'From AED 30/sqft',
  },
  {
    name: 'Anti-Graffiti Film',
    brand: 'TotalGard',
    best: 'Ground-floor retail, public-facing glass, transit facilities',
    features: ['Sacrificial surface protection', 'Absorbs scratching and etching', 'Replace film, not glass', 'Rapid replacement service', '2-year warranty'],
    price: 'From AED 22/sqft',
  },
  {
    name: 'Graphically Printed Film',
    brand: 'TotalGard · 3M',
    best: 'Shop windows, brand activations, showrooms, event spaces',
    features: ['Full custom design capability', 'High-resolution print quality', 'Temporary or permanent options', 'Single-colour to full photographic print', 'Project-based pricing'],
    price: 'Custom quote',
  },
]

const buildingTypes = [
  { icon: Building2, title: 'Office Buildings & Towers',    desc: 'Full facade and floor-by-floor installation. Coordinated with building management for zero operational disruption.' },
  { icon: Store,    title: 'Retail Shops & Showrooms',       desc: 'Storefront privacy, UV protection for displayed merchandise, and decorative branding films.' },
  { icon: Coffee,   title: 'Restaurants & Cafes',            desc: 'Comfort for diners near windows, glare reduction, and privacy for al-fresco dining areas.' },
  { icon: Landmark, title: 'Hotels & Hospitality',           desc: 'Guest room comfort, lobby solar control, and decorative films for glass feature walls and partitions.' },
  { icon: Building2, title: 'Shopping Malls',                desc: 'Safety film for high-footfall glazing, decorative films for tenant facades, and anti-graffiti solutions.' },
  { icon: Building2, title: 'Schools & Institutions',        desc: 'Safety and security film for classroom windows. UV protection for students and staff.' },
]

const process = [
  { num: '01', title: 'Site Survey', desc: 'We survey the building, assess glass type, orientation, and sun exposure, and document all window measurements. Conducted at no cost and with no obligation.' },
  { num: '02', title: 'Film Specification', desc: 'We recommend the optimal film type for each glazing area — balancing heat rejection, light transmission, privacy, and budget priorities.' },
  { num: '03', title: 'Installation Scheduling', desc: 'Installation is planned to minimise disruption — after-hours, floor by floor, or room by room depending on your operations.' },
  { num: '04', title: 'Installation & QA', desc: 'Certified installers complete the work to manufacturer specification. Each installation is inspected before handover and warranty is issued.' },
]

const faqs = [
  {
    q: 'How much does commercial window tinting cost in Dubai?',
    a: 'Commercial window film pricing in Dubai typically ranges from AED 16–40 per square foot depending on film type, building height, and access requirements. Smart Auto UAE provides detailed itemised quotations after a free site survey — no vague estimates.',
  },
  {
    q: 'Will window film installation disrupt our business operations?',
    a: 'No. Smart Auto UAE schedules commercial installations outside business hours, floor by floor, or in phases — whatever minimises disruption to your team and customers. Most offices continue normal operations throughout the installation process.',
  },
  {
    q: 'Can window film be installed on existing double-glazed units?',
    a: 'In most cases yes. We assess your existing glass specification during the site survey to confirm film compatibility. Certain high-performance solar films have thermal stress requirements that we evaluate carefully for double-glazed units.',
  },
  {
    q: 'Is commercial window film permanent?',
    a: 'Our standard commercial films are designed as semi-permanent installations lasting 7–15 years. They can be professionally removed and replaced without damaging the glass. Decorative and branded films can be specified as temporary for seasonal or campaign use.',
  },
  {
    q: 'Does window film qualify for LEED or energy certification credits?',
    a: "Yes. TotalGard and 3M architectural films contribute to LEED energy efficiency credits when documented correctly. Smart Auto UAE can provide the technical data sheets required for your building's sustainability certification submission.",
  },
  {
    q: 'Can you tint an entire building facade?',
    a: 'Yes. Smart Auto UAE has the equipment and team capacity to handle full building facade installations across towers and large commercial properties in Dubai and Sharjah. We work with building management and facilities teams to plan the installation around access and scheduling requirements.',
  },
  {
    q: 'Do you provide anti-graffiti film for retail stores?',
    a: 'Yes. Our TotalGard anti-graffiti sacrificial film protects ground-floor retail glass from scratching, etching, and surface damage. When the film is damaged, it is replaced at a fraction of the cost of glass resurfacing — keeping your storefront looking pristine.',
  },
]

const serviceAreas = [
  'DIFC', 'Downtown Dubai', 'Business Bay', 'Sheikh Zayed Road',
  'Deira', 'Bur Dubai', 'JLT', 'JBR', 'Al Quoz Industrial',
  'Dubai Investment Park', 'Dubai Silicon Oasis', 'Media City',
  'Internet City', 'Festival City', 'Al Barsha', 'Sharjah City Centre',
  'Sharjah Industrial', 'Sharjah Corniche',
]

// ─── PAGE ──────────────────────────────────────────────────────────────────

export default function CommercialTintingPage() {
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
              TotalGard · 3M · Llumar — UAE Authorised Commercial Installer
            </p>
            <h1
              className="font-bold text-white leading-[1.1] mb-5"
              style={{ fontFamily: 'var(--font-playfair),serif', fontSize: 'clamp(2.5rem,5vw,4rem)' }}
            >
              Commercial &amp; Office
              <br />
              <span style={{ background: goldGrad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Window Tinting Dubai
              </span>
            </h1>
            <p className="text-white/50 text-base leading-[1.85] mb-8 max-w-xl">
              Smart Auto UAE provides professional <strong className="text-white/75 font-medium">commercial window film installation</strong> for office buildings, retail stores, shopping malls, hotels, schools, and all commercial properties across Dubai and Sharjah. As a UAE authorised distributor and installer for TotalGard, 3M, and Llumar — we deliver energy-saving, comfort-enhancing, and safety-compliant window film solutions backed by full manufacturer warranties.
            </p>
            <div className="flex flex-col gap-2.5 mb-8">
              {[
                'UAE authorised TotalGard, 3M & Llumar installer',
                'Offices, retail, hotels, malls & industrial buildings',
                'After-hours installation — zero business disruption',
                'Full building facade capability',
                'Free site survey & itemised quotation',
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
                Request Free Survey <ArrowRight size={15} />
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

          <motion.div
            variants={fadeRight} initial="hidden" animate="show"
            className="rounded-2xl overflow-hidden"
            style={{ border: '1px solid rgba(201,168,76,0.15)' }}
          >
            <img
              src="/images/services/commercial-tinting-hero.webp"
              alt="Commercial office building window tinting Dubai — TotalGard and 3M film installation by Smart Auto UAE"
              width={700} height={500} loading="eager" decoding="async"
              className="w-full h-full object-cover" style={{ maxHeight: '480px' }}
            />
          </motion.div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section
        className="py-14"
        style={{ backgroundColor: '#060606', borderTop: '1px solid rgba(201,168,76,0.08)', borderBottom: '1px solid rgba(201,168,76,0.08)' }}
      >
        <div className="w-full max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label} variants={fadeUp} custom={i}
                initial="hidden" whileInView="show" viewport={{ once: true }}
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
              Commercial Window Film Benefits
            </p>
            <h2
              className="font-bold text-white text-center"
              style={{ fontFamily: 'var(--font-playfair),serif', fontSize: 'clamp(1.8rem,3vw,2.8rem)' }}
            >
              Why Commercial Properties in Dubai{' '}
              <span style={{ background: goldGrad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Need Window Film
              </span>
            </h2>
            <p className="text-white/40 text-sm text-center mt-4 max-w-2xl mx-auto leading-relaxed">
              The UAE&apos;s extreme UV index and year-round solar radiation present unique challenges for commercial buildings. Window film addresses energy costs, occupant comfort, safety compliance, and interior preservation — simultaneously.
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
                  <h3
                    className="text-white font-bold text-lg mb-3"
                    style={{ fontFamily: 'var(--font-playfair),serif' }}
                  >
                    {b.title}
                  </h3>
                  <p className="text-white/45 text-sm leading-[1.8]">{b.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OFFICE & RETAIL SPLIT ── */}
      <section className="py-24" style={{ backgroundColor: '#060606' }}>
        <div className="w-full max-w-7xl mx-auto px-6 flex flex-col gap-20">

          {/* Office Tinting */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div variants={fadeLeft} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <p className="text-[11px] tracking-[0.3em] uppercase mb-4" style={{ color: GOLD }}>Office Buildings</p>
              <h2
                className="font-bold text-white leading-[1.2] mb-5"
                style={{ fontFamily: 'var(--font-playfair),serif', fontSize: 'clamp(1.8rem,3vw,2.6rem)' }}
              >
                Office Window Tinting{' '}
                <span style={{ background: goldGrad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  Dubai
                </span>
              </h2>
              <p className="text-white/50 text-base leading-[1.85] mb-5">
                A productive work environment requires comfortable, glare-free workstations and stable temperatures throughout the day. Untreated south-facing and west-facing office windows create hot spots near desks, force HVAC systems to overcompensate, and cause significant glare on monitor screens during afternoon hours.
              </p>
              <p className="text-white/50 text-base leading-[1.85] mb-7">
                Smart Auto UAE&apos;s <strong className="text-white/70 font-medium">office window tinting solutions</strong> eliminate hot spots, reduce screen glare by up to 95%, and create a consistently comfortable workspace — improving employee productivity while cutting energy costs.
              </p>
              <ul className="flex flex-col gap-2.5">
                {[
                  'Reduces screen glare for workstation comfort',
                  'Maintains meeting room confidentiality with privacy film',
                  'Eliminates temperature variation across open-plan floors',
                  'Protects office furniture and finishes from UV fading',
                  'Installed outside business hours — zero disruption',
                ].map((p) => (
                  <li key={p} className="flex items-center gap-3">
                    <CheckCircle size={14} style={{ color: GOLD, flexShrink: 0 }} />
                    <span className="text-white/55 text-sm">{p}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              variants={fadeRight} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="rounded-2xl overflow-hidden"
              style={{ border: '1px solid rgba(201,168,76,0.12)' }}
            >
              <img
                src="/images/services/office-tinting.webp"
                alt="Office building window tinting Dubai — TotalGard solar control film by Smart Auto UAE"
                width={700} height={460} loading="lazy" decoding="async"
                className="w-full h-full object-cover" style={{ maxHeight: '420px' }}
              />
            </motion.div>
          </div>

          {/* Shop Tinting */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              variants={fadeRight} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="rounded-2xl overflow-hidden lg:order-first order-last"
              style={{ border: '1px solid rgba(201,168,76,0.12)' }}
            >
              <img
                src="/images/services/shop-tinting.webp"
                alt="Retail shop window tinting Dubai — storefront privacy and UV protection by Smart Auto UAE"
                width={700} height={460} loading="lazy" decoding="async"
                className="w-full h-full object-cover" style={{ maxHeight: '420px' }}
              />
            </motion.div>
            <motion.div variants={fadeLeft} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <p className="text-[11px] tracking-[0.3em] uppercase mb-4" style={{ color: GOLD }}>Retail & Shops</p>
              <h2
                className="font-bold text-white leading-[1.2] mb-5"
                style={{ fontFamily: 'var(--font-playfair),serif', fontSize: 'clamp(1.8rem,3vw,2.6rem)' }}
              >
                Shop &amp; Retail Window Tinting{' '}
                <span style={{ background: goldGrad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  Dubai
                </span>
              </h2>
              <p className="text-white/50 text-base leading-[1.85] mb-5">
                Your storefront window is your most visible marketing asset. It also exposes your displayed merchandise, interior furnishings, and customers to full solar radiation for hours each day. UV-driven fading, heat build-up near displays, and uncomfortable customer experiences all directly impact revenue.
              </p>
              <p className="text-white/50 text-base leading-[1.85] mb-7">
                Smart Auto UAE&apos;s retail window tinting solutions protect your merchandise from UV fading, create a comfortable shopping environment, enhance display visibility, and offer optional decorative branding films that turn your glass into a marketing surface.
              </p>
              <ul className="flex flex-col gap-2.5">
                {[
                  'Prevents merchandise fading and UV discoloration',
                  'Reduces heat build-up near display windows',
                  'Anti-graffiti film for ground-floor storefronts',
                  'Custom printed and branded film options',
                  'Security film to protect against smash-and-grab',
                ].map((p) => (
                  <li key={p} className="flex items-center gap-3">
                    <CheckCircle size={14} style={{ color: GOLD, flexShrink: 0 }} />
                    <span className="text-white/55 text-sm">{p}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FILM TYPES ── */}
      <section className="py-24" style={{ background: 'linear-gradient(180deg,#080808 0%,#0A0A0A 100%)' }}>
        <div className="w-full max-w-7xl mx-auto px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-14">
            <p className="text-[11px] tracking-[0.3em] uppercase mb-3 text-center" style={{ color: GOLD }}>Film Options</p>
            <h2
              className="font-bold text-white text-center"
              style={{ fontFamily: 'var(--font-playfair),serif', fontSize: 'clamp(1.8rem,3vw,2.8rem)' }}
            >
              Commercial Window Films We{' '}
              <span style={{ background: goldGrad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Install in UAE
              </span>
            </h2>
            <p className="text-white/40 text-sm text-center mt-4 max-w-xl mx-auto">
              We recommend the most suitable film for each glazing area based on orientation, occupancy, and your energy and privacy priorities.
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
                        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: GOLD }} />{f}
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

      {/* ── BUILDING TYPES ── */}
      <section className="py-24" style={{ backgroundColor: '#060606' }}>
        <div className="w-full max-w-7xl mx-auto px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-14">
            <p className="text-[11px] tracking-[0.3em] uppercase mb-3 text-center" style={{ color: GOLD }}>
              All Commercial Property Types
            </p>
            <h2
              className="font-bold text-white text-center"
              style={{ fontFamily: 'var(--font-playfair),serif', fontSize: 'clamp(1.8rem,3vw,2.8rem)' }}
            >
              We Serve All{' '}
              <span style={{ background: goldGrad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Commercial Sectors
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {buildingTypes.map((type, i) => (
              <motion.div key={type.title} variants={fadeUp} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }}>
                <div
                  className="rounded-2xl p-7 h-full"
                  style={{ background: 'rgba(17,17,17,0.85)', border: '1px solid rgba(201,168,76,0.1)' }}
                >
                  <div
                    className="w-1 h-8 rounded-full mb-4"
                    style={{ background: goldGrad }}
                    aria-hidden="true"
                  />
                  <h3 className="text-white font-semibold text-base mb-2">{type.title}</h3>
                  <p className="text-white/40 text-[13px] leading-[1.7]">{type.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="py-24" style={{ background: 'linear-gradient(180deg,#080808 0%,#0A0A0A 100%)' }}>
        <div className="w-full max-w-7xl mx-auto px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-14">
            <p className="text-[11px] tracking-[0.3em] uppercase mb-3 text-center" style={{ color: GOLD }}>Installation Process</p>
            <h2
              className="font-bold text-white text-center"
              style={{ fontFamily: 'var(--font-playfair),serif', fontSize: 'clamp(1.8rem,3vw,2.8rem)' }}
            >
              How Commercial Window Film{' '}
              <span style={{ background: goldGrad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Installation Works
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

      {/* ── WHY SMART AUTO ── */}
      <section className="py-24" style={{ backgroundColor: '#060606' }}>
        <div className="w-full max-w-7xl mx-auto px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-14">
            <p className="text-[11px] tracking-[0.3em] uppercase mb-3 text-center" style={{ color: GOLD }}>Why Smart Auto UAE</p>
            <h2
              className="font-bold text-white text-center"
              style={{ fontFamily: 'var(--font-playfair),serif', fontSize: 'clamp(1.8rem,3vw,2.8rem)' }}
            >
              Dubai&apos;s Trusted Commercial{' '}
              <span style={{ background: goldGrad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Window Film Installer
              </span>
            </h2>
            <p className="text-white/40 text-sm text-center mt-4 max-w-2xl mx-auto">
              Since 2014, Smart Auto UAE has delivered commercial window film installations across offices, retail, hospitality, and industrial buildings throughout Dubai and Sharjah. Authorised by TotalGard, 3M, and Llumar.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Authorised Installer',    body: 'UAE authorised distributor and installer for TotalGard, 3M, and Llumar. All products are genuine — no grey-market films.' },
              { title: 'Zero Business Disruption', body: 'We schedule installations after hours, at weekends, or floor by floor — so your operations continue without interruption.' },
              { title: 'Full Building Capability', body: 'From a single office window to a full tower facade — our team and equipment handle projects of any scale across Dubai and Sharjah.' },
              { title: 'Itemised Quotation',       body: 'Detailed per-window, per-floor pricing after a free site survey. No vague estimates or surprise additions on invoice.' },
              { title: 'Manufacturer Warranties',  body: 'All commercial film installations carry 5–10 year manufacturer warranties. Full documentation provided at handover.' },
              { title: 'LEED Documentation',       body: 'We provide full technical data sheets and performance certificates to support your building\'s LEED or sustainability certification submission.' },
            ].map((item, i) => (
              <motion.div key={item.title} variants={fadeUp} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }}>
                <div
                  className="rounded-2xl p-7 h-full"
                  style={{ background: 'rgba(17,17,17,0.85)', border: '1px solid rgba(201,168,76,0.1)' }}
                >
                  <div className="w-1 h-8 rounded-full mb-4" style={{ background: goldGrad }} aria-hidden="true" />
                  <h3 className="text-white font-semibold text-base mb-2">{item.title}</h3>
                  <p className="text-white/40 text-[13px] leading-[1.7]">{item.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICE AREAS ── */}
      <section className="py-20" style={{ background: 'linear-gradient(180deg,#080808 0%,#0A0A0A 100%)' }}>
        <div className="w-full max-w-7xl mx-auto px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-10">
            <p className="text-[11px] tracking-[0.3em] uppercase mb-3 text-center" style={{ color: GOLD }}>
              Building Window Tinting Near Me
            </p>
            <h2
              className="font-bold text-white text-center"
              style={{ fontFamily: 'var(--font-playfair),serif', fontSize: 'clamp(1.8rem,3vw,2.6rem)' }}
            >
              Commercial Tinting Across{' '}
              <span style={{ background: goldGrad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Dubai &amp; Sharjah
              </span>
            </h2>
          </motion.div>
          <motion.div
            className="flex flex-wrap gap-2.5 justify-center"
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          >
            {serviceAreas.map((area) => (
              <span
                key={area}
                className="px-4 py-2 rounded-full text-[13px] border"
                style={{ borderColor: 'rgba(201,168,76,0.15)', background: 'rgba(255,255,255,0.02)', color: 'rgba(255,255,255,0.45)' }}
              >
                {area}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24" style={{ backgroundColor: '#060606' }}>
        <div className="w-full max-w-4xl mx-auto px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-14">
            <p className="text-[11px] tracking-[0.3em] uppercase mb-3 text-center" style={{ color: GOLD }}>Common Questions</p>
            <h2
              className="font-bold text-white text-center"
              style={{ fontFamily: 'var(--font-playfair),serif', fontSize: 'clamp(1.8rem,3vw,2.6rem)' }}
            >
              Commercial Window Tinting{' '}
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
      <section className="py-24" style={{ backgroundColor: '#080808' }}>
        <div className="w-full max-w-7xl mx-auto px-6">
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
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
              Commercial Window Tinting · Dubai &amp; Sharjah · Free Site Survey
            </p>
            <h2
              className="font-bold text-white mb-4 relative z-10"
              style={{ fontFamily: 'var(--font-playfair),serif', fontSize: 'clamp(2rem,4vw,3rem)' }}
            >
              Request a Free Commercial<br />
              <span style={{ background: goldGrad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Window Film Survey Today
              </span>
            </h2>
            <p className="text-white/50 text-base mb-8 max-w-lg mx-auto relative z-10">
              Our team surveys your building, specifies the right film for each area, and delivers a detailed itemised quotation — all at no cost. Authorised TotalGard and 3M installer. Full manufacturer warranties on every job.
            </p>
            <div className="flex gap-4 justify-center flex-wrap relative z-10">
              <a
                href="https://wa.me/971524403677"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm text-black"
                style={{ background: goldGrad }}
              >
                Request Survey on WhatsApp <ArrowRight size={16} />
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