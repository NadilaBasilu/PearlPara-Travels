import React from 'react';
import { motion } from 'framer-motion';

const reasons = [
  { icon: '🌊', text: 'Diverse landscapes from beaches to mountains' },
  { icon: '🏛️', text: 'Rich cultural and historical heritage' },
  { icon: '🦁', text: 'Unique wildlife and biodiversity' },
  { icon: '🍵', text: 'World-famous tea plantations' },
  { icon: '🍛', text: 'Delicious cuisine and warm hospitality' },
  { icon: '🌅', text: 'Year-round tropical sunshine' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const About = () => {
  return (
    <div>
      {/* Hero */}
      <div
        className="page-hero"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1582515073490-39981397c445?auto=format&fit=crop&w=1600&q=80')" }}
      >
        <div className="relative z-10 pt-16">
          <h1 className="font-playfair text-5xl font-bold">About Us</h1>
          <p className="text-white/80 mt-2">Our story, mission & passion for Sri Lanka</p>
        </div>
      </div>

      {/* Mission & Vision */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-sunset-orange font-semibold text-sm tracking-widest uppercase">Who We Are</span>
          <h2 className="section-title mt-2">Passionate About Sri Lanka</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              title: 'Our Mission',
              icon: '🎯',
              text: 'To promote Sri Lanka as a premier tourist destination globally, showcasing its rich cultural heritage, natural beauty, and warm hospitality while contributing to sustainable economic development.',
            },
            {
              title: 'Our Vision',
              icon: '🌟',
              text: 'To be the leading platform connecting international travelers with authentic Sri Lankan experiences, fostering cultural exchange and supporting local communities.',
            },
          ].map(({ title, icon, text }, i) => (
            <motion.div
              key={title}
              className="bg-white rounded-2xl p-8 shadow-md border border-gray-100 hover:shadow-xl transition-shadow"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              variants={fadeUp}
            >
              <div className="text-4xl mb-4">{icon}</div>
              <h3 className="font-playfair text-2xl font-bold text-deep-navy mb-3">{title}</h3>
              <p className="text-gray-600 leading-relaxed">{text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Tourism Matters */}
      <section className="py-16 bg-sandy-beige px-6">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-sunset-orange font-semibold text-sm tracking-widest uppercase">Impact</span>
          <h2 className="section-title mt-2">Why Tourism Matters to Sri Lanka</h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            Tourism is a vital sector for Sri Lanka's economy, providing employment, foreign exchange earnings, and incentives for conservation of natural and cultural resources. By choosing PearlPara Travels, you're contributing to a brighter future for Sri Lanka.
          </p>
        </div>
      </section>

      {/* Why Visit */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-sunset-orange font-semibold text-sm tracking-widest uppercase">Reasons to Visit</span>
          <h2 className="section-title mt-2">Why Visit Sri Lanka?</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map(({ icon, text }, i) => (
            <motion.div
              key={text}
              className="flex items-start gap-4 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              variants={fadeUp}
            >
              <span className="text-3xl">{icon}</span>
              <p className="text-gray-700 font-medium leading-relaxed">{text}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
