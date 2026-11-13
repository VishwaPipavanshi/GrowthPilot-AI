export interface ToolConfig {
  id: string;
  name: string;
  shortName: string;
  icon: string;
  description: string;
  samplePrompt: string;
}

export const TOOLS: ToolConfig[] = [
  {
    id: 'content-generator',
    name: 'AI Content Generator',
    shortName: 'Content Generator',
    icon: 'Sparkles',
    description: 'Create engaging social media captions, blog ideas and marketing content from a simple topic or brief.',
    samplePrompt: 'Organic artisan cold brew coffee subscription for remote workers',
  },
  {
    id: 'ad-copy',
    name: 'AI Ad Copywriter',
    shortName: 'Ad Copywriter',
    icon: 'Megaphone',
    description: 'Create compelling advertising headlines, descriptions and calls to action for your campaigns.',
    samplePrompt: 'Eco-friendly ergonomic office chair launching with 20% early-bird discount',
  },
  {
    id: 'product-description',
    name: 'Product Description Generator',
    shortName: 'Product Writer',
    icon: 'ShoppingBag',
    description: 'Turn basic product information into attractive, professional product descriptions.',
    samplePrompt: 'Minimalist noise-canceling wireless headphones with 40-hour battery life',
  },
  {
    id: 'writing-assistant',
    name: 'AI Writing Assistant',
    shortName: 'Writing Assistant',
    icon: 'PenLine',
    description: 'Rewrite, improve, shorten and expand existing text while maintaining your intended message.',
    samplePrompt: 'We make software that helps companies do marketing stuff quicker without headache.',
  },
];

export const TONES = ['Professional', 'Friendly', 'Creative', 'Persuasive'] as const;
export type ToneType = (typeof TONES)[number];

export const PLATFORMS = ['Instagram', 'LinkedIn', 'Facebook', 'Website', 'General'] as const;
export type PlatformType = (typeof PLATFORMS)[number];

export interface GeneratedResult {
  headline: string;
  body: string[];
  callToAction: string;
  hashtags?: string[];
  keyHighlights?: string[];
}

type ResponseTemplate = {
  headline: (topic: string) => string;
  body: (topic: string) => string[];
  callToAction: (topic: string) => string;
  hashtags?: (topic: string) => string[];
  keyHighlights?: (topic: string) => string[];
};

