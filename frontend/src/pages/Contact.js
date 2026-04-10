import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const contactInfo = [
  { icon: '📧', label: 'Email', value: 'info@pearlparatravels.com', href: 'mailto:info@pearlparatravels.com' },
  { icon: '📞', label: 'Phone', value: '+94 11 123 4567', href: 'tel:+94111234567' },
  { icon: '📍', label: 'Address', value: 'Colombo 03, Sri Lanka', href: '#' },
  { icon: '🕐', label: 'Working Hours', value: 'Mon – Sat: 9am – 6pm', href: '#' },
];

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState(null);

  const handleChange = e => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('loading');
    try {
      await axios.post(`${API}/api/contact`, formData);
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <div>
      {/* ── Page Hero ── */}
      <div
        className="page-hero"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1920&q=85')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
        <div className="relative z-10 pt-20 px-6">
          <motion.h1
            className="font-playfair text-5xl md:text-6xl font-bold"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Contact Us
          </motion.h1>
          <motion.p
            className="text-white/80 mt-3 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            We'd love to help plan your perfect Sri Lanka trip
          </motion.p>
        </div>
      </div>

      <div className="py-16 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-sunset-orange font-semibold text-sm tracking-widest uppercase">Get In Touch</span>
          <h2 className="section-title mt-2">Let's Plan Your Adventure</h2>
          <p className="section-subtitle">Have questions about your trip? Our team responds within 24 hours.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* ── Form ── */}
          <motion.div
            className="lg:col-span-3 bg-white rounded-2xl shadow-md p-8 border border-gray-100"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="font-playfair text-2xl font-bold text-deep-navy mb-6">Send a Message</h3>

            {status === 'success' && (
              <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl p-4 mb-6 flex items-center gap-3">
                <span className="text-2xl">✅</span>
                <div>
                  <p className="font-semibold">Message sent successfully!</p>
                  <p className="text-sm text-green-600">We'll get back to you within 24 hours.</p>
                </div>
              </div>
            )}
            {status === 'error' && (
              <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-4 mb-6 flex items-center gap-3">
                <span className="text-2xl">❌</span>
                <div>
                  <p className="font-semibold">Something went wrong.</p>
                  <p className="text-sm">Please try again or email us directly.</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Your Name *</label>
                  <input
                    type="text" name="name" value={formData.name} onChange={handleChange} required
                    placeholder="John Doe"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-ocean-blue focus:ring-2 focus:ring-ocean-blue/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address *</label>
                  <input
                    type="email" name="email" value={formData.email} onChange={handleChange} required
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-ocean-blue focus:ring-2 focus:ring-ocean-blue/20 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Subject</label>
                <input
                  type="text" name="subject" value={formData.subject} onChange={handleChange}
                  placeholder="Tour inquiry, booking question, custom package..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-ocean-blue focus:ring-2 focus:ring-ocean-blue/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Message *</label>
                <textarea
                  name="message" value={formData.message} onChange={handleChange} required
                  rows={5}
                  placeholder="Tell us about your dream Sri Lanka trip — dates, group size, interests..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-ocean-blue focus:ring-2 focus:ring-ocean-blue/20 transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                onClick={() => status === 'error' && setStatus(null)}
                className="btn-primary w-full py-4 text-base disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Sending...
                  </span>
                ) : 'Send Message →'}
              </button>
            </form>
          </motion.div>

          {/* ── Info Panel ── */}
          <motion.div
            className="lg:col-span-2 space-y-4"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <h3 className="font-playfair text-2xl font-bold text-deep-navy mb-6">Contact Information</h3>

            {contactInfo.map(({ icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                className="flex items-center gap-4 bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all no-underline group"
              >
                <div className="w-12 h-12 bg-ocean-blue/10 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 group-hover:bg-ocean-blue/20 transition-colors">
                  {icon}
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">{label}</p>
                  <p className="text-gray-800 font-medium text-sm">{value}</p>
                </div>
              </a>
            ))}

            {/* Social Card */}
            <div className="bg-gradient-to-br from-ocean-blue to-ocean-dark rounded-2xl p-6 text-white mt-2">
              <h4 className="font-playfair text-xl font-bold mb-2">Follow Our Journey</h4>
              <p className="text-white/75 text-sm mb-5">Daily Sri Lanka travel inspiration on social media.</p>
              <div className="flex gap-3">
                {[
                  { name: 'Facebook', icon: 'f' },
                  { name: 'Instagram', icon: '📷' },
                  { name: 'Twitter', icon: '𝕏' },
                ].map(({ name, icon }) => (
                  <a
                    key={name}
                    href="#"
                    className="flex-1 text-center py-2.5 bg-white/15 rounded-xl text-sm font-medium hover:bg-white/30 transition-colors no-underline text-white"
                    aria-label={name}
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
