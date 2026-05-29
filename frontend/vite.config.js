import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/medicamentos': 'http://localhost:3001',
      '/doses': 'http://localhost:3001',
      '/status': 'http://localhost:3001',
    }
  }
})
