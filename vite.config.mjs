import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import autoprefixer from 'autoprefixer'

export default defineConfig(({ mode }) => {
  // Load environment variables
  const env = loadEnv(mode, process.cwd(), '')
  process.env = { ...process.env, ...env }

  return {
    base: './',
    build: {
      outDir: 'build',
      rollupOptions: {
        input: {
          main: 'index.html', // Default entry point
          // Additional entries if needed
        },
      },
    },
    css: {
      postcss: {
        plugins: [
          autoprefixer({}), // Configure as needed
        ],
      },
    },
    define: {
      'process.env': process.env,
    },
    esbuild: {
      loader: 'jsx',
      include: /src\/.*\.jsx?$/,
    },
    optimizeDeps: {
      include: [
        // Add specific dependencies to include
      ],
    },
    plugins: [react()],
    resolve: {
      alias: [
        {
          find: 'src/',
          replacement: `${path.resolve(__dirname, 'src')}/`,
        },
      ],
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.scss'],
    },
    server: {
      port: 3000,
      proxy: {
        // Configure proxy if needed
      },
    },
  }
})
