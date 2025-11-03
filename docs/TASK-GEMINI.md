# TASK FOR GEMINI AGENT: Plan Analyzer & Validator

## 🎯 Your Mission
Build an intelligent plan analysis system that reviews the business plan, calculates a Strategic Alignment Score (SAS), identifies gaps, and validates financial assumptions.

---

## 📦 What You're Building

A plan review system that:
- Analyzes all 8 sections for completeness and quality
- Calculates a 0-100% Strategic Alignment Score
- Identifies missing content and logical inconsistencies
- Validates financial assumptions against benchmarks
- Provides actionable recommendations
- Displays results in a beautiful dashboard

---

## 🏗️ Technical Specs

### Component Structure

Create these files:

**1. `src/components/PlanAnalyzer.tsx`** (Main dashboard)
**2. `src/services/analysisService.ts`** (Analysis logic)
**3. `src/components/ScoreGauge.tsx`** (Visual score display)

---

## 📊 Strategic Alignment Score (SAS)

The SAS is a composite score (0-100%) based on three pillars:

### Pillar 1: Plan Completeness (40 points)
Calculate how complete each section is:

```typescript
interface SectionScore {
  name: string;
  score: number; // 0-100
  wordCount: number;
  missingElements: string[];
}

// Scoring logic
const calculateCompletenessScore = (plan: BusinessPlan): number => {
  const sections = [
    { name: 'executive', minWords: 300, required: ['problem', 'solution', 'market'] },
    { name: 'opportunity', minWords: 400, required: ['TAM', 'customer segments', 'competitors'] },
    { name: 'solution', minWords: 350, required: ['features', 'benefits', 'differentiation'] },
    { name: 'business', minWords: 300, required: ['revenue model', 'pricing', 'unit economics'] },
    { name: 'gtm', minWords: 350, required: ['channels', 'CAC', 'sales process'] },
    { name: 'financial', minWords: 250, required: ['projections', 'assumptions', 'funding'] },
    { name: 'roadmap', minWords: 300, required: ['milestones', 'timeline', 'KPIs'] },
    { name: 'risks', minWords: 250, required: ['risks', 'mitigation', 'success factors'] }
  ];

  let totalScore = 0;

  sections.forEach(section => {
    const content = plan[section.name];
    const wordCount = countWords(content);
    const hasMinWords = wordCount >= section.minWords;

    // Check for required elements
    const missingElements = section.required.filter(element =>
      !content.toLowerCase().includes(element.toLowerCase())
    );

    const sectionScore = hasMinWords && missingElements.length === 0 ? 100 :
                         hasMinWords ? 70 :
                         wordCount > 100 ? 40 : 0;

    totalScore += sectionScore;
  });

  return (totalScore / sections.length) * 0.4; // 40% weight
};
```

### Pillar 2: Financial Viability (35 points)
Check financial assumptions for red flags:

```typescript
const calculateFinancialViabilityScore = (financial: FinancialSection): number => {
  let score = 100;
  const issues: string[] = [];

  // Check 1: LTV should be > CAC (ideally 3x+)
  if (financial.ltv && financial.cac) {
    const ratio = financial.ltv / financial.cac;
    if (ratio < 1) {
      score -= 30;
      issues.push('LTV:CAC ratio is less than 1:1 (needs to be 3:1+)');
    } else if (ratio < 3) {
      score -= 15;
      issues.push('LTV:CAC ratio is below 3:1 (industry standard)');
    }
  } else {
    score -= 20;
    issues.push('Missing LTV or CAC calculation');
  }

  // Check 2: Growth rate should be realistic
  if (financial.growthRate) {
    if (financial.growthRate > 100) { // 100% MoM is unrealistic
      score -= 20;
      issues.push('Growth rate seems unrealistic (>100% MoM)');
    }
  }

  // Check 3: Burn rate and runway
  if (financial.monthlyBurn && financial.cashBalance) {
    const runway = financial.cashBalance / financial.monthlyBurn;
    if (runway < 6) {
      score -= 15;
      issues.push(`Runway is only ${runway.toFixed(1)} months (need 12+ months)`);
    }
  }

  // Check 4: Revenue projections should be grounded
  if (financial.year1Revenue && financial.year3Revenue) {
    const cagr = Math.pow(financial.year3Revenue / financial.year1Revenue, 1/3) - 1;
    if (cagr > 3.0) { // 300% CAGR is very aggressive
      score -= 10;
      issues.push('Revenue growth projections may be too aggressive');
    }
  }

  return Math.max(0, score) * 0.35; // 35% weight
};
```

### Pillar 3: Execution Readiness (25 points)
Check if the plan is actionable:

```typescript
const calculateExecutionReadinessScore = (plan: BusinessPlan): number => {
  let score = 100;

  // Check 1: Are there specific milestones?
  const hasMilestones = plan.roadmap?.milestones?.length > 0;
  if (!hasMilestones) {
    score -= 30;
  }

  // Check 2: Are there measurable KPIs?
  const hasKPIs = plan.roadmap?.kpis?.length > 0;
  if (!hasKPIs) {
    score -= 25;
  }

  // Check 3: Is there a clear GTM timeline?
  const hasTimeline = plan.gtm?.timeline || plan.gtm?.phases;
  if (!hasTimeline) {
    score -= 20;
  }

  // Check 4: Are risks identified?
  const hasRisks = plan.risks?.risks?.length > 0;
  if (!hasRisks) {
    score -= 25;
  }

  return Math.max(0, score) * 0.25; // 25% weight
};
```

