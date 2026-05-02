import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'
import WindowTintingPage from './PaintProtectionFilmPage'

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata('/services/paint-protection-film', {
    title: 'Paint Protection Film Dubai | Smart Auto UAE',
    description: 'Premium paint protection film in Dubai. 3M, TotalGard & XPEL nano ceramic films. UAE RTA compliant.',
  })
}

export default function Page() {
  return <PaintProtectionFilmPage />
}