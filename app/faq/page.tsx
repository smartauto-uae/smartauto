import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'
import FAQClient from './FAQClient'

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata('/faq', {
    title: 'FAQ Smart Auto UAE | Car Care Specialists Dubai',
    description: 'Read FAQ for premium car tinting, PPF, ceramic coating and detailing services. Fast response and support.',
  })
}


export default function Page() { return <FAQClient /> }