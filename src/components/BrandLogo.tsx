import React from 'react';

interface BrandLogoProps {
  variant?: 'navbar' | 'full';
}

export const BrandEmblemSvg: React.FC<{ className?: string }> = ({
  className = 'w-11 h-11',
}) => (
  <svg
    viewBox="0 0 120 120"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="rgv-silver" x1="10" y1="10" x2="110" y2="110" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#E5E7EB" />
        <stop offset="45%" stopColor="#9CA3AF" />
        <stop offset="75%" stopColor="#F3F4F6" />
        <stop offset="100%" stopColor="#6B7280" />
      </linearGradient>
      <linearGradient id="rgv-gold" x1="20" y1="15" x2="100" y2="105" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#F1C40F" />
        <stop offset="50%" stopColor="#FDE047" />
        <stop offset="100%" stopColor="#CA8A04" />
      </linearGradient>
      <linearGradient id="rgv-valley-arc" x1="24" y1="78" x2="96" y2="78" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#D4212A" />
        <stop offset="50%" stopColor="#F1C40F" />
        <stop offset="100%" stopColor="#34A853" />
      </linearGradient>
    </defs>

    {/* Outer metallic silver bezel */}
    <circle cx="60" cy="60" r="56" fill="#0D0D0D" stroke="url(#rgv-silver)" strokeWidth="4.5" />
    {/* Inner gold accent ring */}
    <circle cx="60" cy="60" r="48" fill="#121212" stroke="url(#rgv-gold)" strokeWidth="2.2" />

    {/* Sun crest over valley hills */}
    <path
      d="M46 42 A14 14 0 0 1 74 42"
      stroke="#F1C40F"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <path
      d="M28 60 Q48 44 65 58 T94 53"
      stroke="#34A853"
      strokeWidth="2.4"
      strokeLinecap="round"
    />

    {/* Neon Red Burger (left side) */}
    <path
      d="M25 56 C25 46, 51 46, 51 56 Z"
      stroke="#D4212A"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
    <circle cx="33" cy="51.5" r="1" fill="#F1C40F" />
    <circle cx="38" cy="50.5" r="1" fill="#F1C40F" />
    <circle cx="43" cy="51.5" r="1" fill="#F1C40F" />
    <path
      d="M23 61 H53"
      stroke="#34A853"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <path
      d="M24 66 H52"
      stroke="#D4212A"
      strokeWidth="3.2"
      strokeLinecap="round"
    />
    <path
      d="M26 71 H50 C50 76, 26 76, 26 71 Z"
      stroke="#F1C40F"
      strokeWidth="2.2"
      strokeLinejoin="round"
    />

    {/* Neon Green & Red Shawarma Wrap (right side) */}
    <path
      d="M66 76 L76 47 C79 44, 88 45, 92 50 L82 78 C77 81, 70 80, 66 76 Z"
      stroke="#34A853"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
    <path
      d="M72 56 L86 61 M70 64 L84 69"
      stroke="#D4212A"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    <circle cx="81" cy="48" r="2.2" fill="#F1C40F" />

    {/* Sweeping Valley swoosh at bottom */}
    <path
      d="M23 79 Q60 98 97 76"
      stroke="url(#rgv-valley-arc)"
      strokeWidth="3.2"
      strokeLinecap="round"
    />
  </svg>
);

export const BrandLogo: React.FC<BrandLogoProps> = ({ variant = 'navbar' }) => {
  if (variant === 'full') {
    return (
      <div className="inline-flex flex-col items-center text-center">
        <BrandEmblemSvg className="w-20 h-20 mb-2" />
        <span className="font-display text-2xl font-bold uppercase tracking-wider text-[#F5F5DC] leading-none">
          Red &amp; Green Valley
        </span>
        <span className="font-script text-lg text-[#F5F5DC]/90 mt-1 leading-tight">
          Burger &amp; Shawarma Joint
        </span>
        <span className="font-display text-xs uppercase tracking-[0.22em] text-[#F1C40F] mt-1">
          Port Harcourt, Nigeria
        </span>
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-3 shrink-0">
      <BrandEmblemSvg className="w-10 h-10 shrink-0" />
      <div className="flex flex-col leading-none">
        <span className="font-display text-base sm:text-lg font-bold uppercase tracking-wider text-[#F5F5DC] whitespace-nowrap">
          Red &amp; Green Valley
        </span>
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#F1C40F] whitespace-nowrap mt-0.5">
          Port Harcourt, Nigeria
        </span>
      </div>
    </div>
  );
};
