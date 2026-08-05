'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { Plus, Edit2, Trash2, X, UploadCloud, Loader2, Search, ArrowUpDown, Star } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'

type PortfolioItem = {
  id: string;
  title: string;
  brand: string;
  type: string;
  imageSrc: string;
  description: string;
  location?: string;
  altText?: string;
  displayOrder?: number;
  isFeatured?: number;
  created_at?: string;
};

export default function AdminPortfolioPage() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Search & Sort State
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest'); // 'newest', 'oldest', 'order'

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    brand: '',
    type: 'BILLBOARD',
    location: '',
    description: '',
    altText: '',
    displayOrder: 0,
    isFeatured: false,
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
      toast.error("Failed to load campaigns");
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
        altText: item.altText || '',
        displayOrder: item.displayOrder || 0,
        isFeatured: item.isFeatured === 1,
      });
      setImagePreview(item.imageSrc);
      setImageFile(null);
    } else {
      setEditingItem(null);
      setFormData({ title: '', brand: '', type: 'BILLBOARD', location: '', description: '', altText: '', displayOrder: 0, isFeatured: false });
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
      // Basic size validation (< 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB");
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new window.Image();
        img.src = reader.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 1200;
          const MAX_HEIGHT = 1200;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height = Math.round((height * MAX_WIDTH) / width);
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width = Math.round((width * MAX_HEIGHT) / height);
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.8);
          setImagePreview(compressedDataUrl);
          setImageFile(file);
        };
      };
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
    data.append('altText', formData.altText);
    data.append('displayOrder', formData.displayOrder.toString());
    data.append('isFeatured', formData.isFeatured.toString());
    
    if (imagePreview) {
      data.append('imageSrc', imagePreview);
    }

    try {
      const method = editingItem ? 'PUT' : 'POST';
      const url = editingItem ? `/api/portfolio/${editingItem.id}` : '/api/portfolio';
      
      const res = await fetch(url, { method, body: data });
      if (res.ok) {
        toast.success(editingItem ? 'Campaign updated successfully!' : 'Campaign created successfully!');
        await fetchItems();
        handleCloseModal();
      } else {
        toast.error("Failed to save item.");
      }
    } catch (err) {
      console.error("Save error", err);
      toast.error("Error occurred while saving.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this campaign? This action cannot be undone.")) return;
    
    const toastId = toast.loading('Deleting campaign...');
    try {
      const res = await fetch(`/api/portfolio/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setItems(items.filter(item => item.id !== id));
        toast.success('Campaign deleted successfully', { id: toastId });
      } else {
        toast.error("Failed to delete.", { id: toastId });
      }
    } catch (err) {
      console.error("Delete error", err);
      toast.error("Error occurred while deleting.", { id: toastId });
    }
  };

  // Filter and Sort Logic
  const filteredAndSortedItems = useMemo(() => {
    return items
      .filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.type.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => {
        if (sortBy === 'newest') return 0; // Already sorted by API (created_at DESC)
        if (sortBy === 'oldest') {
          return new Date(a.created_at || 0).getTime() - new Date(b.created_at || 0).getTime();
        }
        if (sortBy === 'order') {
          return (a.displayOrder || 0) - (b.displayOrder || 0);
        }
        return 0;
      });
  }, [items, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 p-8 pt-24 font-sans">
      <Toaster position="top-right" toastOptions={{ style: { background: '#1e293b', color: '#fff' } }} />
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Portfolio Admin Panel</h1>
            <p className="text-slate-400">Manage your out-of-home advertising campaigns dynamically.</p>
          </div>
          <button 
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-lg font-medium transition-colors whitespace-nowrap"
          >
            <Plus size={20} />
            Add New Campaign
          </button>
        </div>

        {/* Toolbar: Search and Sort */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6 bg-slate-800 p-4 rounded-xl border border-slate-700">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search by title, brand, or category..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-all"
            />
          </div>
          <div className="flex items-center gap-2 sm:w-64">
            <ArrowUpDown className="text-slate-400 w-5 h-5" />
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-all"
            >
              <option value="newest">Sort by Newest</option>
              <option value="oldest">Sort by Oldest</option>
              <option value="order">Sort by Custom Order</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin text-blue-500" size={40} />
          </div>
        ) : items.length === 0 ? (
          <div className="bg-slate-800 rounded-xl p-12 text-center border border-slate-700 flex flex-col items-center">
            <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mb-4">
              <UploadCloud className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-xl font-medium text-slate-300 mb-2">No campaigns found</h3>
            <p className="text-slate-500 mb-6 max-w-md">Your portfolio is currently empty. Start by uploading your first OOH advertising campaign image.</p>
            <button onClick={() => handleOpenModal()} className="bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded-md transition-colors text-white">Upload Image</button>
          </div>
        ) : (
          <div className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 shadow-xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900/50 text-slate-400 text-sm uppercase tracking-wider">
                  <th className="p-4 font-medium w-24">Order</th>
                  <th className="p-4 font-medium">Image</th>
                  <th className="p-4 font-medium">Title & Brand</th>
                  <th className="p-4 font-medium">Category</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {filteredAndSortedItems.length > 0 ? (
                  filteredAndSortedItems.map(item => (
                    <tr key={item.id} className="hover:bg-slate-700/30 transition-colors group">
                      <td className="p-4">
                        <div className="w-8 h-8 rounded bg-slate-900 border border-slate-700 flex items-center justify-center text-sm font-medium text-slate-300">
                          {item.displayOrder || 0}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="relative w-20 h-14 rounded overflow-hidden bg-slate-900 flex items-center justify-center">
                          <img src={item.imageSrc} alt={item.altText || item.title} className="object-cover w-full h-full" />
                          {item.isFeatured === 1 && (
                            <div className="absolute top-1 right-1 bg-amber-500 rounded-full p-0.5" title="Featured">
                              <Star className="w-3 h-3 text-white fill-white" />
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="font-medium text-white mb-1 flex items-center gap-2">
                          {item.title}
                          {item.isFeatured === 1 && <span className="bg-amber-500/20 text-amber-500 text-[10px] px-1.5 py-0.5 rounded font-bold uppercase">Featured</span>}
                        </div>
                        <div className="text-xs text-slate-400">{item.brand}</div>
                      </td>
                      <td className="p-4">
                        <span className="bg-slate-900 text-slate-300 text-xs px-2.5 py-1 rounded border border-slate-700">{item.type}</span>
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
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-slate-500">No campaigns match your search.</td>
                  </tr>
                )}
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
                    <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-all" placeholder="e.g. Mega Summer Display" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Brand Name</label>
                    <input required type="text" value={formData.brand} onChange={e => setFormData({...formData, brand: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-all" placeholder="e.g. Acme Corp" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Category / Type</label>
                    <select required value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-all">
                      <option value="BILLBOARD">Billboard</option>
                      <option value="LARGE FORMAT BILLBOARD">Large Format</option>
                      <option value="ILLUMINATED BILLBOARD">Illuminated</option>
                      <option value="OVERHEAD GANTRY">Overhead Gantry</option>
                      <option value="HIGHWAY BILLBOARD">Highway</option>
                      <option value="DIGITAL SCREEN">Digital Screen</option>
                      <option value="TRANSIT">Transit</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Location</label>
                    <input type="text" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-all" placeholder="e.g. Main GT Road, Lahore" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Display Order</label>
                    <input type="number" value={formData.displayOrder} onChange={e => setFormData({...formData, displayOrder: parseInt(e.target.value) || 0})} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-all" placeholder="0" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Feature Status</label>
                    <div className="flex items-center mt-2">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked={formData.isFeatured} onChange={e => setFormData({...formData, isFeatured: e.target.checked})} />
                        <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        <span className="ml-3 text-sm font-medium text-slate-300">Highlight in Gallery</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Alt Text (SEO)</label>
                  <input type="text" value={formData.altText} onChange={e => setFormData({...formData, altText: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-all" placeholder="Brief description of image for screen readers..." />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Description</label>
                  <textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all min-h-[80px]" placeholder="Detailed description of the campaign placement..." />
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
                        <p className="text-xs text-slate-500">JPG, PNG or WEBP (Max 5MB)</p>
                      </div>
                    )}
                    <input type="file" className="hidden" accept="image/jpeg, image/png, image/webp" onChange={handleImageChange} required={!editingItem} />
                    {imagePreview && (
                      <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <span className="text-white font-medium flex items-center gap-2"><UploadCloud size={18}/> Replace Image</span>
                      </div>
                    )}
                  </label>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-700">
                  <button type="button" onClick={handleCloseModal} className="px-5 py-2.5 rounded-lg text-slate-300 hover:bg-slate-700 transition-colors font-medium">Cancel</button>
                  <button type="submit" disabled={isSaving} className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors font-medium disabled:opacity-50">
                    {isSaving ? <Loader2 className="animate-spin" size={18} /> : (editingItem ? 'Save Changes' : 'Upload Campaign')}
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
