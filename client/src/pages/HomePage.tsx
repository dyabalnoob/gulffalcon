import Layout from '../../../components/layout/Layout'
import Hero from '../../../components/hero'
import FeaturedProducts from '../../../components/featured-products'
import PartnersMarquee from '../../../components/partners-marquee'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>مؤسسة الصقر الخليجي - Gulf Falcon Corporation</title>
        <meta name="description" content="مؤسسة الصقر الخليجي - منتجات فاخرة للرجال في الخليج العربي" />
      </Helmet>
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