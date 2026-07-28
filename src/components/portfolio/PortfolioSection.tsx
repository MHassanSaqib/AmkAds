'use client'

import { useEffect, useRef, useState } from 'react'
import { Award, ArrowRight } from 'lucide-react'

const categories = ['All', 'FMCG', 'Telecom', 'Banking', 'Auto', 'Retail', 'Tech']

const brands = [
  { name: 'Unilever',     cat: 'FMCG',    emoji: '🧴' },
  { name: 'P&G',          cat: 'FMCG',    emoji: '🫧' },
  { name: 'Nestlé',       cat: 'FMCG',    emoji: '☕' },
  { name: 'Jazz',         cat: 'Telecom', emoji: '📶' },
  { name: 'Telenor',      cat: 'Telecom', emoji: '📡' },
  { name: 'Zong',         cat: 'Telecom', emoji: '📱' },
  { name: 'HBL',          cat: 'Banking', emoji: '🏦' },
  { name: 'Meezan Bank',  cat: 'Banking', emoji: '💳' },
  { name: 'UBL',          cat: 'Banking', emoji: '💰' },
  { name: 'Toyota',       cat: 'Auto',    emoji: '🚗' },
  { name: 'Suzuki',       cat: 'Auto',    emoji: '🚙' },
  { name: 'Honda',        cat: 'Auto',    emoji: '🏍️' },
  { name: 'Daraz',        cat: 'Retail',  emoji: '🛒' },
  { name: 'Imtiaz',       cat: 'Retail',  emoji: '🏪' },
  { name: 'Carrefour',    cat: 'Retail',  emoji: '🛍️' },
  { name: 'Samsung',      cat: 'Tech',    emoji: '📲' },
  { name: 'Apple PK',     cat: 'Tech',    emoji: '🍎' },
  { name: 'Haier',        cat: 'Tech',    emoji: '🖥️' },
]

// Duplicate for infinite ticker
const tickerBrands = [...brands, ...brands]

export default function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 },
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const filtered = activeFilter === 'All'
    ? brands
    : brands.filter((b) => b.cat === activeFilter)

  return (
    <section id="portfolio" className="relative py-24 bg-brand-navy overflow-hidden">
      <div className="glow-orb w-[400px] h-[400px] bg-brand-blue/10 top-1/2 right-0 -translate-y-1/2" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="section-label mx-auto mb-4 inline-flex">
            <Award className="w-3.5 h-3.5" />
            Trusted By The Best
          </div>
          <h2 className="section-title mb-4">
            Our Client{' '}
            <span className="bg-gradient-to-r from-brand-blueLight to-blue-400 bg-clip-text text-transparent">
              Portfolio
            </span>
          </h2>
          <p className="section-subtitle mx-auto text-slate-400">
            We proudly partner with Pakistan&apos;s most iconic brands across every major industry vertical.
          </p>
        </div>

        {/* Filter Tabs — horizontally scrollable on mobile */}
        <div
          className={`mb-8 sm:mb-10 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="flex gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:justify-center sm:overflow-visible scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`flex-shrink-0 px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  activeFilter === cat
                    ? 'bg-brand-blue text-white shadow-glow-blue'
                    : 'bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Brand Logo Grid */}
        <div
          className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 mb-10 sm:mb-12 transition-all duration-500 ${
            visible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {filtered.map((brand, i) => (
            <div
              key={`${brand.name}-${i}`}
              className="glass-card p-4 flex flex-col items-center justify-center gap-2 group hover:border-brand-blue/30 hover:shadow-card-hover transition-all duration-300 aspect-square"
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              <span className="text-3xl group-hover:scale-125 transition-transform duration-300">
                {brand.emoji}
              </span>
              <span className="text-slate-300 text-xs font-semibold text-center group-hover:text-white transition-colors">
                {brand.name}
              </span>
              <span className="text-brand-blue/60 text-[10px] uppercase tracking-wider">
                {brand.cat}
              </span>
            </div>
          ))}
        </div>

        {/* Infinite Ticker */}
        <div className="mb-12">
          <p className="text-center text-slate-600 text-xs uppercase tracking-widest mb-4">
            And many more premium brands
          </p>
          <div className="ticker-wrapper py-4 border-y border-white/5">
            <div className="ticker-inner gap-8">
              {tickerBrands.map((brand, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2.5 px-4 py-2 bg-white/3 rounded-full border border-white/5 hover:border-brand-blue/30 transition-all flex-shrink-0"
                >
                  <span className="text-xl">{brand.emoji}</span>
                  <span className="text-slate-300 text-sm font-medium whitespace-nowrap">
                    {brand.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-primary text-base px-8 py-4"
          >
            View Full Portfolio
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  )
}
