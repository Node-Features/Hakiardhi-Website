'use client';

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { THRESHOLDS } from '@/constants/design-tokens';
import Image from 'next/image';
import Icon from '../ui/Icon';
import Button from '../ui/Button';
import AnimatedList from '../ui/AnimatedList';

export interface Testimonial {
  name: string;
  role: string;
  location: string;
  quote: string;
  image: string;
  program?: string;
}

export interface TestimonialsSectionProps {
  testimonials?: Testimonial[];
  className?: string;
}

const defaultTestimonials: Testimonial[] = [
  {
    name: 'Amina Juma',
    role: 'School of HakiArdhi Graduate',
    location: 'Mbeya Region',
    quote: 'HakiArdhi trained me as a land rights monitor. Now I help my entire community understand and protect their land rights. This knowledge has empowered hundreds of families.',
    image: '/images/capacity_building_3.jpg',
    program: 'School of HakiArdhi'
  },
  {
    name: 'Joseph Makamba',
    role: 'Community Leader',
    location: 'Morogoro',
    quote: 'When our village faced displacement, HakiArdhi provided free legal aid and stood with us. Today, we still have our ancestral lands and our livelihoods are secure.',
    image: '/images/public_debate_1.JPG',
    program: 'Legal Aid Program'
  },
  {
    name: 'Grace Kileo',
    role: 'Women\'s Group Coordinator',
    location: 'Arusha',
    quote: 'Through HakiArdhi\'s training, our women\'s group learned about inheritance rights and land ownership. We are now advocating for equal land rights for women across our region.',
    image: '/images/capacity_building_2.jpg',
    program: 'Advocacy Training'
  },
];

export default function TestimonialsSection({
  testimonials = defaultTestimonials,
  className = '',
}: TestimonialsSectionProps) {
  const [sectionRef, isVisible] = useIntersectionObserver({
    threshold: THRESHOLDS.intersection.low,
    freezeOnceVisible: true,
  });

  return (
    <section
      ref={sectionRef}
      className={`bg-gray-50 relative py-16 lg:py-24 overflow-hidden ${className}`}
    >
      {/* Background decoration */}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div
          className={`text-center mb-12 lg:mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-hakiardhi-red">Success Stories</p>

          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Voices from the Communities We Serve
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Real stories from people whose lives have been transformed through our programs
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatedList staggerDelay={150}>
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden border border-gray-200"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover transition-transform duration-500"
                  />

                  {/* Program badge */}
                  {testimonial.program && (
                    <div className="absolute top-4 left-4">
                      <div className="px-2.5 py-1 bg-white rounded-md text-xs font-semibold text-gray-900">
                        {testimonial.program}
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Quote */}
                  <blockquote className="text-gray-700 leading-relaxed mb-6 italic">
                    "{testimonial.quote}"
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div>
                      <div className="font-bold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.role}</div>
                      <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                        <Icon name="map-pin" size="sm" className="text-hakiardhi-red" />
                        {testimonial.location}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </AnimatedList>
        </div>

        {/* CTA */}
        <div
          className={`text-center mt-12 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <p className="text-lg text-gray-700 font-medium mb-6">
            Your support makes stories like these possible
          </p>
          <Button
            href="/portfolio"
            variant="primary"
            size="lg"
            icon={<Icon name="arrow-right" size="sm" />}
          >
            Read More Success Stories
          </Button>
        </div>
      </div>
    </section>
  );
}
