'use client'

import { useEffect } from 'react'
import { MessageCircle, Phone } from 'lucide-react'

const GOLD = '#C9A84C'
const GOLD2 = '#E8C96A'
const goldGrad = `linear-gradient(135deg,${GOLD},${GOLD2})`

const WA_HREF =
  'https://wa.me/971567269666?text=' +
  encodeURIComponent(
    "Hi Smart Auto, I'd like a quote for Paint Protection Film (PPF) for my car."
  )
const CALL_HREF = 'tel:+971567269666'

export default function PpfMobileStickyBar() {
  useEffect(() => {
    document.body.classList.add('has-ppf-sticky-bar')
    return () => document.body.classList.remove('has-ppf-sticky-bar')
  }, [])

  return (
    <>
      <style>{`
        @media (max-width: 767px) {
          body.has-ppf-sticky-bar { --fab-offset: 5rem; }
          body.has-ppf-sticky-bar main {
            padding-bottom: calc(5rem + env(safe-area-inset-bottom, 0px));
          }
        }
      `}</style>
      <div
        className="fixed bottom-0 left-0 right-0 z-[150] md:hidden"
        role="navigation"
        aria-label="Quick contact"
        style={{
          background: 'rgba(10,10,10,0.96)',
          borderTop: '1px solid rgba(201,168,76,0.28)',
          boxShadow: '0 -8px 32px rgba(0,0,0,0.45)',
          backdropFilter: 'blur(16px)',
        }}
      >
        <div
          className="grid grid-cols-2 gap-2 px-3 pt-2.5"
          style={{ paddingBottom: 'max(0.625rem, env(safe-area-inset-bottom, 0px))' }}
        >
          <a
            href={WA_HREF}
            className="inline-flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm text-white no-underline"
            style={{
              background: '#25D366',
              boxShadow: '0 4px 16px rgba(37,211,102,0.28)',
              fontFamily: 'Satoshi, Inter, sans-serif',
            }}
          >
            <MessageCircle size={16} />
            WhatsApp
          </a>
          <a
            href={CALL_HREF}
            className="inline-flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm text-black no-underline"
            style={{
              background: goldGrad,
              boxShadow: '0 4px 16px rgba(201,168,76,0.28)',
              fontFamily: 'Satoshi, Inter, sans-serif',
            }}
          >
            <Phone size={16} />
            Call
          </a>
        </div>
      </div>
    </>
  )
}
