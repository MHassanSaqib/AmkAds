'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronDown, Target, ShoppingCart, Palette, BarChart3 } from 'lucide-react'

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

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const handleScroll = () => {
    const el = document.querySelector('#services')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-brand-navy pt-20"
    >

      {/* ── Glow Orbs ── */}
      <div className="glow-orb w-[600px] h-[600px] bg-brand-blue/20 -top-32 -left-32" />
      <div className="glow-orb w-[400px] h-[400px] bg-brand-amber/10 bottom-0 right-0" />

      {/* ── Animated particles ── */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-brand-blue/60 animate-float"
          style={{
            left:              `${15 + i * 14}%`,
            top:               `${20 + (i % 3) * 25}%`,
            animationDelay:    `${i * 0.8}s`,
            animationDuration: `${4 + i}s`,
          }}
        />
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20">
        {/* ── Hero Video ── */}
        <div
          className={`relative max-w-6xl mx-auto w-full mb-10 sm:mb-16 lg:mb-20 transition-all duration-1000 delay-150 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Ambient Glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/20 to-blue-600/20 rounded-[24px] sm:rounded-[36px] blur-2xl opacity-40 -z-10" />

          {/* Video Container */}
          <div className="relative w-full aspect-video md:aspect-[21/9] rounded-[20px] sm:rounded-3xl border border-white/15 shadow-2xl overflow-hidden bg-[#0A1128]">
            {/* Subtle loading skeleton state placeholder */}
            <div className="absolute inset-0 bg-slate-800/50 animate-pulse -z-10" />
            
            {/* Top-Left Brand Badge (Overlaying cropped watermark) */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20 backdrop-blur-md bg-black/40 border border-white/15 px-3.5 py-1.5 rounded-full text-[11px] font-semibold tracking-wider text-white/90 uppercase">
              ● OOH MEDIA SHOWCASE
            </div>

            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="relative z-0 w-full h-full object-cover"
            >
              <source src="/hero-video.mp4" type="video/mp4" />
            </video>
            
            {/* Top Gradient Overlay */}
            <div className="absolute inset-x-0 top-0 h-[20%] bg-gradient-to-b from-[rgba(10,17,40,0.7)] to-transparent pointer-events-none z-10" />
            
            {/* Bottom Gradient Overlay */}
            <div className="absolute inset-x-0 bottom-0 h-[15%] bg-gradient-to-t from-[#0A1128] to-transparent pointer-events-none z-10" />
          </div>
        </div>

        {/* ── Pillar Cards ── */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 transition-all duration-700 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon
            return (
              <div
                key={pillar.title}
                className="glass-card p-6 group hover:border-brand-blue/30 hover:shadow-card-hover transition-all duration-300 cursor-default"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 ${
                    pillar.color === 'blue'
                      ? 'bg-brand-blue/15 text-brand-blueLight'
                      : 'bg-brand-amber/15 text-brand-amber'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-outfit font-bold text-white text-base mb-2 group-hover:text-brand-blueLight transition-colors duration-200">
                  {pillar.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">{pillar.desc}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Scroll Indicator ── */}
      <button
        onClick={handleScroll}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-600 hover:text-brand-blue transition-colors duration-200 animate-bounce"
        aria-label="Scroll down"
      >
        <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
        <ChevronDown className="w-5 h-5" />
      </button>
    </section>
  )
}
