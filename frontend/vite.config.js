import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Environment variables: Create .env.local with VITE_API_URL
// Example: VITE_API_URL=http://localhost:5000/api
// Note: All Vite env vars must be prefixed with VITE_
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
})
