import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'
import WindowTintingContent from './content'

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata('/services/window-tinting', {
    title: 'Car Window Tinting Dubai & Sharjah | Smart Auto UAE',
    description: 'Professional car window tinting in Dubai and Sharjah. UV protection, heat rejection and privacy films. Smart Auto UAE.',
  })
}

export default function Page() { return <WindowTintingContent /> }