import React, { useState, useRef } from 'react';
import axios from 'axios';
import { FiUploadCloud, FiX, FiImage, FiCheck } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

/**
 * ImageUploader
 * Props:
 *   value       — current image URL string
 *   onChange    — callback(url) when upload completes or cleared
 *   label       — field label
 *   required    — show asterisk
 */
const ImageUploader = ({ value, onChange, label = 'Image', required = false }) => {
  const [dragging,  setDragging]  = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress,  setProgress]  = useState(0);
  const [error,     setError]     = useState('');
  const inputRef                  = useRef(null);
  const { authHeader }            = useAuth();

  const upload = async (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) { setError('Only image files allowed'); return; }
    if (file.size > 10 * 1024 * 1024)   { setError('File must be under 10MB');   return; }

    setError('');
    setUploading(true);
    setProgress(0);

    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await axios.post(`${API}/api/upload/single`, formData, {
        ...authHeader(),
        headers: { ...authHeader().headers, 'Content-Type': 'multipart/form-data' },
        onUploadProgress: e => setProgress(Math.round((e.loaded * 100) / e.total)),
      });
      onChange(res.data.url);
    } catch (err) {
      setError(err.response?.data?.message || 'Upload failed');
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) upload(file);
  };

  const handleClear = async () => {
    // Extract filename from URL and delete from server
    if (value && value.includes('/uploads/')) {
      const filename = value.split('/uploads/')[1];
      try { await axios.delete(`${API}/api/upload/${filename}`, authHeader()); } catch {}
    }
    onChange('');
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div>
      <label className="font-sans text-sm font-medium text-gray-700 block mb-1.5">
        {label}{required && <span className="text-red-400 ml-1">*</span>}
      </label>

      {/* Preview */}
      {value && !uploading && (
        <div className="relative mb-3 rounded-xl overflow-hidden border border-gray-200 group">
          <img src={value} alt="preview" className="w-full h-48 object-cover" />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
            <button
              type="button"
              onClick={handleClear}
              className="opacity-0 group-hover:opacity-100 transition-opacity w-10 h-10 bg-red-500 hover:bg-red-600 rounded-full text-white flex items-center justify-center shadow-lg"
            >
              <FiX size={18} />
            </button>
          </div>
          <div className="absolute top-2 right-2 bg-palm-green text-white rounded-full p-1">
            <FiCheck size={12} />
          </div>
        </div>
      )}

      {/* Drop Zone */}
      {!value && (
        <div
          className={`relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-200 ${
            dragging
              ? 'border-ocean-blue bg-ocean-blue/5 scale-[1.01]'
              : 'border-gray-200 hover:border-ocean-blue hover:bg-gray-50'
          }`}
          onClick={() => inputRef.current?.click()}
          onDragOver={e => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
        >
          {uploading ? (
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-full border-4 border-ocean-blue/20 border-t-ocean-blue animate-spin mx-auto" />
              <p className="font-sans text-sm text-warm-gray">Uploading... {progress}%</p>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div
                  className="bg-ocean-blue h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          ) : (
            <>
              <div className="w-12 h-12 rounded-2xl bg-ocean-blue/10 flex items-center justify-center mx-auto mb-3">
                <FiUploadCloud size={24} className="text-ocean-blue" />
              </div>
              <p className="font-sans text-sm font-medium text-deep-navy">
                Drop image here or <span className="text-ocean-blue">browse</span>
              </p>
              <p className="font-sans text-xs text-warm-gray mt-1">JPG, PNG, WebP up to 10MB</p>
            </>
          )}
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={e => { if (e.target.files[0]) upload(e.target.files[0]); }}
      />

      {/* Error */}
      {error && (
        <p className="font-sans text-xs text-red-500 mt-1.5 flex items-center gap-1">
          ⚠️ {error}
        </p>
      )}

      {/* Change button when image exists */}
      {value && !uploading && (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="mt-2 font-sans text-xs text-ocean-blue hover:underline flex items-center gap-1"
        >
          <FiImage size={12} /> Change image
        </button>
      )}
    </div>
  );
};

export default ImageUploader;
