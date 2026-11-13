import React, { useState } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion';
import {
  ArrowRight,
  CheckCircle2,
  Lightbulb,
  SlidersHorizontal,
  Sparkles,
} from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading.tsx';
import { EASE_PREMIUM, STAGGER_CONTAINER } from '../utils/motion.ts';

interface HowItWorksProps {
  onNavigate: (sectionId: string) => void;
}

const STEPS = [
  {
    number: '01',
    title: 'Enter Your Idea',
    description: 'Describe your topic, product or marketing goal in plain English—no tricky prompts or complex engineering required.',
    icon: Lightbulb,
    accent: '#8B5CF6',
    tag: 'RAW IDEA INPUT',
  },
  {
    number: '02',
    title: 'Choose Your Tool',
    description: 'Select the content generator, ad copywriter, product writer or writing assistant, then calibrate tone and target channel.',
    icon: SlidersHorizontal,
    accent: '#EC4899',
    tag: 'TOOL CONFIG',
  },
  {
    number: '03',
    title: 'Get Your Result',
    description: 'Explore the synthesized sample output, copy to clipboard in one click, or instantly generate fresh creative variations.',
    icon: Sparkles,
    accent: '#F97316',
    tag: 'AI GENERATED RESULT',
  },
];

const TOOL_OPTIONS = ['Content Generator', 'Ad Copywriter', 'Product Writer', 'Writing Assistant'];

interface WorkflowCardProps {
  step: (typeof STEPS)[number];
  index: number;
  reduceMotion: boolean;
}

