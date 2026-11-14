import React, {useEffect, useState} from 'react';
import {Menu, MessageCircle, Phone, X} from 'lucide-react';
import {
  BRAND_NAME,
  PHONE_DISPLAY,
  PHONE_TEL,
  buildWhatsAppLink,
} from '../data/taxiData';
import {GodspeedLogo} from './GodspeedLogo';

const NAV_ITEMS = [
  {label: 'Routes', href: '#routes'},
  {label: 'Fleet', href: '#fleet'},
  {label: 'About', href: '#about'},
  {label: 'Contact', href: '#contact'},
];

export const Navbar: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDrawerOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const whatsappUrl = buildWhatsAppLink(
    'Hello Godspeed Taxi Services, I would like to book a cab.'
  );

  return (
    <header className="sticky top-0 z-40 border-b border-sky-100 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Brand lockup (single-line wordmark + logo) */}
        <a
          href="#"
          className="flex shrink-0 items-center gap-3 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0284C7]"
        >
          <GodspeedLogo size={38} />
          <span className="font-display text-lg font-extrabold tracking-tight text-slate-950 sm:text-xl">
            {BRAND_NAME}
          </span>
        </a>

        {/* Zone 2: Bold black navigation links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden items-center gap-8 md:flex"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="shrink-0 whitespace-nowrap text-sm font-bold text-slate-950 underline-offset-4 transition-colors duration-150 hover:text-[#0369A1] hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0284C7]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Single primary action + mobile drawer toggle */}
        <div className="flex shrink-0 items-center gap-3">
          <a
            href={PHONE_TEL}
            className="hidden min-h-[42px] shrink-0 items-center gap-2 whitespace-nowrap rounded-lg bg-[#FACC15] px-4 py-2 text-sm font-bold tabular-nums text-[#0F172A] shadow-xs transition-colors duration-150 hover:bg-[#EAB308] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0369A1] sm:inline-flex"
          >
            <Phone className="h-4 w-4 shrink-0" />
            Call {PHONE_DISPLAY}
          </a>

          <button
            type="button"
            onClick={() => setDrawerOpen((prev) => !prev)}
            aria-expanded={drawerOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={drawerOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-sky-200 bg-sky-50 text-slate-950 transition-colors hover:bg-sky-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0284C7] md:hidden"
          >
            {drawerOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {drawerOpen && (
        <div
          id="mobile-navigation-drawer"
          className="border-t border-sky-100 bg-white px-4 pb-6 pt-3 shadow-lg md:hidden"
        >
          <nav aria-label="Mobile Navigation" className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setDrawerOpen(false)}
                className="flex min-h-[48px] items-center rounded-lg px-3 text-base font-bold text-slate-950 transition-colors hover:bg-sky-50 hover:text-[#0369A1]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="mt-4 grid grid-cols-1 gap-3 border-t border-sky-100 pt-4">
            <a
              href={PHONE_TEL}
              onClick={() => setDrawerOpen(false)}
              className="flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-[#FACC15] px-5 py-3 text-base font-bold tabular-nums text-[#0F172A] transition-colors hover:bg-[#EAB308]"
            >
              <Phone className="h-5 w-5" />
              Call {PHONE_DISPLAY}
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setDrawerOpen(false)}
              className="flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-base font-semibold text-white transition-colors hover:bg-emerald-700"
            >
              <MessageCircle className="h-5 w-5" />
              WhatsApp Booking
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
