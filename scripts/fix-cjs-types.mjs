import { copyFileSync, readdirSync, readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

// 1. Add .js extensions to relative imports in .d.ts files for node16 resolution
function fixDtsExtensions(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name)
    if (entry.isDirectory()) {
      fixDtsExtensions(fullPath)
    } else if (entry.name.endsWith('.d.ts') || entry.name.endsWith('.d.cts')) {
      let content = readFileSync(fullPath, 'utf8')
      // Match relative from imports: from './foo' or from '../foo'
      // but not those already ending with .js/.cjs/.json/.css
      let updated = content.replace(
        /(from\s+['"])(\.\.?\/[^'"]+)(?<!\.(js|cjs|json|css))(['"])/g,
        '$1$2.js$4'
      )
      // Match import() type expressions: import('./foo')
      updated = updated.replace(
        /(import\(['"])(\.\.?\/[^'"]+)(?<!\.(js|cjs|json|css))(['"]\))/g,
        '$1$2.js$4'
      )
      if (updated !== content) {
        writeFileSync(fullPath, updated)
      }
    }
  }
}

fixDtsExtensions('dist/types')

// 2. Copy ESM types as CJS types
copyFileSync('dist/types/lib/index.d.ts', 'dist/types/lib/index.d.cts')
