import { NextResponse } from 'next/server'
import { verifySession } from '@/lib/auth'
import { getAllSeoPages } from '@/lib/seo'

export async function GET() {
  if (!(await verifySession())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const pages = await getAllSeoPages()
  return NextResponse.json(pages)
}