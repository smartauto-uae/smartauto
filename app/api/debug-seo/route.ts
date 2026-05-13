import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET() {
  const url  = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key  = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !key) {
    return NextResponse.json({ error: 'Missing env vars', url: !!url, key: !!key })
  }

  const admin = createClient(url, key)

  const { data, error } = await admin
    .from('seo_pages')
    .select('route, title')
    .limit(5)

  return NextResponse.json({ data, error })
}