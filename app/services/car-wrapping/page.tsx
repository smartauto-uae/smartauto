import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'
import WindowTintingPage from './CarWrappingPage'

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata('/services/car-wrapping', {
    title: 'Car Wrapping Dubai | Smart Auto UAE',
    description: 'Colour-change and custom vinyl wraps in Dubai.',
  })
}

export default function Page() {
  return <CarWrappingPage />
}
