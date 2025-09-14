import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Grid, List } from "lucide-react";

interface GalleryImage {
  id: number;
  filename: string;
  path: string;
  category: string;
  description: string;
}

export default function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [filteredImages, setFilteredImages] = useState<GalleryImage[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("الكل");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "masonry">("masonry");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    // Load gallery images from JSON file
    fetch('/gallery-images.json')
      .then(res => res.json())
      .then((data: GalleryImage[]) => {
        // Categorize images based on filename patterns
        const categorizedData = data.map((img, index) => {
          let category = "متنوع";
          let description = "من مجموعة الصقر الخليجي الفاخرة";

          // Distribute images into different categories for variety
          if (index % 5 === 0) {
            category = "الشماغ";
            description = "شماغ فاخر بتصاميم عصرية ومواد عالية الجودة";
          } else if (index % 5 === 1) {
            category = "الشراب";
            description = "شراب رجالي أنيق يجمع بين الراحة والأناقة";
          } else if (index % 5 === 2) {
            category = "الشنط";
            description = "حقائب رجالية فاخرة مصنوعة من أجود المواد";
          } else if (index % 5 === 3) {
            category = "الإكسسوارات";
            description = "إكسسوارات رجالية فريدة تضفي لمسة من التميز";
          } else {
            category = "الملابس";
            description = "ملابس رجالية راقية تجمع بين الأصالة والحداثة";
          }

          return { ...img, category, description };
        });

        setImages(categorizedData);
        setFilteredImages(categorizedData);
      })
      .catch(error => {
        console.error('Error loading gallery images:', error);
      });
  }, []);

  useEffect(() => {
    let filtered = images;

    if (selectedCategory !== "الكل") {
      filtered = filtered.filter(img => img.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(img => 
        img.category.includes(searchTerm) || 
        img.description.includes(searchTerm)
      );
    }

    setFilteredImages(filtered);
  }, [selectedCategory, searchTerm, images]);

  const categories = ["الكل", "الشماغ", "الشراب", "الشنط", "الإكسسوارات", "الملابس"];

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

        {/* Controls Section */}
        <motion.div
          className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Search */}
          <div className="relative w-full lg:w-80">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-golden w-5 h-5" />
            <input
              type="text"
              placeholder="البحث في المعرض..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-12 pl-4 py-3 rounded-2xl glass-card border border-golden/20 focus:border-golden/50 focus:outline-none text-white placeholder-white/60 font-arabic"
              data-testid="input-gallery-search"
            />
          </div>

          {/* View Mode Toggle */}
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

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-2xl transition-all font-arabic font-semibold ${
                selectedCategory === category
                  ? "bg-golden text-black shadow-lg shadow-golden/25"
                  : "glass-card text-white hover:bg-golden/20 hover:scale-105"
              }`}
              data-testid={`button-category-${category}`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Images Count */}
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-white/70 font-arabic">
            عرض {filteredImages.length} من أصل {images.length} صورة
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
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {filteredImages.map((image, index) => (
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
                    alt={image.description}
                    className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-3 right-3">
                    <span className="bg-golden text-black px-3 py-1 rounded-full text-sm font-semibold font-arabic">
                      {image.category}
                    </span>
                  </div>
                </div>
                
                {/* Description */}
                <div className="p-4">
                  <p className="text-white/90 text-sm font-arabic leading-relaxed">
                    {image.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* No Results */}
        {filteredImages.length === 0 && (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-lg opacity-70 font-arabic" data-testid="text-no-results">
              لم يتم العثور على صور تطابق البحث المحدد
            </p>
          </motion.div>
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