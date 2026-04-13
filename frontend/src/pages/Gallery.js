import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

import sigiriya    from '../assets/Images/Sigiriya.jpg';
import gallefort   from '../assets/Images/Gallefort.jpg';
import hikkaduwa   from '../assets/Images/Hikkaduwa.jpg';
import marblebeach from '../assets/Images/Marblebeach.jpg';
import nilaveli    from '../assets/Images/Nilaveli.jpg';
import ninearch    from '../assets/Images/Ninearch.jpg';
import adisham     from '../assets/Images/Adisham.jpg';
import udawalawe   from '../assets/Images/Udawalawe.jpg';
import yala        from '../assets/Images/Yala.jpg';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Varied height pattern for masonry — cycles through different sizes
const HEIGHTS = [320, 220, 280, 200, 350, 240, 300, 210, 260, 380, 230, 270, 190, 340, 250];
const getHeight = (i) => HEIGHTS[i % HEIGHTS.length];

const staticImages = [
  { src: sigiriya,    title: 'Sigiriya Rock Fortress',  tag: 'Cultural',  source: 'static' },
  { src: hikkaduwa,  title: 'Hikkaduwa Beach',          tag: 'Beach',     source: 'static' },
  { src: ninearch,   title: 'Nine Arch Bridge',          tag: 'Mountains', source: 'static' },
  { src: gallefort,  title: 'Galle Fort',                tag: 'Cultural',  source: 'static' },
  { src: yala,       title: 'Yala National Park',        tag: 'Wildlife',  source: 'static' },
  { src: nilaveli,   title: 'Nilaveli Beach',            tag: 'Beach',     source: 'static' },
  { src: udawalawe,  title: 'Udawalawe National Park',   tag: 'Wildlife',  source: 'static' },
  { src: marblebeach,title: 'Marble Beach',              tag: 'Beach',     source: 'static' },
  { src: adisham,    title: 'Adisham Bungalow',          tag: 'Mountains', source: 'static' },
];

const typeToTag = {
  beach:     'Beach',
  cultural:  'Cultural',
  wildlife:  'Wildlife',
  nature:    'Mountains',
  honeymoon: 'Romantic',
};

const extractTourImages = (tour) => {
  const items = [];
  const tag   = typeToTag[tour.type] || tour.type || 'Tour';
  if (tour.image) {
    items.push({ src: tour.image, title: tour.name, tag, source: 'tour', tourId: tour._id });
  }
  if (tour.gallery?.length) {
    tour.gallery.forEach((img, i) => {
      if (img) items.push({ src: img, title: `${tour.name} — Photo ${i + 2}`, tag, source: 'tour', tourId: tour._id });
    });
  }
  return items;
};

const SkeletonItem = ({ height }) => (
  <div
    className="break-inside-avoid rounded-2xl overflow-hidden bg-gray-200 animate-pulse"
    style={{ height: `${height}px`, marginBottom: '1.25rem', breakInside: 'avoid' }}
  />
);

