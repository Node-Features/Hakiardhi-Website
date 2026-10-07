import { ReactNode } from 'react';
import { getColorClasses, getBorderColor, getHoverBorderColor, type ThemeColor } from '@/utils/colors';

export type ServiceCardColor = 'brand' | 'blue' | 'orange' | 'success' | 'error';

export interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  color?: ServiceCardColor;
  className?: string;
}

export default function ServiceCard({
  icon,
  title,
  description,
  color = 'brand',
  className = '',
}: ServiceCardProps) {
  const iconColorClasses = getColorClasses(color as ThemeColor);
  const borderColor = getBorderColor(color as ThemeColor);
  const hoverBorderColor = getHoverBorderColor(color as ThemeColor);

  return (
    <div className={`card-hakiardhi group transition-all duration-500 border border-gray-200 ${hoverBorderColor} ${className}`}>
      <div
        className={`inline-flex p-4 rounded-xl ${iconColorClasses} mb-5 transition-all duration-500`}
      >
        {icon}
      </div>
      <h3 className="text-heading-sm font-bold text-gray-900 mb-3 group-hover:text-brand-600 transition-colors duration-300">{title}</h3>
      <p className="text-body-md text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">{description}</p>

      {/* Decorative line */}
      <div className="bg-brand-500 mt-4 h-1 w-0 rounded-full group-hover:w-full transition-all duration-500"></div>
    </div>
  );
}
