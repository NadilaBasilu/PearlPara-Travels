import React from 'react';
import { motion } from 'framer-motion';
import sigiriya from '../assets/Images/Sigiriya.jpg';
import gallefort from '../assets/Images/Gallefort.jpg';
import ninearch from '../assets/Images/Ninearch.jpg';

const reasons = [
  { icon: '🌊', title: 'Diverse Landscapes',   text: 'Beaches, mountains, rainforests and plains all within hours of each other.' },
  { icon: '🏛️', title: 'Rich Heritage',         text: '8 UNESCO World Heritage Sites and 2,500 years of recorded history.' },
  { icon: '🦁', title: 'Unique Wildlife',        text: 'Home to leopards, elephants, blue whales and 400+ bird species.' },
  { icon: '🍵', title: 'Famous Ceylon Tea',      text: 'World-renowned tea estates you can visit and taste straight from the source.' },
  { icon: '🍛', title: 'Incredible Cuisine',     text: 'Spicy curries, hoppers, kottu roti and fresh seafood at every turn.' },
  { icon: '🌅', title: 'Year-Round Sunshine',    text: 'Tropical climate means there\'s always a perfect corner of the island to visit.' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const About = () => {
  return (
    <div>
      {/* ── Hero ── */}
      <div
        className="page-hero"
        style={{ backgroundImage: `url(${sigiriya})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/65" />
        <div className="relative z-10 pt-20 px-6 text-center">
          <motion.span
            className="inline-block font-cinzel text-xs tracking-widest uppercase bg-sunset-orange/90 text-white px-5 py-2 rounded-full mb-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Our Story
          </motion.span>
          <motion.h1
            className="font-display text-5xl md:text-6xl font-bold text-white"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            About PearlPara Travels
          </motion.h1>
          <motion.p
            className="font-sans text-white/75 mt-4 text-lg font-light max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.6 }}
          >
            Passionate about Sri Lanka — crafting unforgettable journeys since 2020
          </motion.p>
        </div>
      </div>

      {/* ── Mission & Vision ── */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="section-label">Who We Are</span>
          <h2 className="section-title mt-3">Passionate About Sri Lanka</h2>
          <p className="section-subtitle">Founded in 2020, PearlPara Travels has been connecting the world with the wonders of Sri Lanka.</p>
        </div>

        {/* Image + Text split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            className="relative rounded-3xl overflow-hidden shadow-xl"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <img src={gallefort} alt="Galle Fort" className="w-full h-80 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <span className="absolute bottom-5 left-5 font-cinzel text-white text-sm tracking-widest uppercase">Galle Fort, Sri Lanka</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="section-label">Our Mission</span>
            <h3 className="font-display text-3xl font-bold text-deep-navy mt-2 mb-4">Showcasing Sri Lanka to the World</h3>
            <p className="font-sans text-warm-gray leading-relaxed text-lg">
              To promote Sri Lanka as a premier tourist destination globally, showcasing its rich cultural heritage,
              natural beauty, and warm hospitality while contributing to sustainable economic development.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="order-2 lg:order-1"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="section-label">Our Vision</span>
            <h3 className="font-display text-3xl font-bold text-deep-navy mt-2 mb-4">Connecting Travelers with Authentic Experiences</h3>
            <p className="font-sans text-warm-gray leading-relaxed text-lg">
              To be the leading platform connecting international travelers with authentic Sri Lankan experiences,
              fostering cultural exchange and supporting local communities across the island.
            </p>
          </motion.div>
          <motion.div
            className="relative rounded-3xl overflow-hidden shadow-xl order-1 lg:order-2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <img src={ninearch} alt="Nine Arch Bridge" className="w-full h-80 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <span className="absolute bottom-5 left-5 font-cinzel text-white text-sm tracking-widest uppercase">Nine Arch Bridge, Ella</span>
          </motion.div>
        </div>
      </section>

      {/* ── Why Tourism Matters ── */}
      <section className="py-20 bg-deep-navy text-white px-6">
        <div className="max-w-5xl mx-auto text-center">
          <span className="font-cinzel text-xs tracking-widest uppercase text-gold">Our Impact</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 mb-6">Why Tourism Matters to Sri Lanka</h2>
          <p className="font-sans text-white/70 leading-relaxed text-lg max-w-3xl mx-auto">
            Tourism is a vital sector for Sri Lanka's economy, providing employment, foreign exchange earnings,
            and incentives for conservation of natural and cultural resources. By choosing PearlPara Travels,
            you're not just planning a vacation — you're contributing to a brighter future for Sri Lanka.
          </p>
          <div className="grid grid-cols-3 gap-8 mt-14 max-w-2xl mx-auto">
            {[
              { value: '12%',  label: 'of GDP from Tourism' },
              { value: '500K+',label: 'Jobs Supported' },
              { value: '8',    label: 'UNESCO Sites' },
            ].map(({ value, label }) => (
              <div key={label}>
                <div className="font-display text-4xl font-bold text-gold-light">{value}</div>
                <div className="font-sans text-white/55 text-sm mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Visit ── */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="section-label">Reasons to Visit</span>
          <h2 className="section-title mt-3">Why Visit Sri Lanka?</h2>
          <p className="section-subtitle">An island that packs a lifetime of experiences into one destination.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map(({ icon, title, text }, i) => (
            <motion.div
              key={title}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              variants={fadeUp}
            >
              <div className="w-12 h-12 rounded-xl bg-sandy-beige flex items-center justify-center mb-4">
                <span className="text-2xl">{icon}</span>
              </div>
              <h4 className="font-display text-lg font-bold text-deep-navy mb-2">{title}</h4>
              <p className="font-sans text-warm-gray text-sm leading-relaxed">{text}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
