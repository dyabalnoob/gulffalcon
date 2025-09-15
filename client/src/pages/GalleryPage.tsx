import Layout from '../../../components/layout/Layout'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Input } from '../../../components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../../components/ui/dialog'
import { Search, Image as ImageIcon, Eye } from 'lucide-react'
import { Button } from '../../../components/ui/button'
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
    <Layout>
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4" data-testid="gallery-title">
            معرض الأعمال
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400" data-testid="gallery-subtitle">
            اكتشف مجموعة صورنا الحصرية من أعمالنا المتميزة
          </p>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="البحث في المعرض..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10"
              data-testid="input-search-gallery"
            />
          </div>
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="animate-pulse" data-testid={`gallery-skeleton-${i}`}>
                <CardHeader className="p-0">
                  <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-t-lg"></div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Gallery Grid */}
        {!isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <Card key={item.id} className="hover:shadow-lg transition-shadow group" data-testid={`gallery-item-${item.id}`}>
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img 
                      src={item.imageUrl} 
                      alt={item.title}
                      className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                      onError={(e) => {
                        // Fallback for broken images
                        (e.target as HTMLImageElement).src = '/logo.png';
                      }}
                      data-testid={`gallery-image-${item.id}`}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            size="sm" 
                            className="opacity-0 group-hover:opacity-100 transition-opacity bg-white text-black hover:bg-gray-100"
                            data-testid={`view-image-${item.id}`}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            عرض
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl w-full" data-testid={`image-modal-${item.id}`}>
                          <DialogHeader>
                            <DialogTitle data-testid={`modal-title-${item.id}`}>{item.title}</DialogTitle>
                          </DialogHeader>
                          <div className="flex justify-center">
                            <img 
                              src={item.imageUrl} 
                              alt={item.title}
                              className="max-w-full max-h-[70vh] object-contain rounded-lg"
                              data-testid={`modal-image-${item.id}`}
                            />
                          </div>
                          {item.description && (
                            <p className="text-center text-gray-600 dark:text-gray-400 mt-4" data-testid={`modal-description-${item.id}`}>
                              {item.description}
                            </p>
                          )}
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="text-lg mb-2" data-testid={`gallery-title-${item.id}`}>
                    {item.title}
                  </CardTitle>
                  {item.description && (
                    <CardDescription data-testid={`gallery-description-${item.id}`}>
                      {item.description}
                    </CardDescription>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* No results */}
        {!isLoading && filteredItems.length === 0 && (
          <div className="text-center py-16" data-testid="no-gallery-items">
            <ImageIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-xl text-gray-600 dark:text-gray-400">
              {searchQuery ? 'لا توجد صور تطابق البحث' : 'لا توجد صور في المعرض'}
            </p>
            {searchQuery && (
              <Button 
                variant="outline" 
                onClick={() => setSearchQuery('')}
                className="mt-4"
                data-testid="clear-gallery-search"
              >
                مسح البحث
              </Button>
            )}
          </div>
        )}
      </main>
    </Layout>
  )
}