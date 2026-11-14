import React, {useState} from 'react';
import {MessageCircle, Phone, Users} from 'lucide-react';
import {
  BRAND_NAME,
  OFFICE_ADDRESS_FULL,
  OFFICE_ADDRESS_SHORT,
  PHONE_DISPLAY,
  PHONE_TEL,
  buildWhatsAppLink,
} from '../data/taxiData';

const DISPATCH_IMAGE =
  '/src/assets/images/about_dispatch_coordinator_1794657016355.jpg';

const SERVICE_PILLARS = [
  {
    number: '01.',
    title: 'Direct Human Phone & WhatsApp Dispatch',
    body: 'Speak straight to our Malviya Nagar operations desk on 8830076310—no automated bots, no surge-pricing surprises, and immediate driver confirmation.',
  },
  {
    number: '02.',
    title: 'Clean, Highway-Ready AC Fleet',
    body: 'Every hatchback, sedan, SUV, and Tempo Traveller is inspected for tyres, cooling, and cabin hygiene before leaving our Delhi base for short or hill-station trips.',
  },
  {
    number: '03.',
    title: 'Honest Per-Kilometer Tariffs',
    body: 'Clear odometer-based billing and upfront route discussions covering tolls, state taxes, and night halts before your journey starts.',
  },
];

export const AboutSection: React.FC = () => {
  const [imgError, setImgError] = useState(false);

  const whatsappUrl = buildWhatsAppLink(
    `Hello ${BRAND_NAME}, I would like to discuss a cab requirement from Delhi.`
  );

  return (
    <section id="about" className="border-b border-sky-100 bg-[#F4FAFF] py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12">
          {/* Left: Dispatch Coordinator Photo */}
          <div className="lg:col-span-5">
            <div className="relative h-80 w-full overflow-hidden rounded-2xl border border-sky-200 bg-sky-100 shadow-xs sm:h-96 lg:h-full lg:min-h-[440px]">
              {!imgError ? (
                <img
                  src={DISPATCH_IMAGE}
                  alt="Godspeed Taxi Services dispatch coordinator reviewing route schedules at the Malviya Nagar office in New Delhi"
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="h-full w-full object-cover object-center"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#0284C7] to-[#075985] p-8 text-center text-white">
                  <Users className="h-12 w-12 text-[#FACC15]" />
                  <p className="mt-3 font-display text-lg font-bold">
                    {OFFICE_ADDRESS_SHORT}
                  </p>
                </div>
              )}

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-950/55 to-transparent p-5 sm:p-6">
                <p className="text-xs font-bold tracking-wide text-[#FACC15]">
                  South Delhi Operations Desk
                </p>
                <p className="mt-1 text-sm font-medium text-white">
                  {OFFICE_ADDRESS_FULL}
                </p>
              </div>
            </div>
          </div>

          {/* Right: Story + 3 Numbered Pillars */}
          <div className="flex flex-col justify-center lg:col-span-7">
            <p className="text-sm font-bold tracking-wide text-[#0369A1]">
              About {BRAND_NAME}
            </p>

            <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl [text-wrap:balance]">
              Dependable Delhi cab dispatch built on direct accountability.
            </h2>

            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Operating out of{' '}
              <span className="font-semibold text-slate-900">
                {OFFICE_ADDRESS_SHORT}
              </span>
              , {BRAND_NAME} coordinates daily local rides, round-the-clock IGI
              Airport transfers, and long-distance highway journeys across North
              India and beyond. Whether it is an early-morning darshan trip to
              Mathura and Vrindavan or a multi-day family tour to Shimla and
              Manali, one call puts a verified driver at your gate.
            </p>

            {/* Call & WhatsApp Buttons */}
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
                className="inline-flex min-h-[46px] items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-emerald-700"
              >
                <MessageCircle className="h-4 w-4 shrink-0" />
                WhatsApp Dispatch
              </a>
            </div>

            {/* 3 Numbered Service Pillars */}
            <div className="mt-8 divide-y divide-sky-200/80 border-t border-sky-200/80">
              {SERVICE_PILLARS.map((pillar) => (
                <div key={pillar.number} className="py-4 sm:py-5">
                  <h3 className="font-display text-base font-bold text-slate-950 sm:text-lg">
                    <span className="mr-2 tabular-nums text-[#0369A1]">
                      {pillar.number}
                    </span>
                    {pillar.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                    {pillar.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
