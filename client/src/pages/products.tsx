import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "@/components/product-card";
import ProductFilters from "@/components/product-filters";
import Lightbox from "@/components/lightbox";
import type { Product, Brand } from "@shared/schema";

export default function Products() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [filters, setFilters] = useState({
    search: "",
    brandId: "",
    tags: [] as string[],
  });

  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const { data: brands = [] } = useQuery<Brand[]>({
    queryKey: ["/api/brands"],
  });

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = !filters.search || 
        product.title.toLowerCase().includes(filters.search.toLowerCase());
      
      const matchesBrand = !filters.brandId || product.brandId === filters.brandId;
      
      const matchesTags = filters.tags.length === 0 || 
        filters.tags.every(tag => product.tags?.includes(tag));

      return matchesSearch && matchesBrand && matchesTags;
    });
  }, [products, filters]);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setLightboxOpen(true);
  };

  return (
    <motion.main
      className="min-h-screen pt-24 pb-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <motion.h1 
          className="text-3xl md:text-4xl font-bold text-accent text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          المنتجات
        </motion.h1>

        <ProductFilters 
          brands={brands} 
          onFilter={setFilters} 
        />

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {filteredProducts.map((product, index) => {
            const brand = brands.find(b => b.id === product.brandId);
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
              >
                <ProductCard
                  product={product}
                  brand={brand}
                  onClick={handleProductClick}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {filteredProducts.length === 0 && (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-lg opacity-70" data-testid="text-no-products">
              لم يتم العثور على منتجات تطابق البحث
            </p>
          </motion.div>
        )}

        <Lightbox
          isOpen={lightboxOpen}
          imageSrc={selectedProduct?.imageUrl || ""}
          imageAlt={selectedProduct?.title || ""}
          onClose={() => setLightboxOpen(false)}
        />
      </div>
    </motion.main>
  );
}
