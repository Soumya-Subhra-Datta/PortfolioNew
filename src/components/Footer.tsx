import { useEffect, useRef } from 'react'
import { animate } from 'animejs'

export default function Footer() {
  const year = new Date().getFullYear()
  const footerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const footer = footerRef.current
    if (!footer) return

    const items = footer.querySelectorAll<HTMLElement>('.footer-item')
    if (items.length === 0) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      items.forEach((item) => { item.style.opacity = '1'; item.style.transform = 'none' })
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate(items, {
            opacity: [0, 1],
            translateY: [20, 0],
            easing: 'easeOutCubic',
            duration: 600,
            delay: (_el: HTMLElement, i: number) => i * 150,
          })
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(footer)
    return () => observer.disconnect()
  }, [])

  return (
    <footer ref={footerRef} className="py-8 border-t border-navy-700">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <a href="#home" className="footer-item text-teal-400 font-mono text-lg font-bold" style={{ opacity: 0 }}>
            &lt;SSD /&gt;
          </a>
          <p className="footer-item text-slate-300 text-sm font-mono" style={{ opacity: 0 }}>
            Designed & Built by Soumya Subhra Datta &copy; {year}
          </p>
        </div>
      </div>
    </footer>
  )
}
