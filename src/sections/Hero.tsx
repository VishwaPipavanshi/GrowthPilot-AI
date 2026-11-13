import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, CheckCircle2, Zap, Bot, Layers, ChevronRight } from 'lucide-react';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
  onSelectFeature?: (toolId: string) => void;
}

const HERO_TABS = [
  {
    id: 'social',
    toolId: 'content-generator',
    label: 'Social Campaign',
    platform: 'Instagram · Carousel',
    prompt: 'Launch week campaign for organic cold brew coffee for remote creators',
    headline: '✨ Elevate your morning creative focus with Artisan Roast',
    body: 'Cold-steeped for 18 hours with hints of caramel and dark cocoa. Pure, uncomplicated energy crafted to power your most ambitious ideas.',
    tags: ['#DeepWork', '#ColdBrewCraft', '#CreatorFuel'],
    tone: 'Friendly',
    metric: '98% Voice Match',
  },
  {
    id: 'ads',
    toolId: 'ad-copy',
    label: 'Ad Copywriter',
    platform: 'Meta Ads · High-CTR',
    prompt: 'Ergonomic chair 20% discount offer for engineering & design teams',
    headline: 'Say goodbye to 3 PM back fatigue. Upgrade your posture today.',
    body: 'Engineered with responsive lumbar stabilization and breathable mesh weave. 30-day risk-free trial + free nationwide delivery.',
    tags: ['#WorkspaceComfort', '#DesignStudio', '#PostureMatters'],
    tone: 'Persuasive',
    metric: '3.4x Projected CTR',
  },
  {
    id: 'product',
    toolId: 'product-description',
    label: 'Product Catalog',
    platform: 'E-Commerce · Specs & Story',
    prompt: 'Minimalist noise-canceling wireless headphones with 40-hour battery',
    headline: 'Studio-Grade Silence. Uncompromising Acoustic Precision.',
    body: 'Custom 40mm beryllium drivers paired with hybrid quad-mic active noise cancellation. 40 hours of uninterrupted playback on a single charge.',
    tags: ['#AudiophileGrade', '#WirelessFreedom', '#ModernAcoustics'],
    tone: 'Professional',
    metric: 'Catalog Ready',
  },
];

import { EASE_PREMIUM } from '../utils/motion.ts';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: EASE_PREMIUM,
    },
  },
};

