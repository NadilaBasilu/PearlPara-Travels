import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Destinations from './pages/Destinations';
import Tours from './pages/Tours';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

const NotFound = () => (
  <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24">
    <div className="text-8xl mb-6">🌴</div>
    <h1 className="font-playfair text-5xl font-bold text-deep-navy mb-4">404</h1>
    <p className="text-gray-500 text-xl mb-8">Oops! This page got lost in paradise.</p>
    <a href="/" className="btn-primary no-underline">Back to Home</a>
  </div>
);

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/tours" element={<Tours />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
