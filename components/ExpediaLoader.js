'use client'
// components/ExpediaLoader.js
// This component renders the overlay AND exposes window.goToExpedia()
// so any component can trigger the redirect without prop-drilling.

import { useEffect } from 'react'

export default function ExpediaLoader() {
  useEffect(() => {
    // Attach global function so any client component can call it
    window.goToExpedia = (affiliateLink) => {
      const overlay = document.getElementById('exp-loader-overlay')
      if (overlay) overlay.classList.add('show')
      document.body.style.overflow = 'hidden'

      setTimeout(() => {
        window.open(affiliateLink, '_blank')
        if (overlay) overlay.classList.remove('show')
        document.body.style.overflow = ''
      }, 1700)
    }
  }, [])

  return (
    <div id="exp-loader-overlay" className="exp-loader">
      <div className="exp-spinner" />
      <div className="exp-loader-title">Finding your perfect stay…</div>
      <div className="exp-loader-sub">Checking availability and live rates</div>
      <div className="exp-loader-badge">
        Redirecting you to <b>Expedia</b>
      </div>
    </div>
  )
}
