import { useEffect, useRef } from 'react'
import { createTimer } from 'animejs'

interface TrailPoint {
  x: number
  y: number
  life: number
}

interface Ripple {
  x: number
  y: number
  radius: number
  maxRadius: number
  life: number
}

export default function CursorEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const timerRef = useRef<ReturnType<typeof createTimer> | null>(null)
  const trailRef = useRef<TrailPoint[]>([])
  const ripplesRef = useRef<Ripple[]>([])
  const posRef = useRef({ x: -100, y: -100, active: false })
  const prefersReduced = useRef(false)

  useEffect(() => {
    prefersReduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced.current) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas!.width = window.innerWidth
      canvas!.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const onMove = (e: MouseEvent | TouchEvent) => {
      let x: number, y: number
      if ('touches' in e) {
        const t = e.touches[0]
        if (!t) return
        x = t.clientX
        y = t.clientY
      } else {
        x = e.clientX
        y = e.clientY
      }
      posRef.current = { x, y, active: true }
    }

    const onDown = (e: MouseEvent | TouchEvent) => {
      let x: number, y: number
      if ('touches' in e) {
        const t = e.touches[0]
        if (!t) return
        x = t.clientX
        y = t.clientY
      } else {
        x = e.clientX
        y = e.clientY
      }
      ripplesRef.current.push({
        x, y,
        radius: 0,
        maxRadius: 40 + Math.random() * 30,
        life: 1,
      })
    }

    const onLeave = () => {
      posRef.current.active = false
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('touchmove', onMove, { passive: true })
    window.addEventListener('mousedown', onDown)
    window.addEventListener('touchstart', onDown, { passive: true })
    window.addEventListener('mouseleave', onLeave)

    const draw = () => {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height)

      if (posRef.current.active) {
        trailRef.current.push({ x: posRef.current.x, y: posRef.current.y, life: 1 })
      }

      for (let i = trailRef.current.length - 1; i >= 0; i--) {
        const p = trailRef.current[i]
        p.life -= 0.035
        if (p.life <= 0) {
          trailRef.current.splice(i, 1)
          continue
        }
        ctx!.beginPath()
        ctx!.arc(p.x, p.y, 3 * p.life, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(100, 255, 218, ${p.life * 0.35})`
        ctx!.fill()
      }
      if (trailRef.current.length > 60) {
        trailRef.current.splice(0, trailRef.current.length - 60)
      }

      for (let i = ripplesRef.current.length - 1; i >= 0; i--) {
        const r = ripplesRef.current[i]
        r.radius += 1.5
        r.life -= 0.018
        if (r.life <= 0) {
          ripplesRef.current.splice(i, 1)
          continue
        }
        ctx!.beginPath()
        ctx!.arc(r.x, r.y, r.radius, 0, Math.PI * 2)
        ctx!.strokeStyle = `rgba(100, 255, 218, ${r.life * 0.5})`
        ctx!.lineWidth = 1.5
        ctx!.stroke()
      }
    }

    timerRef.current = createTimer({ duration: Infinity, onUpdate: draw })

    return () => {
      timerRef.current?.cancel()
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('touchmove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('touchstart', onDown)
      window.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      aria-hidden="true"
    />
  )
}
