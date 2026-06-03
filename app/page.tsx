import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'
import HomePage from './HomePage'

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata('/', {
    title: 'HomePage | Smart Auto LLC',
    description: 'Smart Auto LLC',
  })
}

export default function Page() { return <HomePage /> }