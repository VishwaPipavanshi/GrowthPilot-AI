import React, { useState } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { Footer } from './components/Footer.tsx';
import { Toast, ToastMessage } from './components/Toast.tsx';
import { Modal } from './components/Modal.tsx';
import { CustomCursor } from './components/CustomCursor.tsx';
import { Hero } from './sections/Hero.tsx';
import { TrustStrip } from './sections/TrustStrip.tsx';
import { Features } from './sections/Features.tsx';
import { HowItWorks } from './sections/HowItWorks.tsx';
import { AIDemo } from './sections/AIDemo.tsx';
import { Pricing } from './sections/Pricing.tsx';
import { About } from './sections/About.tsx';
import { FAQ } from './sections/FAQ.tsx';
import { Contact } from './sections/Contact.tsx';
import { useActiveSection } from './hooks/useActiveSection.ts';

const SECTION_IDS = [
  'home',
  'features',
  'how-it-works',
  'demo',
  'pricing',
  'about',
  'faq',
  'contact',
];

export default function App() {
  const activeSection = useActiveSection(SECTION_IDS, 120);

  // Demo active tool state (can be triggered by Feature cards)
  const [selectedDemoToolId, setSelectedDemoToolId] = useState<string>('content-generator');

  // Modal state for Pro pricing plan
  const [isProModalOpen, setIsProModalOpen] = useState<boolean>(false);

  // Toast notification state
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (text: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const newToast: ToastMessage = { id, text, type };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const topOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    } else if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectFeature = (toolId: string) => {
    setSelectedDemoToolId(toolId);
    scrollToSection('demo');
    showToast(`Switched active tool in AI Demo`, 'info');
  };

  const handleRequestDemoFromModal = () => {
    setIsProModalOpen(false);
    scrollToSection('contact');
    showToast('Redirected to demo request form', 'info');
  };

  return (
    <div className="min-h-screen bg-[#100D1C] text-[#F8F7FC] flex flex-col font-sans selection:bg-[#8B5CF6]/30 selection:text-white relative">
      <CustomCursor />

      {/* 1. Sticky Navigation Bar */}
      <Navbar
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />

      <main className="flex-grow">
        {/* 2. Hero Section (#home) */}
        <Hero
          onNavigate={scrollToSection}
          onSelectFeature={handleSelectFeature}
        />

        {/* 3. Trust / Audience Strip */}
        <TrustStrip />

        {/* 4. Features Section (#features) */}
        <Features
          onSelectFeature={handleSelectFeature}
        />

        {/* 5. How It Works Section (#how-it-works) */}
        <HowItWorks
          onNavigate={scrollToSection}
        />

        {/* 6. Interactive AI Demo Section (#demo) */}
        <AIDemo
          initialToolId={selectedDemoToolId}
          onShowToast={showToast}
        />

        {/* 7. Pricing Section (#pricing) */}
        <Pricing
          onSelectFreePlan={() => scrollToSection('demo')}
          onOpenProModal={() => setIsProModalOpen(true)}
        />

        {/* 8. About Section (#about) */}
        <About />

        {/* 9. FAQ Section (#faq) */}
        <FAQ />

        {/* 10. Contact / Request a Demo Section (#contact) */}
        <Contact
          onShowToast={showToast}
        />
      </main>

      {/* Footer */}
      <Footer onNavigate={scrollToSection} />

      {/* Pro Confirmation Modal */}
      <Modal
        isOpen={isProModalOpen}
        onClose={() => setIsProModalOpen(false)}
        onRequestDemo={handleRequestDemoFromModal}
      />

      {/* Toast Notification Container */}
      <Toast toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
