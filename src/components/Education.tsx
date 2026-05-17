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
  { title: 'NPTEL — Machine Learning', issuer: 'IIT Kharagpur', year: '2025' },
  { title: 'NPTEL — Deep Learning', issuer: 'IIT Kharagpur', year: '2026' },
  { title: 'Generative AI & Agentic Architectures', issuer: 'Here and Now AI', year: '2025' },
  { title: 'Full Stack Software Development', issuer: 'Here and Now AI (GitHub Speckit)', year: '2026' },
]

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
            <div>
              <div className="flex items-center gap-3 mb-6">
                <GraduationCap className="w-6 h-6 text-teal-400" />
                <h3 className="text-xl font-semibold text-slate-100">Education</h3>
              </div>
              <div className="space-y-6">
                {education.map((edu) => (
                  <div key={edu.degree} className="card">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-slate-100 font-medium">{edu.degree}</h4>
                      <span className="text-teal-400 font-mono text-sm whitespace-nowrap ml-4">{edu.period}</span>
                    </div>
                    <p className="text-slate-300 text-sm mb-1">{edu.school}</p>
                    <p className="text-teal-400 font-mono text-sm">{edu.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-6">
                <Award className="w-6 h-6 text-teal-400" />
                <h3 className="text-xl font-semibold text-slate-100">Certifications</h3>
              </div>
              <div className="space-y-3">
                {certifications.map((cert, idx) => (
                  <motion.div
                    key={cert.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.4 }}
                    className="card flex items-start gap-4"
                  >
                    <div className="w-2 h-2 rounded-full bg-teal-400 mt-2 flex-shrink-0" />
                    <div>
                      <h4 className="text-slate-100 text-sm font-medium">{cert.title}</h4>
                      <p className="text-slate-300 text-xs">{cert.issuer} · {cert.year}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
