import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Megaphone,
  ShoppingBag,
  PenLine,
  Copy,
  RotateCw,
  Trash2,
  Check,
  Info,
  Loader2,
  Zap,
  LayoutTemplate,
  FileText,
} from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading.tsx';
import {
  TOOLS,
  TONES,
  PLATFORMS,
  ToneType,
  PlatformType,
  generateSampleResponse,
  GeneratedResult,
} from '../data/sampleResponses.ts';
import { EASE_PREMIUM } from '../utils/motion.ts';

interface AIDemoProps {
  initialToolId?: string;
  onShowToast: (text: string, type?: 'success' | 'error' | 'info') => void;
}

const TOOL_ICONS: Record<string, React.ElementType> = {
  Sparkles,
  Megaphone,
  ShoppingBag,
  PenLine,
};

const SUGGESTED_PROMPTS = [
  'Organic artisan cold brew subscription for creators',
  'Ergonomic office chair launch with 20% discount',
  'Minimalist noise-canceling headphones, 40h battery',
  'Fast marketing platform that simplifies content creation',
];

const resultContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const resultItemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: EASE_PREMIUM,
    },
  },
};

export const AIDemo: React.FC<AIDemoProps> = ({ initialToolId, onShowToast }) => {
  const [selectedTool, setSelectedTool] = useState<string>(
    initialToolId || 'content-generator'
  );
  const [prompt, setPrompt] = useState<string>('');
  const [selectedTone, setSelectedTone] = useState<ToneType>('Friendly');
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformType>('Instagram');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<GeneratedResult | null>(null);
  const [variationIndex, setVariationIndex] = useState<number>(0);
  const [inputError, setInputError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'card' | 'document'>('card');

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (initialToolId && initialToolId !== selectedTool) {
      setSelectedTool(initialToolId);
      const toolObj = TOOLS.find((t) => t.id === initialToolId);
      if (toolObj && !prompt.trim()) {
        setPrompt(toolObj.samplePrompt);
      }
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 100);
    }
  }, [initialToolId]);

  const currentToolObj = TOOLS.find((t) => t.id === selectedTool) || TOOLS[0];

  const handleGenerate = (newVariation = 0) => {
    if (!prompt.trim()) {
      setInputError('Please enter a topic or brief before generating.');
      textareaRef.current?.focus();
      return;
    }

    setInputError(null);
    setIsLoading(true);

    setTimeout(() => {
      const generated = generateSampleResponse(
        selectedTool,
        prompt,
        selectedTone,
        selectedPlatform,
        newVariation
      );
      setResult(generated);
      setVariationIndex(newVariation);
      setIsLoading(false);
      onShowToast('Content synthesized successfully!', 'success');
    }, 600);
  };

  const handleRegenerate = () => {
    if (!prompt.trim()) return;
    const nextVariation = variationIndex + 1;
    handleGenerate(nextVariation);
  };

  const handleClear = () => {
    setPrompt('');
    setResult(null);
    setInputError(null);
    setCopied(false);
    onShowToast('Studio workspace reset to empty state.', 'info');
  };

  const handleCopy = async () => {
    if (!result) return;

    let fullText = `${result.headline}\n\n`;
    fullText += `${result.body.join('\n\n')}\n\n`;
    if (result.keyHighlights && result.keyHighlights.length > 0) {
      fullText += `Highlights:\n${result.keyHighlights.map((h) => `• ${h}`).join('\n')}\n\n`;
    }
    fullText += `${result.callToAction}\n`;
    if (result.hashtags && result.hashtags.length > 0) {
      fullText += `\n${result.hashtags.join(' ')}`;
    }

    try {
      await navigator.clipboard.writeText(fullText.trim());
      setCopied(true);
      onShowToast('Copied to clipboard!', 'success');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      onShowToast('Please select and copy manually.', 'error');
    }
  };

  const handleUsePrompt = (text: string) => {
    setPrompt(text);
    setInputError(null);
    textareaRef.current?.focus();
  };

  return (
    <section id="demo" className="demo-section py-24 sm:py-32 relative scroll-mt-20">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[550px] bg-gradient-to-tr from-purple-600/15 via-pink-600/10 to-orange-500/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="TRY IT YOURSELF"
          title="Experience Smarter"
          highlight="Content Creation."
          description="Explore the GrowthPilot AI writing tools using our interactive sample demo."
        />

        {/* Mandatory Transparency Pill */}
        <div className="flex items-center justify-center -mt-6 mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#171326] border border-white/10 text-xs text-[#A78BFA] shadow-sm backdrop-blur-md">
            <Info className="w-3.5 h-3.5 text-[#F97316] shrink-0" />
            <span className="font-semibold">
              Interactive sample demo — no live AI connection.
            </span>
          </div>
        </div>

        {/* Main Demo Workspace Card */}
        <div className="demo-workspace bg-[#1C1830] border border-white/15 rounded-3xl shadow-2xl glow-purple overflow-hidden backdrop-blur-2xl">
          {/* Top Bar / App Header */}
          <div className="demo-workspace__header px-6 py-4 border-b border-white/[0.08] bg-[#171326]/90 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500/90 shadow-sm" />
                <span className="w-3 h-3 rounded-full bg-amber-500/90 shadow-sm" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/90 shadow-sm" />
              </div>
              <span className="text-sm font-bold text-[#F8F7FC] pl-2 border-l border-white/10 flex items-center gap-2">
                <span>GrowthPilot Studio</span>
                <span className="text-[10px] uppercase font-mono font-bold text-[#A78BFA] bg-purple-500/15 px-2 py-0.5 rounded border border-purple-500/30">
                  v1.2 Sandbox
                </span>
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-[#A9A4BA]">Engine Active:</span>
              <span className="font-bold text-[#F8F7FC] bg-white/[0.06] px-2.5 py-1 rounded-md border border-white/10">
                {currentToolObj.name}
              </span>
            </div>
          </div>

          {/* Studio Body: Split View */}
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-white/[0.08]">
            {/* LEFT PANEL: INPUT CONTROLS */}
            <div className="demo-panel lg:col-span-6 p-6 sm:p-8 space-y-6">
              {/* 1. Tool Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#A78BFA] mb-3">
                  1. Select Tool Engine
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {TOOLS.map((tool) => {
                    const isSelected = selectedTool === tool.id;
                    const Icon = TOOL_ICONS[tool.icon] || Sparkles;

                    return (
                      <motion.button
                        key={tool.id}
                        type="button"
                        whileHover={{ scale: 1.015 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.15 }}
                        onClick={() => {
                          setSelectedTool(tool.id);
                          setInputError(null);
                        }}
                        className={`p-3.5 rounded-2xl text-left border transition-all duration-200 flex items-start gap-3 cursor-pointer ${
                          isSelected
                            ? 'bg-gradient-to-br from-purple-600/25 to-pink-600/15 border-purple-500/60 shadow-md text-white'
                            : 'bg-[#171326] border-white/[0.06] hover:border-white/20 text-[#A9A4BA] hover:text-[#F8F7FC]'
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                            isSelected
                              ? 'bg-gradient-to-br from-[#8B5CF6] to-[#EC4899] text-white shadow-sm'
                              : 'bg-white/5 text-[#A78BFA]'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-bold truncate text-[#F8F7FC]">
                            {tool.shortName}
                          </div>
                          <div className="text-[10px] text-[#A9A4BA] truncate">
                            {tool.name}
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Topic / Prompt Input */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label
                    htmlFor="prompt-input"
                    className="text-xs font-bold uppercase tracking-wider text-[#A78BFA]"
                  >
                    2. Topic or Marketing Brief
                  </label>
                  <span className="text-[11px] text-[#A9A4BA] font-mono">
                    {prompt.length} chars
                  </span>
                </div>

                {/* Quick-Prompt Suggestions */}
                <div className="demo-quick-prompts flex items-center gap-1.5 overflow-x-auto pb-2 mb-2 no-scrollbar text-xs">
                  <span className="text-[10px] uppercase font-bold text-[#A9A4BA] shrink-0 font-mono">
                    Quick Ideas:
                  </span>
                  {SUGGESTED_PROMPTS.map((sp, idx) => (
                    <motion.button
                      key={idx}
                      type="button"
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      transition={{ duration: 0.12 }}
                      onClick={() => handleUsePrompt(sp)}
                      className="px-2.5 py-1 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-[11px] text-[#A9A4BA] hover:text-white whitespace-nowrap transition-colors cursor-pointer"
                    >
                      + {sp.slice(0, 24)}...
                    </motion.button>
                  ))}
                </div>

                <div className="relative">
                  <textarea
                    id="prompt-input"
                    ref={textareaRef}
                    rows={4}
                    value={prompt}
                    onChange={(e) => {
                      setPrompt(e.target.value);
                      if (inputError) setInputError(null);
                    }}
                    onKeyDown={(e) => {
                      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
                        e.preventDefault();
                        handleGenerate(0);
                      }
                    }}
                    placeholder="Describe what you want to create... (e.g. Organic artisan cold brew for creators)"
                    className={`demo-prompt w-full p-4 rounded-2xl bg-[#171326] text-sm text-[#F8F7FC] placeholder-[#A9A4BA]/40 border transition-all resize-none focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] ${
                      inputError ? 'border-rose-500/80 bg-rose-950/10' : 'border-white/10'
                    }`}
                  />
                  <div className="demo-shortcut flex items-center justify-between mt-1.5 text-[11px] text-[#A9A4BA]">
                    <span>Clear, concise briefs produce superior copy</span>
                    <span className="flex items-center gap-1">
                      <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[10px] font-mono">Cmd</kbd> + <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[10px] font-mono">Enter</kbd>
                    </span>
                  </div>
                </div>

                {inputError && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-xs text-rose-400 font-semibold flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                    {inputError}
                  </motion.p>
                )}
              </div>

              {/* 3 & 4. Tone and Channel Selectors */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Tone */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#A78BFA] mb-2">
                    3. Tone of Voice
                  </label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {TONES.map((tone) => (
                      <motion.button
                        key={tone}
                        type="button"
                        whileTap={{ scale: 0.96 }}
                        onClick={() => setSelectedTone(tone)}
                        className={`px-3 py-2.5 rounded-xl text-xs font-semibold transition-all text-center cursor-pointer ${
                          selectedTone === tone
                            ? 'bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white shadow-md'
                            : 'bg-[#171326] border border-white/[0.06] text-[#A9A4BA] hover:text-[#F8F7FC]'
                        }`}
                      >
                        {tone}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Channel / Platform */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#A78BFA] mb-2">
                    4. Target Channel
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {PLATFORMS.map((platform) => (
                      <motion.button
                        key={platform}
                        type="button"
                        whileTap={{ scale: 0.96 }}
                        onClick={() => setSelectedPlatform(platform)}
                        className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                          selectedPlatform === platform
                            ? 'bg-gradient-to-r from-[#EC4899] to-[#F97316] text-white shadow-md'
                            : 'bg-[#171326] border border-white/[0.06] text-[#A9A4BA] hover:text-[#F8F7FC]'
                        }`}
                      >
                        {platform}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>

              {/* 5. Generate Button */}
              <div className="pt-2">
                <motion.button
                  type="button"
                  disabled={isLoading}
                  whileHover={{ scale: isLoading ? 1 : 1.015 }}
                  whileTap={{ scale: isLoading ? 1 : 0.985 }}
                  transition={{ duration: 0.15, ease: EASE_PREMIUM }}
                  onClick={() => handleGenerate(0)}
                  className="w-full py-4 px-6 rounded-2xl font-extrabold text-sm text-white bg-gradient-to-r from-[#8B5CF6] via-[#A78BFA] to-[#EC4899] shadow-xl shadow-purple-500/30 transition-shadow flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>Synthesizing Copy Model...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-[#F97316]" />
                      <span>Generate Content</span>
                    </>
                  )}
                </motion.button>
              </div>
            </div>

            {/* RIGHT PANEL: OUTPUT AREA */}
            <div className="demo-panel demo-output-panel lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between bg-[#151126]/60">
              <AnimatePresence mode="wait">
                {!result && !isLoading ? (
                  /* Initial Empty State */
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.25 }}
                    className="demo-empty-state h-full min-h-[420px] flex flex-col items-center justify-center text-center p-8 rounded-2xl border border-dashed border-white/10"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                      className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/25 flex items-center justify-center text-[#A78BFA] mb-4 shadow-inner"
                    >
                      <Sparkles className="w-8 h-8 text-[#A78BFA]" />
                    </motion.div>
                    <h3 className="text-lg font-bold text-[#F8F7FC] mb-2 tracking-tight">
                      Your content will appear here.
                    </h3>
                    <p className="text-xs sm:text-sm text-[#A9A4BA] max-w-sm leading-relaxed mb-6">
                      Select your preferred tool, enter your topic or click "Quick Ideas", then hit Generate Content to preview the sample output.
                    </p>
                    <div className="flex items-center gap-2 text-xs text-[#A78BFA] bg-purple-500/10 px-3.5 py-1.5 rounded-full border border-purple-500/20">
                      <Zap className="w-3.5 h-3.5 text-[#F97316]" />
                      <span>Ready for live simulation</span>
                    </div>
                  </motion.div>
                ) : isLoading ? (
                  /* Loading State */
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="demo-empty-state h-full min-h-[420px] flex flex-col items-center justify-center text-center p-8 rounded-2xl border border-white/10 bg-[#171326]"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/25 flex items-center justify-center text-[#A78BFA] mb-4">
                      <Loader2 className="w-7 h-7 animate-spin text-[#8B5CF6]" />
                    </div>
                    <h3 className="text-base font-bold text-[#F8F7FC] mb-1">
                      Composing Marketing Copy...
                    </h3>
                    <p className="text-xs text-[#A9A4BA]">
                      Applying <strong className="text-[#F8F7FC]">{selectedTone}</strong> tone for <strong className="text-[#F8F7FC]">{selectedPlatform}</strong>
                    </p>
                  </motion.div>
                ) : result ? (
                  /* Generated Content Result with Staggered Entrance */
                  <motion.div
                    key={`result-${variationIndex}`}
                    variants={resultContainerVariants}
                    initial="hidden"
                    animate="show"
                    exit={{ opacity: 0 }}
                    className="demo-result space-y-5"
                  >
                    {/* Header row & view toggle */}
                    <motion.div variants={resultItemVariants} className="flex items-center justify-between pb-3.5 border-b border-white/[0.08]">
                      <div>
                        <div className="text-[10px] uppercase tracking-wider text-[#A78BFA] font-bold font-mono">
                          Synthesized Output
                        </div>
                        <div className="text-xs text-[#A9A4BA] flex items-center gap-1.5 mt-0.5">
                          <span className="text-[#F8F7FC] font-semibold">{currentToolObj.shortName}</span>
                          <span aria-hidden="true">·</span>
                          <span>{selectedTone}</span>
                          <span aria-hidden="true">·</span>
                          <span>{selectedPlatform}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                          Variation #{variationIndex + 1}
                        </div>
                        <div className="hidden sm:flex items-center gap-1 bg-[#171326] p-1 rounded-lg border border-white/10">
                          <button
                            onClick={() => setViewMode('card')}
                            className={`p-1 rounded cursor-pointer transition-colors ${viewMode === 'card' ? 'bg-[#8B5CF6] text-white' : 'text-[#A9A4BA] hover:text-white'}`}
                            title="Card View"
                          >
                            <LayoutTemplate className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setViewMode('document')}
                            className={`p-1 rounded cursor-pointer transition-colors ${viewMode === 'document' ? 'bg-[#8B5CF6] text-white' : 'text-[#A9A4BA] hover:text-white'}`}
                            title="Document View"
                          >
                            <FileText className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </motion.div>

                    {/* Result Content Box */}
                    <div className="p-5 sm:p-6 rounded-2xl bg-[#171326] border border-white/10 space-y-4 shadow-inner">
                      {/* Headline */}
                      <motion.div variants={resultItemVariants} className="space-y-1">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-[#A78BFA] font-mono">
                          Primary Hook / Headline
                        </span>
                        <h4 className="text-base sm:text-lg font-bold text-[#F8F7FC] leading-snug">
                          {result.headline}
                        </h4>
                      </motion.div>

                      {/* Body Paragraphs */}
                      <motion.div variants={resultItemVariants} className="space-y-2 pt-2 border-t border-white/[0.06] text-sm text-[#A9A4BA] leading-relaxed">
                        {result.body.map((para, i) => (
                          <p key={i}>{para}</p>
                        ))}
                      </motion.div>

                      {/* Key Highlights */}
                      {result.keyHighlights && result.keyHighlights.length > 0 && (
                        <motion.div variants={resultItemVariants} className="pt-3 border-t border-white/[0.06]">
                          <span className="text-[10px] font-bold text-[#A78BFA] uppercase tracking-wider font-mono block mb-2">
                            Key Value Propositions:
                          </span>
                          <ul className="space-y-1.5 text-xs text-[#F8F7FC]">
                            {result.keyHighlights.map((hl, i) => (
                              <li key={i} className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#EC4899]" />
                                <span>{hl}</span>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}

                      {/* Call to action */}
                      <motion.div variants={resultItemVariants} className="pt-3 border-t border-white/[0.06] bg-[#100D1C]/60 p-3.5 rounded-xl border border-white/[0.04]">
                        <span className="text-[10px] font-bold text-[#F97316] uppercase tracking-wider font-mono block mb-1">
                          Recommended Action / CTA:
                        </span>
                        <p className="text-xs font-bold text-[#F8F7FC]">
                          {result.callToAction}
                        </p>
                      </motion.div>

                      {/* Hashtags */}
                      {result.hashtags && result.hashtags.length > 0 && (
                        <motion.div variants={resultItemVariants} className="flex flex-wrap gap-1.5 pt-2">
                          {result.hashtags.map((tag, i) => (
                            <span
                              key={i}
                              className="text-[11px] font-mono text-[#A78BFA] bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20"
                            >
                              {tag}
                            </span>
                          ))}
                        </motion.div>
                      )}
                    </div>

                    {/* Action Toolbar */}
                    <motion.div variants={resultItemVariants} className="demo-result__actions flex flex-wrap items-center justify-between gap-3 pt-2">
                      <div className="flex items-center gap-2.5">
                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          transition={{ duration: 0.15 }}
                          onClick={handleCopy}
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/40 transition-colors cursor-pointer shadow-sm"
                        >
                          {copied ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="text-emerald-300">Copied to Clipboard</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 text-[#A78BFA]" />
                              <span>Copy Result</span>
                            </>
                          )}
                        </motion.button>

                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          transition={{ duration: 0.15 }}
                          onClick={handleRegenerate}
                          disabled={isLoading}
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-[#F8F7FC] bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 transition-colors cursor-pointer"
                        >
                          <RotateCw
                            className={`w-3.5 h-3.5 text-[#EC4899] ${
                              isLoading ? 'animate-spin' : ''
                            }`}
                          />
                          <span>Regenerate</span>
                        </motion.button>
                      </div>

                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleClear}
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs text-[#A9A4BA] hover:text-rose-400 transition-colors cursor-pointer"
                        title="Clear input and output"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Clear</span>
                      </motion.button>
                    </motion.div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
