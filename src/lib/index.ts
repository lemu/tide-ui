// Import CSS styles to include them in the build
// @ts-ignore - CSS import handled by build system
import '../index.css'

// Export core components (excludes components requiring optional peer deps)
// Components with optional deps are available via subpath imports:
//   @rafal.lemieszewski/tide-ui/chart, /calendar, /date-picker, etc.
export * from '../components/core-index'

// Export utility hooks
export * from './hooks'

// Export date utilities
export * from './date-utils'