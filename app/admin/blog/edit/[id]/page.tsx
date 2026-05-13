import { notFound } from 'next/navigation'
import { supabaseAdmin } from '@/lib/supabase'
import PostEditor from '@/components/admin/PostEditor'

type Props = { params: Promise<{ id: string }> }

export default async function EditPostPage({ params }: Props) {
  const { id } = await params

  const { data: post, error } = await supabaseAdmin
    .from('blog_posts')
    .select('*')
    .eq('id', id)
    .single()

  if (!post || error) notFound()

  return <PostEditor mode="edit" post={post} />
}