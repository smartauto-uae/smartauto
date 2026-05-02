import './admin.css'
import AdminSidebar from '@/components/admin/AdminSidebar'
import type { ReactNode } from 'react'

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="admin-layout" style={{
      minHeight: '100dvh',
      background: 'var(--admin-bg)',
      color: 'var(--admin-text)',
      display: 'flex',
    }}>
      <AdminSidebar />

      <main style={{ flex: 1, minWidth: 0, padding: '2rem 1.5rem', overflowX: 'hidden' }}>
        {children}
      </main>
    </div>
  )
}