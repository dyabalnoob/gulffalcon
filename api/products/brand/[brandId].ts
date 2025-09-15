import { type VercelRequest, type VercelResponse } from '@vercel/node';
import { storage } from '../../../server/storage';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { brandId } = req.query;
    if (!brandId || typeof brandId !== 'string') {
      return res.status(400).json({ error: 'Invalid brandId parameter' });
    }

    const products = await storage.getProductsByBrand(brandId);
    return res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products for brand:', error);
    return res.status(500).json({ error: 'Failed to fetch products for brand' });
  }
}