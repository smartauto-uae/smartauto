import type { Metadata } from 'next'
import AdminDashboardPage from './AdminDashboardPage'

export const metadata: Metadata = {
  title: 'Dashboard',
}

export default function Page() {
  return <AdminDashboardPage />
}