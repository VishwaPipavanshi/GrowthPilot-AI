import React, { useState } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion';
import { Palette, Rocket, Store, Users2, Sparkles } from 'lucide-react';
import { EASE_PREMIUM, STAGGER_CONTAINER, STAGGER_ITEM } from '../utils/motion.ts';

const AUDIENCES = [
  {
    title: 'Content Creators',
    role: 'Solopreneurs & Influencers',
    description: 'Fresh captions, creative hooks & channel-specific scripts for viral engagement.',
    icon: Palette,
    accent: '#8B5CF6',
  },
  {
    title: 'Startups',
    role: 'Founders & Builders',
    description: 'High-impact value propositions, product drop announcements & launch campaigns.',
    icon: Rocket,
    accent: '#F97316',
  },
  {
    title: 'Small Businesses',
    role: 'Local & Boutique Brands',
    description: 'Clear ad promotions, customer newsletters & engaging storefront catalog listings.',
    icon: Store,
    accent: '#EC4899',
  },
  {
    title: 'Marketing Teams',
    role: 'Growth & Social Leads',
    description: 'Consistent brand messaging, multi-format collateral & rapid campaign iteration.',
    icon: Users2,
    accent: '#A78BFA',
  },
];

const reducedItemVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.2 } },
};

interface AudienceCardProps {
  item: (typeof AUDIENCES)[number];
  index: number;
  reduceMotion: boolean;
}

const AudienceCard: React.FC<AudienceCardProps> = ({ item, index, reduceMotion }) => {
  const [isHovered, setIsHovered] = useState(false);
  const rotateX = useSpring(0, { stiffness: 180, damping: 24, mass: 0.7 });
  const rotateY = useSpring(0, { stiffness: 180, damping: 24, mass: 0.7 });
  const glowX = useSpring(50, { stiffness: 150, damping: 24 });
  const glowY = useSpring(50, { stiffness: 150, damping: 24 });
  const glowBackground = useMotionTemplate`radial-gradient(280px circle at ${glowX}% ${glowY}%, rgba(167, 139, 250, 0.19), transparent 72%)`;
  const Icon = item.icon;

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || event.pointerType !== 'mouse') return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    rotateX.set((0.5 - y) * 10);
    rotateY.set((x - 0.5) * 10);
    glowX.set(x * 100);
    glowY.set(y * 100);
  };

  const resetPointer = () => {
    rotateX.set(0);
    rotateY.set(0);
    glowX.set(50);
    glowY.set(50);
    setIsHovered(false);
  };

  return (
    <motion.div
      variants={reduceMotion ? reducedItemVariants : STAGGER_ITEM}
      onPointerMove={handlePointerMove}
      onPointerEnter={(event) => {
        if (event.pointerType === 'mouse') setIsHovered(true);
      }}
      onPointerLeave={resetPointer}
      onFocus={() => setIsHovered(true)}
      onBlur={resetPointer}
      whileHover={reduceMotion ? undefined : {
        y: -5,
        scale: 1.015,
        transition: { duration: 0.25, ease: EASE_PREMIUM },
      }}
      className="trust-strip-card group relative flex min-h-[218px] flex-col justify-between p-5 sm:p-6"
      style={{
        rotateX,
        rotateY,
        transformPerspective: 900,
        transformStyle: 'preserve-3d',
      }}
      aria-label={`${item.title}: ${item.description}`}
      role="group"
      data-cursor-hover="card"
    >
      <motion.div
        className="trust-strip-card__glow"
        style={{ backgroundImage: glowBackground }}
        aria-hidden="true"
      />
      <div className="trust-strip-card__edge" aria-hidden="true" />

      <div className="trust-strip-card__content relative z-10">
        <div className="mb-5 flex items-center justify-between gap-2">
          <motion.div
            animate={isHovered ? { scale: 1.1, rotate: -5 } : { scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 18 }}
            className="trust-strip-card__icon flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
            style={{
              backgroundColor: `${item.accent}18`,
              color: item.accent,
              border: `1px solid ${item.accent}38`,
              boxShadow: isHovered ? `0 0 24px ${item.accent}35` : 'none',
            }}
          >
            <Icon className="h-5 w-5" />
          </motion.div>
          <motion.span
            animate={isHovered ? { y: -3, opacity: 1 } : { y: 0, opacity: 0.82 }}
            transition={{ duration: 0.25, ease: EASE_PREMIUM }}
            className="text-right font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-[#A9A4BA] sm:text-[10px]"
          >
            {item.role}
          </motion.span>
        </div>

        <motion.h4
          animate={isHovered ? { y: -2, scale: 1.025 } : { y: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 240, damping: 20 }}
          className="mb-1.5 origin-left text-base font-extrabold tracking-tight text-[#F8F7FC] transition-colors duration-200 group-hover:text-white"
        >
          {item.title}
        </motion.h4>
        <motion.p
          animate={isHovered ? { y: -1, opacity: 1 } : { y: 0, opacity: 0.82 }}
          transition={{ duration: 0.25, ease: EASE_PREMIUM }}
          className="text-xs leading-relaxed text-[#A9A4BA]"
        >
          {item.description}
        </motion.p>
      </div>

      <motion.div
        animate={isHovered ? { y: 0, opacity: 1 } : { y: 3, opacity: 0.78 }}
        transition={{ duration: 0.25, ease: EASE_PREMIUM }}
        className="trust-strip-card__footer relative z-10 mt-4 flex items-center gap-1.5 border-t border-white/[0.08] pt-3 text-[11px] font-semibold"
        style={{ color: item.accent }}
      >
        <Sparkles className="h-3 w-3" />
        <span>Tailored Workflow</span>
        <span className="ml-auto font-mono text-[9px] opacity-60">0{index + 1}</span>
      </motion.div>
    </motion.div>
  );
};

export const TrustStrip: React.FC = () => {
  const reduceMotion = useReducedMotion() ?? false;
  const containerVariants = reduceMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : STAGGER_CONTAINER;

  return (
    <section className="trust-strip-section relative overflow-hidden border-y border-white/[0.08] bg-gradient-to-b from-[#141024]/80 via-[#171326]/60 to-[#141024]/80 py-14 sm:py-16">
      <div className="pointer-events-none absolute left-1/4 top-1/2 h-48 w-72 -translate-y-1/2 rounded-full bg-purple-600/10 blur-[90px]" />
      <div className="pointer-events-none absolute right-1/4 top-1/2 h-48 w-72 -translate-y-1/2 rounded-full bg-pink-600/[0.08] blur-[90px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE_PREMIUM }}
          className="mb-9 text-center"
        >
          <div className="mb-1 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#A78BFA]">
            <Sparkles className="h-3.5 w-3.5 text-[#F97316]" />
            <span>Audience Focus</span>
          </div>
          <h3 className="text-xl font-bold tracking-tight text-[#F8F7FC] sm:text-2xl">
            Built for people who create, market and grow.
          </h3>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4"
          style={{ perspective: 1200 }}
        >
          {AUDIENCES.map((item, index) => (
            <AudienceCard
              key={item.title}
              item={item}
              index={index}
              reduceMotion={reduceMotion}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};
