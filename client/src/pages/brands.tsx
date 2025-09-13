import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import type { Brand } from "@shared/schema";

export default function Brands() {
  const { data: brands = [] } = useQuery<Brand[]>({
    queryKey: ["/api/brands"],
  });

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
          الماركات
        </motion.h1>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {brands.map((brand, index) => (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link href={`/brands/${brand.slug}`}>
                <motion.div
                  className="glass-card p-6 rounded-3xl hover:shadow-2xl transition-all duration-300 cursor-pointer text-center"
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  data-testid={`card-brand-${brand.slug}`}
                >
                  <div className="mb-4">
                    <div className="w-20 h-20 mx-auto rounded-2xl glass-card flex items-center justify-center text-2xl font-bold text-accent">
                      {brand.nameAr?.charAt(0) || brand.nameEn?.charAt(0) || '؟'}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2" data-testid={`text-brand-name-${brand.slug}`}>
                    {brand.nameAr || brand.nameEn}
                  </h3>
                  {(brand.descriptionAr || brand.descriptionEn) && (
                    <p className="text-sm opacity-70" data-testid={`text-brand-description-${brand.slug}`}>
                      {brand.descriptionAr || brand.descriptionEn}
                    </p>
                  )}
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {brands.length === 0 && (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-lg opacity-70" data-testid="text-no-brands">
              لم يتم العثور على ماركات
            </p>
          </motion.div>
        )}
      </div>
    </motion.main>
  );
}
