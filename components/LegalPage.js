// components/LegalPage.js
import Link from 'next/link'

function renderBlock(block, i) {
  if (block.style === 'h2') {
    return (
      <h2 key={i} className="text-[1.1rem] font-bold mt-8 mb-3 tracking-tight">
        {block.children?.map((c) => c.text).join('')}
      </h2>
    )
  }
  return (
    <p key={i} className="text-[0.92rem] font-light text-[#444] leading-[1.85] mb-[0.85rem]">
      {block.children?.map((child, ci) => {
        if (child.marks?.includes('strong')) {
          return <strong key={ci} className="font-semibold text-[#111]">{child.text}</strong>
        }
        if (child.marks?.includes('em')) {
          return <em key={ci}>{child.text}</em>
        }
        return child.text
      })}
    </p>
  )
}

export default function LegalPage({ title, content }) {
  return (
    <div className="px-8 pt-24 pb-16 max-w-[760px] mx-auto min-h-[60vh]">
      {/* Back */}
      <Link
        href="/"
        className="inline-flex items-center gap-[6px] text-[0.85rem] font-semibold text-[#111] mb-8 hover:text-[#666] transition-colors"
      >
        ← Back to home
      </Link>

      <h1 className="text-[clamp(1.8rem,4vw,2.6rem)] font-extrabold tracking-tight mb-2">
        {title}
      </h1>
      <p className="text-[0.8rem] text-[#888] mb-10">Last updated: June 2026</p>

      {content ? (
        <div className="legal-content">
          {content.map((block, i) => renderBlock(block, i))}
        </div>
      ) : (
        <p className="text-[0.88rem] text-[#888] italic border-t border-[#e0e0e0] pt-8">
          Content coming soon.
        </p>
      )}
    </div>
  )
}
