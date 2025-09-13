import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import Hero from "@/components/hero";
import BrandMarquee from "@/components/brand-marquee";
import ProductCard from "@/components/product-card";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useLanguage } from "@/contexts/language-context";
import type { Product, Brand } from "@shared/schema";

function Section({ 
  children, 
  title, 
  tone = "normal" 
}: { 
  children: React.ReactNode; 
  title: string; 
  tone?: "normal" | "muted" 
}) {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <motion.section 
      ref={ref}
      className={`py-20 ${tone === "muted" ? "brand-gradient" : ""}`}
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold mb-6 text-center text-accent"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {title}
        </motion.h2>
        {children}
      </div>
    </motion.section>
  );
}

export default function Home() {
  const { t } = useLanguage();
  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const { data: brands = [] } = useQuery<Brand[]>({
    queryKey: ["/api/brands"],
  });

  const featuredProducts = products.slice(0, 3);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      
      <Section title={t.about.title}>
        <motion.div 
          className="text-lg leading-8 text-center opacity-90 max-w-4xl mx-auto space-y-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p>{t.about.paragraph1}</p>
          <p>{t.about.paragraph2}</p>
          <p>{t.about.paragraph3}</p>
          <motion.div 
            className="mt-8"
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <a 
              href="/about" 
              className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-2xl font-semibold hover:scale-105 transition-all"
            >
              {t.about.readMore}
            </a>
          </motion.div>
        </motion.div>
      </Section>

      <BrandMarquee />

      <Section title={t.products.featured} tone="muted">
        <div className="grid md:grid-cols-3 gap-6">
          {featuredProducts.map((product, index) => {
            const brand = brands.find(b => b.id === product.brandId);
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <ProductCard 
                  product={product} 
                  brand={brand}
                />
              </motion.div>
            );
          })}
        </div>
      </Section>
    </motion.main>
  );
}
