import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  base: '/larpwalletvibe/',
  plugins: [react(), tailwindcss(), VitePWA({
    registerType: 'autoUpdate',
    manifest: {
      name: 'LarpWallet', short_name: 'LarpWallet', description: 'A fictional local wallet simulator',
      theme_color: '#10120f', background_color: '#10120f', display: 'standalone', start_url: '/larpwalletvibe/', scope: '/larpwalletvibe/',
      icons: [{ src: '/larpwalletvibe/pwa-192.svg', sizes: '192x192', type: 'image/svg+xml' }, { src: '/larpwalletvibe/pwa-512.svg', sizes: '512x512', type: 'image/svg+xml' }],
    },
  })],
})
