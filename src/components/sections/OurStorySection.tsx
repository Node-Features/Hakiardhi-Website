'use client';

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { THRESHOLDS } from '@/constants/design-tokens';
import Image from 'next/image';
import Button from '../ui/Button';
import Icon from '../ui/Icon';

export interface OurStorySectionProps {
  className?: string;
}

export default function OurStorySection({ className = '' }: OurStorySectionProps) {
  const [sectionRef, isVisible] = useIntersectionObserver({
    threshold: THRESHOLDS.intersection.low,
    freezeOnceVisible: true,
  });

  return (
    <section
      ref={sectionRef}
      className={`relative py-16 lg:py-24 bg-white ${className}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Side */}
          <div
            className={`relative transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            <div className="relative h-[400px] lg:h-[600px] rounded-xl overflow-hidden">
              <Image
                src="/images/capacity_building_3.jpg"
                alt="HakiArdhi community empowerment"
                fill
                className="object-cover"
              />
              {/* Overlay badge */}
              <div className="absolute bottom-6 left-6 bg-white/95 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-hakiardhi-red w-12 h-12 rounded-full flex items-center justify-center">
                    <Icon name="users" size="lg" className="text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-hakiardhi-red">30+</div>
                    <div className="text-sm text-gray-600 font-semibold">Years of Service</div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Content Side */}
          <div
            className={`transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
          >
            {/* Tag */}
            <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-hakiardhi-red">Our Story</p>

            {/* Headline */}
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              Securing Land Rights for Tanzania's Communities
            </h2>

            {/* Problem */}
            <div className="mb-6 p-5 bg-gray-50 rounded-xl ">
              <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                <Icon name="alert-circle" size="md" className="text-hakiardhi-red" />
                The Challenge
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Millions of rural and peri-urban communities in Tanzania face land disputes, displacement, and insecure tenure—threatening their livelihoods, homes, and futures.
              </p>
            </div>

            {/* Solution */}
            <div className="bg-hakiardhi-red/5 mb-6 p-5 rounded-xl ">
              <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                <Icon name="check-circle" size="md" className="text-hakiardhi-red" />
                Our Solution
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Since 1994, HakiArdhi has empowered communities through legal aid, research, training, and advocacy—ensuring that land rights are protected and social justice prevails.
              </p>
            </div>

            {/* Key Points */}
            <div className="space-y-3 mb-8">
              {[
                'Free 24/7 legal support for land disputes',
                'Community training and capacity building',
                'Evidence-based policy advocacy',
                'Research and documentation of land rights'
              ].map((point, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="bg-hakiardhi-red flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5">
                    <Icon name="check" size="sm" className="text-white" />
                  </div>
                  <p className="text-gray-700 font-medium">{point}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                href="/about"
                variant="primary"
                size="lg"
                icon={<Icon name="arrow-right" size="sm" />}
                iconPosition="right"
              >
                Learn Our Story
              </Button>
              <Button
                href="/donate"
                variant="secondary"
                size="lg"
                icon={<Icon name="heart" size="sm" />}
              >
                Support Our Work
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
