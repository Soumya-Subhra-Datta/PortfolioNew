import { useEffect, useRef } from 'react'
import { animate } from 'animejs'

export default function CircuitBackground() {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const paths = svg.querySelectorAll<SVGPathElement>('.circuit-path')
    if (paths.length === 0) return

    paths.forEach((p) => {
      const length = p.getTotalLength()
      p.style.strokeDasharray = String(length)
      p.style.strokeDashoffset = String(length)
    })

    const anim = animate(paths, {
      strokeDashoffset: [0, (el: SVGPathElement) => el.getTotalLength()],
      easing: 'easeInOutSine',
      duration: (_el: SVGPathElement, i: number) => 1500 + i * 400,
      direction: 'alternate' as const,
      loop: true,
      delay: (_el: SVGPathElement, i: number) => i * 300,
    })

    return () => { void anim.cancel() }
  }, [])

  return (
    <svg
      ref={svgRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-10"
      viewBox="0 0 800 600"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none" stroke="#64ffda" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path className="circuit-path" d="M0 100 Q100 100 150 150 Q200 200 300 200 L400 200" />
        <path className="circuit-path" d="M300 200 Q350 200 380 170 L400 150" />
        <path className="circuit-path" d="M400 150 L500 150 Q550 150 580 180 L600 200" />

        <path className="circuit-path" d="M0 300 L100 300 Q130 300 150 280 L180 250 Q200 230 230 230 L300 230" />
        <path className="circuit-path" d="M500 230 L550 230 Q580 230 600 250 L650 300" />

        <path className="circuit-path" d="M200 400 Q250 400 280 370 L300 350 L350 350" />
        <path className="circuit-path" d="M450 350 L500 350 Q530 350 560 380 L600 420" />
        <path className="circuit-path" d="M600 420 L650 420 Q680 420 700 400 L750 370" />

        <path className="circuit-path" d="M150 150 L150 250 Q150 280 170 300 L200 330" />
        <path className="circuit-path" d="M300 200 L300 230" />
        <path className="circuit-path" d="M400 150 L400 100 Q400 70 430 50 L500 50" />
        <path className="circuit-path" d="M500 150 L500 230" />
        <path className="circuit-path" d="M600 200 L600 420" />

        <circle cx="400" cy="150" r="3" fill="#64ffda" stroke="none" />
        <circle cx="300" cy="200" r="3" fill="#64ffda" stroke="none" />
        <circle cx="500" cy="230" r="3" fill="#64ffda" stroke="none" />
        <circle cx="600" cy="200" r="3" fill="#64ffda" stroke="none" />
        <circle cx="200" cy="330" r="2.5" fill="#64ffda" stroke="none" />
        <circle cx="600" cy="420" r="2.5" fill="#64ffda" stroke="none" />

        <path className="circuit-path" d="M100 300 Q120 320 150 320 L200 320 Q230 320 250 300 L280 260" />
        <path className="circuit-path" d="M350 350 L380 320 Q400 300 420 300 L450 300" />
        <path className="circuit-path" d="M500 50 L500 100 Q500 130 520 150 L550 180" />
      </g>
    </svg>
  )
}