const WorkflowCard: React.FC<WorkflowCardProps> = ({ step, index, reduceMotion }) => {
  const [selectedTool, setSelectedTool] = useState('Content Generator');
  const [isHovered, setIsHovered] = useState(false);
  const tiltX = useSpring(useMotionValue(0), { stiffness: 200, damping: 22, mass: 0.7 });
  const tiltY = useSpring(useMotionValue(0), { stiffness: 200, damping: 22, mass: 0.7 });
  const glowX = useSpring(useMotionValue(50), { stiffness: 150, damping: 22 });
  const glowY = useSpring(useMotionValue(50), { stiffness: 150, damping: 22 });
  const glowBackground = useMotionTemplate`radial-gradient(300px circle at ${glowX}% ${glowY}%, rgba(167, 139, 250, 0.2), rgba(236, 72, 153, 0.11) 30%, transparent 68%)`;
  const Icon = step.icon;

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || event.pointerType !== 'mouse') return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;

    tiltX.set((0.5 - y) * 12);
    tiltY.set((x - 0.5) * 14);
    glowX.set(x * 100);
    glowY.set(y * 100);
  };

  const resetMotion = () => {
    tiltX.set(0);
    tiltY.set(0);
    glowX.set(50);
    glowY.set(50);
    setIsHovered(false);
  };

  return (
    <motion.article
      key={step.number}
      initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      whileInView={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-45px' }}
      transition={{ duration: reduceMotion ? 0.2 : 0.65, delay: index * 0.12, ease: EASE_PREMIUM }}
      whileHover={reduceMotion ? undefined : { y: -6, scale: 1.012, transition: { duration: 0.28, ease: EASE_PREMIUM } }}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetMotion}
      onPointerEnter={(event) => {
        if (!reduceMotion && event.pointerType === 'mouse') setIsHovered(true);
      }}
      style={{
        rotateX: tiltX,
        rotateY: tiltY,
        transformPerspective: 1200,
        transformStyle: 'preserve-3d',
      }}
      className="workflow-card group"
    >
      <motion.div
        className="workflow-card__glow"
        style={{ backgroundImage: glowBackground }}
        aria-hidden="true"
      />
      <div className="workflow-card__shine" aria-hidden="true" />
      <div className="workflow-card__edge" aria-hidden="true" />

      <div className="workflow-card__content">
        <div className="workflow-card__header">
          <div className="workflow-card__title-wrap">
            <motion.div
              animate={isHovered && !reduceMotion ? { scale: 1.08, rotate: -5, y: -2 } : { scale: 1, rotate: 0, y: 0 }}
              transition={{ type: 'spring', stiffness: 280, damping: 18 }}
              className="workflow-card__icon"
              style={{
                backgroundColor: `${step.accent}18`,
                color: step.accent,
                border: `1px solid ${step.accent}36`,
              }}
            >
              <Icon className="h-5 w-5" />
            </motion.div>
            <div className="workflow-card__meta">
              <span className="workflow-card__phase">Phase {step.number}</span>
              <span className="workflow-card__tag" style={{ color: step.accent }}>{step.tag}</span>
            </div>
          </div>
          <span className="workflow-card__number">{step.number}</span>
        </div>

        <motion.h3
          animate={isHovered && !reduceMotion ? { y: -2 } : { y: 0 }}
          transition={{ duration: 0.24, ease: EASE_PREMIUM }}
          className="workflow-card__headline"
        >
          {step.title}
        </motion.h3>

        <motion.p
          animate={isHovered && !reduceMotion ? { opacity: 1, y: -1 } : { opacity: 0.86, y: 0 }}
          transition={{ duration: 0.24, ease: EASE_PREMIUM }}
          className="workflow-card__description"
        >
          {step.description}
        </motion.p>

        {step.number === '01' && (
          <div className="workflow-mockup workflow-mockup--input">
            <div className="workflow-mockup__label-row">
              <span>RAW IDEA INPUT</span>
              <span className="workflow-status workflow-status--violet">Ready</span>
            </div>
            <motion.div className="workflow-input-line" initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: '100%' }} transition={{ duration: 0.5, ease: EASE_PREMIUM }}>
              <span>Organic cold brew coffee subscription for creators</span>
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.9, repeat: reduceMotion ? 0 : Infinity, ease: 'easeInOut' }}
                className="workflow-cursor"
              />
            </motion.div>
            <div className="workflow-input-actions">
              <div className="workflow-pulse" />
              <motion.div
                animate={reduceMotion ? { opacity: 1 } : { opacity: [0, 1, 1, 0] }}
                transition={{ duration: 1.6, ease: 'easeInOut', repeat: reduceMotion ? 0 : Infinity, delay: 0.7 }}
                className="workflow-captured"
              >
                <CheckCircle2 className="h-3.5 w-3.5" />
                Idea Captured
              </motion.div>
              <motion.div
                animate={reduceMotion ? undefined : { x: [-1, 4, -1] }}
                transition={{ duration: 1.8, repeat: reduceMotion ? 0 : Infinity, ease: 'easeInOut' }}
                className="workflow-submit"
              >
                <ArrowRight className="h-3.5 w-3.5" />
              </motion.div>
            </div>
          </div>
        )}

        {step.number === '02' && (
          <div className="workflow-mockup workflow-mockup--config">
            <div className="workflow-mockup__label-row">
              <span>AI TOOL CONFIG</span>
              <span className="workflow-status workflow-status--pink">Calibrated</span>
            </div>
            <div className="workflow-option-grid">
              {TOOL_OPTIONS.map((option) => {
                const active = selectedTool === option;
                return (
                  <motion.button
                    key={option}
                    type="button"
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedTool(option)}
                    className={`workflow-option ${active ? 'is-active' : ''}`}
                    style={{
                      borderColor: active ? `${step.accent}aa` : 'rgba(255,255,255,0.07)',
                      background: active ? 'rgba(236, 72, 153, 0.1)' : 'rgba(18, 15, 30, 0.7)',
                    }}
                  >
                    {option}
                  </motion.button>
                );
              })}
            </div>
            <motion.div
              className="workflow-config-row"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.35, ease: EASE_PREMIUM }}
            >
              <span>Tone</span>
              <span className="workflow-pill workflow-pill--active">Friendly</span>
            </motion.div>
            <motion.div
              className="workflow-config-row"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24, duration: 0.35, ease: EASE_PREMIUM }}
            >
              <span>Channel</span>
              <span className="workflow-pill">Instagram</span>
            </motion.div>
          </div>
        )}

        {step.number === '03' && (
          <div className="workflow-mockup workflow-mockup--result">
            <div className="workflow-mockup__label-row">
              <span>AI GENERATED RESULT</span>
              <span className="workflow-status workflow-status--orange">Ready</span>
            </div>
            <motion.div
              className="workflow-result-body"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.42, ease: EASE_PREMIUM }}
            >
              <motion.h4
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12, duration: 0.35, ease: EASE_PREMIUM }}
              >
                Fuel Your Creative Mornings.
              </motion.h4>
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.35, ease: EASE_PREMIUM }}
              >
                Discover organic cold brew coffee delivered to your door. Stay inspired and keep creating.
              </motion.p>
              <div className="workflow-tags">
                <span>#DeepWork</span>
                <span>#CreatorFuel</span>
                <span>#BrewFlow</span>
              </div>
            </motion.div>
            <div className="workflow-result-footer">
              <motion.button
                whileHover={reduceMotion ? undefined : { scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="workflow-copy-btn"
              >
                Copy
              </motion.button>
              <motion.span
                animate={reduceMotion ? { opacity: 1 } : { opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 1.4, repeat: reduceMotion ? 0 : Infinity, ease: 'easeInOut' }}
                className="workflow-success"
              >
                <CheckCircle2 className="h-3.5 w-3.5" />
                Success
              </motion.span>
            </div>
          </div>
        )}
      </div>
    </motion.article>
  );
};

