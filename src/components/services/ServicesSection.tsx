'use client'

import { Layers, Bus, Monitor, Plane, ShoppingBag, ArrowRight, CheckCircle2 } from 'lucide-react'
import { motion } from 'framer-motion'

const services = [
  {
    icon: Layers,
    title: 'Billboard Advertising',
    desc: 'Dominate high-traffic arterials with large-format unipoles, gantries, and rooftop installations across Pakistan\'s biggest cities.',
    highlights: ['Unipoles & Gantries', 'Rooftop displays', 'Wall-scapes', 'Street-level boards'],
    image: '🏙️',
    color: 'blue',
  },
  {
    icon: Bus,
    title: 'Transit & Transport Media',
    desc: 'Put your brand in motion with bus wraps, taxi branding, metro station ads, and transit shelter panels reaching commuters daily.',
    highlights: ['Bus & taxi wraps', 'Metro station panels', 'Transit shelters', 'Rickshaw branding'],
    image: '🚌',
    color: 'amber',
  },
  {
    icon: Monitor,
    title: 'Digital OOH (DOOH)',
    desc: 'High-resolution LED digital screens and programmatic DOOH placements delivering dynamic, targeted messaging in prime locations.',
    highlights: ['LED mega screens', 'Programmatic DOOH', 'Dynamic content', 'Live data feeds'],
    image: '📺',
    color: 'blue',
  },
  {
    icon: Plane,
    title: 'Airport Media',
    desc: 'Capture high-value, frequent-flyer audiences inside Pakistan\'s international and domestic airports with premium placements.',
    highlights: ['Departure lounges', 'Arrival halls', 'Baggage claim', 'Check-in counters'],
    image: '✈️',
    color: 'amber',
  },
  {
    icon: ShoppingBag,
    title: 'Mall & Retail Media',
    desc: 'Influence purchase decisions at point-of-consideration with impactful indoor media across Pakistan\'s top shopping destinations.',
    highlights: ['Atrium displays', 'Floor graphics', 'Elevator panels', 'Food court screens'],
    image: '🛍️',
    color: 'blue',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function ServicesSection() {
  return (
    <section id="services" className="relative py-24 bg-brand-navyLight overflow-hidden">
      <div className="glow-orb w-[500px] h-[500px] bg-brand-amber/8 top-0 left-0 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="section-label mx-auto mb-4 inline-flex">
            <Layers className="w-3.5 h-3.5" />
            What We Do
          </div>
          <h2 className="section-title mb-4">
            Full-Spectrum{' '}
            <span className="bg-gradient-to-r from-brand-amber to-orange-400 bg-clip-text text-transparent">
              OOH Services
            </span>
          </h2>
          <p className="section-subtitle mx-auto text-slate-400">
            From classic billboards to cutting-edge digital formats — we offer every
            out-of-home touchpoint your brand needs to dominate the streets.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, i) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.title}
                variants={itemVariants}
                className={`glass-card p-7 group hover:border-brand-blue/30 hover:shadow-card-hover transition-all duration-500 flex flex-col ${
                  i === 4 ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                {/* Emoji + Icon */}
                <div className="flex items-center gap-4 mb-5">
                  <div className="text-4xl">{service.image}</div>
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 ${
                      service.color === 'blue'
                        ? 'bg-brand-blue/15 text-brand-blueLight'
                        : 'bg-brand-amber/15 text-brand-amber'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="font-outfit font-bold text-white text-lg mb-3 group-hover:text-brand-blueLight transition-colors duration-200">
                  {service.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-5 flex-grow">{service.desc}</p>

                {/* Highlights */}
                <ul className="space-y-1.5 mb-5">
                  {service.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2 text-slate-300 text-xs">
                      <CheckCircle2
                        className={`w-4 h-4 flex-shrink-0 ${
                          service.color === 'blue' ? 'text-brand-blueLight' : 'text-brand-amber'
                        }`}
                      />
                      {h}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className={`flex items-center gap-1.5 text-sm font-semibold mt-auto transition-all duration-200 group/btn ${
                    service.color === 'blue' ? 'text-brand-blueLight' : 'text-brand-amber'
                  }`}
                >
                  Get a Quote
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                </button>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
