import Layout from '../components/layout/Layout'
import { motion } from 'framer-motion'
import Head from 'next/head'

export default function About() {
  return (
    <>
      <Head>
        <title>حول مؤسسة الصقر الخليجي - About Gulf Falcon</title>
        <meta name="description" content="تعرف على مؤسسة الصقر الخليجي ورسالتنا في تقديم أفضل المنتجات الفاخرة" />
      </Head>
      <Layout>
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen pt-20"
        >
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-center mb-12"
              >
                <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gold to-yellow-400 bg-clip-text text-transparent">
                  مؤسسة الصقر الخليجي
                </h1>
                <h2 className="text-2xl md:text-3xl text-white mb-4 font-cormorant">
                  Gulf Falcon Corporation
                </h2>
                <div className="w-24 h-1 bg-gold mx-auto"></div>
              </motion.div>

              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="grid md:grid-cols-2 gap-12 mb-12"
              >
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gold mb-4">رسالتنا</h3>
                  <p className="text-gray-300 leading-relaxed">
                    نحن في مؤسسة الصقر الخليجي نسعى لتقديم أرقى وأفخم المنتجات التراثية والعصرية للرجال في منطقة الخليج العربي. نؤمن بالجودة العالية والحرفية المتقنة في كل منتج نقدمه.
                  </p>
                  <p className="text-gray-300 leading-relaxed">
                    من خلال مجموعتنا المتنوعة من المشالح، السديريات، الفرو، والإكسسوارات الفاخرة، نهدف إلى الحفاظ على التراث الخليجي الأصيل مع إضافة لمسات عصرية مميزة.
                  </p>
                </div>

                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gold mb-4">Our Mission</h3>
                  <p className="text-gray-300 leading-relaxed">
                    At Gulf Falcon Corporation, we strive to provide the finest and most luxurious traditional and contemporary products for men in the Arabian Gulf region. We believe in high quality and exquisite craftsmanship in every product we offer.
                  </p>
                  <p className="text-gray-300 leading-relaxed">
                    Through our diverse collection of mishlahs, vests, fur, and luxury accessories, we aim to preserve authentic Gulf heritage while adding distinctive modern touches.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="grid md:grid-cols-3 gap-8 mb-12"
              >
                <div className="text-center p-6 bg-gradient-to-br from-luxury-black to-gray-900 rounded-lg border border-gold/20">
                  <div className="text-3xl text-gold mb-4">🏆</div>
                  <h4 className="text-xl font-bold text-white mb-2">الجودة العالية</h4>
                  <p className="text-gray-300">نضمن أعلى معايير الجودة في جميع منتجاتنا</p>
                </div>

                <div className="text-center p-6 bg-gradient-to-br from-luxury-black to-gray-900 rounded-lg border border-gold/20">
                  <div className="text-3xl text-gold mb-4">🎨</div>
                  <h4 className="text-xl font-bold text-white mb-2">التصميم الفريد</h4>
                  <p className="text-gray-300">تصاميم حصرية تجمع بين الأصالة والحداثة</p>
                </div>

                <div className="text-center p-6 bg-gradient-to-br from-luxury-black to-gray-900 rounded-lg border border-gold/20">
                  <div className="text-3xl text-gold mb-4">⚡</div>
                  <h4 className="text-xl font-bold text-white mb-2">الخدمة المميزة</h4>
                  <p className="text-gray-300">خدمة عملاء استثنائية وتجربة تسوق فريدة</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-center bg-gradient-to-r from-gold/10 to-yellow-400/10 p-8 rounded-lg border border-gold/30"
              >
                <h3 className="text-2xl font-bold text-gold mb-4">تواصل معنا</h3>
                <p className="text-gray-300 mb-6">
                  نحن هنا لخدمتكم ونسعد بالرد على استفساراتكم
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <span className="bg-luxury-black px-4 py-2 rounded-full text-gold border border-gold/30">
                    📱 واتساب: +966 XX XXX XXXX
                  </span>
                  <span className="bg-luxury-black px-4 py-2 rounded-full text-gold border border-gold/30">
                    📧 info@gulffalcon.com
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.main>
      </Layout>
    </>
  )
}