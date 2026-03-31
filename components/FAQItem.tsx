'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export default function FAQItem({
  question,
  answer,
  index,
}: {
  question: string
  answer: string
  index: number
}) {
  const [open, setOpen] = useState(false)

  return (
    <div
      className="rounded-2xl border border-white/8 bg-white/[0.03] backdrop-blur-xl overflow-hidden transition-all duration-300"
      style={{ borderColor: open ? 'rgba(201,168,76,0.25)' : undefined }}
    >
      <button
        type="button"
        className="w-full flex items-center justify-between gap-4 px-7 py-5 text-left"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={`faq-answer-${index}`}
      >
        <span className="text-white font-medium text-[15px] leading-snug">{question}</span>
        <ChevronDown
          size={18}
          className="text-gold flex-shrink-0 transition-transform duration-300"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
          aria-hidden="true"
        />
      </button>
      {open && (
        <div id={`faq-answer-${index}`} className="px-7 pb-6">
          <p className="text-white/50 text-sm leading-[1.8]">{answer}</p>
        </div>
      )}
    </div>
  )
}