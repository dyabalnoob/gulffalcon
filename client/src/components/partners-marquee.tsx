import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/language-context";

// Import all partner logos dynamically
import logo1 from "@assets/okal -1 (1).webp";
import logo2 from "@assets/okal -1 (2).webp";
import logo3 from "@assets/okal -1 (3).webp";
import logo4 from "@assets/okal -1 (4).webp";
import logo5 from "@assets/okal -1 (5).webp";
import logo6 from "@assets/okal -1 (6).webp";
import logo7 from "@assets/okal -1 (7).webp";
import logo8 from "@assets/okal -1 (8).webp";
import logo9 from "@assets/okal -1 (9).webp";
import logo10 from "@assets/okal -1 (10).webp";
import logo11 from "@assets/okal -1 (11).webp";
import logo12 from "@assets/okal -1 (12).webp";
import logo13 from "@assets/okal -1 (13).webp";
import logo14 from "@assets/okal -1 (14).webp";
import logo15 from "@assets/okal -1 (15).webp";
import logo16 from "@assets/okal -1 (16).webp";
import logo17 from "@assets/okal -1 (17).webp";
import logo18 from "@assets/okal -1 (18).webp";
import logo19 from "@assets/okal -1 (19).webp";
import logo20 from "@assets/okal -1 (20).webp";
import logo21 from "@assets/okal -1 (21).webp";
import logo22 from "@assets/okal -1 (22).webp";
import logo23 from "@assets/okal -1 (23).webp";
import logo24 from "@assets/okal -1 (24).webp";
import logo25 from "@assets/okal -1 (25).webp";
import logo26 from "@assets/okal -1 (26).webp";
import logo27 from "@assets/okal -1 (27).webp";
import logo28 from "@assets/okal -1 (28).webp";
import logo29 from "@assets/okal -1 (29).webp";
import logo30 from "@assets/okal -1 (30).webp";
import logo31 from "@assets/okal -1 (31).webp";
import logo32 from "@assets/okal -1 (32).webp";
import logo33 from "@assets/okal -1 (33).webp";
import logo34 from "@assets/okal -1 (34).webp";
import logo35 from "@assets/okal -1 (35).webp";
import logo36 from "@assets/okal -1 (36).webp";
import logo37 from "@assets/okal -1 (37).webp";
import logo38 from "@assets/okal -1 (38).webp";
import logo39 from "@assets/okal -1 (39).webp";
import logo40 from "@assets/okal -1 (40).webp";
import logo41 from "@assets/okal -1 (41).webp";
import logo42 from "@assets/okal -1 (42).webp";
import logo43 from "@assets/okal -1 (43).webp";
import logo44 from "@assets/okal -1 (44).webp";
import logo45 from "@assets/okal -1 (45).webp";
import logo46 from "@assets/okal -1 (46).webp";
import logo47 from "@assets/okal -1 (47).webp";
import logo48 from "@assets/okal -1 (48).webp";
import logo49 from "@assets/okal -1 (49).webp";
import logo50 from "@assets/okal -1 (50).webp";
import logo51 from "@assets/okal -1 (51).webp";
import logo52 from "@assets/okal -1 (52).webp";

const partnerLogos = [
  // First row
  [logo1, logo2, logo3, logo4, logo5, logo6, logo7, logo8, logo9, logo10, logo11, logo12, logo13, logo14, logo15, logo16, logo17, logo18],
  // Second row
  [logo19, logo20, logo21, logo22, logo23, logo24, logo25, logo26, logo27, logo28, logo29, logo30, logo31, logo32, logo33, logo34],
  // Third row
  [logo35, logo36, logo37, logo38, logo39, logo40, logo41, logo42, logo43, logo44, logo45, logo46, logo47, logo48, logo49, logo50, logo51, logo52]
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
        {partnerLogos.map((row, rowIndex) => (
          <div key={rowIndex} className="relative">
            <motion.div
              className="flex gap-8"
              animate={{
                x: rowIndex % 2 === 0 ? [0, -3000] : [-3000, 0],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 40 + rowIndex * 5,
                  ease: "linear",
                },
              }}
            >
              {/* Duplicate the array for seamless loop */}
              {[...row, ...row, ...row].map((logo, index) => (
                <div
                  key={`partner-${rowIndex}-${index}`}
                  className="flex-shrink-0"
                >
                  <div className="w-32 h-20 px-4 py-2 glass-card professional-border rounded-2xl hover:scale-105 transition-transform cursor-pointer flex items-center justify-center bg-white/90">
                    <img 
                      src={logo}
                      alt={`Partner ${index}`}
                      className="max-w-full max-h-full object-contain"
                      data-testid={`img-partner-${rowIndex}-${index}`}
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        ))}
      </div>

      {/* Gradient overlays for smooth fade effect */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
    </section>
  );
}