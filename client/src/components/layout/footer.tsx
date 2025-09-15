import { motion } from "framer-motion";
import { Instagram, Facebook, Camera, Twitter } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
const logoImage = "/logo.png";

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="py-12 brand-gradient border-t border-border">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <motion.div 
            className="md:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl professional-border bg-gradient-to-br from-green-500/15 to-teal-600/15 overflow-hidden flex items-center justify-center">
                <img 
                  src={logoImage} 
                  alt="مؤسسة الصقر الخليجي" 
                  className="w-10 h-10 object-contain"
                />
              </div>
              <span className="text-2xl font-bold text-gradient">{t.hero.title}</span>
            </div>
            <p className="opacity-90 mb-6 max-w-md text-lg font-light">
              {t.footer.description}
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-lg professional-border bg-gradient-to-br from-green-500/10 to-teal-600/10 hover:from-green-500/20 hover:to-teal-600/20 grid place-items-center transition-all" data-testid="link-social-instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg professional-border bg-gradient-to-br from-green-500/10 to-teal-600/10 hover:from-green-500/20 hover:to-teal-600/20 grid place-items-center transition-all" data-testid="link-social-facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg professional-border bg-gradient-to-br from-green-500/10 to-teal-600/10 hover:from-green-500/20 hover:to-teal-600/20 grid place-items-center transition-all" data-testid="link-social-snapchat">
                <Camera className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg professional-border bg-gradient-to-br from-green-500/10 to-teal-600/10 hover:from-green-500/20 hover:to-teal-600/20 grid place-items-center transition-all" data-testid="link-social-twitter">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
          
          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="font-bold mb-4 text-primary text-lg">{t.footer.quickLinks}</h4>
            <ul className="space-y-2">
              <li><a href="/" className="opacity-80 hover:opacity-100 transition-opacity" data-testid="link-footer-home">{t.nav.home}</a></li>
              <li><a href="/products" className="opacity-80 hover:opacity-100 transition-opacity" data-testid="link-footer-products">{t.nav.products}</a></li>
              <li><a href="/brands" className="opacity-80 hover:opacity-100 transition-opacity" data-testid="link-footer-brands">{t.nav.brands}</a></li>
              <li><a href="/gallery" className="opacity-80 hover:opacity-100 transition-opacity" data-testid="link-footer-gallery">{t.nav.gallery}</a></li>
              <li><a href="/contact" className="opacity-80 hover:opacity-100 transition-opacity" data-testid="link-footer-contact">{t.nav.contact}</a></li>
            </ul>
          </motion.div>
          
          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="font-bold mb-4 text-primary text-lg">{t.footer.services}</h4>
            <ul className="space-y-2">
              <li className="opacity-80">{t.footer.customMeasurement}</li>
              <li className="opacity-80">{t.footer.customDesign}</li>
              <li className="opacity-80">{t.footer.delivery}</li>
              <li className="opacity-80">{t.footer.fashionConsulting}</li>
              <li className="opacity-80">{t.footer.afterSales}</li>
            </ul>
          </motion.div>
        </div>
        
        <div className="border-t border-border mt-8 pt-6 text-center">
          <p className="opacity-80 text-lg font-light">{t.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}
