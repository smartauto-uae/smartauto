'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus, ArrowRight, MessageCircle, Phone } from 'lucide-react'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'

const GOLD = '#C9A84C'
const GOLD2 = '#E8C96A'
const GOLD3 = '#A07830'
const goldGrad = `linear-gradient(135deg,${GOLD},${GOLD2},${GOLD3})`

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.55, delay: i * 0.07, ease } }),
}

// ─── DATA ──────────────────────────────────────────────────────────────────

const categories = [
  { id: 'tinting',   label: 'Window Tinting' },
  { id: 'ppf',       label: 'Paint Protection Film' },
  { id: 'ceramic',   label: 'Ceramic Coating' },
  { id: 'wrapping',  label: 'Car Wrapping' },
  { id: 'marine',    label: 'Marine Tinting' },
  { id: 'residential', label: 'Residential Tinting' },
  { id: 'general',   label: 'General' },
]

const faqs: {
  id: string
  category: string
  q: string
  a: string
  tags?: string[]
}[] = [

  // ── WINDOW TINTING ──────────────────────────────────────────────────────
  {
    id: 'tint-legal-dubai',
    category: 'tinting',
    q: 'What is the legal window tint percentage in Dubai and UAE?',
    a: 'Under UAE traffic law (Circular No. 86, Article 9), front side windows must allow at least 70% visible light transmission (VLT), meaning a maximum of 30% tint. Rear side windows and the rear windshield must allow at least 30% VLT, meaning a maximum of 70% tint. No aftermarket tint is permitted on the front windshield — only a factory-installed sun strip of no more than 5 inches. Smart Auto UAE installs only RTA-compliant films and advises you on the correct VLT for each window before installation.',
    tags: ['legal', 'RTA', 'VLT', 'Dubai law'],
  },
  {
    id: 'tint-fine',
    category: 'tinting',
    q: 'What is the fine for illegal window tinting in Dubai?',
    a: 'Fines for illegal window tinting in Dubai exceed AED 1,500 and may result in vehicle impoundment. Smart Auto UAE installs only RTA-approved films at legal VLT levels. We advise every customer on the maximum permitted tint for each window before installation.',
    tags: ['fine', 'penalty', 'Dubai Police', 'RTA'],
  },
  {
    id: 'tint-types',
    category: 'tinting',
    q: 'What types of window tint film are available at Smart Auto UAE?',
    a: 'Smart Auto UAE installs the following film types from 3M, TotalGard, Global USA, and Llumar: (1) Dyed films — entry-level, basic heat reduction; (2) Metalized films — reflective, strong heat rejection; (3) Carbon films — non-reflective, good heat and UV rejection; (4) Nano ceramic films — the highest performance, non-metallic, maximum heat rejection without signal interference, crystal clear. We recommend nano ceramic for UAE conditions due to the extreme UV index and heat levels.',
    tags: ['ceramic', 'carbon', 'dyed', 'film types'],
  },
  {
    id: 'tint-how-long',
    category: 'tinting',
    q: 'How long does car window tinting take at Smart Auto UAE?',
    a: 'A standard passenger car (sedan or SUV) takes approximately 1.5 to 3 hours. Larger vehicles such as full-size SUVs or vans may take 3 to 4 hours. The process includes surface preparation, film cutting, application, and final inspection. The vehicle can be driven immediately after, though we recommend avoiding wet cleaning of the windows for 30 days while the film cures.',
    tags: ['duration', 'installation time'],
  },
  {
    id: 'tint-last',
    category: 'tinting',
    q: 'How long does car window tinting last in Dubai?',
    a: 'Premium 3M and TotalGard nano ceramic films are rated for 10 to 15 years in UAE conditions. Entry-level dyed films typically last 3 to 5 years before fading or bubbling. All films installed by Smart Auto UAE come with a manufacturer warranty — 5 to 10 years depending on the film grade. UAE heat and UV can accelerate degradation of inferior films, which is why we only use authorised brand products.',
    tags: ['durability', 'lifespan', 'warranty'],
  },
  {
    id: 'tint-cost',
    category: 'tinting',
    q: 'How much does car window tinting cost in Dubai?',
    a: 'Car window tinting at Smart Auto UAE starts from AED 200 for basic films and ranges up to AED 2,500+ for full nano ceramic packages on large SUVs. The cost depends on the film brand and grade (3M, TotalGard, Llumar), the number of windows, and the size of your vehicle. We provide a fixed price quote after viewing your vehicle — no hidden charges. WhatsApp us a photo of your car for a same-day estimate.',
    tags: ['price', 'cost', 'AED'],
  },
  {
    id: 'tint-signal',
    category: 'tinting',
    q: 'Does window tinting block mobile signal, GPS, or toll gates (Salik)?',
    a: 'Metalized films can interfere with GPS, mobile signal, and toll gate readers (Salik). Nano ceramic films are entirely non-metallic and do not affect any electronic signals. Smart Auto UAE recommends and installs nano ceramic films specifically because they deliver maximum performance without signal interference — important in a connected city like Dubai.',
    tags: ['GPS', 'Salik', 'signal', 'ceramic'],
  },
  {
    id: 'tint-new-car',
    category: 'tinting',
    q: 'Can I tint a brand new car immediately after purchase?',
    a: 'Yes. Window tinting can be applied to a new car immediately. There is no waiting period related to the car itself. The film is applied to the interior surface of the glass, not the paint, so it does not interfere with any factory warranty. Many customers bring their new cars directly from the showroom to Smart Auto UAE for tinting before first use.',
    tags: ['new car', 'warranty'],
  },
  {
    id: 'tint-remove',
    category: 'tinting',
    q: 'Can old window tint be removed and replaced?',
    a: 'Yes. Smart Auto UAE offers full tint removal and replacement services. Old or bubbled film is removed using professional heat tools and adhesive removers without damaging the glass. Once the surface is clean, new film is applied. This is a common service for vehicles with aged or illegal tint that needs to be replaced with RTA-compliant film.',
    tags: ['removal', 'replacement', 'old tint'],
  },

  // ── PPF ─────────────────────────────────────────────────────────────────
  {
    id: 'ppf-what',
    category: 'ppf',
    q: 'What is Paint Protection Film (PPF) and how does it work?',
    a: 'Paint Protection Film (PPF) is a transparent polyurethane film 150 to 200 microns thick applied to your vehicle\'s painted surfaces. It acts as a physical barrier that absorbs stone chips, road debris, sand abrasion, and minor scratches before they reach the factory paint. Premium PPF has a self-healing top coat — minor scratches disappear when the surface warms up (either from the sun or warm water). Smart Auto UAE installs 3M, TotalGard, and Llumar PPF with 10-year warranties.',
    tags: ['PPF', 'paint protection', 'self healing'],
  },
  {
    id: 'ppf-vs-ceramic',
    category: 'ppf',
    q: 'What is the difference between PPF and ceramic coating?',
    a: 'PPF is a physical film that protects against stone chips, scratches, and road debris — it is impact protection. Ceramic coating is a nano-chemical layer (1 to 2 microns) that protects against UV, oxidation, chemical stains, and makes the surface hydrophobic (water and dirt bead off). PPF lasts 5 to 10 years in UAE conditions; ceramic coating lasts 2 to 5 years. Many Smart Auto UAE customers combine both — PPF on high-impact areas (bonnet, bumpers, side mirrors, door edges) and ceramic coating over the entire vehicle for gloss, UV protection, and easy cleaning.',
    tags: ['PPF vs ceramic', 'difference', 'combined'],
  },
  {
    id: 'ppf-uae-worth',
    category: 'ppf',
    q: 'Is PPF worth it in Dubai and UAE?',
    a: 'Yes — PPF is particularly valuable in the UAE for three reasons: (1) Desert sand acts as a fine abrasive at highway speeds, causing micro-scratches and paint degradation faster than in other climates; (2) UAE highways expose vehicles to stone chips and gravel frequently; (3) Extreme UV and heat accelerate paint oxidation on unprotected surfaces. For new, luxury, or high-resale-value vehicles, PPF is one of the highest-return investments you can make in the UAE.',
    tags: ['UAE', 'Dubai', 'worth it', 'ROI'],
  },
  {
    id: 'ppf-how-long',
    category: 'ppf',
    q: 'How long does PPF last in UAE heat and conditions?',
    a: 'Premium PPF from 3M and TotalGard lasts 7 to 10 years in UAE conditions. The film is engineered with UV inhibitors and heat-stabilised adhesives that resist the Gulf\'s intense sun. Smart Auto UAE installs only premium-grade PPF — not budget films — and all installations carry a manufacturer warranty of 5 to 10 years.',
    tags: ['durability', 'lifespan', 'UAE heat'],
  },
  {
    id: 'ppf-full-partial',
    category: 'ppf',
    q: 'Should I get full car PPF or partial (high-impact zones only)?',
    a: 'Full car PPF covers every painted panel and offers complete protection. Partial PPF covers the most vulnerable impact zones: bonnet (full or front half), front bumper, headlights, side mirrors, door cups, and door edge guards. Smart Auto UAE recommends full PPF for new luxury vehicles and supercars, and partial high-impact zone PPF for everyday cars as a cost-effective solution. We advise based on your vehicle, budget, and usage after a free consultation.',
    tags: ['full', 'partial', 'high impact zones'],
  },
  {
    id: 'ppf-cost',
    category: 'ppf',
    q: 'How much does PPF cost in Dubai?',
    a: 'PPF pricing at Smart Auto UAE starts from AED 800 for partial/door edge protection, AED 2,500 to AED 5,000 for front end protection (bonnet, bumpers, mirrors), and AED 8,000 to AED 25,000+ for full car PPF depending on vehicle size and film grade. Colour PPF (matte, satin, or gloss finishes) is priced separately. Contact us on WhatsApp with your vehicle make and model for a precise quote.',
    tags: ['price', 'cost', 'AED', 'quote'],
  },
  {
    id: 'ppf-damage-paint',
    category: 'ppf',
    q: 'Does PPF damage car paint when removed?',
    a: 'No — when PPF is professionally installed and removed, it does not damage factory paint. Smart Auto UAE uses PPF with pressure-sensitive adhesives designed for clean removal. Damage only occurs when film is improperly installed (applied to fresh paint before it has cured) or forcibly removed by an unqualified installer. We recommend always having PPF removed by a professional.',
    tags: ['removal', 'paint damage', 'safe'],
  },
  {
    id: 'ppf-colour',
    category: 'ppf',
    q: 'What is Colour PPF and how is it different from a car wrap?',
    a: 'Colour PPF combines the physical protection of standard PPF with a colour or finish change — available in matte, satin, gloss, and colour-shift options. Unlike vinyl wrapping, Colour PPF is much thicker (150–200 microns vs 80–100 microns for vinyl), self-healing, and protects the factory paint beneath it. It is the premium solution for clients who want a new look AND full paint protection. Smart Auto UAE offers Colour PPF in a wide range of finishes from 3M and TotalGard.',
    tags: ['colour PPF', 'colour change', 'vs wrap'],
  },

  // ── CERAMIC ─────────────────────────────────────────────────────────────
  {
    id: 'ceramic-what',
    category: 'ceramic',
    q: 'What is nano ceramic coating and how does it work?',
    a: 'Nano ceramic coating is a liquid polymer infused with silicon dioxide (SiO2) or titanium dioxide (TiO2) nanoparticles that chemically bonds to your vehicle\'s paint. Once cured, it forms a hard, semi-permanent layer (9H hardness on premium grades) that is hydrophobic, UV-resistant, and chemically inert. Water, dirt, bird droppings, tree sap, and road grime bead off the surface and are easier to remove. Smart Auto UAE applies 3M and TotalGard nano ceramic coatings with 2 to 15-Year warranties.',
    tags: ['nano ceramic', 'SiO2', '9H', 'hydrophobic'],
  },
  {
    id: 'ceramic-last',
    category: 'ceramic',
    q: 'How long does ceramic coating last in Dubai?',
    a: 'In UAE conditions, professional-grade ceramic coatings last 2 to 5 years depending on the product tier and maintenance habits. Budget ceramic coatings (often spray-on) last 6 to 12 months. Smart Auto UAE applies multi-layer professional coatings that bond properly to the paint — not consumer-grade sprays. Annual maintenance top-ups can extend the coating\'s performance further.',
    tags: ['durability', 'lifespan', 'UAE'],
  },
  {
    id: 'ceramic-diy',
    category: 'ceramic',
    q: 'Can I apply ceramic coating myself at home?',
    a: 'Consumer spray ceramic products are available but deliver significantly inferior results — typically lasting 3 to 6 months and providing no scratch resistance. Professional ceramic coating requires surface decontamination, paint correction (removing swirls and scratches), and application in a controlled environment. Improper application causes high spots, streaking, and bonding failures. Smart Auto UAE applies ceramic coating in a professional, temperature-controlled setting with certified technicians.',
    tags: ['DIY', 'professional', 'application'],
  },
  {
    id: 'ceramic-new-car',
    category: 'ceramic',
    q: 'Should I ceramic coat a new car?',
    a: 'Yes — applying ceramic coating to a new car before any environmental exposure gives the best long-term results. New paint is clean and free of contamination, allowing the coating to bond at maximum strength. Smart Auto UAE recommends applying ceramic coating within the first month of ownership, ideally after a light paint correction to remove any transport marks or showroom swirls.',
    tags: ['new car', 'best time'],
  },
  {
    id: 'ceramic-ppf-together',
    category: 'ceramic',
    q: 'Can PPF and ceramic coating be applied together?',
    a: 'Yes — and this is the recommended approach for maximum protection. The standard method is: (1) Apply PPF to high-impact zones (bonnet, bumpers, mirrors, door edges); (2) Apply ceramic coating over the PPF and over all remaining painted panels. This gives you physical impact protection where it is needed most, plus full UV, chemical, and hydrophobic protection across the entire vehicle. Many Smart Auto UAE clients choose this combined package for new luxury cars.',
    tags: ['combined', 'PPF and ceramic', 'together'],
  },

  // ── WRAPPING ────────────────────────────────────────────────────────────
  {
    id: 'wrap-how-long',
    category: 'wrapping',
    q: 'How long does a car wrap last in Dubai?',
    a: 'Premium cast vinyl car wraps from quality brands last 5 to 7 years in UAE conditions when properly maintained. Dubai\'s intense UV and heat can degrade cheaper calendered vinyl in 1 to 2 years. Smart Auto UAE uses only premium cast vinyl films that are UV-stabilised and engineered for high-heat environments. Proper washing (hand wash, no pressure washers directly on edges) significantly extends wrap life.',
    tags: ['wrap lifespan', 'vinyl', 'UAE heat'],
  },
  {
    id: 'wrap-damage-paint',
    category: 'wrapping',
    q: 'Does car wrapping damage the original paint?',
    a: 'No — when professionally installed and removed, car wrapping protects the factory paint and leaves it in the same condition as before wrapping. The vinyl acts as a protective layer over the paint. Damage occurs only when cheap or expired vinyl is used (adhesive can bond too strongly), or when film is removed improperly. Smart Auto UAE uses premium cast vinyl and removes wraps correctly — no paint damage.',
    tags: ['paint damage', 'removal', 'factory paint'],
  },
  {
    id: 'wrap-vs-respray',
    category: 'wrapping',
    q: 'Is car wrapping better than a respray in Dubai?',
    a: 'Car wrapping offers several advantages over respraying in the UAE: it is reversible (you can return to factory colour), faster (1 to 3 days vs 1 to 2 weeks), preserves factory paint (which maintains resale value), and costs significantly less than a quality respray. A full premium car wrap at Smart Auto UAE starts from AED 3,500. Respraying is better only when the original paint is damaged and needs repair before a colour change.',
    tags: ['wrap vs respray', 'colour change', 'cost'],
  },

  // ── MARINE ──────────────────────────────────────────────────────────────
  {
    id: 'marine-different',
    category: 'marine',
    q: 'Is marine window tinting different from car window tinting?',
    a: 'Yes. Marine films are specifically engineered for constant salt spray, high humidity, and intense sun reflection off water — conditions far more demanding than automotive use. Standard automotive films fail prematurely in marine environments due to adhesive corrosion from salt air. Smart Auto UAE installs dedicated marine-grade films from 3M and TotalGard with corrosion-resistant adhesives and UV constructions rated for maritime conditions.',
    tags: ['marine vs automotive', 'salt air', 'yacht'],
  },
  {
    id: 'marine-instruments',
    category: 'marine',
    q: 'Will marine window film interfere with GPS, radar, or VHF radio?',
    a: 'Non-metallic nano ceramic marine films do not interfere with any electronic navigation equipment — GPS, VHF radio, radar, or AIS transponders. Smart Auto UAE specifically recommends and installs non-metallic films for helm areas and any glazing near antenna equipment. We advise on the correct film type for each area of your vessel before installation.',
    tags: ['GPS', 'radar', 'VHF', 'instruments'],
  },
  {
    id: 'marine-onsite',
    category: 'marine',
    q: 'Do I need to move my boat for marine window tinting?',
    a: 'No. Smart Auto UAE provides on-site marine tinting at your berth or boatyard across Dubai and Sharjah marinas — including Dubai Marina, Palm Jumeirah Marina, Port Rashid, Dubai Harbour, and Mina Seyahi. Our team brings all equipment to you. No vessel transport is required.',
    tags: ['on-site', 'marina', 'Dubai Marina'],
  },

  // ── RESIDENTIAL ─────────────────────────────────────────────────────────
  {
    id: 'res-legal',
    category: 'residential',
    q: 'Is residential window tinting legal in Dubai?',
    a: 'Yes. Residential window tinting is completely legal in Dubai and the UAE. Unlike automotive tinting, there are no government-mandated VLT restrictions for homes, apartments, or villas. You can choose any tint level based on your privacy, heat, and aesthetic requirements.',
    tags: ['legal', 'Dubai law', 'residential'],
  },
  {
    id: 'res-energy',
    category: 'residential',
    q: 'How much can residential window tinting reduce my electricity bill in Dubai?',
    a: 'Independent studies show residential window film can reduce cooling costs by up to 30% in high-sun environments like the UAE. By rejecting up to 90% of solar heat through glass, the film significantly reduces the load on your air conditioning system. Most Dubai homeowners recover the cost of window tinting within 2 to 3 years purely through energy savings.',
    tags: ['energy saving', 'electricity bill', 'ROI'],
  },
  {
    id: 'res-dark',
    category: 'residential',
    q: 'Will home window tinting make my rooms dark?',
    a: 'No. Modern solar control films use spectrally selective technology to reject infrared heat and UV radiation while passing the majority of visible light. You can reject 70%+ of solar heat while keeping the glass looking nearly transparent. Smart Auto UAE carries a full range of VLT levels — from lightly tinted to virtually clear — so you can choose exactly the right balance of heat rejection, privacy, and natural light.',
    tags: ['dark', 'natural light', 'spectrally selective'],
  },
  {
    id: 'res-how-long',
    category: 'residential',
    q: 'How long does home window tinting take for a Dubai villa?',
    a: 'A standard 3 to 4 bedroom villa typically takes 1 to 2 days depending on the number of windows and the film type. Individual apartments are usually completed in a single day. Smart Auto UAE\'s team works efficiently with minimal disruption to your home — and leaves no mess behind.',
    tags: ['installation time', 'villa', 'apartment'],
  },

  // ── GENERAL ─────────────────────────────────────────────────────────────
  {
    id: 'general-branches',
    category: 'general',
    q: 'Where are Smart Auto UAE branches located?',
    a: 'Smart Auto UAE operates 4 branches: (1) MotorCity, Dubai — main branch, open 11AM to 9PM daily; (2) Al Quoz 4, D16 Road, Dubai — open 11AM to 9:30PM daily; (3) Uptown Mall, Mirdif, Dubai — open 11AM to 10PM daily; (4) Central Mall, Sharjah — open 10AM to 10PM daily. All branches are open every day including weekends and public holidays. Walk-ins are welcome at all locations.',
    tags: ['branches', 'locations', 'opening hours'],
  },
  {
    id: 'general-brands',
    category: 'general',
    q: 'Which brands does Smart Auto UAE use?',
    a: 'Smart Auto UAE is an officially authorised distributor and certified installer for: 3M USA (window film, PPF, safety film), TotalGard (window film, PPF, ceramic coating), Global USA (solar control window film), and Llumar (architectural and automotive film). All are genuine manufacturer products with full warranties. Smart Auto UAE does not use grey-market, imitation, or unbranded products.',
    tags: ['3M', 'TotalGard', 'Llumar', 'brands', 'authorised'],
  },
  {
    id: 'general-warranty',
    category: 'general',
    q: 'What warranty do Smart Auto UAE installations carry?',
    a: 'All Smart Auto UAE installations carry manufacturer warranties: window tinting 5 to 10 years (brand and film grade dependent), PPF 5 to 10 years, ceramic coating 2 to 5 years, car wrapping 2 to 5 years, marine films 3 to 10 years. Warranty documentation is provided at handover. Warranty claims are handled directly through Smart Auto UAE — you do not need to contact the manufacturer yourself.',
    tags: ['warranty', 'guarantee', 'documentation'],
  },
  {
    id: 'general-quote',
    category: 'general',
    q: 'How do I get a quote from Smart Auto UAE?',
    a: 'The fastest way to get a quote is to WhatsApp us at +971 56 726 9666 with your vehicle make, model, and year (for automotive services) or a brief description of your requirements (for residential, commercial, or marine). We typically provide a quote within a few hours. For complex jobs (full PPF, large villas, yachts), we offer a free on-site assessment before quoting.',
    tags: ['quote', 'estimate', 'WhatsApp'],
  },
  {
    id: 'general-mobile',
    category: 'general',
    q: 'Does Smart Auto UAE offer mobile or on-site services?',
    a: 'Yes — Smart Auto UAE offers on-site installation for residential window tinting (at your home or villa), commercial window tinting (at your office or building), and marine tinting (at your marina berth or boatyard). Automotive services (window tinting, PPF, ceramic coating, wrapping) are performed at our branches. Contact us to discuss on-site requirements for your project.',
    tags: ['mobile', 'on-site', 'home service'],
  },
  {
    id: 'general-experience',
    category: 'general',
    q: 'How long has Smart Auto UAE been in business?',
    a: 'Smart Auto UAE has been operating in Dubai since 2004 — over 20 years of experience in window tinting, PPF, ceramic coating, and surface protection. We have served over 50,000 customers across automotive, residential, commercial, and marine segments and hold over 600 verified 5-star Google reviews.',
    tags: ['experience', 'history', 'established'],
  },
]

