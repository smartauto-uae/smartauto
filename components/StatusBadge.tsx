'use client'

import { useEffect, useState } from 'react'

export default function StatusBadge({
  size = 'md',
  hours,
}: {
  size?: 'sm' | 'md'
  hours: string
}) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const now = new Date()
    const hour = now.getHours()
    setIsOpen(hour >= 10 && hour < 22)
  }, [])

  const textSize = size === 'sm' ? 'text-[10px]' : 'text-[11px]'

  return (
    <div
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${textSize} tracking-wide`}
      style={{
        background: isOpen ? 'rgba(34,197,94,0.08)' : 'rgba(239,68,68,0.08)',
        borderColor: isOpen ? 'rgba(34,197,94,0.25)' : 'rgba(239,68,68,0.25)',
        color: isOpen ? 'rgb(134,239,172)' : 'rgb(252,165,165)',
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{
          background: isOpen ? '#22c55e' : '#ef4444',
          boxShadow: isOpen ? '0 0 6px #22c55e' : '0 0 6px #ef4444',
        }}
        aria-hidden="true"
      />
      {isOpen ? `Open Now · ${hours}` : `Closed · Opens 10:00 AM`}
    </div>
  )
}