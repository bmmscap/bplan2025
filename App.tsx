import React, { useState, useMemo, FC, useCallback, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { marked } from 'marked';
import type { 
  BusinessPlan, 
  ExecutiveSection as ExecutiveSectionType, ExecutiveProblem, ExecutiveAdvantage,
  OpportunitySection as OpportunitySectionType, CustomerSegment, CompetitiveAdvantage,
  SolutionSection as SolutionSectionType, SolutionFeature, TechStackLayer,
  BusinessSection as BusinessSectionType, RevenueStream, PricingTier,
  GTMSection as GTMSectionType, GTMPhase, GTMChannel, SalesProcessStage, Partnership,
  FinancialSection as FinancialSectionType, FinancialYear,
  RoadmapSection as RoadmapSectionType, LaunchPhase, RoadmapQuarter, TeamBuildingDepartment, KPI,
  Risk, 
  SuccessFactor 
} from './types';
import EditableText from './components/EditableText';
import { 
  ChevronRight, ChevronDown, Target, DollarSign, Users, TrendingUp, Lightbulb, Shield, 
  CheckCircle, AlertCircle, Calendar, BarChart3, Zap, Edit3, Save, Download, Upload, Plus, Trash2, Bot, X
} from './components/icons';
import RevenueBreakdownChart from './components/RevenueBreakdownChart';

const documentContext = `
DOCUMENTS CONTEXT:

- Company Name: BMMS CAPITAL LLC
- Formation: Organized in Ohio on 03/29/2022. Document ID: 202208802588.
- Statutory Agent: LEGALINC CORPORATE SERVICES INC.
- Initial Manager: BRIAN MARTUCCI, 2840 JACKSON AVE, PHIH, LONG ISLAND CITY, NY 11101
- Organizer: Anna Manukyan, who has resigned.
- IRS EIN: 88-1616050, assigned on 04-06-2022. Name control is BMMS.
- Tax Form: Must file Form 1065.

- Correspondence with TakeProfit Trader:
  - An issue occurred on Oct 13, 2025, where 3 of 5 active, profitable trading accounts disappeared after being reset.
  - The accounts were: three $75K accounts and two $150K accounts. All had hit a 50% profit target.
  - After a long chat with support (KeShonna), it was revealed the accounts were considered "expired" despite being active post-reset.
  - Resolution: TakeProfit Trader agreed to provide three $100 reset credits as compensation, which was accepted by Brian Martucci.
  - Subsequent Issue: TakeProfit Trader later banned the account and canceled all active subscriptions without notice.
  - A formal dispute was filed by Brian Martucci on Oct 22, 2025, requesting reinstatement, restoration of credits, a full refund, and a written explanation.
`;

const initialBusinessPlan: BusinessPlan = {
  companyName: 'BMMS CAPITAL LLC',
  tagline: 'The Institutional Standard for AI-Powered Media Transformation',
  industry: 'Strategic Advisory / AI Media Tech',
  targetValuation: '$10M-$30M+',
  
  executive: {
    marketSize: '$145.7 Trillion',
    yearThreeRevenue: '$2M - $10M+',
    uniqueValue: 'A Compound Business Ecosystem',
    problems: [
      { title: 'Navigating AI Transformation', description: 'Enterprises need expert guidance to integrate AI with media and communication strategies.' },
      { title: 'Achieving Institutional Trust', description: 'Credibility and access are paramount in high-stakes financial and media environments.' },
      { title: 'Scaling Media Authority', description: 'Organizations must build and scale their influence in an increasingly complex digital landscape.' },
      { title: 'Fragmented Service Offerings', description: 'Clients need a unified partner for strategy, technology, content, and training, not siloed vendors.' }
    ],
    solution: 'We create an interconnected business ecosystem where each venture amplifies the others. This model fuses unparalleled institutional experience with forward-looking AI transformation capabilities, generating compound growth and competitive advantages for our clients.',
    advantages: [
      { metric: '50+ Years Combined Leadership', description: 'Across Bloomberg, CNBC, and NBC News.' },
      { metric: 'Principal-Led Advisory', description: 'Direct access to principals on every engagement.' },
      { metric: 'Impossible to Replicate', description: 'Unique fusion of trust, innovation, and execution.' }
    ]
  },

  opportunity: {
    marketSize: '$145.7T',
    marketGrowth: '3.5% CAGR',
    targetPercent: 'Fortune 500+',
    targetDescription: 'Global investors, newsrooms, and C-suites',
    growthDrivers: [
      'AI-Powered Media Transformation',
      'Cross-Selling Synergies',
      'Scalable Revenue Models',
      'First-Mover Advantage'
    ],
    customerSegments: [
      { segment: 'Legacy Media & Fortune 500', size: 'Varies', arr: '$200K-$1M+', priority: 'Primary' },
      { segment: 'Newsrooms & Content Creators', size: 'Varies', arr: '$50K-$200K MRR', priority: 'Secondary' },
      { segment: 'Institutional Investors', size: 'Varies', arr: '$50-$500/mo', priority: 'Tertiary' }
    ],
    competitiveAdvantages: [
      { feature: 'Unique Founder Trust & Access', us: true, competitor1: false, competitor2: false },
      { feature: 'Innovation in High-Stakes Cond.', us: true, competitor1: false, competitor2: false },
      { feature: 'Compounding System Advantage', us: true, competitor1: false, competitor2: true },
      { feature: 'Deep Media/Product Fit', us: true, competitor1: false, competitor2: true },
      { feature: 'Hands-on Leadership', us: true, competitor1: false, competitor2: true },
      { feature: 'Real-World Outcomes', us: true, competitor1: true, competitor2: true }
    ]
  },

  solution: {
    description: 'Our services are delivered through seven interconnected strategic verticals that form a compounding business ecosystem, providing clients with a single, authoritative partner for AI-powered media transformation.',
    features: [
      {
        name: '1. Consulting',
        description: 'Media strategy & digital transformation advisory.',
        capabilities: ['White-label strategic consulting', 'Crisis navigation', 'Scenario planning', 'Digital roadmaps'],
        revenue: '$200K-500K/yr'
      },
      {
        name: '2. Technology',
        description: 'AI content systems & automation workflows for newsrooms.',
        capabilities: ['SaaS with prompt kits', 'Automation workflows', 'High-margin, scalable solutions', 'Recurring revenue model'],
        revenue: '$50K-200K/mo'
      },
      {
        name: '3. Content',
        description: 'Premium video & branded content production.',
        capabilities: ['Investor-grade video', 'AI-enhanced production', 'Premium client positioning', 'Project-based revenue'],
        revenue: '$100K-300K/proj'
      },
      {
        name: '4. Training',
        description: 'Executive education & leadership certification for the next generation of media leaders.',
        capabilities: ['Executive training programs', 'AI integration curriculum', 'Thought leadership', 'Lead generation'],
        revenue: '$5K-15K/seat'
      }
    ],
    techStack: [
      { layer: 'Analytics Platform', technologies: ['Global Media Intelligence', 'Subscription model', 'Scalable base', 'Strategic insights'] },
      { layer: 'Thought Leadership', technologies: ['Keynotes & appearances', 'Authority building', 'Lead generation across verticals', 'Consulting Crossover'] },
      { layer: 'Premium Video Studio', technologies: ['Investor-grade production', 'AI-enhanced workflows', 'Fortune 500 client focus', 'Data Flywheel Input'] }
    ]
  },

  business: {
    revenueStreams: [
      {
        stream: 'Fractional C-Suite Advisory',
        model: 'High-margin strategic consulting',
        pricing: '$200K-$500K per year',
        margin: 'High',
        split: 'Consulting'
      },
      {
        stream: 'Content Systems (SaaS)',
        model: 'Recurring revenue from tech solutions',
        pricing: '$50K-$200K per month',
        margin: 'High',
        split: 'Technology'
      },
      {
        stream: 'Premium Studio Projects',
        model: 'Investor-grade video & branded content',
        pricing: '$100K-$300K per project',
        margin: 'High',
        split: 'Content'
      },
       {
        stream: 'Analytics Platform',
        model: 'Scalable subscription model',
        pricing: '$50-$500 per month',
        margin: 'High',
        split: 'Analytics'
      }
    ],
    pricingTiers: [
      {
        tier: 'Advisory',
        price: '$200K+/year',
        target: 'Legacy Media, Fortune 500',
        includes: ['Strategic consulting', 'Implementation', 'Natural upsell pathways to other verticals']
      },
      {
        tier: 'Technology',
        price: '$50K+/month',
        target: 'Newsrooms',
        includes: ['Prompt kits', 'Automation workflows', 'Scalable SaaS solutions']
      },
      {
        tier: 'Training',
        price: '$5K+/participant',
        target: 'Next-gen media leaders',
        includes: ['Executive training', 'Certification', 'AI Integration workshops']
      }
    ],
    unitEconomics: {
      arr: '$2M - $10M+',
      cac: 'Low (Network-based)',
      ltv: 'High (Ecosystem)',
      payback: 'Varies'
    }
  },

  gtm: {
    phases: [
      {
        name: 'The Flywheel Effect',
        duration: 'Continuous',
        target: 'All Verticals',
        channels: 'Cross-selling & Authority Building',
        offer: 'Integrated solutions',
        focus: 'Each vertical amplifies the others in a continuous feedback loop.'
      },
      {
        name: 'Data Flywheel',
        duration: 'Continuous',
        target: 'Consulting & Speaking',
        channels: 'Platform Insights',
        offer: 'Data-informed strategies',
        focus: 'Platform insights inform consulting strategies and speaking topics.'
      }
    ],
    channels: [
      { channel: 'Consulting Clients', investment: 'Cross-sell', roi: 'High', timeframe: 'Immediate' },
      { channel: 'Thought Leadership', investment: 'Authority', roi: 'High', timeframe: 'Ongoing' },
      { channel: 'Platform Insights', investment: 'Data', roi: 'High', timeframe: 'Ongoing' },
      { channel: 'Natural Upsell Pathways', investment: 'Relationships', roi: 'High', timeframe: '3-6 months' }
    ],
    salesProcess: [
      { stage: 'Consulting', duration: 'Entry', conversion: 'High' },
      { stage: 'Cross-Sell', duration: 'Upsell', conversion: 'High' },
      { stage: 'Tech/Content', duration: 'Synergy', conversion: 'High' },
      { stage: 'Training', duration: 'Synergy', conversion: 'High' },
      { stage: 'Data Loop', duration: 'Ongoing', conversion: 'High' },
      { stage: 'Authority', duration: 'Lead Gen', conversion: 'High' }
    ],
    partnerships: [
      { partner: 'Co-Founder & Strategic Advisor', value: '3 decades media leadership (Bloomberg)', type: 'Leadership' },
      { partner: 'Co-Founder & Managing Director', value: '27 years at CNBC, NBC News', type: 'Leadership' },
      { partner: 'Strategic Clients', value: 'NYSE, Fortune 500, Global Investors', type: 'Clientele' },
      { partner: 'The New Building', value: 'Strategic advisory on content & comms', type: 'Network' }
    ]
  },

  financial: {
    years: {
      1: {
        revenue: '$2M+',
        clients: 'Varies',
        arr: 'Varies',
        margin: 'High',
        team: 'Founders + Contractors',
        milestones: ['Launch fractional C-Suite advisory', 'Develop initial AI content prototypes', 'Secure 2-3 speaking engagements']
      },
      2: {
        revenue: '$5M+',
        clients: 'Varies',
        arr: 'Varies',
        margin: 'High',
        team: 'Expansion',
        milestones: ['Launch Analytics platform', 'Onboard beta subscribers', 'Develop Media Leadership Academy']
      },
      3: {
        revenue: '$10M+',
        clients: 'Varies',
        arr: 'Varies',
        margin: 'High',
        team: 'Scaling',
        milestones: ['Scale recurring revenue streams', 'Expand premium studio', 'Drive ecosystem flywheel growth']
      }
    },
    revenueBreakdown: [
      { stream: 'Consulting', y1: 40, y2: 30, y3: 25 },
      { stream: 'Technology (SaaS)', y1: 20, y2: 30, y3: 35 },
      { stream: 'Other Verticals', y1: 40, y2: 40, y3: 40 }
    ],
    costs: [
      { category: 'Consulting Revenue', percent: 'Reinvests into platform' },
      { category: 'Speaking Engagements', percent: 'Generate leads for all lines' },
      { category: 'Data Insights', percent: 'Inform advisory services' },
      { category: 'High-margin services', percent: 'Fund scalable tech' },
      { category: 'Cross-selling', percent: 'Lowers CAC' }
    ],
    funding: {
      amount: 'Self-Funded / Reinvestment',
      uses: [
        { use: 'Consulting revenue reinvests into platform and education', amount: '' },
        { use: 'Each vertical amplifies the others in a continuous feedback loop', amount: '' }
      ]
    },
    keyMetrics: {
      currentARR: '$0 (Pre-Launch)',
      projectedARR: '$10M+',
      ltv: '$1M+'
    }
  },

  roadmap: {
    launch: [
      {
        month: 'Phase 1: Foundation (Next 90 Days)',
        focus: 'Launch Advisory, Develop AI Content, Secure Speaking',
        tasks: ['Launch fractional C-Suite advisory via existing network', 'Develop initial AI content system prototypes', 'Secure first 2-3 speaking engagements for lead generation', 'Build consulting client pipeline']
      },
      {
        month: 'Phase 2: Scale (Months 4-12)',
        focus: 'Launch Analytics, Expand Studio, Develop Curriculum',
        tasks: ['Launch Global Media Intelligence analytics platform', 'Onboard beta subscribers to subscription services', 'Expand premium studio capabilities and client base', 'Develop Media Leadership Academy curriculum', 'Scale recurring revenue streams']
      },
      {
        month: 'Phase 3: Flywheel Growth',
        focus: 'Drive Ecosystem Synergies',
        tasks: ['Consulting revenue reinvests into platform and education', 'Speaking engagements generate leads for all business lines', 'Data insights from platform inform advisory services']
      }
    ],
    productRoadmap: [
      { quarter: 'Phase 1', items: ['Fractional C-Suite Advisory', 'AI Content Prototypes', 'Speaking Engagements'] },
      { quarter: 'Phase 2', items: ['Analytics Platform Launch', 'Studio Expansion', 'Leadership Curriculum'] },
      { quarter: 'Phase 3+', items: ['Ecosystem Cross-Sell', 'Flywheel Growth', 'Recurring Revenue Scaling'] },
      { quarter: 'Long-Term', items: ['Market Leadership', 'Infrastructure for Influence', 'Compound Growth'] }
    ],
    teamBuilding: [
      { department: 'Leadership', hires: { y1: 2, y2: 2, y3: 2 }, key: ['Co-Founder & Strategic Advisor', 'Co-Founder & Managing Director'] },
      { department: 'Advisory & Sales', hires: { y1: 0, y2: 2, y3: 5 }, key: ['Principal Consultants', 'Growth Leads'] },
      { department: 'Product & Tech', hires: { y1: 0, y2: 3, y3: 8 }, key: ['Platform Developers', 'AI/ML Engineers'] }
    ],
    kpis: [
      { metric: 'Cross-Selling Rate', target: 'High' },
      { metric: 'Recurring Revenue', target: '$2M - $10M+' },
      { metric: 'Client Retention', target: '> 85%' },
      { metric: 'Data Flywheel Velocity', target: 'Increasing' },
      { metric: 'Thought Leadership Reach', target: 'Tier 1' },
      { metric: 'Ecosystem Growth', target: 'Compounding' }
    ]
  },

  risks: [
    {
      risk: 'Competitive Moat',
      level: 'Low',
      description: 'Our competitive moat is built on unique founder trust, deep relationships, and access that is impossible for competitors to replicate.',
      mitigation: [
        'No other founder set brings 50+ years of trust across these ecosystems',
        'Deep relationships opening doors from NYSE to global C-suites',
        'Institutional trust is our core asset'
      ]
    },
    {
      risk: 'Execution Risk',
      level: 'Medium',
      description: 'Scaling multiple business lines simultaneously requires significant management focus and operational excellence.',
      mitigation: [
        'Principal-led engagement on all key projects',
        'Phased rollout of new verticals based on market traction',
        'Focus on hiring experienced operators for key roles'
      ]
    }
  ],

  successFactors: [
    { factor: 'Founder Reputation & Network', description: 'Unparalleled access and trust within target markets.' },
    { factor: 'Ecosystem Flywheel', description: 'Synergistic business model where each vertical strengthens the others.' },
    { factor: 'First-Mover in AI Media', description: 'Leading the integration of AI for high-stakes media and communications.' }
  ]
};

// --- HOOKS ---

const usePrevious = <T,>(value: T): T | undefined => {
  const ref = useRef<T>();
  // FIX: Added [value] to the dependency array. The useEffect should only run when the value it tracks changes.
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};


// --- UI COMPONENTS ---

const CollapsibleSection: FC<{ title: string; icon: React.FC<{className?: string}>; children: React.ReactNode }> = ({ title, icon: Icon, children }) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <section className="mb-8 bg-white rounded-xl shadow-md overflow-hidden">
      <button
        className="w-full p-6 text-left flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <div className="flex items-center">
          <Icon className="w-8 h-8 mr-4 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        </div>
        {isOpen ? <ChevronDown className="w-6 h-6 text-gray-500" /> : <ChevronRight className="w-6 h-6 text-gray-500" />}
      </button>
      {isOpen && <div className="p-6 border-t">{children}</div>}
    </section>
  );
};

