import { getSeoForRoute } from '@/lib/seo'
import SeoEditor from '@/components/admin/SeoEditor'
import AdminHeader from '@/components/admin/AdminHeader'
import { notFound } from 'next/navigation'
import { getAllSeoPages } from '@/lib/seo'

export default async function EditSeoPage({
  params,
}: {
  params: Promise<{ route: string }>
}) {
  const { route: rawRoute } = await params
  const route   = '/' + decodeURIComponent(rawRoute).replace(/^\//, '')
  const pages   = await getAllSeoPages()
  const page    = pages.find((p) => p.route === route)
  if (!page) notFound()

  const seo = await getSeoForRoute(route)

  return (
    <main style={{ backgroundColor: '#080808', minHeight: '100vh', color: '#fff' }}>
      <AdminHeader />
      <SeoEditor route={route} pageLabel={page.page_label} initialData={seo} />
    </main>
  )
}