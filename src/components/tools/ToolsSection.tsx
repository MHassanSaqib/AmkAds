'use client'

import { useEffect, useRef, useState } from 'react'
import { Database, Smartphone, PieChart, Radio, ArrowRight, Sparkles } from 'lucide-react'

const tools = [
  {
    icon: Database,
    title: 'Online Asset Bank',
    badge: 'Live Inventory',
    desc: 'Browse and book from our digital billboard catalog in real time. Filter by city, format, audience demographics, and availability — all in one unified dashboard.',
    features: ['Real-time availability', 'Location mapping', 'Format filters', 'Rate cards'],
    color: 'blue',
  },
  {
    icon: Smartphone,
    title: 'Campaign Tracking App',
    badge: 'Proof of Execution',
    desc: 'Monitor your active campaigns with geo-tagged photo proof, installation confirmations, and live status updates directly from field teams.',
    features: ['Geo-tagged photos', 'Live field updates', 'Installation reports', 'Client portal'],
    color: 'amber',
  },
  {
    icon: PieChart,
    title: 'Analytical & Financial Reporting',
    badge: 'Smart Insights',
    desc: 'Comprehensive post-campaign reporting with spend analysis, impression data, ROI breakdowns, and downloadable presentation-ready reports.',
    features: ['ROI dashboards', 'Spend analytics', 'Visual reports', 'PDF exports'],
    color: 'blue',
  },
  {
    icon: Radio,
    title: 'M.O.V.E Measurement Tool',
    badge: 'Audience Intelligence',
    desc: 'Pakistan\'s advanced OOH audience measurement engine. Get impression counts, traffic footfall data, and demographic exposure metrics for every asset.',
    features: ['Impression metrics', 'Footfall analysis', 'Demographic data', 'Benchmarking'],
    color: 'amber',
  },
]

export default function ToolsSection() {
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

  return (
    <section id="tools" className="relative py-24 bg-brand-navy overflow-hidden">
      <div className="glow-orb w-[600px] h-[600px] bg-brand-blue/8 top-0 right-0" />
      <div className="glow-orb w-[400px] h-[400px] bg-brand-amber/5 bottom-0 left-0" />
      <div className="absolute inset-0 grid-bg opacity-20" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="section-label mx-auto mb-4 inline-flex">
            <Sparkles className="w-3.5 h-3.5" />
            Proprietary Technology
          </div>
          <h2 className="section-title mb-4">
            Next-Gen OOH Tech &{' '}
            <span className="bg-gradient-to-r from-brand-blueLight to-blue-400 bg-clip-text text-transparent">
              Tracking Solutions
            </span>
          </h2>
          <p className="section-subtitle mx-auto text-slate-400">
            We invest in proprietary tools so your campaigns run smarter, faster, and with
            complete transparency from booking to billing.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tools.map((tool, i) => {
            const Icon = tool.icon
            return (
              <div
                key={tool.title}
                className={`glass-card p-8 group hover:border-brand-blue/30 hover:shadow-card-hover transition-all duration-500 ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                {/* Badge + Icon */}
                <div className="flex items-start justify-between mb-5">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${
                      tool.color === 'blue'
                        ? 'bg-brand-blue/15 text-brand-blueLight'
                        : 'bg-brand-amber/15 text-brand-amber'
                    }`}
                  >
                    <Icon className="w-7 h-7" />
                  </div>
                  <span
                    className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${
                      tool.color === 'blue'
                        ? 'bg-brand-blue/15 text-brand-blueLight'
                        : 'bg-brand-amber/15 text-brand-amber'
                    }`}
                  >
                    {tool.badge}
                  </span>
                </div>

                {/* Content */}
                <h3 className="font-outfit font-bold text-white text-xl mb-3 group-hover:text-brand-blueLight transition-colors duration-200">
                  {tool.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-5">{tool.desc}</p>

                {/* Features */}
                <ul className="grid grid-cols-2 gap-2 mb-5">
                  {tool.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-slate-400 text-xs">
                      <span
                        className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                          tool.color === 'blue' ? 'bg-brand-blueLight' : 'bg-brand-amber'
                        }`}
                      />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* Link */}
                <button
                  className={`flex items-center gap-1.5 text-sm font-semibold transition-all duration-200 group/btn ${
                    tool.color === 'blue' ? 'text-brand-blueLight' : 'text-brand-amber'
                  }`}
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
