'use client'

import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { motion } from 'framer-motion'
import { CheckCircle, ArrowRight, Phone, Star, Award, Users, MapPin, MessageCircle, Shield, Zap, Heart } from 'lucide-react'

const GOLD = '#C9A84C'
const GOLD2 = '#E8C96A'
const GOLD3 = '#A07830'
const goldGrad = `linear-gradient(135deg,${GOLD},${GOLD2},${GOLD3})`

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]
const fadeUp    = { hidden: { opacity: 0, y: 28 }, show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1, ease } }) }
const fadeLeft  = { hidden: { opacity: 0, x: -28 }, show: { opacity: 1, x: 0, transition: { duration: 0.7, ease } } }
const fadeRight = { hidden: { opacity: 0, x: 28 },  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease } } }

// ─── DATA ──────────────────────────────────────────────────────────────────

const stats = [
  { value: '20+',  label: 'Years in UAE',        desc: 'Serving Dubai & Sharjah since 2004' },
  { value: '50K+', label: 'Happy Customers',      desc: 'Trusted by vehicle and homeowners across UAE' },
  { value: '600+', label: '5-Star Reviews',       desc: 'Verified Google reviews from real UAE customers' },
  { value: '4',    label: 'Branches',             desc: 'MotorCity · Al Quoz · Mirdif · Sharjah' },
]

const milestones = [
  {
    year: '2004',
    title: 'Founded in Dubai',
    desc: 'Smart Auto started as a specialist window film installer in Dubai, serving early adopters of automotive tinting when the concept was new to the UAE market.',
  },
  {
    year: '2010',
    title: '3M Authorised Partnership',
    desc: 'Smart Auto became an officially authorised distributor and certified applicator for 3M USA window films and protection products across the UAE — a recognition of installation quality and volume.',
  },
  {
    year: '2014',
    title: 'Totalgard & Residential Expansion',
    desc: 'Added Totalgard as an authorised brand partner and expanded into residential, commercial, and architectural window film — bringing the same quality standard from automotive into homes and buildings.',
  },
  {
    year: '2018',
    title: 'PPF & Ceramic Coating',
    desc: 'Launched full Paint Protection Film (PPF) and nano ceramic coating services to complement the window film offering — becoming a complete vehicle and surface protection centre.',
  },
  {
    year: '2021',
    title: 'Marine & Smart Film',
    desc: 'Extended services to marine vessels — boats, yachts, and commercial craft — and introduced Smart Film (switchable privacy glass) for residential and commercial spaces.',
  },
  {
    year: '2024',
    title: '4 Branches · 50,000 Customers',
    desc: 'Operating across 4 branches in MotorCity, Al Quoz, Mirdif, and Sharjah. Trusted by over 50,000 customers. Recognised as one of the UAE\'s leading protection specialists.',
  },
]

const brands = [
  {
    name: '3M USA',
    role: 'Authorised Distributor & Certified Applicator',
    desc: '3M is the world\'s leading window film and surface protection brand. Smart Auto UAE is an officially authorised distributor and certified installer for the full 3M range — including 3M Sun Control, Safety & Security, and All Seasons films.',
  },
  {
    name: 'Totalgard',
    role: 'Authorised Distributor & Certified Applicator',
    desc: 'Totalgard is one of the UAE\'s most trusted window film brands, designed and tested for the extreme heat and UV conditions of the Gulf. Smart Auto UAE is a Totalgard authorised distributor and certified installation partner.',
  },
  {
    name: 'Global USA',
    role: 'Authorised Installer',
    desc: 'Global USA window films are engineered for precision solar control and optical clarity. As an authorised Global USA installer, Smart Auto UAE delivers their performance range for automotive, residential, and commercial applications.',
  },
  {
    name: 'Llumar',
    role: 'Certified Applicator',
    desc: 'Llumar is part of Eastman Chemical Company — makers of some of the world\'s most durable and optically pure window films. Smart Auto UAE installs Llumar films across automotive and architectural segments.',
  },
]

const services = [
  { label: 'Car Window Tinting',           desc: 'Nano ceramic & solar control films for all vehicles' },
  { label: 'Residential Window Tinting',   desc: 'Home, villa, flat glass & skylight film' },
  { label: 'Commercial Window Tinting',    desc: 'Offices, retail, malls & building facades' },
  { label: 'Marine Window Tinting',        desc: 'Boats, yachts & commercial vessels' },
  { label: 'Paint Protection Film (PPF)',  desc: 'Clear & colour PPF for all vehicles' },
  { label: 'Nano Ceramic Coating',         desc: 'Long-lasting hydrophobic surface protection' },
  { label: 'Smart Film',                   desc: 'Switchable privacy glass for homes & offices' },
  { label: 'Car Wrapping',                 desc: '100+ vinyl colours, chrome, matte & satin finishes' },
  { label: 'Marble Protection Film',       desc: 'Invisible surface protection for stone & countertops' },
  { label: 'Car Detailing',                desc: 'Interior & exterior cleaning and restoration' },
]

