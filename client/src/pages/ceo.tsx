import { motion } from "framer-motion";

export default function CEO() {
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
            المدير التنفيذي
          </h1>
          <h2 className="text-xl md:text-2xl font-semibold text-primary mb-4">
            ذياب بن عايض بن دليم النوب
          </h2>
        </motion.div>

        <motion.div
          className="prose prose-lg max-w-none text-right"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="glass-card p-8 rounded-3xl mb-8">
            <p className="text-lg leading-relaxed mb-6">
              يشغل ذياب عايض النوب منصب المدير التنفيذي لمؤسسة الصقر الخليجي
              للتجارة والمقاولات، ويعد الامتداد الطبيعي لمسيرة المؤسس عايض بن
              دليم النوب، جامعًا بين إرث الخبرة الطويلة للمؤسسة ورؤية عصرية
              حديثة في الإدارة والتطوير.
            </p>

            <h3 className="text-2xl font-bold mb-6 text-accent">
              نهجه القيادي
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-primary/10 p-6 rounded-2xl">
                <h4 className="text-lg font-bold mb-3 text-accent">
                  التطوير المؤسسي
                </h4>
                <p className="leading-relaxed">
                  إعادة هيكلة العمليات التجارية لتواكب متطلبات السوق المتغيرة
                </p>
              </div>

              <div className="bg-primary/10 p-6 rounded-2xl">
                <h4 className="text-lg font-bold mb-3 text-accent">
                  التحول الرقمي
                </h4>
                <p className="leading-relaxed">
                  إدخال أنظمة تقنية حديثة في المبيعات والإدارة وربط الفروع
                  والمراكز التجارية بنظم متكاملة
                </p>
              </div>

              <div className="bg-primary/10 p-6 rounded-2xl">
                <h4 className="text-lg font-bold mb-3 text-accent">
                  التوسع الاستراتيجي
                </h4>
                <p className="leading-relaxed">
                  وضع خطط مدروسة للدخول إلى قطاعات جديدة مثل الملابس الرجالية
                  والزي الوطني
                </p>
              </div>

              <div className="bg-primary/10 p-6 rounded-2xl">
                <h4 className="text-lg font-bold mb-3 text-accent">
                  المسؤولية المجتمعية
                </h4>
                <p className="leading-relaxed">
                  تعزيز مشاركة المؤسسة في المبادرات الاجتماعية والوطنية
                </p>
              </div>
            </div>

            <p className="text-lg leading-relaxed mb-8">
              تحت قيادته، تعمل المؤسسة على الجمع بين الأصالة التي تأسست عليها
              منذ 1979م وبين التجديد والابتكار لمواكبة تطلعات السوق السعودي
              ورؤية المملكة 2030، بهدف ترسيخ الصقر الخليجي كاسم وطني عريق قادر
              على المنافسة محليًا وخليجيًا.
            </p>
          </div>

          <div className="glass-card p-8 rounded-3xl mb-8">
            <h3 className="text-2xl font-bold mb-6 text-accent">
              رؤية المدير التنفيذي للمستقبل
            </h3>

            <p className="text-lg leading-relaxed mb-6">
              يرى ذياب عايض النوب أن نجاح مؤسسة الصقر الخليجي للتجارة والمقاولات
              يكمن في الجمع بين جذور الماضي وتطلعات المستقبل. فالمؤسسة التي
              انطلقت من متجر صغير في الرياض أصبحت اليوم علامة تجارية عريقة،
              لكنها مطالبة دائمًا بمواكبة التغيرات وتلبية حاجات الأجيال الجديدة.
            </p>

            <div className="space-y-6">
              <div className="bg-accent/10 p-6 rounded-2xl">
                <h4 className="text-lg font-bold mb-3 text-accent">
                  التحول إلى براند وطني منافس
                </h4>
                <p className="leading-relaxed mb-2">
                  • تطوير هوية الصقر الخليجي لتكون أكثر حضورًا في السوق السعودي
                  والخليجي
                </p>
                <p className="leading-relaxed">
                  • الانتقال من مجرد مؤسسة تجارة تقليدية إلى براند متكامل له
                  قيمة ورمزية في أذهان العملاء
                </p>
              </div>

              <div className="bg-accent/10 p-6 rounded-2xl">
                <h4 className="text-lg font-bold mb-3 text-accent">
                  التوسع في قطاع الأزياء والزي الوطني
                </h4>
                <p className="leading-relaxed mb-2">
                  • إطلاق خطوط إنتاج متخصصة في الثياب، المشالح، الشماغ،
                  والإكسسوارات الرجالية
                </p>
                <p className="leading-relaxed">
                  • الجمع بين الأصالة السعودية والتصاميم الحديثة لجذب الأجيال
                  الجديدة والمحافظة على روح التراث
                </p>
              </div>

              <div className="bg-accent/10 p-6 rounded-2xl">
                <h4 className="text-lg font-bold mb-3 text-accent">
                  الرقمنة والتجارة الإلكترونية
                </h4>
                <p className="leading-relaxed mb-2">
                  • بناء متاجر إلكترونية ذكية للوصول إلى العملاء داخل المملكة
                  وخارجها
                </p>
                <p className="leading-relaxed">
                  • الاعتماد على الأنظمة الحديثة لإدارة المخزون، خدمة العملاء،
                  والدفع الإلكتروني
                </p>
              </div>

              <div className="bg-accent/10 p-6 rounded-2xl">
                <h4 className="text-lg font-bold mb-3 text-accent">
                  التواجد الإقليمي
                </h4>
                <p className="leading-relaxed mb-2">
                  • التوسع خارج أسواق الرياض والقرية الشعبية نحو بقية مناطق
                  المملكة
                </p>
                <p className="leading-relaxed">
                  • وضع خطة للانتشار في الخليج كمؤسسة سعودية تحمل قيمة ومصداقية
                </p>
              </div>

              <div className="bg-accent/10 p-6 rounded-2xl">
                <h4 className="text-lg font-bold mb-3 text-accent">
                  بناء الجيل القادم
                </h4>
                <p className="leading-relaxed mb-2">
                  • الاستثمار في الكفاءات الشابة وتدريبهم على أسس التجارة
                  الحديثة
                </p>
                <p className="leading-relaxed">
                  • جعل المؤسسة بيئة عمل رائدة في تمكين الشباب السعودي
                </p>
              </div>
            </div>

            <p className="text-lg leading-relaxed mt-6">
              من خلال هذه الرؤية، يسعى ذياب عايض النوب إلى أن تكون الصقر الخليجي
              علامة سعودية قوية، متجددة، وذات أثر اقتصادي ومجتمعي، وأن تبقى
              شريكًا في مسيرة التنمية الوطنية حتى ما بعد عام 2030.
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
              href="/responsibility"
              className="inline-block px-6 py-3 glass-card rounded-2xl font-semibold hover:scale-105 transition-all"
              whileHover={{ scale: 1.05 }}
            >
              المسؤولية المجتمعية
            </motion.a>
          </div>
        </motion.div>
      </div>
    </motion.main>
  );
}
