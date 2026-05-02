// middleware.ts
import { NextRequest, NextResponse } from 'next/server'
import { verifySession } from '@/lib/auth'

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // ── 1. ADMIN AUTH PROTECTION ──────────────────────────────────────────────
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const token = req.cookies.get('cms_session')?.value
    const valid = token ? await verifySession(token) : false

    if (!valid) {
      return NextResponse.redirect(new URL('/admin/login', req.url))
    }
  }

  // ── 2. INJECT x-pathname FOR SERVER COMPONENTS ───────────────────────────
  // Cloned into request headers so layout/page server components can read it
  // via: import { headers } from 'next/headers'; headers().get('x-pathname')
  const requestHeaders = new Headers(req.headers)
  requestHeaders.set('x-pathname', pathname)

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}

export const config = {
  // Run on all routes except Next.js internals and static files
  matcher: ['/((?!_next/static|_next/image|favicon.ico|images|fonts|icons).*)'],
}