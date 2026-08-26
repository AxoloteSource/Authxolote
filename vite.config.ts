import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import laravel from 'laravel-vite-plugin'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    laravel({
      input: ['resources/js/main.tsx'],
      refresh: [
        'resources/views/**',
        'routes/**',
      ]
    }),
    react(),
    tailwindcss()
  ],
  server: {
    watch: {
      ignored: [
          '**/storage/**',
          'app/**'
      ],
      usePolling: true,
    }
  },
  esbuild: {
    jsx: 'automatic'
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'resources/js'),
      'ziggy-js': resolve(__dirname, 'vendor/tightenco/ziggy')
    }
  }
})
