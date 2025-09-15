import Layout from '../../components/layout/Layout'
import { motion } from 'framer-motion'
import ContactForm from '../../components/contact-form'
import ContactInfo from '../../components/contact-info'
import Head from 'next/head'

export default function Contact() {
  return (
    <>
      <Head>
        <title>اتصل بنا - مؤسسة الصقر الخليجي</title>
        <meta name="description" content="تواصل مع مؤسسة الصقر الخليجي في الرياض - أسواق القرية الشعبية" />
      </Head>
      <Layout>
        <motion.div
          className="container mx-auto px-4 py-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-gradient">
            اتصل بنا
          </h1>
          <p className="text-lg text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            نسعد بتواصلكم معنا، فريقنا جاهز لخدمتكم والإجابة على جميع استفساراتكم
          </p>

          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <ContactInfo />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <ContactForm />
            </motion.div>
          </div>
        </motion.div>
      </Layout>
    </>
  )
}