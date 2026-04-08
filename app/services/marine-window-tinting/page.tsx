'use client'

import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { motion } from 'framer-motion'
import { CheckCircle, ArrowRight, Phone, Shield, Sun, Eye, Thermometer, Wind, Waves, Anchor, Star } from 'lucide-react'

const GOLD = '#C9A84C'
const GOLD2 = '#E8C96A'
const GOLD3 = '#A07830'
const goldGrad = `linear-gradient(135deg,${GOLD},${GOLD2},${GOLD3})`

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]
const fadeUp   = { hidden: { opacity: 0, y: 28 }, show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1, ease } }) }
const fadeLeft  = { hidden: { opacity: 0, x: -28 }, show: { opacity: 1, x: 0, transition: { duration: 0.7, ease } } }
const fadeRight = { hidden: { opacity: 0, x: 28 },  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease } } }

// ─── DATA ────────────────────────────────────────────────────────────────────

const stats = [
  { value: '90%', label: 'Solar Heat Rejection',  desc: 'Keeps cabins and decks cool even in peak UAE summer' },
  { value: '99%', label: 'UV Ray Blockage',        desc: 'Full protection from harmful UV-A and UV-B radiation' },
  { value: '95%', label: 'Glare Reduction',         desc: 'Safer navigation on open water in direct sunlight' },
  { value: '30%', label: 'Energy Cost Saving',      desc: 'Reduced air conditioning load on board' },
]

const benefits = [
  {
    icon: Sun,
    title: 'UV Protection',
    desc: "The UAE's UV index is among the world's highest, and on open water the reflection doubles that exposure. Our marine window films block 99% of harmful UV-A and UV-B radiation — protecting passengers, crew, and interior materials from damage.",
  },
  {
    icon: Eye,
    title: 'Glare Reduction',
    desc: 'Sun glare reflected off water is one of the most dangerous conditions for boat operators. Marine tinting reduces glare by up to 95%, significantly improving visibility and reaction time when navigating UAE waters.',
  },
  {
    icon: Thermometer,
    title: 'Heat Control',
    desc: "Unprotected glass in the UAE summer turns a boat cabin into an oven. Our films reject up to 90% of incoming solar heat — keeping cabins, helms, and salons at a comfortable temperature without overloading the vessel's cooling system.",
  },
  {
    icon: Wind,
    title: 'Fade & Interior Protection',
    desc: 'Marine interiors are expensive. Vinyl upholstery, teak woodwork, carpets, and leather surfaces fade and degrade rapidly under constant UV exposure. Window film blocks the radiation responsible for fading, extending the life of every interior fitting.',
  },
  {
    icon: Shield,
    title: 'Privacy & Security',
    desc: 'One-way privacy films allow unobstructed outward vision while preventing others from looking in — protecting passengers, guests, and valuables from view. Particularly valuable for yachts moored in marinas.',
  },
  {
    icon: Waves,
    title: 'Safety Glass Retention',
    desc: 'Safety and security films bond to marine glass surfaces, holding shattered panels together on impact. In a collision or rough weather event, this dramatically reduces injury risk from flying glass fragments.',
  },
  {
    icon: Anchor,
    title: 'Aesthetics & Customisation',
    desc: 'Marine tinting is not just functional — it defines the character of your vessel. We offer a full range of tint shades, mirror films, and decorative options to suit any boat or yacht aesthetic, from commercial tenders to superyachts.',
  },
  {
    icon: Thermometer,
    title: 'Winter Insulation',
    desc: 'Window film works both ways. In cooler months, the same film that rejects summer heat acts as an insulating layer — retaining warmth inside cabins and reducing heating requirements during UAE winter cruising.',
  },
]

