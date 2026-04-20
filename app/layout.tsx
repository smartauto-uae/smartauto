import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import Script from "next/script"
import "./globals.css"
import Navbar from "@/components/Navbar"
import ChatbotWrapper from "@/components/ChatbotWrapper"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://smartautouae.ae"),

  title: {
    default:  "Smart Auto UAE | #1 Window Tinting, PPF & Ceramic Coating in Dubai & Sharjah",
    template: "%s | Smart Auto UAE",
  },

  description:
    "Smart Auto UAE — Dubai & Sharjah's most trusted car protection centre. Premium window tinting, paint protection film (PPF), ceramic coating, car detailing, vinyl wrapping & residential tinting. Trusted by 50,000+ customers. Free inspection. Call +971 56 726 9666.",

  keywords: [
    "window tinting Dubai", "car tinting Dubai", "nano ceramic tint Dubai",
    "paint protection film Dubai", "PPF Dubai",
    "ceramic coating Dubai", "9H ceramic coating Dubai",
    "car detailing Dubai", "car polishing Dubai", "paint correction Dubai",
    "car wrapping Dubai", "vinyl wrap Dubai", "matte wrap Dubai",
    "commercial window tinting Dubai", "residential window tinting Dubai",
    "marine window tinting Dubai", "villa window tinting Dubai",
    "home window tinting Dubai", "flat glass tinting Dubai",
    "window tinting Sharjah", "car tinting Sharjah",
    "paint protection film Sharjah", "PPF Sharjah",
    "ceramic coating Sharjah", "car detailing Sharjah",
    "car tinting UAE", "PPF UAE", "ceramic coating UAE",
    "best car detailing UAE", "car protection UAE",
    "window film UAE", "Smart Auto UAE", "Smart Auto Dubai", "Smart Auto Sharjah",
    "3M window film Dubai", "TotalGard window film UAE",
  ],

  authors:   [{ name: "Smart Auto UAE", url: "https://smartautouae.ae" }],
  creator:   "Smart Auto UAE",
  publisher: "Smart Auto UAE",

  openGraph: {
    type:        "website",
    locale:      "en_AE",
    url:         "https://smartautouae.ae",
    siteName:    "Smart Auto UAE",
    title:       "Smart Auto UAE | #1 Window Tinting, PPF & Ceramic Coating in Dubai & Sharjah",
    description: "Dubai & Sharjah's most trusted car protection centre. Window tinting, PPF, ceramic coating, detailing & car wrapping. 50,000+ happy clients. Free inspection.",
    images: [
      {
        url:    "/og-image.jpg",
        width:  1200,
        height: 630,
        alt:    "Smart Auto UAE - Premium Car Protection Dubai & Sharjah",
      },
    ],
  },

  twitter: {
    card:        "summary_large_image",
    title:       "Smart Auto UAE | Window Tinting, PPF & Ceramic Coating Dubai",
    description: "Dubai & Sharjah's most trusted car protection centre. 50,000+ happy clients. Free inspection with every service.",
    images:      ["/og-image.jpg"],
  },

  robots: {
    index:  true,
    follow: true,
    googleBot: {
      index:               true,
      follow:              true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet":       -1,
    },
  },

  alternates: {
    canonical: "https://smartautouae.ae",
  },

  verification: {
    google: "YOUR_GOOGLE_SEARCH_CONSOLE_ID",
  },

  category: "automotive",
}

