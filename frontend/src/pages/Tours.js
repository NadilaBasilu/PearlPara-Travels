import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const SkeletonCard = () => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-md animate-pulse">
    <div className="h-56 bg-gray-200" />
    <div className="p-5 space-y-3">
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-3 bg-gray-200 rounded w-full" />
      <div className="h-3 bg-gray-200 rounded w-5/6" />
      <div className="flex justify-between items-center mt-4">
        <div className="h-8 bg-gray-200 rounded w-1/4" />
        <div className="h-9 bg-gray-200 rounded-full w-1/3" />
      </div>
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
    <div>
      {/* ── Page Hero ── */}
      <div
        className="page-hero"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1920&q=85')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
        <div className="relative z-10 pt-20 px-6">
          <motion.h1
            className="font-playfair text-5xl md:text-6xl font-bold"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Tour Packages
          </motion.h1>
          <motion.p
            className="text-white/80 mt-3 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Handcrafted experiences for every type of traveler
          </motion.p>
        </div>
      </div>

      <div className="py-16 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-sunset-orange font-semibold text-sm tracking-widest uppercase">Packages</span>
          <h2 className="section-title mt-2">Experience Sri Lanka</h2>
          <p className="section-subtitle">All-inclusive packages with expert local guides.</p>
        </div>

        {error && (
          <div className="text-center py-16 text-red-500 bg-red-50 rounded-2xl border border-red-100">
            <div className="text-4xl mb-3">⚠️</div>
            <p>{error}</p>
          </div>
        )}

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {loading
            ? Array(6).fill(0).map((_, i) => <SkeletonCard key={i} />)
            : tours.map(tour => (
              <motion.div key={tour._id} variants={itemVariants} className="card group flex flex-col">
                <div className="relative overflow-hidden h-56">
                  <img
                    src={tour.image}
                    alt={tour.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  {tour.duration && (
                    <span className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full font-medium">
                      ⏱ {tour.duration}
                    </span>
                  )}
                  {tour.featured && (
                    <span className="absolute top-3 left-3 bg-gold text-deep-navy text-xs font-bold px-3 py-1 rounded-full">
                      ★ Featured
                    </span>
                  )}
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-playfair text-xl font-bold text-deep-navy mb-2">{tour.name}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-4 flex-1">
                    {tour.description}
                  </p>

                  {/* Includes */}
                  <div className="flex gap-3 mb-4 flex-wrap">
                    {['🏨 Hotel', '🚌 Transport', '🎯 Guide'].map(item => (
                      <span key={item} className="text-xs bg-gray-50 border border-gray-100 text-gray-500 px-2.5 py-1 rounded-full">
                        {item}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <span className="text-xs text-gray-400 block">Starting from</span>
                      <span className="text-2xl font-bold text-sunset-orange">${tour.price}</span>
                      <span className="text-xs text-gray-400 ml-1">/ person</span>
                    </div>
                    <button className="btn-primary text-sm py-2.5 px-5">Book Now</button>
                  </div>
                </div>
              </motion.div>
            ))
          }
        </motion.div>

        {!loading && !error && tours.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <div className="text-6xl mb-4">🗺️</div>
            <p className="text-xl font-medium">No tour packages available right now.</p>
            <p className="text-sm mt-2">Check back soon or contact us for custom packages.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tours;
