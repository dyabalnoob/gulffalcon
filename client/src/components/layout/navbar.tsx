import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import ThemeToggle from "@/components/theme-toggle";
import logoImage from "@assets/logo الصقر الخليجي_1757177659109.png";

const navLinks = [
  { href: "/", label: "الرئيسية" },
  { href: "/products", label: "المنتجات" },
  { href: "/brands", label: "الماركات" },
  { href: "/gallery", label: "المعرض" },
  { href: "/contact", label: "تواصل" },
];

export default function Navbar() {
  const [location] = useLocation();

  return (
    <motion.header 
      className="fixed top-0 right-0 left-0 z-50 glass-card luxury-border"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <motion.div 
            className="flex items-center gap-3 hover:scale-105 transition-transform cursor-pointer"
            whileHover={{ scale: 1.05 }}
            data-testid="link-logo"
          >
            <div className="w-12 h-12 rounded-2xl luxury-border bg-gradient-to-br from-yellow-400/20 to-amber-600/20 overflow-hidden flex items-center justify-center">
              <img 
                src={logoImage} 
                alt="مؤسسة الصقر الخليجي" 
                className="w-10 h-10 object-contain"
              />
            </div>
            <span className="font-bold text-xl tracking-wide text-gradient">الصقر الخليجي</span>
          </motion.div>
        </Link>
        
        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <motion.div
                className={`px-4 py-2 rounded-xl hover:bg-gradient-to-r hover:from-yellow-400/10 hover:to-amber-600/10 transition-all text-sm font-semibold cursor-pointer uppercase tracking-wider ${
                  location === link.href 
                    ? "bg-gradient-to-r from-yellow-400/20 to-amber-600/20 luxury-shimmer" 
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
        
        {/* Theme Toggle */}
        <ThemeToggle />
      </div>
    </motion.header>
  );
}
