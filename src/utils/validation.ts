export interface ContactFormData {
  fullName: string;
  email: string;
  companyName: string;
  businessType: string;
  interestedIn: string;
  message: string;
}

export interface ContactFormErrors {
  fullName?: string;
  email?: string;
  companyName?: string;
  businessType?: string;
  interestedIn?: string;
  message?: string;
}

export const BUSINESS_TYPES = [
  'Startup',
  'Small Business',
  'Freelancer',
  'Content Creator',
  'Marketing Agency',
  'Other',
];

export const INTEREST_OPTIONS = [
  'AI Content Generator',
  'AI Ad Copywriter',
  'Product Description Generator',
  'AI Writing Assistant',
  'Product Demo',
];

export function validateContactForm(data: ContactFormData): {
  isValid: boolean;
  errors: ContactFormErrors;
} {
  const errors: ContactFormErrors = {};

  // Full Name validation
  if (!data.fullName.trim()) {
    errors.fullName = 'Full Name is required.';
  } else if (data.fullName.trim().length < 2) {
    errors.fullName = 'Name must be at least 2 characters.';
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email.trim()) {
    errors.email = 'Email address is required.';
  } else if (!emailRegex.test(data.email.trim())) {
    errors.email = 'Please enter a valid email address (e.g. name@company.com).';
  }

  // Business Type validation
  if (!data.businessType.trim()) {
    errors.businessType = 'Please select your business type.';
  }

  // Interested In validation
  if (!data.interestedIn.trim()) {
    errors.interestedIn = 'Please select a tool or topic of interest.';
  }

  // Message validation
  if (!data.message.trim()) {
    errors.message = 'Message is required.';
  } else if (data.message.trim().length < 10) {
    errors.message = `Message must be at least 10 characters (currently ${data.message.trim().length}).`;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
