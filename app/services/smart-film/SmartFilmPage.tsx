import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'
import SmartFilmPage from './page'

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata('/services/smart-film', {
    title: 'Smart Film Dubai | Smart Auto UAE',
    description: 'Premium smart film in Dubai. 3M, TotalGard & XPEL nano ceramic films. UAE RTA compliant.',
  })
}

export default function Page() {
  return <SmartFilmPage />
}