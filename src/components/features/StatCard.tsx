import { ReactNode } from 'react';
import { SPACING } from '@/constants/design-tokens';

export interface StatCardProps {
  number: string;
  label: string;
  description?: string;
  icon?: ReactNode;
  color?: 'red' | 'blue' | 'orange' | 'success';
  className?: string;
}

export default function StatCard({
  number,
  label,
  description,
  icon,
  color = 'red',
  className = '',
}: StatCardProps) {
  const colorClasses = {
    red: 'bg-brand-500 text-white',
    blue: 'bg-hakiardhi-red text-white',
    orange: 'bg-hakiardhi-red text-white',
    success: 'bg-success-500 text-white',
  };

  const numberColorClasses = {
    red: 'text-brand-600',
    blue: 'text-hakiardhi-red',
    orange: 'text-hakiardhi-red',
    success: 'text-success-600',
  };

  return (
    <div className={`text-center group relative ${className}`}>
      {/* Decorative background circle */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className={`w-32 h-32 rounded-full ${numberColorClasses[color]} opacity-5 `}></div>
      </div>

      <div className={SPACING.component.default}>
        {icon && (
          <div
            className={`relative inline-flex items-center justify-center p-5 rounded-xl ${colorClasses[color]} transition-all duration-500`}
          >
            {icon}
          </div>
        )}
        <div className={`relative text-6xl sm:text-7xl font-bold ${numberColorClasses[color]} transition-all duration-300 `}>
          {number}
        </div>
        <div className="text-heading-md font-bold text-gray-900 tracking-tight">{label}</div>
        {description && (
          <p className="text-body-sm text-gray-600 max-w-xs mx-auto leading-relaxed">{description}</p>
        )}

        {/* Decorative accent line */}
        <div className={`mx-auto h-1 w-16 ${colorClasses[color].split(' ')[0]} rounded-full group-hover:w-24 transition-all duration-500`}></div>
      </div>
    </div>
  );
}
