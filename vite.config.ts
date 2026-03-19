import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Custom plugin to serve /api/google-photos during local dev
function googlePhotosDevPlugin() {
  return {
    name: 'google-photos-dev',
    configureServer(server: any) {
      server.middlewares.use('/api/google-photos', async (_req: any, res: any) => {
        try {
          const { fetchImageUrls } = await import('google-photos-album-image-url-fetch');
          const urls = await fetchImageUrls('https://photos.app.goo.gl/wH5EmznKKVQtVVim8');
          const images = urls.map((obj: any, i: number) => ({
            id: `gp-${i}`,
            data: obj.url,
            caption: '',
            category: 'gallery'
          }));
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(images));
        } catch (err) {
          console.error('Google Photos fetch error:', err);
          res.statusCode = 500;
          res.end(JSON.stringify({ error: 'Failed to fetch album' }));
        }
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), googlePhotosDevPlugin()],
})
