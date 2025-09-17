# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Tide UI** is a React + TypeScript component library built with Vite and published to NPM. It provides a comprehensive set of UI components with semantic design tokens, built on top of Radix UI primitives and styled with Tailwind CSS.

## Key Commands

### Library Development

- `npm run dev` - Start Storybook development server for component development
- `npm run build:lib` - Build the library for production (generates `/dist/`)
- `npm run storybook` - Start Storybook server for component documentation
- `npm run lint` - Run ESLint on all library files

### Library Structure

The library follows a clean component architecture:

- `/src/components/ui/` - Core UI component implementations
- `/src/components/index.ts` - Main library export file
- `/src/lib/` - Utility functions and shared logic
- `/src/stories/` - Storybook documentation for components
- `/dist/` - Built library output (npm package contents)

## Architecture

### Component Library Structure

- **Component Exports**: All components are exported from `/src/components/index.ts`
- **Design Tokens**: Comprehensive semantic token system via CSS variables
- **Storybook Documentation**: All components have corresponding `.stories.tsx` files
- **TypeScript**: Full type safety with exported type definitions

### Build System

- **Vite** for library bundling with dual format output (ESM + CJS)
- **TypeScript** with strict mode and declaration file generation
- **Storybook** for component development and documentation
- **ESLint** with React component library best practices
- **Dual output**: ESM (`index.es.js`) and CommonJS (`index.cjs.js`) builds

### TypeScript Configuration

- Strict TypeScript settings optimized for library development
- Declaration file generation for npm package consumers
- Path mapping for clean imports during development
- Module resolution set to "bundler" for Vite compatibility

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

## Button Variants

**IMPORTANT**: Our design system does NOT include an "outline" button variant. Available button variants are:
- `default` - Primary button with brand background
- `secondary` - Secondary button styling  
- `ghost` - Transparent button with hover effects
- `link` - Link-styled button

**Always use `ghost` variant instead of non-existent `outline` variant.**

## Component Development Process

### **CRITICAL: Requirements Gathering for New Components**

**Before implementing any new component or functionality, ALWAYS ask clarifying questions to ensure complete understanding of requirements:**

#### Required Clarification Areas:
1. **Functional Requirements:**
   - What is the primary purpose and use case?
   - What props/API should the component expose?
   - What are the expected behaviors and interactions?
   - Are there any specific accessibility requirements?

2. **Design Requirements:**
   - What variants/sizes should be supported?
   - What states need to be handled (hover, active, disabled, loading, etc.)?
   - Should it integrate with existing design tokens?
   - Any specific styling or layout constraints?

3. **Technical Requirements:**
   - Should it be a controlled or uncontrolled component?
   - What TypeScript types are needed?
   - Any performance considerations?
   - Integration requirements with other components?

4. **Library Integration:**
   - Should it be exported from the main library index?
   - What TypeScript types need to be exported?
   - Should it have a corresponding Storybook story?
   - How does it fit with existing component patterns?

**Never proceed with implementation until you have clarity on these aspects.**

## Library Development Guidelines

### Adding New Components

When adding new components to the library:

1. **Create component file** in `/src/components/ui/[component-name].tsx`
2. **Export from main index** in `/src/components/index.ts`
3. **Create Storybook story** in `/src/stories/[ComponentName].stories.tsx`
4. **Follow existing patterns** for styling, TypeScript, and component structure
5. **Use semantic design tokens** consistently throughout
6. **Build and test** with `npm run build:lib` before committing

### Component Best Practices

- **Minimal overrides needed**: Base components should work well without extensive className overrides
- **Semantic defaults**: Use design tokens and semantic typography as defaults
- **Accessibility first**: Follow ARIA guidelines and keyboard navigation standards  
- **TypeScript safety**: Export all component props and variants as types
- **Storybook coverage**: Document all variants, states, and usage examples

No test framework is currently configured in this project.

## NPM Publishing

### **CRITICAL: Automated Tag-Based Publishing Process**

**Whenever the user mentions publishing to NPM, ALWAYS follow this exact process:**

1. **Check Current Version**: Read `package.json` to see the current version
2. **Propose Version Bump**: Suggest the appropriate semantic version increment:
   - **Patch** (x.x.X): Bug fixes, small improvements, dependency updates
   - **Minor** (x.X.x): New features, component additions, non-breaking API changes
   - **Major** (X.x.x): Breaking changes, API changes, major refactors

3. **Version Justification**: Explain why the proposed version is appropriate based on recent changes

4. **Automated Publishing Process**:
   ```bash
   # 1. User controls versioning (creates commit + tag)
   npm version [patch|minor|major]

   # 2. Push commits (triggers CI workflow - lint + build only)
   git push

   # 3. Push tags (triggers Release workflow - build + publish to NPM + GitHub release)
   git push --tags
   ```

5. **What the GitHub Workflows Do**:
   - **CI Workflow** (on push to main): Runs linting and library build for quality assurance
   - **Release Workflow** (on tag push): Automatically builds library, publishes to NPM, and creates GitHub release
   - **Storybook**: Automatically deployed to Vercel on every push (no GitHub Actions needed)

6. **Verification**: After tag push, monitor:
   - GitHub Actions: https://github.com/lemu/tide-ui/actions
   - NPM Package: https://www.npmjs.com/package/@rafal.lemieszewski/tide-ui

**Example Response Format:**
"I recommend bumping to version **X.X.X** (patch/minor/major) because [reason]. This accounts for [list recent changes]. Should I proceed with version X.X.X and trigger the automated publishing workflow?"

**IMPORTANT**: Never manually run `npm publish` - the GitHub workflow handles all publishing automatically using the NPM automation token.
