'use client'

import { useState } from 'react'
import { Award, ArrowRight, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'

const categories = ['All', 'FMCG', 'Retail', 'Education', 'Real Estate', 'Corporate']

const brands = [
  { name: "Interwood", category: "RETAIL", logo: "/logos/interwood.png" },
  { name: "Surge Group", category: "CORPORATE", logo: "/logos/surge.png" },
  { name: "Oxford Press", category: "EDUCATION", logo: "/logos/oxford.png" },
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
  { name: "Study Icon", category: "EDUCATION", logo: "/logos/studyicon.png" },
  { name: "AHZ UK", category: "EDUCATION", logo: "/logos/ahz.png" },
  { name: "Union Developers", category: "CORPORATE", logo: "/logos/union.png" },
  { name: "JKS Cash & Carry", category: "RETAIL", logo: "/logos/jks.png" },
  { name: "GOFY", category: "FMCG", logo: "/logos/gofy.png" }
];

function TiltCard({ brand, onClick }: { brand: typeof brands[0], onClick: () => void }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 })
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05 }}
      onClick={onClick}
      className="glass-card p-4 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-brand-amber/50 hover:shadow-[0_0_20px_rgba(249,115,22,0.3)] transition-colors duration-300 aspect-square group"
    >
      <div 
        className="w-full min-h-[100px] flex items-center justify-center overflow-hidden mb-2 bg-white rounded-md p-4 shadow-sm"
        style={{ transform: "translateZ(30px)" }}
      >
        <Image 
          src={brand.logo} 
          alt={brand.name}
          width={150}
          height={100}
          style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', display: 'block' }}
          className="w-auto h-auto transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <span className="text-slate-300 text-sm font-semibold text-center group-hover:text-white transition-colors" style={{ transform: "translateZ(20px)" }}>
        {brand.name}
      </span>
      <span className="text-brand-blue/60 text-[10px] uppercase tracking-wider" style={{ transform: "translateZ(20px)" }}>
        {brand.category}
      </span>
    </motion.div>
  )
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  show: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } },
}

export default function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [selectedBrand, setSelectedBrand] = useState<typeof brands[0] | null>(null)

  const filtered = activeFilter === 'All'
    ? brands
    : brands.filter((b) => b.category === activeFilter.toUpperCase())

  return (
    <section id="portfolio" className="relative py-24 bg-brand-navy overflow-hidden">
      <div className="glow-orb w-[400px] h-[400px] bg-brand-blue/10 top-1/2 right-0 -translate-y-1/2" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="relative text-center mb-12"
        >
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
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8 sm:mb-10"
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
        </motion.div>

        {/* Brand Logo Grid */}
        <motion.div
          key={activeFilter}
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 mb-10 sm:mb-12"
          style={{ perspective: "1000px" }}
        >
          {filtered.map((brand, i) => (
            <motion.div key={`${brand.name}-${i}`} variants={itemVariants}>
              <TiltCard brand={brand} onClick={() => setSelectedBrand(brand)} />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          className="text-center mt-12"
        >
          <Link
            href="/portfolio"
            className="btn-primary text-base px-8 py-4 inline-flex items-center gap-2"
          >
            View Full Portfolio
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedBrand && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedBrand(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative bg-white rounded-2xl p-8 shadow-2xl max-w-lg w-full flex flex-col items-center gap-6 cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedBrand(null)}
                className="absolute top-4 right-4 p-2 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <Image 
                src={selectedBrand.logo} 
                alt={selectedBrand.name}
                width={300}
                height={200}
                className="w-auto h-auto max-h-[200px] object-contain"
              />
              
              <div className="text-center">
                <h3 className="text-2xl font-outfit font-bold text-slate-900 mb-1">{selectedBrand.name}</h3>
                <p className="text-brand-blue font-semibold uppercase tracking-widest text-sm">{selectedBrand.category}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
