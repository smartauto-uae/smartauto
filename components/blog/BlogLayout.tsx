'use client'

import { useEffect, useState } from 'react'
import TableOfContents from './TableOfContents'

export default function BlogLayout({
  content,
}: {
  content: string
}) {
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  if (isDesktop) {
    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 260px',
        gap: '2.5rem',
        alignItems: 'start',
      }}>
        {/* Article */}
        <article
          className="blog-content min-w-0"
          dangerouslySetInnerHTML={{ __html: content }}
        />

        {/* TOC — sticky right sidebar */}
        <aside style={{ position: 'sticky', top: '5rem' }}>
          <TableOfContents content={content} />
        </aside>
      </div>
    )
  }

  // Mobile — TOC above content
  return (
    <div>
      <TableOfContents content={content} />
      <article
        className="blog-content"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  )
}