import React from 'react';

interface LogoProps {
  className?: string;
  compact?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '', compact = false }) => {
  return (
    <div className={`flex items-center gap-2.5 ${className}`.trim()}>
      <div className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/15 bg-[#100D1C] shadow-[0_12px_30px_rgba(139,92,246,0.23)]">
        <svg viewBox="0 0 52 52" className="h-6 w-6" aria-hidden="true">
          <defs>
            <linearGradient id="growthpilot-logo-gradient" x1="6" x2="46" y1="8" y2="44" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#A78BFA" />
              <stop offset="45%" stopColor="#EC4899" />
              <stop offset="100%" stopColor="#F97316" />
            </linearGradient>
          </defs>
          <path
            d="M13 32.5L21.5 24L27.5 30L39 17.5"
            fill="none"
            stroke="url(#growthpilot-logo-gradient)"
            strokeWidth="4.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M34.5 17.5H39V22"
            fill="none"
            stroke="url(#growthpilot-logo-gradient)"
            strokeWidth="4.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10.5 15.5L12 11.6L13.6 15.5L17.5 17.1L13.6 18.7L12 22.6L10.5 18.7L6.6 17.1L10.5 15.5Z"
            fill="url(#growthpilot-logo-gradient)"
            opacity="0.95"
          />
        </svg>
      </div>

      {!compact && (
        <div className="flex items-baseline gap-1 text-left">
          <span className="text-lg font-black tracking-[-0.06em] text-[#F8F7FC]">GrowthPilot</span>
          <span className="bg-gradient-to-r from-[#A78BFA] via-[#EC4899] to-[#F97316] bg-clip-text text-base font-black tracking-[-0.05em] text-transparent">
            AI
          </span>
        </div>
      )}
    </div>
  );
};
