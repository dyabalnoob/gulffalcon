import { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/contexts/language-context";
import {
  ShoppingBag, Heart, Share2, Star, Check, X, ChevronLeft, ChevronRight,
  Shield, Truck, RefreshCw, Award, Sparkles, Palette, Package,
  ArrowLeft, ArrowRight, Info, ZoomIn
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import type { Product, Brand } from "@shared/schema";
import ProductCard from "@/components/product-card";
import SEOMeta from "@/components/seo-meta";

export default function ProductDetail() {
  const { slug } = useParams();
  const [, setLocation] = useLocation();
  const { isRTL, language } = useLanguage();
  const { toast } = useToast();
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [isWishlist, setIsWishlist] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isZooming, setIsZooming] = useState(false);

  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const { data: brands = [] } = useQuery<Brand[]>({
    queryKey: ["/api/brands"],
  });

  const product = products.find(p => p.slug === slug);
  const brand = product ? brands.find(b => b.id === product.brandId) : null;

  const relatedProducts = products.filter(p => 
    p.id !== product?.id && 
    (p.category === product?.category || p.brandId === product?.brandId)
  ).slice(0, 4);

  useEffect(() => {
    if (product && product.sizes?.length) {
      setSelectedSize(product.sizes[0]);
    }
  }, [product]);

  if (!product) {
    return (
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen pt-32 pb-20 px-6"
      >
        <div className="container mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">
            {isRTL ? "المنتج غير موجود" : "Product Not Found"}
          </h1>
          <p className="mb-8 opacity-70">
            {isRTL ? "عذراً، لم نتمكن من العثور على هذا المنتج" : "Sorry, we couldn't find this product"}
          </p>
          <Link href="/products">
            <Button>
              {isRTL ? "العودة للمنتجات" : "Back to Products"}
            </Button>
          </Link>
        </div>
      </motion.main>
    );
  }

  const allImages = [product.mainImage, ...(product.images || [])];
  
  const formatPrice = (price: string) => {
    return new Intl.NumberFormat(isRTL ? 'ar-SA' : 'en-SA', {
      style: 'currency',
      currency: 'SAR'
    }).format(parseFloat(price));
  };

  const handleAddToCart = () => {
    toast({
      title: isRTL ? "تمت الإضافة للسلة" : "Added to Cart",
      description: isRTL 
        ? `${product.nameAr} - ${quantity} قطعة`
        : `${product.nameEn} - ${quantity} items`,
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: isRTL ? product.nameAr : product.nameEn,
          text: isRTL ? (product.descriptionAr || undefined) : (product.descriptionEn || undefined),
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: isRTL ? "تم نسخ الرابط" : "Link Copied",
        description: isRTL ? "تم نسخ رابط المنتج" : "Product link copied to clipboard",
      });
    }
  };

  const handleImageZoom = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  // Generate structured data for SEO
  const structuredData = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": isRTL ? product.nameAr : product.nameEn,
    "description": isRTL ? (product.descriptionAr || product.descriptionEn) : (product.descriptionEn || product.descriptionAr),
    "image": allImages,
    "brand": {
      "@type": "Brand",
      "name": brand ? (isRTL ? brand.nameAr : brand.nameEn) : "Gulf Falcon"
    },
    "offers": {
      "@type": "Offer",
      "url": window.location.href,
      "availability": product.stock === 0 
        ? "https://schema.org/OutOfStock" 
        : product.stock && product.stock < 5 
          ? "https://schema.org/LimitedAvailability" 
          : "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": isRTL ? "مؤسسة الصقر الخليجي" : "Gulf Falcon Corporation"
      }
    },
    ...(product.sku && { "sku": product.sku }),
    ...(product.materialEn && { "material": isRTL ? product.materialAr : product.materialEn }),
    "category": product.category,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.5",
      "reviewCount": "127"
    }
  };

  return (
    <>
      <SEOMeta
        title={isRTL ? product.nameAr : product.nameEn}
        description={isRTL ? (product.descriptionAr || product.descriptionEn || "") : (product.descriptionEn || product.descriptionAr || "")}
        image={product.mainImage}
        url={window.location.href}
        type="product"
        price={undefined}
        currency={undefined}
        availability={product.stock === 0 ? "out of stock" : "in stock"}
        brand={brand ? (isRTL ? brand.nameAr : brand.nameEn) : undefined}
        category={product.category}
        sku={product.sku || undefined}
        jsonLd={structuredData}
      />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen pt-24 pb-20 px-6"
        dir={isRTL ? "rtl" : "ltr"}
      >
        <div className="container mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-sm" data-testid="breadcrumb">
          <Link href="/">
            <span className="hover:text-primary transition-colors cursor-pointer">
              {isRTL ? "الرئيسية" : "Home"}
            </span>
          </Link>
          <ChevronRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
          <Link href="/products">
            <span className="hover:text-primary transition-colors cursor-pointer">
              {isRTL ? "المنتجات" : "Products"}
            </span>
          </Link>
          <ChevronRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
          <span className="text-primary font-medium">
            {isRTL ? product.nameAr : product.nameEn}
          </span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <motion.div 
              className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 professional-border cursor-zoom-in"
              onMouseMove={handleImageZoom}
              onMouseEnter={() => setIsZooming(true)}
              onMouseLeave={() => setIsZooming(false)}
              data-testid="product-main-image"
            >
              <img
                src={allImages[selectedImage]}
                alt={isRTL ? product.nameAr : product.nameEn}
                className="w-full h-full object-cover"
                style={isZooming ? {
                  transform: `scale(2)`,
                  transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`
                } : {}}
              />
              
              {/* Image Navigation */}
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedImage(prev => prev > 0 ? prev - 1 : allImages.length - 1)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 hover:bg-white shadow-lg transition-all"
                    data-testid="button-prev-image"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setSelectedImage(prev => prev < allImages.length - 1 ? prev + 1 : 0)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 hover:bg-white shadow-lg transition-all"
                    data-testid="button-next-image"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Zoom Indicator */}
              {isZooming && (
                <div className="absolute top-4 right-4 px-3 py-1 bg-black/70 text-white text-xs rounded-lg flex items-center gap-1">
                  <ZoomIn className="w-3 h-3" />
                  {isRTL ? "تكبير" : "Zooming"}
                </div>
              )}
            </motion.div>

            {/* Thumbnail Images */}
            {allImages.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {allImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden professional-border transition-all ${
                      selectedImage === index ? 'ring-2 ring-primary' : ''
                    }`}
                    data-testid={`button-thumb-${index}`}
                  >
                    <img
                      src={img}
                      alt={`${isRTL ? product.nameAr : product.nameEn} ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-110 transition-transform"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Brand & Title */}
            {brand && (
              <Link href={`/products?brand=${brand.id}`}>
                <span className="text-sm text-secondary hover:text-primary transition-colors cursor-pointer">
                  {isRTL ? brand.nameAr : brand.nameEn}
                </span>
              </Link>
            )}
            
            <div>
              <h1 className="text-3xl font-bold mb-2" data-testid="product-title">
                {isRTL ? product.nameAr : product.nameEn}
              </h1>
              
              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <span className="text-sm opacity-70">4.5 (127 {isRTL ? "تقييم" : "reviews"})</span>
              </div>
            </div>

            {/* Luxury Tagline */}
            <div className="mb-6">
              <blockquote className="text-lg italic text-primary font-semibold leading-relaxed text-center border-l-4 border-primary pl-4" data-testid="luxury-tagline">
                "{isRTL ? product.luxuryTaglineAr : product.luxuryTaglineEn}"
              </blockquote>
            </div>

            {/* Description */}
            <p className="text-base opacity-80 leading-relaxed" data-testid="product-description">
              {isRTL ? product.descriptionAr : product.descriptionEn}
            </p>

            <Separator />

            {/* Material */}
            {(product.materialAr || product.materialEn) && (
              <div className="flex items-center justify-between">
                <span className="font-semibold">{isRTL ? "الخامة" : "Material"}</span>
                <span>{isRTL ? product.materialAr : product.materialEn}</span>
              </div>
            )}

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{isRTL ? "المقاس" : "Size"}</span>
                  <button className="text-sm text-primary hover:underline flex items-center gap-1">
                    <Info className="w-3 h-3" />
                    {isRTL ? "دليل المقاسات" : "Size Guide"}
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? "default" : "outline"}
                      className="min-w-[70px]"
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
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-3">
                <span className="font-semibold">{isRTL ? "اللون" : "Color"}</span>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color, index) => (
                    <button
                      key={index}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all ${
                        selectedColor === color.hex 
                          ? "border-primary shadow-lg" 
                          : "border-gray-200 hover:border-gray-400"
                      }`}
                      onClick={() => setSelectedColor(color.hex)}
                      data-testid={`button-color-${index}`}
                    >
                      <div 
                        className="w-6 h-6 rounded-full border border-gray-300 shadow-sm"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span className="text-sm font-medium">
                        {isRTL ? color.nameAr : color.nameEn}
                      </span>
                      {selectedColor === color.hex && (
                        <Check className="w-4 h-4 text-primary" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="space-y-3">
              <span className="font-semibold">{isRTL ? "الكمية" : "Quantity"}</span>
              <div className="flex items-center gap-4">
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-gray-100 transition-colors"
                    data-testid="button-quantity-decrease"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <span className="px-6 font-medium" data-testid="text-quantity">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-gray-100 transition-colors"
                    data-testid="button-quantity-increase"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                </div>
                
                {/* Stock Status */}
                {product.stock !== null && (
                  <>
                    {product.stock === 0 ? (
                      <Badge variant="destructive">
                        {isRTL ? "نفذت الكمية" : "Out of Stock"}
                      </Badge>
                    ) : product.stock < 5 ? (
                      <Badge variant="outline" className="border-orange-500 text-orange-500">
                        {isRTL ? `متبقي ${product.stock} قطع فقط` : `Only ${product.stock} left`}
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="border-green-500 text-green-500">
                        <Check className="w-3 h-3 mr-1" />
                        {isRTL ? "متوفر" : "In Stock"}
                      </Badge>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button 
                className="flex-1 text-lg py-6"
                disabled={product.stock === 0}
                onClick={handleAddToCart}
                data-testid="button-add-to-cart"
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                {isRTL ? "أضف للسلة" : "Add to Cart"}
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="w-14 h-14"
                onClick={() => setIsWishlist(!isWishlist)}
                data-testid="button-wishlist"
              >
                <Heart className={`w-5 h-5 ${isWishlist ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="w-14 h-14"
                onClick={handleShare}
                data-testid="button-share"
              >
                <Share2 className="w-5 h-5" />
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-3">
              {product.isCustomizable && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-purple-50 border border-purple-200">
                  <Palette className="w-5 h-5 text-purple-600" />
                  <span className="text-sm font-medium">{isRTL ? "قابل للتخصيص" : "Customizable"}</span>
                </div>
              )}
              {product.featured && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-primary/5 border border-primary/20">
                  <Star className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium">{isRTL ? "منتج مميز" : "Featured"}</span>
                </div>
              )}
              {product.isNew && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-green-50 border border-green-200">
                  <Sparkles className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium">{isRTL ? "جديد" : "New Arrival"}</span>
                </div>
              )}
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
              <div className="text-center">
                <Shield className="w-8 h-8 mx-auto mb-2 text-primary" />
                <span className="text-xs">{isRTL ? "ضمان الجودة" : "Quality Guarantee"}</span>
              </div>
              <div className="text-center">
                <Truck className="w-8 h-8 mx-auto mb-2 text-primary" />
                <span className="text-xs">{isRTL ? "شحن سريع" : "Fast Shipping"}</span>
              </div>
              <div className="text-center">
                <RefreshCw className="w-8 h-8 mx-auto mb-2 text-primary" />
                <span className="text-xs">{isRTL ? "استرجاع سهل" : "Easy Returns"}</span>
              </div>
              <div className="text-center">
                <Award className="w-8 h-8 mx-auto mb-2 text-primary" />
                <span className="text-xs">{isRTL ? "أصلي 100%" : "100% Authentic"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details" data-testid="tab-details">
                {isRTL ? "التفاصيل" : "Details"}
              </TabsTrigger>
              <TabsTrigger value="care" data-testid="tab-care">
                {isRTL ? "العناية" : "Care Instructions"}
              </TabsTrigger>
              <TabsTrigger value="shipping" data-testid="tab-shipping">
                {isRTL ? "الشحن والإرجاع" : "Shipping & Returns"}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="mt-6 space-y-4">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="specs">
                  <AccordionTrigger>{isRTL ? "المواصفات" : "Specifications"}</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {product.sku && (
                        <div className="flex justify-between py-2 border-b">
                          <span className="font-medium">{isRTL ? "رقم المنتج" : "SKU"}</span>
                          <span>{product.sku}</span>
                        </div>
                      )}
                      {(product.materialAr || product.materialEn) && (
                        <div className="flex justify-between py-2 border-b">
                          <span className="font-medium">{isRTL ? "الخامة" : "Material"}</span>
                          <span>{isRTL ? product.materialAr : product.materialEn}</span>
                        </div>
                      )}
                      {product.sizes && (
                        <div className="flex justify-between py-2 border-b">
                          <span className="font-medium">{isRTL ? "المقاسات المتاحة" : "Available Sizes"}</span>
                          <span>{product.sizes.join(", ")}</span>
                        </div>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="features">
                  <AccordionTrigger>{isRTL ? "المميزات" : "Features"}</AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-green-500 mt-0.5" />
                        <span>{isRTL ? "تصميم عصري وأنيق" : "Modern and elegant design"}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-green-500 mt-0.5" />
                        <span>{isRTL ? "خامات عالية الجودة" : "High quality materials"}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-green-500 mt-0.5" />
                        <span>{isRTL ? "مناسب لجميع المناسبات" : "Suitable for all occasions"}</span>
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>
            
            <TabsContent value="care" className="mt-6 space-y-4">
              <div className="prose max-w-none">
                <h3 className="text-lg font-semibold mb-3">
                  {isRTL ? "تعليمات العناية" : "Care Instructions"}
                </h3>
                <ul className="space-y-2">
                  <li>{isRTL ? "غسيل جاف فقط" : "Dry clean only"}</li>
                  <li>{isRTL ? "لا تستخدم المبيض" : "Do not bleach"}</li>
                  <li>{isRTL ? "كي على حرارة منخفضة" : "Iron on low heat"}</li>
                  <li>{isRTL ? "احفظ في مكان جاف" : "Store in a dry place"}</li>
                </ul>
              </div>
            </TabsContent>
            
            <TabsContent value="shipping" className="mt-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Truck className="w-5 h-5" />
                    {isRTL ? "معلومات الشحن" : "Shipping Information"}
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li>{isRTL ? "شحن مجاني للطلبات فوق 500 ريال" : "Free shipping on orders over 500 SAR"}</li>
                    <li>{isRTL ? "التوصيل خلال 2-5 أيام عمل" : "Delivery within 2-5 business days"}</li>
                    <li>{isRTL ? "شحن دولي متاح" : "International shipping available"}</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <RefreshCw className="w-5 h-5" />
                    {isRTL ? "سياسة الإرجاع" : "Return Policy"}
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li>{isRTL ? "إرجاع مجاني خلال 14 يوم" : "Free returns within 14 days"}</li>
                    <li>{isRTL ? "المنتج يجب أن يكون بحالته الأصلية" : "Product must be in original condition"}</li>
                    <li>{isRTL ? "احتفظ بالفاتورة الأصلية" : "Keep the original receipt"}</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-bold mb-8 text-center">
              {isRTL ? "منتجات ذات صلة" : "Related Products"}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => {
                const relatedBrand = brands.find(b => b.id === relatedProduct.brandId);
                return (
                  <ProductCard
                    key={relatedProduct.id}
                    product={relatedProduct}
                    brand={relatedBrand}
                    onClick={() => setLocation(`/product/${relatedProduct.slug}`)}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </motion.main>
    </>
  );
}