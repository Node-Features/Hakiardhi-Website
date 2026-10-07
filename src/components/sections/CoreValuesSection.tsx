'use client';

import { useMultipleIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { coreValues } from '@/data/coreValues';
import { THRESHOLDS, SPACING, CONTENT_WIDTHS, RESPONSIVE } from '@/constants/design-tokens';
import BackgroundDecor from '../ui/BackgroundDecor';
import Card from '../ui/Card';
import Icon from '../ui/Icon';

export interface CoreValuesSectionProps {
  className?: string;
}

export default function CoreValuesSection({ className = '' }: CoreValuesSectionProps) {
  // Use optimized single observer for all core values
  const [visibleIndices, getRef] = useMultipleIntersectionObserver(
    coreValues.length,
    { threshold: THRESHOLDS.intersection.default }
  );


  return (
    <section
      className={`bg-gray-50 relative ${RESPONSIVE.section} overflow-hidden ${className}`}
    >
      {/* Enhanced decorative gradient orbs */}

      <div className={`container mx-auto ${RESPONSIVE.container} relative z-10`}>
        {/* Enhanced Section Header */}
        <div className={`text-center ${SPACING.margin.section.md}`}>
          <div className={SPACING.component.relaxed}>
            {/* Decorative top element */}
            <div className="flex justify-center mb-6">
            </div>

            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>

            {/* Decorative underline */}
            <div className="flex justify-center mb-6">
              <div className="bg-hakiardhi-red h-1.5 w-24 rounded-full"></div>
            </div>

            <p className={`text-base lg:text-xl text-gray-700 ${CONTENT_WIDTHS.text.wide} mx-auto leading-relaxed font-medium`}>
              The fundamental principles that guide HakiArdhi's operations and decision-making,
              rooted in respect for indigenous knowledge and participatory approaches to land rights.
            </p>
          </div>
        </div>

        {/* Core Values List */}
        <div className="space-y-0">
          {coreValues.map((value, index) => {
            const isEven = index % 2 === 0;
            const isVisible = visibleIndices.get(index) || false;

            return (
              <div key={index}>
                <div
                  ref={getRef(index) as React.RefObject<HTMLDivElement>}
                  data-index={index}
                  className={`grid grid-cols-1 lg:grid-cols-2 ${SPACING.gap.xl} items-center ${SPACING.padding.lg} transition-all duration-1000 ${
                    isVisible ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  {/* Text Content - Enhanced Card */}
                  <div
                    className={`${isEven ? 'lg:order-1' : 'lg:order-2'} transition-all duration-1000 ${
                      isVisible
                        ? 'translate-x-0 scale-100'
                        : isEven
                        ? '-translate-x-10 scale-95'
                        : 'translate-x-10 scale-95'
                    } flex flex-col justify-center`}
                  >
                    <Card variant="elevated" className="bg-white/90 border border-gray-200 hover:border-hakiardhi-red/20 transition-all duration-500 h-full">
                      <Card.Body className="p-8 lg:p-10">
                        <div className={SPACING.component.loose}>
                          {/* Icon and Title */}
                          <div className="flex items-center gap-5 mb-6">
                            <div className="relative flex-shrink-0">
                              {/* Icon background glow */}
                              <div className="bg-hakiardhi-red/10 relative w-16 h-16 flex items-center justify-center rounded-xl border-2 border-brand-500/20">
                                <div className="w-10 h-10 text-brand-500">
                                  {value.icon}
                                </div>
                              </div>
                            </div>
                            <div className="flex-1">
                              <h3 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 leading-tight">
                                {value.title}
                              </h3>
                            </div>
                          </div>

                          {/* Description */}
                          <p className="text-lg lg:text-xl text-gray-700 leading-relaxed mb-8">
                            {value.description}
                          </p>

                          {/* In Practice Section - Enhanced */}
                          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                            <div className="flex items-center gap-2 mb-4">
                              <div className="bg-hakiardhi-red w-8 h-8 rounded-lg flex items-center justify-center">
                                <Icon name="star" size="sm" className="text-white" />
                              </div>
                              <h4 className="text-hakiardhi-red text-lg font-bold ">
                                In Practice
                              </h4>
                            </div>
                            <div className="space-y-3">
                              {value.inPractice.map((practice, practiceIndex) => (
                                <div key={practiceIndex} className="flex items-start gap-3 group">
                                  <div className="flex-shrink-0 mt-0.5">
                                    <div className="bg-brand-500 w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-300">
                                      <Icon name="check" size="sm" className="text-white" />
                                    </div>
                                  </div>
                                  <p className="text-gray-700 text-base leading-relaxed">{practice}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </div>

                  {/* Image/Visual - Enhanced */}
                  <div
                    className={`${isEven ? 'lg:order-2' : 'lg:order-1'} transition-all duration-1000 ${
                      isVisible
                        ? 'translate-x-0 scale-100'
                        : isEven
                        ? 'translate-x-10 scale-95'
                        : '-translate-x-10 scale-95'
                    } flex items-center justify-center`}
                  >
                    <div className="relative w-full max-w-md group">
                      {/* Outer glow effect */}

                      <div className="bg-white relative aspect-square w-full rounded-xl overflow-hidden border-2 border-gray-200 group-hover:border-hakiardhi-red/40 transition-all duration-500">
                        {/* Background gradient patterns */}
                        <div className="bg-brand-50/50 absolute inset-0 "></div>

                        {/* Icon/Visual Representation */}
                        <div className="absolute inset-0 flex items-center justify-center p-12">
                          <div className="w-full h-full text-brand-500/30 group-hover:text-brand-500/50 transition-all duration-500">
                            {value.icon}
                          </div>
                        </div>

                        {/* Value Number - Enhanced Badge */}
                        <div className="absolute top-6 right-6 z-10">
                          <div className="relative">
                            {/* Badge glow */}
                            <div className="bg-hakiardhi-red relative w-20 h-20 rounded-full flex items-center justify-center ring-2 ring-white/50 transition-transform duration-300">
                              <span className="bg-hakiardhi-red text-3xl font-bold text-white">
                                {String(index + 1).padStart(2, '0')}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Bottom Accent - Enhanced */}
                        <div className="bg-hakiardhi-red absolute bottom-0 left-0 right-0 h-2 "></div>

                        {/* Corner decorations */}
                        <div className="absolute bottom-0 right-0 w-16 h-16 border-r-4 border-hakiardhi-red/30 rounded-br-xl"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Divider between values */}
                {index < coreValues.length - 1 && (
                  <div className="flex items-center justify-center py-12 lg:py-16">
                    <div className="flex items-center gap-3 w-full max-w-3xl">
                      <div className="flex-1 h-px "></div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-brand-500 "></div>
                        <div className="w-3 h-3 rounded-full bg-hakiardhi-red"></div>
                        <div className="w-2 h-2 rounded-full bg-brand-500 " style={{ animationDelay: '0.5s' }}></div>
                      </div>
                      <div className="flex-1 h-px "></div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Values in Action - Enhanced Design */}
        <div className="mt-20 lg:mt-32">
          <div className="relative overflow-hidden">
            {/* Enhanced Background decoration with patterns */}
            <div className="bg-hakiardhi-red/5 absolute inset-0 rounded-xl"></div>

            {/* Decorative border */}
            <div className="absolute inset-0 rounded-xl border-2 border-gray-200"></div>

            {/* Content */}
            <div className="relative px-6 py-12 lg:px-16 lg:py-20">
              <div className="max-w-4xl mx-auto text-center space-y-8">
                {/* Enhanced Icon/Badge */}
                <div className="flex justify-center">
                  <div className="relative">
                    {/* Badge glow effect */}
                    <div className="bg-hakiardhi-red relative w-24 h-24 rounded-full flex items-center justify-center ring-2 ring-white/50 ">
                      <Icon name="heart" size="xl" className="text-white" />
                    </div>
                  </div>
                </div>

                {/* Enhanced Title */}
                <div className="space-y-4">
                  <h3 className="text-3xl lg:text-5xl xl:text-6xl font-bold text-gray-900">
                    Values in <span className="text-hakiardhi-red ">Action</span>
                  </h3>
                  <div className="flex justify-center">
                    <div className="bg-hakiardhi-red h-1.5 w-32 rounded-full"></div>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-6">
                  <p className="text-xl lg:text-2xl text-gray-800 leading-relaxed font-medium">
                    For over 30 years, these core values have guided our work with rural and peri-urban
                    communities across Tanzania, helping us build a movement for equitable land tenure.
                  </p>

                  <Card variant="elevated" className="bg-white/80 ">
                    <Card.Body className="py-6 px-8">
                      <p className="text-lg text-hakiardhi-red font-semibold leading-relaxed">
                        Every program, research initiative, and advocacy effort reflects our commitment to
                        these principles.
                      </p>
                    </Card.Body>
                  </Card>
                </div>

                {/* Enhanced Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
                  {[
                    { value: '30+', label: 'Years of Impact', icon: 'calendar' },
                    { value: '500+', label: 'Communities Served', icon: 'users' },
                    { value: '100%', label: 'Values-Driven', icon: 'heart' }
                  ].map((stat, idx) => (
                    <div key={idx} className="group">
                      <div className="relative">
                        {/* Stat card glow */}

                        <div className="relative bg-white/80 rounded-xl p-6 border-2 border-gray-200 group-hover:border-hakiardhi-red/30 transform transition-all duration-500">
                          {/* Icon badge */}
                          <div className="flex justify-center mb-4">
                            <div className="bg-hakiardhi-red w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300">
                              <Icon name={stat.icon as any} size="md" className="text-white" />
                            </div>
                          </div>

                          {/* Stat value */}
                          <div className="text-hakiardhi-red text-5xl lg:text-6xl font-bold mb-2 text-center">
                            {stat.value}
                          </div>

                          {/* Stat label */}
                          <div className="text-sm font-bold text-gray-600 uppercase tracking-wider text-center">
                            {stat.label}
                          </div>

                          {/* Bottom accent */}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
