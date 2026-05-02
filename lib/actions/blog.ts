'use server'

import { supabase, supabaseAdmin } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'
import type { BlogPostInsert, BlogPostUpdate } from '@/types/blog'

export async function getPosts() {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('id,title,slug,status,tags,published_at,created_at,updated_at')
    .order('updated_at', { ascending: false })
  if (error) throw error
  return data
}

export async function getPost(id: string) {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('id', id)
    .single()
  if (error) throw error
  return data
}

export async function createPost(payload: BlogPostInsert) {
  const { data, error } = await supabaseAdmin
    .from('blog_posts')
    .insert(payload)
    .select('id')
    .single()
  if (error) throw error
  revalidatePath('/admin/blog')
  revalidatePath('/blog')
  return data
}

export async function updatePost(id: string, payload: BlogPostUpdate) {
  const { error } = await supabaseAdmin
    .from('blog_posts')
    .update(payload)
    .eq('id', id)
  if (error) throw error
  revalidatePath('/admin/blog')
  revalidatePath('/blog')
  revalidatePath(`/blog/${payload.slug ?? ''}`)
}

export async function deletePost(id: string) {
  const { error } = await supabaseAdmin
    .from('blog_posts')
    .delete()
    .eq('id', id)
  if (error) throw error
  revalidatePath('/admin/blog')
  revalidatePath('/blog')
}

export async function toggleStatus(id: string, current: 'draft' | 'published') {
  const next = current === 'draft' ? 'published' : 'draft'
  const { error } = await supabaseAdmin
    .from('blog_posts')
    .update({
      status: next,
      published_at: next === 'published' ? new Date().toISOString() : null,
    })
    .eq('id', id)
  if (error) throw error
  revalidatePath('/admin/blog')
  revalidatePath('/blog')
}

export async function getPostBySlug(slug: string) {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .single()
  if (error) throw error
  return data
}