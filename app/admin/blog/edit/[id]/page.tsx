import { notFound } from 'next/navigation'
import { supabaseAdmin } from '@/lib/supabase'
import PostEditor from '@/components/admin/PostEditor'

export default async function EditPostPage({ params }: { params: { id: string } }) {
  const supabase = supabaseAdmin

  const { data: post, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('id', params.id)
    .single()

  if (!post || error) notFound()

  return <PostEditor mode="edit" post={post} />
}