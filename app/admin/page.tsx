import Link from 'next/link'
import { listBlogFiles } from '@/lib/github'
import AdminHeader from '@/components/admin/AdminHeader'

const gold     = '#C9A84C'
const goldGrad = 'linear-gradient(135deg,#C9A84C,#E8C96A)'

export default async function AdminDashboard() {
  const files = await listBlogFiles()

  return (
    <main style={{ backgroundColor: '#080808', minHeight: '100vh', color: '#fff' }}>
      <AdminHeader />

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-[11px] tracking-[0.3em] uppercase mb-1" style={{ color: gold }}>
              Blog Posts
            </p>
            <h1
              className="font-bold text-[28px] text-white"
              style={{ fontFamily: 'var(--font-playfair),serif' }}
            >
              {files.length} Published Posts
            </h1>
          </div>
          <Link
            href="/admin/new"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-black"
            style={{ background: goldGrad }}
          >
            + New Post
          </Link>
        </div>

        {/* Posts table */}
        <div
          className="rounded-2xl border overflow-hidden"
          style={{ border: '1px solid rgba(255,255,255,0.06)' }}
        >
          {files.length === 0 ? (
            <div className="py-20 text-center" style={{ color: 'rgba(255,255,255,0.3)' }}>
              No posts yet.{' '}
              <Link href="/admin/new" style={{ color: gold }}>
                Create your first post →
              </Link>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
                  {['Slug / File', 'Actions'].map((h) => (
                    <th
                      key={h}
                      className="px-6 py-4 text-left text-[10px] uppercase tracking-[0.15em]"
                      style={{ color: 'rgba(255,255,255,0.35)' }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {files.map((file) => {
                  const slug = file.name.replace('.mdx', '')
                  return (
                    <tr
                      key={slug}
                      style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                    >
                      <td className="px-6 py-4">
                        <div className="font-medium text-white">{slug}</div>
                        <div className="text-[11px] mt-0.5" style={{ color: 'rgba(255,255,255,0.3)' }}>
                          {file.path}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <Link
                            href={`/admin/edit/${slug}`}
                            className="px-4 py-1.5 rounded-lg text-[12px] font-semibold border transition-all"
                            style={{
                              borderColor: 'rgba(201,168,76,0.25)',
                              color: gold,
                              background: 'rgba(201,168,76,0.05)',
                            }}
                          >
                            Edit
                          </Link>
                          <Link
                            href={`/blog/${slug}`}
                            target="_blank"
                            className="px-4 py-1.5 rounded-lg text-[12px] font-semibold border transition-all"
                            style={{
                              borderColor: 'rgba(255,255,255,0.1)',
                              color: 'rgba(255,255,255,0.45)',
                              background: 'transparent',
                            }}
                          >
                            View ↗
                          </Link>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </main>
  )
}