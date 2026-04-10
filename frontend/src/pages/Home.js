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
  { icon: '🏖️', title: 'Pristine Beaches', desc: 'Crystal-clear waters and golden sands stretching for miles.' },
  { icon: '🏔️', title: 'Majestic Mountains', desc: 'Lush tea plantations and misty peaks in the central highlands.' },
  { icon: '🐘', title: 'Wildlife Safari', desc: 'Encounter elephants, leopards, and exotic birds in their habitat.' },
  { icon: '🏛️', title: 'Ancient Heritage', desc: 'UNESCO World Heritage Sites with 2,500 years of history.' },
];

const highlights = [
  { img: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=600&q=80', name: 'Sigiriya Rock', category: 'Cultural' },
  { img: 'https://images.unsplash.com/photo-1582515073490-39981397c445?auto=format&fit=crop&w=600&q=80', name: 'Mirissa Beach', category: 'Beach' },
  { img: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&w=600&q=80', name: 'Ella Hills', category: 'Mountains' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.6 } }),
};

const Home = () => {
  return (
    <div>
      {/* Hero */}
      <section
        className="relative h-screen bg-cover bg-center flex items-center justify-center text-center text-white overflow-hidden"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=1600&q=90')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <motion.div
          className="relative z-10 max-w-3xl px-6"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <motion.span
            className="inline-block bg-sunset-orange/90 text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-6 tracking-widest uppercase"
            variants={fadeUp} custom={0}
          >
            Welcome to Sri Lanka
          </motion.span>
          <motion.h1
            className="font-playfair text-5xl md:text-7xl font-bold mb-4 leading-tight"
            variants={fadeUp} custom={1}
          >
            Discover the <span className="text-gold">Pearl</span> of Paradise
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-white/85 mb-10 max-w-xl mx-auto leading-relaxed"
            variants={fadeUp} custom={2}
          >
            From pristine beaches to ancient temples — experience Sri Lanka's magic with PearlPara Travels.
          </motion.p>
          <motion.div className="flex gap-4 justify-center flex-wrap" variants={fadeUp} custom={3}>
            <Link to="/destinations" className="btn-primary no-underline">Explore Destinations</Link>
            <Link to="/tours" className="btn-outline no-underline">View Tour Packages</Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white/70 rounded-full" />
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-ocean-blue text-white py-8">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map(({ value, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="font-playfair text-3xl font-bold text-gold">{value}</div>
              <div className="text-sm text-white/80 mt-1">{label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-20 px-6 text-center max-w-3xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <span className="text-sunset-orange font-semibold text-sm tracking-widest uppercase">Why Sri Lanka?</span>
          <h2 className="section-title mt-2">The Island That Has Everything</h2>
          <p className="section-subtitle">
            Sri Lanka packs an extraordinary diversity of experiences into a compact island — ancient ruins, misty highlands, wildlife, and some of the world's finest beaches, all within a few hours of each other.
          </p>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="pb-20 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map(({ icon, title, desc }, i) => (
            <motion.div
              key={title}
              className="bg-white rounded-2xl p-8 text-center shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 transform border border-gray-100"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              variants={fadeUp}
            >
              <div className="text-5xl mb-4">{icon}</div>
              <h3 className="font-playfair text-xl font-semibold text-deep-navy mb-2">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Destination Highlights */}
      <section className="py-20 bg-sandy-beige px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-sunset-orange font-semibold text-sm tracking-widest uppercase">Top Picks</span>
            <h2 className="section-title mt-2">Must-Visit Destinations</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {highlights.map(({ img, name, category }, i) => (
              <motion.div
                key={name}
                className="card group cursor-pointer"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
              >
                <div className="relative overflow-hidden h-64">
                  <img src={img} alt={name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute top-4 left-4 bg-sunset-orange text-white text-xs font-semibold px-3 py-1 rounded-full">{category}</span>
                  <h3 className="absolute bottom-4 left-4 text-white font-playfair text-xl font-bold">{name}</h3>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/destinations" className="btn-primary no-underline">View All Destinations</Link>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section
        className="relative py-24 bg-cover bg-center text-white text-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1600&q=80')" }}
      >
        <div className="absolute inset-0 bg-ocean-dark/80" />
        <div className="relative z-10 max-w-2xl mx-auto px-6">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-4">Ready for Your Sri Lanka Adventure?</h2>
          <p className="text-white/80 text-lg mb-8">Let us craft the perfect itinerary tailored just for you.</p>
          <Link to="/contact" className="btn-primary no-underline text-lg px-10 py-4">Plan My Trip</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
