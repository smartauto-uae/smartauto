import Script from 'next/script'
import { headers } from 'next/headers'
import { getStructuredData } from '@/lib/metadata'

export default async function ServicesLayout({ children }: { children: React.ReactNode }) {
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