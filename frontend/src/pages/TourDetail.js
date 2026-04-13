import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { FiClock, FiUsers, FiArrowRight, FiArrowLeft, FiCheck, FiX } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';
import { MdBeachAccess, MdForest, MdOutlineExplore } from 'react-icons/md';
import { GiElephant, GiAncientColumns, GiWaveSurfer } from 'react-icons/gi';
import { BsCamera, BsHeart, BsTrainFront, BsBinoculars } from 'react-icons/bs';
import TourRouteMap from '../components/TourRouteMap';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const iconMap = {
  wave:     <GiWaveSurfer size={26} className="text-ocean-blue" />,
  anchor:   <MdOutlineExplore size={26} className="text-ocean-blue" />,
  sun:      <MdBeachAccess size={26} className="text-ocean-blue" />,
  fish:     <MdOutlineExplore size={26} className="text-ocean-blue" />,
  castle:   <GiAncientColumns size={26} className="text-ocean-blue" />,
  temple:   <GiAncientColumns size={26} className="text-ocean-blue" />,
  ruins:    <GiAncientColumns size={26} className="text-ocean-blue" />,
  fort:     <GiAncientColumns size={26} className="text-ocean-blue" />,
  paw:      <GiElephant size={26} className="text-ocean-blue" />,
  elephant: <GiElephant size={26} className="text-ocean-blue" />,
  bird:     <BsBinoculars size={26} className="text-ocean-blue" />,
  jeep:     <MdOutlineExplore size={26} className="text-ocean-blue" />,
  train:    <BsTrainFront size={26} className="text-ocean-blue" />,
  bridge:   <BsCamera size={26} className="text-ocean-blue" />,
  tea:      <MdForest size={26} className="text-ocean-blue" />,
  hike:     <MdForest size={26} className="text-ocean-blue" />,
  heart:    <BsHeart size={26} className="text-ocean-blue" />,
  spa:      <BsHeart size={26} className="text-ocean-blue" />,
  sunset:   <MdBeachAccess size={26} className="text-ocean-blue" />,
  boat:     <GiWaveSurfer size={26} className="text-ocean-blue" />,
  globe:    <MdOutlineExplore size={26} className="text-ocean-blue" />,
  camera:   <BsCamera size={26} className="text-ocean-blue" />,
  culture:  <GiAncientColumns size={26} className="text-ocean-blue" />,
  wildlife: <GiElephant size={26} className="text-ocean-blue" />,
};

const badgeColors = {
  'Most Popular':    'bg-ocean-blue text-white',
  "Editor's Choice": 'bg-deep-navy text-white',
  'Thrilling':       'bg-red-500 text-white',
  'Scenic':          'bg-palm-green text-white',
  'Romantic':        'bg-pink-500 text-white',
  'Best Value':      'bg-gold text-deep-navy',
};

