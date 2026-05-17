import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'
import CeramicCoatingContent from './content'

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata('/services/nano-ceramic-coating', {
    title: 'Nano Ceramic Coating Dubai & Sharjah | Smart Auto UAE',
    description: 'Professional nano ceramic coating in Dubai and Sharjah. Long-lasting paint protection and shine. Smart Auto UAE.',
  })
}

export default function Page() { return <CeramicCoatingContent /> }