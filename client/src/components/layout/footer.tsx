import { motion } from "framer-motion";
import logoImage from "@assets/logo الصقر الخليجي_1757177659109.png";

export default function Footer() {
  return (
    <footer className="py-16 brand-gradient border-t-2 border-yellow-500/30">
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
              <div className="w-14 h-14 rounded-2xl luxury-border bg-gradient-to-br from-yellow-400/20 to-amber-600/20 overflow-hidden flex items-center justify-center">
                <img 
                  src={logoImage} 
                  alt="مؤسسة الصقر الخليجي" 
                  className="w-10 h-10 object-contain"
                />
              </div>
              <span className="text-2xl font-bold text-gradient">مؤسسة الصقر الخليجي</span>
            </div>
            <p className="opacity-90 mb-6 max-w-md text-lg font-light">
              رائدة في عالم الأناقة الرجالية، نقدم أفضل الأزياء التقليدية والعصرية بجودة عالية وتصاميم فريدة.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-12 h-12 rounded-xl luxury-border hover:luxury-glow bg-gradient-to-br from-yellow-400/10 to-amber-600/10 hover:from-yellow-400/20 hover:to-amber-600/20 grid place-items-center transition-all" data-testid="link-social-instagram">📱</a>
              <a href="#" className="w-12 h-12 rounded-xl luxury-border hover:luxury-glow bg-gradient-to-br from-yellow-400/10 to-amber-600/10 hover:from-yellow-400/20 hover:to-amber-600/20 grid place-items-center transition-all" data-testid="link-social-facebook">📘</a>
              <a href="#" className="w-12 h-12 rounded-xl luxury-border hover:luxury-glow bg-gradient-to-br from-yellow-400/10 to-amber-600/10 hover:from-yellow-400/20 hover:to-amber-600/20 grid place-items-center transition-all" data-testid="link-social-snapchat">📷</a>
              <a href="#" className="w-12 h-12 rounded-xl luxury-border hover:luxury-glow bg-gradient-to-br from-yellow-400/10 to-amber-600/10 hover:from-yellow-400/20 hover:to-amber-600/20 grid place-items-center transition-all" data-testid="link-social-twitter">🐦</a>
            </div>
          </motion.div>
          
          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="font-bold mb-4 text-yellow-500 text-lg">روابط سريعة</h4>
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
            <h4 className="font-bold mb-4 text-yellow-500 text-lg">خدماتنا</h4>
            <ul className="space-y-2">
              <li className="opacity-80">قياس مخصص</li>
              <li className="opacity-80">تصميم حسب الطلب</li>
              <li className="opacity-80">خدمة التوصيل</li>
              <li className="opacity-80">استشارة أزياء</li>
              <li className="opacity-80">خدمة ما بعد البيع</li>
            </ul>
          </motion.div>
        </div>
        
        <div className="border-t-2 border-yellow-500/30 mt-12 pt-8 text-center">
          <p className="opacity-80 text-lg font-light">© 2024 مؤسسة الصقر الخليجي. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
}