const Gallery = () => {
  const [allImages,    setAllImages]    = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [selectedIdx,  setSelectedIdx]  = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [filters,      setFilters]      = useState(['All']);

  useEffect(() => {
    axios.get(`${API}/api/tours`)
      .then(res => {
        const tourImages   = res.data.flatMap(extractTourImages);
        const existingSrcs = new Set(staticImages.map(i => i.src));
        const newTourImages = tourImages.filter(img => !existingSrcs.has(img.src));
        const merged = [...staticImages, ...newTourImages];
        setAllImages(merged);
        setFilters(['All', ...new Set(merged.map(i => i.tag).filter(Boolean))]);
      })
      .catch(() => {
        setAllImages(staticImages);
        setFilters(['All', ...new Set(staticImages.map(i => i.tag))]);
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered = activeFilter === 'All'
    ? allImages
    : allImages.filter(img => img.tag === activeFilter);

  const prev = useCallback(() => {
    setSelectedIdx(i => (i - 1 + filtered.length) % filtered.length);
  }, [filtered.length]);

  const next = useCallback(() => {
    setSelectedIdx(i => (i + 1) % filtered.length);
  }, [filtered.length]);

  useEffect(() => {
    if (selectedIdx === null) return;
    const onKey = e => {
      if (e.key === 'Escape')     setSelectedIdx(null);
      if (e.key === 'ArrowLeft')  prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedIdx, prev, next]);

  useEffect(() => { setSelectedIdx(null); }, [activeFilter]);

  const selected = selectedIdx !== null ? filtered[selectedIdx] : null;

  return (
    <div>
      {/* ── Hero ── */}
      <div className="page-hero" style={{ backgroundImage: `url(${sigiriya})` }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
        <div className="relative z-10 pt-20 px-6 text-center">
          <motion.span
            className="inline-block font-cinzel text-xs tracking-widest uppercase bg-sunset-orange/90 text-white px-5 py-2 rounded-full mb-5"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          >
            Visual Journey
          </motion.span>
          <motion.h1
            className="font-display text-5xl md:text-6xl font-bold text-white"
            initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
          >
            Sri Lanka Gallery
          </motion.h1>
          <motion.p
            className="font-sans text-white/75 mt-3 text-lg font-light"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
          >
            A glimpse into the breathtaking beauty of the Pearl of the Indian Ocean
          </motion.p>
        </div>
      </div>

      <div className="py-16 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <span className="section-label">Explore by Category</span>
          <h2 className="section-title mt-2">Sri Lanka in Pictures</h2>
          <p className="section-subtitle">
            Click any image to view full size. Use arrow keys to navigate.
            {!loading && allImages.some(i => i.source === 'tour') && (
              <span className="block text-sm text-palm-green mt-1 font-medium">
                ✓ Includes photos from {allImages.filter(i => i.source === 'tour').length} tour package images
              </span>
            )}
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex justify-center gap-3 mb-10 flex-wrap">
          {filters.map(tag => (
            <button
              key={tag}
              onClick={() => setActiveFilter(tag)}
              className={`font-sans text-sm font-medium px-5 py-2 rounded-full border transition-all duration-200 ${
                activeFilter === tag
                  ? 'bg-ocean-blue text-white border-ocean-blue shadow-md scale-105'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-ocean-blue hover:text-ocean-blue'
              }`}
            >
              {tag}
              {!loading && (
                <span className={`ml-1.5 text-xs ${activeFilter === tag ? 'text-white/70' : 'text-warm-gray'}`}>
                  ({tag === 'All' ? allImages.length : allImages.filter(i => i.tag === tag).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            className="columns-1 sm:columns-2 lg:columns-3"
            style={{ columnGap: '1.25rem' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {loading
              ? Array(9).fill(0).map((_, i) => (
                  <SkeletonItem key={i} height={getHeight(i)} />
                ))
              : filtered.map((img, i) => (
                  <motion.div
                    key={`${img.src}-${i}`}
                    className="break-inside-avoid relative group cursor-pointer rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-300"
                    style={{ marginBottom: '1.25rem', breakInside: 'avoid' }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(i * 0.04, 0.4), duration: 0.5 }}
                    onClick={() => setSelectedIdx(i)}
                  >
                    <img
                      src={img.src}
                      alt={img.title}
                      className="w-full object-cover block group-hover:scale-105 transition-transform duration-500"
                      style={{ height: `${getHeight(i)}px` }}
                      onError={e => { e.target.parentElement.style.display = 'none'; }}
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-xs font-bold text-sunset-orange uppercase tracking-widest mb-1 block">
                            {img.tag}
                            {img.source === 'tour' && (
                              <span className="ml-2 bg-palm-green/80 text-white text-xs px-1.5 py-0.5 rounded-full normal-case tracking-normal font-normal">
                                Tour
                              </span>
                            )}
                          </span>
                          <p className="text-white font-display text-base font-bold leading-tight">{img.title}</p>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-lg flex-shrink-0">
                          ⊕
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
            }
          </motion.div>
        </AnimatePresence>

        {/* Empty state */}
        {!loading && filtered.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <div className="text-5xl mb-4">🖼️</div>
            <p className="font-display text-xl">No images in this category yet.</p>
          </div>
        )}
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelectedIdx(null)}
          >
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
                <div className="flex items-center justify-center gap-3 mb-1">
                  <span className="text-sunset-orange text-xs font-bold uppercase tracking-widest">{selected.tag}</span>
                  {selected.source === 'tour' && (
                    <span className="bg-palm-green text-white text-xs px-2 py-0.5 rounded-full font-sans">Tour Package</span>
                  )}
                </div>
                <p className="text-white font-display text-2xl font-bold">{selected.title}</p>
                <p className="text-white/40 text-xs mt-2 font-sans">{selectedIdx + 1} / {filtered.length}</p>
              </div>
            </motion.div>

            <button
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/25 rounded-full text-white text-3xl flex items-center justify-center transition-colors z-10"
              onClick={e => { e.stopPropagation(); next(); }}
              aria-label="Next"
            >›</button>

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
