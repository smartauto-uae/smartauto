import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'
import CarDetailingPage from './CarDetailingPage'

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata('/services/car-detailing', {
    title: 'Car Detailing Dubai | Smart Auto UAE',
    description: 'Premium car detailing in Dubai. Full interior and exterior detailing services.',
  })
}

export default function Page() {
  return <CarDetailingPage />
}