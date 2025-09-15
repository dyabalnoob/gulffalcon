import express from 'express';
import { createServer } from 'http';
import path from 'path';
import { createViteServer } from './vite.js';
import routes from './routes.js';

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Middleware
  app.use(express.json());

  // API routes
  app.use('/api', routes);

  // Create Vite server in development
  if (process.env.NODE_ENV === 'development') {
    const vite = await createViteServer(app, server);
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static('dist/client'));
    
    // Handle client-side routing
    app.get('*', (req, res) => {
      res.sendFile(path.resolve('dist/client/index.html'));
    });
  }

  const PORT = process.env.PORT || 5000;
  
  server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Error starting server:', err);
  process.exit(1);
});