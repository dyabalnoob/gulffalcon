import Layout from '../../../components/layout/Layout'
import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card'
import { Input } from '../../../components/ui/input'
import { Button } from '../../../components/ui/button'
import { Badge } from '../../../components/ui/badge'
import { Search, Package, DollarSign } from 'lucide-react'
import type { Product, Brand } from '../../../shared/schema'

export default function ProductsPage() {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [searchQuery, setSearchQuery] = useState('')

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  })

  const { data: brands = [] } = useQuery<Brand[]>({
    queryKey: ['/api/brands'],
  })

  // Filter products based on search
  useEffect(() => {
    if (products.length > 0) {
      let filtered = products;
      
      if (searchQuery) {
        filtered = filtered.filter(product => 
          product.nameAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      
      setFilteredProducts(filtered);
    }
  }, [products, searchQuery]);

  return (
    <Layout>
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4" data-testid="products-title">
            مجموعتنا المتميزة
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400" data-testid="products-subtitle">
            تصفح مجموعتنا الحصرية من المنتجات الفاخرة
          </p>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="البحث في المنتجات..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10"
              data-testid="input-search-products"
            />
          </div>
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="animate-pulse" data-testid={`skeleton-${i}`}>
                <CardHeader>
                  <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Products grid */}
        {!isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const brand = brands.find(b => b.id === product.brandId);
              return (
                <Card key={product.id} className="hover:shadow-lg transition-shadow" data-testid={`product-${product.id}`}>
                  <CardHeader className="p-0">
                    <div className="relative">
                      <img 
                        src={product.mainImage} 
                        alt={product.nameAr}
                        className="w-full h-48 object-cover rounded-t-lg"
                        onError={(e) => {
                          // Fallback for broken images
                          (e.target as HTMLImageElement).src = '/logo.png';
                        }}
                        data-testid={`product-image-${product.id}`}
                      />
                      {product.featured && (
                        <Badge className="absolute top-2 right-2 bg-yellow-600" data-testid={`featured-badge-${product.id}`}>
                          مميز
                        </Badge>
                      )}
                      {product.isNew && (
                        <Badge className="absolute top-2 left-2 bg-green-600" data-testid={`new-badge-${product.id}`}>
                          جديد
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <CardTitle className="text-lg mb-2" data-testid={`product-name-${product.id}`}>
                      {product.nameAr}
                    </CardTitle>
                    <CardDescription className="text-sm mb-3" data-testid={`product-description-${product.id}`}>
                      {product.descriptionAr}
                    </CardDescription>
                    
                    {brand && (
                      <div className="flex items-center gap-2 mb-2">
                        <Package className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-400" data-testid={`brand-name-${product.id}`}>
                          {brand.nameAr}
                        </span>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-2 mb-3">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      <span className="text-lg font-bold text-green-600" data-testid={`product-price-${product.id}`}>
                        {product.salePrice || product.price} ريال
                      </span>
                      {product.salePrice && (
                        <span className="text-sm text-gray-500 line-through" data-testid={`original-price-${product.id}`}>
                          {product.price} ريال
                        </span>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {product.tags?.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs" data-testid={`tag-${product.id}-${index}`}>
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <Button className="w-full bg-yellow-600 hover:bg-yellow-700" data-testid={`view-product-${product.id}`}>
                      عرض التفاصيل
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* No results */}
        {!isLoading && filteredProducts.length === 0 && (
          <div className="text-center py-16" data-testid="no-products">
            <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-xl text-gray-600 dark:text-gray-400">
              {searchQuery ? 'لا توجد منتجات تطابق البحث' : 'لا توجد منتجات متاحة حالياً'}
            </p>
            {searchQuery && (
              <Button 
                variant="outline" 
                onClick={() => setSearchQuery('')}
                className="mt-4"
                data-testid="clear-search"
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