import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading.tsx';
import { FAQS } from '../data/faq.ts';
import { EASE_PREMIUM } from '../utils/motion.ts';

export const FAQ: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggleFAQ = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="faq-section py-24 sm:py-32 relative scroll-mt-20 overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="COMMON QUESTIONS"
          title="Frequently Asked"
          highlight="Questions"
          description="Everything you need to know about the GrowthPilot AI platform concept and interactive demo."
        />

        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openId === faq.id;

            return (
              <motion.div
                key={faq.id}
                layout
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.08,
                  ease: EASE_PREMIUM,
                }}
                className={`faq-item rounded-2xl sm:rounded-3xl border transition-colors duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-[#1C1830] border-[#8B5CF6]/50 shadow-xl glow-purple-sm'
                    : 'bg-[#1C1830]/70 border-white/[0.08] hover:border-white/20'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(faq.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${faq.id}`}
                  className="faq-question w-full p-6 sm:p-7 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]"
                >
                  <div className="flex items-center gap-3.5">
                    <span className="font-mono text-xs font-bold text-[#A78BFA] opacity-75">
                      0{idx + 1}
                    </span>
                    <span className="text-base sm:text-lg font-bold text-[#F8F7FC] tracking-tight">
                      {faq.question}
                    </span>
                  </div>

                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25, ease: EASE_PREMIUM }}
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      isOpen
                        ? 'bg-gradient-to-br from-[#8B5CF6] to-[#EC4899] text-white shadow-md'
                        : 'bg-white/5 text-[#A9A4BA] hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {isOpen ? (
                      <Minus className="w-4 h-4" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${faq.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: EASE_PREMIUM }}
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25, ease: EASE_PREMIUM }}
                        className="px-6 sm:px-7 pb-7 pt-1 text-sm sm:text-base text-[#A9A4BA] leading-relaxed border-t border-white/[0.06]"
                      >
                        <p>{faq.answer}</p>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
