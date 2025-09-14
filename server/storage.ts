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
        stock: 25,
        featured: false,
        isNew: false,
        isCustomizable: true,
        sku: "VEST-CA-005"
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
        stock: 8,
        featured: true,
        isNew: true,
        isCustomizable: false,
        sku: "PB-LUX-001"
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
        stock: 12,
        featured: true,
        isNew: false,
        isCustomizable: false,
        sku: "PB-AGT-002"
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
        stock: 6,
        featured: false,
        isNew: false,
        isCustomizable: false,
        sku: "PB-TUR-003"
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
        stock: 4,
        featured: true,
        isNew: false,
        isCustomizable: false,
        sku: "PB-LAP-004"
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
        stock: 3,
        featured: true,
        isNew: true,
        isCustomizable: false,
        sku: "PB-OPL-005"
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
        stock: 20,
        featured: false,
        isNew: false,
        isCustomizable: true,
        sku: "PB-COL-006"
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
        stock: 8,
        featured: true,
        isNew: true,
        isCustomizable: false,
        sku: "WS-LUX-001"
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
        stock: 5,
        featured: true,
        isNew: false,
        isCustomizable: true,
        sku: "WS-TRA-002"
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
        stock: 3,
        featured: true,
        isNew: true,
        isCustomizable: false,
        sku: "WS-ROY-003"
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
        stock: 6,
        featured: false,
        isNew: true,
        isCustomizable: true,
        sku: "WS-ART-004"
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
        stock: 4,
        featured: true,
        isNew: false,
        isCustomizable: false,
        sku: "WS-HER-005"
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
        stock: 2,
        featured: true,
        isNew: true,
        isCustomizable: false,
        sku: "WS-CAL-006"
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
        stock: 2,
        featured: true,
        isNew: false,
        isCustomizable: false,
        sku: "WS-SET-007"
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
        stock: 8,
        featured: true,
        isNew: true,
        isCustomizable: true,
        sku: "WW-COAT-001"
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
        stock: 6,
        featured: true,
        isNew: true,
        isCustomizable: false,
        sku: "WW-FUR-002"
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
        stock: 5,
        featured: true,
        isNew: true,
        isCustomizable: true,
        sku: "WW-FUR-003"
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
        stock: 4,
        featured: false,
        isNew: true,
        isCustomizable: true,
        sku: "WW-FUR-004"
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
        stock: 3,
        featured: true,
        isNew: true,
        isCustomizable: false,
        sku: "WW-FUR-005"
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
        stock: 7,
        featured: false,
        isNew: true,
        isCustomizable: true,
        sku: "WW-FUR-006"
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
        stock: 6,
        featured: true,
        isNew: true,
        isCustomizable: true,
        sku: "WW-MISH-007"
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
