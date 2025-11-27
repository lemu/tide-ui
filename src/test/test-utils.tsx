import { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'

// Custom render function that can include global providers
function customRender(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  return render(ui, { ...options })
}

// Re-export everything from @testing-library/react
export * from '@testing-library/react'

// Override render with custom render
export { customRender as render }
