import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { fileURLToPath } from 'node:url'
import dts from 'vite-plugin-dts'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    dts({
      include: ['src/components/**/*', 'src/lib/**/*'],
      exclude: ['src/stories/**/*', 'src/components/previews/**/*'],
      insertTypesEntry: true,
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/lib/index.ts'),
      name: 'TideUI',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      // Externalize React, React-DOM, and icon library to avoid bundling them
      external: ['react', 'react-dom', 'react/jsx-runtime', 'lucide-react'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsx',
        },
        // Ensure CSS is extracted to a separate file
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) {
            return 'style.css'
          }
          return assetInfo.name || 'asset'
        },
      },
    },
    sourcemap: true,
    // Clear the dist directory before building
    emptyOutDir: true,
    // Extract CSS to separate file
    cssCodeSplit: false,
  },
})