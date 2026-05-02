'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, ArrowRight, Phone, ChevronDown } from 'lucide-react'
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

const GoldText = ({ children }: { children: React.ReactNode }) => (
  <span
    style={{
      background: goldGrad,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    }}
  >
    {children}
  </span>
)

const finishes = [
  { name: 'Matte / Scraped Aluminium', desc: 'Flat, premium finish with zero glare. Extremely popular on luxury SUVs, sports cars, and executive sedans in the UAE.' },
  { name: 'Gloss & High Gloss', desc: 'Deep mirror-like shine. Colour-change wraps that look better than a factory respray, while protecting the original paint underneath.' },
  { name: 'Satin', desc: 'Between matte and gloss — the most refined, versatile premium finish. Pairs well with any vehicle colour.' },
  { name: 'Pearl & Metallic', desc: 'Multi-tonal finishes that shift in the light. Special effect foils that cannot be achieved with conventional paint.' },
  { name: 'Chrome & Mirror', desc: 'Maximum visual impact for show cars, supercars, and statement vehicles. Full chrome or partial accent chrome.' },
  { name: 'Chameleon / Colour Shift', desc: 'Changes colour depending on viewing angle and light — the most dramatic special-effect wrap available.' },
  { name: '3D Carbon Fibre', desc: 'Textured carbon fibre effect — roof panels, bonnets, interior trims, and full-body carbon looks without the carbon fibre price.' },
  { name: 'Leather & Textured Foil', desc: 'Imitation leather and custom texture foils for interior trim panels, dashboards, and exterior accent areas.' },
  { name: 'Custom Digital Print', desc: 'Full-scale digital printing for personal designs, business branding, and fleet advertising — printed and applied on-site.' },
  { name: 'Partial Wrap', desc: 'Roof panels, bonnet, door mirrors, stripes, or any accent panel. Change one element without committing to a full wrap.' },
]

const benefits = [
  { title: 'Preserve Your Paint', desc: 'The vinyl film acts as a second skin — protecting the original factory paint from stone chips, UV fade, light scratches, and daily road damage.' },
  { title: 'Maintain Resale Value', desc: 'When you sell or return the vehicle, the wrap peels off cleanly to reveal perfect factory paint beneath — maximising resale value.' },
  { title: 'Reversible Colour Change', desc: "Change your car's colour completely without permanently altering the factory finish. Remove it at any time with no adhesive residue." },
  { title: 'Wider Colour Choice', desc: 'Thousands of colour and finish options — pearl, metallic, chrome, matte, chameleon, and custom prints — far beyond what factory paint offers.' },
  { title: 'Lease Car Friendly', desc: 'Buy or lease in black, wrap to your desired colour, then remove at end of lease. The original colour underneath stays perfect.' },
  { title: 'Cost-Effective vs Respray', desc: 'A professional wrap typically costs less than a full respray, is completely reversible, and for luxury vehicles avoids the significant loss of value that a respray causes.' },
]

const process = [
  { num: '01', title: 'Consultation & Film Selection', desc: 'We advise on the best film type, finish, and coverage for your vehicle and budget. Samples available at all branches.' },
  { num: '02', title: 'Vehicle Preparation', desc: 'The vehicle is washed, decontaminated, and inspected. Handles, mirrors, and removable panels are removed where necessary for a seamless result.' },
  { num: '03', title: 'Professional Application', desc: 'Films are applied with a 3–5 mm hemmed overlap on outer body panels. Problem areas such as offsets and folds are carefully handled for total coverage.' },
  { num: '04', title: 'Quality Inspection & Handover', desc: 'Every panel is inspected under controlled lighting. The vehicle is cleaned and handed over with full aftercare instructions.' },
]

const wrappingVsPainting = [
  { label: 'Reversible', wrap: 'Yes', paint: 'No' },
  { label: 'Protects factory paint', wrap: 'Yes', paint: 'No' },
  { label: 'No loss of resale value', wrap: 'Yes', paint: 'No' },
  { label: 'Colour range', wrap: 'Unlimited', paint: 'Limited' },
  { label: 'Lease car compatible', wrap: 'Yes', paint: 'No' },
  { label: 'Custom digital print', wrap: 'Yes', paint: 'No' },
  { label: 'Removal process', wrap: 'Clean peel-off', paint: 'Full respray needed' },
  { label: 'RTA documentation', wrap: 'Required — we handle it', paint: 'Required' },
]

