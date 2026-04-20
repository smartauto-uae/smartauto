import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { getBlogFile, updateBlogFile, deleteBlogFile } from '@/lib/github'

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!(await getSession())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { slug } = await params
  const file = await getBlogFile(slug)
  if (!file) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(file)
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!(await getSession())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { slug } = await params
  const { content, sha } = await req.json()
  const ok = await updateBlogFile(slug, content, sha)
  return NextResponse.json({ ok })
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!(await getSession())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { slug } = await params
  const { sha } = await req.json()
  const ok = await deleteBlogFile(slug, sha)
  return NextResponse.json({ ok })
}