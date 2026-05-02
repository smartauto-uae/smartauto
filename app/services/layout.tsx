import type { Metadata } from 'next'
import Script from 'next/script'
import { headers } from 'next/headers'
import { buildMetadata, getStructuredData } from '@/lib/metadata'

// Fallback metadata — each page overrides via its own generateMetadata in layout
// But since we can't know the route statically here, pages handle their own metadata.
// This layout only injects JSON-LD dynamically per route.

export default async function ServicesLayout({ children }: { children: React.ReactNode }) {
  // Read the current path server-side
  const headersList = await headers()
  const pathname = headersList.get('x-pathname') ?? ''

  const schema = pathname ? await getStructuredData(pathname) : null

  return (
    <>
      {schema && (
        <Script
          id="page-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
      {children}
    </>
  )
}