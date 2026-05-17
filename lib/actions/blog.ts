'use server'

import { supabase, supabaseAdmin } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'
import type { BlogPost } from '@/types/blog'

// ── Read (public supabase) ────────────────────────────────────────────────────

export async function getPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabaseAdmin
    .from('blog_posts')
    .select('*')
    .order('updated_at', { ascending: false })
  if (error) throw new Error(error.message)
  return data ?? []
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false })
  if (error) throw new Error(error.message)
  return data ?? []
}

export async function getPost(id: string): Promise<BlogPost> {
  const { data, error } = await supabaseAdmin
    .from('blog_posts')
    .select('*')
    .eq('id', id)
    .single()
  if (error) throw new Error(error.message)
  return data
}

// Admin version — bypasses RLS, fetches drafts too
export async function getPostBySlug(slug: string): Promise<BlogPost> {
  const { data, error } = await supabaseAdmin
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .single()
  if (error) throw new Error(error.message)
  return data
}

// Public version — use this on /blog/[slug] page
export async function getPublishedPostBySlug(slug: string): Promise<BlogPost> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()
  if (error) throw new Error(error.message)
  return data
}

// ── Write (supabaseAdmin) ─────────────────────────────────────────────────────

export async function createPost(payload: Partial<BlogPost>): Promise<BlogPost> {
  const { data, error } = await supabaseAdmin
    .from('blog_posts')
    .insert(payload)
    .select()
    .single()
  if (error) throw new Error(error.message)
  revalidatePath('/admin/blog')
  revalidatePath('/blog')
  return data
}

export async function updatePost(id: string, payload: Partial<BlogPost>): Promise<void> {
  const { error } = await supabaseAdmin
    .from('blog_posts')
    .update({ ...payload, updated_at: new Date().toISOString() })
    .eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/blog')
  revalidatePath('/blog')
  if (payload.slug) revalidatePath(`/blog/${payload.slug}`)
}

export async function deletePost(id: string): Promise<void> {
  const { error } = await supabaseAdmin
    .from('blog_posts')
    .delete()
    .eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/blog')
  revalidatePath('/blog')
}

export async function toggleStatus(
  id: string,
  current: 'draft' | 'published'
): Promise<void> {
  const next = current === 'draft' ? 'published' : 'draft'

  const { data: post } = await supabaseAdmin
    .from('blog_posts')
    .select('slug')
    .eq('id', id)
    .single()

  const { error } = await supabaseAdmin
    .from('blog_posts')
    .update({
      status:       next,
      published_at: next === 'published' ? new Date().toISOString() : null,
      updated_at:   new Date().toISOString(),
    })
    .eq('id', id)
  if (error) throw new Error(error.message)

  revalidatePath('/admin/blog')
  revalidatePath('/blog')
  if (post?.slug) revalidatePath(`/blog/${post.slug}`)
}