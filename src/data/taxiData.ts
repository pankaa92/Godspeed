export const BRAND_NAME = 'Godspeed Taxi Services';
export const PHONE_DISPLAY = '8830076310';
export const PHONE_TEL = 'tel:+918830076310';
export const WHATSAPP_BASE = 'https://wa.me/918830076310';
export const OFFICE_ADDRESS_SHORT = '125 Malviya Nagar, New Delhi';
export const OFFICE_ADDRESS_FULL = '125 Malviya Nagar, New Delhi - 110017, India';
export const GOOGLE_MAPS_DIRECT_URL =
  'https://www.google.com/maps/search/?api=1&query=125+Malviya+Nagar+New+Delhi+110017+India';

export type CabClassId = 'suv' | 'sedan' | 'hatchback' | 'tempo';

export interface FleetVehicle {
  id: CabClassId;
  name: string;
  shortName: string;
  models: string;
  perKmRate: number;
  local8HrRate: number;
  airportRate: number;
  seats: string;
  luggage: string;
  description: string;
  highlights: string[];
  image: string;
  imageAlt: string;
  bentoSpan: 'wide' | 'standard';
}

export const FLEET_VEHICLES: FleetVehicle[] = [
  {
    id: 'suv',
    name: 'SUV & Family MPV',
    shortName: 'SUV & MPV',
    models: 'Innova Crysta · Maruti Ertiga · Kia Carens',
    perKmRate: 18,
    local8HrRate: 2400,
    airportRate: 1500,
    seats: '6+1 Seats',
    luggage: '5 Large Bags',
    description:
      'Built for family highway journeys, mountain climbs to Shimla or Manali, and comfortable multi-city outstation tours with dual-zone AC.',
    highlights: ['Dual-row AC vents', 'Captains / folding rear seats', 'Roof carrier option on request'],
    image: '/src/assets/images/fleet_suv_mpv_1794657014566.jpg',
    imageAlt: 'White 7-seater SUV family touring car on a scenic North Indian highway overlook',
    bentoSpan: 'wide',
  },
  {
    id: 'sedan',
    name: 'Comfort AC Sedan',
    shortName: 'AC Sedan',
    models: 'Maruti Dzire · Honda Amaze · Toyota Etios',
    perKmRate: 13,
    local8HrRate: 1800,
    airportRate: 950,
    seats: '4+1 Seats',
    luggage: '3 Suitcases',
    description:
      'Balanced cabin comfort and generous boot space for Mathura, Vrindavan, Agra, Jaipur, and executive IGI Airport pickups.',
    highlights: ['Dedicated boot space', 'Chilled AC cabin', 'Ideal for 2–4 travellers'],
    image: '/src/assets/images/fleet_comfort_sedan_1794657015605.jpg',
    imageAlt: 'White compact AC sedan taxi parked outside a modern Delhi airport arrival terminal',
    bentoSpan: 'standard',
  },
  {
    id: 'hatchback',
    name: 'Economy Hatchback',
    shortName: 'Hatchback',
    models: 'Maruti WagonR · Swift · Hyundai i10',
    perKmRate: 11,
    local8HrRate: 1500,
    airportRate: 800,
    seats: '4+1 Seats',
    luggage: '2 Cabin Bags',
    description:
      'Value-focused AC cabs starting at ₹11/km* for solo flyers, couples, South Delhi city errands, and budget day trips.',
    highlights: ['Lowest per-km tariff', 'Nimble NCR city maneuvering', 'Clean AC interiors'],
    image: '/src/assets/images/fleet_economy_hatchback_1794657015780.jpg',
    imageAlt: 'White compact hatchback city cab on a sunlit residential street in South Delhi',
    bentoSpan: 'standard',
  },
  {
    id: 'tempo',
    name: '12-Seater Tempo Traveller',
    shortName: 'Tempo Traveller',
    models: 'Force Traveller Executive AC · Maharaja Pushback',
    perKmRate: 26,
    local8HrRate: 4200,
    airportRate: 2800,
    seats: '12+1 Seats',
    luggage: '12+ Bags (Roof + Rear)',
    description:
      'Spacious high-roof group coach for wedding guests, corporate offsites, pilgrimage circuits, and Himachal or Uttarakhand expeditions.',
    highlights: ['High-back pushback seats', 'Full aisle headroom', 'Dedicated luggage carrier'],
    image: '/src/assets/images/fleet_tempo_traveller_1794657016139.jpg',
    imageAlt: 'White 12-seater executive Tempo Traveller van on a clear Himalayan highway',
    bentoSpan: 'wide',
  },
];

