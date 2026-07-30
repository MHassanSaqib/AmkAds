'use client'

import { useEffect, useRef, useState } from 'react'
import { Award, ArrowRight } from 'lucide-react'
import Image from 'next/image'

const categories = ['All', 'FMCG', 'Retail', 'Education', 'Real Estate', 'Corporate']

const brands = [
  { name: "Interwood", category: "RETAIL", logo: "/logos/interwood.png" },
  { name: "Surge Group", category: "CORPORATE", logo: "/logos/surge-group.png" },
  { name: "Oxford Press", category: "EDUCATION", logo: "/logos/oxford-press.png" },
  { name: "WPS", category: "EDUCATION", logo: "/logos/wps.png" },
  { name: "Pakistan HVACR", category: "CORPORATE", logo: "/logos/hvacr.png" },
  { name: "Samsons", category: "CORPORATE", logo: "/logos/samsons.png" },
  { name: "Diner's", category: "RETAIL", logo: "/logos/diners.png" },
  { name: "Fruitien", category: "FMCG", logo: "/logos/fruitien.png" },
  { name: "Sufi Group", category: "FMCG", logo: "/logos/sufi.png" },
  { name: "KIPS Education", category: "EDUCATION", logo: "/logos/kips.png" },
  { name: "UCL", category: "EDUCATION", logo: "/logos/ucl.png" },
  { name: "Nuréh", category: "RETAIL", logo: "/logos/nureh.png" },
  { name: "Vanya", category: "RETAIL", logo: "/logos/vanya.png" },
  { name: "ONE", category: "RETAIL", logo: "/logos/one.png" },
  { name: "SKANS", category: "EDUCATION", logo: "/logos/skans.png" },
  { name: "Study Icon", category: "EDUCATION", logo: "/logos/study-icon.png" },
  { name: "AHZ UK", category: "EDUCATION", logo: "/logos/ahz.png" },
  { name: "Union Developers", category: "CORPORATE", logo: "/logos/union-developers.png" },
  { name: "JKS Cash & Carry", category: "RETAIL", logo: "/logos/jks.png" },
  { name: "GOFY", category: "FMCG", logo: "/logos/gofy.png" }
];

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
    : brands.filter((b) => b.category === activeFilter.toUpperCase())

  return (
    <section id="portfolio" className="relative py-24 bg-brand-navy overflow-hidden">
      <div className="glow-orb w-[400px] h-[400px] bg-brand-blue/10 top-1/2 right-0 -translate-y-1/2" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="relative text-center mb-12">
          <div className="absolute top-0 right-0 hidden md:block">
            <Image src="/logo.png" alt="AMK ADS" width={150} height={64} className="h-16 w-auto object-contain bg-white rounded-xl p-2 shadow-lg" />
          </div>
          
          <div className="section-label mx-auto mb-4 inline-flex">
            <Award className="w-3.5 h-3.5" />
            Our Portfolio
          </div>
          <h2 className="section-title mb-4">
            Trusted by{' '}
            <span className="bg-gradient-to-r from-brand-amber to-orange-400 bg-clip-text text-transparent">
              Leading Brands
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
          className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 mb-10 sm:mb-12 transition-all duration-500 ${
            visible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {filtered.map((brand, i) => (
            <div
              key={`${brand.name}-${i}`}
              className="glass-card p-4 flex flex-col items-center justify-center gap-3 group hover:border-brand-blue/30 hover:shadow-card-hover transition-all duration-300 aspect-square"
              style={{ transitionDelay: `${i * 30}ms` }}
            >
              <div className="h-16 w-full flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform duration-300 mb-2 bg-white rounded-md p-3 shadow-sm aspect-video">
                <Image 
                  src={brand.logo} 
                  alt={brand.name}
                  width={150}
                  height={80}
                  style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', display: 'block' }}
                  className="w-auto h-auto"
                />
              </div>
              <span className="text-slate-300 text-sm font-semibold text-center group-hover:text-white transition-colors">
                {brand.name}
              </span>
              <span className="text-brand-blue/60 text-[10px] uppercase tracking-wider">
                {brand.category}
              </span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
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