export const SAMPLE_RESPONSES: Record<string, Record<ToneType, ResponseTemplate[]>> = {
  'content-generator': {
    Friendly: [
      {
        headline: (t) => `✨ Level up your routine with ${t}!`,
        body: (t) => [
          `Start your day with something truly special. Whether you are tackling big goals or simply taking a well-deserved breather, ${t} brings a fresh spark of joy to every single moment.`,
          `We poured care into every single detail so you can enjoy pure, uncomplicated quality that fits right into your rhythm. What is your go-to ritual this week? Let us know in the comments below! 👇`,
        ],
        callToAction: () => 'Tap the link in our bio to explore the collection & treat yourself today.',
        hashtags: (t) => ['#DailyInspiration', '#QualityFirst', '#ModernLiving', '#SmallDelights', `#${t.replace(/[^a-zA-Z0-9]/g, '').slice(0, 15) || 'GrowthPilot'}`],
      },
      {
        headline: (t) => `Warm vibes & better days: Meet ${t} ☕`,
        body: (t) => [
          `Ever find something that just makes life effortlessly smoother? That is the exact feeling behind ${t}. Created with passion and designed for real life, it is ready when you are.`,
          `No gimmicks, no fluff—just thoughtful craftsmanship built around what you care about most.`,
        ],
        callToAction: () => 'Save this post for later or share it with a friend who needs this in their life!',
        hashtags: () => ['#CreatorCommunity', '#FreshFinds', '#FeelGoodVibes', '#SimpleJoy'],
      },
    ],
    Professional: [
      {
        headline: (t) => `Strategic Innovation in Practice: Scaling Impact with ${t}`,
        body: (t) => [
          `In today's fast-moving market, precision and consistency separate category leaders from the rest. Incorporating ${t} into your operational workflow eliminates friction and drives measurable retention.`,
          `Key strategic takeaways:`,
          `• Streamlined execution: Reduce overhead while maintaining uncompromising standards.`,
          `• Predictable outcomes: Deliver repeatable value across every customer touchpoint.`,
          `• Long-term alignment: Build sustainable momentum without sacrificing craft.`,
        ],
        callToAction: () => 'Read our complete executive brief or schedule a walkthrough via the link in the post.',
        hashtags: () => ['#BusinessStrategy', '#LeadershipExcellence', '#OperationalGrowth', '#B2BInsights'],
      },
      {
        headline: (t) => `Why Modern Organizations are Prioritizing ${t}`,
        body: (t) => [
          `Efficiency is not about doing more things poorly—it is about directing focused resources toward high-leverage initiatives. By addressing core bottlenecks through ${t}, teams reclaim vital productive bandwidth.`,
          `Organizations adopting this framework report marked improvements in cycle velocity and team satisfaction within the first quarter of deployment.`,
        ],
        callToAction: () => 'How is your team modernizing this quarter? Share your perspective in the comments.',
        hashtags: () => ['#FutureOfWork', '#ProductivitySystems', '#OperationalExcellence'],
      },
    ],
    Creative: [
      {
        headline: (t) => `Reimagining the Everyday: A Fresh Angle on ${t}`,
        body: (t) => [
          `What happens when intuition meets intentional design? You get something that defies conventional expectations and breathes life into mundane routines. Enter: ${t}.`,
          `From subtle textures to bold, uncompromising character, it is crafted for those who value originality over carbon copies. Because great stories are not found in the middle of the road.`,
        ],
        callToAction: () => 'Step inside our creative universe and explore the visual story behind the launch.',
        hashtags: () => ['#DesignMatters', '#CreativeMinds', '#ArtisanalTouch', '#VisualStorytelling'],
      },
      {
        headline: (t) => `Beyond the Canvas: The Untold Story Behind ${t}`,
        body: (t) => [
          `Every breakthrough begins with a single provocative question: What if we reimagined this from the ground up?`,
          `${t} was not built to blend in with background noise. It was shaped to make a statement, stir curiosity, and inspire your next bold chapter.`,
        ],
        callToAction: () => 'Discover the inspiration series and see how creative vision turns into reality.',
        hashtags: () => ['#InnovationInAction', '#BoldCreativity', '#ThoughtfulDesign'],
      },
    ],
    Persuasive: [
      {
        headline: (t) => `Stop Settling for Average: Why ${t} is Your Next Game-Changer`,
        body: (t) => [
          `If you have been searching for a solution that actually delivers on its promises without the usual compromises, this is your turning point. ${t} gives you the unfair advantage you have been waiting for.`,
          `Here is why our early adopters will never go back:`,
          `1. Proven consistency: Backed by rigorous attention to detail.`,
          `2. Instant relief: Cuts wasted hours and frustration from day one.`,
          `3. Enduring quality: Built to withstand high-demand workflows.`,
        ],
        callToAction: () => 'Claim your introductory access today before our limited batch closes.',
        hashtags: () => ['#GameChanger', '#SmartInvestment', '#ElevateYourGame', '#ResultsDriven'],
      },
      {
        headline: (t) => `The Definitive Upgrade: Everything You Need to Know About ${t}`,
        body: (t) => [
          `You have spent enough time wrestling with subpar workarounds. It is time for a tool engineered specifically to solve your core challenges without friction.`,
          `Thousands of creators and businesses have already simplified their day with ${t}. Will you stay on the sidelines or take the leap?`,
        ],
        callToAction: () => 'Click through now to secure your access and unlock exclusive launch benefits.',
        hashtags: () => ['#GrowthMindset', '#HighPerformance', '#UnlockPotential'],
      },
    ],
  },

  'ad-copy': {
    Friendly: [
      {
        headline: (t) => `Meet Your New Favorite Thing: ${t}`,
        body: (t) => [
          `Looking for a better way to tackle your day? We designed ${t} to feel like a breath of fresh air. Simple, delightful, and made just for people who love quality.`,
          `Join hundreds of happy customers who made the switch this month. Zero risk, 100% satisfaction guaranteed.`,
        ],
        callToAction: () => 'Shop Now & Get 15% Off Your First Order',
        keyHighlights: () => ['30-Day Happiness Guarantee', 'Eco-Conscious Packaging', 'Free Standard Shipping'],
      },
      {
        headline: (t) => `Finally, ${t} Made Simple and Fun`,
        body: (t) => [
          `Say goodbye to overwhelming choices and confusing steps. With ${t}, you get straight to the good stuff without any of the stress.`,
        ],
        callToAction: () => 'Try It Today — Friendly Support Included',
        keyHighlights: () => ['Quick Setup', 'No Hidden Fees', '5-Star Loved'],
      },
    ],
    Professional: [
      {
        headline: (t) => `Enterprise-Grade Reliability: Accelerate Growth with ${t}`,
        body: (t) => [
          `Modern market demands leave zero margin for unforced errors. ${t} delivers institutional rigor, streamlined operational velocity, and audit-ready precision tailored to your industry standards.`,
          `Designed to scale seamlessly from boutique teams to enterprise environments with complete data confidence.`,
        ],
        callToAction: () => 'Schedule an Executive Briefing & Product Tour',
        keyHighlights: () => ['99.9% Operational Reliability', 'SOC2 Certified Protocols', 'Dedicated Technical Account Manager'],
      },
      {
        headline: (t) => `Streamline Your Critical Operations with ${t}`,
        body: (t) => [
          `Eliminate fragmented point solutions and consolidate your stack. ${t} integrates cleanly with your current toolchain to minimize friction and boost measurable throughput.`,
        ],
        callToAction: () => 'Request Tailored Enterprise Pricing',
        keyHighlights: () => ['Seamless API Integration', 'Role-Based Access Control', 'Volume SLA Guarantee'],
      },
    ],
    Creative: [
      {
        headline: (t) => `Dare to Stand Out: Rediscover ${t}`,
        body: (t) => [
          `Cookie-cutter solutions belong to the past. ${t} was created for the dreamers, the craftspeople, and the pioneers who insist that every single output reflect authentic excellence.`,
          `Step away from the ordinary and create work that commands attention.`,
        ],
        callToAction: () => 'Experience the Difference — View Lookbook',
        keyHighlights: () => ['Bespoke Craftsmanship', 'Limited Edition Runs', 'Unconventional Design'],
      },
      {
        headline: (t) => `Not Just Another Tool: An Invitation to Create ${t}`,
        body: (t) => [
          `When functionality meets exquisite aesthetics, work stops feeling like an obligation. Discover a medium as ambitious as your vision.`,
        ],
        callToAction: () => 'Explore the Showcase Today',
        keyHighlights: () => ['Award-Winning Aesthetic', 'Designer-Approved', 'Pure Creative Liberty'],
      },
    ],
    Persuasive: [
      {
        headline: (t) => `Why Pay More for Inferior Results? Switch to ${t} Today`,
        body: (t) => [
          `Every hour you spend waiting on clunky old systems is money left on the table. With ${t}, you get faster turnaround, superior output, and dependable consistency right out of the gate.`,
          `Try it risk-free today and discover why switching is the smartest business decision you will make this quarter.`,
        ],
        callToAction: () => 'Claim Your Special Launch Offer (Ends Sunday)',
        keyHighlights: () => ['Instant Activation', 'Money-Back Guarantee', 'Zero Long-Term Lock-in'],
      },
      {
        headline: (t) => `The Proven Shortcut to Mastering ${t}`,
        body: (t) => [
          `Don't waste another week guessing what works. Join the top 5% of performers who rely on ${t} to outpace competitors and win back their freedom.`,
        ],
        callToAction: () => 'Unlock Immediate Access Now',
        keyHighlights: () => ['Over 10,000+ Hours Saved', 'Instant ROI', 'Cancel Anytime with One Click'],
      },
    ],
  },

  'product-description': {
    Friendly: [
      {
        headline: (t) => `The Ultimate Companion: ${t}`,
        body: (t) => [
          `Say hello to ${t}—the thoughtful, beautifully engineered essential you didn't know you were missing. From the moment you unbox it, you will notice the tactile textures, balanced weight, and effortless charm designed to brighten your everyday routine.`,
          `Whether you are treating yourself or gifting someone you love, it brings a touch of everyday magic to every single use.`,
        ],
        callToAction: () => 'Add to Bag — Ships in 24 Hours',
        keyHighlights: (t) => [
          `Signature ergonomics tailored for ${t}`,
          'Durable, sustainable materials made to last',
          'Effortless maintenance and intuitive setup',
          'Included carrying case & quick start guide',
        ],
      },
      {
        headline: (t) => `Everyday Comfort Meets ${t}`,
        body: (t) => [
          `We believe great products should bring a smile to your face without a steep learning curve. ${t} blends modern aesthetics with warm, reliable utility.`,
        ],
        callToAction: () => 'Select Your Style & Order Now',
        keyHighlights: () => ['Featherlight design', 'Scratch-resistant satin finish', 'Thoughtful gift-ready packaging'],
      },
    ],
    Professional: [
      {
        headline: (t) => `Architectural Precision & High-Yield Performance: ${t}`,
        body: (t) => [
          `Engineered for demanding professional environments, ${t} sets the benchmark in material integrity, thermal stability, and operational efficiency. Every component is CNC-machined to sub-millimeter tolerances, ensuring zero variance under heavy commercial usage.`,
          `Designed to fulfill rigorous compliance standards while significantly lowering total cost of ownership across multi-year lifecycles.`,
        ],
        callToAction: () => 'Download Technical Specifications & Spec Sheet',
        keyHighlights: (t) => [
          `Industrial-grade composite housing for ${t}`,
          'Thermal-dissipating internal architecture',
          'Full backward compatibility with legacy tooling',
          'Complies with CE, FCC, and RoHS environmental directives',
        ],
      },
      {
        headline: (t) => `Specification Overview: ${t} Series Pro`,
        body: (t) => [
          `The ${t} Series Pro is designed specifically for technical operators seeking predictable output under strict deadlines. Its modular construction allows rapid servicing and minimal downtime.`,
        ],
        callToAction: () => 'Request Formal Quotation / RFQ',
        keyHighlights: () => ['Reinforced alloy frame', 'Precision-calibrated sensors', 'Comprehensive 3-year commercial warranty'],
      },
    ],
    Creative: [
      {
        headline: (t) => `Sculpted for Visionaries: The Story of ${t}`,
        body: (t) => [
          `More than an object, ${t} is a tribute to the intersection of geometry, light, and tactile emotion. Stripped of superficial ornamentation, its silhouette celebrates pure, purposeful form that elevates any space it inhabits.`,
          `Hand-finished by master craftspeople in small artisanal batches, each piece carries an unmistakable fingerprint of authentic creative devotion.`,
        ],
        callToAction: () => 'Acquire from the Curated Edition',
        keyHighlights: (t) => [
          `Bespoke silhouette inspired by modernist ${t}`,
          'Tactile matte ceramic touchpoints',
          'Individually numbered artisan edition',
          'Eco-sourced heritage materials',
        ],
      },
      {
        headline: (t) => `Tactile Harmony: Experiencing ${t}`,
        body: (t) => [
          `Notice how the surface reflects ambient room light. Feel the smooth, unyielding contour in your palm. ${t} is not designed to be hidden away—it is an artful focal point.`,
        ],
        callToAction: () => 'Explore the Editorial Gallery',
        keyHighlights: () => ['Custom-cast contours', 'Subtle acoustic resonance', 'Archival preservation grade'],
      },
    ],
    Persuasive: [
      {
        headline: (t) => `Why Top Performers Are Upgrading to ${t}`,
        body: (t) => [
          `Stop settling for flimsy alternatives that wear out after a few months. ${t} is built with aircraft-grade durability and intelligent ergonomics that solve your biggest daily frustrations instantly.`,
          `Once you experience the difference first-hand, you will wonder how you ever managed without it. Backed by our ironclad 100% money-back guarantee.`,
        ],
        callToAction: () => 'Order Today & Lock In Limited Stock Pricing',
        keyHighlights: (t) => [
          `Up to 3x longer operational lifespan than standard ${t}`,
          'Instant out-of-the-box readiness with zero assembly',
          'Backed by over 4,800 verified 5-star customer ratings',
          'Hassle-free 60-day return policy',
        ],
      },
      {
        headline: (t) => `The Last ${t} You Will Ever Need to Buy`,
        body: (t) => [
          `Tired of replacements and endless repairs? We engineered ${t} to outlast every competitor in its class. Heavy-duty reliability, effortless handling, and backed by a lifetime guarantee.`,
        ],
        callToAction: () => 'Claim Yours Now — Limited Inventory Remaining',
        keyHighlights: () => ['Indestructible core construction', 'Instant performance gains', 'Complete zero-risk guarantee'],
      },
    ],
  },

  'writing-assistant': {
    Friendly: [
      {
        headline: (t) => `Polished & Personable: Improved Version of Your Text`,
        body: (t) => [
          `Original thought: "${t}"`,
          `Polished refinement:`,
          `"We are passionate about helping ambitious teams create captivating marketing content in half the time—without the usual headaches or guesswork. Our intuitive platform takes care of the heavy lifting so you can focus on building meaningful connections with your audience."`,
          `Why this works: It replaces casual slang with warm, confident language that highlights genuine customer benefits while keeping a welcoming, accessible tone.`,
        ],
        callToAction: () => 'Copy this version or toggle tones to see alternative directions.',
      },
      {
        headline: (t) => `Clear, Engaging & Conversational Rewrite`,
        body: (t) => [
          `Here is how to share "${t}" with warm approachability:`,
          `"Growing your brand should feel exciting, not overwhelming. We built a simpler, friendlier way to create top-notch marketing copy whenever inspiration strikes."`,
          `Key improvements: Shortened sentence structure, eliminated buzzwords, and positioned your reader as the hero.`,
        ],
        callToAction: () => 'Apply this copy directly into your email or landing page.',
      },
    ],
    Professional: [
      {
        headline: (t) => `Executive-Ready Revision: Precision & Impact`,
        body: (t) => [
          `Original draft: "${t}"`,
          `Executive revision:`,
          `"Our enterprise marketing platform streamlines multi-channel content workflows, enabling organizations to scale campaign execution velocity by 40% while ensuring strict brand fidelity across every distribution tier."`,
          `Strategic refinement: Elevates conversational remarks into boardroom-ready articulation with defined business outcomes and institutional credibility.`,
        ],
        callToAction: () => 'Export executive draft to your proposal or presentation.',
      },
      {
        headline: (t) => `Crisp, Authoritative Corporate Refinement`,
        body: (t) => [
          `Original input: "${t}"`,
          `Refined version:`,
          `"By centralizing marketing asset creation into a unified, high-throughput workspace, we eliminate workflow bottlenecks and empower teams to deliver high-converting campaigns with complete operational consistency."`,
          `Syntactical audit: Removed passive phrasing, strengthened core verbs, and focused directly on enterprise value propositions.`,
        ],
        callToAction: () => 'Use this version for B2B whitepapers, pitches, or reports.',
      },
    ],
    Creative: [
      {
        headline: (t) => `Poetic & Evocative Reimagining`,
        body: (t) => [
          `Starting idea: "${t}"`,
          `Creative metamorphosis:`,
          `"Marketing shouldn't feel like wrestling with machine gears. We forge intuitive digital instruments that translate raw instinct into resonant storytelling—turning faint sparks into unforgettable cultural moments."`,
          `Artistic rhythm: Replaces dry utilitarian mechanics with sensory metaphors and compelling emotional cadence.`,
        ],
        callToAction: () => 'Infuse this lyrical energy into your brand manifesto or video script.',
      },
      {
        headline: (t) => `Bold, Unconventional Voice Shift`,
        body: (t) => [
          `Raw prompt: "${t}"`,
          `Bold manifestation:`,
          `"Discard the playbook of tedious formulas. We built the creative catalyst for innovators who demand their words cut through the static like lightning across an open sky."`,
          `Rhetorical style: High contrast, memorable cadence, and evocative imagery designed to linger in the reader's memory.`,
        ],
        callToAction: () => 'Copy to clipboard for your social teaser or brand launch.',
      },
    ],
    Persuasive: [
      {
        headline: (t) => `High-Converting Direct Response Refinement`,
        body: (t) => [
          `Initial text: "${t}"`,
          `Conversion-optimized copy:`,
          `"Struggling to churn out marketing content that actually drives revenue? Discover the smarter, frictionless system that eliminates creative fatigue and turns clicks into loyal, paying customers from day one."`,
          `Persuasion mechanics: Opens with acute pain-point validation, introduces the proprietary vehicle, and provides a compelling risk-free benefit.`,
        ],
        callToAction: () => 'Insert into your primary sales page or email campaign header.',
      },
      {
        headline: (t) => `Urgent & Action-Oriented Rewrite`,
        body: (t) => [
          `Original input: "${t}"`,
          `Direct-response variant:`,
          `"Stop burning valuable hours on copy that gets ignored. Equip your business with the proven marketing engine designed to produce winning campaigns on demand—with zero guesswork."`,
          `Conversion levers: Strong loss-aversion opening, clear solution, and definitive call to immediate action.`,
        ],
        callToAction: () => 'Deploy as your main hero subheadline or paid ad hook.',
      },
    ],
  },
};

