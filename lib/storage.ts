import type {
  User,
  Brand,
  Product,
  GalleryItem,
  ContactMessage,
  InsertUser,
  InsertBrand,
  InsertProduct,
  InsertGalleryItem,
  InsertContactMessage,
} from "../shared/schema";

export interface IStorage {
  // User methods
  getUsers(): Promise<User[]>;
  getUserById(id: string): Promise<User | null>;
  getUserByUsername(username: string): Promise<User | null>;
  createUser(user: InsertUser): Promise<User>;

  // Brand methods
  getBrands(): Promise<Brand[]>;
  getBrandById(id: string): Promise<Brand | null>;
  getBrandBySlug(slug: string): Promise<Brand | null>;
  createBrand(brand: InsertBrand): Promise<Brand>;

  // Product methods
  getProducts(): Promise<Product[]>;
  getProductById(id: string): Promise<Product | null>;
  getProductBySlug(slug: string): Promise<Product | null>;
  getProductsByCategory(category: string): Promise<Product[]>;
  getFeaturedProducts(): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;

  // Gallery methods
  getGalleryItems(): Promise<GalleryItem[]>;
  getGalleryItemById(id: string): Promise<GalleryItem | null>;
  createGalleryItem(item: InsertGalleryItem): Promise<GalleryItem>;

  // Contact methods
  getContactMessages(): Promise<ContactMessage[]>;
  getContactMessageById(id: string): Promise<ContactMessage | null>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
}

export class MemStorage implements IStorage {
  private users = new Map<string, User>();
  private brands = new Map<string, Brand>();
  private products = new Map<string, Product>();
  private galleryItems = new Map<string, GalleryItem>();
  private contactMessages = new Map<string, ContactMessage>();

  constructor() {
    this.initializeData();
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }

