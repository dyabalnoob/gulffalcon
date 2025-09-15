import Layout from '../components/layout/Layout'
import Hero from '../components/hero'
import FeaturedProducts from '../components/featured-products'
import PartnersMarquee from '../components/partners-marquee'
import { motion } from 'framer-motion'
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>مؤسسة الصقر الخليجي - Gulf Falcon Corporation</title>
        <meta name="description" content="مؤسسة الصقر الخليجي - منتجات فاخرة للرجال في الخليج العربي" />
      </Head>
      <Layout>
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Hero />
          <FeaturedProducts />
          <PartnersMarquee />
        </motion.main>
      </Layout>
    </>
  )
}