---

## 🎨 UI Requirements

### Analysis Dashboard

**Layout:**
```
┌─────────────────────────────────────────┐
│  Strategic Alignment Score: 73%         │
│  [===========================    ]      │ ← Gauge/Progress bar
│                                         │
│  ✅ STRONG AREAS                        │
│  • Executive Summary (92/100)           │
│  • Solution (88/100)                    │
│                                         │
│  ⚠️  NEEDS IMPROVEMENT                  │
│  • Financial (58/100)                   │
│    - Missing Year 3-5 projections       │
│    - CAC assumptions unclear            │
│    → Fix: Add detailed unit economics   │
│                                         │
│  ❌ CRITICAL GAPS                       │
│  • Risks (31/100)                       │
│    - Missing competitive scenarios      │
│    → Action: Complete Risks section     │
│                                         │
│  [Close] [Export Report]                │
└─────────────────────────────────────────┘
```

**Trigger:**
Add "Review My Plan" button in the main navigation:
```tsx
<button
  onClick={analyzePlan}
  className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold hover:shadow-lg"
>
  🔍 Review My Plan
</button>
```

---

## 🔢 Score Gauge Component

Create a visual gauge for the overall score:

```typescript
// src/components/ScoreGauge.tsx
interface ScoreGaugeProps {
  score: number; // 0-100
  size?: number; // diameter in pixels
}

export function ScoreGauge({ score, size = 200 }: ScoreGaugeProps) {
  const getColor = (score: number) => {
    if (score >= 80) return '#10b981'; // green
    if (score >= 60) return '#f59e0b'; // yellow
    return '#ef4444'; // red
  };

  const percentage = (score / 100) * 360; // Convert to degrees

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 200 200">
        {/* Background circle */}
        <circle
          cx="100"
          cy="100"
          r="80"
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="20"
        />
        {/* Score arc */}
        <circle
          cx="100"
          cy="100"
          r="80"
          fill="none"
          stroke={getColor(score)}
          strokeWidth="20"
          strokeDasharray={`${percentage * 1.4} 999`}
          strokeLinecap="round"
          transform="rotate(-90 100 100)"
        />
        {/* Center text */}
        <text
          x="100"
          y="100"
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-4xl font-bold"
          fill={getColor(score)}
        >
          {score}%
        </text>
      </svg>
      <div className="text-center mt-2 text-sm text-gray-500">
        Strategic Alignment Score
      </div>
    </div>
  );
}
```

---

## 📋 Analysis Report Structure

```typescript
interface AnalysisReport {
  overallScore: number; // 0-100
  timestamp: Date;

  pillarScores: {
    completeness: number;
    viability: number;
    execution: number;
  };

  sectionScores: Array<{
    name: string;
    score: number;
    status: 'strong' | 'needs-improvement' | 'critical';
    issues: string[];
    recommendations: string[];
  }>;

  financialValidation: {
    ltvCacRatio: number | null;
    isHealthy: boolean;
    warnings: string[];
  };

  topRecommendations: string[];
}
```

---

## 🤖 AI-Powered Recommendations

Use AI to generate specific, actionable recommendations:

```typescript
const generateRecommendations = async (report: AnalysisReport): Promise<string[]> => {
  const prompt = `You are a business strategy expert reviewing a business plan.

PLAN SCORES:
- Overall: ${report.overallScore}%
- Completeness: ${report.pillarScores.completeness}%
- Financial Viability: ${report.pillarScores.viability}%
- Execution Readiness: ${report.pillarScores.execution}%

ISSUES FOUND:
${report.sectionScores
  .filter(s => s.issues.length > 0)
  .map(s => `${s.name}: ${s.issues.join(', ')}`)
  .join('\n')}

Generate 3-5 specific, actionable recommendations to improve this plan.
Each recommendation should:
- Be specific (not generic advice)
- Include the "why" and "how"
- Be prioritized by impact

Format as a numbered list.`;

  const genAI = new GoogleGenerativeAI(import.meta.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  // Parse numbered list into array
  return text
    .split('\n')
    .filter(line => /^\d+\./.test(line))
    .map(line => line.replace(/^\d+\.\s*/, ''));
};
```

---

## ✅ Acceptance Criteria

Your component is DONE when:

- [ ] "Review My Plan" button appears in main nav
- [ ] Clicking button analyzes the plan (takes 5-10 seconds)
- [ ] Shows loading state during analysis
- [ ] Displays overall SAS score (0-100%) with visual gauge
- [ ] Shows breakdown by pillar (Completeness, Viability, Execution)
- [ ] Lists strong areas (score ≥ 80)
- [ ] Lists areas needing improvement (score 50-79)
- [ ] Lists critical gaps (score < 50)
- [ ] Each issue has specific recommendations
- [ ] Financial validation checks LTV:CAC ratio
- [ ] Can export report as PDF (bonus)
- [ ] Can run analysis multiple times
- [ ] Score updates when plan content changes
- [ ] No crashes or errors

