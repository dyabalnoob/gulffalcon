import Layout from '../../components/layout/Layout'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { motion, AnimatePresence } from 'framer-motion'
import ProductCard from '../../components/product-card'
import ProductFilters from '../../components/product-filters'
import Head from 'next/head'

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['/api/products'],
  })

  const { data: brands = [] } = useQuery({
    queryKey: ['/api/brands'],
  })

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    const matchesSearch = product.nameAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.nameEn.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <>
      <Head>
        <title>المنتجات - مؤسسة الصقر الخليجي</title>
        <meta name="description" content="تصفح مجموعتنا الحصرية من المنتجات الفاخرة للرجال" />
      </Head>
      <Layout>
        <motion.div
          className="container mx-auto px-4 py-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-gradient">
            مجموعتنا المتميزة
          </h1>
          
          <ProductFilters
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            brands={brands}
          />

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="professional-card animate-pulse">
                  <div className="h-64 bg-gradient-to-r from-purple-400/20 to-gold/20 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gradient-to-r from-purple-400/20 to-gold/20 rounded mb-2"></div>
                  <div className="h-3 bg-gradient-to-r from-purple-400/20 to-gold/20 rounded mb-2"></div>
                  <div className="h-6 bg-gradient-to-r from-purple-400/20 to-gold/20 rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory + searchQuery}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}

          {!isLoading && filteredProducts.length === 0 && (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-xl text-muted-foreground">لا توجد منتجات تطابق البحث</p>
            </motion.div>
          )}
        </motion.div>
      </Layout>
    </>
  )
}