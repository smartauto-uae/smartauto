'use client'

import { usePathname } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import {
  Bell,
  Search,
  Plus,
  ExternalLink,
  FileText,
  Search as SearchIcon,
  Layers,
  MessageSquare,
  ChevronDown,
  Check,
  User,
  Settings,
  LogOut,
} from 'lucide-react'

const GOLD     = '#C9A84C'
const GOLD2    = '#E8C96A'
const GOLD3    = '#A07830'
const goldGrad = `linear-gradient(135deg,${GOLD},${GOLD2},${GOLD3})`

// ─── Page title map ───────────────────────────────────────────────────────────
const PAGE_TITLES: Record<string, { title: string; subtitle?: string }> = {
  '/admin':              { title: 'Dashboard',   subtitle: 'Overview of your site activity' },
  '/admin/analytics':    { title: 'Analytics',   subtitle: 'Traffic, sessions and conversions' },
  '/admin/blog':         { title: 'Blog Posts',  subtitle: 'Manage articles and drafts' },
  '/admin/media':        { title: 'Media',       subtitle: 'Images and uploaded files' },
  '/admin/services':     { title: 'Services',    subtitle: 'Manage service pages' },
  '/admin/seo':          { title: 'SEO',         subtitle: 'Page metadata and rankings' },
  '/admin/redirects':    { title: 'Redirects',   subtitle: '301 and 302 URL redirects' },
  '/admin/sitemap':      { title: 'Sitemap',     subtitle: 'XML sitemap management' },
  '/admin/reviews':      { title: 'Reviews',     subtitle: 'Customer reviews and ratings' },
  '/admin/messages':     { title: 'Messages',    subtitle: 'Contact form submissions' },
  '/admin/branches':     { title: 'Branches',    subtitle: 'UAE branch locations' },
  '/admin/settings':     { title: 'Settings',    subtitle: 'Site configuration' },
}

// ─── Quick-create shortcuts ───────────────────────────────────────────────────
const QUICK_CREATE = [
  { label: 'New Blog Post',  href: '/admin/blog/new',      icon: FileText },
  { label: 'New Service',    href: '/admin/services/new',  icon: Layers },
  { label: 'Add Redirect',   href: '/admin/redirects/new', icon: SearchIcon },
]

// ─── Mock notifications ───────────────────────────────────────────────────────
const NOTIFICATIONS = [
  { id: 1, text: '3 new contact form messages',  time: '5m ago',  unread: true  },
  { id: 2, text: 'New review submitted (5★)',     time: '22m ago', unread: true  },
  { id: 3, text: 'Sitemap regenerated successfully', time: '1h ago', unread: false },
  { id: 4, text: 'Blog post published: "Tinting Guide"', time: '3h ago', unread: false },
]

// ─── Breadcrumb builder ───────────────────────────────────────────────────────
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