export const Hero: React.FC<HeroProps> = ({ onNavigate, onSelectFeature }) => {
  const [activeTab, setActiveTab] = useState(0);
  const currentTab = HERO_TABS[activeTab];

  return (
    <section
      id="home"
      className="hero-section relative pt-32 sm:pt-40 pb-20 md:pb-32 overflow-hidden bg-grid-pattern"
    >
      {/* Ambient Floating Gradient Mesh Orbs */}
      <motion.div
        animate={{
          x: [-20, 20, -20],
          y: [-15, 15, -15],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="hero-ambient absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[450px] bg-gradient-to-tr from-[#8B5CF6]/20 via-[#EC4899]/15 to-[#F97316]/10 rounded-full blur-[140px] pointer-events-none -z-10"
      />
      <motion.div
        animate={{
          x: [15, -15, 15],
          y: [10, -10, 10],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="hero-ambient absolute top-1/2 -left-48 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none -z-10"
      />
      <motion.div
        animate={{
          x: [-15, 15, -15],
          y: [-10, 10, -10],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="hero-ambient absolute top-1/3 -right-48 w-[450px] h-[450px] bg-pink-500/10 rounded-full blur-[130px] pointer-events-none -z-10"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Hero Narrative with Staggered Entrance */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="hero-copy lg:col-span-7 space-y-7 text-left"
          >
            {/* Luminous Eyebrow Pill */}
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-orange-500/10 border border-purple-500/25 text-[#A78BFA] text-xs font-bold tracking-wider uppercase shadow-sm shadow-purple-500/10 backdrop-blur-md">
                <div className="w-2 h-2 rounded-full bg-[#F97316] animate-pulse" />
                <span>AI-POWERED MARKETING PLATFORM</span>
              </div>
            </motion.div>

            {/* Expressive Main Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-[4.15rem] font-extrabold tracking-tight text-[#F8F7FC] leading-[1.08] text-balance"
            >
              Create Smarter Marketing Content.{' '}
              <span className="animated-gradient-text">
                Grow Faster.
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl text-[#A9A4BA] leading-relaxed max-w-2xl font-normal"
            >
              Your creative marketing partner. Generate compelling content, powerful ad copy and product descriptions with a smarter, simpler workflow.
            </motion.p>

            {/* Primary & Secondary CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
            >
              <motion.button
                data-cursor-magnetic="true"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.15, ease: EASE_PREMIUM }}
                onClick={() => onNavigate('demo')}
                className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#8B5CF6] via-[#A78BFA] to-[#EC4899] shadow-xl shadow-purple-500/30 hover:shadow-purple-500/50 cursor-pointer"
              >
                <span>Try AI Demo</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02, backgroundColor: 'rgba(28, 24, 48, 1)' }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.15, ease: EASE_PREMIUM }}
                onClick={() => onNavigate('features')}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-semibold text-sm text-[#F8F7FC] bg-[#1C1830]/80 border border-white/10 hover:border-white/20 cursor-pointer backdrop-blur-md"
              >
                <span>Explore Features</span>
              </motion.button>
            </motion.div>

            {/* Audience Trust & Identity */}
            <motion.div
              variants={itemVariants}
              className="pt-2 flex items-center gap-3 text-xs sm:text-sm text-[#A9A4BA]"
            >
              <div className="flex -space-x-2 overflow-hidden shrink-0">
                <div className="inline-block h-7 w-7 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-500 border-2 border-[#100D1C] flex items-center justify-center text-[10px] font-bold text-white shadow-sm">
                  
                </div>
                <div className="inline-block h-7 w-7 rounded-full bg-gradient-to-tr from-pink-600 to-rose-500 border-2 border-[#100D1C] flex items-center justify-center text-[10px] font-bold text-white shadow-sm">
                  
                </div>
                <div className="inline-block h-7 w-7 rounded-full bg-gradient-to-tr from-orange-500 to-amber-400 border-2 border-[#100D1C] flex items-center justify-center text-[10px] font-bold text-white shadow-sm">
                  
                </div>
              </div>
              <span className="font-medium text-[#F8F7FC]/90">
                Built for creators, marketers and growing businesses.
              </span>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              {[
                { value: '2.4x', label: 'faster campaign launch' },
                { value: '4', label: 'specialized AI engines' },
                { value: '98%', label: 'brand voice match' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.08, duration: 0.45, ease: EASE_PREMIUM }}
                  className="luxury-stat"
                >
                  <span className="text-base sm:text-lg font-black text-[#F8F7FC]">{stat.value}</span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#A9A4BA]">{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column: High-Fidelity Studio Mockup with Organic Floating */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            {/* Ambient Glow Backdrop */}
            <div className="absolute -inset-3 bg-gradient-to-r from-purple-500/25 via-pink-500/20 to-orange-500/15 rounded-3xl blur-2xl opacity-80 -z-10" />

            {/* Gentle Floating Studio Window */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 30 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: [0, -6, 0],
              }}
              transition={{
                opacity: { duration: 0.8, ease: EASE_PREMIUM },
                scale: { duration: 0.8, ease: EASE_PREMIUM },
                y: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
              }}
              className="hero-studio relative bg-[#1C1830] border border-white/15 rounded-2xl shadow-2xl p-5 sm:p-6 backdrop-blur-2xl overflow-hidden glow-purple"
            >
              {/* Studio Window Header */}
              <div className="hero-studio__header flex items-center justify-between pb-4 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/90 shadow-sm" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/90 shadow-sm" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/90 shadow-sm" />
                  <span className="ml-2 text-xs font-semibold text-[#A9A4BA]">
                    GrowthPilot Studio
                  </span>
                </div>
                <div className="hero-studio__status flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-[11px] font-semibold text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Interactive Engine</span>
                </div>
              </div>

              {/* Mode Switcher Tabs with layoutId Glider */}
              <div className="mt-4 p-1 rounded-xl bg-[#171326] border border-white/[0.06] flex items-center gap-1 relative">
                {HERO_TABS.map((tab, idx) => {
                  const isSelected = activeTab === idx;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(idx)}
                      className={`relative flex-1 py-1.5 px-2 rounded-lg text-xs font-medium transition-colors text-center cursor-pointer ${
                        isSelected ? 'text-white font-semibold' : 'text-[#A9A4BA] hover:text-[#F8F7FC]'
                      }`}
                    >
                      {isSelected && (
                        <motion.span
                          layoutId="heroTabIndicator"
                          transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                          className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#8B5CF6]/35 to-[#EC4899]/35 border border-purple-500/50 shadow-sm"
                        />
                      )}
                      <span className="relative z-10">{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Mockup Prompt Input Box */}
              <div className="mt-3.5 p-3.5 rounded-xl bg-[#171326] border border-white/[0.08]">
                <div className="flex items-center justify-between text-xs text-[#A9A4BA] mb-1.5">
                  <span className="font-semibold text-[#F8F7FC] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#F97316]" /> Brief Input
                  </span>
                  <span className="text-[10px] text-[#A78BFA] font-medium font-mono">
                    {currentTab.platform}
                  </span>
                </div>
                <p className="text-xs text-[#F8F7FC] font-medium leading-relaxed italic">
                  "{currentTab.prompt}"
                </p>
              </div>

              {/* Mockup Generation Preview */}
              <div className="mt-3.5 p-4 rounded-xl bg-gradient-to-b from-[#221B3D] to-[#171326] border border-purple-500/25 space-y-3 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-[#A78BFA] font-bold">
                    <Zap className="w-3.5 h-3.5 text-[#F97316]" />
                    <span>Instant Synthesis</span>
                  </div>
                  <span className="text-[10px] text-[#F8F7FC] bg-white/10 px-2 py-0.5 rounded-md font-mono">
                    {currentTab.metric}
                  </span>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTab.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.22, ease: EASE_PREMIUM }}
                    className="p-3.5 rounded-lg bg-[#100D1C]/90 border border-white/[0.06] space-y-2"
                  >
                    <h4 className="text-xs font-bold text-[#F8F7FC] leading-snug">
                      {currentTab.headline}
                    </h4>
                    <p className="text-[11px] text-[#A9A4BA] leading-relaxed">
                      {currentTab.body}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1 text-[10px] text-[#A78BFA] font-mono">
                      {currentTab.tags.map((tag, i) => (
                        <span key={i} className="bg-purple-500/10 px-1.5 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Simulated action row inside mockup */}
                <div className="flex items-center justify-between pt-1 text-[11px]">
                  <span className="text-[10px] text-[#A9A4BA]">
                    Tone: <strong className="text-[#F8F7FC]">{currentTab.tone}</strong>
                  </span>
                  <button
                    onClick={() => {
                      if (onSelectFeature) onSelectFeature(currentTab.toolId);
                      onNavigate('demo');
                    }}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#A78BFA] hover:text-white transition-colors cursor-pointer group/link"
                  >
                    <span>Open in full studio</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Floating Decorative Interface Card 1: Top Right */}
            <motion.div
              animate={{
                y: [0, -8, 0],
                rotate: [0, 1, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="hero-floating-card absolute -top-5 -right-3 sm:-right-5 p-3 rounded-xl bg-[#1C1830]/95 border border-purple-500/30 shadow-xl backdrop-blur-md hidden sm:block max-w-[190px] z-10"
            >
              <div className="flex items-center gap-1.5 mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#EC4899]" />
                <span className="text-[10px] font-bold text-[#A78BFA] uppercase tracking-wider font-mono">
                  Conversion Engine
                </span>
              </div>
              <p className="text-[11px] font-semibold text-[#F8F7FC] leading-tight">
                "Instant multi-channel draft synthesis"
              </p>
            </motion.div>

            {/* Floating Decorative Interface Card 2: Bottom Left */}
            <motion.div
              animate={{
                y: [0, 8, 0],
                rotate: [0, -1, 0],
              }}
              transition={{
                duration: 5.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.8,
              }}
              className="hero-floating-card absolute -bottom-5 -left-3 sm:-left-5 p-3 rounded-xl bg-[#1C1830]/95 border border-orange-500/30 shadow-xl backdrop-blur-md hidden sm:flex items-center gap-2.5 z-10"
            >
              <div className="w-7 h-7 rounded-lg bg-orange-500/10 border border-orange-500/25 flex items-center justify-center text-[#F97316]">
                <Layers className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="text-[10px] text-[#A9A4BA]">Marketing Pipeline</div>
                <div className="text-[11px] font-bold text-[#F8F7FC]">4 Specialized Engines</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
