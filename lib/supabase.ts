import { createClient } from '@supabase/supabase-js'

const supabaseUrl  = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Public client- works everywhere
export const supabase = createClient(supabaseUrl, supabaseAnon)

// Admin client- server only, lazy so client bundle doesn't crash
let _adminClient: ReturnType<typeof createClient> | null = null

export function getSupabaseAdmin() {
  if (!_adminClient) {
    _adminClient = createClient(
      supabaseUrl,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )
  }
  return _adminClient
}

// Keep this for backward compat but safe now
export const supabaseAdmin = createClient(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? supabaseAnon
)