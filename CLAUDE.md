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

## Development Notes

The project structure is intentionally minimal. When adding new features:
- Place route components in `/src/routes/`
- Update navigation in `App.tsx` 
- Follow the existing TypeScript and ESLint configurations
- The build outputs to `/dist/` (ignored by ESLint)

No test framework is currently configured in this project.