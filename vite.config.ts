import { execSync } from 'node:child_process'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

const getBuildNumber = () => {
  try {
    return execSync('git rev-list --count HEAD').toString().trim()
  } catch (error) {
    console.warn('Unable to read git commit count.', error)
    return '0'
  }
}

const buildNumber = getBuildNumber()

export default defineConfig({
  base: '/hanzi-journey/',
  define: {
    __BUILD_NUMBER__: JSON.stringify(buildNumber)
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'icons/icon.svg',
        'icons/icon-192.png',
        'icons/icon-512.png',
        'icons/maskable-512.png',
        'icons/apple-touch-icon.png'
      ],
      manifest: {
        name: 'Hanzi Journey',
        short_name: 'Hanzi Journey',
        description: 'Learn Hanzi with flashcards and mnemonics.',
        theme_color: '#0f172a',
        background_color: '#0f172a',
        display: 'standalone',
        start_url: '/hanzi-journey/',
        scope: '/hanzi-journey/',
        icons: [
          {
            src: 'icons/icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'icons/maskable-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          },
          {
            src: 'icons/icon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any'
          }
        ]
      },
      workbox: {
        navigateFallback: '/hanzi-journey/index.html',
        runtimeCaching: [
          {
            urlPattern:
              /^https:\/\/5ecvq3d6ri\.execute-api\.eu-west-2\.amazonaws\.com\/api\/sheet\/hanzi\/hero$/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'hanzi-api',
              networkTimeoutSeconds: 4,
              expiration: {
                maxEntries: 1,
                maxAgeSeconds: 60 * 60 * 24 * 7
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      }
    })
  ],
  server: {
    proxy: {
      '/api/hanzi': {
        target:
          'https://5ecvq3d6ri.execute-api.eu-west-2.amazonaws.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/hanzi/, '/api/sheet/hanzi/hero')
      }
    }
  }
})

