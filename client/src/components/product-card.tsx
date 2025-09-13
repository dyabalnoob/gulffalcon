import { motion } from "framer-motion";
import type { Product, Brand } from "@shared/schema";

interface ProductCardProps {
  product: Product;
  brand?: Brand;
  onClick?: (product: Product) => void;
}

export default function ProductCard({ product, brand, onClick }: ProductCardProps) {
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
          src={product.imageUrl} 
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
      </div>
      <div className="text-right">
        <h3 className="text-xl font-bold mb-2 text-gradient" data-testid={`text-product-title-${product.id}`}>
          {product.title}
        </h3>
        {brand && (
          <p className="text-sm opacity-80 mb-3 text-secondary" data-testid={`text-product-brand-${product.id}`}>
            {brand.name}
          </p>
        )}
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
