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
  Shield,
  SunMedium,
  BadgePercent,
  Clock3,
  MessageCircle,
  Star,
  Layers3,
  Droplets,
  Zap,
  Gem,
  ChevronDown,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const gold = "#C9A84C";
const goldSoft = "rgba(201,168,76,0.14)";
const goldBorder = "rgba(201,168,76,0.28)";
const goldGrad = "linear-gradient(135deg,#C9A84C 0%,#E7CB75 100%)";
const phoneNumber = "+971547011800";
const displayPhone = "+971 54 701 1800";
const WA_MSG = encodeURIComponent(
  "Hi, I want a quote for Paint Protection Film (PPF). Please share package options and the current 15% offer."
);
const WA_LINK = `https://wa.me/971547011800?text=${WA_MSG}`;

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

const heroPoints = [
  "15% off when you book your free slot today",
  "Instant quote on WhatsApp in minutes",
  "Premium self-healing PPF for UAE roads",
  "Same-week booking available",
];

const benefits = [
  {
    icon: Shield,
    title: "Stone Chip Protection",
    desc: "Protects vulnerable front-end paintwork from highway debris, gravel, and daily driving damage.",
  },
  {
    icon: Sparkles,
    title: "Self-Healing Finish",
    desc: "Minor swirl marks and light surface scratches fade away with heat, helping your car stay cleaner-looking.",
  },
  {
    icon: SunMedium,
    title: "UV & Stain Resistance",
    desc: "Helps reduce fading, oxidation, bug stains, and harsh contamination caused by UAE weather and roads.",
  },
  {
    icon: Gem,
    title: "Preserves Resale Value",
    desc: "Keeps the original paint in better condition so your vehicle stays more desirable over time.",
  },
  {
    icon: Droplets,
    title: "Easy Maintenance",
    desc: "Makes washing and upkeep easier by creating a durable protective surface over your paint.",
  },
  {
    icon: Layers3,
    title: "Invisible Protection",
    desc: "High-clarity film protects your vehicle while maintaining the factory look and gloss you want.",
  },
];

const packages = [
  {
    title: "Partial Front",
    badge: "Entry Protection",
    desc: "A practical option for daily drivers who want protection on the most exposed impact zones.",
    items: [
      "Front bumper",
      "Partial bonnet",
      "Partial fenders",
      "Side mirrors",
      "High-impact edges",
    ],
    cta: "Get Partial Front Quote",
  },
  {
    title: "Full Front",
    badge: "Most Popular",
    featured: true,
    desc: "Our best-value package for drivers who want serious front-end protection without going full body.",
    items: [
      "Full bonnet",
      "Full bumper",
      "Full fenders",
      "Headlights",
      "Mirrors & front impact zones",
    ],
    cta: "Get Full Front Quote",
  },
  {
    title: "Full Body PPF",
    badge: "Maximum Protection",
    desc: "The premium choice for luxury, sports, and brand-new vehicles that deserve complete coverage.",
    items: [
      "Complete body coverage",
      "Doors, quarter panels & pillars",
      "Bonnet, bumper & fenders",
      "High-contact areas",
      "Best long-term protection",
    ],
    cta: "Get Full Body Quote",
  },
];

const processSteps = [
  {
    n: "01",
    title: "Send your car details",
    desc: "Share your make, model, year, and preferred PPF coverage on WhatsApp.",
  },
  {
    n: "02",
    title: "Get an instant quote",
    desc: "We recommend the right package, explain the offer, and confirm slot availability.",
  },
  {
    n: "03",
    title: "Book your free slot",
    desc: "Lock your inspection slot and secure your 15% offer before it expires.",
  },
  {
    n: "04",
    title: "Drive protected",
    desc: "Our team installs your PPF with precision so your paint stays protected on UAE roads.",
  },
];

