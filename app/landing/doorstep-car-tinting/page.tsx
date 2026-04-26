"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  ShieldCheck,
  Phone,
  ArrowRight,
  CheckCircle2,
  Car,
  Sparkles,
  BadgePercent,
  Clock3,
  MessageCircle,
  Star,
  SunMedium,
  Thermometer,
  Eye,
  Lock,
  ChevronDown,
  MapPin,
  Zap,
  Home,
  Package,
} from "lucide-react";

// ─── CONFIG ────────────────────────────────────────────────────────────────────
const phoneNumber = "+971547011800";
const displayPhone = "+971 54 701 1800";
const WA_MSG = encodeURIComponent(
  "Hi, I want a quote for car window tinting at home. Please share your available packages and the 15% offer details."
);
const WA_LINK = `https://wa.me/971547011800?text=${WA_MSG}`;

// ─── TOKENS ────────────────────────────────────────────────────────────────────
const gold = "#C9A84C";
const goldSoft = "rgba(201,168,76,0.12)";
const goldBorder = "rgba(201,168,76,0.26)";
const goldGrad = "linear-gradient(135deg,#C9A84C 0%,#E7CB75 100%)";

// ─── ANIMATION ─────────────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.58, ease: [0.25, 0.1, 0.25, 1] as const } },
};

// ─── COPY ──────────────────────────────────────────────────────────────────────
const heroPoints = [
  "We come to your home, office, or building",
  "Book your free slot & get 15% off today",
  "Instant quote on WhatsApp in minutes",
  "Premium heat-rejection tint films for UAE",
];

const benefits = [
  {
    icon: Thermometer,
    title: "UAE Heat Rejection",
    desc: "Reduces cabin heat buildup significantly — one of the most effective upgrades you can make in a hot climate.",
  },
  {
    icon: SunMedium,
    title: "UV Ray Protection",
    desc: "Helps block harmful UV rays that cause interior fading, cracked dashboards, and skin exposure on long drives.",
  },
  {
    icon: Eye,
    title: "Glare Reduction",
    desc: "Reduces harsh sunlight and road glare so you can focus better, especially during morning and evening hours.",
  },
  {
    icon: Lock,
    title: "Privacy & Security",
    desc: "Darker shades increase cabin privacy, reduce visibility of valuables, and add a smarter, cleaner exterior look.",
  },
  {
    icon: Car,
    title: "Interior Protection",
    desc: "Protects your upholstery, dashboard, and trim from UV-related degradation, helping preserve resale condition.",
  },
  {
    icon: Sparkles,
    title: "Clean Premium Finish",
    desc: "Professional installation with no bubbles, clean edges, and a finish that looks right from the inside and outside.",
  },
];

const packages = [
  {
    title: "Front Windshield",
    badge: "Clear UV Shield",
    desc: "A clear or very light tint that blocks UV and infrared heat without changing the look of your vehicle.",
    items: [
      "Clear or light visible shade",
      "UV and heat rejection",
      "Reduces dashboard fading",
      "UAE road legal shade",
      "Professional edge finish",
    ],
    cta: "Get Windshield Quote",
  },
  {
    title: "Side & Rear",
    badge: "Most Popular",
    featured: true,
    desc: "Full coverage for all side windows and rear glass — the most popular package for privacy, heat, and clean aesthetics.",
    items: [
      "All side windows",
      "Rear windshield",
      "Multiple shade options",
      "Heat & UV rejection",
      "Privacy enhancement",
    ],
    cta: "Get Side & Rear Quote",
  },
  {
    title: "Full Car Package",
    badge: "Complete Coverage",
    desc: "Best value for new cars, family SUVs, or anyone wanting the full heat, UV, and privacy experience all in one job.",
    items: [
      "All windows & windshield",
      "Premium film selection",
      "Maximum heat rejection",
      "Top tint shade options",
      "Full interior protection",
    ],
    cta: "Get Full Car Quote",
  },
];

const processSteps = [
  {
    n: "01",
    title: "Message us on WhatsApp",
    desc: "Share your car model, preferred tint shade, and your location. We'll confirm availability fast.",
  },
  {
    n: "02",
    title: "Get your instant quote",
    desc: "We'll suggest the right film and package, confirm pricing with the 15% offer applied, and send a time slot.",
  },
  {
    n: "03",
    title: "Book your free home slot",
    desc: "We come to your home, villa, apartment parking, or office. No need to drop off the car.",
  },
  {
    n: "04",
    title: "Drive with better comfort",
    desc: "Your windows are tinted professionally, cured correctly, and ready for UAE roads.",
  },
];

