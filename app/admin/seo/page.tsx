import Link from 'next/link'
import { getAllSeoPages } from '@/lib/seo'
import AdminHeader from '@/components/admin/AdminHeader'

const gold       = '#b8860b'
const goldBg     = '#fdf8ee'
const goldBorder = '#e8d48a'

export default async function SeoAdminPage() {
  const pages = await getAllSeoPages()

  return (
    <main style={{ backgroundColor: '#f7f6f2', minHeight: '100vh', color: '#1a1814' }}>
      <AdminHeader />
      <div className="max-w-5xl mx-auto px-6 py-12">

        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <p style={{
              fontSize: '0.65rem', fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '0.18em',
              color: gold, marginBottom: '0.35rem',
            }}>
              SEO Management
            </p>
            <h1 style={{
              fontWeight: 800, fontSize: '1.75rem',
              color: '#1a1814', fontFamily: 'var(--font-playfair),serif',
            }}>
              All Pages — {pages.length} routes
            </h1>
          </div>
        </div>

        {/* Table */}
        <div style={{
          background: '#ffffff',
          border: '1px solid #e8e3d8',
          borderRadius: '0.75rem',
          overflow: 'hidden',
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #e8e3d8', background: '#fafaf9' }}>
                {['Page', 'Route', 'Title', 'Status', 'Actions'].map((h) => (
                  <th key={h} style={{
                    padding: '0.875rem 1.25rem',
                    textAlign: 'left',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.14em',
                    color: '#7a7264',
                  }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pages.map((page) => {
                const filled = !!(page.title && page.description && page.og_image)
                return (
                  <tr
                    key={page.id}
                    style={{ borderBottom: '1px solid #f0ece4' }}
                  >
                    {/* Page */}
                    <td style={{ padding: '1rem 1.25rem' }}>
                      <div style={{ fontWeight: 600, color: '#1a1814', fontSize: '0.875rem' }}>
                        {page.page_label}
                      </div>
                    </td>

                    {/* Route */}
                    <td style={{ padding: '1rem 1.25rem' }}>
                      <code style={{
                        fontSize: '0.75rem', color: '#7a7264',
                        background: '#f5f3ef', padding: '0.15rem 0.45rem',
                        borderRadius: '0.25rem', border: '1px solid #e8e3d8',
                      }}>
                        {page.route}
                      </code>
                    </td>

                    {/* Title */}
                    <td style={{ padding: '1rem 1.25rem' }}>
                      {page.title
                        ? (
                          <span style={{ fontSize: '0.8rem', color: '#2e2c28' }}>
                            {page.title.slice(0, 45)}{page.title.length > 45 ? '…' : ''}
                          </span>
                        ) : (
                          <em style={{ fontSize: '0.78rem', color: '#b8b0a0' }}>not set</em>
                        )}
                    </td>

                    {/* Status */}
                    <td style={{ padding: '1rem 1.25rem' }}>
                      <span style={{
                        display: 'inline-block',
                        padding: '0.2rem 0.65rem',
                        borderRadius: 999,
                        fontSize: '0.68rem',
                        fontWeight: 700,
                        background: filled ? '#f0fdf4' : '#fef2f2',
                        border: `1px solid ${filled ? '#86efac' : '#fca5a5'}`,
                        color: filled ? '#16a34a' : '#dc2626',
                      }}>
                        {filled ? 'Complete' : 'Incomplete'}
                      </span>
                    </td>

                    {/* Actions */}
                    <td style={{ padding: '1rem 1.25rem' }}>
                      <Link
                        href={`/admin/seo/${encodeURIComponent(page.route)}`}
                        style={{
                          display: 'inline-block',
                          padding: '0.35rem 0.875rem',
                          borderRadius: 999,
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          textDecoration: 'none',
                          color: gold,
                          background: goldBg,
                          border: `1px solid ${goldBorder}`,
                        }}
                      >
                        Edit SEO
                      </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

      </div>
    </main>
  )
}