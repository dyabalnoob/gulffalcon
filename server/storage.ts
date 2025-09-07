import {
  type User,
  type InsertUser,
  type Brand,
  type InsertBrand,
  type Product,
  type InsertProduct,
  type GalleryItem,
  type InsertGalleryItem,
  type ContactMessage,
  type InsertContactMessage,
} from "@shared/schema";
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
  getProductsByBrand(brandId: string): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;

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
      {
        name: "ماركة الأناقة",
        slug: "marca-elegance",
        description: "رائدة في الأناقة الرجالية",
        logoUrl: "/images/brands/marca-elegance.png",
      },
      {
        name: "دار الفخامة",
        slug: "dar-luxury",
        description: "تصاميم فاخرة ومميزة",
        logoUrl: "/images/brands/dar-luxury.png",
      },
      {
        name: "بيت الأزياء",
        slug: "bait-fashion",
        description: "أزياء تقليدية عصرية",
        logoUrl: "/images/brands/bait-fashion.png",
      },
      {
        name: "معرض النخبة",
        slug: "maerad-elite",
        description: "للرجل المتميز",
        logoUrl: "/images/brands/maerad-elite.png",
      },
      {
        name: "صالون الرجل",
        slug: "salon-man",
        description: "أناقة بلا حدود",
        logoUrl: "/images/brands/salon-man.png",
      },
      {
        name: "متجر الأصالة",
        slug: "store-authenticity",
        description: "تراث وعراقة",
        logoUrl: "/images/brands/store-authenticity.png",
      },
    ];

    brands.forEach((brand) => {
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
        title: "ثوب ملكي فاخر",
        description: "ثوب تقليدي بتصميم ملكي فاخر مصنوع من أجود الأقمشة",
        imageUrl:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        brandId: brandIds[0],
        tags: ["ثوب", "فاخر"],
      },
      {
        title: "مشلح تراثي أصيل",
        description: "مشلح تقليدي يجمع بين الأصالة والعراقة",
        imageUrl:
          "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        brandId: brandIds[1],
        tags: ["مشلح", "تقليدي"],
      },
      {
        title: "بشت ذهبي راقي",
        description: "بشت فاخر بتطريز ذهبي يليق بالمناسبات الخاصة",
        imageUrl:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        brandId: brandIds[2],
        tags: ["بشت", "فاخر"],
      },
      {
        title: "ثوب عصري مميز",
        description: "ثوب بتصميم عصري يناسب الشباب",
        imageUrl:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        brandId: brandIds[0],
        tags: ["ثوب", "تقليدي"],
      },
      {
        title: "مشلح ملوكي فخم",
        description: "مشلح بتصميم ملوكي فخم للمناسبات الرسمية",
        imageUrl:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        brandId: brandIds[1],
        tags: ["مشلح", "فاخر"],
      },
      {
        title: "بشت تراثي عريق",
        description: "بشت تراثي يحمل عبق الماضي الأصيل",
        imageUrl:
          "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        brandId: brandIds[2],
        tags: ["بشت", "تقليدي"],
      },
    ];

    products.forEach((product) => {
      const id = randomUUID();
      this.products.set(id, {
        id,
        ...product,
        createdAt: new Date(),
      });
    });

    // Sample gallery items
    const galleryItems = [
      {
        title: "عرض أزياء تقليدية",
        description: "عرض مميز للأزياء التقليدية",
        imageUrl:
          "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000",
      },
      {
        title: "تفاصيل التطريز التقليدي",
        description: "تفاصيل دقيقة للتطريز اليدوي",
        imageUrl:
          "https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      },
      {
        title: "إكسسوارات تقليدية",
        description: "مجموعة من الإكسسوارات التراثية",
        imageUrl:
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1200",
      },
      {
        title: "أناقة عصرية",
        description: "دمج الأصالة بالعصرية",
        imageUrl:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
      },
      {
        title: "أقمشة فاخرة",
        description: "أجود أنواع الأقمشة المستخدمة",
        imageUrl:
          "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=900",
      },
      {
        title: "فن الخط العربي",
        description: "تطريز بالخط العربي الأصيل",
        imageUrl:
          "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=700",
      },
    ];

    galleryItems.forEach((item) => {
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
    return Array.from(this.brands.values()).find(
      (brand) => brand.slug === slug,
    );
  }

  async createBrand(insertBrand: InsertBrand): Promise<Brand> {
    const id = randomUUID();
    const brand: Brand = {
      ...insertBrand,
      id,
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

  async getProductsByBrand(brandId: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.brandId === brandId,
    );
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = randomUUID();
    const product: Product = {
      ...insertProduct,
      id,
      createdAt: new Date(),
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
      ...insertItem,
      id,
      createdAt: new Date(),
    };
    this.galleryItems.set(id, item);
    return item;
  }

  async createContactMessage(
    insertMessage: InsertContactMessage,
  ): Promise<ContactMessage> {
    const id = randomUUID();
    const message: ContactMessage = {
      ...insertMessage,
      id,
      createdAt: new Date(),
    };
    this.contactMessages.set(id, message);
    return message;
  }
}

export const storage = new MemStorage();
