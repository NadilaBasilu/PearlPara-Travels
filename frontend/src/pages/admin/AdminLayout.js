import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiGrid, FiMap, FiLogOut, FiMenu, FiX, FiGlobe, FiPlus } from 'react-icons/fi';
import { MdOutlineTour } from 'react-icons/md';
import { useAuth } from '../../context/AuthContext';

const navItems = [
  { to: '/admin/dashboard', icon: FiGrid,          label: 'Dashboard' },
  { to: '/admin/tours',     icon: MdOutlineTour,   label: 'Tour Packages' },
  { to: '/admin/tours/new', icon: FiPlus,          label: 'Add New Tour' },
];

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, logout }              = useAuth();
  const location                      = useLocation();
  const navigate                      = useNavigate();

  const handleLogout = () => { logout(); navigate('/admin/login'); };

  return (
    <div className="min-h-screen bg-gray-50 flex">

      {/* ── Sidebar ── */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-deep-navy text-white flex flex-col transition-all duration-300 flex-shrink-0 min-h-screen`}>

        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-white/10">
          {sidebarOpen && (
            <span className="font-cinzel text-lg font-bold">
              <span className="text-ocean-blue">Pearl</span>
              <span className="text-sunset-orange">Para</span>
            </span>
          )}
          <button onClick={() => setSidebarOpen(o => !o)} className="ml-auto text-white/60 hover:text-white transition-colors">
            {sidebarOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-6 space-y-1 px-2">
          {navItems.map(({ to, icon: Icon, label }) => {
            const active = location.pathname === to;
            return (
              <Link key={to} to={to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl no-underline transition-all duration-200 group ${
                  active ? 'bg-ocean-blue text-white' : 'text-white/60 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon size={20} className="flex-shrink-0" />
                {sidebarOpen && <span className="font-sans text-sm font-medium">{label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* View Site */}
        <div className="px-2 pb-2">
          <a href="/" target="_blank" rel="noreferrer"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/50 hover:bg-white/10 hover:text-white transition-all no-underline"
          >
            <FiGlobe size={20} className="flex-shrink-0" />
            {sidebarOpen && <span className="font-sans text-sm">View Website</span>}
          </a>
        </div>

        {/* Logout */}
        <div className="px-2 pb-4 border-t border-white/10 pt-3">
        {sidebarOpen && user && (
            <div className="px-3 py-2 mb-2">
              <p className="font-sans text-xs text-white/40 uppercase tracking-wide">Logged in as</p>
              <p className="font-sans text-sm font-semibold text-white truncate">{user.name}</p>
              <p className="font-sans text-xs text-white/40 truncate">{user.email}</p>
            </div>
          )}
          <button onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all"
          >
            <FiLogOut size={20} className="flex-shrink-0" />
            {sidebarOpen && <span className="font-sans text-sm font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-display text-xl font-bold text-deep-navy">
              {navItems.find(n => n.to === location.pathname)?.label || 'Admin Panel'}
            </h1>
            <p className="font-sans text-xs text-warm-gray mt-0.5">PearlPara Travels Management</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-ocean-blue flex items-center justify-center text-white font-bold font-sans text-sm">
              {user?.name?.[0]?.toUpperCase() || 'A'}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
