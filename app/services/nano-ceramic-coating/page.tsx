'use client'

import { motion } from 'framer-motion'
import { CheckCircle, ArrowRight, Phone, Shield, Droplets, Thermometer, Zap, Sun, Sparkles } from 'lucide-react'

const GOLD  = '#C9A84C'
const GOLD2 = '#E8C96A'
const GOLD3 = '#A07830'
const goldGrad = `linear-gradient(135deg,${GOLD},${GOLD2},${GOLD3})`

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
}

// ─── DATA ────────────────────────────────────────────────────────────────────

const benefits = [
  {
    icon: Droplets,
    title: 'Super Hydrophobic Effect',
    desc: 'Water beads up instantly and rolls off the surface, carrying dirt and grime with it. Your car stays cleaner for longer between washes.',
  },
  {
    icon: Shield,
    title: 'Scratch & Swirl Resistance',
    desc: 'The 9H hardness rating — harder than your factory clear coat — significantly reduces light scratches, swirl marks, and wash-induced marring.',
  },
  {
    icon: Sun,
    title: 'UV & Oxidation Protection',
    desc: 'Prevents the sun\'s UV rays from oxidising and fading your paintwork. Essential protection for vehicles exposed to UAE\'s intense solar radiation year-round.',
  },
  {
    icon: Zap,
    title: 'Chemical Resistance',
    desc: 'Bird droppings, insect residue, acidic rain, and road salt can etch unprotected paint within hours. Nano ceramic coating creates a chemically resistant barrier.',
  },
  {
    icon: Thermometer,
    title: 'Thermal Resistance up to 608°C',
    desc: 'Our nano ceramic coatings are thermally stable up to 608°C — far beyond any heat your vehicle\'s paintwork will encounter in UAE conditions.',
  },
  {
    icon: Sparkles,
    title: 'Permanent Showroom Gloss',
    desc: 'Unlike wax that dulls after weeks, a properly applied ceramic coating locks in a deep, self-cleaning gloss that preserves your car\'s showroom appearance for years.',
  },
]

const comparison = [
  { feature: 'Protection duration',   wax: '4–8 weeks',      sealant: '4–6 months',    ceramic: '2–9+ years' },
  { feature: 'UV protection',         wax: 'Basic',          sealant: 'Moderate',      ceramic: 'Superior' },
  { feature: 'Hydrophobic effect',    wax: 'Low',            sealant: 'Moderate',      ceramic: 'Extreme' },
  { feature: 'Chemical resistance',   wax: 'None',           sealant: 'Basic',         ceramic: 'High' },
  { feature: 'Scratch resistance',    wax: 'None',           sealant: 'None',          ceramic: '9H hardness' },
  { feature: 'Thermal resistance',    wax: 'None',           sealant: 'None',          ceramic: 'Up to 608°C' },
  { feature: 'Gloss enhancement',     wax: 'Temporary',      sealant: 'Moderate',      ceramic: 'Permanent' },
  { feature: 'Reapplication needed',  wax: 'Every 4–8 wks',  sealant: 'Every 6 months',ceramic: 'Every 2–9 years' },
]

const tiers = [
  {
    name: 'Entry Nano Ceramic',
    brand: 'IGL Coatings Kenzo',
    duration: '1–2 Years',
    hardness: '9H',
    features: [
      '9H hardness ceramic layer',
      'Hydrophobic surface coating',
      'UV and oxidation protection',
      'Chemical resistance',
      'Deep gloss enhancement',
    ],
    best: 'Daily drivers & budget-conscious owners',
    price: 'From AED 1,200',
  },
  {
    name: 'Professional Ceramic',
    brand: 'Gyeon Q² Mohs+',
    duration: '3–4 Years',
    hardness: '9H+',
    features: [
      'Paint decontamination & clay bar',
      'Single-stage paint correction',
      'Multi-layer 9H+ ceramic system',
      'Advanced self-cleaning surface',
      'Annual ceramic maintenance boost',
      'Deep mirror gloss finish',
    ],
    best: 'New vehicles & enthusiast owners',
    price: 'From AED 2,500',
    highlight: true,
  },
  {
    name: 'Elite Ceramic Ultra',
    brand: 'Gtechniq Crystal Serum Ultra',
    duration: '5–9 Years',
    hardness: '10H',
    features: [
      'Full multi-stage paint correction',
      'Gtechniq Crystal Serum Ultra',
      'EXO v5 ultra-hydrophobic top coat',
      'Anti-graffiti & chemical resistance',
      'Maximum scratch resistance system',
      'Accredited installer guarantee',
      '9-year manufacturer warranty',
    ],
    best: 'Luxury, supercar & investment vehicles',
    price: 'From AED 4,500',
  },
]

