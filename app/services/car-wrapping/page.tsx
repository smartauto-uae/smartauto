import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'
import CarWrappingContent from './content'

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata('/services/car-wrapping', {
    title: 'Car Wrapping Dubai & Sharjah | Smart Auto UAE',
    description: 'Professional car wrapping services in Dubai and Sharjah. Full and partial wraps in any colour. Smart Auto UAE.',
  })
}

export default function Page() { return <CarWrappingContent /> }