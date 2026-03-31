'use client'

export default function BeforeAfterGallery() {
  const items = [
    {
      label: 'Ceramic Coating',
      before: '/images/gallery/ceramic-before.webp',
      after: '/images/gallery/ceramic-after.webp',
    },
    {
      label: 'PPF Installation',
      before: '/images/gallery/ppf-before.webp',
      after: '/images/gallery/ppf-after.webp',
    },
    {
      label: 'Window Tinting',
      before: '/images/gallery/tint-before.webp',
      after: '/images/gallery/tint-after.webp',
    },
  ]

  return (
    <section
      id="gallery"
      className="py-24"
      style={{ backgroundColor: '#060606' }}
      aria-labelledby="gallery-heading"
    >
      <div className="w-full max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-gold text-[11px] tracking-[0.35em] uppercase mb-4">Our Work</p>
          <h2
            id="gallery-heading"
            className="font-bold text-white"
            style={{
              fontFamily: 'var(--font-playfair),serif',
              fontSize: 'clamp(2rem,3.5vw,3rem)',
            }}
          >
            Before &amp;{' '}
            <span
              style={{
                background: 'linear-gradient(135deg,#C9A84C,#E8C96A,#A07830)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              After
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-white/8 overflow-hidden"
            >
              <div className="grid grid-cols-2">
                <div className="relative">
                  <img
                    src={item.before}
                    alt={`Before ${item.label}`}
                    width={300}
                    height={240}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-48 object-cover"
                  />
                  <span className="absolute top-2 left-2 text-[9px] tracking-[0.15em] uppercase px-2 py-1 rounded bg-black/70 text-white/60">
                    Before
                  </span>
                </div>
                <div className="relative">
                  <img
                    src={item.after}
                    alt={`After ${item.label}`}
                    width={300}
                    height={240}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-48 object-cover"
                  />
                  <span className="absolute top-2 left-2 text-[9px] tracking-[0.15em] uppercase px-2 py-1 rounded bg-black/70 text-gold">
                    After
                  </span>
                </div>
              </div>
              <div className="px-4 py-3 bg-white/[0.02]">
                <p className="text-white/60 text-[13px] font-medium">{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}