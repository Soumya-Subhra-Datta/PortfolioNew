import { useEffect, useRef } from 'react'
import { animate, utils } from 'animejs'

interface Props {
  text: string
  className?: string
}

export default function HeroNameReveal({ text, className = '' }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const letters = el.querySelectorAll('.anime-letter')
    if (letters.length === 0) return

    if (prefersReduced) {
      letters.forEach((l) => (l as HTMLElement).style.opacity = '1')
      return
    }

    const anim = animate(letters, {
      opacity: [0, 1],
      translateY: [40, 0],
      rotateX: [90, 0],
      easing: 'easeOutExpo',
      duration: 800,
      delay: utils.stagger(50, { start: 400 }),
    })

    return () => { void anim.cancel() }
  }, [text])

  return (
    <div ref={containerRef} className={className}>
      {text.split('').map((char, i) => (
        <span
          key={i}
          className="anime-letter inline-block"
          style={{ opacity: 0, perspective: '500px' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </div>
  )
}