const values = [
  {
    icon: Award,
    title: 'Authorised Only',
    desc: 'We install only genuine products from our authorised brand partners — 3M, Totalgard, Global USA, and Llumar. No grey-market films, no imitations, no exceptions.',
  },
  {
    icon: Shield,
    title: 'Certified Installers',
    desc: 'Every Smart Auto technician is trained and certified by the brands they install. Certification is not just a badge — it requires passing rigorous written and hands-on tests.',
  },
  {
    icon: Zap,
    title: 'No Compromise on Quality',
    desc: 'We have been doing this for over 20 years because we have never compromised. The same attention to detail on a single-window job as on a full superyacht or commercial building.',
  },
  {
    icon: Heart,
    title: 'Customer First',
    desc: 'Over 50,000 UAE customers and 600+ verified 5-star Google reviews reflect one principle — if the customer is not satisfied, the job is not done.',
  },
  {
    icon: Users,
    title: 'Trusted by All Segments',
    desc: 'From first-time car owners to fleet operators, luxury homeowners to marina managers, government facilities to shopping malls — Smart Auto UAE serves every segment with equal care.',
  },
  {
    icon: MapPin,
    title: '4 Branches, 1 Standard',
    desc: 'MotorCity, Al Quoz, Mirdif, and Sharjah. Every branch operates to the same quality standard, uses the same products, and employs the same certified team.',
  },
]

const testimonials = [
  {
    name: 'Ahmed Al Mansoori',
    role: 'Luxury Vehicle Owner · Dubai Marina',
    rating: 5,
    text: "I have had three cars done by Smart Auto over the past 8 years — PPF and tinting on all of them. The quality is consistent every single time. These guys know what they are doing and they don't cut corners.",
  },
  {
    name: 'Sarah Mitchell',
    role: 'Villa Owner · Palm Jumeirah',
    rating: 5,
    text: "Smart Auto tinted the entire ground floor of our villa on Palm. The team was professional, arrived on time, cleaned up perfectly, and the film quality is exceptional. Our energy bills dropped noticeably the following month.",
  },
  {
    name: 'Faisal Al Rashid',
    role: 'Fleet Manager · Dubai Logistics Company',
    rating: 5,
    text: "We use Smart Auto for our 40-vehicle fleet. Consistent quality, competitive pricing, and they always accommodate our schedule. The only tinting centre we trust for commercial fleet work in Dubai.",
  },
]

