import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html', // Ensure this matches your HTML file's path
      },
    },
  },
  resolve: {
    alias: {
      '/src': path.resolve(__dirname, 'src'), // Ensure this alias matches your file structure
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  server: {
    port: 3000,
  },
})
