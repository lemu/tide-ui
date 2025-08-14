#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const componentsDir = path.join(__dirname, '../src/components/ui');

// Read all component files
const componentFiles = fs.readdirSync(componentsDir)
  .filter(file => file.endsWith('.tsx') && file !== 'custom-icons.tsx')
  .map(file => file.replace('.tsx', ''));

console.log('Found component files:', componentFiles);

// Generate exports based on actual files
let exportContent = `// Main export file for @rafal.lemieszewski/tide-ui
// This file is auto-generated - do not edit directly

`;

for (const component of componentFiles) {
  const componentPath = path.join(componentsDir, `${component}.tsx`);
  const content = fs.readFileSync(componentPath, 'utf-8');
  
  // Extract export statements
  const exportMatches = content.match(/export\s+\{[^}]+\}/g) || [];
  const exportTypes = content.match(/export\s+type\s+\{[^}]+\}/g) || [];
  
  for (const exportMatch of exportMatches) {
    const cleanedExport = exportMatch.replace(/export\s+\{/, '').replace(/\}/, '').trim();
    if (cleanedExport) {
      exportContent += `export { ${cleanedExport} } from './ui/${component}'\n`;
    }
  }
  
  for (const typeExport of exportTypes) {
    const cleanedType = typeExport.replace(/export\s+type\s+\{/, '').replace(/\}/, '').trim();
    if (cleanedType) {
      exportContent += `export type { ${cleanedType} } from './ui/${component}'\n`;
    }
  }
  
  exportContent += '\n';
}

// Add utility exports
exportContent += `// Utility exports
export { cn } from '../lib/utils'
`;

console.log('Generated exports content');
console.log(exportContent);