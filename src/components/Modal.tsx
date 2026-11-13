import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { EASE_PREMIUM } from '../utils/motion.ts';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRequestDemo: () => void;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onRequestDemo }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.28, ease: EASE_PREMIUM }}
            className="site-modal-card relative w-full max-w-lg bg-[#1C1830] border border-white/15 rounded-3xl p-7 sm:p-9 shadow-2xl glow-purple z-10 overflow-hidden"
          >
            {/* Ambient accent top bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8B5CF6] via-[#EC4899] to-[#F97316]" />

            {/* Close Button */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={onClose}
              className="absolute top-5 right-5 text-[#A9A4BA] hover:text-[#F8F7FC] transition-colors p-2 rounded-xl hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </motion.button>

            <div className="flex items-center gap-3.5 mb-5">
              <div className="w-11 h-11 rounded-2xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-[#A78BFA] shadow-md">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold text-[#A78BFA] tracking-wider uppercase">
                  GrowthPilot Pro Plan
                </span>
                <h3 id="modal-title" className="text-xl sm:text-2xl font-bold text-[#F8F7FC] tracking-tight">
                  Portfolio Project Notice
                </h3>
              </div>
            </div>

            <div className="space-y-4 text-sm text-[#A9A4BA] leading-relaxed my-6">
              <div className="p-4 rounded-2xl bg-[#171326] border border-white/[0.06] flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <p className="text-[#F8F7FC] text-xs sm:text-sm leading-relaxed">
                  <strong>No payment will be processed.</strong> GrowthPilot AI is a fictional design and engineering portfolio showcase demonstrating high-fidelity SaaS frontend architecture.
                </p>
              </div>

              <p>
                The Pro tier (₹499/mo) represents a conceptual premium subscription tier including all writing engines, higher variation limits, and multi-format outputs.
              </p>

              <p>
                Interested in exploring the full product architecture, requesting an interactive walkthrough, or discussing custom engineering? Reach out via our demo inquiry form!
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15, ease: EASE_PREMIUM }}
                onClick={onRequestDemo}
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-gradient-to-r from-[#8B5CF6] via-[#A78BFA] to-[#EC4899] text-white font-bold text-sm shadow-xl shadow-purple-500/25 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
              >
                <span>Request a Demo</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
                onClick={onClose}
                className="px-5 py-3.5 rounded-2xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-[#F8F7FC] font-semibold text-sm transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
              >
                Close Window
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