const faqs = [
  {
    q: "What is paint protection film?",
    a: "Paint Protection Film is a clear, durable polyurethane film applied over painted surfaces to help protect against stone chips, scratches, swirl marks, and road damage.",
  },
  {
    q: "How long does PPF last?",
    a: "It depends on the film, coverage area, driving conditions, and maintenance, but premium PPF is designed for long-term protection and daily use.",
  },
  {
    q: "Is PPF visible on the car?",
    a: "No, when installed properly it is designed to be optically clear and maintain the original look of your paintwork.",
  },
  {
    q: "Can I get PPF only on the front?",
    a: "Yes. Partial Front and Full Front packages are popular options for drivers who want to protect the most exposed areas first.",
  },
  {
    q: "How do I claim the 15% offer?",
    a: "Book your free slot while the offer is active. Once your slot is confirmed, the offer can be applied to your selected package.",
  },
  {
    q: "How do I get a quote quickly?",
    a: "The fastest way is through WhatsApp. Send your car details and the package you want, and our team can guide you immediately.",
  },
];

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
        className="text-white font-bold leading-[1.08]"
        style={{
          fontFamily: "var(--font-playfair),serif",
          fontSize: "clamp(2rem,4vw,3.6rem)",
        }}
      >
        {title}{" "}
        {highlight ? (
          <span
            style={{
              background: goldGrad,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {highlight}
          </span>
        ) : null}
      </h2>
      {desc ? (
        <p className="mt-5 max-w-2xl text-[15px] leading-7 text-white/55">
          {desc}
        </p>
      ) : null}
    </div>
  );
}

function CountdownTimer() {
  const target = useMemo(
    () => new Date(Date.now() + 1000 * 60 * 60 * 26 + 1000 * 60 * 17),
    []
  );
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(target));

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft(target)), 1000);
    return () => clearInterval(timer);
  }, [target]);

  const cells = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
      {cells.map((cell) => (
        <div
          key={cell.label}
          className="rounded-2xl border px-4 py-5 text-center"
          style={{
            background: "rgba(255,255,255,0.03)",
            borderColor: "rgba(255,255,255,0.08)",
          }}
        >
          <div className="text-3xl font-bold tabular-nums text-white sm:text-4xl">
            {cell.value}
          </div>
          <div className="mt-1 text-[11px] uppercase tracking-[0.22em] text-white/45">
            {cell.label}
          </div>
        </div>
      ))}
    </div>
  );
}

function getTimeLeft(target: Date) {
  const now = new Date().getTime();
  const distance = Math.max(target.getTime() - now, 0);
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  return {
    days: String(days).padStart(2, "0"),
    hours: String(hours).padStart(2, "0"),
    minutes: String(minutes).padStart(2, "0"),
    seconds: String(seconds).padStart(2, "0"),
  };
}

function CTAButtons({ stacked = false }: { stacked?: boolean }) {
  return (
    <div
      className={`flex ${
        stacked ? "flex-col sm:flex-row" : "flex-col sm:flex-row"
      } items-center gap-4 flex-wrap`}
    >
      <a
        href={WA_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold text-black transition-all hover:scale-[1.02] active:scale-95"
        style={{
          background: goldGrad,
          boxShadow: "0 12px 32px rgba(201,168,76,0.22)",
        }}
      >
        <MessageCircle size={17} />
        Get Instant Quote on WhatsApp
      </a>

      <a
        href={`tel:${phoneNumber}`}
        className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full border px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/5 active:scale-95"
        style={{
          borderColor: goldBorder,
          background: "rgba(255,255,255,0.03)",
        }}
      >
        <Phone size={16} />
        Book Your Free Slot Now
      </a>
    </div>
  );
}

function StickyOfferBar() {
  return (
    <div className="fixed inset-x-0 bottom-3 z-50 px-3 md:bottom-5">
      <div
        className="mx-auto flex max-w-5xl flex-col gap-3 rounded-2xl border px-4 py-3 shadow-2xl backdrop-blur-xl md:flex-row md:items-center md:justify-between md:px-5"
        style={{
          background: "rgba(10,10,10,0.88)",
          borderColor: "rgba(201,168,76,0.2)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
        }}
      >
        <div className="flex items-start gap-3 md:items-center">
          <div className="mt-0.5 md:mt-0" style={{ color: gold }}>
            <BadgePercent size={18} />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">
              15% Off Premium PPF – Limited Slots Available
            </p>
            <p className="text-xs text-white/50">
              Book your free slot today and claim the live offer before it ends.
            </p>
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
      variants={{
        hidden: { opacity: 0, y: 18 },
        show: {
          opacity: 1,
          y: 0,
          transition: { delay: i * 0.08, duration: 0.45 },
        },
      }}
      className="overflow-hidden rounded-2xl border"
      style={{
        background: "rgba(255,255,255,0.02)",
        borderColor: open ? goldBorder : "rgba(255,255,255,0.08)",
      }}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
      >
        <span className="text-sm font-semibold leading-6 text-white sm:text-[15px]">
          {q}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          style={{ color: gold }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </button>

      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.28 }}
        className="overflow-hidden"
      >
        <p className="px-5 pb-5 text-sm leading-7 text-white/55 sm:px-6">
          {a}
        </p>
      </motion.div>
    </motion.div>
  );
}

