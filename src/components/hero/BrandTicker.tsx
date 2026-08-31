'use client'

import { MapPin, MonitorPlay, Users } from 'lucide-react'

const tickerItems = [
  { icon: MonitorPlay, text: '500+ Digital Billboards' },
  { icon: Users, text: '10M+ Daily Impressions' },
  { icon: MapPin, text: 'Prime Highway Locations' },
  { icon: MonitorPlay, text: 'Data-Driven Placements' },
  { icon: Users, text: 'Nationwide Network' },
]

export default function BrandTicker() {
  const items = [...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems]

  return (
    <div className="w-full bg-black/40 backdrop-blur-xl border-y border-white/5 py-4 overflow-hidden relative z-30">
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-brand-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-brand-black to-transparent z-10 pointer-events-none" />

      <div className="ticker-wrapper w-full">
        <div className="ticker-inner gap-16 px-8 items-center cursor-pointer">
          {items.map((item, i) => {
            const Icon = item.icon
            return (
              <div key={i} className="flex items-center gap-3">
                <Icon className="w-4 h-4 text-brand-orange" />
                <span className="text-white/80 font-medium tracking-widest uppercase text-xs">
                  {item.text}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
