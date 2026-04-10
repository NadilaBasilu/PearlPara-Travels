import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import sigiriya from '../assets/Images/Sigiriya.jpg';
import gallefort from '../assets/Images/Gallefort.jpg';
import hikkaduwa from '../assets/Images/Hikkaduwa.jpg';
import marblebeach from '../assets/Images/Marblebeach.jpg';
import nilaveli from '../assets/Images/Nilaveli.jpg';
import ninearch from '../assets/Images/Ninearch.jpg';
import adisham from '../assets/Images/Adisham.jpg';
import udawalawe from '../assets/Images/Udawalawe.jpg';
import yala from '../assets/Images/Yala.jpg';

const images = [
  { src: sigiriya,    title: 'Sigiriya Rock Fortress',    tag: 'Cultural',  tall: true },
  { src: hikkaduwa,  title: 'Hikkaduwa Beach',            tag: 'Beach' },
  { src: ninearch,   title: 'Nine Arch Bridge',            tag: 'Mountains', tall: true },
  { src: gallefort,  title: 'Galle Fort',                  tag: 'Cultural' },
  { src: yala,       title: 'Yala National Park',          tag: 'Wildlife',  tall: true },
  { src: nilaveli,   title: 'Nilaveli Beach',              tag: 'Beach' },
  { src: udawalawe,  title: 'Udawalawe National Park',     tag: 'Wildlife',  tall: true },
  { src: marblebeach,title: 'Marble Beach',                tag: 'Beach' },
  { src: adisham,    title: 'Adisham Bungalow',            tag: 'Mountains', tall: true },
];

const Gallery = () => {
  const [selectedIdx, setSelectedIdx] = useState(null);

  const prev = () => setSelectedIdx(i => (i - 1 + images.length) % images.length);
  const next = () => setSelectedIdx(i => (i + 1) % images.length);

  React.useEffect(() => {
    if (selectedIdx === null) return;
    const onKey = e => {
      if (e.key === 'Escape') setSelectedIdx(null);
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedIdx]);

  const selected = selectedIdx !== null ? images[selectedIdx] : null;

  return (
    <div className="pt-24 pb-20 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <span className="text-sunset-orange font-semibold text-sm tracking-widest uppercase">Visual Journey</span>
        <h1 className="section-title mt-2">Sri Lanka Gallery</h1>
        <p className="section-subtitle">A glimpse into the breathtaking beauty of the Pearl of the Indian Ocean.</p>
      </div>

      {/* Masonry Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-5" style={{ columnGap: '1.25rem' }}>
        {images.map((img, i) => (
          <motion.div
            key={i}
            className="break-inside-avoid relative group cursor-pointer rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-300"
            style={{ marginBottom: '1.25rem', breakInside: 'avoid' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.5 }}
            onClick={() => setSelectedIdx(i)}
          >
            <img
              src={img.src}
              alt={img.title}
              className="w-full object-cover block group-hover:scale-105 transition-transform duration-500"
              style={{ height: img.tall ? '300px' : '210px' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
              <span className="text-xs font-bold text-sunset-orange uppercase tracking-widest mb-1">{img.tag}</span>
              <p className="text-white font-playfair text-lg font-bold leading-tight">{img.title}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
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
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/25 rounded-full text-white text-3xl flex items-center justify-center transition-colors z-10"
              onClick={e => { e.stopPropagation(); prev(); }}
              aria-label="Previous"
            >‹</button>

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
                <span className="text-sunset-orange text-xs font-bold uppercase tracking-widest">{selected.tag}</span>
                <p className="text-white font-playfair text-2xl font-bold mt-1">{selected.title}</p>
                <p className="text-white/40 text-xs mt-2">{selectedIdx + 1} / {images.length}</p>
              </div>
            </motion.div>

            {/* Next */}
            <button
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/25 rounded-full text-white text-3xl flex items-center justify-center transition-colors z-10"
              onClick={e => { e.stopPropagation(); next(); }}
              aria-label="Next"
            >›</button>

            {/* Close */}
            <button
              className="absolute top-4 right-4 w-10 h-10 bg-sunset-orange hover:bg-sunset-dark rounded-full text-white text-xl font-bold flex items-center justify-center transition-colors"
              onClick={() => setSelectedIdx(null)}
              aria-label="Close"
            >×</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
