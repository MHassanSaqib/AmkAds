'use client'

import { useEffect, useRef, useState } from 'react'
import { Info, ArrowRight } from 'lucide-react'

export default function AboutSection() {
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
    <section id="about" className="relative py-24 bg-brand-black overflow-hidden">
      <div className="glow-orb w-[600px] h-[600px] bg-brand-orange/10 top-0 left-0" />
      
      <div ref={ref} className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="section-label mx-auto mb-4 inline-flex">
            <Info className="w-3.5 h-3.5" />
            About Us
          </div>
          <h2 className="section-title mb-4">
            Who We{' '}
            <span className="text-brand-orange">
              Are
            </span>
          </h2>
        </div>

        <div
          className={`glass-card p-8 md:p-12 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="prose prose-invert prose-lg max-w-none text-slate-300 space-y-6">
            <p>
              Founded in 2020, <strong>AMK ADS</strong> was born out of a vision to bridge the gap between brands and their audiences through high-impact, memorable visual experiences. What started as a forward-thinking media agency has quickly grown into a dynamic powerhouse specializing in Out-of-Home (OOH) and Digital Out-of-Home (DOOH) advertising, Event Management, and Creative Corporate Branding.
            </p>
            <p>
              At AMK ADS, we believe that great branding isn&apos;t just seen—it&apos;s experienced. Whether we are dominating urban landscapes with large-format static billboards, deploying cutting-edge digital display networks, engineering immersive corporate events, or crafting cohesive visual identities, our mission remains the same: to turn your brand&apos;s message into an unforgettable landmark.
            </p>
            <p>
              We don&apos;t just execute campaigns; we build partnerships rooted in real-time transparency, creative excellence, and flawless delivery.
            </p>
            <p className="text-brand-orange font-outfit font-bold text-xl pt-4 border-t border-white/10">
              AMK ADS — We Deliver Your Trust.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
