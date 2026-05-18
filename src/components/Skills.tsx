import { useEffect, useRef } from 'react'
import { animate } from 'animejs'
import { motion } from 'framer-motion'
import SectionBackground from './animations/SectionBackground'

const skillCategories = [
  {
    title: 'Programming Languages',
    skills: [
      { name: 'Python', level: 95 },
      { name: 'Java', level: 75 },
      { name: 'JavaScript', level: 80 },
      { name: 'C', level: 70 },
      { name: 'TypeScript', level: 75 },
    ],
  },
  {
    title: 'Machine Learning & AI',
    skills: [
      { name: 'Scikit-learn', level: 90 },
      { name: 'Random Forest', level: 85 },
      { name: 'Anomaly Detection', level: 85 },
      { name: 'ROC-AUC / PR-AUC', level: 80 },
      { name: 'Cost-Sensitive Learning', level: 75 },
    ],
  },
  {
    title: 'Deep Learning',
    skills: [
      { name: 'LSTM / RNN / GRU', level: 90 },
      { name: 'CNN / ResNet / VGG', level: 85 },
      { name: 'Transformer / BERT', level: 80 },
      { name: 'Autoencoder / GAN', level: 75 },
      { name: 'Attention Mechanisms', level: 80 },
    ],
  },
  {
    title: 'Generative AI & NLP',
    skills: [
      { name: 'LangChain', level: 85 },
      { name: 'OpenAI / Gemini API', level: 88 },
      { name: 'RAG Pipelines', level: 85 },
      { name: 'Prompt Engineering', level: 90 },
      { name: 'NLTK / SpaCy', level: 80 },
    ],
  },
  {
    title: 'Data Science & Analytics',
    skills: [
      { name: 'Pandas / NumPy', level: 90 },
      { name: 'Matplotlib / Tableau', level: 80 },
      { name: 'Feature Engineering', level: 85 },
      { name: 'Data Cleaning', level: 90 },
      { name: 'Class Imbalance', level: 80 },
    ],
  },
  {
    title: 'Tools & Platforms',
    skills: [
      { name: 'Flask / FastAPI', level: 85 },
      { name: 'React.js', level: 80 },
      { name: 'MySQL / MongoDB', level: 85 },
      { name: 'Docker / Git', level: 80 },
      { name: 'Hugging Face', level: 75 },
    ],
  },
]

function SkillBar({ name, level, index }: { name: string; level: number; index: number }) {
  const barRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const bar = barRef.current
    const label = labelRef.current
    if (!bar || !label) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (prefersReduced) {
            bar.style.width = `${level}%`
            label.textContent = `${level}%`
          } else {
            animate(bar, {
              width: [`0%`, `${level}%`],
              easing: 'easeOutCubic',
              duration: 1000,
              delay: index * 80,
            })
            animate(label, {
              textContent: [0, level],
              easing: 'easeOutCubic',
              duration: 1000,
              delay: index * 80,
              round: 1,
            })
          }
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(bar)
    return () => observer.disconnect()
  }, [level, index])

  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-slate-200">{name}</span>
        <span ref={labelRef} className="text-slate-300">0%</span>
      </div>
      <div className="h-1.5 bg-navy-700 rounded-full overflow-hidden">
        <div
          ref={barRef}
          className="h-full bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full"
          style={{ width: '0%' }}
        />
      </div>
    </div>
  )
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

export default function Skills() {
  return (
    <section id="skills" className="py-20 md:py-32 bg-navy-800/50 relative overflow-hidden">
      <SectionBackground variant="grid-dots" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-heading">Skills & Expertise</h2>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            {skillCategories.map((category) => (
              <motion.div
                key={category.title}
                variants={cardVariants}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="card"
              >
                <h3 className="text-teal-400 font-mono text-sm mb-4">{category.title}</h3>
                <div className="space-y-3">
                  {category.skills.map((skill, idx) => (
                    <SkillBar key={skill.name} name={skill.name} level={skill.level} index={idx} />
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
