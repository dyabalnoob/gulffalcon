import { motion } from "framer-motion";
import logoImage from "@assets/logo الصقر الخليجي_1757177659109.png";

export default function Footer() {
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
              <div className="w-12 h-12 rounded-2xl bg-white/10 dark:bg-white/10 light:bg-brand-green/10 overflow-hidden flex items-center justify-center">
                <img 
                  src={logoImage} 
                  alt="مؤسسة الصقر الخليجي" 
                  className="w-10 h-10 object-contain"
                />
              </div>
              <span className="text-xl font-bold">مؤسسة الصقر الخليجي</span>
            </div>
            <p className="opacity-80 mb-4 max-w-md">
              رائدة في عالم الأناقة الرجالية، نقدم أفضل الأزياء التقليدية والعصرية بجودة عالية وتصاميم فريدة.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-xl bg-white/10 dark:bg-white/10 light:bg-black/5 hover:bg-primary/20 grid place-items-center transition-all" data-testid="link-social-instagram">📱</a>
              <a href="#" className="w-10 h-10 rounded-xl bg-white/10 dark:bg-white/10 light:bg-black/5 hover:bg-primary/20 grid place-items-center transition-all" data-testid="link-social-facebook">📘</a>
              <a href="#" className="w-10 h-10 rounded-xl bg-white/10 dark:bg-white/10 light:bg-black/5 hover:bg-primary/20 grid place-items-center transition-all" data-testid="link-social-snapchat">📷</a>
              <a href="#" className="w-10 h-10 rounded-xl bg-white/10 dark:bg-white/10 light:bg-black/5 hover:bg-primary/20 grid place-items-center transition-all" data-testid="link-social-twitter">🐦</a>
            </div>
          </motion.div>
          
          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="font-semibold mb-4 text-accent">روابط سريعة</h4>
            <ul className="space-y-2">
              <li><a href="/" className="opacity-80 hover:opacity-100 transition-opacity" data-testid="link-footer-home">الرئيسية</a></li>
              <li><a href="/products" className="opacity-80 hover:opacity-100 transition-opacity" data-testid="link-footer-products">المنتجات</a></li>
              <li><a href="/brands" className="opacity-80 hover:opacity-100 transition-opacity" data-testid="link-footer-brands">الماركات</a></li>
              <li><a href="/gallery" className="opacity-80 hover:opacity-100 transition-opacity" data-testid="link-footer-gallery">المعرض</a></li>
              <li><a href="/contact" className="opacity-80 hover:opacity-100 transition-opacity" data-testid="link-footer-contact">تواصل معنا</a></li>
            </ul>
          </motion.div>
          
          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="font-semibold mb-4 text-accent">خدماتنا</h4>
            <ul className="space-y-2">
              <li className="opacity-80">قياس مخصص</li>
              <li className="opacity-80">تصميم حسب الطلب</li>
              <li className="opacity-80">خدمة التوصيل</li>
              <li className="opacity-80">استشارة أزياء</li>
              <li className="opacity-80">خدمة ما بعد البيع</li>
            </ul>
          </motion.div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="opacity-60">© 2024 مؤسسة الصقر الخليجي. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
}
