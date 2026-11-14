import React from 'react';

interface GodspeedLogoProps {
  className?: string;
  size?: number;
}

export const GodspeedLogo: React.FC<GodspeedLogoProps> = ({
  className = '',
  size = 40,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id="godspeed-sky-bg"
          x1="4"
          y1="4"
          x2="44"
          y2="44"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#0284C7" />
          <stop offset="100%" stopColor="#075985" />
        </linearGradient>
      </defs>

      {/* Sky-blue square-rounded emblem */}
      <rect
        x="2"
        y="2"
        width="44"
        height="44"
        rx="11"
        fill="url(#godspeed-sky-bg)"
      />
      <rect
        x="2.75"
        y="2.75"
        width="42.5"
        height="42.5"
        rx="10.25"
        stroke="#38BDF8"
        strokeOpacity="0.45"
        strokeWidth="1.5"
      />

      {/* Aerodynamic speed lines on the left */}
      <path
        d="M7 17H15.5"
        stroke="#BAE6FD"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M5.5 23.5H13.5"
        stroke="#E0F2FE"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M8.5 30H15"
        stroke="#BAE6FD"
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      {/* Stylized white "G" crest */}
      <path
        d="M34.5 16.5C32.4 14.3 29.4 13 26 13C19.6 13 14.8 17.8 14.8 24C14.8 30.2 19.6 35 26 35C31.7 35 35.8 31.4 36.6 25.8H26.5"
        stroke="#FFFFFF"
        strokeWidth="4.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Yellow forward-motion arrow accent */}
      <path
        d="M27.5 23.8H39.5M39.5 23.8L35.2 19.6M39.5 23.8L35.2 28"
        stroke="#FACC15"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
