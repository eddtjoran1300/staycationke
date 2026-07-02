'use client'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import TranslateWidget from './TranslateWidget'

export default function Nav({ settings }) {
  const pathname = usePathname()

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className="sticky top-0 z-[200] bg-[#111] border-b border-white/10 px-8 h-16 flex items-center justify-between gap-4">
      {/* Logo */}
      <Link href="/" className="flex items-center flex-shrink-0">
        <Image
          src="/logo.png"
          alt="StaycationKE"
          width={160}
          height={40}
          className="h-8 w-auto object-contain"
          priority
        />
      </Link>

      {/* Nav links */}
      <ul className="hidden md:flex gap-0 list-none">
        <li>
          <Link
            href="/"
            onClick={(e) => {
              if (pathname === '/') { e.preventDefault(); scrollTo('properties') }
            }}
            className={`px-4 h-16 flex items-center text-[0.875rem] font-medium border-b-2 transition-colors ${
              pathname === '/'
                ? 'text-white border-white'
                : 'text-white/60 border-transparent hover:text-white hover:border-white'
            }`}
          >
            Top Destinations
          </Link>
        </li>
        <li>
          <Link href="/#activities" className="px-4 h-16 flex items-center text-[0.875rem] font-medium text-white/60 border-b-2 border-transparent hover:text-white hover:border-white transition-colors">
            Experiences
          </Link>
        </li>
        <li>
          <Link href="/#destinations" className="px-4 h-16 flex items-center text-[0.875rem] font-medium text-white/60 border-b-2 border-transparent hover:text-white hover:border-white transition-colors">
            Destinations
          </Link>
        </li>
      </ul>

      {/* Translate */}
      <div className="flex items-center gap-3 flex-shrink-0">
        <TranslateWidget />
      </div>
    </nav>
  )
}
