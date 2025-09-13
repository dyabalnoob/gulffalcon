import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import type { Brand } from "@shared/schema";

export default function BrandMarquee() {
  const { data: brands = [] } = useQuery<Brand[]>({
    queryKey: ["/api/brands"],
  });

  const displayBrands = [...brands, ...brands]; // Duplicate for infinite scroll

  return (
    <section className="py-16 brand-gradient">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2 
          className="text-center text-2xl font-bold mb-8 text-gradient professional-text-shadow"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          شركاؤنا المتميزون
        </motion.h2>
        <div className="relative overflow-hidden">
          <motion.div 
            className="flex gap-12 will-change-transform"
            animate={{ x: [0, -50 + "%"] }}
            transition={{ 
              duration: 40, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          >
            {displayBrands.map((brand, index) => (
              <motion.div
                key={`${brand.id}-${index}`}
                className="shrink-0 w-36 h-18 glass-card professional-border rounded-lg flex items-center justify-center font-semibold text-primary opacity-90 hover:opacity-100 transition-all"
                whileHover={{ scale: 1.08 }}
                data-testid={`brand-marquee-${brand.slug}`}
              >
                {brand.name}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
