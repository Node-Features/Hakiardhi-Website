'use client';

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { THRESHOLDS } from '@/constants/design-tokens';
import Button from '../ui/Button';
import Icon from '../ui/Icon';
import AnimatedList from '../ui/AnimatedList';

export interface SupportOption {
  icon: string;
  title: string;
  description: string;
  cta: string;
  link: string;
  color?: string;
}

export interface HowYouCanHelpSectionProps {
  options?: SupportOption[];
  className?: string;
}

const defaultOptions: SupportOption[] = [
  {
    icon: 'heart',
    title: 'Make a Donation',
    description: 'Your financial support enables us to provide free legal aid, training, and advocacy to communities in need.',
    cta: 'Donate Now',
    link: '/donate',
    color: 'red'
  },
  {
    icon: 'users',
    title: 'Become a Partner',
    description: 'Join organizations worldwide supporting our mission. Corporate partnerships create sustainable impact.',
    cta: 'Partner With Us',
    link: '/work-with-us?tab=partner',
    color: 'blue'
  },
  {
    icon: 'calendar',
    title: 'Volunteer Your Time',
    description: 'Share your expertise in legal aid, research, community training, or administrative support.',
    cta: 'Volunteer',
    link: '/work-with-us?tab=volunteer',
    color: 'green'
  },
  {
    icon: 'share',
    title: 'Spread the Word',
    description: 'Amplify our impact by sharing our work on social media and within your networks.',
    cta: 'Share Our Story',
    link: '#share',
    color: 'orange'
  },
];

export default function HowYouCanHelpSection({
  options = defaultOptions,
  className = '',
}: HowYouCanHelpSectionProps) {
  const [sectionRef, isVisible] = useIntersectionObserver({
    threshold: THRESHOLDS.intersection.low,
    freezeOnceVisible: true,
  });

  const colorClasses = {
    red: {
      iconBg: 'bg-brand-50',
      iconColor: 'text-hakiardhi-red',
      hoverBg: 'group-hover:from-red-100 group-hover:to-red-200',
      accentBorder: 'border-gray-200',
      hoverBorder: 'group-hover:border-gray-200',
      hoverShadow: '',
      ctaColor: 'text-hakiardhi-red hover:text-hakiardhi-red-dark'
    },
    blue: {
      iconBg: 'bg-brand-50',
      iconColor: 'text-hakiardhi-red',
      hoverBg: 'group-hover:from-blue-100 group-hover:to-blue-200',
      accentBorder: 'border-gray-200',
      hoverBorder: 'group-hover:border-gray-200',
      hoverShadow: '',
      ctaColor: 'text-hakiardhi-red hover:text-hakiardhi-red'
    },
    green: {
      iconBg: 'bg-brand-50',
      iconColor: 'text-hakiardhi-red',
      hoverBg: 'group-hover:from-green-100 group-hover:to-green-200',
      accentBorder: 'border-gray-200',
      hoverBorder: 'group-hover:border-gray-200',
      hoverShadow: '',
      ctaColor: 'text-hakiardhi-red hover:text-hakiardhi-red'
    },
    orange: {
      iconBg: 'bg-brand-50',
      iconColor: 'text-hakiardhi-red',
      hoverBg: 'group-hover:from-orange-100 group-hover:to-orange-200',
      accentBorder: 'border-gray-200',
      hoverBorder: 'group-hover:border-gray-200',
      hoverShadow: '',
      ctaColor: 'text-hakiardhi-red hover:text-hakiardhi-red'
    }
  };

  return (
    <section
      ref={sectionRef}
      className={`relative py-20 lg:py-28 xl:py-32 bg-white overflow-hidden ${className}`}
    >

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        {/* Header */}
        <div
          className={`text-center mb-16 lg:mb-20 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Tag */}
          <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-hakiardhi-red">Get Involved</p>

          {/* Heading */}
          <h2 className="text-3xl lg:text-4xl font-bold !text-gray-900 mb-6 leading-tight">
            How You Can Help
          </h2>

          {/* Subheading */}
          <p className="text-lg lg:text-xl !text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Every contribution—big or small—creates lasting change for communities fighting for their land rights
          </p>

        </div>

        {/* Support Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-20 lg:mb-24">
          <AnimatedList staggerDelay={120}>
            {options.map((option, index) => {
              const colors = colorClasses[option.color as keyof typeof colorClasses] || colorClasses.red;
              return (
                <div
                  key={index}
                  className="rounded-xl border border-gray-200 bg-white p-6"
                >

                  {/* Icon */}
                  <div className="mb-5">
                    <div className={`w-12 h-12 rounded-lg ${colors.iconBg} flex items-center justify-center`}>
                      <Icon name={option.icon as any} size="md" className={colors.iconColor} />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {option.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed mb-5">
                    {option.description}
                  </p>

                  {/* CTA Link */}
                  <a
                    href={option.link}
                    className={`inline-flex items-center gap-2 font-semibold text-hakiardhi-red hover:text-hakiardhi-red-dark hover:underline`}
                  >
                    <span className="relative">
                      {option.cta}
                    </span>
                    <Icon
                      name="arrow-right"
                      size="sm"
                      className=" transition-transform duration-300"
                    />
                  </a>
                </div>
              );
            })}
          </AnimatedList>
        </div>

        {/* Featured Donation CTA */}
        <div
          className={`bg-hakiardhi-red relative overflow-hidden rounded-xl px-6 py-12 sm:p-12 lg:p-16 text-center transition-all duration-1000 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >

          <div className="relative z-10">

            {/* Heading */}
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Every Contribution <span className="block mt-2">Matters</span>
            </h3>

            {/* Subheading */}
            <p className="text-lg lg:text-xl text-white/95 mb-10 max-w-2xl mx-auto leading-relaxed">
              Your donation provides legal aid, training, and protection to families fighting for their land rights
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-10">
              <Button
                href="/donate"
                variant="dark"
                size="lg"
                icon={<Icon name="heart" size="sm" />}
              >
                Make a One-Time Gift
              </Button>
              <Button
                href="/donate?type=monthly"
                variant="dark"
                size="lg"
                icon={<Icon name="refresh" size="sm" />}
              >
                Become a Monthly Donor
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 pt-8 border-t border-white/20">
              <div className="flex items-center gap-2.5 text-white/90">
                <div className="flex items-center">
                  <Icon name="shield-check" size="sm" />
                </div>
                <span className="text-sm font-semibold">Secure Donation</span>
              </div>
              <div className="flex items-center gap-2.5 text-white/90">
                <div className="flex items-center">
                  <Icon name="check-circle" size="sm" />
                </div>
                <span className="text-sm font-semibold">Tax Deductible</span>
              </div>
              <div className="flex items-center gap-2.5 text-white/90">
                <div className="flex items-center">
                  <Icon name="eye" size="sm" />
                </div>
                <span className="text-sm font-semibold">100% Transparent</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
