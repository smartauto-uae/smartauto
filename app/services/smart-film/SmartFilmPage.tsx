import type { Metadata } from "next";
import {
  CheckCircle, ArrowRight, Phone, ChevronRight,
  Star, Shield, Sparkles, Eye, Zap, ShieldCheck,
  Clock, Award, Building2, Home, Wifi, Sun,
  Layers, Palette, Lock,
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmartfilmDemo from "@/components/SmartfilmDemo";
import SmartFilmDemo from "@/components/SmartfilmDemo";
// ── SEO METADATA ────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "SmartFilm Dubai & Sharjah | Decorative, Privacy & Safety Window Films | Smart Auto UAE",
  description:
    "SmartFilm installation in Dubai & Sharjah. Premium decorative, frosted, one-way mirror, anti-graffiti and safety window films for offices, villas, hotels and retail. Transform your glass without replacing it. 4 branches - MotorCity, Al Quoz, Mirdif & Sharjah. Free site visit.",
  keywords: [
    "smartfilm Dubai",
    "smartfilm Sharjah",
    "decorative window film Dubai",
    "frosted window film Dubai",
    "frosted glass film Dubai",
    "one way mirror film Dubai",
    "privacy window film Dubai",
    "privacy film Sharjah",
    "anti-graffiti film Dubai",
    "safety window film Dubai",
    "window film installation Dubai",
    "window film installation Sharjah",
    "decorative film office Dubai",
    "frosted film villa Dubai",
    "smartfilm UAE",
    "architectural window film Dubai",
    "window film near me Dubai",
    "window film near me Sharjah",
    "glass film Dubai",
    "office privacy film Dubai",
    "bathroom frosted film Dubai",
    "security film Dubai",
    "Smart Auto UAE smartfilm",
    "smartfilm MotorCity Dubai",
    "smartfilm Al Quoz Dubai",
    "smartfilm Mirdif Dubai",
    "smartfilm Sharjah branch",
    "film for glass Dubai",
    "window decal Dubai",
    "printed window film Dubai",
  ],
  alternates: { canonical: "https://smartautouae.ae/services/smartfilm-dubai-sharjah" },
  openGraph: {
    title: "SmartFilm Dubai & Sharjah | Decorative, Privacy & Safety Window Films | Smart Auto UAE",
    description:
      "Premium SmartFilm window films in Dubai & Sharjah. Frosted, decorative, one-way mirror, anti-graffiti & safety films for any glass surface. No replacement needed. Free site visit.",
    url: "https://smartautouae.ae/services/smartfilm-dubai-sharjah",
    siteName: "Smart Auto UAE",
    type: "website",
  },
};

// ── CONSTANTS ────────────────────────────────────────────────────────────────

const gold     = "#C9A84C";
const goldGrad = "linear-gradient(135deg,#C9A84C,#E8C96A)";
const cardBg   = "rgba(255,255,255,0.02)";
const cardBdr  = "rgba(255,255,255,0.06)";

// ── DATA ─────────────────────────────────────────────────────────────────────

const filmCategories = [
  {
    name: "Frosted & Privacy Film",
    color: "#a5b4fc",
    colorBg: "rgba(165,180,252,0.07)",
    colorBdr: "rgba(165,180,252,0.25)",
    icon: Eye,
    tagline: "Permanent privacy without replacing glass",
    desc: "Our frosted decorative films transform clear glass into elegant, diffused surfaces — providing permanent visual privacy while retaining natural light. Ideal for bathrooms, office partitions, meeting rooms, and any glass requiring a clean, professional appearance.",
    specs: ["Available in 10+ opacity levels", "Various patterns and textures", "UV blocking layer included", "Easy-clean surface coating"],
  },
  {
    name: "One-Way Mirror Film",
    color: gold,
    colorBg: "rgba(201,168,76,0.07)",
    colorBdr: "rgba(201,168,76,0.25)",
    icon: Shield,
    tagline: "Daytime privacy — full outward visibility retained",
    desc: "One-way mirror films allow clear outward visibility from inside while preventing outsiders from seeing in during daylight. A premium solution for ground-floor offices, street-facing windows, and villa facades that require privacy without sacrificing natural light or views.",
    specs: ["Works on daytime light differential", "Full outward view retained", "Solar heat rejection included", "Available in multiple VLT levels"],
  },
  {
    name: "Decorative & Printed Film",
    color: "#6ee7b7",
    colorBg: "rgba(110,231,183,0.07)",
    colorBdr: "rgba(110,231,183,0.25)",
    icon: Palette,
    tagline: "Custom branding and aesthetic glass treatments",
    desc: "Transform plain glass into a branded, artistic, or decorative feature. From custom logo prints to geometric patterns, gradient frosting, and etched-look designs — our decorative films are printed to your exact specifications and applied without replacing the glass.",
    specs: ["Full-colour digital printing", "Custom logos, patterns & gradients", "Etched and brushed metal effects", "Cut-to-shape available"],
  },
  {
    name: "Anti-Graffiti Film",
    color: "#fca5a5",
    colorBg: "rgba(252,165,165,0.07)",
    colorBdr: "rgba(252,165,165,0.25)",
    icon: Lock,
    tagline: "Sacrificial surface layer — peel and replace",
    desc: "Anti-graffiti films protect glass from scratches, paint, acid etching, and surface damage. The sacrificial clear film takes the damage — when vandalism occurs, only the film needs to be replaced, not the glass. A cost-effective, long-term solution for retail fronts, transport hubs, and public-facing buildings.",
    specs: ["Optically clear — invisible protection", "Resists scratches, paint and acid", "Peel and replace — no glass cost", "UV-stable — no yellowing"],
  },
  {
    name: "Safety & Security Film",
    color: "#fbbf24",
    colorBg: "rgba(251,191,36,0.07)",
    colorBdr: "rgba(251,191,36,0.25)",
    icon: ShieldCheck,
    tagline: "Holds shattered glass together on impact",
    desc: "Safety window films hold glass fragments together when broken — dramatically reducing injury risk from accidental impact, forced entry, or extreme weather. Our security-grade films meet international safety standards and are particularly recommended for ground-floor commercial fronts, schools, healthcare, and residential entry points.",
    specs: ["Meets EN12600 & ANSI Z97.1", "Slows forced entry attempts", "Optically clear — no visual change", "Available in 4mil, 7mil and 12mil thickness"],
  },
  {
    name: "Solar Control Film",
    color: "#f97316",
    colorBg: "rgba(249,115,22,0.07)",
    colorBdr: "rgba(249,115,22,0.25)",
    icon: Sun,
    tagline: "Heat and UV rejection for commercial buildings",
    desc: "High-performance solar control films reject up to 80% of solar heat through commercial and residential glass — reducing air conditioning loads and protecting interiors from UV fading. Available in nano-ceramic, spectrally selective, and reflective options to match any aesthetic requirement.",
    specs: ["Up to 80% solar heat rejection", "99% UV blocking", "Glare reduction up to 90%", "Spectrally selective — high clarity"],
  },
];