const filmTypes = [
  {
    name: 'Marine Solar Control',
    brand: '3M · Totalgard',
    best: 'All vessel types — primary heat and UV rejection',
    features: ['90% solar heat rejection', '99% UV blockage', 'High visible light transmission', 'Resistant to salt spray and humidity', '5-year marine warranty'],
    price: 'From AED 35/sqft',
  },
  {
    name: 'Marine Privacy Film',
    brand: 'Totalgard · Llumar',
    best: 'Salons, cabins, sleeping quarters',
    features: ['One-way daytime privacy', 'Full outward visibility retained', 'Multiple opacity levels', 'UV and heat rejection included', '3-year warranty'],
    price: 'From AED 30/sqft',
  },
  {
    name: 'Nano Ceramic Marine Film',
    brand: '3M All Seasons',
    best: 'Superyachts and premium vessels',
    features: ['Maximum heat rejection', 'Non-metallic — no instrument interference', 'Crystal clarity, no colour shift', 'Corrosion-resistant adhesive', '10-year warranty'],
    price: 'From AED 55/sqft',
  },
  {
    name: 'Marine Safety Film',
    brand: '3M Safety Series',
    best: 'Navigation screens, helm glass, forward windows',
    features: ['Holds glass together on impact', 'Shatter protection at sea', 'UV protection included', 'Optically clear', '7-year warranty'],
    price: 'From AED 45/sqft',
  },
  {
    name: 'Mirror / Reflective Film',
    brand: 'Totalgard',
    best: 'Exterior-facing cabin windows for maximum privacy',
    features: ['One-way mirror effect', 'Maximum privacy from all angles', 'Strong heat rejection', 'High-impact aesthetic', '5-year warranty'],
    price: 'From AED 40/sqft',
  },
  {
    name: 'Anti-Glare Film',
    brand: '3M · Llumar',
    best: 'Helm stations, navigation desks, instrument areas',
    features: ['95% glare reduction', 'Diffuses bright reflections evenly', 'Improves screen legibility on instruments', 'UV protection included', '5-year warranty'],
    price: 'From AED 38/sqft',
  },
]

const vessels = [
  { type: 'Speed Boats', desc: 'Fast RIBs, centre consoles, and sport boats. Forward windscreen and side glass.' },
  { type: 'Yachts', desc: 'Sailing and motor yachts up to 60ft. Salon, helm, and cabin glass.' },
  { type: 'Superyachts', desc: 'Large motor yachts and megayachts. Multi-level glazing and specialty glass.' },
  { type: 'Fishing Boats', desc: 'Commercial and sport fishing vessels. Wheelhouse and cabin glass.' },
  { type: 'Commercial Vessels', desc: 'Passenger ferries, water taxis, and crew transfer vessels.' },
  { type: 'Houseboats', desc: 'Floating homes, liveaboards, and leisure pontoons.' },
]

const process = [
  { num: '01', title: 'Contact & Survey', desc: 'Contact us via WhatsApp or phone. We arrange a survey at your marina berth or boatyard in Dubai or Sharjah to assess glass surfaces and recommend the right film.' },
  { num: '02', title: 'Film Selection', desc: 'We present samples on your actual glass and discuss priorities — heat rejection, privacy, safety, or aesthetics. You see exactly what the result will look like before we begin.' },
  { num: '03', title: 'On-Site Installation', desc: 'Our marine-certified installers work on board at your berth. No need to transport your vessel. Work is completed with care for your interior and finishes.' },
  { num: '04', title: 'Handover & Warranty', desc: 'Full inspection and clean-up before handover. You receive manufacturer warranty documentation and aftercare instructions.' },
]

const marinas = [
  'Dubai Marina', 'Palm Jumeirah Marina', 'Port Rashid', 'Dubai Harbour',
  'Mina Seyahi', 'Al Wasl', 'Sharjah Corniche', 'Ajman Marina',
  'Abu Dhabi Corniche', 'Yas Marina', 'Ras Al Khaimah Marinas',
]

const faqs = [
  {
    q: 'Is marine window tinting different from car window tinting?',
    a: "Yes. Marine films are specifically engineered for the harsher conditions at sea — high humidity, salt spray, constant sun exposure, and the unique adhesion challenges of marine glass. Smart Auto UAE uses films specifically rated for marine environments, not standard automotive films applied to boats.",
  },
  {
    q: 'How long does marine window film last?',
    a: 'Premium marine films from 3M and Totalgard are rated for 5–10 years in UAE marine conditions. They use corrosion-resistant adhesives and UV-stabilised constructions to withstand salt air, humidity, and constant intense sunlight.',
  },
  {
    q: 'Will window film interfere with navigation instruments or radar?',
    a: 'Nano ceramic films are entirely non-metallic and do not affect VHF radio, GPS, radar, or any other electronic navigation equipment. We specifically recommend non-metallic films for helm areas and any glazing near antenna equipment.',
  },
  {
    q: 'Can window film be applied to curved or shaped marine glass?',
    a: 'Yes. Our installers are trained in the application of film to curved and compound-curved marine glazing. We use specific techniques and film formulations to achieve clean, bubble-free results on non-flat surfaces.',
  },
  {
    q: 'Do you come to the marina or does the boat need to be transported?',
    a: 'We come to you. Smart Auto UAE offers on-site marine tinting installation at your berth or boatyard across Dubai and Sharjah marinas. No need to arrange vessel transport.',
  },
  {
    q: 'How long does marine tinting installation take?',
    a: 'A typical speed boat or small yacht takes 4–8 hours. Larger yachts and multi-deck vessels may take 2–3 days depending on the total glass area and complexity of the glazing.',
  },
  {
    q: 'Can tinted marine glass be cleaned normally?',
    a: 'After a 30-day curing period, marine-tinted glass can be cleaned normally using a soft cloth and non-ammonia glass cleaner. Avoid abrasive materials which can scratch the film surface.',
  },
]

