import { getPost } from '@/lib/actions/blog'
import PostEditor from '../_components/PostEditor'

export const metadata = { title: 'Edit Post' }

export default async function EditPostPage({ params }: { params: { id: string } }) {
  const post = await getPost(params.id)
  return <PostEditor mode="edit" post={post} />
}