'use client'

import React, { useRef, useState, useEffect } from 'react'
import { X, Play, Pause, Volume2, VolumeX } from 'lucide-react'

type VideoModalProps = {
  videoSrc: string;
  onClose: () => void;
}

export default function VideoModal({ videoSrc, onClose }: VideoModalProps) {
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  // Focus trap & Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    
    // Trap focus inside modal
    if (modalRef.current) {
      modalRef.current.focus()
    }
    
    window.addEventListener('keydown', handleKeyDown)
    
    // Lock body scroll
    document.body.style.overflow = 'hidden'
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current)
    }
  }, [onClose])

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!videoRef.current) return

    if (isMuted) {
      // Unmuting: Start from 0 and fade up
      videoRef.current.volume = 0
      videoRef.current.muted = false
      setIsMuted(false)
      
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current)
      
      let currentVol = 0
      const targetVol = 0.85
      fadeIntervalRef.current = setInterval(() => {
        if (!videoRef.current) return
        currentVol += 0.05
        if (currentVol >= targetVol) {
          videoRef.current.volume = targetVol
          if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current)
        } else {
          videoRef.current.volume = currentVol
        }
      }, 50)
    } else {
      // Muting
      videoRef.current.muted = true
      setIsMuted(true)
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current)
    }
  }

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6"
      style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
      onClick={onClose}
    >
      <div 
        ref={modalRef}
        tabIndex={-1}
        className="relative w-full max-w-5xl bg-brand-black border border-brand-orange/30 rounded-2xl overflow-hidden shadow-2xl outline-none"
        onClick={(e) => e.stopPropagation()} // Prevent click inside modal from closing
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          aria-label="Close video"
          className="absolute top-4 right-4 z-[100] p-2 bg-black/50 hover:bg-brand-orange text-white rounded-full transition-colors border border-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Video Container */}
        <div className="relative w-full aspect-video bg-black flex items-center justify-center">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-contain"
            src={videoSrc}
          />
          
          {/* Controls */}
          <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-30 flex items-center gap-2 sm:gap-3">
            <button 
              onClick={toggleMute} 
              className="bg-black/60 hover:bg-black/80 text-white font-medium px-3 py-1.5 sm:px-4 sm:py-2 rounded-full backdrop-blur-md flex items-center gap-2 transition border border-white/10"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span className="text-xs sm:text-sm">{isMuted ? 'Sound Off' : 'Sound On'}</span>
            </button>
            <button 
              onClick={togglePlay} 
              className="bg-black/60 hover:bg-black/80 backdrop-blur-md text-white border border-white/10 p-2 sm:p-2.5 rounded-full transition flex items-center justify-center"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 pl-0.5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
