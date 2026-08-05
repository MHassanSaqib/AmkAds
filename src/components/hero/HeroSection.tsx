'use client'

import { useRef, useState, useEffect } from 'react'
import { ChevronDown, Target, ShoppingCart, Palette, BarChart3, Play, Pause, Volume2, VolumeX } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'
import BrandTicker from './BrandTicker'

const pillars = [
  {
    icon: Target,
    title: 'Strategy & Planning',
    desc: 'Data-driven OOH strategies with audience-first targeting and campaign mapping.',
    color: 'blue',
  },
  {
    icon: ShoppingCart,
    title: 'Media Buying & Placement',
    desc: 'Access to Pakistan\'s largest OOH inventory — billboards, transit, malls & airports.',
    color: 'amber',
  },
  {
    icon: Palette,
    title: 'Creative Applications',
    desc: 'Impactful large-format creative production and 3D anamorphic executions.',
    color: 'blue',
  },
  {
    icon: BarChart3,
    title: 'Analytical Reporting',
    desc: 'Real-time campaign dashboards, impression metrics, and M.O.V.E audience data.',
    color: 'amber',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 70, damping: 20 } },
}

export default function HeroSection() {
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  })

  // Parallax shift for the video
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true
      videoRef.current.muted = isMuted
    }
  }, [])

  const handleScroll = () => {
    const el = document.querySelector('#services')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <section
      id="home"
      ref={sectionRef}
      className="w-full min-h-screen relative overflow-hidden bg-brand-navy flex flex-col"
    >
      {/* ── Full Bleed Background Video with Parallax ── */}
      <motion.div style={{ y: videoY }} className="absolute inset-0 z-0 w-full h-[120%] -top-[10%] bg-slate-950">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="object-cover w-full h-full absolute inset-0 z-0"
        >
          <source src="/Hero-Video/hero-showcase.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* ── Scrim Overlay Removed for Max Clarity ── */}

      {/* ── Animated particles ── */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-brand-blueLight/60 animate-float z-10 pointer-events-none"
          style={{
            left:              `${15 + i * 14}%`,
            top:               `${20 + (i % 3) * 25}%`,
            animationDelay:    `${i * 0.8}s`,
            animationDuration: `${4 + i}s`,
          }}
        />
      ))}

      {/* ── Main Content Container ── */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-center pt-32 pb-20 w-full">
        
        {/* ── Hero Text & Badges (Staggered Entrance) ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="max-w-xl backdrop-blur-md bg-black/40 p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl mt-4 sm:mt-12"
        >
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center gap-2 backdrop-blur-md bg-white/10 border border-white/20 px-4 py-2 rounded-full text-[11px] sm:text-xs font-semibold tracking-wider text-white uppercase mb-6 shadow-xl">
              <span className="w-2 h-2 rounded-full bg-brand-blueLight animate-pulse" />
              OOH MEDIA SHOWCASE
            </div>
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-bold drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] leading-[1.1] mb-5 font-outfit">
            Elevate Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-brand-blueLight to-brand-blue">
              Brand Presence
            </span>
          </motion.h1>
          
          <motion.p variants={itemVariants} className="text-lg sm:text-xl text-white/95 max-w-2xl mb-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] font-light">
            Pakistan's premier out-of-home advertising network. We transform high-traffic physical spaces into powerful, data-driven brand experiences.
          </motion.p>
        </motion.div>

        {/* ── Pillar Cards ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mt-auto pb-10"
        >
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon
            return (
              <motion.div
                variants={itemVariants}
                key={pillar.title}
                className="backdrop-blur-md bg-black/40 border border-white/10 p-6 rounded-2xl group hover:border-brand-blue/50 hover:bg-black/60 transition-all duration-300 cursor-default shadow-xl"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 ${
                    pillar.color === 'blue'
                      ? 'bg-brand-blue/20 text-brand-blueLight'
                      : 'bg-brand-amber/20 text-brand-amber'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-outfit font-bold text-white text-base mb-2 group-hover:text-brand-blueLight transition-colors duration-200 drop-shadow">
                  {pillar.title}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed drop-shadow-sm">{pillar.desc}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      <BrandTicker />

      {/* ── Video Controls ── */}
      <div className="absolute bottom-32 right-4 sm:right-8 lg:right-12 z-30 flex flex-col items-end gap-3">
        {/* Sound Toggle */}
        <button
          onClick={toggleMute}
          className="bg-amber-500/90 text-white font-medium px-4 py-2.5 rounded-full backdrop-blur-md flex items-center gap-2 shadow-lg hover:scale-105 transition-all"
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          <span className="text-sm">{isMuted ? 'Sound Off' : 'Sound On'}</span>
        </button>

        {/* Play/Pause */}
        <button
          onClick={togglePlay}
          className="bg-white/10 backdrop-blur-md text-white border border-white/20 p-3 rounded-full hover:bg-white/20 transition shadow-lg flex items-center justify-center group"
          aria-label={isPlaying ? "Pause video" : "Play video"}
        >
          {isPlaying ? <Pause className="w-5 h-5 fill-current opacity-80 group-hover:opacity-100" /> : <Play className="w-5 h-5 fill-current opacity-80 group-hover:opacity-100 pl-0.5" />}
        </button>
      </div>

      {/* ── Scroll Indicator ── */}
      <button
        onClick={handleScroll}
        className="absolute bottom-28 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/70 hover:text-white transition-colors duration-200 animate-bounce z-30"
        aria-label="Scroll down"
      >
        <span className="text-[10px] font-semibold tracking-[0.2em] uppercase">Scroll</span>
        <ChevronDown className="w-5 h-5 opacity-80" />
      </button>

      {/* ── Bottom Curve / Wave Section Transition ── */}
      <div className="absolute bottom-0 left-0 right-0 z-40 pointer-events-none text-brand-navyLight overflow-hidden leading-none flex">
        <svg
          className="w-full h-auto max-h-[80px] min-h-[40px]"
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path d="M0,120 L1440,120 L1440,40 C1120,120 720,0 0,60 L0,120 Z" fill="currentColor" />
        </svg>
      </div>
    </section>
  )
}
