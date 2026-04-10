import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const images = [
  { src: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=85', title: 'Sigiriya Rock Fortress', tag: 'Cultural' },
  { src: 'https://images.unsplash.com/photo-1582515073490-39981397c445?auto=format&fit=crop&w=800&q=85', title: 'Mirissa Beach', tag: 'Beach' },
  { src: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&w=800&q=85', title: 'Ella Nine Arch Bridge', tag: 'Mountains' },
  { src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=85', title: 'Yala National Park', tag: 'Wildlife' },
  { src: 'https://images.unsplash.com/photo-1544008230-ac1e1fb4f4f4?auto=format&fit=crop&w=800&q=85', title: 'Temple of the Tooth', tag: 'Cultural' },
  { src: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?auto=format&fit=crop&w=800&q=85', title: 'Tea Plantations', tag: 'Mountains' },
  { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=85', title: 'Horton Plains', tag: 'Nature' },
  { src: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=800&q=85', title: 'Galle Fort', tag: 'Cultural' },
  { src: 'https://images.unsplash.com/photo-1566438480900-0609be27a4be?auto=format&fit=crop&w=800&q=85', title: 'Whale Watching', tag: 'Wildlife' },
];

const Gallery = () => {
  const [selectedIdx, setSelectedIdx] = useState(null);

  const prev = useCallback(() => {
    setSelectedIdx(i => (i - 1 + images.length) % images.length);
  }, []);

  const next = useCallback(() => {
    setSelectedIdx(i => (i + 1) % images.length);
  }, []);

  useEffect(() => {
    if (selectedIdx === null) return;
    const onKey = e => {
      if (e.key === 'Escape') setSelectedIdx(null);
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedIdx, prev, next]);

  const selected = selectedIdx !== null ? images[selectedIdx] : null;

  return (
    <div>
      {/* ── Page Hero ── */}
      <div
        className="page-hero"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544008230-ac1e1fb4f4f4?auto=format&fit=crop&w=1920&q=85')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
        <div className="relative z-10 pt-20 px-6">
          <motion.h1
            className="font-playfair text-5xl md:text-6xl font-bold"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Gallery
          </motion.h1>
          <motion.p
            className="text-white/80 mt-3 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            A visual journey through the Pearl of the Indian Ocean
          </motion.p>
        </div>
      </div>

      <div className="py-16 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-sunset-orange font-semibold text-sm tracking-widest uppercase">Visual Journey</span>
          <h2 className="section-title mt-2">Sri Lanka in Pictures</h2>
          <p className="section-subtitle">Click any image to explore in full view. Use arrow keys to navigate.</p>
        </div>

        {/* Masonry Grid using CSS columns (reliable cross-browser) */}
        <div
          style={{
            columnCount: 3,
            columnGap: '1.5rem',
          }}
          className="[column-count:1] sm:[column-count:2] lg:[column-count:3]"
        >
          {images.map((img, i) => (
            <motion.div
              key={i}
              className="break-inside-avoid mb-6 relative group cursor-pointer rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              onClick={() => setSelectedIdx(i)}
              style={{ breakInside: 'avoid', marginBottom: '1.5rem' }}
            >
              <img
                src={img.src}
                alt={img.title}
                className="w-full object-cover group-hover:scale-105 transition-transform duration-500 block"
                style={{ height: i % 3 === 0 ? '280px' : '200px' }}
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <span className="text-xs font-semibold text-sunset-orange uppercase tracking-wide mb-1">
                  {img.tag}
                </span>
                <p className="text-white font-playfair text-lg font-bold">{img.title}</p>
                <p className="text-white/60 text-xs mt-1">Click to view full size</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIdx(null)}
          >
            {/* Prev */}
            <button
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/25 rounded-full text-white text-2xl flex items-center justify-center transition-colors z-10"
              onClick={e => { e.stopPropagation(); prev(); }}
              aria-label="Previous"
            >
              ‹
            </button>

            <motion.div
              className="relative max-w-5xl w-full"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={e => e.stopPropagation()}
            >
              <img
                src={selected.src}
                alt={selected.title}
                className="w-full rounded-2xl shadow-2xl max-h-[80vh] object-contain mx-auto block"
              />
              <div className="text-center mt-4">
                <span className="text-sunset-orange text-xs font-semibold uppercase tracking-widest">{selected.tag}</span>
                <p className="text-white font-playfair text-2xl font-bold mt-1">{selected.title}</p>
                <p className="text-white/40 text-xs mt-2">{selectedIdx + 1} / {images.length}</p>
              </div>
            </motion.div>

            {/* Next */}
            <button
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/25 rounded-full text-white text-2xl flex items-center justify-center transition-colors z-10"
              onClick={e => { e.stopPropagation(); next(); }}
              aria-label="Next"
            >
              ›
            </button>

            {/* Close */}
            <button
              className="absolute top-4 right-4 w-10 h-10 bg-sunset-orange hover:bg-sunset-dark rounded-full text-white text-xl font-bold flex items-center justify-center transition-colors"
              onClick={() => setSelectedIdx(null)}
              aria-label="Close"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
