// Questionnaire configurations for each business plan section

export const executiveQuestions = [
  {
    id: 'problem',
    question: 'What problem does your business solve?',
    placeholder: 'e.g., Small businesses struggle with managing invoices and payments efficiently',
    type: 'textarea' as const
  },
  {
    id: 'solution',
    question: 'What is your solution?',
    placeholder: 'e.g., An automated invoicing platform that integrates with accounting software',
    type: 'textarea' as const
  },
  {
    id: 'market',
    question: 'Who is your target market and how big is it?',
    placeholder: 'e.g., 5M small businesses in the US, $10B TAM',
    type: 'textarea' as const
  },
  {
    id: 'advantage',
    question: 'What gives you an unfair advantage?',
    placeholder: 'e.g., Proprietary AI technology, exclusive partnerships, unique data',
    type: 'textarea' as const
  },
  {
    id: 'revenue',
    question: 'What is your revenue model and Year 3 target?',
    placeholder: 'e.g., SaaS subscription, $5M ARR by Year 3',
    type: 'text' as const
  }
];

export const opportunityQuestions = [
  {
    id: 'marketSize',
    question: 'What is the total addressable market (TAM)?',
    placeholder: 'e.g., $50B global market for project management software',
    type: 'text' as const
  },
  {
    id: 'marketGrowth',
    question: 'What is the market growth rate?',
    placeholder: 'e.g., Growing at 15% CAGR, driven by remote work trends',
    type: 'text' as const
  },
  {
    id: 'targetSegments',
    question: 'What are your primary customer segments?',
    placeholder: 'e.g., Enterprise (>1000 employees), Mid-market (100-1000), SMB (<100)',
    type: 'textarea' as const
  },
  {
    id: 'growthDrivers',
    question: 'What are the key market growth drivers?',
    placeholder: 'e.g., Digital transformation, remote work, regulatory changes',
    type: 'textarea' as const
  },
  {
    id: 'competitiveEdge',
    question: 'How do you compare to competitors?',
    placeholder: 'e.g., Our AI features and pricing give us 2x better value than Competitor X',
    type: 'textarea' as const
  }
];

export const solutionQuestions = [
  {
    id: 'description',
    question: 'Describe your solution in detail',
    placeholder: 'e.g., A cloud-based platform that automates workflow management using AI',
    type: 'textarea' as const
  },
  {
    id: 'keyFeatures',
    question: 'What are the 3-5 key features?',
    placeholder: 'e.g., Real-time collaboration, AI-powered insights, Mobile app, Integrations',
    type: 'textarea' as const
  },
  {
    id: 'techStack',
    question: 'What technology stack will you use?',
    placeholder: 'e.g., React, Node.js, PostgreSQL, AWS',
    type: 'textarea' as const
  },
  {
    id: 'differentiation',
    question: 'How is your solution different from competitors?',
    placeholder: 'e.g., First to offer AI-powered predictive analytics in this space',
    type: 'textarea' as const
  },
  {
    id: 'roadmap',
    question: 'What are the next features on your roadmap?',
    placeholder: 'e.g., Mobile app, API access, advanced reporting, integrations',
    type: 'textarea' as const
  }
];

export const businessQuestions = [
  {
    id: 'revenueModel',
    question: 'What is your revenue model?',
    placeholder: 'e.g., SaaS subscription with tiered pricing ($49, $99, $299/mo)',
    type: 'textarea' as const
  },
  {
    id: 'pricingStrategy',
    question: 'How did you determine your pricing?',
    placeholder: 'e.g., Value-based pricing, 70% margin, competitive analysis',
    type: 'textarea' as const
  },
  {
    id: 'unitEconomics',
    question: 'What are your unit economics?',
    placeholder: 'e.g., $1200 ARR, $400 CAC, $4800 LTV, 3-month payback',
    type: 'textarea' as const
  },
  {
    id: 'margins',
    question: 'What are your target profit margins?',
    placeholder: 'e.g., 70% gross margin, 20% net margin at scale',
    type: 'text' as const
  }
];

