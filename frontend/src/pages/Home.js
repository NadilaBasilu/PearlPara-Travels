import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { MdBeachAccess, MdForest, MdOutlineExplore } from 'react-icons/md';
import { GiElephant, GiAncientColumns } from 'react-icons/gi';
import { FaStar, FaMapMarkerAlt, FaQuoteLeft } from 'react-icons/fa';
import { HiArrowRight } from 'react-icons/hi';
import sigiriya  from '../assets/Images/Sigiriya.jpg';
import gallefort from '../assets/Images/Gallefort.jpg';
import ninearch  from '../assets/Images/Ninearch.jpg';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const stats = [
  { value: '500+', label: 'Happy Travelers' },
  { value: '50+',  label: 'Destinations' },
  { value: '30+',  label: 'Tour Packages' },
  { value: '5.0',  label: 'Star Rating' },
];

const features = [
  { Icon: MdBeachAccess,   title: 'Pristine Beaches',  desc: 'Crystal-clear waters and golden sands stretching for miles along the coast.' },
  { Icon: MdForest,        title: 'Misty Highlands',   desc: 'Lush tea plantations and emerald peaks in the central highlands.' },
  { Icon: GiElephant,      title: 'Wildlife Safari',   desc: 'Encounter elephants, leopards, and exotic birds in their natural habitat.' },
  { Icon: GiAncientColumns,title: 'Ancient Heritage',  desc: 'UNESCO World Heritage Sites with over 2,500 years of rich history.' },
];

const highlights = [
  { img: sigiriya,  name: 'Sigiriya Rock',   category: 'Cultural',  desc: 'Ancient rock fortress rising 200m above the jungle', slug: 'sigiriya-rock-fortress' },
  { img: gallefort, name: 'Galle Fort',       category: 'Cultural',  desc: 'Stunning 17th-century Dutch colonial fort',           slug: 'galle-fort' },
  { img: ninearch,  name: 'Nine Arch Bridge', category: 'Mountains', desc: 'Iconic colonial viaduct through lush tea estates',     slug: 'nine-arch-bridge' },
];

const staticTestimonials = [
  { _id: 's1', name: 'Sarah M.',  country: 'United Kingdom', text: 'Absolutely magical trip! PearlPara handled everything perfectly. Sri Lanka exceeded every expectation.', rating: 5 },
  { _id: 's2', name: 'James K.',  country: 'Australia',      text: 'The wildlife safari at Yala was the highlight of our lives. Incredible service from start to finish.',   rating: 5 },
  { _id: 's3', name: 'Priya R.',  country: 'India',          text: 'From Sigiriya to Galle, every destination was breathtaking. Highly recommend PearlPara Travels!',        rating: 5 },
];

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.14 } } };
const item      = { hidden: { opacity: 0, y: 36 }, visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: 'easeOut' } } };

