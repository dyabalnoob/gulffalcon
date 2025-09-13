import { type User, type InsertUser, type Brand, type InsertBrand, type Product, type InsertProduct, type GalleryItem, type InsertGalleryItem, type ContactMessage, type InsertContactMessage } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getBrands(): Promise<Brand[]>;
  getBrand(id: string): Promise<Brand | undefined>;
  getBrandBySlug(slug: string): Promise<Brand | undefined>;
  createBrand(brand: InsertBrand): Promise<Brand>;
  
  getProducts(): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  getProductBySlug(slug: string): Promise<Product | undefined>;
  getProductsByBrand(brandId: string): Promise<Product[]>;
  getProductsByCategory(category: string): Promise<Product[]>;
  getFeaturedProducts(): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: string, product: Partial<InsertProduct>): Promise<Product | undefined>;
  
  getGalleryItems(): Promise<GalleryItem[]>;
  createGalleryItem(item: InsertGalleryItem): Promise<GalleryItem>;
  
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private brands: Map<string, Brand>;
  private products: Map<string, Product>;
  private galleryItems: Map<string, GalleryItem>;
  private contactMessages: Map<string, ContactMessage>;

  constructor() {
    this.users = new Map();
    this.brands = new Map();
    this.products = new Map();
    this.galleryItems = new Map();
    this.contactMessages = new Map();
    
    // Initialize with some sample data
    this.initializeData();
  }

  private initializeData() {
    // Sample brands
    const brands = [
      { nameAr: "ماركة الأناقة", nameEn: "Marca Elegance", slug: "marca-elegance", descriptionAr: "رائدة في الأناقة الرجالية", descriptionEn: "Leading in men's elegance", logoUrl: "/images/brands/marca-elegance.png" },
      { nameAr: "دار الفخامة", nameEn: "Dar Luxury", slug: "dar-luxury", descriptionAr: "تصاميم فاخرة ومميزة", descriptionEn: "Luxurious and distinctive designs", logoUrl: "/images/brands/dar-luxury.png" },
      { nameAr: "بيت الأزياء", nameEn: "Fashion House", slug: "bait-fashion", descriptionAr: "أزياء تقليدية عصرية", descriptionEn: "Modern traditional fashion", logoUrl: "/images/brands/bait-fashion.png" },
      { nameAr: "معرض النخبة", nameEn: "Elite Gallery", slug: "maerad-elite", descriptionAr: "للرجل المتميز", descriptionEn: "For the distinguished man", logoUrl: "/images/brands/maerad-elite.png" },
      { nameAr: "صالون الرجل", nameEn: "Men's Salon", slug: "salon-man", descriptionAr: "أناقة بلا حدود", descriptionEn: "Unlimited elegance", logoUrl: "/images/brands/salon-man.png" },
      { nameAr: "متجر الأصالة", nameEn: "Authenticity Store", slug: "store-authenticity", descriptionAr: "تراث وعراقة", descriptionEn: "Heritage and authenticity", logoUrl: "/images/brands/store-authenticity.png" },
    ];

    brands.forEach(brand => {
      const id = randomUUID();
      this.brands.set(id, {
        id,
        ...brand,
        createdAt: new Date(),
      });
    });

    // Sample products
    const brandIds = Array.from(this.brands.keys());
    const products = [
      {
        nameAr: "ثوب ملكي فاخر",
        nameEn: "Luxury Royal Thobe",
        slug: "luxury-royal-thobe",
        descriptionAr: "ثوب تقليدي بتصميم ملكي فاخر مصنوع من أجود الأقمشة",
        descriptionEn: "Traditional thobe with luxurious royal design made from finest fabrics",
        price: "2500.00",
        mainImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        images: [],
        category: "thobes",
        brandId: brandIds[0],
        tags: ["ثوب", "فاخر"],
        sizes: ["48", "50", "52", "54", "56"],
        colors: [],
        stock: 10,
        featured: true,
        isNew: false,
        isCustomizable: true
      },
      {
        nameAr: "مشلح تراثي أصيل",
        nameEn: "Traditional Heritage Mishlah",
        slug: "traditional-heritage-mishlah",
        descriptionAr: "مشلح تقليدي يجمع بين الأصالة والعراقة",
        descriptionEn: "Traditional mishlah combining authenticity and heritage",
        price: "3500.00",
        mainImage: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        images: [],
        category: "mishlahs",
        brandId: brandIds[1],
        tags: ["مشلح", "تقليدي"],
        sizes: ["48", "50", "52", "54", "56"],
        colors: [],
        stock: 5,
        featured: false,
        isNew: false,
        isCustomizable: true
      },
      {
        nameAr: "بشت ذهبي راقي",
        nameEn: "Elegant Golden Bisht",
        slug: "elegant-golden-bisht",
        descriptionAr: "بشت فاخر بتطريز ذهبي يليق بالمناسبات الخاصة",
        descriptionEn: "Luxurious bisht with golden embroidery suitable for special occasions",
        price: "5000.00",
        mainImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        images: [],
        category: "bishts",
        brandId: brandIds[2],
        tags: ["بشت", "فاخر"],
        sizes: ["48", "50", "52", "54", "56"],
        colors: [],
        stock: 3,
        featured: true,
        isNew: false,
        isCustomizable: false
      },
      {
        nameAr: "ثوب عصري مميز",
        nameEn: "Modern Distinctive Thobe",
        slug: "modern-distinctive-thobe",
        descriptionAr: "ثوب بتصميم عصري يناسب الشباب",
        descriptionEn: "Modern design thobe suitable for youth",
        price: "1800.00",
        mainImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        images: [],
        category: "thobes",
        brandId: brandIds[0],
        tags: ["ثوب", "عصري"],
        sizes: ["48", "50", "52", "54", "56"],
        colors: [],
        stock: 15,
        featured: false,
        isNew: true,
        isCustomizable: true
      },
      {
        nameAr: "مشلح ملوكي فخم",
        nameEn: "Royal Luxury Mishlah",
        slug: "royal-luxury-mishlah",
        descriptionAr: "مشلح بتصميم ملوكي فخم للمناسبات الرسمية",
        descriptionEn: "Royal luxury mishlah design for formal occasions",
        price: "4500.00",
        mainImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        images: [],
        category: "mishlahs",
        brandId: brandIds[1],
        tags: ["مشلح", "فاخر"],
        sizes: ["48", "50", "52", "54", "56"],
        colors: [],
        stock: 7,
        featured: true,
        isNew: false,
        isCustomizable: false
      },
      {
        nameAr: "بشت تراثي عريق",
        nameEn: "Ancient Heritage Bisht",
        slug: "ancient-heritage-bisht",
        descriptionAr: "بشت تراثي يحمل عبق الماضي الأصيل",
        descriptionEn: "Heritage bisht carrying the authentic past fragrance",
        price: "3800.00",
        mainImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        images: [],
        category: "bishts",
        brandId: brandIds[2],
        tags: ["بشت", "تقليدي"],
        sizes: ["48", "50", "52", "54", "56"],
        colors: [],
        stock: 4,
        featured: false,
        isNew: false,
        isCustomizable: true
      },
      // السديريات - Vests
      {
        nameAr: "سديرية تفصيل خاص - إصدار خاص",
        nameEn: "Custom Tailored Vest - Special Edition",
        slug: "custom-vest-special-edition",
        descriptionAr: "سديرية فاخرة بتصميم خاص، قماش عالي الجودة مع فرو طبيعي على الياقة والجيوب، سحاب ذهبي فاخر",
        descriptionEn: "Luxurious vest with special design, high-quality fabric with natural fur collar and pockets, premium golden zipper",
        price: "1500.00",
        salePrice: "1200.00",
        mainImage: "/images/products/الصقر-الخليجي-سديرية-تفصيل-خاص-2025-8_1757781334517.jpg",
        images: [
          "/images/products/الصقر-الخليجي-سديرية-تفصيل-2025-8_1757781334516.jpg",
          "/images/products/الصقر-الخليجي-سديرية-تفصيل-2025-9_1757781334516.jpg"
        ],
        category: "vests",
        subcategory: "luxury",
        brandId: brandIds[0],
        tags: ["سديرية", "تفصيل", "فاخر", "إصدار خاص"],
        sizes: ["48", "50", "52", "54", "56", "58"],
        colors: [
          { nameAr: "أسود", nameEn: "Black", hex: "#000000" },
          { nameAr: "كحلي", nameEn: "Navy", hex: "#1a237e" },
          { nameAr: "بيج", nameEn: "Beige", hex: "#d4b896" }
        ],
        materialAr: "صوف طبيعي مع فرو",
        materialEn: "Natural wool with fur",
        stock: 10,
        featured: true,
        isNew: true,
        isCustomizable: true,
        sku: "VEST-SE-001"
      },
      {
        nameAr: "سديرية رجالي كلاسيك",
        nameEn: "Men's Classic Vest",
        slug: "mens-classic-vest",
        descriptionAr: "سديرية أنيقة بتصميم كلاسيكي، قماش قطني فاخر، مناسبة للمناسبات الرسمية والعملية",
        descriptionEn: "Elegant vest with classic design, luxurious cotton fabric, suitable for formal and business occasions",
        price: "850.00",
        mainImage: "/images/products/الصقر-الخليجي-سديرية-رجالي-2025-1_1757781334517.jpg",
        images: [
          "/images/products/الصقر-الخليجي-سديرية-رجالي-2025-2_1757781334518.jpg",
          "/images/products/الصقر-الخليجي-سديرية-رجالي-2025-3_1757781334518.jpg"
        ],
        category: "vests",
        subcategory: "classic",
        brandId: brandIds[1],
        tags: ["سديرية", "كلاسيك", "رسمي"],
        sizes: ["48", "50", "52", "54", "56"],
        colors: [
          { nameAr: "رمادي", nameEn: "Gray", hex: "#616161" },
          { nameAr: "أسود", nameEn: "Black", hex: "#000000" }
        ],
        materialAr: "قطن مصري",
        materialEn: "Egyptian cotton",
        stock: 15,
        featured: false,
        isNew: false,
        isCustomizable: true,
        sku: "VEST-CL-002"
      },
      {
        nameAr: "سديرية عصرية رياضية",
        nameEn: "Modern Sport Vest",
        slug: "modern-sport-vest",
        descriptionAr: "سديرية عصرية بتصميم رياضي، خامة مبطنة للدفء، مثالية للأنشطة الخارجية",
        descriptionEn: "Modern vest with sporty design, quilted material for warmth, perfect for outdoor activities",
        price: "650.00",
        mainImage: "/images/products/الصقر-الخليجي-سديرية-رجالي-2025-7_1757781334521.jpg",
        images: [
          "/images/products/الصقر-الخليجي-سديرية-رجالي-2025-6_1757781334520.jpg",
          "/images/products/الصقر-الخليجي-سديرية-رجالي-2025-5_1757781334520.jpg"
        ],
        category: "vests",
        subcategory: "sport",
        brandId: brandIds[3],
        tags: ["سديرية", "رياضي", "عصري"],
        sizes: ["M", "L", "XL", "XXL", "XXXL"],
        colors: [
          { nameAr: "رمادي داكن", nameEn: "Dark Gray", hex: "#424242" },
          { nameAr: "أخضر زيتي", nameEn: "Olive Green", hex: "#689f38" }
        ],
        materialAr: "بوليستر مبطن",
        materialEn: "Quilted polyester",
        stock: 20,
        featured: true,
        isNew: true,
        isCustomizable: false,
        sku: "VEST-SP-003"
      },
      {
        nameAr: "سديرية شتوية دافئة",
        nameEn: "Winter Warm Vest",
        slug: "winter-warm-vest",
        descriptionAr: "سديرية شتوية مبطنة بالفرو الصناعي، توفر الدفء والأناقة في الأجواء الباردة",
        descriptionEn: "Winter vest lined with synthetic fur, provides warmth and elegance in cold weather",
        price: "950.00",
        mainImage: "/images/products/الصقر-الخليجي-سديرية-رجالي-2025-8_1757781334521.jpg",
        images: [
          "/images/products/الصقر-الخليجي-سديرية-رجالي-2025-9_1757781334515.jpg"
        ],
        category: "vests",
        subcategory: "winter",
        brandId: brandIds[2],
        tags: ["سديرية", "شتوي", "دافئ"],
        sizes: ["48", "50", "52", "54", "56", "58"],
        colors: [
          { nameAr: "أسود", nameEn: "Black", hex: "#000000" },
          { nameAr: "بني", nameEn: "Brown", hex: "#795548" }
        ],
        materialAr: "صوف مع بطانة فرو",
        materialEn: "Wool with fur lining",
        stock: 12,
        featured: false,
        isNew: false,
        isCustomizable: true,
        sku: "VEST-WI-004"
      },
      {
        nameAr: "سديرية تفصيل يومي",
        nameEn: "Daily Custom Vest",
        slug: "daily-custom-vest",
        descriptionAr: "سديرية عملية للاستخدام اليومي، تصميم أنيق وعملي مع جيوب متعددة",
        descriptionEn: "Practical vest for daily use, elegant and functional design with multiple pockets",
        price: "550.00",
        mainImage: "/images/products/الصقر-الخليجي-سديرية-رجالي-2025-4_1757781334519.jpg",
        images: [],
        category: "vests",
        subcategory: "casual",
        brandId: brandIds[4],
        tags: ["سديرية", "يومي", "عملي"],
        sizes: ["48", "50", "52", "54", "56"],
        colors: [
          { nameAr: "بيج", nameEn: "Beige", hex: "#d4b896" },
          { nameAr: "رمادي فاتح", nameEn: "Light Gray", hex: "#bdbdbd" }
        ],
        materialAr: "قطن مخلوط",
        materialEn: "Cotton blend",
        stock: 25,
        featured: false,
        isNew: false,
        isCustomizable: true,
        sku: "VEST-CA-005"
      }
    ];

    products.forEach(product => {
      const id = randomUUID();
      this.products.set(id, {
        id,
        ...product,
        salePrice: null,
        subcategory: null,
        materialAr: null,
        materialEn: null,
        sku: null,
        metaTitle: null,
        metaDescription: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });

    // Sample gallery items
    const galleryItems = [
      {
        title: "عرض أزياء تقليدية",
        description: "عرض مميز للأزياء التقليدية",
        imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000"
      },
      {
        title: "تفاصيل التطريز التقليدي",
        description: "تفاصيل دقيقة للتطريز اليدوي",
        imageUrl: "https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
      },
      {
        title: "إكسسوارات تقليدية",
        description: "مجموعة من الإكسسوارات التراثية",
        imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1200"
      },
      {
        title: "أناقة عصرية",
        description: "دمج الأصالة بالعصرية",
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800"
      },
      {
        title: "أقمشة فاخرة",
        description: "أجود أنواع الأقمشة المستخدمة",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=900"
      },
      {
        title: "فن الخط العربي",
        description: "تطريز بالخط العربي الأصيل",
        imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=700"
      }
    ];

    galleryItems.forEach(item => {
      const id = randomUUID();
      this.galleryItems.set(id, {
        id,
        ...item,
        createdAt: new Date(),
      });
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getBrands(): Promise<Brand[]> {
    return Array.from(this.brands.values());
  }

  async getBrand(id: string): Promise<Brand | undefined> {
    return this.brands.get(id);
  }

  async getBrandBySlug(slug: string): Promise<Brand | undefined> {
    return Array.from(this.brands.values()).find(brand => brand.slug === slug);
  }

  async createBrand(insertBrand: InsertBrand): Promise<Brand> {
    const id = randomUUID();
    const brand: Brand = { 
      id,
      nameAr: insertBrand.nameAr,
      nameEn: insertBrand.nameEn,
      slug: insertBrand.slug,
      descriptionAr: insertBrand.descriptionAr ?? null,
      descriptionEn: insertBrand.descriptionEn ?? null,
      logoUrl: insertBrand.logoUrl ?? null,
      createdAt: new Date(),
    };
    this.brands.set(id, brand);
    return brand;
  }

  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProductBySlug(slug: string): Promise<Product | undefined> {
    return Array.from(this.products.values()).find(product => product.slug === slug);
  }

  async getProductsByBrand(brandId: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(product => product.brandId === brandId);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(product => product.category === category);
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(product => product.featured);
  }

  async updateProduct(id: string, productUpdate: Partial<InsertProduct>): Promise<Product | undefined> {
    const product = this.products.get(id);
    if (!product) return undefined;
    
    const updatedProduct: Product = {
      ...product,
      ...productUpdate,
      updatedAt: new Date(),
    };
    this.products.set(id, updatedProduct);
    return updatedProduct;
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = randomUUID();
    const product: Product = { 
      id,
      nameAr: insertProduct.nameAr,
      nameEn: insertProduct.nameEn,
      slug: insertProduct.slug,
      descriptionAr: insertProduct.descriptionAr ?? null,
      descriptionEn: insertProduct.descriptionEn ?? null,
      price: insertProduct.price,
      salePrice: insertProduct.salePrice ?? null,
      mainImage: insertProduct.mainImage,
      images: insertProduct.images ?? [],
      brandId: insertProduct.brandId ?? null,
      category: insertProduct.category,
      subcategory: insertProduct.subcategory ?? null,
      tags: insertProduct.tags ?? [],
      sizes: insertProduct.sizes ?? [],
      colors: insertProduct.colors ?? [],
      materialAr: insertProduct.materialAr ?? null,
      materialEn: insertProduct.materialEn ?? null,
      featured: insertProduct.featured ?? false,
      isNew: insertProduct.isNew ?? false,
      isCustomizable: insertProduct.isCustomizable ?? false,
      stock: insertProduct.stock ?? 0,
      sku: insertProduct.sku ?? null,
      metaTitle: insertProduct.metaTitle ?? null,
      metaDescription: insertProduct.metaDescription ?? null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.products.set(id, product);
    return product;
  }

  async getGalleryItems(): Promise<GalleryItem[]> {
    return Array.from(this.galleryItems.values());
  }

  async createGalleryItem(insertItem: InsertGalleryItem): Promise<GalleryItem> {
    const id = randomUUID();
    const item: GalleryItem = { 
      id,
      title: insertItem.title,
      imageUrl: insertItem.imageUrl,
      description: insertItem.description ?? null,
      createdAt: new Date(),
    };
    this.galleryItems.set(id, item);
    return item;
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = randomUUID();
    const message: ContactMessage = { 
      id,
      name: insertMessage.name,
      email: insertMessage.email,
      phone: insertMessage.phone ?? null,
      subject: insertMessage.subject,
      message: insertMessage.message,
      createdAt: new Date(),
    };
    this.contactMessages.set(id, message);
    return message;
  }
}

export const storage = new MemStorage();