export const gtmQuestions = [
  {
    id: 'targetCustomer',
    question: 'Who is your ideal customer profile?',
    placeholder: 'e.g., Tech-savvy SMB owners, 20-50 employees, $2-10M revenue',
    type: 'textarea' as const
  },
  {
    id: 'acquisitionChannels',
    question: 'What are your primary customer acquisition channels?',
    placeholder: 'e.g., SEO/Content, LinkedIn ads, Partner referrals, Sales outreach',
    type: 'textarea' as const
  },
  {
    id: 'salesProcess',
    question: 'Describe your sales process',
    placeholder: 'e.g., Self-service signup → 14-day trial → Sales call → Close',
    type: 'textarea' as const
  },
  {
    id: 'partnerships',
    question: 'What strategic partnerships will you pursue?',
    placeholder: 'e.g., Integration partners, resellers, industry associations',
    type: 'textarea' as const
  },
  {
    id: 'gtmPhases',
    question: 'What are your GTM phases over the next 12 months?',
    placeholder: 'e.g., Month 1-3: Launch beta, Month 4-6: Scale content, Month 7-12: Partner channel',
    type: 'textarea' as const
  }
];

export const financialQuestions = [
  {
    id: 'year1',
    question: 'Year 1: Revenue, customers, and key milestones?',
    placeholder: 'e.g., $500K revenue, 50 customers, launch MVP',
    type: 'textarea' as const
  },
  {
    id: 'year2',
    question: 'Year 2: Revenue, customers, and key milestones?',
    placeholder: 'e.g., $2M revenue, 200 customers, expand to enterprise',
    type: 'textarea' as const
  },
  {
    id: 'year3',
    question: 'Year 3: Revenue, customers, and key milestones?',
    placeholder: 'e.g., $5M revenue, 500 customers, international expansion',
    type: 'textarea' as const
  },
  {
    id: 'funding',
    question: 'How much funding do you need and what will you use it for?',
    placeholder: 'e.g., $2M seed round for product development (40%), sales/marketing (40%), operations (20%)',
    type: 'textarea' as const
  },
  {
    id: 'costs',
    question: 'What are your main cost categories?',
    placeholder: 'e.g., Engineering (40%), Sales (30%), Marketing (20%), Operations (10%)',
    type: 'textarea' as const
  }
];

export const roadmapQuestions = [
  {
    id: 'launchPlan',
    question: 'What are your launch plans for the next 6 months?',
    placeholder: 'e.g., Month 1-2: Private beta, Month 3-4: Public launch, Month 5-6: Feature updates',
    type: 'textarea' as const
  },
  {
    id: 'productRoadmap',
    question: 'What product features will you build each quarter?',
    placeholder: 'e.g., Q1: Core features, Q2: Mobile app, Q3: Integrations, Q4: Enterprise features',
    type: 'textarea' as const
  },
  {
    id: 'teamBuilding',
    question: 'What are your hiring plans?',
    placeholder: 'e.g., Year 1: 5 engineers, 2 sales. Year 2: 10 engineers, 5 sales, 2 marketing',
    type: 'textarea' as const
  },
  {
    id: 'kpis',
    question: 'What are your key performance indicators (KPIs)?',
    placeholder: 'e.g., MRR growth, CAC, LTV, Churn rate, NPS',
    type: 'textarea' as const
  }
];

export const risksQuestions = [
  {
    id: 'marketRisks',
    question: 'What are the main market risks?',
    placeholder: 'e.g., Market adoption slower than expected, new competitors',
    type: 'textarea' as const
  },
  {
    id: 'technicalRisks',
    question: 'What are the technical risks?',
    placeholder: 'e.g., Scaling challenges, integration complexity, security concerns',
    type: 'textarea' as const
  },
  {
    id: 'competitiveRisks',
    question: 'What competitive risks do you face?',
    placeholder: 'e.g., Large incumbents enter space, price wars',
    type: 'textarea' as const
  },
  {
    id: 'mitigationStrategies',
    question: 'How will you mitigate these risks?',
    placeholder: 'e.g., Diversify revenue streams, build moat with IP, strong customer relationships',
    type: 'textarea' as const
  }
];

export const successFactorsQuestions = [
  {
    id: 'keySuccessFactors',
    question: 'What are the 3-5 critical success factors for your business?',
    placeholder: 'e.g., Product-market fit, strong unit economics, scalable tech, talented team',
    type: 'textarea' as const
  },
  {
    id: 'competitiveAdvantages',
    question: 'What sustainable competitive advantages will you build?',
    placeholder: 'e.g., Network effects, proprietary data, brand, switching costs',
    type: 'textarea' as const
  },
  {
    id: 'executionPlan',
    question: 'How will you execute on these success factors?',
    placeholder: 'e.g., Hire top talent, invest in R&D, build strong culture',
    type: 'textarea' as const
  }
];

