import type { Brand, Product, GalleryItem } from "@shared/schema";

// Sample data for development
export const sampleBrands: Brand[] = [
  {
    id: "1",
    name: "ماركة الأناقة",
    slug: "marca-elegance",
    description: "رائدة في الأناقة الرجالية",
    logoUrl: "/images/brands/marca-elegance.png",
    createdAt: new Date(),
  },
  {
    id: "2",
    name: "دار الفخامة",
    slug: "dar-luxury",
    description: "تصاميم فاخرة ومميزة",
    logoUrl: "/images/brands/dar-luxury.png",
    createdAt: new Date(),
  },
  {
    id: "3",
    name: "بيت الأزياء",
    slug: "bait-fashion",
    description: "أزياء تقليدية عصرية",
    logoUrl: "/images/brands/bait-fashion.png",
    createdAt: new Date(),
  },
];

export const sampleProducts: Product[] = [
  {
    id: "1",
    title: "ثوب ملكي فاخر",
    description: "ثوب تقليدي بتصميم ملكي فاخر مصنوع من أجود الأقمشة",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    brandId: "1",
    tags: ["ثوب", "فاخر"],
    createdAt: new Date(),
  },
  {
    id: "2",
    title: "مشلح تراثي أصيل",
    description: "مشلح تقليدي يجمع بين الأصالة والعراقة",
    imageUrl: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    brandId: "2",
    tags: ["مشلح", "تقليدي"],
    createdAt: new Date(),
  },
  {
    id: "3",
    title: "بشت ذهبي راقي",
    description: "بشت فاخر بتطريز ذهبي يليق بالمناسبات الخاصة",
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    brandId: "3",
    tags: ["بشت", "فاخر"],
    createdAt: new Date(),
  },
];

export const sampleGalleryItems: GalleryItem[] = [
  {
    id: "1",
    title: "عرض أزياء تقليدية",
    description: "عرض مميز للأزياء التقليدية",
    imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000",
    createdAt: new Date(),
  },
  {
    id: "2",
    title: "تفاصيل التطريز التقليدي",
    description: "تفاصيل دقيقة للتطريز اليدوي",
    imageUrl: "https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    createdAt: new Date(),
  },
  {
    id: "3",
    title: "إكسسوارات تقليدية",
    description: "مجموعة من الإكسسوارات التراثية",
    imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1200",
    createdAt: new Date(),
  },
];
