import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const isLogin = false // layout gets called for /admin/login too — handled below
  return <>{children}</>
}