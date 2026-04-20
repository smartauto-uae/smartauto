'use client'

import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { motion } from 'framer-motion'
import { CheckCircle, ArrowRight, Phone, Shield, Star } from 'lucide-react'
import type { Metadata } from 'next'

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
    name: 'Front End Package',
    coverage: 'Full bonnet, front bumper, side mirrors, headlights & fog lights',
    price: 'From AED 2,500',
    duration: '1–2 days',
    warranty: '15-Year self-healing warranty',
    popular: false,
  },
  {
    name: 'Standard Package',
    coverage: 'Full front end + door edge guards + door cup protectors + A-pillars',
    price: 'From AED 4,999',
    duration: '2–3 days',
    warranty: '7-year warranty',
    popular: true,
  },
  {
    name: 'Full Body PPF',
    coverage: 'Every painted panel — complete vehicle coverage',
    price: 'From AED 9,999',
    duration: '4–5 days',
    warranty: '10-year warranty',
    popular: false,
  },
  {
    name: 'Custom / Supercar',
    coverage: 'Track cars, supercars, custom rooflines — tailored to your vehicle',
    price: 'Contact for quote',
    duration: 'Varies',
    warranty: 'Manufacturer warranty',
    popular: false,
  },
]

const benefits = [
  {
    title: 'Keeps Your Car Looking New',
    body: 'Paint Protection Film provides a permanent protective coat over your car\'s paint, preserving the showroom-quality finish for years. It prevents fading and maintains a polished, glossy appearance at all times — essential in Dubai\'s extreme UV conditions.',
  },
  {
    title: 'Retains Resale Value',
    body: 'Used car buyers place significant weight on exterior condition. PPF protects your paint from environmental and superficial damage, preserving your car\'s appearance and directly supporting a higher resale value when you come to sell.',
  },
  {
    title: 'Self-Healing Technology',
    body: 'Premium TPU-based PPF films from Totalgard, 3M, and XPEL feature thermoplastic self-healing technology. Minor surface swirl marks and light scratches vanish with heat from the sun or warm water — the film literally repairs itself.',
  },
  {
    title: 'Repels Environmental Damage',
    body: 'Dubai\'s harsh UV radiation, sand, bird droppings, tree sap, and acid rain are constant threats to paintwork. PPF acts as a sacrificial barrier — absorbing these hazards so your paint underneath remains perfectly protected.',
  },
  {
    title: 'Chemical & Scratch Protection',
    body: 'Scratches trap moisture and lead to rust. Harsh chemicals cause discolouration. PPF acts as a chemical barrier for your car\'s exterior, protecting against all of these threats while remaining completely transparent.',
  },
  {
    title: 'Completely Invisible',
    body: 'The best paint protection is the kind you never notice. Our optically clear PPF films are virtually undetectable — no one will know it\'s there. Your car\'s colour, design features, and lines remain completely unchanged.',
  },
  {
    title: 'Easier Car Cleaning',
    body: 'The hydrophobic surface of PPF repels dust, water, and road grime. Your car\'s exterior will not accumulate the same level of build-up, making cleaning significantly faster and easier.',
  },
  {
    title: 'Saves Money on Repairs',
    body: 'Prevention is always more cost-effective than repair. PPF eliminates the recurring expense of stone chip touch-ups, paint correction, and panel resprays — paying for itself many times over across the life of your vehicle.',
  },
]

const protectsFrom = [
  {
    threat: 'Stone Chips & Road Debris',
    detail: 'The film absorbs the impact of stones and road debris that would otherwise chip or crack your paint, keeping the surface free from marks even at motorway speeds.',
  },
  {
    threat: 'UV Rays & Solar Radiation',
    detail: 'PPF contains UV inhibitors that block harmful solar radiation — preventing paint fading, oxidation, and that chalky dulled appearance that affects unprotected vehicles in the UAE.',
  },
  {
    threat: 'Bird Droppings & Tree Sap',
    detail: 'Acidic bird droppings and corrosive tree sap can etch permanently into paint within hours in Dubai\'s heat. PPF forms a chemical barrier so these contaminants wipe off cleanly.',
  },
  {
    threat: 'Headlight Yellowing',
    detail: 'Without protection, UV radiation causes headlight lenses to turn yellow and hazy. PPF film applied to headlights keeps them crystal clear and preserves your vehicle\'s lighting performance.',
  },
  {
    threat: 'Road Grime & Dust',
    detail: 'PPF\'s smooth, hydrophobic surface prevents dust and road grime from bonding to the paint surface — dramatically reducing contamination between washes.',
  },
  {
    threat: 'Minor Scratches & Swirl Marks',
    detail: 'PPF acts as a sacrificial layer — absorbing everyday swirl marks from car washes, light contact, and environmental abrasion while keeping the underlying paint in perfect condition.',
  },
]

