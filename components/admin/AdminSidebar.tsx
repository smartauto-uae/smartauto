'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import {
  LayoutDashboard, FileText, Search, Settings, LogOut,
  ChevronLeft, ChevronRight, Globe, Image, MessageSquare,
  Star, MapPin, Layers, Tag, BarChart2, Menu, X,
} from 'lucide-react'

const GOLD        = '#b8860b'
const GOLD_BG     = '#fdf8ee'
const GOLD_BORDER = '#e8d48a'

type NavItem  = { label: string; href: string; icon: React.ElementType; badge?: string | number }
type NavGroup = { title: string; items: NavItem[] }

const NAV: NavGroup[] = [
  {
    title: 'Overview',
    items: [
      { label: 'Dashboard', href: '/admin',           icon: LayoutDashboard },
      { label: 'Analytics', href: '/admin/analytics', icon: BarChart2 },
    ],
  },
  {
    title: 'Content',
    items: [
      { label: 'Blog Posts', href: '/admin/blog',     icon: FileText },
      { label: 'Media',      href: '/admin/media',    icon: Image },
      { label: 'Services',   href: '/admin/services', icon: Layers },
    ],
  },
  {
    title: 'SEO',
    items: [
      { label: 'All Pages',  href: '/admin/seo',       icon: Search },
      { label: 'Redirects',  href: '/admin/redirects', icon: Globe },
      { label: 'Sitemap',    href: '/admin/sitemap',   icon: Tag },
    ],
  },
  {
    title: 'Engagement',
    items: [
      { label: 'Reviews',  href: '/admin/reviews',  icon: Star },
      { label: 'Messages', href: '/admin/messages', icon: MessageSquare },
      { label: 'Branches', href: '/admin/branches', icon: MapPin },
    ],
  },
  {
    title: 'System',
    items: [
      { label: 'Settings', href: '/admin/settings', icon: Settings },
    ],
  },
]

