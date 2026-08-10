'use client'

import { useState, useEffect } from 'react'
import { Menu, X, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'

const navLinks = [
  { label: 'Home',      href: '#home' },
  { label: 'Services',  href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Group',     href: '#group' },
  { label: 'Contact',   href: '#contact' },
  { label: 'Admin',     href: '/admin/portfolio' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen]   = useState(false)
  const [activeLink, setActiveLink] = useState('home')

  const handleNav = (href: string) => {
    if (href.startsWith('/')) {
      window.location.href = href;
      return;
    }
    setMenuOpen(false)
    setActiveLink(href.replace('#', ''))
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/30 border-b border-white/10 transition-all duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-4">

          {/* ── Logo ── */}
          <button
            onClick={() => handleNav('#home')}
            className="group flex items-center justify-center transition-opacity hover:opacity-80 duration-300"
          >
            <img src="/images/amk-ads-logo-final.png" alt="AMK ADS Logo" className="h-10 md:h-12 w-auto object-contain brightness-0 invert-[0.95] sepia-[0.2] drop-shadow-md" />
          </button>

          {/* ── Desktop Nav ── */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = activeLink === link.href.replace('#', '')
              return (
                <button
                  key={link.label}
                  onClick={() => handleNav(link.href)}
                  className={`relative px-1 py-2 uppercase text-xs tracking-widest font-semibold transition-colors duration-200 ${
                    isActive ? 'text-white' : 'text-white/80 hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="underline"
                      className="absolute left-0 right-0 bottom-0 h-0.5 bg-gradient-to-r from-brand-blueLight to-brand-amber rounded-full"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              )
            })}
          </nav>

          {/* ── CTA Button ── */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => handleNav('#contact')}
              className="btn-secondary text-sm px-5 py-2.5 flex items-center gap-1.5 animate-pulse hover:animate-none"
            >
              Speak to Us
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* ── Mobile Hamburger ── */}
          <button
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* ── Mobile Drawer ── */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-brand-navy/98 backdrop-blur-xl border-t border-white/5 px-4 py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNav(link.href)}
              className="w-full text-left px-4 py-3 text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-200 font-medium flex items-center justify-between"
            >
              {link.label}
              <ChevronRight className="w-4 h-4 text-brand-blue" />
            </button>
          ))}
          <div className="pt-2 mt-2 border-t border-white/10">
            <button
              onClick={() => handleNav('#contact')}
              className="btn-secondary w-full justify-center text-sm animate-pulse hover:animate-none"
            >
              Speak to Us
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
