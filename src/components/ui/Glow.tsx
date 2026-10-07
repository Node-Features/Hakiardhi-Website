/**
 * Glow Component
 *
 * Wrapper component that adds a glow effect behind elements
 * Replaces duplicated glow effect patterns
 */

import { ReactNode } from 'react';

export interface GlowProps {
  children: ReactNode;
  color?: 'brand' | 'blue' | 'orange' | 'success' | 'purple';
  intensity?: 'low' | 'medium' | 'high';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

// Glow halos were removed from the design; children render as-is.
export default function Glow({ children, className = '' }: GlowProps) {
  return <div className={`inline-block ${className}`}>{children}</div>;
}
