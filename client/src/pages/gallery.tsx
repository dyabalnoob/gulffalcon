import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Grid, List } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface GalleryImage {
  id: number;
  filename: string;
  path: string;
  category: string;
  description: string;
  displayOrder?: number;
}

export default function Gallery() {
  const [viewMode, setViewMode] = useState<"grid" | "masonry">("masonry");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Load gallery images using TanStack Query
  const { data: images = [], isLoading, error } = useQuery<GalleryImage[]>({
    queryKey: ['/gallery-images'],
    queryFn: async () => {
      const response = await fetch('/gallery-images.json');
      if (!response.ok) {
        throw new Error('Failed to load gallery images');
      }
      return response.json();
    }
  });

  return (
    <motion.main
      className="min-h-screen pt-24 pb-10 brand-gradient"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section with "من داخل معرضنا" */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block mb-6">
            <div className="shimmer-text text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent via-golden to-accent mb-4">
              من داخل معرضنا
            </div>
            <div className="h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-golden to-transparent"></div>
          </div>
          
          <h1 className="text-2xl md:text-3xl font-bold mb-4 text-accent font-arabic">
            معرض الصور
          </h1>
          <p className="text-lg opacity-80 max-w-3xl mx-auto font-arabic">
            استمتع بجولة داخل معرضنا الفاخر واكتشف أحدث التصاميم والمجموعات الحصرية من عالم الأناقة الرجالية العربية الأصيلة
          </p>
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-4">
              <div className="w-8 h-8 border-2 border-golden border-t-transparent rounded-full animate-spin"></div>
              <p className="text-lg text-white/80 font-arabic">جاري تحميل صور المعرض...</p>
            </div>
          </motion.div>
        )}

        {/* Error State */}
        {error && (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-lg text-red-400 font-arabic">
              حدث خطأ في تحميل صور المعرض. يرجى المحاولة مرة أخرى.
            </p>
          </motion.div>
        )}

        {/* View Mode Toggle */}
        {!isLoading && !error && (
          <>
            <motion.div
              className="flex justify-center items-center gap-6 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-3 rounded-xl transition-all ${viewMode === "grid" ? "bg-golden text-black" : "glass-card text-white hover:bg-golden/20"}`}
                  data-testid="button-grid-view"
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("masonry")}
                  className={`p-3 rounded-xl transition-all ${viewMode === "masonry" ? "bg-golden text-black" : "glass-card text-white hover:bg-golden/20"}`}
                  data-testid="button-masonry-view"
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </motion.div>

            {/* Images Count */}
            <motion.div
              className="text-center mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <p className="text-white/70 font-arabic">
                {images.length} صورة
              </p>
            </motion.div>

            {/* Gallery Grid */}
            <motion.div
              className={`${
                viewMode === "masonry" 
                  ? "columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6" 
                  : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {images.map((image, index) => (
                <motion.div
                  key={image.id}
                  className={`${viewMode === "masonry" ? "break-inside-avoid mb-6" : ""} group cursor-pointer`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  onClick={() => setSelectedImage(image.path)}
                  data-testid={`card-gallery-image-${image.id}`}
                >
                  <div className="glass-card rounded-3xl overflow-hidden hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-golden/20">
                    <div className="relative overflow-hidden">
                      <img
                        src={image.path}
                        alt="صورة من معرض الصقر الخليجي"
                        className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </>
        )}

        {/* Lightbox */}
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            data-testid="lightbox-overlay"
          >
            <motion.div
              className="relative max-w-5xl max-h-full"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage}
                alt="Gallery Image"
                className="max-w-full max-h-full object-contain rounded-2xl"
                data-testid="lightbox-image"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 left-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                data-testid="button-close-lightbox"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.main>
  );
}