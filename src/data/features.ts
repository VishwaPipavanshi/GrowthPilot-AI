export interface FeatureItem {
  id: string;
  toolId: string;
  name: string;
  description: string;
  iconName: 'Sparkles' | 'Megaphone' | 'ShoppingBag' | 'PenLine';
  tag: string;
  accentColor: string;
  glowColor: string;
  previewType: 'caption' | 'ad' | 'product' | 'rewrite';
  previewData: {
    inputLabel: string;
    sampleInput: string;
    outputBadge: string;
    sampleOutput: string;
  };
}

export const FEATURES: FeatureItem[] = [
  {
    id: 'feature-content',
    toolId: 'content-generator',
    name: 'AI Content Generator',
    description: 'Create engaging social media captions, blog ideas and marketing content from a simple topic or brief.',
    iconName: 'Sparkles',
    tag: 'Social & Blog',
    accentColor: '#8B5CF6',
    glowColor: 'rgba(139, 92, 246, 0.3)',
    previewType: 'caption',
    previewData: {
      inputLabel: 'Topic Prompt',
      sampleInput: 'Morning launch for organic cold brew',
      outputBadge: 'Ready-to-Post Caption',
      sampleOutput: 'Start your morning with pure artisan roast. Smooth, bold, and crafted to fuel your next breakthrough.',
    },
  },
  {
    id: 'feature-ad',
    toolId: 'ad-copy',
    name: 'AI Ad Copywriter',
    description: 'Create compelling advertising headlines, descriptions and calls to action for your campaigns.',
    iconName: 'Megaphone',
    tag: 'Campaign Ads',
    accentColor: '#F97316',
    glowColor: 'rgba(249, 115, 22, 0.3)',
    previewType: 'ad',
    previewData: {
      inputLabel: 'Campaign Goal',
      sampleInput: 'Ergonomic chair 20% discount offer',
      outputBadge: 'High-Converting Headline',
      sampleOutput: 'Say goodbye to back fatigue. Experience ergonomic comfort backed by a 30-day money-back guarantee.',
    },
  },
  {
    id: 'feature-product',
    toolId: 'product-description',
    name: 'Product Description Generator',
    description: 'Turn basic product information into attractive, professional product descriptions.',
    iconName: 'ShoppingBag',
    tag: 'E-Commerce',
    accentColor: '#EC4899',
    glowColor: 'rgba(236, 72, 153, 0.3)',
    previewType: 'product',
    previewData: {
      inputLabel: 'Product Specs',
      sampleInput: 'ANC wireless headphones, 40h battery',
      outputBadge: 'Structured Catalog Copy',
      sampleOutput: 'Immerse yourself in studio-grade acoustics. Engineered with hybrid ANC and 40 hours of uninterrupted playback.',
    },
  },
  {
    id: 'feature-writing',
    toolId: 'writing-assistant',
    name: 'AI Writing Assistant',
    description: 'Rewrite, improve, shorten and expand existing text while maintaining your intended message.',
    iconName: 'PenLine',
    tag: 'Text Refinement',
    accentColor: '#A78BFA',
    glowColor: 'rgba(167, 139, 250, 0.3)',
    previewType: 'rewrite',
    previewData: {
      inputLabel: 'Draft Sentence',
      sampleInput: 'We make tools that make marketing faster',
      outputBadge: 'Polished Revision',
      sampleOutput: 'Streamline your marketing workflow with intelligent tools engineered to accelerate everyday growth.',
    },
  },
];
