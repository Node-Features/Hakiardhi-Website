'use client';

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { THRESHOLDS } from '@/constants/design-tokens';
import Button from '../ui/Button';
import Icon from '../ui/Icon';
import WhatsAppPhoneMockup from '../ui/WhatsAppPhoneMockup';

export interface AIChatbotBannerProps {
  className?: string;
}

export default function AIChatbotBanner({ className = '' }: AIChatbotBannerProps) {
  const [sectionRef, isVisible] = useIntersectionObserver({
    threshold: THRESHOLDS.intersection.low,
    freezeOnceVisible: true,
  });

  return (
    <section
      ref={sectionRef}
      className={`relative py-16 lg:py-20 overflow-hidden ${className}`}
    >
      <div className="bg-hakiardhi-red absolute inset-0" aria-hidden="true"></div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Left - Content */}
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-white/80">Free legal help, 24/7</p>

              {/* Heading */}
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight">
                Get Instant Legal Help via <span className="block mt-2">WhatsApp!</span>
              </h2>

              {/* Description */}
              <p className="text-lg lg:text-xl text-white/95 mb-8 leading-relaxed">
                Our AI-powered chatbot provides immediate legal guidance on land rights, incident reporting,
                and connects you with our legal team when needed - all for FREE.
              </p>

              {/* Features List */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-3 mb-8">
                <div className="flex items-center gap-2">
                  <Icon name="check-circle" size="sm" className="text-white flex-shrink-0" />
                  <span className="text-white font-semibold text-sm">24/7 Availability</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="check-circle" size="sm" className="text-white flex-shrink-0" />
                  <span className="text-white font-semibold text-sm">Instant Response</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="check-circle" size="sm" className="text-white flex-shrink-0" />
                  <span className="text-white font-semibold text-sm">Swahili & English</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="check-circle" size="sm" className="text-white flex-shrink-0" />
                  <span className="text-white font-semibold text-sm">100% Free</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  href="https://wa.me/+255784646752"
                  variant="dark"
                  size="lg"
                  icon={<Icon name="phone" size="sm" />}
                  iconPosition="left"
                  className="w-full sm:w-auto"
                >
                  Start WhatsApp Chat
                </Button>
                <Button
                  href="tel:0800711555"
                  variant="dark"
                  size="lg"
                  icon={<Icon name="phone" size="sm" />}
                  iconPosition="left"
                  className="w-full sm:w-auto"
                >
                  Call 0800 711 555
                </Button>
              </div>

              {/* Alternative Contact */}
              <p className="text-sm text-white/80 mt-4">
                Or call our office line: <a href="tel:+255784646752" className="font-bold underline hover:text-white">0784 646 752</a>
              </p>
            </div>

            {/* Right - realistic WhatsApp conversation on a phone */}
            <div className="flex justify-center lg:justify-end">
              <WhatsAppPhoneMockup />
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
