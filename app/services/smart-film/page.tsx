import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'
import SmartFilmContent from './content'

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata('/services/smart-film', {
    title: 'Switchable Smart Glass Film Dubai | Smart Auto UAE',
    description: 'Switchable smart glass film installation in Dubai and Sharjah. Privacy on demand for offices and villas. Smart Auto UAE.',
  })
}

export default function Page() { return <SmartFilmContent /> }