const filmOptions = [
  { name: "Ceramic Tint", tag: "Best for Heat", desc: "Highest heat rejection, clearest signal compatibility, premium look." },
  { name: "Carbon Tint", tag: "Popular Choice", desc: "Strong heat and UV rejection without the metallic interference of older films." },
  { name: "Nano-Ceramic", tag: "Top Performance", desc: "Advanced technology for drivers who want maximum comfort and long-term durability." },
  { name: "Standard Tint", tag: "Entry Level", desc: "A practical, budget-friendly shade option for privacy and basic glare reduction." },
];

const faqs = [
  {
    q: "Do you really come to my home or office?",
    a: "Yes. Our mobile tinting service visits your home, villa, apartment parking bay, office parking, or any safe covered location in the service area.",
  },
  {
    q: "How long does window tinting take at home?",
    a: "It depends on the car size and package, but most jobs are completed within 2–4 hours at your location.",
  },
  {
    q: "What tint shades are available?",
    a: "We offer multiple shade options from clear UV film to darker privacy shades. Our team can guide you on the best legal and practical option for your vehicle.",
  },
  {
    q: "Is window tinting legal in UAE?",
    a: "Yes, with restrictions. Front windshield and front side windows have legal shade limits. Our team will guide you on compliant options for every window.",
  },
  {
    q: "How do I claim the 15% offer?",
    a: "Book your free home slot via WhatsApp while the offer is active. Once confirmed, the discount is applied to your selected package.",
  },
  {
    q: "What cars do you tint?",
    a: "All car types — sedans, SUVs, hatchbacks, trucks, and luxury vehicles. We work on both new cars and cars that need a tint refresh.",
  },
];

// ─── COMPONENTS ────────────────────────────────────────────────────────────────

function SectionHeading({
  eyebrow,
  title,
  highlight,
  desc,
}: {
  eyebrow: string;
  title: string;
  highlight?: string;
  desc?: string;
}) {
  return (
    <div className="max-w-3xl">
      <span
        className="mb-4 block text-[11px] font-semibold uppercase tracking-[0.32em]"
        style={{ color: gold }}
      >
        {eyebrow}
      </span>
      <h2
        className="font-bold leading-[1.08] text-white"
        style={{ fontFamily: "var(--font-playfair, Georgia, serif)", fontSize: "clamp(2rem,4vw,3.5rem)" }}
      >
        {title}{" "}
        {highlight && (
          <span style={{ background: goldGrad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            {highlight}
          </span>
        )}
      </h2>
      {desc && <p className="mt-5 max-w-2xl text-[15px] leading-7 text-white/55">{desc}</p>}
    </div>
  );
}

function getTimeLeft(target: Date) {
  const distance = Math.max(target.getTime() - Date.now(), 0);
  const pad = (n: number) => String(n).padStart(2, "0");
  return {
    days: pad(Math.floor(distance / 86400000)),
    hours: pad(Math.floor((distance % 86400000) / 3600000)),
    minutes: pad(Math.floor((distance % 3600000) / 60000)),
    seconds: pad(Math.floor((distance % 60000) / 1000)),
  };
}

function CountdownTimer() {
  const target = useMemo(() => new Date(Date.now() + 1000 * 60 * 60 * 23 + 1000 * 60 * 44), []);
  const [time, setTime] = useState(getTimeLeft(target));
  useEffect(() => {
    const t = setInterval(() => setTime(getTimeLeft(target)), 1000);
    return () => clearInterval(t);
  }, [target]);
  const cells = [
    { label: "Days", value: time.days },
    { label: "Hours", value: time.hours },
    { label: "Mins", value: time.minutes },
    { label: "Secs", value: time.seconds },
  ];
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
      {cells.map((cell) => (
        <div
          key={cell.label}
          className="rounded-2xl border px-4 py-5 text-center"
          style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.08)" }}
        >
          <div className="text-3xl font-bold tabular-nums text-white sm:text-4xl">{cell.value}</div>
          <div className="mt-1 text-[11px] uppercase tracking-[0.22em] text-white/40">{cell.label}</div>
        </div>
      ))}
    </div>
  );
}