const process = [
  { num: '01', title: 'Vehicle Assessment', desc: 'We inspect your paintwork under specialised lighting to identify swirl marks, scratches, water spots, and oxidation that need correction before coating.' },
  { num: '02', title: 'Paint Decontamination', desc: 'Chemical decontamination and clay bar treatment removes bonded iron particles, tar, and road fallout that washing alone cannot remove.' },
  { num: '03', title: 'Paint Correction', desc: 'Machine polishing removes swirl marks and scratches — because any defect present before coating gets permanently sealed in. We do not skip this step.' },
  { num: '04', title: 'Ceramic Application', desc: 'The coating is applied panel by panel in a climate-controlled environment, levelled, and cured. Multiple layers are applied where required.' },
  { num: '05', title: 'Curing & Inspection', desc: 'A full inspection under specialised lighting confirms even coverage and perfect levelling. The vehicle is delivered with warranty documentation.' },
]

const faqs = [
  {
    q: 'What is nano ceramic coating?',
    a: 'Nano ceramic coating (also called glass coating, liquid glass, or ceramic paint protection) is a liquid polymer based on silicon dioxide (SiO2) that chemically bonds to your vehicle\'s paintwork at a molecular level. It forms a permanent hard layer that is hydrophobic, UV-resistant, chemically resistant, and significantly harder than the factory clear coat.',
  },
  {
    q: 'How long does nano ceramic coating last in Dubai?',
    a: 'A professional nano ceramic coating in Dubai lasts between 2 and 9+ years depending on the product tier, the number of layers applied, and your maintenance routine. Smart Auto UAE uses Gyeon, Gtechniq, and IGL Coatings — all formulated specifically for high UV and heat environments like the UAE.',
  },
  {
    q: 'Is nano ceramic coating better than car wax?',
    a: 'Yes — significantly. Car wax lasts 4–8 weeks and provides no meaningful scratch or chemical resistance. Nano ceramic coating lasts years, provides 9H scratch hardness, extreme hydrophobic performance, UV protection, and chemical resistance. It is a permanent protective layer, not a temporary shine product.',
  },
  {
    q: 'Does ceramic coating replace paint protection film (PPF)?',
    a: 'No. Ceramic coating adds a chemical hard layer but does not absorb physical impacts — stone chips and deep scratches will still reach the paint. PPF is a physical film that absorbs those impacts. For maximum protection, we recommend applying PPF first, then a ceramic coating on top.',
  },
  {
    q: 'How do I maintain a ceramic-coated car?',
    a: 'Avoid car washes for 7 days after application. Thereafter, only hand wash or touchless wash. Avoid automatic brush car washes — the brushes induce swirl marks. Use a pH-neutral shampoo. An annual ceramic maintenance spray significantly extends the coating\'s life.',
  },
  {
    q: 'Can ceramic coating be applied to a new car?',
    a: 'Yes — and we strongly recommend it. New cars from the showroom still have minor swirl marks from transport and dealer preparation. We perform a light paint correction before coating to ensure the paint is perfect before it is sealed permanently.',
  },
  {
    q: 'Is ceramic coating available for glass, wheels, and plastic trims?',
    a: 'Yes. In addition to paintwork, Smart Auto UAE applies specific nano ceramic formulations for glass surfaces (dramatically improves visibility in rain), alloy wheels (prevents brake dust bonding), and exterior plastic trims (prevents fading and discolouration).',
  },
  {
    q: 'Does nano ceramic coating work on matte paint?',
    a: 'Yes. We use matte-specific ceramic coatings that preserve the flat finish without adding gloss. These coatings provide full protection — hydrophobic, UV, and chemical resistance — without altering the matte appearance.',
  },
]

