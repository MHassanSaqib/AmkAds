'use client'

import { Target, ShoppingCart, Palette, BarChart3 } from 'lucide-react'
import { motion } from 'framer-motion'

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

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 70, damping: 20 } },
}

export default function CapabilitiesSection() {
  return (
    <section className="w-full bg-brand-black pt-8 pb-16 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
        >
          {pillars.map((pillar) => {
            const Icon = pillar.icon
            return (
              <motion.div
                variants={itemVariants}
                key={pillar.title}
                className="bg-black/40 border border-white/10 p-6 rounded-2xl group hover:border-brand-orange/50 hover:bg-black/60 transition-all duration-300 shadow-xl"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 ${
                    pillar.color === 'blue'
                      ? 'bg-brand-orange/20 text-brand-orange'
                      : 'bg-brand-orange/20 text-brand-orange'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-outfit font-bold text-white text-base mb-2 group-hover:text-brand-orange transition-colors duration-200">
                  {pillar.title}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">{pillar.desc}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