function CTAButtons({ stacked = false }: { stacked?: boolean }) {
  return (
    <div className={`flex ${stacked ? "flex-col sm:flex-row" : "flex-col sm:flex-row"} flex-wrap items-center gap-4`}>
      <a
        href={WA_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold text-black transition-all hover:scale-[1.02] active:scale-95"
        style={{ background: goldGrad, boxShadow: "0 12px 32px rgba(201,168,76,0.22)" }}
      >
        <MessageCircle size={17} />
        Get Instant Quote on WhatsApp
      </a>
      <a
        href={`tel:${phoneNumber}`}
        className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full border px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/5 active:scale-95"
        style={{ borderColor: goldBorder, background: "rgba(255,255,255,0.03)" }}
      >
        <Phone size={16} />
        Book Your Free Home Slot
      </a>
    </div>
  );
}

function StickyBar() {
  return (
    <div className="fixed inset-x-0 bottom-3 z-50 px-3 md:bottom-5">
      <div
        className="mx-auto flex max-w-5xl flex-col gap-3 rounded-2xl border px-4 py-3 shadow-2xl backdrop-blur-xl md:flex-row md:items-center md:justify-between md:px-5"
        style={{ background: "rgba(8,8,8,0.9)", borderColor: "rgba(201,168,76,0.2)", boxShadow: "0 20px 60px rgba(0,0,0,0.4)" }}
      >
        <div className="flex items-start gap-3 md:items-center">
          <BadgePercent size={18} style={{ color: gold, flexShrink: 0, marginTop: 2 }} />
          <div>
            <p className="text-sm font-semibold text-white">15% Off Window Tinting at Home – Limited Slots</p>
            <p className="text-xs text-white/48">Book your free home slot today and lock in the offer.</p>
          </div>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold text-black"
            style={{ background: goldGrad }}
          >
            WhatsApp Quote <ArrowRight size={15} />
          </a>
          <a
            href={`tel:${phoneNumber}`}
            className="inline-flex min-h-[46px] items-center justify-center rounded-full border px-5 py-3 text-sm font-semibold text-white"
            style={{ borderColor: "rgba(255,255,255,0.12)" }}
          >
            Call {displayPhone}
          </a>
        </div>
      </div>
    </div>
  );
}

function FAQItem({ q, a, i }: { q: string; a: string; i: number }) {
  const [open, setOpen] = useState(i === 0);
  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { delay: i * 0.07, duration: 0.42 } } }}
      className="overflow-hidden rounded-2xl border"
      style={{ background: "rgba(255,255,255,0.02)", borderColor: open ? goldBorder : "rgba(255,255,255,0.08)" }}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
      >
        <span className="text-sm font-semibold leading-6 text-white sm:text-[15px]">{q}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }} style={{ color: gold }}>
          <ChevronDown size={18} />
        </motion.div>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.28 }}
        className="overflow-hidden"
      >
        <p className="px-5 pb-5 text-sm leading-7 text-white/55 sm:px-6">{a}</p>
      </motion.div>
    </motion.div>
  );
}

// ─── PAGE ──────────────────────────────────────────────────────────────────────

