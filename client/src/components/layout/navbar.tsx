import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import ThemeToggle from "@/components/theme-toggle";
import LanguageToggle from "@/components/language-toggle";
import { useLanguage } from "@/contexts/language-context";
import logoImage from "@assets/logo الصقر الخليجي_1757177659109.png";

export default function Navbar() {
  const [location] = useLocation();
  const { t } = useLanguage();
  
  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/about", label: t.nav.about || "من نحن" },
    { href: "/products", label: t.nav.products },
    { href: "/brands", label: t.nav.brands },
    { href: "/gallery", label: t.nav.gallery },
    { href: "/contact", label: t.nav.contact },
  ];

  return (
    <motion.header 
      className="fixed top-0 right-0 left-0 z-50 glass-card professional-border"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <motion.div 
            className="flex items-center gap-3 hover:scale-105 transition-transform cursor-pointer"
            whileHover={{ scale: 1.05 }}
            data-testid="link-logo"
          >
            <div className="w-14 h-14 rounded-xl professional-border bg-gradient-to-br from-green-500/15 to-teal-600/15 overflow-hidden flex items-center justify-center">
              <img 
                src={logoImage} 
                alt="مؤسسة الصقر الخليجي" 
                className="w-12 h-12 object-contain"
              />
            </div>
            <span className="font-bold text-xl text-gradient">الصقر الخليجي</span>
          </motion.div>
        </Link>
        
        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <motion.div
                className={`px-3 py-2 rounded-lg hover:bg-gradient-to-r hover:from-green-500/10 hover:to-teal-600/10 transition-all text-sm font-medium cursor-pointer ${
                  location === link.href 
                    ? "bg-gradient-to-r from-green-500/15 to-teal-600/15" 
                    : ""
                }`}
                whileHover={{ scale: 1.05 }}
                data-testid={`link-nav-${link.href.replace("/", "home")}`}
              >
                {link.label}
              </motion.div>
            </Link>
          ))}
        </nav>
        
        {/* Theme & Language Toggle */}
        <div className="flex items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </div>
    </motion.header>
  );
}
