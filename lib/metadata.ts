import type { Metadata } from 'next'
import { getSeoForRoute } from './seo'

const SITE_URL  = 'https://smartautouae.com'
const SITE_NAME = 'Smart Auto UAE'
const DEFAULT_OG_IMAGE = '/images/og-default.webp'

export async function buildMetadata(
  route: string,
  fallback?: Partial<Metadata>
): Promise<Metadata> {
  const seo = await getSeoForRoute(route)

  const title       = seo?.title       ?? fallback?.title as string       ?? SITE_NAME
  const description = seo?.description ?? fallback?.description as string ?? ''
  const canonical   = seo?.canonical   ?? `${SITE_URL}${route}`
  const ogImage     = seo?.og_image    ?? DEFAULT_OG_IMAGE
  const robots      = seo?.robots      ?? 'index, follow'

  return {
    title,
    description,
    keywords:    seo?.keywords ?? undefined,
    robots,
    alternates:  { canonical },
    openGraph: {
      title:       seo?.og_title       ?? title,
      description: seo?.og_description ?? description,
      images:      [{ url: ogImage.startsWith('http') ? ogImage : `${SITE_URL}${ogImage}`, width: 1200, height: 630 }],
      type:        (seo?.og_type ?? 'website') as 'website' | 'article',
      siteName:    SITE_NAME,
      url:         canonical,
    },
    twitter: {
      card:        (seo?.twitter_card ?? 'summary_large_image') as 'summary_large_image' | 'summary',
      title:       seo?.twitter_title       ?? title,
      description: seo?.twitter_description ?? description,
      images:      [seo?.twitter_image ?? ogImage],
    },
  }
}

export async function getStructuredData(route: string): Promise<Record<string, unknown> | null> {
  const seo = await getSeoForRoute(route)
  if (seo?.structured_data) return seo.structured_data

  // Default LocalBusiness schema if none saved
  if (route === '/') {
    return {
      '@context': 'https://schema.org',
      '@type': 'AutoRepair',
      name: 'Smart Auto UAE',
      url: SITE_URL,
      logo: `${SITE_URL}/images/logo.png`,
      image: `${SITE_URL}/images/og-default.webp`,
      description: 'Premium car window tinting, PPF, ceramic coating, detailing and car wrapping in Dubai and Sharjah UAE.',
      telephone: '+971524403677',
      email: 'info@smartautouae.com',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Dubai',
        addressCountry: 'AE',
      },
      geo: { '@type': 'GeoCoordinates', latitude: 25.0657, longitude: 55.1713 },
      openingHoursSpecification: [
        { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '11:00', closes: '22:00' },
      ],
      priceRange: '$$',
      sameAs: ['https://instagram.com/smartautouae'],
    }
  }
  return null
}