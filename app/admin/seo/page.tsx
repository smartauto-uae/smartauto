import Link from 'next/link'
import { getAllSeoPages } from '@/lib/seo'
import AdminHeader from '@/components/admin/AdminHeader'

const gold     = '#C9A84C'
const goldGrad = 'linear-gradient(135deg,#C9A84C,#E8C96A)'

export default async function SeoAdminPage() {
  const pages = await getAllSeoPages()

  return (
    <main style={{ backgroundColor: '#080808', minHeight: '100vh', color: '#fff' }}>
      <AdminHeader />
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-[11px] tracking-[0.3em] uppercase mb-1" style={{ color: gold }}>
              SEO Management
            </p>
            <h1 className="font-bold text-[28px] text-white" style={{ fontFamily: 'var(--font-playfair),serif' }}>
              All Pages — {pages.length} routes
            </h1>
          </div>
        </div>

        <div className="rounded-2xl border overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
                {['Page', 'Route', 'Title', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="px-5 py-4 text-left text-[10px] uppercase tracking-[0.15em]"
                    style={{ color: 'rgba(255,255,255,0.35)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pages.map((page) => {
                const filled = !!(page.title && page.description && page.og_image)
                return (
                  <tr key={page.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <td className="px-5 py-4">
                      <div className="font-medium text-white">{page.page_label}</div>
                    </td>
                    <td className="px-5 py-4">
                      <code className="text-[11px]" style={{ color: 'rgba(255,255,255,0.4)' }}>{page.route}</code>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-[12px]" style={{ color: 'rgba(255,255,255,0.5)' }}>
                        {page.title ? page.title.slice(0, 45) + (page.title.length > 45 ? '…' : '') : <em style={{ color: 'rgba(255,255,255,0.2)' }}>not set</em>}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className="px-2.5 py-1 rounded-full text-[10px] font-semibold"
                        style={{
                          background: filled ? 'rgba(74,222,128,0.08)' : 'rgba(248,113,113,0.08)',
                          border: `1px solid ${filled ? 'rgba(74,222,128,0.2)' : 'rgba(248,113,113,0.2)'}`,
                          color: filled ? '#4ade80' : '#f87171',
                        }}
                      >
                        {filled ? 'Complete' : 'Incomplete'}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <Link
                        href={`/admin/seo/${encodeURIComponent(page.route)}`}
                        className="px-4 py-1.5 rounded-lg text-[12px] font-semibold border transition-all no-underline"
                        style={{ borderColor: 'rgba(201,168,76,0.25)', color: gold, background: 'rgba(201,168,76,0.05)' }}
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