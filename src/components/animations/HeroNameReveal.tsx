import { motion } from 'framer-motion'

interface Props {
  text: string
  className?: string
}

export default function HeroNameReveal({ text, className = '' }: Props) {
  const letters = text.split('')

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.05, delayChildren: 0.4 } },
      }}
    >
      {letters.map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          variants={{
            hidden: { opacity: 0, y: 40, rotateX: 90 },
            visible: { opacity: 1, y: 0, rotateX: 0 },
          }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.div>
  )
}