const faqs = [
  {
    q: 'Is car wrapping legal in Dubai?',
    a: 'Yes. Car wrapping is legal in Dubai and across the UAE. For full colour-change wraps, UAE traffic law requires you to update your vehicle registration to reflect the new colour. Smart Auto UAE handles the complete RTA documentation process at all our Dubai branches.',
  },
  {
    q: 'How long does a car wrap last in Dubai?',
    a: 'A professional-grade vinyl wrap from 3M or Avery Dennison lasts 5–7 years in UAE conditions. The film is UV-resistant, wash-resistant, and weather-resistant. With the correct care products it can also be polished, waxed, or sealed — just like factory paint.',
  },
  {
    q: 'Will car wrapping damage my paint?',
    a: "No. High-quality PVC vinyl films are designed for full 3D deformation and can be removed cleanly without adhesive residues or damage to the original paint — provided the paint was in good condition before application. This is one of wrapping's biggest advantages over respraying.",
  },
  {
    q: 'How long does a full car wrap take?',
    a: 'A full colour-change car wrap takes 2–4 days at Smart Auto UAE depending on vehicle size, complexity, and the number of panels that need to be disassembled. Partial wraps — roof, bonnet, stripes — can be completed in 1 day.',
  },
  {
    q: 'Can you wrap boats, motorcycles, and commercial vehicles?',
    a: 'Yes. Smart Auto UAE wraps all types of vehicles and assets including boats, motorcycles, helicopters, commercial vans, and fleet vehicles. We also provide full-scale digital printing for business branding and advertising wraps.',
  },
  {
    q: 'What is the best colour to buy a new car for wrapping?',
    a: 'Black is the ideal base colour for wrapping. It provides the best optical result under most films, especially lighter or special-effect colours. Buying in black and wrapping to your desired colour saves the additional cost of factory colour options while protecting the paint from day one.',
  },
  {
    q: 'What happens to the inside door panels and jambs?',
    a: "By default, only the outer body panels are wrapped with a 3–5 mm hemmed edge. If your vehicle's original colour contrasts strongly with the wrap film, inner door panels and jambs can be wrapped at an additional charge for a fully seamless result.",
  },
]

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