---

## 🎨 Tailwind Classes to Use

```tsx
// Analysis Modal
className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"

// Report Card
className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"

// Header with Score
className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 rounded-t-2xl"

// Overall Score
className="text-6xl font-bold mb-2"

// Score Label
className="text-xl opacity-90"

// Section Divider
className="border-t border-gray-200 my-6"

// Strong Areas (Green)
className="bg-green-50 border-l-4 border-green-500 p-4 mb-4"

// Needs Improvement (Yellow)
className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-4"

// Critical Gaps (Red)
className="bg-red-50 border-l-4 border-red-500 p-4 mb-4"

// Section Score
className="flex items-center justify-between mb-2"

// Issue List
className="ml-4 text-sm text-gray-600 space-y-1"

// Recommendation (with arrow)
className="ml-4 text-sm text-blue-600 flex items-start gap-2"

// Action Buttons
className="flex gap-4 p-6 bg-gray-50 rounded-b-2xl"

// Close Button
className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-semibold"

// Export Button
className="flex-1 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-semibold"
```

---

## 🧪 Testing Checklist

Test these scenarios:

1. **Empty Plan:**
   - Create plan with no content
   - Expected: Low score (< 30%), all sections flagged as critical

2. **Partial Plan:**
   - Fill out 4 of 8 sections
   - Expected: Medium score (40-60%), some critical, some needs improvement

3. **Complete Plan (Good):**
   - Fill all sections with substantial content
   - Expected: High score (70-85%), mostly strong/needs improvement

4. **Financial Issues:**
   - Enter LTV < CAC
   - Expected: Financial viability score drops, warning shown

5. **Unrealistic Growth:**
   - Enter 200% MoM growth
   - Expected: Warning about unrealistic projections

6. **Multiple Reviews:**
   - Run analysis, fix issues, run again
   - Expected: Score improves on second run

---

## 📊 Example Analysis Output

```
STRATEGIC ALIGNMENT SCORE: 73%

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SCORE BREAKDOWN:
✓ Plan Completeness: 85% (34/40 points)
⚠ Financial Viability: 58% (20/35 points)
✓ Execution Readiness: 76% (19/25 points)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ STRONG AREAS

Executive Summary (92/100)
  Clear value proposition and market opportunity

Solution Description (88/100)
  Well-defined features and differentiation

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠️ NEEDS IMPROVEMENT

Financial Projections (58/100)
  Issues:
  • Missing Year 3-5 projections
  • CAC assumptions unclear
  • LTV:CAC ratio is 2.1:1 (should be 3:1+)

  Recommendations:
  → Add detailed 5-year financial model
  → Show CAC calculation by channel
  → Improve customer retention to increase LTV

Go-to-Market (61/100)
  Issues:
  • No customer acquisition timeline
  • Budget allocation unclear

  Recommendations:
  → Create month-by-month GTM roadmap
  → Allocate budget across channels

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

❌ CRITICAL GAPS

Risks & Success Factors (31/100)
  Issues:
  • Missing competitive response scenarios
  • No key person dependencies identified
  • Mitigation strategies too vague

  Recommendations:
  → Identify top 3 risks with specific mitigation plans
  → Address "what if competitor copies us?"
  → Define critical success factors

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

TOP 3 PRIORITIES:

1. Complete Risks & Success Factors section with
   specific scenarios and mitigation plans

2. Extend financial projections to 5 years and
   improve unit economics (target LTV:CAC of 4:1)

3. Create detailed GTM timeline with monthly
   milestones and budget allocation
```

---

## 🚀 Integration with Main App

Add to `src/App.tsx`:

```tsx
import { PlanAnalyzer } from './components/PlanAnalyzer';

function App() {
  const [showAnalysis, setShowAnalysis] = useState(false);

  return (
    <>
      {/* Add in navigation */}
      <button onClick={() => setShowAnalysis(true)}>
        🔍 Review My Plan
      </button>

      {showAnalysis && (
        <PlanAnalyzer
          plan={currentPlan}
          onClose={() => setShowAnalysis(false)}
        />
      )}
    </>
  );
}
```

---

## ⏱️ Time Estimate
**4-5 hours** for a skilled developer

---

## 📦 Deliverables

When done, provide:
1. ✅ `src/components/PlanAnalyzer.tsx` - Main component
2. ✅ `src/services/analysisService.ts` - Scoring logic
3. ✅ `src/components/ScoreGauge.tsx` - Visual gauge
4. ✅ Screenshots of analysis results (good and bad plans)
5. ✅ Example analysis report output

---

## 💡 Bonus Points (Optional)

If you finish early, add:
- Historical score tracking (chart showing improvement over time)
- Benchmark comparison (how you compare to similar companies)
- Export analysis report as PDF
- Share analysis via unique URL
- Industry-specific validation rules
- AI-generated improvement roadmap

---

**LET'S BUILD! 🚀**

Questions? Issues? Document them and keep moving forward!
