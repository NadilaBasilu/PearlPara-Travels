import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const contactInfo = [
  { icon: '📧', label: 'Email', value: 'info@pearlparatravels.com' },
  { icon: '📞', label: 'Phone', value: '+94 11 123 4567' },
  { icon: '📍', label: 'Address', value: 'Colombo, Sri Lanka' },
  { icon: '🕐', label: 'Hours', value: 'Mon–Sat: 9am – 6pm' },
];

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState(null); // 'success' | 'error' | 'loading'

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

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
    <div className="pt-24 pb-20 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-14">
        <span className="text-sunset-orange font-semibold text-sm tracking-widest uppercase">Get In Touch</span>
        <h1 className="section-title mt-2">Contact Us</h1>
        <p className="section-subtitle">Have questions about your trip? We'd love to hear from you.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
        {/* Form */}
        <motion.div
          className="lg:col-span-3 bg-white rounded-2xl shadow-md p-8"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-playfair text-2xl font-bold text-deep-navy mb-6">Send a Message</h2>

          {status === 'success' && (
            <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl p-4 mb-6 flex items-center gap-3">
              <span className="text-2xl">✅</span>
              <p>Your message was sent! We'll get back to you within 24 hours.</p>
            </div>
          )}
          {status === 'error' && (
            <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-4 mb-6 flex items-center gap-3">
              <span className="text-2xl">❌</span>
              <p>Something went wrong. Please try again or email us directly.</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                <input
                  type="text" name="name" value={formData.name} onChange={handleChange} required
                  placeholder="John Doe"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-ocean-blue focus:ring-2 focus:ring-ocean-blue/20 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email" name="email" value={formData.email} onChange={handleChange} required
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-ocean-blue focus:ring-2 focus:ring-ocean-blue/20 transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <input
                type="text" name="subject" value={formData.subject} onChange={handleChange}
                placeholder="Tour inquiry, booking question..."
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-ocean-blue focus:ring-2 focus:ring-ocean-blue/20 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                name="message" value={formData.message} onChange={handleChange} required
                rows={5} placeholder="Tell us about your dream trip..."
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-ocean-blue focus:ring-2 focus:ring-ocean-blue/20 transition-all resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={status === 'loading'}
              className="btn-primary w-full py-4 text-base disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? 'Sending...' : 'Send Message →'}
            </button>
          </form>
        </motion.div>

        {/* Info Cards */}
        <motion.div
          className="lg:col-span-2 space-y-4"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2 className="font-playfair text-2xl font-bold text-deep-navy mb-6">Contact Information</h2>
          {contactInfo.map(({ icon, label, value }) => (
            <div key={label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-4">
              <div className="w-12 h-12 bg-ocean-blue/10 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                {icon}
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">{label}</p>
                <p className="text-gray-800 font-medium">{value}</p>
              </div>
            </div>
          ))}

          <div className="bg-gradient-to-br from-ocean-blue to-ocean-dark rounded-2xl p-6 text-white mt-6">
            <h3 className="font-playfair text-xl font-bold mb-2">Follow Our Journey</h3>
            <p className="text-white/80 text-sm mb-4">Stay inspired with daily Sri Lanka travel content.</p>
            <div className="flex gap-3">
              {['Facebook', 'Instagram', 'Twitter'].map(s => (
                <a key={s} href="#" className="flex-1 text-center py-2 bg-white/20 rounded-xl text-sm font-medium hover:bg-white/30 transition-colors no-underline text-white">
                  {s}
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
