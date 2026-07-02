'use client'
// components/ActivityDetailClient.js
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity'

export default function ActivityDetailClient({ activity }) {
  const [imgIdx, setImgIdx] = useState(0)

  const allImages = [activity.coverImage, ...(activity.gallery || [])].filter(Boolean)
  const currentImg = allImages[imgIdx]
    ? urlFor(allImages[imgIdx]).width(1200).height(675).fit('crop').url()
    : null

  const shareUrl  = `https://staycationske.com/activity/${activity.slug?.current}`
  const shareText = `${activity.name} — ${activity.activityType} in ${activity.town}\n${activity.shortDescription}\n\nBook on StaycationKE:`

  return (
    <div className="max-w-[1100px] mx-auto px-6 pt-10 pb-20">
      <Link href="/#activities" className="inline-flex items-center gap-2 text-[0.85rem] font-semibold text-[#111] mb-8 hover:text-[#666] transition-colors">
        ← All experiences
      </Link>

      <div className="relative rounded-2xl overflow-hidden mb-6 aspect-[16/9] bg-[#f0f0f0]">
        {currentImg && <Image src={currentImg} alt={activity.name} fill className="object-cover" priority sizes="1100px" />}
        {allImages.length > 1 && (
          <>
            <button className="gallery-nav left-[14px]" onClick={() => setImgIdx((i) => (i-1+allImages.length)%allImages.length)}>
              <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] stroke-[#111] fill-none stroke-[2.2]" strokeLinecap="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <button className="gallery-nav right-[14px]" onClick={() => setImgIdx((i) => (i+1)%allImages.length)}>
              <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] stroke-[#111] fill-none stroke-[2.2]" strokeLinecap="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
            <div className="gallery-count">{imgIdx+1} / {allImages.length}</div>
          </>
        )}
      </div>

      {allImages.length > 1 && (
        <div className="flex gap-[6px] mb-8 overflow-x-auto">
          {allImages.map((img, i) => (
            <div key={i} onClick={() => setImgIdx(i)} className={`flex-shrink-0 w-[100px] h-[70px] rounded-[8px] overflow-hidden cursor-pointer border-2 transition-all ${i===imgIdx?'border-[#111]':'border-transparent opacity-70 hover:opacity-100'}`}>
              <Image src={urlFor(img).width(200).height(140).fit('crop').url()} alt={`Photo ${i+1}`} width={100} height={70} className="object-cover w-full h-full" />
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10">
        <div>
          <p className="text-[0.72rem] font-semibold tracking-[0.14em] uppercase text-[#888] mb-1">{activity.activityType} · {activity.town}, {activity.county}</p>
          <h1 className="text-[clamp(1.8rem,4vw,2.8rem)] font-extrabold tracking-tight mb-3">{activity.name}</h1>
          <div className="flex items-center gap-3 flex-wrap mb-6">
            <span className="bg-[#111] text-white text-[0.82rem] font-bold px-[10px] py-[4px] rounded-[6px]">{activity.guestRating}</span>
            <span className="text-[0.85rem] font-semibold">{activity.ratingLabel}</span>
            <span className="text-[0.8rem] text-[#888]">· {activity.reviewCount} reviews</span>
            {activity.duration && <span className="text-[0.82rem] text-[#666]">⏱ {activity.duration}</span>}
            {activity.priceRange && <span className="text-[0.85rem] font-semibold text-[#111]">{activity.priceRange}</span>}
          </div>
          <p className="text-[0.95rem] font-light text-[#444] leading-[1.85] mb-8 max-w-[640px]">{activity.shortDescription}</p>
          {activity.features?.length > 0 && (
            <div>
              <h2 className="text-[1.1rem] font-bold mb-4">What&apos;s included</h2>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-3">
                {activity.features.map((f) => (
                  <div key={f} className="flex items-center gap-[9px] text-[0.88rem] text-[#444]">
                    <svg viewBox="0 0 24 24" className="w-[16px] h-[16px] stroke-[#111] fill-none stroke-[1.8] flex-shrink-0" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM9 12l2 2 4-4"/>
                    </svg>
                    {f}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="lg:sticky lg:top-24 h-fit">
          <div className="border border-[#e0e0e0] rounded-2xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
            <h3 className="text-[1rem] font-bold mb-1">Ready to book?</h3>
            <p className="text-[0.82rem] text-[#888] mb-6 leading-[1.6]">Complete your booking securely on Expedia.</p>
            <button
              onClick={() => window.goToExpedia?.(activity.expediaAffiliateLink)}
              className="w-full py-[14px] bg-[#111] text-white rounded-[11px] text-[0.95rem] font-bold hover:bg-[#333] transition-colors flex items-center justify-center gap-[9px] mb-4"
            >
              View prices
              <svg viewBox="0 0 24 24" className="w-[17px] h-[17px] stroke-current fill-none stroke-[2.3]" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </button>
            <div className="border-t border-[#f0f0f0] pt-4">
              <p className="text-[0.78rem] text-[#888] mb-3">Share this experience</p>
              <div className="flex gap-2">
                <a href={`https://wa.me/?text=${encodeURIComponent(shareText+' '+shareUrl)}`} target="_blank" rel="noopener" className="flex-1 py-[8px] border border-[#e0e0e0] rounded-[8px] text-[0.78rem] font-medium text-[#444] text-center hover:border-[#111] transition-colors">WhatsApp</a>
                <button onClick={() => navigator.clipboard.writeText(shareUrl).then(()=>window.showToast?.('Link copied!'))} className="flex-1 py-[8px] border border-[#e0e0e0] rounded-[8px] text-[0.78rem] font-medium text-[#444] hover:border-[#111] transition-colors">Copy link</button>
              </div>
            </div>
            <p className="text-[0.72rem] text-[#aaa] mt-4 text-center leading-[1.5]">
              Booking on Expedia. We may earn a commission. <Link href="/affiliate" className="underline">Disclosure</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