const testimonials = [
  {
    name: 'Captain Rami Al Farsi',
    role: 'Yacht Owner · Dubai Marina',
    rating: 5,
    text: "Smart Auto did a superb job on my 42ft motor yacht. The ceramic film on the salon and helm glass has made a huge difference to cabin temperature. Professional installers who clearly know marine work — they protected my interior throughout.",
  },
  {
    name: 'James Whitfield',
    role: 'Speed Boat Owner · Palm Jumeirah',
    rating: 5,
    text: "Been taking my boats to Smart Auto for years. They tinted my new RIB at the marina — no need to move it anywhere. Clean job, great film quality, and the glare reduction on open water is immediately noticeable.",
  },
  {
    name: 'Khalid Hassan',
    role: 'Commercial Vessel Operator · Port Rashid',
    rating: 5,
    text: "We had our three passenger ferries done by Smart Auto. Competitive pricing for commercial work, professional installation team, and the crew and passengers have commented on the cooler cabins immediately.",
  },
]

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function MarineTintingPage() {
  return (
    <main style={{ background: '#0A0A0A', paddingTop: '80px' }}>
<Navbar/>
      {/* ── HERO ── */}
      <section
        className="relative py-24 overflow-hidden"
        style={{ background: 'linear-gradient(180deg,#050505 0%,#080808 100%)' }}
      >
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
          style={{ background: 'radial-gradient(ellipse at 65% 50%,rgba(201,168,76,0.07) 0%,transparent 60%)' }} />
        <div className="absolute top-0 left-0 right-0 h-px pointer-events-none" aria-hidden="true"
          style={{ background: 'linear-gradient(to right,transparent,rgba(201,168,76,0.2),transparent)' }} />

        <div className="w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div variants={fadeLeft} initial="hidden" animate="show">
            <p className="text-[11px] tracking-[0.3em] uppercase mb-4" style={{ color: GOLD }}>
              3M · Totalgard · Llumar — Marine Certified UAE Installer
            </p>
            <h1
              className="font-bold text-white leading-[1.1] mb-5"
              style={{ fontFamily: 'var(--font-playfair),serif', fontSize: 'clamp(2.5rem,5vw,4rem)' }}
            >
              Marine Window Tinting<br />
              <span style={{ background: goldGrad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Dubai & UAE
              </span>
            </h1>
            <p className="text-white/50 text-base leading-[1.85] mb-8 max-w-xl">
              Smart Auto UAE is the trusted specialist for <strong className="text-white/75 font-medium">marine window tinting across Dubai and the UAE</strong>. We provide professional glass coating and tinting for boats, yachts, and commercial vessels — installing premium 3M, Totalgard, and Llumar marine films that block 99% UV rays, reject 90% of solar heat, and dramatically reduce glare on open water. On-site installation at your marina berth. No vessel transport required.
            </p>
            <div className="flex flex-col gap-2.5 mb-8">
              {[
                'Boats, yachts, superyachts & commercial vessels',
                'On-site installation at your marina or boatyard',
                '3M, Totalgard & Llumar marine-grade films',
                'Non-metallic films — no instrument interference',
                'Free site assessment at your berth',
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
                Book Marine Survey <ArrowRight size={15} />
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
              src="/images/services/marine-tinting-hero.webp"
              alt="Marine window tinting Dubai — professional boat and yacht glass tinting by Smart Auto UAE"
              width={700} height={500} loading="eager" decoding="async"
              className="w-full h-full object-cover" style={{ maxHeight: '480px' }}
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

      {/* ── BENEFITS ── */}
      <section className="py-24" style={{ background: 'linear-gradient(180deg,#080808 0%,#0A0A0A 100%)' }}>
        <div className="w-full max-w-7xl mx-auto px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-16">
            <p className="text-[11px] tracking-[0.3em] uppercase mb-3 text-center" style={{ color: GOLD }}>
              Marine Film Benefits
            </p>
            <h2
              className="font-bold text-white text-center"
              style={{ fontFamily: 'var(--font-playfair),serif', fontSize: 'clamp(1.8rem,3vw,2.8rem)' }}
            >
              Why Marine Tinting is Essential{' '}
              <span style={{ background: goldGrad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                on UAE Waters
              </span>
            </h2>
            <p className="text-white/40 text-sm text-center mt-4 max-w-2xl mx-auto leading-relaxed">
              The combination of intense direct sunlight and its reflection off open water creates one of the harshest UV and heat environments in the world. Marine window film is not optional — it is standard equipment for any vessel operated in UAE waters.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {benefits.map((b, i) => (
              <motion.div key={b.title} variants={fadeUp} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }}>
                <div
                  className="rounded-2xl p-7 h-full"
                  style={{ background: 'rgba(17,17,17,0.85)', border: '1px solid rgba(201,168,76,0.1)' }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)', color: GOLD }}
                  >
                    <b.icon size={20} aria-hidden="true" />
                  </div>
                  <h3 className="text-white font-bold text-base mb-2.5" style={{ fontFamily: 'var(--font-playfair),serif' }}>
                    {b.title}
                  </h3>
                  <p className="text-white/40 text-[13px] leading-[1.75]">{b.desc}</p>
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
            <p className="text-[11px] tracking-[0.3em] uppercase mb-3 text-center" style={{ color: GOLD }}>Marine Film Options</p>
            <h2
              className="font-bold text-white text-center"
              style={{ fontFamily: 'var(--font-playfair),serif', fontSize: 'clamp(1.8rem,3vw,2.8rem)' }}
            >
              Marine Window Films We{' '}
              <span style={{ background: goldGrad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Install in Dubai
              </span>
            </h2>
            <p className="text-white/40 text-sm text-center mt-4 max-w-xl mx-auto">
              Every vessel has different requirements. We help you select the right film for each glass area — helm, cabin, salon, or exterior windows.
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

      {/* ── VESSEL TYPES ── */}
      <section className="py-24" style={{ background: 'linear-gradient(180deg,#080808 0%,#0A0A0A 100%)' }}>
        <div className="w-full max-w-7xl mx-auto px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-14">
            <p className="text-[11px] tracking-[0.3em] uppercase mb-3 text-center" style={{ color: GOLD }}>Vessel Types</p>
            <h2
              className="font-bold text-white text-center"
              style={{ fontFamily: 'var(--font-playfair),serif', fontSize: 'clamp(1.8rem,3vw,2.8rem)' }}
            >
              We Tint All Types of{' '}
              <span style={{ background: goldGrad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Marine Vessels
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {vessels.map((v, i) => (
              <motion.div key={v.type} variants={fadeUp} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }}>
                <div
                  className="rounded-2xl p-7"
                  style={{ background: 'rgba(17,17,17,0.85)', border: '1px solid rgba(201,168,76,0.1)' }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Anchor size={16} style={{ color: GOLD, flexShrink: 0 }} aria-hidden="true" />
                    <h3 className="text-white font-semibold text-base">{v.type}</h3>
                  </div>
                  <p className="text-white/40 text-[13px] leading-relaxed">{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-24" style={{ backgroundColor: '#060606' }}>
        <div className="w-full max-w-7xl mx-auto px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-14">
            <p className="text-[11px] tracking-[0.3em] uppercase mb-3 text-center" style={{ color: GOLD }}>Installation Process</p>
            <h2
              className="font-bold text-white text-center"
              style={{ fontFamily: 'var(--font-playfair),serif', fontSize: 'clamp(1.8rem,3vw,2.8rem)' }}
            >
              Marine Tinting at{' '}
              <span style={{ background: goldGrad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Your Marina
              </span>
            </h2>
            <p className="text-white/40 text-sm text-center mt-4 max-w-xl mx-auto">
              We come to you — no need to move your vessel or arrange transport. Our team installs at your berth across Dubai and Sharjah marinas.
            </p>
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
      <section className="py-24" style={{ background: 'linear-gradient(180deg,#080808 0%,#0A0A0A 100%)' }}>
        <div className="w-full max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <motion.div variants={fadeLeft} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <p className="text-[11px] tracking-[0.3em] uppercase mb-4" style={{ color: GOLD }}>Why Smart Auto UAE</p>
              <h2
                className="font-bold text-white leading-[1.2] mb-5"
                style={{ fontFamily: 'var(--font-playfair),serif', fontSize: 'clamp(1.8rem,3vw,2.6rem)' }}
              >
                UAE&apos;s Trusted Marine<br />
                <span style={{ background: goldGrad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  Window Tinting Specialists
                </span>
              </h2>
              <p className="text-white/50 text-base leading-[1.85] mb-7">
                Smart Auto UAE has been the trusted window tinting partner for boat and yacht owners across Dubai and Sharjah since 2014. When it comes to marine window tinting, there is no room for error — salt air, constant sun exposure, and the critical safety requirements of marine glass demand specialist knowledge and materials. Our team is trained specifically in marine installation techniques and uses only films engineered for maritime environments.
              </p>
              <div className="flex flex-col gap-3">
                {[
                  'Marine-certified installation technicians',
                  '3M, Totalgard & Llumar authorised marine installer',
                  'Films engineered for salt, humidity & UV resistance',
                  'On-site at your berth — no vessel transport needed',
                  'Free site assessment and same-day quotation',
                  'Manufacturer warranty on all marine installations',
                ].map((p) => (
                  <div key={p} className="flex items-center gap-3">
                    <CheckCircle size={15} style={{ color: GOLD, flexShrink: 0 }} />
                    <span className="text-white/60 text-sm">{p}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeRight} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <div
                className="rounded-2xl overflow-hidden"
                style={{ border: '1px solid rgba(201,168,76,0.15)' }}
              >
                <img
                  src="/images/services/marine-tinting-2.webp"
                  alt="Marine window film installation on yacht in Dubai — Smart Auto UAE"
                  width={700} height={480} loading="lazy" decoding="async"
                  className="w-full h-full object-cover" style={{ maxHeight: '440px' }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24" style={{ backgroundColor: '#060606' }}>
        <div className="w-full max-w-7xl mx-auto px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-14">
            <p className="text-[11px] tracking-[0.3em] uppercase mb-3 text-center" style={{ color: GOLD }}>Client Reviews</p>
            <h2
              className="font-bold text-white text-center"
              style={{ fontFamily: 'var(--font-playfair),serif', fontSize: 'clamp(1.8rem,3vw,2.8rem)' }}
            >
              Trusted by UAE{' '}
              <span style={{ background: goldGrad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Boat Owners
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={t.name} variants={fadeUp} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }}>
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
        </div>
      </section>

      {/* ── MARINAS WE SERVE ── */}
      <section className="py-20" style={{ background: 'linear-gradient(180deg,#080808 0%,#0A0A0A 100%)' }}>
        <div className="w-full max-w-7xl mx-auto px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-10">
            <p className="text-[11px] tracking-[0.3em] uppercase mb-3 text-center" style={{ color: GOLD }}>
              Marine Tinting Near Me
            </p>
            <h2
              className="font-bold text-white text-center"
              style={{ fontFamily: 'var(--font-playfair),serif', fontSize: 'clamp(1.8rem,3vw,2.6rem)' }}
            >
              We Serve All UAE{' '}
              <span style={{ background: goldGrad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Marinas &amp; Boatyards
              </span>
            </h2>
            <p className="text-white/40 text-sm text-center mt-3 max-w-xl mx-auto">
              Our team installs marine window tinting on-site at marinas and boatyards across Dubai, Sharjah, Abu Dhabi, and the wider UAE.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-wrap gap-2.5 justify-center"
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          >
            {marinas.map((m) => (
              <span
                key={m}
                className="px-4 py-2 rounded-full text-[13px] border"
                style={{
                  borderColor: 'rgba(201,168,76,0.15)',
                  background: 'rgba(255,255,255,0.02)',
                  color: 'rgba(255,255,255,0.45)',
                }}
              >
                {m}
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
              Marine Tinting{' '}
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
              Marine Window Tinting · Dubai &amp; UAE · On-Site Installation
            </p>
            <h2
              className="font-bold text-white mb-4 relative z-10"
              style={{ fontFamily: 'var(--font-playfair),serif', fontSize: 'clamp(2rem,4vw,3rem)' }}
            >
              Book Marine Tinting for Your<br />
              <span style={{ background: goldGrad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Boat or Yacht in Dubai
              </span>
            </h2>
            <p className="text-white/50 text-base mb-8 max-w-lg mx-auto relative z-10">
              Free site assessment at your berth. We bring everything to your marina — across Dubai and Sharjah. No vessel transport required.
            </p>
            <div className="flex gap-4 justify-center flex-wrap relative z-10">
              <a
                href="https://wa.me/971524403677"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm text-black"
                style={{ background: goldGrad }}
              >
                Book on WhatsApp <ArrowRight size={16} />
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