import { getPosts } from '@/lib/actions/blog'
import PostsTable from './_components/PostsTable'

export const metadata = { title: 'Blog Posts' }

export default async function BlogAdminPage() {
  const posts = await getPosts()
  return <PostsTable posts={posts} />
}