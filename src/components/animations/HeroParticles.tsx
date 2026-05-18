import { useEffect, useRef } from 'react'
import { createTimer } from 'animejs'

interface Particle {
  x: number
  y: number
  size: number
  opacity: number
  speedX: number
  speedY: number
}

export default function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const timerRef = useRef<ReturnType<typeof createTimer> | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let w = canvas.width = canvas.offsetWidth
    let h = canvas.height = canvas.offsetHeight

    const particleCount = prefersReduced ? 8 : 25
    const particles: Particle[] = []

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.6 + 0.2,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
      })
    }

    function draw() {
      ctx!.clearRect(0, 0, w, h)

      for (const p of particles) {
        p.x += p.speedX
        p.y += p.speedY

        if (p.x < 0) p.x = w
        if (p.x > w) p.x = 0
        if (p.y < 0) p.y = h
        if (p.y > h) p.y = 0

        ctx!.beginPath()
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(100, 255, 218, ${p.opacity})`
        ctx!.fill()

        const glow = ctx!.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4)
        glow.addColorStop(0, `rgba(100, 255, 218, ${p.opacity * 0.3})`)
        glow.addColorStop(1, 'rgba(100, 255, 218, 0)')
        ctx!.fillStyle = glow
        ctx!.beginPath()
        ctx!.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2)
        ctx!.fill()
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 120) {
            ctx!.beginPath()
            ctx!.moveTo(particles[i].x, particles[i].y)
            ctx!.lineTo(particles[j].x, particles[j].y)
            ctx!.strokeStyle = `rgba(100, 255, 218, ${0.08 * (1 - dist / 120)})`
            ctx!.lineWidth = 0.5
            ctx!.stroke()
          }
        }
      }
    }

    if (!prefersReduced) {
      timerRef.current = createTimer({
        duration: Infinity,
        onUpdate: draw,
      })
    } else {
      draw()
    }

    const onResize = () => {
      w = canvas.width = canvas.offsetWidth
      h = canvas.height = canvas.offsetHeight
    }
    window.addEventListener('resize', onResize)

    return () => {
      if (timerRef.current) timerRef.current.cancel()
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
      style={{ opacity: 0.7 }}
    />
  )
}
