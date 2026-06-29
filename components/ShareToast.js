'use client'
// components/ShareToast.js
import { useEffect, useState } from 'react'

export default function ShareToast() {
  const [msg, setMsg] = useState('')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    window.showToast = (message) => {
      setMsg(message)
      setVisible(true)
      setTimeout(() => setVisible(false), 2200)
    }
  }, [])

  return (
    <div className={`share-toast${visible ? ' show' : ''}`}>
      {msg}
    </div>
  )
}
