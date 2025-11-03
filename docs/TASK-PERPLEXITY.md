# TASK FOR PERPLEXITY AGENT: Section Drafting System

## 🎯 Your Mission
Build an AI-powered section drafting system that helps users generate content for each business plan section through a guided conversation.

---

## 📦 What You're Building

A "Draft with AI" feature that:
- Adds a button to each business plan section
- Opens a modal with guided questions
- AI asks 3-5 strategic questions
- Generates a complete section draft based on answers
- User can accept, edit, or regenerate

---

## 🏗️ Technical Specs

### Component Structure

Create these files:

**1. `src/components/SectionDrafter.tsx`**
```typescript
import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface SectionDrafterProps {
  sectionName: string;
  sectionType: 'executive' | 'opportunity' | 'solution' | 'business' | 'gtm' | 'financial' | 'roadmap' | 'risks';
  onComplete: (generatedContent: string) => void;
  onCancel: () => void;
}

export function SectionDrafter({ sectionName, sectionType, onComplete, onCancel }: SectionDrafterProps) {
  // TODO: Implement guided conversation
  // TODO: Implement content generation

  return (
    <div className="modal">
      {/* Modal content */}
    </div>
  );
}
```

---

## 🎨 UI Requirements

### "Draft with AI" Button
Add to each section in `App.tsx`:
```tsx
<button
  onClick={() => openDrafter('executive')}
  className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:shadow-lg transition-all"
>
  ✨ Draft with AI
</button>
```

### Modal Dialog
- Full-screen overlay (dark backdrop, 50% opacity)
- Centered card: 600px wide, auto height
- White background, rounded corners
- Close button (X) in top-right
- Title: "AI Strategist - Drafting [Section Name]"

### Conversation Interface
**Phase 1: Questions (Step-by-step)**
- Show one question at a time
- Text input area for user answers
- "Next" button to proceed
- Progress indicator: "Question 2 of 4"

**Phase 2: Generating**
- Show loading spinner
- Message: "Generating your [section name]..."
- Estimated time: "This may take 10-15 seconds"

**Phase 3: Review**
- Show generated content in a text area
- Buttons: "Use This", "Regenerate", "Cancel"
- Character count: Show word/character count

---

## 📋 Question Sets by Section

### Executive Summary
```typescript
const executiveQuestions = [
  "What problem does your business solve?",
  "Who is your target customer?",
  "What makes your solution unique?",
  "What are your key business metrics or traction to date?"
];
```

### Opportunity Analysis
```typescript
const opportunityQuestions = [
  "What is the total market size (TAM) for your industry?",
  "Who are your primary customer segments?",
  "What are the main market trends driving growth?",
  "Who are your top 3 competitors?"
];
```

### Solution Description
```typescript
const solutionQuestions = [
  "What does your product/service do? (High-level)",
  "How does it work technically?",
  "What are the 3-5 key features?",
  "What results can customers expect?"
];
```

### Business Model
```typescript
const businessQuestions = [
  "How do you make money? (Revenue streams)",
  "What is your pricing model?",
  "What are your unit economics (CAC, LTV)?",
  "What are your main cost drivers?"
];
```

### Go-to-Market Strategy
```typescript
const gtmQuestions = [
  "What are your primary customer acquisition channels?",
  "What is your sales process?",
  "What is your customer acquisition cost (CAC)?",
  "What partnerships are critical to your GTM?"
];
```

### Financial Projections
```typescript
const financialQuestions = [
  "What is your current monthly/annual revenue?",
  "What is your projected growth rate?",
  "What are your main expenses?",
  "How much funding are you seeking (if any)?"
];
```

### Roadmap & Milestones
```typescript
const roadmapQuestions = [
  "What are your key milestones for the next 6 months?",
  "What product features are on your roadmap?",
  "What are your team hiring plans?",
  "What are your key success metrics?"
];
```

### Risks & Success Factors
```typescript
const risksQuestions = [
  "What are your top 3 business risks?",
  "What could cause this business to fail?",
  "What are your critical success factors?",
  "What assumptions must be true for success?"
];
```