const relatedServices = [
  { name: 'Car Window Tinting', href: '/services/window-tinting', desc: 'Block UV and heat entering through the glass' },
  { name: 'Paint Protection Film', href: '/services/ppf', desc: 'Physical protection from stone chips and scratches' },
  { name: 'Car Detailing', href: '/services/car-detailing', desc: 'Full paint correction before ceramic application' },
  { name: 'Car Polishing', href: '/services/car-polishing', desc: 'Swirl and scratch removal to prepare paintwork' },
]

// ─── PAGE ────────────────────────────────────────────────────────────────────

export default function NanoCeramicCoatingPage() {
  return (
    <main style={{ background: '#0A0A0A', paddingTop: '80px' }}>

      {/* ── HERO ── */}
      <section
        className="relative py-28 overflow-hidden"
        style={{ background: 'linear-gradient(180deg,#050505 0%,#080808 100%)' }}
        aria-labelledby="hero-heading"
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
              Gyeon · Gtechniq · IGL Coatings — Certified Installer UAE
            </p>

            <h1
              id="hero-heading"
              className="font-bold text-white leading-[1.05] mb-5"
              style={{
                fontFamily: 'var(--font-playfair),serif',
                fontSize: 'clamp(2.5rem,5vw,4.2rem)',
              }}
            >
              Nano Ceramic Coating
              <br />
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
            </h1>

            <p className="text-white/50 text-base leading-[1.9] mb-6 max-w-xl">
              Smart Auto UAE applies professional-grade{' '}
              <strong className="text-white/70 font-medium">
                9H nano ceramic coatings
              </strong>{' '}
              from Gyeon, Gtechniq, and IGL Coatings across Dubai and Sharjah. Our
              ceramic coatings bond permanently to your paintwork at a molecular
              level — delivering a{' '}
              <strong className="text-white/70 font-medium">
                super hydrophobic, self-cleaning surface
              </strong>{' '}
              with UV protection, 9H scratch hardness, thermal resistance up to 608°C,
              and deep permanent gloss that lasts years, not weeks.
            </p>

            <p className="text-white/40 text-sm leading-[1.8] mb-8 max-w-xl">
              Unlike car wax or paint sealants that require reapplication every few
              months, a properly applied nano ceramic coating provides long-term beauty,
              protection, and ease of maintenance — preserving your car&apos;s showroom
              appearance and protecting its value for the long term.
            </p>

            <div className="flex flex-col gap-2.5 mb-8">
              {[
                'Permanent 9H hardness — harder than factory clear coat',
                'Extreme hydrophobic — water, dirt and grime bead off instantly',
                'UV, chemical and thermal resistance up to 608°C',
                'Anti-graffiti surface — contaminants cannot bond',
                'Gyeon, Gtechniq & IGL certified installer — Dubai & Sharjah',
                'Paint correction performed on every car before coating',
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
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-black transition-all hover:opacity-90"
                style={{ background: goldGrad }}
              >
                Book Now <ArrowRight size={15} />
              </a>
              <a
                href="tel:+971524403677"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm border transition-all"
                style={{
                  color: GOLD,
                  borderColor: 'rgba(201,168,76,0.3)',
                  background: 'rgba(201,168,76,0.05)',
                }}
              >
                <Phone size={14} /> +971 52 440 3677
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
              src="/images/services/ceramic-coating-1.webp"
              alt="Professional nano ceramic coating Dubai — 9H Gyeon and Gtechniq certified installer Smart Auto UAE"
              width={700}
              height={500}
              loading="eager"
              decoding="async"
              className="w-full object-cover"
              style={{ maxHeight: '500px' }}
            />
          </motion.div>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section
        className="py-24"
        style={{ backgroundColor: '#060606' }}
        aria-labelledby="benefits-heading"
      >
        <div className="w-full max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[11px] tracking-[0.3em] uppercase mb-3" style={{ color: GOLD }}>
              Why Nano Ceramic Coating
            </p>
            <h2
              id="benefits-heading"
              className="font-bold text-white"
              style={{
                fontFamily: 'var(--font-playfair),serif',
                fontSize: 'clamp(1.8rem,3vw,2.6rem)',
              }}
            >
              The Advantages of{' '}
              <span
                style={{
                  background: goldGrad,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Nano Ceramic Coating
              </span>
            </h2>
            <p className="text-white/40 text-sm mt-4 max-w-2xl mx-auto leading-relaxed">
              No other coating technology — not wax, not sealant, not traditional clear film — offers
              the combination of permanent hardness, hydrophobics, and UV resistance that a
              professional nano ceramic coating delivers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                variants={fadeUp}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                <div
                  className="rounded-2xl p-8 h-full"
                  style={{
                    background: 'rgba(17,17,17,0.85)',
                    border: '1px solid rgba(201,168,76,0.1)',
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                    style={{
                      background: 'rgba(201,168,76,0.08)',
                      border: '1px solid rgba(201,168,76,0.18)',
                      color: GOLD,
                    }}
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

      {/* ── COMPARISON TABLE ── */}
      <section
        className="py-24"
        style={{ background: 'linear-gradient(180deg,#080808 0%,#0A0A0A 100%)' }}
        aria-labelledby="comparison-heading"
      >
        <div className="w-full max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-[11px] tracking-[0.3em] uppercase mb-3" style={{ color: GOLD }}>
              Ceramic vs Wax vs Sealant
            </p>
            <h2
              id="comparison-heading"
              className="font-bold text-white"
              style={{
                fontFamily: 'var(--font-playfair),serif',
                fontSize: 'clamp(1.8rem,3vw,2.6rem)',
              }}
            >
              Why Ceramic Coating{' '}
              <span
                style={{
                  background: goldGrad,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Outperforms Everything
              </span>
            </h2>
          </div>

          <div
            className="rounded-2xl overflow-hidden"
            style={{ border: '1px solid rgba(201,168,76,0.12)' }}
          >
            {/* Header */}
            <div
              className="grid grid-cols-4 text-[11px] tracking-[0.15em] uppercase font-semibold"
              style={{ background: 'rgba(201,168,76,0.08)', borderBottom: '1px solid rgba(201,168,76,0.12)' }}
            >
              <div className="px-5 py-4 text-white/40">Feature</div>
              <div className="px-5 py-4 text-center text-white/40">Car Wax</div>
              <div className="px-5 py-4 text-center text-white/40">Paint Sealant</div>
              <div className="px-5 py-4 text-center" style={{ color: GOLD }}>Nano Ceramic</div>
            </div>

            {comparison.map((row, i) => (
              <div
                key={row.feature}
                className="grid grid-cols-4 text-sm"
                style={{
                  borderBottom: i < comparison.length - 1 ? '1px solid rgba(255,255,255,0.04)' : undefined,
                  background: i % 2 === 0 ? 'rgba(17,17,17,0.6)' : 'transparent',
                }}
              >
                <div className="px-5 py-4 text-white/50 text-[13px]">{row.feature}</div>
                <div className="px-5 py-4 text-center text-white/30 text-[13px]">{row.wax}</div>
                <div className="px-5 py-4 text-center text-white/30 text-[13px]">{row.sealant}</div>
                <div
                  className="px-5 py-4 text-center text-[13px] font-semibold"
                  style={{ color: GOLD2 }}
                >
                  {row.ceramic}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COATING TIERS ── */}
      <section
        className="py-24"
        style={{ backgroundColor: '#060606' }}
        aria-labelledby="tiers-heading"
      >
        <div className="w-full max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-[11px] tracking-[0.3em] uppercase mb-3" style={{ color: GOLD }}>
              Ceramic Coating Packages — Dubai &amp; Sharjah
            </p>
            <h2
              id="tiers-heading"
              className="font-bold text-white"
              style={{
                fontFamily: 'var(--font-playfair),serif',
                fontSize: 'clamp(1.8rem,3vw,2.6rem)',
              }}
            >
              Choose Your{' '}
              <span
                style={{
                  background: goldGrad,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Ceramic Coating Tier
              </span>
            </h2>
            <p className="text-white/40 text-sm mt-4 max-w-xl mx-auto">
              All tiers include a free vehicle inspection and paint decontamination. Contact us for a
              precise quote based on your vehicle&apos;s condition and size.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tiers.map((tier, i) => (
              <motion.div
                key={tier.name}
                variants={fadeUp}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                <div
                  className="rounded-2xl p-8 h-full flex flex-col relative overflow-hidden"
                  style={{
                    background: tier.highlight
                      ? 'rgba(201,168,76,0.06)'
                      : 'rgba(17,17,17,0.85)',
                    border: tier.highlight
                      ? '1px solid rgba(201,168,76,0.35)'
                      : '1px solid rgba(201,168,76,0.12)',
                  }}
                >
                  {tier.highlight && (
                    <div
                      className="absolute top-0 left-0 right-0 h-0.5"
                      style={{ background: goldGrad }}
                      aria-hidden="true"
                    />
                  )}
                  {tier.highlight && (
                    <div
                      className="inline-block text-[9px] tracking-[0.2em] uppercase font-bold px-3 py-1 rounded-full mb-4 self-start"
                      style={{ background: goldGrad, color: '#0A0A0A' }}
                    >
                      Most Popular
                    </div>
                  )}

                  <p
                    className="text-[10px] tracking-[0.2em] uppercase mb-1.5"
                    style={{ color: GOLD }}
                  >
                    {tier.brand}
                  </p>
                  <h3
                    className="text-white font-bold text-xl mb-1"
                    style={{ fontFamily: 'var(--font-playfair),serif' }}
                  >
                    {tier.name}
                  </h3>

                  <div className="flex gap-3 mb-5 mt-1">
                    <span
                      className="text-[11px] px-2.5 py-1 rounded-full"
                      style={{
                        background: 'rgba(201,168,76,0.1)',
                        border: '1px solid rgba(201,168,76,0.2)',
                        color: GOLD,
                      }}
                    >
                      {tier.hardness} Hardness
                    </span>
                    <span
                      className="text-[11px] px-2.5 py-1 rounded-full text-white/40"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                    >
                      {tier.duration}
                    </span>
                  </div>

                  <ul className="flex flex-col gap-2.5 mb-6 flex-1">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-[13px] text-white/55">
                        <div
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5"
                          style={{ background: GOLD }}
                          aria-hidden="true"
                        />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div
                    className="pt-4 mt-auto"
                    style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
                  >
                    <div
                      className="font-bold text-xl mb-1"
                      style={{
                        background: goldGrad,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      {tier.price}
                    </div>
                    <p className="text-[11px] text-white/30">Best for: {tier.best}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <p className="text-center text-white/30 text-[12px] mt-6">
            Prices vary by vehicle size, paint condition, and number of coating layers. Contact us for an exact quote.
          </p>
        </div>
      </section>

      {/* ── OUR PROCESS ── */}
      <section
        className="py-24"
        style={{ background: 'linear-gradient(180deg,#080808 0%,#0A0A0A 100%)' }}
        aria-labelledby="process-heading"
      >
        <div className="w-full max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-[11px] tracking-[0.3em] uppercase mb-3" style={{ color: GOLD }}>
              How We Apply It
            </p>
            <h2
              id="process-heading"
              className="font-bold text-white"
              style={{
                fontFamily: 'var(--font-playfair),serif',
                fontSize: 'clamp(1.8rem,3vw,2.6rem)',
              }}
            >
              Our Ceramic Coating{' '}
              <span
                style={{
                  background: goldGrad,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Process in Dubai
              </span>
            </h2>
            <p className="text-white/40 text-sm mt-4 max-w-xl mx-auto">
              A ceramic coating is only as good as the preparation underneath it. Our 5-step process ensures
              your paint is in perfect condition before any coating is applied.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 relative">
            <div
              className="absolute top-9 left-[8%] w-[84%] h-px pointer-events-none hidden lg:block"
              style={{ background: 'linear-gradient(to right,transparent,rgba(201,168,76,0.2),transparent)' }}
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
                  className="rounded-2xl p-7 text-center h-full"
                  style={{
                    background: 'rgba(17,17,17,0.85)',
                    border: '1px solid rgba(201,168,76,0.1)',
                  }}
                >
                  <div
                    className="rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{
                      width: 56,
                      height: 56,
                      background: 'rgba(201,168,76,0.06)',
                      border: '1px solid rgba(201,168,76,0.25)',
                      color: GOLD,
                      fontFamily: 'var(--font-playfair),serif',
                      fontSize: 18,
                      fontWeight: 700,
                    }}
                    aria-hidden="true"
                  >
                    {step.num}
                  </div>
                  <h3 className="text-white font-semibold text-[14px] mb-2">{step.title}</h3>
                  <p className="text-white/40 text-[12px] leading-[1.7]">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── APPLICATIONS ── */}
      <section className="py-20" style={{ backgroundColor: '#060606' }}>
        <div className="w-full max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2
              className="font-bold text-white"
              style={{
                fontFamily: 'var(--font-playfair),serif',
                fontSize: 'clamp(1.8rem,3vw,2.6rem)',
              }}
            >
              Ceramic Coating for{' '}
              <span
                style={{
                  background: goldGrad,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                All Surfaces
              </span>
            </h2>
            <p className="text-white/40 text-sm mt-4 max-w-xl mx-auto">
              Our nano coatings are formulated for automotive, marine, aviation, and industrial applications —
              molecularly designed for paint, vinyl, polymers, glass, wheels, and trim.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { label: 'Car Paint', sub: 'All panel types' },
              { label: 'Windscreen & Glass', sub: 'Rain-repelling coat' },
              { label: 'Alloy Wheels', sub: 'Brake dust resistance' },
              { label: 'Plastic Trims', sub: 'Anti-fade protection' },
              { label: 'Vinyl Wraps', sub: 'PPF surface coating' },
              { label: 'Marine / Boats', sub: 'Hull & cabin glass' },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl p-5 text-center"
                style={{
                  background: 'rgba(17,17,17,0.85)',
                  border: '1px solid rgba(201,168,76,0.1)',
                }}
              >
                <div
                  className="w-2 h-2 rounded-full mx-auto mb-3"
                  style={{ background: GOLD }}
                  aria-hidden="true"
                />
                <p className="text-white text-[13px] font-semibold mb-1">{item.label}</p>
                <p className="text-white/35 text-[11px]">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section
        className="py-24"
        style={{ backgroundColor: '#080808' }}
        aria-labelledby="faq-heading"
      >
        <div className="w-full max-w-4xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-[11px] tracking-[0.3em] uppercase mb-3" style={{ color: GOLD }}>
              Common Questions
            </p>
            <h2
              id="faq-heading"
              className="font-bold text-white"
              style={{
                fontFamily: 'var(--font-playfair),serif',
                fontSize: 'clamp(1.8rem,3vw,2.6rem)',
              }}
            >
              Nano Ceramic Coating{' '}
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
            <p className="text-white/40 text-sm mt-4 max-w-xl mx-auto">
              Everything you need to know about ceramic coating for cars in Dubai and Sharjah.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="rounded-2xl overflow-hidden transition-all duration-200"
                style={{
                  border: '1px solid rgba(255,255,255,0.06)',
                  background: 'rgba(255,255,255,0.02)',
                }}
              >
                <summary
                  className="px-7 py-5 cursor-pointer text-white font-medium text-[15px] list-none flex justify-between items-center gap-4"
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

      {/* ── RELATED SERVICES ── */}
      <section className="py-20" style={{ backgroundColor: '#060606' }}>
        <div className="w-full max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2
              className="font-bold text-white"
              style={{
                fontFamily: 'var(--font-playfair),serif',
                fontSize: 'clamp(1.6rem,2.5vw,2.2rem)',
              }}
            >
              Complete Your Car&apos;s{' '}
              <span
                style={{
                  background: goldGrad,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Protection Package
              </span>
            </h2>
            <p className="text-white/40 text-sm mt-3 max-w-lg mx-auto">
              For maximum protection, combine nano ceramic coating with PPF and window tinting.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {relatedServices.map((s, i) => (
              <motion.a
                key={s.name}
                href={s.href}
                variants={fadeUp}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="rounded-2xl p-6 no-underline transition-all duration-300 group"
                style={{
                  background: 'rgba(17,17,17,0.85)',
                  border: '1px solid rgba(201,168,76,0.1)',
                }}
              >
                <h3 className="text-white font-semibold text-[15px] mb-2 group-hover:text-gold transition-colors">
                  {s.name}
                </h3>
                <p className="text-white/40 text-[13px] leading-relaxed mb-4">{s.desc}</p>
                <span
                  className="inline-flex items-center gap-1.5 text-[12px] font-semibold"
                  style={{ color: GOLD }}
                >
                  Learn More <ArrowRight size={12} />
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24" style={{ backgroundColor: '#0A0A0A' }}>
        <div className="w-full max-w-3xl mx-auto px-6 text-center">
          <p className="text-[11px] tracking-[0.3em] uppercase mb-4" style={{ color: GOLD }}>
            Professional Nano Ceramic Coating — Dubai &amp; Sharjah
          </p>
          <h2
            className="font-bold text-white mb-4"
            style={{
              fontFamily: 'var(--font-playfair),serif',
              fontSize: 'clamp(1.8rem,3.5vw,2.8rem)',
            }}
          >
            Protect Your Car&apos;s Paint with{' '}
            <span
              style={{
                background: goldGrad,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Nano Ceramic Coating
            </span>
          </h2>
          <p className="text-white/45 text-base leading-[1.8] mb-8 max-w-xl mx-auto">
            Permanent hydrophobic protection, 9H scratch hardness, and deep showroom gloss —
            applied by certified installers at any of our 4 branches across Dubai and Sharjah.
            Free inspection with every booking.
          </p>

          <div
            className="flex items-center justify-center gap-6 mb-8 flex-wrap text-sm"
            style={{ color: 'rgba(255,255,255,0.35)' }}
          >
            {['Free vehicle inspection', 'Paint correction included', '4 branches UAE', 'Up to 9-year warranty'].map((t) => (
              <div key={t} className="flex items-center gap-1.5">
                <div className="w-1 h-1 rounded-full" style={{ background: GOLD }} aria-hidden="true" />
                {t}
              </div>
            ))}
          </div>

          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="https://wa.me/971524403677"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-sm text-black transition-all hover:opacity-90"
              style={{ background: goldGrad }}
            >
              Book on WhatsApp <ArrowRight size={15} />
            </a>
            <a
              href="tel:+971524403677"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-sm border transition-all"
              style={{
                color: GOLD,
                borderColor: 'rgba(201,168,76,0.3)',
                background: 'rgba(201,168,76,0.05)',
              }}
            >
              <Phone size={14} /> Call Us Now
            </a>
          </div>
        </div>
      </section>

    </main>
  )
}