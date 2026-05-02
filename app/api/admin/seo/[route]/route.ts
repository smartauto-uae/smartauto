import { NextRequest, NextResponse } from 'next/server'
import { verifySession } from '@/lib/auth'
import { getSeoForRoute, upsertSeoPage } from '@/lib/seo'

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ route: string }> }
) {
  if (!(await verifySession())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { route } = await params
  const decoded = '/' + decodeURIComponent(route).replace(/^\//, '')
  const data = await getSeoForRoute(decoded)
  return NextResponse.json(data ?? {})
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ route: string }> }
) {
  if (!(await verifySession())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { route } = await params
  const decoded = '/' + decodeURIComponent(route).replace(/^\//, '')
  const body = await req.json()
  const result = await upsertSeoPage(decoded, body)
  return NextResponse.json(result)
}