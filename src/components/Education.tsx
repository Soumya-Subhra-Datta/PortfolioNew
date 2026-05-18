import { useEffect, useRef } from 'react'
import { animate, utils } from 'animejs'
import { motion } from 'framer-motion'
import { GraduationCap, Award } from 'lucide-react'

const education = [
  {
    degree: 'B.E. in Computer Science & Engineering (AI)',
    school: 'Sathyabama Institute of Science and Technology, Chennai',
    period: '2023 – 2027',
    detail: 'CGPA: 7.85',
  },
]

const certifications = [
  {
    title: 'NPTEL — Machine Learning',
    issuer: 'IIT Kharagpur',
    year: '2025',
    driveLink: 'https://drive.google.com/file/d/1DE4S-CMir7hQPKegHtQA2YgjhCIGQ1a4/view',
  },
  {
    title: 'NPTEL — Deep Learning',
    issuer: 'IIT Kharagpur',
    year: '2026',
    driveLink: 'https://drive.google.com/file/d/1v57gXq99cEjXnqDk32P8uO9GvdFqURHb/view',
  },
  {
    title: 'Generative AI & Agentic Architectures',
    issuer: 'Here and Now AI',
    year: '2025',
    driveLink: 'https://drive.google.com/file/d/1-3ZozvbgBzuG_Xj4_y4eB9cPB8XFbUp2/view',
  },
  {
    title: 'Full Stack Software Development',
    issuer: 'Here and Now AI (GitHub Speckit)',
    year: '2026',
    driveLink: 'https://drive.google.com/file/d/1G2oG7XJUdykwEtkZmoGkDbs7Nh_tWR0I/view',
  },
]

function CertCards({ certs }: { certs: typeof certifications }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const cards = container.querySelectorAll<HTMLAnchorElement>('.cert-card')
    if (cards.length === 0) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced) {
      cards.forEach((c) => {
        c.style.opacity = '1'
        c.style.transform = 'none'
      })
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate(cards, {
            opacity: [0, 1],
            translateX: [-30, 0],
            translateY: [20, 0],
            easing: 'easeOutCubic',
            duration: 600,
            delay: utils.stagger(120),
          })
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef} className="space-y-4">
      {certs.map((cert) => (
        <a
          key={cert.title}
          href={cert.driveLink}
          target="_blank"
          rel="noopener noreferrer"
          className="cert-card card block cursor-pointer hover:border-teal-400/60 transition-colors"
          style={{ opacity: 0 }}
        >
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-teal-400 mt-2 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <h4 className="text-slate-100 text-sm font-medium">{cert.title}</h4>
              <p className="text-slate-300 text-xs">{cert.issuer} · {cert.year}</p>
            </div>
          </div>
        </a>
      ))}
    </div>
  )
}

export default function Education() {
  return (
    <section id="education" className="py-20 md:py-32 bg-navy-800/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-heading">Education & Certifications</h2>

          <div className="grid md:grid-cols-2 gap-10">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <GraduationCap className="w-6 h-6 text-teal-400" />
                <h3 className="text-xl font-semibold text-slate-100">Education</h3>
              </div>
              <div className="space-y-6">
                {education.map((edu) => (
                  <motion.div
                    key={edu.degree}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="card"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-slate-100 font-medium">{edu.degree}</h4>
                      <span className="text-teal-400 font-mono text-sm whitespace-nowrap ml-4">{edu.period}</span>
                    </div>
                    <p className="text-slate-300 text-sm mb-1">{edu.school}</p>
                    <p className="text-teal-400 font-mono text-sm">{edu.detail}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Award className="w-6 h-6 text-teal-400" />
                <h3 className="text-xl font-semibold text-slate-100">Certifications</h3>
              </div>
              <CertCards certs={certifications} />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
