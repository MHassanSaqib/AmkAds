'use client'

import React, { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, X, UploadCloud, Loader2 } from 'lucide-react'
import Image from 'next/image'

type PortfolioItem = {
  id: string;
  title: string;
  brand: string;
  type: string;
  imageSrc: string;
  description: string;
  location?: string;
  created_at?: string;
};

export default function AdminPortfolioPage() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    brand: '',
    type: 'BILLBOARD',
    location: '',
    description: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await fetch('/api/portfolio');
      if (res.ok) {
        const data = await res.json();
        setItems(data as PortfolioItem[]);
      }
    } catch (err) {
      console.error("Failed to fetch portfolio items", err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (item?: PortfolioItem) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        title: item.title,
        brand: item.brand,
        type: item.type,
        location: item.location || '',
        description: item.description,
      });
      setImagePreview(item.imageSrc);
      setImageFile(null);
    } else {
      setEditingItem(null);
      setFormData({ title: '', brand: '', type: 'BILLBOARD', location: '', description: '' });
      setImagePreview(null);
      setImageFile(null);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    const data = new FormData();
    data.append('id', editingItem ? editingItem.id : `item-${Date.now()}`);
    data.append('title', formData.title);
    data.append('brand', formData.brand);
    data.append('type', formData.type);
    data.append('location', formData.location);
    data.append('description', formData.description);
    
    if (imageFile) {
      data.append('image', imageFile);
    } else if (editingItem) {
      data.append('imageSrc', editingItem.imageSrc);
    }

    try {
      const method = editingItem ? 'PUT' : 'POST';
      const url = editingItem ? `/api/portfolio/${editingItem.id}` : '/api/portfolio';
      
      const res = await fetch(url, { method, body: data });
      if (res.ok) {
        await fetchItems();
        handleCloseModal();
      } else {
        alert("Failed to save item.");
      }
    } catch (err) {
      console.error("Save error", err);
      alert("Error occurred while saving.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this campaign?")) return;
    
    try {
      const res = await fetch(`/api/portfolio/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setItems(items.filter(item => item.id !== id));
      } else {
        alert("Failed to delete.");
      }
    } catch (err) {
      console.error("Delete error", err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 p-8 pt-24 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Portfolio Admin Panel</h1>
            <p className="text-slate-400">Manage your out-of-home advertising campaigns dynamically.</p>
          </div>
          <button 
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-lg font-medium transition-colors"
          >
            <Plus size={20} />
            Add New Campaign
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin text-blue-500" size={40} />
          </div>
        ) : items.length === 0 ? (
          <div className="bg-slate-800 rounded-xl p-12 text-center border border-slate-700">
            <h3 className="text-xl font-medium text-slate-300 mb-2">No campaigns found</h3>
            <p className="text-slate-500 mb-6">Start by adding your first portfolio item.</p>
            <button onClick={() => handleOpenModal()} className="bg-slate-700 hover:bg-slate-600 px-6 py-2 rounded-md transition-colors text-white">Add Campaign</button>
          </div>
        ) : (
          <div className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 shadow-xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900/50 text-slate-400 text-sm uppercase tracking-wider">
                  <th className="p-4 font-medium">Image</th>
                  <th className="p-4 font-medium">Title & Brand</th>
                  <th className="p-4 font-medium">Type</th>
                  <th className="p-4 font-medium">Location</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {items.map(item => (
                  <tr key={item.id} className="hover:bg-slate-700/30 transition-colors group">
                    <td className="p-4">
                      <div className="relative w-20 h-14 rounded overflow-hidden bg-slate-900">
                        <img src={item.imageSrc} alt={item.title} className="object-cover w-full h-full" />
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="font-medium text-white mb-1">{item.title}</div>
                      <div className="text-xs text-slate-400">{item.brand}</div>
                    </td>
                    <td className="p-4">
                      <span className="bg-slate-900 text-slate-300 text-xs px-2.5 py-1 rounded border border-slate-700">{item.type}</span>
                    </td>
                    <td className="p-4 text-sm text-slate-300">
                      {item.location || '-'}
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button 
                        onClick={() => handleOpenModal(item)}
                        className="p-2 text-slate-400 hover:text-blue-400 hover:bg-slate-800 rounded transition-all opacity-0 group-hover:opacity-100"
                        title="Edit"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(item.id)}
                        className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded transition-all opacity-0 group-hover:opacity-100"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Modal Overlay */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
            <div className="bg-slate-800 border border-slate-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="sticky top-0 bg-slate-800/95 backdrop-blur border-b border-slate-700 p-6 flex justify-between items-center z-10">
                <h2 className="text-xl font-semibold text-white">{editingItem ? 'Edit Campaign' : 'Add New Campaign'}</h2>
                <button onClick={handleCloseModal} className="text-slate-400 hover:text-white transition-colors">
                  <X size={24} />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Campaign Title</label>
                    <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" placeholder="e.g. Mega Summer Display" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Brand Name</label>
                    <input required type="text" value={formData.brand} onChange={e => setFormData({...formData, brand: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" placeholder="e.g. Acme Corp" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Campaign Type</label>
                    <select required value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all">
                      <option value="BILLBOARD">Billboard</option>
                      <option value="LARGE FORMAT BILLBOARD">Large Format Billboard</option>
                      <option value="ILLUMINATED BILLBOARD">Illuminated Billboard</option>
                      <option value="OVERHEAD GANTRY">Overhead Gantry</option>
                      <option value="HIGHWAY BILLBOARD">Highway Billboard</option>
                      <option value="DIGITAL SCREEN">Digital Screen</option>
                      <option value="TRANSIT">Transit</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Location</label>
                    <input type="text" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" placeholder="e.g. Main GT Road, Lahore" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Description</label>
                  <textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all min-h-[100px]" placeholder="Detailed description of the campaign placement..." />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Media Upload</label>
                  <label className="relative flex flex-col items-center justify-center w-full h-48 border-2 border-slate-700 border-dashed rounded-xl cursor-pointer bg-slate-900/50 hover:bg-slate-800/80 hover:border-blue-500/50 transition-all overflow-hidden group">
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <UploadCloud className="w-10 h-10 mb-3 text-slate-400 group-hover:text-blue-400 transition-colors" />
                        <p className="mb-2 text-sm text-slate-400"><span className="font-semibold text-white">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-slate-500">SVG, PNG, JPG or WEBP</p>
                      </div>
                    )}
                    <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} required={!editingItem} />
                    {imagePreview && (
                      <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <span className="text-white font-medium flex items-center gap-2"><UploadCloud size={18}/> Change Image</span>
                      </div>
                    )}
                  </label>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-700">
                  <button type="button" onClick={handleCloseModal} className="px-5 py-2.5 rounded-lg text-slate-300 hover:bg-slate-700 transition-colors font-medium">Cancel</button>
                  <button type="submit" disabled={isSaving} className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors font-medium disabled:opacity-50">
                    {isSaving ? <Loader2 className="animate-spin" size={18} /> : 'Save Campaign'}
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
