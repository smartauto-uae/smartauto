import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'
import WindowTintingPage from './MarineWindowTintingPage'

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata('/services/marine-window-tinting', {
    title: 'Marine Window Tinting Dubai | Smart Auto UAE',
    description: 'Premium marine window tinting in Dubai. 3M, TotalGard & XPEL nano ceramic films. UAE RTA compliant.',
  })
}

export default function Page() {
  return <MarineWindowTintingPage />
}