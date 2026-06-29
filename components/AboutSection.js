// components/AboutSection.js
// Server component — no 'use client' needed

export default function AboutSection({ settings }) {
  const headline = settings?.aboutHeadline || "The smartest way to book your next Kenya staycation"
  const body = settings?.aboutBody

  return (
    <section className="bg-[#f9f9f9] px-8 py-16 border-t border-[#e0e0e0]">
      <div className="max-w-[1200px] mx-auto">
        <p className="text-[0.72rem] font-semibold tracking-[0.14em] uppercase text-[#888] mb-3">
          About StaycationKE
        </p>
        <h2 className="text-[clamp(1.4rem,3vw,2rem)] font-extrabold tracking-tight mb-5">
          {headline}
        </h2>
        {body ? (
          <div className="max-w-[740px] space-y-4">
            {body.map((block, i) => (
              <p key={i} className="text-[0.93rem] font-light text-[#444] leading-[1.85]">
                {block.children?.map((child) => child.text).join('')}
              </p>
            ))}
          </div>
        ) : (
          <div className="max-w-[740px] space-y-4">
            <p className="text-[0.93rem] font-light text-[#444] leading-[1.85]">
              A staycation should feel like a real escape — without the long-haul flight. StaycationKE surfaces the highest-rated properties close to home, across every corner of Kenya. From Diani Beach villas to Maasai Mara lodges, Nairobi city apartments to Lamu island resorts — every property is hand-picked for character, comfort, and value.
            </p>
            <p className="text-[0.93rem] font-light text-[#444] leading-[1.85]">
              Rates are powered by Expedia, so the price you see is the price you book — no hidden fees, no surprises. Find your next staycation in seconds.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
