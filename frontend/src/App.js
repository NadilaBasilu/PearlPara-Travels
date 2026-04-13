import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Destinations from './pages/Destinations';
import Tours from './pages/Tours';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import DestinationDetail from './pages/DestinationDetail';
import TourDetail from './pages/TourDetail';

import AdminLogin     from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import TourForm       from './pages/admin/TourForm';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

const NotFound = () => (
  <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24">
    <div className="text-8xl mb-6">🌴</div>
    <h1 className="font-display text-5xl font-bold text-deep-navy mb-4">404</h1>
    <p className="text-gray-500 text-xl mb-8">Oops! This page got lost in paradise.</p>
    <a href="/" className="btn-primary no-underline">Back to Home</a>
  </div>
);

// Public layout wrapper (with Header + Footer)
const PublicLayout = ({ children }) => (
  <div className="min-h-screen flex flex-col overflow-x-hidden">
    <Header />
    <main className="flex-1">{children}</main>
    <Footer />
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Routes>

          {/* ── Admin Routes (no Header/Footer) ── */}
          <Route path="/admin/login"     element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/tours"     element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/tours/new" element={<ProtectedRoute><TourForm /></ProtectedRoute>} />
          <Route path="/admin/tours/edit/:id" element={<ProtectedRoute><TourForm /></ProtectedRoute>} />

          {/* ── Public Routes (with Header/Footer) ── */}
          <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
          <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
          <Route path="/destinations" element={<PublicLayout><Destinations /></PublicLayout>} />
          <Route path="/destinations/:slug" element={<PublicLayout><DestinationDetail /></PublicLayout>} />
          <Route path="/tours" element={<PublicLayout><Tours /></PublicLayout>} />
          <Route path="/tours/:slug" element={<PublicLayout><TourDetail /></PublicLayout>} />
          <Route path="/gallery" element={<PublicLayout><Gallery /></PublicLayout>} />
          <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
          <Route path="*" element={<PublicLayout><NotFound /></PublicLayout>} />

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
