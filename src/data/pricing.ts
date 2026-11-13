export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  ctaLabel: string;
  highlighted?: boolean;
  badge?: string;
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'free',
    name: 'Free',
    price: '₹0',
    description: 'Explore the GrowthPilot experience.',
    features: [
      'Interactive sample demo',
      'Basic content tools',
      'Standard writing options',
      'Copy sample results',
      'Explore product features',
    ],
    ctaLabel: 'Get Started',
    highlighted: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '₹499',
    period: '/ month',
    description: 'Designed for growing marketing workflows.',
    features: [
      'All four writing tool experiences',
      'Advanced content options',
      'Multiple sample output styles',
      'More creative workflow examples',
      'Priority support concept',
    ],
    ctaLabel: 'Choose Pro',
    highlighted: true,
    badge: 'RECOMMENDED',
  },
];
