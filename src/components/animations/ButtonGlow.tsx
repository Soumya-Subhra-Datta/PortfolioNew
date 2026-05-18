import { useEffect } from 'react'
import { animate } from 'animejs'

export default function ButtonGlow() {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const buttons = document.querySelectorAll('.cta-glow')
    if (buttons.length === 0) return

    const anim = animate(buttons, {
      boxShadow: [
        '0 0 8px rgba(100,255,218,0.3), 0 0 16px rgba(100,255,218,0.1)',
        '0 0 16px rgba(100,255,218,0.5), 0 0 32px rgba(100,255,218,0.2)',
        '0 0 8px rgba(100,255,218,0.3), 0 0 16px rgba(100,255,218,0.1)',
      ],
      duration: 2000,
      loop: true,
      easing: 'easeInOutSine',
    })

    return () => { void anim.cancel() }
  }, [])

  return null
}
