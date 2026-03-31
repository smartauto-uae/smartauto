import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://smartautouae.com'),
  title: {
    default: 'Car Detailing, Window Tinting & Ceramic Coating Dubai | Smart Auto UAE',
    template: '%s | Smart Auto UAE',
  },
  description:
    'Smart Auto UAE — Dubai\'s trusted specialists in car window tinting, nano ceramic coating, paint protection film (PPF), car detailing, polishing, and car wrapping. UAE authorised 3M & XPEL applicator. Doorstep service across Dubai.',
  keywords: [
    'car detailing Dubai',
    'window tinting Dubai',
    'ceramic coating Dubai',
    'PPF Dubai',
    'car wrapping Dubai',
    'car polishing UAE',
    'nano ceramic coating UAE',
    'paint protection film Dubai',
    '3M window tint Dubai',
    'XPEL Dubai',
    'car tinting Dubai',
    'interior car cleaning Dubai',
    'window tinting UAE',
    'Smart Auto UAE',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_AE',
    url: 'https://smartautouae.com',
    siteName: 'Smart Auto UAE',
    title: 'Car Detailing, Window Tinting & Ceramic Coating Dubai | Smart Auto UAE',
    description:
      'UAE authorised 3M & XPEL applicator. Expert car detailing, window tinting, ceramic coatings, PPF, and car wrapping across Dubai. 15-year warranty. Doorstep service available.',
    images: [
      {
        url: '/og/home.jpg',
        width: 1200,
        height: 630,
        alt: 'Smart Auto UAE — Premium Car Care Dubai',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@smartautouae',
    title: 'Car Detailing, Window Tinting & Ceramic Coating Dubai',
    description: 'UAE authorised 3M & XPEL applicator. Doorstep service across Dubai.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://smartautouae.com',
  },
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'AutoRepair',
  name: 'Smart Auto Accessories Fitting LLC',
  alternateName: 'Smart Auto UAE',
  description:
    'Professional car window tinting, nano ceramic coating, paint protection film, car detailing, car polishing, car wrapping, and upholstery services in Dubai, UAE. UAE authorised 3M and XPEL applicator.',
  url: 'https://smartautouae.com',
  telephone: '+971567269666',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Dubai',
    addressRegion: 'Dubai',
    addressCountry: 'AE',
  },
  areaServed: [
    { '@type': 'City', name: 'Dubai' },
    { '@type': 'City', name: 'Sharjah' },
    { '@type': 'State', name: 'UAE' },
  ],
  priceRange: '$$',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5',
    reviewCount: '233',
    bestRating: '5',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Car Care Services Dubai',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Car Window Tinting Dubai' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Nano Ceramic Coating Dubai' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Paint Protection Film Dubai' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Car Detailing Dubai' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Car Wrapping Dubai' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Car Polishing Dubai' } },
    ],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}