import { Router } from 'express';
import { storage } from '../lib/storage';
import { insertContactMessageSchema } from '../shared/schema';

const router = Router();

// CORS middleware for all routes
router.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  next();
});

// Brands routes
router.get('/brands', async (req, res) => {
  try {
    const brands = await storage.getBrands();
    return res.status(200).json(brands);
  } catch (error) {
    console.error('Error fetching brands:', error);
    return res.status(500).json({ error: 'Failed to fetch brands' });
  }
});

router.get('/brands/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    if (!slug || typeof slug !== 'string') {
      return res.status(400).json({ error: 'Invalid slug parameter' });
    }

    const brand = await storage.getBrandBySlug(slug);
    if (!brand) {
      return res.status(404).json({ error: 'Brand not found' });
    }

    return res.status(200).json(brand);
  } catch (error) {
    console.error('Error fetching brand:', error);
    return res.status(500).json({ error: 'Failed to fetch brand' });
  }
});

// Contact route
router.post('/contact', async (req, res) => {
  try {
    const validatedData = insertContactMessageSchema.parse(req.body);
    const message = await storage.createContactMessage(validatedData);
    return res.status(201).json({ success: true, id: message.id });
  } catch (error) {
    console.error('Error creating contact message:', error);
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    } else {
      return res.status(500).json({ error: 'Failed to send message' });
    }
  }
});

// Gallery route
router.get('/gallery', async (req, res) => {
  try {
    const items = await storage.getGalleryItems();
    return res.status(200).json(items);
  } catch (error) {
    console.error('Error fetching gallery items:', error);
    return res.status(500).json({ error: 'Failed to fetch gallery items' });
  }
});

// Products routes
router.get('/products', async (req, res) => {
  try {
    const { category, featured } = req.query;
    
    if (category && typeof category === 'string') {
      const products = await storage.getProductsByCategory(category);
      return res.status(200).json(products);
    }
    
    if (featured === 'true') {
      const products = await storage.getFeaturedProducts();
      return res.status(200).json(products);
    }
    
    const products = await storage.getProducts();
    return res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return res.status(500).json({ error: 'Failed to fetch products' });
  }
});

router.get('/products/featured', async (req, res) => {
  try {
    const products = await storage.getFeaturedProducts();
    return res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return res.status(500).json({ error: 'Failed to fetch featured products' });
  }
});

router.get('/products/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    if (!slug || typeof slug !== 'string') {
      return res.status(400).json({ error: 'Invalid slug parameter' });
    }

    const product = await storage.getProductBySlug(slug);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    return res.status(200).json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return res.status(500).json({ error: 'Failed to fetch product' });
  }
});

export default router;