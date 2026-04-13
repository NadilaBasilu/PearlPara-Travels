import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FiMap, FiPlus, FiEye, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { MdOutlineTour } from 'react-icons/md';
import AdminLayout from './AdminLayout';
import { useAuth } from '../../context/AuthContext';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const StatCard = ({ icon: Icon, label, value, color }) => (
  <motion.div
    className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-5"
    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
  >
    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${color}`}>
      <Icon size={26} className="text-white" />
    </div>
    <div>
      <p className="font-sans text-2xl font-bold text-deep-navy">{value}</p>
      <p className="font-sans text-sm text-warm-gray">{label}</p>
    </div>
  </motion.div>
);

const AdminDashboard = () => {
  const [tours,   setTours]   = useState([]);
  const [loading, setLoading] = useState(true);
  const { authHeader }        = useAuth();

  useEffect(() => {
    axios.get(`${API}/api/tours`)
      .then(res => { setTours(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this tour?')) return;
    try {
      await axios.delete(`${API}/api/tours/${id}`, authHeader());
      setTours(t => t.filter(x => x._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || 'Delete failed');
    }
  };

  const typeColors = {
    beach: 'bg-blue-100 text-blue-700',
    cultural: 'bg-purple-100 text-purple-700',
    wildlife: 'bg-amber-100 text-amber-700',
    nature: 'bg-green-100 text-green-700',
    honeymoon: 'bg-pink-100 text-pink-700',
  };

  return (
    <AdminLayout>
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
        <StatCard icon={MdOutlineTour} label="Total Tour Packages" value={tours.length} color="bg-ocean-blue" />
        <StatCard icon={FiMap}         label="Featured Tours"       value={tours.filter(t => t.featured).length} color="bg-sunset-orange" />
        <StatCard icon={FiEye}         label="Tour Types"           value={[...new Set(tours.map(t => t.type))].length} color="bg-palm-green" />
      </div>

      {/* Tours Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-display text-lg font-bold text-deep-navy">All Tour Packages</h2>
          <Link to="/admin/tours/new" className="btn-primary text-sm py-2 px-5 no-underline flex items-center gap-2">
            <FiPlus size={14} /> Add New Tour
          </Link>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16 gap-3">
            <div className="w-8 h-8 rounded-full border-4 border-ocean-blue/20 border-t-ocean-blue animate-spin" />
            <p className="font-sans text-sm text-warm-gray">Loading tours...</p>
          </div>
        ) : tours.length === 0 ? (
          <div className="text-center py-16">
            <MdOutlineTour size={48} className="text-gray-300 mx-auto mb-3" />
            <p className="font-sans text-warm-gray">No tours yet.</p>
            <Link to="/admin/tours/new" className="btn-primary text-sm mt-4 inline-block no-underline">Add First Tour</Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {['Tour', 'Type', 'Duration', 'Price', 'Featured', 'Actions'].map(h => (
                    <th key={h} className="px-5 py-3 text-left font-cinzel text-xs tracking-widest uppercase text-warm-gray">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {tours.map(tour => (
                  <tr key={tour._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <img src={tour.image} alt={tour.name}
                          className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
                          onError={e => { e.target.src = 'https://via.placeholder.com/48'; }}
                        />
                        <div>
                          <p className="font-sans font-semibold text-deep-navy text-sm">{tour.name}</p>
                          <p className="font-sans text-xs text-warm-gray">{tour.tagline}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`font-sans text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${typeColors[tour.type] || 'bg-gray-100 text-gray-600'}`}>
                        {tour.type}
                      </span>
                    </td>
                    <td className="px-5 py-4 font-sans text-sm text-warm-gray">{tour.duration || '—'}</td>
                    <td className="px-5 py-4 font-display text-base font-bold text-sunset-orange">${tour.price}</td>
                    <td className="px-5 py-4">
                      <span className={`font-sans text-xs font-semibold px-2.5 py-1 rounded-full ${tour.featured ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                        {tour.featured ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <Link to={`/admin/tours/edit/${tour._id}`}
                          className="w-8 h-8 rounded-lg bg-ocean-blue/10 text-ocean-blue hover:bg-ocean-blue hover:text-white flex items-center justify-center transition-colors no-underline"
                        >
                          <FiEdit2 size={14} />
                        </Link>
                        <button onClick={() => handleDelete(tour._id)}
                          className="w-8 h-8 rounded-lg bg-red-50 text-red-400 hover:bg-red-500 hover:text-white flex items-center justify-center transition-colors"
                        >
                          <FiTrash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
