import React, {useEffect, useState} from 'react';
import {
  APILoadingStatus,
  APIProvider,
  AdvancedMarker,
  InfoWindow,
  Map as GoogleMap,
  Pin,
  useAdvancedMarkerRef,
  useApiLoadingStatus,
  useMapsLibrary,
} from '@vis.gl/react-google-maps';
import {ExternalLink, Loader2, MapPin, Navigation} from 'lucide-react';
import {
  BRAND_NAME,
  GOOGLE_MAPS_DIRECT_URL,
  OFFICE_ADDRESS_FULL,
  PHONE_DISPLAY,
} from '../data/taxiData';

interface LatLngLiteral {
  lat: number;
  lng: number;
}

interface ResolvedOfficePlace {
  location: LatLngLiteral;
  formattedAddress: string;
  displayName: string;
}

const ATTRIBUTION_IDS = ['gmp_mcp_codeassist_v1_aistudio'];

function getMapsApiKey(): string {
  const globalKey = (globalThis as unknown as {GOOGLE_MAPS_API_KEY?: string})
    .GOOGLE_MAPS_API_KEY;
  return globalKey || import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';
}

function OfficeMapInner() {
  const placesLib = useMapsLibrary('places');
  const loadingStatus = useApiLoadingStatus();
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [infoOpen, setInfoOpen] = useState(true);
  const [resolvedPlace, setResolvedPlace] = useState<ResolvedOfficePlace | null>(
    null
  );
  const [lookupError, setLookupError] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(true);

  useEffect(() => {
    if (
      loadingStatus === APILoadingStatus.FAILED ||
      loadingStatus === APILoadingStatus.AUTH_FAILURE
    ) {
      setIsSearching(false);
      setLookupError('Google Maps preview is currently unavailable.');
      if (loadingStatus === APILoadingStatus.AUTH_FAILURE) {
        window.dispatchEvent(new CustomEvent('gmp-quota-exceeded'));
      }
    }
  }, [loadingStatus]);

  useEffect(() => {
    if (!placesLib) return;

    let cancelled = false;

    async function resolveOfficeLocation() {
      setIsSearching(true);
      setLookupError(null);

      const queries = [
        '125 Malviya Nagar, New Delhi 110017, India',
        'Malviya Nagar, New Delhi 110017, India',
      ];

      for (const query of queries) {
        try {
          const searchRequest = {
            textQuery: query,
            fields: ['displayName', 'formattedAddress', 'location'],
            region: 'in',
            language: 'en',
            maxResultCount: 1,
            internalUsageAttributionIds: ATTRIBUTION_IDS,
          };
          const {places} = await placesLib.Place.searchByText(
            searchRequest as Parameters<typeof placesLib.Place.searchByText>[0]
          );

          if (cancelled) return;

          const first = places?.[0];
          if (first?.location) {
            setResolvedPlace({
              location: {
                lat: first.location.lat(),
                lng: first.location.lng(),
              },
              formattedAddress:
                first.formattedAddress || OFFICE_ADDRESS_FULL,
              displayName: BRAND_NAME,
            });
            setIsSearching(false);
            return;
          }
        } catch (err: unknown) {
          if (cancelled) return;
          const message = err instanceof Error ? err.message : String(err);
          const upper = message.toUpperCase();
          if (
            upper.includes('RESOURCE_EXHAUSTED') ||
            upper.includes('OVER_QUERY_LIMIT') ||
            upper.includes('QUOTA')
          ) {
            window.dispatchEvent(new CustomEvent('gmp-quota-exceeded'));
            setLookupError('Google Maps Platform quota reached.');
            setIsSearching(false);
            return;
          }
        }
      }

      if (!cancelled) {
        setLookupError(
          'Could not load the live map pin right now. Open Google Maps directly for directions.'
        );
        setIsSearching(false);
      }
    }

    void resolveOfficeLocation();

    return () => {
      cancelled = true;
    };
  }, [placesLib]);

  if (lookupError) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center bg-sky-50/70 p-6 text-center">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-[#0369A1] text-white">
          <MapPin className="h-6 w-6" />
        </div>
        <p className="font-display text-base font-bold text-slate-900">
          {BRAND_NAME}
        </p>
        <p className="mt-1 text-sm text-slate-600">{OFFICE_ADDRESS_FULL}</p>
        <p className="mt-2 max-w-xs text-xs text-slate-500">{lookupError}</p>
        <a
          href={GOOGLE_MAPS_DIRECT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-[#0369A1] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#075985]"
        >
          <Navigation className="h-4 w-4" />
          Open in Google Maps
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    );
  }

  if (isSearching || !resolvedPlace) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center bg-sky-50/80 p-6 text-center">
        <Loader2 className="h-7 w-7 animate-spin text-[#0284C7]" />
        <p className="mt-3 text-sm font-medium text-slate-700">
          Loading Malviya Nagar location preview...
        </p>
      </div>
    );
  }

  return (
    <GoogleMap
      mapId="DEMO_MAP_ID"
      defaultCenter={resolvedPlace.location}
      defaultZoom={15}
      gestureHandling="cooperative"
      mapTypeControl={false}
      streetViewControl={false}
      internalUsageAttributionIds={ATTRIBUTION_IDS}
      style={{width: '100%', height: '100%'}}
    >
      <AdvancedMarker
        ref={markerRef}
        position={resolvedPlace.location}
        title={`${BRAND_NAME} — ${OFFICE_ADDRESS_FULL}`}
        onClick={() => setInfoOpen(true)}
      >
        <Pin
          background="#0369A1"
          borderColor="#075985"
          glyphColor="#FACC15"
          scale={1.15}
        />
      </AdvancedMarker>

      {infoOpen && marker && (
        <InfoWindow
          anchor={marker}
          maxWidth={260}
          onCloseClick={() => setInfoOpen(false)}
        >
          <div className="p-1 text-slate-900">
            <p className="font-display text-sm font-bold text-[#075985]">
              {BRAND_NAME}
            </p>
            <p className="mt-1 text-xs leading-snug text-slate-700">
              {OFFICE_ADDRESS_FULL}
            </p>
            <p className="mt-1.5 text-xs font-semibold tabular-nums text-slate-900">
              24*7 Dispatch: {PHONE_DISPLAY}
            </p>
            <a
              href={GOOGLE_MAPS_DIRECT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-[#0369A1] underline hover:text-[#075985]"
            >
              Directions in Google Maps
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}

export const OfficeLocationMap: React.FC = () => {
  const apiKey = getMapsApiKey();

  return (
    <div className="overflow-hidden rounded-xl border border-sky-100 bg-sky-50">
      <div className="h-[300px] w-full sm:h-[340px]">
        {apiKey ? (
          <APIProvider
            apiKey={apiKey}
            libraries={['places', 'marker']}
            language="en"
            region="IN"
          >
            <OfficeMapInner />
          </APIProvider>
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center bg-sky-50/70 p-6 text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-[#0369A1] text-white">
              <MapPin className="h-6 w-6" />
            </div>
            <p className="font-display text-base font-bold text-slate-900">
              {BRAND_NAME}
            </p>
            <p className="mt-1 text-sm text-slate-600">{OFFICE_ADDRESS_FULL}</p>
            <a
              href={GOOGLE_MAPS_DIRECT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-[#0369A1] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#075985]"
            >
              <Navigation className="h-4 w-4" />
              View Office on Google Maps
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
