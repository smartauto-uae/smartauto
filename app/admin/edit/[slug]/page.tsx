import { getBlogFile } from '@/lib/github'
import PostEditor from '@/components/admin/PostEditor'
import { notFound } from 'next/navigation'

export default async function EditPostPage({ params }: { params: { slug: string } }) {
  const file = await getBlogFile(params.slug)
  if (!file) notFound()

  return (
    <PostEditor
      mode="edit"
      initialSlug={params.slug}
      initialContent={file.content}
      sha={file.sha}
    />
  )
}