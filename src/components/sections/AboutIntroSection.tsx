'use client';

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { THRESHOLDS, SPACING, TYPOGRAPHY, CONTENT_WIDTHS } from '@/constants/design-tokens';
import Section from '../ui/Section';
import BackgroundDecor from '../ui/BackgroundDecor';
import Card from '../ui/Card';

export interface AboutIntroSectionProps {
  className?: string;
}

export default function AboutIntroSection({ className = '' }: AboutIntroSectionProps) {
  const [sectionRef, isVisible] = useIntersectionObserver({
    threshold: THRESHOLDS.intersection.low,
    freezeOnceVisible: true,
  });

  return (
    <Section variant="light" spacing="lg" className={className}>
      <BackgroundDecor
        orbs={[
          { position: 'top-left', size: 'lg', colors: ['brand', 'orange'], animate: true },
          { position: 'bottom-right', size: 'lg', colors: ['success', 'blue'], animate: true },
        ]}
      />

      <Section.Content>
        <div
          ref={sectionRef}
          className={`text-center ${CONTENT_WIDTHS.text.full} mx-auto transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Decorative top element */}
          <div className="flex justify-center mb-6">
          </div>

          <h2 className={`${TYPOGRAPHY.heading.h2.size} ${TYPOGRAPHY.heading.h2.weight} ${SPACING.margin.element.md} text-hakiardhi-red`}>
            About HakiArdhi
          </h2>

          {/* Decorative underline */}
          <div className="flex justify-center mb-8">
            <div className="bg-hakiardhi-red h-1.5 w-24 rounded-full"></div>
          </div>

          <div className="relative">
            {/* Background glow */}

            <Card variant="elevated" className="relative bg-white/80 border border-gray-200">
              <Card.Body className="p-8 lg:p-12">
                <p className={`${TYPOGRAPHY.body.lg.size} ${TYPOGRAPHY.body.lg.lineHeight} text-gray-800 ${SPACING.margin.element.lg}`}>
                  The Land Rights Research & Resources Institute (LARRRI/HAKIARDHI) was founded in{' '}
                  <span className="bg-hakiardhi-red/10 inline-flex items-center justify-center px-3 py-1 text-hakiardhi-red font-bold text-xl rounded-lg border-2 border-hakiardhi-red/20">
                    1994
                  </span>{' '}
                  and registered as a non-governmental organization. The Institute was established in recognition of the need
                  to generate and sustain public debates and participation of small producers in villages
                  and peri-urban areas on land tenure and other important related issues.
                </p>

                <p className={`${TYPOGRAPHY.body.lg.size} ${TYPOGRAPHY.body.lg.lineHeight} text-gray-700`}>
                  For over three decades, we have been at the forefront of protecting land rights and empowering
                  communities across Tanzania through comprehensive research, training, advocacy, and legal support.
                </p>
              </Card.Body>
            </Card>
          </div>
        </div>
      </Section.Content>
    </Section>
  );
}
