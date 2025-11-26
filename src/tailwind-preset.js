/** @type {import('tailwindcss').Config} */

// Tide UI Tailwind CSS Preset
// This preset contains the design tokens and configuration needed for Tide UI components

export default {
  theme: {
    extend: {
      // Design System Colors (CSS Variables)
      colors: {
        // Surface colors
        'surface-primary': 'var(--color-surface-primary)',
        'surface-secondary': 'var(--color-surface-secondary)',
        
        // Text colors
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        'text-tertiary': 'var(--color-text-tertiary)',
        'text-brand': 'var(--color-text-brand-bold)',
        'text-selected': 'var(--color-text-brand-bold-selected)',
        'text-success': 'var(--color-text-success-bold)',
        'text-warning': 'var(--color-text-warning-bold)',
        'text-error': 'var(--color-text-error-bold)',
        'text-information': 'var(--color-text-info-bold)',
        'text-placeholder': 'var(--color-text-placeholder)',
        'text-on-action': 'var(--color-text-on-action)',
        
        // Background colors
        'background-brand': 'var(--color-background-blue-bold)',
        'background-brand-selected': 'var(--color-background-blue-subtle-selected)',
        'background-neutral-subtle-hovered': 'var(--color-background-neutral-subtlest-hovered)',
        'background-input': 'var(--color-interaction-background-input-neutral)',
        
        // Border colors
        'border-primary-subtle': 'var(--color-border-primary-subtle)',
        'border-brand': 'var(--color-border-brand-bold)',
        'border-focus': 'var(--color-border-focused)',
        'border-input': 'var(--color-interaction-border-input)',
      },
      
      // Design System Spacing
      spacing: {
        'space-xsm': 'var(--space-xsm)',
        'space-sm': 'var(--space-sm)', 
        'space-md': 'var(--space-md)',
        'space-lg': 'var(--space-lg)',
        'space-xlg': 'var(--space-xlg)',
      },
      
      // Design System Sizing
      size: {
        'size-xsm': 'var(--size-xsm)',
        'size-sm': 'var(--size-sm)',
        'size-md': 'var(--size-md)',
        'size-lg': 'var(--size-lg)',
        'size-xlg': 'var(--size-xlg)',
      },
      
      // Typography utilities (already included in your CSS)
      fontSize: {
        'heading-2xlg': ['var(--text-heading-2xlg-size)', { lineHeight: 'var(--text-heading-2xlg-line-height)', fontWeight: 'var(--text-heading-2xlg-weight)' }],
        'heading-xlg': ['var(--text-heading-xlg-size)', { lineHeight: 'var(--text-heading-xlg-line-height)', fontWeight: 'var(--text-heading-xlg-weight)' }],
        'heading-lg': ['var(--text-heading-lg-size)', { lineHeight: 'var(--text-heading-lg-line-height)', fontWeight: 'var(--text-heading-lg-weight)' }],
        'heading-md': ['var(--text-heading-md-size)', { lineHeight: 'var(--text-heading-md-line-height)', fontWeight: 'var(--text-heading-md-weight)' }],
        'heading-sm': ['var(--text-heading-sm-size)', { lineHeight: 'var(--text-heading-sm-line-height)', fontWeight: 'var(--text-heading-sm-weight)' }],
        'heading-xsm': ['var(--text-heading-xsm-size)', { lineHeight: 'var(--text-heading-xsm-line-height)', fontWeight: 'var(--text-heading-xsm-weight)' }],
        'body-lg': ['var(--text-body-lg-size)', { lineHeight: 'var(--text-body-lg-line-height)', fontWeight: 'var(--text-body-lg-weight)' }],
        'body-md': ['var(--text-body-md-size)', { lineHeight: 'var(--text-body-md-line-height)', fontWeight: 'var(--text-body-md-weight)' }],
        'body-sm': ['var(--text-body-sm-size)', { lineHeight: 'var(--text-body-sm-line-height)', fontWeight: 'var(--text-body-sm-weight)' }],
        'body-xsm': ['var(--text-body-xsm-size)', { lineHeight: 'var(--text-body-xsm-line-height)', fontWeight: 'var(--text-body-xsm-weight)' }],
        'label-md': ['var(--text-label-md-size)', { lineHeight: 'var(--text-label-md-line-height)', fontWeight: 'var(--text-label-md-weight)' }],
        'label-sm': ['var(--text-label-sm-size)', { lineHeight: 'var(--text-label-sm-line-height)', fontWeight: 'var(--text-label-sm-weight)' }],
        'caption-sm': ['var(--text-caption-sm-size)', { lineHeight: 'var(--text-caption-sm-line-height)', fontWeight: 'var(--text-caption-sm-weight)' }],
        'caption-xsm': ['var(--text-caption-xsm-size)', { lineHeight: 'var(--text-caption-xsm-line-height)', fontWeight: 'var(--text-caption-xsm-weight)' }],
      },
      
      // Animation and transitions
      transitionDuration: {
        '150': '150ms',
        '200': '200ms',
        '300': '300ms',
      },
      
      // Custom border radius values
      borderRadius: {
        'null': '0',
        'xsm': '0.125rem', // 2px
        'sm': '0.25rem',   // 4px
        'md': '0.375rem',  // 6px
        'lg': '0.5rem',    // 8px
        'xlg': '0.75rem',  // 12px
      },
      
      // Custom shadows
      boxShadow: {
        'xs': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'sm': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'md': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'lg': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        'xl': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
      },
    },
  },
  
  // Add custom utilities for design tokens
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        // Typography utilities that match your CSS
        '.text-heading-2xlg': {
          fontSize: 'var(--text-heading-2xlg-size)',
          lineHeight: 'var(--text-heading-2xlg-line-height)',
          fontWeight: 'var(--text-heading-2xlg-weight)',
          letterSpacing: 'var(--text-heading-2xlg-tracking)',
        },
        '.text-heading-xlg': {
          fontSize: 'var(--text-heading-xlg-size)',
          lineHeight: 'var(--text-heading-xlg-line-height)',
          fontWeight: 'var(--text-heading-xlg-weight)',
          letterSpacing: 'var(--text-heading-xlg-tracking)',
        },
        '.text-heading-lg': {
          fontSize: 'var(--text-heading-lg-size)',
          lineHeight: 'var(--text-heading-lg-line-height)',
          fontWeight: 'var(--text-heading-lg-weight)',
          letterSpacing: 'var(--text-heading-lg-tracking)',
        },
        '.text-heading-md': {
          fontSize: 'var(--text-heading-md-size)',
          lineHeight: 'var(--text-heading-md-line-height)',
          fontWeight: 'var(--text-heading-md-weight)',
          letterSpacing: 'var(--text-heading-md-tracking)',
        },
        '.text-heading-sm': {
          fontSize: 'var(--text-heading-sm-size)',
          lineHeight: 'var(--text-heading-sm-line-height)',
          fontWeight: 'var(--text-heading-sm-weight)',
          letterSpacing: 'var(--text-heading-sm-tracking)',
        },
        '.text-heading-xsm': {
          fontSize: 'var(--text-heading-xsm-size)',
          lineHeight: 'var(--text-heading-xsm-line-height)',
          fontWeight: 'var(--text-heading-xsm-weight)',
          letterSpacing: 'var(--text-heading-xsm-tracking)',
        },
        '.text-body-lg': {
          fontSize: 'var(--text-body-lg-size)',
          lineHeight: 'var(--text-body-lg-line-height)',
          fontWeight: 'var(--text-body-lg-weight)',
          letterSpacing: 'var(--text-body-lg-tracking)',
        },
        '.text-body-medium-lg': {
          fontSize: 'var(--text-body-lg-size)',
          lineHeight: 'var(--text-body-lg-line-height)',
          fontWeight: '500',
          letterSpacing: 'var(--text-body-lg-tracking)',
        },
        '.text-body-strong-lg': {
          fontSize: 'var(--text-body-lg-size)',
          lineHeight: 'var(--text-body-lg-line-height)',
          fontWeight: '600',
          letterSpacing: 'var(--text-body-lg-tracking)',
        },
        '.text-body-md': {
          fontSize: 'var(--text-body-md-size)',
          lineHeight: 'var(--text-body-md-line-height)',
          fontWeight: 'var(--text-body-md-weight)',
          letterSpacing: 'var(--text-body-md-tracking)',
        },
        '.text-body-medium-md': {
          fontSize: 'var(--text-body-md-size)',
          lineHeight: 'var(--text-body-md-line-height)',
          fontWeight: '500',
          letterSpacing: 'var(--text-body-md-tracking)',
        },
        '.text-body-strong-md': {
          fontSize: 'var(--text-body-md-size)',
          lineHeight: 'var(--text-body-md-line-height)',
          fontWeight: '600',
          letterSpacing: 'var(--text-body-md-tracking)',
        },
        '.text-body-sm': {
          fontSize: 'var(--text-body-sm-size)',
          lineHeight: 'var(--text-body-sm-line-height)',
          fontWeight: 'var(--text-body-sm-weight)',
          letterSpacing: 'var(--text-body-sm-tracking)',
        },
        '.text-body-medium-sm': {
          fontSize: 'var(--text-body-sm-size)',
          lineHeight: 'var(--text-body-sm-line-height)',
          fontWeight: '500',
          letterSpacing: 'var(--text-body-sm-tracking)',
        },
        '.text-body-strong-sm': {
          fontSize: 'var(--text-body-sm-size)',
          lineHeight: 'var(--text-body-sm-line-height)',
          fontWeight: '600',
          letterSpacing: 'var(--text-body-sm-tracking)',
        },
        '.text-body-xsm': {
          fontSize: 'var(--text-body-xsm-size)',
          lineHeight: 'var(--text-body-xsm-line-height)',
          fontWeight: 'var(--text-body-xsm-weight)',
          letterSpacing: 'var(--text-body-xsm-tracking)',
        },
        '.text-body-medium-xsm': {
          fontSize: 'var(--text-body-xsm-size)',
          lineHeight: 'var(--text-body-xsm-line-height)',
          fontWeight: '500',
          letterSpacing: 'var(--text-body-xsm-tracking)',
        },
        '.text-body-strong-xsm': {
          fontSize: 'var(--text-body-xsm-size)',
          lineHeight: 'var(--text-body-xsm-line-height)',
          fontWeight: '600',
          letterSpacing: 'var(--text-body-xsm-tracking)',
        },
        '.text-label-md': {
          fontSize: 'var(--text-label-md-size)',
          lineHeight: 'var(--text-label-md-line-height)',
          fontWeight: 'var(--text-label-md-weight)',
          letterSpacing: 'var(--text-label-md-tracking)',
        },
        '.text-label-sm': {
          fontSize: 'var(--text-label-sm-size)',
          lineHeight: 'var(--text-label-sm-line-height)',
          fontWeight: 'var(--text-label-sm-weight)',
          letterSpacing: 'var(--text-label-sm-tracking)',
        },
        '.text-caption-sm': {
          fontSize: 'var(--text-caption-sm-size)',
          lineHeight: 'var(--text-caption-sm-line-height)',
          fontWeight: 'var(--text-caption-sm-weight)',
          letterSpacing: 'var(--text-caption-sm-tracking)',
        },
        '.text-caption-medium-sm': {
          fontSize: 'var(--text-caption-sm-size)',
          lineHeight: 'var(--text-caption-sm-line-height)',
          fontWeight: '500',
          letterSpacing: 'var(--text-caption-sm-tracking)',
        },
        '.text-caption-strong-sm': {
          fontSize: 'var(--text-caption-sm-size)',
          lineHeight: 'var(--text-caption-sm-line-height)',
          fontWeight: '600',
          letterSpacing: 'var(--text-caption-sm-tracking)',
        },
        '.text-caption-xsm': {
          fontSize: 'var(--text-caption-xsm-size)',
          lineHeight: 'var(--text-caption-xsm-line-height)',
          fontWeight: 'var(--text-caption-xsm-weight)',
          letterSpacing: 'var(--text-caption-xsm-tracking)',
        },
        '.text-caption-medium-xsm': {
          fontSize: 'var(--text-caption-xsm-size)',
          lineHeight: 'var(--text-caption-xsm-line-height)',
          fontWeight: '500',
          letterSpacing: 'var(--text-caption-xsm-tracking)',
        },
        '.text-caption-strong-xsm': {
          fontSize: 'var(--text-caption-xsm-size)',
          lineHeight: 'var(--text-caption-xsm-line-height)',
          fontWeight: '600',
          letterSpacing: 'var(--text-caption-xsm-tracking)',
        },
      })
    }
  ]
}