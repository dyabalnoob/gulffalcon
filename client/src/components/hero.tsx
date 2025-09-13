import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/language-context";
import logoImage from "@assets/logo الصقر الخليجي_1757177659109.png";
import heroVideo from "@assets/فيديو الخلفيه الصقر الخليجي  _1757181776177.mp4";

export default function Hero() {
  const { t } = useLanguage();
  return (
    <section className="relative overflow-hidden min-h-screen flex items-center brand-gradient">
      {/* Video Background */}
      <video 
        className="absolute inset-0 w-full h-full object-cover opacity-20" 
        autoPlay 
        loop 
        muted 
        playsInline
        preload="auto"
        poster={logoImage}
        onError={(e) => {
          console.error('Video loading error:', e);
          // Hide video on error
          (e.target as HTMLVideoElement).style.display = 'none';
        }}
        onLoadStart={() => console.log('Video loading started')}
        onCanPlay={() => console.log('Video ready to play')}
        onLoadedData={() => console.log('Video data loaded')}
      >
        <source src={heroVideo} type="video/mp4" />
      </video>
      
      {/* Hero Content */}
      <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Brand Icon */}
          <motion.div 
            className="mx-auto mb-6 w-40 h-40 rounded-xl glass-card professional-border overflow-hidden flex items-center justify-center"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <img 
              src={logoImage} 
              alt="مؤسسة الصقر الخليجي" 
              className="w-32 h-32 object-contain"
            />
          </motion.div>
          
          {/* Main Heading */}
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 text-gradient professional-text-shadow"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t.hero.title}
          </motion.h1>
          
          {/* Subtitle */}
          <motion.p 
            className="mt-4 text-xl md:text-2xl opacity-90 max-w-4xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {t.hero.subtitle}
          </motion.p>
          
          {/* CTA Buttons */}
          <motion.div 
            className="mt-8 flex items-center justify-center gap-4 flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button 
              asChild
              className="px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold hover:scale-105 transition-all shadow-lg text-base"
              data-testid="button-hero-catalog"
            >
              <a href="/products">{t.hero.ctaCatalog}</a>
            </Button>
            <Button 
              asChild
              variant="ghost"
              className="px-8 py-4 rounded-xl glass-card professional-border font-semibold hover:scale-105 transition-all text-base"
              data-testid="button-hero-contact"
            >
              <a href="/contact">{t.hero.ctaContact}</a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Decorative Blurs */}
      <motion.div 
        className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-r from-green-500/20 to-teal-600/20 blur-3xl"
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-r from-green-600/15 to-emerald-700/15 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.4, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
    </section>
  );
}
