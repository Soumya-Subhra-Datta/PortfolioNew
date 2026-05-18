import { useEffect, useRef, useState } from 'react'
import { createTimer } from 'animejs'

const roles = ['AI Engineer', 'ML Developer', 'Generative AI Specialist', 'Full-Stack Developer']

export default function RoleTypewriter() {
  const [displayText, setDisplayText] = useState('')
  const [cursor, setCursor] = useState(true)
  const roleIndexRef = useRef(0)
  const phaseRef = useRef<'typing' | 'pause' | 'erasing'>('typing')

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setDisplayText(roles[0])
      return
    }

    let charIndex = 0
    let timer: ReturnType<typeof createTimer> | null = null
    let pauseTimeout: ReturnType<typeof setTimeout> | null = null

    function startTyping() {
      const currentRole = roles[roleIndexRef.current]
      charIndex = 0
      phaseRef.current = 'typing'

      timer = createTimer({
        duration: currentRole.length * 80,
        onUpdate: () => {
          const progress = timer ? Math.floor((timer.currentTime / (currentRole.length * 80)) * currentRole.length) : 0
          charIndex = Math.min(progress, currentRole.length)
          setDisplayText(currentRole.slice(0, charIndex))
        },
        onComplete: () => {
          setDisplayText(currentRole)
          phaseRef.current = 'pause'
          pauseTimeout = setTimeout(() => {
            startErasing()
          }, 1500)
        },
      })
    }

    function startErasing() {
      const currentRole = roles[roleIndexRef.current]
      phaseRef.current = 'erasing'

      timer = createTimer({
        duration: currentRole.length * 50,
        onUpdate: () => {
          const progress = timer ? Math.floor((timer.currentTime / (currentRole.length * 50)) * currentRole.length) : 0
          const remaining = currentRole.length - Math.min(progress, currentRole.length)
          setDisplayText(currentRole.slice(0, remaining))
        },
        onComplete: () => {
          setDisplayText('')
          roleIndexRef.current = (roleIndexRef.current + 1) % roles.length
          phaseRef.current = 'typing'
          startTyping()
        },
      })
    }

    startTyping()

    return () => {
      if (timer) timer.cancel()
      if (pauseTimeout) clearTimeout(pauseTimeout)
    }
  }, [])

  useEffect(() => {
    const blink = setInterval(() => setCursor((c) => !c), 500)
    return () => clearInterval(blink)
  }, [])

  return (
    <div className="h-10 md:h-12 mb-6">
      <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-300">
        {displayText}
      </span>
      <span className={`inline-block w-1 h-8 md:h-10 bg-teal-400 ml-1 transition-opacity duration-100 ${cursor ? 'opacity-100' : 'opacity-0'}`} />
    </div>
  )
}
