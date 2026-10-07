/**
 * Color Utilities
 *
 * Centralized color mapping and theming utilities
 */

export type ThemeColor = 'brand' | 'blue' | 'orange' | 'success' | 'error' | 'purple';

export const colorClasses = {
  background: {
    brand: 'bg-brand-50',
    blue: 'bg-brand-50',
    orange: 'bg-brand-50',
    success: 'bg-success-50',
    error: 'bg-error-50',
    purple: 'bg-brand-50',
  },
  text: {
    brand: 'text-brand-600',
    blue: 'text-hakiardhi-red',
    orange: 'text-hakiardhi-red',
    success: 'text-success-600',
    error: 'text-error-600',
    purple: 'text-hakiardhi-red',
  },
  border: {
    brand: 'border-brand-200',
    blue: 'border-gray-200',
    orange: 'border-gray-200',
    success: 'border-success-200',
    error: 'border-error-200',
    purple: 'border-gray-200',
  },
  hover: {
    background: {
      brand: 'hover:bg-brand-100',
      blue: 'hover:bg-brand-50',
      orange: 'hover:bg-brand-50',
      success: 'hover:bg-success-100',
      error: 'hover:bg-error-100',
      purple: 'hover:bg-brand-50',
    },
    text: {
      brand: 'hover:text-brand-700',
      blue: 'hover:text-hakiardhi-red',
      orange: 'hover:text-hakiardhi-red',
      success: 'hover:text-success-700',
      error: 'hover:text-error-700',
      purple: 'hover:text-hakiardhi-red',
    },
    border: {
      brand: 'hover:border-brand-300',
      blue: 'hover:border-gray-200',
      orange: 'hover:border-gray-200',
      success: 'hover:border-success-300',
      error: 'hover:border-error-300',
      purple: 'hover:border-gray-200',
    },
  },
} as const;

/**
 * Get combined color classes for a theme color
 */
export function getColorClasses(color: ThemeColor) {
  return `${colorClasses.background[color]} ${colorClasses.text[color]}`;
}

/**
 * Get border color class for a theme color
 */
export function getBorderColor(color: ThemeColor) {
  return colorClasses.border[color];
}

/**
 * Get hover border color class for a theme color
 */
export function getHoverBorderColor(color: ThemeColor) {
  return colorClasses.hover.border[color];
}
