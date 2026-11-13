import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, RotateCcw, Building2, User, Mail } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading.tsx';
import {
  ContactFormData,
  ContactFormErrors,
  validateContactForm,
  BUSINESS_TYPES,
  INTEREST_OPTIONS,
} from '../utils/validation.ts';
import confetti from 'canvas-confetti';
import { EASE_PREMIUM } from '../utils/motion.ts';

interface ContactProps {
  onShowToast: (text: string, type?: 'success' | 'error' | 'info') => void;
}

const INITIAL_FORM: ContactFormData = {
  fullName: '',
  email: '',
  companyName: '',
  businessType: '',
  interestedIn: '',
  message: '',
};

export const Contact: React.FC<ContactProps> = ({ onShowToast }) => {
  const [formData, setFormData] = useState<ContactFormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleChange = (
    field: keyof ContactFormData,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { isValid, errors: validationErrors } = validateContactForm(formData);

    if (!isValid) {
      setErrors(validationErrors);
      onShowToast('Please correct the highlighted fields.', 'error');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      onShowToast('Demo inquiry captured successfully!', 'success');

      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.65 },
          colors: ['#8B5CF6', '#EC4899', '#F97316'],
        });
      } catch {
        // graceful ignore
      }
    }, 500);
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM);
    setErrors({});
    setIsSubmitted(false);
  };

  return (
    <section id="contact" className="contact-section py-24 sm:py-32 relative scroll-mt-20 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-purple-600/15 via-pink-600/10 to-orange-500/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="GET IN TOUCH"
          title="Let's Grow Something"
          highlight="Great Together."
          description="Interested in exploring GrowthPilot AI? Tell us a little about yourself."
        />

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: EASE_PREMIUM }}
          className="contact-form-card bg-[#1C1830] border border-white/15 rounded-3xl shadow-2xl p-7 sm:p-11 backdrop-blur-2xl relative overflow-hidden glow-purple"
        >
          {/* Top luminous accent gradient border */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8B5CF6] via-[#EC4899] to-[#F97316]" />

          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                onSubmit={handleSubmit}
                noValidate
                className="space-y-6"
              >
                {/* 1 & 2: Full Name and Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-xs font-bold uppercase tracking-wider text-[#A78BFA] mb-2"
                    >
                      Full Name <span className="text-[#EC4899]">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#A9A4BA]">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        id="fullName"
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => handleChange('fullName', e.target.value)}
                        placeholder="Alex Morgan"
                        className={`w-full pl-11 pr-4 py-3.5 rounded-2xl bg-[#171326] text-sm text-[#F8F7FC] placeholder-[#A9A4BA]/40 border transition-all focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] ${
                          errors.fullName
                            ? 'border-rose-500/80 bg-rose-950/10'
                            : 'border-white/10 hover:border-white/20'
                        }`}
                      />
                    </div>
                    {errors.fullName && (
                      <p className="mt-1.5 text-xs text-rose-400 font-semibold">
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-bold uppercase tracking-wider text-[#A78BFA] mb-2"
                    >
                      Email Address <span className="text-[#EC4899]">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#A9A4BA]">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        placeholder="alex@company.com"
                        className={`w-full pl-11 pr-4 py-3.5 rounded-2xl bg-[#171326] text-sm text-[#F8F7FC] placeholder-[#A9A4BA]/40 border transition-all focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] ${
                          errors.email
                            ? 'border-rose-500/80 bg-rose-950/10'
                            : 'border-white/10 hover:border-white/20'
                        }`}
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1.5 text-xs text-rose-400 font-semibold">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* 3 & 4: Company Name and Business Type */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="companyName"
                      className="block text-xs font-bold uppercase tracking-wider text-[#A78BFA] mb-2"
                    >
                      Company Name <span className="text-xs text-[#A9A4BA] font-normal lowercase">(optional)</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#A9A4BA]">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <input
                        id="companyName"
                        type="text"
                        value={formData.companyName}
                        onChange={(e) => handleChange('companyName', e.target.value)}
                        placeholder="Acme Studio"
                        className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-[#171326] text-sm text-[#F8F7FC] placeholder-[#A9A4BA]/40 border border-white/10 hover:border-white/20 transition-all focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="businessType"
                      className="block text-xs font-bold uppercase tracking-wider text-[#A78BFA] mb-2"
                    >
                      Business Type <span className="text-[#EC4899]">*</span>
                    </label>
                    <select
                      id="businessType"
                      value={formData.businessType}
                      onChange={(e) => handleChange('businessType', e.target.value)}
                      className={`w-full px-4 py-3.5 rounded-2xl bg-[#171326] text-sm text-[#F8F7FC] border transition-all focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] ${
                        errors.businessType
                          ? 'border-rose-500/80 bg-rose-950/10'
                          : 'border-white/10 hover:border-white/20'
                      }`}
                    >
                      <option value="" disabled className="bg-[#171326] text-[#A9A4BA]">
                        Select Business Type...
                      </option>
                      {BUSINESS_TYPES.map((bt) => (
                        <option key={bt} value={bt} className="bg-[#171326] text-[#F8F7FC]">
                          {bt}
                        </option>
                      ))}
                    </select>
                    {errors.businessType && (
                      <p className="mt-1.5 text-xs text-rose-400 font-semibold">
                        {errors.businessType}
                      </p>
                    )}
                  </div>
                </div>

                {/* 5: Interested In dropdown */}
                <div>
                  <label
                    htmlFor="interestedIn"
                    className="block text-xs font-bold uppercase tracking-wider text-[#A78BFA] mb-2"
                  >
                    Interested In <span className="text-[#EC4899]">*</span>
                  </label>
                  <select
                    id="interestedIn"
                    value={formData.interestedIn}
                    onChange={(e) => handleChange('interestedIn', e.target.value)}
                    className={`w-full px-4 py-3.5 rounded-2xl bg-[#171326] text-sm text-[#F8F7FC] border transition-all focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] ${
                      errors.interestedIn
                        ? 'border-rose-500/80 bg-rose-950/10'
                        : 'border-white/10 hover:border-white/20'
                    }`}
                  >
                    <option value="" disabled className="bg-[#171326] text-[#A9A4BA]">
                      Select Tool or Focus...
                    </option>
                    {INTEREST_OPTIONS.map((opt) => (
                      <option key={opt} value={opt} className="bg-[#171326] text-[#F8F7FC]">
                        {opt}
                      </option>
                    ))}
                  </select>
                  {errors.interestedIn && (
                    <p className="mt-1.5 text-xs text-rose-400 font-semibold">
                      {errors.interestedIn}
                    </p>
                  )}
                </div>

                {/* 6: Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-bold uppercase tracking-wider text-[#A78BFA] mb-2"
                  >
                    Message <span className="text-[#EC4899]">* (min. 10 characters)</span>
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    placeholder="Tell us about your team and what marketing challenges you would like to streamline..."
                    className={`w-full p-4 rounded-2xl bg-[#171326] text-sm text-[#F8F7FC] placeholder-[#A9A4BA]/40 border transition-all resize-none focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] ${
                      errors.message
                        ? 'border-rose-500/80 bg-rose-950/10'
                        : 'border-white/10 hover:border-white/20'
                    }`}
                  />
                  {errors.message && (
                    <p className="mt-1.5 text-xs text-rose-400 font-semibold">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit button with micro-motion */}
                <div className="pt-2">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: isSubmitting ? 1 : 1.015 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.985 }}
                    transition={{ duration: 0.15, ease: EASE_PREMIUM }}
                    className="w-full py-4 px-6 rounded-2xl font-black text-sm text-white bg-gradient-to-r from-[#8B5CF6] via-[#A78BFA] to-[#EC4899] hover:opacity-95 shadow-xl shadow-purple-500/30 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Validating Inquiry...' : 'Submit Demo Request'}</span>
                  </motion.button>
                  <p className="text-[11px] text-[#A9A4BA]/70 text-center mt-3">
                    Frontend simulation only. Form state is processed locally in React with zero external transmissions.
                  </p>
                </div>
              </motion.form>
            ) : (
              /* Success State */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: EASE_PREMIUM }}
                className="contact-success py-12 px-4 text-center space-y-6"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 20, delay: 0.1 }}
                  className="w-16 h-16 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto shadow-lg shadow-emerald-500/20"
                >
                  <CheckCircle2 className="w-9 h-9" />
                </motion.div>

                <div className="space-y-2">
                  <h3 className="text-3xl font-extrabold text-[#F8F7FC] tracking-tight">
                    Thank You, {formData.fullName}!
                  </h3>
                  <p className="text-sm sm:text-base text-[#A9A4BA] max-w-md mx-auto leading-relaxed">
                    Your demo request for <strong className="text-[#F8F7FC]">{formData.interestedIn}</strong> has been successfully captured in this session.
                  </p>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                  className="contact-success__summary p-5 rounded-2xl bg-[#171326] border border-white/[0.08] max-w-md mx-auto text-xs text-[#A9A4BA] space-y-2 text-left"
                >
                  <div className="font-bold text-[#A78BFA] uppercase tracking-wider text-[10px] font-mono">
                    Captured Request Overview
                  </div>
                  <div className="flex justify-between border-b border-white/[0.04] pb-1.5">
                    <span>Contact Email:</span>
                    <span className="text-[#F8F7FC] font-medium">{formData.email}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/[0.04] pb-1.5">
                    <span>Business Type:</span>
                    <span className="text-[#F8F7FC] font-medium">{formData.businessType}</span>
                  </div>
                  {formData.companyName && (
                    <div className="flex justify-between border-b border-white/[0.04] pb-1.5">
                      <span>Organization:</span>
                      <span className="text-[#F8F7FC] font-medium">{formData.companyName}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Focus Area:</span>
                    <span className="text-[#F8F7FC] font-medium">{formData.interestedIn}</span>
                  </div>
                </motion.div>

                <div className="pt-4">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    onClick={handleReset}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 text-sm font-bold text-[#F8F7FC] transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4 text-[#A78BFA]" />
                    <span>Submit Another Inquiry</span>
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