export default function WindowTintingPage() {
  const benefitsRef = useRef(null);
  const packagesRef = useRef(null);
  const processRef = useRef(null);
  const filmRef = useRef(null);
  const faqRef = useRef(null);
  const offerRef = useRef(null);

  const benefitsInView = useInView(benefitsRef, { once: true, margin: "-80px" });
  const packagesInView = useInView(packagesRef, { once: true, margin: "-80px" });
  const processInView = useInView(processRef, { once: true, margin: "-80px" });
  const filmInView = useInView(filmRef, { once: true, margin: "-80px" });
  const faqInView = useInView(faqRef, { once: true, margin: "-80px" });
  const offerInView = useInView(offerRef, { once: true, margin: "-80px" });

  return (
    <main style={{ backgroundColor: "#070707", color: "#fff" }}>
      <StickyBar />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-6 pb-20 pt-28 md:min-h-screen md:pt-36">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.18]"
          style={{ backgroundImage: "url(https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1600&q=80)" }}
        />
        <div className="absolute inset-0 bg-black/78" />
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at 70% 20%, rgba(201,168,76,0.11), transparent 38%)" }}
        />

        <div className="relative z-10 mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          {/* Left */}
          <div className="max-w-3xl">
            <div
              className="mb-7 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em]"
              style={{ background: goldSoft, borderColor: goldBorder, color: gold }}
            >
              <Home size={13} /> We Come to You – Mobile Home Tinting Service
            </div>

            <h1
              className="font-bold leading-[1.03] text-white"
              style={{ fontFamily: "var(--font-playfair, Georgia, serif)", fontSize: "clamp(2.8rem,6.5vw,5.8rem)" }}
            >
              Car Window Tinting
              <span
                className="block"
                style={{ background: goldGrad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
              >
                at Your Home or Office
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-[16px] leading-8 text-white/60 sm:text-[17px]">
              Professional window tinting installed at your door — no driving to a garage, no waiting.
              Premium heat-rejection and UV films for UAE roads. Book your free home slot and get 15% off today.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {heroPoints.map((point) => (
                <div
                  key={point}
                  className="flex items-start gap-3 rounded-2xl border px-4 py-4"
                  style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.08)" }}
                >
                  <CheckCircle2 size={18} style={{ color: gold, flexShrink: 0, marginTop: 2 }} />
                  <span className="text-sm leading-6 text-white/70">{point}</span>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <CTAButtons />
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-5 text-sm text-white/40">
              <span className="flex items-center gap-2">
                <MapPin size={14} style={{ color: gold }} /> Dubai home visits
              </span>
              <span className="flex items-center gap-2">
                <Clock3 size={14} style={{ color: gold }} /> Same-week slots available
              </span>
              <span className="flex items-center gap-2">
                <ShieldCheck size={14} style={{ color: gold }} /> Free slot booking
              </span>
            </div>
          </div>

          {/* Right card */}
          <div className="lg:pl-8">
            <div
              className="overflow-hidden rounded-[28px] border"
              style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(201,168,76,0.18)", boxShadow: "0 30px 100px rgba(0,0,0,0.4)" }}
            >
              <div className="relative h-[260px] sm:h-[300px]">
                <img
                  src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=80"
                  alt="Car window tinting being applied professionally"
                  width={1000}
                  height={600}
                  className="h-full w-full object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <p className="text-[11px] uppercase tracking-[0.26em] text-white/50">Offer Active Now</p>
                  <p className="mt-2 text-2xl font-bold text-white">15% off — book your home slot today</p>
                </div>
              </div>

              <div className="p-5 sm:p-6">
                <div className="mb-5 flex items-center gap-2 text-sm font-semibold" style={{ color: gold }}>
                  <Clock3 size={16} /> Offer countdown
                </div>
                <CountdownTimer />
                <p className="mt-5 text-sm leading-7 text-white/50">
                  Reserve your free home inspection slot now and lock in 15% off your chosen tinting package before time runs out.
                </p>
                <div className="mt-6">
                  <CTAButtons stacked />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST STRIP ──────────────────────────────────────────────── */}
      <section
        className="border-y px-6 py-5"
        style={{ borderColor: "rgba(201,168,76,0.08)", background: "rgba(201,168,76,0.04)" }}
      >
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-3 text-center text-[12px] uppercase tracking-[0.18em] text-white/50">
          <span>Mobile Home Service</span>
          <span>Free Inspection</span>
          <span>15% Offer</span>
          <span>Premium Films</span>
          <span>UAE Legal Shades</span>
          <span>Same-Week Booking</span>
        </div>
      </section>

      {/* ── WHY HOME TINTING ─────────────────────────────────────────── */}
      <section ref={offerRef} className="px-6 py-20 md:py-28" style={{ background: "#0a0a0a" }}>
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <motion.div variants={fadeUp} initial="hidden" animate={offerInView ? "show" : "hidden"}>
            <SectionHeading
              eyebrow="Why Home Service"
              title="Tinting should come to you"
              highlight="not the other way around"
              desc="Dubai driving means spending hours on the road. The last thing you need is another trip to a workshop. Our team brings professional-grade tinting equipment directly to your parking space — home, office, or building."
            />
            <div className="mt-8">
              <CTAButtons />
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={offerInView ? "show" : "hidden"}
            className="grid gap-4 sm:grid-cols-2"
          >
            {[
              ["Traditional Garage Visit",
                ["Drive to the workshop", "Wait 2–5 hours on site", "Limited appointment options", "Extra fuel cost and time lost"]],
              ["Home Tinting Service",
                ["We come to your location", "Job done while you're at home", "Flexible booking around your schedule", "No fuel cost, no time wasted"]],
            ].map(([title, items], idx) => (
              <div
                key={title as string}
                className="rounded-3xl border p-6"
                style={{
                  background: idx === 1 ? "rgba(201,168,76,0.06)" : "rgba(255,255,255,0.02)",
                  borderColor: idx === 1 ? goldBorder : "rgba(255,255,255,0.08)",
                }}
              >
                <h3 className="text-lg font-semibold text-white">{title as string}</h3>
                <div className="mt-5 space-y-3">
                  {(items as string[]).map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle2
                        size={16}
                        style={{ color: idx === 1 ? gold : "rgba(255,255,255,0.4)", marginTop: 3, flexShrink: 0 }}
                      />
                      <span className="text-sm leading-6 text-white/55">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── BENEFITS ─────────────────────────────────────────────────── */}
      <section ref={benefitsRef} className="px-6 py-20 md:py-28" style={{ background: "#070707" }}>
        <div className="mx-auto max-w-7xl">
          <motion.div variants={fadeUp} initial="hidden" animate={benefitsInView ? "show" : "hidden"} className="mb-14">
            <SectionHeading
              eyebrow="Benefits"
              title="What quality tinting actually"
              highlight="does for your car"
              desc="Window tinting is one of the most practical upgrades for driving in the UAE — less heat, less glare, better privacy, and real protection for your interior."
            />
          </motion.div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                variants={{ hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.44 } } }}
                initial="hidden"
                animate={benefitsInView ? "show" : "hidden"}
                className="rounded-3xl border p-6"
                style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.08)" }}
              >
                <b.icon size={22} style={{ color: gold }} />
                <h3 className="mt-5 text-xl font-semibold text-white">{b.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/55">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OFFER REMINDER ───────────────────────────────────────────── */}
      <section
        className="px-6 py-16"
        style={{ background: "rgba(201,168,76,0.05)", borderTop: "1px solid rgba(201,168,76,0.1)", borderBottom: "1px solid rgba(201,168,76,0.1)" }}
      >
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em]" style={{ color: gold }}>
              Offer Reminder
            </p>
            <h3 className="mt-3 text-3xl font-bold text-white" style={{ fontFamily: "var(--font-playfair, Georgia, serif)" }}>
              Book your free home slot & claim 15% off
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/52">
              The fastest way to get a price and confirm your home visit is via WhatsApp. Share your car model and we'll guide you immediately.
            </p>
          </div>
          <CTAButtons />
        </div>
      </section>

      {/* ── PACKAGES ─────────────────────────────────────────────────── */}
      <section ref={packagesRef} className="px-6 py-20 md:py-28" style={{ background: "#0a0a0a" }}>
        <div className="mx-auto max-w-7xl">
          <motion.div variants={fadeUp} initial="hidden" animate={packagesInView ? "show" : "hidden"} className="mb-14">
            <SectionHeading
              eyebrow="Packages"
              title="Choose the right tint"
              highlight="coverage for your car"
              desc="From windshield UV protection to full car tinting — we have a package to suit every car, every budget, and every preference."
            />
          </motion.div>
          <div className="grid gap-6 xl:grid-cols-3">
            {packages.map((pkg, i) => (
              <motion.div
                key={pkg.title}
                variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.45 } } }}
                initial="hidden"
                animate={packagesInView ? "show" : "hidden"}
                className="relative overflow-hidden rounded-[30px] border p-6 md:p-7"
                style={{
                  background: pkg.featured ? "rgba(201,168,76,0.06)" : "rgba(255,255,255,0.02)",
                  borderColor: pkg.featured ? goldBorder : "rgba(255,255,255,0.08)",
                  boxShadow: pkg.featured ? "0 24px 70px rgba(201,168,76,0.08)" : "none",
                }}
              >
                <div
                  className="mb-5 inline-flex rounded-full border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em]"
                  style={{ borderColor: pkg.featured ? goldBorder : "rgba(255,255,255,0.09)", color: pkg.featured ? gold : "rgba(255,255,255,0.52)" }}
                >
                  {pkg.badge}
                </div>
                <h3 className="text-2xl font-bold text-white">{pkg.title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/55">{pkg.desc}</p>
                <div className="mt-6 space-y-3">
                  {pkg.items.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle2 size={17} style={{ color: gold, marginTop: 2, flexShrink: 0 }} />
                      <span className="text-sm leading-6 text-white/65">{item}</span>
                    </div>
                  ))}
                </div>
                <div
                  className="mt-8 rounded-2xl border px-4 py-3 text-sm text-white/70"
                  style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.08)" }}
                >
                  Includes current{" "}
                  <span style={{ color: gold, fontWeight: 700 }}>15% offer</span>{" "}
                  when you book your free slot today.
                </div>
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex min-h-[50px] w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-black"
                  style={{ background: goldGrad }}
                >
                  {pkg.cta} <ArrowRight size={16} />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FILM OPTIONS ─────────────────────────────────────────────── */}
      <section ref={filmRef} className="px-6 py-20 md:py-28" style={{ background: "#070707" }}>
        <div className="mx-auto max-w-7xl">
          <motion.div variants={fadeUp} initial="hidden" animate={filmInView ? "show" : "hidden"} className="mb-14 max-w-3xl">
            <SectionHeading
              eyebrow="Film Types"
              title="Premium tint films"
              highlight="matched to your needs"
              desc="Not all window tint is the same. Film technology directly affects heat rejection, glare reduction, and how your car looks. Our team will guide you to the right film for your vehicle and driving style."
            />
          </motion.div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {filmOptions.map((film, i) => (
              <motion.div
                key={film.name}
                variants={{ hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.44 } } }}
                initial="hidden"
                animate={filmInView ? "show" : "hidden"}
                className="rounded-3xl border p-6"
                style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.08)" }}
              >
                <Package size={20} style={{ color: gold }} />
                <div className="mt-5 mb-2 inline-flex rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ borderColor: goldBorder, color: gold }}>
                  {film.tag}
                </div>
                <h3 className="mt-3 text-xl font-semibold text-white">{film.name}</h3>
                <p className="mt-3 text-sm leading-7 text-white/55">{film.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold"
              style={{ color: gold }}
            >
              Ask us which film is best for your car <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────── */}
      <section ref={processRef} className="px-6 py-20 md:py-28" style={{ background: "#0b0b0b" }}>
        <div className="mx-auto max-w-7xl">
          <motion.div variants={fadeUp} initial="hidden" animate={processInView ? "show" : "hidden"} className="mb-14 max-w-3xl">
            <SectionHeading
              eyebrow="How It Works"
              title="From WhatsApp message"
              highlight="to tinted windows at your door"
              desc="The entire process is designed to be as easy as possible. No paperwork, no long calls, no workshop visit — just a fast chat on WhatsApp and a confirmed home booking."
            />
          </motion.div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.n}
                variants={{ hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.45 } } }}
                initial="hidden"
                animate={processInView ? "show" : "hidden"}
                className="rounded-3xl border p-6"
                style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.08)" }}
              >
                <div className="text-sm font-bold" style={{ color: gold }}>{step.n}</div>
                <h3 className="mt-4 text-xl font-semibold text-white">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/55">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VISUAL SECTION ───────────────────────────────────────────── */}
      <section className="px-6 py-20 md:py-28" style={{ background: "#070707" }}>
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Visual Quality"
              title="Clean finish that looks"
              highlight="as good as it performs"
              desc="A proper tint job should be invisible to everyone except the driver — no bubbles, no peeling edges, no misaligned cuts. Our installers work with precision to ensure the film looks right inside and out."
            />
            <div className="mt-8">
              <CTAButtons />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="overflow-hidden rounded-[28px] border" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
              <img
                src="/images/car-window-tinting.webp"
                alt="Sleek tinted car window finish"
                width={900}
                height={600}
                className="h-[250px] w-full object-cover"
                loading="lazy"
              />
              <div className="p-5">
                <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">Clean Installation</p>
                <p className="mt-2 text-sm leading-7 text-white/58">No bubbles, sharp edge cuts, correct curing every time.</p>
              </div>
            </div>
            <div className="overflow-hidden rounded-[28px] border sm:mt-10" style={{ borderColor: goldBorder }}>
              <img
                src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=900&q=80"
                alt="Premium dark tint on a luxury vehicle"
                width={900}
                height={600}
                className="h-[250px] w-full object-cover"
                loading="lazy"
              />
              <div className="p-5">
                <p className="text-[11px] uppercase tracking-[0.22em]" style={{ color: gold }}>Premium Finish</p>
                <p className="mt-2 text-sm leading-7 text-white/58">Elevates the exterior look while protecting the interior.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HIGH-INTENT CTA BLOCK ────────────────────────────────────── */}
      <section
        className="px-6 py-16"
        style={{ background: "rgba(201,168,76,0.05)", borderTop: "1px solid rgba(201,168,76,0.1)", borderBottom: "1px solid rgba(201,168,76,0.1)" }}
      >
        <div
          className="mx-auto max-w-5xl rounded-[30px] border px-6 py-8 text-center sm:px-8 md:px-12 md:py-10"
          style={{ background: "rgba(255,255,255,0.03)", borderColor: goldBorder }}
        >
          <p className="text-[11px] uppercase tracking-[0.3em]" style={{ color: gold }}>Get Your Quote Now</p>
          <h3 className="mt-4 text-3xl font-bold text-white md:text-4xl" style={{ fontFamily: "var(--font-playfair, Georgia, serif)" }}>
            Tint your car windows at home — get an instant WhatsApp quote
          </h3>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/52">
            Share your car model and we'll confirm pricing, film options, and availability fast. No forms, no waiting.
          </p>
          <div className="mt-8 flex justify-center">
            <CTAButtons />
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
      <section ref={faqRef} className="px-6 py-20 md:py-28" style={{ background: "#080808" }}>
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div variants={fadeUp} initial="hidden" animate={faqInView ? "show" : "hidden"}>
            <SectionHeading
              eyebrow="FAQ"
              title="Common questions about"
              highlight="home window tinting"
              desc="Quick answers to what most customers ask before booking. If you have a question not covered here, just message us on WhatsApp."
            />
            <div
              className="mt-8 rounded-3xl border p-6"
              style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.08)" }}
            >
              <p className="text-sm font-semibold text-white">Still have questions?</p>
              <p className="mt-2 text-sm leading-7 text-white/52">
                Send your car make, model, and window preferences on WhatsApp and we'll reply fast with the right answer.
              </p>
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold" style={{ color: gold }}>
                Open WhatsApp <ArrowRight size={15} />
              </a>
            </div>
          </motion.div>
          <motion.div variants={fadeUp} initial="hidden" animate={faqInView ? "show" : "hidden"} className="space-y-3">
            {faqs.map((faq, i) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} i={i} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden px-6 pb-32 pt-20 text-center md:pb-40 md:pt-28"
        style={{ background: "#050505" }}
      >
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at center, rgba(201,168,76,0.08), transparent 42%)" }}
        />
        <div className="relative z-10 mx-auto max-w-4xl">
          <p className="text-[11px] uppercase tracking-[0.32em]" style={{ color: gold }}>
            Book Today
          </p>
          <h2
            className="mt-5 font-bold leading-[1.05] text-white"
            style={{ fontFamily: "var(--font-playfair, Georgia, serif)", fontSize: "clamp(2.2rem,5vw,4.6rem)" }}
          >
            Less heat. More privacy.
            <span
              className="block"
              style={{ background: goldGrad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
            >
              Done at your home today.
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-8 text-white/52">
            Book your free slot now, get an instant WhatsApp quote, and let our mobile tinting team come to you — wherever you are in Dubai.
          </p>
          <div className="mt-10 flex justify-center">
            <CTAButtons />
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-white/40">
            <span className="flex items-center gap-2">
              <Home size={14} style={{ color: gold }} /> Mobile home service
            </span>
            <span className="flex items-center gap-2">
              <Zap size={14} style={{ color: gold }} /> Instant WhatsApp quote
            </span>
            <span className="flex items-center gap-2">
              <Star size={14} style={{ color: gold }} /> 15% offer today
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
