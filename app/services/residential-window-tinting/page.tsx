import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'
import ResidentialWindowTintingPage from './ResidentialWindowTintingPage'

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata('/services/residential-window-tinting', {
    title: 'Residential Window Tinting Dubai | Smart Auto UAE',
    description: 'Premium residential window tinting in Dubai. 3M, TotalGard & Global USA nano ceramic films. UAE RTA compliant.',
  })
}

export default function Page() {
  return <ResidentialWindowTintingPage />
}
