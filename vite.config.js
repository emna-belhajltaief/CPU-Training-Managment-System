import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@src': '/src',
      '@Components': '/src/Components',
      '@routes': '/routes',
      '@data': '/data',
      '@hooks': '/hooks',
    }
  }
})
