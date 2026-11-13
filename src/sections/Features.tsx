import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Megaphone, ShoppingBag, PenLine, ArrowRight, RefreshCw } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading.tsx';
import { CARD_HOVER, EASE_PREMIUM, SECTION_REVEAL } from '../utils/motion.ts';

interface FeaturesProps {
  onSelectFeature: (toolId: string) => void;
}

export const Features: React.FC<FeaturesProps> = ({ onSelectFeature }) => {
  const [activeChannel, setActiveChannel] = useState<'instagram' | 'linkedin' | 'blog'>('instagram');
  const [showPolished, setShowPolished] = useState(true);

  return (
    <section id="features" className="features-section py-24 sm:py-32 relative scroll-mt-20">
      {/* Background Glows */}
      <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-pink-500/10 rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="WHAT YOU CAN DO"
          title="Everything You Need to Create"
          highlight="Better Marketing Content."
          description="Powerful writing tools designed to simplify your everyday marketing workflow."
        />

        {/* Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* BENTO CARD 1: AI Content Generator (Col-span 7) */}
          <motion.div
            {...SECTION_REVEAL}
            whileHover={CARD_HOVER}
            className="feature-card premium-card premium-card--interactive premium-card--feature lg:col-span-7 p-7 sm:p-9 flex flex-col justify-between relative overflow-hidden group"
          >
            {/* Ambient Corner Flare */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-purple-500/20 via-pink-500/10 to-transparent rounded-full blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-500" />

            <div>
              <div className="feature-card__topline flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-[#A78BFA] shadow-inner group-hover:scale-105 transition-transform">
                  <Sparkles className="w-6 h-6 text-[#A78BFA]" />
                </div>
                <span className="text-xs font-bold tracking-widest text-[#A78BFA] uppercase font-mono">
                  Multi-Format Content
                </span>
              </div>

              <h3 className="text-2xl font-extrabold text-[#F8F7FC] mb-2 tracking-tight">
                AI Content Generator
              </h3>
              <p className="text-sm text-[#A9A4BA] leading-relaxed max-w-xl mb-6">
                Create engaging social media captions, blog ideas and marketing content from a simple topic or brief.
              </p>

              {/* Interactive Channel Preview Widget */}
              <div className="p-4 rounded-2xl bg-[#171326] border border-white/[0.06] mb-6">
                <div className="feature-card__preview-header flex items-center justify-between mb-3 border-b border-white/[0.06] pb-2.5">
                  <span className="text-[11px] font-bold text-[#A9A4BA] uppercase tracking-wide">
                    Channel Synthesizer
                  </span>
                  <div className="flex items-center gap-1">
                    {(['instagram', 'linkedin', 'blog'] as const).map((ch) => (
                      <button
                        key={ch}
                        onClick={() => setActiveChannel(ch)}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all capitalize cursor-pointer ${
                          activeChannel === ch
                            ? 'bg-[#8B5CF6] text-white shadow-sm'
                            : 'text-[#A9A4BA] hover:text-[#F8F7FC] hover:bg-white/5'
                        }`}
                      >
                        {ch}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="text-xs text-[#F8F7FC] leading-relaxed min-h-[50px] flex items-center">
                  <AnimatePresence mode="wait">
                    {activeChannel === 'instagram' && (
                      <motion.p
                        key="instagram"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.2, ease: EASE_PREMIUM }}
                        className="italic"
                      >
                        "✨ Start your morning with something truly special. Cold-steeped for 18 hours to power your creative breakthroughs. #DeepWork #CoffeeCraft"
                      </motion.p>
                    )}
                    {activeChannel === 'linkedin' && (
                      <motion.p
                        key="linkedin"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.2, ease: EASE_PREMIUM }}
                        className="italic"
                      >
                        "💼 Operational velocity requires eliminating cognitive friction. Here is how modern creators streamline morning workflows to protect deep work bandwidth."
                      </motion.p>
                    )}
                    {activeChannel === 'blog' && (
                      <motion.p
                        key="blog"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.2, ease: EASE_PREMIUM }}
                        className="italic"
                      >
                        "📝 5 Rituals of High-Output Remote Teams: Why intentional morning routines outpace chaotic sprint hours."
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Bottom action row */}
            <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
              <span className="text-xs text-[#A9A4BA]">Ready to generate social content?</span>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.15, ease: EASE_PREMIUM }}
                onClick={() => onSelectFeature('content-generator')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/40 transition-colors cursor-pointer group/btn"
              >
                <span>Try Tool</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
              </motion.button>
            </div>
          </motion.div>

          {/* BENTO CARD 2: AI Ad Copywriter (Col-span 5) */}
          <motion.div
            {...SECTION_REVEAL}
            transition={{ ...SECTION_REVEAL.transition, delay: 0.08 }}
            whileHover={CARD_HOVER}
            className="feature-card premium-card premium-card--interactive premium-card--feature lg:col-span-5 p-7 sm:p-9 flex flex-col justify-between relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-52 h-52 bg-gradient-to-bl from-orange-500/15 to-transparent rounded-full blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-500" />

            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-2xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-[#F97316] shadow-inner group-hover:scale-105 transition-transform">
                  <Megaphone className="w-6 h-6 text-[#F97316]" />
                </div>
                <span className="text-xs font-bold tracking-widest text-[#F97316] uppercase font-mono">
                  Campaign Ads
                </span>
              </div>

              <h3 className="text-2xl font-extrabold text-[#F8F7FC] mb-2 tracking-tight">
                AI Ad Copywriter
              </h3>
              <p className="text-sm text-[#A9A4BA] leading-relaxed mb-6">
                Create compelling advertising headlines, descriptions and calls to action for your campaigns.
              </p>

              {/* A/B Ad Hook Preview */}
              <div className="p-4 rounded-2xl bg-[#171326] border border-white/[0.06] mb-6 space-y-2.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-[#F97316] uppercase tracking-wide">
                    High-CTR Angle
                  </span>
                  <span className="text-[10px] text-emerald-400 font-mono bg-emerald-500/10 px-2 py-0.5 rounded">
                    +42% Conversion
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-[#100D1C] border border-white/[0.06]">
                  <p className="text-xs font-bold text-[#F8F7FC]">
                    "Stop burning budget on ads that get scrolled past."
                  </p>
                  <p className="text-[11px] text-[#A9A4BA] mt-1">
                    Deploy copy engineered around proven buyer psychology.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
              <span className="text-xs text-[#A9A4BA]">Campaign ad copy</span>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.15, ease: EASE_PREMIUM }}
                onClick={() => onSelectFeature('ad-copy')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-orange-500/25 hover:bg-orange-500/40 border border-orange-500/40 transition-colors cursor-pointer group/btn"
              >
                <span>Try Tool</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
              </motion.button>
            </div>
          </motion.div>

          {/* BENTO CARD 3: Product Description Generator (Col-span 5) */}
          <motion.div
            {...SECTION_REVEAL}
            transition={{ ...SECTION_REVEAL.transition, delay: 0.12 }}
            whileHover={CARD_HOVER}
            className="feature-card premium-card premium-card--interactive premium-card--feature lg:col-span-5 p-7 sm:p-9 flex flex-col justify-between relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-52 h-52 bg-gradient-to-bl from-pink-500/15 to-transparent rounded-full blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-500" />

            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-2xl bg-pink-500/15 border border-pink-500/30 flex items-center justify-center text-[#EC4899] shadow-inner group-hover:scale-105 transition-transform">
                  <ShoppingBag className="w-6 h-6 text-[#EC4899]" />
                </div>
                <span className="text-xs font-bold tracking-widest text-[#EC4899] uppercase font-mono">
                  E-Commerce Catalog
                </span>
              </div>

              <h3 className="text-2xl font-extrabold text-[#F8F7FC] mb-2 tracking-tight">
                Product Description Generator
              </h3>
              <p className="text-sm text-[#A9A4BA] leading-relaxed mb-6">
                Turn basic product information into attractive, professional product descriptions.
              </p>

              {/* Catalog Spec Breakdown */}
              <div className="p-4 rounded-2xl bg-[#171326] border border-white/[0.06] mb-6 space-y-2.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-[#EC4899] uppercase tracking-wide">
                    Catalog Card Output
                  </span>
                  <span className="text-[10px] text-[#F8F7FC] font-mono bg-white/5 px-2 py-0.5 rounded">
                    Specs + Emotion
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-[#100D1C] border border-white/[0.06] space-y-1.5">
                  <p className="text-xs font-bold text-[#F8F7FC]">
                    Studio-Grade ANC Wireless Headset
                  </p>
                  <p className="text-[11px] text-[#A9A4BA]">
                    40h battery · Custom beryllium acoustic chamber · Featherlight memory foam.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
              <span className="text-xs text-[#A9A4BA]">Storefront catalog</span>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.15, ease: EASE_PREMIUM }}
                onClick={() => onSelectFeature('product-description')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-pink-500/25 hover:bg-pink-500/40 border border-pink-500/40 transition-colors cursor-pointer group/btn"
              >
                <span>Try Tool</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
              </motion.button>
            </div>
          </motion.div>

          {/* BENTO CARD 4: AI Writing Assistant (Col-span 7) */}
          <motion.div
            {...SECTION_REVEAL}
            transition={{ ...SECTION_REVEAL.transition, delay: 0.14 }}
            whileHover={CARD_HOVER}
            className="feature-card premium-card premium-card--interactive premium-card--feature lg:col-span-7 p-7 sm:p-9 flex flex-col justify-between relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-violet-500/20 via-indigo-500/10 to-transparent rounded-full blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-500" />

            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-2xl bg-violet-500/15 border border-violet-500/30 flex items-center justify-center text-[#A78BFA] shadow-inner group-hover:scale-105 transition-transform">
                  <PenLine className="w-6 h-6 text-[#A78BFA]" />
                </div>
                <span className="text-xs font-bold tracking-widest text-[#A78BFA] uppercase font-mono">
                  Text Refinement
                </span>
              </div>

              <h3 className="text-2xl font-extrabold text-[#F8F7FC] mb-2 tracking-tight">
                AI Writing Assistant
              </h3>
              <p className="text-sm text-[#A9A4BA] leading-relaxed max-w-xl mb-6">
                Rewrite, improve, shorten and expand existing text while maintaining your intended message.
              </p>

              {/* Before / After Comparison Interactive Snippet */}
              <div className="p-4 rounded-2xl bg-[#171326] border border-white/[0.06] mb-6">
                <div className="feature-card__preview-header flex items-center justify-between mb-3 border-b border-white/[0.06] pb-2.5">
                  <span className="text-[11px] font-bold text-[#A9A4BA] uppercase tracking-wide">
                    Live Sentence Upgrade
                  </span>
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setShowPolished(!showPolished)}
                    className="flex items-center gap-1.5 text-[11px] font-semibold text-[#A78BFA] hover:text-white transition-colors cursor-pointer bg-white/5 hover:bg-white/10 px-2.5 py-1 rounded-md"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Toggle: {showPolished ? 'Polished Version' : 'Raw Draft'}</span>
                  </motion.button>
                </div>

                <div className="p-3.5 rounded-xl bg-[#100D1C] border border-white/[0.06] min-h-[64px] flex items-center">
                  <AnimatePresence mode="wait">
                    {showPolished ? (
                      <motion.div
                        key="polished"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.2, ease: EASE_PREMIUM }}
                      >
                        <div className="text-[10px] uppercase font-bold text-emerald-400 font-mono mb-1">
                          Executive Revision:
                        </div>
                        <p className="text-xs text-[#F8F7FC] leading-relaxed font-medium">
                          "Transform fragmented marketing ideas into high-converting campaigns with effortless operational consistency."
                        </p>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="raw"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.2, ease: EASE_PREMIUM }}
                      >
                        <div className="text-[10px] uppercase font-bold text-amber-400 font-mono mb-1">
                          Raw Informal Draft:
                        </div>
                        <p className="text-xs text-[#A9A4BA] leading-relaxed italic">
                          "we make software that helps companies do marketing stuff quicker without headache"
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
              <span className="text-xs text-[#A9A4BA]">Text polisher & rewrite engine</span>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.15, ease: EASE_PREMIUM }}
                onClick={() => onSelectFeature('writing-assistant')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-violet-600/30 hover:bg-violet-600/50 border border-violet-500/40 transition-colors cursor-pointer group/btn"
              >
                <span>Try Tool</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
