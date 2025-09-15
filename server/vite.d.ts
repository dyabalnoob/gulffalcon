import type { Application } from 'express';
import type { Server } from 'http';
import type { ViteDevServer } from 'vite';

export function createViteServer(app: Application, server: Server): Promise<ViteDevServer>;