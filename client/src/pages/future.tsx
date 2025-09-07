import { motion } from "framer-motion";

export default function Future() {
  return (
    <motion.main
      className="min-h-screen pt-24 pb-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-accent">
            الطموحات المستقبلية
          </h1>
          <p className="text-lg opacity-80 max-w-2xl mx-auto">
            رؤيتنا للنمو والتوسع في قطاع الملابس الرجالية والزي الوطني
          </p>
        </motion.div>

        <motion.div
          className="prose prose-lg max-w-none text-right"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="glass-card p-8 rounded-3xl mb-8">
            <p className="text-lg leading-relaxed mb-6">
              انطلاقًا من خبرتها الطويلة في عالم التجارة، تتطلع مؤسسة الصقر
              الخليجي للتجارة والمقاولات إلى مرحلة جديدة من النمو والتوسع عبر
              الدخول في قطاع الملابس الرجالية والزي الوطني.
            </p>

            <p className="text-lg leading-relaxed mb-6">
              بعد دراسة معمقة للسوق السعودي والخليجي، رصدت المؤسسة فرصًا واعدة
              في هذا المجال، تقوم على:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-accent/10 p-6 rounded-2xl text-center">
                <div className="text-4xl mb-4">📈</div>
                <h3 className="text-lg font-bold mb-3 text-accent">
                  الطلب المتزايد
                </h3>
                <p className="text-sm leading-relaxed">
                  تزايد الطلب على الأزياء الرجالية ذات الجودة العالية
                </p>
              </div>

              <div className="bg-accent/10 p-6 rounded-2xl text-center">
                <div className="text-4xl mb-4">👔</div>
                <h3 className="text-lg font-bold mb-3 text-accent">
                  الزي الوطني
                </h3>
                <p className="text-sm leading-relaxed">
                  استمرار المكانة الخاصة للزي الوطني السعودي كرمز للهوية والفخر
                </p>
              </div>

              <div className="bg-accent/10 p-6 rounded-2xl text-center">
                <div className="text-4xl mb-4">🏷️</div>
                <h3 className="text-lg font-bold mb-3 text-accent">
                  علامة تجارية متكاملة
                </h3>
                <p className="text-sm leading-relaxed">
                  الحاجة لعلامة تجارية تجمع بين الأصالة السعودية والتطوير العصري
                </p>
              </div>
            </div>

            <h3 className="text-2xl font-bold mb-6 text-accent">
              أهدافنا المستقبلية
            </h3>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4 p-4 bg-primary/5 rounded-xl">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                  1
                </div>
                <div>
                  <h4 className="font-semibold mb-2">إنشاء خط إنتاج متخصص</h4>
                  <p className="text-sm opacity-80">
                    في الملابس الرجالية والزي الوطني
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-primary/5 rounded-xl">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                  2
                </div>
                <div>
                  <h4 className="font-semibold mb-2">بناء براند سعودي منافس</h4>
                  <p className="text-sm opacity-80">
                    على المستويين المحلي والخليجي
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-primary/5 rounded-xl">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                  3
                </div>
                <div>
                  <h4 className="font-semibold mb-2">تقديم منتجات متميزة</h4>
                  <p className="text-sm opacity-80">
                    تجمع بين الجودة والسعر المناسب
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-primary/5 rounded-xl">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                  4
                </div>
                <div>
                  <h4 className="font-semibold mb-2">توسيع قنوات البيع</h4>
                  <p className="text-sm opacity-80">
                    من خلال المعارض، الفروع، والمتاجر الإلكترونية
                  </p>
                </div>
              </div>
            </div>

            <p className="text-lg leading-relaxed">
              بهذا الطموح، تسعى الصقر الخليجي لأن تكون أكثر من مجرد مؤسسة تجارية
              تقليدية، بل بيت خبرة ووجهة وطنية في مجال الأزياء الرجالية، مساهمة
              في تعزيز الهوية السعودية ومواكبة التطور في عالم الموضة والأسواق.
            </p>
          </div>

          <div className="text-center">
            <motion.a
              href="/about"
              className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-2xl font-semibold hover:scale-105 transition-all mr-4"
              whileHover={{ scale: 1.05 }}
            >
              العودة للنبذة
            </motion.a>
            <motion.a
              href="/ceo"
              className="inline-block px-6 py-3 glass-card rounded-2xl font-semibold hover:scale-105 transition-all"
              whileHover={{ scale: 1.05 }}
            >
              المدير التنفيذي
            </motion.a>
          </div>
        </motion.div>
      </div>
    </motion.main>
  );
}
