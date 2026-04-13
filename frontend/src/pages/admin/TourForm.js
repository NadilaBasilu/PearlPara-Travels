import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FiPlus, FiTrash2, FiSave, FiArrowLeft } from 'react-icons/fi';
import AdminLayout from './AdminLayout';
import { useAuth } from '../../context/AuthContext';
import ImageUploader from '../../components/ImageUploader';
import MultiImageUploader from '../../components/MultiImageUploader';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const TYPES   = ['beach', 'cultural', 'wildlife', 'nature', 'honeymoon'];
const BADGES  = ['Most Popular', "Editor's Choice", 'Thrilling', 'Scenic', 'Romantic', 'Best Value'];
const ICONS   = ['wave','anchor','sun','fish','castle','temple','ruins','fort','paw','elephant','bird','jeep','train','bridge','tea','hike','heart','spa','sunset','boat','globe','camera','culture','wildlife'];

const empty = {
  name: '', slug: '', type: 'beach', badge: '', tagline: '', description: '',
  image: '', gallery: ['', '', ''], price: '', duration: '', groupSize: '',
  bestFor: '', featured: false,
  highlights: [{ icon: 'wave', title: '', desc: '' }],
  itinerary:  [{ day: 1, title: '', desc: '' }],
  includes:   [''],
  excludes:   [''],
  routeStops: [{ name: '', lat: '', lng: '', day: 1 }],
};

const slugify = str => str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const Field = ({ label, children, required }) => (
  <div>
    <label className="font-sans text-sm font-medium text-gray-700 block mb-1.5">
      {label}{required && <span className="text-red-400 ml-1">*</span>}
    </label>
    {children}
  </div>
);

const inputCls = "w-full px-4 py-2.5 border border-gray-200 rounded-xl font-sans text-sm focus:outline-none focus:border-ocean-blue focus:ring-2 focus:ring-ocean-blue/20 transition-all";
const sectionCls = "bg-white rounded-2xl shadow-sm border border-gray-100 p-6";