const Home = () => {
  const navigate = useNavigate();
  const [testimonials, setTestimonials] = useState([]);
  const [testimonialsLoaded, setTestimonialsLoaded] = useState(false);

  useEffect(() => {
    axios.get(`${API}/api/testimonials`)
      .then(res => {
        setTestimonials(res.data.length > 0 ? res.data : staticTestimonials);
      })
      .catch(() => {
        setTestimonials(staticTestimonials);
      })
      .finally(() => setTestimonialsLoaded(true));
  }, []);

  return (
    <div>
      {/* ── Hero ── */}
      <section
        className="relative h-screen bg-cover bg-center flex items-center justify-center text-center text-white overflow-hidden"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=1920&q=90')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-black/65" />
        <motion.div
          className="relative z-10 max-w-3xl px-6"
          variants={container} initial="hidden" animate="visible"
        >
          <motion.span variants={item}
            className="inline-block font-cinzel text-xs tracking-widest uppercase bg-sunset-orange/90 text-white px-5 py-2 rounded-full mb-7"
          >
            Welcome to Sri Lanka
          </motion.span>

          <motion.h1 variants={item}
            className="font-display text-5xl md:text-7xl font-bold mb-5 leading-tight"
          >
            Discover the{' '}
            <span className="italic text-gold-light">Pearl</span>{' '}
            of Paradise
          </motion.h1>

          <motion.p variants={item}
            className="font-sans text-lg md:text-xl text-white/80 mb-10 max-w-xl mx-auto leading-relaxed font-light"
          >
            From pristine beaches to ancient temples — experience Sri Lanka's magic with PearlPara Travels.
          </motion.p>

          <motion.div variants={item} className="flex gap-4 justify-center flex-wrap">
            <Link to="/destinations" className="btn-primary no-underline flex items-center gap-2">
              Explore Destinations <HiArrowRight />
            </Link>
            <Link to="/tours" className="btn-outline no-underline">
              View Packages
            </Link>
          </motion.div>
        </motion.div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-60">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2.5 bg-white rounded-full" />
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="bg-ocean-blue text-white py-10">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map(({ value, label }, i) => (
            <motion.div key={label}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            >
              <div className="font-display text-4xl font-bold text-gold-light">{value}</div>
              <div className="font-sans text-sm text-white/70 mt-1 tracking-wide">{label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Welcome ── */}
      <section className="py-20 px-6 text-center max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <span className="section-label">Why Sri Lanka?</span>
          <h2 className="section-title mt-3">The Island That Has Everything</h2>
          <p className="section-subtitle">
            Sri Lanka packs extraordinary diversity into a compact island — ancient ruins, misty highlands,
            wildlife, and some of the world's finest beaches, all within a few hours of each other.
          </p>
        </motion.div>
      </section>

      {/* ── Features ── */}
      <section className="pb-20 px-6 max-w-6xl mx-auto">
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={container} initial="hidden" whileInView="visible" viewport={{ once: true }}
        >
          {features.map(({ Icon, title, desc }) => (
            <motion.div key={title} variants={item}
              className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-2 transition-all duration-300 group"
            >
              <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-sandy-beige flex items-center justify-center group-hover:bg-ocean-blue/10 transition-colors">
                <Icon size={32} className="text-ocean-blue" />
              </div>
              <h3 className="font-display text-xl font-semibold text-deep-navy mb-2">{title}</h3>
              <p className="font-sans text-warm-gray text-sm leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Highlights ── */}
      <section className="py-20 bg-sandy-beige px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="section-label">Top Picks</span>
            <h2 className="section-title mt-3">Must-Visit Destinations</h2>
            <p className="section-subtitle">Iconic places that define the Sri Lankan experience.</p>
          </div>
          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={container} initial="hidden" whileInView="visible" viewport={{ once: true }}
          >
            {highlights.map(({ img, name, category, desc, slug }) => (
              <motion.div key={name} variants={item}
                className="card group cursor-pointer"
                onClick={() => navigate(`/destinations/${slug}`)}
              >
                <div className="relative overflow-hidden h-64">
                  <img src={img} alt={name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                  <span className="absolute top-4 left-4 font-cinzel text-xs tracking-widest bg-sunset-orange text-white px-3 py-1 rounded-full uppercase">
                    {category}
                  </span>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-display text-xl font-bold text-white">{name}</h3>
                    <p className="font-sans text-white/70 text-xs mt-1">{desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <div className="text-center mt-12">
            <Link to="/destinations" className="btn-primary no-underline flex items-center gap-2 w-fit mx-auto">
              View All Destinations <HiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="section-label">Traveler Stories</span>
          <h2 className="section-title mt-3">What Our Guests Say</h2>
        </div>

        {/* Skeleton while loading */}
        {!testimonialsLoaded && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1,2,3].map(i => (
              <div key={i} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 animate-pulse">
                <div className="w-6 h-6 bg-gray-200 rounded mb-4" />
                <div className="flex gap-1 mb-4">{[1,2,3,4,5].map(s => <div key={s} className="w-3 h-3 bg-gray-200 rounded" />)}</div>
                <div className="space-y-2 mb-6">
                  <div className="h-3 bg-gray-200 rounded w-full" />
                  <div className="h-3 bg-gray-200 rounded w-5/6" />
                  <div className="h-3 bg-gray-200 rounded w-4/6" />
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200" />
                  <div className="space-y-1.5">
                    <div className="h-3 bg-gray-200 rounded w-20" />
                    <div className="h-2.5 bg-gray-200 rounded w-16" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Testimonial cards */}
        {testimonialsLoaded && (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            {testimonials.map(({ _id, name, country, text, rating, tour }) => (
              <motion.div key={_id} variants={item}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <FaQuoteLeft size={24} className="text-gold mb-4 opacity-60" />
                <div className="flex gap-1 mb-4">
                  {Array(rating).fill(0).map((_, i) => <FaStar key={i} size={14} className="text-gold" />)}
                </div>
                <p className="font-sans text-warm-gray leading-relaxed mb-6 italic text-sm">"{text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-ocean-blue/10 flex items-center justify-center font-display text-lg font-bold text-ocean-blue">
                    {name[0]}
                  </div>
                  <div>
                    <p className="font-sans font-semibold text-deep-navy text-sm">{name}</p>
                    <p className="font-sans text-warm-gray text-xs flex items-center gap-1">
                      <FaMapMarkerAlt size={10} /> {country}
                    </p>
                    {tour && <p className="font-sans text-xs text-ocean-blue mt-0.5">{tour}</p>}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>

      {/* ── CTA ── */}
      <section
        className="relative py-28 bg-cover bg-center text-white text-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1920&q=85')" }}
      >
        <div className="absolute inset-0 bg-ocean-dark/80" />
        <motion.div className="relative z-10 max-w-2xl mx-auto px-6"
          initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
        >
          <span className="section-label text-gold-light block mb-4">Start Your Journey</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-5">
            Ready for Your Sri Lanka Adventure?
          </h2>
          <p className="font-sans text-white/75 text-lg mb-10 font-light">
            Let us craft the perfect itinerary tailored just for you.
          </p>
          <Link to="/contact" className="btn-primary no-underline text-base px-12 py-4 flex items-center gap-2 w-fit mx-auto">
            Plan My Trip <HiArrowRight />
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
