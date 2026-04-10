import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const images = [
  { src: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80', title: 'Sigiriya Rock Fortress', tall: true },
  { src: 'https://images.unsplash.com/photo-1582515073490-39981397c445?auto=format&fit=crop&w=800&q=80', title: 'Mirissa Beach' },
  { src: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&w=800&q=80', title: 'Ella Nine Arch Bridge' },
  { src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80', title: 'Yala National Park', tall: true },
  { src: 'https://images.unsplash.com/photo-1544008230-ac1e1fb4f4f4?auto=format&fit=crop&w=800&q=80', title: 'Temple of the Tooth' },
  { src: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?auto=format&fit=crop&w=800&q=80', title: 'Tea Plantations' },
  { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80', title: 'Horton Plains', tall: true },
  { src: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=800&q=80', title: 'Galle Fort' },
];

const Gallery = () => {
  const [selected, setSelected] = useState(null);

  return (
    <div className="pt-24 pb-20 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <span className="text-sunset-orange font-semibold text-sm tracking-widest uppercase">Visual Journey</span>
        <h1 className="section-title mt-2">Sri Lanka Gallery</h1>
        <p className="section-subtitle">A glimpse into the breathtaking beauty of the Pearl of the Indian Ocean.</p>
      </div>

      {/* Masonry Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
        {images.map((img, i) => (
          <motion.div
            key={i}
            className="break-inside-avoid relative group cursor-pointer rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            onClick={() => setSelected(img)}
          >
            <img
              src={img.src}
              alt={img.title}
              className={`w-full object-cover group-hover:scale-105 transition-transform duration-500 ${img.tall ? 'h-72' : 'h-48'}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <p className="text-white font-semibold font-playfair text-lg">{img.title}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="relative max-w-4xl w-full"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={e => e.stopPropagation()}
            >
              <img src={selected.src} alt={selected.title} className="w-full rounded-2xl shadow-2xl max-h-[80vh] object-contain" />
              <p className="text-white text-center font-playfair text-xl mt-4">{selected.title}</p>
              <button
                className="absolute -top-4 -right-4 w-10 h-10 bg-sunset-orange rounded-full text-white font-bold text-lg hover:bg-sunset-dark transition-colors"
                onClick={() => setSelected(null)}
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
