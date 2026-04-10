import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiMenuAlt3, HiX } from 'react-icons/hi';

const navLinks = [
  { to: '/',            label: 'Home' },
  { to: '/about',       label: 'About' },
  { to: '/destinations',label: 'Destinations' },
  { to: '/tours',       label: 'Tours' },
  { to: '/gallery',     label: 'Gallery' },
  { to: '/contact',     label: 'Contact' },
];

const heroPages = ['/'];

const Header = () => {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const location                  = useLocation();
  const isHeroPage                = heroPages.includes(location.pathname);
  const isSolid                   = scrolled || !isHeroPage;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    setScrolled(window.scrollY > 60);
    return () => window.removeEventListener('scroll', onScroll);
  }, [location.pathname]);

  useEffect(() => setMenuOpen(false), [location]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isSolid ? 'bg-white/97 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="no-underline flex items-baseline gap-1">
          <span className={`font-cinzel text-xl font-bold tracking-wider ${isSolid ? 'text-ocean-blue' : 'text-white'}`}>
            Pearl
          </span>
          <span className={`font-cinzel text-xl font-bold tracking-wider ${isSolid ? 'text-sunset-orange' : 'text-gold'}`}>
            Para
          </span>
          <span className={`font-sans text-xs font-normal tracking-widest ml-0.5 ${isSolid ? 'text-warm-gray' : 'text-white/60'}`}>
            TRAVELS
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(({ to, label }) => {
            const active = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`font-sans text-sm font-medium no-underline tracking-wide transition-colors duration-200 relative group pb-0.5 ${
                  active
                    ? isSolid ? 'text-ocean-blue' : 'text-gold'
                    : isSolid ? 'text-gray-600 hover:text-ocean-blue' : 'text-white/85 hover:text-white'
                }`}
              >
                {label}
                <span className={`absolute -bottom-0.5 left-0 h-px bg-sunset-orange transition-all duration-300 ${
                  active ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </Link>
            );
          })}
          <Link to="/contact" className="btn-primary text-sm py-2 px-6 no-underline">
            Book Now
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-1"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          {menuOpen
            ? <HiX size={26} className={isSolid ? 'text-gray-800' : 'text-white'} />
            : <HiMenuAlt3 size={26} className={isSolid ? 'text-gray-800' : 'text-white'} />
          }
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden bg-white border-t border-gray-100 shadow-xl overflow-hidden transition-all duration-300 ${
        menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="px-4 py-3 space-y-1">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`block px-4 py-2.5 rounded-xl font-sans text-sm font-medium no-underline transition-colors ${
                location.pathname === to
                  ? 'text-ocean-blue bg-blue-50 font-semibold'
                  : 'text-gray-600 hover:text-ocean-blue hover:bg-gray-50'
              }`}
            >
              {label}
            </Link>
          ))}
          <Link to="/contact" className="block btn-primary text-center text-sm py-2.5 mt-2 no-underline">
            Book Now
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
