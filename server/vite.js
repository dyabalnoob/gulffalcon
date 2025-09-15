import { createServer as viteCreateServer } from 'vite';
import path from 'path';

export async function createViteServer(app, server) {
  const vite = await viteCreateServer({
    server: {
      middlewareMode: true,
      hmr: {
        server: server,
      },
    },
    appType: 'spa',
    root: path.resolve(process.cwd(), 'client'),
    resolve: {
      alias: {
        '@': path.resolve(process.cwd()),
        '@/components': path.resolve(process.cwd(), 'components'),
        '@/lib': path.resolve(process.cwd(), 'lib'),
        '@/contexts': path.resolve(process.cwd(), 'lib/contexts'),
        '@/hooks': path.resolve(process.cwd(), 'lib/hooks'),
        '@/utils': path.resolve(process.cwd(), 'lib/utils'),
      },
    },
    build: {
      outDir: 'dist/client',
    },
  });

  return vite;
}