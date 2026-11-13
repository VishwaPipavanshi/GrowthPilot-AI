import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { Logo } from './Logo.tsx';
import { EASE_PREMIUM } from '../utils/motion.ts';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'features', label: 'Features' },
  { id: 'how-it-works', label: 'How It Works' },
  { id: 'demo', label: 'AI Demo' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`site-navbar fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-[#100D1C]/85 backdrop-blur-xl border-b border-white/[0.08] shadow-2xl shadow-purple-950/20'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6">
          {/* Brand Wordmark & Luminous Mark */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => handleLinkClick('home')}
            className="group text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] rounded-xl"
            aria-label="GrowthPilot AI - Return to top"
          >
            <Logo className="site-logo group-hover:scale-[1.02] transition-transform duration-300" />
          </motion.button>

          {/* Desktop Navigation Links with layoutId Gliding Pill */}
          <nav
            aria-label="Main Navigation"
            className="hidden lg:flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#171326]/70 border border-white/[0.07] backdrop-blur-md shadow-inner relative"
          >
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors duration-200 cursor-pointer ${
                    isActive
                      ? 'text-[#F8F7FC]'
                      : 'text-[#A9A4BA] hover:text-[#F8F7FC] hover:bg-white/[0.04]'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeNavBackground"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-[#8B5CF6]/30 via-[#A78BFA]/20 to-[#EC4899]/20 border border-[#8B5CF6]/50 shadow-sm shadow-purple-500/20"
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <motion.button
              data-cursor-magnetic="true"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.15, ease: EASE_PREMIUM }}
              onClick={() => handleLinkClick('demo')}
              className="relative group inline-flex items-center gap-2 px-4.5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#8B5CF6] via-[#A78BFA] to-[#EC4899] shadow-md shadow-purple-500/30 hover:shadow-purple-500/50 transition-shadow duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]"
            >
              <span>Get Started</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </motion.button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex sm:hidden items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => handleLinkClick('demo')}
              className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] shadow-sm"
            >
              Demo
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-[#F8F7FC] hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer with AnimatePresence */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -8 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -8 }}
            transition={{ duration: 0.25, ease: EASE_PREMIUM }}
            className="mobile-menu-panel lg:hidden bg-[#171326]/95 backdrop-blur-2xl border-b border-white/10 px-4 pt-3 pb-6 shadow-2xl mt-2 overflow-hidden"
          >
            <nav className="flex flex-col gap-1.5">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleLinkClick(link.id)}
                    className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                      isActive
                        ? 'bg-[#8B5CF6]/20 text-[#F8F7FC] border border-[#8B5CF6]/30'
                        : 'text-[#A9A4BA] hover:text-[#F8F7FC] hover:bg-white/5'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
              <div className="pt-3 border-t border-white/10 mt-2">
                <button
                  onClick={() => handleLinkClick('demo')}
                  className="w-full py-3 rounded-xl text-center text-sm font-bold text-white bg-gradient-to-r from-[#8B5CF6] via-[#A78BFA] to-[#EC4899] shadow-lg shadow-purple-500/25"
                >
                  Try Interactive Demo
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
