'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, Search, FileText, Layers,
  Star, MessageSquare, LogOut, Menu, X, ChevronRight,
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

const GOLD  = '#b8860b'
const GOLD2 = '#fef3c7'

const NAV = [
  { href: '/admin',          label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/seo',      label: 'SEO',        icon: Search },
  { href: '/admin/blog',     label: 'Blog',       icon: FileText },
]

// Bottom tab bar shows only the first 5
const BOTTOM_TABS = NAV.slice(0, 5)

export default function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname  = usePathname()
  const router    = useRouter()
  const [drawerOpen, setDrawerOpen] = useState(false)

  // Close drawer on route change
  useEffect(() => { setDrawerOpen(false) }, [pathname])

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [drawerOpen])

  const isActive = (href: string) =>
    href === '/admin' ? pathname === '/admin' : pathname.startsWith(href)

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  return (
    <div style={{ display: 'flex', minHeight: '100dvh', background: '#f5f3ef' }}>

      {/* ── Desktop Sidebar ── */}
      <aside style={{
        width: 220,
        flexShrink: 0,
        background: '#fafaf9',
        borderRight: '1px solid #e8e3d8',
        display: 'flex',
        flexDirection: 'column',
        position: 'sticky',
        top: 0,
        height: '100dvh',
        overflowY: 'auto',
      }} className="admin-sidebar">
        {/* Logo */}
        <div style={{ padding: '1.5rem 1.25rem 1rem', borderBottom: '1px solid #e8e3d8' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
            <div style={{
              width: 32, height: 32, borderRadius: '0.5rem',
              background: `linear-gradient(135deg,${GOLD},#d4a017,#8b6508)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 700, fontSize: '0.75rem', color: '#000', flexShrink: 0,
            }}>SA</div>
            <div>
              <p style={{ fontSize: '0.8rem', fontWeight: 700, color: '#1a1814', lineHeight: 1.2 }}>Smart Auto UAE</p>
              <p style={{ fontSize: '0.65rem', color: '#7a7264' }}>Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '0.75rem 0.75rem 0' }}>
          {NAV.map(({ href, label, icon: Icon }) => {
            const active = isActive(href)
            return (
              <Link
                key={href}
                href={href}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.625rem',
                  padding: '0.6rem 0.75rem',
                  borderRadius: '0.5rem',
                  marginBottom: '0.125rem',
                  fontSize: '0.82rem',
                  fontWeight: active ? 600 : 400,
                  color: active ? GOLD : '#4a4540',
                  background: active ? GOLD2 : 'transparent',
                  textDecoration: 'none',
                  transition: 'background 150ms, color 150ms',
                }}
              >
                <Icon size={15} aria-hidden="true" style={{ flexShrink: 0, opacity: active ? 1 : 0.7 }} />
                {label}
              </Link>
            )
          })}
        </nav>

        {/* Logout */}
        <div style={{ padding: '0.75rem', borderTop: '1px solid #e8e3d8' }}>
          <button
            onClick={handleLogout}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: '0.625rem',
              padding: '0.6rem 0.75rem', borderRadius: '0.5rem',
              fontSize: '0.82rem', fontWeight: 400, color: '#dc2626',
              background: 'transparent', border: 'none', cursor: 'pointer',
              transition: 'background 150ms',
            }}
          >
            <LogOut size={15} aria-hidden="true" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* ── Mobile Top Bar ── */}
      <div className="admin-mobile-topbar" style={{
        display: 'none',
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        height: 56,
        background: '#fafaf9',
        borderBottom: '1px solid #e8e3d8',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 1rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{
            width: 28, height: 28, borderRadius: '0.4rem',
            background: `linear-gradient(135deg,${GOLD},#d4a017,#8b6508)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 700, fontSize: '0.65rem', color: '#000',
          }}>SA</div>
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1a1814' }}>Smart Auto UAE</span>
        </div>
        <button
          onClick={() => setDrawerOpen(true)}
          style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '0.5rem', color: '#4a4540' }}
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* ── Mobile Drawer Overlay ── */}
      {drawerOpen && (
        <div
          onClick={() => setDrawerOpen(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 60,
            background: 'rgba(0,0,0,0.35)',
            backdropFilter: 'blur(2px)',
          }}
          aria-hidden="true"
        />
      )}

      {/* ── Mobile Drawer ── */}
      <div
        className="admin-drawer"
        style={{
          position: 'fixed', top: 0, right: 0, bottom: 0, zIndex: 70,
          width: 'min(280px, 85vw)',
          background: '#fafaf9',
          borderLeft: '1px solid #e8e3d8',
          display: 'flex', flexDirection: 'column',
          transform: drawerOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 280ms cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        {/* Drawer header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1rem 0.75rem', borderBottom: '1px solid #e8e3d8' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1a1814' }}>Menu</span>
          <button
            onClick={() => setDrawerOpen(false)}
            style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '0.5rem', color: '#7a7264' }}
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* Drawer Nav */}
        <nav style={{ flex: 1, overflowY: 'auto', padding: '0.75rem' }}>
          {NAV.map(({ href, label, icon: Icon }) => {
            const active = isActive(href)
            return (
              <Link
                key={href}
                href={href}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.75rem',
                  padding: '0.75rem 0.875rem',
                  borderRadius: '0.5rem',
                  marginBottom: '0.25rem',
                  fontSize: '0.9rem',
                  fontWeight: active ? 600 : 400,
                  color: active ? GOLD : '#1a1814',
                  background: active ? GOLD2 : 'transparent',
                  textDecoration: 'none',
                }}
              >
                <Icon size={17} aria-hidden="true" style={{ opacity: active ? 1 : 0.6 }} />
                {label}
                {active && <ChevronRight size={14} style={{ marginLeft: 'auto', color: GOLD }} />}
              </Link>
            )
          })}
        </nav>

        {/* Drawer Logout */}
        <div style={{ padding: '0.75rem', borderTop: '1px solid #e8e3d8' }}>
          <button
            onClick={handleLogout}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem',
              padding: '0.75rem 0.875rem', borderRadius: '0.5rem',
              fontSize: '0.9rem', color: '#dc2626',
              background: 'transparent', border: 'none', cursor: 'pointer',
            }}
          >
            <LogOut size={17} aria-hidden="true" />
            Sign Out
          </button>
        </div>
      </div>

      {/* ── Main Content ── */}
      <main style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }} className="admin-main">
        <div style={{ flex: 1, padding: '2rem 1.5rem' }} className="admin-content">
          {children}
        </div>
      </main>

      {/* ── Mobile Bottom Tab Bar ── */}
      <nav className="admin-bottom-tabs" style={{
        display: 'none',
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 40,
        background: '#fafaf9',
        borderTop: '1px solid #e8e3d8',
        padding: '0.375rem 0 calc(0.375rem + env(safe-area-inset-bottom))',
      }}>
        {BOTTOM_TABS.map(({ href, label, icon: Icon }) => {
          const active = isActive(href)
          return (
            <Link
              key={href}
              href={href}
              style={{
                flex: 1,
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.2rem',
                padding: '0.375rem 0.25rem',
                textDecoration: 'none',
                color: active ? GOLD : '#9a9288',
                minWidth: 0,
              }}
            >
              <div style={{
                width: 36, height: 36,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderRadius: '0.625rem',
                background: active ? GOLD2 : 'transparent',
                transition: 'background 150ms',
              }}>
                <Icon size={18} aria-hidden="true" />
              </div>
              <span style={{ fontSize: '0.62rem', fontWeight: active ? 600 : 400, letterSpacing: '0.01em', lineHeight: 1 }}>
                {label}
              </span>
            </Link>
          )
        })}
        {/* More button — opens drawer */}
        <button
          onClick={() => setDrawerOpen(true)}
          style={{
            flex: 1,
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.2rem',
            padding: '0.375rem 0.25rem',
            color: '#9a9288', background: 'none', border: 'none', cursor: 'pointer',
          }}
        >
          <div style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '0.625rem' }}>
            <Menu size={18} />
          </div>
          <span style={{ fontSize: '0.62rem', fontWeight: 400, letterSpacing: '0.01em', lineHeight: 1 }}>More</span>
        </button>
      </nav>

      {/* ── Responsive CSS ── */}
      <style>{`
        @media (max-width: 768px) {
          .admin-sidebar       { display: none !important; }
          .admin-mobile-topbar { display: flex !important; }
          .admin-bottom-tabs   { display: flex !important; }
          .admin-main          { padding-top: 56px; }
          .admin-content       { padding: 1rem !important; padding-bottom: calc(80px + env(safe-area-inset-bottom)) !important; }
        }
        @media (min-width: 769px) {
          .admin-drawer        { display: none !important; }
        }
        /* Prevent overscroll on drawer */
        .admin-drawer nav { overscroll-behavior: contain; }
      `}</style>
    </div>
  )
}