'use client'
// components/HeroSection.js
import { useEffect } from 'react'
import { urlFor } from '@/lib/sanity'

export default function HeroSection({ settings }) {
  const bgImage = settings?.heroBackgroundImage
    ? urlFor(settings.heroBackgroundImage).width(1920).height(1080).url()
    : 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1920&q=80&auto=format&fit=crop'

  const headline1 = settings?.heroHeadlinePart1 || 'Every Stay,'
  const headline2 = settings?.heroHeadlinePart2 || 'A Staycation.'
  const subtitle  = settings?.heroSubtitle || 'The highest-rated villas, lodges & resorts across Kenya — book in one tap via Expedia.'
  const chips     = settings?.featuredDestinations || []

  // Re-init widget after component mounts and after script loads
  useEffect(() => {
    const tryInit = () => {
      if (window.EGWidgets) {
        window.EGWidgets.init()
      }
    }
    // Try immediately (script may already be loaded)
    tryInit()
    // Also try after short delay in case script is still loading
    const t1 = setTimeout(tryInit, 1000)
    const t2 = setTimeout(tryInit, 3000)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  return (
    <section className="relative min-h-[88vh] flex flex-col items-center justify-center text-center overflow-hidden px-6 pb-20 pt-12">
      {/* Background */}
      <div
        className="hero-bg absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${bgImage}')`,
          filter: 'grayscale(55%) brightness(0.42)'
        }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/25 to-black/60" />

      {/* Content */}
      <div className="relative z-[2] max-w-[880px] w-full">
        <p
          className="text-[0.73rem] font-semibold tracking-[0.18em] uppercase text-white/55 mb-5"
          style={{ animation: 'fadeUp 0.7s 0.1s both' }}
        >
          Kenya&apos;s #1 Holiday Rental Platform
        </p>
        <h1
          className="text-[clamp(2.5rem,6.5vw,5.2rem)] font-extrabold leading-[1.08] text-white tracking-tight mb-4"
          style={{ animation: 'fadeUp 0.8s 0.2s both' }}
        >
          {headline1}
          <br />
          <em className="font-light italic text-white/85">{headline2}</em>
        </h1>
        <p
          className="text-[1.02rem] font-light text-white/60 max-w-[520px] mx-auto mb-10"
          style={{ animation: 'fadeUp 0.8s 0.35s both' }}
        >
          {subtitle}
        </p>

        {/* ── EXPEDIA SEARCH WIDGET ── */}
        <div
          className="w-full max-w-[900px] mx-auto"
          style={{ animation: 'fadeUp 0.8s 0.5s both' }}
        >
          <div
            className="eg-widget"
            data-widget="search"
            data-program="us-expedia"
            data-lobs="stays,flights"
            data-network="pz"
            data-camref="1101l5EmK4"
            data-pubref=""
          />
        </div>

        {/* Popular destination chips */}
        {chips.length > 0 && (
          <div
            className="mt-5 flex flex-wrap justify-center items-center gap-[7px]"
            style={{ animation: 'fadeUp 0.8s 0.65s both' }}
          >
            <span className="text-[0.78rem] text-white/40 font-medium">Popular:</span>
            {chips.map((chip) => (
              <button
                key={chip.label}
                onClick={() => window.goToExpedia?.(chip.expediaQuery)}
                className="text-white/75 px-3 py-1 border border-white/25 rounded-full text-[0.78rem] hover:bg-white/12 hover:border-white/65 hover:text-white transition-all"
              >
                {chip.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
