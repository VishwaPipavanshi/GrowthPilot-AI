# GrowthPilot AI 🚀

**An AI-inspired marketing content platform designed to help startups, creators, small businesses, and marketing teams create engaging content more efficiently.**

GrowthPilot AI is a modern, responsive SaaS-style frontend website that showcases an intuitive marketing content creation experience. It provides a collection of writing tools through a clean interface, interactive demonstrations, and a polished user experience.

The project is built using React, TypeScript, and Vite, with smooth animations and a modern dark-themed design.

> **Project status:** Frontend demonstration project. The writing studio uses predefined sample responses in the browser and is not connected to a live AI model or backend service.

---

## ✨ Features

### 1. Marketing Content Tools

Explore a collection of marketing-focused writing tools:

- **AI Content Generator** – Create sample content for topics, campaigns, and social media.
- **AI Ad Copywriter** – Generate example advertising headlines and promotional copy.
- **Product Description Generator** – Create sample product descriptions for marketing purposes.
- **AI Writing Assistant** – Explore writing assistance for improving and refining content.

### 2. Interactive Writing Studio

- User-friendly content input interface.
- Multiple writing tool selections.
- Tone and content configuration options.
- Browser-based sample content generation.
- Copy generated content to the clipboard.
- Generate alternative sample responses.

### 3. Modern Landing Page

- Responsive navigation.
- Engaging hero section.
- Audience-focused content.
- Features and benefits section.
- Interactive How It Works workflow.
- Product demonstration section.
- Pricing plans.
- Contact form.
- Professional footer.

### 4. UI and User Experience

- Modern dark SaaS design.
- Purple, pink, and orange accent colors.
- Glassmorphism-inspired components.
- Smooth Framer Motion animations.
- Interactive cards and buttons.
- Responsive layouts for desktop, tablet, and mobile.
- Consistent typography and visual hierarchy.

### 5. Contact and Pricing

- Client-side contact form validation.
- Local confirmation message after form submission.
- Illustrative Free and Pro pricing plans.
- Responsive pricing cards.

---

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| React | Component-based user interface |
| TypeScript | Type safety and maintainable code |
| Vite | Development server and build tooling |
| Tailwind CSS / Utility Classes | Responsive styling and layout |
| Framer Motion | Animations and interactions |
| Lucide React | Icons |
| HTML5 | Semantic page structure |
| CSS3 | Custom styling and visual effects |
| JavaScript (ES6+) | Frontend functionality |

---

## 📁 Project Structure

The project follows a component-based React architecture.

```text
GrowthPilot-AI/
│
├── public/
│   └── assets/
│
├── src/
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── SectionHeading.tsx
│   │   └── ...
│   │
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── TrustStrip.tsx
│   │   ├── Features.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── AIDemo.tsx
│   │   ├── Pricing.tsx
│   │   ├── Contact.tsx
│   │   └── ...
│   │
│   ├── data/
│   │   └── sampleResponses.ts
│   │
│   ├── hooks/
│   │   └── useActiveSection.ts
│   │
│   ├── utils/
│   │   ├── motion.ts
│   │   └── validation.ts
│   │
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
│
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

*Note: This structure illustrates the main project organization. Additional files and components may exist in the repository.*

---

## ⚙️ Getting Started

Follow these instructions to run GrowthPilot AI locally.

### Prerequisites

Install the following before starting:

- [Node.js](https://nodejs.org/) — Version 20.19+ or 22.12+
- npm — Included with Node.js
- Git — Recommended for version control

Verify your installation:

```bash
node -v
npm -v
```


## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the local development server |
| `npm run lint` | Runs the project's TypeScript check |
| `npm run build` | Creates the optimized production build |
| `npm run preview` | Serves the production build locally |
| `npm run clean` | Removes the generated `dist/` directory |

---

## 📱 Responsive Design

GrowthPilot AI is designed to provide a consistent experience across different screen sizes.

| Device | Design approach |
|---|---|
| Desktop | Full-width layouts, interactive cards, and rich visual effects |
| Tablet | Adapted grids, spacing, and component dimensions |
| Mobile | Compact layouts, readable typography, touch-friendly controls, and optimized navigation |

The interface uses responsive layouts to maintain usability across modern desktop, tablet, and mobile browsers.

---

## 🌐 Deployment

GrowthPilot AI is a static frontend application built with Vite. It can be deployed using platforms such as:

- [Vercel](https://vercel.com/)
  
### Deploy using Vercel
[Vercel](https://growthpilotai-nine.vercel.app/)
## 🔒 Demo Functionality and Privacy

GrowthPilot AI currently operates entirely on the frontend.

Please note:

- **Writing Studio:** Generates predefined sample content locally in the browser. It does not connect to OpenAI or another live AI provider.
- **Contact Form:** Performs client-side validation and displays a local confirmation message. It does not send or store submissions.
- **Pricing Plans:** Pricing and subscription information are illustrative. No real payment processing is implemented.
- **User Accounts:** Authentication and account management are not implemented.
- **Backend:** The project does not currently require a backend or database.
- **API Keys:** No API keys or private credentials are required.

All frontend environment variables exposed through Vite should be treated as public. Never store private credentials in client-side code.

---

## 🔮 Future Improvements

Potential improvements for future versions include:

- Integration with a live generative AI API.
- Backend services for content generation.
- User authentication and account management.
- Saved content and generation history.
- Personalized writing preferences.
- Export generated content into different formats.
- Cloud-based storage.
- Real contact form submission.
- Functional subscription and payment integration.
- Analytics dashboard for content performance.

These are planned possibilities, not features currently implemented.

---

## 👨‍💻 Development Notes

When contributing to the project:

1. Follow the existing React component structure.
2. Use TypeScript for new components and utilities.
3. Maintain consistent styling and responsive behavior.
4. Reuse existing animation utilities where possible.
5. Test changes across desktop, tablet, and mobile layouts.
6. Run the build and TypeScript checks before submitting changes.

---

## 📄 License

This project is developed as a frontend portfolio and internship assignment project.

If you intend to distribute or reuse the source code, add an appropriate license file to the repository.

---

**Built with React, TypeScript, and Vite.**

*GrowthPilot AI — Turn ideas into impactful marketing content.*
