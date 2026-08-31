'use client'

import React, { useState, useEffect } from 'react'
import { Layers, Bus, Monitor, Plane, ShoppingBag, UploadCloud, Trash2, Video, Loader2, LogOut, ArrowLeft } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

type ServiceCard = {
  title: string;
  slug: string;
  icon: React.ElementType;
};

const SERVICES: ServiceCard[] = [
  { title: 'Billboard Advertising', slug: 'billboard-advertising', icon: Layers },
  { title: 'Transit & Transport Media', slug: 'transit-transport-media', icon: Bus },
  { title: 'Digital OOH (DOOH)', slug: 'digital-ooh', icon: Monitor },
  { title: 'Airport Media', slug: 'airport-media', icon: Plane },
  { title: 'Mall & Retail Media', slug: 'mall-retail-media', icon: ShoppingBag },
];

export default function AdminServiceVideosPage() {
  const [videoMap, setVideoMap] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [uploadingSlug, setUploadingSlug] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    fetchVideoMappings()
  }, [])

  const fetchVideoMappings = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/service-videos`)
      if (res.ok) {
        const data = await res.json()
        setVideoMap(data as Record<string, string>)
      }
    } catch (err) {
      console.error("Failed to fetch service videos", err)
      toast.error("Failed to load video data")
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/admin/logout`, { method: 'POST', credentials: 'include' })
      if (res.ok) {
        toast.success('Logged out successfully')
        router.push('/admin/login')
        router.refresh()
      }
    } catch (err) {
      toast.error('Failed to log out')
    }
  }

  const handleFileUpload = async (slug: string, file: File) => {
    if (!file.type.startsWith('video/')) {
      toast.error('Please select a valid video file.')
      return
    }

    if (file.size > 100 * 1024 * 1024) {
      toast.error('Video size must be less than 100MB.')
      return
    }

    setUploadingSlug(slug)
    const toastId = toast.loading('Uploading video...')

    try {
      const formData = new FormData()
      formData.append('file', file)

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/admin/service-videos/${slug}`, {
        method: 'POST',
        credentials: 'include',
        body: formData,
      })

      if (res.ok) {
        toast.success('Video uploaded successfully!', { id: toastId })
        fetchVideoMappings()
      } else {
        const data = await res.json()
        toast.error((data as any).error || 'Failed to upload video', { id: toastId })
      }
    } catch (err) {
      console.error(err)
      toast.error('An error occurred during upload', { id: toastId })
    } finally {
      setUploadingSlug(null)
    }
  }

  const handleDelete = async (slug: string) => {
    if (!confirm('Are you sure you want to remove this video?')) return

    const toastId = toast.loading('Removing video...')
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/admin/service-videos/${slug}`, {
        method: 'DELETE',
        credentials: 'include',
      })

      if (res.ok) {
        toast.success('Video removed successfully', { id: toastId })
        fetchVideoMappings()
      } else {
        toast.error('Failed to remove video', { id: toastId })
      }
    } catch (err) {
      toast.error('An error occurred', { id: toastId })
    }
  }

  return (
    <div className="min-h-screen bg-brand-black text-slate-200 p-8 pt-24 font-sans">
      <Toaster position="top-right" toastOptions={{ style: { background: '#1e293b', color: '#fff' } }} />
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-white p-2 rounded-lg shrink-0 hidden sm:block">
              <img src="/images/amk-ads-logo-final.png" alt="AMK ADS" className="h-10 w-auto object-contain" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Service Videos</h1>
              <p className="text-slate-400">Manage modal videos for your Full-Spectrum OOH Services.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => router.push('/admin/portfolio')}
              className="flex items-center gap-2 bg-[#111111] hover:bg-[#222222] text-white border border-brand-greyMedium px-5 py-2.5 rounded-lg font-medium transition-colors whitespace-nowrap"
            >
              <ArrowLeft size={18} />
              Back to Portfolio
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-slate-400 hover:text-white px-4 py-2.5 border border-brand-greyMedium hover:bg-[#111111] rounded-lg text-sm font-medium transition-colors"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin text-brand-orange" size={40} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service) => {
              const Icon = service.icon;
              const videoUrl = videoMap[service.slug];
              const isUploading = uploadingSlug === service.slug;

              return (
                <div key={service.slug} className="bg-[#111111] border border-brand-greyMedium rounded-2xl p-6 flex flex-col h-full shadow-lg">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-brand-orange/15 text-brand-orange flex items-center justify-center shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-outfit font-bold text-white text-lg leading-tight">{service.title}</h3>
                      <p className="text-xs text-slate-400 mt-1">Slug: {service.slug}</p>
                    </div>
                  </div>

                  <div className="flex-grow flex flex-col items-center justify-center bg-brand-black rounded-xl border border-dashed border-brand-greyMedium/50 p-4 mb-5 min-h-[160px] relative overflow-hidden group">
                    {videoUrl ? (
                      <div className="absolute inset-0 w-full h-full bg-black flex items-center justify-center">
                        <video 
                          src={videoUrl} 
                          className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" 
                          muted 
                          autoPlay 
                          loop 
                          playsInline 
                        />
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="bg-black/50 text-white p-3 rounded-full backdrop-blur-sm">
                            <Video className="w-6 h-6" />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center">
                        <Video className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                        <p className="text-slate-500 text-sm font-medium">No video uploaded</p>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-3 mt-auto">
                    <label className="flex-1 cursor-pointer">
                      <input 
                        type="file" 
                        accept="video/*" 
                        className="hidden" 
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileUpload(service.slug, file);
                        }} 
                        disabled={isUploading}
                      />
                      <div className={`flex items-center justify-center gap-2 py-2.5 rounded-lg font-medium transition-colors ${
                        videoUrl 
                          ? 'bg-[#222222] hover:bg-[#333333] text-white border border-brand-greyMedium' 
                          : 'bg-brand-orange hover:bg-brand-orangeHover text-white'
                      } ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                        {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <UploadCloud className="w-4 h-4" />}
                        {isUploading ? 'Uploading...' : videoUrl ? 'Replace Video' : 'Upload Video'}
                      </div>
                    </label>
                    
                    {videoUrl && (
                      <button 
                        onClick={() => handleDelete(service.slug)}
                        disabled={isUploading}
                        className="p-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 rounded-lg transition-colors disabled:opacity-50"
                        title="Remove Video"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}

      </div>
    </div>
  )
}
