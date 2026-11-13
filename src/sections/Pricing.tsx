import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Sparkles } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading.tsx';
import { PRICING_PLANS } from '../data/pricing.ts';
import { EASE_PREMIUM } from '../utils/motion.ts';

interface PricingProps {
  onSelectFreePlan: () => void;
  onOpenProModal: () => void;
}

export const Pricing: React.FC<PricingProps> = ({
  onSelectFreePlan,
  onOpenProModal,
}) => {
  return (
    <section id="pricing" className="pricing-section py-24 sm:py-32 relative scroll-mt-20 overflow-hidden">
      {/* Background ambient mesh */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="SIMPLE PRICING"
          title="Choose the Plan That Fits"
          highlight="Your Workflow."
          description="Transparent, simple pricing designed for solo creators and expanding marketing teams."
        />

        {/* Pricing Cards Grid */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch mt-6">
          {PRICING_PLANS.map((plan, index) => {
            const isPro = plan.id === 'pro';

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.15,
                  ease: EASE_PREMIUM,
                }}
                whileHover={{
                  y: -6,
                  scale: 1.01,
                  transition: { duration: 0.25, ease: EASE_PREMIUM },
                }}
                className={`pricing-card premium-card premium-card--pricing relative p-8 sm:p-10 flex flex-col justify-between transition-colors duration-300 ${
                  isPro
                    ? 'border-[#8B5CF6]/60 glow-purple hover:border-[#8B5CF6]'
                    : 'border-white/[0.08] hover:border-white/20'
                }`}
              >
                {/* Pro Recommended Floating Badge */}
                {isPro && (
                  <motion.div
                    animate={{
                      scale: [1, 1.03, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="absolute -top-3.5 right-6 px-3.5 py-1 rounded-full bg-gradient-to-r from-[#8B5CF6] via-[#EC4899] to-[#F97316] text-white text-[10px] font-black tracking-widest uppercase shadow-lg shadow-purple-500/30 flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3 h-3 text-white" />
                    <span>RECOMMENDED</span>
                  </motion.div>
                )}

                <div>
                  {/* Plan Name & Tagline */}
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-2xl font-black text-[#F8F7FC] tracking-tight">
                      {plan.name}
                    </h3>
                    {isPro ? (
                      <span className="text-xs font-bold text-[#A78BFA] bg-purple-500/15 px-2.5 py-0.5 rounded-full border border-purple-500/30">
                        Pro Tier
                      </span>
                    ) : (
                      <span className="text-xs font-semibold text-[#A9A4BA] bg-white/5 px-2.5 py-0.5 rounded-full">
                        Starter
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-[#A9A4BA] mb-6 min-h-[40px] leading-relaxed">
                    {plan.description}
                  </p>

                  {/* Price Block */}
                  <div className="flex items-end gap-2 pb-6 mb-6 border-b border-white/[0.08]">
                    <span className="text-4xl sm:text-5xl font-black text-[#F8F7FC] font-mono tracking-tight">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-sm font-semibold text-[#A9A4BA] pb-1.5">
                        {plan.period}
                      </span>
                    )}
                  </div>

                  {/* Features List */}
                  <div className="space-y-4 mb-8">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#A78BFA] font-mono block">
                      Included Capabilities:
                    </span>
                    <ul className="space-y-3 text-sm text-[#F8F7FC]">
                      {plan.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${isPro ? 'bg-[#8B5CF6]/20 text-[#A78BFA]' : 'bg-emerald-500/20 text-emerald-400'}`}>
                            <Check className="w-3 h-3" />
                          </div>
                          <span className="text-sm leading-snug">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="pt-2">
                  {isPro ? (
                    <motion.button
                      data-cursor-magnetic="true"
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.15, ease: EASE_PREMIUM }}
                      onClick={onOpenProModal}
                      className="w-full py-4 px-6 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-[#8B5CF6] via-[#A78BFA] to-[#EC4899] shadow-xl shadow-purple-500/30 flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
                    >
                      <span>{plan.ctaLabel}</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  ) : (
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.15, ease: EASE_PREMIUM }}
                      onClick={onSelectFreePlan}
                      className="w-full py-4 px-6 rounded-2xl font-bold text-sm text-[#F8F7FC] bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 hover:border-white/20 transition-colors flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
                    >
                      <span>{plan.ctaLabel}</span>
                    </motion.button>
                  )}
                  <p className="text-[11px] text-[#A9A4BA]/70 text-center mt-3 font-medium">
                    {isPro ? 'Illustrative pricing · Conceptual portfolio showcase' : 'Instant access to interactive studio'}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
