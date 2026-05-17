import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'
import MarineTintingContent from './content'

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata('/services/marine-window-tinting', {
    title: 'Marine Window Tinting Dubai | Smart Auto UAE',
    description: 'Professional marine and boat window tinting in Dubai. UV and heat protection for your vessel. Smart Auto UAE.',
  })
}

export default function Page() { return <MarineTintingContent /> }