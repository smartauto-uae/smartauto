'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

const gold     = '#C9A84C'
const goldGrad = 'linear-gradient(135deg,#C9A84C,#E8C96A)'

export default function AdminHeader() {
  const router = useRouter()

  const logout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' })
    router.push('/admin/login')
  }

  return (
    <header
      className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 border-b"
      style={{
        backgroundColor: 'rgba(5,5,5,0.95)',
        borderColor: 'rgba(255,255,255,0.07)',
        backdropFilter: 'blur(12px)',
      }}
    >
      <div className="flex items-center gap-4">
        <Link href="/admin" className="no-underline">
          <span
            className="font-bold text-[15px]"
            style={{
              background: goldGrad,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontFamily: 'var(--font-playfair),serif',
            }}
          >
            Smart Auto CMS
          </span>
        </Link>
        <span className="text-[11px] px-2 py-0.5 rounded-full" style={{ background: 'rgba(201,168,76,0.08)', color: gold, border: '1px solid rgba(201,168,76,0.2)' }}>
          Blog
        </span>
      </div>

      <div className="flex items-center gap-3">
        <Link
          href="/admin/new"
          className="px-4 py-2 rounded-lg text-[12px] font-semibold text-black"
          style={{ background: goldGrad }}
        >
          + New Post
        </Link>
        <button
          onClick={logout}
          className="px-4 py-2 rounded-lg text-[12px] font-medium border transition-all"
          style={{
            borderColor: 'rgba(255,255,255,0.1)',
            color: 'rgba(255,255,255,0.4)',
            background: 'transparent',
          }}
        >
          Logout
        </button>
      </div>
    </header>
  )
}