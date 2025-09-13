import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import Hero from "@/components/hero";
import PartnersMarquee from "@/components/partners-marquee";
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
          <p className="mb-4">
            منذ انطلاقتها في الرياض عام 1979م، جمعت المؤسسة بين الأصالة والابتكار لتبني علامة تجارية راسخة في عالم الأناقة الرجالية. وفي عام 1986م وُلد براند الصقر الخليجي ليصبح رمزًا للجودة والفخامة في السوق الخليجي.
          </p>
          <p className="mb-4">
            على مدى أكثر من أربعة عقود، وسّعت المؤسسة حضورها عبر مركزها التجاري الكبير بالرياض، بخدمات متكاملة تلبي تطلعات عملائها من مختلف المناطق.
          </p>
          <p>
            تُعد الصقر الخليجي أول من ابتكر عقال الشبح عام 1990 للأسواق الخليجية، كما انفردت بكونها المورد والموزع لمشالح نبيه حمد الله، وتواصل اليوم تقديم نخبة من المشالح الصيفية والشتوية بألوان نجفية وحساوية وكويتية أصيلة.
          </p>
          <motion.div 
            className="mt-8"
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <a 
              href="/about" 
              className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-2xl font-semibold hover:scale-105 transition-all"
            >
              اقرأ المزيد
            </a>
          </motion.div>
        </motion.div>
      </Section>

      <PartnersMarquee />

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
