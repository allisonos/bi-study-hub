import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  // Repositório GitHub: allisonos/bi-study-hub
  base: '/bi-study-hub/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'icons.svg'],
      workbox: {
        // Faz cache de TUDO para funcionar offline
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json,wasm,woff,woff2}'],
        // Aumenta o limite do tamanho do arquivo no cache (10MB)
        maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,
        runtimeCaching: [
          {
            // Cache de fontes do Google
            urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 ano
              },
              cacheableResponse: { statuses: [0, 200] }
            }
          }
        ]
      },
      manifest: {
        name: 'BI Study Hub',
        short_name: 'BI Study',
        description: 'Plataforma offline de maestria em Power BI, SQL, Python e Negócios',
        theme_color: '#03050F',
        background_color: '#03050F',
        display: 'standalone',
        orientation: 'portrait-primary',
        start_url: '/bi-study-hub/',
        scope: '/bi-study-hub/',
        icons: [
          {
            src: 'favicon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any'
          },
          {
            src: 'favicon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'maskable'
          }
        ]
      }
    })
  ],
})
