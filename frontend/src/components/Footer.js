import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const quickLinks = [
  { to: '/destinations', label: 'Destinations' },
  { to: '/tours', label: 'Tour Packages' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact' },
];

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = e => {
    e.preventDefault();
    if (email) { setSubscribed(true); setEmail(''); }
  };

  return (
    <footer className="bg-deep-navy text-white">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">

        {/* Brand */}
        <div>
          <Link to="/" className="no-underline">
            <h3 className="font-cinzel text-xl font-bold mb-4">
              <span className="text-ocean-blue">Pearl</span>
              <span className="text-sunset-orange">Para</span>
              <span className="text-white font-sans text-xs font-normal tracking-widest ml-1"> TRAVELS</span>
            </h3>
          </Link>
          <p className="font-sans text-gray-400 text-sm leading-relaxed mb-6">
            Your gateway to the Pearl of the Indian Ocean. Crafting unforgettable Sri Lankan experiences since 2020.
          </p>
          <div className="flex gap-3">
            {[
              { label: 'Facebook', short: 'FB' },
              { label: 'Instagram', short: 'IG' },
              { label: 'Twitter', short: 'TW' },
            ].map(({ label, short }) => (
              <button
                key={label}
                type="button"
                aria-label={label}
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold hover:bg-sunset-orange transition-colors text-white"
              >
                {short}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-cinzel text-sm tracking-widest uppercase mb-6 text-white">Quick Links</h4>
          <ul className="space-y-3">
            {quickLinks.map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="text-gray-400 hover:text-sunset-orange transition-colors no-underline text-sm flex items-center gap-2 group"
                >
                  <span className="text-sunset-orange/50 group-hover:text-sunset-orange transition-colors">→</span>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="font-cinzel text-sm tracking-widest uppercase mb-6 text-white">Stay Connected</h4>
          <div className="space-y-2 text-sm text-gray-400 mb-6">
            <p className="flex items-center gap-2"><span>📧</span> info@pearlparatravels.com</p>
            <p className="flex items-center gap-2"><span>📞</span> +94 11 123 4567</p>
            <p className="flex items-center gap-2"><span>📍</span> Colombo, Sri Lanka</p>
          </div>

          <p className="text-sm text-gray-400 mb-3">Get travel tips & exclusive deals:</p>
          {subscribed ? (
            <div className="bg-palm-green/20 border border-palm-green/30 text-palm-green rounded-xl px-4 py-3 text-sm font-medium">
              ✓ You're subscribed! Thank you.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex min-w-0 w-full">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="min-w-0 flex-1 px-4 py-2.5 rounded-l-full bg-white/10 text-white placeholder-gray-500 text-sm border border-white/10 focus:outline-none focus:border-ocean-blue transition-colors"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-sunset-orange rounded-r-full text-sm font-semibold hover:bg-sunset-dark transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-6 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3 text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} PearlPara Travels. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy-policy" className="hover:text-gray-300 transition-colors text-gray-500 no-underline text-sm">Privacy Policy</Link>
            <Link to="/privacy-policy" className="hover:text-gray-300 transition-colors text-gray-500 no-underline text-sm">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
