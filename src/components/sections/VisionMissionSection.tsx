'use client';

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { THRESHOLDS, SPACING, CONTENT_WIDTHS, RESPONSIVE } from '@/constants/design-tokens';
import Section from '../ui/Section';
import BackgroundDecor from '../ui/BackgroundDecor';
import Card from '../ui/Card';
import Grid from '../ui/Grid';
import Icon from '../ui/Icon';
import Image from 'next/image';

export interface VisionMissionSectionProps {
  className?: string;
}

export default function VisionMissionSection({ className = '' }: VisionMissionSectionProps) {
  // Use optimized intersection observer hook
  const [sectionRef, isVisible] = useIntersectionObserver({
    threshold: THRESHOLDS.intersection.low,
    freezeOnceVisible: true,
  });

  return (
    <section
      ref={sectionRef}
      id="vision-mission-section"
      className={`bg-gray-50 relative ${RESPONSIVE.section} overflow-hidden ${className}`}
    >
      {/* Enhanced decorative gradient orbs */}

      <div className={`container mx-auto ${RESPONSIVE.container} relative z-10`}>
        {/* Enhanced History Section */}
        <div
          className={`${SPACING.margin.section.lg} text-center ${CONTENT_WIDTHS.text.full} mx-auto transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className={SPACING.component.relaxed}>
            {/* Decorative top element */}
            <div className="flex justify-center mb-6">
            </div>

            <h2 className="text-3xl lg:text-4xl text-hakiardhi-red font-bold mb-4">
              Our History
            </h2>

            {/* Decorative underline */}
            <div className="flex justify-center mb-6">
              <div className="bg-hakiardhi-red h-1.5 w-24 rounded-full"></div>
            </div>

            <div className="relative">
              {/* Background card for history text */}
              <Card variant="elevated" className="relative bg-white/80 border border-gray-200">
                <Card.Body className="p-8 lg:p-10">
                  <p className="text-lg lg:text-xl text-gray-800 leading-relaxed">
                    The Land Rights Research & Resources Institute (LARRRI/HAKIARDHI) was founded in{' '}
                    <span className="bg-hakiardhi-red/10 inline-flex items-center justify-center px-3 py-1 text-hakiardhi-red font-bold text-xl rounded-lg border-2 border-hakiardhi-red/20">
                      1994
                    </span>{' '}
                    and registered as a non-governmental organization. The Institute was established in recognition of the need
                    to generate and sustain public debates and participation of small producers in villages
                    and peri-urban areas on land tenure and other important related issues.
                  </p>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>

        {/* Vision and Mission Grid */}
        <Grid cols={{ base: 1, lg: 2 }} gap="xl" className="mt-8 lg:mt-12">
          {/* Vision - Enhanced */}
          <div
            className={`transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 -translate-x-10 scale-95'
            }`}
          >
            <div className="relative h-full group">
              {/* Outer glow */}

              <Card variant="elevated" className="relative h-full bg-white/90 border border-gray-200 group-hover:border-brand-500/30 transition-all duration-500">
                <Card.Body className="p-8 lg:p-10">
                  {/* Icon badge */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative">
                      <div className="bg-brand-500/10 relative w-16 h-16 rounded-xl border-2 border-brand-500/30 flex items-center justify-center">
                        <Icon name="eye" size="xl" className="text-brand-500" />
                      </div>
                    </div>
                    <h3 className="text-brand-500 text-2xl lg:text-4xl font-bold ">
                      Our Vision
                    </h3>
                  </div>

                  {/* Main statement */}
                  <div className="bg-brand-50/50 rounded-xl p-6 mb-6 border border-brand-100">
                    <p className="text-xl lg:text-2xl font-bold text-gray-900 leading-relaxed">
                      A society with a socially just and equitable land tenure system.
                    </p>
                  </div>

                  {/* Key points */}
                  <div className="space-y-4">
                    {[
                      'Emphasizes social justice in land ownership and access',
                      'Advocates for equity in land tenure across all communities',
                      'Future-oriented approach to land rights reform',
                      'Inclusive vision encompassing rural and peri-urban populations'
                    ].map((point, idx) => (
                      <div key={idx} className="flex items-start gap-3 group/item">
                        <div className="flex-shrink-0 mt-0.5">
                          <div className="bg-brand-500 w-7 h-7 rounded-full flex items-center justify-center transition-transform duration-300">
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

          {/* Mission - Enhanced */}
          <div
            className={`transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-10 scale-95'
            }`}
          >
            <div className="relative h-full group">
              {/* Outer glow */}

              <Card variant="elevated" className="relative h-full bg-white/90 border border-gray-200 group-hover:border-hakiardhi-red/30 transition-all duration-500">
                <Card.Body className="p-8 lg:p-10">
                  {/* Icon badge */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative">
                      <div className="bg-hakiardhi-red/10 relative w-16 h-16 rounded-xl border-2 border-hakiardhi-red/30 flex items-center justify-center">
                        <Icon name="target" size="xl" className="text-hakiardhi-red" />
                      </div>
                    </div>
                    <h3 className="text-hakiardhi-red text-2xl lg:text-4xl font-bold ">
                      Our Mission
                    </h3>
                  </div>

                  {/* Main statement */}
                  <div className="bg-hakiardhi-red/5 rounded-xl p-6 mb-6 border border-hakiardhi-red/10">
                    <p className="text-xl lg:text-2xl font-bold text-gray-900 leading-relaxed">
                      To research into, train, advocate for, and promote land rights of the rural-based
                      and peri-urban small producers who constitute the majority of the Tanzanian
                      population.
                    </p>
                  </div>

                  {/* Key pillars */}
                  <div className="space-y-4">
                    {[
                      { title: 'Research', desc: 'Conducting evidence-based studies on land tenure issues', icon: 'document' },
                      { title: 'Training', desc: 'Building capacity on land rights knowledge', icon: 'book' },
                      { title: 'Advocacy', desc: 'Promoting policy reforms for equitable land access', icon: 'megaphone' },
                      { title: 'Promotion', desc: 'Raising awareness about land rights among small producers', icon: 'users' }
                    ].map((pillar, idx) => (
                      <div key={idx} className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:border-hakiardhi-red/20 transition-all duration-300 group/pillar">
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0">
                            <div className="bg-hakiardhi-red w-10 h-10 rounded-lg flex items-center justify-center transition-transform duration-300">
                              <Icon name={pillar.icon as any} size="sm" className="text-white" />
                            </div>
                          </div>
                          <div className="flex-1">
                            <h4 className="text-hakiardhi-red text-lg font-bold mb-1">
                              {pillar.title}
                            </h4>
                            <p className="text-gray-700 text-sm leading-relaxed">
                              {pillar.desc}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </div>
          </div>
        </Grid>

        {/* Enhanced Target Groups */}
        <div
          className={`mt-20 lg:mt-32 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="text-center mb-12">
            {/* Decorative top element */}
            <div className="flex justify-center mb-6">
            </div>

            <h3 className="text-hakiardhi-red text-3xl lg:text-5xl xl:text-6xl font-bold mb-4">
              Target Groups
            </h3>

            {/* Decorative underline */}
            <div className="flex justify-center mb-6">
              <div className="bg-hakiardhi-red h-1.5 w-24 rounded-full"></div>
            </div>

            <p className="text-lg lg:text-xl text-gray-700 mb-6 max-w-3xl mx-auto leading-relaxed font-medium">
              We focus on empowering small-scale producers in rural and peri-urban areas across Tanzania
            </p>
          </div>

          <Grid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} gap="lg">
            {[
              { name: 'Pastoralists', image: '/images/pastoralists.png', icon: 'cow' },
              { name: 'Farmers', image: '/images/farmers.png', icon: 'wheat' },
              { name: 'Fisher folks', image: '/images/fisher_folks.png', icon: 'fish' },
              { name: 'Artisanal miners', image: '/images/artisanal_minors.png', icon: 'pickaxe' },
              { name: 'Fruit pickers', image: '/images/fuit_pickers.png', icon: 'apple' },
              { name: 'Hunters', image: '/images/public_debate_1.JPG', icon: 'bow-arrow' },
              { name: 'Beekeepers', image: '/images/beekeepers.png', icon: 'bee' },
            ].map((beneficiary, index) => (
              <div
                key={index}
                className="group relative"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Outer glow effect */}

                <Card variant="elevated" className="relative overflow-hidden border-2 border-gray-200 group-hover:border-hakiardhi-red/30 transition-all duration-500 h-full">
                  {/* Image container */}
                  <div className="relative h-56 w-full bg-gray-200 overflow-hidden">
                    <Image
                      src={beneficiary.image}
                      alt={beneficiary.name}
                      fill
                      className="object-cover transition-transform duration-500"
                    />
                    {/* Enhanced gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-all duration-500"></div>

                    {/* Icon badge */}
                    <div className="absolute top-4 right-4">
                      <div className="w-10 h-10 rounded-full bg-white/20 border border-white/30 flex items-center justify-center group-hover:bg-hakiardhi-red transition-all duration-300">
                        <Icon name={beneficiary.icon as any} size="sm" className="text-white" />
                      </div>
                    </div>

                    {/* Name label */}
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <div className="flex items-center justify-between">
                        <h4 className="text-white text-lg font-bold tracking-wide group-hover:text-xl transition-all duration-300">
                          {beneficiary.name}
                        </h4>
                        <div className="bg-hakiardhi-red w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300">
                          <span className="text-white text-xs font-bold">{index + 1}</span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom accent */}
                    <div className="bg-hakiardhi-red absolute bottom-0 left-0 right-0 h-1 "></div>
                  </div>
                </Card>
              </div>
            ))}
          </Grid>
        </div>
      </div>
    </section>
  );
}
