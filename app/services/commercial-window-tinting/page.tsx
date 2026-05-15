import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'
import CommercialWindowTintingPage from './CommercialWindowTintingPage'   

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata('/services/commercial-window-tinting', {
    title: 'Commercial Window Tinting Dubai | Smart Auto UAE',
    description: 'Premium commercial window tinting in Dubai. 3M, TotalGard & Global USA nano ceramic films. UAE RTA compliant.',
  })
}

export default function Page() {
  return <CommercialWindowTintingPage />
}