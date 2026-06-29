'use client'
// components/PageLoader.js
import { useEffect, useState } from 'react'

export default function PageLoader() {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setHidden(true), 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={`page-loader${hidden ? ' hidden' : ''}`}>
      <div className="loader-logo">StaycationKE</div>
      <div className="loader-bar">
        <div className="loader-bar-fill" />
      </div>
      <p className="loader-text">Discovering Kenya&apos;s finest stays</p>
    </div>
  )
}
