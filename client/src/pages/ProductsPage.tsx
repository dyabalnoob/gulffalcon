import Layout from '../../../components/layout/Layout'
import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { motion, AnimatePresence } from 'framer-motion'
import ProductCard from '../../../components/product-card'
import ProductFilters from '../../../components/product-filters'
import { Helmet } from 'react-helmet-async'
import type { Product, Brand } from '../../../shared/schema'

export default function ProductsPage() {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  })

  const { data: brands = [] } = useQuery<Brand[]>({
    queryKey: ['/api/brands'],
  })

  const handleFilter = (filters: {
    search: string;
    brandId: string;
    tags: string[];
  }) => {
    let filtered = products;
    
    if (filters.search) {
      filtered = filtered.filter(product => 
        product.nameAr.toLowerCase().includes(filters.search.toLowerCase()) ||
        product.nameEn.toLowerCase().includes(filters.search.toLowerCase())
      );
    }
    
    if (filters.brandId) {
      filtered = filtered.filter(product => product.brandId === filters.brandId);
    }
    
    if (filters.tags.length > 0) {
      filtered = filtered.filter(product => 
        (product.tags || []).some(tag => filters.tags.includes(tag))
      );
    }
    
    setFilteredProducts(filtered);
  }

  // Initialize with all products when data loads
  useEffect(() => {
    if (products.length > 0) {
      setFilteredProducts(products);
    }
  }, [products]);

  return (
    <>
      <Helmet>
        <title>المنتجات - مؤسسة الصقر الخليجي</title>
        <meta name="description" content="تصفح مجموعتنا الحصرية من المنتجات الفاخرة للرجال" />
      </Helmet>
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
            brands={brands}
            onFilter={handleFilter}
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