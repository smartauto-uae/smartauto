import { NextRequest, NextResponse } from 'next/server'
import { verifySession } from '@/lib/auth'
import { getAllSeoPages } from '@/lib/seo'

export async function GET(req: NextRequest) {
  const token = req.cookies.get('cms_session')?.value ?? ''
  if (!(await verifySession(token))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const pages = await getAllSeoPages()
  return NextResponse.json(pages)
}