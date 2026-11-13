import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { EASE_PREMIUM } from '../utils/motion.ts';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  text: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  return (
    <div
      aria-live="polite"
      className="site-toast fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0"
    >
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.94 }}
            transition={{ duration: 0.25, ease: EASE_PREMIUM }}
            className={`pointer-events-auto flex items-center justify-between gap-3 p-4 rounded-2xl border shadow-2xl backdrop-blur-xl ${
              toast.type === 'success'
                ? 'bg-[#1C1830]/95 border-emerald-500/40 text-emerald-200 glow-purple-sm'
                : toast.type === 'error'
                ? 'bg-[#1C1830]/95 border-rose-500/40 text-rose-200'
                : 'bg-[#1C1830]/95 border-[#8B5CF6]/40 text-purple-200 glow-purple-sm'
            }`}
          >
            <div className="flex items-center gap-3">
              {toast.type === 'success' && (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              )}
              {toast.type === 'error' && (
                <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
              )}
              {toast.type === 'info' && (
                <Info className="w-5 h-5 text-[#A78BFA] shrink-0" />
              )}
              <p className="text-xs sm:text-sm font-semibold text-[#F8F7FC]">{toast.text}</p>
            </div>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => onDismiss(toast.id)}
              className="text-[#A9A4BA] hover:text-[#F8F7FC] transition-colors p-1.5 rounded-lg hover:bg-white/5 focus:outline-none focus:ring-1 focus:ring-[#8B5CF6] cursor-pointer"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </motion.button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
