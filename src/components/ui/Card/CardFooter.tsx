import { ReactNode } from 'react';

export interface CardFooterProps {
  children: ReactNode;
  className?: string;
  showDivider?: boolean;
}

export default function CardFooter({ children, className = '', showDivider = true }: CardFooterProps) {
  return (
    <>
      {showDivider && (
        <div className="h-px mx-6 transition-colors duration-500"></div>
      )}
      <div className={`px-6 pb-6 pt-5 ${className}`}>
        {children}
      </div>
    </>
  );
}