// ─── Hook: close on outside click ─────────────────────────────────────────────
function useClickOutside(ref: React.RefObject<HTMLElement | null>, cb: () => void) {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) cb()
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [ref, cb])
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function AdminHeader() {
  const pathname = usePathname()
  const page     = PAGE_TITLES[pathname] ?? { title: 'Admin', subtitle: '' }
  const crumbs   = buildCrumbs(pathname)

  const [searchOpen,  setSearchOpen]  = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [notifOpen,   setNotifOpen]   = useState(false)
  const [createOpen,  setCreateOpen]  = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [notifications, setNotifications] = useState(NOTIFICATIONS)

  const notifRef   = useRef<HTMLDivElement>(null)
  const createRef  = useRef<HTMLDivElement>(null)
  const profileRef = useRef<HTMLDivElement>(null)
  const searchRef  = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  useClickOutside(notifRef,   () => setNotifOpen(false))
  useClickOutside(createRef,  () => setCreateOpen(false))
  useClickOutside(profileRef, () => setProfileOpen(false))
  useClickOutside(searchRef,  () => { setSearchOpen(false); setSearchQuery('') })

  const unreadCount = notifications.filter(n => n.unread).length

  const markAllRead = () =>
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })))

  // Open search with Cmd/Ctrl+K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(true)
        setTimeout(() => searchInputRef.current?.focus(), 50)
      }
      if (e.key === 'Escape') {
        setSearchOpen(false)
        setSearchQuery('')
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <header
      className="sticky top-0 z-20 flex items-center gap-4 px-6 h-16"
      style={{
        background:   'rgba(8,8,8,0.92)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      {/* ── Left: title + breadcrumb ── */}
      <div className="flex-1 min-w-0 pl-12 lg:pl-0">
        {/* Breadcrumb — desktop */}
        <nav aria-label="Breadcrumb" className="hidden lg:flex items-center gap-1.5 mb-0.5">
          {crumbs.map((crumb, i) => (
            <span key={crumb.href} className="flex items-center gap-1.5">
              {i > 0 && (
                <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 12 }}>/</span>
              )}
              {i === crumbs.length - 1 ? (
                <span
                  className="text-[11px] font-medium"
                  style={{ color: GOLD }}
                  aria-current="page"
                >
                  {crumb.label}
                </span>
              ) : (
                <Link
                  href={crumb.href}
                  className="text-[11px] transition-colors"
                  style={{ color: 'rgba(255,255,255,0.3)' }}
                >
                  {crumb.label}
                </Link>
              )}
            </span>
          ))}
        </nav>

        {/* Page title */}
        <div className="flex items-baseline gap-3">
          <h1
            className="font-bold text-white leading-none truncate"
            style={{ fontSize: 'clamp(1rem,1.5vw,1.2rem)' }}
          >
            {page.title}
          </h1>
          {page.subtitle && (
            <span
              className="hidden lg:block text-[12px] truncate"
              style={{ color: 'rgba(255,255,255,0.3)' }}
            >
              {page.subtitle}
            </span>
          )}
        </div>
      </div>

      {/* ── Right: actions ── */}
      <div className="flex items-center gap-2 flex-shrink-0">

        {/* Search bar (inline, expands) */}
        <div ref={searchRef} className="relative">
          <button
            onClick={() => {
              setSearchOpen(true)
              setTimeout(() => searchInputRef.current?.focus(), 50)
            }}
            className="flex items-center gap-2 h-9 rounded-xl px-3 transition-all"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border:     '1px solid rgba(255,255,255,0.07)',
              color:      'rgba(255,255,255,0.35)',
            }}
            aria-label="Search"
          >
            <Search size={14} aria-hidden="true" />
            {!searchOpen && (
              <span className="hidden md:block text-[12px]">Search</span>
            )}
            <span
              className="hidden md:block text-[10px] px-1.5 py-0.5 rounded"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border:     '1px solid rgba(255,255,255,0.1)',
                color:      'rgba(255,255,255,0.25)',
              }}
            >
              ⌘K
            </span>
          </button>

          {/* Search dropdown */}
          {searchOpen && (
            <div
              className="absolute right-0 top-11 w-80 rounded-2xl overflow-hidden shadow-2xl"
              style={{
                background: '#111',
                border:     '1px solid rgba(201,168,76,0.15)',
              }}
            >
              <div className="flex items-center gap-2 px-4 py-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <Search size={14} style={{ color: 'rgba(255,255,255,0.3)', flexShrink: 0 }} aria-hidden="true" />
                <input
                  ref={searchInputRef}
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search pages, posts, services…"
                  className="flex-1 bg-transparent text-white text-[13px] outline-none placeholder:text-white/25"
                />
              </div>
              <div className="px-3 py-2">
                <p className="text-[10px] uppercase tracking-wider px-2 mb-1.5" style={{ color: 'rgba(255,255,255,0.2)' }}>
                  Quick links
                </p>
                {QUICK_CREATE.map(item => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSearchOpen(false)}
                    className="flex items-center gap-3 px-2 py-2 rounded-lg text-[13px] transition-colors"
                    style={{ color: 'rgba(255,255,255,0.55)' }}
                  >
                    <item.icon size={13} aria-hidden="true" />
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
          className="hidden md:flex items-center gap-1.5 h-9 px-3 rounded-xl text-[12px] font-medium transition-all"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border:     '1px solid rgba(255,255,255,0.07)',
            color:      'rgba(255,255,255,0.4)',
          }}
          aria-label="View live site"
        >
          <ExternalLink size={13} aria-hidden="true" />
          <span>Live site</span>
        </a>

        {/* Quick create */}
        <div ref={createRef} className="relative">
          <button
            onClick={() => setCreateOpen(!createOpen)}
            className="flex items-center gap-1.5 h-9 px-3 rounded-xl text-[12px] font-semibold text-black transition-all"
            style={{ background: goldGrad }}
            aria-expanded={createOpen}
            aria-haspopup="true"
          >
            <Plus size={15} aria-hidden="true" />
            <span className="hidden sm:block">Create</span>
            <ChevronDown size={12} className={`transition-transform ${createOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
          </button>

          {createOpen && (
            <div
              className="absolute right-0 top-11 w-52 rounded-2xl py-2 shadow-2xl"
              style={{
                background: '#111',
                border:     '1px solid rgba(201,168,76,0.15)',
              }}
              role="menu"
            >
              {QUICK_CREATE.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setCreateOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-[13px] transition-colors"
                  style={{ color: 'rgba(255,255,255,0.6)' }}
                  role="menuitem"
                >
                  <item.icon size={14} aria-hidden="true" style={{ color: GOLD }} />
                  {item.label}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Notifications */}
        <div ref={notifRef} className="relative">
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="relative flex items-center justify-center w-9 h-9 rounded-xl transition-all"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border:     '1px solid rgba(255,255,255,0.07)',
              color:      'rgba(255,255,255,0.5)',
            }}
            aria-label={`Notifications${unreadCount ? `, ${unreadCount} unread` : ''}`}
            aria-expanded={notifOpen}
          >
            <Bell size={15} aria-hidden="true" />
            {unreadCount > 0 && (
              <span
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold text-black"
                style={{ background: goldGrad }}
                aria-hidden="true"
              >
                {unreadCount}
              </span>
            )}
          </button>

          {notifOpen && (
            <div
              className="absolute right-0 top-11 w-80 rounded-2xl shadow-2xl overflow-hidden"
              style={{
                background: '#111',
                border:     '1px solid rgba(201,168,76,0.15)',
              }}
              role="region"
              aria-label="Notifications"
            >
              {/* Header */}
              <div
                className="flex items-center justify-between px-4 py-3"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
              >
                <p className="text-white font-semibold text-[13px]">Notifications</p>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllRead}
                    className="flex items-center gap-1 text-[11px] transition-colors"
                    style={{ color: GOLD }}
                  >
                    <Check size={11} aria-hidden="true" />
                    Mark all read
                  </button>
                )}
              </div>

              {/* Items */}
              <div className="py-1">
                {notifications.map(n => (
                  <div
                    key={n.id}
                    className="flex items-start gap-3 px-4 py-3 transition-colors"
                    style={{
                      background: n.unread ? 'rgba(201,168,76,0.04)' : 'transparent',
                    }}
                  >
                    {n.unread && (
                      <div
                        className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: GOLD }}
                        aria-hidden="true"
                      />
                    )}
                    {!n.unread && <div className="mt-1.5 w-1.5 h-1.5 flex-shrink-0" aria-hidden="true" />}
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-[12px] leading-snug"
                        style={{ color: n.unread ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.4)' }}
                      >
                        {n.text}
                      </p>
                      <p className="text-[10px] mt-0.5" style={{ color: 'rgba(255,255,255,0.25)' }}>
                        {n.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <Link
                  href="/admin/messages"
                  onClick={() => setNotifOpen(false)}
                  className="flex items-center justify-center gap-1.5 py-3 text-[12px] transition-colors"
                  style={{ color: GOLD }}
                >
                  <MessageSquare size={12} aria-hidden="true" />
                  View all messages
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div ref={profileRef} className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 h-9 pl-1 pr-2 rounded-xl transition-all"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border:     '1px solid rgba(255,255,255,0.07)',
            }}
            aria-expanded={profileOpen}
            aria-haspopup="true"
            aria-label="Profile menu"
          >
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold text-black"
              style={{ background: goldGrad }}
              aria-hidden="true"
            >
              SA
            </div>
            <ChevronDown
              size={12}
              className={`transition-transform hidden sm:block ${profileOpen ? 'rotate-180' : ''}`}
              style={{ color: 'rgba(255,255,255,0.3)' }}
              aria-hidden="true"
            />
          </button>

          {profileOpen && (
            <div
              className="absolute right-0 top-11 w-52 rounded-2xl py-2 shadow-2xl"
              style={{
                background: '#111',
                border:     '1px solid rgba(201,168,76,0.15)',
              }}
              role="menu"
            >
              {/* User info */}
              <div className="px-4 py-2.5" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <p className="text-white text-[13px] font-semibold">Admin</p>
                <p className="text-[11px]" style={{ color: 'rgba(255,255,255,0.3)' }}>smartautouae.ae</p>
              </div>

              <div className="py-1">
                <Link
                  href="/admin/settings"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-[13px] transition-colors"
                  style={{ color: 'rgba(255,255,255,0.55)' }}
                  role="menuitem"
                >
                  <Settings size={14} aria-hidden="true" />
                  Settings
                </Link>
                <Link
                  href="/admin/settings#profile"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-[13px] transition-colors"
                  style={{ color: 'rgba(255,255,255,0.55)' }}
                  role="menuitem"
                >
                  <User size={14} aria-hidden="true" />
                  Profile
                </Link>
              </div>

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <form action="/api/admin/logout" method="POST">
                  <button
                    type="submit"
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-[13px] transition-colors"
                    style={{ color: 'rgba(220,80,80,0.7)' }}
                    role="menuitem"
                  >
                    <LogOut size={14} aria-hidden="true" />
                    Sign out
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