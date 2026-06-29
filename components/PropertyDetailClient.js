'use client'
// components/PropertyDetailClient.js
// Used when someone opens a direct property URL (e.g. shared from WhatsApp)
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity'

const AMENITY_ICONS = {
  'Free WiFi': 'M5 12.5a11 11 0 0 1 14 0M8.5 16a6 6 0 0 1 7 0M12 19.5h.01',
  'Air conditioning': 'M12 2v20M2 12h20M5 5l14 14M19 5 5 19',
  'Private pool': 'M2 12h20M4 12V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4',
  'Beachfront': 'M2 20h20M6 20c0-6 4-10 4-10s4 4 4 10',
  'Free parking': 'M3 3h18v18H3zM9 17V7h4a3 3 0 0 1 0 6H9',
  'Breakfast included': 'M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z',
  'Restaurant on-site': 'M6 2v8M9 2v8M6 6h3M12 2v20',
}
const DEFAULT_ICON = 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM9 12l2 2 4-4'

export default function PropertyDetailClient({ property }) {
  const [imgIdx, setImgIdx] = useState(0)

  const allImages = [property.coverImage, ...(property.gallery || [])].filter(Boolean)
  const currentImg = allImages[imgIdx]
    ? urlFor(allImages[imgIdx]).width(1200).height(675).fit('crop').url()
    : null

  const goToExpedia = () => window.goToExpedia?.(property.expediaAffiliateLink)

  const shareText = `${property.name} — ${property.propertyType} in ${property.town}\n${property.guestRating} (${property.ratingLabel})\n\n${property.shortDescription}\n\nBook on StaycationKE:`
  const shareUrl  = `https://staycationske.com/property/${property.slug?.current}`

  return (
    <div className="max-w-[1100px] mx-auto px-6 pt-10 pb-20">
      {/* Back */}
      <Link href="/" className="inline-flex items-center gap-2 text-[0.85rem] font-semibold text-[#111] mb-8 hover:text-[#666] transition-colors">
        ← All properties
      </Link>

      {/* Gallery */}
      <div className="relative rounded-2xl overflow-hidden mb-6 aspect-[16/9] bg-[#f0f0f0]">
        {currentImg && (
          <Image src={currentImg} alt={property.name} fill className="object-cover" priority sizes="1100px" />
        )}
        {allImages.length > 1 && (
          <>
            <button
              className="gallery-nav left-[14px]"
              onClick={() => setImgIdx((i) => (i - 1 + allImages.length) % allImages.length)}
            >
              <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] stroke-[#111] fill-none stroke-[2.2]" strokeLinecap="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <button
              className="gallery-nav right-[14px]"
              onClick={() => setImgIdx((i) => (i + 1) % allImages.length)}
            >
              <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] stroke-[#111] fill-none stroke-[2.2]" strokeLinecap="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
            <div className="gallery-count">{imgIdx + 1} / {allImages.length}</div>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {allImages.length > 1 && (
        <div className="flex gap-[6px] mb-8 overflow-x-auto">
          {allImages.map((img, i) => (
            <div
              key={i}
              onClick={() => setImgIdx(i)}
              className={`flex-shrink-0 w-[100px] h-[70px] rounded-[8px] overflow-hidden cursor-pointer border-2 transition-all ${i === imgIdx ? 'border-[#111]' : 'border-transparent opacity-70 hover:opacity-100'}`}
            >
              <Image src={urlFor(img).width(200).height(140).fit('crop').url()} alt={`Photo ${i+1}`} width={100} height={70} className="object-cover w-full h-full" />
            </div>
          ))}
        </div>
      )}

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10">
        <div>
          {/* Header */}
          <div className="mb-6">
            <p className="text-[0.72rem] font-semibold tracking-[0.14em] uppercase text-[#888] mb-1">
              {property.propertyType} · {property.town}, {property.county}
            </p>
            <h1 className="text-[clamp(1.8rem,4vw,2.8rem)] font-extrabold tracking-tight mb-3">
              {property.name}
            </h1>
            <div className="flex items-center gap-3 flex-wrap">
              {property.starRating && (
                <span className="text-[#bbb] tracking-[2px]">{'★'.repeat(property.starRating)}{'☆'.repeat(5 - property.starRating)}</span>
              )}
              <span className="bg-[#111] text-white text-[0.82rem] font-bold px-[10px] py-[4px] rounded-[6px]">{property.guestRating}</span>
              <span className="text-[0.85rem] font-semibold">{property.ratingLabel}</span>
              <span className="text-[0.8rem] text-[#888]">· {property.reviewCount} reviews</span>
              {property.priceRange && (
                <span className="text-[0.85rem] font-semibold text-[#111]">{property.priceRange}</span>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-[0.95rem] font-light text-[#444] leading-[1.85] mb-8 max-w-[640px]">
            {property.shortDescription}
          </p>

          {/* Amenities */}
          {property.amenities?.length > 0 && (
            <div className="mb-8">
              <h2 className="text-[1.1rem] font-bold mb-4">Amenities</h2>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-3">
                {property.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-[9px] text-[0.88rem] text-[#444]">
                    <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] stroke-[#111] fill-none stroke-[1.8] flex-shrink-0" strokeLinecap="round" strokeLinejoin="round">
                      <path d={AMENITY_ICONS[amenity] || DEFAULT_ICON} />
                    </svg>
                    {amenity}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sticky booking panel */}
        <div className="lg:sticky lg:top-24 h-fit">
          <div className="border border-[#e0e0e0] rounded-2xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
            <h3 className="text-[1rem] font-bold mb-1">Ready to book?</h3>
            <p className="text-[0.82rem] text-[#888] mb-6 leading-[1.6]">
              View live prices, availability and complete your booking securely on Expedia.
            </p>
            <button
              onClick={goToExpedia}
              className="w-full py-[14px] bg-[#111] text-white rounded-[11px] text-[0.95rem] font-bold hover:bg-[#333] transition-colors flex items-center justify-center gap-[9px] mb-4"
            >
              View prices on Expedia
              <svg viewBox="0 0 24 24" className="w-[17px] h-[17px] stroke-current fill-none stroke-[2.3]" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </button>

            {/* Share */}
            <div className="border-t border-[#f0f0f0] pt-4">
              <p className="text-[0.78rem] text-[#888] mb-3">Share this property</p>
              <div className="flex gap-2">
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`}
                  target="_blank" rel="noopener"
                  className="flex-1 py-[8px] border border-[#e0e0e0] rounded-[8px] text-[0.78rem] font-medium text-[#444] text-center hover:border-[#111] transition-colors"
                >
                  WhatsApp
                </a>
                <button
                  onClick={() => navigator.clipboard.writeText(shareUrl).then(() => window.showToast?.('Link copied!'))}
                  className="flex-1 py-[8px] border border-[#e0e0e0] rounded-[8px] text-[0.78rem] font-medium text-[#444] hover:border-[#111] transition-colors"
                >
                  Copy link
                </button>
              </div>
            </div>

            <p className="text-[0.72rem] text-[#aaa] mt-4 text-center leading-[1.5]">
              Booking completed on Expedia. We may earn a commission.{' '}
              <Link href="/affiliate" className="underline">Disclosure</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
