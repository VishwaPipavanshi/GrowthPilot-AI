import React from 'react';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  highlight?: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  highlight,
  description,
  align = 'center',
  className = '',
}) => {
  const isCenter = align === 'center';

  return (
    <div
      className={`section-heading max-w-3xl mb-14 sm:mb-18 ${
        isCenter ? 'mx-auto text-center' : 'text-left'
      } ${className}`}
    >
      {eyebrow && (
        <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#A78BFA] uppercase mb-3.5 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#F97316]" />
          <span>{eyebrow}</span>
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#F8F7FC] text-balance leading-[1.12]">
        {title}{' '}
        {highlight && (
          <span className="animated-gradient-text">{highlight}</span>
        )}
      </h2>
      {description && (
        <p className="mt-4 sm:mt-5 text-base sm:text-lg text-[#A9A4BA] leading-relaxed max-w-2xl mx-auto font-normal">
          {description}
        </p>
      )}
    </div>
  );
};
