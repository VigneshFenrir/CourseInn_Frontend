import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build', // Set the output directory

    rollupOptions: {
      input: 'index.html', // Ensure this matches the location of your HTML file
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Adjust if you use aliases
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
})