export default function AdminSidebar() {
  const pathname              = usePathname()
  const [collapsed, setCollapsed]   = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const isActive = (href: string) =>
    href === '/admin' ? pathname === '/admin' : pathname.startsWith(href)

  const sidebarW = collapsed ? '72px' : '240px'

  return (
    <>
      {/* Mobile toggle */}
      <button
        className="fixed top-4 left-4 z-50 lg:hidden flex items-center justify-center w-10 h-10 rounded-xl"
        style={{ background: '#fff', border: `1px solid ${GOLD_BORDER}`, color: GOLD }}
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
      >
        {mobileOpen ? <X size={18} /> : <Menu size={18} />}
      </button>

      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 lg:hidden"
          style={{ background: 'rgba(26,24,20,0.4)', backdropFilter: 'blur(4px)' }}
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar panel */}
      <aside
        style={{
          position: 'fixed', top: 0, left: 0,
          height: '100dvh', zIndex: 40,
          width: sidebarW,
          display: 'flex', flexDirection: 'column',
          background: '#ffffff',
          borderRight: '1px solid #e8e3d8',
          transition: 'width 300ms ease',
          transform: mobileOpen ? 'translateX(0)' : undefined,
        }}
        className={!mobileOpen ? '-translate-x-full lg:translate-x-0' : ''}
      >
        {/* Logo */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '0.75rem',
          padding: '0 1rem', height: '56px', flexShrink: 0,
          borderBottom: '1px solid #e8e3d8',
        }}>
          <div style={{
            width: 32, height: 32, borderRadius: '0.5rem', flexShrink: 0,
            background: GOLD, display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: '0.7rem', fontWeight: 700, color: '#fff',
          }}>
            SA
          </div>

          {!collapsed && (
            <div style={{ overflow: 'hidden', flex: 1 }}>
              <p style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1a1814', lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                Smart Auto UAE
              </p>
              <p style={{ fontSize: '0.65rem', color: '#b8b0a0' }}>Admin Panel</p>
            </div>
          )}

          <button
            className="hidden lg:flex"
            style={{
              marginLeft: 'auto', flexShrink: 0,
              width: 24, height: 24, borderRadius: '0.375rem',
              alignItems: 'center', justifyContent: 'center',
              background: '#f5f3ef', border: '1px solid #e8e3d8',
              color: '#7a7264', cursor: 'pointer',
            }}
            onClick={() => setCollapsed(!collapsed)}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight size={13} /> : <ChevronLeft size={13} />}
          </button>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', padding: '0.75rem 0.5rem' }} aria-label="Admin navigation">
          {NAV.map((group) => (
            <div key={group.title} style={{ marginBottom: '1rem' }}>
              {!collapsed ? (
                <p style={{
                  padding: '0 0.75rem', marginBottom: '0.25rem',
                  fontSize: '0.65rem', textTransform: 'uppercase',
                  letterSpacing: '0.15em', fontWeight: 600, color: '#b8b0a0',
                }}>
                  {group.title}
                </p>
              ) : (
                <div style={{ margin: '0 0.75rem 0.5rem', height: 1, background: '#e8e3d8' }} aria-hidden="true" />
              )}

              {group.items.map((item) => {
                const active = isActive(item.href)
                const Icon   = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    title={collapsed ? item.label : undefined}
                    aria-current={active ? 'page' : undefined}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.6rem',
                      padding: collapsed ? '0.6rem 0' : '0.5rem 0.75rem',
                      justifyContent: collapsed ? 'center' : 'flex-start',
                      borderRadius: '0.5rem',
                      marginBottom: '0.125rem',
                      textDecoration: 'none',
                      minHeight: 38,
                      background: active ? GOLD_BG : 'transparent',
                      border: `1px solid ${active ? GOLD_BORDER : 'transparent'}`,
                      color: active ? GOLD : '#7a7264',
                      transition: 'background 150ms, color 150ms, border-color 150ms',
                    }}
                    className="admin-sidebar-link"
                  >
                    <Icon size={15} aria-hidden="true" style={{ flexShrink: 0, color: active ? GOLD : '#7a7264' }} />
                    {!collapsed && (
                      <span style={{ fontSize: '0.82rem', fontWeight: active ? 600 : 500, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {item.label}
                      </span>
                    )}
                    {!collapsed && item.badge && (
                      <span style={{
                        fontSize: '0.62rem', fontWeight: 700,
                        padding: '0.15rem 0.45rem', borderRadius: 999, flexShrink: 0,
                        background: GOLD_BG, color: GOLD, border: `1px solid ${GOLD_BORDER}`,
                      }}>
                        {item.badge}
                      </span>
                    )}
                  </Link>
                )
              })}
            </div>
          ))}
        </nav>

        {/* Bottom */}
        <div style={{ flexShrink: 0, padding: '0.5rem', borderTop: '1px solid #e8e3d8' }}>
          {!collapsed && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: '0.6rem',
              padding: '0.5rem 0.75rem', borderRadius: '0.5rem',
              background: '#fafaf9', marginBottom: '0.25rem',
            }}>
              <div style={{
                width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                background: GOLD, display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: '0.65rem', fontWeight: 700, color: '#fff',
              }}>
                SA
              </div>
              <div style={{ overflow: 'hidden', flex: 1 }}>
                <p style={{ fontSize: '0.75rem', fontWeight: 600, color: '#1a1814', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Admin</p>
                <p style={{ fontSize: '0.65rem', color: '#b8b0a0' }}>smartautouae.ae</p>
              </div>
            </div>
          )}

          <form action="/api/admin/logout" method="POST">
            <button
              type="submit"
              style={{
                width: '100%', display: 'flex', alignItems: 'center',
                gap: '0.6rem', padding: collapsed ? '0.6rem 0' : '0.5rem 0.75rem',
                justifyContent: collapsed ? 'center' : 'flex-start',
                borderRadius: '0.5rem', minHeight: 38,
                background: 'transparent', border: 'none',
                color: '#7a7264', cursor: 'pointer',
                transition: 'background 150ms, color 150ms',
              }}
              className="admin-sidebar-link"
              aria-label="Sign out"
            >
              <LogOut size={15} aria-hidden="true" style={{ flexShrink: 0 }} />
              {!collapsed && <span style={{ fontSize: '0.82rem', fontWeight: 500 }}>Sign out</span>}
            </button>
          </form>
        </div>
      </aside>

      {/* Desktop spacer */}
      <div
        className="hidden lg:block flex-shrink-0 transition-all duration-300"
        style={{ width: sidebarW }}
        aria-hidden="true"
      />
    </>
  )
}