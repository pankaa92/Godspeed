import React, {useState} from 'react';
import {Check, Copy, MapPin, MessageCircle, Phone} from 'lucide-react';
import {
  BRAND_NAME,
  OFFICE_ADDRESS_FULL,
  PHONE_DISPLAY,
  PHONE_TEL,
  buildWhatsAppLink,
} from '../data/taxiData';
import {GodspeedLogo} from './GodspeedLogo';
import {OfficeLocationMap} from './OfficeLocationMap';

const BOOKING_STEPS = [
  {
    step: '01.',
    title: 'Call or WhatsApp 8830076310',
    detail:
      'Share your Delhi pickup address, destination, travel date, and preferred cab class.',
  },
  {
    step: '02.',
    title: 'Confirm Rate & Vehicle',
    detail:
      'Receive an instant transparent quote and car + driver details directly from our dispatch team.',
  },
  {
    step: '03.',
    title: 'Doorstep or Airport Pickup',
    detail:
      'Your sanitized AC cab arrives on schedule anywhere across Delhi NCR or IGI Airport terminals.',
  },
];

export const ContactAndFooter: React.FC = () => {
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);

  const whatsappUrl = buildWhatsAppLink(
    `Hello ${BRAND_NAME}, I would like to book a taxi. Please assist.`
  );

  const handleCopyPhone = async () => {
    try {
      await navigator.clipboard.writeText(PHONE_DISPLAY);
      setCopiedPhone(true);
      window.setTimeout(() => setCopiedPhone(false), 2400);
    } catch {
      // Ignore clipboard failures
    }
  };

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(OFFICE_ADDRESS_FULL);
      setCopiedAddress(true);
      window.setTimeout(() => setCopiedAddress(false), 2400);
    } catch {
      // Ignore clipboard failures
    }
  };

  return (
    <>
      <section id="contact" className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-bold tracking-wide text-[#0369A1]">
              Contact & Dispatch Office
            </p>
            <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl [text-wrap:balance]">
              Book 24*7 by Phone or WhatsApp—no checkout forms.
            </h2>
            <p className="mt-3 text-base text-slate-600">
              All reservations are confirmed personally by our New Delhi
              dispatch team for reliable pickup timing and clear billing.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
            {/* Left Card: 24*7 Call & WhatsApp Booking + 3-Step Guide */}
            <div className="flex flex-col justify-between rounded-2xl bg-gradient-to-br from-[#075985] via-[#0369A1] to-[#0284C7] p-6 text-white shadow-sm sm:p-8 lg:col-span-6">
              <div>
                <p className="text-xs font-bold tracking-wide text-[#FACC15]">
                  24*7 Direct Booking Desk
                </p>
                <p className="mt-2 font-display text-3xl font-extrabold tabular-nums text-white sm:text-4xl">
                  {PHONE_DISPLAY}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-sky-100">
                  Call or message on WhatsApp anytime for outstation cabs, IGI
                  Airport pickups, or Delhi NCR local packages.
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <a
                    href={PHONE_TEL}
                    className="inline-flex min-h-[46px] items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-[#FACC15] px-5 py-2.5 text-sm font-bold tabular-nums text-[#0F172A] transition-colors duration-150 hover:bg-[#EAB308]"
                  >
                    <Phone className="h-4 w-4 shrink-0" />
                    Call {PHONE_DISPLAY}
                  </a>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[46px] items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-emerald-500"
                  >
                    <MessageCircle className="h-4 w-4 shrink-0" />
                    WhatsApp Booking
                  </a>

                  <button
                    type="button"
                    onClick={handleCopyPhone}
                    className="inline-flex min-h-[46px] items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-white/30 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-white/20"
                  >
                    {copiedPhone ? (
                      <>
                        <Check className="h-4 w-4 text-[#FACC15]" />
                        Copied Number
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        Copy Number
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* 3-Step Booking Guide */}
              <div className="mt-8 border-t border-white/20 pt-6">
                <h3 className="font-display text-base font-bold text-white">
                  How 3-Step Booking Works
                </h3>
                <ol className="mt-4 space-y-4">
                  {BOOKING_STEPS.map((item) => (
                    <li key={item.step} className="flex items-start gap-3">
                      <span className="shrink-0 font-display text-sm font-extrabold tabular-nums text-[#FACC15]">
                        {item.step}
                      </span>
                      <div>
                        <p className="text-sm font-bold text-white">
                          {item.title}
                        </p>
                        <p className="mt-0.5 text-xs leading-relaxed text-sky-100">
                          {item.detail}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Right Card: Office Address + Interactive Google Maps Preview */}
            <div className="flex flex-col justify-between rounded-2xl border border-sky-200 bg-[#F4FAFF] p-6 shadow-xs sm:p-8 lg:col-span-6">
              <div>
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold tracking-wide text-[#0369A1]">
                      Registered Office
                    </p>
                    <h3 className="mt-1.5 flex items-start gap-2 font-display text-xl font-extrabold text-slate-950">
                      <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#0369A1]" />
                      <span>{OFFICE_ADDRESS_FULL}</span>
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyAddress}
                    className="inline-flex min-h-[42px] shrink-0 items-center gap-2 whitespace-nowrap rounded-lg border border-sky-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-900 transition-colors hover:bg-sky-50"
                  >
                    {copiedAddress ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-600" />
                        Copied Address
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5 text-[#0369A1]" />
                        Copy Office Address
                      </>
                    )}
                  </button>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium text-slate-600 sm:text-sm">
                  <span>Open 24*7 (Day & Night Dispatch)</span>
                  <span aria-hidden="true">·</span>
                  <span>
                    Pickup Coverage: South Delhi, Central Delhi, IGI Airport,
                    Gurugram, Noida & Faridabad
                  </span>
                </div>
              </div>

              {/* Google Maps Interactive Location Preview */}
              <div className="mt-6">
                <OfficeLocationMap />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-[#0F172A] py-12 text-slate-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
            {/* Brand & Address */}
            <div className="max-w-md">
              <a href="#" className="inline-flex items-center gap-3">
                <GodspeedLogo size={40} />
                <span className="font-display text-xl font-extrabold tracking-tight text-white">
                  {BRAND_NAME}
                </span>
              </a>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                {OFFICE_ADDRESS_FULL} · 24*7 Delhi Car Rental, IGI Airport
                Transfers & Outstation Cab Dispatch.
              </p>
            </div>

            {/* Footer Navigation */}
            <nav
              aria-label="Footer Navigation"
              className="flex flex-wrap items-center gap-x-7 gap-y-3 text-sm font-semibold text-white"
            >
              <a
                href="#routes"
                className="transition-colors hover:text-[#FACC15]"
              >
                Routes
              </a>
              <a
                href="#fleet"
                className="transition-colors hover:text-[#FACC15]"
              >
                Fleet
              </a>
              <a
                href="#about"
                className="transition-colors hover:text-[#FACC15]"
              >
                About
              </a>
              <a
                href="#contact"
                className="transition-colors hover:text-[#FACC15]"
              >
                Contact
              </a>
            </nav>

            {/* Footer Call & WhatsApp Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={PHONE_TEL}
                className="inline-flex min-h-[44px] items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-[#FACC15] px-5 py-2.5 text-sm font-bold tabular-nums text-[#0F172A] transition-colors hover:bg-[#EAB308]"
              >
                <Phone className="h-4 w-4 shrink-0" />
                Call {PHONE_DISPLAY}
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-500"
              >
                <MessageCircle className="h-4 w-4 shrink-0" />
                WhatsApp
              </a>
            </div>
          </div>

          <div className="mt-10 flex flex-col justify-between gap-3 border-t border-slate-800 pt-6 text-xs text-slate-400 sm:flex-row sm:items-center">
            <p>
              © {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.
            </p>
            <p>
              *Indicative fares; final toll, tax & route quotes confirmed on{' '}
              <span className="tabular-nums text-slate-200">{PHONE_DISPLAY}</span>.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};
