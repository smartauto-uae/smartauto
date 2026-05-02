'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, ArrowRight, Phone, ChevronDown } from 'lucide-react'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'

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

// ─── DATA ────────────────────────────────────────────────────────────────────

const packages = [
  {
    name: 'Silver Package',
    price: 'AED 299 – 349',
    tier: 'Essential',
    interior: [
      'Seats cleaning & stain removal',
      'Seat belts cleaning',
      'Dashboard cleaning',
      'Centre console cleaning',
      'Door side pad cleaning',
      'Roof cleaning',
      'Carpets & floor mats cleaning',
      'AC vents cleaning',
    ],
    exterior: [
      'Exterior waxing',
    ],
  },
  {
    name: 'Gold Package',
    price: 'AED 450 – 500',
    tier: 'Popular',
    interior: [
      'Seats cleaning & stain removal',
      'Seat belts cleaning',
      'Dashboard cleaning',
      'Centre console cleaning',
      'Door side pad cleaning',
      'Roof cleaning',
      'Carpets & floor mats cleaning',
      'AC vents cleaning',
    ],
    exterior: [
      'Washing & clay application',
      'Wheel rim & brake caliper cleaning',
      '6-step body polishing',
      'Swirl marks removal',
    ],
  },
  {
    name: 'Diamond Package',
    price: 'AED 600 – 700',
    tier: 'Premium',
    interior: [
      'Seats cleaning & stain removal',
      'Seat belts cleaning',
      'Dashboard cleaning',
      'Centre console cleaning',
      'Door side pad cleaning',
      'Roof cleaning',
      'Carpets & floor mats cleaning',
      'AC vents cleaning',
      'Complete car disinfection',
    ],
    exterior: [
      'Complete decontamination process',
      'Underbody wash',
      'Washing & clay application',
      'Wheel rim & brake caliper cleaning',
      '6-step body polishing',
      'Swirl marks removal',
    ],
  },
  {
    name: 'Premium Package',
    price: 'AED 1,000 – 1,100',
    tier: 'Ultimate',
    interior: [
      'Seats cleaning & stain removal',
      'Seat belts cleaning',
      'Dashboard cleaning',
      'Centre console cleaning',
      'Door side pad cleaning',
      'Roof cleaning',
      'Carpets & floor mats cleaning',
      'AC vents cleaning',
      'Complete car disinfection',
    ],
    exterior: [
      'Complete decontamination process',
      'Underbody wash',
      'Washing & clay application',
      'Wheel rim & brake caliper cleaning',
      '6-step body polishing with German compounds',
      'Swirl marks removal',
      'Ceramic sealant application',
      'Engine bay decontamination & steam cleaning',
    ],
  },
]

const services = [
  { id: 'polish',    label: 'Car Polishing' },
  { id: 'headlight', label: 'Headlight Restoration' },
  { id: 'exterior',  label: 'Exterior Detailing' },
  { id: 'interior',  label: 'Interior Detailing' },
]

const polishBenefits = [
  'Removes microscopic scratches caused by road debris and dirty sponges',
  'More permanent result than wax or T-cut — not just a surface cover',
  'Complete 3-stage polishing process — reduces lacquer top coat step by step',
  'Transforms your car in 2–3 hours to showroom condition',
  'Deep, long-lasting shine that generic products cannot replicate',
]

const headlightBenefits = [
  'Increases safety — properly functioning headlights are critical for night driving',
  'Increases resale value — buyers pay more for vehicles with clear, bright headlights',
  'Improves light projection and road visibility significantly',
  'Enhances appearance — clear headlights transform the front look of any vehicle',
  'Removes yellowing, cloudiness, leakage, and trapped water or dust particles',
  'Minor accidental scratches removed depending on depth',
]

const exteriorBenefits = [
  'Preserves the car\'s paint finish for a longer duration',
  'Reduces dust and pollen accumulation on the vehicle surface',
  'Removes light scratches and the oxidation layer from the top coat',
  'Enhances durability of the tyre finish and reduces dust on tyres',
  'Streak-free visibility through all glass surfaces',
]

