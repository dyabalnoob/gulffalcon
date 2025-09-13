import { motion } from "framer-motion";

export default function About() {
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
            نبذة عن مؤسسة الصقر الخليجي للتجارة والأزياء الفاخرة
          </h1>
        </motion.div>

        <motion.div
          className="prose prose-lg max-w-none text-right"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="glass-card p-8 rounded-3xl mb-8">
            <p className="text-lg leading-relaxed mb-6">
              انطلقت مؤسسة الصقر الخليجي للتجارة والأزياء من مدينة الرياض عام 1979م على يد مؤسسها عايض بن دليم فهد النوب، برؤية تجارية طموحة جمعت بين الأصالة والابتكار في عالم الأزياء الرجالية الفاخرة، لتضع لنفسها موطئ قدم في سوق يشهد تحولات كبيرة مع الطفرة الاقتصادية التي عاشتها المملكة في تلك الحقبة.
            </p>

            <p className="text-lg leading-relaxed mb-6">
              بدأت المؤسسة من متجر صغير متخصص في الأزياء الرجالية يخدم شريحة محدودة من العملاء، لكنها سرعان ما رسخت سمعتها في عالم الموضة والأناقة الرجالية بالاعتماد على الجودة والمصداقية، مما مكنها خلال الثمانينات والتسعينات من التوسع وافتتاح عدة معارض أزياء فاخرة في مختلف مناطق المملكة، لتنتقل من نطاق محلي محدود إلى حضور واسع في قطاع الموضة.
            </p>

            <p className="text-lg leading-relaxed mb-6">
              وفي عام 1986م، جاءت النقلة النوعية مع إطلاق براند الصقر الخليجي كهوية رائدة في عالم الأزياء الرجالية، جعلت من المؤسسة اسمًا راسخًا في سوق الموضة الفاخرة بالمملكة العربية السعودية.
            </p>

            <p className="text-lg leading-relaxed mb-6">
              ومع بداية الألفية، وتحديدًا في عام 2000م، دشنت المؤسسة مركز جملة الجملة للأزياء الرجالية في منطقة البطحاء بالرياض، ليكون محطة تحول كبرى في تاريخها، حيث فتح لها المجال لخدمة قطاع أوسع من تجار الأزياء والموزعين المتخصصين في الملابس الرجالية الفاخرة، وأصبح مركزها في البطحاء أحد أهم الوجهات لتجارة الأزياء الراقية في العاصمة.
            </p>

            <p className="text-lg leading-relaxed mb-6">
              اليوم، وبعد أكثر من أربعة عقود من الريادة في عالم الأزياء، تتمركز إدارة المؤسسة ومقرها الرئيسي في أسواق القرية الشعبية بالرياض، حيث تمتلك مركزًا تجاريًا كبيرًا متخصصًا في الأزياء الرجالية الفاخرة بفتحات متعددة يخدم جميع عشاق الأناقة والموضة في منطقة الرياض والمناطق المجاورة. هذا الموقع الاستراتيجي عزز من حضور المؤسسة كرائدة في قطاع الأزياء، وأتاح لها أن تكون همزة وصل بين أرقى دور الأزياء العالمية والمستهلك السعودي الباحث عن التميز.
            </p>

            <p className="text-lg leading-relaxed">
              لقد انتقلت المؤسسة من متجر صغير للأزياء إلى سلسلة معارض أزياء راقية، ثم إلى علامة تجارية رائدة في عالم الموضة الرجالية ومركز رئيسي لتجارة الأزياء الفاخرة بالجملة، لتؤكد أن اسم الصقر الخليجي هو مرادف للأناقة والرقي والجودة العالية في سوق الأزياء السعودي منذ تأسيسها وحتى اليوم.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <motion.a
              href="/responsibility"
              className="glass-card p-6 rounded-3xl hover:shadow-2xl transition-all duration-300 cursor-pointer text-center"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <h3 className="text-xl font-bold mb-2 text-accent">المسؤولية المجتمعية</h3>
              <p className="text-sm opacity-70">دورنا في خدمة المجتمع والتنمية</p>
            </motion.a>

            <motion.a
              href="/future"
              className="glass-card p-6 rounded-3xl hover:shadow-2xl transition-all duration-300 cursor-pointer text-center"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <h3 className="text-xl font-bold mb-2 text-accent">الطموحات المستقبلية</h3>
              <p className="text-sm opacity-70">رؤيتنا للنمو والتوسع</p>
            </motion.a>

            <motion.a
              href="/ceo"
              className="glass-card p-6 rounded-3xl hover:shadow-2xl transition-all duration-300 cursor-pointer text-center"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <h3 className="text-xl font-bold mb-2 text-accent">المدير التنفيذي</h3>
              <p className="text-sm opacity-70">ذياب عايض النوب</p>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </motion.main>
  );
}