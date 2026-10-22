import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  optimizeDeps: {
    // Tells Vite to serve Lucide icons as modular ES imports instead of one huge file
    exclude: [
      'lucide-react',
    ]
  },
})
