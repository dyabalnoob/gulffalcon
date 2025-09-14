import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/language-context";
import type { Product, Brand } from "@shared/schema";

interface ProductCardProps {
  product: Product;
  brand?: Brand;
  onClick?: (product: Product) => void;
}

export default function ProductCard({ product, brand, onClick }: ProductCardProps) {
  const { isRTL } = useLanguage();
  
  return (
    <motion.button
      className="glass-card professional-border p-5 rounded-xl hover:shadow-xl transition-all duration-300 text-right w-full group"
      whileHover={{ y: -8, scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick?.(product)}
      data-testid={`card-product-${product.id}`}
    >
      <div className="relative w-full h-64 rounded-lg overflow-hidden mb-4 professional-border">
        <img 
          src={product.mainImage} 
          alt={isRTL ? product.nameAr : product.nameEn}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        {product.isNew && (
          <span className="absolute top-2 left-2 px-3 py-1 bg-green-500 text-white text-xs rounded-lg font-medium">
            {isRTL ? "جديد" : "New"}
          </span>
        )}
        {product.featured && (
          <span className="absolute top-2 right-2 px-3 py-1 bg-primary text-primary-foreground text-xs rounded-lg font-medium">
            {isRTL ? "مميز" : "Featured"}
          </span>
        )}
      </div>
      <div className="text-right">
        <h3 className="text-xl font-bold mb-2 text-gradient" data-testid={`text-product-title-${product.id}`}>
          {isRTL ? product.nameAr : product.nameEn}
        </h3>
        {brand && (
          <p className="text-sm opacity-80 mb-3 text-secondary" data-testid={`text-product-brand-${product.id}`}>
            {isRTL ? brand.nameAr : brand.nameEn}
          </p>
        )}
        {/* Luxury Tagline */}
        <div className="mb-3">
          <p className="text-sm italic text-primary font-medium leading-relaxed text-center" data-testid={`text-luxury-tagline-${product.id}`}>
            "{isRTL ? product.luxuryTaglineAr : product.luxuryTaglineEn}"
          </p>
        </div>
        {product.tags && product.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 justify-end">
            {product.tags.map((tag, index) => (
              <span 
                key={index}
                className="px-3 py-1 text-xs bg-gradient-to-r from-green-500/15 to-teal-600/15 text-primary rounded-lg font-medium"
                data-testid={`tag-product-${product.id}-${index}`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.button>
  );
}