// System prompts for AI generation
export const executivePrompt = `You are an expert business plan consultant. Generate a comprehensive Executive Summary section based on the user's answers. Return a JSON object with this structure:
{
  "marketSize": "string",
  "yearThreeRevenue": "string",
  "uniqueValue": "string",
  "problems": [{"title": "string", "description": "string"}],
  "solution": "string",
  "advantages": [{"metric": "string", "description": "string"}]
}`;

export const opportunityPrompt = `You are an expert market analyst. Generate a comprehensive Opportunity section based on the user's answers. Return a JSON object with this structure:
{
  "marketSize": "string",
  "marketGrowth": "string",
  "targetPercent": "string",
  "targetDescription": "string",
  "growthDrivers": ["string"],
  "customerSegments": [{"segment": "string", "size": "string", "arr": "string", "priority": "string"}],
  "competitiveAdvantages": [{"feature": "string", "us": true, "competitor1": false, "competitor2": false}]
}`;

export const solutionPrompt = `You are an expert product strategist. Generate a comprehensive Solution section based on the user's answers. Return a JSON object with this structure:
{
  "description": "string",
  "features": [{"name": "string", "description": "string", "capabilities": ["string"], "revenue": "string"}],
  "techStack": [{"layer": "string", "technologies": ["string"]}]
}`;

export const businessPrompt = `You are an expert business model consultant. Generate a comprehensive Business Model section based on the user's answers. Return a JSON object with this structure:
{
  "revenueStreams": [{"stream": "string", "model": "string", "pricing": "string", "margin": "string", "split": "string"}],
  "pricingTiers": [{"tier": "string", "price": "string", "target": "string", "includes": ["string"]}],
  "unitEconomics": {"arr": "string", "cac": "string", "ltv": "string", "payback": "string"}
}`;

export const gtmPrompt = `You are an expert go-to-market strategist. Generate a comprehensive GTM Strategy section based on the user's answers. Return a JSON object with this structure:
{
  "phases": [{"name": "string", "duration": "string", "target": "string", "channels": "string", "offer": "string", "focus": "string"}],
  "channels": [{"channel": "string", "investment": "string", "roi": "string", "timeframe": "string"}],
  "salesProcess": [{"stage": "string", "duration": "string", "conversion": "string"}],
  "partnerships": [{"partner": "string", "value": "string", "type": "string"}]
}`;

export const financialPrompt = `You are an expert financial analyst. Generate a comprehensive Financial Projections section based on the user's answers. Return a JSON object with this structure:
{
  "years": {
    "1": {"revenue": "string", "clients": "string", "arr": "string", "margin": "string", "team": "string", "milestones": ["string"]},
    "2": {"revenue": "string", "clients": "string", "arr": "string", "margin": "string", "team": "string", "milestones": ["string"]},
    "3": {"revenue": "string", "clients": "string", "arr": "string", "margin": "string", "team": "string", "milestones": ["string"]}
  },
  "revenueBreakdown": [{"stream": "string", "y1": 0, "y2": 0, "y3": 0}],
  "costs": [{"category": "string", "percent": "string"}],
  "funding": {"amount": "string", "uses": [{"use": "string", "amount": "string"}]},
  "keyMetrics": {"currentARR": "string", "projectedARR": "string", "ltv": "string"}
}`;

export const roadmapPrompt = `You are an expert business execution strategist. Generate a comprehensive Roadmap section based on the user's answers. Return a JSON object with this structure:
{
  "launch": [{"month": "string", "focus": "string", "tasks": ["string"]}],
  "productRoadmap": [{"quarter": "string", "items": ["string"]}],
  "teamBuilding": [{"department": "string", "hires": {"y1": 0, "y2": 0, "y3": 0}, "key": ["string"]}],
  "kpis": [{"metric": "string", "target": "string"}]
}`;

export const risksPrompt = `You are an expert risk management consultant. Generate a comprehensive Risks & Mitigation section based on the user's answers. Return a JSON array with this structure:
[
  {"risk": "string", "level": "High/Medium/Low", "description": "string", "mitigation": ["string"]}
]`;

export const successFactorsPrompt = `You are an expert business strategist. Generate a comprehensive Success Factors section based on the user's answers. Return a JSON array with this structure:
[
  {"factor": "string", "description": "string"}
]`;
