<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Ignite Platform - Interactive Business Plan Builder

> Transform your business plan from a static document into a living, adaptive strategic execution system.

**Ignite** is an AI-powered business planning platform that combines conversational AI, real-time analytics, and strategic intelligence to help founders and executives build, execute, and adapt their business strategies.

[![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)](https://github.com/bmmscap/bplan2025)
[![License](https://img.shields.io/badge/license-Proprietary-red.svg)](LICENSE)
[![Status](https://img.shields.io/badge/status-Active%20Development-green.svg)]()

---

## Overview

Ignite is built as a **Compound Business Ecosystem** that goes far beyond traditional business planning tools. It's designed to:

- **Create living business plans** that evolve with your business in real-time
- **Provide AI-powered strategic guidance** through conversational interfaces
- **Track execution** against your plan with intelligent metrics
- **Generate strategic assets** automatically (presentations, reports, narratives)
- **Connect your network** to identify high-value opportunities
- **Measure content ROI** through the Content & Authority Engine

### Core Differentiators

| Feature | Description |
|---------|-------------|
| **Conversational AI** | Talk to your plan instead of filling out forms |
| **Voice-First Interface** | Use voice commands for drafting and analysis |
| **Living Document** | Your plan evolves in real-time with your business |
| **Real-Time Adaptive Presentations** | Presentations that "read the room" and adjust dynamically |
| **Strategic Intelligence Engine** | Proactively scans 10,000+ data sources for opportunities and threats |
| **Investor Matching Network** | Connects founders with the right investors |
| **Content & Authority Engine** | Measures the ROI of your thought leadership |

---

## Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Gemini API Key** (for AI features)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/bmmscap/bplan2025.git
   cd bplan2025
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   # Copy the example env file
   cp .env.example .env.local

   # Edit .env.local and add your Gemini API key
   # GEMINI_API_KEY=your_api_key_here
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to `http://localhost:5173`

### View in AI Studio

View the live app in AI Studio: https://ai.studio/apps/drive/161Y7Sy22JgpPVJ7ClRuJOPLZvJkHmhI_

---

## Key Features

### 1. Intelligent Business Plan Builder
- **8 comprehensive sections**: Executive, Opportunity, Solution, Business Model, GTM, Financial, Roadmap, Risks
- **AI-powered content generation**: Get help drafting every section
- **Real-time collaboration**: Work with your team simultaneously
- **Export to PDF/PPTX**: Professional presentations and documents

### 2. Strategic Alignment Score (SAS)
A 0-100% dashboard metric that measures:
- **Plan Completeness**: How thorough is your plan?
- **Financial Viability**: Are your metrics sound (LTV > CAC, positive cash flow)?
- **Execution Tracking**: Are you hitting your milestones?

### 3. AI Strategist Guide
Your personal AI assistant that:
- Guides you through strategic thinking
- Drafts content based on your input
- Provides analysis and recommendations
- Answers questions about your plan

### 4. Financial Modeling Tools
Build comprehensive financial projections:
- CAC/LTV analysis
- MRR/ARR projections
- Churn modeling
- Cash flow forecasting
- Revenue breakdown charts

### 5. Content & Authority Engine
Measure the ROI of your thought leadership:
- **Influence Velocity Score**: How effectively is your content creating authority?
- **Consumption metrics**: Reach and visibility
- **Engagement metrics**: Resonance and interaction
- **Authority metrics**: Brand power and reputation
- **Conversion metrics**: Pipeline and revenue impact

---

## Documentation

Comprehensive documentation is available in the `/docs` folder:

| Document | Description |
|----------|-------------|
| **[FEATURES.md](./docs/FEATURES.md)** | Complete list of all platform features and capabilities |
| **[ARCHITECTURE.md](./docs/ARCHITECTURE.md)** | Technical architecture and system design |
| **[USER-STORIES-SPRINT-2.md](./docs/USER-STORIES-SPRINT-2.md)** | User stories for Sprint 2 development |
| **[PRODUCT-ROADMAP.md](./docs/PRODUCT-ROADMAP.md)** | Product development roadmap and timeline |

---

## Technology Stack

### Frontend
- **React 19** - Modern UI library
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling

### AI & Machine Learning
- **Google GenAI SDK** - AI-powered content generation
- **Natural Language Processing** - Conversational interfaces
- **Custom ML Models** - Strategic intelligence and analysis

### Integrations (Planned)
- LinkedIn API
- CRM systems (Salesforce, HubSpot)
- Analytics platforms (Google Analytics, Mixpanel)
- Communication tools (Slack, Microsoft Teams)

---

## Project Structure

```
bplan2025/
├── src/
│   ├── App.tsx                    # Main application component
│   ├── index.tsx                  # Entry point
│   ├── types.ts                   # TypeScript interfaces
│   ├── components/                # Reusable components
│   │   ├── EditableText.tsx
│   │   ├── RevenueBreakdownChart.tsx
│   │   └── icons.tsx
├── docs/                          # Documentation
│   ├── FEATURES.md
│   ├── ARCHITECTURE.md
│   └── ...
├── public/                        # Static assets
├── vite.config.ts                 # Vite configuration
├── tsconfig.json                  # TypeScript configuration
├── package.json                   # Dependencies
└── README.md                      # This file
```

---

## Development

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run type-check` | Run TypeScript compiler check |

### Development Workflow

1. Create a feature branch: `git checkout -b feature/your-feature-name`
2. Make your changes
3. Test locally: `npm run dev`
4. Build and test: `npm run build && npm run preview`
5. Commit your changes: `git commit -m "Description of changes"`
6. Push to remote: `git push origin feature/your-feature-name`
7. Create a pull request

---

## Roadmap

### Q1 2025 - MVP (Current)
- ✅ Core business plan builder
- ✅ AI-powered content generation
- ✅ PDF/PPTX export
- ✅ Revenue breakdown charts

### Q2 2025 - Collaboration & Intelligence
- 🚧 AI Strategist Guide
- 🚧 Financial modeling tools
- 🚧 Multi-user collaboration
- 🚧 Strategic Alignment Score

### Q3 2025 - Network & Authority
- 📋 Content & Authority Engine
- 📋 LinkedIn integration
- 📋 Influence Velocity Score
- 📋 Advanced analytics

### Q4 2025 - Scale & Intelligence
- 📋 Strategic Intelligence Engine
- 📋 Investor Matching Network
- 📋 Mobile applications
- 📋 Enterprise features

**Legend:**
- ✅ Complete
- 🚧 In Development
- 📋 Planned

---

## The BMMS Capital Ecosystem

Ignite is part of the larger **BMMS Capital LLC** ecosystem, which provides:

- **Consulting & Advisory** - Media strategy, digital transformation, CAIO strategy
- **Technology** - AI content systems, automation workflows
- **Content Production** - Premium video, branded content, investor-grade production
- **Executive Training** - Leadership certification, AI integration curriculum
- **Market Intelligence** - Custom research briefings, institutional insights
- **Live Events** - Executive summits, seven-figure event franchises

Learn more at: [docs/FEATURES.md](./docs/FEATURES.md)

---

## Contributing

This is a proprietary project developed by BMMS Capital LLC. For contribution guidelines, please contact the project maintainers.

---

## Support

For questions, issues, or feature requests:

- **Documentation**: See the `/docs` folder
- **Issues**: Create a GitHub issue
- **Email**: contact@bmmscapital.com

---

## License

Copyright © 2025 BMMS Capital LLC. All rights reserved.

This is proprietary software. Unauthorized copying, distribution, or use is strictly prohibited.

---

## Acknowledgments

Built with:
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Google GenAI](https://ai.google.dev/)

---

**Version:** 2.0.0
**Last Updated:** 2025-11-03
**Maintained By:** BMMS Capital LLC
