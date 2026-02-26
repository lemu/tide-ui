# Tide UI

A self-contained React component library built with Tailwind CSS and Radix UI primitives. No Tailwind configuration required for consumers.

## Features

- 🎨 **Design System First** - Semantic design tokens via CSS variables
- ⚡ **Modern Stack** - React 18+, TypeScript, Tailwind CSS v4, Radix UI
- 📦 **Self-Contained** - All styles bundled, no Tailwind setup needed
- 🌲 **Tree-Shakeable** - ESM + CJS dual format with `preserveModules`
- 🔧 **TypeScript** - Full type definitions included
- 📚 **Storybook** - Interactive component documentation
- ♿ **Accessible** - Built on Radix UI primitives

## Installation

```bash
npm install @rafal.lemieszewski/tide-ui
```

**Required Peer Dependencies:** React 18+

```bash
npm install react@>=18.0.0 react-dom@>=18.0.0
```

**Optional Peer Dependencies:** Only install the packages needed by the components you use.

| Package | Components |
|---|---|
| `recharts` | Chart, LinkedChart |
| `@tanstack/react-table`, `@tanstack/react-virtual` | DataTable |
| `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities` | Sortable DataTable rows |
| `react-hook-form`, `@hookform/resolvers`, `zod` | FormField |
| `react-day-picker` | Calendar, DatePicker |
| `cmdk` | Command, AutocompleteSearch |
| `vaul` | Drawer |
| `react-resizable-panels` | ResizablePanel |
| `country-data-list` | CountryDropdown |

## Quick Start

```typescript
import '@rafal.lemieszewski/tide-ui/styles'
import { Button, Card, CardContent, Badge } from '@rafal.lemieszewski/tide-ui'

function App() {
  return (
    <Card>
      <CardContent>
        <Button>Get Started</Button>
        <Badge intent="success">Ready</Badge>
      </CardContent>
    </Card>
  )
}
```

## Customization

### CSS Variables

```css
:root {
  --color-background-brand: #your-color;
  --color-text-primary: #your-color;
}
```

### className Prop

```tsx
<Button className="custom-class">Button</Button>
```

### Tailwind Utilities (Optional)

If your app has Tailwind installed, use utilities with `!` prefix:

```tsx
<Button className="!bg-purple-500">Button</Button>
```

## Design Tokens

```typescript
import { designTokens } from '@rafal.lemieszewski/tide-ui'

const styles = {
  backgroundColor: designTokens.colors.backgroundBrand,
  padding: designTokens.spacing.m,
}
```

## Documentation

- **Storybook:** https://tide-ui-storybook.vercel.app
- **Repository:** https://github.com/lemu/tide-ui
- **NPM:** https://www.npmjs.com/package/@rafal.lemieszewski/tide-ui

## License

MIT
