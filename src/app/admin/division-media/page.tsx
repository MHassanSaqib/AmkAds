'use client'

import React, { useState, useEffect } from 'react'
import { Plus, Trash2, X, UploadCloud, Loader2, Play, Image as ImageIcon } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'
import Link from 'next/link'

type MediaItem = {
  id: number;
  division_slug: string;
  media_type: 'image' | 'video';
  media_url: string;
  title: string;
}

const DIVISIONS = [
  { slug: 'digital-marketing', label: 'Digital Marketing' },
  { slug: 'creative-agency', label: 'Creative Agency' },
  { slug: 'event-management', label: 'Event Management' },
  { slug: 'corporate-services', label: 'Corporate Services' },
]

export default function AdminDivisionMediaPage() {
  const [activeDivision, setActiveDivision] = useState(DIVISIONS[0].slug)
  const [items, setItems] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(true)
  
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  
  const [file, setFile] = useState<File | null>(null)
  const [title, setTitle] = useState('')

  useEffect(() => {
    fetchMedia()
  }, [activeDivision])

  const fetchMedia = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/division-media/${activeDivision}`)
      if (res.ok) {
        const data = await res.json()
        setItems(data as MediaItem[])
      }
    } catch (err) {
      toast.error("Failed to load media")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this file?")) return;
    
    const toastId = toast.loading('Deleting...')
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/admin/division-media/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      })
      if (res.ok) {
        setItems(items.filter(item => item.id !== id))
        toast.success('Deleted successfully', { id: toastId })
      } else {
        toast.error("Failed to delete", { id: toastId })
      }
    } catch (err) {
      toast.error("Error occurred", { id: toastId })
    }
  }

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return;

    setIsUploading(true)
    const data = new FormData()
    data.append('file', file)
    data.append('title', title)

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/admin/division-media/${activeDivision}`, {
        method: 'POST',
        credentials: 'include',
        body: data,
      })
      if (res.ok) {
        toast.success('Uploaded successfully!')
        await fetchMedia()
        setIsModalOpen(false)
        setFile(null)
        setTitle('')
      } else {
        const err = await res.json()
        toast.error(err.error || "Failed to upload")
      }
    } catch (err) {
      toast.error("Error occurred while uploading.")
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 p-8 pt-24 font-sans">
      <Toaster position="top-right" toastOptions={{ style: { background: '#1e293b', color: '#fff' } }} />
      
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Division Galleries</h1>
            <p className="text-slate-400">Manage images and videos for the 4 Group divisions.</p>
          </div>
          <div className="flex gap-3">
            <Link href="/admin/portfolio" className="px-4 py-2 text-sm text-slate-400 hover:text-white border border-slate-700 rounded-lg transition-colors">
              Back to Portfolio
            </Link>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-brand-orangeHover hover:bg-brand-orange text-white px-5 py-2.5 rounded-lg font-medium transition-colors"
            >
              <Plus size={20} />
              Upload Media
            </button>
          </div>
        </div>

        {/* Division Tabs */}
        <div className="flex overflow-x-auto gap-2 p-1 bg-slate-800 rounded-xl mb-8">
          {DIVISIONS.map(div => (
            <button
              key={div.slug}
              onClick={() => setActiveDivision(div.slug)}
              className={`px-4 py-2.5 rounded-lg whitespace-nowrap text-sm font-medium transition-all ${
                activeDivision === div.slug 
                  ? 'bg-brand-orange text-white shadow-lg' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              {div.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin text-brand-orange" size={40} />
          </div>
        ) : items.length === 0 ? (
          <div className="bg-slate-800 rounded-xl p-12 text-center border border-slate-700 flex flex-col items-center">
            <UploadCloud className="w-12 h-12 text-slate-500 mb-4" />
            <h3 className="text-xl font-medium text-slate-300 mb-2">No media uploaded</h3>
            <p className="text-slate-500 mb-6">This division gallery is empty.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {items.map(item => (
              <div key={item.id} className="group bg-slate-800 border border-slate-700 rounded-xl overflow-hidden hover:border-brand-orange/50 transition-colors relative">
                <div className="aspect-video relative bg-slate-900 flex justify-center items-center">
                  {item.media_type === 'image' ? (
                    <img src={item.media_url} alt={item.title} className="w-full h-full object-cover" />
                  ) : (
                    <>
                      <video src={item.media_url} className="w-full h-full object-cover opacity-50" />
                      <Play className="absolute text-white w-8 h-8 opacity-80" />
                    </>
                  )}
                  <div className="absolute top-2 right-2 flex gap-2">
                    <span className="bg-black/60 text-white text-[10px] px-2 py-1 rounded backdrop-blur uppercase font-bold tracking-wider flex items-center gap-1">
                      {item.media_type === 'image' ? <ImageIcon size={12}/> : <Play size={12}/>}
                      {item.media_type}
                    </span>
                  </div>
                </div>
                <div className="p-4 flex justify-between items-start gap-4">
                  <p className="text-sm font-medium text-slate-300 truncate">{item.title || 'Untitled'}</p>
                  <button 
                    onClick={() => handleDelete(item.id)}
                    className="text-slate-500 hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Upload Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
            <div className="bg-slate-800 border border-slate-700 rounded-2xl w-full max-w-lg shadow-2xl">
              <div className="border-b border-slate-700 p-6 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-white">Upload to {DIVISIONS.find(d => d.slug === activeDivision)?.label}</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                  <X size={24} />
                </button>
              </div>
              
              <form onSubmit={handleUpload} className="p-6 space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Title / Caption (Optional)</label>
                  <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-brand-orange transition-all" placeholder="e.g. 2024 Campaign Launch" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">File</label>
                  <input 
                    type="file" 
                    accept="image/*,video/*"
                    onChange={e => setFile(e.target.files?.[0] || null)}
                    required
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-brand-orange/20 file:text-brand-orange hover:file:bg-brand-orange/30 cursor-pointer"
                  />
                  <p className="text-xs text-slate-500 mt-1">Images (JPG/PNG/WEBP) or Videos (MP4/WEBM)</p>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-700">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-lg text-slate-300 hover:bg-slate-700 font-medium">Cancel</button>
                  <button type="submit" disabled={isUploading || !file} className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-brand-orangeHover hover:bg-brand-orange text-white font-medium disabled:opacity-50">
                    {isUploading ? <Loader2 className="animate-spin" size={18} /> : 'Upload'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