---

## 🤖 AI Generation Prompts

### Base Prompt Template
```typescript
const generateSection = async (sectionType: string, answers: string[]) => {
  const prompt = `You are a professional business plan writer. Generate a comprehensive ${sectionType} section based on these answers.

QUESTIONS & ANSWERS:
${questions.map((q, i) => `
Q: ${q}
A: ${answers[i]}
`).join('\n')}

REQUIREMENTS:
- Write in professional, investor-ready language
- Use clear, concise paragraphs (3-5 sentences each)
- Include specific metrics and data points where provided
- Structure with clear headings and subheadings
- Aim for 400-600 words
- Be persuasive but realistic

Generate the ${sectionType} section now:`;

  const genAI = new GoogleGenerativeAI(import.meta.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
};
```

### Specific Prompts by Section

**Executive Summary:**
```
"Generate an executive summary that includes: problem statement, solution overview, market opportunity, unique value proposition, traction/metrics, and a compelling call to action for investors."
```

**Opportunity:**
```
"Generate an opportunity analysis that covers: market size and growth, customer segments, market trends, competitive landscape, and market gaps your business fills."
```

**Solution:**
```
"Generate a solution description that explains: what the product is, how it works, key features and benefits, technical approach, and expected customer outcomes."
```

---

## 📊 State Management

```typescript
interface DrafterState {
  phase: 'questions' | 'generating' | 'review';
  currentQuestion: number;
  answers: string[];
  generatedContent: string;
  isLoading: boolean;
  error: string | null;
}

const [state, setState] = useState<DrafterState>({
  phase: 'questions',
  currentQuestion: 0,
  answers: [],
  generatedContent: '',
  isLoading: false,
  error: null
});
```

---

## 🔄 User Flow

```
1. User clicks "Draft with AI" button
   ↓
2. Modal opens, shows Question 1
   ↓
3. User types answer, clicks "Next"
   ↓
4. Shows Question 2, user answers
   ↓
5. Repeat for all questions (3-5 total)
   ↓
6. After last answer, show "Generating..." spinner
   ↓
7. Call AI API with all answers
   ↓
8. Show generated content in editable textarea
   ↓
9. User can:
   - Click "Use This" → Insert into section, close modal
   - Click "Regenerate" → Go back to step 6
   - Click "Cancel" → Close modal without saving
   - Edit the content directly → Click "Use This"
```

---

## ✅ Acceptance Criteria

Your component is DONE when:

- [ ] "Draft with AI" button appears on each section
- [ ] Clicking button opens modal dialog
- [ ] Modal shows questions one at a time
- [ ] Can type answer and click "Next"
- [ ] Progress indicator shows current question number
- [ ] After last question, shows "Generating..." message
- [ ] AI generates relevant content for the section (400-600 words)
- [ ] Generated content appears in editable text area
- [ ] Can edit the generated content
- [ ] "Use This" button inserts content into the section
- [ ] "Regenerate" button creates new version with same answers
- [ ] "Cancel" button closes modal without changes
- [ ] No crashes or errors
- [ ] Works for all 8 section types

---

## 🎨 Tailwind Classes to Use

```tsx
// Modal Backdrop
className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"

// Modal Card
className="bg-white rounded-2xl shadow-2xl w-[600px] max-h-[80vh] overflow-y-auto p-8"

// Modal Header
className="flex items-center justify-between mb-6"

// Title
className="text-2xl font-bold text-gray-900"

// Close Button
className="text-gray-400 hover:text-gray-600 text-2xl cursor-pointer"

// Progress Indicator
className="text-sm text-gray-500 mb-4"

// Question Text
className="text-lg font-semibold text-gray-800 mb-4"

// Answer Textarea
className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none min-h-[120px] resize-y"

// Next Button
className="w-full mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"

// Loading Spinner
className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"

// Generated Content Textarea
className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none min-h-[400px] font-mono text-sm"

// Action Buttons Row
className="flex gap-3 mt-6"

// Use This Button
className="flex-1 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 font-semibold"

// Regenerate Button
className="flex-1 px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 font-semibold"

// Cancel Button
className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 font-semibold"
```

