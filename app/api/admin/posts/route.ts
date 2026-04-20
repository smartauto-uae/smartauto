import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { listBlogFiles, createBlogFile, getBlogFile } from '@/lib/github'

export async function GET() {
  if (!(await getSession())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const files = await listBlogFiles()
  return NextResponse.json(files)
}

export async function POST(req: NextRequest) {
  if (!(await getSession())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { slug, content } = await req.json()
  if (!slug || !content) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })

  // Check if already exists
  const existing = await getBlogFile(slug)
  if (existing) return NextResponse.json({ error: 'Slug already exists' }, { status: 409 })

  const ok = await createBlogFile(slug, content)
  return NextResponse.json({ ok })
}