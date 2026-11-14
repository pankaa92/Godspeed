import React, {useState} from 'react';
import {ArrowRight, Car, MessageCircle, Phone} from 'lucide-react';
import {
  PHONE_DISPLAY,
  PHONE_TEL,
  buildWhatsAppLink,
} from '../data/taxiData';

const HERO_CORRIDORS = [
  'Mathura',
  'Vrindavan',
  'Agra',
  'Jaipur',
  'Chandigarh',
  'Shimla',
  'Manali',
];

const HERO_IMAGE = '/src/assets/images/hero_delhi_cab_1794657014587.jpg';

export const HeroSection: React.FC = () => {
  const [imgError, setImgError] = useState(false);

  const whatsappUrl = buildWhatsAppLink(
    'Hello Godspeed Taxi Services, I want to enquire about booking a cab from Delhi.'
  );

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#075985] via-[#0369A1] to-[#0284C7] pb-12 pt-10 text-white sm:pb-16 sm:pt-14 lg:pb-20 lg:pt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* 2-Column Hero Split */}
        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Left Copy & Primary CTAs */}
          <div className="flex flex-col justify-center lg:col-span-6 xl:col-span-6">
            <p className="font-display text-sm font-bold tracking-wide text-[#FACC15] sm:text-base">
              24*7 Booking Available
            </p>

            <h1 className="mt-3 max-w-xl font-display text-[clamp(2.25rem,4vw,3.75rem)] font-extrabold leading-[1.08] tracking-tight text-white [text-wrap:balance]">
              Book cars from Delhi to anywhere.
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-sky-100 sm:text-lg">
              Clean, air-conditioned outstation cabs, punctual IGI Airport
              transfers, and flexible Delhi NCR local rides—confirmed in minutes
              over a direct Call or WhatsApp message on{' '}
              <span className="font-semibold tabular-nums text-white">
                {PHONE_DISPLAY}
              </span>
              .
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <a
                href={PHONE_TEL}
                className="inline-flex min-h-[48px] shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-[#FACC15] px-6 py-3 text-base font-bold tabular-nums text-[#0F172A] shadow-md transition-colors duration-150 hover:bg-[#EAB308] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <Phone className="h-5 w-5 shrink-0" />
                Call {PHONE_DISPLAY}
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-emerald-600 px-6 py-3 text-base font-semibold text-white shadow-md transition-colors duration-150 hover:bg-emerald-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <MessageCircle className="h-5 w-5 shrink-0" />
                WhatsApp Booking
              </a>
            </div>

            <div className="mt-5">
              <a
                href="#routes"
                className="inline-flex items-center gap-2 text-sm font-semibold text-sky-100 underline decoration-sky-300/60 underline-offset-4 transition-colors duration-150 hover:text-[#FACC15] hover:decoration-[#FACC15]"
              >
                Estimate Your Trip Fare
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Right High-Resolution Delhi Cab Photography */}
          <div className="lg:col-span-6 xl:col-span-6">
            <div className="relative h-72 w-full overflow-hidden rounded-2xl bg-[#075985] shadow-2xl ring-1 ring-white/20 sm:h-96 lg:h-full lg:min-h-[380px]">
              {!imgError ? (
                <img
                  src={HERO_IMAGE}
                  alt="Clean white AC sedan taxi cruising along a tree-lined New Delhi avenue"
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="h-full w-full object-cover object-center"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#0284C7] to-[#075985] p-8 text-center">
                  <Car className="h-14 w-14 text-[#FACC15]" />
                  <p className="mt-3 font-display text-xl font-bold text-white">
                    Delhi NCR & Pan-India AC Fleet
                  </p>
                </div>
              )}

              {/* Bottom contrast scrim with key corridors */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-950/55 to-transparent px-5 pb-5 pt-14 sm:px-6 sm:pb-6">
                <p className="text-xs font-semibold tracking-wide text-[#FACC15]">
                  Direct Outstation Corridors from Delhi
                </p>
                <p className="mt-1.5 text-sm font-medium leading-relaxed text-white sm:text-base">
                  {HERO_CORRIDORS.join(' · ')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column Summary Strip Below */}
        <div className="mt-10 grid grid-cols-1 divide-y divide-white/15 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
          <div className="px-6 py-5">
            <p className="font-display text-2xl font-extrabold tabular-nums text-[#FACC15]">
              {PHONE_DISPLAY}
            </p>
            <p className="mt-1 text-sm font-medium text-sky-100">
              24*7 Call & WhatsApp Line
            </p>
          </div>

          <div className="px-6 py-5 sm:border-t lg:border-t-0">
            <p className="font-display text-2xl font-extrabold tabular-nums text-white">
              ₹11 / km*
            </p>
            <p className="mt-1 text-sm font-medium text-sky-100">
              Starting Rate *May vary
            </p>
          </div>

          <div className="px-6 py-5 sm:border-t lg:border-t-0">
            <p className="font-display text-2xl font-extrabold tabular-nums text-white">
              15–20 min
            </p>
            <p className="mt-1 text-sm font-medium text-sky-100">
              Avg. South Delhi Dispatch
            </p>
          </div>

          <div className="px-6 py-5 sm:border-t lg:border-t-0">
            <p className="font-display text-2xl font-extrabold text-white">
              Pan-India
            </p>
            <p className="mt-1 text-sm font-medium text-sky-100">
              Delhi Pickup to Any City
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
