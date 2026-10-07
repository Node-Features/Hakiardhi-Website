'use client';

import Link from 'next/link';
import { ReactNode } from 'react';

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'link' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

/**
 * One button style for the whole site.
 * - primary:   solid brand red (the main action on a screen)
 * - secondary: outline that takes the surrounding text colour, so it works
 *              on white sections and on dark image overlays alike
 * - dark:      solid black
 * - tertiary / link: plain red text link with an arrow-friendly layout
 */
export default function Button({
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  children,
  icon,
  iconPosition = 'right',
  className = '',
  disabled = false,
  fullWidth = false,
  type = 'button',
}: ButtonProps) {
  const isTextLink = variant === 'tertiary' || variant === 'link';

  const sizeClasses = isTextLink
    ? { sm: 'text-sm', md: 'text-base', lg: 'text-base' }
    : {
        sm: 'h-10 px-4 text-sm',
        md: 'h-11 px-5 text-base',
        lg: 'h-12 px-6 text-base',
      };

  const variantClasses = {
    primary: 'bg-hakiardhi-red text-white border border-hakiardhi-red hover:bg-hakiardhi-red-dark hover:border-hakiardhi-red-dark',
    secondary: 'bg-transparent [color:inherit] border border-current hover:bg-current/10',
    dark: 'bg-black text-white border border-black hover:bg-gray-800 hover:border-gray-800',
    tertiary: 'text-hakiardhi-red hover:text-hakiardhi-red-dark underline-offset-4 hover:underline',
    link: 'text-hakiardhi-red hover:text-hakiardhi-red-dark underline-offset-4 hover:underline',
  };

  const classes = [
    'inline-flex items-center justify-center gap-2 font-semibold whitespace-nowrap',
    'transition-colors duration-200',
    isTextLink ? '' : 'rounded-lg',
    disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer',
    fullWidth ? 'w-full' : '',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hakiardhi-red focus-visible:ring-offset-2',
    sizeClasses[size],
    variantClasses[variant],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const iconEl = icon ? <span className="flex-shrink-0">{icon}</span> : null;

  const content = (
    <>
      {iconPosition === 'left' && iconEl}
      <span className="inline-flex items-center gap-2">{children}</span>
      {iconPosition === 'right' && iconEl}
    </>
  );

  if (href && !disabled) {
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} disabled={disabled} type={type} className={classes}>
      {content}
    </button>
  );
}
