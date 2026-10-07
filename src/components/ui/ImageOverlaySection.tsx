import { ReactNode } from 'react';
import Image from 'next/image';
import Section from './Section';

export interface ImageOverlaySectionProps {
  image: string;
  overlayOpacity?: 'light' | 'medium' | 'dark';
  blurAmount?: 'sm' | 'md' | 'lg';
  spacing?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'responsive';
  children: ReactNode;
  className?: string;
  id?: string;
}

/**
 * ImageOverlaySection Component
 *
 * A section with a blurred background image and gradient overlay
 * Perfect for creating visually striking sections with white text
 *
 * @example
 * <ImageOverlaySection
 *   image="/images/hero.jpg"
 *   overlayOpacity="medium"
 *   blurAmount="md"
 * >
 *   <Section.Content>
 *     <h2 className="text-white">Your Content</h2>
 *   </Section.Content>
 * </ImageOverlaySection>
 */
export default function ImageOverlaySection({
  image,
  overlayOpacity = 'medium',
  blurAmount = 'md',
  spacing = 'lg',
  children,
  className = '',
  id,
}: ImageOverlaySectionProps) {
  const overlays = {
    light: 'bg-black/50',
    medium: 'bg-black/65',
    dark: 'bg-black/80',
  };

  const blurs = {
    sm: 'blur-sm',
    md: 'blur-md',
    lg: 'blur-lg',
  };

  return (
    <Section
      variant="none"
      spacing={spacing}
      className={`relative overflow-hidden ${className}`}
      id={id}
    >
      {/* Background Image with Blur */}
      <div className="absolute inset-0 z-0">
        <Image
          src={image}
          alt=""
          fill
          className={`object-cover opacity-20 ${blurs[blurAmount]}`}
          priority={false}
        />
        {/* Gradient Overlay */}
        <div className={`absolute inset-0 ${overlays[overlayOpacity]}`} />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 text-white">
        {children}
      </div>
    </Section>
  );
}