export default function PPFLandingPage() {
  const benefitsRef = useRef(null);
  const offerRef = useRef(null);
  const packagesRef = useRef(null);
  const processRef = useRef(null);
  const faqRef = useRef(null);

  const benefitsInView = useInView(benefitsRef, {
    once: true,
    margin: "-80px",
  });
  const offerInView = useInView(offerRef, { once: true, margin: "-80px" });
  const packagesInView = useInView(packagesRef, {
    once: true,
    margin: "-80px",
  });
  const processInView = useInView(processRef, {
    once: true,
    margin: "-80px",
  });
  const faqInView = useInView(faqRef, { once: true, margin: "-80px" });

  return (
    <main style={{ backgroundColor: "#070707", color: "#fff" }}>
      <Navbar />
      <StickyOfferBar />

      <section className="relative overflow-hidden px-6 pb-20 pt-28 md:min-h-screen md:pt-36">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.16]"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80)",
          }}
        />
        <div className="absolute inset-0 bg-black/75" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at top right, rgba(201,168,76,0.12), transparent 34%)",
          }}
        />

        <div className="relative z-10 mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="max-w-3xl">
            <div
              className="mb-7 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.25em]"
              style={{
                background: goldSoft,
                borderColor: goldBorder,
                color: gold,
              }}
            >
              <BadgePercent size={13} /> Limited-Time 15% PPF Offer
            </div>

            <h1
              className="text-white font-bold leading-[1.02]"
              style={{
                fontFamily: "var(--font-playfair),serif",
                fontSize: "clamp(2.8rem,6.8vw,6rem)",
              }}
            >
              Paint Protection Film
              <span
                className="block"
                style={{
                  background: goldGrad,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Save 15% When You Book Today
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-[16px] leading-8 text-white/62 sm:text-[17px]">
              Protect your car from stone chips, scratches, swirl marks, and
              harsh UAE road damage with premium self-healing PPF. Book your
              free slot now and get an instant quote on WhatsApp.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {heroPoints.map((point) => (
                <div
                  key={point}
                  className="flex items-start gap-3 rounded-2xl border px-4 py-4"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    borderColor: "rgba(255,255,255,0.08)",
                  }}
                >
                  <CheckCircle2
                    size={18}
                    style={{ color: gold, flexShrink: 0, marginTop: 2 }}
                  />
                  <span className="text-sm leading-6 text-white/72">
                    {point}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <CTAButtons />
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-5 text-sm text-white/45">
              <div className="flex items-center gap-2">
                <Star size={14} style={{ color: gold }} /> Premium self-healing
                film
              </div>
              <div className="flex items-center gap-2">
                <Clock3 size={14} style={{ color: gold }} /> Same-week booking
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={14} style={{ color: gold }} /> Free slot
                reservation
              </div>
            </div>
          </div>

          <div className="lg:pl-8">
            <div
              className="overflow-hidden rounded-[28px] border"
              style={{
                background: "rgba(255,255,255,0.04)",
                borderColor: "rgba(201,168,76,0.18)",
                boxShadow: "0 30px 100px rgba(0,0,0,0.35)",
              }}
            >
              <div className="relative h-[260px] sm:h-[320px]">
                <img
                  src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80"
                  alt="Luxury car with glossy protected paint finish"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-3">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.26em] text-white/55">
                      Offer Active Now
                    </p>
                    <p className="mt-2 text-2xl font-bold text-white">
                      Book your free slot & lock in 15% off
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5 sm:p-6">
                <div
                  className="mb-5 flex items-center gap-2 text-sm font-semibold"
                  style={{ color: gold }}
                >
                  <Clock3 size={16} /> Limited-time countdown
                </div>
                <CountdownTimer />
                <p className="mt-5 text-sm leading-7 text-white/55">
                  Reserve your free inspection slot before the timer ends and
                  claim the current PPF offer for your selected package.
                </p>
                <div className="mt-6">
                  <CTAButtons stacked />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="border-y px-6 py-5"
        style={{
          borderColor: "rgba(201,168,76,0.08)",
          background: "rgba(201,168,76,0.04)",
        }}
      >
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-3 text-center text-[12px] uppercase tracking-[0.18em] text-white/55">
          <span>Free Inspection</span>
          <span>Premium PPF</span>
          <span>Instant WhatsApp Quote</span>
          <span>15% Offer</span>
          <span>Dubai Service</span>
          <span>Same-Week Availability</span>
        </div>
      </section>

      <section
        ref={offerRef}
        className="px-6 py-20 md:py-28"
        style={{ background: "#0a0a0a" }}
      >
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={offerInView ? "show" : "hidden"}
          >
            <SectionHeading
              eyebrow="Why It Matters"
              title="UAE roads can damage"
              highlight="your paint faster than you think"
              desc="Highway debris, sand, harsh sunlight, parking scratches, and regular wash damage slowly wear down factory paint. PPF adds a durable, high-clarity barrier where it matters most."
            />
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={offerInView ? "show" : "hidden"}
            className="grid gap-4 sm:grid-cols-2"
          >
            {[
              [
                "Without PPF",
                [
                  "Stone chips on bumpers and bonnets",
                  "Visible scratches and swirl marks",
                  "Paint loses freshness over time",
                  "Higher repaint and correction costs",
                ],
              ],
              [
                "With Premium PPF",
                [
                  "Impact-prone areas stay protected",
                  "Self-healing surface helps reduce marks",
                  "Gloss and paint depth stay preserved",
                  "Better long-term ownership value",
                ],
              ],
            ].map(([title, items], idx) => (
              <div
                key={title as string}
                className="rounded-3xl border p-6"
                style={{
                  background:
                    idx === 1
                      ? "rgba(201,168,76,0.06)"
                      : "rgba(255,255,255,0.02)",
                  borderColor:
                    idx === 1 ? goldBorder : "rgba(255,255,255,0.08)",
                }}
              >
                <h3 className="text-lg font-semibold text-white">
                  {title as string}
                </h3>
                <div className="mt-5 space-y-3">
                  {(items as string[]).map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle2
                        size={16}
                        style={{
                          color:
                            idx === 1 ? gold : "rgba(255,255,255,0.45)",
                          marginTop: 3,
                          flexShrink: 0,
                        }}
                      />
                      <span className="text-sm leading-6 text-white/58">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section
        ref={benefitsRef}
        className="px-6 py-20 md:py-28"
        style={{ background: "linear-gradient(180deg,#070707 0%,#0b0b0b 100%)" }}
      >
        <div className="mx-auto max-w-7xl">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={benefitsInView ? "show" : "hidden"}
            className="mb-14 max-w-3xl"
          >
            <SectionHeading
              eyebrow="Benefits"
              title="More than a film"
              highlight="it is long-term paint defence"
              desc="This page is built to convert serious buyers, so each benefit answers the exact reason people search for PPF after seeing paint damage, buying a new car, or wanting better long-term protection."
            />
          </motion.div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {benefits.map((benefit, i) => (
              <motion.div
                key={benefit.title}
                variants={{
                  hidden: { opacity: 0, y: 22 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: { delay: i * 0.08, duration: 0.45 },
                  },
                }}
                initial="hidden"
                animate={benefitsInView ? "show" : "hidden"}
                className="rounded-3xl border p-6"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  borderColor: "rgba(255,255,255,0.08)",
                }}
              >
                <benefit.icon size={22} style={{ color: gold }} />
                <h3 className="mt-5 text-xl font-semibold text-white">
                  {benefit.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-white/55">
                  {benefit.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="px-6 py-16"
        style={{
          background: "rgba(201,168,76,0.05)",
          borderTop: "1px solid rgba(201,168,76,0.1)",
          borderBottom: "1px solid rgba(201,168,76,0.1)",
        }}
      >
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
          <div>
            <p
              className="text-[11px] uppercase tracking-[0.28em]"
              style={{ color: gold }}
            >
              Offer Reminder
            </p>
            <h3
              className="mt-3 text-3xl font-bold text-white"
              style={{ fontFamily: "var(--font-playfair),serif" }}
            >
              Book today and secure your 15% PPF offer
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/55">
              The fastest way to check package options, pricing, and
              availability is WhatsApp. Share your car details and get a
              response quickly.
            </p>
          </div>
          <CTAButtons />
        </div>
      </section>

      <section
        ref={packagesRef}
        className="px-6 py-20 md:py-28"
        style={{ background: "#0a0a0a" }}
      >
        <div className="mx-auto max-w-7xl">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={packagesInView ? "show" : "hidden"}
            className="mb-14 max-w-3xl"
          >
            <SectionHeading
              eyebrow="Packages"
              title="Choose the right"
              highlight="PPF coverage for your car"
              desc="Keep the package structure simple for ad traffic. Users should instantly understand the difference between entry, popular, and premium coverage levels."
            />
          </motion.div>

          <div className="grid gap-6 xl:grid-cols-3">
            {packages.map((pkg, i) => (
              <motion.div
                key={pkg.title}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: { delay: i * 0.08, duration: 0.45 },
                  },
                }}
                initial="hidden"
                animate={packagesInView ? "show" : "hidden"}
                className="relative overflow-hidden rounded-[30px] border p-6 md:p-7"
                style={{
                  background: pkg.featured
                    ? "rgba(201,168,76,0.06)"
                    : "rgba(255,255,255,0.02)",
                  borderColor: pkg.featured
                    ? goldBorder
                    : "rgba(255,255,255,0.08)",
                  boxShadow: pkg.featured
                    ? "0 24px 70px rgba(201,168,76,0.08)"
                    : "none",
                }}
              >
                <div
                  className="mb-5 inline-flex rounded-full border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em]"
                  style={{
                    borderColor: pkg.featured
                      ? goldBorder
                      : "rgba(255,255,255,0.09)",
                    color: pkg.featured ? gold : "rgba(255,255,255,0.58)",
                  }}
                >
                  {pkg.badge}
                </div>

                <h3 className="text-2xl font-bold text-white">{pkg.title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/55">
                  {pkg.desc}
                </p>

                <div className="mt-6 space-y-3">
                  {pkg.items.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle2
                        size={17}
                        style={{ color: gold, marginTop: 2, flexShrink: 0 }}
                      />
                      <span className="text-sm leading-6 text-white/68">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                <div
                  className="mt-8 rounded-2xl border px-4 py-3 text-sm text-white/72"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    borderColor: "rgba(255,255,255,0.08)",
                  }}
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
                  {pkg.cta}
                  <ArrowRight size={16} />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="px-6 py-20 md:py-28"
        style={{ background: "#070707" }}
      >
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Visual Proof"
              title="A finish that looks premium"
              highlight="and stays protected"
              desc="Your landing page should not feel like a plain lead form. This visual block gives shoppers a strong emotional reason to move forward by showing premium finish, depth, and protection value."
            />
            <div className="mt-8">
              <CTAButtons />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div
              className="overflow-hidden rounded-[28px] border"
              style={{ borderColor: "rgba(255,255,255,0.08)" }}
            >
              <img
                src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=900&q=80"
                alt="Close-up glossy car surface showing premium finish"
                className="h-[260px] w-full object-cover"
              />
              <div className="p-5">
                <p className="text-[11px] uppercase tracking-[0.24em] text-white/40">
                  Premium Finish
                </p>
                <p className="mt-2 text-sm leading-7 text-white/60">
                  Enhances the clean, deep look of your paint while keeping
                  protection discreet.
                </p>
              </div>
            </div>

            <div
              className="overflow-hidden rounded-[28px] border sm:mt-10"
              style={{ borderColor: goldBorder }}
            >
              <img
                src="https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=900&q=80"
                alt="Performance car protected for daily road use"
                className="h-[260px] w-full object-cover"
              />
              <div className="p-5">
                <p
                  className="text-[11px] uppercase tracking-[0.24em]"
                  style={{ color: gold }}
                >
                  Built for UAE Driving
                </p>
                <p className="mt-2 text-sm leading-7 text-white/60">
                  Ideal for drivers who want stronger paint protection against
                  real daily road conditions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        ref={processRef}
        className="px-6 py-20 md:py-28"
        style={{ background: "linear-gradient(180deg,#0a0a0a 0%,#080808 100%)" }}
      >
        <div className="mx-auto max-w-7xl">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={processInView ? "show" : "hidden"}
            className="mb-14 max-w-3xl"
          >
            <SectionHeading
              eyebrow="How It Works"
              title="From quote to protected car"
              highlight="in four simple steps"
              desc="Reduce friction for ad traffic. The journey should feel fast, simple, and low-commitment until the user is ready to book."
            />
          </motion.div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.n}
                variants={{
                  hidden: { opacity: 0, y: 22 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: { delay: i * 0.08, duration: 0.45 },
                  },
                }}
                initial="hidden"
                animate={processInView ? "show" : "hidden"}
                className="rounded-3xl border p-6"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  borderColor: "rgba(255,255,255,0.08)",
                }}
              >
                <div className="text-sm font-bold" style={{ color: gold }}>
                  {step.n}
                </div>
                <h3 className="mt-4 text-xl font-semibold text-white">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-white/55">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="px-6 py-16"
        style={{
          background: "rgba(201,168,76,0.05)",
          borderTop: "1px solid rgba(201,168,76,0.1)",
          borderBottom: "1px solid rgba(201,168,76,0.1)",
        }}
      >
        <div
          className="mx-auto max-w-5xl rounded-[30px] border px-6 py-8 text-center sm:px-8 md:px-12 md:py-10"
          style={{
            background: "rgba(255,255,255,0.03)",
            borderColor: "rgba(201,168,76,0.18)",
          }}
        >
          <p
            className="text-[11px] uppercase tracking-[0.3em]"
            style={{ color: gold }}
          >
            High-Intent CTA
          </p>
          <h3
            className="mt-4 text-3xl font-bold text-white md:text-4xl"
            style={{ fontFamily: "var(--font-playfair),serif" }}
          >
            Get your PPF quote now and reserve your free slot
          </h3>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/55">
            If the visitor came from Google Ads, this is where they should feel
            zero friction. One click to WhatsApp, clear offer, fast next step.
          </p>
          <div className="mt-8 flex justify-center">
            <CTAButtons />
          </div>
        </div>
      </section>

      <section
        ref={faqRef}
        className="px-6 py-20 md:py-28"
        style={{ background: "#080808" }}
      >
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={faqInView ? "show" : "hidden"}
          >
            <SectionHeading
              eyebrow="FAQ"
              title="Answers that help visitors"
              highlight="convert with confidence"
              desc="Well-placed FAQs reduce hesitation on higher-ticket service pages. Keep the answers short, direct, and decision-focused."
            />
            <div
              className="mt-8 rounded-3xl border p-6"
              style={{
                background: "rgba(255,255,255,0.03)",
                borderColor: "rgba(255,255,255,0.08)",
              }}
            >
              <p className="text-sm font-semibold text-white">
                Prefer a quick answer instead?
              </p>
              <p className="mt-2 text-sm leading-7 text-white/55">
                Message us on WhatsApp with your car model and we will guide you
                on the right package fast.
              </p>
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold"
                style={{ color: gold }}
              >
                Open WhatsApp <ArrowRight size={15} />
              </a>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={faqInView ? "show" : "hidden"}
            className="space-y-3"
          >
            {faqs.map((faq, i) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} i={i} />
            ))}
          </motion.div>
        </div>
      </section>

      <section
        className="relative overflow-hidden px-6 pb-28 pt-20 text-center md:pb-36 md:pt-28"
        style={{ background: "#050505" }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at center, rgba(201,168,76,0.08), transparent 42%)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-4xl">
          <p
            className="text-[11px] uppercase tracking-[0.32em]"
            style={{ color: gold }}
          >
            Final Call To Action
          </p>
          <h2
            className="mt-5 text-white font-bold leading-[1.05]"
            style={{
              fontFamily: "var(--font-playfair),serif",
              fontSize: "clamp(2.2rem,5vw,4.8rem)",
            }}
          >
            Protect your car while the
            <span
              className="block"
              style={{
                background: goldGrad,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              15% PPF offer is live
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-8 text-white/55">
            Book your free slot now, get an instant quote on WhatsApp, and let
            our team help you choose the right PPF package for your vehicle.
          </p>
          <div className="mt-10 flex justify-center">
            <CTAButtons />
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-white/42">
            <span className="flex items-center gap-2">
              <Car size={14} style={{ color: gold }} /> Daily cars, SUVs &
              luxury cars
            </span>
            <span className="flex items-center gap-2">
              <Zap size={14} style={{ color: gold }} /> Fast quote response
            </span>
            <span className="flex items-center gap-2">
              <ShieldCheck size={14} style={{ color: gold }} /> Free booking
              slot
            </span>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}