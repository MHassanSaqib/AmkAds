'use client'

import { useRef, useState, useEffect } from 'react'
import { Target, ShoppingCart, Palette, BarChart3, Play, Pause, Volume2, VolumeX } from 'lucide-react'
import { motion } from 'framer-motion'
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

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true
      videoRef.current.muted = isMuted
    }
  }, [])

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
    <section id="home" className="w-full bg-slate-950 pt-28 pb-20 relative">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ── Unobstructed Video Container ── */}
        <div className="relative w-full aspect-video md:aspect-[21/9] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl mb-16 bg-slate-900 border border-slate-800">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            webkit-playsinline="true"
            preload="metadata"
            className="w-full h-full object-cover absolute inset-0"
          >
            <source src="/Hero-Video/hero-showcase.mp4?v=2.0" type="video/mp4" />
          </video>

          {/* Video Controls overlaying ONLY the video */}
          <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-30 flex items-center gap-2 sm:gap-3">
            <button 
              onClick={toggleMute} 
              className="bg-slate-900/80 hover:bg-slate-800 text-white font-medium px-3 py-1.5 sm:px-4 sm:py-2 rounded-full backdrop-blur-md flex items-center gap-2 transition border border-white/10"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span className="text-xs sm:text-sm">{isMuted ? 'Sound Off' : 'Sound On'}</span>
            </button>
            <button 
              onClick={togglePlay} 
              className="bg-slate-900/80 hover:bg-slate-800 backdrop-blur-md text-white border border-white/10 p-2 sm:p-2.5 rounded-full transition flex items-center justify-center"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 pl-0.5" />}
            </button>
          </div>
        </div>

        {/* ── Content Block Below Video ── */}
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          
          {/* ── Original Starting Introduction ── */}
          <motion.div 
            variants={containerVariants} 
            initial="hidden" 
            whileInView="show" 
            viewport={{ once: true, margin: "-100px" }} 
            className="flex flex-col items-center text-center mt-4"
          >
             {/* Pre-label */}
             <motion.div variants={itemVariants} className="inline-flex items-center gap-2 bg-slate-900 border border-blue-500/30 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider text-blue-400 uppercase mb-6 shadow-xl">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                Pakistan's Premier OOH Advertising Agency
             </motion.div>
             
             {/* Headline */}
             <motion.h1 variants={itemVariants} className="font-outfit font-black text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.05] tracking-tight text-white mb-6">
                Leading{' '}
                <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent drop-shadow-sm">
                  Out of Home
                </span>
                <br />
                <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent drop-shadow-sm">
                  Media & Advertising
                </span>
                <br />
                Agency
             </motion.h1>

             {/* Subtitle */}
             <motion.p variants={itemVariants} className="text-slate-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-10 font-light drop-shadow-md">
                Nationwide presence across{' '}
                <span className="text-blue-400 font-semibold">50+ cities</span>,
                cutting-edge planning toolkits, and end-to-end campaign management —
                from strategy to execution to analytics.
             </motion.p>
             
             {/* Divider */}
             <motion.div variants={itemVariants} className="w-24 h-1 bg-gradient-to-r from-blue-500 to-orange-500 rounded-full mb-16 opacity-50"></motion.div>
          </motion.div>

          {/* ── Showcase Section ── */}
          <motion.div 
            variants={containerVariants} 
            initial="hidden" 
            whileInView="show" 
            viewport={{ once: true, margin: "-100px" }} 
            className="flex flex-col items-center text-center"
          >
             {/* Badge */}
             <motion.div variants={itemVariants} className="inline-flex items-center gap-2 bg-slate-900 border border-blue-500/30 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider text-blue-400 uppercase mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                OOH MEDIA SHOWCASE
             </motion.div>
             
             {/* Heading */}
             <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
               Elevate Your <br className="hidden sm:block" />
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">Brand Presence</span>
             </motion.h1>
             
             {/* Description */}
             <motion.p variants={itemVariants} className="text-slate-300 md:text-lg max-w-2xl leading-relaxed font-light">
               Pakistan's premier out-of-home advertising network. We transform high-traffic physical spaces into powerful, data-driven brand experiences.
             </motion.p>
          </motion.div>

          {/* Features Grid */}
          <motion.div 
            variants={containerVariants} 
            initial="hidden" 
            whileInView="show" 
            viewport={{ once: true, margin: "-50px" }} 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-4"
          >
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <motion.div 
                  variants={itemVariants} 
                  key={pillar.title} 
                  className="bg-slate-900/80 border border-slate-800 p-6 rounded-xl flex flex-col hover:border-slate-700 hover:bg-slate-800 transition-colors shadow-lg"
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-5 ${
                    pillar.color === 'blue' 
                      ? 'bg-blue-500/20 text-blue-400' 
                      : 'bg-orange-500/20 text-orange-400'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">{pillar.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{pillar.desc}</p>
                </motion.div>
              )
            })}
          </motion.div>

        </div>
      </div>
      <div className="mt-24">
        <BrandTicker />
      </div>
    </section>
  )
}
