import { type VercelRequest, type VercelResponse } from '@vercel/node';
import { storage } from '../../server/storage';

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
    const { slug } = req.query;
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
}