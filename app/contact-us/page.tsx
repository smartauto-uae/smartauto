import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'
import Contactus from './Contactus'

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata('/contact-us', {
    title: 'Contact Smart Auto UAE | Car Care Specialists Dubai',
    description: 'Get in touch with Smart Auto UAE for premium car tinting, PPF, ceramic coating and detailing services. Fast response and support.',
  })
}


export default function Page() { return <Contactus /> }