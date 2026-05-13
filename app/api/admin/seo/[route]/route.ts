import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { getSeoForRoute } from '@/lib/seo'

// ── Admin client — bypasses RLS (server-side only) ────────────────────────────
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// ── Auth check using Supabase session cookie ──────────────────────────────────
async function isAuthorized(): Promise<boolean> {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cs) => cs.forEach(({ name, value, options }) =>
          cookieStore.set(name, value, options)
        ),
      },
    }
  )
  const { data: { user } } = await supabase.auth.getUser()
  return !!user
}

// ── GET ───────────────────────────────────────────────────────────────────────
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ route: string }> }
) {
  if (!(await isAuthorized()))
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { route } = await params
  const decoded = '/' + decodeURIComponent(route).replace(/^\//, '')
  const data = await getSeoForRoute(decoded)
  return NextResponse.json(data ?? {})
}

// ── PUT ───────────────────────────────────────────────────────────────────────
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ route: string }> }
) {
  if (!(await isAuthorized()))
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { route } = await params
  const decoded = '/' + decodeURIComponent(route).replace(/^\//, '')
  const body = await req.json()

  const { error } = await supabaseAdmin
    .from('seo_pages')
    .upsert(
      { route: decoded, ...body, updated_at: new Date().toISOString() },
      { onConflict: 'route' }
    )

  if (error) {
    console.error('Supabase upsert error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}