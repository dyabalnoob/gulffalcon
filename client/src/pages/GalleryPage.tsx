import Layout from '../../../components/layout/Layout'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import MasonryGallery from '../../../components/masonry-gallery'
import Lightbox from '../../../components/lightbox'
import { Input } from '../../../components/ui/input'
import { Search } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import type { GalleryItem } from '../../../shared/schema'

export default function GalleryPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)

  const { data: galleryItems = [], isLoading } = useQuery<GalleryItem[]>({
    queryKey: ['/api/gallery'],
  })

  const filteredItems = galleryItems.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <>
      <Helmet>
        <title>المعرض - مؤسسة الصقر الخليجي</title>
        <meta name="description" content="اكتشف مجموعة صورنا الحصرية من أعمالنا المتميزة" />
      </Helmet>
      <Layout>
        <motion.div
          className="container mx-auto px-4 py-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-center mb-8 text-gradient"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            معرض الأعمال
          </motion.h1>

          {/* Search */}
          <motion.div 
            className="max-w-md mx-auto mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative">
              <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="البحث في المعرض..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10 rounded-2xl bg-input border-border focus:ring-2 focus:ring-ring"
                data-testid="input-search-gallery"
              />
            </div>
          </motion.div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="glass-card p-3 rounded-3xl animate-pulse">
                  <div className="w-full h-64 bg-gradient-to-r from-purple-400/20 to-gold/20 rounded-2xl mb-3"></div>
                  <div className="h-4 bg-gradient-to-r from-purple-400/20 to-gold/20 rounded mb-2"></div>
                  <div className="h-3 bg-gradient-to-r from-purple-400/20 to-gold/20 rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <MasonryGallery
              items={filteredItems}
              onItemClick={setSelectedItem}
            />
          )}

          {!isLoading && filteredItems.length === 0 && (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-xl text-muted-foreground">
                {searchQuery ? 'لا توجد صور تطابق البحث' : 'لا توجد صور في المعرض'}
              </p>
            </motion.div>
          )}

          {/* Lightbox */}
          {selectedItem && (
            <Lightbox
              isOpen={true}
              imageSrc={selectedItem.imageUrl}
              imageAlt={selectedItem.title}
              onClose={() => setSelectedItem(null)}
            />
          )}
        </motion.div>
      </Layout>
    </>
  )
}