import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

interface LightboxProps {
  isOpen: boolean;
  imageSrc: string;
  imageAlt: string;
  onClose: () => void;
}

export default function Lightbox({ isOpen, imageSrc, imageAlt, onClose }: LightboxProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          data-testid="lightbox-overlay"
        >
          <motion.div
            className="relative max-w-4xl max-h-[90vh] w-full"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="absolute -top-4 -right-4 w-10 h-10 bg-white text-black rounded-full flex items-center justify-center hover:scale-110 transition-all z-10"
              data-testid="button-close-lightbox"
            >
              ✕
            </Button>
            <motion.img
              src={imageSrc}
              alt={imageAlt}
              className="w-full h-auto rounded-2xl"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1 }}
              data-testid="img-lightbox"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
