'use client'
// components/PropertyModal.js
import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'

const AMENITY_ICONS = {
  'Private pool': 'M2 12h20M4 12V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4',
  'Outdoor pool': 'M2 12h20M4 12V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4',
  'Infinity pool': 'M2 12h20M4 12V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4',
  'Beachfront': 'M2 20h20M6 20c0-6 4-10 4-10s4 4 4 10',
  'Free WiFi': 'M5 12.5a11 11 0 0 1 14 0M8.5 16a6 6 0 0 1 7 0M12 19.5h.01',
  'Air conditioning': 'M12 2v20M2 12h20M5 5l14 14M19 5 5 19',
  'Fully equipped kitchen': 'M4 3h16v18H4zM4 9h16M8 3v6',
  'Daily housekeeping': 'M12 2 4 6v6c0 5 3.5 8 8 10 4.5-2 8-5 8-10V6Z',
  'Free parking': 'M3 3h18v18H3zM9 17V7h4a3 3 0 0 1 0 6H9',
  'Garden': 'M12 22v-9M9 13a3 3 0 1 1 3-3 3 3 0 1 1 3 3',
  'Garden view': 'M12 22v-9M9 13a3 3 0 1 1 3-3 3 3 0 1 1 3 3',
  'Workspace': 'M3 4h18v12H3zM8 20h8M12 16v4',
  'Smart TV': 'M3 4h18v13H3zM8 20h8',
  'Washing machine': 'M4 2h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H4zM12 13m-5 0a5 5 0 1 0 10 0 5 5 0 1 0-10 0',
  'Game drives included': 'M3 18h18M5 18V9l7-5 7 5v9',
  'Private deck': 'M3 21h18M5 21V9l7-5 7 5v12',
  'Full board dining': 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM12 6v6l4 2',
  'Airport transfer': 'M2 9h20a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H2V9zM6 9V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v3',
  'Fire pit lounge': 'M12 2s4 5 4 9a4 4 0 0 1-8 0c0-2 1-3 1-3s1 2 3 0c1-1 0-4 0-6Z',
  'Spa services': 'M12 2c2 2 4 5 4 8a4 4 0 0 1-8 0c0-3 2-6 4-8Z',
  'Restaurant on-site': 'M6 2v8M9 2v8M6 6h3M12 2v20M12 9c2-2 6-2 6 3s-4 5-6 3',
  'Mountain view': 'M3 20 9 8l4 7 3-5 5 10Z',
  'Fireplace': 'M12 2s4 5 4 9a4 4 0 0 1-8 0c0-2 1-3 1-3s1 2 3 0c1-1 0-4 0-6Z',
  'Guided hikes': 'M3 20 9 8l4 7 3-5 5 10Z',
  'Pet friendly': 'M9 7m-1.5 0a1.5 1.5 0 1 0 3 0 1.5 1.5 0 1 0-3 0M15 7m-1.5 0a1.5 1.5 0 1 0 3 0 1.5 1.5 0 1 0-3 0M5 11m-1.5 0a1.5 1.5 0 1 0 3 0 1.5 1.5 0 1 0-3 0M19 11m-1.5 0a1.5 1.5 0 1 0 3 0 1.5 1.5 0 1 0-3 0M7 18c0-3 2-5 5-5s5 2 5 5',
  'Lake view': 'M2 20h20M3 14l4-4 3 3 5-6 6 7',
  'Private jetty': 'M2 20h20M5 20V9l7-5 7 5v11',
  'BBQ facilities': 'M12 8m-6 0a6 6 0 1 0 12 0 6 6 0 1 0-12 0M12 2v2M8 4l2 4M16 4l-2 4',
  'Kilimanjaro view': 'M2 20 9 6l5 8 3-5 5 11Z',
  'Solar powered': 'M12 8m-4 0a4 4 0 1 0 8 0 4 4 0 1 0-8 0M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4',
  'Snorkelling gear': 'M3 12c4-3 14-3 18 0M3 12c4 3 14 3 18 0',
  'Terrace': 'M3 21h18M5 21V11h14v10M9 11V7h6v4',
  'Riverside dining': 'M2 16c3-3 7-3 10 0s7 3 10 0',
  'Cultural visits': 'M3 21h18M5 21V10l7-6 7 6v11M9 21v-6h6v6',
  'Rooftop terrace': 'M3 21h18M5 21V11h14v10M9 11V7h6v4',
  '24-hour front desk': 'M2 7h20v13H2zM2 11h20',
  'Concierge service': 'M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM5 21c0-4 3-7 7-7s7 3 7 7',
  'Breakfast included': 'M3 12h18M5 12V8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4M3 12v2a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2',
  'Non-smoking rooms': 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM6 6l12 12',
  'Dhow excursions': 'M2 18h20M5 18l2-9h10l2 9M12 2v7',
  'Outdoor shower': 'M7 4h10M9 4v2M15 4v2M5 9h14M12 13v7',
  '24-hour security': 'M12 2 4 6v6c0 5 3.5 8 8 10 4.5-2 8-5 8-10V6Z',
  'Elevator access': 'M6 2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM10 8l2-2 2 2M10 16l2 2 2-2',
  'Laundry service': 'M4 2h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z',
}
const DEFAULT_ICON = 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM9 12l2 2 4-4'

