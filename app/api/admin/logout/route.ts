// app/api/admin/logout/route.ts
import { NextResponse } from 'next/server'

export async function POST() {
  const res = NextResponse.redirect(new URL('/admin/login', process.env.NEXT_PUBLIC_SITE_URL!))
  res.cookies.delete('cms_session')
  return res
}