const AddButton: FC<{ onClick: () => void; text: string }> = ({ onClick, text }) => (
  <button
    onClick={onClick}
    className="mt-3 flex items-center text-sm text-blue-600 hover:text-blue-800 font-medium"
  >
    <Plus className="w-4 h-4 mr-1" />
    {text}
  </button>
);

const RemoveButton: FC<{ onClick: () => void; ariaLabel: string, className?: string }> = ({ onClick, ariaLabel, className }) => (
  <button
    onClick={onClick}
    className={`text-red-500 hover:text-red-700 ${className}`}
    aria-label={ariaLabel}
  >
    <Trash2 className="w-4 h-4" />
  </button>
);


const ExecutiveSection: FC<{ data: ExecutiveSectionType; setData: (data: ExecutiveSectionType) => void; editMode: boolean }> = ({ data, setData, editMode }) => {
  const problemsContainerRef = useRef<HTMLDivElement>(null);
  const advantagesContainerRef = useRef<HTMLDivElement>(null);
  const prevProblemsLength = usePrevious(data.problems.length);
  const prevAdvantagesLength = usePrevious(data.advantages.length);

  useEffect(() => {
    if (editMode && prevProblemsLength !== undefined && prevProblemsLength < data.problems.length && problemsContainerRef.current) {
      const lastProblemEl = problemsContainerRef.current.lastElementChild as HTMLElement;
      const inputToFocus = lastProblemEl?.querySelector('input[type="text"], textarea') as HTMLInputElement | HTMLTextAreaElement;
      if (inputToFocus) {
        inputToFocus.focus();
        inputToFocus.select();
      }
    }
  }, [data.problems.length, editMode, prevProblemsLength]);
  
  useEffect(() => {
    if (editMode && prevAdvantagesLength !== undefined && prevAdvantagesLength < data.advantages.length && advantagesContainerRef.current) {
      const lastAdvantageEl = advantagesContainerRef.current.lastElementChild as HTMLElement;
      const inputToFocus = lastAdvantageEl?.querySelector('input[type="text"], textarea') as HTMLInputElement | HTMLTextAreaElement;
      if (inputToFocus) {
        inputToFocus.focus();
        inputToFocus.select();
      }
    }
  }, [data.advantages.length, editMode, prevAdvantagesLength]);

  const handleProblemChange = (index: number, field: keyof ExecutiveProblem, value: string) => {
    const newProblems = [...data.problems];
    newProblems[index] = { ...newProblems[index], [field]: value };
    setData({ ...data, problems: newProblems });
  };
  const handleAddProblem = () => setData({ ...data, problems: [...data.problems, { title: 'New Problem', description: 'Description' }] });
  const handleRemoveProblem = (index: number) => setData({ ...data, problems: data.problems.filter((_, i) => i !== index) });

  const handleAdvantageChange = (index: number, field: keyof ExecutiveAdvantage, value: string) => {
    const newAdvantages = [...data.advantages];
    newAdvantages[index] = { ...newAdvantages[index], [field]: value };
    setData({ ...data, advantages: newAdvantages });
  };
  const handleAddAdvantage = () => setData({ ...data, advantages: [...data.advantages, { metric: 'New Metric', description: 'Description' }] });
  const handleRemoveAdvantage = (index: number) => setData({ ...data, advantages: data.advantages.filter((_, i) => i !== index) });
  
  return (
    <CollapsibleSection title="Executive Summary" icon={Zap}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="p-4 bg-gray-50 rounded-lg"><label className="text-sm font-medium text-gray-500 block">Market Size</label><EditableText value={data.marketSize} onChange={v => setData({...data, marketSize: v})} editMode={editMode} className="text-xl font-semibold"/></div>
            <div className="p-4 bg-gray-50 rounded-lg"><label className="text-sm font-medium text-gray-500 block">Year 3 Revenue</label><EditableText value={data.yearThreeRevenue} onChange={v => setData({...data, yearThreeRevenue: v})} editMode={editMode} className="text-xl font-semibold"/></div>
            <div className="p-4 bg-gray-50 rounded-lg"><label className="text-sm font-medium text-gray-500 block">Unique Value Proposition</label><EditableText value={data.uniqueValue} onChange={v => setData({...data, uniqueValue: v})} editMode={editMode} className="text-xl font-semibold"/></div>
        </div>

        <h3 className="text-xl font-semibold mb-2">Problem</h3>
        <div ref={problemsContainerRef} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {data.problems.map((p, i) => (
                <div key={i} className="p-4 border rounded-lg group relative">
                    <EditableText value={p.title} onChange={v => handleProblemChange(i, 'title', v)} editMode={editMode} className="font-bold block mb-1"/>
                    <EditableText value={p.description} onChange={v => handleProblemChange(i, 'description', v)} editMode={editMode} multiline/>
                    {editMode && <RemoveButton onClick={() => handleRemoveProblem(i)} ariaLabel='Remove problem' className='absolute top-2 right-2 p-1 bg-white rounded-full hover:bg-red-100 opacity-0 group-hover:opacity-100 transition-opacity' />}
                </div>
            ))}
        </div>
        {editMode && <AddButton onClick={handleAddProblem} text="Add Problem" />}

        <h3 className="text-xl font-semibold mb-2 mt-6">Solution</h3>
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg mb-6">
            <EditableText value={data.solution} onChange={v => setData({...data, solution: v})} editMode={editMode} multiline/>
        </div>

        <h3 className="text-xl font-semibold mb-2">Unfair Advantages</h3>
        <div ref={advantagesContainerRef} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {data.advantages.map((a, i) => (
                <div key={i} className="p-4 border rounded-lg group relative">
                    <EditableText value={a.metric} onChange={v => handleAdvantageChange(i, 'metric', v)} editMode={editMode} className="text-2xl font-bold text-blue-600 block"/>
                    <EditableText value={a.description} onChange={v => handleAdvantageChange(i, 'description', v)} editMode={editMode} multiline/>
                    {editMode && <RemoveButton onClick={() => handleRemoveAdvantage(i)} ariaLabel='Remove advantage' className='absolute top-2 right-2 p-1 bg-white rounded-full hover:bg-red-100 opacity-0 group-hover:opacity-100 transition-opacity' />}
                </div>
            ))}
        </div>
        {editMode && <AddButton onClick={handleAddAdvantage} text="Add Advantage" />}
    </CollapsibleSection>
  );
};

