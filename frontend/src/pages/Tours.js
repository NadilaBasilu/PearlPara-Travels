import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const SkeletonCard = () => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-md animate-pulse">
    <div className="h-52 bg-gray-200" />
    <div className="p-5 space-y-3">
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-3 bg-gray-200 rounded w-full" />
      <div className="h-8 bg-gray-200 rounded w-1/3 mt-4" />
    </div>
  </div>
);

const Tours = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`${API}/api/tours`)
      .then(res => { setTours(res.data); setLoading(false); })
      .catch(() => { setError('Failed to load tours. Please try again.'); setLoading(false); });
  }, []);

  return (
    <div className="pt-24 pb-20 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <span className="text-sunset-orange font-semibold text-sm tracking-widest uppercase">Packages</span>
        <h1 className="section-title mt-2">Experience Sri Lanka</h1>
        <p className="section-subtitle">Handcrafted tour packages for every type of traveler.</p>
      </div>

      {error && (
        <div className="text-center py-16 text-red-500 bg-red-50 rounded-2xl">{error}</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading
          ? Array(6).fill(0).map((_, i) => <SkeletonCard key={i} />)
          : tours.map((tour, i) => (
            <motion.div
              key={tour._id}
              className="card group flex flex-col"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="relative overflow-hidden h-52">
                <img src={tour.image} alt={tour.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                {tour.duration && (
                  <span className="absolute top-3 right-3 bg-black/60 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
                    ⏱ {tour.duration}
                  </span>
                )}
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-playfair text-xl font-bold text-deep-navy mb-2">{tour.name}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-1 line-clamp-2">{tour.description}</p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                  <div>
                    <span className="text-xs text-gray-400 block">Starting from</span>
                    <span className="text-2xl font-bold text-sunset-orange">${tour.price}</span>
                  </div>
                  <button className="btn-primary text-sm py-2 px-5">Book Now</button>
                </div>
              </div>
            </motion.div>
          ))
        }
      </div>

      {!loading && !error && tours.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <div className="text-5xl mb-4">🗺️</div>
          <p className="text-lg">No tour packages available right now.</p>
        </div>
      )}
    </div>
  );
};

export default Tours;
