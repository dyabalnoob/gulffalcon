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
      className="glass-card p-4 rounded-3xl hover:shadow-2xl transition-all duration-300 text-right w-full"
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick?.(product)}
      data-testid={`card-product-${product.id}`}
    >
      <div className="relative w-full h-64 rounded-2xl overflow-hidden mb-4">
        <img 
          src={product.imageUrl} 
          alt={product.title}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div className="text-right">
        <h3 className="text-lg font-semibold mb-1" data-testid={`text-product-title-${product.id}`}>
          {product.title}
        </h3>
        {brand && (
          <p className="text-sm opacity-70 mb-2" data-testid={`text-product-brand-${product.id}`}>
            {brand.name}
          </p>
        )}
        {product.tags && product.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 justify-end">
            {product.tags.map((tag, index) => (
              <span 
                key={index}
                className="px-2 py-1 text-xs bg-accent/20 text-accent rounded-lg"
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
