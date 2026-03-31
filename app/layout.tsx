import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import Script from "next/script"
import "./globals.css"
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
    "Smart Auto UAE — Dubai & Sharjah's most trusted car protection centre. Premium window tinting, paint protection film (PPF), ceramic coating, car detailing, vinyl wrapping & accessories. Trusted by 50,000+ car owners. Free inspection. Call +971 567 269 666.",

  keywords: [
    "window tinting Dubai", "car tinting Dubai", "nano ceramic tint Dubai",
    "paint protection film Dubai", "PPF Dubai",
    "ceramic coating Dubai", "9H ceramic coating Dubai",
    "car detailing Dubai", "car polishing Dubai", "paint correction Dubai",
    "car wrapping Dubai", "vinyl wrap Dubai", "matte wrap Dubai",
    "car accessories Dubai", "car accessories fitting Dubai",
    "window tinting Sharjah", "car tinting Sharjah",
    "paint protection film Sharjah", "PPF Sharjah",
    "ceramic coating Sharjah", "car detailing Sharjah",
    "car wrapping Sharjah", "car polishing Sharjah",
    "car tinting UAE", "PPF UAE", "ceramic coating UAE",
    "best car detailing UAE", "car protection UAE",
    "window film UAE", "Smart Auto UAE", "Smart Auto Dubai", "Smart Auto Sharjah",
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
  {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "name": "Smart Auto UAE - Dubai",
    "image": "https://smartautouae.ae/og-image.jpg",
    "description": "Dubai's premier car protection centre specialising in window tinting, paint protection film (PPF), ceramic coating, car detailing, vinyl wrapping and accessories fitting.",
    "url": "https://smartautouae.ae",
    "telephone": "+971567269666",
    "email": "info@smartautouae.ae",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Dubai",
      "addressRegion":   "Dubai",
      "addressCountry":  "AE",
    },
    "geo": {
      "@type":     "GeoCoordinates",
      "latitude":  "25.2048",
      "longitude": "55.2708",
    },
    "openingHoursSpecification": [
      {
        "@type":     "OpeningHoursSpecification",
        "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
        "opens":  "09:00",
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
      "name":  "Car Protection Services",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Window Tinting Dubai",        "description": "Nano ceramic & premium window tinting for all vehicles in Dubai." }},
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Paint Protection Film Dubai", "description": "Self-healing PPF installation by certified technicians in Dubai." }},
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Ceramic Coating Dubai",       "description": "Professional 9H ceramic coating for long-lasting gloss & protection." }},
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Car Detailing Dubai",         "description": "Full interior & exterior car detailing and paint correction." }},
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Car Wrapping Dubai",          "description": "Custom vinyl car wrapping — matte, gloss, satin & colour change." }},
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Car Accessories Dubai",       "description": "Expert fitting of dashcams, parking sensors, ambient lighting & more." }},
      ],
    },
    "sameAs": [
      "https://instagram.com/smartautouae",
      "https://wa.me/971567269666",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "name": "Smart Auto UAE - Sharjah",
    "image": "https://smartautouae.ae/og-image.jpg",
    "description": "Sharjah's trusted car protection centre for window tinting, PPF, ceramic coating, car detailing and vinyl wrapping.",
    "url": "https://smartautouae.ae",
    "telephone": "+971567269666",
    "email": "info@smartautouae.ae",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Sharjah",
      "addressRegion":   "Sharjah",
      "addressCountry":  "AE",
    },
    "openingHoursSpecification": [
      {
        "@type":     "OpeningHoursSpecification",
        "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
        "opens":  "09:00",
        "closes": "21:00",
      },
    ],
    "priceRange": "$$",
    "areaServed": ["Sharjah", "UAE"],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name":  "How much does window tinting cost in Dubai?",
        "acceptedAnswer": { "@type": "Answer", "text": "Window tinting prices in Dubai start from AED 299 depending on the type of film and vehicle size. Smart Auto UAE offers nano ceramic, carbon, and dyed films with UAE traffic law-compliant VLT levels." },
      },
      {
        "@type": "Question",
        "name":  "What is the best PPF for cars in UAE?",
        "acceptedAnswer": { "@type": "Answer", "text": "For UAE's extreme heat and harsh driving conditions, self-healing TPU-based Paint Protection Films like 3M and TotalGard are the best choice. Smart Auto UAE is an authorised installer for these premium brands." },
      },
      {
        "@type": "Question",
        "name":  "How long does ceramic coating last in Dubai?",
        "acceptedAnswer": { "@type": "Answer", "text": "A professional-grade ceramic coating in Dubai typically lasts 2–5 years depending on the product tier and maintenance. Smart Auto UAE uses 9H hardness coatings from Gyeon, Gtechniq, and IGL for maximum durability in UAE's climate." },
      },
      {
        "@type": "Question",
        "name":  "Does Smart Auto UAE have a branch in Sharjah?",
        "acceptedAnswer": { "@type": "Answer", "text": "Yes. Smart Auto UAE has branches in both Dubai and Sharjah, offering the full range of car protection services including window tinting, PPF, ceramic coating, detailing, and car wrapping." },
      },
      {
        "@type": "Question",
        "name":  "How long does a full car wrap take?",
        "acceptedAnswer": { "@type": "Answer", "text": "A full vinyl car wrap typically takes 2–4 days depending on the vehicle size and complexity. Partial wraps and accents can be completed in 1 day at our Dubai or Sharjah branch." },
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
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-537ZKNVG"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        {children}

        {/* Google Tag Manager — loaded after page is interactive */}
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