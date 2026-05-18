type Variant = 'geometric' | 'grid-dots' | 'orbs' | 'particles' | 'wave'

interface Props {
  variant: Variant
}

const baseOrb = 'absolute rounded-full blur-3xl pointer-events-none opacity-20'

export default function SectionBackground({ variant }: Props) {
  if (variant === 'geometric') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-[15%] left-[10%] w-3 h-3 border border-teal-400/30 rotate-45 animate-float-slow" />
        <div className="absolute top-[40%] right-[15%] w-5 h-5 border border-teal-400/20 rounded-full animate-float-slower" />
        <div className="absolute bottom-[25%] left-[20%] w-4 h-4 border border-teal-400/25 animate-float-slow" style={{ animationDelay: '1s' }} />
        <div className="absolute top-[60%] left-[40%] w-3 h-3 border border-teal-400/20 rotate-12 animate-float" />
        <div className="absolute top-[20%] right-[30%] w-6 h-6 border border-teal-400/15 rounded-full animate-float-slower" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-[40%] right-[25%] w-4 h-4 border border-teal-400/20 -rotate-12 animate-float-slow" style={{ animationDelay: '2s' }} />
      </div>
    )
  }

  if (variant === 'grid-dots') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: 'radial-gradient(circle, #64ffda 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.04] animate-dot-pulse"
          style={{
            backgroundImage: 'radial-gradient(circle, #64ffda 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            backgroundPosition: '20px 20px',
          }}
        />
      </div>
    )
  }

  if (variant === 'orbs') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className={`${baseOrb} w-[30vw] h-[30vw] bg-teal-400 top-[10%] left-[-10%] animate-float-slow`} />
        <div className={`${baseOrb} w-[25vw] h-[25vw] bg-cyan-400 bottom-[20%] right-[-5%] animate-float-slower`} style={{ animationDelay: '2s' }} />
        <div className={`${baseOrb} w-[20vw] h-[20vw] bg-teal-400 top-[50%] right-[30%] animate-float`} style={{ animationDelay: '4s' }} />
        <div className={`${baseOrb} w-[15vw] h-[15vw] bg-cyan-400 bottom-[10%] left-[20%] animate-float-slow`} style={{ animationDelay: '1s' }} />
      </div>
    )
  }

  if (variant === 'particles') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-[10%] left-[20%] w-1 h-1 bg-teal-400/30 rounded-full animate-particle-rise" />
        <div className="absolute top-[30%] right-[15%] w-1.5 h-1.5 bg-teal-400/20 rounded-full animate-particle-rise" style={{ animationDelay: '0.5s' }} />
        <div className="absolute top-[50%] left-[30%] w-1 h-1 bg-teal-400/25 rounded-full animate-particle-rise" style={{ animationDelay: '1s' }} />
        <div className="absolute top-[20%] left-[60%] w-1 h-1 bg-teal-400/20 rounded-full animate-particle-rise" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-[60%] right-[35%] w-1.5 h-1.5 bg-teal-400/25 rounded-full animate-particle-rise" style={{ animationDelay: '0.3s' }} />
        <div className="absolute top-[40%] left-[5%] w-1 h-1 bg-teal-400/20 rounded-full animate-particle-rise" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[70%] right-[20%] w-1 h-1 bg-teal-400/30 rounded-full animate-particle-rise" style={{ animationDelay: '0.8s' }} />
        <div className="absolute top-[15%] right-[40%] w-1 h-1 bg-teal-400/20 rounded-full animate-particle-rise" style={{ animationDelay: '1.2s' }} />
        <div className="absolute top-[55%] left-[45%] w-1.5 h-1.5 bg-teal-400/25 rounded-full animate-particle-rise" style={{ animationDelay: '1.8s' }} />
        <div className="absolute top-[35%] right-[10%] w-1 h-1 bg-teal-400/20 rounded-full animate-particle-rise" style={{ animationDelay: '0.6s' }} />
      </div>
    )
  }

  if (variant === 'wave') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.04]" aria-hidden="true">
        <svg className="absolute w-full h-full" viewBox="0 0 1440 400" preserveAspectRatio="none">
          <path className="animate-wave" fill="none" stroke="#64ffda" strokeWidth="2"
            d="M0,200 C360,100 720,300 1080,200 C1260,150 1350,250 1440,200 L1440,400 L0,400 Z" />
          <path className="animate-wave-slow" fill="none" stroke="#64ffda" strokeWidth="1.5"
            d="M0,250 C360,350 720,150 1080,250 C1260,300 1350,200 1440,250 L1440,400 L0,400 Z"
            style={{ animationDelay: '-2s' }} />
        </svg>
      </div>
    )
  }

  return null
}
