'use client'
// components/ActivitiesSection.js
import { useState } from 'react'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import ActivityModal from './ActivityModal'

const ACTIVITY_CATS = [
  { label: 'All', value: 'all' },
  { label: 'Safari', value: 'Safari' },
  { label: 'Beach & Water', value: 'Beach' },
  { label: 'Cultural', value: 'Cultural' },
  { label: 'Adventure', value: 'Adventure' },
  { label: 'Wildlife', value: 'Wildlife' },
  { label: 'Aerial', value: 'Aerial' },
  { label: 'Day Trip', value: 'Day Trip' },
]

export default function ActivitiesSection({ activities }) {
  const [filter, setFilter] = useState('all')
  const [active, setActive] = useState(null)

  if (!activities || activities.length === 0) return null

  const filtered = filter === 'all'
    ? activities
    : activities.filter((a) => a.activityType === filter)

  return (
    <section id="activities" className="px-8 py-14 border-t border-[#e0e0e0]">
      <div className="max-w-[1200px] mx-auto">
        <p className="text-[0.72rem] font-semibold tracking-[0.14em] uppercase text-[#888] mb-2">
          Things To Do
        </p>
        <div className="flex items-baseline justify-between mb-6 flex-wrap gap-4">
          <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold tracking-tight">
            Experiences Across Kenya
          </h2>
          {/* <button
            className="text-[0.875rem] font-semibold underline underline-offset-[3px] text-[#111]"
            onClick={() => window.goToExpedia?.('https://www.expedia.com/things-to-do')}
          >
            View all on Expedia →
          </button> */}
        </div>

        {/* Category filter */}
        <div className="flex gap-2 overflow-x-auto scrollbar-none mb-8 pb-1">
          {ACTIVITY_CATS.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setFilter(cat.value)}
              className={`px-4 py-[6px] rounded-full text-[0.82rem] font-medium whitespace-nowrap border transition-all flex-shrink-0 ${
                filter === cat.value
                  ? 'bg-[#111] text-white border-[#111]'
                  : 'bg-white text-[#666] border-[#e0e0e0] hover:border-[#111]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-[repeat(auto-fill,minmax(255px,1fr))] gap-6">
          {filtered.map((activity, i) => {
            const imgUrl = activity.coverImage
              ? urlFor(activity.coverImage).width(600).height(450).fit('crop').url()
              : null

            return (
              <div
                key={activity._id}
                className="prop-card opacity-0 translate-y-[18px] cursor-pointer rounded-xl border border-[#e0e0e0] bg-white transition-all duration-[250ms] hover:shadow-[0_10px_32px_rgba(0,0,0,0.12)] hover:-translate-y-1 overflow-hidden"
                style={{ animationDelay: `${i * 0.05}s` }}
                onClick={() => setActive(activity)}
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#f0f0f0]">
                  {activity.featured && (
                    <div className="absolute top-[10px] left-[10px] z-10 bg-white text-[#111] text-[0.68rem] font-bold px-[9px] py-[3px] rounded-full">
                      Featured
                    </div>
                  )}
                  {activity.duration && (
                    <div className="absolute bottom-[10px] left-[10px] z-10 bg-black/60 text-white text-[0.7rem] font-medium px-[8px] py-[3px] rounded-full">
                      {activity.duration}
                    </div>
                  )}
                  {/* Share button */}
                  <button
                    className="absolute top-[10px] right-[10px] z-10 w-[30px] h-[30px] rounded-full bg-white/92 flex items-center justify-center border-none cursor-pointer hover:scale-105 transition-transform"
                    onClick={(e) => { e.stopPropagation(); window.openShareMenu?.('activity', activity) }}
                  >
                    <svg viewBox="0 0 24 24" className="w-[15px] h-[15px] stroke-[#111] fill-none stroke-2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                      <path d="M8.6 13.5 15.4 17.5M15.4 6.5 8.6 10.5"/>
                    </svg>
                  </button>
                  {imgUrl ? (
                    <Image
                      src={imgUrl}
                      alt={activity.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#e0e0e0]" />
                  )}
                </div>
                <div className="p-[13px_14px_17px]">
                  <div className="text-[0.72rem] font-semibold tracking-[0.08em] uppercase text-[#888] mb-1">
                    {activity.activityType} · {activity.town}
                  </div>
                  <div className="text-[0.94rem] font-bold leading-[1.35] mb-[3px]">
                    {activity.name}
                  </div>
                  <div className="text-[0.78rem] text-[#888] mb-[11px]">
                    {activity.priceRange && (
                      <span className="text-[#111] font-medium">{activity.priceRange}</span>
                    )}
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-[6px]">
                      <span className="bg-[#111] text-white text-[0.72rem] font-bold px-2 py-[3px] rounded-[5px]">
                        {activity.guestRating}
                      </span>
                      <span className="text-[0.75rem] text-[#666]">{activity.ratingLabel}</span>
                    </div>
                    <button
                      className="px-[14px] py-[7px] bg-[#111] text-white rounded-full text-[0.75rem] font-semibold hover:bg-[#333] transition-colors"
                      onClick={(e) => { e.stopPropagation(); setActive(activity) }}
                    >
                      View →
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {active && (
          <ActivityModal activity={active} onClose={() => setActive(null)} />
        )}
      </div>
    </section>
  )
}