const applications = [
  {
    icon: Building2,
    title: "Office & Commercial Spaces",
    desc: "Privacy films for meeting rooms, boardrooms, and glass partitions. Branded decorative films for reception fronts and facades. Anti-graffiti protection for street-level retail and hospitality fronts.",
    tags: ["Meeting rooms", "Reception glass", "Partitions", "Office facades"],
  },
  {
    icon: Eye,
    title: "Retail & Showrooms",
    desc: "Create visual impact with custom branded window films, privacy during exclusive viewings, and anti-graffiti protection for high-footfall frontages. Used widely in Dubai's luxury retail and automotive showroom sector.",
    tags: ["Display windows", "Branded graphics", "Anti-graffiti", "Showroom fronts"],
  },
  {
    icon: Home,
    title: "Villas & Residences",
    desc: "Frosted films for bathroom windows, shower screens, and bedroom partitions. One-way mirror films for ground-floor windows and villa facades. Decorative patterns on staircase or feature glass.",
    tags: ["Bathroom windows", "Shower screens", "Ground-floor", "Skylights"],
  },
  {
    icon: Sparkles,
    title: "Hotels & Hospitality",
    desc: "Branded and decorative films for lobbies, restaurants, and suites. Privacy frosted films for spa and bathroom glass. Safety films for large glass facades and public areas.",
    tags: ["Lobby glass", "Suite bathrooms", "Restaurant screens", "Branded facades"],
  },
  {
    icon: Shield,
    title: "Healthcare & Education",
    desc: "Privacy films for consultation rooms and wards without heavy curtains. Safety film on large glass areas in schools, clinics, and hospitals. Anti-graffiti on external glass surfaces.",
    tags: ["Consultation rooms", "Ward glass", "School windows", "Clinics"],
  },
  {
    icon: Wifi,
    title: "Transport & Public Spaces",
    desc: "Anti-graffiti protection for bus shelters, metro stations, lifts and public glass infrastructure. Safety films for high-footfall public areas requiring impact resistance and fragment containment.",
    tags: ["Bus shelters", "Metro glass", "Lift panels", "Public buildings"],
  },
];

const benefits = [
  {
    icon: Layers,
    title: "No Glass Replacement Required",
    desc: "Every SmartFilm product is applied directly to your existing glass as a self-adhesive film. No glass cutting, no frame removal, no structural work — a clean retrofit solution that transforms your glass at a fraction of the cost of replacement.",
  },
  {
    icon: Eye,
    title: "Privacy Without Sacrificing Light",
    desc: "Frosted and decorative films block the view in while maintaining natural light transmission. One-way mirror films go further — retaining full outward visibility while preventing any inward view during daylight hours.",
  },
  {
    icon: Sun,
    title: "Solar & UV Protection Built In",
    desc: "All SmartFilm products include UV-blocking layers that protect interiors, furniture, flooring, and occupants from harmful UV-A and UV-B radiation. Solar control films additionally reduce heat penetration — lowering AC costs in UAE's climate.",
  },
  {
    icon: Palette,
    title: "Fully Customisable Aesthetics",
    desc: "From subtle frosted gradients to full-colour branded graphics, every SmartFilm product can be customised to your exact specification. Patterns, logos, opacity levels, cut-to-shape — the glass becomes a design element, not just a functional surface.",
  },
  {
    icon: ShieldCheck,
    title: "Safety & Security Enhancement",
    desc: "Safety and anti-graffiti films add a critical protective layer to otherwise vulnerable glass surfaces — without any visible change to appearance. Shattered glass stays in place, reducing injury risk and forced-entry speed.",
  },
  {
    icon: Award,
    title: "Durable, Long-Lasting Performance",
    desc: "SmartFilm products are UV-stabilised and rated for 10–15 years in UAE's extreme sun and heat. All products carry manufacturer warranties. Professional installation by Smart Auto UAE's certified team ensures edge-to-edge, bubble-free results.",
  },
];

const smartFilmVsAlternatives = [
  { aspect: "Privacy",         smartFilm: "Immediate — permanent or switchable",  replacement: "Permanent privacy only",       blinds: "Manual — blocks light entirely" },
  { aspect: "Natural Light",   smartFilm: "Retained with diffused clarity",        replacement: "Unchanged",                    blinds: "Blocked when closed" },
  { aspect: "Aesthetics",      smartFilm: "Clean, customisable, premium",          replacement: "New glass — costly",           blinds: "Bulky, collects dust" },
  { aspect: "Installation",    smartFilm: "Film retrofit — no glass removal",      replacement: "Full glass replacement",       blinds: "Fixtures & frame required" },
  { aspect: "UV Protection",   smartFilm: "99% UV block — all products",           replacement: "Depends on glass spec",        blinds: "Only when fully closed" },
  { aspect: "Safety",          smartFilm: "Safety film holds glass on impact",     replacement: "Laminated glass option only",  blinds: "None" },
  { aspect: "Branding",        smartFilm: "Full custom print to specification",    replacement: "Not applicable",               blinds: "Not applicable" },
  { aspect: "Maintenance",     smartFilm: "Wipe clean — no moving parts",          replacement: "Standard glass cleaning",      blinds: "Regular deep cleaning" },
  { aspect: "Cost",            smartFilm: "Fraction of glass replacement",         replacement: "High — full replacement",      blinds: "Low initial, ongoing wear" },
  { aspect: "Reversibility",   smartFilm: "Removable — glass undamaged",           replacement: "Permanent",                    blinds: "Removable" },
];

