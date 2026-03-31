import { ReactNode } from 'react'

export default function GlassCard({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={className}
      style={{
        background: 'rgba(17,17,17,0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(201,168,76,0.12)',
        borderRadius: '1rem',
      }}
    >
      {children}
    </div>
  )
}