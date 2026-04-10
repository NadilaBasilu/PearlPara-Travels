import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const categories = ['all', 'beaches', 'mountains', 'wildlife', 'cultural', 'waterfalls', 'adventure'];

const categoryIcons = {
  all: '🌍', beaches: '🏖️', mountains: '🏔️', wildlife: '🐘',
  cultural: '🏛️', waterfalls: '💧', adventure: '🧗',
};

const SkeletonCard = () => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-md animate-pulse">
    <div className="h-56 bg-gray-200" />
    <div className="p-5 space-y-3">
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-3 bg-gray-200 rounded w-full" />
      <div className="h-3 bg-gray-200 rounded w-2/3" />
      <div className="h-9 bg-gray-200 rounded-full w-1/3 mt-2" />
    </div>
  </div>
);

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

const Destinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    axios.get(`${API}/api/destinations`)
      .then(res => { setDestinations(res.data); setLoading(false); })
      .catch(() => { setError('Failed to load destinations. Please try again.'); setLoading(false); });
  }, []);

  const filtered = filter === 'all'
    ? destinations
    : destinations.filter(d => d.category === filter);

  return (
    <div>
      {/* ── Page Hero ── */}
      <div
        className="page-hero"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&w=1920&q=85')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
        <div className="relative z-10 pt-20 px-6">
          <motion.h1
            className="font-playfair text-5xl md:text-6xl font-bold"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Destinations
          </motion.h1>
          <motion.p
            className="text-white/80 mt-3 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Explore the breathtaking beauty of Sri Lanka
          </motion.p>
        </div>
      </div>

      <div className="py-16 px-6 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <span className="text-sunset-orange font-semibold text-sm tracking-widest uppercase">Explore</span>
          <h2 className="section-title mt-2">Sri Lanka's Destinations</h2>
          <p className="section-subtitle">From ancient ruins to pristine beaches — find your perfect escape.</p>
        </div>

        {/* Filter Pills */}
        <div className="flex justify-center gap-3 mb-12 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 border ${
                filter === cat
                  ? 'bg-ocean-blue text-white border-ocean-blue shadow-md scale-105'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-ocean-blue hover:text-ocean-blue hover:shadow-sm'
              }`}
            >
              <span>{categoryIcons[cat]}</span>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Error */}
        {error && (
          <div className="text-center py-16 text-red-500 bg-red-50 rounded-2xl border border-red-100">
            <div className="text-4xl mb-3">⚠️</div>
            <p>{error}</p>
          </div>
        )}

        {/* Grid */}
        {!error && (
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {loading
                ? Array(6).fill(0).map((_, i) => <SkeletonCard key={i} />)
                : filtered.map(dest => (
                  <motion.div key={dest._id} variants={itemVariants} className="card group">
                    <div className="relative overflow-hidden h-56">
                      <img
                        src={dest.image}
                        alt={dest.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      {dest.category && (
                        <span className="absolute top-3 left-3 bg-sunset-orange text-white text-xs font-semibold px-3 py-1 rounded-full capitalize">
                          {categoryIcons[dest.category]} {dest.category}
                        </span>
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="font-playfair text-xl font-bold text-deep-navy mb-2">{dest.name}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">{dest.description}</p>
                      <button className="btn-primary text-sm py-2 px-5">Explore →</button>
                    </div>
                  </motion.div>
                ))
              }
            </motion.div>
          </AnimatePresence>
        )}

        {/* Empty State */}
        {!loading && !error && filtered.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-xl font-medium">No destinations found for "{filter}"</p>
            <button onClick={() => setFilter('all')} className="btn-primary mt-6 text-sm">
              Show All
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Destinations;
