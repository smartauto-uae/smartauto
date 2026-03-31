'use client'

import Link from 'next/link'
import { ReactNode } from 'react'

export function GoldBtn({
  href,
  children,
}: {
  href: string
  children: ReactNode
}) {
  const isExternal = href.startsWith('http') || href.startsWith('tel:') || href.startsWith('https://wa')
  const cls =
    'inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-black transition-all duration-300 hover:opacity-90 active:scale-[0.98] no-underline'
  const style = { background: 'linear-gradient(135deg,#C9A84C,#E8C96A,#A07830)' }

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls} style={style}>
        {children}
      </a>
    )
  }
  return (
    <Link href={href} className={cls} style={style}>
      {children}
    </Link>
  )
}

export function OutlineBtn({
  href,
  children,
}: {
  href: string
  children: ReactNode
}) {
  const isExternal = href.startsWith('http') || href.startsWith('tel:') || href.startsWith('https://wa')
  const cls =
    'inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-gold border border-gold/30 bg-gold/5 hover:bg-gold/12 hover:border-gold/60 transition-all duration-300 active:scale-[0.98] no-underline'

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    )
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  )
}