export interface FAQItemData {
  id: string;
  question: string;
  answer: string;
}

export const FAQS: FAQItemData[] = [
  {
    id: 'faq-1',
    question: 'What is GrowthPilot AI?',
    answer: 'GrowthPilot AI is a conceptual marketing assistant that demonstrates tools for creating marketing content, ad copy, product descriptions and improved writing.',
  },
  {
    id: 'faq-2',
    question: 'Does GrowthPilot AI require technical knowledge?',
    answer: 'No. The product concept is designed around simple input controls and an easy-to-use writing workflow.',
  },
  {
    id: 'faq-3',
    question: 'What tools are included?',
    answer: 'The demonstration includes an AI Content Generator, AI Ad Copywriter, Product Description Generator and AI Writing Assistant.',
  },
  {
    id: 'faq-4',
    question: 'Does the demo connect to a real AI model?',
    answer: 'No. This portfolio demonstration uses predefined local sample responses and does not connect to an external AI service.',
  },
  {
    id: 'faq-5',
    question: 'What is included in the Free plan?',
    answer: 'The proposed Free plan includes access to the interactive sample demo and basic product demonstrations.',
  },
  {
    id: 'faq-6',
    question: 'How can I request a product demo?',
    answer: 'Visitors can use the contact section and submit the demo-request form.',
  },
];