const brands = [
  { name: 'Totalgard', note: 'UAE Authorised Installer' },
  { name: '3M Scotchgard', note: 'UAE Authorised Installer' },
  { name: 'XPEL Ultimate Plus', note: 'Certified Installer' },
  { name: 'SunTek Ultra', note: 'Approved Applicator' },
]

const faqs = [
  {
    q: 'Is PPF worth it in Dubai?',
    a: "Yes. Dubai's combination of extreme UV radiation, sand and grit on roads, high-speed motorway driving, and intense heat make PPF one of the most practical investments for any vehicle owner in the UAE. The film protects against stone chips, UV fading, bird drop etching, and chemical damage — all of which are accelerated by the local climate. A quality PPF installation pays for itself by eliminating recurring paint repair costs.",
  },
  {
    q: 'How long does PPF installation take at Smart Auto UAE?',
    a: 'A full-body PPF installation takes 4–5 days at our workshop. Front-end only coverage takes 1–2 days. Standard package coverage (front end + door edges + A-pillars) takes 2–3 days. We have 4 branches across Dubai and Sharjah — book at the most convenient location.',
  },
  {
    q: 'Does PPF go yellow over time?',
    a: 'Premium TPU films from Totalgard, 3M, and XPEL are manufactured with UV stabilisers and optical-grade clarity. They will not yellow, cloud, or discolour throughout their warranty period — which ranges from 5 to 10 years depending on the product.',
  },
  {
    q: 'What is the difference between PPF and ceramic coating?',
    a: 'PPF is a physical film that absorbs impacts and prevents stone chips and scratches. Ceramic coating is a chemical layer that provides hydrophobic protection, UV resistance, and gloss enhancement — but it cannot absorb physical impacts. For maximum protection, Smart Auto UAE recommends PPF + ceramic coating combined. The PPF handles physical threats; the ceramic coating handles chemical and UV threats.',
  },
  {
    q: 'Can PPF be removed without damaging the paint?',
    a: "Yes. Professional-grade TPU PPF peels cleanly from the factory paint without any adhesive residue or damage. This is one of PPF's key advantages — it can be removed and replaced after the warranty period, or if you choose to sell the vehicle.",
  },
  {
    q: 'What is the starting price for PPF in Dubai?',
    a: 'Paint Protection Film at Smart Auto UAE starts from AED 2,500 for front-end coverage and from AED 4,999 for a standard protection package. Full-body PPF starts from AED 9,999. Exact pricing depends on the vehicle size, PPF brand, and coverage area — contact us for a personalised quote.',
  },
  {
    q: 'Does Smart Auto UAE install PPF on luxury and exotic cars?',
    a: "Yes. Smart Auto UAE regularly installs PPF on luxury and exotic vehicles including Range Rover, Mercedes, BMW, Porsche, Lamborghini, Ferrari, and Rolls-Royce. Our certified technicians are trained in the precise, panel-perfect installation required for high-value vehicles.",
  },
  {
    q: 'Is there a warranty on PPF installation?',
    a: 'Yes. All PPF installations at Smart Auto UAE carry a manufacturer-backed warranty ranging from 5 to 10 years depending on the film selected. The warranty covers delamination, yellowing, bubbling, and significant colour change.',
  },
]

const vehicleTypes = [
  'Toyota Land Cruiser', 'Range Rover', 'Mercedes-Benz GLE / GLS',
  'BMW X5 / X7', 'Porsche Cayenne / Macan', 'Lamborghini / Ferrari / McLaren',
  'Nissan Patrol', 'Tesla Model S / Model 3', 'Rolls-Royce / Bentley', 'All other vehicles',
]

