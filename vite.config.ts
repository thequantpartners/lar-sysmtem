import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';

function inlineCss(): Plugin {
  return {
    name: 'inline-css',
    enforce: 'post',
    transformIndexHtml(html, { bundle }) {
      if (!bundle) return html;
      let newHtml = html;
      for (const [fileName, file] of Object.entries(bundle)) {
        if (fileName.endsWith('.css') && file.type === 'asset' && typeof file.source === 'string') {
          // Replace link tag with style tag
          const linkRegex = new RegExp(`<link[^>]*rel=["']stylesheet["'][^>]*href=["'](?:/assets/|/)?${fileName.replace(/.*[\/\\]/, '')}["'][^>]*>`, 'i');
          const genericLinkRegex = new RegExp(`<link[^>]*href=["'][^"']*${fileName.replace(/.*[\/\\]/, '')}["'][^>]*>`, 'i');
          
          if (linkRegex.test(newHtml)) {
            newHtml = newHtml.replace(linkRegex, `<style>${file.source}</style>`);
          } else if (genericLinkRegex.test(newHtml)) {
            newHtml = newHtml.replace(genericLinkRegex, `<style>${file.source}</style>`);
          } else {
            newHtml = newHtml.replace('</head>', `<style>${file.source}</style></head>`);
          }
        }
      }
      return newHtml;
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), inlineCss()],
  build: {
    target: 'esnext',
    minify: 'esbuild',
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-framer': ['framer-motion'],
          'vendor-icons': ['lucide-react'],
        },
      },
    },
  },
});