export default function PropertyModal({ property, onClose }) {
  const [imgIdx, setImgIdx] = useState(0)
  const [shareOpen, setShareOpen] = useState(false)

  const allImages = [
    property.coverImage,
    ...(property.gallery || []),
  ].filter(Boolean)

  const currentImg = allImages[imgIdx]
    ? urlFor(allImages[imgIdx]).width(920).height(540).fit('crop').url()
    : null

  const handleKey = useCallback((e) => {
    if (e.key === 'Escape') onClose()
    if (e.key === 'ArrowLeft') setImgIdx((i) => (i - 1 + allImages.length) % allImages.length)
    if (e.key === 'ArrowRight') setImgIdx((i) => (i + 1) % allImages.length)
  }, [onClose, allImages.length])

  useEffect(() => {
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [handleKey])

  const handleExpedia = () => {
    onClose()
    window.goToExpedia?.(property.expediaAffiliateLink)
  }

  const shareText = `${property.name} — ${property.propertyType} in ${property.town}\n${'★'.repeat(property.starRating || 0)} ${property.guestRating} (${property.ratingLabel})\n\n${property.shortDescription}\n\nSee photos & book on StaycationKE:`
  const shareUrl = `https://staycationske.com/property/${property.slug?.current}`
  const waUrl = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`
  const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
  const twUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setShareOpen(false)
      window.showToast?.('Link copied to clipboard')
    })
  }

  return (
    <div
      className="modal-backdrop open"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="modal" onClick={(e) => e.stopPropagation()}>

        {/* Close */}
        <button className="modal-close" onClick={onClose}>
          <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] stroke-[#111] fill-none stroke-2" strokeLinecap="round">
            <path d="M18 6 6 18M6 6l12 12"/>
          </svg>
        </button>

        {/* Share */}
        <div className="relative">
          <button className="modal-share" onClick={() => setShareOpen((s) => !s)}>
            <svg viewBox="0 0 24 24" className="w-[17px] h-[17px] stroke-[#111] fill-none stroke-2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
              <path d="M8.6 13.5 15.4 17.5M15.4 6.5 8.6 10.5"/>
            </svg>
          </button>
          {shareOpen && (
            <div className="share-menu open">
              <a href={waUrl} target="_blank" rel="noopener" className="share-menu-item">
                <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-1.571-.786-2.596-1.396-3.649-3.167-.276-.478.276-.444.79-1.481.087-.18.043-.337-.025-.474-.067-.136-.6-1.447-.824-1.981-.217-.519-.438-.448-.6-.457-.156-.008-.336-.01-.516-.01-.18 0-.474.067-.722.337-.248.27-.946.924-.946 2.255 0 1.331.969 2.618 1.104 2.799.135.18 1.909 2.917 4.628 4.092.647.28 1.151.447 1.545.572.649.208 1.239.178 1.706.108.521-.078 1.603-.655 1.83-1.287.228-.633.228-1.176.16-1.29-.068-.112-.248-.18-.518-.315zM12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.96 9.96 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/></svg>
                WhatsApp
              </a>
              <a href={fbUrl} target="_blank" rel="noopener" className="share-menu-item">
                <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="#1877F2"><path d="M22 12a10 10 0 1 0-11.5 9.9v-7H8v-3h2.5V9.5A3.5 3.5 0 0 1 14 6h2v3h-2a1 1 0 0 0-1 1v2h3l-.5 3H13v7A10 10 0 0 0 22 12Z"/></svg>
                Facebook
              </a>
              <a href={twUrl} target="_blank" rel="noopener" className="share-menu-item">
                <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="#111"><path d="M18.9 2H22l-7.6 8.7L23 22h-6.9l-5.4-6.7L4.5 22H1.3l8.2-9.4L1 2h7.1l4.9 6.1L18.9 2Zm-1.2 18h1.7L7.4 4H5.6l12.1 16Z"/></svg>
                Twitter / X
              </a>
              <button className="share-menu-item" onClick={copyLink}>
                <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] stroke-[#111] fill-none stroke-[1.8]" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                Copy link
              </button>
            </div>
          )}
        </div>

        {/* Gallery */}
        <div className="gallery-main">
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
            </>
          )}
          {currentImg && (
            <Image src={currentImg} alt={property.name} fill className="object-cover" sizes="920px" />
          )}
          <div className="gallery-count">{imgIdx + 1} / {allImages.length}</div>
        </div>

        {/* Thumbnails */}
        {allImages.length > 1 && (
          <div className="gallery-thumbs">
            {allImages.map((img, i) => {
              const thumbUrl = urlFor(img).width(168).height(120).fit('crop').url()
              return (
                <div
                  key={i}
                  className={`gallery-thumb ${i === imgIdx ? 'active' : ''}`}
                  onClick={() => setImgIdx(i)}
                >
                  <Image src={thumbUrl} alt={`Photo ${i + 1}`} width={84} height={60} />
                </div>
              )
            })}
          </div>
        )}

        {/* Body */}
        <div className="p-[1.75rem_2rem_2rem]">
          {/* Header */}
          <div className="flex justify-between items-start gap-4 mb-4 flex-wrap">
            <div>
              {property.starRating && (
                <div className="text-[0.78rem] tracking-[2px] text-[#bbb] mb-[6px]">
                  {'★'.repeat(property.starRating)}{'☆'.repeat(5 - property.starRating)}
                </div>
              )}
              <h2 className="text-[1.5rem] font-extrabold tracking-tight mb-1">{property.name}</h2>
              <p className="text-[0.88rem] text-[#666]">{property.propertyType} · {property.town}, {property.county}</p>
              {property.priceRange && (
                <p className="text-[0.85rem] font-semibold text-[#111] mt-1">{property.priceRange}</p>
              )}
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="bg-[#111] text-white text-[0.85rem] font-bold px-[11px] py-[5px] rounded-[7px]">
                {property.guestRating}
              </div>
              <div>
                <div className="text-[0.82rem] font-bold">{property.ratingLabel}</div>
                <div className="text-[0.72rem] text-[#888]">{property.reviewCount} reviews</div>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-[0.92rem] font-light text-[#444] leading-[1.8] mb-6">
            {property.shortDescription}
          </p>

          {/* Amenities */}
          {property.amenities?.length > 0 && (
            <>
              <h3 className="text-[0.95rem] font-bold mb-3">Amenities</h3>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-[10px] mb-6">
                {property.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-[9px] text-[0.85rem] text-[#444]">
                    <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] stroke-[#111] fill-none stroke-[1.8] flex-shrink-0" strokeLinecap="round" strokeLinejoin="round">
                      <path d={AMENITY_ICONS[amenity] || DEFAULT_ICON} />
                    </svg>
                    {amenity}
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Footer CTA */}
          <div className="mt-[1.75rem] pt-[1.5rem] border-t border-[#e0e0e0] flex items-center justify-between gap-4 flex-wrap">
            <p className="text-[0.8rem] text-[#888] max-w-[340px] leading-[1.6]">
              Final prices, availability and booking are confirmed on Expedia.
            </p>
            <button
              className="px-[28px] py-[14px] bg-[#111] text-white rounded-[11px] text-[0.95rem] font-bold flex items-center gap-[9px] hover:bg-[#333] transition-colors hover:-translate-y-[1px] transition-transform whitespace-nowrap"
              onClick={handleExpedia}
            >
              View prices 
              <svg viewBox="0 0 24 24" className="w-[17px] h-[17px] stroke-current fill-none stroke-[2.3]" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