const process = [
  { num: '01', title: 'Free Inspection', desc: 'We inspect your vehicle\'s paint condition and discuss the right coverage level and film for your needs and budget.' },
  { num: '02', title: 'Paint Prep & Decontamination', desc: 'Your vehicle is washed, clay barred, and fully decontaminated. Any existing paint defects are identified before film application.' },
  { num: '03', title: 'Precision Film Installation', desc: 'Our certified technicians apply PPF using computer-cut templates for a perfect panel fit — no edge lifting, no gaps, no visible seams.' },
  { num: '04', title: 'Quality Check & Handover', desc: 'Every panel is inspected under controlled lighting before handover. You receive your warranty documentation and aftercare guidance.' },
]

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function PPFPage() {
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
          style={{ background: 'radial-gradient(ellipse at 70% 50%,rgba(201,168,76,0.07) 0%,transparent 60%)' }}
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
              Totalgard · 3M · XPEL — UAE Authorised Distributor &amp; Applicator
            </p>

            <h1
              className="font-bold text-white leading-[1.05] mb-6"
              style={{
                fontFamily: 'var(--font-playfair),serif',
                fontSize: 'clamp(2.5rem,5vw,4.5rem)',
              }}
            >
              Paint Protection Film<br />
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

            <p className="text-[13px] tracking-[0.12em] uppercase mb-5" style={{ color: 'rgba(201,168,76,0.7)' }}>
              The Best Protection You Will Never See
            </p>

            <p className="text-white/50 text-base leading-[1.9] mb-8 max-w-xl">
              Smart Auto UAE is Dubai and Sharjah&apos;s trusted{' '}
              <strong className="text-white/70 font-medium">Paint Protection Film (PPF)</strong> installer. We use
              self-healing TPU films from Totalgard, 3M, and XPEL — the same films trusted by luxury and exotic car
              owners across the UAE. Virtually invisible, permanently protective, and backed by up to a 10-year warranty.
              Car Paint Protection Films starting from{' '}
              <strong className="text-white/70 font-medium">AED 4,999</strong>.
            </p>

            <div className="flex flex-col gap-2.5 mb-9">
              {[
                'UAE authorised distributor & applicator — Totalgard, 3M & XPEL',
                'Self-healing TPU film — minor scratches vanish with heat',
                'Optically clear — completely invisible on the paint',
                'Starting from AED 4,999 — transparent pricing',
                'Up to 10-year manufacturer warranty',
              ].map((p) => (
                <div key={p} className="flex items-center gap-3">
                  <CheckCircle size={15} style={{ color: GOLD, flexShrink: 0 }} aria-hidden="true" />
                  <span className="text-white/60 text-sm">{p}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-3 flex-wrap">
              <a
                href="https://wa.me/971567269666"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm text-black transition-all hover:opacity-90 active:scale-[0.98]"
                style={{ background: goldGrad }}
              >
                Get a Free Quote <ArrowRight size={15} />
              </a>
              <a
                href="tel:+971567269666"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm border transition-all"
                style={{ color: GOLD, borderColor: 'rgba(201,168,76,0.3)', background: 'rgba(201,168,76,0.05)' }}
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
              src="/images/services/PPF-1.webp"
              alt="Totalgard Paint Protection Film installation Dubai — best PPF installer UAE by Smart Auto"
              width={700}
              height={500}
              loading="eager"
              decoding="async"
              className="w-full object-cover"
              style={{ maxHeight: '520px' }}
            />
          </motion.div>
        </div>
      </section>

      {/* ── WHAT IS PPF ── */}
      <section className="py-24" style={{ backgroundColor: '#060606' }}>
        <div className="w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <p className="text-[11px] tracking-[0.3em] uppercase mb-4" style={{ color: GOLD }}>
              What Is Paint Protection Film
            </p>
            <h2
              className="font-bold text-white leading-[1.15] mb-6"
              style={{ fontFamily: 'var(--font-playfair),serif', fontSize: 'clamp(1.8rem,3vw,2.8rem)' }}
            >
              The Invisible Shield for{' '}
              <span
                style={{
                  background: goldGrad,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Your Car&apos;s Paint
              </span>
            </h2>
            <div className="flex flex-col gap-5 text-white/50 text-base leading-[1.85]">
              <p>
                Paint Protection Film (PPF), also known as clear bra or clear protection film, is a transparent,
                thermoplastic polyurethane (TPU) film applied directly to your vehicle&apos;s painted surfaces.
                It provides a durable, virtually invisible barrier that absorbs the impacts, scratches, and chemical
                damage that would otherwise degrade your paintwork.
              </p>
              <p>
                PPF is trusted by owners of{' '}
                <strong className="text-white/70 font-medium">luxury and exotic vehicles</strong> worldwide as the
                gold standard in paint preservation. At Smart Auto UAE, we use only manufacturer-certified PPF from
                Totalgard, 3M Scotchgard, and XPEL — the three most trusted brands in the UAE market.
              </p>
              <p>
                The film protects vulnerable areas including front bumpers, bonnets, side mirrors, door handle
                cavities, door edges, rocker panels, headlights, and rear fender panels — preserving the showroom-quality
                finish of your vehicle and enhancing its resale value for the future.
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            custom={1}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-3"
          >
            {[
              { label: 'Starting Price', value: 'AED 4,999' },
              { label: 'Warranty', value: 'Up to 10 Years' },
              { label: 'Film Brands', value: 'Totalgard · 3M · XPEL' },
              { label: 'Branches', value: '4 Across UAE' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl p-7"
                style={{
                  background: 'rgba(17,17,17,0.85)',
                  border: '1px solid rgba(201,168,76,0.12)',
                }}
              >
                <p className="text-[10px] tracking-[0.18em] uppercase text-white/30 mb-2">{stat.label}</p>
                <p
                  className="font-bold leading-none"
                  style={{
                    fontFamily: 'var(--font-playfair),serif',
                    fontSize: 'clamp(1.2rem,2vw,1.6rem)',
                    background: goldGrad,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {stat.value}
                </p>
              </div>
            ))}

            <div
              className="col-span-2 rounded-2xl p-7"
              style={{ background: 'rgba(17,17,17,0.85)', border: '1px solid rgba(201,168,76,0.12)' }}
            >
              <p className="text-[10px] tracking-[0.18em] uppercase text-white/30 mb-3">Covered Areas</p>
              <div className="flex flex-wrap gap-2">
                {['Front Bumper', 'Full Bonnet', 'Side Mirrors', 'Headlights', 'Door Edges', 'Door Cups', 'Rocker Panels', 'Rear Fenders', 'A-Pillars', 'Full Body'].map((area) => (
                  <span
                    key={area}
                    className="text-[11px] px-3 py-1 rounded-full"
                    style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.18)', color: 'rgba(201,168,76,0.8)' }}
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── PACKAGES ── */}
      <section className="py-24" style={{ background: 'linear-gradient(180deg,#080808 0%,#0A0A0A 100%)' }}>
        <div className="w-full max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[11px] tracking-[0.3em] uppercase mb-3" style={{ color: GOLD }}>
              PPF Packages Dubai
            </p>
            <h2
              className="font-bold text-white"
              style={{ fontFamily: 'var(--font-playfair),serif', fontSize: 'clamp(1.8rem,3vw,2.8rem)' }}
            >
              Car Paint Protection Film{' '}
              <span
                style={{
                  background: goldGrad,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Pricing in UAE
              </span>
            </h2>
            <p className="text-white/35 text-sm mt-4 max-w-xl mx-auto">
              All packages include free vehicle inspection, paint decontamination prep, and warranty documentation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {packages.map((pkg, i) => (
              <motion.div
                key={pkg.name}
                variants={fadeUp}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                <div
                  className="rounded-2xl p-8 h-full flex flex-col relative"
                  style={{
                    background: pkg.popular ? 'rgba(201,168,76,0.07)' : 'rgba(17,17,17,0.85)',
                    border: `1px solid ${pkg.popular ? 'rgba(201,168,76,0.35)' : 'rgba(201,168,76,0.12)'}`,
                  }}
                >
                  {pkg.popular && (
                    <span
                      className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.15em] uppercase px-4 py-1 rounded-full text-black font-semibold"
                      style={{ background: goldGrad }}
                    >
                      Most Popular
                    </span>
                  )}
                  <h3
                    className="text-white font-bold text-xl mb-2"
                    style={{ fontFamily: 'var(--font-playfair),serif' }}
                  >
                    {pkg.name}
                  </h3>
                  <p className="text-white/40 text-sm leading-relaxed mb-5 flex-1">{pkg.coverage}</p>
                  <div
                    className="flex flex-col gap-1.5 pt-4"
                    style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
                  >
                    <span
                      className="font-bold text-xl"
                      style={{
                        background: goldGrad,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        fontFamily: 'var(--font-playfair),serif',
                      }}
                    >
                      {pkg.price}
                    </span>
                    <span className="text-white/30 text-[11px]">Duration: {pkg.duration}</span>
                    <span className="text-[11px] tracking-wide" style={{ color: 'rgba(201,168,76,0.6)' }}>
                      {pkg.warranty}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p
            className="text-center text-white/30 text-sm mt-8"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            Prices vary by vehicle size. Contact us for an exact quote for your specific vehicle.
          </motion.p>
        </div>
      </section>

      {/* ── BRANDS ── */}
      <section className="py-16" style={{ backgroundColor: '#060606' }}>
        <div className="w-full max-w-7xl mx-auto px-6">
          <p className="text-center text-[11px] tracking-[0.3em] uppercase mb-10" style={{ color: GOLD }}>
            UAE Authorised Distributor &amp; Applicator
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {brands.map((brand, i) => (
              <motion.div
                key={brand.name}
                variants={fadeUp}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                <div
                  className="rounded-2xl p-6 text-center"
                  style={{ background: 'rgba(17,17,17,0.85)', border: '1px solid rgba(201,168,76,0.12)' }}
                >
                  <p
                    className="font-bold text-white text-lg mb-1"
                    style={{ fontFamily: 'var(--font-playfair),serif' }}
                  >
                    {brand.name}
                  </p>
                  <p className="text-[11px] tracking-wide" style={{ color: 'rgba(201,168,76,0.6)' }}>
                    {brand.note}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROTECTS FROM ── */}
      <section className="py-24" style={{ backgroundColor: '#080808' }}>
        <div className="w-full max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[11px] tracking-[0.3em] uppercase mb-3" style={{ color: GOLD }}>
              Full Coverage Protection
            </p>
            <h2
              className="font-bold text-white"
              style={{ fontFamily: 'var(--font-playfair),serif', fontSize: 'clamp(1.8rem,3vw,2.8rem)' }}
            >
              What PPF Protects{' '}
              <span
                style={{
                  background: goldGrad,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Your Car From
              </span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {protectsFrom.map((item, i) => (
              <motion.div
                key={item.threat}
                variants={fadeUp}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                <div
                  className="rounded-2xl p-7 h-full"
                  style={{ background: 'rgba(17,17,17,0.85)', border: '1px solid rgba(201,168,76,0.1)' }}
                >
                  <div
                    className="w-1 h-8 rounded-full mb-5"
                    style={{ background: goldGrad }}
                    aria-hidden="true"
                  />
                  <h3 className="text-white font-semibold text-base mb-3">{item.threat}</h3>
                  <p className="text-white/40 text-[13px] leading-[1.75]">{item.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section className="py-24" style={{ background: 'linear-gradient(180deg,#060606 0%,#080808 100%)' }}>
        <div className="w-full max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[11px] tracking-[0.3em] uppercase mb-3" style={{ color: GOLD }}>
              Why Choose PPF
            </p>
            <h2
              className="font-bold text-white"
              style={{ fontFamily: 'var(--font-playfair),serif', fontSize: 'clamp(1.8rem,3vw,2.8rem)' }}
            >
              Benefits of Car Paint{' '}
              <span
                style={{
                  background: goldGrad,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Protection Film
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit, i) => (
              <motion.div
                key={benefit.title}
                variants={fadeUp}
                custom={i % 4}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                <div
                  className="rounded-2xl p-7 flex gap-5 h-full"
                  style={{ background: 'rgba(17,17,17,0.85)', border: '1px solid rgba(201,168,76,0.1)' }}
                >
                  <div className="flex-shrink-0">
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center"
                      style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)' }}
                    >
                      <Shield size={16} style={{ color: GOLD }} aria-hidden="true" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-[15px] mb-2">{benefit.title}</h3>
                    <p className="text-white/40 text-[13px] leading-[1.75]">{benefit.body}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INSTALLATION PROCESS ── */}
      <section className="py-24" style={{ backgroundColor: '#0A0A0A' }}>
        <div className="w-full max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[11px] tracking-[0.3em] uppercase mb-3" style={{ color: GOLD }}>
              Our Installation Process
            </p>
            <h2
              className="font-bold text-white"
              style={{ fontFamily: 'var(--font-playfair),serif', fontSize: 'clamp(1.8rem,3vw,2.8rem)' }}
            >
              How We Install PPF{' '}
              <span
                style={{
                  background: goldGrad,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                in Dubai
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            <div
              className="absolute top-9 left-[12%] w-[76%] h-px pointer-events-none hidden lg:block"
              style={{ background: 'linear-gradient(to right,transparent,rgba(201,168,76,0.25),transparent)' }}
              aria-hidden="true"
            />
            {process.map((step, i) => (
              <motion.div
                key={step.num}
                variants={fadeUp}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                <div
                  className="rounded-2xl p-8 text-center"
                  style={{ background: 'rgba(17,17,17,0.85)', border: '1px solid rgba(201,168,76,0.12)' }}
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
                  <p className="text-white/40 text-[13px] leading-[1.6]">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VEHICLE TYPES ── */}
      <section className="py-20" style={{ backgroundColor: '#060606' }}>
        <div className="w-full max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-[11px] tracking-[0.3em] uppercase mb-3" style={{ color: GOLD }}>
              We Work On All Vehicles
            </p>
            <h2
              className="font-bold text-white"
              style={{ fontFamily: 'var(--font-playfair),serif', fontSize: 'clamp(1.6rem,2.5vw,2.4rem)' }}
            >
              PPF for Every Vehicle in{' '}
              <span
                style={{
                  background: goldGrad,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                the UAE
              </span>
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {vehicleTypes.map((v, i) => (
              <motion.span
                key={v}
                className="px-5 py-2.5 rounded-full text-[13px] font-medium"
                style={{
                  border: '1px solid rgba(201,168,76,0.15)',
                  background: 'rgba(201,168,76,0.04)',
                  color: 'rgba(255,255,255,0.5)',
                }}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                {v}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24" style={{ backgroundColor: '#080808' }}>
        <div className="w-full max-w-4xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-[11px] tracking-[0.3em] uppercase mb-3" style={{ color: GOLD }}>
              Common Questions
            </p>
            <h2
              className="font-bold text-white"
              style={{ fontFamily: 'var(--font-playfair),serif', fontSize: 'clamp(1.8rem,3vw,2.6rem)' }}
            >
              Paint Protection Film{' '}
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
            <p className="text-white/35 text-sm mt-4 max-w-xl mx-auto">
              Everything you need to know about PPF pricing, installation, and protection in Dubai and Sharjah.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="rounded-2xl overflow-hidden"
                style={{ border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}
              >
                <summary
                  className="px-7 py-5 cursor-pointer text-white font-medium text-[15px] leading-snug"
                  style={{ listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}
                >
                  <span>{faq.q}</span>
                  <span style={{ color: GOLD, flexShrink: 0, fontSize: '1.25rem', lineHeight: 1 }}>+</span>
                </summary>
                <p className="px-7 pb-6 text-white/50 text-sm leading-[1.85]">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24" style={{ backgroundColor: '#060606' }}>
        <div
          className="w-full max-w-5xl mx-auto px-6 rounded-3xl p-16 text-center relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg,rgba(201,168,76,0.1) 0%,rgba(201,168,76,0.04) 50%,rgba(201,168,76,0.08) 100%)',
            border: '1px solid rgba(201,168,76,0.2)',
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at center,rgba(201,168,76,0.06) 0%,transparent 60%)' }}
            aria-hidden="true"
          />
          <p
            className="text-[11px] tracking-[0.3em] uppercase mb-4 relative z-10"
            style={{ color: GOLD }}
          >
            UAE Authorised Distributor &amp; Applicator — Totalgard · 3M · XPEL
          </p>
          <h2
            className="font-bold text-white mb-4 relative z-10"
            style={{ fontFamily: 'var(--font-playfair),serif', fontSize: 'clamp(1.8rem,3.5vw,3rem)' }}
          >
            Protect Your Car&apos;s Paint.<br />
            <span
              style={{
                background: goldGrad,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Starting from AED 4,999.
            </span>
          </h2>
          <p className="text-white/45 text-base mb-8 max-w-lg mx-auto relative z-10">
            Free inspection · Transparent pricing · Up to 10-year warranty · 4 branches across Dubai &amp; Sharjah · Open every day
          </p>

          <div className="flex items-center justify-center gap-3 mb-8 flex-wrap relative z-10">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={18} fill={GOLD} style={{ color: GOLD }} aria-hidden="true" />
            ))}
            <span className="text-white/40 text-sm ml-1">4.9 · 600+ Google Reviews</span>
          </div>

          <div className="flex gap-4 justify-center flex-wrap relative z-10">
            <a
              href="https://wa.me/971567269666"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-sm text-black transition-all hover:opacity-90 active:scale-[0.98]"
              style={{ background: goldGrad }}
            >
              Book on WhatsApp <ArrowRight size={16} />
            </a>
            <a
              href="tel:+971567269666"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-sm border transition-all"
              style={{ color: GOLD, borderColor: 'rgba(201,168,76,0.3)', background: 'rgba(201,168,76,0.05)' }}
            >
              <Phone size={15} /> +971 56 726 9666
            </a>
          </div>
        </div>
      </section>
<Footer/>
    </main>
  )
}