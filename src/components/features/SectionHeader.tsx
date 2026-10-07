interface SectionHeaderProps {
  title: string;
  description?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export default function SectionHeader({
  title,
  description,
  align = 'center',
  className = '',
}: SectionHeaderProps) {
  const alignClasses = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto',
  };

  return (
    <div className={`max-w-3xl mb-16 ${alignClasses[align]} ${className}`}>
      {/* Decorative accent */}
      <div className={`inline-block mb-4 ${align === 'center' ? 'mx-auto' : align === 'right' ? 'ml-auto' : ''}`}>
        <div className="bg-brand-500 h-1 w-16 rounded-full"></div>
      </div>

      <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-5 leading-tight tracking-tight">
        <span className="text-gray-900 ">
          {title}
        </span>
      </h2>
      {description && (
        <p className="text-body-lg text-gray-600 leading-relaxed font-medium">
          {description}
        </p>
      )}
    </div>
  );
}
