'use client'
// components/CategoryBar.js
import { useState, useEffect } from 'react'

const CATEGORIES = [
  { label: 'All', value: 'all', icon: (
    <svg viewBox="0 0 24 24" className="w-[15px] h-[15px] stroke-current fill-none stroke-[1.8]"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
  )},
  { label: 'Villas', value: 'Villa', icon: (
    <svg viewBox="0 0 24 24" className="w-[15px] h-[15px] stroke-current fill-none stroke-[1.8]"><path d="M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5Z"/><path d="M9 21V12h6v9"/></svg>
  )},
  { label: 'Apartments', value: 'Apartment', icon: (
    <svg viewBox="0 0 24 24" className="w-[15px] h-[15px] stroke-current fill-none stroke-[1.8]"><rect x="4" y="2" width="16" height="20" rx="1"/><path d="M9 22v-5h6v5M8 7h.01M12 7h.01M16 7h.01M8 11h.01M12 11h.01"/></svg>
  )},
  { label: 'Resorts', value: 'Resort', icon: (
    <svg viewBox="0 0 24 24" className="w-[15px] h-[15px] stroke-current fill-none stroke-[1.8]"><path d="M2 20h20M6 20V10l6-7 6 7v10"/><circle cx="12" cy="9" r="2"/></svg>
  )},
  { label: 'Lodges', value: 'Lodge', icon: (
    <svg viewBox="0 0 24 24" className="w-[15px] h-[15px] stroke-current fill-none stroke-[1.8]"><path d="M2 20h20M5 20V9l7-6 7 6v11"/><path d="M9 20v-5h6v5"/></svg>
  )},
  { label: 'Hotels & B&Bs', value: 'Hotel', icon: (
    <svg viewBox="0 0 24 24" className="w-[15px] h-[15px] stroke-current fill-none stroke-[1.8]"><rect x="2" y="6" width="20" height="15" rx="1"/><path d="M2 10h20M6 6V3h12v3"/></svg>
  )},
]

export default function CategoryBar() {
  const [active, setActive] = useState('all')

  const handleFilter = (value) => {
    setActive(value)
    // Dispatch custom event that PropertyGrid listens to
    window.dispatchEvent(new CustomEvent('filterCategory', { detail: value }))
    document.getElementById('properties')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="sticky top-16 z-[100] border-b border-[#e0e0e0] bg-white px-8 flex items-center gap-0 overflow-x-auto scrollbar-none">
      {CATEGORIES.map((cat) => (
        <button
          key={cat.value}
          onClick={() => handleFilter(cat.value)}
          className={`px-5 h-[54px] flex items-center gap-2 text-[0.85rem] font-medium whitespace-nowrap border-b-2 border-t-0 border-l-0 border-r-0 transition-colors flex-shrink-0 ${
            active === cat.value
              ? 'text-[#111] border-[#111]'
              : 'text-[#666] border-transparent hover:text-[#111]'
          }`}
        >
          {cat.icon}
          {cat.label}
        </button>
      ))}
    </div>
  )
}