const OpportunitySection: FC<{ data: OpportunitySectionType; setData: (data: OpportunitySectionType) => void; editMode: boolean }> = ({ data, setData, editMode }) => {
  const handleArrayChange = <K extends keyof OpportunitySectionType>(field: K, index: number, value: OpportunitySectionType[K][number]) => {
    const newArray = [...(data[field] as any[])];
    newArray[index] = value;
    setData({ ...data, [field]: newArray });
  };
  const handleAdd = <K extends keyof OpportunitySectionType>(field: K, newItem: OpportunitySectionType[K][number]) => {
    setData({ ...data, [field]: [...(data[field] as any[]), newItem] });
  };
  const handleRemove = <K extends keyof OpportunitySectionType>(field: K, index: number) => {
    setData({ ...data, [field]: (data[field] as any[]).filter((_, i) => i !== index) });
  };

  const CheckboxDisplay: FC<{ checked: boolean; editMode: boolean; onChange: (checked: boolean) => void }> = ({ checked, editMode, onChange }) => {
    if (editMode) return <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} className="form-checkbox h-5 w-5 text-blue-600" />;
    return checked ? <span className="text-green-500 font-bold text-xl">✓</span> : <span className="text-red-500 text-xl">✗</span>;
  }
  return (
    <CollapsibleSection title="Market Opportunity" icon={TrendingUp}>
      <h3 className="text-xl font-semibold mb-4">Market Overview</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="p-4 bg-gray-50 rounded-lg"><label className="text-sm text-gray-500 block">Market Size</label><EditableText value={data.marketSize} onChange={v => setData({...data, marketSize: v})} editMode={editMode} className="text-lg font-bold"/></div>
        <div className="p-4 bg-gray-50 rounded-lg"><label className="text-sm text-gray-500 block">Market Growth (CAGR)</label><EditableText value={data.marketGrowth} onChange={v => setData({...data, marketGrowth: v})} editMode={editMode} className="text-lg font-bold"/></div>
        <div className="p-4 bg-gray-50 rounded-lg"><label className="text-sm text-gray-500 block">Target %</label><EditableText value={data.targetPercent} onChange={v => setData({...data, targetPercent: v})} editMode={editMode} className="text-lg font-bold"/></div>
        <div className="p-4 bg-gray-50 rounded-lg col-span-2 md:col-span-4"><label className="text-sm text-gray-500 block">Target Description</label><EditableText value={data.targetDescription} onChange={v => setData({...data, targetDescription: v})} editMode={editMode} multiline className="text-lg"/></div>
      </div>
      
      <h3 className="text-xl font-semibold mb-4">Growth Drivers</h3>
      <div className="flex flex-wrap gap-3 mb-8">
        {data.growthDrivers.map((driver, i) => (
          <div key={i} className="flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
            <EditableText value={driver} onChange={v => handleArrayChange('growthDrivers', i, v)} editMode={editMode} />
            {editMode && <RemoveButton onClick={() => handleRemove('growthDrivers', i)} ariaLabel='Remove driver' />}
          </div>
        ))}
        {editMode && <AddButton onClick={() => handleAdd('growthDrivers', 'New Driver')} text="Add Driver" />}
      </div>
      
      <h3 className="text-xl font-semibold mb-4">Customer Segments</h3>
      <div className="overflow-x-auto mb-2">
        <div className="min-w-full bg-white rounded-lg shadow">
          <div className="grid grid-cols-5 p-4 font-bold bg-gray-50 text-left"><div>Segment</div><div>Size</div><div>ARR</div><div>Priority</div>{editMode && <div>Action</div>}</div>
          {data.customerSegments.map((s, i) => (
            <div key={i} className="grid grid-cols-5 p-4 border-t items-center">
              <div><EditableText value={s.segment} onChange={v => handleArrayChange('customerSegments', i, {...s, segment: v})} editMode={editMode}/></div>
              <div><EditableText value={s.size} onChange={v => handleArrayChange('customerSegments', i, {...s, size: v})} editMode={editMode}/></div>
              <div><EditableText value={s.arr} onChange={v => handleArrayChange('customerSegments', i, {...s, arr: v})} editMode={editMode}/></div>
              <div><EditableText value={s.priority} onChange={v => handleArrayChange('customerSegments', i, {...s, priority: v})} editMode={editMode}/></div>
              {editMode && <div><RemoveButton onClick={() => handleRemove('customerSegments', i)} ariaLabel='Remove segment' /></div>}
            </div>
          ))}
        </div>
      </div>
      {editMode && <AddButton onClick={() => handleAdd('customerSegments', { segment: 'New Segment', size: '', arr: '', priority: '' })} text="Add Segment" />}


      <h3 className="text-xl font-semibold mb-4 mt-8">Competitive Advantages</h3>
      <div className="overflow-x-auto mb-2">
        <div className="min-w-full bg-white rounded-lg shadow">
          <div className="grid grid-cols-5 p-4 font-bold bg-gray-50 text-center"><div>Feature</div><div>Us</div><div>Competitor 1</div><div>Competitor 2</div>{editMode && <div>Action</div>}</div>
          {data.competitiveAdvantages.map((a, i) => (
            <div key={i} className="grid grid-cols-5 p-4 border-t items-center text-center">
              <div className="text-left"><EditableText value={a.feature} onChange={v => handleArrayChange('competitiveAdvantages', i, {...a, feature: v})} editMode={editMode}/></div>
              <div><CheckboxDisplay checked={a.us} editMode={editMode} onChange={v => handleArrayChange('competitiveAdvantages', i, {...a, us: v})} /></div>
              <div><CheckboxDisplay checked={a.competitor1} editMode={editMode} onChange={v => handleArrayChange('competitiveAdvantages', i, {...a, competitor1: v})} /></div>
              <div><CheckboxDisplay checked={a.competitor2} editMode={editMode} onChange={v => handleArrayChange('competitiveAdvantages', i, {...a, competitor2: v})} /></div>
              {editMode && <div><RemoveButton onClick={() => handleRemove('competitiveAdvantages', i)} ariaLabel='Remove advantage' /></div>}
            </div>
          ))}
        </div>
      </div>
      {editMode && <AddButton onClick={() => handleAdd('competitiveAdvantages', { feature: 'New Feature', us: false, competitor1: false, competitor2: false })} text="Add Advantage" />}

    </CollapsibleSection>
  );
};

