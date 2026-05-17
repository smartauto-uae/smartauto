import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'
import PPFContent from './content'

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata('/services/paint-protection-films', {
    title: 'Paint Protection Film Dubai & Sharjah | Smart Auto UAE',
    description: 'Premium PPF paint protection film in Dubai and Sharjah. Self-healing, scratch resistant. Smart Auto UAE.',
  })
}

export default function Page() { return <PPFContent /> }