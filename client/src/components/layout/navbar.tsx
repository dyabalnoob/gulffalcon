import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import ThemeToggle from "@/components/theme-toggle";

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
      className="fixed top-0 right-0 left-0 z-50 glass-card"
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
            <div className="w-10 h-10 rounded-2xl bg-white/10 dark:bg-white/10 light:bg-brand-green/10 grid place-items-center text-xl font-bold text-accent">
              ص
            </div>
            <span className="font-bold text-lg">الصقر الخليجي</span>
          </motion.div>
        </Link>
        
        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <motion.div
                className={`px-3 py-2 rounded-xl hover:bg-white/10 dark:hover:bg-white/10 light:hover:bg-black/5 transition-all text-sm font-medium cursor-pointer ${
                  location === link.href 
                    ? "bg-white/15 dark:bg-white/15 light:bg-black/5" 
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