const SolutionSection: FC<{ data: SolutionSectionType; setData: (data: SolutionSectionType) => void; editMode: boolean }> = ({ data, setData, editMode }) => {
  const handleFeatureChange = <K extends keyof SolutionFeature>(index: number, field: K, value: SolutionFeature[K]) => {
    const newFeatures = [...data.features];
    newFeatures[index] = { ...newFeatures[index], [field]: value };
    setData({ ...data, features: newFeatures });
  };
  const handleAddFeature = () => setData({ ...data, features: [...data.features, { name: 'New Feature', description: '', capabilities: [], revenue: '' }] });
  const handleRemoveFeature = (index: number) => setData({ ...data, features: data.features.filter((_, i) => i !== index) });

  const handleCapabilityChange = (featureIndex: number, capIndex: number, value: string) => {
    const newFeatures = [...data.features];
    const newCaps = [...newFeatures[featureIndex].capabilities];
    newCaps[capIndex] = value;
    newFeatures[featureIndex] = {...newFeatures[featureIndex], capabilities: newCaps};
    setData({...data, features: newFeatures});
  };
  const handleAddCapability = (featureIndex: number) => {
    const newFeatures = [...data.features];
    newFeatures[featureIndex].capabilities.push('New Capability');
    setData({ ...data, features: newFeatures });
  };
  const handleRemoveCapability = (featureIndex: number, capIndex: number) => {
    const newFeatures = [...data.features];
    newFeatures[featureIndex].capabilities = newFeatures[featureIndex].capabilities.filter((_, i) => i !== capIndex);
    setData({ ...data, features: newFeatures });
  };
  
  return (
    <CollapsibleSection title="Solution & Technology" icon={Lightbulb}>
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg mb-8">
        <EditableText value={data.description} onChange={v => setData({...data, description: v})} editMode={editMode} multiline/>
      </div>
      <h3 className="text-xl font-semibold mb-4">Core Features / Verticals</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-2">
        {data.features.map((f, i) => (
          <div key={i} className="p-4 border rounded-lg bg-white shadow-sm group relative">
            <EditableText value={f.name} onChange={v => handleFeatureChange(i, 'name', v)} editMode={editMode} className="text-lg font-bold text-blue-700 block"/>
            <EditableText value={f.description} onChange={v => handleFeatureChange(i, 'description', v)} editMode={editMode} multiline className="text-gray-600 my-2"/>
            <div className="text-sm text-gray-500 my-2">Capabilities:</div>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              {f.capabilities.map((cap, capI) => (
                <li key={capI} className='flex items-center gap-2'>
                  <EditableText value={cap} onChange={v => handleCapabilityChange(i, capI, v)} editMode={editMode} className='flex-grow'/>
                  {editMode && <RemoveButton onClick={() => handleRemoveCapability(i, capI)} ariaLabel='Remove capability' />}
                </li>
              ))}
            </ul>
            {editMode && <AddButton onClick={() => handleAddCapability(i)} text='Add Capability' />}
            <div className="mt-4 pt-2 border-t">
              <span className="text-sm font-semibold text-gray-500">Revenue: </span>
              <EditableText value={f.revenue} onChange={v => handleFeatureChange(i, 'revenue', v)} editMode={editMode} className="font-bold"/>
            </div>
            {editMode && <RemoveButton onClick={() => handleRemoveFeature(i)} ariaLabel='Remove feature' className='absolute top-2 right-2 p-1 bg-white rounded-full hover:bg-red-100 opacity-0 group-hover:opacity-100 transition-opacity' />}
          </div>
        ))}
      </div>
      {editMode && <AddButton onClick={handleAddFeature} text="Add Feature" />}

      <h3 className="text-xl font-semibold mb-4 mt-8">Technology Stack</h3>
      <div className="space-y-4">
        {data.techStack.map((t, i) => (
          <div key={i} className="p-4 border rounded-lg">
            <h4 className="font-bold"><EditableText value={t.layer} onChange={v => { const c = [...data.techStack]; c[i].layer = v; setData({...data, techStack: c}); }} editMode={editMode}/></h4>
            <div className="flex flex-wrap gap-2 mt-2">
              {t.technologies.map((tech, techI) => (
                <span key={techI} className="bg-gray-200 text-gray-800 text-xs font-semibold px-2.5 py-0.5 rounded-full"><EditableText value={tech} onChange={v => { const c = [...data.techStack]; c[i].technologies[techI] = v; setData({...data, techStack: c}); }} editMode={editMode}/></span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </CollapsibleSection>
  );
};

const BusinessSection: FC<{ data: BusinessSectionType; setData: (data: BusinessSectionType) => void; editMode: boolean }> = ({ data, setData, editMode }) => {
  const handleStreamChange = (index: number, field: keyof RevenueStream, value: string) => {
    const streams = [...data.revenueStreams];
    streams[index] = {...streams[index], [field]: value};
    setData({...data, revenueStreams: streams});
  };
  const handleAddStream = () => setData({...data, revenueStreams: [...data.revenueStreams, {stream: 'New Stream', model: '', pricing: '', margin: '', split: ''}]});
  const handleRemoveStream = (index: number) => setData({...data, revenueStreams: data.revenueStreams.filter((_, i) => i !== index)});

  const handleTierChange = (index: number, field: keyof PricingTier, value: any) => {
    const tiers = [...data.pricingTiers];
    tiers[index] = {...tiers[index], [field]: value};
    setData({...data, pricingTiers: tiers});
  };
  const handleAddTier = () => setData({...data, pricingTiers: [...data.pricingTiers, {tier: 'New Tier', price: '', target: '', includes: []}]});
  const handleRemoveTier = (index: number) => setData({...data, pricingTiers: data.pricingTiers.filter((_, i) => i !== index)});

  const handleIncludeChange = (tierIndex: number, includeIndex: number, value: string) => {
    const tiers = [...data.pricingTiers];
    const includes = [...tiers[tierIndex].includes];
    includes[includeIndex] = value;
    tiers[tierIndex] = {...tiers[tierIndex], includes};
    setData({...data, pricingTiers: tiers});
  };
  const handleAddInclude = (tierIndex: number) => {
    const tiers = [...data.pricingTiers];
    tiers[tierIndex].includes.push('New Feature');
    setData({...data, pricingTiers: tiers});
  };
  const handleRemoveInclude = (tierIndex: number, includeIndex: number) => {
    const tiers = [...data.pricingTiers];
    tiers[tierIndex].includes = tiers[tierIndex].includes.filter((_, i) => i !== includeIndex);
    setData({...data, pricingTiers: tiers});
  };


  return (
    <CollapsibleSection title="Business Model" icon={DollarSign}>
      <h3 className="text-xl font-semibold mb-4">Revenue Streams</h3>
      <div className="overflow-x-auto mb-2">
        <div className="min-w-full bg-white rounded-lg shadow">
          <div className="grid grid-cols-6 p-4 font-bold bg-gray-50"><div>Stream</div><div>Model</div><div>Pricing</div><div>Margin</div><div>Split</div>{editMode && <div>Action</div>}</div>
          {data.revenueStreams.map((s, i) => (
            <div key={i} className="grid grid-cols-6 p-4 border-t items-center">
              <div><EditableText value={s.stream} onChange={v => handleStreamChange(i, 'stream', v)} editMode={editMode}/></div>
              <div><EditableText value={s.model} onChange={v => handleStreamChange(i, 'model', v)} editMode={editMode}/></div>
              <div><EditableText value={s.pricing} onChange={v => handleStreamChange(i, 'pricing', v)} editMode={editMode}/></div>
              <div><EditableText value={s.margin} onChange={v => handleStreamChange(i, 'margin', v)} editMode={editMode}/></div>
              <div><EditableText value={s.split} onChange={v => handleStreamChange(i, 'split', v)} editMode={editMode}/></div>
              {editMode && <div><RemoveButton onClick={() => handleRemoveStream(i)} ariaLabel='Remove stream'/></div>}
            </div>
          ))}
        </div>
      </div>
      {editMode && <AddButton onClick={handleAddStream} text="Add Revenue Stream"/>}

      <h3 className="text-xl font-semibold mb-4 mt-8">Pricing Tiers</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-2">
        {data.pricingTiers.map((t, i) => (
          <div key={i} className="p-4 border rounded-lg bg-white shadow-sm flex flex-col group relative">
            <EditableText value={t.tier} onChange={v => handleTierChange(i, 'tier', v)} editMode={editMode} className="text-lg font-bold text-center text-blue-700"/>
            <EditableText value={t.price} onChange={v => handleTierChange(i, 'price', v)} editMode={editMode} className="text-2xl font-bold text-center my-2"/>
            <EditableText value={t.target} onChange={v => handleTierChange(i, 'target', v)} editMode={editMode} className="text-sm text-gray-500 text-center mb-4"/>
            <ul className="list-disc list-inside text-sm flex-grow space-y-1">
              {t.includes.map((item, itemI) => (
                <li key={itemI} className='flex items-center gap-2'>
                  <EditableText value={item} onChange={v => handleIncludeChange(i, itemI, v)} editMode={editMode} className='flex-grow'/>
                  {editMode && <RemoveButton onClick={() => handleRemoveInclude(i, itemI)} ariaLabel='Remove feature'/>}
                </li>
              ))}
            </ul>
            {editMode && <AddButton onClick={() => handleAddInclude(i)} text="Add Feature"/>}
            {editMode && <RemoveButton onClick={() => handleRemoveTier(i)} ariaLabel='Remove tier' className='absolute top-2 right-2 p-1 bg-white rounded-full hover:bg-red-100 opacity-0 group-hover:opacity-100 transition-opacity' />}
          </div>
        ))}
      </div>
      {editMode && <AddButton onClick={handleAddTier} text="Add Pricing Tier"/>}

      <h3 className="text-xl font-semibold mb-4 mt-8">Unit Economics</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-gray-50 rounded-lg"><label className="text-sm text-gray-500 block">ARR</label><EditableText value={data.unitEconomics.arr} onChange={v => setData({...data, unitEconomics: {...data.unitEconomics, arr: v}})} editMode={editMode} className="text-lg font-bold"/></div>
        <div className="p-4 bg-gray-50 rounded-lg"><label className="text-sm text-gray-500 block">CAC</label><EditableText value={data.unitEconomics.cac} onChange={v => setData({...data, unitEconomics: {...data.unitEconomics, cac: v}})} editMode={editMode} className="text-lg font-bold"/></div>
        <div className="p-4 bg-gray-50 rounded-lg"><label className="text-sm text-gray-500 block">LTV</label><EditableText value={data.unitEconomics.ltv} onChange={v => setData({...data, unitEconomics: {...data.unitEconomics, ltv: v}})} editMode={editMode} className="text-lg font-bold"/></div>
        <div className="p-4 bg-gray-50 rounded-lg"><label className="text-sm text-gray-500 block">Payback Period</label><EditableText value={data.unitEconomics.payback} onChange={v => setData({...data, unitEconomics: {...data.unitEconomics, payback: v}})} editMode={editMode} className="text-lg font-bold"/></div>
      </div>
    </CollapsibleSection>
  );
};

const GTMSection: FC<{ data: GTMSectionType; setData: (data: GTMSectionType) => void; editMode: boolean }> = ({ data, setData, editMode }) => {
  const handleArrayChange = <K extends keyof GTMSectionType, T>(field: K, index: number, value: T) => {
    const newArray = [...(data[field] as any[])];
    newArray[index] = value;
    setData({ ...data, [field]: newArray });
  };
  const handleAdd = <K extends keyof GTMSectionType, T>(field: K, newItem: T) => {
    setData({ ...data, [field]: [...(data[field] as any[]), newItem] });
  };
  const handleRemove = <K extends keyof GTMSectionType>(field: K, index: number) => {
    setData({ ...data, [field]: (data[field] as any[]).filter((_, i) => i !== index) });
  };

  return (
    <CollapsibleSection title="Go-To-Market Strategy" icon={Target}>
      <h3 className="text-xl font-semibold mb-4">Phases</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-2">
        {data.phases.map((p, i) => (
          <div key={i} className="p-4 border rounded-lg group relative">
            <h4 className="font-bold text-lg"><EditableText value={p.name} onChange={v => handleArrayChange('phases', i, {...p, name:v})} editMode={editMode}/></h4>
            <div className="text-sm text-gray-500 mb-2"><EditableText value={p.duration} onChange={v => handleArrayChange('phases', i, {...p, duration:v})} editMode={editMode}/></div>
            <p><EditableText value={p.focus} onChange={v => handleArrayChange('phases', i, {...p, focus:v})} editMode={editMode} multiline/></p>
            {editMode && <RemoveButton onClick={() => handleRemove('phases', i)} ariaLabel='Remove phase' className='absolute top-2 right-2 p-1 bg-white rounded-full hover:bg-red-100 opacity-0 group-hover:opacity-100 transition-opacity' />}
          </div>
        ))}
      </div>
      {editMode && <AddButton onClick={() => handleAdd('phases', {name: 'New Phase', duration: '', target: '', channels: '', offer: '', focus: ''})} text='Add Phase' />}
      
      <h3 className="text-xl font-semibold mb-4 mt-8">Channels</h3>
      <div className="overflow-x-auto mb-2">
        <div className="min-w-full bg-white rounded-lg shadow">
          <div className="grid grid-cols-5 p-4 font-bold bg-gray-50"><div>Channel</div><div>Investment</div><div>ROI</div><div>Timeframe</div>{editMode && <div>Action</div>}</div>
            {data.channels.map((c,i) => (
              <div key={i} className="grid grid-cols-5 p-4 border-t items-center">
                <div><EditableText value={c.channel} onChange={v => handleArrayChange('channels', i, {...c, channel: v})} editMode={editMode}/></div>
                <div><EditableText value={c.investment} onChange={v => handleArrayChange('channels', i, {...c, investment: v})} editMode={editMode}/></div>
                <div><EditableText value={c.roi} onChange={v => handleArrayChange('channels', i, {...c, roi: v})} editMode={editMode}/></div>
                <div><EditableText value={c.timeframe} onChange={v => handleArrayChange('channels', i, {...c, timeframe: v})} editMode={editMode}/></div>
                {editMode && <div><RemoveButton onClick={() => handleRemove('channels', i)} ariaLabel='Remove channel'/></div>}
              </div>
            ))}
        </div>
      </div>
      {editMode && <AddButton onClick={() => handleAdd('channels', {channel: 'New Channel', investment: '', roi: '', timeframe: ''})} text='Add Channel' />}
      
      <h3 className="text-xl font-semibold mb-4 mt-8">Sales Process</h3>
       <div className="overflow-x-auto mb-2">
        <div className="min-w-full bg-white rounded-lg shadow">
          <div className="grid grid-cols-4 p-4 font-bold bg-gray-50"><div>Stage</div><div>Duration</div><div>Conversion</div>{editMode && <div>Action</div>}</div>
            {data.salesProcess.map((s,i) => (
              <div key={i} className="grid grid-cols-4 p-4 border-t items-center">
                <div><EditableText value={s.stage} onChange={v => handleArrayChange('salesProcess', i, {...s, stage: v})} editMode={editMode}/></div>
                <div><EditableText value={s.duration} onChange={v => handleArrayChange('salesProcess', i, {...s, duration: v})} editMode={editMode}/></div>
                <div><EditableText value={s.conversion} onChange={v => handleArrayChange('salesProcess', i, {...s, conversion: v})} editMode={editMode}/></div>
                {editMode && <div><RemoveButton onClick={() => handleRemove('salesProcess', i)} ariaLabel='Remove stage'/></div>}
              </div>
            ))}
        </div>
      </div>
      {editMode && <AddButton onClick={() => handleAdd('salesProcess', {stage: 'New Stage', duration: '', conversion: ''})} text='Add Stage' />}

      <h3 className="text-xl font-semibold mb-4 mt-8">Partnerships</h3>
       <div className="overflow-x-auto mb-2">
        <div className="min-w-full bg-white rounded-lg shadow">
          <div className="grid grid-cols-4 p-4 font-bold bg-gray-50"><div>Partner</div><div>Value</div><div>Type</div>{editMode && <div>Action</div>}</div>
            {data.partnerships.map((p,i) => (
              <div key={i} className="grid grid-cols-4 p-4 border-t items-center">
                <div><EditableText value={p.partner} onChange={v => handleArrayChange('partnerships', i, {...p, partner: v})} editMode={editMode}/></div>
                <div><EditableText value={p.value} onChange={v => handleArrayChange('partnerships', i, {...p, value: v})} editMode={editMode}/></div>
                <div><EditableText value={p.type} onChange={v => handleArrayChange('partnerships', i, {...p, type: v})} editMode={editMode}/></div>
                {editMode && <div><RemoveButton onClick={() => handleRemove('partnerships', i)} ariaLabel='Remove partner'/></div>}
              </div>
            ))}
        </div>
      </div>
      {editMode && <AddButton onClick={() => handleAdd('partnerships', {partner: 'New Partner', value: '', type: ''})} text='Add Partner' />}
    </CollapsibleSection>
  );
};

const RoadmapSection: FC<{ data: RoadmapSectionType; setData: (data: RoadmapSectionType) => void; editMode: boolean }> = ({ data, setData, editMode }) => {
  const handleTaskChange = (phaseIndex: number, taskIndex: number, value: string) => {
    const newLaunch = [...data.launch];
    const newTasks = [...newLaunch[phaseIndex].tasks];
    newTasks[taskIndex] = value;
    newLaunch[phaseIndex] = {...newLaunch[phaseIndex], tasks: newTasks};
    setData({...data, launch: newLaunch});
  };
  const handleAddTask = (phaseIndex: number) => {
    const newLaunch = [...data.launch];
    newLaunch[phaseIndex].tasks.push('New Task');
    setData({...data, launch: newLaunch});
  };
  const handleRemoveTask = (phaseIndex: number, taskIndex: number) => {
    const newLaunch = [...data.launch];
    newLaunch[phaseIndex].tasks = newLaunch[phaseIndex].tasks.filter((_, i) => i !== taskIndex);
    setData({...data, launch: newLaunch});
  };

  const handleArrayChange = <K extends keyof RoadmapSectionType, T>(field: K, index: number, value: T) => {
    const newArray = [...(data[field] as any[])];
    newArray[index] = value;
    setData({ ...data, [field]: newArray });
  };
  const handleAdd = <K extends keyof RoadmapSectionType, T>(field: K, newItem: T) => {
    setData({ ...data, [field]: [...(data[field] as any[]), newItem] });
  };
  const handleRemove = <K extends keyof RoadmapSectionType>(field: K, index: number) => {
    setData({ ...data, [field]: (data[field] as any[]).filter((_, i) => i !== index) });
  };

  return (
    <CollapsibleSection title="Roadmap & Milestones" icon={Calendar}>
      <h3 className="text-xl font-semibold mb-4">Launch Plan</h3>
      <div className="space-y-4 mb-2">
        {data.launch.map((p, i) => (
          <div key={i} className="p-4 border rounded-lg group relative">
            <h4 className="font-bold"><EditableText value={p.month} onChange={v => handleArrayChange('launch', i, {...p, month:v})} editMode={editMode}/></h4>
            <div className="text-sm italic text-gray-600 mb-2"><EditableText value={p.focus} onChange={v => handleArrayChange('launch', i, {...p, focus:v})} editMode={editMode}/></div>
            <ul className="list-disc list-inside text-sm space-y-1">
              {p.tasks.map((t, tI) => (
                <li key={tI} className='flex items-center gap-2'>
                  <EditableText value={t} onChange={v => handleTaskChange(i, tI, v)} editMode={editMode} className='flex-grow'/>
                  {editMode && <RemoveButton onClick={() => handleRemoveTask(i, tI)} ariaLabel='Remove task'/>}
                </li>
              ))}
            </ul>
            {editMode && <AddButton onClick={() => handleAddTask(i)} text="Add Task" />}
            {editMode && <RemoveButton onClick={() => handleRemove('launch', i)} ariaLabel='Remove phase' className='absolute top-2 right-2 p-1 bg-white rounded-full hover:bg-red-100 opacity-0 group-hover:opacity-100 transition-opacity' />}
          </div>
        ))}
      </div>
      {editMode && <AddButton onClick={() => handleAdd('launch', {month: 'New Phase', focus: '', tasks: []})} text="Add Launch Phase" />}
      
      <h3 className="text-xl font-semibold mb-4 mt-8">Product Roadmap</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {data.productRoadmap.map((q, i) => (
          <div key={i} className="p-4 border rounded-lg">
            <h4 className="font-bold text-center"><EditableText value={q.quarter} onChange={v => handleArrayChange('productRoadmap', i, {...q, quarter:v})} editMode={editMode}/></h4>
            <ul className="list-disc list-inside text-sm mt-2">
              {q.items.map((item, itemI) => (
                <li key={itemI}><EditableText value={item} onChange={v => { const newItems = [...q.items]; newItems[itemI] = v; handleArrayChange('productRoadmap', i, {...q, items: newItems})}} editMode={editMode}/></li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <h3 className="text-xl font-semibold mb-4 mt-8">Team Building</h3>
       <div className="overflow-x-auto mb-2">
        <div className="min-w-full bg-white rounded-lg shadow">
          <div className="grid grid-cols-5 p-4 font-bold bg-gray-50"><div>Department</div><div>Y1 Hires</div><div>Y2 Hires</div><div>Y3 Hires</div>{editMode && <div>Action</div>}</div>
            {data.teamBuilding.map((t,i) => (
              <div key={i} className="grid grid-cols-5 p-4 border-t items-center">
                <div><EditableText value={t.department} onChange={v => handleArrayChange('teamBuilding', i, {...t, department: v})} editMode={editMode}/></div>
                <div><EditableText value={t.hires.y1.toString()} onChange={v => handleArrayChange('teamBuilding', i, {...t, hires: {...t.hires, y1: +v}})} editMode={editMode}/></div>
                <div><EditableText value={t.hires.y2.toString()} onChange={v => handleArrayChange('teamBuilding', i, {...t, hires: {...t.hires, y2: +v}})} editMode={editMode}/></div>
                <div><EditableText value={t.hires.y3.toString()} onChange={v => handleArrayChange('teamBuilding', i, {...t, hires: {...t.hires, y3: +v}})} editMode={editMode}/></div>
                {editMode && <div><RemoveButton onClick={() => handleRemove('teamBuilding', i)} ariaLabel='Remove department'/></div>}
              </div>
            ))}
        </div>
      </div>
      {editMode && <AddButton onClick={() => handleAdd('teamBuilding', {department: 'New Dept.', hires: {y1:0, y2:0, y3:0}, key: []})} text='Add Department' />}
      
      <h3 className="text-xl font-semibold mb-4 mt-8">Key Performance Indicators (KPIs)</h3>
       <div className="overflow-x-auto mb-2">
        <div className="min-w-full bg-white rounded-lg shadow">
          <div className="grid grid-cols-3 p-4 font-bold bg-gray-50"><div>Metric</div><div>Target</div>{editMode && <div>Action</div>}</div>
            {data.kpis.map((k,i) => (
              <div key={i} className="grid grid-cols-3 p-4 border-t items-center">
                <div><EditableText value={k.metric} onChange={v => handleArrayChange('kpis', i, {...k, metric: v})} editMode={editMode}/></div>
                <div><EditableText value={k.target} onChange={v => handleArrayChange('kpis', i, {...k, target: v})} editMode={editMode}/></div>
                {editMode && <div><RemoveButton onClick={() => handleRemove('kpis', i)} ariaLabel='Remove KPI'/></div>}
              </div>
            ))}
        </div>
      </div>
      {editMode && <AddButton onClick={() => handleAdd('kpis', {metric: 'New KPI', target: ''})} text='Add KPI' />}
    </CollapsibleSection>
  );
};

const RisksSection: FC<{ data: Risk[]; setData: (data: Risk[]) => void; editMode: boolean }> = ({ data, setData, editMode }) => {
  const getRiskColor = (level: string) => {
    switch(level.toLowerCase()) {
      case 'low': return 'border-green-500';
      case 'medium': return 'border-yellow-500';
      case 'high': return 'border-red-500';
      default: return 'border-gray-300';
    }
  };

  const handleRiskChange = (index: number, field: keyof Risk, value: any) => {
    const newRisks = [...data];
    newRisks[index] = {...newRisks[index], [field]: value};
    setData(newRisks);
  };
  const handleAddRisk = () => setData([...data, {risk: 'New Risk', level: 'Medium', description: '', mitigation: []}]);
  const handleRemoveRisk = (index: number) => setData(data.filter((_, i) => i !== index));

  const handleMitigationChange = (riskIndex: number, mIndex: number, value: string) => {
    const newRisks = [...data];
    const mitigations = [...newRisks[riskIndex].mitigation];
    mitigations[mIndex] = value;
    newRisks[riskIndex] = {...newRisks[riskIndex], mitigation: mitigations};
    setData(newRisks);
  };
  const handleAddMitigation = (riskIndex: number) => {
    const newRisks = [...data];
    newRisks[riskIndex].mitigation.push('New mitigation step');
    setData(newRisks);
  };
  const handleRemoveMitigation = (riskIndex: number, mIndex: number) => {
    const newRisks = [...data];
    newRisks[riskIndex].mitigation = newRisks[riskIndex].mitigation.filter((_, i) => i !== mIndex);
    setData(newRisks);
  };

  return (
    <CollapsibleSection title="Risks & Mitigation" icon={AlertCircle}>
      <div className="space-y-6 mb-2">
        {data.map((r, i) => (
          <div key={i} className={`p-4 border-l-4 rounded-r-lg bg-gray-50 ${getRiskColor(r.level)} group relative`}>
            <div className="flex justify-between items-start">
              <h4 className="font-bold text-lg"><EditableText value={r.risk} onChange={v => handleRiskChange(i, 'risk', v)} editMode={editMode}/></h4>
              <span className="text-sm font-semibold px-2 py-0.5 bg-gray-200 rounded-full"><EditableText value={r.level} onChange={v => handleRiskChange(i, 'level', v)} editMode={editMode}/></span>
            </div>
            <p className="my-2 text-gray-700"><EditableText value={r.description} onChange={v => handleRiskChange(i, 'description', v)} editMode={editMode} multiline/></p>
            <h5 className="font-semibold text-sm mt-3">Mitigation:</h5>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
              {r.mitigation.map((m, mI) => (
                <li key={mI} className='flex items-center gap-2'>
                  <EditableText value={m} onChange={v => handleMitigationChange(i, mI, v)} editMode={editMode} className='flex-grow'/>
                  {editMode && <RemoveButton onClick={() => handleRemoveMitigation(i, mI)} ariaLabel='Remove mitigation step'/>}
                </li>
              ))}
            </ul>
            {editMode && <AddButton onClick={() => handleAddMitigation(i)} text="Add Mitigation Step" />}
            {editMode && <RemoveButton onClick={() => handleRemoveRisk(i)} ariaLabel='Remove risk' className='absolute top-2 right-2 p-1 bg-white rounded-full hover:bg-red-100 opacity-0 group-hover:opacity-100 transition-opacity' />}
          </div>
        ))}
      </div>
      {editMode && <AddButton onClick={handleAddRisk} text="Add Risk" />}
    </CollapsibleSection>
  );
};

const SuccessFactorsSection: FC<{ data: SuccessFactor[]; setData: (data: SuccessFactor[]) => void; editMode: boolean }> = ({ data, setData, editMode }) => {
  const handleFactorChange = (index: number, field: keyof SuccessFactor, value: string) => {
    const newFactors = [...data];
    newFactors[index] = {...newFactors[index], [field]: value};
    setData(newFactors);
  };
  const handleAddFactor = () => setData([...data, {factor: 'New Factor', description: ''}]);
  const handleRemoveFactor = (index: number) => setData(data.filter((_, i) => i !== index));

  return (
    <CollapsibleSection title="Key Success Factors" icon={CheckCircle}>
      <div className="space-y-4 mb-2">
        {data.map((s, i) => (
          <div key={i} className="p-4 border rounded-lg bg-green-50 border-green-200 group relative">
            <h4 className="font-bold"><EditableText value={s.factor} onChange={v => handleFactorChange(i, 'factor', v)} editMode={editMode}/></h4>
            <p className="text-gray-700"><EditableText value={s.description} onChange={v => handleFactorChange(i, 'description', v)} editMode={editMode} multiline/></p>
            {editMode && <RemoveButton onClick={() => handleRemoveFactor(i)} ariaLabel='Remove factor' className='absolute top-2 right-2 p-1 bg-white rounded-full hover:bg-red-100 opacity-0 group-hover:opacity-100 transition-opacity' />}
          </div>
        ))}
      </div>
      {editMode && <AddButton onClick={handleAddFactor} text="Add Success Factor" />}
    </CollapsibleSection>
  );
};


const FinancialSection: FC<{ data: FinancialSectionType; setData: (data: FinancialSectionType) => void; editMode: boolean }> = ({ data, setData, editMode }) => {
  const [selectedYear, setSelectedYear] = useState<1 | 2 | 3>(1);

  const handleYearDataChange = (field: keyof Omit<FinancialYear, 'milestones'>, value: string) => {
    setData({
      ...data,
      years: {
        ...data.years,
        [selectedYear]: {
          ...data.years[selectedYear],
          [field]: value,
        },
      },
    });
  };

  const handleMilestoneChange = (index: number, value: string) => {
    const newMilestones = [...data.years[selectedYear].milestones];
    newMilestones[index] = value;
    setData({
      ...data,
      years: {
        ...data.years,
        [selectedYear]: {
          ...data.years[selectedYear],
          milestones: newMilestones,
        },
      },
    });
  };

  const handleAddMilestone = () => {
    const newMilestones = [...data.years[selectedYear].milestones, 'New milestone'];
    setData({
      ...data,
      years: {
        ...data.years,
        [selectedYear]: {
          ...data.years[selectedYear],
          milestones: newMilestones,
        },
      },
    });
  };

  const handleRemoveMilestone = (index: number) => {
    const newMilestones = data.years[selectedYear].milestones.filter((_, i) => i !== index);
    setData({
      ...data,
      years: {
        ...data.years,
        [selectedYear]: {
          ...data.years[selectedYear],
          milestones: newMilestones,
        },
      },
    });
  };

  return (
    <CollapsibleSection title="Financial Projections" icon={BarChart3}>
      <div className="flex border-b mb-4">
        {([1, 2, 3] as const).map((year) => (
          <button
            key={year}
            onClick={() => setSelectedYear(year)}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              selectedYear === year
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Year {year}
          </button>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg shadow-inner">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Year {selectedYear} Projections</h4>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
          <div className="p-3 bg-white rounded-lg shadow">
            <label className="text-sm font-medium text-gray-500 block">Projected Revenue</label>
            <EditableText
              value={data.years[selectedYear].revenue}
              onChange={(value) => handleYearDataChange('revenue', value)}
              editMode={editMode}
              className="text-lg font-semibold text-gray-800"
            />
          </div>
          <div className="p-3 bg-white rounded-lg shadow">
            <label className="text-sm font-medium text-gray-500 block">Clients</label>
            <EditableText
              value={data.years[selectedYear].clients}
              onChange={(value) => handleYearDataChange('clients', value)}
              editMode={editMode}
              className="text-lg font-semibold text-gray-800"
            />
          </div>
          <div className="p-3 bg-white rounded-lg shadow">
            <label className="text-sm font-medium text-gray-500 block">ARR</label>
            <EditableText
              value={data.years[selectedYear].arr}
              onChange={(value) => handleYearDataChange('arr', value)}
              editMode={editMode}
              className="text-lg font-semibold text-gray-800"
            />
          </div>
          <div className="p-3 bg-white rounded-lg shadow">
            <label className="text-sm font-medium text-gray-500 block">Margin</label>
            <EditableText
              value={data.years[selectedYear].margin}
              onChange={(value) => handleYearDataChange('margin', value)}
              editMode={editMode}
              className="text-lg font-semibold text-gray-800"
            />
          </div>
          <div className="p-3 bg-white rounded-lg shadow">
            <label className="text-sm font-medium text-gray-500 block">Team Size</label>
            <EditableText
              value={data.years[selectedYear].team}
              onChange={(value) => handleYearDataChange('team', value)}
              editMode={editMode}
              className="text-lg font-semibold text-gray-800"
            />
          </div>
        </div>

        <div>
          <h5 className="text-md font-semibold text-gray-700 mb-3">Key Milestones</h5>
          <ul className="list-disc list-inside space-y-2">
            {data.years[selectedYear].milestones.map((milestone, index) => (
              <li key={index} className="flex items-center group text-gray-700">
                <EditableText
                  value={milestone}
                  onChange={(value) => handleMilestoneChange(index, value)}
                  editMode={editMode}
                  className="flex-grow"
                />
                {editMode && (
                  <button
                    onClick={() => handleRemoveMilestone(index)}
                    className="ml-2 text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label={`Remove milestone ${index + 1}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </li>
            ))}
          </ul>
          {editMode && (
            <button
              onClick={handleAddMilestone}
              className="mt-3 flex items-center text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Milestone
            </button>
          )}
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <TrendingUp className="w-6 h-6 mr-2 text-green-600" />
          Revenue Breakdown (% of Total)
        </h3>
        <div className="bg-gray-50 rounded-lg shadow-inner">
          <RevenueBreakdownChart data={data.revenueBreakdown} />
        </div>
      </div>
    </CollapsibleSection>
  );
};


const App: React.FC = () => {
  const [businessPlan, setBusinessPlan] = useState<BusinessPlan>(initialBusinessPlan);
  const [editMode, setEditMode] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiResponse, setAiResponse] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiError, setAiError] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const handleUpdate = <T,>(section: keyof BusinessPlan, data: T) => {
    setBusinessPlan(prev => ({ ...prev, [section]: data }));
  };

  const handleDownload = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(businessPlan, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "business_plan.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = e.target?.result;
          if (typeof content === 'string') {
            const parsed = JSON.parse(content);
            setBusinessPlan(parsed);
          }
        } catch (error) {
          console.error("Error parsing JSON file:", error);
          alert("Invalid JSON file.");
        }
      };
      reader.readAsText(file);
    }
  };

  const handleAskAI = async (query: string) => {
    if (!query.trim()) return;

    setIsAiLoading(true);
    setAiResponse('');
    setAiError('');

    try {
      // FIX: Use process.env.API_KEY for the Gemini API key as per coding guidelines.
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `
  You are an expert business analyst AI. Your task is to answer questions about a business plan.
  You will be given the full business plan in JSON format, along with supplementary documents for context.
  Analyze all the provided information to give a comprehensive and insightful answer to the user's question.
  Format your response using Markdown for better readability.

  BUSINESS PLAN (JSON):
  ${JSON.stringify(businessPlan, null, 2)}

  SUPPLEMENTARY DOCUMENTS:
  ${documentContext}

  USER'S QUESTION:
  ${query}
  `;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      setAiResponse(response.text);
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      setAiError("Sorry, I couldn't process your request. Please try again.");
    } finally {
      setIsAiLoading(false);
    }
  };

  const AiModal = () => {
    const [query, setQuery] = useState('');
  
    const handleAsk = () => {
      handleAskAI(query);
      setQuery('');
    };

    const handleClose = () => {
      setIsAiModalOpen(false);
      setAiResponse('');
      setAiError('');
    }
  
    if (!isAiModalOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 transition-opacity" onClick={handleClose}>
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
          <header className="p-4 border-b flex justify-between items-center bg-gray-50 rounded-t-xl">
            <h3 className="text-xl font-bold text-gray-800 flex items-center">
              <Bot className="w-6 h-6 mr-3 text-blue-600" />
              Ask AI about your Business Plan
            </h3>
            <button onClick={handleClose} className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-200">
              <X className="w-6 h-6" />
            </button>
          </header>
          <main className="p-6 overflow-y-auto flex-grow">
            {isAiLoading ? (
              <div className="flex justify-center items-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : aiError ? (
              <div className="text-red-600 bg-red-50 p-4 rounded-lg border border-red-200">{aiError}</div>
            ) : (
              aiResponse ? (
                <div
                  className="ai-response-content p-4 bg-gray-50 rounded-lg min-h-[100px] text-gray-800"
                  dangerouslySetInnerHTML={{ __html: marked.parse(aiResponse) as string }}
                />
              ) : (
                <p className="text-gray-500 p-4">{`Ask a question below to get started. For example: "What is our competitive moat?"`}</p>
              )
            )}
          </main>
          <footer className="p-4 border-t flex gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g., What are the biggest risks?"
              className="flex-grow border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              disabled={isAiLoading}
              onKeyDown={(e) => e.key === 'Enter' && !isAiLoading && handleAsk()}
            />
            <button
              onClick={handleAsk}
              disabled={isAiLoading || !query}
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-blue-300 transition-colors shadow"
            >
              {isAiLoading ? 'Thinking...' : 'Ask'}
            </button>
          </footer>
        </div>
      </div>
    );
  };

  const Toast = ({ message }: { message: string }) => {
    if (!message) return null;
    return (
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-6 py-3 rounded-full shadow-lg text-sm transition-opacity duration-300 animate-fade-in-out">
        {message}
      </div>
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <header className="bg-white shadow-lg sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex flex-col">
                <h1 className="text-3xl font-bold text-gray-800">
                  <EditableText value={businessPlan.companyName} onChange={v => handleUpdate('companyName', v)} editMode={editMode} />
                </h1>
                <p className="text-sm text-gray-600">
                  <EditableText value={businessPlan.tagline} onChange={v => handleUpdate('tagline', v)} editMode={editMode} />
                </p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => { setIsAiModalOpen(true); }}
                className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition shadow"
              >
                <Bot className="w-5 h-5" />
                <span>Ask AI</span>
              </button>
              <button onClick={handleDownload} className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition shadow">
                <Download className="w-5 h-5" />
                <span>Export</span>
              </button>
              <label className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition shadow cursor-pointer">
                <Upload className="w-5 h-5" />
                <span>Import</span>
                <input type="file" accept=".json" onChange={handleUpload} className="hidden" />
              </label>
              <button
                onClick={() => {
                  if (editMode) {
                    setToastMessage('Business plan saved successfully!');
                    setTimeout(() => setToastMessage(''), 3000);
                  }
                  setEditMode(!editMode)
                }}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition shadow ${
                  editMode ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                }`}
              >
                {editMode ? <Save className="w-5 h-5" /> : <Edit3 className="w-5 h-5" />}
                <span>{editMode ? 'Save' : 'Edit'}</span>
              </button>
            </div>
        </div>
      </header>

      <main className="container mx-auto p-6">
        <AiModal />
        <ExecutiveSection data={businessPlan.executive} setData={(data) => handleUpdate('executive', data)} editMode={editMode} />
        <OpportunitySection data={businessPlan.opportunity} setData={(data) => handleUpdate('opportunity', data)} editMode={editMode} />
        <SolutionSection data={businessPlan.solution} setData={(data) => handleUpdate('solution', data)} editMode={editMode} />
        <BusinessSection data={businessPlan.business} setData={(data) => handleUpdate('business', data)} editMode={editMode} />
        <GTMSection data={businessPlan.gtm} setData={(data) => handleUpdate('gtm', data)} editMode={editMode} />
        <FinancialSection 
          data={businessPlan.financial} 
          setData={(data) => handleUpdate('financial', data)} 
          editMode={editMode} 
        />
        <RoadmapSection data={businessPlan.roadmap} setData={(data) => handleUpdate('roadmap', data)} editMode={editMode} />
        <RisksSection data={businessPlan.risks} setData={(data) => handleUpdate('risks', data)} editMode={editMode} />
        <SuccessFactorsSection data={businessPlan.successFactors} setData={(data) => handleUpdate('successFactors', data)} editMode={editMode} />
      </main>
      <Toast message={toastMessage} />
    </div>
  );
};

export default App;