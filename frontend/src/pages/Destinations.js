import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import destinationsData from '../data/destinations';

import sigiriya from '../assets/Images/Sigiriya.jpg';
import gallefort from '../assets/Images/Gallefort.jpg';
import hikkaduwa from '../assets/Images/Hikkaduwa.jpg';
import marblebeach from '../assets/Images/Marblebeach.jpg';
import nilaveli from '../assets/Images/Nilaveli.jpg';
import ninearch from '../assets/Images/Ninearch.jpg';
import adisham from '../assets/Images/Adisham.jpg';
import udawalawe from '../assets/Images/Udawalawe.jpg';
import yala from '../assets/Images/Yala.jpg';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Local destinations shown when API has no data
const localDestinations = [
  { _id: '1', name: 'Sigiriya Rock Fortress', category: 'cultural', image: sigiriya, description: 'An ancient rock fortress rising 200m above the jungle — a UNESCO World Heritage Site and one of Sri Lanka\'s most iconic landmarks.' },
  { _id: '2', name: 'Galle Fort', category: 'cultural', image: gallefort, description: 'A stunning 17th-century Dutch colonial fort on the southern coast, filled with charming streets, boutiques, and ocean views.' },
  { _id: '3', name: 'Hikkaduwa Beach', category: 'beaches', image: hikkaduwa, description: 'Famous for its vibrant coral reefs, sea turtles, and lively beach atmosphere on the southwest coast.' },
  { _id: '4', name: 'Marble Beach', category: 'beaches', image: marblebeach, description: 'A pristine, secluded beach with crystal-clear turquoise waters and white sands — perfect for a peaceful escape.' },
  { _id: '5', name: 'Nilaveli Beach', category: 'beaches', image: nilaveli, description: 'One of Sri Lanka\'s most beautiful beaches on the east coast, known for its calm waters and Pigeon Island nearby.' },
  { _id: '6', name: 'Nine Arch Bridge', category: 'mountains', image: ninearch, description: 'An iconic colonial-era viaduct in Ella surrounded by lush tea estates — best viewed when a train passes through.' },
  { _id: '7', name: 'Adisham Bungalow', category: 'mountains', image: adisham, description: 'A beautiful English-style manor house in Haputale surrounded by misty mountains and tea plantations.' },
  { _id: '8', name: 'Udawalawe National Park', category: 'wildlife', image: udawalawe, description: 'Home to over 500 wild elephants — one of the best places in Asia to see elephants in their natural habitat.' },
  { _id: '9', name: 'Yala National Park', category: 'wildlife', image: yala, description: 'Sri Lanka\'s most visited park, famous for having the world\'s highest density of leopards and diverse wildlife.' },
];

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

  const navigate = useNavigate();

  // Use local destinations as fallback when API returns empty
  const source = destinations.length > 0 ? destinations : localDestinations;
  const filtered = filter === 'all' ? source : source.filter(d => d.category === filter);

  const getSlug = (dest) => {
    const match = destinationsData.find(d => d.id === dest._id);
    return match ? match.slug : null;
  };

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
      <AnimatePresence mode="wait">
        <motion.div
          key={filter}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {loading
            ? Array(6).fill(0).map((_, i) => <SkeletonCard key={i} />)
            : filtered.map((dest, i) => (
              <motion.div
                key={dest._id}
                className="card group cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.45 }}
                onClick={() => { const slug = getSlug(dest); if (slug) navigate(`/destinations/${slug}`); }}
              >
                <div className="relative overflow-hidden h-56">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                  {dest.category && (
                    <span className="absolute top-3 left-3 bg-sunset-orange text-white text-xs font-semibold px-3 py-1 rounded-full capitalize">
                      {categoryIcons[dest.category]} {dest.category}
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-playfair text-xl font-bold text-deep-navy mb-2">{dest.name}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">{dest.description}</p>
                  <button
                    className="btn-primary text-sm py-2 px-5"
                    onClick={e => { e.stopPropagation(); const slug = getSlug(dest); if (slug) navigate(`/destinations/${slug}`); }}
                  >Explore →</button>
                </div>
              </motion.div>
            ))
          }
        </motion.div>
      </AnimatePresence>

      {!loading && !error && filtered.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <div className="text-5xl mb-4">🔍</div>
          <p className="text-lg">No destinations found for "{filter}".</p>
          <button onClick={() => setFilter('all')} className="btn-primary mt-6 text-sm">Show All</button>
        </div>
      )}
    </div>
  );
};

export default Destinations;
