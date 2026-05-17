import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'
import ResidentialTintingContent from './content'

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata('/services/residential-window-tinting', {
    title: 'Residential Window Tinting Dubai & Sharjah | Smart Auto UAE',
    description: 'Professional villa and home window tinting in Dubai and Sharjah. UV and heat protection. Smart Auto UAE.',
  })
}

export default function Page() { return <ResidentialTintingContent /> }