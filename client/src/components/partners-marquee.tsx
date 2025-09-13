import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/language-context";

const partners = [
  // First row - Premium international brands
  [
    "هوجو بوس", "أرماني", "فالنتينو", "جيفنشي", "فيرساتشي", 
    "دولتشي آند غابانا", "رالف لورين", "بربري", "غوتشي", "برادا",
    "توم فورد", "سان لوران", "لويس فيتون", "هيرميس", "زينيا"
  ],
  // Second row - Regional and traditional brands
  [
    "الدفة", "الهاشم", "البسام", "الرشيدي", "القريشي",
    "العثيم", "النخبة", "الصقر", "الملكي", "السلطان",
    "الأمير", "الوزير", "الشيخ", "النبيل", "الفخامة"
  ],
  // Third row - More brands
  [
    "كارتييه", "مونت بلانك", "دنهل", "كانالي", "كورنيليان",
    "ستيفانو ريتشي", "بريوني", "كيتون", "بوجاتي", "بيلوتي",
    "روبرتو كافالي", "جست كافالي", "فيليب بلين", "دسكوارد", "موسكينو"
  ]
];

export default function PartnersMarquee() {
  const { isRTL } = useLanguage();
  
  return (
    <section className="relative py-16 overflow-hidden brand-gradient">
      <div className="max-w-6xl mx-auto px-6 mb-12">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center text-gradient mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {isRTL ? "شركاؤنا المتميزون" : "Our Distinguished Partners"}
        </motion.h2>
        <motion.p
          className="text-lg text-center opacity-90 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {isRTL 
            ? "نفخر بشراكتنا مع أرقى الماركات العالمية والمحلية في عالم الأزياء الرجالية"
            : "We are proud of our partnership with the finest international and local brands in men's fashion"}
        </motion.p>
      </div>

      <div className="space-y-8">
        {partners.map((row, rowIndex) => (
          <div key={rowIndex} className="relative">
            <motion.div
              className="flex gap-8"
              animate={{
                x: rowIndex % 2 === 0 ? [0, -2000] : [-2000, 0],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 30 + rowIndex * 5,
                  ease: "linear",
                },
              }}
            >
              {/* Duplicate the array for seamless loop */}
              {[...row, ...row, ...row].map((partner, index) => (
                <div
                  key={`${partner}-${index}`}
                  className="flex-shrink-0"
                >
                  <div className="px-8 py-4 glass-card professional-border rounded-2xl hover:scale-105 transition-transform cursor-pointer">
                    <span className="text-lg font-semibold whitespace-nowrap text-gradient">
                      {partner}
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        ))}
      </div>

      {/* Gradient overlays for smooth fade effect */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent pointer-events-none" />
    </section>
  );
}