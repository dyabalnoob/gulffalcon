import { useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import MasonryGallery from "@/components/masonry-gallery";
import Lightbox from "@/components/lightbox";
import type { GalleryItem } from "@shared/schema";

export default function Gallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const { data: galleryItems = [] } = useQuery<GalleryItem[]>({
    queryKey: ["/api/gallery"],
  });

  const handleItemClick = (item: GalleryItem) => {
    setSelectedItem(item);
    setLightboxOpen(true);
  };

  return (
    <motion.main
      className="min-h-screen pt-24 pb-10 brand-gradient"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-accent">
            معرض الصور
          </h1>
          <p className="text-lg opacity-80 max-w-2xl mx-auto">
            شاهد أحدث تصاميمنا والإطلالات المميزة من عالم الأناقة الرجالية
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <MasonryGallery 
            items={galleryItems} 
            onItemClick={handleItemClick} 
          />
        </motion.div>

        {galleryItems.length === 0 && (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-lg opacity-70" data-testid="text-no-gallery-items">
              لم يتم العثور على صور في المعرض
            </p>
          </motion.div>
        )}

        <Lightbox
          isOpen={lightboxOpen}
          imageSrc={selectedItem?.imageUrl || ""}
          imageAlt={selectedItem?.title || ""}
          onClose={() => setLightboxOpen(false)}
        />
      </div>
    </motion.main>
  );
}
