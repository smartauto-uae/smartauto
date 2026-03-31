export default function SectionHeader({
  eyebrow,
  title,
  highlight,
}: {
  eyebrow: string
  title: string
  highlight: string
}) {
  return (
    <div className="text-center mb-16">
      <p className="text-gold text-[11px] tracking-[0.35em] uppercase mb-4">{eyebrow}</p>
      <h2
        className="font-bold text-white leading-[1.15]"
        style={{
          fontFamily: 'var(--font-playfair),serif',
          fontSize: 'clamp(2rem,3.5vw,3rem)',
        }}
      >
        {title}{' '}
        <span
          style={{
            background: 'linear-gradient(135deg,#C9A84C,#E8C96A,#A07830)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {highlight}
        </span>
      </h2>
    </div>
  )
}