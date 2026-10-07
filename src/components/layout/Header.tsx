'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Button from '../ui/Button';
import LanguageSwitcher from '../ui/LanguageSwitcher';

const navigationItems = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'What We Do', href: '/what-we-do' },
  { label: 'Programs', href: '/programs' },
  { label: 'Research', href: '/research' },
  { label: 'Resource Centre', href: '/resource-centre' },
  { label: 'News & Events', href: '/news-events' },
  { label: 'Gallery', href: '/gallery' },
];

const secondaryItems = [
  { label: 'Contact Us', href: '/contact' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Work With Us', href: '/work-with-us' },
  { label: 'LRM Network', href: '/lrm-network' },
];

function PhoneIcon() {
  return (
    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname?.startsWith(href);

  // Lock page scroll and allow Escape to close while the menu is open
  useEffect(() => {
    if (!isMenuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, [isMenuOpen]);

  // Close the menu after navigating
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        {/* Top bar */}
        <div className="bg-hakiardhi-red text-white">
          <div className="mx-auto flex h-8 max-w-7xl items-center justify-between px-4 text-xs sm:px-6 lg:h-9 lg:px-8">
            <div className="flex min-w-0 items-center gap-4 sm:gap-6">
              <span className="hidden items-center gap-1.5 md:flex">
                <ClockIcon />
                Mon – Fri, 08:00 – 17:00
              </span>
              <a href="tel:+255784646752" className="flex items-center gap-1.5 hover:underline">
                <PhoneIcon />
                +255 784 646 752
              </a>
              <a href="mailto:info@hakiardhi.or.tz" className="flex min-w-0 items-center gap-1.5 hover:underline">
                <MailIcon />
                <span className="truncate">info@hakiardhi.or.tz</span>
              </a>
            </div>

            <div className="hidden items-center gap-5 font-medium lg:flex">
              {secondaryItems.map((item) => (
                <Link key={item.href} href={item.href} className="hover:underline">
                  {item.label}
                </Link>
              ))}
              <LanguageSwitcher variant="dropdown" theme="light" size="sm" />
            </div>
          </div>
        </div>

        {/* Main bar */}
        <div className="border-b border-gray-200 bg-white">
          <nav
            aria-label="Main navigation"
            className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-20 lg:px-8"
          >
            <Link href="/" className="flex-shrink-0" aria-label="HakiArdhi home">
              <Image
                src="/images/logo.png"
                alt="HakiArdhi"
                width={280}
                height={84}
                className="h-11 w-auto lg:h-14"
                priority
              />
            </Link>

            <div className="hidden items-center gap-6 lg:flex xl:gap-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className={`text-[15px] font-semibold transition-colors hover:text-hakiardhi-red ${
                    isActive(item.href) ? 'text-hakiardhi-red' : 'text-gray-900'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Button href="/legal-aid" variant="primary" size="md">
                Get Legal Aid
              </Button>
            </div>

            <button
              type="button"
              onClick={() => setIsMenuOpen(true)}
              className="-mr-2 flex h-11 w-11 items-center justify-center rounded-lg text-gray-900 hover:bg-gray-100 lg:hidden"
              aria-label="Open navigation menu"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeWidth={2} d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile menu: a full-screen sheet with its own close button,
          so nothing sits on top of it and the close control is always reachable */}
      {isMenuOpen && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="fixed inset-0 z-[60] flex flex-col bg-white lg:hidden"
        >
          <div className="flex h-16 flex-shrink-0 items-center justify-between border-b border-gray-200 px-4 sm:px-6">
            <Link href="/" aria-label="HakiArdhi home" onClick={() => setIsMenuOpen(false)}>
              <Image src="/images/logo.png" alt="HakiArdhi" width={280} height={84} className="h-11 w-auto" />
            </Link>
            <button
              type="button"
              onClick={() => setIsMenuOpen(false)}
              className="-mr-2 flex h-11 w-11 items-center justify-center rounded-lg text-gray-900 hover:bg-gray-100"
              aria-label="Close navigation menu"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeWidth={2} d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          <nav aria-label="Mobile navigation" className="flex-1 overflow-y-auto px-4 py-2 sm:px-6">
            <ul className="divide-y divide-gray-100">
              {navigationItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    aria-current={isActive(item.href) ? 'page' : undefined}
                    className={`flex items-center justify-between py-3.5 text-base font-semibold ${
                      isActive(item.href) ? 'text-hakiardhi-red' : 'text-gray-900'
                    }`}
                  >
                    {item.label}
                    <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>

            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-1 border-t border-gray-200 pt-4">
              {secondaryItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex-shrink-0 space-y-3 border-t border-gray-200 px-4 py-4 sm:px-6">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Language</span>
              <LanguageSwitcher variant="toggle" theme="light" size="sm" />
            </div>
            <Button href="/legal-aid" variant="primary" size="lg" fullWidth onClick={() => setIsMenuOpen(false)}>
              Get Legal Aid
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
