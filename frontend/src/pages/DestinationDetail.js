import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import destinations from '../data/destinations';

const DestinationDetail = () => {
  const { slug } = useParams();
  const dest = destinations.find(d => d.slug === slug);
  const [lightbox, setLightbox] = useState(null);

  if (!dest) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24">
        <div className="text-7xl mb-4">🌴</div>
        <h1 className="font-playfair text-4xl font-bold text-deep-navy mb-3">Destination Not Found</h1>
        <p className="text-gray-500 mb-8">This destination doesn't exist or may have moved.</p>
        <Link to="/destinations" className="btn-primary no-underline">Back to Destinations</Link>
      </div>
    );
  }

  const categoryColors = {
    cultural: 'bg-purple-100 text-purple-700',
    beaches: 'bg-blue-100 text-blue-700',
    mountains: 'bg-green-100 text-green-700',
    wildlife: 'bg-amber-100 text-amber-700',
  };

  return (
    <div>
      {/* ── Hero ── */}
      <div className="relative h-screen bg-cover bg-center overflow-hidden" style={{ backgroundImage: `url(${dest.image})` }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className={`inline-block text-xs font-bold px-4 py-1.5 rounded-full mb-5 uppercase tracking-widest ${categoryColors[dest.category] || 'bg-sunset-orange/90 text-white'}`}>
              {dest.category}
            </span>
            <h1 className="font-playfair text-5xl md:text-7xl font-bold mb-4 leading-tight drop-shadow-lg">
              {dest.name}
            </h1>
            <p className="text-xl md:text-2xl text-gold font-playfair italic mb-4">{dest.tagline}</p>
            <p className="text-white/80 flex items-center justify-center gap-2 text-sm">
              <span>📍</span> {dest.location}
            </p>
          </motion.div>
        </div>
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-70">
          <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2.5 bg-white rounded-full" />
          </div>
        </div>
      </div>

      {/* ── Quick Info Bar ── */}
      <div className="bg-ocean-blue text-white py-6">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            { icon: '🕐', label: 'Duration', value: dest.duration },
            { icon: '📅', label: 'Best Time', value: dest.bestTime },
            { icon: '🎟️', label: 'Entry Fee', value: dest.entryFee },
            { icon: '🚗', label: 'Distance', value: dest.distance },
          ].map(({ icon, label, value }) => (
            <div key={label}>
              <div className="text-2xl mb-1">{icon}</div>
              <div className="text-xs text-white/60 uppercase tracking-wide mb-0.5">{label}</div>
              <div className="text-sm font-semibold">{value}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16">

        {/* ── About ── */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sunset-orange font-semibold text-sm tracking-widest uppercase">Overview</span>
          <h2 className="section-title mt-2 mb-6">About {dest.name}</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">{dest.description}</p>
          <div className="space-y-4">
            {dest.about.map((para, i) => (
              <p key={i} className="text-gray-600 leading-relaxed">{para}</p>
            ))}
          </div>
        </motion.section>

        {/* ── Photo Gallery ── */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sunset-orange font-semibold text-sm tracking-widest uppercase">Photos</span>
          <h2 className="section-title mt-2 mb-6">Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {dest.gallery.map((img, i) => (
              <motion.div
                key={i}
                className={`relative overflow-hidden rounded-2xl cursor-pointer group shadow-md hover:shadow-xl transition-shadow ${i === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
                style={{ height: i === 0 ? '420px' : '200px' }}
                onClick={() => setLightbox(img)}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={img}
                  alt={`${dest.name} ${i + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <span className="text-white text-4xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">🔍</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ── Highlights ── */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sunset-orange font-semibold text-sm tracking-widest uppercase">Experiences</span>
          <h2 className="section-title mt-2 mb-8">Top Highlights</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {dest.highlights.map(({ icon, title, desc }) => (
              <div key={title} className="flex gap-4 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                <div className="w-14 h-14 bg-sandy-beige rounded-2xl flex items-center justify-center text-3xl flex-shrink-0">
                  {icon}
                </div>
                <div>
                  <h4 className="font-playfair text-lg font-bold text-deep-navy mb-1">{title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ── Travel Tips ── */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sunset-orange font-semibold text-sm tracking-widest uppercase">Advice</span>
          <h2 className="section-title mt-2 mb-8">Travel Tips</h2>
          <div className="bg-sandy-beige rounded-2xl p-8 space-y-4">
            {dest.tips.map((tip, i) => (
              <div key={i} className="flex items-start gap-4">
                <span className="w-7 h-7 rounded-full bg-sunset-orange text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <p className="text-gray-700 leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ── CTA ── */}
        <motion.section
          className="bg-gradient-to-br from-ocean-blue to-ocean-dark rounded-3xl p-10 text-white text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="font-playfair text-3xl font-bold mb-3">Ready to Visit {dest.name}?</h3>
          <p className="text-white/80 mb-8 text-lg">Let PearlPara Travels craft the perfect itinerary for you.</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/contact" className="btn-primary no-underline">Plan My Trip →</Link>
            <Link to="/destinations" className="btn-outline no-underline">More Destinations</Link>
          </div>
        </motion.section>
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <motion.img
              src={lightbox}
              alt="Gallery"
              className="max-w-5xl w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl"
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.85 }}
              onClick={e => e.stopPropagation()}
            />
            <button
              className="absolute top-4 right-4 w-10 h-10 bg-sunset-orange hover:bg-sunset-dark rounded-full text-white text-xl font-bold flex items-center justify-center transition-colors"
              onClick={() => setLightbox(null)}
            >×</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DestinationDetail;
