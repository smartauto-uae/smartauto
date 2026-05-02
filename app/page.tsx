import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'
import HomePage from './HomePage'

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata('/')
}

export default function Page() {
  return <HomePage />
}