const interiorBenefits = [
  'Effectively removes stains and dirt from all interior surfaces',
  'Preserves paint and plastic finish longer than standard cleaning',
  'Leaves no greasy residue on any surface',
  'Enhances look, shine, and durability of vehicle plastics and leather',
  'Streak-free glass and windshield cleaning',
  'Complete interior coverage — seats, roof, floor, side panels',
]

const faqs = [
  {
    q: 'How much does car detailing cost in Dubai?',
    a: 'Car detailing in Dubai at Smart Auto UAE starts from AED 299 for the Silver Package. Our Gold Package is AED 450–500, Diamond Package AED 600–700, and Premium Package AED 1,000–1,100. All packages include both interior and exterior detailing.',
  },
  {
    q: 'How long does a car detail take?',
    a: 'An express or Silver detail takes 2–3 hours. Gold and Diamond packages take 5–7 hours. Our Premium Package with engine bay cleaning and ceramic sealant takes 1–2 days.',
  },
  {
    q: 'Does car detailing remove scratches?',
    a: 'Yes. Our machine polishing process removes light to medium surface scratches, swirl marks, and water spots through a 3-stage polishing system. Deep scratches penetrating the primer require paint touch-up.',
  },
  {
    q: 'Can you detail my car at my location in Dubai?',
    a: 'We offer mobile detailing for select services. Contact us on WhatsApp to check availability for your area. Walk-ins are welcome at all 4 branches across Dubai and Sharjah.',
  },
  {
    q: 'What is included in headlight restoration?',
    a: 'Our headlight restoration removes yellowing, cloudiness, leakage, trapped water and dust, and minor surface scratches. The process takes 24 hours and requires headlight removal. We offer one free follow-up service after one year.',
  },
  {
    q: 'How often should I get my car detailed in Dubai?',
    a: "We recommend a full detail every 3–4 months. Dubai's desert dust, sand, UV rays, and bird drops are particularly harsh on both interior materials and exterior paintwork.",
  },
]

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      className="rounded-2xl overflow-hidden transition-all duration-300"
      style={{
        border: `1px solid ${open ? 'rgba(201,168,76,0.3)' : 'rgba(255,255,255,0.06)'}`,
        background: 'rgba(255,255,255,0.02)',
      }}
    >
      <button
        type="button"
        className="w-full flex items-center justify-between gap-4 px-7 py-5 text-left"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={`faq-${index}`}
      >
        <span className="text-white font-medium text-[15px] leading-snug">{q}</span>
        <ChevronDown
          size={18}
          style={{
            color: GOLD,
            flexShrink: 0,
            transform: open ? 'rotate(180deg)' : 'rotate(0)',
            transition: 'transform 300ms',
          }}
          aria-hidden="true"
        />
      </button>
      {open && (
        <div id={`faq-${index}`} className="px-7 pb-6">
          <p className="text-white/50 text-sm leading-[1.8]">{a}</p>
        </div>
      )}
    </div>
  )
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function CarDetailingPage() {
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
          style={{ background: 'radial-gradient(ellipse at 60% 40%,rgba(201,168,76,0.08) 0%,transparent 65%)' }}
          aria-hidden="true"
        />
        <div
          className="absolute top-0 left-0 right-0 h-px pointer-events-none"
          style={{ background: 'linear-gradient(to right,transparent,rgba(201,168,76,0.2),transparent)' }}
          aria-hidden="true"
        />

        <div className="w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div variants={fadeUp} initial="hidden" animate="show">
            <p
              className="text-[11px] tracking-[0.3em] uppercase mb-4"
              style={{ color: GOLD }}
            >
              Professional Car Detailing — Dubai &amp; Sharjah
            </p>
            <h1
              className="font-bold text-white leading-[1.05] mb-5"
              style={{
                fontFamily: 'var(--font-playfair),serif',
                fontSize: 'clamp(2.5rem,5vw,4.5rem)',
              }}
            >
              Car Detailing Dubai —<br />
              <span
                style={{
                  background: goldGrad,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Make Your Car Shine
              </span>
            </h1>
            <p className="text-white/50 text-base leading-[1.85] mb-8 max-w-xl">
              Smart Auto UAE offers professional{' '}
              <strong className="text-white/70 font-medium">car detailing services in Dubai</strong> and
              Sharjah — from interior deep cleaning and machine polishing to headlight
              restoration and ceramic sealant application. With 4 branches across the UAE and
              competitive packages starting from AED 299, we are Dubai&apos;s most trusted{' '}
              <strong className="text-white/70 font-medium">car detailing centre</strong>.
            </p>

            {/* Service anchor links */}
            <div className="flex flex-wrap gap-2.5 mb-8">
              {services.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="px-4 py-2 rounded-full text-[11px] tracking-[0.12em] uppercase font-medium transition-all duration-200"
                  style={{
                    border: '1px solid rgba(201,168,76,0.25)',
                    color: GOLD,
                    background: 'rgba(201,168,76,0.06)',
                  }}
                >
                  {s.label}
                </a>
              ))}
            </div>

            <div className="flex gap-3 flex-wrap">
              <a
                href="https://wa.me/971567269666"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-black"
                style={{ background: goldGrad }}
              >
                Book Now <ArrowRight size={15} />
              </a>
              <a
                href="tel:+971567269666"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm border transition-all"
                style={{
                  color: GOLD,
                  borderColor: 'rgba(201,168,76,0.3)',
                  background: 'rgba(201,168,76,0.05)',
                }}
              >
                <Phone size={14} /> +971 56 726 9666
              </a>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            custom={1}
            initial="hidden"
            animate="show"
            className="rounded-2xl overflow-hidden"
            style={{ border: '1px solid rgba(201,168,76,0.15)' }}
          >
            <img
              src="/images/nano-ceramic-2.webp"
              alt="Professional car detailing in Dubai — Smart Auto UAE car polishing and interior cleaning services"
              width={700}
              height={500}
              loading="eager"
              decoding="async"
              className="w-full h-full object-cover"
              style={{ maxHeight: '500px' }}
            />
          </motion.div>
        </div>
      </section>

      {/* ── PACKAGES ── */}
      <section id="packages" className="py-24" style={{ backgroundColor: '#060606' }}>
        <div className="w-full max-w-7xl mx-auto px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-[11px] tracking-[0.3em] uppercase mb-3" style={{ color: GOLD }}>
              Car Detailing Packages in Dubai
            </p>
            <h2
              className="font-bold text-white mb-4"
              style={{
                fontFamily: 'var(--font-playfair),serif',
                fontSize: 'clamp(1.8rem,3vw,2.8rem)',
              }}
            >
              Car Detailing Price in{' '}
              <span
                style={{
                  background: goldGrad,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Dubai
              </span>
            </h2>
            <p className="text-white/40 text-sm max-w-2xl mx-auto leading-relaxed">
              From a quick interior refresh to a full premium detail with ceramic sealant —
              choose the package that suits your vehicle and budget. All prices include both
              interior and exterior work.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
            {packages.map((pkg, i) => (
              <motion.div
                key={pkg.name}
                variants={fadeUp}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="flex flex-col"
              >
                <div
                  className="rounded-2xl p-7 h-full flex flex-col"
                  style={{
                    background: 'rgba(17,17,17,0.9)',
                    border: `1px solid ${i === 3 ? 'rgba(201,168,76,0.35)' : 'rgba(201,168,76,0.12)'}`,
                  }}
                >
                  {/* Tier badge */}
                  <span
                    className="inline-block text-[9px] tracking-[0.2em] uppercase px-2.5 py-1 rounded-full mb-4 self-start"
                    style={{
                      background: i === 3 ? 'rgba(201,168,76,0.18)' : 'rgba(201,168,76,0.08)',
                      color: GOLD,
                      border: '1px solid rgba(201,168,76,0.25)',
                    }}
                  >
                    {pkg.tier}
                  </span>

                  <h3
                    className="text-white font-bold text-xl mb-1.5"
                    style={{ fontFamily: 'var(--font-playfair),serif' }}
                  >
                    {pkg.name}
                  </h3>
                  <p
                    className="font-bold text-2xl mb-5"
                    style={{
                      background: goldGrad,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {pkg.price}
                  </p>

                  {/* Interior */}
                  <p
                    className="text-[10px] tracking-[0.18em] uppercase mb-2.5"
                    style={{ color: GOLD }}
                  >
                    Interior
                  </p>
                  <ul className="flex flex-col gap-1.5 mb-5">
                    {pkg.interior.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-[12px] text-white/50">
                        <CheckCircle
                          size={12}
                          style={{ color: GOLD, flexShrink: 0, marginTop: 2 }}
                          aria-hidden="true"
                        />
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* Exterior */}
                  <p
                    className="text-[10px] tracking-[0.18em] uppercase mb-2.5"
                    style={{ color: GOLD }}
                  >
                    Exterior
                  </p>
                  <ul className="flex flex-col gap-1.5 mb-6 flex-1">
                    {pkg.exterior.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-[12px] text-white/50">
                        <CheckCircle
                          size={12}
                          style={{ color: GOLD, flexShrink: 0, marginTop: 2 }}
                          aria-hidden="true"
                        />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <a
                    href="https://wa.me/971567269666"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-semibold text-black transition-all mt-auto"
                    style={{ background: goldGrad }}
                  >
                    Book This Package <ArrowRight size={13} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CAR POLISHING ── */}
      <section id="polish" className="py-24" style={{ backgroundColor: '#080808' }}>
        <div className="w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden order-last lg:order-first"
            style={{ border: '1px solid rgba(201,168,76,0.12)' }}
          >
            <img
              src="/images/detailing.webp"
              alt="Car polishing and swirl mark removal in Dubai — 3-stage machine polish by Smart Auto UAE"
              width={650}
              height={480}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
              style={{ maxHeight: '460px' }}
            />
          </motion.div>

          <motion.div
            variants={fadeUp}
            custom={1}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <p
              className="text-[11px] tracking-[0.3em] uppercase mb-4"
              style={{ color: GOLD }}
            >
              Car Polishing Dubai
            </p>
            <h2
              className="font-bold text-white leading-[1.15] mb-5"
              style={{
                fontFamily: 'var(--font-playfair),serif',
                fontSize: 'clamp(1.8rem,3vw,2.8rem)',
              }}
            >
              Professional Car{' '}
              <span
                style={{
                  background: goldGrad,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Polishing Service
              </span>
            </h2>
            <p className="text-white/50 text-base leading-[1.85] mb-4">
              Car detailing removes all the microscopic scratches your car may develop from
              general road debris contacting the paintwork, or during washing at car washes with
              dirty sponges. Over time, these swirl marks and micro-scratches dull the finish and
              reduce the visual depth of your paint.
            </p>
            <p className="text-white/50 text-base leading-[1.85] mb-6">
              Unlike wax or T-cut products that simply sit on top of the paintwork and wash off
              — our complete <strong className="text-white/70 font-medium">3-stage machine polishing process</strong>{' '}
              step by step reduces the top coat of lacquer, revealing a new unmarked surface in
              the paint. In 2–3 hours your car is transformed back to how it looked when new.
              The shine produced is significantly more permanent than any over-the-counter
              product can achieve.
            </p>
            <ul className="flex flex-col gap-2.5 mb-7">
              {polishBenefits.map((b) => (
                <li key={b} className="flex items-start gap-3 text-[13px] text-white/55">
                  <CheckCircle
                    size={14}
                    style={{ color: GOLD, flexShrink: 0, marginTop: 2 }}
                    aria-hidden="true"
                  />
                  {b}
                </li>
              ))}
            </ul>
            <a
              href="https://wa.me/971567269666"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-black"
              style={{ background: goldGrad }}
            >
              Book Car Polishing <ArrowRight size={15} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── HEADLIGHT RESTORATION ── */}
      <section id="headlight" className="py-24" style={{ backgroundColor: '#060606' }}>
        <div className="w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <p
              className="text-[11px] tracking-[0.3em] uppercase mb-4"
              style={{ color: GOLD }}
            >
              Headlight Restoration Dubai
            </p>
            <h2
              className="font-bold text-white leading-[1.15] mb-5"
              style={{
                fontFamily: 'var(--font-playfair),serif',
                fontSize: 'clamp(1.8rem,3vw,2.8rem)',
              }}
            >
              Headlight{' '}
              <span
                style={{
                  background: goldGrad,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Restoration Service
              </span>
            </h2>
            <p className="text-white/50 text-base leading-[1.85] mb-4">
              Dim, yellowed, or cloudy headlights reduce visibility dramatically and put you
              and other road users at risk. In the past, replacing scratched or discoloured
              plastic headlight covers was an expensive necessity. Smart Auto UAE&apos;s
              headlight restoration service restores plastic lenses — including headlights,
              tail lights, and fog lights — to like-new condition for a fraction of the
              replacement cost.
            </p>
            <p className="text-white/50 text-base leading-[1.85] mb-6">
              Leakage, water, dust, and particles trapped inside the headlight can be
              successfully removed. Minor accidental surface scratches can also be removed
              depending on depth. The full restoration process takes 24 hours and requires
              headlight removal from the vehicle.{' '}
              <strong className="text-white/70 font-medium">
                We offer one complimentary follow-up service after one year — taking only 15
                minutes with no dismantling required.
              </strong>
            </p>
            <ul className="flex flex-col gap-2.5 mb-7">
              {headlightBenefits.map((b) => (
                <li key={b} className="flex items-start gap-3 text-[13px] text-white/55">
                  <CheckCircle
                    size={14}
                    style={{ color: GOLD, flexShrink: 0, marginTop: 2 }}
                    aria-hidden="true"
                  />
                  {b}
                </li>
              ))}
            </ul>

            {/* Process steps */}
            <div
              className="rounded-xl p-5 mb-7"
              style={{
                background: 'rgba(201,168,76,0.05)',
                border: '1px solid rgba(201,168,76,0.15)',
              }}
            >
              <p className="text-[11px] tracking-[0.2em] uppercase mb-3" style={{ color: GOLD }}>
                Restoration Process
              </p>
              <div className="flex flex-col gap-2">
                {[
                  '1. Headlight removal from vehicle',
                  '2. Deep cleaning of lens interior — removes water, dust & particles',
                  '3. Wet sanding to remove yellowing and surface oxidation',
                  '4. 3-stage polish to restore optical clarity',
                  '5. UV sealant application to prevent future yellowing',
                  '6. Reinstallation and alignment check',
                ].map((step) => (
                  <p key={step} className="text-white/45 text-[12px]">{step}</p>
                ))}
              </div>
            </div>

            <a
              href="https://wa.me/971567269666"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-black"
              style={{ background: goldGrad }}
            >
              Book Headlight Restoration <ArrowRight size={15} />
            </a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            custom={1}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden"
            style={{ border: '1px solid rgba(201,168,76,0.12)' }}
          >
            <img
              src="/images/headlight-restoration.jpeg"
              alt="Headlight restoration Dubai — yellowed and cloudy headlight lens restored by Smart Auto UAE"
              width={650}
              height={480}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
              style={{ maxHeight: '460px' }}
            />
          </motion.div>
        </div>
      </section>

      {/* ── EXTERIOR DETAILING ── */}
      <section id="exterior" className="py-24" style={{ backgroundColor: '#080808' }}>
        <div className="w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden order-last lg:order-first"
            style={{ border: '1px solid rgba(201,168,76,0.12)' }}
          >
            <img
              src="/images/ceramic-coating-2.webp"
              alt="Exterior car detailing Dubai — paint decontamination and Power Shine by Smart Auto UAE"
              width={650}
              height={480}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
              style={{ maxHeight: '460px' }}
            />
          </motion.div>

          <motion.div
            variants={fadeUp}
            custom={1}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <p
              className="text-[11px] tracking-[0.3em] uppercase mb-4"
              style={{ color: GOLD }}
            >
              Exterior Car Detailing Dubai
            </p>
            <h2
              className="font-bold text-white leading-[1.15] mb-5"
              style={{
                fontFamily: 'var(--font-playfair),serif',
                fontSize: 'clamp(1.8rem,3vw,2.8rem)',
              }}
            >
              Exterior Detailing &amp;{' '}
              <span
                style={{
                  background: goldGrad,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Paint Restoration
              </span>
            </h2>
            <p className="text-white/50 text-base leading-[1.85] mb-4">
              Over time, your car&apos;s paint begins to fade and lose its shine. Harsh
              environmental conditions and prolonged exposure to Dubai&apos;s intense sunlight
              are the two main culprits. Left unprotected, paint starts oxidising — moisture
              is removed from the top layers causing it to lose vital oils, and the surface
              gradually becomes duller and chalky.
            </p>
            <p className="text-white/50 text-base leading-[1.85] mb-6">
              A standard car wash will not restore the damage caused by oxidation. Smart Auto&apos;s
              exterior detailing service is one proven solution to protect the gloss and shine
              on your car — restoring the original paint finish while giving your car a
              brand-new look. We keep your car&apos;s paint sparkling for longer.
            </p>
            <ul className="flex flex-col gap-2.5 mb-7">
              {exteriorBenefits.map((b) => (
                <li key={b} className="flex items-start gap-3 text-[13px] text-white/55">
                  <CheckCircle
                    size={14}
                    style={{ color: GOLD, flexShrink: 0, marginTop: 2 }}
                    aria-hidden="true"
                  />
                  {b}
                </li>
              ))}
            </ul>

            {/* What's included */}
            <div
              className="rounded-xl p-5 mb-7"
              style={{
                background: 'rgba(201,168,76,0.05)',
                border: '1px solid rgba(201,168,76,0.15)',
              }}
            >
              <p className="text-[11px] tracking-[0.2em] uppercase mb-3" style={{ color: GOLD }}>
                Exterior Detailing Includes
              </p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  'Decontamination wash',
                  'Clay bar treatment',
                  'Machine polishing',
                  'Swirl mark removal',
                  'Wheel & rim cleaning',
                  'Brake caliper cleaning',
                  'Tyre dressing',
                  'Streak-free glass clean',
                ].map((item) => (
                  <p key={item} className="text-white/40 text-[12px] flex items-center gap-1.5">
                    <span
                      className="w-1 h-1 rounded-full flex-shrink-0"
                      style={{ background: GOLD }}
                      aria-hidden="true"
                    />
                    {item}
                  </p>
                ))}
              </div>
            </div>

            <a
              href="https://wa.me/971567269666"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-black"
              style={{ background: goldGrad }}
            >
              Book Exterior Detail <ArrowRight size={15} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── INTERIOR DETAILING ── */}
      <section id="interior" className="py-24" style={{ backgroundColor: '#060606' }}>
        <div className="w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <p
              className="text-[11px] tracking-[0.3em] uppercase mb-4"
              style={{ color: GOLD }}
            >
              Interior Car Cleaning Dubai
            </p>
            <h2
              className="font-bold text-white leading-[1.15] mb-5"
              style={{
                fontFamily: 'var(--font-playfair),serif',
                fontSize: 'clamp(1.8rem,3vw,2.8rem)',
              }}
            >
              Interior Detailing —{' '}
              <span
                style={{
                  background: goldGrad,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Clean Cars, Happier Journeys
              </span>
            </h2>
            <p className="text-white/50 text-base leading-[1.85] mb-4">
              Almost every day, the morning journey in your car decides your mood for the rest
              of the day. Travelling through Dubai&apos;s traffic for more than an hour is already
              tiring — a dull, unclean, or dusty interior makes it worse. Over time, plastic
              and leather interiors loosen, dust accumulates in every corner, and mirrors look
              foggy. A quick wipe with a cloth does not give a fresh, clean look for long.
            </p>
            <p className="text-white/50 text-base leading-[1.85] mb-6">
              Smart Auto&apos;s Interior Premium Treatment ensures your car&apos;s interior is
              spotlessly clean. A professional cleaner solution is applied to seats, windows,
              and dashboards to remove dust and grime. Spray Dresser is applied on plastic and
              rubber parts to improve the overall aesthetics and life of your car parts.
              All glass and mirrors are cleaned with a streak-free glass cleaner.
            </p>
            <ul className="flex flex-col gap-2.5 mb-7">
              {interiorBenefits.map((b) => (
                <li key={b} className="flex items-start gap-3 text-[13px] text-white/55">
                  <CheckCircle
                    size={14}
                    style={{ color: GOLD, flexShrink: 0, marginTop: 2 }}
                    aria-hidden="true"
                  />
                  {b}
                </li>
              ))}
            </ul>

            {/* What's included */}
            <div
              className="rounded-xl p-5 mb-7"
              style={{
                background: 'rgba(201,168,76,0.05)',
                border: '1px solid rgba(201,168,76,0.15)',
              }}
            >
              <p className="text-[11px] tracking-[0.2em] uppercase mb-3" style={{ color: GOLD }}>
                Interior Detailing Includes
              </p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  'Full seat cleaning & stain removal',
                  'Roof lining clean',
                  'Carpet & floor mat cleaning',
                  'Dashboard cleaning & dressing',
                  'Centre console cleaning',
                  'Door panels & side pads',
                  'AC vents deep clean',
                  'All glass & mirror cleaning',
                  'Leather conditioning',
                  'Odour elimination treatment',
                ].map((item) => (
                  <p key={item} className="text-white/40 text-[12px] flex items-center gap-1.5">
                    <span
                      className="w-1 h-1 rounded-full flex-shrink-0"
                      style={{ background: GOLD }}
                      aria-hidden="true"
                    />
                    {item}
                  </p>
                ))}
              </div>
            </div>

            <a
              href="https://wa.me/971567269666"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-black"
              style={{ background: goldGrad }}
            >
              Book Interior Detail <ArrowRight size={15} />
            </a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            custom={1}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden"
            style={{ border: '1px solid rgba(201,168,76,0.12)' }}
          >
            <img
              src="/images/detailing-2.webp"
              alt="Interior car cleaning Dubai — full interior detailing and upholstery cleaning by Smart Auto UAE"
              width={650}
              height={480}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
              style={{ maxHeight: '460px' }}
            />
          </motion.div>
        </div>
      </section>

      {/* ── TRUST STRIP ── */}
      <section
        className="py-12"
        style={{
          backgroundColor: '#080808',
          borderTop: '1px solid rgba(201,168,76,0.08)',
          borderBottom: '1px solid rgba(201,168,76,0.08)',
        }}
      >
        <div className="w-full max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: '4', label: 'Branches — Dubai & Sharjah' },
              { value: 'AED 299', label: 'Starting Price' },
              { value: '600+', label: 'Google Reviews' },
              { value: '20+', label: 'Years in UAE' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                <p
                  className="font-bold leading-none mb-1.5"
                  style={{
                    fontFamily: 'var(--font-playfair),serif',
                    fontSize: 'clamp(1.6rem,2.5vw,2.2rem)',
                    background: goldGrad,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {stat.value}
                </p>
                <p className="text-white/35 text-[11px] tracking-[0.12em] uppercase">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24" style={{ backgroundColor: '#060606' }}>
        <div className="w-full max-w-4xl mx-auto px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="text-[11px] tracking-[0.3em] uppercase mb-3" style={{ color: GOLD }}>
              Common Questions
            </p>
            <h2
              className="font-bold text-white"
              style={{
                fontFamily: 'var(--font-playfair),serif',
                fontSize: 'clamp(1.8rem,3vw,2.6rem)',
              }}
            >
              Car Detailing{' '}
              <span
                style={{
                  background: goldGrad,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                FAQs
              </span>
            </h2>
          </motion.div>
          <div className="flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20" style={{ backgroundColor: '#080808' }}>
        <div className="w-full max-w-3xl mx-auto px-6 text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <p
              className="text-[11px] tracking-[0.3em] uppercase mb-4"
              style={{ color: GOLD }}
            >
              Car Detailing Near Me — Dubai &amp; Sharjah
            </p>
            <h2
              className="font-bold text-white mb-4"
              style={{
                fontFamily: 'var(--font-playfair),serif',
                fontSize: 'clamp(1.8rem,3.5vw,3rem)',
              }}
            >
              Book Your Car Detailing in{' '}
              <span
                style={{
                  background: goldGrad,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Dubai Today
              </span>
            </h2>
            <p className="text-white/45 text-base mb-8 max-w-xl mx-auto">
              Packages from AED 299 · 4 branches across Dubai &amp; Sharjah · Free inspection ·
              No hidden charges · Open every day
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <a
                href="https://wa.me/971567269666"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm text-black"
                style={{ background: goldGrad }}
              >
                Book on WhatsApp <ArrowRight size={15} />
              </a>
              <a
                href="tel:+971567269666"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm border"
                style={{
                  color: GOLD,
                  borderColor: 'rgba(201,168,76,0.3)',
                  background: 'rgba(201,168,76,0.05)',
                }}
              >
                <Phone size={14} /> +971 56 726 9666
              </a>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer/>

    </main>
  )
}