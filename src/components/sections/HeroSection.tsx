'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Button from '../ui/Button';
import Icon from '../ui/Icon';
import { heroImages } from '@/data/heroImages';
import { TIMING } from '@/constants/design-tokens';

export default function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Only render current and next image for performance
  const visibleIndices = [currentImageIndex, (currentImageIndex + 1) % heroImages.length];

  const goToSlide = useCallback((index: number) => {
    if (index === currentImageIndex) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentImageIndex(index);
      setIsTransitioning(false);
    }, TIMING.carousel.transitionDelay);
  }, [currentImageIndex]);

  const goToNextSlide = useCallback(() => {
    goToSlide((currentImageIndex + 1) % heroImages.length);
  }, [currentImageIndex, goToSlide]);

  const goToPrevSlide = useCallback(() => {
    goToSlide((currentImageIndex - 1 + heroImages.length) % heroImages.length);
  }, [currentImageIndex, goToSlide]);

  // Keyboard navigation
  useEffect(() => {
    // Arrow keys change slides, but never while the user is typing,
    // and Space is left alone so it still scrolls the page.
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName))) return;
      if (e.key === 'ArrowLeft') {
        goToPrevSlide();
      } else if (e.key === 'ArrowRight') {
        goToNextSlide();
      } else if (e.key === 'Escape') {
        setIsPaused((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNextSlide, goToPrevSlide]);

  useEffect(() => {
    // Trigger fade-in animation after component mounts
    const timer = setTimeout(() => setIsLoaded(true), TIMING.fadeIn.initial);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setIsTransitioning(true);

      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
        setIsTransitioning(false);
      }, TIMING.carousel.transitionDelay);
    }, TIMING.carousel.interval);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section
      className="relative h-[88svh] min-h-[520px] max-h-[860px] w-full overflow-hidden bg-gray-900"
      aria-roledescription="carousel"
      aria-label="Hero images showcasing HakiArdhi's work"
    >
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Slide {currentImageIndex + 1} of {heroImages.length}
      </div>

      {heroImages.map((image, index) =>
        visibleIndices.includes(index) && (
          <div
            key={image}
            id={`hero-image-${index}`}
            role="group"
            aria-roledescription="slide"
            aria-label={`Slide ${index + 1} of ${heroImages.length}`}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex && !isTransitioning ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={image}
              alt={`HakiArdhi community empowerment - Slide ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0}
              quality={85}
              sizes="100vw"
            />
          </div>
        )
      )}

      {/* Single neutral scrim so text stays readable on any photo */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/45 to-black/30" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-end px-4 pb-20 pt-28 sm:px-6 lg:items-center lg:px-8 lg:pb-0">
        <div
          className={`max-w-2xl text-white transition-all duration-700 ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
        >
          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Securing Land Rights for All
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-white/85 sm:text-xl">
            Empowering communities through research, training, and advocacy
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              href="/programs"
              variant="primary"
              size="lg"
              className="w-full sm:w-auto"
              icon={<Icon name="arrow-right" size="sm" />}
            >
              Explore Our Work
            </Button>
            <Button href="/legal-aid" variant="secondary" size="lg" className="w-full sm:w-auto">
              Get Legal Aid
            </Button>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2"
        role="tablist"
        aria-label="Choose slide"
      >
        {heroImages.map((_, index) => (
          <button
            key={index}
            role="tab"
            aria-selected={index === currentImageIndex}
            aria-controls={`hero-image-${index}`}
            onClick={() => goToSlide(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === currentImageIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
