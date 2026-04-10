import React from 'react';
import { motion } from 'framer-motion';

const reasons = [
  { icon: '🌊', title: 'Diverse Landscapes', text: 'Beaches, mountains, rainforests and plains all within hours of each other.' },
  { icon: '🏛️', title: 'Rich Heritage', text: '8 UNESCO World Heritage Sites and 2,500 years of recorded history.' },
  { icon: '🦁', title: 'Unique Wildlife', text: 'Home to leopards, elephants, blue whales and 400+ bird species.' },
  { icon: '🍵', title: 'Famous Tea', text: 'Ceylon tea is world-renowned — visit the estates where it all begins.' },
  { icon: '🍛', title: 'Incredible Cuisine', text: 'Spicy curries, hoppers, kottu roti and fresh seafood await you.' },
  { icon: '🌅', title: 'Year-Round Sun', text: 'Tropical climate means there\'s always a perfect corner to visit.' },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const About = () => {
  return (
    <div>
      {/* ── Hero ── */}
      <div
        className="page-hero"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1582515073490-39981397c445?auto=format&fit=crop&w=1920&q=85')" }}
      >
        {/* Overlay as sibling div, not ::after */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
        <div className="relative z-10 pt-20 px-6">
          <motion.h1
            className="font-playfair text-5xl md:text-6xl font-bold"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            About Us
          </motion.h1>
          <motion.p
            className="text-white/80 mt-3 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Our story, mission & passion for Sri Lanka
          </motion.p>
        </div>
      </div>

      {/* ── Mission & Vision ── */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-sunset-orange font-semibold text-sm tracking-widest uppercase">Who We Are</span>
          <h2 className="section-title mt-3">Passionate About Sri Lanka</h2>
          <p className="section-subtitle">
            Founded in 2020, PearlPara Travels has been connecting the world with the wonders of Sri Lanka.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            {
              title: 'Our Mission',
              icon: '🎯',
              color: 'bg-blue-50 border-blue-100',
              text: 'To promote Sri Lanka as a premier tourist destination globally, showcasing its rich cultural heritage, natural beauty, and warm hospitality while contributing to sustainable economic development.',
            },
            {
              title: 'Our Vision',
              icon: '🌟',
              color: 'bg-orange-50 border-orange-100',
              text: 'To be the leading platform connecting international travelers with authentic Sri Lankan experiences, fostering cultural exchange and supporting local communities.',
            },
          ].map(({ title, icon, color, text }) => (
            <motion.div
              key={title}
              variants={itemVariants}
              className={`rounded-2xl p-8 border ${color} hover:shadow-xl transition-shadow`}
            >
              <div className="text-5xl mb-5">{icon}</div>
              <h3 className="font-playfair text-2xl font-bold text-deep-navy mb-3">{title}</h3>
              <p className="text-gray-600 leading-relaxed">{text}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Why Tourism Matters ── */}
      <section className="py-16 bg-deep-navy text-white px-6">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-gold font-semibold text-sm tracking-widest uppercase">Our Impact</span>
          <h2 className="font-playfair text-4xl font-bold mt-3 mb-6">Why Tourism Matters to Sri Lanka</h2>
          <p className="text-white/75 leading-relaxed text-lg">
            Tourism is a vital sector for Sri Lanka's economy, providing employment, foreign exchange earnings,
            and incentives for conservation of natural and cultural resources. By choosing PearlPara Travels,
            you're not just planning a vacation — you're contributing to a brighter future for Sri Lanka.
          </p>
          <div className="grid grid-cols-3 gap-8 mt-12">
            {[
              { value: '12%', label: 'of GDP from Tourism' },
              { value: '500K+', label: 'Jobs Supported' },
              { value: '8', label: 'UNESCO Sites' },
            ].map(({ value, label }) => (
              <div key={label}>
                <div className="font-playfair text-4xl font-bold text-gold">{value}</div>
                <div className="text-white/60 text-sm mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Visit ── */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-sunset-orange font-semibold text-sm tracking-widest uppercase">Reasons to Visit</span>
          <h2 className="section-title mt-3">Why Visit Sri Lanka?</h2>
        </div>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {reasons.map(({ icon, title, text }) => (
            <motion.div
              key={title}
              variants={itemVariants}
              className="flex items-start gap-4 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              <span className="text-3xl flex-shrink-0">{icon}</span>
              <div>
                <h4 className="font-semibold text-deep-navy mb-1">{title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{text}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
};

export default About;
