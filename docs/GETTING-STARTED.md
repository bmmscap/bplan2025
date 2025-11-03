# Getting Started - Developer Guide

> Complete guide for developers joining the Ignite platform project.

---

## Table of Contents

1. [Welcome](#welcome)
2. [Prerequisites](#prerequisites)
3. [Environment Setup](#environment-setup)
4. [Project Structure](#project-structure)
5. [Development Workflow](#development-workflow)
6. [Code Standards](#code-standards)
7. [Common Tasks](#common-tasks)
8. [Troubleshooting](#troubleshooting)
9. [Resources](#resources)

---

## Welcome

Welcome to the Ignite platform development team! This guide will help you get up and running quickly.

### What You'll Build

Ignite is an AI-powered business planning platform that transforms static business plans into living strategic execution systems. As a developer, you'll work on:

- **React frontend** with TypeScript and Tailwind CSS
- **AI integration** using Google Gemini AI
- **Real-time collaboration** features
- **Data visualization** and interactive charts
- **Export systems** (PDF, PPTX)

### Team Structure

- **Frontend Team:** React, TypeScript, UI/UX implementation
- **Backend Team:** API, database, integrations (planned)
- **AI/ML Team:** AI models, prompt engineering, intelligence features
- **Product Team:** Product management, design, user research

---

## Prerequisites

### Required Software

Install these tools before starting:

| Tool | Version | Purpose | Download |
|------|---------|---------|----------|
| **Node.js** | 18+ | JavaScript runtime | [nodejs.org](https://nodejs.org) |
| **npm** | 9+ | Package manager | Included with Node.js |
| **Git** | 2.40+ | Version control | [git-scm.com](https://git-scm.com) |
| **VS Code** | Latest | Code editor (recommended) | [code.visualstudio.com](https://code.visualstudio.com) |

### Recommended VS Code Extensions

Install these extensions for the best development experience:

```bash
# Essential extensions
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
code --install-extension bradlc.vscode-tailwindcss
code --install-extension ms-vscode.vscode-typescript-next

# Nice to have
code --install-extension formulahendry.auto-rename-tag
code --install-extension christian-kohler.path-intellisense
code --install-extension eamodio.gitlens
```

### Accounts & Access

You'll need accounts for:

1. **GitHub** - Source code repository
   - Ask your manager to add you to the `bmmscap` organization

2. **Google Cloud Platform** - AI API access
   - You'll receive a shared API key for development
   - Production keys are managed by DevOps

3. **Slack** - Team communication
   - Join channels: `#ignite-dev`, `#ignite-product`, `#ignite-general`

---

## Environment Setup

### 1. Clone the Repository

```bash
# Clone via SSH (recommended)
git clone git@github.com:bmmscap/bplan2025.git
cd bplan2025

# OR clone via HTTPS
git clone https://github.com/bmmscap/bplan2025.git
cd bplan2025
```

### 2. Install Dependencies

```bash
npm install
```

This will install all packages defined in `package.json`. Initial install takes ~2-3 minutes.

### 3. Environment Variables

Create a `.env.local` file in the project root:

```bash
# Copy the example file
cp .env.example .env.local
```

Edit `.env.local` and add your configuration:

```env
# Google Gemini AI API Key
GEMINI_API_KEY=your_api_key_here

# Optional: Development settings
VITE_API_URL=http://localhost:3000
VITE_ENV=development
```

**Getting your API key:**
1. Ask in `#ignite-dev` Slack channel for the development API key
2. Or create your own at [ai.google.dev](https://ai.google.dev)

⚠️ **Important:** Never commit `.env.local` to Git. It's in `.gitignore` by default.

### 4. Verify Installation

Run the development server:

```bash
npm run dev
```

You should see:

```
  VITE v5.0.0  ready in 324 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

Open http://localhost:5173 in your browser. You should see the Ignite platform homepage.

---

## Project Structure

### Directory Overview

```
bplan2025/
├── src/                        # Source code
│   ├── App.tsx                 # Main application component (8 sections)
│   ├── index.tsx               # Entry point
│   ├── types.ts                # TypeScript type definitions
│   ├── components/             # Reusable React components
│   │   ├── EditableText.tsx    # Inline text editing
│   │   ├── RevenueBreakdownChart.tsx
│   │   └── icons.tsx           # Icon system
│   ├── hooks/                  # Custom React hooks (to be added)
│   ├── services/               # API and external services (to be added)
│   ├── utils/                  # Utility functions (to be added)
│   └── styles/                 # Global styles (to be added)
├── public/                     # Static assets
├── docs/                       # Documentation
│   ├── FEATURES.md             # Feature list
│   ├── ARCHITECTURE.md         # Technical architecture
│   ├── USER-STORIES-SPRINT-2.md
│   ├── PRODUCT-ROADMAP.md
│   └── GETTING-STARTED.md      # This file
├── index.html                  # HTML template
├── vite.config.ts              # Vite configuration
├── tsconfig.json               # TypeScript configuration
├── package.json                # Dependencies and scripts
├── .env.local                  # Environment variables (not in Git)
├── .gitignore                  # Git ignore rules
└── README.md                   # Project overview
```

### Key Files Explained

#### `src/App.tsx` (Main Application)
The heart of the application. Contains:
- 8 business plan sections (Executive, Opportunity, Solution, etc.)
- State management for plan data
- AI integration logic
- Export functionality

**Size:** ~2000 lines (large, will be refactored in Sprint 2)

#### `src/types.ts` (Type Definitions)
All TypeScript interfaces and types:
```typescript
interface BusinessPlan {
  executive: ExecutiveSection;
  opportunity: OpportunitySection;
  solution: SolutionSection;
  business: BusinessSection;
  gtm: GTMSection;
  financial: FinancialSection;
  roadmap: RoadmapSection;
  risks: RisksSection;
}
```

#### `src/components/EditableText.tsx`
Reusable component for inline text editing with auto-save.

#### `vite.config.ts`
Build configuration. You rarely need to modify this.

#### `package.json`
Dependencies and npm scripts. Important scripts:
- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run preview` - Preview production build

---

## Development Workflow

### Branch Strategy

We use **Git Flow** with the following branches:

| Branch | Purpose | Can I commit directly? |
|--------|---------|----------------------|
| `main` | Production-ready code | ❌ No - PR only |
| `develop` | Integration branch | ❌ No - PR only |
| `feature/*` | New features | ✅ Yes |
| `bugfix/*` | Bug fixes | ✅ Yes |
| `hotfix/*` | Urgent production fixes | ✅ Yes |

### Creating a Feature

**Step 1: Create a feature branch**

```bash
# Make sure you're on develop and up to date
git checkout develop
git pull origin develop

# Create your feature branch
git checkout -b feature/ai-chat-interface
```

**Branch naming convention:**
- `feature/descriptive-name` - New features
- `bugfix/issue-123-description` - Bug fixes
- `hotfix/critical-issue` - Production hotfixes

**Step 2: Make your changes**

Edit code, add files, test locally.

**Step 3: Commit your changes**

```bash
# Stage your changes
git add .

# Commit with a descriptive message
git commit -m "feat: Add AI chat interface component

- Created ChatPanel component
- Integrated Google Gemini AI
- Added message history
- Implemented auto-scroll"
```

**Commit message format:**
```
<type>: <subject>

<body>

<footer>
```

**Types:**
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Formatting, missing semicolons, etc.
- `refactor:` - Code restructuring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

**Step 4: Push to GitHub**

```bash
git push origin feature/ai-chat-interface
```

**Step 5: Create a Pull Request**

1. Go to https://github.com/bmmscap/bplan2025
2. Click "Compare & pull request"
3. Fill out the PR template:
   - **Title:** Brief description
   - **Description:** What changed and why
   - **Testing:** How you tested it
   - **Screenshots:** If UI changes
4. Request reviewers
5. Wait for approval and CI checks

**Step 6: Merge**

After approval:
1. Squash and merge (preferred)
2. Delete the feature branch

---

## Code Standards

### TypeScript Guidelines

**✅ Do:**
```typescript
// Use interfaces for object shapes
interface User {
  id: string;
  name: string;
  email: string;
}

// Use type for unions and primitives
type Status = 'active' | 'inactive' | 'pending';

// Always type function parameters and returns
function getUserById(id: string): User | null {
  // ...
}

// Use const for variables that don't change
const MAX_RETRIES = 3;
```

**❌ Don't:**
```typescript
// Don't use `any`
function processData(data: any) { } // Bad

// Don't leave implicit returns untyped
function calculate(x: number) {  // Bad - what does it return?
  return x * 2;
}

// Don't use `var`
var count = 0; // Bad - use const or let
```

### React Best Practices

**✅ Do:**
```tsx
// Use functional components
function ChatMessage({ text, author }: ChatMessageProps) {
  return (
    <div className="message">
      <span className="author">{author}</span>
      <p>{text}</p>
    </div>
  );
}

// Use hooks for state and effects
function ChatPanel() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    // Load messages on mount
  }, []);

  return <div>{/* ... */}</div>;
}

// Extract reusable logic to custom hooks
function useMessages() {
  const [messages, setMessages] = useState<Message[]>([]);

  const addMessage = (message: Message) => {
    setMessages(prev => [...prev, message]);
  };

  return { messages, addMessage };
}
```

**❌ Don't:**
```tsx
// Don't use class components (for new code)
class ChatPanel extends React.Component { } // Bad

// Don't mutate state directly
messages.push(newMessage); // Bad
setMessages([...messages, newMessage]); // Good

// Don't define components inside components
function Parent() {
  function Child() { } // Bad - causes re-renders
  return <Child />;
}
```

### Tailwind CSS Guidelines

**✅ Do:**
```tsx
// Use Tailwind utility classes
<button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
  Click Me
</button>

// Use responsive modifiers
<div className="w-full md:w-1/2 lg:w-1/3">
  Content
</div>

// Group related utilities
<div className="
  flex items-center justify-between
  px-6 py-4
  bg-white rounded-lg shadow-md
">
  Content
</div>
```

**❌ Don't:**
```tsx
// Don't use inline styles (unless dynamic)
<div style={{ padding: '16px' }}> // Bad - use Tailwind

// Don't create custom CSS unless absolutely necessary
<div className="my-custom-class"> // Bad - use Tailwind first
```

### File Organization

**Component file structure:**
```tsx
// 1. Imports
import React, { useState, useEffect } from 'react';
import { SomeService } from '../services/someService';

// 2. Types/Interfaces
interface ChatPanelProps {
  userId: string;
  onClose: () => void;
}

// 3. Component
export function ChatPanel({ userId, onClose }: ChatPanelProps) {
  // 3a. Hooks
  const [messages, setMessages] = useState<Message[]>([]);

  // 3b. Effects
  useEffect(() => {
    // ...
  }, []);

  // 3c. Event handlers
  const handleSendMessage = () => {
    // ...
  };

  // 3d. Render
  return (
    <div className="chat-panel">
      {/* ... */}
    </div>
  );
}

// 4. Sub-components (if small and only used here)
function ChatMessage({ text }: { text: string }) {
  return <div>{text}</div>;
}
```

---

## Common Tasks

### Add a New Component

```bash
# Create the component file
touch src/components/NewComponent.tsx
```

```tsx
// src/components/NewComponent.tsx
import React from 'react';

interface NewComponentProps {
  title: string;
}

export function NewComponent({ title }: NewComponentProps) {
  return (
    <div className="new-component">
      <h2>{title}</h2>
    </div>
  );
}
```

### Add a New Business Plan Section

1. **Update types** in `src/types.ts`:
```typescript
interface BusinessPlan {
  // ... existing sections
  newSection: NewSection;
}

interface NewSection {
  field1: string;
  field2: string;
}
```

2. **Update initial state** in `src/App.tsx`
3. **Add section UI** in `src/App.tsx`
4. **Add to export** logic

### Integrate a New API

1. **Create service file:**
```typescript
// src/services/apiService.ts
export class ApiService {
  private baseUrl = import.meta.env.VITE_API_URL;

  async fetchData() {
    const response = await fetch(`${this.baseUrl}/data`);
    return response.json();
  }
}

export const apiService = new ApiService();
```

2. **Use in component:**
```tsx
import { apiService } from '../services/apiService';

function MyComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    apiService.fetchData().then(setData);
  }, []);

  return <div>{/* render data */}</div>;
}
```

### Add Environment Variable

1. **Add to `.env.local`:**
```env
VITE_NEW_VARIABLE=value
```

2. **Access in code:**
```typescript
const value = import.meta.env.VITE_NEW_VARIABLE;
```

⚠️ **Important:** All Vite env vars must start with `VITE_`

### Run Tests (when implemented)

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

### Build for Production

```bash
# Create production build
npm run build

# Preview production build locally
npm run preview
```

Output will be in `dist/` directory.

---

## Troubleshooting

### Common Issues

#### "Module not found" error

**Problem:**
```
Error: Cannot find module './components/SomeComponent'
```

**Solution:**
1. Check the file path is correct
2. Check the file extension (`.tsx` vs `.ts`)
3. Restart the dev server: `Ctrl+C` then `npm run dev`

---

#### Tailwind classes not working

**Problem:**
Tailwind CSS classes don't apply styling.

**Solution:**
1. Verify Tailwind is in `index.html`:
```html
<script src="https://cdn.tailwindcss.com"></script>
```

2. Check class names are correct (no typos)
3. Clear browser cache and reload

---

#### "GEMINI_API_KEY is not defined"

**Problem:**
```
Error: GEMINI_API_KEY is not defined
```

**Solution:**
1. Ensure `.env.local` exists
2. Check the key is named exactly `GEMINI_API_KEY`
3. Restart dev server after adding env vars
4. Make sure you're using `import.meta.env.GEMINI_API_KEY` (Vite syntax)

---

#### Port 5173 already in use

**Problem:**
```
Port 5173 is in use
```

**Solution:**
```bash
# Option 1: Kill the process using the port
# On Mac/Linux:
lsof -ti:5173 | xargs kill -9

# On Windows:
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Option 2: Use a different port
npm run dev -- --port 5174
```

---

#### TypeScript errors in VS Code

**Problem:**
VS Code shows TypeScript errors that don't appear in terminal.

**Solution:**
1. Restart TypeScript server: `Cmd/Ctrl + Shift + P` → "TypeScript: Restart TS Server"
2. Update VS Code TypeScript: `Cmd/Ctrl + Shift + P` → "TypeScript: Select TypeScript Version"
3. Delete `node_modules` and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

---

#### Build fails with type errors

**Problem:**
Production build fails but dev server works.

**Solution:**
1. Run type check:
```bash
npx tsc --noEmit
```

2. Fix all type errors shown
3. Build again:
```bash
npm run build
```

---

### Getting Help

If you're stuck:

1. **Check documentation** - Read this guide and other docs in `/docs`
2. **Search issues** - Check [GitHub Issues](https://github.com/bmmscap/bplan2025/issues)
3. **Ask in Slack** - Post in `#ignite-dev` channel
4. **Pair programming** - Ask a teammate for a pairing session
5. **Create an issue** - If it's a bug, create a GitHub issue

**When asking for help, include:**
- What you're trying to do
- What you expected to happen
- What actually happened
- Error messages (full stack trace)
- What you've already tried

---

## Resources

### Documentation

- **Project Docs:**
  - [Features](./FEATURES.md) - Complete feature list
  - [Architecture](./ARCHITECTURE.md) - System design
  - [Product Roadmap](./PRODUCT-ROADMAP.md) - Future plans
  - [User Stories](./USER-STORIES-SPRINT-2.md) - Sprint 2 stories

- **External Docs:**
  - [React Documentation](https://react.dev/)
  - [TypeScript Handbook](https://www.typescriptlang.org/docs/)
  - [Vite Guide](https://vitejs.dev/guide/)
  - [Tailwind CSS](https://tailwindcss.com/docs)
  - [Google Gemini AI](https://ai.google.dev/docs)

### Tools

- **GitHub Repository:** https://github.com/bmmscap/bplan2025
- **Slack Workspace:** (link provided by manager)
- **Figma Designs:** (link provided by design team)
- **Project Management:** (Jira/Linear link provided by PM)

### Learning Resources

**React + TypeScript:**
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [Total TypeScript](https://www.totaltypescript.com/)

**Tailwind CSS:**
- [Tailwind CSS Tutorial](https://tailwindcss.com/docs/utility-first)
- [Tailwind UI Components](https://tailwindui.com/) (premium, but good examples)

**AI Development:**
- [Google AI Studio](https://ai.google.dev/tutorials/ai-studio_quickstart)
- [Prompt Engineering Guide](https://www.promptingguide.ai/)

---

## Next Steps

Now that you're set up:

1. ✅ **Run the app locally** - Make sure everything works
2. ✅ **Read the codebase** - Explore `src/App.tsx` and `src/types.ts`
3. ✅ **Review current sprint** - Check [USER-STORIES-SPRINT-2.md](./USER-STORIES-SPRINT-2.md)
4. ✅ **Pick your first task** - Ask your manager for a starter task
5. ✅ **Make your first commit** - Could be as simple as fixing a typo in docs
6. ✅ **Join daily standup** - Meet the team and share progress

**Welcome to the team! Let's build something amazing. 🚀**

---

**Document Version:** 1.0
**Last Updated:** 2025-11-03
**Maintained By:** BMMS Capital LLC - Engineering Team

**Questions?** Ask in `#ignite-dev` on Slack or email dev@bmmscapital.com
