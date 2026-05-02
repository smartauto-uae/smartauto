import { supabase } from './supabase'

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

// Read — used in page components (anon key, cached)
export async function getSeoForRoute(route: string): Promise<SeoPage | null> {
  const { data, error } = await supabase
    .from('seo_pages')
    .select('*')
    .eq('route', route)
    .single()

  if (error || !data) return null
  return data as SeoPage
}

// Read all — used in admin dashboard
export async function getAllSeoPages(): Promise<SeoPage[]> {
  const { data } = await supabase
    .from('seo_pages')
    .select('*')
    .order('page_label')
  return (data ?? []) as SeoPage[]
}

// Write — used from admin API route
export async function upsertSeoPage(
  route: string,
  payload: Partial<SeoPage>
): Promise<{ ok: boolean; error?: string }> {
  const { error } = await supabase
    .from('seo_pages')
    .upsert({ route, ...payload }, { onConflict: 'route' })

  return error ? { ok: false, error: error.message } : { ok: true }
}