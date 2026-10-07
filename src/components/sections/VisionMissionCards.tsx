'use client';

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { THRESHOLDS, TYPOGRAPHY } from '@/constants/design-tokens';
import Section from '../ui/Section';
import BackgroundDecor from '../ui/BackgroundDecor';
import Card from '../ui/Card';
import Grid from '../ui/Grid';
import Icon from '../ui/Icon';

export interface VisionMissionCardsProps {
  className?: string;
}

export default function VisionMissionCards({ className = '' }: VisionMissionCardsProps) {
  const [sectionRef, isVisible] = useIntersectionObserver({
    threshold: THRESHOLDS.intersection.low,
    freezeOnceVisible: true,
  });

  return (
    <Section variant="white" spacing="lg" className={className}>
      <BackgroundDecor
        orbs={[
          { position: 'top-right', size: 'md', colors: ['brand', 'orange'], animate: false },
          { position: 'bottom-left', size: 'md', colors: ['blue', 'success'], animate: false },
        ]}
      />

      <Section.Content>
        <Grid cols={{ base: 1, lg: 2 }} gap="xl">
          {/* Vision Card */}
          <div
            className={`transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 -translate-x-10 scale-95'
            }`}
          >
            <div className="relative h-full group">
              {/* Outer glow */}

              <Card variant="elevated" className="relative h-full bg-white/90 border border-gray-100 shadow-sm group-hover:border-brand-500/30 transition-all duration-500">
                <Card.Body className="p-8 lg:p-10">
                  {/* Icon badge */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative">
                      <div className="bg-brand-500/10 relative w-16 h-16 rounded-xl border-2 border-brand-500/30 flex items-center justify-center">
                        <Icon name="eye" size="xl" className="text-brand-500" />
                      </div>
                    </div>
                    <h3 className={`${TYPOGRAPHY.heading.h3.size} ${TYPOGRAPHY.heading.h3.weight} text-hakiardhi-red`}>
                      Our Vision
                    </h3>
                  </div>

                  {/* Main statement */}
                  <div className="bg-brand-50/50 rounded-xl p-6 mb-6 border border-brand-100">
                    <p className={`${TYPOGRAPHY.body.lg.size} font-bold text-gray-900 leading-relaxed`}>
                      A society with a socially just and equitable land tenure system.
                    </p>
                  </div>

                  {/* Key points */}
                  <div className="space-y-3">
                    {[
                      'Social justice in land ownership',
                      'Equity across all communities',
                      'Inclusive rural and peri-urban focus'
                    ].map((point, idx) => (
                      <div key={idx} className="flex items-start gap-3 group/item">
                        <div className="flex-shrink-0 mt-0.5">
                          <div className="bg-brand-500 w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-300">
                            <Icon name="check" size="sm" className="text-white" />
                          </div>
                        </div>
                        <p className="text-gray-700 text-base leading-relaxed">{point}</p>
                      </div>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </div>
          </div>

          {/* Mission Card */}
          <div
            className={`transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-10 scale-95'
            }`}
          >
            <div className="relative h-full group">
              {/* Outer glow */}

              <Card variant="elevated" className="relative h-full bg-white/90 border border-gray-100 shadow-sm group-hover:border-hakiardhi-red/30 transition-all duration-500">
                <Card.Body className="p-8 lg:p-10">
                  {/* Icon badge */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative">
                      <div className="bg-hakiardhi-red/10 relative w-16 h-16 rounded-xl border-2 border-hakiardhi-red/30 flex items-center justify-center">
                        <Icon name="target" size="xl" className="text-hakiardhi-red" />
                      </div>
                    </div>
                    <h3 className={`${TYPOGRAPHY.heading.h3.size} ${TYPOGRAPHY.heading.h3.weight} text-hakiardhi-red`}>
                      Our Mission
                    </h3>
                  </div>

                  {/* Main statement */}
                  <div className="bg-hakiardhi-red/5 rounded-xl p-6 mb-6 border border-hakiardhi-red/20">
                    <p className={`${TYPOGRAPHY.body.lg.size} font-bold text-gray-900 leading-relaxed`}>
                      To promote and protect the land rights of rural and peri-urban communities in Tanzania.
                    </p>
                  </div>

                  {/* Key points */}
                  <div className="space-y-3">
                    {[
                      'Community empowerment and advocacy',
                      'Research-based policy influence',
                      'Legal aid and rights protection'
                    ].map((point, idx) => (
                      <div key={idx} className="flex items-start gap-3 group/item">
                        <div className="flex-shrink-0 mt-0.5">
                          <div className="bg-hakiardhi-red w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-300">
                            <Icon name="check" size="sm" className="text-white" />
                          </div>
                        </div>
                        <p className="text-gray-700 text-base leading-relaxed">{point}</p>
                      </div>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </div>
          </div>
        </Grid>
      </Section.Content>
    </Section>
  );
}
