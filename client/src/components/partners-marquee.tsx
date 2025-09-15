import { motion } from "framer-motion";

// Partner logos array using public paths
const partnerLogos = [
  "/partners/okal -1 (1).webp",
  "/partners/okal -1 (2).webp",
  "/partners/okal -1 (3).webp",
  "/partners/okal -1 (4).webp",
  "/partners/okal -1 (5).webp",
  "/partners/okal -1 (6).webp",
  "/partners/okal -1 (7).webp",
  "/partners/okal -1 (8).webp",
  "/partners/okal -1 (9).webp",
  "/partners/okal -1 (10).webp",
  "/partners/okal -1 (11).webp",
  "/partners/okal -1 (12).webp",
  "/partners/okal -1 (13).webp",
  "/partners/okal -1 (14).webp",
  "/partners/okal -1 (15).webp",
  "/partners/okal -1 (16).webp",
  "/partners/okal -1 (17).webp",
  "/partners/okal -1 (18).webp",
  "/partners/okal -1 (19).webp",
  "/partners/okal -1 (20).webp",
  "/partners/okal -1 (21).webp",
  "/partners/okal -1 (22).webp",
  "/partners/okal -1 (23).webp",
  "/partners/okal -1 (24).webp",
  "/partners/okal -1 (25).webp",
  "/partners/okal -1 (26).webp",
  "/partners/okal -1 (27).webp",
  "/partners/okal -1 (28).webp",
  "/partners/okal -1 (29).webp",
  "/partners/okal -1 (30).webp",
  "/partners/okal -1 (31).webp",
  "/partners/okal -1 (32).webp",
  "/partners/okal -1 (33).webp",
  "/partners/okal -1 (34).webp",
  "/partners/okal -1 (35).webp",
  "/partners/okal -1 (36).webp",
  "/partners/okal -1 (37).webp",
  "/partners/okal -1 (38).webp",
  "/partners/okal -1 (39).webp",
  "/partners/okal -1 (40).webp",
  "/partners/okal -1 (41).webp",
  "/partners/okal -1 (42).webp",
  "/partners/okal -1 (43).webp",
  "/partners/okal -1 (44).webp",
  "/partners/okal -1 (45).webp",
  "/partners/okal -1 (46).webp",
  "/partners/okal -1 (47).webp",
  "/partners/okal -1 (48).webp",
  "/partners/okal -1 (49).webp",
  "/partners/okal -1 (50).webp",
  "/partners/okal -1 (51).webp",
  "/partners/okal -1 (52).webp"
];

export default function PartnersMarquee() {
  return (
    <section className="py-20 professional-gradient overflow-hidden">
      <div className="text-center mb-12">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold mb-4 text-gradient"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          شركاؤنا المميزون
        </motion.h2>
        <motion.p 
          className="text-lg opacity-80 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          نفخر بالعمل مع أفضل الشركاء لتقديم منتجات وخدمات متميزة
        </motion.p>
      </div>

      {/* First Marquee - Left to Right */}
      <div className="relative overflow-hidden mb-8">
        <motion.div 
          className="flex gap-8 whitespace-nowrap"
          animate={{ x: [0, -2000] }}
          transition={{ 
            x: { 
              repeat: Infinity, 
              repeatType: "loop", 
              duration: 30, 
              ease: "linear" 
            } 
          }}
        >
          {[...partnerLogos, ...partnerLogos].map((logo, index) => (
            <motion.div
              key={index}
              className="flex-shrink-0 w-32 h-32 professional-border rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm p-4 hover:scale-105 transition-transform"
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={logo}
                alt={`Partner ${index + 1}`}
                className="w-full h-full object-contain opacity-80 hover:opacity-100 transition-opacity"
                loading="lazy"
                onError={(e) => {
                  // Hide broken images
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Second Marquee - Right to Left */}
      <div className="relative overflow-hidden">
        <motion.div 
          className="flex gap-8 whitespace-nowrap"
          animate={{ x: [-2000, 0] }}
          transition={{ 
            x: { 
              repeat: Infinity, 
              repeatType: "loop", 
              duration: 25, 
              ease: "linear" 
            } 
          }}
        >
          {[...[...partnerLogos].reverse(), ...[...partnerLogos].reverse()].map((logo, index) => (
            <motion.div
              key={index}
              className="flex-shrink-0 w-32 h-32 professional-border rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm p-4 hover:scale-105 transition-transform"
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={logo}
                alt={`Partner ${index + 1}`}
                className="w-full h-full object-contain opacity-80 hover:opacity-100 transition-opacity"
                loading="lazy"
                onError={(e) => {
                  // Hide broken images
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}