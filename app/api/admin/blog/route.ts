import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  const limit = Number(req.nextUrl.searchParams.get('limit') ?? 50)

  const { data, error, count } = await supabaseAdmin
    .from('blog_posts')
    .select('id, title, slug, status, created_at', { count: 'exact' })
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ posts: data ?? [], total: count ?? 0 })
}