import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { SignJWT } from 'jose'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET ?? 'change-this-secret-min-32-chars!!'
)

export async function POST(req: NextRequest) {
  const { email, password } = await req.json()

  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password required.' }, { status: 400 })
  }

  // Sign in via Supabase Auth
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })

  if (error || !data.user) {
    return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 })
  }

  // Create a signed JWT session token (24h expiry)
  const token = await new SignJWT({
    sub:   data.user.id,
    email: data.user.email,
    role:  'admin',
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(JWT_SECRET)

  // Set HttpOnly cookie
  const res = NextResponse.json({ ok: true })
  res.cookies.set('cms_session', token, {
    httpOnly: true,
    secure:   process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path:     '/',
    maxAge:   60 * 60 * 24, // 24 hours
  })

  return res
}