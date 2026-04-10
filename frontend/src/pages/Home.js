import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const stats = [
  { value: '500+', label: 'Happy Travelers' },
  { value: '50+', label: 'Destinations' },
  { value: '30+', label: 'Tour Packages' },
  { value: '5★', label: 'Average Rating' },
];

const features = [
  { icon: '🏖️', title: 'Pristine Beaches', desc: 'Crystal-clear waters and golden sands stretching for miles along the coast.' },
  { icon: '🏔️', title: 'Majestic Mountains', desc: 'Lush tea plantations and misty peaks in the central highlands.' },
  { icon: '🐘', title: 'Wildlife Safari', desc: 'Encounter elephants, leopards, and exotic birds in their natural habitat.' },
  { icon: '🏛️', title: 'Ancient Heritage', desc: 'UNESCO World Heritage Sites with over 2,500 years of rich history.' },
];

const highlights = [
  {
    img: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=700&q=85',
    name: 'Sigiriya Rock',
    category: 'Cultural',
    desc: 'Ancient rock fortress rising 200m above the jungle',
  },
  {
    img: 'https://images.unsplash.com/photo-1582515073490-39981397c445?auto=format&fit=crop&w=700&q=85',
    name: 'Mirissa Beach',
    category: 'Beach',
    desc: 'Crescent-shaped bay perfect for whale watching',
  },
  {
    img: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&w=700&q=85',
    name: 'Ella Hills',
    category: 'Mountains',
    desc: 'Scenic train rides through emerald tea estates',
  },
];

const testimonials = [
  { name: 'Sarah M.', country: '🇬🇧 UK', text: 'Absolutely magical trip! PearlPara handled everything perfectly. Sri Lanka exceeded every expectation.', rating: 5 },
  { name: 'James K.', country: '🇦🇺 Australia', text: 'The wildlife safari at Yala was the highlight of our lives. Incredible service from start to finish.', rating: 5 },
  { name: 'Priya R.', country: '🇮🇳 India', text: 'From Sigiriya to Galle, every destination was breathtaking. Highly recommend PearlPara Travels!', rating: 5 },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const Home = () => {
  return (
    <div>
      {/* ── Hero ── */}
      <section
        className="relative h-screen bg-cover bg-center flex items-center justify-center text-center text-white overflow-hidden"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=1920&q=90')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/35 to-black/65" />

        <motion.div
          className="relative z-10 max-w-3xl px-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.span
            variants={itemVariants}
            className="inline-block bg-sunset-orange text-white text-xs font-semibold px-5 py-2 rounded-full mb-6 tracking-widest uppercase shadow-lg"
          >
            ✈ Welcome to Sri Lanka
          </motion.span>

          <motion.h1
            variants={itemVariants}
            className="font-playfair text-5xl md:text-7xl font-bold mb-5 leading-tight"
          >
            Discover the{' '}
            <span className="text-gold italic">Pearl</span>{' '}
            of Paradise
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-white/85 mb-10 max-w-xl mx-auto leading-relaxed"
          >
            From pristine beaches to ancient temples — experience Sri Lanka's magic with PearlPara Travels.
          </motion.p>

          <motion.div variants={itemVariants} className="flex gap-4 justify-center flex-wrap">
            <Link to="/destinations" className="btn-primary no-underline text-base px-10 py-4">
              Explore Destinations
            </Link>
            <Link to="/tours" className="btn-outline no-underline text-base px-10 py-4">
              View Packages
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-70">
          <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2.5 bg-white rounded-full" />
          </div>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section className="bg-ocean-blue text-white py-10">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map(({ value, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <div className="font-playfair text-4xl font-bold text-gold">{value}</div>
              <div className="text-sm text-white/75 mt-1 font-medium">{label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Welcome ── */}
      <section className="py-20 px-6 text-center max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sunset-orange font-semibold text-sm tracking-widest uppercase">Why Sri Lanka?</span>
          <h2 className="section-title mt-3">The Island That Has Everything</h2>
          <p className="section-subtitle">
            Sri Lanka packs extraordinary diversity into a compact island — ancient ruins, misty highlands,
            wildlife, and some of the world's finest beaches, all within a few hours of each other.
          </p>
        </motion.div>
      </section>

      {/* ── Features Grid ── */}
      <section className="pb-20 px-6 max-w-6xl mx-auto">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map(({ icon, title, desc }) => (
            <motion.div
              key={title}
              variants={itemVariants}
              className="bg-white rounded-2xl p-8 text-center shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 transform border border-gray-100 group"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300 inline-block">{icon}</div>
              <h3 className="font-playfair text-xl font-semibold text-deep-navy mb-2">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Destination Highlights ── */}
      <section className="py-20 bg-sandy-beige px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-sunset-orange font-semibold text-sm tracking-widest uppercase">Top Picks</span>
            <h2 className="section-title mt-3">Must-Visit Destinations</h2>
            <p className="section-subtitle">Iconic places that define the Sri Lankan experience.</p>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {highlights.map(({ img, name, category, desc }) => (
              <motion.div key={name} variants={itemVariants} className="card group cursor-pointer">
                <div className="relative overflow-hidden h-64">
                  <img
                    src={img}
                    alt={name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <span className="absolute top-4 left-4 bg-sunset-orange text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {category}
                  </span>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-playfair text-xl font-bold">{name}</h3>
                    <p className="text-white/75 text-xs mt-1">{desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-12">
            <Link to="/destinations" className="btn-primary no-underline">
              View All Destinations →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-sunset-orange font-semibold text-sm tracking-widest uppercase">Reviews</span>
          <h2 className="section-title mt-3">What Our Travelers Say</h2>
        </div>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {testimonials.map(({ name, country, text, rating }) => (
            <motion.div
              key={name}
              variants={itemVariants}
              className="bg-white rounded-2xl p-8 shadow-md border border-gray-100 hover:shadow-xl transition-shadow"
            >
              <div className="flex gap-0.5 mb-4">
                {Array(rating).fill(0).map((_, i) => (
                  <span key={i} className="text-gold text-lg">★</span>
                ))}
              </div>
              <p className="text-gray-600 leading-relaxed mb-6 italic">"{text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-ocean-blue/10 flex items-center justify-center font-bold text-ocean-blue">
                  {name[0]}
                </div>
                <div>
                  <p className="font-semibold text-deep-navy text-sm">{name}</p>
                  <p className="text-gray-400 text-xs">{country}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── CTA Banner ── */}
      <section
        className="relative py-28 bg-cover bg-center text-white text-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1920&q=85')" }}
      >
        <div className="absolute inset-0 bg-ocean-dark/80" />
        <motion.div
          className="relative z-10 max-w-2xl mx-auto px-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-5">
            Ready for Your Sri Lanka Adventure?
          </h2>
          <p className="text-white/80 text-lg mb-10">
            Let us craft the perfect itinerary tailored just for you.
          </p>
          <Link to="/contact" className="btn-primary no-underline text-lg px-12 py-4">
            Plan My Trip →
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