const process = [
  {
    num: "01",
    title: "Free Site Visit",
    desc: "Our team visits your property — office, villa, retail, or commercial space — to assess glass surfaces, discuss your privacy, aesthetic, and safety requirements, and recommend the right film for each area.",
  },
  {
    num: "02",
    title: "Film Selection",
    desc: "We present physical film samples directly on your glass so you can see exactly how each product looks in your lighting conditions before committing to an order.",
  },
  {
    num: "03",
    title: "Custom Measurement & Print",
    desc: "Every panel is precisely measured and film is cut or printed to exact dimensions — including bespoke decorative or branded designs produced to your specification.",
  },
  {
    num: "04",
    title: "Professional Installation",
    desc: "Our certified installers prepare the glass surface, apply the film panel by panel, and ensure complete, edge-to-edge, bubble-free coverage on every surface.",
  },
  {
    num: "05",
    title: "Final Inspection & Handover",
    desc: "We inspect every panel before handover, provide full care and maintenance instructions, and issue warranty documentation. Most installations are completed in a single day.",
  },
];

const faqs = [
  {
    q: "What is SmartFilm?",
    a: "SmartFilm is a range of premium self-adhesive window films that transform existing glass without replacing it. The SmartFilm range includes frosted privacy films, one-way mirror films, decorative and printed films, anti-graffiti films, safety and security films, and solar control films. Each product applies directly to your existing glass surface as a professional retrofit — giving the appearance and performance of specialist glass at a fraction of the cost.",
  },
  {
    q: "What is the difference between SmartFilm and switchable smart glass film?",
    a: "SmartFilm refers to our range of passive, always-on architectural window films — frosted, decorative, one-way mirror, anti-graffiti, safety, and solar control. These films provide permanent effects. Switchable Smart Glass Film (also called PDLC film) is a separate, electrically powered product that switches between clear and frosted on demand at the touch of a button. Both are installed by Smart Auto UAE. If you need on-demand switching, ask about our PDLC switchable smart film service.",
  },
  {
    q: "Can SmartFilm be applied to any glass?",
    a: "Yes — SmartFilm products can be applied to virtually any smooth, flat glass surface including windows, glass doors, glass partitions, shower screens, skylights, and shopfronts. Our team assesses your specific glass type during the free site visit to confirm suitability and recommend the appropriate film thickness and adhesive type.",
  },
  {
    q: "How long does SmartFilm last in Dubai's climate?",
    a: "All SmartFilm products are UV-stabilised and rated for 10–15 years in UAE's extreme heat and high UV index conditions. Unlike cheaper films that yellow, peel, or bubble over time, our products maintain their appearance and performance for the lifetime of the warranty. All installations include a manufacturer warranty.",
  },
  {
    q: "Does frosted SmartFilm provide complete privacy at night?",
    a: "Standard frosted films provide excellent daytime privacy but may reduce privacy at night when interior lights are on and the exterior is dark — as the light differential reverses. For full day-and-night privacy, we recommend higher-opacity frosted films (60%+) or our switchable PDLC smart film which provides complete opaque privacy at any time of day on demand.",
  },
  {
    q: "Can SmartFilm be customised with our company logo or branding?",
    a: "Yes — our decorative and printed film range supports full-colour digital printing to your exact specification. Logos, typography, patterns, gradient frosting, and geometric designs are all possible. We handle the design file preparation, printing, and installation. A popular solution for office reception fronts, retail windows, and branded partitions across Dubai and Sharjah.",
  },
  {
    q: "Is anti-graffiti film actually effective?",
    a: "Yes. Anti-graffiti film works as a sacrificial surface layer — the film takes the damage from scratches, paint, acid etching, or markers instead of the glass underneath. When vandalism occurs, only the film needs to be replaced at a fraction of the cost of glass replacement. The film is optically clear and invisible in normal conditions — there is no visible change to the glass appearance.",
  },
  {
    q: "Where can I get SmartFilm installed near me in Dubai or Sharjah?",
    a: "Smart Auto UAE has 4 branches across Dubai and Sharjah — MotorCity Dubai, Al Quoz Dubai, Mirdif (Uptown Mall) Dubai, and Central Mall Sharjah. We offer free on-site surveys for all SmartFilm projects. Contact us on WhatsApp or call us to book your free site visit at a time that suits you.",
  },
];

// ── FAQ COMPONENT ────────────────────────────────────────────────────────────

