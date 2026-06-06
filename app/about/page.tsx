import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'
import About from './About'

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata('/about', {
    title: 'About Smart Auto UAE | Car Care Specialists Dubai',
    description: 'Know About Smart Auto UAE for premium car tinting, PPF, ceramic coating and detailing services. Fast response and support.',
  })
}


export default function Page() { return <About /> }