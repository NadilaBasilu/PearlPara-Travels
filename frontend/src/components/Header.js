import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/destinations', label: 'Destinations' },
  { to: '/tours', label: 'Tours' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
];

// Pages where hero fills the top — header stays transparent until scroll
const heroPages = ['/'];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const isHeroPage = heroPages.includes(location.pathname);
  const isSolid = scrolled || !isHeroPage;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    // Reset on page change
    setScrolled(window.scrollY > 60);
    return () => window.removeEventListener('scroll', onScroll);
  }, [location.pathname]);

  useEffect(() => setMenuOpen(false), [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        isSolid
          ? 'bg-white/97 backdrop-blur-md shadow-md py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="font-playfair text-2xl font-bold no-underline flex items-center gap-1">
          <span className={isSolid ? 'text-ocean-blue' : 'text-white'}>Pearl</span>
          <span className={isSolid ? 'text-sunset-orange' : 'text-gold'}>Para</span>
          <span className={`text-sm font-normal ml-0.5 ${isSolid ? 'text-gray-400' : 'text-white/70'}`}>
            Travels
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map(({ to, label }) => {
            const isActive = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`text-sm font-medium no-underline transition-colors duration-200 relative group pb-0.5 ${
                  isActive
                    ? isSolid ? 'text-ocean-blue' : 'text-gold'
                    : isSolid ? 'text-gray-700 hover:text-ocean-blue' : 'text-white/90 hover:text-white'
                }`}
              >
                {label}
                <span
                  className={`absolute -bottom-0.5 left-0 h-0.5 bg-sunset-orange rounded-full transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            );
          })}
          <Link
            to="/contact"
            className="btn-primary text-sm py-2 px-5 no-underline"
          >
            Book Now
          </Link>
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col justify-center gap-1.5 w-8 h-8 p-1"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-full h-0.5 rounded transition-all duration-300 origin-center ${
              isSolid ? 'bg-gray-800' : 'bg-white'
            } ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}
          />
          <span
            className={`block w-full h-0.5 rounded transition-all duration-300 ${
              isSolid ? 'bg-gray-800' : 'bg-white'
            } ${menuOpen ? 'opacity-0 scale-x-0' : ''}`}
          />
          <span
            className={`block w-full h-0.5 rounded transition-all duration-300 origin-center ${
              isSolid ? 'bg-gray-800' : 'bg-white'
            } ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}
          />
        </button>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`md:hidden bg-white border-t border-gray-100 shadow-xl overflow-hidden transition-all duration-300 ${
          menuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 py-3 space-y-1">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`block px-4 py-2.5 rounded-xl text-sm font-medium no-underline transition-colors ${
                location.pathname === to
                  ? 'text-ocean-blue bg-blue-50 font-semibold'
                  : 'text-gray-700 hover:text-ocean-blue hover:bg-gray-50'
              }`}
            >
              {label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="block btn-primary text-center text-sm py-2.5 mt-2 no-underline"
          >
            Book Now
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
