'use client'

import { usePathname } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import {
  Bell, Search, Plus, ExternalLink, FileText,
  Search as SearchIcon, Layers, MessageSquare,
  ChevronDown, Check, User, Settings, LogOut,
} from 'lucide-react'

const gold       = '#b8860b'
const goldBg     = '#fdf8ee'
const goldBorder = '#e8d48a'

const PAGE_TITLES: Record<string, { title: string; subtitle?: string }> = {
  '/admin':           { title: 'Dashboard',  subtitle: 'Overview of your site activity' },
  '/admin/analytics': { title: 'Analytics',  subtitle: 'Traffic, sessions and conversions' },
  '/admin/blog':      { title: 'Blog Posts', subtitle: 'Manage articles and drafts' },
  '/admin/media':     { title: 'Media',      subtitle: 'Images and uploaded files' },
  '/admin/services':  { title: 'Services',   subtitle: 'Manage service pages' },
  '/admin/seo':       { title: 'SEO',        subtitle: 'Page metadata and rankings' },
  '/admin/redirects': { title: 'Redirects',  subtitle: '301 and 302 URL redirects' },
  '/admin/sitemap':   { title: 'Sitemap',    subtitle: 'XML sitemap management' },
  '/admin/reviews':   { title: 'Reviews',    subtitle: 'Customer reviews and ratings' },
  '/admin/messages':  { title: 'Messages',   subtitle: 'Contact form submissions' },
  '/admin/branches':  { title: 'Branches',   subtitle: 'UAE branch locations' },
  '/admin/settings':  { title: 'Settings',   subtitle: 'Site configuration' },
}

const QUICK_CREATE = [
  { label: 'New Blog Post', href: '/admin/blog/new',      icon: FileText   },
  { label: 'New Service',   href: '/admin/services/new',  icon: Layers     },
  { label: 'Add Redirect',  href: '/admin/redirects/new', icon: SearchIcon },
]

const NOTIFICATIONS = [
  { id: 1, text: '3 new contact form messages',         time: '5m ago',  unread: true  },
  { id: 2, text: 'New review submitted (5★)',            time: '22m ago', unread: true  },
  { id: 3, text: 'Sitemap regenerated successfully',    time: '1h ago',  unread: false },
  { id: 4, text: 'Blog post published: "Tinting Guide"', time: '3h ago', unread: false },
]

function buildCrumbs(pathname: string) {
  const parts  = pathname.split('/').filter(Boolean)
  const crumbs: { label: string; href: string }[] = []
  let   built  = ''
  for (const part of parts) {
    built += `/${part}`
    const title = PAGE_TITLES[built]?.title ?? part.charAt(0).toUpperCase() + part.slice(1)
    crumbs.push({ label: title, href: built })
  }
  return crumbs
}

function useClickOutside(ref: React.RefObject<HTMLElement | null>, cb: () => void) {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) cb()
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [ref, cb])
}

// Shared dropdown style
const dropdownStyle: React.CSSProperties = {
  background:   '#ffffff',
  border:       '1px solid #e8e3d8',
  borderRadius: '0.75rem',
  boxShadow:    '0 8px 32px rgba(0,0,0,0.1)',
}

const iconBtnStyle: React.CSSProperties = {
  display:        'flex',
  alignItems:     'center',
  justifyContent: 'center',
  width:          36,
  height:         36,
  borderRadius:   '0.5rem',
  border:         '1px solid #e8e3d8',
  background:     '#ffffff',
  color:          '#7a7264',
  cursor:         'pointer',
  position:       'relative',
}

