import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve, isAbsolute } from 'path'
import dts from 'vite-plugin-dts'
import tailwindcss from '@tailwindcss/vite'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    dts({
      include: ['src/components/**/*', 'src/lib/**/*'],
      exclude: ['src/stories/**/*', 'src/components/previews/**/*'],
      insertTypesEntry: true,
      outDir: 'dist/types',
    }),
    process.env.ANALYZE && visualizer({ open: true, filename: 'bundle-stats.html', gzipSize: true }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  build: {
    lib: {
      entry: [
        resolve(__dirname, 'src/lib/index.ts'),
        // Subpath entries for components with optional peer deps
        resolve(__dirname, 'src/components/fundamental/chart.tsx'),
        resolve(__dirname, 'src/components/fundamental/calendar.tsx'),
        resolve(__dirname, 'src/components/fundamental/date-picker.tsx'),
        resolve(__dirname, 'src/components/fundamental/country-dropdown.tsx'),
        resolve(__dirname, 'src/components/fundamental/resizable.tsx'),
        resolve(__dirname, 'src/components/product/data-table.tsx'),
        resolve(__dirname, 'src/components/product/filters.tsx'),
        resolve(__dirname, 'src/components/product/bookmarks.tsx'),
        resolve(__dirname, 'src/components/product/linked-chart.tsx'),
      ],
      name: 'TideUI',
    },
    rollupOptions: {
      treeshake: {
        moduleSideEffects: (id) => id.endsWith('.css'),
        propertyReadSideEffects: false,
      },
      external: (id) => !id.startsWith('.') && !id.startsWith('@/') && !isAbsolute(id),
      output: [
        {
          format: 'es',
          preserveModules: true,
          preserveModulesRoot: 'src',
          entryFileNames: '[name].js',
          dir: 'dist/es',
          assetFileNames: (assetInfo) =>
            assetInfo.name?.endsWith('.css') ? 'style.css' : (assetInfo.name ?? 'asset'),
        },
        {
          format: 'cjs',
          preserveModules: true,
          preserveModulesRoot: 'src',
          entryFileNames: '[name].cjs',
          dir: 'dist/cjs',
          exports: 'named',
        },
      ],
    },
    sourcemap: 'hidden',
    emptyOutDir: true,
    cssCodeSplit: false,
  },
})