function FaqItem({ question, answer }: { question: string; answer: string }) {
  return (
    <details
      className="group rounded-2xl border overflow-hidden"
      style={{ border: `1px solid ${cardBdr}`, background: cardBg }}
    >
      <summary className="flex items-center justify-between px-6 py-5 cursor-pointer list-none">
        <span className="font-semibold text-[15px] pr-4" style={{ color: "#fff" }}>
          {question}
        </span>
        <span
          className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-300 group-open:rotate-45"
          style={{
            background: "rgba(201,168,76,0.1)",
            border: "1px solid rgba(201,168,76,0.2)",
            color: gold,
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </span>
      </summary>
      <div className="px-6 pb-5">
        <p className="text-[13px] leading-[1.8]" style={{ color: "rgba(255,255,255,0.45)" }}>
          {answer}
        </p>
      </div>
    </details>
  );
}

// ── PAGE ─────────────────────────────────────────────────────────────────────

export default function SmartFilmPage() {
  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: "#080808", color: "#fff", fontFamily: "var(--font-inter),sans-serif" }}>

        {/* ── HERO ──────────────────────────────────────────────────────────── */}
        <section
          className="relative overflow-hidden pt-44 pb-28"
          style={{ background: "linear-gradient(180deg,#050505 0%,#0A0A0A 100%)" }}
        >
          {/* Grid overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              opacity: 0.025,
              backgroundImage: "linear-gradient(rgba(201,168,76,1) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,1) 1px,transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
          {/* Radial glow */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] pointer-events-none"
            style={{ background: "radial-gradient(ellipse at center,rgba(201,168,76,0.07) 0%,transparent 70%)" }}
          />
          {/* Bottom fade */}
          <div
            className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
            style={{ background: "linear-gradient(to bottom,transparent,#0A0A0A)" }}
          />
          {/* Ambient image */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1800&q=80')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.06,
            }}
          />

          <div className="relative z-10 max-w-7xl mx-auto px-6">

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-[12px] mb-12" style={{ color: "rgba(255,255,255,0.3)" }}>
              <Link href="/" className="no-underline hover:text-white/60 transition-colors" style={{ color: "rgba(255,255,255,0.3)" }}>Home</Link>
              <ChevronRight size={12} />
              <Link href="/services" className="no-underline hover:text-white/60 transition-colors" style={{ color: "rgba(255,255,255,0.3)" }}>Services</Link>
              <ChevronRight size={12} />
              <span style={{ color: gold }}>SmartFilm</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

              {/* Left */}
              <div>
                <div
                  className="inline-flex items-center gap-2.5 border rounded-full px-4 py-1.5 mb-8 text-[10px] tracking-[0.3em] uppercase"
                  style={{ borderColor: "rgba(201,168,76,0.25)", background: "rgba(201,168,76,0.05)", color: gold }}
                >
                  <Star size={10} fill={gold} strokeWidth={0} />
                  Frosted · Decorative · Safety · Anti-Graffiti · Solar Control
                </div>

                <h1
                  className="font-bold leading-[1.05] mb-4"
                  style={{ fontFamily: "var(--font-playfair),serif", fontSize: "clamp(2.2rem,5vw,4rem)", color: "#fff" }}
                >
                  SmartFilm Window Films{" "}
                  <span style={{ background: goldGrad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                    in Dubai & Sharjah
                  </span>
                </h1>

                <p className="text-[13px] tracking-[0.2em] uppercase mb-6 font-medium" style={{ color: "rgba(201,168,76,0.7)" }}>
                  Transform Any Glass · No Replacement Required
                </p>

                <p
                  className="mb-8 leading-[1.9]"
                  style={{ color: "rgba(255,255,255,0.5)", fontSize: "clamp(0.9rem,1.2vw,1.05rem)" }}
                >
                  Smart Auto UAE supplies and installs the full range of{" "}
                  <strong style={{ color: "rgba(255,255,255,0.8)", fontWeight: 600 }}>SmartFilm</strong>{" "}
                  architectural window films across{" "}
                  <strong style={{ color: "rgba(255,255,255,0.8)", fontWeight: 600 }}>Dubai</strong> and{" "}
                  <strong style={{ color: "rgba(255,255,255,0.8)", fontWeight: 600 }}>Sharjah</strong> —
                  from frosted privacy and one-way mirror films, to custom decorative prints,
                  anti-graffiti protection, safety security films, and high-performance solar control.
                  Any glass. Any application. No glass replacement required.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                  {[
                    "Frosted & one-way mirror privacy",
                    "Custom decorative & printed films",
                    "Safety & anti-graffiti protection",
                    "Solar control & UV blocking",
                    "Offices, villas, hotels & retail",
                    "Film retrofit — no glass replacement",
                  ].map((f) => (
                    <div key={f} className="flex items-center gap-2.5">
                      <CheckCircle size={14} style={{ color: gold, flexShrink: 0 }} />
                      <span className="text-[13px]" style={{ color: "rgba(255,255,255,0.55)" }}>{f}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-4 flex-wrap">
                  <a
                    href="https://wa.me/971567269666"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm text-black no-underline"
                    style={{ background: goldGrad, boxShadow: "0 4px 20px rgba(201,168,76,0.3)" }}
                  >
                    Get a Free Quote <ArrowRight size={15} />
                  </a>
                  <a
                    href="tel:+971567269666"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm no-underline border"
                    style={{ borderColor: "rgba(201,168,76,0.3)", color: gold, background: "rgba(201,168,76,0.04)" }}
                  >
                    <Phone size={14} /> Call Now
                  </a>
                </div>
              </div>

              {/* Right */}
              <div className="relative hidden lg:block">
                <div
                  className="relative rounded-3xl overflow-hidden border"
                  style={{ border: "1px solid rgba(201,168,76,0.15)", height: "480px" }}
                >
                  <img
                    src="/images/smart-film.webp"
                    alt="SmartFilm window film installation Dubai Sharjah - frosted decorative safety films - Smart Auto UAE"
                    className="w-full h-full object-cover"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to top,rgba(0,0,0,0.65) 0%,transparent 60%)" }}
                  />
                  <div className="absolute bottom-6 left-6 right-6">
                    <div
                      className="flex items-center gap-3 rounded-2xl px-5 py-4 border backdrop-blur-md"
                      style={{ border: "1px solid rgba(201,168,76,0.2)", background: "rgba(0,0,0,0.75)" }}
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: "rgba(201,168,76,0.15)", color: gold }}
                      >
                        <Layers size={20} />
                      </div>
                      <div>
                        <div className="font-semibold text-[14px]" style={{ color: "#fff" }}>
                          SmartFilm Architectural Window Films
                        </div>
                        <div className="text-[11px] mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>
                          Frosted · Decorative · Safety · Anti-Graffiti · Solar Control
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating — 6 Film Types */}
                <div
                  className="absolute -top-5 -right-5 rounded-2xl px-5 py-4 border text-center"
                  style={{ background: "#0A0A0A", border: "1px solid rgba(201,168,76,0.2)", minWidth: "120px" }}
                >
                  <div
                    className="font-bold text-[22px] leading-none mb-0.5"
                    style={{ fontFamily: "var(--font-playfair),serif", background: goldGrad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
                  >
                    6
                  </div>
                  <div className="font-bold text-[11px] leading-tight mb-0.5" style={{ color: "#fff" }}>Film Types</div>
                  <div className="text-[9px] tracking-[0.1em] uppercase" style={{ color: "rgba(255,255,255,0.35)" }}>Available</div>
                </div>

                {/* Floating — 99% UV */}
                <div
                  className="absolute -bottom-5 -left-5 rounded-2xl px-5 py-4 border text-center"
                  style={{ background: "#0A0A0A", border: "1px solid rgba(201,168,76,0.2)", minWidth: "110px" }}
                >
                  <div
                    className="font-bold text-[26px] leading-none mb-0.5"
                    style={{ fontFamily: "var(--font-playfair),serif", background: goldGrad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
                  >
                    99%
                  </div>
                  <div className="font-bold text-[11px] leading-tight mb-0.5" style={{ color: "#fff" }}>UV Block</div>
                  <div className="text-[9px] tracking-[0.1em] uppercase" style={{ color: "rgba(255,255,255,0.35)" }}>All Products</div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── Demo ──────────────────────────────────────────────────────────── */}
        <SmartFilmDemo/>

        {/* ── FILM CATEGORIES ───────────────────────────────────────────────── */}
        <section className="py-24" style={{ backgroundColor: "#060606" }}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-14">
              <span className="text-[11px] tracking-[0.35em] uppercase mb-4 block" style={{ color: gold }}>
                The SmartFilm Range
              </span>
              <h2
                className="font-bold leading-snug mb-4"
                style={{ fontFamily: "var(--font-playfair),serif", fontSize: "clamp(1.8rem,3.5vw,2.8rem)", color: "#fff" }}
              >
                SmartFilm Products Available in{" "}
                <span style={{ background: goldGrad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  Dubai & Sharjah
                </span>
              </h2>
              <p className="max-w-xl mx-auto text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>
                Six specialised film types — each solving a different glass challenge. All applied as a
                retrofit to your existing glass with no replacement required.
              </p>
              <div className="w-14 h-0.5 mx-auto mt-5 rounded-full" style={{ background: goldGrad }} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filmCategories.map((film) => (
                <div
                  key={film.name}
                  className="rounded-2xl p-8 border transition-all duration-300 hover:border-[rgba(201,168,76,0.3)] hover:-translate-y-1"
                  style={{ border: `1px solid ${film.colorBdr}`, background: film.colorBg }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ background: `${film.color}15`, border: `1px solid ${film.colorBdr}`, color: film.color }}
                    >
                      <film.icon size={22} />
                    </div>
                    <div>
                      <h3
                        className="font-bold text-[15px] leading-snug"
                        style={{ fontFamily: "var(--font-playfair),serif", color: "#fff" }}
                      >
                        {film.name}
                      </h3>
                      <p className="text-[10px] mt-0.5" style={{ color: film.color, opacity: 0.8 }}>{film.tagline}</p>
                    </div>
                  </div>
                  <p className="text-[13px] leading-[1.75] mb-5" style={{ color: "rgba(255,255,255,0.5)" }}>
                    {film.desc}
                  </p>
                  <ul className="flex flex-col gap-2">
                    {film.specs.map((s) => (
                      <li key={s} className="flex items-center gap-2.5">
                        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: film.color }} />
                        <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.4)" }}>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── APPLICATIONS ──────────────────────────────────────────────────── */}
        <section className="py-24" style={{ backgroundColor: "#0A0A0A" }}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-14">
              <span className="text-[11px] tracking-[0.35em] uppercase mb-4 block" style={{ color: gold }}>
                Where We Install
              </span>
              <h2
                className="font-bold leading-snug mb-4"
                style={{ fontFamily: "var(--font-playfair),serif", fontSize: "clamp(1.8rem,3.5vw,2.8rem)", color: "#fff" }}
              >
                SmartFilm Applications in{" "}
                <span style={{ background: goldGrad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  Dubai, Sharjah and Across UAE
                </span>
              </h2>
              <p className="max-w-xl mx-auto text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>
                SmartFilm products are used across every sector — wherever glass needs privacy, protection,
                branding, safety, or better solar performance.
              </p>
              <div className="w-14 h-0.5 mx-auto mt-5 rounded-full" style={{ background: goldGrad }} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {applications.map((app) => (
                <div
                  key={app.title}
                  className="rounded-2xl p-7 border transition-all duration-300 hover:border-[rgba(201,168,76,0.3)] hover:-translate-y-1"
                  style={{ border: `1px solid ${cardBdr}`, background: cardBg }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                    style={{ background: "rgba(201,168,76,0.07)", border: "1px solid rgba(201,168,76,0.18)", color: gold }}
                  >
                    <app.icon size={20} />
                  </div>
                  <h3
                    className="font-bold text-[16px] mb-2"
                    style={{ fontFamily: "var(--font-playfair),serif", color: "#fff" }}
                  >
                    {app.title}
                  </h3>
                  <p className="text-[13px] leading-[1.7] mb-4" style={{ color: "rgba(255,255,255,0.4)" }}>
                    {app.desc}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {app.tags.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 rounded-full text-[10px] font-medium"
                        style={{ background: "rgba(201,168,76,0.07)", border: "1px solid rgba(201,168,76,0.15)", color: "rgba(255,255,255,0.5)" }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── BENEFITS ──────────────────────────────────────────────────────── */}
        <section className="py-24" style={{ backgroundColor: "#060606" }}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-[11px] tracking-[0.35em] uppercase mb-4 block" style={{ color: gold }}>
                Why Choose SmartFilm
              </span>
              <h2
                className="font-bold leading-snug mb-4"
                style={{ fontFamily: "var(--font-playfair),serif", fontSize: "clamp(1.8rem,3.5vw,2.8rem)", color: "#fff" }}
              >
                Benefits of SmartFilm in{" "}
                <span style={{ background: goldGrad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  Dubai & Sharjah
                </span>
              </h2>
              <div className="w-14 h-0.5 mx-auto mt-5 rounded-full" style={{ background: goldGrad }} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {benefits.map((b) => (
                <div
                  key={b.title}
                  className="rounded-2xl p-7 border transition-all duration-300 hover:border-[rgba(201,168,76,0.3)] hover:-translate-y-1"
                  style={{ border: `1px solid ${cardBdr}`, background: cardBg }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                    style={{ background: "rgba(201,168,76,0.07)", border: "1px solid rgba(201,168,76,0.18)", color: gold }}
                  >
                    <b.icon size={20} />
                  </div>
                  <h3 className="font-semibold text-[16px] mb-2.5" style={{ color: "#fff" }}>{b.title}</h3>
                  <p className="text-[13px] leading-[1.7]" style={{ color: "rgba(255,255,255,0.4)" }}>{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── COMPARISON TABLE ──────────────────────────────────────────────── */}
        <section className="py-24" style={{ backgroundColor: "#0A0A0A" }}>
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-14">
              <span className="text-[11px] tracking-[0.35em] uppercase mb-4 block" style={{ color: gold }}>
                How It Compares
              </span>
              <h2
                className="font-bold leading-snug mb-4"
                style={{ fontFamily: "var(--font-playfair),serif", fontSize: "clamp(1.8rem,3.5vw,2.8rem)", color: "#fff" }}
              >
                SmartFilm vs Glass Replacement vs{" "}
                <span style={{ background: goldGrad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  Blinds & Curtains
                </span>
              </h2>
              <p className="max-w-xl mx-auto text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
                Why SmartFilm outperforms traditional window treatments on every dimension that matters.
              </p>
              <div className="w-14 h-0.5 mx-auto mt-5 rounded-full" style={{ background: goldGrad }} />
            </div>

            {/* Desktop table */}
            <div className="hidden md:block rounded-2xl border overflow-hidden" style={{ border: `1px solid ${cardBdr}` }}>
              {/* Header */}
              <div
                className="grid grid-cols-4 px-6 py-4"
                style={{ background: "rgba(201,168,76,0.05)", borderBottom: `1px solid ${cardBdr}` }}
              >
                <div className="text-[11px] tracking-[0.15em] uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>Feature</div>
                <div className="text-[11px] tracking-[0.15em] uppercase text-center" style={{ color: gold }}>SmartFilm ✓</div>
                <div className="text-[11px] tracking-[0.15em] uppercase text-center" style={{ color: "rgba(255,255,255,0.3)" }}>Glass Replacement</div>
                <div className="text-[11px] tracking-[0.15em] uppercase text-center" style={{ color: "rgba(255,255,255,0.3)" }}>Blinds / Curtains</div>
              </div>
              {smartFilmVsAlternatives.map((row, i) => (
                <div
                  key={row.aspect}
                  className="grid grid-cols-4 px-6 py-4 gap-3"
                  style={{
                    borderBottom: i < smartFilmVsAlternatives.length - 1 ? `1px solid ${cardBdr}` : "none",
                    background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)",
                  }}
                >
                  <div className="text-[12px] font-semibold" style={{ color: "rgba(255,255,255,0.5)" }}>{row.aspect}</div>
                  <div className="text-[12px] text-center" style={{ color: "rgba(255,255,255,0.7)" }}>{row.smartFilm}</div>
                  <div className="text-[12px] text-center" style={{ color: "rgba(255,255,255,0.35)" }}>{row.replacement}</div>
                  <div className="text-[12px] text-center" style={{ color: "rgba(255,255,255,0.35)" }}>{row.blinds}</div>
                </div>
              ))}
            </div>

            {/* Mobile cards */}
            <div className="flex flex-col gap-3 md:hidden">
              {smartFilmVsAlternatives.map((row) => (
                <div
                  key={row.aspect}
                  className="rounded-2xl p-5 border"
                  style={{ border: `1px solid ${cardBdr}`, background: cardBg }}
                >
                  <p className="text-[11px] tracking-[0.1em] uppercase mb-3" style={{ color: gold }}>{row.aspect}</p>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-start gap-2">
                      <span className="text-[10px] w-28 flex-shrink-0" style={{ color: "rgba(255,255,255,0.3)" }}>SmartFilm</span>
                      <span className="text-[12px]" style={{ color: "rgba(255,255,255,0.7)" }}>{row.smartFilm}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-[10px] w-28 flex-shrink-0" style={{ color: "rgba(255,255,255,0.3)" }}>Replacement</span>
                      <span className="text-[12px]" style={{ color: "rgba(255,255,255,0.35)" }}>{row.replacement}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-[10px] w-28 flex-shrink-0" style={{ color: "rgba(255,255,255,0.3)" }}>Blinds</span>
                      <span className="text-[12px]" style={{ color: "rgba(255,255,255,0.35)" }}>{row.blinds}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROCESS ───────────────────────────────────────────────────────── */}
        <section className="py-24" style={{ backgroundColor: "#060606" }}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-[11px] tracking-[0.35em] uppercase mb-4 block" style={{ color: gold }}>
                How It Works
              </span>
              <h2
                className="font-bold leading-snug mb-4"
                style={{ fontFamily: "var(--font-playfair),serif", fontSize: "clamp(1.8rem,3.5vw,2.8rem)", color: "#fff" }}
              >
                Our SmartFilm{" "}
                <span style={{ background: goldGrad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  Installation Process
                </span>
              </h2>
              <div className="w-14 h-0.5 mx-auto mt-5 rounded-full" style={{ background: goldGrad }} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 relative">
              <div
                className="absolute top-10 left-[5%] w-[90%] h-px pointer-events-none hidden lg:block"
                style={{ background: "linear-gradient(to right,transparent,rgba(201,168,76,0.2),transparent)" }}
              />
              {process.map((step) => (
                <div
                  key={step.num}
                  className="rounded-2xl p-7 border text-center transition-all duration-300 hover:border-[rgba(201,168,76,0.3)] hover:-translate-y-1"
                  style={{ border: `1px solid ${cardBdr}`, background: cardBg }}
                >
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-[16px]"
                    style={{ fontFamily: "var(--font-playfair),serif", background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.25)", color: gold }}
                  >
                    {step.num}
                  </div>
                  <h3 className="font-semibold text-[14px] mb-2" style={{ color: "#fff" }}>{step.title}</h3>
                  <p className="text-[12px] leading-[1.7]" style={{ color: "rgba(255,255,255,0.4)" }}>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY SMART AUTO ────────────────────────────────────────────────── */}
        <section className="py-24" style={{ backgroundColor: "#0A0A0A" }}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

              <div
                className="relative rounded-3xl overflow-hidden border order-2 lg:order-1"
                style={{ border: "1px solid rgba(201,168,76,0.12)", height: "495px" }}
              >
                <img
                  src="/images/smartfilm-install.webp"
                  alt="Smart Auto UAE - SmartFilm window film installation near me Dubai Sharjah"
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to right,rgba(0,0,0,0.4) 0%,transparent 70%)" }}
                />
                <div className="absolute bottom-6 left-6 flex gap-3">
                  {[
                    { val: "20+",  label: "Yrs Exp." },
                    { val: "4",    label: "Branches" },
                    { val: "600+", label: "Reviews" },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="rounded-xl px-4 py-3 text-center border backdrop-blur-md"
                      style={{ background: "rgba(0,0,0,0.8)", border: "1px solid rgba(201,168,76,0.2)" }}
                    >
                      <div
                        className="font-bold text-[20px] leading-none mb-0.5"
                        style={{ fontFamily: "var(--font-playfair),serif", background: goldGrad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
                      >
                        {s.val}
                      </div>
                                            <div className="text-[9px] tracking-[0.1em] uppercase" style={{ color: "rgba(255,255,255,0.4)" }}>
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right — text */}
              <div className="order-1 lg:order-2">
                <span className="text-[11px] tracking-[0.35em] uppercase mb-4 block" style={{ color: gold }}>
                  Why Smart Auto UAE
                </span>
                <h2
                  className="font-bold leading-snug mb-6"
                  style={{ fontFamily: "var(--font-playfair),serif", fontSize: "clamp(1.8rem,3.5vw,2.8rem)", color: "#fff" }}
                >
                  Dubai & Sharjah's Trusted{" "}
                  <span style={{ background: goldGrad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                    SmartFilm Specialists
                  </span>
                </h2>
                <p className="text-[13px] leading-[1.85] mb-8" style={{ color: "rgba(255,255,255,0.45)" }}>
                  Smart Auto UAE has been installing architectural window films across Dubai and Sharjah for
                  over 20 years. We are Applicators for SmartFilm, 3M, TotalGard, and Llumar —
                  using only genuine manufacturer products backed by full warranties. Our certified installation
                  team handles everything from the free site visit to final handover, with no subcontracting.
                </p>
                <div className="flex flex-col gap-4 mb-8">
                  {[
                    {
                      title: "Free Site Visit — No Obligation",
                      body: "We visit your property, assess every glass surface, and present honest recommendations with physical samples on your actual glass.",
                    },
                    {
                      title: "Authorised SmartFilm Installer",
                      body: "Smart Auto UAE is an Applicator and installer for SmartFilm, 3M, TotalGard, and Llumar. All products are genuine — never grey market.",
                    },
                    {
                      title: "Manufacturer Warranty on All Products",
                      body: "Every SmartFilm installation carries a 5–15 year manufacturer warranty depending on product type. Full documentation provided at handover.",
                    },
                    {
                      title: "4 Branches — Dubai & Sharjah",
                      body: "MotorCity, Al Quoz, Mirdif (Uptown Mall), and Central Mall Sharjah. Same-day quotations available after site survey.",
                    },
                  ].map((item) => (
                    <div key={item.title} className="flex items-start gap-4">
                      <div
                        className="w-1 h-full min-h-[40px] rounded-full flex-shrink-0 mt-1"
                        style={{ background: goldGrad, width: 3 }}
                      />
                      <div>
                        <h3 className="font-semibold text-[14px] mb-1" style={{ color: "#fff" }}>{item.title}</h3>
                        <p className="text-[13px] leading-[1.6]" style={{ color: "rgba(255,255,255,0.4)" }}>{item.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-4 flex-wrap">
                  <a
                    href="https://wa.me/971567269666"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm text-black no-underline"
                    style={{ background: goldGrad, boxShadow: "0 4px 20px rgba(201,168,76,0.3)" }}
                  >
                    Book Free Site Visit <ArrowRight size={15} />
                  </a>
                  <a
                    href="tel:+971567269666"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm no-underline border"
                    style={{ borderColor: "rgba(201,168,76,0.3)", color: gold, background: "rgba(201,168,76,0.04)" }}
                  >
                    <Phone size={14} /> +971 56 726 9666
                  </a>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── BRANCHES ──────────────────────────────────────────────────────── */}
<section className="py-24" style={{ backgroundColor: "#060606" }}>
  <div className="max-w-7xl mx-auto px-6">
    <div className="text-center mb-14">
      <span className="text-[11px] tracking-[0.35em] uppercase mb-4 block" style={{ color: gold }}>
        Find Us
      </span>
      <h2
        className="font-bold leading-snug mb-4"
        style={{ fontFamily: "var(--font-playfair),serif", fontSize: "clamp(1.8rem,3.5vw,2.8rem)", color: "#fff" }}
      >
        SmartFilm Near Me —{" "}
        <span style={{ background: goldGrad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          4 Branches in UAE
        </span>
      </h2>
      <p className="max-w-xl mx-auto text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
        Walk in or book a free site visit at your nearest Smart Auto UAE branch in Dubai or Sharjah.
      </p>
      <div className="w-14 h-0.5 mx-auto mt-5 rounded-full" style={{ background: goldGrad }} />
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {[
        {
          name: "MotorCity",
          city: "Dubai",
          address: "MotorCity, Dubai",
          hours: "Sun–Thu 11AM–9PM\nFri–Sat 11AM–9:30PM",
          maps: "https://maps.google.com/?q=Smart+Auto+UAE+MotorCity+Dubai",
        },
        {
          name: "Al Quoz",
          city: "Dubai",
          address: "Al Quoz Industrial Area 4, D16 Road, Dubai",
          hours: "Sat–Thu 11AM–9:30PM\nFri 2PM–9:30PM",
          maps: "https://maps.google.com/?q=Smart+Auto+UAE+Al+Quoz+Dubai",
        },
        {
          name: "Mirdif — Uptown Mall",
          city: "Dubai",
          address: "Uptown Mall, Mirdif, Dubai",
          hours: "Daily 11AM–10PM",
          maps: "https://maps.google.com/?q=Smart+Auto+UAE+Mirdif+Uptown+Mall+Dubai",
        },
        {
          name: "Central Mall",
          city: "Sharjah",
          address: "Central Mall, Sharjah",
          hours: "Daily 10AM–10PM",
          maps: "https://maps.google.com/?q=Smart+Auto+UAE+Central+Mall+Sharjah",
        },
      ].map((branch) => (
        <div
          key={branch.name}
          className="rounded-2xl p-7 border flex flex-col gap-4 transition-all duration-300 hover:border-[rgba(201,168,76,0.3)] hover:-translate-y-1"
          style={{ border: `1px solid ${cardBdr}`, background: cardBg }}
        >
          {/* City badge */}
          <span
            className="self-start px-3 py-1 rounded-full text-[10px] font-semibold tracking-[0.1em] uppercase"
            style={{ background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.2)", color: gold }}
          >
            {branch.city}
          </span>

          {/* Name */}
          <div>
            <h3
              className="font-bold text-[16px] mb-1"
              style={{ fontFamily: "var(--font-playfair),serif", color: "#fff" }}
            >
              {branch.name}
            </h3>
            <p className="text-[12px] leading-[1.6]" style={{ color: "rgba(255,255,255,0.35)" }}>
              {branch.address}
            </p>
          </div>

          {/* Hours */}
          <div className="flex items-start gap-2.5">
            <Clock size={13} style={{ color: gold, flexShrink: 0, marginTop: 1 }} />
            <p className="text-[12px] leading-[1.7] whitespace-pre-line" style={{ color: "rgba(255,255,255,0.4)" }}>
              {branch.hours}
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-2 mt-auto pt-2">
            <a
              href={`tel:+971567269666`}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-[12px] font-semibold no-underline border transition-all"
              style={{ borderColor: "rgba(201,168,76,0.2)", color: gold, background: "rgba(201,168,76,0.05)" }}
            >
              <Phone size={12} /> Call
            </a>
            <a
              href={branch.maps}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-[12px] font-semibold no-underline border transition-all"
              style={{ borderColor: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)", background: "rgba(255,255,255,0.02)" }}
            >
              Directions ›
            </a>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
        {/* ── CTA BANNER ────────────────────────────────────────────────────── */}
        <section className="py-24" style={{ backgroundColor: "#060606" }}>
          <div className="max-w-7xl mx-auto px-6">
            <div
              className="relative rounded-3xl overflow-hidden px-10 py-16 md:py-20 text-center"
              style={{ border: "1px solid rgba(201,168,76,0.2)", background: "linear-gradient(135deg,rgba(201,168,76,0.08) 0%,rgba(201,168,76,0.03) 50%,rgba(201,168,76,0.07) 100%)" }}
            >
              {/* Radial glow */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: "radial-gradient(ellipse at center,rgba(201,168,76,0.06) 0%,transparent 65%)" }}
              />
              {/* Grid */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  opacity: 0.018,
                  backgroundImage: "linear-gradient(rgba(201,168,76,1) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,1) 1px,transparent 1px)",
                  backgroundSize: "48px 48px",
                }}
              />

              <div className="relative z-10">
                <div
                  className="inline-flex items-center gap-2.5 border rounded-full px-4 py-1.5 mb-6 text-[10px] tracking-[0.3em] uppercase"
                  style={{ borderColor: "rgba(201,168,76,0.25)", background: "rgba(201,168,76,0.05)", color: gold }}
                >
                  <Star size={10} fill={gold} strokeWidth={0} />
                  Free Site Visit · Same-Day Quotation · 4 Branches · Dubai & Sharjah
                </div>

                <h2
                  className="font-bold leading-[1.1] mb-4"
                  style={{ fontFamily: "var(--font-playfair),serif", fontSize: "clamp(2rem,4vw,3.2rem)", color: "#fff" }}
                >
                  Ready to Transform Your Glass{" "}
                  <span style={{ background: goldGrad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                    with SmartFilm?
                  </span>
                </h2>

                <p
                  className="mb-8 max-w-xl mx-auto leading-[1.8]"
                  style={{ color: "rgba(255,255,255,0.45)", fontSize: "clamp(0.875rem,1.1vw,1rem)" }}
                >
                  Book a free site visit today. Our team comes to you, assesses every glass surface,
                  shows you physical film samples in your own lighting, and provides a same-day
                  itemised quote — with no obligation to proceed.
                </p>

                <div className="flex items-center justify-center gap-4 flex-wrap">
                  <a
                    href="https://wa.me/971567269666"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-bold text-sm text-black no-underline"
                    style={{ background: goldGrad, boxShadow: "0 4px 28px rgba(201,168,76,0.35)" }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Book Free Site Visit on WhatsApp
                    <ArrowRight size={15} />
                  </a>
                  <a
                    href="tel:+971567269666"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-sm no-underline border"
                    style={{ borderColor: "rgba(201,168,76,0.3)", color: gold, background: "rgba(201,168,76,0.04)" }}
                  >
                    <Phone size={14} /> +971 56 726 9666
                  </a>
                </div>

                {/* Trust indicators */}
                <div
                  className="flex items-center justify-center gap-6 flex-wrap mt-10 pt-8"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
                >
                  {[
                    { icon: Clock,    label: "Free site visit" },
                    { icon: Award,    label: "Applicator" },
                    { icon: Shield,   label: "Manufacturer warranty" },
                    { icon: Star,     label: "600+ five-star reviews" },
                  ].map((t) => (
                    <div key={t.label} className="flex items-center gap-2">
                      <t.icon size={13} style={{ color: gold, flexShrink: 0 }} />
                      <span className="text-[12px]" style={{ color: "rgba(255,255,255,0.4)" }}>{t.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}