import { NextRequest, NextResponse } from 'next/server'
import { verifySession } from '@/lib/auth'
import { getSeoForRoute, upsertSeoPage } from '@/lib/seo'

async function isAuthorized(req: NextRequest): Promise<boolean> {
  const token = req.cookies.get('cms_session')?.value ?? ''
  return verifySession(token)
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ route: string }> }
) {
  if (!(await isAuthorized(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { route } = await params
  const decoded = '/' + decodeURIComponent(route).replace(/^\//, '')
  const data = await getSeoForRoute(decoded)
  return NextResponse.json(data ?? {})
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ route: string }> }
) {
  if (!(await isAuthorized(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { route } = await params
  const decoded = '/' + decodeURIComponent(route).replace(/^\//, '')
  const body = await req.json()
  const result = await upsertSeoPage(decoded, body)
  return NextResponse.json(result)
}