// ─── COMPONENT ─────────────────────────────────────────────────────────────

function FaqItem({ faq, index }: { faq: typeof faqs[0]; index: number }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      variants={fadeUp} custom={index}
      initial="hidden" whileInView="show" viewport={{ once: true }}
    >
      {/* Schema-friendly — each item is a proper section */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{ border: `1px solid ${open ? 'rgba(201,168,76,0.25)' : 'rgba(255,255,255,0.06)'}`, background: open ? 'rgba(201,168,76,0.04)' : 'rgba(17,17,17,0.7)', transition: 'border-color 0.25s,background 0.25s' }}
        itemScope itemProp="mainEntity" itemType="https://schema.org/Question"
      >
        <button
          onClick={() => setOpen(!open)}
          className="w-full text-left px-7 py-5 flex items-start justify-between gap-4"
          aria-expanded={open}
        >
          <span
            className="text-white font-medium text-[15px] leading-snug"
            itemProp="name"
          >
            {faq.q}
          </span>
          <span
            className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center mt-0.5"
            style={{ background: open ? 'rgba(201,168,76,0.15)' : 'rgba(255,255,255,0.05)', color: open ? GOLD : 'rgba(255,255,255,0.3)', transition: 'all 0.25s' }}
            aria-hidden="true"
          >
            {open ? <Minus size={14} /> : <Plus size={14} />}
          </span>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="answer"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{ overflow: 'hidden' }}
              itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer"
            >
              <div
                className="px-7 pb-6"
                style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
              >
                <p
                  className="text-white/55 text-sm leading-[1.9] pt-4"
                  itemProp="text"
                >
                  {faq.a}
                </p>
                {faq.tags && (
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {faq.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-2.5 py-1 rounded-full"
                        style={{ background: 'rgba(201,168,76,0.08)', color: 'rgba(201,168,76,0.6)', border: '1px solid rgba(201,168,76,0.12)' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

// ─── PAGE ──────────────────────────────────────────────────────────────────

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState('tinting')
  const filtered = faqs.filter((f) => f.category === activeCategory)

  return (
    <>
      {/* ── JSON-LD Schema — FAQPage ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.q,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.a,
              },
            })),
          }),
        }}
      />

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
          <div className="w-full max-w-4xl mx-auto px-6 text-center">
            <motion.div variants={fadeUp} initial="hidden" animate="show">
              <p className="text-[11px] tracking-[0.3em] uppercase mb-4" style={{ color: GOLD }}>
                Window Tinting · PPF · Ceramic Coating · Wrapping · UAE
              </p>
              <h1
                className="font-bold text-white leading-[1.1] mb-5"
                style={{ fontFamily: 'var(--font-playfair),serif', fontSize: 'clamp(2.2rem,5vw,3.8rem)' }}
              >
                Frequently Asked{' '}
                <span
                  style={{
                    background: goldGrad,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Questions
                </span>
              </h1>
              <p className="text-white/50 text-base leading-[1.85] max-w-2xl mx-auto mb-8">
                Everything you need to know about window tinting laws in Dubai, PPF, ceramic coating, car wrapping, marine and residential tinting — answered by Smart Auto UAE, authorised 3M and TotalGard installer with 20+ years in the UAE.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <a
                  href="https://wa.me/971567269666"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-black"
                  style={{ background: goldGrad }}
                >
                  <MessageCircle size={15} aria-hidden="true" /> Ask on WhatsApp
                </a>
                <a
                  href="tel:+971567269666"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm border"
                  style={{ color: GOLD, borderColor: 'rgba(201,168,76,0.3)', background: 'rgba(201,168,76,0.05)' }}
                >
                  <Phone size={14} aria-hidden="true" /> Call Us
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── STATS STRIP ── */}
        <section
          className="py-8"
          style={{ backgroundColor: '#060606', borderTop: '1px solid rgba(201,168,76,0.08)', borderBottom: '1px solid rgba(201,168,76,0.08)' }}
        >
          <div className="w-full max-w-4xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {[
                { v: `${faqs.length}+`, l: 'Questions Answered' },
                { v: '7',              l: 'Service Categories' },
                { v: '20+',            l: 'Years Experience' },
                { v: '50K+',           l: 'UAE Customers Served' },
              ].map((s) => (
                <div key={s.l}>
                  <p
                    className="font-bold leading-none mb-1"
                    style={{
                      fontFamily: 'var(--font-playfair),serif',
                      fontSize: 'clamp(1.6rem,3vw,2.2rem)',
                      background: goldGrad,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {s.v}
                  </p>
                  <p className="text-white/40 text-[12px]">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CATEGORY TABS + FAQS ── */}
        <section className="py-24" style={{ background: 'linear-gradient(180deg,#080808 0%,#0A0A0A 100%)' }}>
          <div className="w-full max-w-4xl mx-auto px-6">

            {/* Category pills */}
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="flex flex-wrap gap-2 mb-12 justify-center"
              role="tablist"
              aria-label="FAQ categories"
            >
              {categories.map((cat) => {
                const count = faqs.filter((f) => f.category === cat.id).length
                const active = activeCategory === cat.id
                return (
                  <button
                    key={cat.id}
                    role="tab"
                    aria-selected={active}
                    onClick={() => setActiveCategory(cat.id)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-[13px] font-semibold transition-all"
                    style={{
                      background: active ? goldGrad : 'rgba(255,255,255,0.04)',
                      color: active ? '#000' : 'rgba(255,255,255,0.45)',
                      border: active ? 'none' : '1px solid rgba(255,255,255,0.08)',
                    }}
                  >
                    {cat.label}
                    <span
                      className="text-[10px] px-1.5 py-0.5 rounded-full font-bold"
                      style={{
                        background: active ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.06)',
                        color: active ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.3)',
                      }}
                    >
                      {count}
                    </span>
                  </button>
                )
              })}
            </motion.div>

            {/* Active category heading */}
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease }}
              className="mb-8"
            >
              <h2
                className="font-bold text-white"
                style={{ fontFamily: 'var(--font-playfair),serif', fontSize: 'clamp(1.4rem,2.5vw,2rem)' }}
              >
                {categories.find((c) => c.id === activeCategory)?.label}{' '}
                <span
                  style={{
                    background: goldGrad,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Questions
                </span>
              </h2>
              <p className="text-white/30 text-[13px] mt-1">
                {filtered.length} questions · Smart Auto UAE · Authorised 3M &amp; TotalGard Installer
              </p>
            </motion.div>

            {/* FAQ items */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-3"
                role="tabpanel"
                itemScope
                itemType="https://schema.org/FAQPage"
              >
                {filtered.map((faq, i) => (
                  <FaqItem key={faq.id} faq={faq} index={i} />
                ))}
              </motion.div>
            </AnimatePresence>

          </div>
        </section>

        {/* ── STILL HAVE QUESTIONS ── */}
        <section className="py-16" style={{ backgroundColor: '#060606' }}>
          <div className="w-full max-w-4xl mx-auto px-6">
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="relative rounded-3xl p-12 text-center overflow-hidden"
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
              <p className="text-[11px] tracking-[0.3em] uppercase mb-3 relative z-10" style={{ color: GOLD }}>
                Can&apos;t find your answer?
              </p>
              <h2
                className="font-bold text-white mb-3 relative z-10"
                style={{ fontFamily: 'var(--font-playfair),serif', fontSize: 'clamp(1.5rem,3vw,2.2rem)' }}
              >
                Ask Smart Auto UAE{' '}
                <span
                  style={{
                    background: goldGrad,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Directly
                </span>
              </h2>
              <p className="text-white/45 text-sm mb-7 max-w-md mx-auto relative z-10">
                Our team responds on WhatsApp within minutes. Send photos, describe your project, or ask anything — free consultation, no obligation.
              </p>
              <div className="flex gap-3 justify-center flex-wrap relative z-10">
                <a
                  href="https://wa.me/971567269666"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-black"
                  style={{ background: goldGrad }}
                >
                  <MessageCircle size={15} aria-hidden="true" /> WhatsApp Us Now
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm border"
                  style={{ color: GOLD, borderColor: 'rgba(201,168,76,0.3)', background: 'rgba(201,168,76,0.05)' }}
                >
                  All Contact Options <ArrowRight size={14} />
                </a>
              </div>
            </motion.div>
          </div>
        </section>
<Footer/>
      </main>
    </>
  )
}