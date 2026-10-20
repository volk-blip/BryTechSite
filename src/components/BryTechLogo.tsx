import React from 'react';

interface BryTechLogoProps {
  /**
   * 'light-surface': for white/light backgrounds (Navbar, Footer, light modals)
   * 'dark-surface': for dark backgrounds (Dark cards, chat headers, dark badges)
   */
  theme?: 'light-surface' | 'dark-surface';
  size?: 'sm' | 'md' | 'lg';
  subtitle?: string;
  showWordmark?: boolean;
  className?: string;
}

/**
 * Official BryTech Logo implanted from the founder's custom SVG mark,
 * ensuring the brand name is always rendered as "BryTech".
 */
export const BryTechLogo: React.FC<BryTechLogoProps> = ({
  theme = 'light-surface',
  size = 'md',
  subtitle,
  showWordmark = true,
  className = '',
}) => {
  const dimensions =
    size === 'sm'
      ? { box: 32, textClass: 'text-base', subClass: 'text-[9px]' }
      : size === 'lg'
      ? { box: 44, textClass: 'text-xl', subClass: 'text-[11px]' }
      : { box: 38, textClass: 'text-[19px]', subClass: 'text-[10px]' };

  const isDarkSurface = theme === 'dark-surface';

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Precision Cut 'B' Monogram Mark from attached SVG */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 40 40"
        fill="none"
        width={dimensions.box}
        height={dimensions.box}
        className="shrink-0 transition-transform duration-300 group-hover:scale-105"
        aria-hidden="true"
      >
        <rect
          width="40"
          height="40"
          rx="10"
          fill={isDarkSurface ? '#FFFFFF' : '#1d1d1f'}
        />
        <path
          d="M13 11 H23.5 C27 11 29.5 13 29.5 16 C29.5 18.2 28 19.8 25.5 20.3 C28.5 20.8 30.5 22.8 30.5 26 C30.5 29.5 27.5 31.5 23.5 31.5 H13 V11 Z 
             M17.5 14.8 V18.5 H22.5 C24.5 18.5 25.5 17.5 25.5 16.5 C25.5 15.5 24.5 14.8 22.5 14.8 H17.5 Z 
             M17.5 22.2 V27.5 H23 C25.2 27.5 26.2 26.5 26.2 25 C26.2 23.5 25.2 22.2 23 22.2 H17.5 Z"
          fill={isDarkSurface ? '#000000' : '#FFFFFF'}
        />
      </svg>

      {showWordmark && (
        <div className="flex flex-col justify-center">
          <span
            className={`${dimensions.textClass} font-semibold tracking-[0.02em] leading-none ${
              isDarkSurface ? 'text-white' : 'text-[#1d1d1f]'
            }`}
          >
            BryTech
          </span>
          {subtitle && (
            <span
              className={`${dimensions.subClass} font-medium tracking-tight mt-1 leading-none ${
                isDarkSurface ? 'text-white/65' : 'text-[#86868b]'
              }`}
            >
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