const TourForm = () => {
  const { id }          = useParams();
  const isEdit          = Boolean(id);
  const navigate        = useNavigate();
  const { authHeader }  = useAuth();
  const [form,  setForm]    = useState(empty);
  const [saving, setSaving] = useState(false);
  const [error,  setError]  = useState('');

  useEffect(() => {
    if (isEdit) {
      axios.get(`${API}/api/tours/${id}`)
        .then(res => {
          const t = res.data;
          setForm({
            ...t,
            gallery:    t.gallery?.length ? t.gallery : ['', '', ''],
            highlights: t.highlights?.length ? t.highlights : [{ icon: 'wave', title: '', desc: '' }],
            itinerary:  t.itinerary?.length  ? t.itinerary  : [{ day: 1, title: '', desc: '' }],
            includes:   t.includes?.length   ? t.includes   : [''],
            excludes:   t.excludes?.length   ? t.excludes   : [''],
            routeStops: t.routeStops?.length  ? t.routeStops  : [{ name: '', lat: '', lng: '', day: 1 }],
          });
        })
        .catch(() => setError('Failed to load tour'));
    }
  }, [id, isEdit]);

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  // Array field helpers
  const arrSet   = (key, i, val)      => setForm(f => { const a = [...f[key]]; a[i] = val; return { ...f, [key]: a }; });
  const arrAdd   = (key, blank)       => setForm(f => ({ ...f, [key]: [...f[key], blank] }));
  const arrRemove= (key, i)           => setForm(f => ({ ...f, [key]: f[key].filter((_, j) => j !== i) }));
  const objSet   = (key, i, k, v)     => setForm(f => { const a = [...f[key]]; a[i] = { ...a[i], [k]: v }; return { ...f, [key]: a }; });

  const handleSubmit = async e => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const payload = {
        ...form,
        price:      Number(form.price),
        gallery:    form.gallery.filter(Boolean),
        includes:   form.includes.filter(Boolean),
        excludes:   form.excludes.filter(Boolean),
        routeStops: form.routeStops.filter(s => s.name).map(s => ({ ...s, lat: Number(s.lat), lng: Number(s.lng) })),
      };
      if (isEdit) {
        await axios.put(`${API}/api/tours/${id}`, payload, authHeader());
      } else {
        await axios.post(`${API}/api/tours`, payload, authHeader());
      }
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Save failed');
      setSaving(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => navigate('/admin/dashboard')}
            className="w-9 h-9 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-warm-gray hover:text-deep-navy hover:border-gray-300 transition-colors">
            <FiArrowLeft size={16} />
          </button>
          <div>
            <h1 className="font-display text-2xl font-bold text-deep-navy">
              {isEdit ? 'Edit Tour Package' : 'Add New Tour Package'}
            </h1>
            <p className="font-sans text-sm text-warm-gray">Fill in all details for the tour package</p>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 mb-5 font-sans text-sm">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* ── Basic Info ── */}
          <motion.div className={sectionCls} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <h3 className="font-display text-lg font-bold text-deep-navy mb-5 pb-3 border-b border-gray-100">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field label="Tour Name" required>
                <input className={inputCls} value={form.name} required
                  onChange={e => { set('name', e.target.value); if (!isEdit) set('slug', slugify(e.target.value)); }}
                  placeholder="e.g. Golden Beaches Escape" />
              </Field>
              <Field label="Slug (URL)" required>
                <input className={inputCls} value={form.slug} required
                  onChange={e => set('slug', e.target.value)}
                  placeholder="golden-beaches-escape" />
              </Field>
              <Field label="Tagline">
                <input className={inputCls} value={form.tagline}
                  onChange={e => set('tagline', e.target.value)}
                  placeholder="Sun, Sand & Turquoise Waters" />
              </Field>
              <Field label="Type" required>
                <select className={inputCls} value={form.type} onChange={e => set('type', e.target.value)}>
                  {TYPES.map(t => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
                </select>
              </Field>
              <Field label="Badge">
                <select className={inputCls} value={form.badge} onChange={e => set('badge', e.target.value)}>
                  <option value="">None</option>
                  {BADGES.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </Field>
              <Field label="Price (USD)" required>
                <input className={inputCls} type="number" min="0" value={form.price} required
                  onChange={e => set('price', e.target.value)} placeholder="899" />
              </Field>
              <Field label="Duration">
                <input className={inputCls} value={form.duration}
                  onChange={e => set('duration', e.target.value)} placeholder="7 Days / 6 Nights" />
              </Field>
              <Field label="Group Size">
                <input className={inputCls} value={form.groupSize}
                  onChange={e => set('groupSize', e.target.value)} placeholder="Up to 12" />
              </Field>
              <Field label="Best For">
                <input className={inputCls} value={form.bestFor}
                  onChange={e => set('bestFor', e.target.value)} placeholder="Couples, Families, Beach Lovers" />
              </Field>
              <Field label="Featured">
                <div className="flex items-center gap-3 mt-1">
                  <input type="checkbox" id="featured" checked={form.featured}
                    onChange={e => set('featured', e.target.checked)}
                    className="w-4 h-4 accent-ocean-blue" />
                  <label htmlFor="featured" className="font-sans text-sm text-gray-600">Show as featured tour</label>
                </div>
              </Field>
            </div>
            <div className="mt-5">
              <Field label="Description" required>
                <textarea className={`${inputCls} resize-none`} rows={4} value={form.description} required
                  onChange={e => set('description', e.target.value)}
                  placeholder="Describe the tour package..." />
              </Field>
            </div>
          </motion.div>

          {/* ── Images ── */}
          <motion.div className={sectionCls} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
            <h3 className="font-display text-lg font-bold text-deep-navy mb-5 pb-3 border-b border-gray-100">Images</h3>
            <div className="space-y-6">
              <ImageUploader
                label="Main Tour Image"
                required
                value={form.image}
                onChange={url => set('image', url)}
              />
              <MultiImageUploader
                label="Gallery Images"
                values={form.gallery.filter(Boolean)}
                onChange={urls => set('gallery', urls)}
              />
            </div>
          </motion.div>

          {/* ── Highlights ── */}
          <motion.div className={sectionCls} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <div className="flex items-center justify-between mb-5 pb-3 border-b border-gray-100">
              <h3 className="font-display text-lg font-bold text-deep-navy">Tour Highlights</h3>
              <button type="button" onClick={() => arrAdd('highlights', { icon: 'wave', title: '', desc: '' })}
                className="flex items-center gap-1.5 text-ocean-blue hover:text-ocean-dark font-sans text-sm font-medium">
                <FiPlus size={14} /> Add
              </button>
            </div>
            <div className="space-y-4">
              {form.highlights.map((h, i) => (
                <div key={i} className="grid grid-cols-12 gap-3 items-start bg-gray-50 rounded-xl p-4">
                  <div className="col-span-2">
                    <label className="font-sans text-xs text-warm-gray mb-1 block">Icon</label>
                    <select className={inputCls} value={h.icon} onChange={e => objSet('highlights', i, 'icon', e.target.value)}>
                      {ICONS.map(ic => <option key={ic} value={ic}>{ic}</option>)}
                    </select>
                  </div>
                  <div className="col-span-4">
                    <label className="font-sans text-xs text-warm-gray mb-1 block">Title</label>
                    <input className={inputCls} value={h.title} placeholder="Highlight title"
                      onChange={e => objSet('highlights', i, 'title', e.target.value)} />
                  </div>
                  <div className="col-span-5">
                    <label className="font-sans text-xs text-warm-gray mb-1 block">Description</label>
                    <input className={inputCls} value={h.desc} placeholder="Short description"
                      onChange={e => objSet('highlights', i, 'desc', e.target.value)} />
                  </div>
                  <div className="col-span-1 pt-6">
                    {form.highlights.length > 1 && (
                      <button type="button" onClick={() => arrRemove('highlights', i)}
                        className="w-8 h-8 rounded-lg bg-red-50 text-red-400 hover:bg-red-500 hover:text-white flex items-center justify-center transition-colors">
                        <FiTrash2 size={13} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Itinerary ── */}
          <motion.div className={sectionCls} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <div className="flex items-center justify-between mb-5 pb-3 border-b border-gray-100">
              <h3 className="font-display text-lg font-bold text-deep-navy">Day-by-Day Itinerary</h3>
              <button type="button" onClick={() => arrAdd('itinerary', { day: form.itinerary.length + 1, title: '', desc: '' })}
                className="flex items-center gap-1.5 text-ocean-blue hover:text-ocean-dark font-sans text-sm font-medium">
                <FiPlus size={14} /> Add Day
              </button>
            </div>
            <div className="space-y-4">
              {form.itinerary.map((it, i) => (
                <div key={i} className="grid grid-cols-12 gap-3 items-start bg-gray-50 rounded-xl p-4">
                  <div className="col-span-1">
                    <label className="font-sans text-xs text-warm-gray mb-1 block">Day</label>
                    <input className={inputCls} value={it.day}
                      onChange={e => objSet('itinerary', i, 'day', e.target.value)} placeholder="1" />
                  </div>
                  <div className="col-span-4">
                    <label className="font-sans text-xs text-warm-gray mb-1 block">Title</label>
                    <input className={inputCls} value={it.title} placeholder="Arrival in Colombo"
                      onChange={e => objSet('itinerary', i, 'title', e.target.value)} />
                  </div>
                  <div className="col-span-6">
                    <label className="font-sans text-xs text-warm-gray mb-1 block">Description</label>
                    <input className={inputCls} value={it.desc} placeholder="What happens this day..."
                      onChange={e => objSet('itinerary', i, 'desc', e.target.value)} />
                  </div>
                  <div className="col-span-1 pt-6">
                    {form.itinerary.length > 1 && (
                      <button type="button" onClick={() => arrRemove('itinerary', i)}
                        className="w-8 h-8 rounded-lg bg-red-50 text-red-400 hover:bg-red-500 hover:text-white flex items-center justify-center transition-colors">
                        <FiTrash2 size={13} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Includes / Excludes ── */}
          <motion.div className={sectionCls} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h3 className="font-display text-lg font-bold text-deep-navy mb-5 pb-3 border-b border-gray-100">Inclusions & Exclusions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="font-sans text-sm font-medium text-gray-700">What's Included</label>
                  <button type="button" onClick={() => arrAdd('includes', '')}
                    className="text-palm-green hover:text-green-700 font-sans text-sm flex items-center gap-1">
                    <FiPlus size={13} /> Add
                  </button>
                </div>
                <div className="space-y-2">
                  {form.includes.map((inc, i) => (
                    <div key={i} className="flex gap-2">
                      <input className={inputCls} value={inc} placeholder="e.g. Airport transfers"
                        onChange={e => arrSet('includes', i, e.target.value)} />
                      {form.includes.length > 1 && (
                        <button type="button" onClick={() => arrRemove('includes', i)}
                          className="w-9 h-9 rounded-lg bg-red-50 text-red-400 hover:bg-red-500 hover:text-white flex items-center justify-center flex-shrink-0 transition-colors">
                          <FiTrash2 size={13} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="font-sans text-sm font-medium text-gray-700">Not Included</label>
                  <button type="button" onClick={() => arrAdd('excludes', '')}
                    className="text-red-400 hover:text-red-600 font-sans text-sm flex items-center gap-1">
                    <FiPlus size={13} /> Add
                  </button>
                </div>
                <div className="space-y-2">
                  {form.excludes.map((exc, i) => (
                    <div key={i} className="flex gap-2">
                      <input className={inputCls} value={exc} placeholder="e.g. International flights"
                        onChange={e => arrSet('excludes', i, e.target.value)} />
                      {form.excludes.length > 1 && (
                        <button type="button" onClick={() => arrRemove('excludes', i)}
                          className="w-9 h-9 rounded-lg bg-red-50 text-red-400 hover:bg-red-500 hover:text-white flex items-center justify-center flex-shrink-0 transition-colors">
                          <FiTrash2 size={13} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Route Stops ── */}
          <motion.div className={sectionCls} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
            <div className="flex items-center justify-between mb-5 pb-3 border-b border-gray-100">
              <div>
                <h3 className="font-display text-lg font-bold text-deep-navy">Route Map Stops</h3>
                <p className="font-sans text-xs text-warm-gray mt-0.5">Add GPS coordinates for each stop to show on the map</p>
              </div>
              <button type="button" onClick={() => arrAdd('routeStops', { name: '', lat: '', lng: '', day: '' })}
                className="flex items-center gap-1.5 text-ocean-blue hover:text-ocean-dark font-sans text-sm font-medium">
                <FiPlus size={14} /> Add Stop
              </button>
            </div>
            <div className="space-y-3">
              {form.routeStops.map((s, i) => (
                <div key={i} className="grid grid-cols-12 gap-3 items-end bg-gray-50 rounded-xl p-4">
                  <div className="col-span-3">
                    <label className="font-sans text-xs text-warm-gray mb-1 block">Place Name</label>
                    <input className={inputCls} value={s.name} placeholder="Colombo"
                      onChange={e => objSet('routeStops', i, 'name', e.target.value)} />
                  </div>
                  <div className="col-span-3">
                    <label className="font-sans text-xs text-warm-gray mb-1 block">Latitude</label>
                    <input className={inputCls} value={s.lat} placeholder="6.9271"
                      onChange={e => objSet('routeStops', i, 'lat', e.target.value)} />
                  </div>
                  <div className="col-span-3">
                    <label className="font-sans text-xs text-warm-gray mb-1 block">Longitude</label>
                    <input className={inputCls} value={s.lng} placeholder="79.8612"
                      onChange={e => objSet('routeStops', i, 'lng', e.target.value)} />
                  </div>
                  <div className="col-span-2">
                    <label className="font-sans text-xs text-warm-gray mb-1 block">Day</label>
                    <input className={inputCls} value={s.day} placeholder="1"
                      onChange={e => objSet('routeStops', i, 'day', e.target.value)} />
                  </div>
                  <div className="col-span-1">
                    {form.routeStops.length > 1 && (
                      <button type="button" onClick={() => arrRemove('routeStops', i)}
                        className="w-8 h-8 rounded-lg bg-red-50 text-red-400 hover:bg-red-500 hover:text-white flex items-center justify-center transition-colors">
                        <FiTrash2 size={13} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <p className="font-sans text-xs text-warm-gray mt-3">
              💡 Find coordinates at <a href="https://www.latlong.net" target="_blank" rel="noreferrer" className="text-ocean-blue hover:underline">latlong.net</a>
            </p>
          </motion.div>

          {/* ── Submit ── */}
          <div className="flex items-center gap-4 pb-8">
            <button type="submit" disabled={saving}
              className="btn-primary flex items-center gap-2 py-3.5 px-8 disabled:opacity-60 disabled:cursor-not-allowed">
              {saving
                ? <><div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Saving...</>
                : <><FiSave size={16} /> {isEdit ? 'Update Tour' : 'Create Tour'}</>
              }
            </button>
            <button type="button" onClick={() => navigate('/admin/dashboard')}
              className="font-sans text-sm text-warm-gray hover:text-deep-navy transition-colors">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default TourForm;
