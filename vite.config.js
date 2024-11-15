import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Vercel will serve files from this directory
  },
  resolve: {
    alias: {
      '/src': path.resolve(__dirname, 'src'), // Ensure this alias is correct
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  server: {
    port: 3000,
  },
})
