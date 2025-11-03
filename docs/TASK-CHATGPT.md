# TASK FOR CHATGPT AGENT: AI Chat Interface

## 🎯 Your Mission
Build a floating AI chat interface component that users can interact with from anywhere in the app.

---

## 📦 What You're Building

A persistent chat interface with:
- Floating chat button (bottom-right corner)
- Slide-out chat panel
- Message display with user/AI messages
- Input field with send button
- Integration with Google Gemini AI

---

## 🏗️ Technical Specs

### Component Structure

Create these files:

**1. `src/components/ChatPanel.tsx`**
```typescript
import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

export function ChatPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // TODO: Implement AI message sending
  // TODO: Implement UI rendering

  return (
    <>
      {/* Floating button */}
      {/* Chat panel */}
    </>
  );
}
```

---

## 🎨 UI Requirements

### Floating Button
- Position: Fixed, bottom-right, 24px from edges
- Size: 60px × 60px circle
- Color: Blue gradient (#3b82f6 to #2563eb)
- Icon: Chat bubble or sparkle icon
- Hover: Scale 1.1, shadow increase
- Click: Opens chat panel

### Chat Panel (when open)
- Position: Fixed, bottom-right, above button
- Size: 400px width × 600px height
- Background: White with subtle shadow
- Border radius: 16px
- Contains:
  - **Header**: "AI Strategist" + minimize/close buttons
  - **Message Area**: Scrollable, auto-scroll to bottom
  - **Input Area**: Text input + send button

### Messages
- **User messages**: Right-aligned, blue background (#3b82f6), white text
- **AI messages**: Left-aligned, gray background (#f3f4f6), dark text
- Padding: 12px
- Border radius: 16px
- Max width: 80% of panel width
- Timestamp: Small gray text below each message

### Input Field
- Full width input with padding
- Placeholder: "Ask the AI Strategist..."
- Send button: Blue, right side
- Disabled when loading
- Loading state: Show "AI is thinking..." spinner

---

## 🔌 AI Integration

### Setup Gemini AI
```typescript
const genAI = new GoogleGenerativeAI(import.meta.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });
```

### Send Message Function
```typescript
async function sendMessage(userMessage: string) {
  // 1. Add user message to chat
  const userMsg: Message = {
    id: Date.now().toString(),
    role: 'user',
    content: userMessage,
    timestamp: new Date()
  };

  setMessages(prev => [...prev, userMsg]);
  setIsLoading(true);
  setInput('');

  try {
    // 2. Call Gemini AI
    const prompt = `You are an AI business strategist helping users build their business plan.

User question: ${userMessage}

Provide helpful, concise advice (2-3 paragraphs max).`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const aiMessage = response.text();

    // 3. Add AI response to chat
    const aiMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: 'ai',
      content: aiMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, aiMsg]);
  } catch (error) {
    console.error('AI Error:', error);
    // Show error message to user
  } finally {
    setIsLoading(false);
  }
}
```

---

## ✅ Acceptance Criteria

Your component is DONE when:

- [ ] Floating button appears bottom-right on all pages
- [ ] Clicking button opens/closes chat panel
- [ ] Can type message and press Enter or click Send
- [ ] User messages appear right-aligned in blue
- [ ] AI responses appear left-aligned in gray
- [ ] Chat scrolls to bottom automatically when new message arrives
- [ ] Shows "AI is thinking..." when waiting for response
- [ ] Input is disabled while AI is responding
- [ ] Messages persist during session (lost on refresh is OK for MVP)
- [ ] Works on mobile (chat panel is full-screen on small screens)
- [ ] No crashes or console errors

---

## 🎨 Tailwind Classes to Use

```tsx
// Floating Button
className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200 flex items-center justify-center text-white cursor-pointer z-50"

// Chat Panel
className="fixed bottom-24 right-6 w-[400px] h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-50"

// Header
className="px-6 py-4 border-b border-gray-200 flex items-center justify-between"

// Message Container
className="flex-1 overflow-y-auto p-4 space-y-4"

// User Message
className="ml-auto max-w-[80%] bg-blue-500 text-white rounded-2xl px-4 py-3"

// AI Message
className="mr-auto max-w-[80%] bg-gray-100 text-gray-900 rounded-2xl px-4 py-3"

// Input Area
className="p-4 border-t border-gray-200 flex gap-2"

// Input Field
className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"

// Send Button
className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
```

---

## 🧪 Testing Checklist

Test these scenarios:
1. Open and close the chat panel multiple times
2. Send a message: "How do I calculate my TAM?"
3. Send another: "What's a good profit margin?"
4. Check that both messages appear in order
5. Verify AI responses are relevant
6. Try sending empty message (should not send)
7. Resize browser window (should stay in corner)
8. Test on mobile size (chat should be responsive)

---

## 📝 Example Messages to Test

```
User: "How do I calculate my total addressable market?"
Expected: AI explains TAM calculation methods

User: "What should my profit margins be?"
Expected: AI gives industry benchmarks

User: "Help me write my executive summary"
Expected: AI asks clarifying questions
```

---

## 🚀 Integration with Main App

Add to `src/App.tsx`:

```tsx
import { ChatPanel } from './components/ChatPanel';

function App() {
  return (
    <>
      {/* Existing app content */}

      {/* Add at the end */}
      <ChatPanel />
    </>
  );
}
```

---

## ⏱️ Time Estimate
**2-3 hours** for a skilled developer

---

## 📦 Deliverables

When done, provide:
1. ✅ `src/components/ChatPanel.tsx` - Complete component
2. ✅ Screenshots of the chat interface (open and closed states)
3. ✅ Brief description of any challenges you faced
4. ✅ Any improvements you'd suggest for v2

---

## 💡 Bonus Points (Optional)

If you finish early, add:
- Message timestamps (show "2 minutes ago")
- Typing indicator animation for AI
- Keyboard shortcut to open chat (Cmd/Ctrl + K)
- Conversation history saved to localStorage
- Markdown rendering in AI responses (bold, lists, etc.)

---

**LET'S BUILD! 🚀**

Questions? Issues? Document them and keep moving forward!
