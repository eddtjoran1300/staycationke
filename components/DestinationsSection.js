'use client'
// components/DestinationsSection.js
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'

const REGIONS = [
  { key: 'coast',   label: '🏖 Coast' },
  { key: 'central', label: '🏙 Nairobi & Central' },
  { key: 'safari',  label: '🦁 Safari & Rift Valley' },
]

export default function DestinationsSection({ destinations }) {
  if (!destinations || destinations.length === 0) return null

  const byRegion = (region) =>
    destinations.filter((d) => d.region === region)

  const handleDestClick = (dest) => {
    if (dest.expediaAffiliateLink) {
      window.goToExpedia?.(dest.expediaAffiliateLink)
    } else {
      // Fallback: filter on-site properties by location
      window.dispatchEvent(new CustomEvent('filterLocation', { detail: dest.name }))
      document.getElementById('properties')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleLocationFilter = (name) => {
    window.dispatchEvent(new CustomEvent('filterLocation', { detail: name }))
    document.getElementById('properties')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="destinations" className="px-8 py-14 border-t border-[#e0e0e0]">
      <div className="max-w-[1200px] mx-auto">
        <p className="text-[0.72rem] font-semibold tracking-[0.14em] uppercase text-[#888] mb-2">
          Explore Kenya
        </p>
        <div className="flex items-baseline justify-between mb-8 flex-wrap gap-4">
          <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold tracking-tight">
            Top Destinations
          </h2>
          {/* <button
            className="text-[0.875rem] font-semibold underline underline-offset-[3px] text-[#111]"
            onClick={() => window.goToExpedia?.('https://www.expedia.com/Hotels')}
          >
            All on Expedia →
          </button> */}
        </div>

        {/* Three region columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-[#e0e0e0]">
          {REGIONS.map((region, ri) => {
            const items = byRegion(region.key)
            if (items.length === 0) return null
            return (
              <div
                key={region.key}
                className={`py-8 ${ri < 2 ? 'md:border-r md:pr-10' : ''} ${ri > 0 ? 'md:pl-10' : ''}`}
              >
                <h3 className="text-[0.68rem] font-bold tracking-[0.14em] uppercase text-[#888] mb-4">
                  {region.label}
                </h3>
                <ul className="list-none">
                  {items.map((dest) => (
                    <li key={dest._id}>
                      <button
                        onClick={() => handleDestClick(dest)}
                        className="dest-list-link w-full flex items-baseline gap-2 py-[7px] border-b border-[#f0f0f0] text-[0.875rem] font-medium text-[#111] hover:text-[#666] transition-colors text-left"
                      >
                        <span className="text-[0.65rem] text-[#bbb] flex-shrink-0">▸</span>
                        <span className="flex items-baseline gap-2 flex-1">
                          {dest.name}
                          <span className="text-[0.75rem] text-[#888] font-normal">{dest.county}</span>
                        </span>
                        {dest.expediaAffiliateLink && (
                          <svg viewBox="0 0 24 24" className="w-[12px] h-[12px] stroke-[#bbb] fill-none stroke-[1.8] flex-shrink-0" strokeLinecap="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>

        {/* County tag cloud */}
        <div className="mt-10">
          <p className="text-[0.68rem] font-bold tracking-[0.14em] uppercase text-[#888] mb-4">
            Browse by County
          </p>
          <div className="flex flex-wrap gap-2">
            {destinations.map((dest) => (
              <button
                key={dest._id}
                onClick={() => handleDestClick(dest)}
                className="px-[13px] py-[5px] border border-[#ccc] rounded-full text-[0.78rem] font-medium text-[#444] hover:bg-[#111] hover:text-white hover:border-[#111] transition-all hover:-translate-y-[1px]"
              >
                {dest.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
