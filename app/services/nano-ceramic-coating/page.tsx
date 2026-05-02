import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'
import NanoCeramicCoatingPage from './NanoCeramicCoatingPage'

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata('/services/nano-ceramic-coating', {
    title: 'Nano Ceramic Coating Dubai | Smart Auto UAE',
    description: 'Premium nano ceramic coating in Dubai. 3M, TotalGard & XPEL nano ceramic films. UAE RTA compliant.',
  })
}

export default function Page() {
  return <NanoCeramicCoatingPage/>
}
