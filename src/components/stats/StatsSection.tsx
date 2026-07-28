'use client'

import { useEffect, useRef, useState } from 'react'
import { MapPin, TrendingUp, Users, Monitor } from 'lucide-react'

const stats = [
  { icon: MapPin,     label: 'Cities Covered',      end: 50,   suffix: '+',  color: 'blue'  },
  { icon: Monitor,    label: 'Active Billboards',    end: 2400, suffix: '+',  color: 'amber' },
  { icon: TrendingUp, label: 'Successful Campaigns', end: 850,  suffix: '+',  color: 'blue'  },
  { icon: Users,      label: 'Active Clients',       end: 320,  suffix: '+',  color: 'amber' },
]

const cities = [
  'Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Faisalabad',
  'Multan', 'Peshawar', 'Quetta', 'Hyderabad', 'Sialkot',
  'Gujranwala', 'Sukkur', 'Bahawalpur', 'Sargodha', 'Abbottabad',
  'Larkana', 'Sheikhupura', 'Rahim Yar Khan', 'Jhang', 'Gujrat',
  'Mardan', 'Kasur', 'Dera Ghazi Khan', 'Nawabshah', 'Mingora',
]

function useCountUp(end: number, duration = 2000, shouldStart: boolean) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!shouldStart) return
    let start = 0
    const step = Math.ceil(end / (duration / 16))
    const timer = setInterval(() => {
      start += step
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(start)
      }
    }, 16)
    return () => clearInterval(timer)
  }, [end, duration, shouldStart])

  return count
}

function StatCard({
  icon: Icon, label, end, suffix, color, shouldStart,
}: (typeof stats)[0] & { shouldStart: boolean }) {
  const count = useCountUp(end, 2000, shouldStart)
  return (
    <div className="glass-card p-8 text-center group hover:border-brand-blue/30 hover:shadow-card-hover transition-all duration-300">
      <div
        className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 ${
          color === 'blue' ? 'bg-brand-blue/15 text-brand-blueLight' : 'bg-brand-amber/15 text-brand-amber'
        }`}
      >
        <Icon className="w-7 h-7" />
      </div>
      <div
        className={`font-outfit font-black text-5xl md:text-6xl mb-2 counter-number ${
          color === 'blue' ? 'text-brand-blueLight' : 'text-brand-amber'
        }`}
      >
        {count.toLocaleString()}{suffix}
      </div>
      <p className="text-slate-400 font-medium text-sm uppercase tracking-widest">{label}</p>
    </div>
  )
}

export default function StatsSection() {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.2 },
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="reach" className="relative py-24 bg-brand-navyLight overflow-hidden">
      {/* bg accent */}
      <div className="glow-orb w-[500px] h-[500px] bg-brand-blue/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="section-label mx-auto mb-4 inline-flex">
            <TrendingUp className="w-3.5 h-3.5" />
            Nationwide Reach
          </div>
          <h2 className="section-title mb-4">
            Covering Every Corner of{' '}
            <span className="bg-gradient-to-r from-brand-blueLight to-blue-400 bg-clip-text text-transparent">
              Pakistan
            </span>
          </h2>
          <p className="section-subtitle mx-auto text-slate-400">
            From metropolitan hubs to emerging markets — our OOH network reaches
            audiences where it matters most.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((s) => (
            <StatCard key={s.label} {...s} shouldStart={visible} />
          ))}
        </div>

        {/* City Grid */}
        <div className="glass-card p-8">
          <h3 className="font-outfit font-bold text-white text-xl mb-6 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-brand-blue" />
            Markets We Operate In
          </h3>
          <div className="flex flex-wrap gap-2.5">
            {cities.map((city) => (
              <span
                key={city}
                className="px-4 py-1.5 bg-brand-blue/10 border border-brand-blue/20 rounded-full text-brand-blueLight text-sm font-medium hover:bg-brand-blue/20 hover:border-brand-blue/40 transition-all duration-200 cursor-default"
              >
                <span className="w-1.5 h-1.5 bg-brand-blueLight rounded-full inline-block mr-2 animate-pulse" />
                {city}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
