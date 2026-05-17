import type { Metadata } from 'next'
import AdminLoginPage from './AdminLoginPage'

export const metadata: Metadata = {
  title: 'Login- Smart Auto Admin',
  robots: 'noindex, nofollow',
}

export default function Page() {
  return <AdminLoginPage />
}