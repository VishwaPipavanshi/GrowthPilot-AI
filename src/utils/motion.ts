export const EASE_PREMIUM: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const EASE_SMOOTH: [number, number, number, number] = [0.25, 0.1, 0.25, 1.0];

export const VIEWPORT_FADE: { once: true; margin: string } = {
  once: true,
  margin: '-60px',
};

export const SECTION_REVEAL = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: VIEWPORT_FADE,
  transition: { duration: 0.6, ease: EASE_PREMIUM },
};

export const STAGGER_CONTAINER = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.08,
    },
  },
};

export const STAGGER_ITEM = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: EASE_PREMIUM,
    },
  },
};

export const CARD_HOVER = {
  y: -6,
  transition: { duration: 0.22, ease: EASE_PREMIUM },
};
