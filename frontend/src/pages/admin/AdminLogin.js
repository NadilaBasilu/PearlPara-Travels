import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiEye, FiEyeOff, FiLogIn } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const AdminLogin = () => {
  const [form,      setForm]      = useState({ email: '', password: '' });
  const [showPass,  setShowPass]  = useState(false);
  const [error,     setError]     = useState('');
  const [loading,   setLoading]   = useState(false);
  const { login }                 = useAuth();
  const navigate                  = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-deep-navy flex items-center justify-center px-4"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=1920&q=80')" }}
    >
      <div className="absolute inset-0 bg-deep-navy/85" />

      <motion.div
        className="relative z-10 w-full max-w-md"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="font-cinzel text-3xl font-bold">
            <span className="text-ocean-blue">Pearl</span>
            <span className="text-sunset-orange">Para</span>
            <span className="text-white"> Travels</span>
          </h1>
          <p className="font-sans text-white/50 text-sm mt-2 tracking-widest uppercase">Admin Panel</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <h2 className="font-display text-2xl font-bold text-deep-navy mb-1">Welcome Back</h2>
          <p className="font-sans text-warm-gray text-sm mb-7">Sign in to manage your travel packages</p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 mb-5 text-sm font-sans flex items-center gap-2">
              <span>⚠️</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="font-sans text-sm font-medium text-gray-700 block mb-1.5">Email Address</label>
              <div className="relative">
                <FiMail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  placeholder="admin@pearlpara.com"
                  required
                  className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl font-sans text-sm focus:outline-none focus:border-ocean-blue focus:ring-2 focus:ring-ocean-blue/20 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="font-sans text-sm font-medium text-gray-700 block mb-1.5">Password</label>
              <div className="relative">
                <FiLock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  placeholder="••••••••"
                  required
                  className="w-full pl-11 pr-11 py-3 border border-gray-200 rounded-xl font-sans text-sm focus:outline-none focus:border-ocean-blue focus:ring-2 focus:ring-ocean-blue/20 transition-all"
                />
                <button type="button" onClick={() => setShowPass(s => !s)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPass ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-3.5 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading
                ? <><div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Signing in...</>
                : <><FiLogIn size={16} /> Sign In to Admin Panel</>
              }
            </button>
          </form>

          <p className="font-sans text-xs text-center text-gray-400 mt-6">
            This area is restricted to authorized administrators only.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
