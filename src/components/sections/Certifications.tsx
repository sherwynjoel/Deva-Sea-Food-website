import { motion, useMotionValue, useAnimationFrame } from 'framer-motion'
import { ShieldCheck } from 'lucide-react'
import { useState, useEffect } from 'react'
import { siteContent } from '../../content/siteContent'
import { Reveal } from '../motion/Reveal'
import { Section } from '../ui/Section'

export function Certifications() {
  const [isPaused, setIsPaused] = useState(false)
  const rotation = useMotionValue(0)
  const [radius, setRadius] = useState(340)

  useEffect(() => {
    const updateRadius = () => {
      setRadius(window.innerWidth < 640 ? 160 : 340)
    }

    updateRadius()
    window.addEventListener('resize', updateRadius)
    return () => window.removeEventListener('resize', updateRadius)
  }, [])

  // Smooth continuous rotation loop
  useAnimationFrame((_, delta) => {
    if (!isPaused) {
      // Rotate 360 degrees every 20 seconds (0.018 degrees per ms)
      const move = delta * 0.018
      rotation.set(rotation.get() + move)
    }
  })

  const logos = siteContent.certifications.logos

  return (
    <Section id="certifications" className="overflow-hidden">
      <div className="flex flex-col gap-12 min-h-[400px]">
        {/* Header Content */}
        <div className="max-w-2xl mx-auto text-center z-20 px-4">
          <Reveal>
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-ocean-900/5 ring-2 ring-ocean-900/10 mb-6 backdrop-blur-sm">
              <ShieldCheck className="h-7 w-7 text-ocean-600" />
            </div>
            <h2 className="heading-font text-3xl font-semibold tracking-tight sm:text-4xl text-ocean-950">
              {siteContent.certifications.title}
            </h2>
            <p className="mt-4 text-base text-ocean-950/70 leading-relaxed max-w-xl mx-auto">
              {siteContent.certifications.description}
            </p>
          </Reveal>
        </div>

        {/* 3D Circular Carousel */}
        <div
          className="flex-1 relative h-[500px] w-full flex items-center justify-center"
          style={{ perspective: '1200px' }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Background Glow */}
          <div className="absolute inset-0 bg-ocean-500/10 blur-[100px] rounded-full mix-blend-screen pointer-events-none" />

          {/* Carousel Ring */}
          <motion.div
            className="relative w-[300px] h-[300px]"
            style={{
              rotateY: rotation,
              transformStyle: 'preserve-3d'
            }}
          >

            {logos.map((cert, index) => {
              const angle = index * (360 / logos.length)
              return (
                <div
                  key={cert.name}
                  className="absolute left-1/2 top-1/2 -ml-16 -mt-20"
                  style={{
                    transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <div className="w-32 h-40 bg-white/20 backdrop-blur-md border border-ocean-950/10 rounded-xl p-4 flex flex-col items-center justify-center hover:bg-white/30 transition-colors duration-300 shadow-[0_0_30px_rgba(0,0,0,0.1)]">
                    <div className="w-16 h-16 mb-3 rounded-xl bg-white/90 p-2 flex items-center justify-center shadow-inner">
                      <img src={cert.src} alt={cert.alt} className="w-full h-full object-contain" loading="lazy" />
                    </div>
                    <span className="text-xs font-bold text-ocean-950 text-center leading-tight">
                      {cert.name}
                    </span>
                  </div>
                </div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </Section>
  )
}
