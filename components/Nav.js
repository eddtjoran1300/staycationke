'use client'
// components/Nav.js
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Nav({ settings }) {
  const pathname = usePathname()

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className="sticky top-0 z-[200] bg-white/96 backdrop-blur-[14px] border-b border-[#e0e0e0] px-8 h-16 flex items-center justify-between gap-4">
      {/* Logo */}
      <Link
        href="/"
        className="text-[1.2rem] font-extrabold tracking-tight flex items-center gap-2 text-[#111]"
      >
        <span
          className="nav-dot w-[9px] h-[9px] bg-[#111] rounded-full block"
        />
        StaycationKE
      </Link>

      {/* Nav links — hidden on mobile */}
      <ul className="hidden md:flex gap-0 list-none">
        <li>
          <Link
            href="/"
            onClick={(e) => { e.preventDefault(); if(pathname==='/') scrollTo('properties') }}
            className={`px-4 h-16 flex items-center text-[0.875rem] font-medium border-b-2 transition-colors ${pathname === '/' ? 'text-[#111] border-[#111]' : 'text-[#666] border-transparent hover:text-[#111] hover:border-[#111]'}`}
          >
            Top Destinations
          </Link>
        </li>
        <li>
          <Link
            href="/#activities"
            className="px-4 h-16 flex items-center text-[0.875rem] font-medium text-[#666] border-b-2 border-transparent hover:text-[#111] hover:border-[#111] transition-colors"
          >
            Experiences
          </Link>
        </li>
        <li>
          <Link
            href="/#destinations"
            className="px-4 h-16 flex items-center text-[0.875rem] font-medium text-[#666] border-b-2 border-transparent hover:text-[#111] hover:border-[#111] transition-colors"
          >
            Destinations
          </Link>
        </li>
      </ul>

      {/* Right: Translate */}
      <div className="flex items-center gap-3 flex-shrink-0">
        <div id="google_translate_element" />
      </div>
    </nav>
  )
}
