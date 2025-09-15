import { type VercelRequest, type VercelResponse } from '@vercel/node';
import { storage } from '../server/storage';
import { insertContactMessageSchema } from '../shared/schema';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Handle both JSON and string bodies robustly
    let bodyData;
    if (typeof req.body === 'string') {
      try {
        bodyData = JSON.parse(req.body);
      } catch (parseError) {
        console.error('Failed to parse JSON body:', parseError);
        return res.status(400).json({ error: 'Invalid JSON format' });
      }
    } else if (req.body && typeof req.body === 'object') {
      bodyData = req.body;
    } else {
      return res.status(400).json({ error: 'Missing or invalid request body' });
    }

    const validatedData = insertContactMessageSchema.parse(bodyData);
    const message = await storage.createContactMessage(validatedData);
    
    // Note: In serverless environment, contact messages are stored in-memory
    // and will not persist across function invocations
    return res.status(201).json({ 
      success: true, 
      id: message.id,
      note: 'Message received successfully. Note: In serverless deployment, messages are processed but not permanently stored.'
    });
  } catch (error) {
    console.error('Error creating contact message:', error);
    if (error instanceof Error) {
      // Handle Zod validation errors specifically
      if (error.name === 'ZodError') {
        return res.status(400).json({ 
          error: 'Invalid form data', 
          details: error.message 
        });
      }
      return res.status(400).json({ error: error.message });
    } else {
      return res.status(500).json({ error: 'Failed to send message' });
    }
  }
}