export const HowItWorks: React.FC<HowItWorksProps> = ({ onNavigate }) => {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <section id="how-it-works" className="workflow-section relative overflow-hidden scroll-mt-20 py-24 sm:py-32">
      <div className="workflow-section__ambient workflow-section__ambient--violet" aria-hidden="true" />
      <div className="workflow-section__ambient workflow-section__ambient--pink" aria-hidden="true" />
      <div className="workflow-section__ambient workflow-section__ambient--gold" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="HOW IT WORKS"
          title="From Idea to Impact in"
          highlight="Three Simple Steps."
          description="A frictionless workflow that turns simple concepts into ready-to-publish marketing assets."
        />

        <div className="workflow-rail-wrapper">
          <div className="workflow-connector" aria-hidden="true">
            <motion.div
              className="workflow-connector__track"
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scaleX: 0.8 }}
              whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, scaleX: 1 }}
              viewport={{ once: true, margin: '-35px' }}
              transition={{ duration: 0.8, ease: EASE_PREMIUM }}
            />
            <motion.div
              className="workflow-connector__shine"
              animate={reduceMotion ? { opacity: 0.8 } : { x: ['-35%', '110%'] }}
              transition={{ duration: 3.2, repeat: reduceMotion ? 0 : Infinity, ease: 'easeInOut' }}
            />
            <span className="workflow-connector__node workflow-connector__node--first" />
            <span className="workflow-connector__node workflow-connector__node--middle" />
            <span className="workflow-connector__node workflow-connector__node--last" />
          </div>

          <motion.div
            variants={reduceMotion ? { hidden: { opacity: 1 }, show: { opacity: 1 } } : STAGGER_CONTAINER}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-40px' }}
            className="workflow-grid"
          >
            {STEPS.map((step, index) => (
              <WorkflowCard key={step.number} step={step} index={index} reduceMotion={reduceMotion} />
            ))}
          </motion.div>
        </div>

        <div className="workflow-cta-wrap mt-14 text-center">
          <motion.button
            type="button"
            whileHover={reduceMotion ? undefined : { scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.15, ease: EASE_PREMIUM }}
            onClick={() => onNavigate('demo')}
            className="workflow-cta"
          >
            <span>Ready to test the workflow? Go to Interactive Demo</span>
            <ArrowRight className="h-4 w-4" />
          </motion.button>
        </div>
      </div>
    </section>
  );
};
