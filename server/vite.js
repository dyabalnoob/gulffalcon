import { createServer as viteCreateServer } from 'vite';

export async function createViteServer(app, server) {
  const vite = await viteCreateServer({
    server: {
      middlewareMode: true,
      hmr: {
        server: server,
      },
    },
    appType: 'spa',
    root: process.cwd(),
    build: {
      outDir: 'dist/client',
    },
  });

  return vite;
}