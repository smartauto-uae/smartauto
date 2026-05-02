'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/admin/blog', label: 'Blog' },
  { href: '/admin/pages', label: 'Pages' },
  { href: '/', label: '← Site' },
]

export default function AdminNav() {
  const pathname = usePathname()

  return (
    <nav style={{ display: 'flex', gap: '0.25rem' }}>
      {links.map(({ href, label }) => {
        const isActive = pathname.startsWith(href) && href !== '/'
        return (
          <Link
            key={href}
            href={href}
            style={{
              fontSize: '0.875rem',
              fontWeight: 500,
              textDecoration: 'none',
              padding: '0.375rem 0.75rem',
              borderRadius: 'var(--admin-radius)',
              transition: 'background 150ms, color 150ms',
              background: isActive ? 'var(--admin-gold-subtle)' : 'transparent',
              color: isActive ? 'var(--admin-gold)' : 'var(--admin-text-muted)',
            }}
            className="admin-nav-link"
          >
            {label}
          </Link>
        )
      })}
    </nav>
  )
}