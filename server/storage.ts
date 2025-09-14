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
    // Unified Brand - الصقر الخليجي للتجارة
    const brands = [
      { 
        nameAr: "الصقر الخليجي للتجارة", 
        nameEn: "Gulf Falcon Trading", 
        slug: "gulf-falcon-trading", 
        descriptionAr: "رمز الفخامة والتميز في عالم الأزياء التراثية والمعاصرة", 
        descriptionEn: "Symbol of luxury and distinction in traditional and contemporary fashion", 
        logoUrl: "/images/brands/gulf-falcon-logo.png" 
      },
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
      // السديريات - Vests
      {
        nameAr: "سديرية تفصيل خاص - إصدار خاص",
        nameEn: "Custom Tailored Vest - Special Edition",
        slug: "custom-vest-special-edition",
        descriptionAr: "سديرية فاخرة بتصميم خاص، قماش عالي الجودة مع فرو طبيعي على الياقة والجيوب، سحاب ذهبي فاخر",
        descriptionEn: "Luxurious vest with special design, high-quality fabric with natural fur collar and pockets, premium golden zipper",
        luxuryTaglineAr: "تحفة فنية من الأناقة الملكية تخطف الأنفاس",
        luxuryTaglineEn: "A masterpiece of royal elegance that takes your breath away",
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
        price: null,
        salePrice: null,
        stock: 10,
        featured: true,
        isNew: true,
        isCustomizable: true,
        sku: "VEST-SE-001",
        metaTitle: null,
        metaDescription: null
      },
      {
        nameAr: "سديرية رجالي كلاسيك",
        nameEn: "Men's Classic Vest",
        slug: "mens-classic-vest",
        descriptionAr: "سديرية أنيقة بتصميم كلاسيكي، قماش قطني فاخر، مناسبة للمناسبات الرسمية والعملية",
        descriptionEn: "Elegant vest with classic design, luxurious cotton fabric, suitable for formal and business occasions",
        luxuryTaglineAr: "كلاسيكية خالدة تنضح بالأناقة الراقية والفخامة المطلقة",
        luxuryTaglineEn: "Timeless classic exuding sophisticated elegance and absolute luxury",
        mainImage: "/images/products/الصقر-الخليجي-سديرية-رجالي-2025-1_1757781334517.jpg",
        images: [
          "/images/products/الصقر-الخليجي-سديرية-رجالي-2025-2_1757781334518.jpg",
          "/images/products/الصقر-الخليجي-سديرية-رجالي-2025-3_1757781334518.jpg"
        ],
        category: "vests",
        subcategory: "classic",
        brandId: brandIds[0],
        tags: ["سديرية", "كلاسيك", "رسمي"],
        sizes: ["48", "50", "52", "54", "56"],
        colors: [
          { nameAr: "رمادي", nameEn: "Gray", hex: "#616161" },
          { nameAr: "أسود", nameEn: "Black", hex: "#000000" }
        ],
        materialAr: "قطن مصري",
        materialEn: "Egyptian cotton",
        price: null,
        salePrice: null,
        stock: 15,
        featured: false,
        isNew: false,
        isCustomizable: true,
        sku: "VEST-CL-002",
        metaTitle: null,
        metaDescription: null
      },
      {
        nameAr: "سديرية عصرية رياضية",
        nameEn: "Modern Sport Vest",
        slug: "modern-sport-vest",
        descriptionAr: "سديرية عصرية بتصميم رياضي، خامة مبطنة للدفء، مثالية للأنشطة الخارجية",
        descriptionEn: "Modern vest with sporty design, quilted material for warmth, perfect for outdoor activities",
        luxuryTaglineAr: "ثورة في عالم الأناقة الرياضية تجمع بين القوة والجمال والراحة المطلقة",
        luxuryTaglineEn: "A revolution in sporty elegance combining power, beauty and absolute comfort",
        mainImage: "/images/products/الصقر-الخليجي-سديرية-رجالي-2025-7_1757781334521.jpg",
        images: [
          "/images/products/الصقر-الخليجي-سديرية-رجالي-2025-6_1757781334520.jpg",
          "/images/products/الصقر-الخليجي-سديرية-رجالي-2025-5_1757781334520.jpg"
        ],
        category: "vests",
        subcategory: "sport",
        brandId: brandIds[0],
        tags: ["سديرية", "رياضي", "عصري"],
        sizes: ["M", "L", "XL", "XXL", "XXXL"],
        colors: [
          { nameAr: "رمادي داكن", nameEn: "Dark Gray", hex: "#424242" },
          { nameAr: "أخضر زيتي", nameEn: "Olive Green", hex: "#689f38" }
        ],
        materialAr: "بوليستر مبطن",
        materialEn: "Quilted polyester",
        price: null,
        salePrice: null,
        stock: 20,
        featured: true,
        isNew: true,
        isCustomizable: false,
        sku: "VEST-SP-003",
        metaTitle: null,
        metaDescription: null
      },
      {
        nameAr: "سديرية شتوية دافئة",
        nameEn: "Winter Warm Vest",
        slug: "winter-warm-vest",
        descriptionAr: "سديرية شتوية مبطنة بالفرو الصناعي، توفر الدفء والأناقة في الأجواء الباردة",
        descriptionEn: "Winter vest lined with synthetic fur, provides warmth and elegance in cold weather",
        luxuryTaglineAr: "دفء ملكي يحتضن الجسد بلمسة من السحر والأناقة الشتوية الفاخرة",
        luxuryTaglineEn: "Royal warmth embracing the body with a touch of magic and luxurious winter elegance",
        mainImage: "/images/products/الصقر-الخليجي-سديرية-رجالي-2025-8_1757781334521.jpg",
        images: [
          "/images/products/الصقر-الخليجي-سديرية-رجالي-2025-9_1757781334515.jpg"
        ],
        category: "vests",
        subcategory: "winter",
        brandId: brandIds[0],
        tags: ["سديرية", "شتوي", "دافئ"],
        sizes: ["48", "50", "52", "54", "56", "58"],
        colors: [
          { nameAr: "أسود", nameEn: "Black", hex: "#000000" },
          { nameAr: "بني", nameEn: "Brown", hex: "#795548" }
        ],
        materialAr: "صوف مع بطانة فرو",
        materialEn: "Wool with fur lining",
        price: null,
        salePrice: null,
        stock: 12,
        featured: false,
        isNew: false,
        isCustomizable: true,
        sku: "VEST-WI-004",
        metaTitle: null,
        metaDescription: null
      },
      {
        nameAr: "سديرية تفصيل يومي",
        nameEn: "Daily Custom Vest",
        slug: "daily-custom-vest",
        descriptionAr: "سديرية عملية للاستخدام اليومي، تصميم أنيق وعملي مع جيوب متعددة",
        descriptionEn: "Practical vest for daily use, elegant and functional design with multiple pockets",
        luxuryTaglineAr: "أناقة يومية استثنائية تحول اللحظات العادية إلى ذكريات من الجمال والتميز",
        luxuryTaglineEn: "Exceptional daily elegance transforming ordinary moments into memories of beauty and distinction",
        mainImage: "/images/products/الصقر-الخليجي-سديرية-رجالي-2025-4_1757781334519.jpg",
        images: [],
        category: "vests",
        subcategory: "casual",
        brandId: brandIds[0],
        tags: ["سديرية", "يومي", "عملي"],
        sizes: ["48", "50", "52", "54", "56"],
        colors: [
          { nameAr: "بيج", nameEn: "Beige", hex: "#d4b896" },
          { nameAr: "رمادي فاتح", nameEn: "Light Gray", hex: "#bdbdbd" }
        ],
        materialAr: "قطن مخلوط",
        materialEn: "Cotton blend",
        price: null,
        salePrice: null,
        stock: 25,
        featured: false,
        isNew: false,
        isCustomizable: true,
        sku: "VEST-CA-005",
        metaTitle: null,
        metaDescription: null
      },
      // Prayer Beads Products
      {
        nameAr: "مسبحة السمك الذهبي الفاخرة",
        nameEn: "Luxury Golden Fish Prayer Beads",
        slug: "luxury-golden-fish-prayer-beads",
        descriptionAr: "مسبحة فاخرة بتصميم السمك الذهبي، مصنوعة من أجود المواد الطبيعية مع تفاصيل ذهبية راقية",
        descriptionEn: "Luxury prayer beads with golden fish design, made from finest natural materials with elegant golden details",
        luxuryTaglineAr: "جوهرة روحانية ذهبية تحمل بين خرزاتها أسرار السكينة والجمال الأبدي الفاخر",
        luxuryTaglineEn: "A golden spiritual jewel carrying secrets of serenity and eternal luxurious beauty within its beads",
        mainImage: "/images/products/prayer-beads/amber-fish-style.jpg",
        images: [
          "/images/products/prayer-beads/black-gold-fish-style.jpg"
        ],
        category: "prayer-beads",
        subcategory: "luxury",
        brandId: brandIds[0],
        tags: ["مسبحة", "ذهبي", "فاخر", "تحفة فنية"],
        sizes: [],
        colors: [
          { nameAr: "ذهبي عنبري", nameEn: "Amber Gold", hex: "#D4A574" },
          { nameAr: "أسود ذهبي", nameEn: "Black Gold", hex: "#1a1a1a" }
        ],
        materialAr: "خشب طبيعي مع طلاء ذهبي",
        materialEn: "Natural wood with golden coating",
        price: null,
        salePrice: null,
        stock: 8,
        featured: true,
        isNew: true,
        isCustomizable: false,
        sku: "PB-LUX-001",
        metaTitle: null,
        metaDescription: null
      },
      {
        nameAr: "مسبحة العقيق الأحمر التراثية",
        nameEn: "Traditional Red Agate Prayer Beads",
        slug: "traditional-red-agate-prayer-beads",
        descriptionAr: "مسبحة تراثية من العقيق الأحمر الطبيعي مع زخارف دائرية أصيلة وذيل حريري فاخر",
        descriptionEn: "Traditional prayer beads made from natural red agate with authentic circular patterns and luxurious silk tassel",
        luxuryTaglineAr: "كنز تراثي من العقيق الأحمر يحمل عبق التاريخ ونقاء الروح في كل خرزة مقدسة",
        luxuryTaglineEn: "A heritage treasure of red agate carrying the essence of history and purity of soul in every sacred bead",
        mainImage: "/images/products/prayer-beads/red-wood-circular.jpg",
        images: [
          "/images/products/prayer-beads/red-brown-traditional.jpg"
        ],
        category: "prayer-beads",
        subcategory: "traditional",
        brandId: brandIds[0],
        tags: ["مسبحة", "عقيق", "تراثي", "أحمر"],
        sizes: [],
        colors: [
          { nameAr: "أحمر عقيق", nameEn: "Agate Red", hex: "#8B0000" },
          { nameAr: "بني محمر", nameEn: "Reddish Brown", hex: "#A0522D" }
        ],
        materialAr: "عقيق أحمر طبيعي",
        materialEn: "Natural red agate",
        price: null,
        salePrice: null,
        stock: 12,
        featured: true,
        isNew: false,
        isCustomizable: false,
        sku: "PB-AGT-002",
        metaTitle: null,
        metaDescription: null
      },
      {
        nameAr: "مسبحة الفيروز الفاخرة",
        nameEn: "Luxury Turquoise Prayer Beads",
        slug: "luxury-turquoise-prayer-beads",
        descriptionAr: "مسبحة من حجر الفيروز الطبيعي الفاخر، تتميز بلونها الأزرق المميز مع زخارف فضية راقية",
        descriptionEn: "Prayer beads made from luxury natural turquoise stone, featuring distinctive blue color with elegant silver decorations",
        luxuryTaglineAr: "سحر الفيروز الأزرق الساحر يجسد هدوء البحر العميق وصفاء السماء في مسبحة فاخرة",
        luxuryTaglineEn: "The charm of enchanting blue turquoise embodying deep sea tranquility and sky purity in luxury beads",
        mainImage: "/images/products/prayer-beads/turquoise-cylindrical.jpg",
        images: [],
        category: "prayer-beads",
        subcategory: "luxury",
        brandId: brandIds[0],
        tags: ["مسبحة", "فيروز", "طبيعي", "أزرق"],
        sizes: [],
        colors: [
          { nameAr: "فيروزي", nameEn: "Turquoise", hex: "#40E0D0" }
        ],
        materialAr: "فيروز طبيعي",
        materialEn: "Natural turquoise",
        price: null,
        salePrice: null,
        stock: 6,
        featured: false,
        isNew: false,
        isCustomizable: false,
        sku: "PB-TUR-003",
        metaTitle: null,
        metaDescription: null
      },
      {
        nameAr: "مسبحة اللازورد الملكية",
        nameEn: "Royal Lapis Lazuli Prayer Beads",
        slug: "royal-lapis-lazuli-prayer-beads",
        descriptionAr: "مسبحة ملكية من حجر اللازورد الأزرق الطبيعي مع تفاصيل معدنية فضية وزخارف تقليدية",
        descriptionEn: "Royal prayer beads made from natural blue lapis lazuli stone with silver metallic details and traditional decorations",
        luxuryTaglineAr: "تحفة ملكية من اللازورد النادر تشع بنور القدسية وعظمة الحضارات العريقة الخالدة",
        luxuryTaglineEn: "A royal masterpiece of rare lapis lazuli radiating with sacred light and greatness of eternal ancient civilizations",
        mainImage: "/images/products/prayer-beads/blue-round-beads.jpg",
        images: [],
        category: "prayer-beads",
        subcategory: "royal",
        brandId: brandIds[0],
        tags: ["مسبحة", "لازورد", "ملكي", "نادر"],
        sizes: [],
        colors: [
          { nameAr: "أزرق لازورد", nameEn: "Lapis Blue", hex: "#26619C" }
        ],
        materialAr: "لازورد طبيعي",
        materialEn: "Natural lapis lazuli",
        price: null,
        salePrice: null,
        stock: 4,
        featured: true,
        isNew: false,
        isCustomizable: false,
        sku: "PB-LAP-004",
        metaTitle: null,
        metaDescription: null
      },
      {
        nameAr: "مسبحة الأوبال الأسود الفاخرة",
        nameEn: "Luxury Black Opal Prayer Beads",
        slug: "luxury-black-opal-prayer-beads",
        descriptionAr: "مسبحة فاخرة من الأوبال الأسود النادر مع زخارف ذهبية معقدة وذيل حريري أسود",
        descriptionEn: "Luxury prayer beads made from rare black opal with intricate golden decorations and black silk tassel",
        luxuryTaglineAr: "سر الليل الساحر في أوبال أسود نادر يحمل أسرار الكون وجمال اللانهاية المطلق",
        luxuryTaglineEn: "The secret of enchanting night in rare black opal carrying universal mysteries and absolute infinite beauty",
        mainImage: "/images/products/prayer-beads/black-gold-beads.jpg",
        images: [
          "/images/products/prayer-beads/black-gold-fish-style.jpg"
        ],
        category: "prayer-beads",
        subcategory: "luxury",
        brandId: brandIds[0],
        tags: ["مسبحة", "أوبال", "أسود", "نادر", "فاخر"],
        sizes: [],
        colors: [
          { nameAr: "أسود أوبال", nameEn: "Opal Black", hex: "#0C0C0C" }
        ],
        materialAr: "أوبال أسود طبيعي",
        materialEn: "Natural black opal",
        price: null,
        salePrice: null,
        stock: 3,
        featured: true,
        isNew: true,
        isCustomizable: false,
        sku: "PB-OPL-005",
        metaTitle: null,
        metaDescription: null
      },
      {
        nameAr: "مجموعة مسابح ملونة تقليدية",
        nameEn: "Traditional Colorful Prayer Beads Collection",
        slug: "traditional-colorful-prayer-beads-collection",
        descriptionAr: "مجموعة رائعة من المسابح التقليدية بألوان متنوعة، تشمل الأسود والأصفر والأحمر والأزرق مع ذيول حريرية",
        descriptionEn: "Beautiful collection of traditional prayer beads in various colors, including black, yellow, red, and blue with silk tassels",
        luxuryTaglineAr: "قوس قزح من الجمال الروحاني يجمع ألوان الطبيعة في سيمفونية مقدسة من الأناقة التراثية",
        luxuryTaglineEn: "A rainbow of spiritual beauty gathering nature's colors in a sacred symphony of heritage elegance",
        mainImage: "/images/products/prayer-beads/mixed-colors-collection.jpg",
        images: [],
        category: "prayer-beads",
        subcategory: "traditional",
        brandId: brandIds[0],
        tags: ["مسبحة", "مجموعة", "ملون", "تقليدي"],
        sizes: [],
        colors: [
          { nameAr: "أسود", nameEn: "Black", hex: "#000000" },
          { nameAr: "أصفر", nameEn: "Yellow", hex: "#FFD700" },
          { nameAr: "أحمر", nameEn: "Red", hex: "#DC143C" },
          { nameAr: "أزرق", nameEn: "Blue", hex: "#4169E1" }
        ],
        materialAr: "خشب وأحجار طبيعية متنوعة",
        materialEn: "Wood and various natural stones",
        price: null,
        salePrice: null,
        stock: 20,
        featured: false,
        isNew: false,
        isCustomizable: true,
        sku: "PB-COL-006",
        metaTitle: null,
        metaDescription: null
      },
      // Walking Sticks Products
      {
        nameAr: "عصا فضية معدنية فاخرة",
        nameEn: "Luxury Silver Metallic Walking Stick",
        slug: "luxury-silver-metallic-walking-stick",
        descriptionAr: "عصا فاخرة بمقبض معدني فضي ونقوش هندسية راقية، مصنوعة من خشب الورد الأسود مع تفاصيل معدنية دقيقة",
        descriptionEn: "Luxury walking stick with silver metallic handle and elegant geometric patterns, made from black rosewood with intricate metallic details",
        luxuryTaglineAr: "رمز المكانة والهيبة في تحفة فضية لامعة تعكس عظمة الرجال وأناقتهم الساحرة المطلقة",
        luxuryTaglineEn: "Symbol of status and prestige in a gleaming silver masterpiece reflecting men's greatness and absolute enchanting elegance",
        mainImage: "/images/products/walking-sticks/silver-metallic-handle.jpg",
        images: [],
        category: "walking-sticks",
        subcategory: "luxury",
        brandId: brandIds[0],
        tags: ["عصا", "فضي", "معدني", "فاخر"],
        sizes: ["90cm", "95cm", "100cm"],
        colors: [
          { nameAr: "أسود فضي", nameEn: "Black Silver", hex: "#2C2C2C" }
        ],
        materialAr: "خشب الورد الأسود مع معدن فضي",
        materialEn: "Black rosewood with silver metal",
        price: null,
        salePrice: null,
        stock: 8,
        featured: true,
        isNew: true,
        isCustomizable: false,
        sku: "WS-LUX-001",
        metaTitle: null,
        metaDescription: null
      },
      {
        nameAr: "عصا تراثية مع شريط ذهبي",
        nameEn: "Traditional Walking Stick with Golden Band",
        slug: "traditional-walking-stick-golden-band",
        descriptionAr: "عصا تراثية أنيقة بمقبض منحوت يدوياً وشريط ذهبي راقي، مصنوعة من خشب طبيعي فاخر مع نقوش تقليدية",
        descriptionEn: "Elegant traditional walking stick with hand-carved handle and refined golden band, made from luxury natural wood with traditional engravings",
        luxuryTaglineAr: "عبق التراث العريق يعيش في تحفة ذهبية فاخرة تحمل روح الأجداد وعظمة الماضي الأصيل",
        luxuryTaglineEn: "The essence of ancient heritage lives in a luxurious golden masterpiece carrying the spirit of ancestors and authentic past greatness",
        mainImage: "/images/products/walking-sticks/carved-handle-golden-band.jpg",
        images: [],
        category: "walking-sticks",
        subcategory: "traditional",
        brandId: brandIds[0],
        tags: ["عصا", "تراثي", "ذهبي", "منحوت"],
        sizes: ["90cm", "95cm", "100cm"],
        colors: [
          { nameAr: "بني محمر", nameEn: "Reddish Brown", hex: "#8B4513" }
        ],
        materialAr: "خشب طبيعي مع معدن ذهبي",
        materialEn: "Natural wood with golden metal",
        price: null,
        salePrice: null,
        stock: 5,
        featured: true,
        isNew: false,
        isCustomizable: true,
        sku: "WS-TRA-002",
        metaTitle: null,
        metaDescription: null
      },
      {
        nameAr: "مجموعة العصي الملكية - رؤوس حيوانات",
        nameEn: "Royal Walking Sticks Collection - Animal Heads",
        slug: "royal-walking-sticks-animal-heads",
        descriptionAr: "مجموعة حصرية من العصي الملكية بتصاميم رؤوس حيوانات متنوعة (ذئب، كوبرا، أسد) مع أحجار كريمة زرقاء ومقابض ذهبية",
        descriptionEn: "Exclusive collection of royal walking sticks with various animal head designs (wolf, cobra, lion) featuring blue gemstones and golden handles",
        luxuryTaglineAr: "إمبراطورية من العظمة والهيبة تجمع قوة الوحوش النبيلة في عصي ملكية نادرة لا تقدر بثمن",
        luxuryTaglineEn: "An empire of grandeur and majesty gathering the power of noble beasts in rare royal sticks of priceless value",
        mainImage: "/images/products/walking-sticks/luxury-collection-animal-heads.jpg",
        images: [],
        category: "walking-sticks",
        subcategory: "royal",
        brandId: brandIds[0],
        tags: ["عصا", "ملكي", "حيوانات", "أحجار كريمة"],
        sizes: ["95cm", "100cm"],
        colors: [
          { nameAr: "أسود ذهبي", nameEn: "Black Gold", hex: "#1a1a1a" },
          { nameAr: "بني فاتح", nameEn: "Light Brown", hex: "#D2691E" }
        ],
        materialAr: "خشب الأبنوس مع معدن ذهبي وأحجار كريمة",
        materialEn: "Ebony wood with golden metal and gemstones",
        price: null,
        salePrice: null,
        stock: 3,
        featured: true,
        isNew: true,
        isCustomizable: false,
        sku: "WS-ROY-003",
        metaTitle: null,
        metaDescription: null
      },
      {
        nameAr: "عصا بنقوش الفيروز الفاخرة",
        nameEn: "Luxury Turquoise Pattern Walking Stick",
        slug: "luxury-turquoise-pattern-walking-stick",
        descriptionAr: "عصا فنية فاخرة بنقوش الفيروز والأزرق المميزة، تصاميم هندسية معقدة مع مقابض سوداء لامعة وتفاصيل معدنية ذهبية",
        descriptionEn: "Luxury artistic walking stick with distinctive turquoise and blue patterns, intricate geometric designs with glossy black handles and golden metallic details",
        luxuryTaglineAr: "لوحة فنية فاخرة تنبض بألوان الفيروز الساحرة وتروي حكاية الجمال الأزلي في عصا ارستقراطية مبهرة",
        luxuryTaglineEn: "A luxurious artistic canvas pulsating with enchanting turquoise colors telling the story of eternal beauty in a dazzling aristocratic stick",
        mainImage: "/images/products/walking-sticks/turquoise-pattern-collection.jpg",
        images: [],
        category: "walking-sticks",
        subcategory: "artistic",
        brandId: brandIds[0],
        tags: ["عصا", "فيروز", "فني", "نقوش"],
        sizes: ["90cm", "95cm", "100cm"],
        colors: [
          { nameAr: "فيروزي أسود", nameEn: "Turquoise Black", hex: "#008B8B" },
          { nameAr: "أزرق ملكي", nameEn: "Royal Blue", hex: "#4169E1" }
        ],
        materialAr: "خشب مطعم بالفيروز الطبيعي",
        materialEn: "Wood inlaid with natural turquoise",
        price: null,
        salePrice: null,
        stock: 6,
        featured: false,
        isNew: true,
        isCustomizable: true,
        sku: "WS-ART-004",
        metaTitle: null,
        metaDescription: null
      },
      {
        nameAr: "عصا رأس الجمل التراثية",
        nameEn: "Traditional Camel Head Walking Stick",
        slug: "traditional-camel-head-walking-stick",
        descriptionAr: "عصا تراثية مميزة برأس جمل منحوت بدقة، رمز للتراث العربي الأصيل مع شريط معدني فضي وخشب عالي الجودة",
        descriptionEn: "Distinguished traditional walking stick with intricately carved camel head, symbol of authentic Arabian heritage with silver metallic band and high-quality wood",
        luxuryTaglineAr: "رمز الصحراء العريقة وعظمة الأجداد يحيا في تحفة تراثية تحمل عبق التاريخ وفخر الهوية العربية",
        luxuryTaglineEn: "Symbol of the ancient desert and ancestors' greatness lives in a heritage masterpiece carrying history's essence and Arab identity pride",
        mainImage: "/images/products/walking-sticks/camel-head-handle.jpg",
        images: [],
        category: "walking-sticks",
        subcategory: "heritage",
        brandId: brandIds[0],
        tags: ["عصا", "جمل", "تراثي", "عربي"],
        sizes: ["95cm", "100cm"],
        colors: [
          { nameAr: "بيج طبيعي", nameEn: "Natural Beige", hex: "#F5F5DC" }
        ],
        materialAr: "خشب منحوت يدوياً مع معدن فضي",
        materialEn: "Hand-carved wood with silver metal",
        price: null,
        salePrice: null,
        stock: 4,
        featured: true,
        isNew: false,
        isCustomizable: false,
        sku: "WS-HER-005",
        metaTitle: null,
        metaDescription: null
      },
      {
        nameAr: "عصا الصقر مع الخط العربي",
        nameEn: "Eagle Walking Stick with Arabic Calligraphy",
        slug: "eagle-walking-stick-arabic-calligraphy",
        descriptionAr: "عصا فنية راقية برأس صقر منحوت وخط عربي أصيل، تحفة فنية تجمع بين الحرفية التقليدية والفن الإسلامي",
        descriptionEn: "Refined artistic walking stick with carved eagle head and authentic Arabic calligraphy, an artistic masterpiece combining traditional craftsmanship and Islamic art",
        luxuryTaglineAr: "معجزة فنية تحتضن قوة الصقر وجمال الخط العربي في عصا فاخرة تروي حكاية الحضارة والفن",
        luxuryTaglineEn: "An artistic miracle embracing the eagle's power and Arabic calligraphy beauty in a luxury stick telling civilization and art's story",
        mainImage: "/images/products/walking-sticks/eagle-head-arabic-calligraphy.jpg",
        images: [],
        category: "walking-sticks",
        subcategory: "calligraphy",
        brandId: brandIds[0],
        tags: ["عصا", "صقر", "خط عربي", "فني"],
        sizes: ["95cm", "100cm"],
        colors: [
          { nameAr: "بني ذهبي", nameEn: "Golden Brown", hex: "#CD853F" }
        ],
        materialAr: "خشب منحوت مع تطريز ذهبي",
        materialEn: "Carved wood with golden embroidery",
        price: null,
        salePrice: null,
        stock: 2,
        featured: true,
        isNew: true,
        isCustomizable: false,
        sku: "WS-CAL-006",
        metaTitle: null,
        metaDescription: null
      },
      {
        nameAr: "طقم العصي الفاخر - هدية ملكية",
        nameEn: "Luxury Walking Sticks Set - Royal Gift",
        slug: "luxury-walking-sticks-set-royal-gift",
        descriptionAr: "طقم فاخر من العصي في علبة هدايا راقية، مجموعة متكاملة من 4 عصي بتصاميم متنوعة مناسبة للإهداء الملكي",
        descriptionEn: "Luxury walking sticks set in elegant gift box, complete collection of 4 sticks with various designs suitable for royal gifting",
        luxuryTaglineAr: "مملكة من العظمة والفخامة في طقم ملكي استثنائي يليق بعظماء الأرض وأصحاب المقامات العالية",
        luxuryTaglineEn: "A kingdom of grandeur and luxury in an exceptional royal set worthy of earth's greatness and high-ranking dignitaries",
        mainImage: "/images/products/walking-sticks/premium-gift-set-collection.jpg",
        images: [],
        category: "walking-sticks",
        subcategory: "gift-set",
        brandId: brandIds[0],
        tags: ["عصا", "طقم", "هدية", "ملكي", "مجموعة"],
        sizes: ["95cm"],
        colors: [
          { nameAr: "متنوع", nameEn: "Assorted", hex: "#8B4513" },
          { nameAr: "بني وأسود", nameEn: "Brown & Black", hex: "#654321" }
        ],
        materialAr: "خشب فاخر متنوع مع معادن نبيلة",
        materialEn: "Assorted luxury wood with noble metals",
        price: null,
        salePrice: null,
        stock: 2,
        featured: true,
        isNew: false,
        isCustomizable: false,
        sku: "WS-SET-007",
        metaTitle: null,
        metaDescription: null
      },
      // المجموعة النسائية الفاخرة - شتاء 2026 / Luxury Women's Collection - Winter 2026
      {
        nameAr: "بالطو نسائي فاخر - إصدار شتوي 2026",
        nameEn: "Luxury Women's Coat - Winter 2026 Edition",
        slug: "luxury-womens-coat-winter-2026",
        descriptionAr: "بالطو نسائي فاخر مصمم خصيصاً لشتاء 2026، نقوش تراثية أصيلة بألوان دافئة، قماش صوفي عالي الجودة مع بطانة حريرية فاخرة",
        descriptionEn: "Luxury women's coat designed exclusively for winter 2026, authentic heritage patterns in warm colors, high-quality wool fabric with luxurious silk lining",
        luxuryTaglineAr: "إمبراطورة الأنوثة الفاخرة تتجلى في بالطو ملكي يعانق أحلام النساء ويحتضن جمالهن الأبدي بدفء ملكي",
        luxuryTaglineEn: "An empire of luxurious femininity manifested in a royal coat embracing women's dreams and enveloping their eternal beauty with royal warmth",
        mainImage: "/images/products/women-collection/الصقر-الخليجي-بالطو-نسائي-فاخر-2025-1_1757823129510.jpg",
        images: [],
        category: "women-collection",
        subcategory: "coats",
        brandId: brandIds[0],
        tags: ["نسائي", "بالطو", "شتوي", "فاخر", "تراثي", "2026"],
        sizes: ["36", "38", "40", "42", "44", "46"],
        colors: [
          { nameAr: "أحمر تراثي", nameEn: "Heritage Red", hex: "#B22222" },
          { nameAr: "أسود ذهبي", nameEn: "Black Gold", hex: "#1a1a1a" }
        ],
        materialAr: "صوف طبيعي مع بطانة حريرية",
        materialEn: "Natural wool with silk lining",
        price: null,
        salePrice: null,
        stock: 8,
        featured: true,
        isNew: true,
        isCustomizable: true,
        sku: "WW-COAT-001",
        metaTitle: null,
        metaDescription: null
      },
      {
        nameAr: "فروة نسائية تراثية - برتقالي وبني",
        nameEn: "Heritage Women's Fur Coat - Orange & Brown",
        slug: "heritage-womens-fur-coat-orange-brown",
        descriptionAr: "فروة نسائية فاخرة بنقوش تراثية باللون البرتقالي والبني، مصنوعة من أجود أنواع الفراء الصناعي الفاخر مع تفاصيل ذهبية",
        descriptionEn: "Luxury women's fur coat with heritage patterns in orange and brown, made from finest luxury synthetic fur with golden details",
        luxuryTaglineAr: "تحفة تراثية نسائية تنضح بدفء الأصالة وجمال الألوان الخريفية في عباءة فاخرة تحتضن الأنوثة بحنان ملكي استثنائي",
        luxuryTaglineEn: "A heritage feminine masterpiece radiating with authenticity's warmth and autumn colors' beauty in a luxurious robe embracing femininity with exceptional royal tenderness",
        mainImage: "/images/products/women-collection/الصقر-الخليجي-فروة-نسائي-فاخر-2025-3_1757823129511.jpg",
        images: [],
        category: "women-collection",
        subcategory: "fur-coats",
        brandId: brandIds[0],
        tags: ["نسائي", "فروة", "تراثي", "فاخر", "برتقالي", "بني"],
        sizes: ["36", "38", "40", "42", "44"],
        colors: [
          { nameAr: "برتقالي تراثي", nameEn: "Heritage Orange", hex: "#FF8C00" },
          { nameAr: "بني ذهبي", nameEn: "Golden Brown", hex: "#B8860B" }
        ],
        materialAr: "فراء صناعي فاخر مع تطريز ذهبي",
        materialEn: "Luxury synthetic fur with golden embroidery",
        price: null,
        salePrice: null,
        stock: 6,
        featured: true,
        isNew: true,
        isCustomizable: false,
        sku: "WW-FUR-002",
        metaTitle: null,
        metaDescription: null
      },
      {
        nameAr: "فروة نسائية كلاسيكية - أحمر وأسود",
        nameEn: "Classic Women's Fur Coat - Red & Black",
        slug: "classic-womens-fur-coat-red-black",
        descriptionAr: "فروة نسائية كلاسيكية بنقوش هندسية باللون الأحمر والأسود، تصميم أنيق مع قبعة وجيوب عملية مبطنة بالحرير",
        descriptionEn: "Classic women's fur coat with geometric patterns in red and black, elegant design with hood and practical silk-lined pockets",
        luxuryTaglineAr: "كلاسيكية خالدة تتوهج بجمال الأحمر الملكي وسحر الأسود العميق في تحفة تحتضن الأنوثة بحنان إمبراطوري فاتن",
        luxuryTaglineEn: "Timeless classic glowing with royal red beauty and deep black charm in a masterpiece embracing femininity with captivating imperial tenderness",
        mainImage: "/images/products/women-collection/الصقر-الخليجي-فروة-نسائي-فاخر-2025-7_1757823129511.jpg",
        images: [],
        category: "women-collection",
        subcategory: "fur-coats",
        brandId: brandIds[0],
        tags: ["نسائي", "فروة", "كلاسيكي", "أحمر", "أسود", "قبعة"],
        sizes: ["36", "38", "40", "42", "44", "46"],
        colors: [
          { nameAr: "أحمر ملكي", nameEn: "Royal Red", hex: "#DC143C" },
          { nameAr: "أسود لامع", nameEn: "Glossy Black", hex: "#000000" }
        ],
        materialAr: "فراء مخملي فاخر مع بطانة حريرية",
        materialEn: "Luxury velvet fur with silk lining",
        price: null,
        salePrice: null,
        stock: 5,
        featured: true,
        isNew: true,
        isCustomizable: true,
        sku: "WW-FUR-003",
        metaTitle: null,
        metaDescription: null
      },
      {
        nameAr: "فروة نسائية راقية - رمادي وأبيض",
        nameEn: "Elegant Women's Fur Coat - Gray & White",
        slug: "elegant-womens-fur-coat-gray-white",
        descriptionAr: "فروة نسائية راقية بنقوش هندسية معاصرة باللون الرمادي والأبيض، قصة عصرية أنيقة مع تفاصيل فاخرة",
        descriptionEn: "Elegant women's fur coat with contemporary geometric patterns in gray and white, modern elegant cut with luxury details",
        luxuryTaglineAr: "سيمفونية من الأناقة المعاصرة تتراقص فيها ألوان الفضة والثلج في عباءة فاخرة تحتضن جمال الأنوثة الراقية بنعومة ملائكية",
        luxuryTaglineEn: "A symphony of contemporary elegance dancing with silver and snow colors in a luxurious robe embracing refined femininity's beauty with angelic softness",
        mainImage: "/images/products/women-collection/الصقر-الخليجي-فروة-نسائي-فاخر-2025-9_1757823129511.jpg",
        images: [],
        category: "women-collection",
        subcategory: "fur-coats",
        brandId: brandIds[0],
        tags: ["نسائي", "فروة", "راقي", "رمادي", "أبيض", "معاصر"],
        sizes: ["36", "38", "40", "42", "44"],
        colors: [
          { nameAr: "رمادي لؤلؤي", nameEn: "Pearl Gray", hex: "#C0C0C0" },
          { nameAr: "أبيض عاجي", nameEn: "Ivory White", hex: "#FFFFF0" }
        ],
        materialAr: "فراء فاخر مع تفاصيل معدنية",
        materialEn: "Luxury fur with metallic details",
        price: null,
        salePrice: null,
        stock: 4,
        featured: false,
        isNew: true,
        isCustomizable: true,
        sku: "WW-FUR-004",
        metaTitle: null,
        metaDescription: null
      },
      {
        nameAr: "فروة نسائية استثنائية - متعددة الألوان",
        nameEn: "Exceptional Women's Fur Coat - Multicolor",
        slug: "exceptional-womens-fur-coat-multicolor",
        descriptionAr: "فروة نسائية استثنائية بتدرجات لونية متعددة، تصميم فني راقي يجمع بين الألوان الترابية والوردية في تناغم مبهر",
        descriptionEn: "Exceptional women's fur coat with multiple color gradients, refined artistic design combining earthy and pink tones in stunning harmony",
        luxuryTaglineAr: "معجزة فنية تحتضن ألوان الطبيعة الساحرة في تدرجات أسطورية تحكي قصة الجمال الأبدي والأنوثة الاستثنائية في عباءة ملكية مبهرة",
        luxuryTaglineEn: "An artistic miracle embracing nature's enchanting colors in legendary gradients telling the story of eternal beauty and exceptional femininity in a dazzling royal robe",
        mainImage: "/images/products/women-collection/الصقر-الخليجي-فروة-نسائي-فاخر-2025-33_1757823129512.jpg",
        images: [],
        category: "women-collection",
        subcategory: "fur-coats",
        brandId: brandIds[0],
        tags: ["نسائي", "فروة", "استثنائي", "متعدد الألوان", "فني", "راقي"],
        sizes: ["36", "38", "40", "42", "44", "46"],
        colors: [
          { nameAr: "وردي ترابي", nameEn: "Earthy Pink", hex: "#DDA0DD" },
          { nameAr: "بني مخضر", nameEn: "Greenish Brown", hex: "#8FBC8F" },
          { nameAr: "بيج ذهبي", nameEn: "Golden Beige", hex: "#F5DEB3" }
        ],
        materialAr: "فراء متدرج الألوان مع خيوط ذهبية",
        materialEn: "Gradient fur with golden threads",
        price: null,
        salePrice: null,
        stock: 3,
        featured: true,
        isNew: true,
        isCustomizable: false,
        sku: "WW-FUR-005",
        metaTitle: null,
        metaDescription: null
      },
      {
        nameAr: "فروة نسائية أنيقة - تصميم كاروهات",
        nameEn: "Elegant Women's Fur Coat - Checkered Design",
        slug: "elegant-womens-fur-coat-checkered",
        descriptionAr: "فروة نسائية أنيقة بتصميم كاروهات كلاسيكي، قماش صوفي فاخر باللون الرمادي والأسود مع فراء أسود فاخر",
        descriptionEn: "Elegant women's fur coat with classic checkered design, luxury wool fabric in gray and black with luxurious black fur",
        luxuryTaglineAr: "أناقة كلاسيكية خالدة تتجلى في نقوش كاروهات راقية تحتضن الأنوثة المميزة بجمال أسطوري وفخامة تخطف الأبصار والقلوب معاً",
        luxuryTaglineEn: "Timeless classic elegance manifested in refined checkered patterns embracing distinguished femininity with legendary beauty and luxury that captivates eyes and hearts together",
        mainImage: "/images/products/women-collection/الصقر-الخليجي-فروه-نسائي-فاخر-2025-8_1757823129512.jpg",
        images: [],
        category: "women-collection",
        subcategory: "fur-coats",
        brandId: brandIds[0],
        tags: ["نسائي", "فروة", "كاروهات", "كلاسيكي", "أنيق", "صوف"],
        sizes: ["36", "38", "40", "42", "44"],
        colors: [
          { nameAr: "رمادي كلاسيكي", nameEn: "Classic Gray", hex: "#808080" },
          { nameAr: "أسود فاخر", nameEn: "Luxury Black", hex: "#1C1C1C" }
        ],
        materialAr: "صوف كاروهات مع فراء طبيعي",
        materialEn: "Checkered wool with natural fur",
        price: null,
        salePrice: null,
        stock: 7,
        featured: false,
        isNew: true,
        isCustomizable: true,
        sku: "WW-FUR-006",
        metaTitle: null,
        metaDescription: null
      },
      {
        nameAr: "مشلح نسائي فاخر - أزرق تراثي",
        nameEn: "Luxury Women's Mishlah - Heritage Blue",
        slug: "luxury-womens-mishlah-heritage-blue",
        descriptionAr: "مشلح نسائي فاخر باللون الأزرق التراثي، نقوش هندسية أصيلة مع تطريز يدوي، قصة واسعة مريحة مناسبة للمناسبات الخاصة",
        descriptionEn: "Luxury women's mishlah in heritage blue, authentic geometric patterns with hand embroidery, comfortable wide cut suitable for special occasions",
        luxuryTaglineAr: "تحفة تراثية ملكية تتوهج بزرقة السماء الأصيلة وجمال التطريز اليدوي في مشلح فاخر يحتضن الأنوثة العربية الأصيلة بحنان إمبراطوري خالد",
        luxuryTaglineEn: "A royal heritage masterpiece glowing with authentic sky blue and hand embroidery beauty in a luxurious mishlah embracing authentic Arab femininity with eternal imperial tenderness",
        mainImage: "/images/products/women-collection/الصقر-الخليجي-مشلح-نسائي-فاخر-2025-2_1757823129513.jpg",
        images: [],
        category: "women-collection",
        subcategory: "mishlah",
        brandId: brandIds[0],
        tags: ["نسائي", "مشلح", "أزرق", "تراثي", "تطريز", "مناسبات"],
        sizes: ["36", "38", "40", "42", "44", "46", "48"],
        colors: [
          { nameAr: "أزرق تراثي", nameEn: "Heritage Blue", hex: "#4169E1" },
          { nameAr: "رمادي فضي", nameEn: "Silver Gray", hex: "#A9A9A9" }
        ],
        materialAr: "قماش تراثي مطرز بخيوط ذهبية",
        materialEn: "Heritage fabric embroidered with golden threads",
        price: null,
        salePrice: null,
        stock: 6,
        featured: true,
        isNew: true,
        isCustomizable: true,
        sku: "WW-MISH-007",
        metaTitle: null,
        metaDescription: null
      },

      // الشماغات - Shemagh Collection (إصدار خاص 2026)
      {
        nameAr: "شماغ شتوي 2026 - إصدار خاص محدود",
        nameEn: "Winter Shemagh 2026 - Limited Special Edition", 
        slug: "winter-shemagh-2026-special-edition",
        descriptionAr: "شماغ شتوي فاخر بتصميم حصري لعام 2026، نسيج قطني فائق النعومة مع نقشات تراثية أنيقة باللون الأحمر التقليدي، مصنوع بعناية فائقة وتفاصيل دقيقة تجمع بين الأصالة والعصرية",
        descriptionEn: "Luxurious winter shemagh with exclusive 2026 design, ultra-soft cotton fabric with elegant traditional red patterns, crafted with exceptional care and fine details combining authenticity with modernity",
        luxuryTaglineAr: "تحفة أرستقراطية شتوية تأسر القلوب بأناقتها الملكية الاستثنائية والجمال الأبدي",
        luxuryTaglineEn: "An aristocratic winter masterpiece that captivates hearts with exceptional royal elegance and eternal beauty",
        mainImage: "/images/products/الصقر-الخليجي-شماغ-شتوي-2026-special-edition.jpg",
        images: [],
        category: "shemagh",
        subcategory: "winter",
        brandId: brandIds[0],
        tags: ["شماغ", "شتوي", "إصدار خاص", "2026", "محدود", "تراثي", "أنيق"],
        sizes: ["OneSize"],
        colors: [
          { nameAr: "أحمر تراثي مع أبيض", nameEn: "Heritage Red with White", hex: "#DC143C" },
          { nameAr: "أبيض كلاسيكي", nameEn: "Classic White", hex: "#FFFFFF" }
        ],
        materialAr: "قطن فاخر منسوج بتقنيات تقليدية متطورة",
        materialEn: "Premium cotton woven with advanced traditional techniques",
        price: null,
        salePrice: null,
        stock: 50,
        featured: true,
        isNew: true,
        isCustomizable: false,
        sku: "SH-WIN-2026-SE",
        metaTitle: null,
        metaDescription: null
      },

      // المشالح الرجالية الفاخرة - Premium Men's Mishlahs
      {
        nameAr: "مشلح رجالي فاخر - بني ذهبي كلاسيكي",
        nameEn: "Premium Men's Mishlah - Classic Brown Gold",
        slug: "premium-mens-mishlah-classic-brown-gold",
        descriptionAr: "مشلح رجالي فاخر باللون البني الكلاسيكي مع تطريز ذهبي أنيق، قماش عالي الجودة مع خيوط ذهبية متداخلة، تصميم تراثي أصيل مع لمسة عصرية راقية",
        descriptionEn: "Premium men's mishlah in classic brown with elegant golden embroidery, high-quality fabric with interwoven golden threads, authentic traditional design with sophisticated modern touch",
        luxuryTaglineAr: "تحفة ملكية تراثية تنضح بالفخامة والأناقة الاستثنائية في كل خيط ذهبي متألق",
        luxuryTaglineEn: "A royal heritage masterpiece exuding luxury and exceptional elegance in every shining golden thread",
        mainImage: "/images/products/الصقر-الخليجي-مشلح-بني-ذهبي-فاخر-2025.jpg",
        images: [],
        category: "mishlahs",
        subcategory: "classic",
        brandId: brandIds[0],
        tags: ["مشلح", "رجالي", "فاخر", "بني", "ذهبي", "تفصيل", "تراثي"],
        sizes: ["S", "M", "L", "XL", "XXL", "3XL"],
        colors: [
          { nameAr: "بني ذهبي", nameEn: "Brown Gold", hex: "#8B4513" },
          { nameAr: "بني فاتح", nameEn: "Light Brown", hex: "#D2B48C" },
          { nameAr: "بني غامق", nameEn: "Dark Brown", hex: "#654321" }
        ],
        materialAr: "قماش قطني فاخر مع تطريز ذهبي يدوي",
        materialEn: "Premium cotton fabric with hand-stitched golden embroidery",
        price: null,
        salePrice: null,
        stock: 25,
        featured: true,
        isNew: true,
        isCustomizable: true,
        sku: "MISH-MEN-BG-001",
        metaTitle: null,
        metaDescription: null
      },
      {
        nameAr: "مشلح رجالي فاخر - كحلي ملكي",
        nameEn: "Premium Men's Mishlah - Royal Navy",
        slug: "premium-mens-mishlah-royal-navy",
        descriptionAr: "مشلح رجالي فاخر باللون الكحلي الملكي مع تطريز ذهبي فاخر، نقشات هندسية تراثية دقيقة، قماش عالي الجودة مقاوم للتجعيد مناسب للمناسبات الرسمية",
        descriptionEn: "Premium men's mishlah in royal navy with luxurious golden embroidery, intricate traditional geometric patterns, high-quality wrinkle-resistant fabric suitable for formal occasions",
        luxuryTaglineAr: "أناقة إمبراطورية كحلية تتوهج بالذهب الأصيل في تحفة تراثية خالدة",
        luxuryTaglineEn: "Imperial navy elegance glowing with authentic gold in an eternal heritage masterpiece",
        mainImage: "/images/products/الصقر-الخليجي-مشلح-كحلي-ذهبي-فاخر-2025.jpg",
        images: [],
        category: "mishlahs",
        subcategory: "formal",
        brandId: brandIds[0],
        tags: ["مشلح", "رجالي", "فاخر", "كحلي", "ملكي", "تفصيل", "رسمي"],
        sizes: ["S", "M", "L", "XL", "XXL", "3XL"],
        colors: [
          { nameAr: "كحلي ملكي", nameEn: "Royal Navy", hex: "#000080" },
          { nameAr: "أزرق داكن", nameEn: "Dark Blue", hex: "#191970" },
          { nameAr: "أزرق متوسط", nameEn: "Medium Blue", hex: "#4169E1" }
        ],
        materialAr: "قماش كحلي فاخر مع تطريز ذهبي ونقشات هندسية",
        materialEn: "Premium navy fabric with golden embroidery and geometric patterns",
        price: null,
        salePrice: null,
        stock: 20,
        featured: true,
        isNew: true,
        isCustomizable: true,
        sku: "MISH-MEN-NV-002",
        metaTitle: null,
        metaDescription: null
      },
      {
        nameAr: "مشلح رجالي فاخر - أسود أنيق",
        nameEn: "Premium Men's Mishlah - Elegant Black",
        slug: "premium-mens-mishlah-elegant-black",
        descriptionAr: "مشلح رجالي فاخر باللون الأسود الأنيق مع تطريز ذهبي راقي، تصميم عصري مع الحفاظ على الطابع التراثي، قماش ناعم فائق الجودة مع لمعة طبيعية أنيقة",
        descriptionEn: "Premium men's mishlah in elegant black with sophisticated golden embroidery, modern design while preserving traditional character, ultra-soft high-quality fabric with elegant natural shine",
        luxuryTaglineAr: "سواد ملكي يتألق بالذهب الأصيل في تحفة من الأناقة المطلقة والفخامة الخالدة",
        luxuryTaglineEn: "Royal black shining with authentic gold in a masterpiece of absolute elegance and eternal luxury",
        mainImage: "/images/products/الصقر-الخليجي-مشلح-أسود-ذهبي-فاخر-2025.jpg",
        images: [],
        category: "mishlahs",
        subcategory: "elegant",
        brandId: brandIds[0],
        tags: ["مشلح", "رجالي", "فاخر", "أسود", "أنيق", "تفصيل", "عصري"],
        sizes: ["S", "M", "L", "XL", "XXL", "3XL"],
        colors: [
          { nameAr: "أسود أنيق", nameEn: "Elegant Black", hex: "#000000" },
          { nameAr: "أسود مطفي", nameEn: "Matte Black", hex: "#2F2F2F" },
          { nameAr: "رمادي داكن", nameEn: "Dark Gray", hex: "#404040" }
        ],
        materialAr: "قماش أسود فاخر مع تطريز ذهبي وخيوط لامعة",
        materialEn: "Premium black fabric with golden embroidery and shiny threads",
        price: null,
        salePrice: null,
        stock: 15,
        featured: true,
        isNew: true,
        isCustomizable: true,
        sku: "MISH-MEN-BK-003",
        metaTitle: null,
        metaDescription: null
      },
      {
        nameAr: "مشلح رجالي فاخر - بيج كريمي",
        nameEn: "Premium Men's Mishlah - Cream Beige",
        slug: "premium-mens-mishlah-cream-beige",
        descriptionAr: "مشلح رجالي فاخر باللون البيج الكريمي مع تطريز ذهبي دقيق، لون هادئ وأنيق مناسب للمناسبات النهارية والمسائية، قماش قطني خالص عالي الجودة",
        descriptionEn: "Premium men's mishlah in cream beige with intricate golden embroidery, calm and elegant color suitable for day and evening occasions, pure high-quality cotton fabric",
        luxuryTaglineAr: "نعومة كريمية تتراقص مع خيوط الذهب في سيمفونية من الأناقة الراقية",
        luxuryTaglineEn: "Creamy softness dancing with golden threads in a symphony of sophisticated elegance",
        mainImage: "/images/products/الصقر-الخليجي-مشلح-بيج-ذهبي-فاخر-2025.jpg",
        images: [],
        category: "mishlahs",
        subcategory: "casual",
        brandId: brandIds[0],
        tags: ["مشلح", "رجالي", "فاخر", "بيج", "كريمي", "تفصيل", "هادئ"],
        sizes: ["S", "M", "L", "XL", "XXL", "3XL"],
        colors: [
          { nameAr: "بيج كريمي", nameEn: "Cream Beige", hex: "#F5F5DC" },
          { nameAr: "بيج فاتح", nameEn: "Light Beige", hex: "#F5DEB3" },
          { nameAr: "بيج رملي", nameEn: "Sandy Beige", hex: "#D2B48C" }
        ],
        materialAr: "قطن خالص فاخر مع تطريز ذهبي ناعم",
        materialEn: "Pure premium cotton with soft golden embroidery",
        price: null,
        salePrice: null,
        stock: 18,
        featured: true,
        isNew: true,
        isCustomizable: true,
        sku: "MISH-MEN-BG-004",
        metaTitle: null,
        metaDescription: null
      },
      {
        nameAr: "مشلح رجالي فاخر - زيتوني عسكري",
        nameEn: "Premium Men's Mishlah - Military Olive",
        slug: "premium-mens-mishlah-military-olive",
        descriptionAr: "مشلح رجالي فاخر باللون الزيتوني العسكري مع تطريز ذهبي مميز، لون عصري وقوي يجمع بين الطابع التراثي والحداثة، قماش مقاوم ومتين عالي الجودة",
        descriptionEn: "Premium men's mishlah in military olive with distinctive golden embroidery, modern and strong color combining traditional character with modernity, resistant and durable high-quality fabric",
        luxuryTaglineAr: "قوة زيتونية ملكية تتوهج بالذهب الأصيل في تحفة من التميز والشموخ",
        luxuryTaglineEn: "Royal olive strength glowing with authentic gold in a masterpiece of distinction and pride",
        mainImage: "/images/products/الصقر-الخليجي-مشلح-زيتوني-ذهبي-فاخر-2025.jpg",
        images: [],
        category: "mishlahs",
        subcategory: "modern",
        brandId: brandIds[0],
        tags: ["مشلح", "رجالي", "فاخر", "زيتوني", "عسكري", "تفصيل", "عصري"],
        sizes: ["S", "M", "L", "XL", "XXL", "3XL"],
        colors: [
          { nameAr: "زيتوني عسكري", nameEn: "Military Olive", hex: "#556B2F" },
          { nameAr: "أخضر زيتوني", nameEn: "Olive Green", hex: "#808000" },
          { nameAr: "خاكي غامق", nameEn: "Dark Khaki", hex: "#BDB76B" }
        ],
        materialAr: "قماش زيتوني متين مع تطريز ذهبي مقاوم",
        materialEn: "Durable olive fabric with resistant golden embroidery",
        price: null,
        salePrice: null,
        stock: 12,
        featured: true,
        isNew: true,
        isCustomizable: true,
        sku: "MISH-MEN-OL-005",
        metaTitle: null,
        metaDescription: null
      },
      {
        nameAr: "مشلح رجالي فاخر - بني فضي",
        nameEn: "Premium Men's Mishlah - Brown Silver",
        slug: "premium-mens-mishlah-brown-silver",
        descriptionAr: "مشلح رجالي فاخر باللون البني مع تطريز فضي راقي، مزيج متناغم من الألوان التراثية مع لمسة معاصرة، قماش قطني فاخر مع خيوط فضية متداخلة",
        descriptionEn: "Premium men's mishlah in brown with sophisticated silver embroidery, harmonious blend of traditional colors with contemporary touch, luxurious cotton fabric with interwoven silver threads",
        luxuryTaglineAr: "دفء البني الأصيل يتلألأ بفضة القمر في تحفة تراثية تنضح بالفخامة الملكية",
        luxuryTaglineEn: "Authentic brown warmth shimmering with moonlit silver in a heritage masterpiece exuding royal luxury",
        mainImage: "/images/products/الصقر-الخليجي-مشلح-بني-فضي-فاخر-2025.jpg",
        images: [],
        category: "mishlahs",
        subcategory: "heritage",
        brandId: brandIds[0],
        tags: ["مشلح", "رجالي", "فاخر", "بني", "فضي", "تفصيل", "تراثي"],
        sizes: ["S", "M", "L", "XL", "XXL", "3XL"],
        colors: [
          { nameAr: "بني فضي", nameEn: "Brown Silver", hex: "#8B4513" },
          { nameAr: "بني محمص", nameEn: "Roasted Brown", hex: "#A0522D" },
          { nameAr: "فضي لؤلؤي", nameEn: "Pearl Silver", hex: "#C0C0C0" }
        ],
        materialAr: "قطن فاخر مع تطريز فضي يدوي متقن",
        materialEn: "Premium cotton with exquisite hand-stitched silver embroidery",
        price: null,
        salePrice: null,
        stock: 22,
        featured: true,
        isNew: true,
        isCustomizable: true,
        sku: "MISH-MEN-BS-006",
        metaTitle: null,
        metaDescription: null
      },
      {
        nameAr: "مشلح رجالي فاخر - كلاسيكي ذهبي",
        nameEn: "Premium Men's Mishlah - Classic Gold",
        slug: "premium-mens-mishlah-classic-gold",
        descriptionAr: "مشلح رجالي فاخر بالتصميم الكلاسيكي الذهبي، قطعة تراثية أصيلة تحمل عبق الماضي العريق، تطريز ذهبي ملكي مع نقوش هندسية تقليدية",
        descriptionEn: "Premium men's mishlah in classic golden design, authentic heritage piece carrying the essence of glorious past, royal golden embroidery with traditional geometric patterns",
        luxuryTaglineAr: "كلاسيكية ذهبية خالدة تتوهج بعراقة التراث وأناقة الملوك في تحفة لا تبلى",
        luxuryTaglineEn: "Eternal golden classic glowing with heritage nobility and royal elegance in an immortal masterpiece",
        mainImage: "/images/products/الصقر-الخليجي-مشلح-كلاسيكي-ذهبي-2025.jpg",
        images: [],
        category: "mishlahs",
        subcategory: "classic",
        brandId: brandIds[0],
        tags: ["مشلح", "رجالي", "فاخر", "كلاسيكي", "ذهبي", "تفصيل", "ملكي"],
        sizes: ["S", "M", "L", "XL", "XXL", "3XL"],
        colors: [
          { nameAr: "ذهبي كلاسيكي", nameEn: "Classic Gold", hex: "#FFD700" },
          { nameAr: "ذهبي أنتيك", nameEn: "Antique Gold", hex: "#CFB53B" },
          { nameAr: "ذهبي رويال", nameEn: "Royal Gold", hex: "#B8860B" }
        ],
        materialAr: "قماش تراثي فاخر مع تطريز ذهبي ملكي",
        materialEn: "Premium heritage fabric with royal golden embroidery",
        price: null,
        salePrice: null,
        stock: 15,
        featured: true,
        isNew: true,
        isCustomizable: true,
        sku: "MISH-MEN-CG-007",
        metaTitle: null,
        metaDescription: null
      },
      {
        nameAr: "مجموعة المشالح الفاخرة - عرض خاص",
        nameEn: "Premium Mishlahs Collection - Special Display",
        slug: "premium-mishlahs-collection-special-display",
        descriptionAr: "مجموعة فاخرة من المشالح الرجالية بألوان وتصاميم متنوعة، تشكيلة كاملة تضم أجود أنواع المشالح التراثية والعصرية مع إمكانية التفصيل حسب الطلب",
        descriptionEn: "Luxurious collection of men's mishlahs in various colors and designs, complete range featuring the finest traditional and modern mishlahs with custom tailoring options",
        luxuryTaglineAr: "تشكيلة إمبراطورية من أرقى المشالح تجمع تراث الأجداد وفخامة العصر في مجموعة ملكية لا مثيل لها",
        luxuryTaglineEn: "Imperial collection of the finest mishlahs combining ancestral heritage with modern luxury in an unparalleled royal ensemble",
        mainImage: "/images/products/الصقر-الخليجي-مشالح-عرض-مجموعة-2025.jpg",
        images: [],
        category: "mishlahs",
        subcategory: "collection",
        brandId: brandIds[0],
        tags: ["مشلح", "رجالي", "فاخر", "مجموعة", "تشكيلة", "تفصيل", "خاص"],
        sizes: ["S", "M", "L", "XL", "XXL", "3XL"],
        colors: [
          { nameAr: "متعدد الألوان", nameEn: "Multi-Color", hex: "#808080" },
          { nameAr: "تشكيلة كاملة", nameEn: "Full Range", hex: "#696969" },
          { nameAr: "حسب الطلب", nameEn: "Custom Choice", hex: "#A9A9A9" }
        ],
        materialAr: "مجموعة أقمشة فاخرة متنوعة مع تطريز ذهبي وفضي",
        materialEn: "Collection of various premium fabrics with golden and silver embroidery",
        price: null,
        salePrice: null,
        stock: 50,
        featured: true,
        isNew: true,
        isCustomizable: true,
        sku: "MISH-COL-SP-008",
        metaTitle: null,
        metaDescription: null
      },
      {
        nameAr: "مشلح رجالي فاخر - أسود ذهبي ديلوكس",
        nameEn: "Premium Men's Mishlah - Black Gold Deluxe",
        slug: "premium-mens-mishlah-black-gold-deluxe",
        descriptionAr: "مشلح رجالي فاخر باللون الأسود مع تطريز ذهبي ديلوكس، تصميم حديث يجمع بين الأناقة الكلاسيكية والفخامة العصرية، قماش عالي الجودة مقاوم للبهتان",
        descriptionEn: "Premium men's mishlah in black with deluxe golden embroidery, modern design combining classic elegance with contemporary luxury, high-quality fade-resistant fabric",
        luxuryTaglineAr: "سواد الليل الملكي يتلألأ بذهب النجوم في تحفة أسطورية تخطف الأنفاس",
        luxuryTaglineEn: "Royal midnight black shimmering with starlight gold in a legendary masterpiece that takes your breath away",
        mainImage: "/images/products/الصقر-الخليجي-مشلح-رجالي-فاخر-2025-1_1757834380139.jpg",
        images: [],
        category: "mishlahs",
        subcategory: "deluxe",
        brandId: brandIds[0],
        tags: ["مشلح", "رجالي", "فاخر", "أسود", "ديلوكس", "تفصيل", "حديث"],
        sizes: ["S", "M", "L", "XL", "XXL", "3XL"],
        colors: [
          { nameAr: "أسود ذهبي", nameEn: "Black Gold", hex: "#000000" },
          { nameAr: "أسود لؤلؤي", nameEn: "Pearl Black", hex: "#2F2F2F" },
          { nameAr: "ذهبي فاخر", nameEn: "Luxury Gold", hex: "#FFD700" }
        ],
        materialAr: "قماش أسود فاخر مع تطريز ذهبي ديلوكس",
        materialEn: "Premium black fabric with deluxe golden embroidery",
        price: null,
        salePrice: null,
        stock: 20,
        featured: true,
        isNew: true,
        isCustomizable: true,
        sku: "MISH-MEN-BDX-009",
        metaTitle: null,
        metaDescription: null
      },
      {
        nameAr: "مشلح رجالي فاخر - كحلي إمبراطوري",
        nameEn: "Premium Men's Mishlah - Imperial Navy",
        slug: "premium-mens-mishlah-imperial-navy",
        descriptionAr: "مشلح رجالي فاخر باللون الكحلي الإمبراطوري مع تطريز ذهبي راقي، تصميم أرستقراطي يليق بالملوك والوزراء، نسيج فاخر مستورد",
        descriptionEn: "Premium men's mishlah in imperial navy with elegant golden embroidery, aristocratic design fit for kings and ministers, imported luxury fabric",
        luxuryTaglineAr: "كحلة إمبراطورية تنبض بالفخامة الملكية وتتوهج بذهب الأباطرة في عمق المحيطات",
        luxuryTaglineEn: "Imperial navy pulsing with royal luxury and glowing with emperors' gold in the depths of oceans",
        mainImage: "/images/products/الصقر-الخليجي-مشلح-رجالي-فاخر-2025-2_1757834380140.jpg",
        images: [],
        category: "mishlahs",
        subcategory: "imperial",
        brandId: brandIds[0],
        tags: ["مشلح", "رجالي", "فاخر", "كحلي", "إمبراطوري", "تفصيل", "أرستقراطي"],
        sizes: ["S", "M", "L", "XL", "XXL", "3XL"],
        colors: [
          { nameAr: "كحلي إمبراطوري", nameEn: "Imperial Navy", hex: "#1E1E3F" },
          { nameAr: "أزرق ملكي", nameEn: "Royal Blue", hex: "#4169E1" },
          { nameAr: "كحلي غامق", nameEn: "Deep Navy", hex: "#191970" }
        ],
        materialAr: "نسيج كحلي إمبراطوري مع تطريز ذهبي ملكي",
        materialEn: "Imperial navy fabric with royal golden embroidery",
        price: null,
        salePrice: null,
        stock: 18,
        featured: true,
        isNew: true,
        isCustomizable: true,
        sku: "MISH-MEN-IN-010",
        metaTitle: null,
        metaDescription: null
      },
      {
        nameAr: "مشلح رجالي فاخر - بني تراثي أصيل",
        nameEn: "Premium Men's Mishlah - Authentic Heritage Brown",
        slug: "premium-mens-mishlah-authentic-heritage-brown",
        descriptionAr: "مشلح رجالي فاخر باللون البني التراثي مع تطريز فضي أصيل، قطعة تحمل عبق التراث العربي الأصيل، صناعة يدوية متقنة",
        descriptionEn: "Premium men's mishlah in heritage brown with authentic silver embroidery, piece carrying the essence of authentic Arab heritage, exquisite handcrafted",
        luxuryTaglineAr: "بني الصحراء الأصيل يتراقص مع فضة القمر في سيمفونية تراثية خالدة",
        luxuryTaglineEn: "Authentic desert brown dancing with moonlight silver in an eternal heritage symphony",
        mainImage: "/images/products/الصقر-الخليجي-مشلح-رجالي-فاخر-2025-3_1757834380141.jpg",
        images: [],
        category: "mishlahs",
        subcategory: "heritage",
        brandId: brandIds[0],
        tags: ["مشلح", "رجالي", "فاخر", "بني", "تراثي", "تفصيل", "أصيل"],
        sizes: ["S", "M", "L", "XL", "XXL", "3XL"],
        colors: [
          { nameAr: "بني تراثي", nameEn: "Heritage Brown", hex: "#8B4513" },
          { nameAr: "فضي أصيل", nameEn: "Authentic Silver", hex: "#C0C0C0" },
          { nameAr: "بني صحراوي", nameEn: "Desert Brown", hex: "#A0522D" }
        ],
        materialAr: "قماش بني تراثي مع تطريز فضي يدوي أصيل",
        materialEn: "Heritage brown fabric with authentic hand-stitched silver embroidery",
        price: null,
        salePrice: null,
        stock: 16,
        featured: true,
        isNew: true,
        isCustomizable: true,
        sku: "MISH-MEN-HB-011",
        metaTitle: null,
        metaDescription: null
      },
      {
        nameAr: "مشلح رجالي فاخر - شوكولاتة ذهبية",
        nameEn: "Premium Men's Mishlah - Golden Chocolate",
        slug: "premium-mens-mishlah-golden-chocolate",
        descriptionAr: "مشلح رجالي فاخر بلون الشوكولاتة الغامقة مع تطريز ذهبي فاخر، لون دافئ وجذاب يجمع بين الأناقة والفخامة، ملمس حريري ناعم",
        descriptionEn: "Premium men's mishlah in deep chocolate color with luxurious golden embroidery, warm and attractive color combining elegance with luxury, silky smooth texture",
        luxuryTaglineAr: "حلاوة الشوكولاتة الملكية تذوب مع ذهب الآلهة في تحفة تسحر الحواس",
        luxuryTaglineEn: "Royal chocolate sweetness melting with gods' gold in a masterpiece that enchants the senses",
        mainImage: "/images/products/الصقر-الخليجي-مشلح-رجالي-فاخر-2025-4_1757834380141.jpg",
        images: [],
        category: "mishlahs",
        subcategory: "luxury",
        brandId: brandIds[0],
        tags: ["مشلح", "رجالي", "فاخر", "شوكولاتة", "ذهبي", "تفصيل", "دافئ"],
        sizes: ["S", "M", "L", "XL", "XXL", "3XL"],
        colors: [
          { nameAr: "شوكولاتة ذهبية", nameEn: "Golden Chocolate", hex: "#7B3F00" },
          { nameAr: "بني محمص", nameEn: "Roasted Brown", hex: "#A0522D" },
          { nameAr: "ذهبي دافئ", nameEn: "Warm Gold", hex: "#DAA520" }
        ],
        materialAr: "قماش شوكولاتي فاخر مع تطريز ذهبي حريري",
        materialEn: "Luxurious chocolate fabric with silky golden embroidery",
        price: null,
        salePrice: null,
        stock: 14,
        featured: true,
        isNew: true,
        isCustomizable: true,
        sku: "MISH-MEN-GC-012",
        metaTitle: null,
        metaDescription: null
      },
      {
        nameAr: "مشلح رجالي فاخر - بني فاتح ملكي",
        nameEn: "Premium Men's Mishlah - Royal Light Brown",
        slug: "premium-mens-mishlah-royal-light-brown",
        descriptionAr: "مشلح رجالي فاخر باللون البني الفاتح الملكي مع تطريز ذهبي راقي، لون هادئ وأنيق مناسب للمناسبات الرسمية، تصميم عصري كلاسيكي",
        descriptionEn: "Premium men's mishlah in royal light brown with elegant golden embroidery, calm and elegant color suitable for formal occasions, classic modern design",
        luxuryTaglineAr: "بني الصباح الذهبي يتوهج بأشعة الشمس الملكية في قصيدة من الأناقة الخالدة",
        luxuryTaglineEn: "Golden morning brown glowing with royal sunlight in a poem of eternal elegance",
        mainImage: "/images/products/الصقر-الخليجي-مشلح-رجالي-فاخر-2025-5_1757834380142.jpg",
        images: [],
        category: "mishlahs",
        subcategory: "royal",
        brandId: brandIds[0],
        tags: ["مشلح", "رجالي", "فاخر", "بني فاتح", "ملكي", "تفصيل", "رسمي"],
        sizes: ["S", "M", "L", "XL", "XXL", "3XL"],
        colors: [
          { nameAr: "بني فاتح ملكي", nameEn: "Royal Light Brown", hex: "#D2B48C" },
          { nameAr: "ذهبي صباحي", nameEn: "Morning Gold", hex: "#FFD700" },
          { nameAr: "بني رملي", nameEn: "Sandy Brown", hex: "#F4A460" }
        ],
        materialAr: "قماش بني ملكي فاخر مع تطريز ذهبي أنيق",
        materialEn: "Royal brown premium fabric with elegant golden embroidery",
        price: null,
        salePrice: null,
        stock: 19,
        featured: true,
        isNew: true,
        isCustomizable: true,
        sku: "MISH-MEN-RLB-013",
        metaTitle: null,
        metaDescription: null
      },
      {
        nameAr: "مشلح رجالي فاخر - معرض الأزياء الملكي",
        nameEn: "Premium Men's Mishlah - Royal Fashion Exhibition",
        slug: "premium-mens-mishlah-royal-fashion-exhibition",
        descriptionAr: "مشلح رجالي فاخر معروض في أرقى معارض الأزياء الملكية، قطعة استثنائية تمثل قمة الفخامة والتميز، تصميم حصري للمناسبات الكبرى",
        descriptionEn: "Premium men's mishlah displayed in the finest royal fashion exhibitions, exceptional piece representing the pinnacle of luxury and distinction, exclusive design for grand occasions",
        luxuryTaglineAr: "معرض إمبراطوري من الفخامة المطلقة يضم أرقى إبداعات مؤسسة الصقر الخليجي",
        luxuryTaglineEn: "Imperial exhibition of absolute luxury featuring the finest creations of Gulf Falcon Corporation",
        mainImage: "/images/products/الصقر-الخليجي-مشلح-رجالي-فاخر-2025-7_1757834380143.jpg",
        images: [],
        category: "mishlahs",
        subcategory: "exhibition",
        brandId: brandIds[0],
        tags: ["مشلح", "رجالي", "فاخر", "معرض", "ملكي", "تفصيل", "حصري"],
        sizes: ["S", "M", "L", "XL", "XXL", "3XL"],
        colors: [
          { nameAr: "ألوان متعددة", nameEn: "Multi Colors", hex: "#808080" },
          { nameAr: "معرض ملكي", nameEn: "Royal Exhibition", hex: "#B8860B" },
          { nameAr: "فخامة مطلقة", nameEn: "Absolute Luxury", hex: "#FFD700" }
        ],
        materialAr: "تشكيلة أقمشة ملكية فاخرة من معرض الأزياء",
        materialEn: "Collection of royal luxury fabrics from fashion exhibition",
        price: null,
        salePrice: null,
        stock: 8,
        featured: true,
        isNew: true,
        isCustomizable: true,
        sku: "MISH-MEN-RFE-014",
        metaTitle: null,
        metaDescription: null
      },
      {
        nameAr: "مشلح رجالي فاخر - رمادي ذهبي أنيق",
        nameEn: "Premium Men's Mishlah - Elegant Gray Gold",
        slug: "premium-mens-mishlah-elegant-gray-gold",
        descriptionAr: "مشلح رجالي فاخر باللون الرمادي مع تطريز ذهبي أنيق، لون عصري راقي يجمع بين الحداثة والأصالة، مناسب للمناسبات المتنوعة",
        descriptionEn: "Premium men's mishlah in gray with elegant golden embroidery, sophisticated modern color combining modernity with authenticity, suitable for various occasions",
        luxuryTaglineAr: "رمادية الفجر الملكية تتوهج بذهب الأسطورة في تحفة من الأناقة المعاصرة",
        luxuryTaglineEn: "Royal dawn gray glowing with legendary gold in a masterpiece of contemporary elegance",
        mainImage: "/images/products/الصقر-الخليجي-مشلح-رجالي-فاخر-2025-8_1757834380143.jpg",
        images: [],
        category: "mishlahs",
        subcategory: "contemporary",
        brandId: brandIds[0],
        tags: ["مشلح", "رجالي", "فاخر", "رمادي", "ذهبي", "تفصيل", "عصري"],
        sizes: ["S", "M", "L", "XL", "XXL", "3XL"],
        colors: [
          { nameAr: "رمادي ذهبي", nameEn: "Gray Gold", hex: "#708090" },
          { nameAr: "رمادي فضي", nameEn: "Silver Gray", hex: "#A9A9A9" },
          { nameAr: "ذهبي أنيق", nameEn: "Elegant Gold", hex: "#DAA520" }
        ],
        materialAr: "قماش رمادي فاخر مع تطريز ذهبي أنيق",
        materialEn: "Premium gray fabric with elegant golden embroidery",
        price: null,
        salePrice: null,
        stock: 17,
        featured: true,
        isNew: true,
        isCustomizable: true,
        sku: "MISH-MEN-EGG-015",
        metaTitle: null,
        metaDescription: null
      },
      {
        nameAr: "مشلح رجالي فاخر - بيج ذهبي كلاسيكي",
        nameEn: "Premium Men's Mishlah - Classic Beige Gold",
        slug: "premium-mens-mishlah-classic-beige-gold",
        descriptionAr: "مشلح رجالي فاخر باللون البيج الكلاسيكي مع تطريز ذهبي راقي، لون كلاسيكي خالد يناسب جميع المناسبات، تصميم أنيق ومريح",
        descriptionEn: "Premium men's mishlah in classic beige with elegant golden embroidery, timeless classic color suitable for all occasions, elegant and comfortable design",
        luxuryTaglineAr: "بيج الصحراء الذهبية يتراقص مع نور الشمس في تحفة كلاسيكية خالدة",
        luxuryTaglineEn: "Golden desert beige dancing with sunlight in a timeless classic masterpiece",
        mainImage: "/images/products/الصقر-الخليجي-مشلح-رجالي-فاخر-2025-9_1757834380144.jpg",
        images: [],
        category: "mishlahs",
        subcategory: "classic",
        brandId: brandIds[0],
        tags: ["مشلح", "رجالي", "فاخر", "بيج", "كلاسيكي", "تفصيل", "خالد"],
        sizes: ["S", "M", "L", "XL", "XXL", "3XL"],
        colors: [
          { nameAr: "بيج ذهبي", nameEn: "Beige Gold", hex: "#F5DEB3" },
          { nameAr: "بيج كلاسيكي", nameEn: "Classic Beige", hex: "#F5F5DC" },
          { nameAr: "ذهبي صحراوي", nameEn: "Desert Gold", hex: "#DAA520" }
        ],
        materialAr: "قماش بيج كلاسيكي مع تطريز ذهبي راقي",
        materialEn: "Classic beige fabric with elegant golden embroidery",
        price: null,
        salePrice: null,
        stock: 21,
        featured: true,
        isNew: true,
        isCustomizable: true,
        sku: "MISH-MEN-CBG-016",
        metaTitle: null,
        metaDescription: null
      },
      {
        nameAr: "مشلح رجالي فاخر - بني غامق إمبراطوري",
        nameEn: "Premium Men's Mishlah - Imperial Dark Brown",
        slug: "premium-mens-mishlah-imperial-dark-brown",
        descriptionAr: "مشلح رجالي فاخر باللون البني الغامق الإمبراطوري مع تطريز ذهبي فاخر وتفاصيل أنيقة، قطعة ملكية تليق بالشخصيات المرموقة",
        descriptionEn: "Premium men's mishlah in imperial dark brown with luxurious golden embroidery and elegant details, royal piece befitting prestigious personalities",
        luxuryTaglineAr: "بني الإمبراطوريات الغامق يحتضن ذهب الفراعنة في تحفة تفوق الخيال",
        luxuryTaglineEn: "Imperial dark brown embracing pharaohs' gold in a masterpiece beyond imagination",
        mainImage: "/images/products/الصقر-الخليجي-مشلح-رجالي-فاخر-2025-10_1757834380144.jpg",
        images: [],
        category: "mishlahs",
        subcategory: "imperial",
        brandId: brandIds[0],
        tags: ["مشلح", "رجالي", "فاخر", "بني غامق", "إمبراطوري", "تفصيل", "ملكي"],
        sizes: ["S", "M", "L", "XL", "XXL", "3XL"],
        colors: [
          { nameAr: "بني إمبراطوري", nameEn: "Imperial Brown", hex: "#654321" },
          { nameAr: "ذهبي فاخر", nameEn: "Luxury Gold", hex: "#FFD700" },
          { nameAr: "بني ملكي", nameEn: "Royal Brown", hex: "#8B4513" }
        ],
        materialAr: "قماش بني إمبراطوري مع تطريز ذهبي ملكي",
        materialEn: "Imperial brown fabric with royal golden embroidery",
        price: null,
        salePrice: null,
        stock: 13,
        featured: true,
        isNew: true,
        isCustomizable: true,
        sku: "MISH-MEN-IDB-017",
        metaTitle: null,
        metaDescription: null
      },
      {
        nameAr: "مشلح رجالي فاخر - تراثي بني ذهبي",
        nameEn: "Premium Men's Mishlah - Heritage Brown Gold",
        slug: "premium-mens-mishlah-heritage-brown-gold",
        descriptionAr: "مشلح رجالي فاخر بالتصميم التراثي البني مع تطريز ذهبي يدوي، قطعة أصيلة تحمل روح التراث العربي العريق، صناعة متقنة",
        descriptionEn: "Premium men's mishlah in heritage brown design with hand-stitched golden embroidery, authentic piece carrying the spirit of glorious Arab heritage, exquisite craftsmanship",
        luxuryTaglineAr: "تراث الأجداد البني يتوهج بذهب التاريخ في قصة حب أبدية مع الأصالة",
        luxuryTaglineEn: "Ancestors' brown heritage glowing with history's gold in an eternal love story with authenticity",
        mainImage: "/images/products/الصقر-الخليجي-مشلح-رجالي-فاخر-2025-11_1757834380145.jpg",
        images: [],
        category: "mishlahs",
        subcategory: "heritage",
        brandId: brandIds[0],
        tags: ["مشلح", "رجالي", "فاخر", "تراثي", "بني", "تفصيل", "أصيل"],
        sizes: ["S", "M", "L", "XL", "XXL", "3XL"],
        colors: [
          { nameAr: "بني تراثي", nameEn: "Heritage Brown", hex: "#8B4513" },
          { nameAr: "ذهبي تاريخي", nameEn: "Historical Gold", hex: "#B8860B" },
          { nameAr: "بني أصيل", nameEn: "Authentic Brown", hex: "#A0522D" }
        ],
        materialAr: "قماش تراثي بني مع تطريز ذهبي يدوي أصيل",
        materialEn: "Heritage brown fabric with authentic hand-stitched golden embroidery",
        price: null,
        salePrice: null,
        stock: 15,
        featured: true,
        isNew: true,
        isCustomizable: true,
        sku: "MISH-MEN-HBG-018",
        metaTitle: null,
        metaDescription: null
      },
      {
        nameAr: "مشلح رجالي فاخر - زيتوني ذهبي متميز",
        nameEn: "Premium Men's Mishlah - Distinguished Olive Gold",
        slug: "premium-mens-mishlah-distinguished-olive-gold",
        descriptionAr: "مشلح رجالي فاخر باللون الزيتوني المتميز مع تطريز ذهبي راقي، لون مميز وجذاب يبرز الشخصية القوية، تصميم عصري أنيق",
        descriptionEn: "Premium men's mishlah in distinguished olive with elegant golden embroidery, distinctive and attractive color highlighting strong personality, stylish modern design",
        luxuryTaglineAr: "زيتون الحكمة الذهبي يتراقص مع نور الشموس في تحفة تبرز قوة الشخصية",
        luxuryTaglineEn: "Golden wisdom olive dancing with sunlight in a masterpiece highlighting personality strength",
        mainImage: "/images/products/الصقر-الخليجي-مشلح-رجالي-فاخر-2025-12_1757834380145.jpg",
        images: [],
        category: "mishlahs",
        subcategory: "distinguished",
        brandId: brandIds[0],
        tags: ["مشلح", "رجالي", "فاخر", "زيتوني", "متميز", "تفصيل", "قوي"],
        sizes: ["S", "M", "L", "XL", "XXL", "3XL"],
        colors: [
          { nameAr: "زيتوني ذهبي", nameEn: "Olive Gold", hex: "#556B2F" },
          { nameAr: "أخضر زيتوني", nameEn: "Olive Green", hex: "#808000" },
          { nameAr: "ذهبي متميز", nameEn: "Distinguished Gold", hex: "#DAA520" }
        ],
        materialAr: "قماش زيتوني متميز مع تطريز ذهبي راقي",
        materialEn: "Distinguished olive fabric with elegant golden embroidery",
        price: null,
        salePrice: null,
        stock: 12,
        featured: true,
        isNew: true,
        isCustomizable: true,
        sku: "MISH-MEN-DOG-019",
        metaTitle: null,
        metaDescription: null
      },
      {
        nameAr: "مشلح الصقر الخليجي الخاص - الإصدار المحدود",
        nameEn: "Gulf Falcon Special Mishlah - Limited Edition",
        slug: "gulf-falcon-special-mishlah-limited-edition",
        descriptionAr: "مشلح الصقر الخليجي الخاص - إصدار محدود فريد من نوعه، قطعة استثنائية تحمل شعار المؤسسة الحصري، تصميم خاص للشخصيات المميزة",
        descriptionEn: "Gulf Falcon Special Mishlah - unique limited edition, exceptional piece bearing the corporation's exclusive logo, special design for distinguished personalities",
        luxuryTaglineAr: "إصدار محدود من الفخامة المطلقة يحمل روح الصقر الخليجي الأصيل في تحفة لا تُقدر بثمن",
        luxuryTaglineEn: "Limited edition of absolute luxury carrying the authentic Gulf Falcon spirit in a priceless masterpiece",
        mainImage: "/images/products/مشلح الصقر الخليجي_1757834380146.jpg",
        images: [],
        category: "mishlahs",
        subcategory: "limited-edition",
        brandId: brandIds[0],
        tags: ["مشلح", "رجالي", "فاخر", "الصقر الخليجي", "محدود", "تفصيل", "خاص"],
        sizes: ["S", "M", "L", "XL", "XXL", "3XL"],
        colors: [
          { nameAr: "خاص محدود", nameEn: "Special Limited", hex: "#8B4513" },
          { nameAr: "ذهبي حصري", nameEn: "Exclusive Gold", hex: "#FFD700" },
          { nameAr: "الصقر الخليجي", nameEn: "Gulf Falcon", hex: "#B8860B" }
        ],
        materialAr: "قماش حصري خاص بمؤسسة الصقر الخليجي",
        materialEn: "Exclusive fabric special to Gulf Falcon Corporation",
        price: null,
        salePrice: null,
        stock: 5,
        featured: true,
        isNew: true,
        isCustomizable: true,
        sku: "MISH-GF-LE-020",
        metaTitle: null,
        metaDescription: null
      }
    ];

    products.forEach(product => {
      const id = randomUUID();
      this.products.set(id, {
        id,
        ...product,
        salePrice: product.salePrice ?? null,
        subcategory: product.subcategory ?? null,
        materialAr: product.materialAr ?? null,
        materialEn: product.materialEn ?? null,
        sku: product.sku ?? null,
        metaTitle: product.metaTitle ?? null,
        metaDescription: product.metaDescription ?? null,
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
    
    // Create a clean update object with proper null handling
    const cleanUpdate: Partial<Product> = {};
    
    // Handle nullable string fields
    if (productUpdate.descriptionAr !== undefined) cleanUpdate.descriptionAr = productUpdate.descriptionAr ?? null;
    if (productUpdate.descriptionEn !== undefined) cleanUpdate.descriptionEn = productUpdate.descriptionEn ?? null;
    if (productUpdate.luxuryTaglineAr !== undefined) cleanUpdate.luxuryTaglineAr = productUpdate.luxuryTaglineAr ?? null;
    if (productUpdate.luxuryTaglineEn !== undefined) cleanUpdate.luxuryTaglineEn = productUpdate.luxuryTaglineEn ?? null;
    if (productUpdate.price !== undefined) cleanUpdate.price = productUpdate.price ?? null;
    if (productUpdate.salePrice !== undefined) cleanUpdate.salePrice = productUpdate.salePrice ?? null;
    if (productUpdate.brandId !== undefined) cleanUpdate.brandId = productUpdate.brandId ?? null;
    if (productUpdate.subcategory !== undefined) cleanUpdate.subcategory = productUpdate.subcategory ?? null;
    if (productUpdate.materialAr !== undefined) cleanUpdate.materialAr = productUpdate.materialAr ?? null;
    if (productUpdate.materialEn !== undefined) cleanUpdate.materialEn = productUpdate.materialEn ?? null;
    if (productUpdate.sku !== undefined) cleanUpdate.sku = productUpdate.sku ?? null;
    if (productUpdate.metaTitle !== undefined) cleanUpdate.metaTitle = productUpdate.metaTitle ?? null;
    if (productUpdate.metaDescription !== undefined) cleanUpdate.metaDescription = productUpdate.metaDescription ?? null;
    
    // Handle array fields with proper type safety
    if (productUpdate.images !== undefined) cleanUpdate.images = (productUpdate.images as string[]) ?? [];
    if (productUpdate.tags !== undefined) cleanUpdate.tags = (productUpdate.tags as string[]) ?? [];
    if (productUpdate.sizes !== undefined) cleanUpdate.sizes = (productUpdate.sizes as string[]) ?? [];
    if (productUpdate.colors !== undefined) cleanUpdate.colors = (productUpdate.colors as { nameAr: string; nameEn: string; hex: string }[]) ?? [];
    
    // Handle non-nullable fields directly
    if (productUpdate.nameAr !== undefined) cleanUpdate.nameAr = productUpdate.nameAr;
    if (productUpdate.nameEn !== undefined) cleanUpdate.nameEn = productUpdate.nameEn;
    if (productUpdate.slug !== undefined) cleanUpdate.slug = productUpdate.slug;
    if (productUpdate.mainImage !== undefined) cleanUpdate.mainImage = productUpdate.mainImage;
    if (productUpdate.category !== undefined) cleanUpdate.category = productUpdate.category;
    if (productUpdate.featured !== undefined) cleanUpdate.featured = productUpdate.featured;
    if (productUpdate.isNew !== undefined) cleanUpdate.isNew = productUpdate.isNew;
    if (productUpdate.isCustomizable !== undefined) cleanUpdate.isCustomizable = productUpdate.isCustomizable;
    if (productUpdate.stock !== undefined) cleanUpdate.stock = productUpdate.stock;
    
    const updatedProduct: Product = {
      ...product,
      ...cleanUpdate,
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
      luxuryTaglineAr: insertProduct.luxuryTaglineAr ?? null,
      luxuryTaglineEn: insertProduct.luxuryTaglineEn ?? null,
      price: insertProduct.price ?? null,
      salePrice: insertProduct.salePrice ?? null,
      mainImage: insertProduct.mainImage,
      images: (insertProduct.images as string[]) ?? [],
      brandId: insertProduct.brandId ?? null,
      category: insertProduct.category,
      subcategory: insertProduct.subcategory ?? null,
      tags: (insertProduct.tags as string[]) ?? [],
      sizes: (insertProduct.sizes as string[]) ?? [],
      colors: (insertProduct.colors as { nameAr: string; nameEn: string; hex: string }[]) ?? [],
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
