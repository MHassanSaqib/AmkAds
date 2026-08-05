'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X, ZoomIn } from 'lucide-react';
import { portfolioMedia, PortfolioMediaType } from '@/data/portfolioMedia';

export default function PortfolioGallery() {
  const [selectedItem, setSelectedItem] = useState<PortfolioMediaType | null>(null);

  // Close modal when hitting ESC
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setSelectedItem(null);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolioMedia.map((item) => (
          <div 
            key={item.id} 
            className="glass-card rounded-xl overflow-hidden group cursor-pointer hover:border-brand-blue/30 hover:shadow-card-hover transition-all duration-300"
            onClick={() => setSelectedItem(item)}
          >
            {/* Image Container */}
            <div className="relative aspect-video w-full overflow-hidden bg-slate-900/50 p-6 flex items-center justify-center">
              <Image 
                src={item.imageSrc}
                alt={item.title}
                width={300}
                height={200}
                className="w-auto h-auto max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-brand-blue/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <ZoomIn className="w-10 h-10 text-white drop-shadow-md" />
              </div>
            </div>
            
            {/* Details */}
            <div className="p-5 border-t border-white/5">
              <span className="text-brand-orange text-xs font-bold tracking-wider uppercase mb-2 block">
                {item.type}
              </span>
              <h3 className="text-white font-semibold text-lg mb-1">{item.title}</h3>
              <p className="text-slate-400 text-sm">{brandInfo(item.brand)}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/90 p-4 sm:p-8 backdrop-blur-sm"
          onClick={() => setSelectedItem(null)}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          {/* Close Button */}
          <button 
            className="absolute top-4 right-4 sm:top-8 sm:right-8 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-[110]"
            onClick={() => setSelectedItem(null)}
          >
            <X className="w-6 h-6" />
          </button>
          
          <div 
            className="relative max-w-5xl w-full flex flex-col md:flex-row bg-slate-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image */}
            <div className="flex-1 bg-white/5 p-8 flex items-center justify-center min-h-[300px] md:min-h-[500px]">
              <Image 
                src={selectedItem.imageSrc}
                alt={selectedItem.title}
                width={800}
                height={600}
                className="w-auto h-auto max-w-full max-h-full object-contain"
              />
            </div>
            
            {/* Modal Content */}
            <div className="w-full md:w-80 lg:w-96 p-6 sm:p-8 border-l border-white/10 flex flex-col justify-center">
              <span className="inline-block px-3 py-1 bg-brand-orange/20 text-brand-orange text-xs font-bold rounded-full mb-4 w-fit uppercase">
                {selectedItem.type}
              </span>
              <h2 className="text-2xl font-bold text-white mb-2">{selectedItem.title}</h2>
              <p className="text-brand-blue font-medium mb-6">{selectedItem.brand}</p>
              
              <div className="prose prose-invert prose-sm">
                <p className="text-slate-300 leading-relaxed">
                  {selectedItem.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function brandInfo(brand: string) {
  return `Brand: ${brand}`;
}
