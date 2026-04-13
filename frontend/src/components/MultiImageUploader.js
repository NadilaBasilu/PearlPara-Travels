import React, { useState, useRef } from 'react';
import axios from 'axios';
import { FiUploadCloud, FiX, FiCheck, FiImage } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';
const MAX = 3;

/**
 * MultiImageUploader
 * Props:
 *   values   — string[] of current image URLs
 *   onChange — callback(urls: string[]) when any image changes
 *   label    — field label
 *   max      — max number of images (default 3)
 */
const MultiImageUploader = ({ values = [], onChange, label = 'Gallery Images', max = MAX }) => {
  const [uploading, setUploading] = useState(null); // index being uploaded
  const [errors,    setErrors]    = useState({});
  const inputRefs                 = useRef([]);
  const { authHeader }            = useAuth();

  // Ensure we always have `max` slots
  const slots = [...values, ...Array(max).fill('')].slice(0, max);

  const upload = async (file, index) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setErrors(e => ({ ...e, [index]: 'Only image files allowed' }));
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setErrors(e => ({ ...e, [index]: 'File must be under 10MB' }));
      return;
    }

    setErrors(e => ({ ...e, [index]: '' }));
    setUploading(index);

    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await axios.post(`${API}/api/upload/single`, formData, {
        ...authHeader(),
        headers: { ...authHeader().headers, 'Content-Type': 'multipart/form-data' },
      });
      const updated = [...slots];
      updated[index] = res.data.url;
      onChange(updated.filter(Boolean));
    } catch (err) {
      setErrors(e => ({ ...e, [index]: err.response?.data?.message || 'Upload failed' }));
    } finally {
      setUploading(null);
    }
  };

  const handleClear = async (index) => {
    const url = slots[index];
    if (url && url.includes('/uploads/')) {
      const filename = url.split('/uploads/')[1];
      try { await axios.delete(`${API}/api/upload/${filename}`, authHeader()); } catch {}
    }
    const updated = [...slots];
    updated[index] = '';
    onChange(updated.filter(Boolean));
    if (inputRefs.current[index]) inputRefs.current[index].value = '';
  };

  return (
    <div>
      <label className="font-sans text-sm font-medium text-gray-700 block mb-3">
        {label} <span className="text-warm-gray font-normal">(up to {max})</span>
      </label>

      <div className="grid grid-cols-3 gap-4">
        {slots.map((url, i) => (
          <div key={i}>
            {url ? (
              /* Filled slot — show preview */
              <div className="relative rounded-xl overflow-hidden border border-gray-200 group" style={{ height: '120px' }}>
                <img src={url} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-colors flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => inputRefs.current[i]?.click()}
                    className="opacity-0 group-hover:opacity-100 transition-opacity w-8 h-8 bg-ocean-blue hover:bg-ocean-dark rounded-full text-white flex items-center justify-center"
                  >
                    <FiImage size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleClear(i)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity w-8 h-8 bg-red-500 hover:bg-red-600 rounded-full text-white flex items-center justify-center"
                  >
                    <FiX size={14} />
                  </button>
                </div>
                <div className="absolute top-1.5 right-1.5 bg-palm-green rounded-full p-0.5">
                  <FiCheck size={10} className="text-white" />
                </div>
              </div>
            ) : (
              /* Empty slot — drop zone */
              <div
                className={`border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all duration-200 hover:border-ocean-blue hover:bg-gray-50 ${
                  uploading === i ? 'border-ocean-blue bg-ocean-blue/5' : 'border-gray-200'
                }`}
                style={{ height: '120px' }}
                onClick={() => inputRefs.current[i]?.click()}
                onDragOver={e => e.preventDefault()}
                onDrop={e => { e.preventDefault(); upload(e.dataTransfer.files[0], i); }}
              >
                {uploading === i ? (
                  <div className="w-7 h-7 rounded-full border-3 border-ocean-blue/20 border-t-ocean-blue animate-spin" style={{ borderWidth: '3px' }} />
                ) : (
                  <>
                    <FiUploadCloud size={22} className="text-gray-300 mb-1" />
                    <p className="font-sans text-xs text-warm-gray">Photo {i + 1}</p>
                  </>
                )}
              </div>
            )}

            {/* Hidden input */}
            <input
              ref={el => inputRefs.current[i] = el}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={e => { if (e.target.files[0]) upload(e.target.files[0], i); }}
            />

            {/* Per-slot error */}
            {errors[i] && (
              <p className="font-sans text-xs text-red-500 mt-1">⚠️ {errors[i]}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultiImageUploader;