export interface OutstationDestination {
  id: string;
  label: string;
  routeTitle: string;
  oneWayKm: number;
  driveTime: string;
  highwayNote: string;
  sedanRoundEstimate: number;
  suvRoundEstimate: number;
}

export const POPULAR_ROUTES: OutstationDestination[] = [
  {
    id: 'mathura',
    label: 'Mathura',
    routeTitle: 'Delhi to Mathura',
    oneWayKm: 160,
    driveTime: '3 – 3.5 hrs',
    highwayNote: 'Via Yamuna Expressway',
    sedanRoundEstimate: 4160,
    suvRoundEstimate: 5760,
  },
  {
    id: 'vrindavan',
    label: 'Vrindavan',
    routeTitle: 'Delhi to Vrindavan',
    oneWayKm: 155,
    driveTime: '3 – 3.5 hrs',
    highwayNote: 'Via Yamuna Expressway',
    sedanRoundEstimate: 4030,
    suvRoundEstimate: 5580,
  },
  {
    id: 'agra',
    label: 'Agra',
    routeTitle: 'Delhi to Agra',
    oneWayKm: 230,
    driveTime: '3.5 – 4 hrs',
    highwayNote: 'Via Yamuna Expressway',
    sedanRoundEstimate: 5980,
    suvRoundEstimate: 8280,
  },
  {
    id: 'jaipur',
    label: 'Jaipur',
    routeTitle: 'Delhi to Jaipur',
    oneWayKm: 280,
    driveTime: '4.5 – 5 hrs',
    highwayNote: 'Via Delhi–Mumbai / NH-48',
    sedanRoundEstimate: 7280,
    suvRoundEstimate: 10080,
  },
  {
    id: 'haridwar-rishikesh',
    label: 'Haridwar & Rishikesh',
    routeTitle: 'Delhi to Haridwar & Rishikesh',
    oneWayKm: 240,
    driveTime: '5 – 5.5 hrs',
    highwayNote: 'Via NH-334 / Meerut Expy',
    sedanRoundEstimate: 6240,
    suvRoundEstimate: 8640,
  },
  {
    id: 'chandigarh',
    label: 'Chandigarh',
    routeTitle: 'Delhi to Chandigarh',
    oneWayKm: 250,
    driveTime: '4.5 – 5 hrs',
    highwayNote: 'Via NH-44 GT Karnal Rd',
    sedanRoundEstimate: 6500,
    suvRoundEstimate: 9000,
  },
  {
    id: 'shimla',
    label: 'Shimla',
    routeTitle: 'Delhi to Shimla',
    oneWayKm: 350,
    driveTime: '7.5 – 8.5 hrs',
    highwayNote: 'Via NH-44 & NH-5',
    sedanRoundEstimate: 9100,
    suvRoundEstimate: 12600,
  },
  {
    id: 'manali',
    label: 'Manali',
    routeTitle: 'Delhi to Manali',
    oneWayKm: 540,
    driveTime: '11 – 12 hrs',
    highwayNote: 'Via Chandigarh–Kiratpur–Mandi',
    sedanRoundEstimate: 14040,
    suvRoundEstimate: 19440,
  },
];

export const AIRPORT_ZONES = [
  {id: 'south-delhi', label: 'South Delhi / Malviya Nagar', surcharge: 0},
  {id: 'central-delhi', label: 'Central & New Delhi', surcharge: 150},
  {id: 'gurugram-noida', label: 'Gurugram / Noida / Ghaziabad', surcharge: 350},
] as const;

export const AIRPORT_TERMINALS = [
  'Terminal 3 (T3 International & Domestic)',
  'Terminal 2 (T2 Domestic)',
  'Terminal 1 (T1 Domestic)',
] as const;

export const LOCAL_AREAS = [
  'South Delhi / Malviya Nagar',
  'Central Delhi / Connaught Place',
  'West & North Delhi',
  'Gurugram / Noida / Faridabad',
] as const;

export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function buildWhatsAppLink(message: string): string {
  return `${WHATSAPP_BASE}?text=${encodeURIComponent(message)}`;
}
