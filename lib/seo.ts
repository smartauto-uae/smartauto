import { createClient } from '@supabase/supabase-js'

// ── Anon client — browser-safe, for client components only ───────────────────
import { supabase } from './supabase'

// ── Admin client — service role, server-side only (never import in client components) ──
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

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

// ── Server-side read — used in generateMetadata (service role bypasses RLS) ──
export async function getSeoForRoute(route: string): Promise<SeoPage | null> {
  const { data, error } = await supabaseAdmin
    .from('seo_pages')
    .select('*')
    .eq('route', route)
    .single()

  if (error && error.code !== 'PGRST116') {
    console.error(`getSeoForRoute(${route}):`, error.message)
  }

  return data ?? null
}

// ── Admin read all — used in admin dashboard list ─────────────────────────────
export async function getAllSeoPages(): Promise<SeoPage[]> {
  const { data, error } = await supabaseAdmin
    .from('seo_pages')
    .select('*')
    .order('page_label')

  if (error) console.error('getAllSeoPages:', error.message)
  return (data ?? []) as SeoPage[]
}

// ── Admin write — used from API route only ────────────────────────────────────
export async function upsertSeoPage(
  route: string,
  payload: Partial<SeoPage>
): Promise<{ ok: boolean; error?: string }> {
  const { error } = await supabaseAdmin
    .from('seo_pages')
    .upsert({ route, ...payload }, { onConflict: 'route' })

  if (error) console.error(`upsertSeoPage(${route}):`, error.message)
  return error ? { ok: false, error: error.message } : { ok: true }
}

// ── Client-side read — for admin UI dropdowns, previews etc ──────────────────
export async function getSeoForRouteClient(route: string): Promise<SeoPage | null> {
  const { data } = await supabase
    .from('seo_pages')
    .select('*')
    .eq('route', route)
    .single()

  return data ?? null
}