export default function AdminHeader() {
  const pathname = usePathname()
  const page     = PAGE_TITLES[pathname] ?? { title: 'Admin', subtitle: '' }
  const crumbs   = buildCrumbs(pathname)

  const [searchOpen,     setSearchOpen]     = useState(false)
  const [searchQuery,    setSearchQuery]     = useState('')
  const [notifOpen,      setNotifOpen]       = useState(false)
  const [createOpen,     setCreateOpen]      = useState(false)
  const [profileOpen,    setProfileOpen]     = useState(false)
  const [notifications,  setNotifications]   = useState(NOTIFICATIONS)

  const notifRef       = useRef<HTMLDivElement>(null)
  const createRef      = useRef<HTMLDivElement>(null)
  const profileRef     = useRef<HTMLDivElement>(null)
  const searchRef      = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  useClickOutside(notifRef,   () => setNotifOpen(false))
  useClickOutside(createRef,  () => setCreateOpen(false))
  useClickOutside(profileRef, () => setProfileOpen(false))
  useClickOutside(searchRef,  () => { setSearchOpen(false); setSearchQuery('') })

  const unreadCount = notifications.filter(n => n.unread).length
  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, unread: false })))

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(true)
        setTimeout(() => searchInputRef.current?.focus(), 50)
      }
      if (e.key === 'Escape') { setSearchOpen(false); setSearchQuery('') }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <header
      style={{
        position:       'sticky',
        top:            0,
        zIndex:         20,
        display:        'flex',
        alignItems:     'center',
        gap:            '1rem',
        padding:        '0 1.5rem',
        height:         56,
        background:     'rgba(247,246,242,0.92)',
        backdropFilter: 'blur(12px)',
        borderBottom:   '1px solid #e8e3d8',
      }}
    >
      {/* ── Left ── */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', marginBottom: 2 }}>
          {crumbs.map((crumb, i) => (
            <span key={crumb.href} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              {i > 0 && <span style={{ color: '#d4cfc8', fontSize: 11 }}>/</span>}
              {i === crumbs.length - 1 ? (
                <span style={{ fontSize: '0.68rem', fontWeight: 600, color: gold }} aria-current="page">
                  {crumb.label}
                </span>
              ) : (
                <Link href={crumb.href} style={{ fontSize: '0.68rem', color: '#b8b0a0', textDecoration: 'none' }}>
                  {crumb.label}
                </Link>
              )}
            </span>
          ))}
        </nav>

        {/* Title */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
          <h1 style={{ fontWeight: 700, fontSize: '1rem', color: '#1a1814', lineHeight: 1 }}>
            {page.title}
          </h1>
          {page.subtitle && (
            <span style={{ fontSize: '0.75rem', color: '#b8b0a0' }}>
              {page.subtitle}
            </span>
          )}
        </div>
      </div>

      {/* ── Right ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>

        {/* Search */}
        <div ref={searchRef} style={{ position: 'relative' }}>
          <button
            onClick={() => { setSearchOpen(true); setTimeout(() => searchInputRef.current?.focus(), 50) }}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              height: 36, padding: '0 0.75rem', borderRadius: '0.5rem',
              border: '1px solid #e8e3d8', background: '#ffffff',
              color: '#7a7264', cursor: 'pointer', fontSize: '0.78rem',
            }}
            aria-label="Search"
          >
            <Search size={13} aria-hidden="true" />
            <span style={{ display: 'none' }} className="md:block">Search</span>
            <span style={{
              fontSize: '0.65rem', padding: '0.1rem 0.4rem', borderRadius: '0.25rem',
              background: '#f5f3ef', border: '1px solid #e8e3d8', color: '#b8b0a0',
            }}>
              ⌘K
            </span>
          </button>

          {searchOpen && (
            <div style={{ ...dropdownStyle, position: 'absolute', right: 0, top: 44, width: 300 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0.75rem 1rem', borderBottom: '1px solid #f0ece4' }}>
                <Search size={13} style={{ color: '#b8b0a0', flexShrink: 0 }} aria-hidden="true" />
                <input
                  ref={searchInputRef}
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search pages, posts, services…"
                  style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', fontSize: '0.82rem', color: '#1a1814' }}
                />
              </div>
              <div style={{ padding: '0.5rem' }}>
                <p style={{ fontSize: '0.62rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#b8b0a0', padding: '0.25rem 0.5rem', marginBottom: 2 }}>
                  Quick links
                </p>
                {QUICK_CREATE.map(item => (
                  <Link key={item.href} href={item.href} onClick={() => setSearchOpen(false)}
                    style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0.5rem 0.75rem', borderRadius: '0.4rem', fontSize: '0.82rem', color: '#2e2c28', textDecoration: 'none' }}>
                    <item.icon size={13} style={{ color: gold }} aria-hidden="true" />
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* View site */}
        <a
          href="https://smartautouae.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex', alignItems: 'center', gap: 5,
            height: 36, padding: '0 0.75rem', borderRadius: '0.5rem',
            border: '1px solid #e8e3d8', background: '#ffffff',
            color: '#7a7264', fontSize: '0.75rem', fontWeight: 500,
            textDecoration: 'none',
          }}
          aria-label="View live site"
        >
          <ExternalLink size={12} aria-hidden="true" />
          Live site
        </a>

        {/* Quick create */}
        <div ref={createRef} style={{ position: 'relative' }}>
          <button
            onClick={() => setCreateOpen(!createOpen)}
            style={{
              display: 'flex', alignItems: 'center', gap: 5,
              height: 36, padding: '0 0.875rem', borderRadius: '0.5rem',
              background: gold, border: 'none', color: '#ffffff',
              fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer',
            }}
            aria-expanded={createOpen}
            aria-haspopup="true"
          >
            <Plus size={14} aria-hidden="true" />
            Create
            <ChevronDown size={11} style={{ transform: createOpen ? 'rotate(180deg)' : 'none', transition: 'transform 150ms' }} aria-hidden="true" />
          </button>

          {createOpen && (
            <div style={{ ...dropdownStyle, position: 'absolute', right: 0, top: 44, width: 200, padding: '0.4rem' }} role="menu">
              {QUICK_CREATE.map(item => (
                <Link key={item.href} href={item.href} onClick={() => setCreateOpen(false)}
                  style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0.6rem 0.75rem', borderRadius: '0.4rem', fontSize: '0.82rem', color: '#2e2c28', textDecoration: 'none' }}
                  role="menuitem">
                  <item.icon size={13} style={{ color: gold }} aria-hidden="true" />
                  {item.label}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Notifications */}
        <div ref={notifRef} style={{ position: 'relative' }}>
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            style={{ ...iconBtnStyle }}
            aria-label={`Notifications${unreadCount ? `, ${unreadCount} unread` : ''}`}
            aria-expanded={notifOpen}
          >
            <Bell size={15} aria-hidden="true" />
            {unreadCount > 0 && (
              <span style={{
                position: 'absolute', top: -4, right: -4,
                width: 16, height: 16, borderRadius: '50%',
                background: gold, color: '#fff',
                fontSize: '0.6rem', fontWeight: 700,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '2px solid #f7f6f2',
              }} aria-hidden="true">
                {unreadCount}
              </span>
            )}
          </button>

          {notifOpen && (
            <div style={{ ...dropdownStyle, position: 'absolute', right: 0, top: 44, width: 300, overflow: 'hidden' }} role="region" aria-label="Notifications">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 1rem', borderBottom: '1px solid #f0ece4' }}>
                <p style={{ fontSize: '0.82rem', fontWeight: 600, color: '#1a1814' }}>Notifications</p>
                {unreadCount > 0 && (
                  <button onClick={markAllRead} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.72rem', color: gold, background: 'none', border: 'none', cursor: 'pointer' }}>
                    <Check size={11} aria-hidden="true" /> Mark all read
                  </button>
                )}
              </div>
              <div>
                {notifications.map(n => (
                  <div key={n.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '0.75rem 1rem', background: n.unread ? goldBg : 'transparent', borderBottom: '1px solid #f5f3ef' }}>
                    <div style={{ marginTop: 5, width: 6, height: 6, borderRadius: '50%', background: n.unread ? gold : 'transparent', flexShrink: 0 }} aria-hidden="true" />
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: '0.78rem', color: n.unread ? '#1a1814' : '#7a7264', lineHeight: 1.4 }}>{n.text}</p>
                      <p style={{ fontSize: '0.68rem', color: '#b8b0a0', marginTop: 2 }}>{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ borderTop: '1px solid #f0ece4' }}>
                <Link href="/admin/messages" onClick={() => setNotifOpen(false)}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '0.75rem', fontSize: '0.78rem', color: gold, textDecoration: 'none' }}>
                  <MessageSquare size={12} aria-hidden="true" /> View all messages
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div ref={profileRef} style={{ position: 'relative' }}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            style={{ display: 'flex', alignItems: 'center', gap: 6, height: 36, padding: '0 0.5rem 0 0.25rem', borderRadius: '0.5rem', border: '1px solid #e8e3d8', background: '#ffffff', cursor: 'pointer' }}
            aria-expanded={profileOpen}
            aria-haspopup="true"
            aria-label="Profile menu"
          >
            <div style={{ width: 28, height: 28, borderRadius: '0.375rem', background: goldBg, border: `1px solid ${goldBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: 700, color: gold }}>
              SA
            </div>
            <ChevronDown size={11} style={{ color: '#b8b0a0', transform: profileOpen ? 'rotate(180deg)' : 'none', transition: 'transform 150ms' }} aria-hidden="true" />
          </button>

          {profileOpen && (
            <div style={{ ...dropdownStyle, position: 'absolute', right: 0, top: 44, width: 200, overflow: 'hidden' }} role="menu">
              <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid #f0ece4' }}>
                <p style={{ fontSize: '0.82rem', fontWeight: 600, color: '#1a1814' }}>Admin</p>
                <p style={{ fontSize: '0.72rem', color: '#b8b0a0' }}>smartautouae.com</p>
              </div>
              <div style={{ padding: '0.4rem' }}>
                <Link href="/admin/settings" onClick={() => setProfileOpen(false)}
                  style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0.6rem 0.75rem', borderRadius: '0.4rem', fontSize: '0.82rem', color: '#2e2c28', textDecoration: 'none' }} role="menuitem">
                  <Settings size={13} style={{ color: '#7a7264' }} aria-hidden="true" /> Settings
                </Link>
                <Link href="/admin/settings#profile" onClick={() => setProfileOpen(false)}
                  style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0.6rem 0.75rem', borderRadius: '0.4rem', fontSize: '0.82rem', color: '#2e2c28', textDecoration: 'none' }} role="menuitem">
                  <User size={13} style={{ color: '#7a7264' }} aria-hidden="true" /> Profile
                </Link>
              </div>
              <div style={{ borderTop: '1px solid #f0ece4', padding: '0.4rem' }}>
                <form action="/api/admin/logout" method="POST">
                  <button type="submit"
                    style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '0.6rem 0.75rem', borderRadius: '0.4rem', fontSize: '0.82rem', color: '#dc2626', background: 'none', border: 'none', cursor: 'pointer' }}
                    role="menuitem">
                    <LogOut size={13} aria-hidden="true" /> Sign out
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>

      </div>
    </header>
  )
}