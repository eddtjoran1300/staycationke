'use client'
// components/TranslateWidget.js
// Clean custom language selector that drives Google Translate invisibly

import { useState, useEffect, useRef } from 'react'

const LANGUAGES = [
  { code: 'en', label: 'English',    flag: '🇬🇧' },
  { code: 'sw', label: 'Swahili',    flag: '🇰🇪' },
  { code: 'fr', label: 'Français',   flag: '🇫🇷' },
  { code: 'de', label: 'Deutsch',    flag: '🇩🇪' },
  { code: 'es', label: 'Español',    flag: '🇪🇸' },
  { code: 'ar', label: 'العربية',    flag: '🇸🇦' },
  { code: 'zh-CN', label: '中文',    flag: '🇨🇳' },
  { code: 'pt', label: 'Português',  flag: '🇧🇷' },
  { code: 'it', label: 'Italiano',   flag: '🇮🇹' },
]

export default function TranslateWidget() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(LANGUAGES[0])
  const ref = useRef(null)

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const selectLanguage = (lang) => {
    setActive(lang)
    setOpen(false)

    // Drive the hidden Google Translate select element
    const select = document.querySelector('.goog-te-combo')
    if (select) {
      select.value = lang.code
      select.dispatchEvent(new Event('change'))
    } else {
      // Fallback: use Google Translate cookie method
      document.cookie = `googtrans=/en/${lang.code}; path=/`
      window.location.reload()
    }
  }

  return (
    <div ref={ref} className="relative">
      {/* Trigger button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-[7px] px-3 py-[6px] rounded-full border border-[#e0e0e0] bg-white text-[0.8rem] font-medium text-[#444] hover:border-[#111] transition-all"
        aria-label="Select language"
      >
        <span className="text-[1rem] leading-none">{active.flag}</span>
        <span className="hidden sm:block">{active.label}</span>
        <svg
          viewBox="0 0 24 24"
          className={`w-[14px] h-[14px] stroke-[#888] fill-none stroke-2 transition-transform ${open ? 'rotate-180' : ''}`}
          strokeLinecap="round"
        >
          <path d="m6 9 6 6 6-6"/>
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 top-[calc(100%+8px)] z-[500] bg-white border border-[#e0e0e0] rounded-[12px] shadow-[0_8px_32px_rgba(0,0,0,0.12)] py-[6px] min-w-[160px] overflow-hidden">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => selectLanguage(lang)}
              className={`w-full flex items-center gap-[10px] px-[14px] py-[8px] text-[0.85rem] font-medium text-left transition-colors ${
                active.code === lang.code
                  ? 'bg-[#f0f0f0] text-[#111]'
                  : 'text-[#444] hover:bg-[#f9f9f9]'
              }`}
            >
              <span className="text-[1.1rem] leading-none">{lang.flag}</span>
              {lang.label}
              {active.code === lang.code && (
                <svg viewBox="0 0 24 24" className="w-[14px] h-[14px] stroke-[#111] fill-none stroke-2 ml-auto" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5"/>
                </svg>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Hidden Google Translate element — needed for the script to initialise */}
      <div id="google_translate_element" className="hidden" />
    </div>
  )
}
