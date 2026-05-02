'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, LogIn, AlertCircle, Loader2 } from 'lucide-react'

const GOLD     = '#C9A84C'
const GOLD2    = '#E8C96A'
const GOLD3    = '#A07830'
const goldGrad = `linear-gradient(135deg,${GOLD},${GOLD2},${GOLD3})`

export default function AdminLoginPage() {
  const router = useRouter()

  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState('')
  const [shake,    setShake]    = useState(false)

  const emailRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    emailRef.current?.focus()
  }, [])

  const triggerShake = () => {
    setShake(true)
    setTimeout(() => setShake(false), 500)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      setError('Please enter your email and password.')
      triggerShake()
      return
    }

    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/admin/login', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error ?? 'Invalid email or password.')
        triggerShake()
        return
      }

      router.push('/admin')
      router.refresh()
    } catch {
      setError('Network error. Please try again.')
      triggerShake()
    } finally {
      setLoading(false)
    }
  }

  const inputBase: React.CSSProperties = {
    width:        '100%',
    background:   'rgba(255,255,255,0.04)',
    border:       '1px solid rgba(255,255,255,0.08)',
    borderRadius: '0.875rem',
    color:        '#fff',
    fontSize:     '0.9375rem',
    padding:      '0.875rem 1rem',
    outline:      'none',
    transition:   'border-color 180ms ease, box-shadow 180ms ease',
  }

  return (
    <main
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'linear-gradient(160deg,#060606 0%,#0c0c0c 100%)' }}
    >
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 40%,rgba(201,168,76,0.05) 0%,transparent 60%)' }}
        aria-hidden="true"
      />

      <div className="w-full max-w-sm relative z-10">

        {/* ── Logo / Brand ── */}
        <div className="text-center mb-10">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-black text-lg mx-auto mb-5"
            style={{ background: goldGrad }}
            aria-hidden="true"
          >
            SA
          </div>
          <h1
            className="font-bold text-white text-2xl mb-1"
            style={{ fontFamily: 'var(--font-playfair),serif' }}
          >
            Smart Auto UAE
          </h1>
          <p className="text-[13px]" style={{ color: 'rgba(255,255,255,0.3)' }}>
            Admin Panel — Sign in to continue
          </p>
        </div>

        {/* ── Card ── */}
        <div
          className="rounded-2xl p-7"
          style={{
            background:   'rgba(255,255,255,0.02)',
            border:       '1px solid rgba(255,255,255,0.07)',
            animation:    shake ? 'shake 0.45s ease' : undefined,
          }}
        >

          {/* Error banner */}
          {error && (
            <div
              className="flex items-center gap-3 px-4 py-3 rounded-xl mb-5 text-[13px]"
              style={{
                background: 'rgba(248,113,113,0.08)',
                border:     '1px solid rgba(248,113,113,0.2)',
                color:      '#f87171',
              }}
              role="alert"
            >
              <AlertCircle size={15} aria-hidden="true" style={{ flexShrink: 0 }} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>

            {/* Email */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-[11px] uppercase tracking-[0.15em] font-semibold mb-2"
                style={{ color: 'rgba(255,255,255,0.4)' }}
              >
                Email Address
              </label>
              <input
                ref={emailRef}
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError('') }}
                placeholder="admin@smartautouae.ae"
                style={inputBase}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(201,168,76,0.4)'
                  e.currentTarget.style.boxShadow   = '0 0 0 3px rgba(201,168,76,0.08)'
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                  e.currentTarget.style.boxShadow   = 'none'
                }}
                disabled={loading}
                aria-required="true"
              />
            </div>

            {/* Password */}
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-[11px] uppercase tracking-[0.15em] font-semibold mb-2"
                style={{ color: 'rgba(255,255,255,0.4)' }}
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPass ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError('') }}
                  placeholder="••••••••••••"
                  style={{ ...inputBase, paddingRight: '3rem' }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(201,168,76,0.4)'
                    e.currentTarget.style.boxShadow   = '0 0 0 3px rgba(201,168,76,0.08)'
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                    e.currentTarget.style.boxShadow   = 'none'
                  }}
                  disabled={loading}
                  aria-required="true"
                  onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e as unknown as React.FormEvent)}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center justify-center w-7 h-7 rounded-lg transition-all"
                  style={{ color: 'rgba(255,255,255,0.3)' }}
                  aria-label={showPass ? 'Hide password' : 'Show password'}
                >
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-bold text-[14px] text-black transition-all"
              style={{
                background: loading ? 'rgba(201,168,76,0.5)' : goldGrad,
                cursor:     loading ? 'not-allowed' : 'pointer',
              }}
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                  Signing in…
                </>
              ) : (
                <>
                  <LogIn size={16} aria-hidden="true" />
                  Sign In
                </>
              )}
            </button>

          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-[11px] mt-6" style={{ color: 'rgba(255,255,255,0.15)' }}>
          Smart Auto UAE · Admin Access Only
        </p>
      </div>

      {/* Shake keyframe */}
      <style>{`
        @keyframes shake {
          0%,100% { transform: translateX(0); }
          20%      { transform: translateX(-8px); }
          40%      { transform: translateX(8px); }
          60%      { transform: translateX(-5px); }
          80%      { transform: translateX(5px); }
        }
      `}</style>
    </main>
  )
}