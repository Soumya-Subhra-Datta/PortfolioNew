import { useEffect, useRef } from 'react'
import { animate, utils } from 'animejs'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Linkedin, Github, Download } from 'lucide-react'

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'soumyasubhradatta@gmail.com', href: 'mailto:soumyasubhradatta@gmail.com' },
  { icon: Phone, label: 'Phone', value: '+91 9862603445', href: 'tel:+919862603445' },
  { icon: MapPin, label: 'Location', value: 'Semmancheri, Chennai, Tamil Nadu' },
]

const socials = [
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/soumya-subhra-datta' },
  { icon: Github, label: 'GitHub', href: 'https://github.com/Soumya-Subhra-Datta' },
]

function ContactList() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const items = container.querySelectorAll<HTMLElement>('.contact-item')
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
            translateX: [-30, 0],
            easing: 'easeOutCubic',
            duration: 600,
            delay: utils.stagger(100),
          })
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef} className="space-y-4">
      {contactInfo.map((item) => (
        <div key={item.label} className="contact-item flex items-center gap-4" style={{ opacity: 0 }}>
          <div className="w-10 h-10 rounded-full bg-navy-700 flex items-center justify-center flex-shrink-0">
            <item.icon className="w-5 h-5 text-teal-400" />
          </div>
          <div>
            <p className="text-xs text-slate-300 font-mono">{item.label}</p>
            {item.href ? (
              <a href={item.href} className="text-slate-100 hover:text-teal-400 transition-colors">
                {item.value}
              </a>
            ) : (
              <p className="text-slate-100">{item.value}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

function SocialIcons() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const icons = container.querySelectorAll<HTMLAnchorElement>('.social-icon')
    if (icons.length === 0) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      icons.forEach((icon) => { icon.style.opacity = '1'; icon.style.transform = 'none' })
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate(icons, {
            opacity: [0, 1],
            scale: [0, 1],
            rotate: [-180, 0],
            easing: 'easeOutBack',
            duration: 700,
            delay: utils.stagger(120, { start: 300 }),
          })
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef} className="flex gap-4 pt-4">
      {socials.map((social) => (
        <a
          key={social.label}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon w-12 h-12 rounded-full bg-navy-700 flex items-center justify-center hover:bg-teal-400/10 hover:border-teal-400 border border-navy-600 transition-all duration-300 group"
          style={{ opacity: 0 }}
        >
          <social.icon className="w-5 h-5 text-slate-200 group-hover:text-teal-400 transition-colors" />
        </a>
      ))}
    </div>
  )
}

function ResumeCard() {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      card.style.opacity = '1'
      card.style.transform = 'none'
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate(card, {
            opacity: [0, 1],
            scale: [0.85, 1],
            translateY: [30, 0],
            easing: 'easeOutCubic',
            duration: 700,
            delay: 400,
          })
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(card)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={cardRef}
      className="card flex flex-col items-center justify-center text-center gap-6"
      style={{ opacity: 0 }}
    >
      <div className="w-16 h-16 rounded-full bg-teal-400/10 flex items-center justify-center">
        <Download className="w-8 h-8 text-teal-400" />
      </div>
      <div>
        <h3 className="text-xl font-semibold text-slate-100 mb-2">Download My Resume</h3>
        <p className="text-slate-300 text-sm mb-4">Get the full overview of my experience and skills</p>
        <a href="/PortfolioNew/Soumya_Subhra_Datta_Resume.pdf" download className="btn-secondary cta-glow">
          <Download size={16} /> Download Resume (PDF)
        </a>
      </div>
    </div>
  )
}

export default function Contact() {
  return (
    <section id="contact" className="py-20 md:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-heading">Get In Touch</h2>

          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <p className="text-slate-300 leading-relaxed">
                I'm currently looking for opportunities in <span className="text-teal-400 font-medium">AI Engineering, Machine Learning, and Generative AI</span> roles. Whether you have a question or just want to say hi, feel free to reach out!
              </p>

              <ContactList />
              <SocialIcons />
            </div>

            <ResumeCard />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
