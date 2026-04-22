import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // GitHub Pages は '/todo/'、Vercel等は '/' (デフォルト)
  base: process.env.VITE_BASE_URL ?? '/',
})
