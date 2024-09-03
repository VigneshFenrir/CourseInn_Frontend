import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'public/index.html'), // Ensure this points to your HTML file
      },
    },
  },
  resolve: {
    alias: {
      '/src': path.resolve(__dirname, 'src'), // Ensure this alias matches
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  server: {
    port: 3000,
  },
})
