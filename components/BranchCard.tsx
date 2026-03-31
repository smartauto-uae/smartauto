'use client'

import { MapPin, Phone, Clock } from 'lucide-react'

interface Branch {
  city: string
  name: string
  address: string
  phone: string
  mapUrl: string
  hours?: string
}

export default function BranchCard({ branch }: { branch: Branch }) {
  return (
    <div
      className="rounded-2xl border border-white/8 bg-white/[0.03] backdrop-blur-xl p-7 flex flex-col gap-4 transition-all duration-300 hover:border-gold/25"
    >
      <div>
        <p className="text-gold text-[10px] tracking-[0.2em] uppercase mb-1">{branch.city}</p>
        <h3 className="text-white font-semibold text-lg leading-snug">{branch.name}</h3>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-start gap-3">
          <MapPin size={15} className="text-gold flex-shrink-0 mt-0.5" aria-hidden="true" />
          <span className="text-white/50 text-sm">{branch.address}</span>
        </div>
        <div className="flex items-center gap-3">
          <Phone size={15} className="text-gold flex-shrink-0" aria-hidden="true" />
          <a
            href={`tel:${branch.phone}`}
            className="text-white/50 text-sm hover:text-gold transition-colors"
          >
            {branch.phone}
          </a>
        </div>
        {branch.hours && (
          <div className="flex items-center gap-3">
            <Clock size={15} className="text-gold flex-shrink-0" aria-hidden="true" />
            <span className="text-white/50 text-sm">{branch.hours}</span>
          </div>
        )}
      </div>

      <a
        href={branch.mapUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-gold text-[13px] font-semibold mt-1 no-underline hover:gap-3 transition-all duration-300"
      >
        Get Directions <MapPin size={13} />
      </a>
    </div>
  )
}