import { useEffect, useRef } from 'react'
import { createTimer } from 'animejs'

type Variant = 'geometric' | 'grid-dots' | 'orbs' | 'particles' | 'wave'

interface Props {
  variant: Variant
}

interface Shape {
  x: number; y: number; size: number; rotation: number
  speedX: number; speedY: number; rotSpeed: number; type: 'tri' | 'circle' | 'square'
  opacity: number
}

interface Orb {
  x: number; y: number; radius: number
  dx: number; dy: number; opacity: number
}

interface Dot {
  x: number; y: number; baseOpacity: number; phase: number
}

interface Wave {
  y: number; amp: number; freq: number; speed: number; phase: number
}

function BackgroundCanvas({ variant }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const timerRef = useRef<ReturnType<typeof createTimer> | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.innerWidth < 768
    let w = canvas.width = canvas.offsetWidth
    let h = canvas.height = canvas.offsetHeight

    const onResize = () => {
      w = canvas.width = canvas.offsetWidth
      h = canvas.height = canvas.offsetHeight
    }
    window.addEventListener('resize', onResize)

    let state: Shape[] | Orb[] | Dot[] | Wave[] = []

    function draw() {
      ctx!.clearRect(0, 0, w, h)

      if (variant === 'geometric') {
        const shapes = state as Shape[]
        for (const s of shapes) {
          s.x += s.speedX; s.y += s.speedY; s.rotation += s.rotSpeed
          if (s.x < -20) s.x = w + 20; if (s.x > w + 20) s.x = -20
          if (s.y < -20) s.y = h + 20; if (s.y > h + 20) s.y = -20

          ctx!.save(); ctx!.translate(s.x, s.y); ctx!.rotate(s.rotation)
          ctx!.globalAlpha = s.opacity; ctx!.strokeStyle = '#64ffda'; ctx!.lineWidth = 1

          if (s.type === 'tri') {
            ctx!.beginPath()
            ctx!.moveTo(0, -s.size); ctx!.lineTo(-s.size, s.size); ctx!.lineTo(s.size, s.size)
            ctx!.closePath(); ctx!.stroke()
          } else if (s.type === 'circle') {
            ctx!.beginPath(); ctx!.arc(0, 0, s.size / 2, 0, Math.PI * 2); ctx!.stroke()
          } else {
            ctx!.strokeRect(-s.size / 2, -s.size / 2, s.size, s.size)
          }
          ctx!.restore()
        }
      }

      if (variant === 'grid-dots') {
        const dots = state as Dot[]
        const time = Date.now() / 1000
        for (const d of dots) {
          const pulse = Math.sin(time * 0.5 + d.phase) * 0.3 + 0.7
          ctx!.beginPath()
          ctx!.arc(d.x, d.y, 1.2, 0, Math.PI * 2)
          ctx!.fillStyle = `rgba(100, 255, 218, ${d.baseOpacity * pulse})`
          ctx!.fill()
        }
      }

      if (variant === 'orbs') {
        const orbs = state as Orb[]
        for (const o of orbs) {
          o.x += o.dx; o.y += o.dy
          if (o.x < -o.radius || o.x > w + o.radius) o.dx *= -1
          if (o.y < -o.radius || o.y > h + o.radius) o.dy *= -1

          const grad = ctx!.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.radius)
          grad.addColorStop(0, `rgba(100, 255, 218, ${o.opacity})`)
          grad.addColorStop(1, `rgba(100, 255, 218, 0)`)
          ctx!.fillStyle = grad
          ctx!.beginPath(); ctx!.arc(o.x, o.y, o.radius, 0, Math.PI * 2); ctx!.fill()
        }
      }

      if (variant === 'particles') {
        const particles = state as Shape[]
        for (const p of particles) {
          p.y -= p.speedY; p.x += Math.sin(Date.now() / 1000 + p.rotation) * 0.3
          if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w }

          ctx!.globalAlpha = Math.min(1, (h - p.y) / h) * 0.4
          ctx!.fillStyle = '#64ffda'
          ctx!.beginPath(); ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx!.fill()
          ctx!.globalAlpha = 1
        }
      }

      if (variant === 'wave') {
        const waves = state as Wave[]
        const time = Date.now() / 1000
        ctx!.lineWidth = 1.5
        for (const wave of waves) {
          ctx!.beginPath()
          for (let x = 0; x <= w; x += 2) {
            const y = wave.y + Math.sin(x * wave.freq + time * wave.speed + wave.phase) * wave.amp
            x === 0 ? ctx!.moveTo(x, y) : ctx!.lineTo(x, y)
          }
          ctx!.strokeStyle = `rgba(100, 255, 218, ${wave.amp > 30 ? 0.06 : 0.1})`
          ctx!.stroke()
        }
      }
    }

    // Init based on variant
    function init() {
      if (variant === 'geometric') {
        const count = isMobile ? 6 : 12
        state = Array.from({ length: count }, () => ({
          x: Math.random() * w, y: Math.random() * h,
          size: Math.random() * 20 + 10, rotation: Math.random() * Math.PI * 2,
          speedX: (Math.random() - 0.5) * 0.3, speedY: (Math.random() - 0.5) * 0.3,
          rotSpeed: (Math.random() - 0.5) * 0.02,
          type: (['tri', 'circle', 'square'] as const)[Math.floor(Math.random() * 3)],
          opacity: Math.random() * 0.15 + 0.05,
        }))
      }

      if (variant === 'grid-dots') {
        state = []
        const spacing = isMobile ? 60 : 40
        for (let x = 0; x < w; x += spacing) {
          for (let y = 0; y < h; y += spacing) {
            ;(state as Dot[]).push({
              x: x + Math.random() * 4, y: y + Math.random() * 4,
              baseOpacity: Math.random() * 0.15 + 0.05,
              phase: Math.random() * Math.PI * 2,
            })
          }
        }
      }

      if (variant === 'orbs') {
        const count = isMobile ? 2 : 4
        state = Array.from({ length: count }, () => ({
          x: Math.random() * w, y: Math.random() * h,
          radius: Math.random() * 120 + 60,
          dx: (Math.random() - 0.5) * 0.4, dy: (Math.random() - 0.5) * 0.4,
          opacity: Math.random() * 0.1 + 0.08,
        }))
      }

      if (variant === 'particles') {
        const count = isMobile ? 10 : 20
        state = Array.from({ length: count }, () => ({
          x: Math.random() * w, y: Math.random() * h,
          size: Math.random() * 2 + 1, rotation: Math.random() * Math.PI * 2,
          speedX: 0, speedY: Math.random() * 0.4 + 0.2,
          rotSpeed: 0, type: 'circle' as const,
          opacity: 0.4,
        }))
      }

      if (variant === 'wave') {
        const count = isMobile ? 2 : 3
        const waves = [
          { y: h * 0.3, amp: isMobile ? 12 : 20, freq: 0.02, speed: 1.5, phase: 0 },
          { y: h * 0.5, amp: isMobile ? 10 : 15, freq: 0.025, speed: 1.2, phase: Math.PI / 3 },
        ]
        if (count > 2) {
          waves.push({ y: h * 0.7, amp: 25, freq: 0.015, speed: 1.8, phase: Math.PI / 1.5 })
        }
        state = waves
      }
    }

    init()

    if (!prefersReduced) {
      timerRef.current = createTimer({
        duration: Infinity,
        onUpdate: draw,
      })
    } else {
      draw()
    }

    return () => {
      if (timerRef.current) timerRef.current.cancel()
      window.removeEventListener('resize', onResize)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variant])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: variant === 'orbs' ? 0.6 : 1 }}
    />
  )
}

export default function SectionBackground({ variant }: Props) {
  return <BackgroundCanvas variant={variant} />
}
