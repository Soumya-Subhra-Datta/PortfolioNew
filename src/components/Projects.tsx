import { motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'

const projects = [
  {
    title: 'JARVIS — AI-Powered Personal Assistant',
    description: 'Full-stack AI assistant with voice, memory, task management, and PWA support. Built with React + Vite frontend and Node.js/Express + MySQL backend. Features AI chat via Cerebras API, real-time voice recognition, emotional state orb, personal memory system, file & CSV analysis with auto-generated charts, web search, and local PC automation. Multi-user with JWT auth, dark futuristic UI, responsive (320px–1440px+), and deployed as a PWA with offline support.',
    tags: ['React', 'Vite', 'Node.js', 'MySQL', 'Cerebras AI', 'PWA', 'Voice AI', 'JWT'],
    github: 'https://github.com/Soumya-Subhra-Datta/JARVIS',
    link: 'https://jarvis-seven-lake.vercel.app/login',
    highlights: ['AI Chat + Voice', 'Memory System', 'File/CSV Analysis', 'PWA Offline'],
  },
  {
    title: 'AI-Powered Proactive Threat Detection System',
    description: 'Real-time cybersecurity web app using Flask and MySQL that monitors, classifies, and auto-mitigates threats via an Identify-Grade-Mitigate pipeline trained on CICIDS 2017 (2.8M+ records). Achieves 93%+ accuracy with 4-class threat grading and automated IP blocking.',
    tags: ['LSTM', 'Flask', 'MySQL', 'Real-Time', 'WAF/Nginx'],
    github: 'https://github.com/Soumya-Subhra-Datta/AI-Threat-Prediction-System',
    highlights: ['93%+ Accuracy', '4-Class Grading', '25% Fewer False Positives'],
  },
  {
    title: 'Apollo Metrics — AI-Powered Data Analyst Platform',
    description: 'Cloud-deployed data analysis platform with Python backend and MySQL database. Users upload CSV datasets to trigger automated EDA, ML model training, interactive visualization, and report generation with an LLM-powered chatbot for natural language queries.',
    tags: ['Python', 'MySQL', 'LLM', 'Render', 'EDA'],
    link: 'https://apollo-metrics.onrender.com',
    github: 'https://github.com/Soumya-Subhra-Datta',
    highlights: ['Automated EDA', 'ML Training', 'Chatbot Integration'],
  },
  {
    title: 'AI Drug Discovery Assistant',
    description: 'Full-stack web app predicting molecular binding affinity, drug-likeness, toxicity risk, and solubility from SMILES inputs. Integrated Cerebras cloud AI for natural-language pharmacological explanations with intelligent API fallback mode.',
    tags: ['Flask', 'MySQL', 'Cerebras AI', 'Cheminformatics', 'SQLAlchemy'],
    github: 'https://github.com/Soumya-Subhra-Datta/AI-Based-Drug-Discovery_System',
    highlights: ['Binding Prediction', 'Toxicity Analysis', 'AI Fallback Mode'],
  },
  {
    title: 'AI-Powered Faculty Workload Management Portal',
    description: 'Automated duty assignment and substitution scheduling for 100+ faculty members. Supports manual entry and bulk CSV upload of 500+ records per operation. Built with React.js frontend, Node.js backend, and MySQL with Cerberus API validation.',
    tags: ['React.js', 'Node.js', 'MySQL', 'Cerberus API', 'CSV'],
    github: 'https://github.com/Soumya-Subhra-Datta/Smart_Faculty_Workload_management_Portal',
    highlights: ['70% Less Scheduling Effort', '80% Fewer Invalid Entries', '500+ Records/Batch'],
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
}

const projectVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

export default function Projects() {
  return (
    <section id="projects" className="py-20 md:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-heading">Featured Projects</h2>

          <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            {projects.map((project) => (
              <motion.div
                key={project.title}
                variants={projectVariants}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="card"
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-slate-100 mb-2">{project.title}</h3>
                    <p className="text-slate-300 text-sm leading-relaxed mb-4">{project.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-teal-400/10 text-teal-400 text-xs font-mono rounded">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-primary text-xs py-2 px-4">
                        <Github size={14} /> Source
                      </a>
                      {project.link && (
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn-primary text-xs py-2 px-4">
                          <ExternalLink size={14} /> Live Demo
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="lg:w-48 flex flex-row lg:flex-col gap-2">
                    {project.highlights.map((h) => (
                      <div key={h} className="flex-1 bg-navy-700/50 rounded px-3 py-2 text-center">
                        <span className="text-xs text-teal-400 font-mono">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
