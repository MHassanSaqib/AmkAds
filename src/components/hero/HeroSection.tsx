'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowRight, ChevronDown, Target, ShoppingCart, Palette, BarChart3, Zap } from 'lucide-react'

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
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-hero-gradient pt-20"
    >
      {/* ── Background Grid ── */}
      <div className="absolute inset-0 grid-bg opacity-40" />

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
        {/* ── Pre-label ── */}
        <div
          className={`flex justify-center mb-6 sm:mb-8 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="section-label text-xs sm:text-sm px-3 sm:px-4 text-center">
            <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-brand-blueLight flex-shrink-0" />
            Pakistan&apos;s Premier OOH Advertising Agency
          </div>
        </div>

        {/* ── Headline ── */}
        <div
          className={`text-center mb-5 sm:mb-6 transition-all duration-700 delay-150 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h1 className="font-outfit font-black text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl leading-[1.1] sm:leading-[1.05] tracking-tight text-white">
            Leading{' '}
            <span className="bg-gradient-to-r from-brand-blueLight via-blue-400 to-brand-blue bg-clip-text text-transparent">
              Out of Home
            </span>
            <br />
            <span className="bg-gradient-to-r from-brand-amber via-orange-400 to-brand-amberDark bg-clip-text text-transparent">
              Media &amp; Advertising
            </span>
            <br />
            Agency
          </h1>
        </div>

        {/* ── Subtitle ── */}
        <div
          className={`text-center mb-8 sm:mb-10 transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-slate-400 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed px-2">
            Nationwide presence across{' '}
            <span className="text-brand-blueLight font-semibold">50+ cities</span>,
            cutting-edge planning toolkits, and end-to-end campaign management —
            from strategy to execution to analytics.
          </p>
        </div>

        {/* ── CTA Buttons ── */}
        <div
          className={`flex flex-col xs:flex-row sm:flex-row gap-3 sm:gap-4 justify-center mb-10 sm:mb-16 lg:mb-20 transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <button
            onClick={() => document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-primary text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 shadow-glow-blue w-full sm:w-auto justify-center"
          >
            Explore Services
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-secondary text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 shadow-glow-amber w-full sm:w-auto justify-center"
          >
            Hire Us Now
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
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
