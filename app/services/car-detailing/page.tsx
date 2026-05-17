import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'
import CarDetailingContent from './content'

export async function generateMetadata(): Promise<Metadata> {
  const meta = await buildMetadata('/services/car-detailing', {
    title: 'Car Detailing & Polishing Dubai | Smart Auto UAE',
    description: 'Professional car detailing and polishing in Dubai & Sharjah.',
  })
  console.log('META RESULT:', JSON.stringify(meta, null, 2))
  return meta
}

export default function Page() {
  return <CarDetailingContent />
}