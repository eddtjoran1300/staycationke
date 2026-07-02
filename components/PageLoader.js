'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function PageLoader() {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setHidden(true), 1800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={`page-loader${hidden ? ' hidden' : ''}`}>
      <Image
        src="/logo.png"
        alt="StaycationKE"
        width={200}
        height={50}
        className="h-10 w-auto object-contain"
        style={{ animation: 'fadeUp 0.6s 0.15s both' }}
        priority
      />
      <div className="loader-bar" style={{ animation: 'fadeUp 0.6s 0.35s both' }}>
        <div className="loader-bar-fill" />
      </div>
      <p className="loader-text" style={{ animation: 'fadeUp 0.6s 0.55s both' }}>
        Discovering Kenya&apos;s finest stays
      </p>
    </div>
  )
}