const TourDetail = () => {
  const { slug }    = useParams();
  const navigate    = useNavigate();
  const [tour,      setTour]      = useState(null);
  const [otherTours,setOtherTours]= useState([]);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState(null);
  const [lightbox,  setLightbox]  = useState(null);
  const [activeTab, setActiveTab] = useState('itinerary');

  useEffect(() => {
    setLoading(true);
    // Fetch the specific tour by slug
    axios.get(`${API}/api/tours/${slug}`)
      .then(res => {
        setTour(res.data);
        setLoading(false);
        // Fetch other tours for sidebar
        return axios.get(`${API}/api/tours`);
      })
      .then(res => {
        setOtherTours(res.data.filter(t => t.slug !== slug).slice(0, 3));
      })
      .catch(() => { setError('Tour not found.'); setLoading(false); });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center gap-3">
        <div className="w-10 h-10 rounded-full border-4 border-ocean-blue/20 border-t-ocean-blue animate-spin" />
        <p className="font-sans text-warm-gray">Loading tour...</p>
      </div>
    );
  }

  if (error || !tour) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24">
        <p className="font-display text-4xl font-bold text-deep-navy mb-4">Package Not Found</p>
        <p className="font-sans text-warm-gray mb-6">This tour package doesn't exist or may have been removed.</p>
        <Link to="/tours" className="btn-primary no-underline">Back to Tours</Link>
      </div>
    );
  }

  return (
    <div>
      {/* ── Hero ── */}
      <div
        className="relative h-screen bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: `url(${tour.image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/30 to-black/70" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6 pt-20">
          <motion.div initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            {tour.badge && (
              <span className={`inline-block font-cinzel text-xs tracking-widest px-4 py-1.5 rounded-full mb-5 uppercase ${badgeColors[tour.badge] || 'bg-sunset-orange text-white'}`}>
                {tour.badge}
              </span>
            )}
            <h1 className="font-display text-5xl md:text-7xl font-bold mb-4 leading-tight drop-shadow-lg">
              {tour.name}
            </h1>
            {tour.tagline && (
              <p className="font-display text-xl md:text-2xl text-gold-light italic mb-6">{tour.tagline}</p>
            )}
            <div className="flex items-center justify-center gap-6 text-sm text-white/80 font-sans flex-wrap">
              {tour.duration  && <span className="flex items-center gap-2"><FiClock size={14} /> {tour.duration}</span>}
              {tour.groupSize && <span className="flex items-center gap-2"><FiUsers size={14} /> {tour.groupSize}</span>}
              <span className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => <FaStar key={i} size={12} className="text-gold" />)}
              </span>
            </div>
          </motion.div>
        </div>
        <button
          onClick={() => navigate('/tours')}
          className="absolute top-24 left-6 flex items-center gap-2 text-white/80 hover:text-white font-sans text-sm transition-colors"
        >
          <FiArrowLeft size={16} /> All Packages
        </button>
      </div>

      {/* ── Price Bar ── */}
      <div className="bg-deep-navy text-white py-6 sticky top-0 z-40 shadow-lg">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-8 flex-wrap justify-center">
            {[
              { label: 'Duration',   value: tour.duration },
              { label: 'Group Size', value: tour.groupSize },
              { label: 'Best For',   value: tour.bestFor?.split(',')[0] },
            ].filter(x => x.value).map(({ label, value }) => (
              <div key={label} className="text-center">
                <p className="font-cinzel text-xs tracking-widest text-white/50 uppercase">{label}</p>
                <p className="font-sans text-sm font-medium mt-0.5">{value}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-5">
            <div className="text-right">
              <p className="font-sans text-xs text-white/50">From</p>
              <p className="font-display text-3xl font-bold text-gold-light">
                ${tour.price} <span className="font-sans text-sm font-normal text-white/50">/ person</span>
              </p>
            </div>
            <Link to="/contact" className="btn-primary no-underline flex items-center gap-2 whitespace-nowrap">
              Book Now <FiArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* ── Main Content ── */}
          <div className="lg:col-span-2 space-y-14">

            {/* Overview */}
            <motion.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <span className="section-label">Overview</span>
              <h2 className="font-display text-3xl font-bold text-deep-navy mt-2 mb-4">{tour.name}</h2>
              <p className="font-sans text-warm-gray leading-relaxed text-lg">{tour.description}</p>
            </motion.section>

            {/* Gallery */}
            {tour.gallery?.length > 0 && (
              <motion.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <span className="section-label">Photos</span>
                <h3 className="font-display text-2xl font-bold text-deep-navy mt-2 mb-5">Tour Gallery</h3>
                <div className="grid grid-cols-3 gap-3">
                  {tour.gallery.map((img, i) => (
                    <div
                      key={i}
                      className={`relative overflow-hidden rounded-xl cursor-pointer group ${i === 0 ? 'col-span-2 row-span-2' : ''}`}
                      style={{ height: i === 0 ? '320px' : '152px' }}
                      onClick={() => setLightbox(img)}
                    >
                      <img src={img} alt={`${tour.name} ${i + 1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors flex items-center justify-center">
                        <span className="text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity">⊕</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Route Map */}
            {tour.routeStops?.length > 0 && (
              <motion.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <span className="section-label">Route</span>
                <h3 className="font-display text-2xl font-bold text-deep-navy mt-2 mb-2">Tour Route Map</h3>
                <p className="font-sans text-warm-gray text-sm mb-6">Interactive map showing your journey across Sri Lanka.</p>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                  <div className="bg-sandy-beige rounded-2xl p-5">
                    <p className="font-cinzel text-xs tracking-widest uppercase text-warm-gray mb-4">Journey Stops</p>
                    <div className="flex gap-4 mb-5 text-xs font-sans">
                      {[['bg-palm-green','Start'],['bg-ocean-blue','Stop'],['bg-gold','End']].map(([c,l]) => (
                        <span key={l} className="flex items-center gap-1.5">
                          <span className={`w-3 h-3 rounded-full ${c} inline-block`} /> {l}
                        </span>
                      ))}
                    </div>
                    {tour.routeStops.map((stop, i) => {
                      const color = i === 0 ? '#2d7a4f' : i === tour.routeStops.length - 1 ? '#c9a84c' : '#1a6eb5';
                      return (
                        <div key={i} className="flex gap-3 items-start">
                          <div className="flex flex-col items-center flex-shrink-0">
                            <div className="w-7 h-7 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-sm" style={{ background: color }}>
                              {i + 1}
                            </div>
                            {i < tour.routeStops.length - 1 && <div className="w-px h-6 mt-1" style={{ background: color + '55' }} />}
                          </div>
                          <div className="pb-2">
                            <p className="font-sans font-semibold text-deep-navy text-sm leading-tight">{stop.name}</p>
                            <p className="font-sans text-xs text-warm-gray mt-0.5">
                              {typeof stop.day === 'number' ? `Day ${stop.day}` : `Days ${stop.day}`}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="lg:col-span-2">
                    <TourRouteMap stops={tour.routeStops} />
                  </div>
                </div>
              </motion.section>
            )}

            {/* Highlights */}
            {tour.highlights?.length > 0 && (
              <motion.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <span className="section-label">Experiences</span>
                <h3 className="font-display text-2xl font-bold text-deep-navy mt-2 mb-6">Tour Highlights</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {tour.highlights.map(({ icon, title, desc }, i) => (
                    <div key={i} className="flex gap-4 bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                      <div className="w-12 h-12 bg-sandy-beige rounded-xl flex items-center justify-center flex-shrink-0">
                        {iconMap[icon] || <MdOutlineExplore size={26} className="text-ocean-blue" />}
                      </div>
                      <div>
                        <h4 className="font-display text-base font-bold text-deep-navy mb-1">{title}</h4>
                        <p className="font-sans text-warm-gray text-sm leading-relaxed">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Tabs: Itinerary / Includes */}
            {(tour.itinerary?.length > 0 || tour.includes?.length > 0) && (
              <motion.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <div className="flex gap-2 mb-6 border-b border-gray-200">
                  {['itinerary', 'includes'].map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`font-cinzel text-xs tracking-widest uppercase px-5 py-3 border-b-2 transition-colors -mb-px ${
                        activeTab === tab
                          ? 'border-sunset-orange text-sunset-orange'
                          : 'border-transparent text-warm-gray hover:text-deep-navy'
                      }`}
                    >
                      {tab === 'itinerary' ? 'Day by Day Itinerary' : 'Inclusions'}
                    </button>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  {activeTab === 'itinerary' && (
                    <motion.div key="itinerary" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                      {tour.itinerary?.map(({ day, title, desc }, i) => (
                        <div key={i} className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div className="w-10 h-10 rounded-full bg-ocean-blue text-white font-cinzel text-xs font-bold flex items-center justify-center flex-shrink-0">
                              {typeof day === 'number' ? day : '—'}
                            </div>
                            <div className="w-px flex-1 bg-gray-200 mt-2" />
                          </div>
                          <div className="pb-6">
                            <p className="font-sans text-xs text-warm-gray uppercase tracking-wide mb-0.5">
                              {typeof day === 'number' ? `Day ${day}` : `Days ${day}`}
                            </p>
                            <h4 className="font-display text-lg font-bold text-deep-navy mb-1">{title}</h4>
                            <p className="font-sans text-warm-gray text-sm leading-relaxed">{desc}</p>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}
                  {activeTab === 'includes' && (
                    <motion.div key="includes" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div>
                          <h4 className="font-display text-lg font-bold text-deep-navy mb-4">What's Included</h4>
                          <ul className="space-y-3">
                            {tour.includes?.map((inc, i) => (
                              <li key={i} className="flex items-start gap-3 font-sans text-sm text-gray-700">
                                <FiCheck size={16} className="text-palm-green mt-0.5 flex-shrink-0" /> {inc}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-display text-lg font-bold text-deep-navy mb-4">Not Included</h4>
                          <ul className="space-y-3">
                            {tour.excludes?.map((exc, i) => (
                              <li key={i} className="flex items-start gap-3 font-sans text-sm text-gray-500">
                                <FiX size={16} className="text-red-400 mt-0.5 flex-shrink-0" /> {exc}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.section>
            )}
          </div>

          {/* ── Sidebar ── */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 sticky top-28">
              <p className="font-sans text-xs text-warm-gray mb-1">Starting from</p>
              <p className="font-display text-4xl font-bold text-sunset-orange mb-1">${tour.price}</p>
              <p className="font-sans text-xs text-warm-gray mb-6">per person, all taxes included</p>
              <div className="space-y-3 mb-6 text-sm font-sans">
                {[
                  { label: 'Duration',   value: tour.duration },
                  { label: 'Group Size', value: tour.groupSize },
                  { label: 'Best For',   value: tour.bestFor },
                ].filter(x => x.value).map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-start gap-2">
                    <span className="text-warm-gray">{label}</span>
                    <span className="text-deep-navy font-medium text-right">{value}</span>
                  </div>
                ))}
              </div>
              <Link to="/contact" className="btn-primary w-full text-center no-underline block mb-3">
                Book This Package
              </Link>
              <Link to="/contact" className="block text-center font-sans text-sm text-ocean-blue hover:underline no-underline">
                Ask a Question
              </Link>
            </div>

            {otherTours.length > 0 && (
              <div>
                <h4 className="font-display text-xl font-bold text-deep-navy mb-4">Other Packages</h4>
                <div className="space-y-3">
                  {otherTours.map(t => (
                    <div
                      key={t._id}
                      className="flex gap-3 bg-white rounded-xl p-3 border border-gray-100 cursor-pointer hover:shadow-md transition-shadow group"
                      onClick={() => navigate(`/tours/${t.slug}`)}
                    >
                      <img src={t.image} alt={t.name} className="w-16 h-16 rounded-lg object-cover flex-shrink-0 group-hover:scale-105 transition-transform duration-300" />
                      <div className="min-w-0">
                        <p className="font-display text-sm font-bold text-deep-navy leading-tight truncate">{t.name}</p>
                        <p className="font-sans text-xs text-warm-gray mt-0.5">{t.duration}</p>
                        <p className="font-display text-sm font-bold text-sunset-orange mt-1">${t.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <motion.img
              src={lightbox} alt="Tour"
              className="max-w-5xl w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl"
              initial={{ scale: 0.85 }} animate={{ scale: 1 }} exit={{ scale: 0.85 }}
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

export default TourDetail;