export default function CarWrappingPage() {
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
          style={{ background: 'radial-gradient(ellipse at 70% 50%,rgba(201,168,76,0.08) 0%,transparent 65%)' }}
          aria-hidden="true"
        />
        <div
          className="absolute top-0 left-0 right-0 h-px pointer-events-none"
          style={{ background: 'linear-gradient(to right,transparent,rgba(201,168,76,0.2),transparent)' }}
          aria-hidden="true"
        />

        <div className="w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div variants={fadeUp} initial="hidden" animate="show">
            <p className="text-[11px] tracking-[0.3em] uppercase mb-4" style={{ color: GOLD }}>
              3M · Avery Dennison · Hexis · KPMF — UAE Installer
            </p>
            <h1
              className="font-bold text-white leading-[1.05] mb-5"
              style={{ fontFamily: 'var(--font-playfair),serif', fontSize: 'clamp(2.5rem,5vw,4.2rem)' }}
            >
              Car Wrapping Dubai<br />
              <GoldText>Your Car. Your Style. Your Colour.</GoldText>
            </h1>
            <p className="text-white/50 text-base leading-[1.9] mb-5 max-w-xl">
              Smart Auto UAE is Dubai and Sharjah&apos;s trusted{' '}
              <strong className="text-white/75 font-medium">car wrapping specialist</strong>. Customise and
              protect your vehicle with premium vinyl wraps — from full colour-change wraps to digital print
              advertising, special-effect foils, and partial accents. We also wrap boats, motorcycles, and
              commercial fleets.
            </p>
            <div className="flex flex-col gap-2.5 mb-8">
              {[
                'Full colour-change & partial wraps Dubai',
                'Matte, gloss, satin, chrome, pearl, chameleon & 3D carbon',
                'RTA colour-change documentation handled by us',
                '3M, Avery Dennison, Hexis & KPMF vinyl films',
                'Boats, motorcycles, fleet & commercial vehicles',
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
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-black"
                style={{ background: goldGrad }}
              >
                Book Now <ArrowRight size={15} />
              </a>
              <a
                href="tel:+971567269666"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm border transition-all"
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
              src="/images/car-wrap.webp"
              alt="Professional vinyl car wrapping Dubai — matte, gloss, chrome and colour-change wraps by Smart Auto UAE"
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

      {/* ── FINISHES ── */}
      <section className="py-24" style={{ backgroundColor: '#060606' }}>
        <div className="w-full max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-[11px] tracking-[0.3em] uppercase mb-3" style={{ color: GOLD }}>
              Available Finishes
            </p>
            <h2
              className="font-bold text-white"
              style={{ fontFamily: 'var(--font-playfair),serif', fontSize: 'clamp(1.8rem,3vw,2.6rem)' }}
            >
              Wrap Finishes We <GoldText>Offer in Dubai</GoldText>
            </h2>
            <p className="text-white/40 text-sm mt-4 max-w-xl mx-auto">
              Over 3,000 colour and finish combinations across our full range of premium vinyl brands.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {finishes.map((f, i) => (
              <motion.div
                key={f.name}
                variants={fadeUp}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                <div
                  className="rounded-2xl p-7 h-full group transition-all duration-300"
                  style={{
                    background: 'rgba(17,17,17,0.85)',
                    border: '1px solid rgba(201,168,76,0.1)',
                  }}
                >
                  <div
                    className="w-1 h-7 rounded-full mb-4 transition-all duration-300 group-hover:h-10"
                    style={{ background: goldGrad }}
                    aria-hidden="true"
                  />
                  <h3 className="text-white font-semibold text-base mb-2 group-hover:text-gold transition-colors duration-300">
                    {f.name}
                  </h3>
                  <p className="text-white/40 text-[13px] leading-[1.7]">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section className="py-24" style={{ background: 'linear-gradient(180deg,#080808 0%,#0A0A0A 100%)' }}>
        <div className="w-full max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-[11px] tracking-[0.3em] uppercase mb-3" style={{ color: GOLD }}>
              Why Wrap Your Car
            </p>
            <h2
              className="font-bold text-white"
              style={{ fontFamily: 'var(--font-playfair),serif', fontSize: 'clamp(1.8rem,3vw,2.6rem)' }}
            >
              6 Reasons to Wrap <GoldText>Instead of Repaint</GoldText>
            </h2>
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
                  className="rounded-2xl p-7 h-full"
                  style={{
                    background: 'rgba(17,17,17,0.85)',
                    border: '1px solid rgba(201,168,76,0.1)',
                  }}
                >
                  <CheckCircle
                    size={20}
                    style={{ color: GOLD, marginBottom: '1rem' }}
                    aria-hidden="true"
                  />
                  <h3 className="text-white font-semibold text-base mb-2">{b.title}</h3>
                  <p className="text-white/40 text-[13px] leading-[1.7]">{b.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WRAP VS PAINT COMPARISON ── */}
      <section className="py-24" style={{ backgroundColor: '#060606' }}>
        <div className="w-full max-w-4xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-[11px] tracking-[0.3em] uppercase mb-3" style={{ color: GOLD }}>
              The Honest Comparison
            </p>
            <h2
              className="font-bold text-white"
              style={{ fontFamily: 'var(--font-playfair),serif', fontSize: 'clamp(1.8rem,3vw,2.6rem)' }}
            >
              Car Wrap vs <GoldText>Respray in Dubai</GoldText>
            </h2>
          </div>

          <div
            className="rounded-2xl overflow-hidden"
            style={{ border: '1px solid rgba(201,168,76,0.12)' }}
          >
            <div
              className="grid grid-cols-3 text-[11px] tracking-[0.12em] uppercase px-6 py-3.5"
              style={{ background: 'rgba(201,168,76,0.06)', borderBottom: '1px solid rgba(201,168,76,0.1)' }}
            >
              <span className="text-white/40">Feature</span>
              <span style={{ color: GOLD }}>Car Wrap</span>
              <span className="text-white/40">Respray</span>
            </div>
            {wrappingVsPainting.map((row, i) => (
              <div
                key={row.label}
                className="grid grid-cols-3 px-6 py-4 text-sm"
                style={{
                  borderBottom: i < wrappingVsPainting.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                  background: i % 2 === 0 ? 'rgba(255,255,255,0.01)' : 'transparent',
                }}
              >
                <span className="text-white/50 text-[13px]">{row.label}</span>
                <span className="text-[13px] font-medium" style={{ color: GOLD }}>{row.wrap}</span>
                <span className="text-white/30 text-[13px]">{row.paint}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="py-24" style={{ background: 'linear-gradient(180deg,#080808 0%,#0A0A0A 100%)' }}>
        <div className="w-full max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-[11px] tracking-[0.3em] uppercase mb-3" style={{ color: GOLD }}>
              Our Wrapping Process
            </p>
            <h2
              className="font-bold text-white"
              style={{ fontFamily: 'var(--font-playfair),serif', fontSize: 'clamp(1.8rem,3vw,2.6rem)' }}
            >
              How We Wrap <GoldText>Your Vehicle</GoldText>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 relative">
            <div
              className="absolute top-9 left-[12%] w-[76%] h-px pointer-events-none hidden lg:block"
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
                  className="rounded-2xl p-8 text-center h-full"
                  style={{ background: 'rgba(17,17,17,0.85)', border: '1px solid rgba(201,168,76,0.1)' }}
                >
                  <div
                    className="rounded-full flex items-center justify-center mx-auto mb-5"
                    style={{
                      width: 64,
                      height: 64,
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
                  <p className="text-white/40 text-[13px] leading-[1.65]">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24" style={{ backgroundColor: '#060606' }}>
        <div className="w-full max-w-4xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-[11px] tracking-[0.3em] uppercase mb-3" style={{ color: GOLD }}>
              Common Questions
            </p>
            <h2
              className="font-bold text-white"
              style={{ fontFamily: 'var(--font-playfair),serif', fontSize: 'clamp(1.8rem,3vw,2.6rem)' }}
            >
              Car Wrapping <GoldText>FAQs Dubai</GoldText>
            </h2>
          </div>
          <div className="flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24" style={{ backgroundColor: '#080808' }}>
        <div
          className="w-full max-w-5xl mx-auto px-6 rounded-3xl py-20 text-center relative overflow-hidden"
          style={{
            border: '1px solid rgba(201,168,76,0.2)',
            background: 'linear-gradient(135deg,rgba(201,168,76,0.09) 0%,rgba(201,168,76,0.03) 50%,rgba(201,168,76,0.07) 100%)',
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at center,rgba(201,168,76,0.06) 0%,transparent 65%)' }}
            aria-hidden="true"
          />
          <p
            className="text-[11px] tracking-[0.3em] uppercase mb-4 relative z-10"
            style={{ color: GOLD }}
          >
            Car Wrapping Dubai & Sharjah · Open Every Day · 4 Branches
          </p>
          <h2
            className="font-bold text-white mb-4 relative z-10"
            style={{ fontFamily: 'var(--font-playfair),serif', fontSize: 'clamp(2rem,3.5vw,3rem)' }}
          >
            Ready to Wrap <GoldText>Your Vehicle?</GoldText>
          </h2>
          <p className="text-white/45 text-base mb-10 max-w-lg mx-auto relative z-10">
            Free consultation at any of our 4 branches in Dubai and Sharjah. Bring your vehicle or call to
            discuss your wrap project — we will advise on the best film, finish, and coverage for your budget.
          </p>
          <div className="flex gap-4 justify-center flex-wrap relative z-10">
            <a
              href="https://wa.me/971567269666"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm text-black transition-all hover:opacity-90 active:scale-[0.98]"
              style={{ background: goldGrad }}
            >
              Book on WhatsApp <ArrowRight size={15} />
            </a>
            <a
              href="tel:+971567269666"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm border transition-all"
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