import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiClock, FiUsers, FiArrowRight } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';
import toursData from '../data/tours';

const filters = [
  { key: 'all',       label: 'All Packages' },
  { key: 'beach',     label: 'Beach' },
  { key: 'cultural',  label: 'Cultural' },
  { key: 'wildlife',  label: 'Wildlife' },
  { key: 'nature',    label: 'Nature' },
  { key: 'honeymoon', label: 'Honeymoon' },
];

const badgeColors = {
  'Most Popular': 'bg-ocean-blue text-white',
  "Editor's Choice": 'bg-deep-navy text-white',
  'Thrilling':    'bg-red-500 text-white',
  'Scenic':       'bg-palm-green text-white',
  'Romantic':     'bg-pink-500 text-white',
  'Best Value':   'bg-gold text-deep-navy',
};

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.09 } } };
const item      = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

const Tours = () => {
  const [active, setActive] = useState('all');
  const navigate = useNavigate();

  const filtered = active === 'all' ? toursData : toursData.filter(t => t.type === active);

  return (
    <div>
      {/* ── Hero ── */}
      <div
        className="page-hero"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1920&q=85')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/50" />
        <div className="relative z-10 pt-20 px-6">
          <motion.p className="section-label text-gold-light mb-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            Handcrafted Experiences
          </motion.p>
          <motion.h1
            className="font-display text-5xl md:text-6xl font-bold"
            initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          >
            Tour Packages
          </motion.h1>
          <motion.p
            className="font-sans text-white/75 mt-3 text-lg font-light"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          >
            Carefully crafted journeys for every type of traveler
          </motion.p>
        </div>
      </div>

      <div className="py-16 px-6 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <span className="section-label">Choose Your Journey</span>
          <h2 className="section-title mt-2">Find Your Perfect Package</h2>
          <p className="section-subtitle">From wildlife safaris to romantic escapes — we have a tour for every dream.</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center gap-3 mb-14 flex-wrap">
          {filters.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActive(key)}
              className={`font-sans text-sm font-medium px-6 py-2.5 rounded-full border transition-all duration-200 ${
                active === key
                  ? 'bg-ocean-blue text-white border-ocean-blue shadow-md scale-105'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-ocean-blue hover:text-ocean-blue'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={container} initial="hidden" animate="visible"
          >
            {filtered.map(tour => (
              <motion.div
                key={tour.id}
                variants={item}
                className="card group flex flex-col cursor-pointer"
                onClick={() => navigate(`/tours/${tour.slug}`)}
              >
                {/* Image */}
                <div className="relative overflow-hidden h-56">
                  <img
                    src={tour.image}
                    alt={tour.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                  {/* Badge */}
                  <span className={`absolute top-3 left-3 font-cinzel text-xs font-semibold px-3 py-1 rounded-full tracking-wide ${badgeColors[tour.badge] || 'bg-sunset-orange text-white'}`}>
                    {tour.badge}
                  </span>

                  {/* Duration */}
                  <span className="absolute top-3 right-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full font-sans">
                    <FiClock size={11} /> {tour.duration}
                  </span>

                  {/* Type tag */}
                  <span className="absolute bottom-3 left-3 font-cinzel text-xs tracking-widest uppercase text-white/80">
                    {tour.type}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-display text-xl font-bold text-deep-navy mb-1">{tour.name}</h3>
                  <p className="font-sans text-warm-gray text-xs italic mb-3">{tour.tagline}</p>
                  <p className="font-sans text-gray-500 text-sm leading-relaxed line-clamp-2 mb-4 flex-1">
                    {tour.description}
                  </p>

                  {/* Meta row */}
                  <div className="flex items-center gap-4 mb-4 text-xs text-warm-gray font-sans">
                    <span className="flex items-center gap-1.5"><FiUsers size={12} /> {tour.groupSize}</span>
                    <span className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => <FaStar key={i} size={10} className="text-gold" />)}
                    </span>
                    <span className="font-medium text-palm-green capitalize">{tour.bestFor.split(',')[0]}</span>
                  </div>

                  {/* Includes preview */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {tour.includes.slice(0, 3).map(inc => (
                      <span key={inc} className="font-sans text-xs bg-sandy-beige text-warm-gray px-2.5 py-1 rounded-full">
                        ✓ {inc}
                      </span>
                    ))}
                  </div>

                  {/* Price + CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                    <div>
                      <span className="font-sans text-xs text-gray-400 block">From</span>
                      <span className="font-display text-2xl font-bold text-sunset-orange">${tour.price}</span>
                      <span className="font-sans text-xs text-gray-400 ml-1">/ person</span>
                    </div>
                    <button
                      className="flex items-center gap-2 btn-primary text-sm py-2.5 px-5"
                      onClick={e => { e.stopPropagation(); navigate(`/tours/${tour.slug}`); }}
                    >
                      View Details <FiArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <p className="font-display text-2xl mb-2">No packages found</p>
            <button onClick={() => setActive('all')} className="btn-primary mt-4 text-sm">Show All</button>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-20 bg-sandy-beige rounded-3xl p-10 md:p-14 text-center">
          <span className="section-label">Custom Packages</span>
          <h3 className="font-display text-3xl md:text-4xl font-bold text-deep-navy mt-3 mb-4">
            Can't Find What You're Looking For?
          </h3>
          <p className="font-sans text-warm-gray text-lg mb-8 max-w-xl mx-auto">
            We specialise in bespoke itineraries. Tell us your dream trip and we'll craft a personalised package just for you.
          </p>
          <button
            className="btn-primary flex items-center gap-2 mx-auto"
            onClick={() => navigate('/contact')}
          >
            Request Custom Package <FiArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tours;
