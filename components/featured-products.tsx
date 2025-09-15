import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "./product-card";
import type { Product, Brand } from "@shared/schema";

export default function FeaturedProducts() {
  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products", { featured: true }],
  });

  const { data: brands = [] } = useQuery<Brand[]>({
    queryKey: ["/api/brands"],
  });

  if (isLoading) {
    return (
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">جاري التحميل...</div>
        </div>
      </section>
    );
  }

  const featuredProducts = products.filter(product => product.featured);

  return (
    <section className="py-16 bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2 
          className="text-center text-3xl font-bold mb-12 text-gradient"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          منتجات مميزة
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product, index) => {
            const brand = brands.find(b => b.id === product.brandId);
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <ProductCard product={product} brand={brand} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}