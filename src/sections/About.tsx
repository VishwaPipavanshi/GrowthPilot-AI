import React from 'react';
import { motion } from 'framer-motion';
import { Target, Compass, HeartHandshake, Zap, Quote, Sparkles } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading.tsx';

export const About: React.FC = () => {
  return (
    <section id="about" className="about-section py-24 sm:py-32 bg-[#171326]/40 relative scroll-mt-20 overflow-hidden">
      {/* Background soft ambient lighting */}
      <div className="absolute top-1/3 -right-32 w-80 h-80 bg-pink-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/3 -left-32 w-80 h-80 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="ABOUT GROWTHPILOT"
          title="Making Everyday"
          highlight="Marketing Simpler."
          description="GrowthPilot AI is a conceptual marketing assistant designed to help creators, freelancers and businesses approach everyday content creation with more clarity and creativity."
        />

        {/* Editorial Narrative Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Vision & Philosophy */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6 text-[#A9A4BA] text-sm sm:text-base leading-relaxed"
          >
            {/* Vision Card */}
            <div className="about-card p-7 sm:p-9 rounded-3xl bg-[#1C1830] border border-white/[0.08] shadow-xl space-y-4 relative overflow-hidden">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-[#A78BFA] shadow-sm">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase font-bold text-[#A78BFA] tracking-wider">
                    Core Philosophy
                  </span>
                  <h3 className="text-xl font-bold text-[#F8F7FC] tracking-tight">
                    Our Product Vision
                  </h3>
                </div>
              </div>
              <p className="leading-relaxed">
                Modern digital communication moves fast. Yet for solo creators, boutique agency leads, and growing business founders, crafting compelling copy across Instagram, LinkedIn, paid ads, and storefront catalogs often demands hours of staring at an empty cursor.
              </p>
              <p className="leading-relaxed">
                GrowthPilot AI explores what happens when artificial intelligence is stripped of complex engineering prompts and presented as an approachable, human-centered creative companion that lives directly inside your daily workflow.
              </p>
            </div>

            {/* Problems Solved */}
            <div className="about-card p-7 sm:p-9 rounded-3xl bg-[#1C1830] border border-white/[0.08] shadow-xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-[#F97316] shadow-sm">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase font-bold text-[#F97316] tracking-wider">
                    Friction Removed
                  </span>
                  <h3 className="text-xl font-bold text-[#F8F7FC] tracking-tight">
                    Problems We Aim to Simplify
                  </h3>
                </div>
              </div>
              <ul className="space-y-3 text-sm text-[#A9A4BA] pt-1">
                <li className="flex items-start gap-3 p-2.5 rounded-xl bg-[#171326] border border-white/[0.04]">
                  <span className="text-[#F97316] font-bold font-mono text-xs mt-0.5">01</span>
                  <span><strong className="text-[#F8F7FC]">The Blank Page Paralysis:</strong> Eliminates initial drafting friction by delivering structured, engaging starting blocks on demand.</span>
                </li>
                <li className="flex items-start gap-3 p-2.5 rounded-xl bg-[#171326] border border-white/[0.04]">
                  <span className="text-[#EC4899] font-bold font-mono text-xs mt-0.5">02</span>
                  <span><strong className="text-[#F8F7FC]">Tone Inconsistency:</strong> Keeps brand messaging harmonized and resonant across social feeds, catalogs, and advertisements.</span>
                </li>
                <li className="flex items-start gap-3 p-2.5 rounded-xl bg-[#171326] border border-white/[0.04]">
                  <span className="text-[#8B5CF6] font-bold font-mono text-xs mt-0.5">03</span>
                  <span><strong className="text-[#F8F7FC]">Tool Fatigue:</strong> Consolidates disparate writing utilities into a single, intuitive, high-velocity experience.</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Right Column: Key Tenets Card Stack */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-4"
          >
            {/* Tenet 1 */}
            <div className="about-card about-card--tenet p-7 rounded-3xl bg-gradient-to-br from-[#221B3D] to-[#1C1830] border border-purple-500/30 shadow-xl space-y-3 relative overflow-hidden group">
              <div className="w-9 h-9 rounded-xl bg-[#8B5CF6]/20 text-[#A78BFA] flex items-center justify-center shadow-sm">
                <Zap className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-[#F8F7FC] tracking-tight">
                Clarity Over Complexity
              </h4>
              <p className="text-xs sm:text-sm text-[#A9A4BA] leading-relaxed">
                No complex prompt engineering or cryptic parameters. Plain-English controls allow anyone to generate focused, publish-ready drafts in seconds.
              </p>
            </div>

            {/* Tenet 2 */}
            <div className="about-card about-card--tenet p-7 rounded-3xl bg-gradient-to-br from-[#221B3D] to-[#1C1830] border border-pink-500/30 shadow-xl space-y-3 relative overflow-hidden group">
              <div className="w-9 h-9 rounded-xl bg-[#EC4899]/20 text-[#EC4899] flex items-center justify-center shadow-sm">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-[#F8F7FC] tracking-tight">
                Human In The Loop
              </h4>
              <p className="text-xs sm:text-sm text-[#A9A4BA] leading-relaxed">
                GrowthPilot acts as a creative catalyst rather than a robotic replacement. You remain the director, editor, and authentic voice of your brand.
              </p>
            </div>

            {/* Portfolio Note Card */}
            <div className="about-card about-card--note p-6 rounded-3xl bg-[#100D1C] border border-white/[0.08] text-xs text-[#A9A4BA] space-y-2">
              <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-bold text-[#A78BFA] font-mono">
                <Sparkles className="w-3 h-3 text-[#F97316]" />
                <span>Portfolio Concept Note</span>
              </div>
              <p className="leading-relaxed">
                This conceptual project is designed as an interactive showcase of modern SaaS frontend craftsmanship, fluid typography, responsive layout design, and accessible offline interaction.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
