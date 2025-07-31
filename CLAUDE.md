# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React + TypeScript application built with Vite, featuring client-side routing with React Router. The project follows a minimal setup with modern tooling for fast development and hot module replacement.

## Key Commands

### Development

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint on all files

### File Structure

The project uses a route-based architecture:

- `/src/App.tsx` - Main app component with BrowserRouter and navigation
- `/src/routes/` - Route components (Home, About, Contact)
- `/src/main.tsx` - Application entry point with React StrictMode

## Architecture

### Routing

Uses React Router v7 with `BrowserRouter` for client-side routing. Routes are defined in `App.tsx` with a simple navigation structure. New routes should be added as components in `/src/routes/` and registered in the Routes configuration.

### Build System

- **Vite** for build tooling and development server
- **TypeScript** with strict mode enabled
- **ESLint** with React Hooks and React Refresh plugins
- Modern ES2020 target with ESNext modules

### TypeScript Configuration

- Strict TypeScript settings with `noUnusedLocals` and `noUnusedParameters`
- JSX set to `react-jsx` (new JSX transform)
- Module resolution set to "bundler" for Vite compatibility

### ESLint Rules

- Custom rule: unused variables starting with capital letters or underscores are ignored
- React Hooks rules enforced
- React Refresh rules for HMR compatibility

## Theme System

### **PRIORITY: Always use semantic design tokens when styling**

This project uses a comprehensive semantic design system with Tailwind CSS. **Always prioritize semantic tokens over arbitrary values or generic Tailwind classes.**

### Styling Rules and Patterns

**CRITICAL: Follow these exact patterns for all styling:**

#### 1. Typography
- **ALWAYS use semantic typography utilities** from the `@theme` instead of combining individual classes
- Use `text-heading-lg`, `text-body-md`, `text-label-sm`, etc.
- These utilities include font-size, line-height, font-weight, and letter-spacing automatically

```tsx
// ✅ CORRECT - Semantic typography utility
<h1 className="text-heading-lg">Page Title</h1>
<p className="text-body-md">Body content</p>

// ❌ AVOID - Individual typography classes
<h1 className="text-2xl font-semibold leading-7">Page Title</h1>
```

#### 2. Border Radius & Shadows
- **ALWAYS use theme utilities** for border radius and shadows
- Use `rounded-sm`, `rounded-md`, `shadow-xs`, `shadow-lg`, etc.

```tsx
// ✅ CORRECT - Theme utilities
<div className="rounded-lg shadow-md">Card</div>

// ❌ AVOID - Arbitrary values
<div className="rounded-[6px] shadow-[0_4px_6px_-1px_rgb(0_0_0_/_0.1)]">Card</div>
```

#### 3. Colors
- **ALWAYS use Tailwind utilities with CSS variables** for colors
- Use semantic color tokens: `bg-[var(--color-background-brand)]`, `text-[var(--color-text-primary)]`
- Base color variables (grey-500, blue-200, etc.) are only for prototyping or missing semantic tokens

```tsx
// ✅ CORRECT - Semantic color tokens
<button className="bg-[var(--color-background-brand)] text-[var(--color-text-on-action)]">
  Submit
</button>

// ❌ AVOID - Generic Tailwind colors
<button className="bg-blue-500 text-white">Submit</button>

// 🔶 ACCEPTABLE - Only for prototyping or missing semantic tokens
<div className="bg-[var(--blue-200)]">Prototype element</div>
```

#### 4. Spacing & Sizing
- **ALWAYS use CSS variables with Tailwind utilities** for spacing and sizing
- Use semantic spacing tokens: `p-[var(--space-lg)]`, `m-[var(--space-md)]`, `gap-[var(--space-sm)]`
- Use semantic sizing tokens: `w-[var(--size-md)]`, `h-[var(--size-lg)]`

```tsx
// ✅ CORRECT - Semantic spacing/sizing
<div className="p-[var(--space-lg)] m-[var(--space-md)] w-[var(--size-xlg)]">
  Content
</div>

// ❌ AVOID - Arbitrary Tailwind spacing
<div className="p-6 m-4 w-48">Content</div>
```

#### 5. Borders
- **ALWAYS use CSS variables** for border colors and widths
- Use `border-[var(--color-border-input)]`, `border-[var(--border-width-sm)]`

```tsx
// ✅ CORRECT - Semantic border tokens
<input className="border border-[var(--color-border-input)] border-[var(--border-width-sm)]" />

// ❌ AVOID - Generic border classes
<input className="border border-gray-200 border-2" />
```

#### Complete Component Examples

**Button Component:**
```tsx
<button className="text-heading-sm rounded-md shadow-sm bg-[var(--color-background-brand)] text-[var(--color-text-on-action)] px-[var(--space-lg)] py-[var(--space-md)]">
  Submit
</button>
```

**Card Component:**
```tsx
<div className="bg-[var(--color-surface-primary)] border border-[var(--color-border-primary-subtle)] rounded-lg p-[var(--space-lg)] shadow-md">
  <h2 className="text-heading-md mb-[var(--space-md)]">Card Title</h2>
  <p className="text-body-md text-[var(--color-text-secondary)]">Card content</p>
</div>
```

### Available Theme Utilities

**Typography:** `text-heading-2xlg`, `text-heading-xlg`, `text-heading-lg`, `text-heading-md`, `text-heading-sm`, `text-heading-xsm`, `text-body-lg`, `text-body-medium-lg`, `text-body-strong-lg`, `text-body-md`, `text-body-medium-md`, `text-body-strong-md`, `text-body-sm`, `text-body-medium-sm`, `text-body-strong-sm`, `text-body-xsm`, `text-body-medium-xsm`, `text-body-strong-xsm`, `text-label-md`, `text-label-sm`, `text-caption-sm`, `text-caption-medium-sm`, `text-caption-strong-sm`, `text-caption-xsm`, `text-caption-medium-xsm`, `text-caption-strong-xsm`

**Border Radius:** `rounded-null`, `rounded-xsm`, `rounded-sm`, `rounded-md`, `rounded-lg`, `rounded-xlg`, `rounded-full`

**Shadows:** `shadow-xs`, `shadow-sm`, `shadow-md`, `shadow-lg`, `shadow-xl`

## Development Notes

The project structure is intentionally minimal. When adding new features:

- Place route components in `/src/routes/`
- Update navigation in `App.tsx`
- Follow the existing TypeScript and ESLint configurations
- **Always use semantic design tokens for styling**
- The build outputs to `/dist/` (ignored by ESLint)

No test framework is currently configured in this project.
