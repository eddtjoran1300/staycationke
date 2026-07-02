'use client'
// components/ActivityModal.js
import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'

const FEATURE_ICONS = {
  'Hotel pickup & drop-off': 'M3 9h18M3 15h18M3 12h18',
  'Airport transfer': 'M2 9h20a2 2 0 0 1 2 2v7H0V11a2 2 0 0 1 2-2zM6 9V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v3',
  'Meals included': 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM12 6v6l4 2',
  'Breakfast included': 'M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8zM6 1v3M10 1v3M14 1v3',
  'Equipment provided': 'M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z',
  'Guide included': 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75',
  'Professional guide': 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
  'Expert naturalist guide': 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
  'Game drive': 'M1 3h15v13H1zM16 8h4l3 3v5h-7V8zM5.5 21a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM18.5 21a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
  'Hot air balloon': 'M12 22V12M12 12C12 7 7 3 7 3s5 1 5 9M12 12c0-5 5-9 5-9s-5 4-5 9M8 22h8',
  'Boat ride': 'M2 20h20M5 20l2-8h10l2 8M12 4v8',
  'Snorkelling gear': 'M3 12c4-3 14-3 18 0M3 12c4 3 14 3 18 0',
  'Diving equipment': 'M12 2a5 5 0 0 1 5 5v3H7V7a5 5 0 0 1 5-5zM7 10v10a5 5 0 0 0 10 0V10',
  'Bush walk': 'M3 20 9 8l4 7 3-5 5 10Z',
  'Night game drive': 'M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z',
  'Sundowner drinks': 'M17 8h1a4 4 0 0 1 0 8h-1M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z',
  'Bush dinner': 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM12 6v6l4 2',
  'Cultural visit': 'M3 21h18M5 21V10l7-6 7 6v11M9 21v-6h6v6',
  'Maasai village visit': 'M3 21h18M5 21V10l7-6 7 6v11M9 21v-6h6v6',
  'Community experience': 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75',
  'Small group (max 8)': 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
  'Private tour available': 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM5 21c0-4 3-7 7-7s7 3 7 7',
  'Child friendly': 'M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM4 21v-2a4 4 0 0 1 4-4h5',
  'Wheelchair accessible': 'M12 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM9 9h6l-1 6H9l-1-6zM7 20a4 4 0 1 0 8 0',
  'Free cancellation': 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM9 12l2 2 4-4',
  'Instant confirmation': 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM9 12l2 2 4-4',
  'Professional photos included': 'M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2zM12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
  'Video included': 'M15 10l4.553-2.069A1 1 0 0 1 21 8.845v6.31a1 1 0 0 1-1.447.914L15 14v-4zM3 8h12v8H3z',
  'Half day': 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM12 6v6l4 2',
  'Full day': 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM12 6v6l4 2',
  'Multi-day': 'M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z',
  'Drinks included': 'M17 8h1a4 4 0 0 1 0 8h-1M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z',
  'Lunch included': 'M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z',
  'Dinner included': 'M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z',
}
const DEFAULT_ICON = 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM9 12l2 2 4-4'

export default function ActivityModal({ activity, onClose }) {
  const [imgIdx, setImgIdx] = useState(0)
  const [shareOpen, setShareOpen] = useState(false)

  const allImages = [activity.coverImage, ...(activity.gallery || [])].filter(Boolean)
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

  const shareUrl = `https://staycationske.com/activity/${activity.slug?.current}`
  const shareText = `${activity.name} — ${activity.activityType} in ${activity.town}\n${activity.guestRating} (${activity.ratingLabel})\n\n${activity.shortDescription}\n\nBook on StaycationKE:`
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
              <button className="gallery-nav left-[14px]" onClick={() => setImgIdx((i) => (i - 1 + allImages.length) % allImages.length)}>
                <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] stroke-[#111] fill-none stroke-[2.2]" strokeLinecap="round"><path d="m15 18-6-6 6-6"/></svg>
              </button>
              <button className="gallery-nav right-[14px]" onClick={() => setImgIdx((i) => (i + 1) % allImages.length)}>
                <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] stroke-[#111] fill-none stroke-[2.2]" strokeLinecap="round"><path d="m9 18 6-6-6-6"/></svg>
              </button>
            </>
          )}
          {currentImg && <Image src={currentImg} alt={activity.name} fill className="object-cover" sizes="920px" />}
          <div className="gallery-count">{imgIdx + 1} / {allImages.length}</div>
        </div>

        {/* Thumbnails */}
        {allImages.length > 1 && (
          <div className="gallery-thumbs">
            {allImages.map((img, i) => (
              <div key={i} className={`gallery-thumb ${i === imgIdx ? 'active' : ''}`} onClick={() => setImgIdx(i)}>
                <Image src={urlFor(img).width(168).height(120).fit('crop').url()} alt={`Photo ${i + 1}`} width={84} height={60} />
              </div>
            ))}
          </div>
        )}

        {/* Body */}
        <div className="p-[1.75rem_2rem_2rem]">
          <div className="flex justify-between items-start gap-4 mb-4 flex-wrap">
            <div>
              <div className="text-[0.72rem] font-semibold tracking-[0.08em] uppercase text-[#888] mb-1">
                {activity.activityType} · {activity.town}
              </div>
              <h2 className="text-[1.5rem] font-extrabold tracking-tight mb-1">{activity.name}</h2>
              <div className="flex items-center gap-3 flex-wrap">
                {activity.duration && (
                  <span className="text-[0.82rem] text-[#666]">⏱ {activity.duration}</span>
                )}
                {activity.priceRange && (
                  <span className="text-[0.85rem] font-semibold text-[#111]">{activity.priceRange}</span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="bg-[#111] text-white text-[0.85rem] font-bold px-[11px] py-[5px] rounded-[7px]">{activity.guestRating}</div>
              <div>
                <div className="text-[0.82rem] font-bold">{activity.ratingLabel}</div>
                <div className="text-[0.72rem] text-[#888]">{activity.reviewCount} reviews</div>
              </div>
            </div>
          </div>

          <p className="text-[0.92rem] font-light text-[#444] leading-[1.8] mb-6">{activity.shortDescription}</p>

          {/* Features */}
          {activity.features?.length > 0 && (
            <>
              <h3 className="text-[0.95rem] font-bold mb-3">What&apos;s included</h3>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-[10px] mb-6">
                {activity.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-[9px] text-[0.85rem] text-[#444]">
                    <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] stroke-[#111] fill-none stroke-[1.8] flex-shrink-0" strokeLinecap="round" strokeLinejoin="round">
                      <path d={FEATURE_ICONS[feature] || DEFAULT_ICON} />
                    </svg>
                    {feature}
                  </div>
                ))}
              </div>
            </>
          )}

          <div className="mt-[1.75rem] pt-[1.5rem] border-t border-[#e0e0e0] flex items-center justify-between gap-4 flex-wrap">
            <p className="text-[0.8rem] text-[#888] max-w-[340px] leading-[1.6]">
              Booking and payment are completed securely on Expedia.
            </p>
            <button
              className="px-[28px] py-[14px] bg-[#111] text-white rounded-[11px] text-[0.95rem] font-bold flex items-center gap-[9px] hover:bg-[#333] transition-colors whitespace-nowrap"
              onClick={() => { onClose(); window.goToExpedia?.(activity.expediaAffiliateLink) }}
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
