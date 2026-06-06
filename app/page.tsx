import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'
import HomePage from './HomePage'

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata('/', {
    title: 'Premium Car Tinting, PPF & Wrapping Dubai & Sharjah',
    description: 'Professional car wrapping services in Dubai and Sharjah. Full and partial wraps in any colour. Smart Auto UAE.',
  })
}


export default function Page() { return <HomePage /> }