const structuredData = [
  // ── Branch 1: MotorCity ──
  {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "name": "Smart Auto UAE - MotorCity Dubai",
    "image": "https://smartautouae.ae/og-image.jpg",
    "description": "Dubai's premier car protection centre specialising in window tinting, paint protection film (PPF), nano ceramic coating, car detailing, vinyl wrapping, commercial tinting, marine tinting and residential tinting.",
    "url": "https://smartautouae.ae",
    "telephone": "+971567269666",
    "email": "info@smartautouae.ae",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "MotorCity",
      "addressLocality": "Dubai",
      "addressRegion": "Dubai",
      "addressCountry": "AE",
    },
    "geo": {
      "@type":     "GeoCoordinates",
      "latitude":  "25.0367",
      "longitude": "55.2272",
    },
    "openingHoursSpecification": [
      {
        "@type":     "OpeningHoursSpecification",
        "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
        "opens":  "11:00",
        "closes": "21:00",
      },
    ],
    "priceRange": "$$",
    "currenciesAccepted": "AED",
    "paymentAccepted": "Cash, Credit Card",
    "areaServed": ["Dubai", "Sharjah", "UAE"],
    "aggregateRating": {
      "@type":       "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "1284",
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name":  "Car & Surface Protection Services",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Window Tinting Dubai",              "description": "3M, TotalGard & Global USA nano ceramic window tinting for all vehicles in Dubai." }},
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Paint Protection Film Dubai",       "description": "Self-healing PPF installation by certified technicians in Dubai. Partial and full car packages." }},
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Nano Ceramic Coating Dubai",       "description": "Professional 9H nano ceramic coating for long-lasting gloss, UV resistance & hydrophobic protection." }},
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Car Detailing Dubai",              "description": "Full interior & exterior car detailing, machine polishing and paint correction in Dubai." }},
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Car Wrapping Dubai",               "description": "Custom vinyl car wrapping — matte, gloss, satin, colour PPF & chrome finishes." }},
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Commercial Window Tinting Dubai",  "description": "Solar control, privacy & safety window films for offices, retail & commercial buildings in Dubai." }},
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Residential Window Tinting Dubai", "description": "Heat-rejection, privacy & UV-blocking window film for villas, apartments & homes in Dubai." }},
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Marine Window Tinting Dubai",      "description": "Marine-grade window tinting for yachts, boats & vessels. On-site installation at Dubai marinas." }},
      ],
    },
    "sameAs": [
      "https://instagram.com/smartautouae",
      "https://wa.me/971567269666",
    ],
  },
  // ── Branch 2: Al Quoz ──
  {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "name": "Smart Auto UAE - Al Quoz Dubai",
    "image": "https://smartautouae.ae/og-image.jpg",
    "description": "Smart Auto UAE Al Quoz branch — window tinting, PPF, ceramic coating, car detailing and car wrapping in Dubai.",
    "url": "https://smartautouae.ae",
    "telephone": "+971567269666",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Al Quoz Industrial Area 4, D16 Road",
      "addressLocality": "Dubai",
      "addressRegion": "Dubai",
      "addressCountry": "AE",
    },
    "openingHoursSpecification": [
      {
        "@type":     "OpeningHoursSpecification",
        "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
        "opens":  "11:00",
        "closes": "21:30",
      },
    ],
    "priceRange": "$$",
    "areaServed": ["Dubai", "UAE"],
  },
  // ── Branch 3: Mirdif ──
  {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "name": "Smart Auto UAE - Mirdif Uptown Mall Dubai",
    "image": "https://smartautouae.ae/og-image.jpg",
    "description": "Smart Auto UAE Mirdif branch inside Uptown Mall — window tinting, PPF, ceramic coating, car detailing and car wrapping.",
    "url": "https://smartautouae.ae",
    "telephone": "+971567269666",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Uptown Mall, Mirdif",
      "addressLocality": "Dubai",
      "addressRegion": "Dubai",
      "addressCountry": "AE",
    },
    "openingHoursSpecification": [
      {
        "@type":     "OpeningHoursSpecification",
        "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
        "opens":  "11:00",
        "closes": "22:00",
      },
    ],
    "priceRange": "$$",
    "areaServed": ["Dubai", "UAE"],
  },
  // ── Branch 4: Sharjah ──
  {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "name": "Smart Auto UAE - Central Mall Sharjah",
    "image": "https://smartautouae.ae/og-image.jpg",
    "description": "Smart Auto UAE Sharjah branch at Central Mall — window tinting, PPF, ceramic coating, car detailing and car wrapping in Sharjah.",
    "url": "https://smartautouae.ae",
    "telephone": "+971567269666",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Central Mall",
      "addressLocality": "Sharjah",
      "addressRegion": "Sharjah",
      "addressCountry": "AE",
    },
    "openingHoursSpecification": [
      {
        "@type":     "OpeningHoursSpecification",
        "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
        "opens":  "10:00",
        "closes": "22:00",
      },
    ],
    "priceRange": "$$",
    "areaServed": ["Sharjah", "UAE"],
  },
  // ── FAQ Schema ──
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name":  "How much does window tinting cost in Dubai?",
        "acceptedAnswer": { "@type": "Answer", "text": "Window tinting at Smart Auto UAE starts from AED 200 for basic films and up to AED 2,500+ for full nano ceramic packages on large SUVs. Prices depend on the film brand (3M, TotalGard, Global USA), number of windows, and vehicle size." },
      },
      {
        "@type": "Question",
        "name":  "What is the legal tint percentage in Dubai?",
        "acceptedAnswer": { "@type": "Answer", "text": "UAE traffic law requires front side windows to have at least 70% VLT (max 30% tint), and rear windows at least 30% VLT (max 70% tint). No aftermarket tint is permitted on the front windshield. Smart Auto UAE installs only RTA-compliant films." },
      },
      {
        "@type": "Question",
        "name":  "What is the best PPF for cars in UAE?",
        "acceptedAnswer": { "@type": "Answer", "text": "For UAE's extreme heat and harsh driving conditions, self-healing TPU-based Paint Protection Films like 3M and TotalGard are the best choice. Smart Auto UAE is an authorised installer for these premium brands with 5–10 year warranties." },
      },
      {
        "@type": "Question",
        "name":  "How long does ceramic coating last in Dubai?",
        "acceptedAnswer": { "@type": "Answer", "text": "A professional-grade ceramic coating in Dubai typically lasts 2–5 years depending on the product tier and maintenance habits. Smart Auto UAE applies 3M and TotalGard nano ceramic coatings with multi-year manufacturer warranties." },
      },
      {
        "@type": "Question",
        "name":  "Does Smart Auto UAE offer residential window tinting?",
        "acceptedAnswer": { "@type": "Answer", "text": "Yes. Smart Auto UAE provides residential window tinting for villas and apartments across Dubai and Sharjah. Films block up to 90% solar heat, 99% UV, and can reduce AC bills by up to 30%. Free site survey included." },
      },
      {
        "@type": "Question",
        "name":  "Where are Smart Auto UAE branches located?",
        "acceptedAnswer": { "@type": "Answer", "text": "Smart Auto UAE has 4 branches: MotorCity Dubai (11AM–9PM), Al Quoz Dubai (11AM–9:30PM), Mirdif Uptown Mall Dubai (11AM–10PM), and Central Mall Sharjah (10AM–10PM). All open every day including weekends." },
      },
    ],
  },
]

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable}`}
        style={{ backgroundColor: "#0A0A0A" }}
      >
        {/* Google Tag Manager (noscript fallback) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-537ZKNVG"
            height="0"
            
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        {/* Global Navbar */}
        <Navbar />

        {/* Page content */}
        {children}

        {/* Floating Chatbot — client-only, no SSR */}
        <ChatbotWrapper />

        {/* Google Tag Manager */}
        <Script
          id="gtm-head"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-537ZKNVG');`,
          }}
        />
      </body>
    </html>
  )
}