  private initializeData() {
    // Initialize brands
    const alSaqrBrand: Brand = {
      id: "al-saqr-1",
      nameAr: "الصقر الخليجي",
      nameEn: "Al-Saqr Al-Khaleeji",
      slug: "al-saqr-al-khaleeji",
      descriptionAr: "علامة تجارية رائدة في الأزياء التراثية الخليجية الفاخرة",
      descriptionEn: "Leading brand in luxury Gulf traditional fashion",
      logoUrl: "/logo.png",
      createdAt: new Date(),
    };
    this.brands.set(alSaqrBrand.id, alSaqrBrand);

    // Initialize products with actual Al-Saqr data
    const products: Product[] = [
      // Prayer Beads Collection (سبح)
      {
        id: "prayer-beads-1",
        nameAr: "سبحة رجالي فاخرة - كهرمان",
        nameEn: "Luxury Men's Prayer Beads - Amber",
        slug: "prayer-beads-amber-luxury",
        descriptionAr: "سبحة رجالي فاخرة من الكهرمان الطبيعي مع تصميم أنيق",
        descriptionEn: "Luxury men's prayer beads made from natural amber with elegant design",
        luxuryTaglineAr: "تراث أصيل وجودة عالمية",
        luxuryTaglineEn: "Authentic heritage with international quality",
        price: "250.00",
        mainImage: "/images/products/prayer-beads/amber-fish-style.jpg",
        images: ["/images/products/prayer-beads/amber-fish-style.jpg"],
        brandId: "al-saqr-1",
        category: "prayer-beads",
        subcategory: "men",
        tags: ["فاخر", "تراثي", "كهرمان", "luxury", "traditional", "amber"],
        featured: true,
        isNew: false,
        stock: 15,
        sku: "AS-PB-001",
        metaTitle: "سبحة كهرمان فاخرة - الصقر الخليجي",
        metaDescription: "سبحة رجالي فاخرة من الكهرمان الطبيعي",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "prayer-beads-2",
        nameAr: "سبحة ذهبي أسود",
        nameEn: "Black Gold Prayer Beads",
        slug: "prayer-beads-black-gold",
        descriptionAr: "سبحة أنيقة بتصميم ذهبي أسود فاخر",
        descriptionEn: "Elegant prayer beads with luxury black and gold design",
        price: "180.00",
        mainImage: "/images/products/prayer-beads/black-gold-beads.jpg",
        images: ["/images/products/prayer-beads/black-gold-beads.jpg"],
        brandId: "al-saqr-1",
        category: "prayer-beads",
        subcategory: "men",
        tags: ["أسود", "ذهبي", "black", "gold"],
        featured: false,
        stock: 20,
        sku: "AS-PB-002",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "prayer-beads-3",
        nameAr: "سبحة زرقاء دائرية",
        nameEn: "Blue Round Prayer Beads",
        slug: "prayer-beads-blue-round",
        descriptionAr: "سبحة زرقاء بخرز دائري ناعم",
        descriptionEn: "Blue prayer beads with smooth round beads",
        price: "120.00",
        mainImage: "/images/products/prayer-beads/blue-round-beads.jpg",
        images: ["/images/products/prayer-beads/blue-round-beads.jpg"],
        brandId: "al-saqr-1",
        category: "prayer-beads",
        subcategory: "men",
        tags: ["زرقاء", "دائري", "blue", "round"],
        featured: false,
        stock: 25,
        sku: "AS-PB-003",
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Vests Collection (سديريات)
      {
        id: "vest-1",
        nameAr: "سديرية رجالي تفصيل خاص",
        nameEn: "Custom Tailored Men's Vest",
        slug: "custom-mens-vest",
        descriptionAr: "سديرية رجالي بتفصيل خاص وجودة عالية",
        descriptionEn: "Custom tailored men's vest with high quality",
        price: "350.00",
        mainImage: "/images/products/الصقر-الخليجي-سديرية-تفصيل-خاص-2025-8_1757781334517.jpg",
        images: [
          "/images/products/الصقر-الخليجي-سديرية-تفصيل-خاص-2025-8_1757781334517.jpg",
          "/images/products/الصقر-الخليجي-سديرية-تفصيل-2025-8_1757781334516.jpg",
          "/images/products/الصقر-الخليجي-سديرية-تفصيل-2025-9_1757781334516.jpg"
        ],
        brandId: "al-saqr-1",
        category: "vests",
        subcategory: "custom",
        tags: ["تفصيل", "خاص", "custom", "tailored"],
        featured: true,
        isCustomizable: true,
        stock: 10,
        sku: "AS-V-001",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "vest-2",
        nameAr: "سديرية رجالي كلاسيكي",
        nameEn: "Classic Men's Vest",
        slug: "classic-mens-vest",
        descriptionAr: "سديرية رجالي بتصميم كلاسيكي أنيق",
        descriptionEn: "Classic elegant men's vest design",
        price: "280.00",
        mainImage: "/images/products/الصقر-الخليجي-سديرية-رجالي-2025-1_1757781334517.jpg",
        images: [
          "/images/products/الصقر-الخليجي-سديرية-رجالي-2025-1_1757781334517.jpg",
          "/images/products/الصقر-الخليجي-سديرية-رجالي-2025-2_1757781334518.jpg",
          "/images/products/الصقر-الخليجي-سديرية-رجالي-2025-3_1757781334518.jpg"
        ],
        brandId: "al-saqr-1",
        category: "vests",
        subcategory: "classic",
        tags: ["كلاسيكي", "classic"],
        featured: false,
        stock: 15,
        sku: "AS-V-002",
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Cloaks Collection (مشالح)
      {
        id: "cloak-1",
        nameAr: "مشلح رجالي أسود ذهبي فاخر",
        nameEn: "Luxury Black Gold Men's Cloak",
        slug: "luxury-black-gold-cloak",
        descriptionAr: "مشلح رجالي فاخر بتطريز ذهبي على خلفية سوداء",
        descriptionEn: "Luxury men's cloak with gold embroidery on black background",
        luxuryTaglineAr: "أناقة استثنائية للمناسبات الخاصة",
        luxuryTaglineEn: "Exceptional elegance for special occasions",
        price: "850.00",
        mainImage: "/images/products/الصقر-الخليجي-مشلح-أسود-ذهبي-فاخر-2025.jpg",
        images: ["/images/products/الصقر-الخليجي-مشلح-أسود-ذهبي-فاخر-2025.jpg"],
        brandId: "al-saqr-1",
        category: "cloaks",
        subcategory: "luxury",
        tags: ["أسود", "ذهبي", "فاخر", "black", "gold", "luxury"],
        featured: true,
        isNew: true,
        stock: 8,
        sku: "AS-C-001",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "cloak-2",
        nameAr: "مشلح بني ذهبي فاخر",
        nameEn: "Luxury Brown Gold Cloak",
        slug: "luxury-brown-gold-cloak",
        descriptionAr: "مشلح فاخر بني مع تطريز ذهبي",
        descriptionEn: "Luxury brown cloak with gold embroidery",
        price: "780.00",
        mainImage: "/images/products/الصقر-الخليجي-مشلح-بني-ذهبي-فاخر-2025.jpg",
        images: ["/images/products/الصقر-الخليجي-مشلح-بني-ذهبي-فاخر-2025.jpg"],
        brandId: "al-saqr-1",
        category: "cloaks",
        subcategory: "luxury",
        tags: ["بني", "ذهبي", "brown", "gold"],
        featured: true,
        stock: 10,
        sku: "AS-C-002",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "cloak-3",
        nameAr: "مشلح بيج ذهبي فاخر",
        nameEn: "Luxury Beige Gold Cloak",
        slug: "luxury-beige-gold-cloak",
        descriptionAr: "مشلح فاخر بيج مع تطريز ذهبي أنيق",
        descriptionEn: "Luxury beige cloak with elegant gold embroidery",
        price: "780.00",
        mainImage: "/images/products/الصقر-الخليجي-مشلح-بيج-ذهبي-فاخر-2025.jpg",
        images: ["/images/products/الصقر-الخليجي-مشلح-بيج-ذهبي-فاخر-2025.jpg"],
        brandId: "al-saqr-1",
        category: "cloaks",
        subcategory: "luxury",
        tags: ["بيج", "ذهبي", "beige", "gold"],
        featured: false,
        stock: 12,
        sku: "AS-C-003",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "cloak-4",
        nameAr: "مشلح كحلي ذهبي فاخر",
        nameEn: "Luxury Navy Gold Cloak",
        slug: "luxury-navy-gold-cloak",
        descriptionAr: "مشلح فاخر كحلي مع تطريز ذهبي",
        descriptionEn: "Luxury navy cloak with gold embroidery",
        price: "780.00",
        mainImage: "/images/products/الصقر-الخليجي-مشلح-كحلي-ذهبي-فاخر-2025.jpg",
        images: ["/images/products/الصقر-الخليجي-مشلح-كحلي-ذهبي-فاخر-2025.jpg"],
        brandId: "al-saqr-1",
        category: "cloaks",
        subcategory: "luxury",
        tags: ["كحلي", "ذهبي", "navy", "gold"],
        featured: false,
        stock: 9,
        sku: "AS-C-004",
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Fur Coats Collection (فراء)
      {
        id: "fur-coat-1",
        nameAr: "فروة رجالي فاخرة - إصدار خاص",
        nameEn: "Luxury Men's Fur Coat - Special Edition",
        slug: "luxury-mens-fur-coat-special",
        descriptionAr: "فروة رجالي فاخرة بجودة عالمية وتصميم استثنائي",
        descriptionEn: "Luxury men's fur coat with international quality and exceptional design",
        luxuryTaglineAr: "دفء وأناقة لا مثيل لها",
        luxuryTaglineEn: "Unmatched warmth and elegance",
        price: "1200.00",
        mainImage: "/images/products/الصقر-الخليجي-فروة-رجالي-فاخرة-2025-1_1757835692310.jpg",
        images: [
          "/images/products/الصقر-الخليجي-فروة-رجالي-فاخرة-2025-1_1757835692310.jpg",
          "/images/products/الصقر-الخليجي-فروة-رجالي-فاخرة-2025-2_1757835692310.jpg",
          "/images/products/الصقر-الخليجي-فروة-رجالي-فاخرة-2025-3_1757835692311.jpg"
        ],
        brandId: "al-saqr-1",
        category: "fur-coats",
        subcategory: "men",
        tags: ["فروة", "فاخر", "رجالي", "fur", "luxury", "men"],
        featured: true,
        isNew: true,
        stock: 5,
        sku: "AS-FC-001",
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Walking Sticks Collection (عصي)
      {
        id: "walking-stick-1",
        nameAr: "عصا معكاز فاخر - رأس جمل",
        nameEn: "Luxury Walking Stick - Camel Head",
        slug: "luxury-walking-stick-camel-head",
        descriptionAr: "عصا معكاز فاخر مع مقبض على شكل رأس جمل",
        descriptionEn: "Luxury walking stick with camel head handle",
        price: "450.00",
        mainImage: "/images/products/walking-sticks/camel-head-handle.jpg",
        images: ["/images/products/walking-sticks/camel-head-handle.jpg"],
        brandId: "al-saqr-1",
        category: "walking-sticks",
        subcategory: "luxury",
        tags: ["عصا", "معكاز", "جمل", "walking-stick", "camel"],
        featured: true,
        stock: 12,
        sku: "AS-WS-001",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "walking-stick-2",
        nameAr: "عصا معكاز نسر ذهبي",
        nameEn: "Eagle Head Gold Walking Stick",
        slug: "eagle-head-gold-walking-stick",
        descriptionAr: "عصا معكاز فاخر برأس نسر وكتابات عربية",
        descriptionEn: "Luxury walking stick with eagle head and Arabic calligraphy",
        price: "520.00",
        mainImage: "/images/products/walking-sticks/eagle-head-arabic-calligraphy.jpg",
        images: ["/images/products/walking-sticks/eagle-head-arabic-calligraphy.jpg"],
        brandId: "al-saqr-1",
        category: "walking-sticks",
        subcategory: "luxury",
        tags: ["نسر", "ذهبي", "خط عربي", "eagle", "gold", "calligraphy"],
        featured: false,
        stock: 8,
        sku: "AS-WS-002",
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Women's Collection (مجموعة نسائية)
      {
        id: "women-coat-1",
        nameAr: "بالطو نسائي فاخر",
        nameEn: "Luxury Women's Coat",
        slug: "luxury-womens-coat",
        descriptionAr: "بالطو نسائي فاخر بتصميم عصري وأنيق",
        descriptionEn: "Luxury women's coat with modern and elegant design",
        price: "680.00",
        mainImage: "/images/products/women-collection/الصقر-الخليجي-بالطو-نسائي-فاخر-2025-1_1757823129510.jpg",
        images: ["/images/products/women-collection/الصقر-الخليجي-بالطو-نسائي-فاخر-2025-1_1757823129510.jpg"],
        brandId: "al-saqr-1",
        category: "women-collection",
        subcategory: "coats",
        tags: ["بالطو", "نسائي", "coat", "women"],
        featured: true,
        stock: 10,
        sku: "AS-WC-001",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "women-fur-1",
        nameAr: "فروة نسائي فاخرة",
        nameEn: "Luxury Women's Fur Coat",
        slug: "luxury-womens-fur-coat",
        descriptionAr: "فروة نسائي فاخرة بتصميم راقي",
        descriptionEn: "Luxury women's fur coat with elegant design",
        price: "950.00",
        mainImage: "/images/products/women-collection/الصقر-الخليجي-فروة-نسائي-فاخر-2025-3_1757823129511.jpg",
        images: [
          "/images/products/women-collection/الصقر-الخليجي-فروة-نسائي-فاخر-2025-3_1757823129511.jpg",
          "/images/products/women-collection/الصقر-الخليجي-فروة-نسائي-فاخر-2025-7_1757823129511.jpg",
          "/images/products/women-collection/الصقر-الخليجي-فروة-نسائي-فاخر-2025-9_1757823129511.jpg"
        ],
        brandId: "al-saqr-1",
        category: "women-collection",
        subcategory: "fur-coats",
        tags: ["فروة", "نسائي", "fur", "women"],
        featured: true,
        stock: 6,
        sku: "AS-WF-001",
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Winter Accessories
      {
        id: "winter-shemagh-1",
        nameAr: "شماغ شتوي إصدار خاص",
        nameEn: "Winter Shemagh Special Edition",
        slug: "winter-shemagh-special-edition",
        descriptionAr: "شماغ شتوي بتصميم خاص لموسم 2026",
        descriptionEn: "Winter shemagh with special design for 2026 season",
        price: "150.00",
        mainImage: "/images/products/الصقر-الخليجي-شماغ-شتوي-2026-special-edition.jpg",
        images: ["/images/products/الصقر-الخليجي-شماغ-شتوي-2026-special-edition.jpg"],
        brandId: "al-saqr-1",
        category: "accessories",
        subcategory: "winter",
        tags: ["شماغ", "شتوي", "shemagh", "winter"],
        featured: false,
        isNew: true,
        stock: 30,
        sku: "AS-ACC-001",
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ];

    // Add more products to reach 53 total
    const additionalProducts: Product[] = [];
    
    // Add variations and more products to each category
    for (let i = 15; i <= 53; i++) {
      const categoryIndex = i % 6;
      const categories = ["prayer-beads", "vests", "cloaks", "fur-coats", "walking-sticks", "women-collection"];
      const category = categories[categoryIndex];
      
      additionalProducts.push({
        id: `product-${i}`,
        nameAr: `منتج الصقر الخليجي ${i}`,
        nameEn: `Al-Saqr Product ${i}`,
        slug: `al-saqr-product-${i}`,
        descriptionAr: `وصف المنتج رقم ${i} من مجموعة الصقر الخليجي الفاخرة`,
        descriptionEn: `Description for Al-Saqr product ${i} from luxury collection`,
        price: `${(Math.random() * 800 + 100).toFixed(2)}`,
        mainImage: `/images/products/placeholder-${i}.jpg`,
        images: [`/images/products/placeholder-${i}.jpg`],
        brandId: "al-saqr-1",
        category,
        subcategory: "standard",
        tags: ["الصقر", "فاخر", "al-saqr", "luxury"],
        featured: Math.random() > 0.8,
        isNew: Math.random() > 0.9,
        stock: Math.floor(Math.random() * 20) + 5,
        sku: `AS-${category.toUpperCase().substring(0,2)}-${i.toString().padStart(3, '0')}`,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    // Store all products
    [...products, ...additionalProducts].forEach(product => {
      this.products.set(product.id, product);
    });

    // Initialize gallery items
    const galleryItems: GalleryItem[] = [
      {
        id: "gallery-1",
        title: "مجموعة الصقر الخليجي الفاخرة",
        imageUrl: "/images/gallery/عدد ذياب - ملبس - فلم - عدد 1 (1).jpg",
        description: "عرض من مجموعة الصقر الخليجي الفاخرة",
        createdAt: new Date(),
      },
      {
        id: "gallery-2", 
        title: "تصاميم تراثية معاصرة",
        imageUrl: "/images/gallery/عدد ذياب - ملبس - فلم - عدد 1 (10).jpg",
        description: "تصاميم تجمع بين التراث والعصرية",
        createdAt: new Date(),
      }
    ];

    galleryItems.forEach(item => {
      this.galleryItems.set(item.id, item);
    });
  }

  // User methods
  async getUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  async getUserById(id: string): Promise<User | null> {
    return this.users.get(id) || null;
  }

  async getUserByUsername(username: string): Promise<User | null> {
    return Array.from(this.users.values()).find(user => user.username === username) || null;
  }

  async createUser(userData: InsertUser): Promise<User> {
    const user: User = {
      id: this.generateId(),
      ...userData,
    };
    this.users.set(user.id, user);
    return user;
  }

  // Brand methods
  async getBrands(): Promise<Brand[]> {
    return Array.from(this.brands.values());
  }

  async getBrandById(id: string): Promise<Brand | null> {
    return this.brands.get(id) || null;
  }

  async getBrandBySlug(slug: string): Promise<Brand | null> {
    return Array.from(this.brands.values()).find(brand => brand.slug === slug) || null;
  }

  async createBrand(brandData: InsertBrand): Promise<Brand> {
    const brand: Brand = {
      id: this.generateId(),
      ...brandData,
      createdAt: new Date(),
    };
    this.brands.set(brand.id, brand);
    return brand;
  }

  // Product methods
  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProductById(id: string): Promise<Product | null> {
    return this.products.get(id) || null;
  }

  async getProductBySlug(slug: string): Promise<Product | null> {
    return Array.from(this.products.values()).find(product => product.slug === slug) || null;
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(product => product.category === category);
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(product => product.featured);
  }

  async createProduct(productData: InsertProduct): Promise<Product> {
    const product: Product = {
      id: this.generateId(),
      ...productData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.products.set(product.id, product);
    return product;
  }

  // Gallery methods
  async getGalleryItems(): Promise<GalleryItem[]> {
    return Array.from(this.galleryItems.values());
  }

  async getGalleryItemById(id: string): Promise<GalleryItem | null> {
    return this.galleryItems.get(id) || null;
  }

  async createGalleryItem(itemData: InsertGalleryItem): Promise<GalleryItem> {
    const item: GalleryItem = {
      id: this.generateId(),
      ...itemData,
      createdAt: new Date(),
    };
    this.galleryItems.set(item.id, item);
    return item;
  }

  // Contact methods
  async getContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values());
  }

  async getContactMessageById(id: string): Promise<ContactMessage | null> {
    return this.contactMessages.get(id) || null;
  }

  async createContactMessage(messageData: InsertContactMessage): Promise<ContactMessage> {
    const message: ContactMessage = {
      id: this.generateId(),
      ...messageData,
      createdAt: new Date(),
    };
    this.contactMessages.set(message.id, message);
    return message;
  }
}

// Export singleton instance
export const storage = new MemStorage();