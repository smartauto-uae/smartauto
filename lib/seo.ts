import 'server-only'
import { createClient } from '@supabase/supabase-js'

function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!
  return createClient(url, key)
}

export type SeoPage = {
  id:                  string
  route:               string
  page_label:          string
  title:               string | null
  description:         string | null
  keywords:            string | null
  og_title:            string | null
  og_description:      string | null
  og_image:            string | null
  og_type:             string
  twitter_card:        string
  twitter_title:       string | null
  twitter_description: string | null
  twitter_image:       string | null
  canonical:           string | null
  robots:              string
  structured_data:     Record<string, unknown> | null
  schema_type:         string
  updated_at:          string
}

// ── Server-side read- used in generateMetadata ───────────────────────────────
export async function getSeoForRoute(route: string): Promise<SeoPage | null> {
  const { data, error } = await getAdminClient()
    .from('seo_pages')
    .select('*')
    .eq('route', route)
    .single()

  if (error && error.code !== 'PGRST116') {
    console.error(`getSeoForRoute(${route}):`, error.message)
  }

  return data ?? null
}

// ── Admin read all- used in admin dashboard list ─────────────────────────────
export async function getAllSeoPages(): Promise<SeoPage[]> {
  const { data, error } = await getAdminClient()
    .from('seo_pages')
    .select('*')
    .order('page_label')

  if (error) console.error('getAllSeoPages:', error.message)
  return (data ?? []) as SeoPage[]
}

// ── Admin write- used from API route only ────────────────────────────────────
export async function upsertSeoPage(
  route: string,
  payload: Partial<SeoPage>
): Promise<{ ok: boolean; error?: string }> {
  const { error } = await getAdminClient()
    .from('seo_pages')
    .upsert({ route, ...payload }, { onConflict: 'route' })

  if (error) console.error(`upsertSeoPage(${route}):`, error.message)
  return error ? { ok: false, error: error.message } : { ok: true }
}