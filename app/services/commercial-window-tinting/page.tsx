import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'
import CommercialTintingContent from './content'

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata('/services/commercial-window-tinting', {
    title: 'Commercial Window Tinting Dubai & Sharjah | Smart Auto UAE',
    description: 'Professional commercial window tinting for offices and buildings in Dubai and Sharjah. Smart Auto UAE.',
  })
}

export default function Page() { return <CommercialTintingContent /> }