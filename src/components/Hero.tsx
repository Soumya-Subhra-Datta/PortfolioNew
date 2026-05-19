import { ArrowDown, Download, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'
import HeroParticles from './animations/HeroParticles'
import HeroNameReveal from './animations/HeroNameReveal'
import CircuitBackground from './animations/CircuitBackground'
import RoleTypewriter from './animations/RoleTypewriter'

export default function Hero() {

  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden pt-16">
      {/* Anime.js backgrounds */}
      <CircuitBackground />
      <HeroParticles />

      {/* Framer Motion background blobs */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-teal-400 rounded-full blur-[128px] animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-[128px] animate-float" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
          <div className="flex-1 order-2 md:order-1">
            {/* Anime.js stagger fade */}
            <p className="text-teal-400 font-mono text-sm md:text-base mb-4">
              Hi, my name is
            </p>

            {/* Anime.js letter-by-letter */}
            <HeroNameReveal text="Soumya Subhra" className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-100 mb-1" />
            <HeroNameReveal text="Datta" className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gradient mb-3" />

            {/* Anime.js typewriter role text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              <RoleTypewriter />
            </motion.div>

            {/* Framer Motion description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
              className="text-slate-300 text-base md:text-lg max-w-xl mb-8 leading-relaxed"
            >
              Building intelligent AI systems — from RAG pipelines and LSTM-based threat detection to full-stack ML platforms. Passionate about turning data into impactful, real-world solutions.
            </motion.p>

            {/* Framer Motion CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <a href="#contact" className="btn-secondary cta-glow">
                Get In Touch <ArrowDown size={16} />
              </a>
              <a href="/PortfolioNew/Soumya_Subhra_Datta_Resume.pdf" download className="btn-primary cta-glow">
                <Download size={16} /> Resume
              </a>
              <a href="https://github.com/Soumya-Subhra-Datta" target="_blank" rel="noopener noreferrer" className="btn-primary cta-glow">
                <ExternalLink size={16} /> GitHub
              </a>
            </motion.div>
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
