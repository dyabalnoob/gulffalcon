import Layout from '../../components/layout/Layout'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import BrandCard from '../../components/brand-card'
import Head from 'next/head'

export default function Brands() {
  const { data: brands = [], isLoading } = useQuery({
    queryKey: ['/api/brands'],
  })

  return (
    <>
      <Head>
        <title>علاماتنا التجارية - مؤسسة الصقر الخليجي</title>
        <meta name="description" content="تعرف على علاماتنا التجارية المميزة والحصرية" />
      </Head>
      <Layout>
        <motion.div
          className="container mx-auto px-4 py-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-gradient">
            علاماتنا التجارية
          </h1>
          <p className="text-lg text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            نفخر بتقديم مجموعة منتقاة من أرقى العلامات التجارية في عالم الأزياء الرجالية الخليجية
          </p>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="professional-card animate-pulse">
                  <div className="h-48 bg-gradient-to-r from-purple-400/20 to-gold/20 rounded-lg mb-4"></div>
                  <div className="h-6 bg-gradient-to-r from-purple-400/20 to-gold/20 rounded mb-2"></div>
                  <div className="h-4 bg-gradient-to-r from-purple-400/20 to-gold/20 rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {brands.map((brand, index) => (
                <motion.div
                  key={brand.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <BrandCard brand={brand} />
                </motion.div>
              ))}
            </div>
          )}

          {!isLoading && brands.length === 0 && (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-xl text-muted-foreground">لا توجد علامات تجارية متاحة حالياً</p>
            </motion.div>
          )}
        </motion.div>
      </Layout>
    </>
  )
}