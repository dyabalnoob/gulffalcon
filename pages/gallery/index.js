import Layout from '../../components/layout/Layout'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import GalleryGrid from '../../components/gallery-grid'
import Head from 'next/head'

export default function Gallery() {
  const { data: galleryItems = [], isLoading } = useQuery({
    queryKey: ['/api/gallery'],
  })

  return (
    <>
      <Head>
        <title>المعرض - مؤسسة الصقر الخليجي</title>
        <meta name="description" content="استعرض معرضنا الحصري من أجمل التصاميم والمنتجات" />
      </Head>
      <Layout>
        <motion.div
          className="container mx-auto px-4 py-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-gradient">
            معرض الصور
          </h1>
          <p className="text-lg text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            اكتشف جمال وأناقة منتجاتنا من خلال معرضنا الحصري
          </p>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="aspect-square bg-gradient-to-r from-purple-400/20 to-gold/20 rounded-lg animate-pulse"></div>
              ))}
            </div>
          ) : (
            <GalleryGrid items={galleryItems} />
          )}

          {!isLoading && galleryItems.length === 0 && (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-xl text-muted-foreground">لا توجد صور في المعرض حالياً</p>
            </motion.div>
          )}
        </motion.div>
      </Layout>
    </>
  )
}