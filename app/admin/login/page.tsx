'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const gold     = '#C9A84C'
const goldGrad = 'linear-gradient(135deg,#C9A84C,#E8C96A)'

export default function LoginPage() {
  const router  = useRouter()
  const [form, setForm]   = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await fetch('/api/admin/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    if (res.ok) {
      router.push('/admin')
    } else {
      setError('Invalid username or password')
    }
    setLoading(false)
  }

  return (
    <main
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: '#050505' }}
    >
      <div
        className="w-full max-w-md rounded-3xl p-10 border"
        style={{ border: '1px solid rgba(201,168,76,0.15)', background: 'rgba(255,255,255,0.02)' }}
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div
            className="text-[11px] tracking-[0.3em] uppercase mb-3"
            style={{ color: gold }}
          >
            Smart Auto UAE
          </div>
          <h1
            className="font-bold text-[28px] text-white"
            style={{ fontFamily: 'var(--font-playfair),serif' }}
          >
            CMS Login
          </h1>
          <p className="text-[13px] mt-2" style={{ color: 'rgba(255,255,255,0.3)' }}>
            Blog management dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label
              className="block text-[10px] uppercase tracking-[0.15em] mb-2"
              style={{ color: 'rgba(255,255,255,0.4)' }}
            >
              Username
            </label>
            <input
              type="text"
              autoComplete="username"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none transition-all"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
              onFocus={(e) => (e.target.style.borderColor = 'rgba(201,168,76,0.5)')}
              onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
              required
            />
          </div>

          <div>
            <label
              className="block text-[10px] uppercase tracking-[0.15em] mb-2"
              style={{ color: 'rgba(255,255,255,0.4)' }}
            >
              Password
            </label>
            <input
              type="password"
              autoComplete="current-password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none transition-all"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
              onFocus={(e) => (e.target.style.borderColor = 'rgba(201,168,76,0.5)')}
              onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
              required
            />
          </div>

          {error && (
            <p className="text-[13px] text-center" style={{ color: '#f87171' }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl font-bold text-sm text-black mt-2 transition-opacity"
            style={{ background: goldGrad, opacity: loading ? 0.7 : 1 }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </main>
  )
}