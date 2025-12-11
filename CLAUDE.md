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

### Library Distribution Model

**Self-Contained Library**: This library is designed to work without requiring consumers to install or configure Tailwind CSS.

**Key Architecture Decisions:**
- **Tailwind CSS** is a `devDependency` (build-time only, not shipped to consumers)
- All Tailwind styles are compiled and bundled into `dist/style.css` during build
- Consumers only need to import: `import '@rafal.lemieszewski/tide-ui/styles'`
- No Tailwind configuration required in consumer applications

**Consumer Flexibility:**
- **Apps without Tailwind**: Works immediately, no additional setup
- **Apps with Tailwind**: Can use Tailwind utilities to override component styles via `className` prop
- **All apps**: Can override design tokens via CSS variables or custom CSS

**Build Output:**
- `dist/style.css` - Complete compiled CSS including all design tokens, base styles, and Tailwind utilities
- `dist/index.es.js` - ESM bundle
- `dist/index.cjs.js` - CommonJS bundle
- `dist/**/*.d.ts` - TypeScript type definitions

**Override Methods Available to Consumers:**
1. CSS Variables: `--color-background-brand`, `--color-text-primary`, etc.
2. className prop: Pass custom classes to any component
3. Tailwind utilities: Use `!bg-purple-500` syntax (if consumer has Tailwind)
4. Regular CSS: Target components with custom CSS rules

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
  <p className="text-body-md text-[var(--color-text-secondary)]">
    Card content
  </p>
</div>
```

### Available Theme Utilities

**Typography:** `text-heading-2xlg`, `text-heading-xlg`, `text-heading-lg`, `text-heading-md`, `text-heading-sm`, `text-heading-xsm`, `text-body-lg`, `text-body-medium-lg`, `text-body-strong-lg`, `text-body-md`, `text-body-medium-md`, `text-body-strong-md`, `text-body-sm`, `text-body-medium-sm`, `text-body-strong-sm`, `text-body-xsm`, `text-body-medium-xsm`, `text-body-strong-xsm`, `text-label-md`, `text-label-sm`, `text-caption-sm`, `text-caption-medium-sm`, `text-caption-strong-sm`, `text-caption-xsm`, `text-caption-medium-xsm`, `text-caption-strong-xsm`

**Border Radius:** `rounded-null`, `rounded-xsm`, `rounded-sm`, `rounded-md`, `rounded-lg`, `rounded-xlg`, `rounded-full`

**Shadows:** `shadow-xs`, `shadow-sm`, `shadow-md`, `shadow-lg`, `shadow-xl`

## Button Variants

**IMPORTANT**: Our design system does NOT include an "outline" or "link" button variant. Available button variants are:

- `primary` - Primary CTA button with brand background (use for main actions like "Save", "Create", "Submit")
- `default` - Default button with neutral background and border
- `destructive` - Destructive actions with red background (use for "Delete", "Remove")
- `success` - Success actions with green background
- `ghost` - Transparent button with hover effects (use for tertiary actions like "Cancel")

**Button hierarchy for dialogs:**

- Primary action: `variant="primary"` (e.g., "Save", "Create", "Confirm")
- Secondary action: `variant="default"` (e.g., "Cancel", "Close")

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

### Component Export Requirements

**CRITICAL: Components in "NPM • Fundamental" or "NPM • Product Components" Storybook sections MUST be exported from the library.**

When a component is added to or moved to these Storybook sections, it signals that the component is production-ready and should be available to NPM consumers.

**Export Pattern:**

```typescript
// ComponentName component
export { ComponentName, relatedUtility } from './path/component-name'
export type { ComponentNameProps, RelatedType } from './path/component-name'
```

**Rules:**

1. **Storybook Title Indicates Export Status**: Components with titles starting with "NPM • Fundamental" or "NPM • Product Components" must be exported from `/src/components/index.ts`
2. **In-Progress Components**: Components in `/src/components/in-progress/` are intentionally not exported until they are production-ready and moved to appropriate Storybook sections
3. **Complete Exports**: Export both the component and all related types, utilities, and hooks that consumers need
4. **Verification**: After adding exports, verify with `npm run build:lib` to ensure no TypeScript errors

### Component Best Practices

- **Minimal overrides needed**: Base components should work well without extensive className overrides
- **Semantic defaults**: Use design tokens and semantic typography as defaults
- **Accessibility first**: Follow ARIA guidelines and keyboard navigation standards
- **TypeScript safety**: Export all component props and variants as types
- **Storybook coverage**: Document all variants, states, and usage examples

### **CRITICAL: Storybook Stories - No Custom Styling**

**Storybook stories should demonstrate components as they are, without custom styling or className overrides.**

#### Rules:

1. **NO className overrides on components** - If you need to customize a component's appearance in a story, the component itself needs to support that variation through props (variants, sizes, etc.)
2. **NO custom styling wrappers** - Minimize layout wrappers with custom flex/grid/spacing classes
3. **Use component APIs only** - Demonstrate components using their built-in props, variants, and sizes
4. **If styling is needed, it belongs in the component** - Custom styles in stories indicate missing component features

#### Examples:

```tsx
// ❌ WRONG - Custom styling in story
<Separator type="line" layout="horizontal" className="h-[var(--size-md)]" />

