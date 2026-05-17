import { useEffect, useState } from 'react'
import { ArrowDown, Download, ExternalLink } from 'lucide-react'

const roles = ['AI Engineer', 'ML Developer', 'Generative AI Specialist', 'Full-Stack Developer']

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden pt-16">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-teal-400 rounded-full blur-[128px] animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-[128px] animate-float" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
          <div className="flex-1 order-2 md:order-1">
            <p className="text-teal-400 font-mono text-sm md:text-base mb-4 animate-fade-in">Hi, my name is</p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-100 mb-3 animate-slide-up">
              Soumya Subhra<br />Datta
            </h1>
            <div className="h-10 md:h-12 mb-6">
              <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-300">
                {roles[roleIndex]}
              </span>
              <span className="inline-block w-1 h-8 md:h-10 bg-teal-400 ml-1 animate-pulse" />
            </div>
            <p className="text-slate-300 text-base md:text-lg max-w-xl mb-8 leading-relaxed">
              Building intelligent AI systems — from RAG pipelines and LSTM-based threat detection to full-stack ML platforms. Passionate about turning data into impactful, real-world solutions.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#contact" className="btn-secondary">
                Get In Touch <ArrowDown size={16} />
              </a>
              <a href="/PortfolioNew/Soumya_Subhra_Datta_Resume.pdf" download className="btn-primary">
                <Download size={16} /> Resume
              </a>
              <a href="https://github.com/Soumya-Subhra-Datta" target="_blank" rel="noopener noreferrer" className="btn-primary">
                <ExternalLink size={16} /> GitHub
              </a>
            </div>
          </div>

          <div className="order-1 md:order-2 flex-shrink-0">
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72">
              <div className="absolute inset-0 rounded-full border-2 border-teal-400 animate-float" />
              <div className="absolute inset-2 rounded-full border-2 border-teal-400/30 animate-float" style={{ animationDelay: '0.8s' }} />
              <img
                src="/PortfolioNew/Photo.jpg"
                alt="Soumya Subhra Datta"
                className="absolute inset-4 w-[calc(100%-32px)] h-[calc(100%-32px)] rounded-full object-cover border-4 border-navy-800"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
