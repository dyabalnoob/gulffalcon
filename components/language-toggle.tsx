import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/language-context";

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <motion.button
      onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
      className="px-3 py-1.5 rounded-lg text-xs font-medium professional-border hover:bg-primary/10 transition-all"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      data-testid="button-language-toggle"
    >
      {language === 'ar' ? 'EN' : 'عربي'}
    </motion.button>
  );
}