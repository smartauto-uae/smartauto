import Link from 'next/link'
import { getAllSeoPages } from '@/lib/seo'

const gold       = '#b8860b'
const goldBg     = '#fdf8ee'
const goldBorder = '#e8d48a'

export default async function SeoAdminPage() {
  const pages = await getAllSeoPages()

  return (
    <div style={{ color: '#1a1814' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <div>
          <p style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.18em', color: gold, marginBottom: '0.25rem' }}>
            SEO Management
          </p>
          <h1 style={{ fontWeight: 700, fontSize: 'clamp(1.25rem,3vw,1.75rem)', color: '#1a1814', lineHeight: 1.2 }}>
            All Pages
          </h1>
          <p style={{ fontSize: '0.78rem', color: '#7a7264', marginTop: '0.2rem' }}>
            {pages.length} routes
          </p>
        </div>
      </div>

      {/* ── Desktop Table ── */}
      <div className="seo-table-wrap" style={{
        background: '#ffffff', border: '1px solid #e8e3d8',
        borderRadius: '0.75rem', overflow: 'hidden',
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #e8e3d8', background: '#fafaf9' }}>
              {['Page', 'Route', 'Title', 'Status', 'Actions'].map((h) => (
                <th key={h} style={{
                  padding: '0.875rem 1.25rem', textAlign: 'left',
                  fontSize: '0.65rem', fontWeight: 700,
                  textTransform: 'uppercase', letterSpacing: '0.14em',
                  color: '#7a7264', whiteSpace: 'nowrap',
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
                <tr key={page.id} style={{ borderBottom: '1px solid #f0ece4' }}>
                  <td style={{ padding: '1rem 1.25rem' }}>
                    <div style={{ fontWeight: 600, color: '#1a1814', fontSize: '0.875rem' }}>
                      {page.page_label}
                    </div>
                  </td>
                  <td style={{ padding: '1rem 1.25rem' }}>
                    <code style={{ fontSize: '0.75rem', color: '#7a7264', background: '#f5f3ef', padding: '0.15rem 0.45rem', borderRadius: '0.25rem', border: '1px solid #e8e3d8' }}>
                      {page.route}
                    </code>
                  </td>
                  <td style={{ padding: '1rem 1.25rem', maxWidth: 220 }}>
                    {page.title ? (
                      <span style={{ fontSize: '0.8rem', color: '#2e2c28' }}>
                        {page.title.slice(0, 45)}{page.title.length > 45 ? '…' : ''}
                      </span>
                    ) : (
                      <em style={{ fontSize: '0.78rem', color: '#b8b0a0' }}>not set</em>
                    )}
                  </td>
                  <td style={{ padding: '1rem 1.25rem' }}>
                    <span style={{
                      display: 'inline-block', padding: '0.2rem 0.65rem', borderRadius: 999,
                      fontSize: '0.68rem', fontWeight: 700,
                      background: filled ? '#f0fdf4' : '#fef2f2',
                      border: `1px solid ${filled ? '#86efac' : '#fca5a5'}`,
                      color: filled ? '#16a34a' : '#dc2626',
                    }}>
                      {filled ? 'Complete' : 'Incomplete'}
                    </span>
                  </td>
                  <td style={{ padding: '1rem 1.25rem' }}>
                    <Link href={`/admin/seo/${encodeURIComponent(page.route)}`} style={{
                      display: 'inline-block', padding: '0.2rem 0.65rem', borderRadius: 999,
                      fontSize: '0.75rem', fontWeight: 600, textDecoration: 'none',
                      color: gold, background: goldBg, border: `1px solid ${goldBorder}`,
                      minHeight: 32, lineHeight: '1.8',
                    }}>
                      Edit SEO
                    </Link>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* ── Mobile Cards ── hidden by default, shown via media query ── */}
      <div className="seo-cards-wrap" style={{ display: 'none', flexDirection: 'column', gap: '0.75rem' }}>
        {pages.map((page) => {
          const filled = !!(page.title && page.description && page.og_image)
          return (
            <div key={page.id} style={{
              background: '#ffffff', border: '1px solid #e8e3d8',
              borderRadius: '0.75rem', padding: '1rem',
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.625rem' }}>
                <div style={{ minWidth: 0 }}>
                  <p style={{ fontWeight: 600, fontSize: '0.875rem', color: '#1a1814', marginBottom: '0.25rem' }}>
                    {page.page_label}
                  </p>
                  <code style={{ fontSize: '0.72rem', color: '#7a7264', background: '#f5f3ef', padding: '0.15rem 0.45rem', borderRadius: '0.25rem', border: '1px solid #e8e3d8' }}>
                    {page.route}
                  </code>
                </div>
                <span style={{
                  flexShrink: 0, padding: '0.2rem 0.65rem', borderRadius: 999,
                  fontSize: '0.68rem', fontWeight: 700,
                  background: filled ? '#f0fdf4' : '#fef2f2',
                  border: `1px solid ${filled ? '#86efac' : '#fca5a5'}`,
                  color: filled ? '#16a34a' : '#dc2626',
                }}>
                  {filled ? 'Complete' : 'Incomplete'}
                </span>
              </div>
              <p style={{ fontSize: '0.78rem', color: page.title ? '#2e2c28' : '#b8b0a0', marginBottom: '0.875rem', fontStyle: page.title ? 'normal' : 'italic' }}>
                {page.title ? `${page.title.slice(0, 60)}${page.title.length > 60 ? '…' : ''}` : 'No title set'}
              </p>
              <Link href={`/admin/seo/${encodeURIComponent(page.route)}`} style={{
                display: 'inline-flex', alignItems: 'center',
                padding: '0.4rem 1rem', borderRadius: '0.5rem',
                fontSize: '0.8rem', fontWeight: 600, textDecoration: 'none',
                color: gold, background: goldBg, border: `1px solid ${goldBorder}`,
                minHeight: 40,
              }}>
                Edit SEO
              </Link>
            </div>
          )
        })}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .seo-table-wrap { display: none !important; }
          .seo-cards-wrap { display: flex !important; }
        }
      `}</style>

    </div>
  )
}