/**
 * Deterministic helper to pick and tailor sample responses offline
 */
export function generateSampleResponse(
  toolId: string,
  topic: string,
  tone: ToneType = 'Friendly',
  platform: PlatformType = 'General',
  variationIndex = 0
): GeneratedResult {
  const cleanTopic = topic.trim() || 'Modern Marketing Assistant';
  const toolResponses = SAMPLE_RESPONSES[toolId] || SAMPLE_RESPONSES['content-generator'];
  const toneTemplates = toolResponses[tone] || toolResponses['Friendly'];
  const template = toneTemplates[variationIndex % toneTemplates.length];

  let headline = template.headline(cleanTopic);
  const body = template.body(cleanTopic);
  let callToAction = template.callToAction(cleanTopic);
  let hashtags = template.hashtags ? template.hashtags(cleanTopic) : undefined;
  const keyHighlights = template.keyHighlights ? template.keyHighlights(cleanTopic) : undefined;

  // Platform specific tailoring
  if (platform === 'LinkedIn') {
    headline = `💼 ${headline.replace(/[✨☕]/g, '').trim()}`;
    if (!hashtags) {
      hashtags = ['#MarketingStrategy', '#GrowthMindset', '#Productivity'];
    }
  } else if (platform === 'Instagram') {
    if (!hashtags) {
      hashtags = ['#GrowthPilot', '#ContentCreator', '#MarketingTips', '#CreateDaily'];
    }
  } else if (platform === 'Website') {
    callToAction = `👉 Learn more about how ${cleanTopic} empowers your daily workflow today.`;
  }

  return {
    headline,
    body,
    callToAction,
    hashtags,
    keyHighlights,
  };
}
