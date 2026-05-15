import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'
import WindowTintingPage from './WindowTintingPage'

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata('/services/window-tinting', {
    title: 'Car Window Tinting Dubai | Smart Auto UAE',
    description: 'Premium car window tinting in Dubai. 3M, TotalGard & Global USA nano ceramic films. UAE RTA compliant.',
  })
}

export default function Page() {
  return <WindowTintingPage />
}