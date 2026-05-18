import { useState, useEffect, useRef } from 'react'
import { animate, utils } from 'animejs'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const linksRef = useRef<HTMLDivElement>(null)
  const [activeSection, setActiveSection] = useState('#home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const links = linksRef.current
    if (!links) return

    const items = links.querySelectorAll<HTMLAnchorElement>('.nav-link')
    if (items.length === 0) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!prefersReduced) {
      animate(items, {
        opacity: [0, 1],
        translateY: [-12, 0],
        easing: 'easeOutCubic',
        duration: 500,
        delay: utils.stagger(80, { start: 200 }),
      })
    } else {
      items.forEach((item) => { item.style.opacity = '1' })
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map((l) => document.querySelector(l.href)).filter(Boolean)
      const scrollPos = window.scrollY + 120

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i] as HTMLElement
        if (section.offsetTop <= scrollPos) {
          setActiveSection(navLinks[i].href)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-navy-900/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a href="#home" className="text-teal-400 font-mono text-xl font-bold hover:text-teal-300 transition-colors">
            &lt;SSD /&gt;
          </a>

          <div ref={linksRef} className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`nav-link relative font-mono text-sm transition-colors duration-300 ${
                  activeSection === link.href ? 'text-teal-400' : 'text-slate-200 hover:text-teal-400'
                }`}
                style={{ opacity: 0 }}
              >
                {link.label}
                {activeSection === link.href && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-teal-400 rounded-full" />
                )}
              </a>
            ))}
          </div>

          <button className="md:hidden text-slate-200 hover:text-teal-400 transition-colors" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-navy-800/95 backdrop-blur-md border-t border-navy-700 animate-fade-in">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block font-mono text-sm py-2 transition-colors ${
                  activeSection === link.href ? 'text-teal-400' : 'text-slate-200 hover:text-teal-400'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
