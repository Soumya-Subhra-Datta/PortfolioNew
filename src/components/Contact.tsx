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

              <div className="space-y-4">
                {contactInfo.map((item) => (
                  <div key={item.label} className="flex items-center gap-4">
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

              <div className="flex gap-4 pt-4">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-navy-700 flex items-center justify-center hover:bg-teal-400/10 hover:border-teal-400 border border-navy-600 transition-all duration-300 group"
                  >
                    <social.icon className="w-5 h-5 text-slate-200 group-hover:text-teal-400 transition-colors" />
                  </a>
                ))}
              </div>
            </div>

            <div className="card flex flex-col items-center justify-center text-center gap-6">
              <div className="w-16 h-16 rounded-full bg-teal-400/10 flex items-center justify-center">
                <Download className="w-8 h-8 text-teal-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-100 mb-2">Download My Resume</h3>
                <p className="text-slate-300 text-sm mb-4">Get the full overview of my experience and skills</p>
                <a href="/PortfolioNew/Soumya_Subhra_Datta_Resume.pdf" download className="btn-secondary">
                  <Download size={16} /> Download Resume (PDF)
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
