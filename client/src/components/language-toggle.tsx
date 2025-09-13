import { motion } from "framer-motion";
import { Languages } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <motion.button
      onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
      className="relative group p-2.5 rounded-full bg-gradient-to-r from-green-500/10 to-teal-600/10 hover:from-green-500/20 hover:to-teal-600/20 professional-border transition-all"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      data-testid="button-language-toggle"
    >
      <Languages className="w-5 h-5 text-primary" />
      <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-background/95 text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap professional-border">
        {language === 'ar' ? 'English' : 'العربية'}
      </span>
    </motion.button>
  );
}