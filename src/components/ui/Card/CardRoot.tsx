import { ReactNode } from 'react';

export interface CardRootProps {
  children: ReactNode;
  variant?: 'elevated' | 'outlined' | 'filled' | 'glass';
  hoverEffect?: 'lift' | 'glow' | 'scale' | 'none';
  className?: string;
  onClick?: () => void;
  clickable?: boolean;
}

export default function CardRoot({
  children,
  variant = 'elevated',
  hoverEffect = 'lift',
  className = '',
  onClick,
  clickable = false,
}: CardRootProps) {
  const variantClasses = {
    elevated: 'bg-white border border-gray-200',
    outlined: 'bg-white border border-gray-200',
    filled: 'bg-gray-50 border border-gray-200',
    glass: 'bg-white/5 border border-white/15',
  };

  // Hover only signals that a card is clickable; no lifting, scaling or glows.
  const hoverEffectClasses = {
    lift: clickable || onClick ? 'hover:border-gray-300' : '',
    glow: clickable || onClick ? 'hover:border-gray-300' : '',
    scale: clickable || onClick ? 'hover:border-gray-300' : '',
    none: '',
  };

  const cursorClass = clickable || onClick ? 'cursor-pointer' : '';

  return (
    <div
      onClick={onClick}
      className={`
        group rounded-xl overflow-hidden transition-colors duration-200
        ${variantClasses[variant]}
        ${hoverEffectClasses[hoverEffect]}
        ${cursorClass}
        ${className}
      `.trim().replace(/\s+/g, ' ')}
    >
      {children}
    </div>
  );
}
