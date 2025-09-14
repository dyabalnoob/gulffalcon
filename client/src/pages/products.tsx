import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/language-context";
import { 
  Search, Filter, Grid3x3, Grid2x2, ChevronDown, 
  Star, ShoppingBag, Heart, Eye, Sparkles, TrendingUp,
  Package, Shirt, X, Check, Palette, Circle, Zap
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Product, Brand } from "@shared/schema";
import SEOMeta from "@/components/seo-meta";

const categories = [
  { id: "all", nameAr: "جميع المنتجات", nameEn: "All Products", icon: Package },
  { id: "vests", nameAr: "السديريات", nameEn: "Vests", icon: Shirt },
  { id: "prayer-beads", nameAr: "المسابح", nameEn: "Prayer Beads", icon: Circle },
  { id: "walking-sticks", nameAr: "العصي والمعاكز", nameEn: "Walking Sticks", icon: Zap },
  { id: "women-collection", nameAr: "المجموعة النسائية - شتاء 2026", nameEn: "Women's Collection - Winter 2026", icon: Sparkles },
  { id: "thobes", nameAr: "الثياب", nameEn: "Thobes", icon: Shirt },
  { id: "mishlahs", nameAr: "المشالح", nameEn: "Mishlahs", icon: Shirt },
  { id: "bishts", nameAr: "البشوت", nameEn: "Bishts", icon: Shirt },
];

const sortOptions = [
  { id: "newest", nameAr: "الأحدث", nameEn: "Newest" },
  { id: "price-asc", nameAr: "السعر: من الأقل للأعلى", nameEn: "Price: Low to High" },
  { id: "price-desc", nameAr: "السعر: من الأعلى للأقل", nameEn: "Price: High to Low" },
  { id: "featured", nameAr: "المميزة", nameEn: "Featured" },
];

