'use client'

import { useState, useEffect } from 'react'
import { Menu, X, ChevronRight } from 'lucide-react'

const navLinks = [
  { label: 'Home',       href: '#home' },
  { label: 'Services',   href: '#services' },
  { label: 'Tech Tools', href: '#tools' },
  { label: 'Portfolio',  href: '#portfolio' },
  { label: 'Group',      href: '#group' },
  { label: 'Contact',    href: '#contact' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen]   = useState(false)
  const [scrolled, setScrolled]   = useState(false)
  const [activeLink, setActiveLink] = useState('home')

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNav = (href: string) => {
    setMenuOpen(false)
    setActiveLink(href.replace('#', ''))
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-brand-navy/95 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.5)] border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-4">

          {/* ── Logo ── */}
          <button
            onClick={() => handleNav('#home')}
            className="flex items-center gap-2 group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-blue to-brand-amber flex items-center justify-center shadow-glow-blue group-hover:shadow-glow-amber transition-all duration-300">
              <span className="text-white font-outfit font-black text-sm">A</span>
            </div>
            <span className="font-outfit font-extrabold text-xl tracking-tight">
              <span className="text-white">Amk</span>
              <span className="bg-gradient-to-r from-brand-amber to-brand-amberDark bg-clip-text text-transparent">Ads</span>
            </span>
          </button>

          {/* ── Desktop Nav ── */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNav(link.href)}
                className={`nav-link px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  activeLink === link.href.replace('#', '')
                    ? 'text-brand-blueLight bg-brand-blue/10'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* ── CTA Button ── */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => handleNav('#contact')}
              className="btn-secondary text-sm px-5 py-2.5 flex items-center gap-1.5"
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
              className="btn-secondary w-full justify-center text-sm"
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
