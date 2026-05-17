import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Smart Auto UAE — Admin',
  description: 'Smart Auto UAE Admin Panel',
}

export const dynamic = 'force-dynamic'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}