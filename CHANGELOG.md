# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [v0.1.1] - 2025-01-15

### Added
- ✅ Fixed CSS generation for external projects
- ✅ Added proper CSS extraction in library build
- ✅ Included complete design system variables (116.75 kB CSS)
- ✅ Enhanced Button component with comprehensive Storybook stories
- ✅ Added support for all button variants: default, primary, destructive, success, ghost
- ✅ Added icon support with left/right positioning and icon-only buttons
- ✅ Added loading states and disabled states for all button variants
- ✅ Added dropdown button functionality
- ✅ Improved Inter font support in Storybook
- ✅ Added all semantic design tokens and CSS variables

### Fixed
- 🐛 Library now properly exports CSS file at `@rafal.lemieszewski/tide-ui/styles`
- 🐛 External projects can now access all design system variables
- 🐛 Button stories now include all missing variants and states
- 🐛 Corrected button variant names (destructive instead of danger)

### Technical
- 🔧 Updated Vite build configuration to extract CSS
- 🔧 Created `src/lib/index.ts` entry point with CSS import
- 🔧 Added `cssCodeSplit: false` for proper CSS bundling
- 🔧 Enhanced Storybook configuration with Google Fonts integration

## [v0.1.0] - 2025-01-14

### Added
- 🎉 Initial release of Tide UI component library
- 📦 Complete set of React components with TypeScript support
- 🎨 Comprehensive design system with semantic tokens
- ♿ Accessible components built with Radix UI primitives
- 📚 Storybook documentation and component playground
- 🔧 Modern build system with Vite and Tailwind CSS v4

### Components Included
- **Layout**: Card, Separator, Sheet, Sidebar, AppFrame
- **Navigation**: Breadcrumb, Pagination, Tabs
- **Form Controls**: Button, Input, Textarea, Select, Checkbox, Radio Group, Switch
- **Data Display**: Badge, Avatar, Table, Skeleton, CountryDropdown
- **Feedback**: Alert, Toast, Dialog, Hover Card, DropDrawer
- **Overlays**: Dropdown Menu, Popover, Tooltip, Command
- **Charts**: Chart, LinkedChart with Recharts integration
- **Form Management**: Form components with react-hook-form integration

[v0.1.1]: https://github.com/rafal-lemieszewski/tide-ui/compare/v0.1.0...v0.1.1
[v0.1.0]: https://github.com/rafal-lemieszewski/tide-ui/releases/tag/v0.1.0