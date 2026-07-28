'use client'

import { useEffect, useRef, useState } from 'react'
import { Globe, Brush, Calendar, Briefcase, ArrowRight, Layers } from 'lucide-react'

const ecosystem = [
  {
    icon: Globe,
    title: 'Digital Marketing',
    tagline: 'AmkAds Digital',
    desc: 'Full-service digital advertising: social media management, Google Ads, influencer marketing, and performance campaigns integrated with your OOH strategy.',
    services: ['Social Media Ads', 'Google/Meta Campaigns', 'SEO & Content', 'Influencer Outreach'],
    color: 'blue',
    gradient: 'from-blue-500/20 to-blue-900/10',
  },
  {
    icon: Brush,
    title: 'Creative Agency',
    tagline: 'AmkAds Creative',
    desc: 'In-house creative studio delivering world-class design, copywriting, 3D visualizations, and large-format print production for every OOH format.',
    services: ['Graphic Design', '3D Anamorphic Art', 'Copywriting', 'Print Production'],
    color: 'amber',
    gradient: 'from-orange-500/20 to-orange-900/10',
  },
  {
    icon: Calendar,
    title: 'Event Management',
    tagline: 'AmkAds Events',
    desc: 'On-ground activations, brand launches, pop-up experiences, and experiential marketing that bring your OOH campaigns to life face-to-face.',
    services: ['Brand Activations', 'Product Launches', 'Pop-up Experiences', 'Experiential Marketing'],
    color: 'blue',
    gradient: 'from-blue-500/20 to-blue-900/10',
  },
  {
    icon: Briefcase,
    title: 'Corporate Services',
    tagline: 'AmkAds Corp',
    desc: 'End-to-end corporate branding, office signage, wayfinding systems, and B2B media planning for enterprises scaling their brand presence.',
    services: ['Corporate Branding', 'Office Signage', 'Wayfinding Systems', 'B2B Media Planning'],
    color: 'amber',
    gradient: 'from-orange-500/20 to-orange-900/10',
  },
]

export default function GroupSection() {
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
    <section id="group" className="relative py-24 bg-brand-navyLight overflow-hidden">
      <div className="glow-orb w-[500px] h-[500px] bg-brand-blue/8 bottom-0 right-0" />
      <div className="glow-orb w-[300px] h-[300px] bg-brand-amber/6 top-0 left-0" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="section-label mx-auto mb-4 inline-flex">
            <Layers className="w-3.5 h-3.5" />
            The AmkAds Ecosystem
          </div>
          <h2 className="section-title mb-4">
            One Group.{' '}
            <span className="bg-gradient-to-r from-brand-amber to-orange-400 bg-clip-text text-transparent">
              Every Solution.
            </span>
          </h2>
          <p className="section-subtitle mx-auto text-slate-400">
            AmkAds is more than OOH — we are a full-service communications group
            with specialist arms across digital, creative, events, and corporate branding.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ecosystem.map((item, i) => {
            const Icon = item.icon
            return (
              <div
                key={item.title}
                className={`relative glass-card p-8 group overflow-hidden hover:border-brand-blue/30 hover:shadow-card-hover transition-all duration-500 ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                {/* Gradient Accent */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                <div className="relative z-10">
                  {/* Header Row */}
                  <div className="flex items-start gap-4 mb-5">
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 ${
                        item.color === 'blue'
                          ? 'bg-brand-blue/20 text-brand-blueLight'
                          : 'bg-brand-amber/20 text-brand-amber'
                      }`}
                    >
                      <Icon className="w-7 h-7" />
                    </div>
                    <div>
                      <p className={`text-xs font-bold uppercase tracking-widest mb-0.5 ${
                        item.color === 'blue' ? 'text-brand-blueLight' : 'text-brand-amber'
                      }`}>
                        {item.tagline}
                      </p>
                      <h3 className="font-outfit font-bold text-white text-xl group-hover:text-white transition-colors duration-200">
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-slate-400 text-sm leading-relaxed mb-5">{item.desc}</p>

                  {/* Services chips */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {item.services.map((s) => (
                      <span
                        key={s}
                        className={`text-xs px-3 py-1 rounded-full border ${
                          item.color === 'blue'
                            ? 'bg-brand-blue/10 border-brand-blue/20 text-brand-blueLight'
                            : 'bg-brand-amber/10 border-brand-amber/20 text-brand-amber'
                        }`}
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                    className={`flex items-center gap-1.5 text-sm font-semibold transition-all duration-200 group/btn ${
                      item.color === 'blue' ? 'text-brand-blueLight' : 'text-brand-amber'
                    }`}
                  >
                    Explore Service
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