// ✅ CORRECT - Use component props
<Separator type="line" layout="horizontal" size="md" />
// (If size prop doesn't exist, add it to the component!)
```

```tsx
// ❌ WRONG - Custom layout wrapper
<div className="flex gap-[var(--space-md)] items-center">
  <Bookmarks {...props} />
  <Separator {...props} />
  <Filters {...props} />
</div>

// ✅ CORRECT - Minimal wrapper or create a layout component
<BookmarksWithFilters {...props} />
// (Or accept minimal wrappers ONLY for story demonstration, never for styling overrides)
```

**The goal**: Stories should showcase components exactly as consumers would use them, relying entirely on the component's API.

No test framework is currently configured in this project.

## NPM Publishing

### **CRITICAL: Manual Publishing Process (Current Approach)**

**Due to npm security changes in December 2025, automated publishing is currently not working. Use manual publishing with 2FA.**

**Whenever the user mentions publishing to NPM, ALWAYS follow this exact process:**

1. **Check Current Version**: Read `package.json` to see the current version
2. **Propose Version Bump**: Suggest the appropriate semantic version increment:
   - **Patch** (x.x.X): Bug fixes, small improvements, dependency updates
   - **Minor** (x.X.x): New features, component additions, non-breaking API changes
   - **Major** (X.x.x): Breaking changes, API changes, major refactors

3. **Version Justification**: Explain why the proposed version is appropriate based on recent changes

4. **Manual Publishing Process**:

   ```bash
   # 1. Build the library
   npm run build:lib

   # 2. Create version tag
   npm version [patch|minor|major]

   # 3. Push to GitHub (triggers CI workflow for quality assurance)
   git push && git push --tags

   # 4. Login to npm interactively (creates 2-hour session)
   npm login

   # 5. Publish with OTP from authenticator app
   npm publish --access public --otp=YOUR_6_DIGIT_CODE
   ```

   **Important**: OTP codes expire every 30 seconds, so have your authenticator app ready.

5. **What the GitHub Workflows Do**:
   - **CI Workflow** (on push to main): Runs linting and library build for quality assurance
   - **Release Workflow** (on tag push): Currently builds library and creates GitHub release (publishing step disabled)
   - **Storybook**: Automatically deployed to Vercel on every push (no GitHub Actions needed)

6. **Verification**: After publishing, verify:
   - NPM Package: https://www.npmjs.com/package/@rafal.lemieszewski/tide-ui
   - GitHub Release: https://github.com/lemu/tide-ui/releases

**Example Response Format:**
"I recommend bumping to version **X.X.X** (patch/minor/major) because [reason]. This accounts for [list recent changes]. Ready to create the version tag? You'll need to publish manually with `npm publish --access public --otp=YOUR_CODE` after running `npm login`."

### Why Automated Publishing Doesn't Work

As of December 2025, npm's security changes have made automated publishing unreliable:
- **Granular tokens with bypass 2FA**: npm rejects them as "automation tokens" despite being configured correctly
- **OIDC trusted publishing**: Returns 404 errors even with proper configuration
- **Manual publishing with OTP**: ✅ Works reliably

This is likely due to bugs or policy changes in npm's new authentication system. Manual publishing is the current recommended approach until npm resolves these issues.
