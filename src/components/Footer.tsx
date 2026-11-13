import React from 'react';
import { Sparkles, ArrowUp } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer bg-[#0C0915] border-t border-white/[0.08] pt-20 pb-14 text-[#A9A4BA] relative overflow-hidden">
      {/* Subtle bottom ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[250px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="site-footer__grid grid grid-cols-1 md:grid-cols-4 gap-10 lg:gap-12 pb-14 border-b border-white/[0.06]">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#8B5CF6] via-[#EC4899] to-[#F97316] p-[1.5px] shadow-lg shadow-purple-500/25">
                <div className="w-full h-full bg-[#100D1C] rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-[#A78BFA]" />
                </div>
              </div>
              <span className="font-extrabold text-xl text-[#F8F7FC] tracking-tight">
                GrowthPilot <span className="bg-gradient-to-r from-[#A78BFA] via-[#EC4899] to-[#F97316] bg-clip-text text-transparent">AI</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-md text-[#A9A4BA]">
              A modern marketing assistant engineered for creators, startups, and marketing teams to write captivating content, ad copy, and product descriptions with unprecedented clarity and speed.
            </p>
            <div className="pt-2">
              <span className="inline-block text-xs text-[#A9A4BA]/80 bg-white/[0.03] border border-white/[0.06] px-3 py-1 rounded-full">
                Fictional design and frontend engineering portfolio concept · Zero external AI APIs
              </span>
            </div>
          </div>

          {/* Product links */}
          <div>
            <h4 className="text-xs font-bold tracking-widest text-[#F8F7FC] uppercase font-mono mb-4">
              Platform & Tools
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('features')}
                  className="hover:text-[#F8F7FC] transition-colors cursor-pointer"
                >
                  Features Bento
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('how-it-works')}
                  className="hover:text-[#F8F7FC] transition-colors cursor-pointer"
                >
                  3-Step Workflow
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('demo')}
                  className="hover:text-white transition-colors text-[#A78BFA] font-bold cursor-pointer"
                >
                  Interactive AI Studio
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('pricing')}
                  className="hover:text-[#F8F7FC] transition-colors cursor-pointer"
                >
                  Pricing Plans
                </button>
              </li>
            </ul>
          </div>

          {/* Company & Support */}
          <div>
            <h4 className="text-xs font-bold tracking-widest text-[#F8F7FC] uppercase font-mono mb-4">
              Resources & About
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-[#F8F7FC] transition-colors cursor-pointer"
                >
                  Product Vision
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('faq')}
                  className="hover:text-[#F8F7FC] transition-colors cursor-pointer"
                >
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-[#F8F7FC] transition-colors cursor-pointer"
                >
                  Request a Demo
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A9A4BA]">
          <p>© {new Date().getFullYear()} GrowthPilot AI. Conceptual portfolio project. All rights reserved.</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-[#F8F7FC] transition-all hover:scale-105 cursor-pointer font-medium"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#A78BFA]" />
          </button>
        </div>
      </div>
    </footer>
  );
};
