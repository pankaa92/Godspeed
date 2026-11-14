import React, {useState} from 'react';
import {Car, MessageCircle, Phone} from 'lucide-react';
import {
  FLEET_VEHICLES,
  FleetVehicle,
  PHONE_DISPLAY,
  PHONE_TEL,
  buildWhatsAppLink,
  formatINR,
} from '../data/taxiData';

const FleetCard: React.FC<{vehicle: FleetVehicle}> = ({vehicle}) => {
  const [imgFailed, setImgFailed] = useState(false);
  const isWide = vehicle.bentoSpan === 'wide';

  const whatsappUrl = buildWhatsAppLink(
    `Hello Godspeed Taxi Services, I want to book the ${vehicle.name} (₹${vehicle.perKmRate}/km*). Please share availability.`
  );

  return (
    <article
      className={`flex flex-col overflow-hidden rounded-2xl border border-sky-100 bg-white shadow-xs transition-shadow duration-200 hover:shadow-md ${
        isWide ? 'lg:col-span-2' : 'lg:col-span-1'
      }`}
    >
      <div
        className={`grid h-full grid-cols-1 ${
          isWide ? 'md:grid-cols-12' : ''
        }`}
      >
        {/* Vehicle Image */}
        <div
          className={`relative overflow-hidden bg-sky-100 ${
            isWide
              ? 'aspect-video md:col-span-6 md:aspect-auto md:h-full'
              : 'aspect-[4/3]'
          }`}
        >
          {!imgFailed ? (
            <img
              src={vehicle.image}
              alt={vehicle.imageAlt}
              referrerPolicy="no-referrer"
              onError={() => setImgFailed(true)}
              className="h-full w-full object-cover object-center"
            />
          ) : (
            <div className="flex h-full min-h-[200px] w-full flex-col items-center justify-center bg-gradient-to-br from-[#0284C7] to-[#075985] p-6 text-white">
              <Car className="h-12 w-12 text-[#FACC15]" />
              <p className="mt-2 font-display text-base font-bold">
                {vehicle.name}
              </p>
            </div>
          )}
        </div>

        {/* Vehicle Details & Tariffs */}
        <div
          className={`flex flex-col justify-between p-5 sm:p-6 ${
            isWide ? 'md:col-span-6' : ''
          }`}
        >
          <div>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-display text-xl font-extrabold text-slate-950">
                {vehicle.name}
              </h3>
              <span className="font-display text-xl font-extrabold tabular-nums text-[#0369A1]">
                ₹{vehicle.perKmRate}/km*
              </span>
            </div>

            <p className="mt-1 text-xs font-medium text-slate-500">
              {vehicle.models} · {vehicle.seats} · {vehicle.luggage}
            </p>

            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              {vehicle.description}
            </p>

            {/* Local 8Hr & IGI Airport Rates */}
            <div className="mt-4 grid grid-cols-2 divide-x divide-sky-100 rounded-xl border border-sky-100 bg-sky-50/60 py-2.5 text-center">
              <div className="px-2">
                <p className="text-[11px] font-medium text-slate-500">
                  8Hr / 80 km Local
                </p>
                <p className="mt-0.5 font-display text-base font-bold tabular-nums text-slate-950">
                  {formatINR(vehicle.local8HrRate)}*
                </p>
              </div>
              <div className="px-2">
                <p className="text-[11px] font-medium text-slate-500">
                  IGI Airport Transfer
                </p>
                <p className="mt-0.5 font-display text-base font-bold tabular-nums text-slate-950">
                  {formatINR(vehicle.airportRate)}*
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2.5 pt-2">
            <a
              href={PHONE_TEL}
              className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-[#FACC15] px-4 py-2 text-sm font-bold tabular-nums text-[#0F172A] transition-colors duration-150 hover:bg-[#EAB308]"
            >
              <Phone className="h-4 w-4 shrink-0" />
              Call {PHONE_DISPLAY}
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Book ${vehicle.name} on WhatsApp`}
              className="inline-flex min-h-[44px] items-center justify-center gap-1.5 whitespace-nowrap rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition-colors duration-150 hover:bg-emerald-700"
            >
              <MessageCircle className="h-4 w-4 shrink-0" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </article>
  );
};

export const FleetSection: React.FC = () => {
  return (
    <section id="fleet" className="border-b border-sky-100 bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-bold tracking-wide text-[#0369A1]">
              Fleet & Tariffs
            </p>
            <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl [text-wrap:balance]">
              Well-maintained AC cabs for every group size.
            </h2>
          </div>
          <p className="max-w-sm text-sm text-slate-600">
            Transparent per-kilometer, 8Hr Delhi local, and IGI Airport rates
            available 24*7.
          </p>
        </div>

        {/* Asymmetric Bento Grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {FLEET_VEHICLES.map((vehicle) => (
            <FleetCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>

        {/* Clear Asterisk Tariff Footnote */}
        <p className="mt-6 rounded-xl border border-sky-100 bg-[#F4FAFF] px-4 py-3 text-xs leading-relaxed text-slate-600 sm:text-sm">
          <span className="font-bold text-slate-900">*Tariff Note:</span> All
          per-kilometer prices, 8Hr local packages, and IGI Airport transfer
          rates shown above are indicative and may vary depending on travel
          season, route distance, toll plazas, state entry taxes, airport
          parking, driver night allowance, and live vehicle availability. Confirm
          your final all-inclusive quote on{' '}
          <a
            href={PHONE_TEL}
            className="font-bold tabular-nums text-[#0369A1] underline"
          >
            {PHONE_DISPLAY}
          </a>
          .
        </p>
      </div>
    </section>
  );
};
