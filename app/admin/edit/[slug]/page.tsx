import { getBlogFile } from '@/lib/github'
import PostEditor from '@/components/admin/PostEditor'
import { notFound } from 'next/navigation'

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const file = await getBlogFile(slug)
  if (!file) notFound()

  return (
    <PostEditor
      mode="edit"
      initialSlug={slug}
      initialContent={file.content}
      sha={file.sha}
    />
  )
}