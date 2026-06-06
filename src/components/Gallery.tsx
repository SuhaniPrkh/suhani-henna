import React, { useState } from 'react';
import { Maximize2, X, ChevronLeft, ChevronRight, CheckCircle2, Heart } from 'lucide-react';
import { GALLERY_ITEMS } from '../data';
import { GalleryItem } from '../types';

interface GalleryProps {
  onSelectService: (serviceName: string, messageTemplate: string) => void;
  onScrollToSection: (sectionId: string) => void;
}

export default function Gallery({ onSelectService, onScrollToSection }: GalleryProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'bridal' | 'festival' | 'party' | 'custom'>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [likedItems, setLikedItems] = useState<{ [key: string]: boolean }>({});

  const categories = [
    { id: 'all', label: 'All Designs' },
    { id: 'bridal', label: 'Bridal Henna' },
    { id: 'festival', label: 'Festival Mehndi' },
    { id: 'custom', label: 'Custom & Concept' },
  ];

  // Filter items
  const filteredItems = activeCategory === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleBookThisItem = (item: GalleryItem) => {
    const template = `Hi Suhani, I love your design titled "${item.title}" from your gallery! I'd love to request an appointment modeled on this particular visual aesthetic and coverage.`;
    onSelectService(item.category, template);
    setLightboxIndex(null);
    onScrollToSection('contact');
  };

  const handlePrevLightbox = () => {
    if (lightboxIndex !== null && lightboxIndex > 0) {
      setLightboxIndex(lightboxIndex - 1);
    } else {
      setLightboxIndex(filteredItems.length - 1);
    }
  };

  const handleNextLightbox = () => {
    if (lightboxIndex !== null && lightboxIndex < filteredItems.length - 1) {
      setLightboxIndex(lightboxIndex + 1);
    } else {
      setLightboxIndex(0);
    }
  };

  return (
    <section id="gallery" className="py-20 md:py-28 bg-editorial-cream relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-sans">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-[10px] uppercase tracking-[0.3em] text-editorial-gold font-bold block">
            VISUAL PORTFOLIO
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-editorial-burgundy tracking-tight">
            Curated Masterpieces & Visuals
          </h2>
          <div className="w-12 h-px bg-editorial-gold/40 mx-auto" />
          <p className="text-sm text-editorial-burgundy/80 font-light leading-relaxed">
            Browse through our portfolio of custom-drawn, high-stain henna creations. Find inspiration for your upcoming celebrations.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-12" id="gallery-filters">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-5 py-2.5 rounded-xs text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-200 cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-editorial-burgundy text-white shadow-xs'
                  : 'bg-white text-editorial-burgundy/80 hover:text-editorial-gold hover:bg-editorial-peach/10 border border-editorial-peach'
              }`}
              id={`cat-filter-${cat.id}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8" id="gallery-grid">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setLightboxIndex(index)}
              className="group relative bg-[#FDFBF7] border border-editorial-peach rounded-xs overflow-hidden cursor-pointer shadow-3xs hover:border-editorial-gold/40 transition-all duration-300"
              id={`gallery-card-${item.id}`}
            >
              {/* Image box */}
              <div className="aspect-[3/4] sm:aspect-square overflow-hidden bg-stone-100 relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  referrerPolicy="no-referrer"
                />

                {/* Cover Elegant Overlay - Light tone overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white" />

                {/* Float Like Pin */}
                <button
                  onClick={(e) => toggleLike(item.id, e)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-xs bg-white/90 backdrop-blur-xs flex items-center justify-center border border-editorial-peach hover:bg-white text-rose-500 scale-90 group-hover:scale-100 transition-all shadow-xs"
                >
                  <Heart className={`w-[19px] h-[19px] ${likedItems[item.id] ? 'fill-rose-500 text-rose-500' : 'text-gray-400 hover:text-rose-500'}`} />
                </button>

                {/* Difficulty Style tag */}
                <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-xs border border-white/10 text-white rounded-xs px-2.5 py-0.5 text-[9px] uppercase tracking-wider font-mono">
                  {item.style} Style
                </div>

                {/* Float Magnify icon in center */}
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-90 group-hover:scale-100">
                  <div className="w-11 h-11 rounded-full bg-white/95 text-editorial-burgundy flex items-center justify-center p-2.5 shadow-md border border-editorial-gold/30">
                    <Maximize2 className="w-4.5 h-4.5 text-editorial-burgundy" />
                  </div>
                </div>
              </div>

              {/* Title Description footer always visible */}
              <div className="p-5 border-t border-editorial-peach flex items-center justify-between bg-[#FDFBF7]">
                <div className="space-y-1">
                  <span className="text-[9px] uppercase font-mono text-editorial-gold tracking-[0.15em] block">
                    {item.category === 'bridal' ? 'Bridal Design' : item.category === 'festival' ? 'Festival' : item.category === 'party' ? 'Party Occasion' : 'Custom Concept'}
                  </span>
                  <h3 className="font-serif text-sm font-semibold text-editorial-burgundy group-hover:text-editorial-gold transition-colors">
                    {item.title}
                  </h3>
                </div>
                <div className="text-right">
                  <span className="block text-[9px] bg-editorial-peach/40 text-editorial-burgundy font-mono font-bold border border-editorial-gold/20 px-2 py-0.5 rounded-xs">
                    {item.popularity}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty placeholder state if none filters match */}
        {filteredItems.length === 0 && (
          <div className="text-center py-20" id="gallery-empty-state">
            <span className="text-sm text-gray-400 block">No designs uploaded for this filter section yet.</span>
          </div>
        )}

      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-100 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          id="gallery-lightbox-modal"
        >
          {/* Close button */}
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all cursor-pointer border border-white/20"
            id="lightbox-close-btn"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Nav arrows */}
          <button
            onClick={handlePrevLightbox}
            className="absolute left-4 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all cursor-pointer border border-white/20 hidden md:block"
            id="lightbox-prev-btn"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={handleNextLightbox}
            className="absolute right-4 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all cursor-pointer border border-white/20 hidden md:block"
            id="lightbox-next-btn"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Inner Card Content */}
          <div className="relative bg-[#FDFBF7] border border-editorial-peach max-w-4xl w-full rounded-xs overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-2 max-h-[90vh] overflow-y-auto" id="lightbox-card-inner">
            
            {/* Left Column Graphic */}
            <div className="aspect-square md:aspect-auto md:h-full bg-stone-900 overflow-hidden relative min-h-[300px]">
              <img
                src={filteredItems[lightboxIndex].image}
                alt={filteredItems[lightboxIndex].title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
            </div>

            {/* Right Column Text Detail & Interactive Booking trigger */}
            <div className="p-6 sm:p-10 flex flex-col justify-between space-y-8 bg-editorial-cream">
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-editorial-peach pb-4">
                  <span className="text-[9px] font-mono font-bold tracking-[0.2em] text-[#5A1A1A] bg-editorial-peach/60 px-3 py-1 rounded-xs border border-editorial-gold/20">
                    {filteredItems[lightboxIndex].category}
                  </span>
                  
                  <span className="text-[10px] font-medium text-editorial-burgundy/60 font-mono">
                    Complexity: {filteredItems[lightboxIndex].style}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif text-2xl font-normal text-editorial-burgundy leading-snug">
                    {filteredItems[lightboxIndex].title}
                  </h3>
                  <p className="text-[10px] text-editorial-gold font-mono tracking-wider font-semibold flex items-center space-x-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-editorial-gold" />
                    <span>Popularity match index: {filteredItems[lightboxIndex].popularity}</span>
                  </p>
                </div>

                <p className="text-xs sm:text-xs text-editorial-burgundy/80 leading-relaxed font-light font-sans">
                  {filteredItems[lightboxIndex].description || 'Each design represents weeks of careful visualization and high precision custom drawing. Created entirely with chemical-free natural henna paste recipe directly curated by Suhani.'}
                </p>

                <div className="border-t border-editorial-peach pt-4 space-y-2 text-xs text-editorial-burgundy/60">
                  <span className="block font-semibold text-editorial-burgundy">Included in Service:</span>
                  <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                    <span>✔ Handcrafted Organic Cones</span>
                    <span>✔ Freshly Layered Aftercare Sealer</span>
                    <span>✔ Symmetrical Bridal Balance</span>
                    <span>✔ Detailed Stain Instructions</span>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="space-y-3 pt-6 border-t border-editorial-peach">
                <button
                  onClick={() => handleBookThisItem(filteredItems[lightboxIndex])}
                  className="w-full py-4 rounded-xs bg-editorial-burgundy hover:bg-editorial-gold text-white font-medium text-xs tracking-[0.2em] uppercase transition-colors cursor-pointer text-center block duration-300"
                  id="lightbox-book-btn"
                >
                  Request Appointment
                </button>
                <button
                  onClick={() => setLightboxIndex(null)}
                  className="w-full py-3 rounded-xs border border-editorial-burgundy/30 text-editorial-burgundy hover:bg-editorial-peach/20 font-medium text-xs tracking-[0.2em] uppercase text-center duration-300 pointer-events-auto cursor-pointer"
                  id="lightbox-close-alt-btn"
                >
                  Back to Gallery
                </button>
              </div>

            </div>

          </div>

        </div>
      )}

    </section>
  );
}
