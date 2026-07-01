'use client'
// components/PropertyGrid.js
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity'
import PropertyModal from './PropertyModal'

function Stars({ count }) {
  return (
    <span className="text-[0.72rem] tracking-[2px] text-[#bbb]">
      {'★'.repeat(count)}{'☆'.repeat(5 - count)}
    </span>
  )
}

export default function PropertyGrid({ properties }) {
  const [filter, setFilter] = useState('all')
  const [locationFilter, setLocationFilter] = useState(null)
  const [activeProperty, setActiveProperty] = useState(null)

  useEffect(() => {
    const handler = (e) => {
      setFilter(e.detail)
      setLocationFilter(null)
    }
    window.addEventListener('filterCategory', handler)

    const locHandler = (e) => {
      setLocationFilter(e.detail)
      setFilter('all')
    }
    window.addEventListener('filterLocation', locHandler)

    return () => {
      window.removeEventListener('filterCategory', handler)
      window.removeEventListener('filterLocation', locHandler)
    }
  }, [])

  let filtered = properties
  if (filter !== 'all') {
    filtered = filtered.filter((p) => p.propertyType === filter)
  }
  if (locationFilter) {
    const q = locationFilter.toLowerCase()
    filtered = filtered.filter(
      (p) =>
        p.town?.toLowerCase().includes(q) ||
        p.county?.toLowerCase().includes(q) ||
        p.name?.toLowerCase().includes(q)
    )
  }

  const TITLES = {
    all: 'Holiday Rentals Across Kenya',
    Villa: 'Villas in Kenya',
    Apartment: 'Apartments in Kenya',
    Resort: 'Resorts in Kenya',
    Lodge: 'Safari Lodges in Kenya',
    Hotel: 'Hotels in Kenya',
  }

  const sectionTitle = locationFilter
    ? `Stays in ${locationFilter}`
    : (TITLES[filter] || 'Holiday Rentals')

  return (
    <section id="properties" className="px-8 py-14 max-w-[1200px] mx-auto">
      {/* Header */}
      <p className="text-[0.72rem] font-semibold tracking-[0.14em] uppercase text-[#888] mb-2">
        Popular Staycations in Kenya
      </p>
      <div className="flex items-baseline justify-between mb-8 flex-wrap gap-4">
        <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold tracking-tight">
          {sectionTitle}
        </h2>
        {/* <button
          className="text-[0.875rem] font-semibold underline underline-offset-[3px] text-[#111]"
          onClick={() => window.goToExpedia?.('https://www.expedia.com/Hotels')}
        >
          View all on Expedia →
        </button> */}
      </div>

      {/* Location filter banner */}
      {locationFilter && (
        <div className="flex items-center justify-between gap-4 flex-wrap bg-[#f9f9f9] border border-[#e0e0e0] rounded-[11px] px-4 py-3 mb-6">
          <span className="text-[0.85rem] text-[#444]">
            {filtered.length > 0
              ? `Showing ${filtered.length} curated ${filtered.length === 1 ? 'stay' : 'stays'} in `
              : `No curated picks in `}
            <strong>{locationFilter}</strong>
            {filtered.length === 0 && ' yet — browse on Expedia for full availability.'}
          </span>
          {/* <button
            className="text-[0.875rem] font-semibold underline underline-offset-[3px] text-[#111] whitespace-nowrap"
            onClick={() => window.goToExpedia?.(`https://www.expedia.com/Hotel-Search?destination=${encodeURIComponent(locationFilter + ', Kenya')}`)}
          >
            View all in {locationFilter} on Expedia →
          </button> */}
        </div>
      )}

      {/* Grid */}
      {filtered.length === 0 ? (
        <p className="text-[#888] text-[0.9rem] py-8">
          No properties found. Try a different category or destination.
        </p>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(255px,1fr))] gap-6">
          {filtered.map((property, i) => {
            const imgUrl = property.coverImage
              ? urlFor(property.coverImage).width(600).height(450).fit('crop').url()
              : null

            return (
              <div
                key={property._id}
                className="prop-card opacity-0 translate-y-[18px] cursor-pointer rounded-xl border border-[#e0e0e0] bg-white transition-all duration-[250ms] hover:shadow-[0_10px_32px_rgba(0,0,0,0.12)] hover:-translate-y-1 overflow-hidden"
                style={{ animationDelay: `${i * 0.05}s` }}
                onClick={() => setActiveProperty(property)}
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-[#f0f0f0]">
                  {property.featured && (
                    <div className="absolute top-[10px] left-[10px] z-10 bg-white text-[#111] text-[0.68rem] font-bold px-[9px] py-[3px] rounded-full">
                      Top Rated
                    </div>
                  )}
                  {/* Share button */}
                  <button
                    className="absolute top-[10px] right-[10px] z-10 w-[30px] h-[30px] rounded-full bg-white/92 flex items-center justify-center border-none cursor-pointer hover:scale-105 transition-transform"
                    onClick={(e) => {
                      e.stopPropagation()
                      window.openShareMenu?.('property', property)
                    }}
                  >
                    <svg viewBox="0 0 24 24" className="w-[15px] h-[15px] stroke-[#111] fill-none stroke-2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                      <path d="M8.6 13.5 15.4 17.5M15.4 6.5 8.6 10.5"/>
                    </svg>
                  </button>
                  {imgUrl ? (
                    <Image
                      src={imgUrl}
                      alt={property.name}
                      fill
                      className="object-cover transition-transform duration-[400ms] group-hover:scale-[1.06]"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#e0e0e0]" />
                  )}
                </div>
                {/* Body */}
                <div className="p-[13px_14px_17px]">
                  {property.starRating && <Stars count={property.starRating} />}
                  <div className="text-[0.94rem] font-bold leading-[1.35] mt-1 mb-[3px]">
                    {property.name}
                  </div>
                  <div className="text-[0.78rem] text-[#888] mb-[11px]">
                    {property.propertyType} · {property.town}
                    {property.priceRange && (
                      <span className="ml-2 text-[#111] font-medium">{property.priceRange}</span>
                    )}
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-[6px]">
                      <span className="bg-[#111] text-white text-[0.72rem] font-bold px-2 py-[3px] rounded-[5px]">
                        {property.guestRating}
                      </span>
                      <span className="text-[0.75rem] text-[#666]">{property.ratingLabel}</span>
                    </div>
                    <button
                      className="px-[14px] py-[7px] bg-[#111] text-white rounded-full text-[0.75rem] font-semibold hover:bg-[#333] transition-colors"
                      onClick={(e) => { e.stopPropagation(); setActiveProperty(property) }}
                    >
                      View →
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Property detail modal */}
      {activeProperty && (
        <PropertyModal
          property={activeProperty}
          onClose={() => setActiveProperty(null)}
        />
      )}
    </section>
  )
}
