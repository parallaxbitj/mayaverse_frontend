import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react({
      jsxRuntime: 'automatic',
    })
  ],
  server: {
    headers: {
      // Allows browsers to issue range requests on video files in dev mode,
      // preventing ERR_CACHE_OPERATION_NOT_SUPPORTED errors.
      'Accept-Ranges': 'bytes',
      'Cache-Control': 'no-store',
    },
  },
  build: {
    rollupOptions: {
      external: [],
      output: {
        manualChunks: {
          'gsap': ['gsap'],
          'framer-motion': ['framer-motion'],
        }
      }
    },
    commonjsOptions: {
      include: [/node_modules/],
    },
    chunkSizeWarningLimit: 1000,
    minify: 'terser',
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'gsap', 'framer-motion']
  }
})
