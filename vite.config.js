import { defineConfig } from 'vite';
import { resolve } from 'path';

// Multi-page Vite setup. Each nav item is its own HTML entry point.
export default defineConfig({
  root: '.',
  publicDir: 'public',
  build: {
    target: 'es2020',
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        modules: resolve(__dirname, 'modules.html'),
        whitelabel: resolve(__dirname, 'white-label.html'),
        security: resolve(__dirname, 'security.html'),
        integrations: resolve(__dirname, 'integrations.html'),
        pricing: resolve(__dirname, 'pricing.html'),
        contact: resolve(__dirname, 'contact.html'),
      },
    },
  },
  server: {
    host: true,
    port: 5173,
  },
});
