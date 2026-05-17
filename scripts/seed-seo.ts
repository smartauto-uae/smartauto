import { config } from 'dotenv'
import { resolve } from 'path'
import { createClient } from '@supabase/supabase-js'

config({ path: resolve(process.cwd(), '.env.local') })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// ── Add every route here when you create a new page ──────────────────────────
const PAGES: { route: string; label: string }[] = [
  { route: '/',                                    label: 'Home' },
  { route: '/about',                               label: 'About Us' },
  { route: '/contact',                             label: 'Contact' },
  { route: '/services',                            label: 'Services' },
  { route: '/services/window-tinting',             label: 'Window Tinting' },
  { route: '/services/smart-film',                 label: 'Smart Film' },
  { route: '/services/ppf',                        label: 'Paint Protection Film' },
  { route: '/services/ceramic-coating',            label: 'Ceramic Coating' },
  { route: '/services/car-detailing',              label: 'Car Detailing' },
  { route: '/services/car-wrapping',               label: 'Car Wrapping' },
  { route: '/services/marble-protection',          label: 'Marble Protection' },
  { route: '/blog',                                label: 'Blog' },
  // Add new routes here ↓
]

async function seed() {
  console.log(`Seeding ${PAGES.length} pages…`)

  for (const page of PAGES) {
    // Only insert if the row doesn't exist yet — never overwrite existing SEO
    const { data: existing } = await supabase
      .from('seo_pages')
      .select('id')
      .eq('route', page.route)
      .single()

    if (existing) {
      console.log(`  ✓ skip  ${page.route}`)
      continue
    }

    const { error } = await supabase
      .from('seo_pages')
      .insert({
        route:       page.route,
        page_label:  page.label,
        title:       '',
        description: '',
        robots:      'index, follow',
        og_type:     'website',
        twitter_card: 'summary_large_image',
        canonical:   `https://smartautouae.com${page.route}`,
      })

    if (error) console.error(`  ✗ error ${page.route}:`, error.message)
    else       console.log(`  + added ${page.route}`)
  }

  console.log('Done.')
  process.exit(0)
}

seed()