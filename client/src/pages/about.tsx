import { motion } from "framer-motion";
import { Building2, Target, Award, Globe, Shirt, Crown, Eye, Heart } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

export default function About() {
  const { t, isRTL } = useLanguage();

  const features = [
    {
      icon: Building2,
      title: isRTL ? "التأسيس" : "Foundation",
      description: isRTL ? "انطلقت المؤسسة عام 1979م من الرياض" : "Established in 1979 in Riyadh",
    },
    {
      icon: Crown,
      title: isRTL ? "الريادة" : "Leadership",
      description: isRTL ? "رائدة في صناعة الأزياء الرجالية الفاخرة" : "Leader in luxury men's fashion",
    },
    {
      icon: Globe,
      title: isRTL ? "الانتشار" : "Presence",
      description: isRTL ? "شبكة واسعة من الوكلاء والموزعين" : "Wide network of agents and distributors",
    },
    {
      icon: Shirt,
      title: isRTL ? "الابتكار" : "Innovation",
      description: isRTL ? "أول من ابتكر عقال الشبح عام 1990" : "First to innovate Shubah Agal in 1990",
    },
  ];

  return (
    <motion.main
      className="min-h-screen pt-24 pb-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <section className="brand-gradient py-16 mb-12">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
              {isRTL ? "مؤسسة الصقر الخليجي للتجارة" : "Gulf Falcon Trading Corporation"}
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              {isRTL ? "أكثر من أربعة عقود من التميز في عالم الأناقة الرجالية" : "Over four decades of excellence in men's elegance"}
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6">
        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="glass-card p-6 rounded-3xl text-center"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.2 }}
              data-testid={`feature-card-${index}`}
            >
              <feature.icon className="w-10 h-10 mx-auto mb-3 text-accent" />
              <h3 className="font-bold mb-2">{feature.title}</h3>
              <p className="text-sm opacity-70">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Company Story */}
        <motion.div
          className="glass-card p-8 rounded-3xl mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="text-3xl font-bold mb-6 text-gradient text-center">
            {isRTL ? "قصتنا" : "Our Story"}
          </h2>
          <div className={`prose prose-lg max-w-none ${isRTL ? 'text-right' : 'text-left'}`}>
            {isRTL ? (
              <>
                <p className="text-lg leading-relaxed mb-6">
                  منذ انطلاقتها في الرياض عام 1979م، جمعت المؤسسة بين الأصالة والابتكار لتبني علامة تجارية راسخة في عالم الأناقة الرجالية. وفي عام 1986م وُلد براند الصقر الخليجي ليصبح رمزًا للجودة والفخامة في السوق الخليجي.
                </p>
                <p className="text-lg leading-relaxed mb-6">
                  على مدى أكثر من أربعة عقود، وسّعت المؤسسة حضورها عبر مركزها التجاري الكبير بالرياض، بخدمات متكاملة تلبي تطلعات عملائها من مختلف المناطق.
                </p>
                <p className="text-lg leading-relaxed mb-6">
                  تُعد الصقر الخليجي أول من ابتكر عقال الشبح عام 1990 للأسواق الخليجية، كما انفردت بكونها المورد والموزع لمشالح نبيه حمد الله، وتواصل اليوم تقديم نخبة من المشالح الصيفية والشتوية بألوان نجفية وحساوية وكويتية أصيلة.
                </p>
                <p className="text-lg leading-relaxed">
                  وتبقى المؤسسة الوحيدة التي تمنح عملاءها ميزة تفصيل العقال والمشالح والبشوت حسب الطلب، لتجعل من كل قطعة توقيعًا شخصيًا يليق بمكانتهم.
                </p>
              </>
            ) : (
              <>
                <p className="text-lg leading-relaxed mb-6">
                  Since its inception in Riyadh in 1979, the corporation has combined authenticity with innovation to build a well-established brand in the world of men's elegance. In 1986, the Gulf Falcon brand was born to become a symbol of quality and luxury in the Gulf market.
                </p>
                <p className="text-lg leading-relaxed mb-6">
                  Over more than four decades, the corporation has expanded its presence through its large commercial center in Riyadh, with integrated services that meet the aspirations of customers from various regions.
                </p>
                <p className="text-lg leading-relaxed mb-6">
                  Gulf Falcon was the first to innovate the Shubah Agal in 1990 for Gulf markets. It has also uniquely served as the supplier and distributor for Nabih Hamdallah's bisht collection, and continues today to offer a selection of summer and winter bishts in authentic Najafi, Hasawi, and Kuwaiti colors.
                </p>
                <p className="text-lg leading-relaxed">
                  The corporation remains the only one that offers its customers the advantage of custom-tailored agals, mashlahs, and bishts, making each piece a personal signature worthy of their status.
                </p>
              </>
            )}
          </div>
        </motion.div>

        {/* Vision & Mission */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* Vision */}
          <motion.div
            className="glass-card p-8 rounded-3xl"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center mb-4">
              <Eye className="w-8 h-8 text-accent mr-3" />
              <h3 className="text-2xl font-bold text-gradient">
                {isRTL ? "رؤيتنا" : "Our Vision"}
              </h3>
            </div>
            <p className={`text-lg leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
              {isRTL 
                ? "أن نكون الرائدين في صناعة الأزياء الرجالية الفاخرة في المنطقة، محافظين على تراثنا الأصيل مع مواكبة أحدث صيحات الموضة العالمية."
                : "To be the leaders in the luxury men's fashion industry in the region, preserving our authentic heritage while keeping pace with the latest global fashion trends."
              }
            </p>
          </motion.div>

          {/* Mission */}
          <motion.div
            className="glass-card p-8 rounded-3xl"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center mb-4">
              <Heart className="w-8 h-8 text-accent mr-3" />
              <h3 className="text-2xl font-bold text-gradient">
                {isRTL ? "رسالتنا" : "Our Mission"}
              </h3>
            </div>
            <p className={`text-lg leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
              {isRTL 
                ? "تقديم أجود أنواع الملابس الرجالية التقليدية والعصرية، مع الحرص على التميز في الخدمة وبناء علاقات طويلة الأمد مع عملائنا."
                : "To provide the finest quality traditional and modern men's clothing, while ensuring excellence in service and building long-lasting relationships with our customers."
              }
            </p>
          </motion.div>
        </motion.div>

        {/* Links to Other Pages */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <motion.a
            href="/responsibility"
            className="glass-card p-6 rounded-3xl hover:shadow-2xl transition-all duration-300 cursor-pointer text-center"
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            data-testid="link-responsibility"
          >
            <Award className="w-10 h-10 mx-auto mb-3 text-accent" />
            <h3 className="text-xl font-bold mb-2 text-accent">
              {isRTL ? "المسؤولية المجتمعية" : "Social Responsibility"}
            </h3>
            <p className="text-sm opacity-70">
              {isRTL ? "دورنا في خدمة المجتمع والتنمية" : "Our role in serving the community and development"}
            </p>
          </motion.a>

          <motion.a
            href="/future"
            className="glass-card p-6 rounded-3xl hover:shadow-2xl transition-all duration-300 cursor-pointer text-center"
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            data-testid="link-future"
          >
            <Target className="w-10 h-10 mx-auto mb-3 text-accent" />
            <h3 className="text-xl font-bold mb-2 text-accent">
              {isRTL ? "الطموحات المستقبلية" : "Future Ambitions"}
            </h3>
            <p className="text-sm opacity-70">
              {isRTL ? "رؤيتنا للنمو والتوسع" : "Our vision for growth and expansion"}
            </p>
          </motion.a>

          <motion.a
            href="/ceo"
            className="glass-card p-6 rounded-3xl hover:shadow-2xl transition-all duration-300 cursor-pointer text-center"
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            data-testid="link-ceo"
          >
            <Crown className="w-10 h-10 mx-auto mb-3 text-accent" />
            <h3 className="text-xl font-bold mb-2 text-accent">
              {isRTL ? "المدير التنفيذي" : "Chief Executive Officer"}
            </h3>
            <p className="text-sm opacity-70">
              {isRTL ? "ذياب عايض النوب" : "Dhiab Ayed Al-Noub"}
            </p>
          </motion.a>
        </motion.div>
      </div>
    </motion.main>
  );
}