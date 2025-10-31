# Tide UI

A comprehensive React component library built with Tailwind CSS and Radix UI primitives, designed for internal company use with a focus on design consistency and developer experience.

## Features

- 🎨 **Design System First** - Built with semantic design tokens and CSS variables
- ⚡ **Modern Stack** - React 18+, TypeScript, Tailwind CSS v4, Radix UI primitives  
- 📦 **Tree Shakeable** - Import only the components you need
- 🔧 **Developer Experience** - Full TypeScript support with comprehensive type definitions
- 📚 **Interactive Documentation** - Storybook playground for all components
- ♿ **Accessible** - Built on Radix UI primitives with accessibility in mind

## Installation

```bash
npm install @rafal.lemieszewski/tide-ui
```

### Peer Dependencies

Make sure you have React 18+ installed:

```bash
npm install react@>=18.0.0 react-dom@>=18.0.0
```

## Quick Start

Import the CSS styles and components:

```typescript
import '@rafal.lemieszewski/tide-ui/styles'
import { Button, Card, CardContent, Badge } from '@rafal.lemieszewski/tide-ui'

function App() {
  return (
    <Card>
      <CardContent>
        <div className="flex items-center gap-4">
          <Button>Get Started</Button>
          <Badge intent="success">v0.1.0</Badge>
        </div>
      </CardContent>
    </Card>
  )
}
```

## Styling & Customization

### CSS Variables

Override design tokens by customizing CSS variables:

```css
:root {
  --color-background-brand: #your-color;
  --color-text-primary: #your-color;
  /* See src/index.css for all available variables */
}
```

### className Prop

All components accept a `className` prop for custom styling:

```tsx
import { Button } from '@rafal.lemieszewski/tide-ui'

// Using custom CSS classes
<Button className="my-custom-class">Custom Button</Button>

// Using inline styles
<Button style={{ backgroundColor: 'purple' }}>Purple Button</Button>
```

### Tailwind Utility Classes

**For apps with Tailwind CSS installed:** You can use Tailwind utility classes to override component styles. Use the `!` prefix for guaranteed specificity:

```tsx
// Override background color
<Button className="!bg-purple-500 !hover:bg-purple-600">
  Purple Button
</Button>

// Override spacing
<Card className="!p-8 !rounded-xl">
  Custom Card
</Card>
```

**Note:** Tailwind is not required. The library includes all necessary styles out-of-the-box.

## Available Components

### Core Components

- **Button** - Versatile button component with multiple variants
- **Badge** - Status indicators with intent-based styling
- **Card** - Container component for content organization  
- **Input** - Form input with consistent styling
- **Label** - Accessible form labels
- **Switch** - Toggle switch component
- **Tabs** - Tab navigation with multiple sizes
- **Toggle** - Toggle button component

### Design Tokens

Access design tokens for consistent theming:

```typescript
import { designTokens } from '@rafal.lemieszewski/tide-ui'

// Use design tokens in your components
const customStyles = {
  backgroundColor: designTokens.colors.backgroundBrand,
  padding: designTokens.spacing.md,
  borderRadius: designTokens.sizing.sm,
}
```

## Development

This library is built using:

- **Vite** - Fast build tool and development server
- **Storybook** - Component documentation and playground
- **TypeScript** - Type safety and better DX
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Headless UI components

### Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run storybook        # Start Storybook

# Building  
npm run build:lib        # Build library for npm
npm run build-storybook  # Build Storybook for deployment

# Quality
npm run lint             # Run ESLint
```

## Documentation

- **Storybook**: [Component playground and documentation](https://tide-ui-storybook.vercel.app)
- **Repository**: [GitHub repository](https://github.com/rafal-lemieszewski/tide-ui)

## Browser Support

Tide UI supports all modern browsers:

- Chrome (latest)
- Firefox (latest) 
- Safari (latest)
- Edge (latest)

## License

MIT License - see [LICENSE](LICENSE) for details.

## Contributing

This is an internal library. For bugs and feature requests, please create an issue in the repository.

---

Built with ❤️ for internal company projects.
