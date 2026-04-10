import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const categories = ['all', 'beaches', 'mountains', 'wildlife', 'cultural', 'waterfalls', 'adventure'];

const categoryIcons = {
  all: '🌍', beaches: '🏖️', mountains: '🏔️', wildlife: '🐘',
  cultural: '🏛️', waterfalls: '💧', adventure: '🧗',
};

const SkeletonCard = () => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-md animate-pulse">
    <div className="h-52 bg-gray-200" />
    <div className="p-5 space-y-3">
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-3 bg-gray-200 rounded w-full" />
      <div className="h-3 bg-gray-200 rounded w-2/3" />
    </div>
  </div>
);

const Destinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios.get(`${API}/api/destinations`)
      .then(res => { setDestinations(res.data); setLoading(false); })
      .catch(() => { setError('Failed to load destinations. Please try again.'); setLoading(false); });
  }, []);

  const filtered = filter === 'all' ? destinations : destinations.filter(d => d.category === filter);

  return (
    <div className="pt-24 pb-20 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <span className="text-sunset-orange font-semibold text-sm tracking-widest uppercase">Explore</span>
        <h1 className="section-title mt-2">Sri Lanka's Destinations</h1>
        <p className="section-subtitle">From ancient ruins to pristine beaches — find your perfect escape.</p>
      </div>

      {/* Filter Pills */}
      <div className="flex justify-center gap-3 mb-10 flex-wrap">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
              filter === cat
                ? 'bg-ocean-blue text-white border-ocean-blue shadow-md'
                : 'bg-white text-gray-600 border-gray-200 hover:border-ocean-blue hover:text-ocean-blue'
            }`}
          >
            <span>{categoryIcons[cat]}</span>
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Error */}
      {error && (
        <div className="text-center py-16 text-red-500 bg-red-50 rounded-2xl">{error}</div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading
          ? Array(6).fill(0).map((_, i) => <SkeletonCard key={i} />)
          : filtered.map((dest, i) => (
            <motion.div
              key={dest._id}
              className="card group"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="relative overflow-hidden h-52">
                <img src={dest.image} alt={dest.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                {dest.category && (
                  <span className="absolute top-3 left-3 bg-sunset-orange text-white text-xs font-semibold px-3 py-1 rounded-full capitalize">
                    {dest.category}
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
      </div>

      {!loading && !error && filtered.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <div className="text-5xl mb-4">🔍</div>
          <p className="text-lg">No destinations found for this category.</p>
        </div>
      )}
    </div>
  );
};

export default Destinations;
