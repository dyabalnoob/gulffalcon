import { motion } from "framer-motion";

export default function Responsibility() {
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
            المسؤولية المجتمعية والتنمية
          </h1>
          <p className="text-lg opacity-80 max-w-2xl mx-auto">
            دورنا في خدمة المجتمع وتعزيز قيم المسؤولية الوطنية
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
              إلى جانب نجاحها التجاري، أولت مؤسسة الصقر الخليجي للتجارة
              والمقاولات اهتمامًا خاصًا بـ التنمية المجتمعية، إدراكًا منها بأن
              دورها لا يقتصر على البيع والتوزيع فقط، بل يتجاوز ذلك إلى الإسهام
              في خدمة المجتمع وتعزيز قيم المسؤولية الوطنية.
            </p>

            <p className="text-lg leading-relaxed mb-6">
              منذ انطلاقتها، حرصت المؤسسة على أن تكون شريكًا فاعلًا في التنمية
              من خلال:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-primary/10 p-6 rounded-2xl">
                <h3 className="text-xl font-bold mb-3 text-accent">
                  الفعاليات الوطنية
                </h3>
                <p className="leading-relaxed">
                  دعم الفعاليات الوطنية والمناسبات الاجتماعية
                </p>
              </div>

              <div className="bg-primary/10 p-6 rounded-2xl">
                <h3 className="text-xl font-bold mb-3 text-accent">
                  المبادرات الخيرية
                </h3>
                <p className="leading-relaxed">
                  المشاركة في المبادرات الخيرية والإنسانية
                </p>
              </div>

              <div className="bg-primary/10 p-6 rounded-2xl">
                <h3 className="text-xl font-bold mb-3 text-accent">
                  دعم الكوادر السعودية
                </h3>
                <p className="leading-relaxed">
                  توفير فرص عمل ودعم الكوادر السعودية الشابة
                </p>
              </div>

              <div className="bg-primary/10 p-6 rounded-2xl">
                <h3 className="text-xl font-bold mb-3 text-accent">
                  ثقافة الجودة
                </h3>
                <p className="leading-relaxed">
                  تعزيز ثقافة الجودة والانضباط في بيئة العمل بما ينعكس إيجابًا
                  على المجتمع
                </p>
              </div>
            </div>

            <p className="text-lg leading-relaxed">
              هذا التوجه جعل من الصقر الخليجي مؤسسة ذات بصمة مزدوجة: بصمة تجارية
              راسخة في الأسواق، وبصمة مجتمعية حاضرة في الميدان، تسعى لخلق قيمة
              مضافة للمجتمع السعودي انسجامًا مع مبادئ رؤية المملكة 2030 في تمكين
              القطاع الخاص من لعب دور تنموي فاعل.
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
              href="/future"
              className="inline-block px-6 py-3 glass-card rounded-2xl font-semibold hover:scale-105 transition-all"
              whileHover={{ scale: 1.05 }}
            >
              الطموحات المستقبلية
            </motion.a>
          </div>
        </motion.div>
      </div>
    </motion.main>
  );
}
