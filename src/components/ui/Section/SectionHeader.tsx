import { ReactNode } from 'react';
import { CONTENT_WIDTHS, SPACING } from '@/constants/design-tokens';

export interface SectionHeaderProps {
  title: string | ReactNode;
  description?: string | ReactNode;
  align?: 'left' | 'center' | 'right';
  className?: string;
  variant?: 'light' | 'dark';
}

export default function SectionHeader({
  title,
  description,
  align = 'center',
  className = '',
  variant = 'light',
}: SectionHeaderProps) {
  const alignClasses = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto',
  };

  const textColor = variant === 'dark' ? 'text-white' : 'text-gray-900';
  const descColor = variant === 'dark' ? 'text-gray-300' : 'text-gray-600';

  return (
    <div className={`${CONTENT_WIDTHS.text.wide} ${SPACING.margin.section.md} ${alignClasses[align]} ${className}`}>
      <h2 className={`text-3xl font-bold sm:text-4xl ${textColor} ${SPACING.margin.element.sm} leading-tight tracking-tight`}>
        {title}
      </h2>
      {description && (
        <p className={`text-lg ${descColor} leading-relaxed`}>
          {description}
        </p>
      )}
    </div>
  );
}
