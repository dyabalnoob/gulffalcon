import { motion } from "framer-motion";
import { Globe } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <motion.button
      onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
      className="p-2 rounded-lg glass-card professional-border hover:bg-primary/10 transition-all flex items-center gap-2"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      data-testid="button-language-toggle"
    >
      <Globe className="w-5 h-5" />
      <span className="text-sm font-medium">
        {language === 'ar' ? 'EN' : 'عربي'}
      </span>
    </motion.button>
  );
}