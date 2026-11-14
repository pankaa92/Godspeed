import React, {useMemo, useState} from 'react';
import {
  Check,
  Copy,
  MessageCircle,
  Phone,
  Plane,
  Route,
  SlidersHorizontal,
} from 'lucide-react';
import {
  AIRPORT_TERMINALS,
  AIRPORT_ZONES,
  CabClassId,
  FLEET_VEHICLES,
  LOCAL_AREAS,
  PHONE_DISPLAY,
  PHONE_TEL,
  POPULAR_ROUTES,
  buildWhatsAppLink,
  formatINR,
} from '../data/taxiData';

type TripMode = 'outstation' | 'local' | 'airport';
type OutstationDirection = 'round-trip' | 'one-way';

export const RoutesAndEstimator: React.FC = () => {
  const [tripMode, setTripMode] = useState<TripMode>('outstation');
  const [direction, setDirection] =
    useState<OutstationDirection>('round-trip');
  const [selectedDestId, setSelectedDestId] = useState<string>('agra');
  const [customDistanceKm, setCustomDistanceKm] = useState<number>(320);
  const [selectedCabId, setSelectedCabId] = useState<CabClassId>('sedan');
  const [airportTerminal, setAirportTerminal] = useState<string>(
    AIRPORT_TERMINALS[0]
  );
  const [airportZoneId, setAirportZoneId] = useState<string>(
    AIRPORT_ZONES[0].id
  );
  const [localArea, setLocalArea] = useState<string>(LOCAL_AREAS[0]);
  const [copiedSummary, setCopiedSummary] = useState(false);

  const selectedCab = useMemo(
    () =>
      FLEET_VEHICLES.find((v) => v.id === selectedCabId) ?? FLEET_VEHICLES[1],
    [selectedCabId]
  );

  const selectedRoute = useMemo(
    () => POPULAR_ROUTES.find((r) => r.id === selectedDestId) ?? null,
    [selectedDestId]
  );

  const isCustomCity = selectedDestId === 'custom';

  const calculation = useMemo(() => {
    if (tripMode === 'local') {
      const estimatedFare = selectedCab.local8HrRate;
      const summaryLabel = `Delhi Local 8Hr / 80 km (${localArea})`;
      const detailLine = 'Includes 8 hours & 80 km within Delhi NCR*';
      const whatsappMsg = `Hello Godspeed Taxi Services, I want to book a ${selectedCab.name} for ${summaryLabel}. Estimated tariff shown: ${formatINR(estimatedFare)}*. Please confirm availability.`;
      return {
        estimatedFare,
        summaryLabel,
        detailLine,
        distanceLabel: '80 km / 8 Hours',
        whatsappMsg,
      };
    }

    if (tripMode === 'airport') {
      const zone =
        AIRPORT_ZONES.find((z) => z.id === airportZoneId) ?? AIRPORT_ZONES[0];
      const estimatedFare = selectedCab.airportRate + zone.surcharge;
      const summaryLabel = `IGI Airport (${airportTerminal.split(' (')[0]}) ↔ ${zone.label}`;
      const detailLine = 'Point-to-point AC airport transfer estimate*';
      const whatsappMsg = `Hello Godspeed Taxi Services, I need an IGI Airport cab (${selectedCab.name}) for ${airportTerminal} to/from ${zone.label}. Estimated fare shown: ${formatINR(estimatedFare)}*. Please confirm.`;
      return {
        estimatedFare,
        summaryLabel,
        detailLine,
        distanceLabel: 'Airport Transfer',
        whatsappMsg,
      };
    }

    // Outstation mode
    const oneWayKm = isCustomCity
      ? customDistanceKm
      : (selectedRoute?.oneWayKm ?? 230);
    const destName = isCustomCity
      ? `Custom City (${oneWayKm} km one-way)`
      : (selectedRoute?.routeTitle ?? 'Delhi to Agra');

    const billedKm = direction === 'round-trip' ? oneWayKm * 2 : oneWayKm;
    // One-way drops typically carry a modest return-fuel factor (~15%) compared to flat per-km round trip
    const multiplier = direction === 'round-trip' ? 1 : 1.15;
    const rawEstimate = Math.round(
      billedKm * selectedCab.perKmRate * multiplier
    );
    const estimatedFare = Math.round(rawEstimate / 10) * 10;

    const tripTypeText =
      direction === 'round-trip' ? 'Round Trip' : 'One-Way Drop';
    const summaryLabel = `${destName} · ${tripTypeText}`;
    const detailLine =
      direction === 'round-trip'
        ? `Approx. ${billedKm.toLocaleString('en-IN')} km total distance @ ₹${selectedCab.perKmRate}/km*`
        : `Approx. ${oneWayKm.toLocaleString('en-IN')} km one-way drop estimate*`;

    const whatsappMsg = `Hello Godspeed Taxi Services, I would like a quote/booking for ${destName} (${tripTypeText}) in a ${selectedCab.name}. Estimated distance: ~${billedKm} km, Indicative Fare: ${formatINR(estimatedFare)}*. Please share final quote.`;

    return {
      estimatedFare,
      summaryLabel,
      detailLine,
      distanceLabel: `~${billedKm.toLocaleString('en-IN')} km`,
      whatsappMsg,
    };
  }, [
    tripMode,
    direction,
    isCustomCity,
    customDistanceKm,
    selectedRoute,
    selectedCab,
    airportTerminal,
    airportZoneId,
    localArea,
  ]);

  const handleSelectPopularRoute = (routeId: string) => {
    setTripMode('outstation');
    setSelectedDestId(routeId);
  };

  const handleCopySummary = async () => {
    const text = [
      'Godspeed Taxi Services — Trip Estimate',
      `Route / Package: ${calculation.summaryLabel}`,
      `Cab Class: ${selectedCab.name} (${selectedCab.models})`,
      `Indicative Fare: ${formatINR(calculation.estimatedFare)}* (${calculation.detailLine})`,
      `Book 24*7 Call / WhatsApp: ${PHONE_DISPLAY}`,
    ].join('\n');

    try {
      await navigator.clipboard.writeText(text);
      setCopiedSummary(true);
      window.setTimeout(() => setCopiedSummary(false), 2400);
    } catch {
      // Fallback ignored if clipboard permissions restricted
    }
  };

  return (
    <section
      id="routes"
      className="border-b border-sky-100 bg-[#F4FAFF] py-14 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-bold tracking-wide text-[#0369A1]">
            Routes & Fare Estimator
          </p>
          <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl [text-wrap:balance]">
            Estimate your Delhi trip fare in seconds.
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-600">
            Select your route, trip mode, and AC cab class to view an indicative
            fare, then confirm directly with our Malviya Nagar desk by Call or
            WhatsApp.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          {/* Left: Interactive Fare Calculator */}
          <div className="rounded-2xl border border-sky-200/80 bg-white p-5 shadow-xs sm:p-8 lg:col-span-7">
            {/* Mode Tabs */}
            <div
              role="tablist"
              aria-label="Trip Mode"
              className="grid grid-cols-1 gap-1.5 rounded-xl bg-sky-50 p-1.5 sm:grid-cols-3"
            >
              <button
                type="button"
                role="tab"
                aria-selected={tripMode === 'outstation'}
                onClick={() => setTripMode('outstation')}
                className={`flex min-h-[44px] items-center justify-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-semibold transition-colors duration-150 ${
                  tripMode === 'outstation'
                    ? 'bg-[#0369A1] text-white shadow-xs'
                    : 'text-slate-700 hover:bg-white/70 hover:text-slate-950'
                }`}
              >
                <Route className="h-4 w-4 shrink-0" />
                Outstation
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={tripMode === 'local'}
                onClick={() => setTripMode('local')}
                className={`flex min-h-[44px] items-center justify-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-semibold transition-colors duration-150 ${
                  tripMode === 'local'
                    ? 'bg-[#0369A1] text-white shadow-xs'
                    : 'text-slate-700 hover:bg-white/70 hover:text-slate-950'
                }`}
              >
                <SlidersHorizontal className="h-4 w-4 shrink-0" />
                Delhi Local (8Hr / 80 km)
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={tripMode === 'airport'}
                onClick={() => setTripMode('airport')}
                className={`flex min-h-[44px] items-center justify-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-semibold transition-colors duration-150 ${
                  tripMode === 'airport'
                    ? 'bg-[#0369A1] text-white shadow-xs'
                    : 'text-slate-700 hover:bg-white/70 hover:text-slate-950'
                }`}
              >
                <Plane className="h-4 w-4 shrink-0" />
                IGI Airport
              </button>
            </div>

            {/* Mode-Specific Controls */}
            {tripMode === 'outstation' && (
              <div className="mt-6 space-y-5">
                {/* Round Trip / One-Way Toggle */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="text-sm font-bold text-slate-900">
                    Trip Type
                  </span>
                  <div className="inline-flex rounded-lg border border-sky-200 bg-sky-50 p-1">
                    <button
                      type="button"
                      onClick={() => setDirection('round-trip')}
                      className={`min-h-[38px] whitespace-nowrap rounded-md px-3.5 py-1.5 text-xs font-bold transition-colors ${
                        direction === 'round-trip'
                          ? 'bg-white text-[#0369A1] shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Round Trip
                    </button>
                    <button
                      type="button"
                      onClick={() => setDirection('one-way')}
                      className={`min-h-[38px] whitespace-nowrap rounded-md px-3.5 py-1.5 text-xs font-bold transition-colors ${
                        direction === 'one-way'
                          ? 'bg-white text-[#0369A1] shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      One-Way Drop
                    </button>
                  </div>
                </div>

                {/* Destination Buttons */}
                <div>
                  <span className="block text-sm font-bold text-slate-900">
                    Select Destination from Delhi
                  </span>
                  <div className="mt-2.5 grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {POPULAR_ROUTES.map((route) => {
                      const active = selectedDestId === route.id;
                      return (
                        <button
                          key={route.id}
                          type="button"
                          onClick={() => setSelectedDestId(route.id)}
                          className={`min-h-[44px] rounded-xl border px-3 py-2 text-left text-xs font-semibold transition-colors duration-150 sm:text-sm ${
                            active
                              ? 'border-[#0284C7] bg-sky-50 text-[#075985] ring-1 ring-[#0284C7]'
                              : 'border-slate-200 bg-white text-slate-700 hover:border-sky-300 hover:bg-sky-50/50'
                          }`}
                        >
                          <span className="block truncate">{route.label}</span>
                          <span className="mt-0.5 block text-[11px] font-medium tabular-nums text-slate-500">
                            ~{route.oneWayKm} km one-way
                          </span>
                        </button>
                      );
                    })}

                    <button
                      type="button"
                      onClick={() => setSelectedDestId('custom')}
                      className={`min-h-[44px] rounded-xl border px-3 py-2 text-left text-xs font-semibold transition-colors duration-150 sm:text-sm ${
                        isCustomCity
                          ? 'border-[#0284C7] bg-sky-50 text-[#075985] ring-1 ring-[#0284C7]'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-sky-300 hover:bg-sky-50/50'
                      }`}
                    >
                      <span className="block truncate">Custom City</span>
                      <span className="mt-0.5 block text-[11px] font-medium tabular-nums text-slate-500">
                        100–1200 km slider
                      </span>
                    </button>
                  </div>
                </div>

                {/* Custom City Distance Slider */}
                <div
                  className={`rounded-xl border p-4 transition-colors ${
                    isCustomCity
                      ? 'border-sky-300 bg-sky-50/60'
                      : 'border-slate-200 bg-slate-50/60'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <label
                      htmlFor="custom-distance-slider"
                      className="text-sm font-bold text-slate-900"
                    >
                      Custom One-Way Distance
                    </label>
                    <span className="font-display text-base font-extrabold tabular-nums text-[#0369A1]">
                      {isCustomCity
                        ? customDistanceKm
                        : (selectedRoute?.oneWayKm ?? customDistanceKm)}{' '}
                      km
                    </span>
                  </div>
                  <input
                    id="custom-distance-slider"
                    type="range"
                    min={100}
                    max={1200}
                    step={10}
                    value={
                      isCustomCity
                        ? customDistanceKm
                        : (selectedRoute?.oneWayKm ?? customDistanceKm)
                    }
                    onChange={(e) => {
                      setSelectedDestId('custom');
                      setCustomDistanceKm(Number(e.target.value));
                    }}
                    className="godspeed-slider mt-3 w-full"
                  />
                  <div className="mt-1.5 flex justify-between text-xs font-medium tabular-nums text-slate-500">
                    <span>100 km</span>
                    <span>650 km</span>
                    <span>1,200 km</span>
                  </div>
                </div>
              </div>
            )}

            {tripMode === 'local' && (
              <div className="mt-6 rounded-xl border border-sky-200 bg-sky-50/50 p-4">
                <label
                  htmlFor="local-pickup-area"
                  className="block text-sm font-bold text-slate-900"
                >
                  Delhi NCR Pickup Zone (8 Hours / 80 km Package)
                </label>
                <select
                  id="local-pickup-area"
                  value={localArea}
                  onChange={(e) => setLocalArea(e.target.value)}
                  className="mt-2 min-h-[44px] w-full rounded-lg border border-sky-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-900 focus:border-[#0284C7] focus:outline-none"
                >
                  {LOCAL_AREAS.map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
                </select>
                <p className="mt-2 text-xs text-slate-600">
                  Great for full-day Delhi sightseeing, business meetings, and
                  multi-stop shopping. Extra hours/km charged per actuals.*
                </p>
              </div>
            )}

            {tripMode === 'airport' && (
              <div className="mt-6 grid grid-cols-1 gap-4 rounded-xl border border-sky-200 bg-sky-50/50 p-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="airport-terminal"
                    className="block text-sm font-bold text-slate-900"
                  >
                    IGI Terminal
                  </label>
                  <select
                    id="airport-terminal"
                    value={airportTerminal}
                    onChange={(e) => setAirportTerminal(e.target.value)}
                    className="mt-2 min-h-[44px] w-full rounded-lg border border-sky-200 bg-white px-3 py-2 text-sm font-medium text-slate-900 focus:border-[#0284C7] focus:outline-none"
                  >
                    {AIRPORT_TERMINALS.map((term) => (
                      <option key={term} value={term}>
                        {term}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="airport-zone"
                    className="block text-sm font-bold text-slate-900"
                  >
                    Pickup / Drop Zone
                  </label>
                  <select
                    id="airport-zone"
                    value={airportZoneId}
                    onChange={(e) => setAirportZoneId(e.target.value)}
                    className="mt-2 min-h-[44px] w-full rounded-lg border border-sky-200 bg-white px-3 py-2 text-sm font-medium text-slate-900 focus:border-[#0284C7] focus:outline-none"
                  >
                    {AIRPORT_ZONES.map((zone) => (
                      <option key={zone.id} value={zone.id}>
                        {zone.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Cab Class Selector */}
            <div className="mt-6">
              <span className="block text-sm font-bold text-slate-900">
                Choose Cab Class
              </span>
              <div className="mt-2.5 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                {FLEET_VEHICLES.map((cab) => {
                  const isSelected = cab.id === selectedCabId;
                  return (
                    <button
                      key={cab.id}
                      type="button"
                      onClick={() => setSelectedCabId(cab.id)}
                      className={`flex min-h-[76px] flex-col justify-between rounded-xl border p-3 text-left transition-colors duration-150 ${
                        isSelected
                          ? 'border-[#0284C7] bg-sky-50 text-[#075985] ring-1 ring-[#0284C7]'
                          : 'border-slate-200 bg-white text-slate-800 hover:border-sky-300'
                      }`}
                    >
                      <span className="text-xs font-bold leading-snug sm:text-sm">
                        {cab.shortName}
                      </span>
                      <span className="mt-2 block text-xs font-extrabold tabular-nums text-[#0369A1]">
                        ₹{cab.perKmRate}/km*
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Live Fare Summary Card */}
            <div className="mt-6 rounded-xl bg-gradient-to-br from-[#075985] via-[#0369A1] to-[#0284C7] p-5 text-white sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold tracking-wide text-[#FACC15]">
                    Estimated Trip Summary
                  </p>
                  <p className="mt-1 font-display text-lg font-bold text-white">
                    {calculation.summaryLabel}
                  </p>
                  <p className="mt-0.5 text-sm text-sky-100">
                    {selectedCab.name} · {selectedCab.seats}
                  </p>
                </div>

                <div className="text-left sm:text-right">
                  <p className="text-xs font-medium text-sky-100">
                    Indicative Estimate
                  </p>
                  <p className="font-display text-3xl font-extrabold tabular-nums text-[#FACC15] sm:text-4xl">
                    {formatINR(calculation.estimatedFare)}*
                  </p>
                </div>
              </div>

              <p className="mt-3 border-t border-white/15 pt-3 text-xs leading-relaxed text-sky-100">
                {calculation.detailLine} Tolls, state border taxes, parking,
                and driver night allowance (if applicable) are billed extra at
                actuals.
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <a
                  href={PHONE_TEL}
                  className="inline-flex min-h-[46px] flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-[#FACC15] px-4 py-2.5 text-sm font-bold tabular-nums text-[#0F172A] transition-colors duration-150 hover:bg-[#EAB308]"
                >
                  <Phone className="h-4 w-4 shrink-0" />
                  Call {PHONE_DISPLAY}
                </a>

                <a
                  href={buildWhatsAppLink(calculation.whatsappMsg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[46px] flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-emerald-500"
                >
                  <MessageCircle className="h-4 w-4 shrink-0" />
                  Book on WhatsApp
                </a>

                <button
                  type="button"
                  onClick={handleCopySummary}
                  className="inline-flex min-h-[46px] shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-white/30 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-white/20"
                >
                  {copiedSummary ? (
                    <>
                      <Check className="h-4 w-4 text-[#FACC15]" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      Copy Summary
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Right: Popular Delhi Outstation Routes */}
          <div className="rounded-2xl border border-sky-200/80 bg-white p-5 shadow-xs sm:p-8 lg:col-span-5">
            <div className="flex items-baseline justify-between gap-4 border-b border-sky-100 pb-4">
              <div>
                <h3 className="font-display text-xl font-extrabold text-slate-950">
                  Popular Delhi Outstation Routes
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  Click any route to load into the fare estimator
                </p>
              </div>
              <span className="shrink-0 text-xs font-semibold text-[#0369A1]">
                Round Trip*
              </span>
            </div>

            <div className="divide-y divide-slate-100">
              {POPULAR_ROUTES.map((route) => {
                const isSelected =
                  tripMode === 'outstation' && selectedDestId === route.id;
                return (
                  <button
                    key={route.id}
                    type="button"
                    onClick={() => handleSelectPopularRoute(route.id)}
                    className={`group flex w-full items-center justify-between gap-3 py-3.5 text-left transition-colors ${
                      isSelected
                        ? 'bg-sky-50/70 px-2.5 -mx-2.5 rounded-lg'
                        : 'hover:bg-sky-50/40 px-2.5 -mx-2.5 rounded-lg'
                    }`}
                  >
                    <div className="min-w-0">
                      <p className="font-display text-sm font-bold text-slate-900 group-hover:text-[#0369A1] sm:text-base">
                        {route.label}
                      </p>
                      <p className="mt-0.5 text-xs text-slate-500">
                        <span className="tabular-nums">~{route.oneWayKm} km</span>
                        {' · '}
                        {route.driveTime}
                      </p>
                    </div>

                    <div className="shrink-0 text-right tabular-nums">
                      <p className="text-xs font-bold text-slate-900 sm:text-sm">
                        Sedan {formatINR(route.sedanRoundEstimate)}*
                      </p>
                      <p className="mt-0.5 text-xs font-semibold text-[#0369A1]">
                        SUV {formatINR(route.suvRoundEstimate)}*
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            <p className="mt-4 border-t border-sky-100 pt-4 text-xs leading-relaxed text-slate-500">
              *Indicative round-trip estimates from Delhi. One-way drops and
              multi-day Himachal/Uttarakhand packages available on request at{' '}
              <a
                href={PHONE_TEL}
                className="font-bold tabular-nums text-[#0369A1] underline"
              >
                {PHONE_DISPLAY}
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
