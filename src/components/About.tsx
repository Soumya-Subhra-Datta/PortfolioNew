import { motion } from 'framer-motion'
import { Code2, Brain, Cpu, Database } from 'lucide-react'

const highlights = [
  { icon: Brain, label: 'AI & ML', value: '3+ Years' },
  { icon: Code2, label: 'Projects', value: '10+' },
  { icon: Cpu, label: 'Models Built', value: '15+' },
  { icon: Database, label: 'Datasets', value: '5+ TB' },
]

export default function About() {
  return (
    <section id="about" className="py-20 md:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-heading">About Me</h2>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-4">
              <p className="text-slate-300 leading-relaxed">
                I'm a motivated <span className="text-teal-400 font-medium">Artificial Intelligence Engineer</span> with hands-on experience in Python, Generative AI, Machine Learning, Deep Learning, and full-stack development.
              </p>
              <p className="text-slate-300 leading-relaxed">
                I specialize in building <span className="text-teal-400 font-medium">scalable AI systems</span> — RAG pipelines, LSTM-based sequential models, and intelligent automation tools using OpenAI API, Gemini API, and LangChain.
              </p>
              <p className="text-slate-300 leading-relaxed">
                Proficient in prompt engineering, network intrusion detection, anomaly detection, and deploying real-world AI solutions using open-source LLMs and modern AI frameworks. Strong foundation in data science, computer vision, and end-to-end ML/DL pipeline development.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {highlights.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="card text-center"
                >
                  <item.icon className="w-8 h-8 text-teal-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-slate-100">{item.value}</div>
                  <div className="text-sm text-slate-300">{item.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