// ─── PAGE ──────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <main style={{ background: '#0A0A0A', paddingTop: '80px' }}>
<Navbar/>
      {/* ── HERO ── */}
      <section
        className="relative py-24 overflow-hidden"
        style={{ background: 'linear-gradient(180deg,#050505 0%,#080808 100%)' }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 60% 50%,rgba(201,168,76,0.07) 0%,transparent 60%)' }}
          aria-hidden="true"
        />
        <div
          className="absolute top-0 left-0 right-0 h-px pointer-events-none"
          style={{ background: 'linear-gradient(to right,transparent,rgba(201,168,76,0.2),transparent)' }}
          aria-hidden="true"
        />

        <div className="w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div variants={fadeLeft} initial="hidden" animate="show">
            <p className="text-[11px] tracking-[0.3em] uppercase mb-4" style={{ color: GOLD }}>
              Established 2004 · Dubai, UAE
            </p>
            <h1
              className="font-bold text-white leading-[1.1] mb-5"
              style={{ fontFamily: 'var(--font-playfair),serif', fontSize: 'clamp(2.5rem,5vw,4rem)' }}
            >
              UAE&apos;s Trusted Protection{' '}
              <span
                style={{
                  background: goldGrad,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Specialists
              </span>
            </h1>
            <p className="text-white/50 text-base leading-[1.9] mb-6 max-w-xl">
              Smart Auto UAE has been the most trusted name in window tinting, paint protection film, and ceramic coating across Dubai and Sharjah for over 20 years. From a single automotive tinting bay in 2004 to four branches, 50,000 customers, and authorised partnerships with 3M, Totalgard, Global USA, and Llumar — our story is one of consistent quality and earned trust.
            </p>
            <p className="text-white/40 text-base leading-[1.9] mb-8 max-w-xl">
              We protect cars, homes, offices, yachts, and commercial spaces across the UAE. Whatever surface needs protecting, Smart Auto has the product, the brand authority, and the certified team to do it right.
            </p>
            <div className="flex gap-3 flex-wrap">
              <a
                href="https://wa.me/971524403677"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-black"
                style={{ background: goldGrad }}
              >
                Get a Free Consultation <ArrowRight size={15} />
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
            className="rounded-2xl overflow-hidden"
            style={{ border: '1px solid rgba(201,168,76,0.15)' }}
          >
            <img
              src="/images/about/about-hero.webp"
              alt="Smart Auto UAE team — professional window tinting and protection specialists Dubai"
              width={700} height={500}
              loading="eager" decoding="async"
              className="w-full h-full object-cover"
              style={{ maxHeight: '480px' }}
            />
          </motion.div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section
        className="py-14"
        style={{
          backgroundColor: '#060606',
          borderTop: '1px solid rgba(201,168,76,0.08)',
          borderBottom: '1px solid rgba(201,168,76,0.08)',
        }}
      >
        <div className="w-full max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={fadeUp} custom={i}
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

      {/* ── OUR STORY ── */}
      <section className="py-24" style={{ background: 'linear-gradient(180deg,#080808 0%,#0A0A0A 100%)' }}>
        <div className="w-full max-w-7xl mx-auto px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-16">
            <p className="text-[11px] tracking-[0.3em] uppercase mb-3 text-center" style={{ color: GOLD }}>
              Our Journey
            </p>
            <h2
              className="font-bold text-white text-center"
              style={{ fontFamily: 'var(--font-playfair),serif', fontSize: 'clamp(1.8rem,3vw,2.8rem)' }}
            >
              20 Years of{' '}
              <span
                style={{
                  background: goldGrad,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Earned Trust
              </span>
            </h2>
            <p className="text-white/40 text-sm text-center mt-4 max-w-2xl mx-auto">
              From a single installation bay in Dubai to a four-branch UAE operation trusted by 50,000 customers — here is how Smart Auto got here.
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div
              className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px pointer-events-none hidden sm:block"
              style={{ background: 'linear-gradient(to bottom,transparent,rgba(201,168,76,0.2) 10%,rgba(201,168,76,0.2) 90%,transparent)' }}
              aria-hidden="true"
            />

            <div className="flex flex-col gap-12">
              {milestones.map((m, i) => {
                const isLeft = i % 2 === 0
                return (
                  <motion.div
                    key={m.year}
                    variants={fadeUp} custom={i}
                    initial="hidden" whileInView="show" viewport={{ once: true }}
                    className={`relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${isLeft ? '' : 'md:[direction:rtl]'}`}
                  >
                    {/* Content card */}
                    <div className={`${isLeft ? 'md:pr-12' : 'md:pl-12 [direction:ltr]'}`}>
                      <div
                        className="rounded-2xl p-8"
                        style={{ background: 'rgba(17,17,17,0.85)', border: '1px solid rgba(201,168,76,0.1)' }}
                      >
                        <span
                          className="inline-block text-[11px] tracking-[0.25em] uppercase font-bold px-3 py-1 rounded-full mb-4"
                          style={{ background: 'rgba(201,168,76,0.1)', color: GOLD, border: '1px solid rgba(201,168,76,0.2)' }}
                        >
                          {m.year}
                        </span>
                        <h3 className="text-white font-bold text-xl mb-2.5" style={{ fontFamily: 'var(--font-playfair),serif' }}>
                          {m.title}
                        </h3>
                        <p className="text-white/45 text-[13px] leading-[1.8]">{m.desc}</p>
                      </div>
                    </div>

                    {/* Dot on timeline */}
                    <div
                      className="absolute left-6 md:left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full hidden sm:block"
                      style={{ background: goldGrad, boxShadow: `0 0 12px rgba(201,168,76,0.4)` }}
                      aria-hidden="true"
                    />

                    {/* Empty right/left column — keeps grid alignment */}
                    <div />
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── AUTHORISED BRANDS ── */}
      <section className="py-24" style={{ backgroundColor: '#060606' }}>
        <div className="w-full max-w-7xl mx-auto px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-14">
            <p className="text-[11px] tracking-[0.3em] uppercase mb-3 text-center" style={{ color: GOLD }}>
              Brand Partnerships
            </p>
            <h2
              className="font-bold text-white text-center"
              style={{ fontFamily: 'var(--font-playfair),serif', fontSize: 'clamp(1.8rem,3vw,2.8rem)' }}
            >
              Authorised by the World&apos;s{' '}
              <span
                style={{
                  background: goldGrad,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Best Brands
              </span>
            </h2>
            <p className="text-white/40 text-sm text-center mt-4 max-w-2xl mx-auto">
              Smart Auto UAE is an officially authorised distributor and certified applicator for 3M USA, Totalgard, Global USA, and Llumar. Authorised status is earned — not purchased. It requires meeting rigorous installation quality standards, volume thresholds, and ongoing certification.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {brands.map((brand, i) => (
              <motion.div
                key={brand.name}
                variants={fadeUp} custom={i}
                initial="hidden" whileInView="show" viewport={{ once: true }}
              >
                <div
                  className="rounded-2xl p-8 h-full"
                  style={{ background: 'rgba(17,17,17,0.85)', border: '1px solid rgba(201,168,76,0.12)' }}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)' }}
                    >
                      <Award size={20} style={{ color: GOLD }} aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-xl" style={{ fontFamily: 'var(--font-playfair),serif' }}>
                        {brand.name}
                      </h3>
                      <p className="text-[11px] tracking-[0.1em] uppercase mt-0.5" style={{ color: 'rgba(201,168,76,0.65)' }}>
                        {brand.role}
                      </p>
                    </div>
                  </div>
                  <p className="text-white/45 text-[13px] leading-[1.8]">{brand.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Authorised badge strip */}
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="mt-8 rounded-2xl p-7 flex flex-col md:flex-row items-center justify-between gap-5"
            style={{
              background: 'linear-gradient(135deg,rgba(201,168,76,0.08) 0%,rgba(201,168,76,0.03) 100%)',
              border: '1px solid rgba(201,168,76,0.18)',
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-2 h-10 rounded-full flex-shrink-0"
                style={{ background: goldGrad }}
                aria-hidden="true"
              />
              <div>
                <p className="text-white font-bold text-base" style={{ fontFamily: 'var(--font-playfair),serif' }}>
                  Official UAE Authorised Distributor &amp; Certified Installer
                </p>
                <p className="text-white/40 text-[12px] mt-0.5">
                  3M USA · Totalgard · Global USA · Llumar — verified and active authorisations
                </p>
              </div>
            </div>
            <a
              href="https://wa.me/971524403677"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-black flex-shrink-0"
              style={{ background: goldGrad }}
            >
              Verify &amp; Book <ArrowRight size={13} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── OUR VALUES ── */}
      <section className="py-24" style={{ background: 'linear-gradient(180deg,#080808 0%,#0A0A0A 100%)' }}>
        <div className="w-full max-w-7xl mx-auto px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-14">
            <p className="text-[11px] tracking-[0.3em] uppercase mb-3 text-center" style={{ color: GOLD }}>
              How We Work
            </p>
            <h2
              className="font-bold text-white text-center"
              style={{ fontFamily: 'var(--font-playfair),serif', fontSize: 'clamp(1.8rem,3vw,2.8rem)' }}
            >
              What We Stand{' '}
              <span
                style={{
                  background: goldGrad,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Behind
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((val, i) => (
              <motion.div
                key={val.title}
                variants={fadeUp} custom={i}
                initial="hidden" whileInView="show" viewport={{ once: true }}
              >
                <div
                  className="rounded-2xl p-8 h-full"
                  style={{ background: 'rgba(17,17,17,0.85)', border: '1px solid rgba(201,168,76,0.1)' }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                    style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)', color: GOLD }}
                  >
                    <val.icon size={20} aria-hidden="true" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2.5" style={{ fontFamily: 'var(--font-playfair),serif' }}>
                    {val.title}
                  </h3>
                  <p className="text-white/45 text-[13px] leading-[1.8]">{val.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="py-24" style={{ backgroundColor: '#060606' }}>
        <div className="w-full max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            <motion.div variants={fadeLeft} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <p className="text-[11px] tracking-[0.3em] uppercase mb-4" style={{ color: GOLD }}>
                Full Service Range
              </p>
              <h2
                className="font-bold text-white leading-[1.2] mb-5"
                style={{ fontFamily: 'var(--font-playfair),serif', fontSize: 'clamp(1.8rem,3vw,2.6rem)' }}
              >
                Everything Your Vehicle,{' '}
                <span
                  style={{
                    background: goldGrad,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Home &amp; Space Needs
                </span>
              </h2>
              <p className="text-white/50 text-base leading-[1.85] mb-7">
                Smart Auto UAE is not a window tinting shop — it is a complete protection specialist. Over 20 years, we have built the team, product range, and brand authorisations to handle every protection requirement across automotive, residential, commercial, and marine segments.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {services.map((svc) => (
                  <div key={svc.label} className="flex items-start gap-2.5">
                    <CheckCircle size={14} style={{ color: GOLD, flexShrink: 0, marginTop: 3 }} />
                    <div>
                      <p className="text-white text-[13px] font-semibold">{svc.label}</p>
                      <p className="text-white/35 text-[11px]">{svc.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={fadeRight} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="rounded-2xl overflow-hidden"
              style={{ border: '1px solid rgba(201,168,76,0.15)' }}
            >
              <img
                src="/images/about/services-overview.webp"
                alt="Smart Auto UAE services — window tinting, PPF, ceramic coating and car wrapping in Dubai"
                width={700} height={500}
                loading="lazy" decoding="async"
                className="w-full h-full object-cover"
                style={{ maxHeight: '520px' }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24" style={{ background: 'linear-gradient(180deg,#080808 0%,#0A0A0A 100%)' }}>
        <div className="w-full max-w-7xl mx-auto px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-14">
            <p className="text-[11px] tracking-[0.3em] uppercase mb-3 text-center" style={{ color: GOLD }}>
              Customer Reviews
            </p>
            <h2
              className="font-bold text-white text-center"
              style={{ fontFamily: 'var(--font-playfair),serif', fontSize: 'clamp(1.8rem,3vw,2.8rem)' }}
            >
              600+ Verified{' '}
              <span
                style={{
                  background: goldGrad,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                5-Star Reviews
              </span>
            </h2>
            <p className="text-white/40 text-sm text-center mt-4 max-w-xl mx-auto">
              Over 600 verified Google reviews from UAE customers across automotive, residential, commercial, and marine projects.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                variants={fadeUp} custom={i}
                initial="hidden" whileInView="show" viewport={{ once: true }}
              >
                <div
                  className="rounded-2xl p-8 h-full flex flex-col"
                  style={{ background: 'rgba(17,17,17,0.85)', border: '1px solid rgba(201,168,76,0.1)' }}
                >
                  <div
                    className="mb-4 leading-none"
                    style={{ fontFamily: 'var(--font-playfair),serif', fontSize: 56, color: 'rgba(201,168,76,0.12)' }}
                    aria-hidden="true"
                  >
                    &ldquo;
                  </div>
                  <div className="flex gap-1 mb-3" aria-label={`${t.rating} out of 5 stars`}>
                    {[...Array(t.rating)].map((_, j) => (
                      <Star key={j} size={13} fill={GOLD} style={{ color: GOLD }} aria-hidden="true" />
                    ))}
                  </div>
                  <p className="text-white/55 text-sm leading-[1.8] mb-6 flex-1">{t.text}</p>
                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1rem' }}>
                    <p className="text-white font-semibold text-[15px]">{t.name}</p>
                    <p className="text-[12px] mt-1" style={{ color: 'rgba(201,168,76,0.65)' }}>{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Google review strip */}
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="mt-8 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-center gap-5 text-center sm:text-left"
            style={{
              background: 'rgba(17,17,17,0.6)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <div className="flex gap-1" aria-label="5 out of 5 stars average">
              {[...Array(5)].map((_, j) => (
                <Star key={j} size={18} fill={GOLD} style={{ color: GOLD }} aria-hidden="true" />
              ))}
            </div>
            <p className="text-white/60 text-sm">
              <strong className="text-white font-semibold">4.9 / 5.0</strong> average across 600+ verified Google reviews
              &nbsp;·&nbsp; Dubai &amp; Sharjah
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24" style={{ backgroundColor: '#060606' }}>
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
              4 Branches · Dubai &amp; Sharjah · Free Consultation
            </p>
            <h2
              className="font-bold text-white mb-4 relative z-10"
              style={{ fontFamily: 'var(--font-playfair),serif', fontSize: 'clamp(2rem,4vw,3rem)' }}
            >
              Ready to Protect Your Vehicle,<br />
              <span
                style={{
                  background: goldGrad,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Home or Vessel?
              </span>
            </h2>
            <p className="text-white/50 text-base mb-8 max-w-lg mx-auto relative z-10">
              Visit any of our 4 branches across Dubai and Sharjah. Free consultation, no obligation. Walk in or book ahead on WhatsApp.
            </p>
            <div className="flex gap-4 justify-center flex-wrap relative z-10">
              <a
                href="https://wa.me/971524403677"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm text-black"
                style={{ background: goldGrad }}
              >
                <MessageCircle size={16} /> WhatsApp Us
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm border"
                style={{ color: GOLD, borderColor: 'rgba(201,168,76,0.3)', background: 'rgba(201,168,76,0.05)' }}
              >
                View All Branches <ArrowRight size={16} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>
<Footer/>
    </main>
  )
}