---

## 🧪 Testing Checklist

Test these scenarios:
1. Click "Draft with AI" on Executive Summary
2. Answer all 4 questions
3. Verify AI generates relevant executive summary
4. Click "Use This" and verify content appears in the section
5. Click "Draft with AI" again on same section
6. Click "Cancel" mid-way through questions
7. Test "Regenerate" button creates different version
8. Test on different sections (Opportunity, Solution, etc.)
9. Try leaving an answer blank (should prevent "Next")
10. Test editing generated content before using it

---

## 📝 Example Output Quality

**User Answers (Executive Summary):**
```
Q: What problem does your business solve?
A: Manufacturers lose millions in downtime from unexpected equipment failures

Q: Who is your target customer?
A: Mid-size manufacturers with $50M-$500M revenue

Q: What makes your solution unique?
A: We use IoT sensors + ML to predict failures 48 hours before they happen

Q: What are your key metrics?
A: 15 customers, $2M ARR, 40% MoM growth, 98% prediction accuracy
```

**Expected AI Output:**
```
EXECUTIVE SUMMARY

Industrial manufacturers face a critical challenge: unexpected equipment failures that result in millions of dollars in lost productivity and emergency repair costs. For mid-size manufacturers generating $50M-$500M in annual revenue, even a single day of downtime can be catastrophic.

Our predictive maintenance platform leverages IoT sensors and machine learning to detect equipment anomalies up to 48 hours before failure occurs. This early warning system enables maintenance teams to schedule repairs proactively, virtually eliminating unplanned downtime while reducing maintenance costs by up to 30%.

Unlike traditional condition monitoring solutions that simply alert when problems occur, our proprietary algorithms analyze thousands of data points in real-time to predict failures before they happen. Our system achieves 98% prediction accuracy across diverse industrial equipment types.

The market has validated our approach. We currently serve 15 enterprise customers, generating $2M in annual recurring revenue with 40% month-over-month growth. Our customers report an average ROI of 300% within the first year of deployment.

We are seeking strategic partners and investors to accelerate our growth and capture a significant share of the $12B predictive maintenance market.
```

---

## 🚀 Integration with Main App

Modify `src/App.tsx` to add the drafter:

```tsx
import { SectionDrafter } from './components/SectionDrafter';

function App() {
  const [drafterOpen, setDrafterOpen] = useState(false);
  const [drafterSection, setDrafterSection] = useState<string>('');

  const openDrafter = (section: string) => {
    setDrafterSection(section);
    setDrafterOpen(true);
  };

  const handleDraftComplete = (content: string) => {
    // Insert content into the appropriate section
    // This depends on your current state management
    setDrafterOpen(false);
  };

  return (
    <>
      {/* Add "Draft with AI" buttons to each section */}

      {drafterOpen && (
        <SectionDrafter
          sectionName={drafterSection}
          sectionType={drafterSection as any}
          onComplete={handleDraftComplete}
          onCancel={() => setDrafterOpen(false)}
        />
      )}
    </>
  );
}
```

---

## ⏱️ Time Estimate
**3-4 hours** for a skilled developer

---

## 📦 Deliverables

When done, provide:
1. ✅ `src/components/SectionDrafter.tsx` - Complete component
2. ✅ Screenshots of the flow (questions, generating, review)
3. ✅ Example of AI-generated content for 2-3 sections
4. ✅ Any issues or improvements you'd suggest

---

## 💡 Bonus Points (Optional)

If you finish early, add:
- Save draft answers to localStorage (so user can come back)
- "Skip Question" option
- Edit individual answers before regenerating
- Multiple tone options (Professional, Casual, Technical)
- Template library (show examples before starting)

---

**LET'S BUILD! 🚀**

Questions? Issues? Document them and keep moving forward!
