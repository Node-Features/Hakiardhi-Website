import { ReactNode } from 'react';
import { SPACING } from '@/constants/design-tokens';

export interface SectionRootProps {
  children: ReactNode;
  variant?: 'white' | 'light' | 'dark' | 'gradient-dark' | 'gradient-brand' | 'zinc-light' | 'zinc-medium' | 'image-overlay' | 'none';
  spacing?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'responsive';
  className?: string;
  id?: string;
  showDecorations?: boolean;
}

export default function SectionRoot({
  children,
  variant = 'white',
  spacing = 'responsive',
  className = '',
  id,
  showDecorations = false,
}: SectionRootProps) {
  const variantClasses = {
    white: 'bg-white',
    light: 'bg-gray-50',
    dark: 'bg-gray-900 text-white',
    'gradient-dark': 'bg-gray-950 text-white',
    'gradient-brand': 'bg-gray-950 text-white',
    'zinc-light': 'bg-gray-50',
    'zinc-medium': 'bg-gray-100',
    'image-overlay': 'bg-gray-900 text-white',
    none: '',
  };

  const spacingClasses = {
    xs: SPACING.section.xs,
    sm: SPACING.section.sm,
    md: SPACING.section.md,
    lg: SPACING.section.lg,
    xl: SPACING.section.xl,
    responsive: SPACING.section.responsive,
  };

  return (
    <section
      id={id}
      className={`relative overflow-hidden ${spacingClasses[spacing]} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </section>
  );
}
