'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap } from 'lucide-react'

const gold     = '#C9A84C'
const goldGrad = 'linear-gradient(135deg,#C9A84C,#E8C96A)'

export default function SmartFilmDemo() {
  const [isOn, setIsOn] = useState(true)

  return (
    <section className="py-24" style={{ backgroundColor: '#080808' }}>
      <div className="max-w-5xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-14">
          <span
            className="text-[11px] tracking-[0.35em] uppercase mb-4 block"
            style={{ color: gold }}
          >
            See It In Action
          </span>
          <h2
            className="font-bold leading-snug mb-4"
            style={{
              fontFamily: 'var(--font-playfair),serif',
              fontSize: 'clamp(1.8rem,3.5vw,2.8rem)',
              color: '#fff',
            }}
          >
            Toggle the Glass —{' '}
            <span
              style={{
                background: goldGrad,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              See the Difference
            </span>
          </h2>
          <p
            className="max-w-lg mx-auto text-sm leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.4)' }}
          >
            Press the button below to switch the smart film between clear and frosted —
            exactly as it works in real life, in milliseconds.
          </p>
          <div
            className="w-14 h-0.5 mx-auto mt-5 rounded-full"
            style={{ background: goldGrad }}
          />
        </div>

        {/* Demo card */}
        <div
          className="rounded-3xl border overflow-hidden"
          style={{
            border: '1px solid rgba(201,168,76,0.18)',
            background: 'rgba(255,255,255,0.015)',
          }}
        >

          {/* Status bar */}
          <div
            className="flex items-center justify-between px-8 py-4 border-b"
            style={{ borderColor: 'rgba(255,255,255,0.06)' }}
          >
            <div className="flex items-center gap-2.5">
              <motion.div
                className="w-2.5 h-2.5 rounded-full"
                animate={{
                  backgroundColor: isOn ? '#4ade80' : '#f87171',
                  boxShadow: isOn
                    ? '0 0 8px rgba(74,222,128,0.6)'
                    : '0 0 8px rgba(248,113,113,0.6)',
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="text-[12px] font-semibold tracking-wide"
                animate={{ color: isOn ? '#4ade80' : '#f87171' }}
                transition={{ duration: 0.3 }}
              >
                Smart Film — {isOn ? 'ON · Clear' : 'OFF · Frosted'}
              </motion.span>
            </div>
            <div
              className="text-[10px] tracking-[0.2em] uppercase hidden sm:block"
              style={{ color: 'rgba(255,255,255,0.2)' }}
            >
              PDLC Smart Film · Live Demo
            </div>
          </div>

          {/* Image area */}
          <div className="relative overflow-hidden" style={{ height: '420px' }}>

            {/* Clear state */}
            <motion.div
              className="absolute inset-0"
              animate={{ opacity: isOn ? 1 : 0 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
            >
              <img
                src="/images/gallery/smart-film-before.webp"
                alt="Smart film ON — clear glass — transparent office view"
                className="w-full h-full object-cover"
                width={960}
                height={420}
                loading="lazy"
              />
              {/* Clear state label */}
              <div
                className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-[10px] font-semibold tracking-[0.15em] uppercase"
                style={{
                  background: 'rgba(74,222,128,0.12)',
                  border: '1px solid rgba(74,222,128,0.35)',
                  color: '#4ade80',
                }}
              >
                Clear — 92% Optical Clarity
              </div>
            </motion.div>

            {/* Frosted state */}
            <motion.div
              className="absolute inset-0"
              animate={{ opacity: isOn ? 0 : 1 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
            >
              <img
                src="/images/gallery/smart-film-after.webp"
                alt="Smart film OFF — frosted glass — opaque privacy"
                className="w-full h-full object-cover"
                width={960}
                height={420}
                loading="lazy"
              />
              {/* Frosted state label */}
              <div
                className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-[10px] font-semibold tracking-[0.15em] uppercase"
                style={{
                  background: 'rgba(201,168,76,0.12)',
                  border: '1px solid rgba(201,168,76,0.35)',
                  color: gold,
                }}
              >
                Frosted — Full Privacy
              </div>
            </motion.div>

          </div>

          {/* Toggle button bar */}
          <div
            className="px-8 py-7 flex flex-col sm:flex-row items-center justify-between gap-6"
            style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
          >

            {/* State description */}
            <div className="flex-1 text-center sm:text-left">
              <AnimatePresence mode="wait">
                {isOn ? (
                  <motion.div
                    key="on-desc"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div
                      className="font-semibold text-[14px] mb-1"
                      style={{ color: '#fff' }}
                    >
                      Power ON &mdash; Crystal Clear
                    </div>
                    <p
                      className="text-[12px] leading-[1.7]"
                      style={{ color: 'rgba(255,255,255,0.4)' }}
                    >
                      Electric current aligns liquid crystals — glass becomes fully
                      transparent with up to 92% optical clarity. Full view, maximum
                      natural light.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="off-desc"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div
                      className="font-semibold text-[14px] mb-1"
                      style={{ color: '#fff' }}
                    >
                      Power OFF &mdash; Fully Frosted
                    </div>
                    <p
                      className="text-[12px] leading-[1.7]"
                      style={{ color: 'rgba(255,255,255,0.4)' }}
                    >
                      No current — liquid crystals scatter randomly, instantly turning
                      the glass opaque. Complete privacy. Light still diffuses through.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Toggle controls */}
            <div className="flex flex-col items-center gap-3 flex-shrink-0">

              {/* Main button */}
              <button
                onClick={() => setIsOn(!isOn)}
                className="relative flex items-center gap-3 px-7 py-3.5 rounded-full font-bold text-[14px] cursor-pointer transition-all duration-300"
                style={{
                  background: isOn ? 'rgba(248,113,113,0.1)' : goldGrad,
                  border: isOn ? '1px solid rgba(248,113,113,0.35)' : '1px solid transparent',
                  color: isOn ? '#f87171' : '#000',
                  boxShadow: isOn ? 'none' : '0 4px 20px rgba(201,168,76,0.35)',
                }}
              >
                <Zap size={15} />
                {isOn ? 'Turn OFF — Frost Glass' : 'Turn ON — Clear Glass'}
              </button>

              {/* Toggle switch */}
              <button
                onClick={() => setIsOn(!isOn)}
                className="relative cursor-pointer"
                style={{ width: 60, height: 32 }}
                aria-label="Toggle smart film"
              >
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{
                    backgroundColor: isOn
                      ? 'rgba(74,222,128,0.25)'
                      : 'rgba(248,113,113,0.15)',
                    borderColor: isOn
                      ? 'rgba(74,222,128,0.5)'
                      : 'rgba(248,113,113,0.4)',
                  }}
                  style={{ border: '1px solid' }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  className="absolute top-1 w-6 h-6 rounded-full"
                  animate={{
                    x: isOn ? 30 : 2,
                    backgroundColor: isOn ? '#4ade80' : '#f87171',
                    boxShadow: isOn
                      ? '0 0 8px rgba(74,222,128,0.7)'
                      : '0 0 8px rgba(248,113,113,0.7)',
                  }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              </button>

              <span
                className="text-[10px] tracking-[0.15em] uppercase"
                style={{ color: 'rgba(255,255,255,0.25)' }}
              >
                {isOn ? 'ON' : 'OFF'}
              </span>
            </div>

          </div>
        </div>

        {/* Bottom note */}
        <p
          className="text-center text-[11px] mt-5"
          style={{ color: 'rgba(255,255,255,0.2)' }}
        >
          In real life, the switch happens in milliseconds.
          Controllable via remote, wall switch, app, or voice.
        </p>

      </div>
    </section>
  )
}