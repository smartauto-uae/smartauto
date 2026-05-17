'use server'

import { supabaseAdmin } from '@/lib/supabase'

export async function getDashboardData() {
  const [seoRes, postsRes, postsCountRes] = await Promise.all([
    supabaseAdmin.from('seo_pages').select('title, description, og_image'),
    supabaseAdmin
      .from('blog_posts')
      .select('id, title, slug, status, created_at')
      .order('created_at', { ascending: false })
      .limit(5),
    supabaseAdmin
      .from('blog_posts')
      .select('*', { count: 'exact', head: true }),
  ])

  const seoPages   = seoRes.data   ?? []
  const recentPosts = postsRes.data ?? []
  const totalPosts  = postsCountRes.count ?? 0

  const complete   = seoPages.filter(p => p.title && p.description && p.og_image).length
  const noTitle    = seoPages.filter(p => !p.title).length
  const noDesc     = seoPages.filter(p => !p.description).length
  const noOgImage  = seoPages.filter(p => !p.og_image).length

  return {
    seo: {
      total:      seoPages.length,
      complete,
      incomplete: seoPages.length - complete,
      noTitle,
      noDesc,
      noOgImage,
    },
    recentPosts,
    totalPosts,
  }
}