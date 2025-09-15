import { storage } from '../../../server/storage'

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const brands = await storage.getBrands()
    return res.status(200).json(brands)
  } catch (error) {
    console.error('Error fetching brands:', error)
    return res.status(500).json({ error: 'Failed to fetch brands' })
  }
}