export default function Products() {
  const { isRTL, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [gridView, setGridView] = useState<"large" | "small">("large");
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const { data: products = [], isLoading: productsLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const { data: brands = [] } = useQuery<Brand[]>({
    queryKey: ["/api/brands"],
  });

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
      
      const matchesSearch = !searchQuery || 
        (isRTL ? product.nameAr : product.nameEn).toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.descriptionAr?.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (product.descriptionEn?.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesBrand = !selectedBrand || product.brandId === selectedBrand;

      return matchesCategory && matchesSearch && matchesBrand;
    });

    // Sort products
    switch (sortBy) {
      case "price-asc":
        filtered.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case "price-desc":
        filtered.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      case "featured":
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
      case "newest":
      default:
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
    }

    return filtered;
  }, [products, selectedCategory, searchQuery, selectedBrand, sortBy, isRTL]);

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat(isRTL ? 'ar-SA' : 'en-SA', {
      style: 'currency',
      currency: 'SAR',
      minimumFractionDigits: 0,
    }).format(parseFloat(price));
  };

  const currentCategory = categories.find(c => c.id === selectedCategory);
  const pageTitle = isRTL 
    ? currentCategory?.nameAr || "المنتجات" 
    : currentCategory?.nameEn || "Products";
  const pageDescription = isRTL
    ? `تسوق أفخم ${currentCategory?.nameAr || "المنتجات"} من مؤسسة الصقر الخليجي - أزياء رجالية راقية`
    : `Shop luxury ${currentCategory?.nameEn || "products"} from Gulf Falcon Corporation - Premium men's fashion`;

  return (
    <>
      <SEOMeta
        title={pageTitle}
        description={pageDescription}
        type="website"
      />
      <motion.main
        className="min-h-screen pt-24 pb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
            {isRTL ? "تشكيلة المنتجات" : "Product Collection"}
          </h1>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            {isRTL 
              ? "اكتشف مجموعتنا الفاخرة من الأزياء الرجالية التقليدية والعصرية"
              : "Discover our luxurious collection of traditional and modern men's fashion"}
          </p>
        </motion.div>

        {/* Categories Tabs */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="w-full flex-wrap h-auto p-1 bg-background/60 backdrop-blur professional-border">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  data-testid={`tab-category-${category.id}`}
                >
                  <category.icon className="w-4 h-4" />
                  {isRTL ? category.nameAr : category.nameEn}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </motion.div>

        {/* Filters Bar */}
        <motion.div
          className="flex flex-wrap gap-4 mb-8 p-4 glass-card rounded-2xl professional-border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Search */}
          <div className="flex-1 min-w-[200px] relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 opacity-60" />
            <Input
              type="text"
              placeholder={isRTL ? "البحث في المنتجات..." : "Search products..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 professional-border"
              data-testid="input-search-products"
            />
          </div>

          {/* Brand Filter */}
          <Select value={selectedBrand || "all"} onValueChange={(value) => setSelectedBrand(value === "all" ? "" : value)}>
            <SelectTrigger className="w-[180px] professional-border" data-testid="select-brand-filter">
              <SelectValue placeholder={isRTL ? "جميع الماركات" : "All Brands"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" data-testid="select-item-all-brands">
                {isRTL ? "جميع الماركات" : "All Brands"}
              </SelectItem>
              {brands.map((brand) => (
                <SelectItem key={brand.id} value={brand.id} data-testid={`select-item-brand-${brand.id}`}>
                  {isRTL ? brand.nameAr : brand.nameEn}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Sort */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px] professional-border" data-testid="select-sort">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.id} value={option.id} data-testid={`select-item-sort-${option.id}`}>
                  {isRTL ? option.nameAr : option.nameEn}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Grid View Toggle */}
          <div className="flex gap-2">
            <Button
              variant={gridView === "large" ? "default" : "outline"}
              size="icon"
              onClick={() => setGridView("large")}
              className="professional-border"
              data-testid="button-grid-large"
            >
              <Grid2x2 className="w-4 h-4" />
            </Button>
            <Button
              variant={gridView === "small" ? "default" : "outline"}
              size="icon"
              onClick={() => setGridView("small")}
              className="professional-border"
              data-testid="button-grid-small"
            >
              <Grid3x3 className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>

        {/* Products Grid */}
        <AnimatePresence mode="wait">
          {productsLoading ? (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {[...Array(8)].map((_, i) => (
                <div key={i} className="glass-card rounded-2xl p-4 animate-pulse">
                  <div className="aspect-[3/4] bg-gray-300/20 rounded-xl mb-4" />
                  <div className="h-4 bg-gray-300/20 rounded mb-2" />
                  <div className="h-4 bg-gray-300/20 rounded w-2/3" />
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              className={`grid gap-6 ${
                gridView === "large" 
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
                  : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {filteredAndSortedProducts.map((product, index) => {
                const brand = brands.find(b => b.id === product.brandId);
                const isInWishlist = wishlist.includes(product.id);
                const hasDiscount = product.salePrice && parseFloat(product.salePrice) < parseFloat(product.price);
                const discountPercentage = hasDiscount 
                  ? Math.round((1 - parseFloat(product.salePrice!) / parseFloat(product.price)) * 100)
                  : 0;

                return (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="group"
                  >
                    <div className="glass-card rounded-2xl overflow-hidden professional-border hover:scale-[1.02] transition-all duration-300">
                      {/* Image Container */}
                      <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                        <img
                          src={product.mainImage}
                          alt={isRTL ? product.nameAr : product.nameEn}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          loading="lazy"
                        />
                        
                        {/* Badges */}
                        <div className="absolute top-3 left-3 flex flex-col gap-2">
                          {product.isNew && (
                            <Badge className="bg-green-500 text-white">
                              <Sparkles className="w-3 h-3 mr-1" />
                              {isRTL ? "جديد" : "New"}
                            </Badge>
                          )}
                          {product.featured && (
                            <Badge className="bg-primary text-primary-foreground">
                              <Star className="w-3 h-3 mr-1" />
                              {isRTL ? "مميز" : "Featured"}
                            </Badge>
                          )}
                          {hasDiscount && (
                            <Badge className="bg-red-500 text-white">
                              <TrendingUp className="w-3 h-3 mr-1" />
                              {discountPercentage}%
                            </Badge>
                          )}
                        </div>

                        {/* Quick Actions */}
                        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            size="icon"
                            variant="secondary"
                            className="w-8 h-8 rounded-full bg-white/90 hover:bg-white"
                            onClick={() => toggleWishlist(product.id)}
                            data-testid={`button-wishlist-${product.id}`}
                          >
                            <Heart className={`w-4 h-4 ${isInWishlist ? 'fill-red-500 text-red-500' : ''}`} />
                          </Button>
                          <Button
                            size="icon"
                            variant="secondary"
                            className="w-8 h-8 rounded-full bg-white/90 hover:bg-white"
                            onClick={() => {
                              setQuickViewProduct(product);
                              setSelectedSize(product.sizes?.[0] || "");
                              setSelectedColor("");
                              setIsQuickViewOpen(true);
                            }}
                            data-testid={`button-view-${product.id}`}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>

                        {/* Hover Overlay */}
                        <Link href={`/product/${product.slug}`}>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                            <Button className="w-full" data-testid={`button-quick-view-${product.id}`}>
                              <ShoppingBag className="w-4 h-4 mr-2" />
                              {isRTL ? "عرض المنتج" : "View Product"}
                            </Button>
                          </div>
                        </Link>
                      </div>

                      {/* Product Info */}
                      <div className={`p-4 ${gridView === "small" ? "p-3" : ""}`}>
                        {brand && (
                          <p className="text-xs opacity-70 mb-1">
                            {isRTL ? brand.nameAr : brand.nameEn}
                          </p>
                        )}
                        
                        <Link href={`/product/${product.slug}`}>
                          <h3 className={`font-semibold mb-2 hover:text-primary transition-colors line-clamp-2 ${
                            gridView === "small" ? "text-sm" : "text-lg"
                          }`}>
                            {isRTL ? product.nameAr : product.nameEn}
                          </h3>
                        </Link>

                        {/* Sizes */}
                        {product.sizes && product.sizes.length > 0 && gridView === "large" && (
                          <div className="flex flex-wrap gap-1 mb-2">
                            {product.sizes.slice(0, 3).map((size) => (
                              <span key={size} className="text-xs px-2 py-1 bg-gray-100 rounded">
                                {size}
                              </span>
                            ))}
                            {product.sizes.length > 3 && (
                              <span className="text-xs px-2 py-1 bg-gray-100 rounded">
                                +{product.sizes.length - 3}
                              </span>
                            )}
                          </div>
                        )}

                        {/* Price */}
                        <div className="flex items-center gap-2">
                          {hasDiscount ? (
                            <>
                              <span className="text-lg font-bold text-primary">
                                {formatPrice(product.salePrice!)}
                              </span>
                              <span className="text-sm line-through opacity-60">
                                {formatPrice(product.price)}
                              </span>
                            </>
                          ) : (
                            <span className="text-lg font-bold text-primary">
                              {formatPrice(product.price)}
                            </span>
                          )}
                        </div>

                        {/* Stock Status */}
                        <div className="mt-2">
                          {product.stock !== null && (
                            <>
                              {product.stock === 0 ? (
                                <Badge variant="destructive" className="text-xs">
                                  {isRTL ? "نفذت الكمية" : "Out of Stock"}
                                </Badge>
                              ) : product.stock < 5 ? (
                                <Badge variant="outline" className="text-xs border-orange-500 text-orange-500">
                                  {isRTL ? `متبقي ${product.stock} قطع فقط` : `Only ${product.stock} left`}
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="text-xs border-green-500 text-green-500">
                                  {isRTL ? "متوفر" : "In Stock"}
                                </Badge>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* No Results */}
        {!productsLoading && filteredAndSortedProducts.length === 0 && (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Package className="w-20 h-20 mx-auto mb-4 opacity-30" />
            <p className="text-lg opacity-70" data-testid="text-no-products">
              {isRTL 
                ? "لم يتم العثور على منتجات تطابق البحث"
                : "No products found matching your search"}
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setSearchQuery("");
                setSelectedBrand("");
                setSelectedCategory("all");
              }}
              data-testid="button-reset-filters"
            >
              {isRTL ? "إعادة تعيين الفلاتر" : "Reset Filters"}
            </Button>
          </motion.div>
        )}
      </div>

      {/* Quick View Dialog */}
      <Dialog 
        open={isQuickViewOpen} 
        onOpenChange={(open) => {
          setIsQuickViewOpen(open);
          if (!open) {
            // تأخير تنظيف البيانات حتى ينتهي animation الإغلاق
            setTimeout(() => setQuickViewProduct(null), 200);
          }
        }}
      >
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" data-testid="dialog-quick-view">
          {quickViewProduct && (
            <div className="grid md:grid-cols-2 gap-6">
              {/* Product Images */}
              <div className="space-y-4">
                <div className="aspect-square rounded-xl overflow-hidden bg-gray-100">
                  <img
                    src={quickViewProduct.mainImage}
                    alt={isRTL ? quickViewProduct.nameAr : quickViewProduct.nameEn}
                    className="w-full h-full object-cover"
                    data-testid="img-quick-view-main"
                  />
                </div>
                {quickViewProduct.images && quickViewProduct.images.length > 0 && (
                  <div className="grid grid-cols-4 gap-2">
                    {quickViewProduct.images.slice(0, 4).map((img, index) => (
                      <div key={index} className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                        <img
                          src={img}
                          alt={`${isRTL ? quickViewProduct.nameAr : quickViewProduct.nameEn} ${index + 1}`}
                          className="w-full h-full object-cover hover:scale-110 transition-transform cursor-pointer"
                          data-testid={`img-quick-view-thumb-${index}`}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="space-y-4">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold">
                    {isRTL ? quickViewProduct.nameAr : quickViewProduct.nameEn}
                  </DialogTitle>
                  <DialogDescription className="text-base mt-2">
                    {isRTL ? quickViewProduct.descriptionAr : quickViewProduct.descriptionEn}
                  </DialogDescription>
                </DialogHeader>

                {/* Price */}
                <div className="flex items-center gap-3">
                  {quickViewProduct.salePrice && parseFloat(quickViewProduct.salePrice) < parseFloat(quickViewProduct.price) ? (
                    <>
                      <span className="text-2xl font-bold text-primary">
                        {formatPrice(quickViewProduct.salePrice)}
                      </span>
                      <span className="text-lg line-through opacity-60">
                        {formatPrice(quickViewProduct.price)}
                      </span>
                      <Badge className="bg-red-500 text-white">
                        {Math.round((1 - parseFloat(quickViewProduct.salePrice) / parseFloat(quickViewProduct.price)) * 100)}% {isRTL ? "خصم" : "OFF"}
                      </Badge>
                    </>
                  ) : (
                    <span className="text-2xl font-bold text-primary">
                      {formatPrice(quickViewProduct.price)}
                    </span>
                  )}
                </div>

                {/* Material */}
                {(quickViewProduct.materialAr || quickViewProduct.materialEn) && (
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{isRTL ? "الخامة:" : "Material:"}</span>
                    <span>{isRTL ? quickViewProduct.materialAr : quickViewProduct.materialEn}</span>
                  </div>
                )}

                {/* Sizes */}
                {quickViewProduct.sizes && quickViewProduct.sizes.length > 0 && (
                  <div className="space-y-2">
                    <span className="font-semibold">{isRTL ? "المقاس:" : "Size:"}</span>
                    <div className="flex flex-wrap gap-2">
                      {quickViewProduct.sizes.map((size) => (
                        <Button
                          key={size}
                          variant={selectedSize === size ? "default" : "outline"}
                          className="min-w-[60px]"
                          onClick={() => setSelectedSize(size)}
                          data-testid={`button-size-${size}`}
                        >
                          {size}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Colors */}
                {quickViewProduct.colors && quickViewProduct.colors.length > 0 && (
                  <div className="space-y-2">
                    <span className="font-semibold">{isRTL ? "اللون:" : "Color:"}</span>
                    <div className="flex flex-wrap gap-2">
                      {quickViewProduct.colors.map((color, index) => (
                        <button
                          key={index}
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg border-2 transition-all ${
                            selectedColor === color.hex 
                              ? "border-primary" 
                              : "border-gray-200 hover:border-gray-400"
                          }`}
                          onClick={() => setSelectedColor(color.hex)}
                          data-testid={`button-color-${index}`}
                        >
                          <div 
                            className="w-5 h-5 rounded-full border border-gray-300"
                            style={{ backgroundColor: color.hex }}
                          />
                          <span className="text-sm">
                            {isRTL ? color.nameAr : color.nameEn}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Stock Status */}
                {quickViewProduct.stock !== null && (
                  <div>
                    {quickViewProduct.stock === 0 ? (
                      <Badge variant="destructive" className="text-sm">
                        {isRTL ? "نفذت الكمية" : "Out of Stock"}
                      </Badge>
                    ) : quickViewProduct.stock < 5 ? (
                      <Badge variant="outline" className="text-sm border-orange-500 text-orange-500">
                        {isRTL ? `متبقي ${quickViewProduct.stock} قطع فقط` : `Only ${quickViewProduct.stock} left`}
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-sm border-green-500 text-green-500">
                        <Check className="w-3 h-3 mr-1" />
                        {isRTL ? "متوفر" : "In Stock"}
                      </Badge>
                    )}
                  </div>
                )}

                {/* Features */}
                <div className="flex flex-wrap gap-2">
                  {quickViewProduct.isCustomizable && (
                    <Badge className="bg-purple-100 text-purple-700">
                      <Palette className="w-3 h-3 mr-1" />
                      {isRTL ? "قابل للتخصيص" : "Customizable"}
                    </Badge>
                  )}
                  {quickViewProduct.featured && (
                    <Badge className="bg-primary/10 text-primary">
                      <Star className="w-3 h-3 mr-1" />
                      {isRTL ? "منتج مميز" : "Featured"}
                    </Badge>
                  )}
                  {quickViewProduct.isNew && (
                    <Badge className="bg-green-100 text-green-700">
                      <Sparkles className="w-3 h-3 mr-1" />
                      {isRTL ? "جديد" : "New"}
                    </Badge>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4">
                  <Button 
                    className="flex-1"
                    disabled={quickViewProduct.stock === 0}
                    data-testid="button-add-to-cart"
                  >
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    {isRTL ? "أضف للسلة" : "Add to Cart"}
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => toggleWishlist(quickViewProduct.id)}
                    data-testid="button-wishlist-quick-view"
                  >
                    <Heart className={`w-4 h-4 ${wishlist.includes(quickViewProduct.id) ? 'fill-red-500 text-red-500' : ''}`} />
                  </Button>
                  <Link href={`/product/${quickViewProduct.slug}`}>
                    <Button variant="outline" data-testid="button-view-details">
                      {isRTL ? "عرض التفاصيل" : "View Details"}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </motion.main>
    </>
  );
}