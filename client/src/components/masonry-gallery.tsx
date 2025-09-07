import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import type { GalleryItem } from "@shared/schema";

interface MasonryGalleryProps {
  items: GalleryItem[];
  onItemClick: (item: GalleryItem) => void;
}

export default function MasonryGallery({
  items,
  onItemClick,
}: MasonryGalleryProps) {
  return (
    <div className="masonry-grid">
      {items.map((item, index) => (
        <GalleryItemComponent
          key={item.id}
          item={item}
          index={index}
          onClick={() => onItemClick(item)}
        />
      ))}
    </div>
  );
}

interface GalleryItemComponentProps {
  item: GalleryItem;
  index: number;
  onClick: () => void;
}

function GalleryItemComponent({
  item,
  index,
  onClick,
}: GalleryItemComponentProps) {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <motion.div
      ref={ref}
      className={`masonry-item animate-on-scroll ${isVisible ? "visible" : ""}`}
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <motion.button
        className="glass-card p-3 rounded-3xl hover:scale-105 transition-all duration-300 cursor-pointer w-full"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        data-testid={`button-gallery-item-${item.id}`}
      >
        <img
          src={item.imageUrl}
          alt={item.title}
          className="w-full rounded-2xl"
          loading="lazy"
        />
        <div className="p-3 text-center">
          <h4
            className="font-semibold"
            data-testid={`text-gallery-title-${item.id}`}
          >
            {item.title}
          </h4>
        </div>
      </motion.button>
    </motion.div>
  );
}
