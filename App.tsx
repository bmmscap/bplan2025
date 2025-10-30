import React, { useState, useMemo } from 'react';
import type { BusinessPlan } from './types';
import EditableText from './components/EditableText';
import { 
  ChevronRight, ChevronDown, Target, DollarSign, Users, TrendingUp, Lightbulb, Shield, 
  CheckCircle, AlertCircle, Calendar, BarChart3, Zap, Edit3, Save, Download, Upload, Plus, Trash2 
} from './components/icons';
import RevenueBreakdownChart from './components/RevenueBreakdownChart'; // Import the new chart component
import type { FC } from 'react';

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
        'Institutional trust accumulated over decades of excellence'
      ]
    },
    {
      risk: 'Execution',
      level: 'Low',
      description: 'Our advantage is created by the fusion of leadership, agentic systems, and product architecture. Every engagement delivers measurable results.',
      mitigation: [
        'Deep media industry expertise creating superior product-market fit',
        'The more visible we become, the stronger our advantage',
        'The Flywheel Effect: Cross-selling and data feedback loops strengthen the model'
      ]
    },
     {
      risk: 'Scalability',
      level: 'Medium',
      description: 'Transitioning from high-touch consulting to scalable revenue streams requires careful management.',
      mitigation: [
        'Start with consulting, reinvest into recurring revenue',
        'High-margin services fund scalable technology platforms',
        'Diversified revenue streams create resilience'
      ]
    }
  ],

  successFactors: [
    { factor: 'Impossible to Replicate', description: 'The combination of founder credibility and access cannot be duplicated.' },
    { factor: 'Principal-Led Advisory', description: 'Ensures premium quality and deep relationship building.' },
    { factor: 'Seven Revenue Verticals', description: 'Creates diversification, resilience, and cross-selling synergies.' },
    { factor: 'Scalable Model', description: 'Transitions from high-touch consulting to recurring SaaS and platform revenue.' }
  ]
};

const sections = [
  { id: 'executive', name: 'Executive Summary', icon: Target },
  { id: 'opportunity', name: 'Market Opportunity', icon: TrendingUp },
  { id: 'solution', name: 'Solution & Product', icon: Lightbulb },
  { id: 'business', name: 'Business Model', icon: DollarSign },
  { id: 'gtm', name: 'Go-to-Market', icon: Users },
  { id: 'financial', name: 'Financial Projections', icon: BarChart3 },
  { id: 'roadmap', name: 'Implementation', icon: Calendar },
  { id: 'risks', name: 'Risks & Mitigation', icon: Shield }
];

interface SectionContentProps {
  sectionId: string;
  businessPlan: BusinessPlan;
  setBusinessPlan: React.Dispatch<React.SetStateAction<BusinessPlan>>;
  editMode: boolean;
  expandedItems: Record<string, boolean>;
  toggleExpand: (id: string) => void;
  selectedYear: number;
  setSelectedYear: React.Dispatch<React.SetStateAction<number>>;
}

const SectionContent: FC<SectionContentProps> = ({ sectionId, businessPlan, setBusinessPlan, editMode, expandedItems, toggleExpand, selectedYear, setSelectedYear }) => {
  const updatePlan = <T extends keyof BusinessPlan>(section: T, field: keyof BusinessPlan[T], value: any) => {
    setBusinessPlan(prev => {
      const sectionData = prev[section];
      if (typeof sectionData === 'object' && sectionData !== null && !Array.isArray(sectionData)) {
        return {
          ...prev,
          [section]: {
            ...sectionData,
            [field]: value
          }
        };
      }
      // Handle top-level fields like companyName, or arrays like risks
      const topLevelField = field as keyof BusinessPlan;
       return {
         ...prev,
         [topLevelField]: value
       };
    });
  };

  const updateArrayItem = <T extends keyof BusinessPlan>(
    section: T,
    field: keyof BusinessPlan[T],
    index: number,
    item: any
  ) => {
    setBusinessPlan(prev => {
        const sectionData = prev[section] as any;
        const newArray = [...sectionData[field]];
        newArray[index] = { ...newArray[index], ...item };

        return {
            ...prev,
            [section]: {
                ...sectionData,
                [field]: newArray
            }
        };
    });
  };

  const updateNestedArrayItem = <T extends keyof BusinessPlan>(
    section: T,
    field: keyof BusinessPlan[T],
    itemIndex: number,
    subField: string,
    subIndex: number,
    value: string | number // Allow number for financial data
  ) => {
      setBusinessPlan(prev => {
        const sectionData = prev[section] as any;
        const newItems = [...sectionData[field]];
        const newSubItems = [...newItems[itemIndex][subField]];
        newSubItems[subIndex] = value;
        newItems[itemIndex] = { ...newItems[itemIndex], [subField]: newSubItems };

        return {
            ...prev,
            [section]: {
                ...sectionData,
                [field]: newItems
            }
        };
      });
  };

  const addArrayItem = <T extends keyof BusinessPlan>(
    section: T,
    field: keyof BusinessPlan[T],
    newItem: any
  ) => {
    setBusinessPlan(prev => {
      const sectionData = prev[section] as any;
      const newArray = [...sectionData[field], newItem];
      return {
        ...prev,
        [section]: {
          ...sectionData,
          [field]: newArray
        }
      };
    });
  };

  const removeArrayItem = <T extends keyof BusinessPlan>(
    section: T,
    field: keyof BusinessPlan[T],
    indexToRemove: number
  ) => {
    setBusinessPlan(prev => {
      const sectionData = prev[section] as any;
      const newArray = sectionData[field].filter((_: any, idx: number) => idx !== indexToRemove);
      return {
        ...prev,
        [section]: {
          ...sectionData,
          [field]: newArray
        }
      };
    });
  };

  const addTopLevelArrayItem = <T extends keyof BusinessPlan>(
    field: T,
    newItem: any
  ) => {
    setBusinessPlan(prev => {
      const newArray = [...(prev[field] as any[]), newItem];
      return {
        ...prev,
        [field]: newArray
      };
    });
  };

  const removeTopLevelArrayItem = <T extends keyof BusinessPlan>(
    field: T,
    indexToRemove: number
  ) => {
    setBusinessPlan(prev => {
      const newArray = (prev[field] as any[]).filter((_: any, idx: number) => idx !== indexToRemove);
      return {
        ...prev,
        [field]: newArray
      };
    });
  };

  switch(sectionId) {
    case 'executive':
      return (
        <div className="space-y-8">
          <div className="bg-gradient-to-r from-gray-800 to-blue-900 text-white p-6 sm:p-8 rounded-xl shadow-2xl">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
              <EditableText 
                value={businessPlan.companyName}
                onChange={(v) => setBusinessPlan({...businessPlan, companyName: v})}
                className="text-3xl sm:text-4xl font-extrabold bg-transparent focus:bg-white focus:text-gray-900 rounded"
                editMode={editMode}
              />
            </h2>
            <p className="text-xl sm:text-2xl mb-4 italic opacity-90">
              <EditableText 
                value={businessPlan.tagline}
                onChange={(v) => setBusinessPlan({...businessPlan, tagline: v})}
                className="text-xl sm:text-2xl bg-transparent focus:bg-white focus:text-gray-900 rounded"
                editMode={editMode}
              />
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="bg-white/10 p-4 sm:p-5 rounded-lg backdrop-blur-sm hover:bg-white/20 transition-all duration-300">
                <div className="text-2xl sm:text-3xl font-bold">
                  <EditableText 
                    value={businessPlan.executive.marketSize}
                    onChange={(v) => updatePlan('executive', 'marketSize', v)}
                    className="bg-transparent text-2xl sm:text-3xl font-bold focus:bg-white focus:text-gray-900 rounded"
                    editMode={editMode}
                  />
                </div>
                <div className="text-sm opacity-80 mt-1">Total Market Size</div>
              </div>
              <div className="bg-white/10 p-4 sm:p-5 rounded-lg backdrop-blur-sm hover:bg-white/20 transition-all duration-300">
                <div className="text-2xl sm:text-3xl font-bold">
                  <EditableText 
                    value={businessPlan.executive.yearThreeRevenue}
                    onChange={(v) => updatePlan('executive', 'yearThreeRevenue', v)}
                    className="bg-transparent text-2xl sm:text-3xl font-bold focus:bg-white focus:text-gray-900 rounded"
                    editMode={editMode}
                  />
                </div>
                <div className="text-sm opacity-80 mt-1">Full Scale Revenue</div>
              </div>
              <div className="bg-white/10 p-4 sm:p-5 rounded-lg backdrop-blur-sm hover:bg-white/20 transition-all duration-300">
                <div className="text-2xl sm:text-3xl font-bold">
                  <EditableText 
                    value={businessPlan.executive.uniqueValue}
                    onChange={(v) => updatePlan('executive', 'uniqueValue', v)}
                    className="bg-transparent text-2xl sm:text-3xl font-bold focus:bg-white focus:text-gray-900 rounded"
                    editMode={editMode}
                  />
                </div>
                <div className="text-sm opacity-80 mt-1">Unique Value</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold mb-5 text-gray-800 flex items-center justify-between">
              The Core Challenge
              {editMode && (
                <button
                  onClick={() => addArrayItem('executive', 'problems', { title: 'New Problem', description: 'Description here.' })}
                  className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                  aria-label="Add new problem"
                >
                  <Plus className="w-5 h-5" />
                </button>
              )}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {businessPlan.executive.problems.map((problem, idx) => (
                <div key={idx} className="flex items-start space-x-3 bg-red-50 p-4 rounded-lg border border-red-200 hover:shadow-md transition-shadow">
                  <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">
                      <EditableText 
                        value={problem.title}
                        onChange={(v) => updateArrayItem('executive', 'problems', idx, { title: v })}
                        editMode={editMode}
                        className="text-gray-900"
                      />
                    </div>
                    <div className="text-sm text-gray-700 mt-1">
                      <EditableText 
                        value={problem.description}
                        onChange={(v) => updateArrayItem('executive', 'problems', idx, { description: v })}
                        editMode={editMode}
                        multiline
                      />
                    </div>
                  </div>
                  {editMode && (
                    <button
                      onClick={() => removeArrayItem('executive', 'problems', idx)}
                      className="p-1 text-red-500 hover:text-red-700 transition-colors"
                      aria-label="Remove problem"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold mb-5 text-gray-800 flex items-center justify-between">
              Our Solution: An Ecosystem Approach
              {editMode && (
                <button
                  onClick={() => addArrayItem('executive', 'advantages', { metric: 'New Metric', description: 'Description here.' })}
                  className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                  aria-label="Add new advantage"
                >
                  <Plus className="w-5 h-5" />
                </button>
              )}
            </h3>
            <p className="text-gray-700 mb-6 text-base sm:text-lg leading-relaxed">
              <EditableText 
                value={businessPlan.executive.solution}
                onChange={(v) => updatePlan('executive', 'solution', v)}
                multiline
                editMode={editMode}
              />
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {businessPlan.executive.advantages.map((adv, idx) => (
                <div key={idx} className="group bg-blue-50 p-5 rounded-lg text-center border border-blue-200 hover:border-blue-400 hover:shadow-md transition-all duration-300 relative">
                  <Zap className="w-8 h-8 text-blue-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <div className="font-bold text-blue-800 text-lg">
                    <EditableText 
                      value={adv.metric}
                      onChange={(v) => updateArrayItem('executive', 'advantages', idx, { metric: v })}
                      editMode={editMode}
                      className="text-blue-800"
                    />
                  </div>
                  <div className="text-xs text-gray-700 mt-1">
                    <EditableText 
                      value={adv.description}
                       onChange={(v) => updateArrayItem('executive', 'advantages', idx, { description: v })}
                      editMode={editMode}
                    />
                  </div>
                  {editMode && (
                    <button
                      onClick={() => removeArrayItem('executive', 'advantages', idx)}
                      className="absolute top-2 right-2 p-1 text-red-500 hover:text-red-700 transition-colors opacity-0 group-hover:opacity-100"
                      aria-label="Remove advantage"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    case 'opportunity':
       return (
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold mb-5 text-gray-800">Market Vision & Growth Drivers</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="text-4xl sm:text-5xl font-bold text-green-600 mb-2">
                    <EditableText 
                      value={businessPlan.opportunity.marketSize}
                      onChange={(v) => updatePlan('opportunity', 'marketSize', v)}
                      className="text-4xl sm:text-5xl font-bold text-green-600"
                      editMode={editMode}
                    />
                  </div>
                  <div className="text-gray-700 text-base sm:text-lg mb-4">Total Addressable Market (<EditableText value={businessPlan.opportunity.marketGrowth} onChange={v => updatePlan('opportunity', 'marketGrowth', v)} editMode={editMode} />)</div>
                  <div className="space-y-2 text-sm">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center justify-between">
                      Growth Drivers
                      {editMode && (
                        <button
                          onClick={() => addArrayItem('opportunity', 'growthDrivers', 'New Growth Driver')}
                          className="p-1 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                          aria-label="Add new growth driver"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      )}
                    </h4>
                    {businessPlan.opportunity.growthDrivers.map((driver, idx) => (
                      <div key={idx} className="flex items-center space-x-2 group relative py-1 px-2 rounded-md hover:bg-gray-50">
                        <TrendingUp className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <EditableText 
                          value={driver}
                          onChange={(v) => {
                             const newDrivers = [...businessPlan.opportunity.growthDrivers];
                             newDrivers[idx] = v;
                             updatePlan('opportunity', 'growthDrivers', newDrivers);
                          }}
                          editMode={editMode}
                        />
                        {editMode && (
                          <button
                            onClick={() => removeArrayItem('opportunity', 'growthDrivers', idx)}
                            className="absolute right-2 p-1 text-red-500 hover:text-red-700 transition-colors opacity-0 group-hover:opacity-100"
                            aria-label="Remove growth driver"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-4xl sm:text-5xl font-bold text-blue-600 mb-2">
                    <EditableText 
                      value={businessPlan.opportunity.targetPercent}
                      onChange={(v) => updatePlan('opportunity', 'targetPercent', v)}
                      className="text-4xl sm:text-5xl font-bold text-blue-600"
                      editMode={editMode}
                    />
                  </div>
                  <div className="text-gray-700 text-base sm:text-lg mb-4">
                    <EditableText 
                      value={businessPlan.opportunity.targetDescription}
                      onChange={(v) => updatePlan('opportunity', 'targetDescription', v)}
                      editMode={editMode}
                      multiline
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold mb-5 text-gray-800 flex items-center justify-between">
                Target Customer Segments
                {editMode && (
                  <button
                    onClick={() => addArrayItem('opportunity', 'customerSegments', { segment: 'New Segment', size: 'Varies', arr: '$0', priority: 'Tertiary' })}
                    className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                    aria-label="Add new customer segment"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                )}
              </h3>
              <div className="space-y-4">
                {businessPlan.opportunity.customerSegments.map((seg, idx) => (
                  <div key={idx} className="group border-l-4 border-green-600 pl-4 py-2 pr-2 bg-gray-50 rounded-r-lg hover:bg-gray-100 transition-colors relative">
                    <div className="flex justify-between items-center">
                      <div className="flex-1 pr-4">
                        <div className="font-bold text-gray-900">
                          <EditableText 
                            value={seg.segment}
                            onChange={(v) => updateArrayItem('opportunity', 'customerSegments', idx, { segment: v })}
                            editMode={editMode}
                          />
                        </div>
                        <div className="text-sm text-gray-700 mt-1">
                          Est. ARR: <EditableText 
                            value={seg.arr}
                             onChange={(v) => updateArrayItem('opportunity', 'customerSegments', idx, { arr: v })}
                            editMode={editMode}
                          />
                          <span className="ml-2">Size:</span> <EditableText 
                            value={seg.size}
                             onChange={(v) => updateArrayItem('opportunity', 'customerSegments', idx, { size: v })}
                            editMode={editMode}
                          />
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        seg.priority === 'Primary' ? 'bg-green-100 text-green-700' :
                        seg.priority === 'Secondary' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {editMode ? (
                          <select
                            value={seg.priority}
                            onChange={(e) => updateArrayItem('opportunity', 'customerSegments', idx, { priority: e.target.value })}
                            className="bg-transparent text-xs font-semibold focus:outline-none"
                          >
                            <option>Primary</option>
                            <option>Secondary</option>
                            <option>Tertiary</option>
                          </select>
                        ) : (
                          seg.priority
                        )}
                      </div>
                    </div>
                    {editMode && (
                      <button
                        onClick={() => removeArrayItem('opportunity', 'customerSegments', idx)}
                        className="absolute top-2 right-2 p-1 text-red-500 hover:text-red-700 transition-colors opacity-0 group-hover:opacity-100"
                        aria-label="Remove segment"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold mb-5 text-gray-800 flex items-center justify-between">
                Competitive Moat
                {editMode && (
                  <button
                    onClick={() => addArrayItem('opportunity', 'competitiveAdvantages', { feature: 'New Advantage', us: false, competitor1: false, competitor2: false })}
                    className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                    aria-label="Add new competitive advantage"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                )}
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead className="bg-gray-100 sticky top-0">
                    <tr>
                      <th className="p-3 text-left min-w-[150px] border-b border-gray-200">Advantage</th>
                      <th className="p-3 text-center bg-blue-100 text-blue-800 min-w-[120px] border-b border-gray-200">BMMS Capital</th>
                      <th className="p-3 text-center min-w-[120px] border-b border-gray-200">Large Consulting Firms</th>
                      <th className="p-3 text-center min-w-[120px] border-b border-gray-200">Boutique Agencies</th>
                      {editMode && <th className="p-3 text-center border-b border-gray-200 w-16"></th>}
                    </tr>
                  </thead>
                  <tbody>
                    {businessPlan.opportunity.competitiveAdvantages.map((row, idx) => (
                      <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="p-3 font-medium text-gray-800">
                          <EditableText 
                            value={row.feature}
                            onChange={(v) => updateArrayItem('opportunity', 'competitiveAdvantages', idx, { feature: v })}
                            editMode={editMode}
                          />
                        </td>
                        <td className="p-3 text-center bg-blue-50">
                          {editMode ? (
                            <input
                              type="checkbox"
                              checked={row.us}
                              onChange={(e) => updateArrayItem('opportunity', 'competitiveAdvantages', idx, { us: e.target.checked })}
                              className="form-checkbox h-5 w-5 text-blue-600 rounded"
                            />
                          ) : (
                            row.us ? <CheckCircle className="w-5 h-5 text-blue-600 mx-auto" /> : 
                            <span className="text-gray-300">—</span>
                          )}
                        </td>
                        <td className="p-3 text-center">
                          {editMode ? (
                            <input
                              type="checkbox"
                              checked={row.competitor1}
                              onChange={(e) => updateArrayItem('opportunity', 'competitiveAdvantages', idx, { competitor1: e.target.checked })}
                              className="form-checkbox h-5 w-5 text-green-600 rounded"
                            />
                          ) : (
                            row.competitor1 ? <CheckCircle className="w-5 h-5 text-green-600 mx-auto" /> : 
                            <span className="text-gray-300">—</span>
                          )}
                        </td>
                        <td className="p-3 text-center">
                          {editMode ? (
                            <input
                              type="checkbox"
                              checked={row.competitor2}
                              onChange={(e) => updateArrayItem('opportunity', 'competitiveAdvantages', idx, { competitor2: e.target.checked })}
                              className="form-checkbox h-5 w-5 text-green-600 rounded"
                            />
                          ) : (
                            row.competitor2 ? <CheckCircle className="w-5 h-5 text-green-600 mx-auto" /> : 
                            <span className="text-gray-300">—</span>
                          )}
                        </td>
                        {editMode && (
                          <td className="p-3 text-center">
                            <button
                              onClick={() => removeArrayItem('opportunity', 'competitiveAdvantages', idx)}
                              className="p-1 text-red-500 hover:text-red-700 transition-colors"
                              aria-label="Remove advantage"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      
    case 'solution':
      return (
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold mb-5 text-gray-800">Seven Strategic Verticals</h3>
            <p className="text-gray-700 mb-6 text-base sm:text-lg leading-relaxed">
              <EditableText 
                value={businessPlan.solution.description}
                onChange={(v) => updatePlan('solution', 'description', v)}
                multiline
                editMode={editMode}
              />
            </p>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-800 mb-2 flex items-center justify-between">
                Core Features & Capabilities
                {editMode && (
                  <button
                    onClick={() => addArrayItem('solution', 'features', { name: 'New Feature', description: 'Description here.', capabilities: ['New capability'], revenue: '$0' })}
                    className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                    aria-label="Add new feature"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                )}
              </h4>
              {businessPlan.solution.features.map((feature, idx) => {
                const isExpanded = expandedItems[`feature-${idx}`];
                return (
                  <div key={idx} className="border-2 border-blue-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div 
                      className="bg-blue-50 p-4 cursor-pointer hover:bg-blue-100 transition-colors flex items-center justify-between"
                      onClick={() => toggleExpand(`feature-${idx}`)}
                    >
                      <div className="flex-1">
                        <div className="font-bold text-lg text-blue-800">
                          <EditableText 
                            value={feature.name}
                             onChange={(v) => updateArrayItem('solution', 'features', idx, { name: v })}
                            editMode={editMode}
                          />
                        </div>
                        <div className="text-sm text-gray-700 mt-1">
                          <EditableText 
                            value={feature.description}
                            onChange={(v) => updateArrayItem('solution', 'features', idx, { description: v })}
                            editMode={editMode}
                          />
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 ml-4">
                        <div className="text-blue-600 font-semibold text-sm">
                          <EditableText 
                            value={feature.revenue}
                            onChange={(v) => updateArrayItem('solution', 'features', idx, { revenue: v })}
                            editMode={editMode}
                          />
                        </div>
                        {isExpanded ? <ChevronDown className="w-5 h-5 text-blue-600" /> : <ChevronRight className="w-5 h-5 text-blue-600" />}
                        {editMode && (
                          <button
                            onClick={(e) => { e.stopPropagation(); removeArrayItem('solution', 'features', idx); }}
                            className="p-1 text-red-500 hover:text-red-700 transition-colors"
                            aria-label="Remove feature"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                    {isExpanded && (
                      <div className="p-4 bg-white border-t border-gray-100">
                        <h5 className="font-semibold mb-2 text-gray-800 flex items-center justify-between">
                          Core Offerings
                          {editMode && (
                            <button
                              onClick={(e) => { e.stopPropagation(); updateNestedArrayItem('solution', 'features', idx, 'capabilities', feature.capabilities.length, 'New capability'); }}
                              className="p-1 bg-blue-400 text-white rounded-full hover:bg-blue-500 transition-colors"
                              aria-label="Add new capability"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          )}
                        </h5>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {feature.capabilities.map((cap, capIdx) => (
                            <div key={capIdx} className="flex items-start space-x-2 text-sm group relative py-1 px-2 rounded-md hover:bg-gray-50">
                              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                              <span>
                                <EditableText 
                                  value={cap}
                                  onChange={(v) => updateNestedArrayItem('solution', 'features', idx, 'capabilities', capIdx, v)}
                                  editMode={editMode}
                                />
                              </span>
                              {editMode && (
                                <button
                                  onClick={(e) => { e.stopPropagation(); 
                                    setBusinessPlan(prev => {
                                      const newFeatures = [...prev.solution.features];
                                      const newCapabilities = newFeatures[idx].capabilities.filter((_: string, i: number) => i !== capIdx);
                                      newFeatures[idx] = { ...newFeatures[idx], capabilities: newCapabilities };
                                      return { ...prev, solution: { ...prev.solution, features: newFeatures } };
                                    });
                                  }}
                                  className="absolute right-2 p-1 text-red-500 hover:text-red-700 transition-colors opacity-0 group-hover:opacity-100"
                                  aria-label="Remove capability"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold mb-5 text-gray-800 flex items-center justify-between">
              Ecosystem Platforms & Tech Stack
              {editMode && (
                <button
                  onClick={() => addArrayItem('solution', 'techStack', { layer: 'New Layer', technologies: ['New Tech'] })}
                  className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                  aria-label="Add new tech stack layer"
                >
                  <Plus className="w-5 h-5" />
                </button>
              )}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {businessPlan.solution.techStack.map((stack, idx) => (
                <div key={idx} className="group border-2 border-gray-200 rounded-xl p-5 hover:border-blue-400 hover:shadow-md transition-all duration-300 relative">
                  <h4 className="font-bold mb-3 text-lg text-gray-900">
                    <EditableText 
                      value={stack.layer}
                      onChange={(v) => updateArrayItem('solution', 'techStack', idx, { layer: v })}
                      editMode={editMode}
                    />
                  </h4>
                  <div className="text-sm text-gray-700 space-y-1">
                    <h5 className="font-semibold text-gray-800 flex items-center justify-between">
                      Technologies
                      {editMode && (
                        <button
                          onClick={(e) => { e.stopPropagation(); updateNestedArrayItem('solution', 'techStack', idx, 'technologies', stack.technologies.length, 'New Tech'); }}
                          className="p-1 bg-blue-400 text-white rounded-full hover:bg-blue-500 transition-colors"
                          aria-label="Add new technology"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      )}
                    </h5>
                    {stack.technologies.map((tech, techIdx) => (
                      <div key={techIdx} className="flex items-start space-x-2 group relative py-1 px-2 rounded-md hover:bg-gray-50">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>
                          <EditableText 
                            value={tech}
                            onChange={(v) => updateNestedArrayItem('solution', 'techStack', idx, 'technologies', techIdx, v)}
                            editMode={editMode}
                          />
                        </span>
                        {editMode && (
                          <button
                            onClick={(e) => { e.stopPropagation(); 
                              setBusinessPlan(prev => {
                                const newTechStack = [...prev.solution.techStack];
                                const newTechnologies = newTechStack[idx].technologies.filter((_: string, i: number) => i !== techIdx);
                                newTechStack[idx] = { ...newTechStack[idx], technologies: newTechnologies };
                                return { ...prev, solution: { ...prev.solution, techStack: newTechStack } };
                              });
                            }}
                            className="absolute right-2 p-1 text-red-500 hover:text-red-700 transition-colors opacity-0 group-hover:opacity-100"
                            aria-label="Remove technology"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  {editMode && (
                    <button
                      onClick={() => removeArrayItem('solution', 'techStack', idx)}
                      className="absolute top-2 right-2 p-1 text-red-500 hover:text-red-700 transition-colors opacity-0 group-hover:opacity-100"
                      aria-label="Remove layer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      );
      
    case 'business':
        return (
          <div className="space-y-8">
             <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold mb-5 text-gray-800 flex items-center justify-between">
                Ecosystem Revenue Model
                {editMode && (
                  <button
                    onClick={() => addArrayItem('business', 'revenueStreams', { stream: 'New Stream', model: 'Model here', pricing: '$0', margin: 'Low', split: 'N/A' })}
                    className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                    aria-label="Add new revenue stream"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                )}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {businessPlan.business.revenueStreams.map((rev, idx) => (
                  <div key={idx} className="group border-2 border-gray-200 rounded-xl p-5 hover:border-blue-400 hover:shadow-md transition-colors relative">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1 pr-4">
                        <div className="font-bold text-lg text-gray-900">
                          <EditableText 
                            value={rev.stream}
                            onChange={(v) => updateArrayItem('business', 'revenueStreams', idx, { stream: v })}
                            editMode={editMode}
                          />
                        </div>
                        <div className="text-sm text-gray-700 mt-1">
                          <EditableText 
                            value={rev.model}
                            onChange={(v) => updateArrayItem('business', 'revenueStreams', idx, { model: v })}
                            editMode={editMode}
                          />
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-blue-600 font-bold text-base">
                          <EditableText 
                            value={rev.split}
                            onChange={(v) => updateArrayItem('business', 'revenueStreams', idx, { split: v })}
                            editMode={editMode}
                          />
                        </div>
                        <div className="text-xs text-gray-500">Vertical</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-3 pt-3 border-t border-gray-100">
                      <div>
                        <div className="text-xs text-gray-500">Pricing Model</div>
                        <div className="font-semibold text-gray-800">
                          <EditableText 
                            value={rev.pricing}
                            onChange={(v) => updateArrayItem('business', 'revenueStreams', idx, { pricing: v })}
                            editMode={editMode}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Margin</div>
                        <div className="font-semibold text-gray-800">
                          {editMode ? (
                            <select
                              value={rev.margin}
                              onChange={(e) => updateArrayItem('business', 'revenueStreams', idx, { margin: e.target.value })}
                              className="bg-transparent font-semibold focus:outline-none w-full"
                            >
                              <option>Low</option>
                              <option>Medium</option>
                              <option>High</option>
                            </select>
                          ) : (
                            rev.margin
                          )}
                        </div>
                      </div>
                    </div>
                    {editMode && (
                      <button
                        onClick={() => removeArrayItem('business', 'revenueStreams', idx)}
                        className="absolute top-2 right-2 p-1 text-red-500 hover:text-red-700 transition-colors opacity-0 group-hover:opacity-100"
                        aria-label="Remove revenue stream"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
             </div>

             <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold mb-5 text-gray-800 flex items-center justify-between">
                Pricing Tiers
                {editMode && (
                  <button
                    onClick={() => addArrayItem('business', 'pricingTiers', { tier: 'New Tier', price: '$0', target: 'New Target', includes: ['New inclusion'] })}
                    className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                    aria-label="Add new pricing tier"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                )}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {businessPlan.business.pricingTiers.map((tier, idx) => (
                  <div key={idx} className="group border-2 border-purple-200 rounded-xl p-6 bg-purple-50 hover:shadow-lg transition-shadow relative">
                    <h4 className="font-bold text-xl text-purple-800 mb-3">
                      <EditableText 
                        value={tier.tier}
                        onChange={(v) => updateArrayItem('business', 'pricingTiers', idx, { tier: v })}
                        editMode={editMode}
                      />
                    </h4>
                    <p className="text-3xl font-extrabold text-purple-700 mb-2">
                      <EditableText 
                        value={tier.price}
                        onChange={(v) => updateArrayItem('business', 'pricingTiers', idx, { price: v })}
                        editMode={editMode}
                      />
                    </p>
                    <p className="text-sm text-gray-600 mb-4">Target: <EditableText value={tier.target} onChange={(v) => updateArrayItem('business', 'pricingTiers', idx, { target: v })} editMode={editMode} /></p>
                    <div className="border-t border-purple-100 pt-4">
                      <h5 className="font-semibold text-purple-800 mb-2 flex items-center justify-between">
                        Includes
                        {editMode && (
                          <button
                            onClick={(e) => { e.stopPropagation(); updateNestedArrayItem('business', 'pricingTiers', idx, 'includes', tier.includes.length, 'New inclusion'); }}
                            className="p-1 bg-purple-400 text-white rounded-full hover:bg-purple-500 transition-colors"
                            aria-label="Add new inclusion"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        )}
                      </h5>
                      <ul className="space-y-1 text-sm text-gray-700">
                        {tier.includes.map((item, itemIdx) => (
                          <li key={itemIdx} className="flex items-center space-x-2 group relative py-1 px-2 rounded-md hover:bg-purple-100">
                            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                            <span>
                              <EditableText 
                                value={item}
                                onChange={(v) => updateNestedArrayItem('business', 'pricingTiers', idx, 'includes', itemIdx, v)}
                                editMode={editMode}
                              />
                            </span>
                            {editMode && (
                              <button
                                onClick={(e) => { e.stopPropagation(); 
                                  setBusinessPlan(prev => {
                                    const newTiers = [...prev.business.pricingTiers];
                                    const newIncludes = newTiers[idx].includes.filter((_: string, i: number) => i !== itemIdx);
                                    newTiers[idx] = { ...newTiers[idx], includes: newIncludes };
                                    return { ...prev, business: { ...prev.business, pricingTiers: newTiers } };
                                  });
                                }}
                                className="absolute right-2 p-1 text-red-500 hover:text-red-700 transition-colors opacity-0 group-hover:opacity-100"
                                aria-label="Remove inclusion"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {editMode && (
                      <button
                        onClick={() => removeArrayItem('business', 'pricingTiers', idx)}
                        className="absolute top-2 right-2 p-1 text-red-500 hover:text-red-700 transition-colors opacity-0 group-hover:opacity-100"
                        aria-label="Remove tier"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
             </div>

             <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-2xl font-bold mb-5 text-gray-800">Unit Economics</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="text-sm text-gray-600">Avg. ARR per Client</div>
                    <div className="font-bold text-lg text-green-700">
                      <EditableText value={businessPlan.business.unitEconomics.arr} onChange={v => updatePlan('business', 'unitEconomics', { ...businessPlan.business.unitEconomics, arr: v })} editMode={editMode} />
                    </div>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <div className="text-sm text-gray-600">Customer Acquisition Cost (CAC)</div>
                    <div className="font-bold text-lg text-yellow-700">
                      <EditableText value={businessPlan.business.unitEconomics.cac} onChange={v => updatePlan('business', 'unitEconomics', { ...businessPlan.business.unitEconomics, cac: v })} editMode={editMode} />
                    </div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <div className="text-sm text-gray-600">Lifetime Value (LTV)</div>
                    <div className="font-bold text-lg text-blue-700">
                      <EditableText value={businessPlan.business.unitEconomics.ltv} onChange={v => updatePlan('business', 'unitEconomics', { ...businessPlan.business.unitEconomics, ltv: v })} editMode={editMode} />
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="text-sm text-gray-600">CAC Payback Period</div>
                    <div className="font-bold text-lg text-gray-700">
                      <EditableText value={businessPlan.business.unitEconomics.payback} onChange={v => updatePlan('business', 'unitEconomics', { ...businessPlan.business.unitEconomics, payback: v })} editMode={editMode} />
                    </div>
                  </div>
                </div>
              </div>
          </div>
        );
        
    case 'gtm':
        return (
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold mb-5 text-gray-800">Go-to-Market: The Flywheel Effect</h3>
              <p className="text-gray-700 mb-6 text-base sm:text-lg leading-relaxed">Rather than a linear sales process, our GTM is a self-reinforcing ecosystem. Each vertical generates leads and provides data for the others, creating compounding growth and a powerful competitive moat.</p>
              
              <h4 className="font-semibold text-gray-800 mb-4 flex items-center justify-between">
                GTM Phases
                {editMode && (
                  <button
                    onClick={() => addArrayItem('gtm', 'phases', { name: 'New Phase', duration: 'Varies', target: 'N/A', channels: 'N/A', offer: 'N/A', focus: 'Focus here.' })}
                    className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                    aria-label="Add new GTM phase"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                )}
              </h4>
              <div className="space-y-4">
                {businessPlan.gtm.phases.map((phase, idx) => (
                  <div key={idx} className="group bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-xl hover:bg-blue-100 transition-colors relative">
                    <h5 className="font-bold text-lg text-blue-800">
                      <EditableText value={phase.name} onChange={v => updateArrayItem('gtm', 'phases', idx, { name: v })} editMode={editMode} />
                    </h5>
                    <p className="text-sm text-gray-700 mt-1"><strong>Focus:</strong> <EditableText value={phase.focus} onChange={v => updateArrayItem('gtm', 'phases', idx, { focus: v })} editMode={editMode} multiline /></p>
                    {editMode && (
                      <button
                        onClick={() => removeArrayItem('gtm', 'phases', idx)}
                        className="absolute top-2 right-2 p-1 text-red-500 hover:text-red-700 transition-colors opacity-0 group-hover:opacity-100"
                        aria-label="Remove phase"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <h4 className="font-semibold text-gray-800 mt-8 mb-4 flex items-center justify-between">
                Key Channels
                {editMode && (
                  <button
                    onClick={() => addArrayItem('gtm', 'channels', { channel: 'New Channel', investment: 'N/A', roi: 'N/A', timeframe: 'N/A' })}
                    className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                    aria-label="Add new channel"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                )}
              </h4>
              <div className="overflow-x-auto mb-8">
                <table className="w-full text-sm border-collapse">
                  <thead className="bg-gray-100 sticky top-0">
                    <tr>
                      <th className="p-3 text-left border-b border-gray-200 min-w-[120px]">Channel</th>
                      <th className="p-3 text-left border-b border-gray-200 min-w-[100px]">Investment</th>
                      <th className="p-3 text-left border-b border-gray-200 min-w-[80px]">ROI</th>
                      <th className="p-3 text-left border-b border-gray-200 min-w-[100px]">Timeframe</th>
                      {editMode && <th className="p-3 text-center border-b border-gray-200 w-16"></th>}
                    </tr>
                  </thead>
                  <tbody>
                    {businessPlan.gtm.channels.map((channel, idx) => (
                      <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50 transition-colors group">
                        <td className="p-3 text-gray-800"><EditableText value={channel.channel} onChange={v => updateArrayItem('gtm', 'channels', idx, { channel: v })} editMode={editMode} /></td>
                        <td className="p-3 text-gray-700"><EditableText value={channel.investment} onChange={v => updateArrayItem('gtm', 'channels', idx, { investment: v })} editMode={editMode} /></td>
                        <td className="p-3 text-gray-700"><EditableText value={channel.roi} onChange={v => updateArrayItem('gtm', 'channels', idx, { roi: v })} editMode={editMode} /></td>
                        <td className="p-3 text-gray-700"><EditableText value={channel.timeframe} onChange={v => updateArrayItem('gtm', 'channels', idx, { timeframe: v })} editMode={editMode} /></td>
                        {editMode && (
                          <td className="p-3 text-center">
                            <button
                              onClick={() => removeArrayItem('gtm', 'channels', idx)}
                              className="p-1 text-red-500 hover:text-red-700 transition-colors"
                              aria-label="Remove channel"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h4 className="font-semibold text-gray-800 mt-8 mb-4 flex items-center justify-between">
                Sales Process
                {editMode && (
                  <button
                    onClick={() => addArrayItem('gtm', 'salesProcess', { stage: 'New Stage', duration: 'N/A', conversion: 'N/A' })}
                    className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                    aria-label="Add new sales process stage"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                )}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {businessPlan.gtm.salesProcess.map((stage, idx) => (
                  <div key={idx} className="group bg-green-50 p-4 rounded-lg border border-green-200 hover:shadow-sm transition-shadow relative">
                    <h5 className="font-bold text-green-800">
                      <EditableText value={stage.stage} onChange={v => updateArrayItem('gtm', 'salesProcess', idx, { stage: v })} editMode={editMode} />
                    </h5>
                    <p className="text-sm text-gray-700">Duration: <EditableText value={stage.duration} onChange={v => updateArrayItem('gtm', 'salesProcess', idx, { duration: v })} editMode={editMode} /></p>
                    <p className="text-sm text-gray-700">Conversion: <EditableText value={stage.conversion} onChange={v => updateArrayItem('gtm', 'salesProcess', idx, { conversion: v })} editMode={editMode} /></p>
                    {editMode && (
                      <button
                        onClick={() => removeArrayItem('gtm', 'salesProcess', idx)}
                        className="absolute top-2 right-2 p-1 text-red-500 hover:text-red-700 transition-colors opacity-0 group-hover:opacity-100"
                        aria-label="Remove stage"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <h4 className="font-semibold text-gray-800 mt-8 mb-4 flex items-center justify-between">
                Strategic Partnerships
                {editMode && (
                  <button
                    onClick={() => addArrayItem('gtm', 'partnerships', { partner: 'New Partner', value: 'N/A', type: 'N/A' })}
                    className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                    aria-label="Add new partnership"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                )}
              </h4>
              <div className="space-y-4">
                {businessPlan.gtm.partnerships.map((partner, idx) => (
                  <div key={idx} className="group border-2 border-orange-200 rounded-xl p-4 bg-orange-50 hover:bg-orange-100 transition-colors relative">
                    <h5 className="font-bold text-orange-800">
                      <EditableText value={partner.partner} onChange={v => updateArrayItem('gtm', 'partnerships', idx, { partner: v })} editMode={editMode} />
                    </h5>
                    <p className="text-sm text-gray-700 mt-1">Value: <EditableText value={partner.value} onChange={v => updateArrayItem('gtm', 'partnerships', idx, { value: v })} editMode={editMode} /></p>
                    <p className="text-sm text-gray-700">Type: <EditableText value={partner.type} onChange={v => updateArrayItem('gtm', 'partnerships', idx, { type: v })} editMode={editMode} /></p>
                    {editMode && (
                      <button
                        onClick={() => removeArrayItem('gtm', 'partnerships', idx)}
                        className="absolute top-2 right-2 p-1 text-red-500 hover:text-red-700 transition-colors opacity-0 group-hover:opacity-100"
                        aria-label="Remove partnership"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
        
    case 'financial':
        return (
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold mb-5 text-gray-800">Financial Vision & Projections</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {[1, 2, 3].map(year => (
                  <button
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-200 ${
                      selectedYear === year
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Year {year}
                  </button>
                ))}
              </div>
              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                <h4 className="font-bold mb-3 text-gray-800 flex items-center justify-between">
                  Year {selectedYear} Key Milestones
                  {editMode && (
                    <button
                      onClick={() => setBusinessPlan(prev => {
                        const newYears = {...prev.financial.years};
                        newYears[selectedYear] = { ...newYears[selectedYear], milestones: [...newYears[selectedYear].milestones, 'New milestone'] };
                        return { ...prev, financial: { ...prev.financial, years: newYears } };
                      })}
                      className="p-1 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                      aria-label="Add new milestone"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  )}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {businessPlan.financial.years[selectedYear].milestones.map((milestone, idx) => (
                    <div key={idx} className="flex items-start space-x-2 group relative py-1 px-2 rounded-md hover:bg-gray-100">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 flex-1">
                        <EditableText 
                          value={milestone} 
                          onChange={(v) => {
                            setBusinessPlan(prev => {
                              const newYears = {...prev.financial.years};
                              const newMilestones = [...newYears[selectedYear].milestones];
                              newMilestones[idx] = v;
                              newYears[selectedYear] = {...newYears[selectedYear], milestones: newMilestones};
                              return {
                                ...prev,
                                financial: {
                                  ...prev.financial,
                                  years: newYears
                                }
                              }
                            })
                          }} 
                          editMode={editMode} 
                        />
                      </span>
                      {editMode && (
                        <button
                          onClick={() => setBusinessPlan(prev => {
                            const newYears = {...prev.financial.years};
                            const newMilestones = newYears[selectedYear].milestones.filter((_: string, i: number) => i !== idx);
                            newYears[selectedYear] = {...newYears[selectedYear], milestones: newMilestones};
                            return { ...prev, financial: { ...prev.financial, years: newYears } };
                          })}
                          className="absolute right-2 p-1 text-red-500 hover:text-red-700 transition-colors opacity-0 group-hover:opacity-100"
                          aria-label="Remove milestone"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold mb-5 text-gray-800">Revenue Breakdown (by %)</h3>
              {/* NEW CHART ADDITION */}
              <div className="mb-8">
                <h4 className="text-xl font-bold mb-4 text-gray-800">Visual Summary</h4>
                <RevenueBreakdownChart data={businessPlan.financial.revenueBreakdown} />
              </div>
              {/* END NEW CHART ADDITION */}
              <div className="overflow-x-auto mb-8">
                <table className="w-full text-sm border-collapse">
                  <thead className="bg-gray-100 sticky top-0">
                    <tr>
                      <th className="p-3 text-left border-b border-gray-200 min-w-[120px]">Revenue Stream</th>
                      <th className="p-3 text-center border-b border-gray-200 min-w-[80px]">Year 1</th>
                      <th className="p-3 text-center border-b border-gray-200 min-w-[80px]">Year 2</th>
                      <th className="p-3 text-center border-b border-gray-200 min-w-[80px]">Year 3</th>
                      {editMode && <th className="p-3 text-center border-b border-gray-200 w-16"></th>}
                    </tr>
                  </thead>
                  <tbody>
                    {businessPlan.financial.revenueBreakdown.map((item, idx) => (
                      <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50 transition-colors group">
                        <td className="p-3 text-gray-800"><EditableText value={item.stream} onChange={v => updateArrayItem('financial', 'revenueBreakdown', idx, { stream: v })} editMode={editMode} /></td>
                        <td className="p-3 text-center text-gray-700"><EditableText value={String(item.y1)} onChange={v => updateArrayItem('financial', 'revenueBreakdown', idx, { y1: parseInt(v) || 0 })} editMode={editMode} />%</td>
                        <td className="p-3 text-center text-gray-700"><EditableText value={String(item.y2)} onChange={v => updateArrayItem('financial', 'revenueBreakdown', idx, { y2: parseInt(v) || 0 })} editMode={editMode} />%</td>
                        <td className="p-3 text-center text-gray-700"><EditableText value={String(item.y3)} onChange={v => updateArrayItem('financial', 'revenueBreakdown', idx, { y3: parseInt(v) || 0 })} editMode={editMode} />%</td>
                        {editMode && (
                          <td className="p-3 text-center">
                            <button
                              onClick={() => removeArrayItem('financial', 'revenueBreakdown', idx)}
                              className="p-1 text-red-500 hover:text-red-700 transition-colors"
                              aria-label="Remove revenue stream breakdown"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        )}
                      </tr>
                    ))}
                    {editMode && (
                      <tr>
                        <td colSpan={5} className="p-3 text-center">
                          <button
                            onClick={() => addArrayItem('financial', 'revenueBreakdown', { stream: 'New Stream', y1: 0, y2: 0, y3: 0 })}
                            className="flex items-center justify-center space-x-2 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors mx-auto"
                            aria-label="Add new revenue stream breakdown"
                          >
                            <Plus className="w-4 h-4" /> <span>Add Stream</span>
                          </button>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold mb-5 text-gray-800 flex items-center justify-between">
                Funding Strategy
                {editMode && (
                  <button
                    onClick={() => addArrayItem('financial', 'funding', { use: 'New Use', amount: '' })}
                    className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                    aria-label="Add new funding use"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                )}
              </h3>
              <div className="bg-gray-50 p-5 rounded-lg mb-6 border border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-700 text-lg">Total Funding Required:</span>
                  <span className="text-2xl font-bold text-blue-600">
                    <EditableText
                      value={businessPlan.financial.funding.amount}
                      onChange={(v) => {
                        setBusinessPlan(prev => ({
                          ...prev,
                          financial: {
                            ...prev.financial,
                            funding: {
                              ...prev.financial.funding,
                              amount: v,
                            }
                          }
                        }));
                      }}
                      editMode={editMode}
                      className="text-2xl font-bold text-blue-600"
                    />
                  </span>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3 text-gray-800">Allocation of Funds:</h4>
                <div className="space-y-3">
                  {businessPlan.financial.funding.uses.map((use, idx) => (
                    <div key={idx} className="group flex justify-between items-center p-4 border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow relative">
                      <div className="flex-1 pr-4">
                        <EditableText
                          value={use.use}
                          onChange={(v) => {
                            setBusinessPlan(prev => {
                              const newUses = [...prev.financial.funding.uses];
                              newUses[idx] = { ...newUses[idx], use: v };
                              return {
                                ...prev,
                                financial: {
                                  ...prev.financial,
                                  funding: {
                                    ...prev.financial.funding,
                                    uses: newUses,
                                  },
                                },
                              };
                            });
                          }}
                          editMode={editMode}
                          multiline
                        />
                      </div>
                      <div className="font-semibold text-gray-700 w-32 text-right">
                         <EditableText
                          value={use.amount}
                          onChange={(v) => {
                            setBusinessPlan(prev => {
                              const newUses = [...prev.financial.funding.uses];
                              newUses[idx] = { ...newUses[idx], amount: v };
                              return {
                                ...prev,
                                financial: {
                                  ...prev.financial,
                                  funding: {
                                    ...prev.financial.funding,
                                    uses: newUses,
                                  },
                                },
                              };
                            });
                          }}
                          editMode={editMode}
                          className="text-right"
                        />
                      </div>
                      {editMode && (
                        <button
                          onClick={() => {
                            setBusinessPlan(prev => {
                              const newUses = prev.financial.funding.uses.filter((_: any, i: number) => i !== idx);
                              return {
                                ...prev,
                                financial: {
                                  ...prev.financial,
                                  funding: {
                                    ...prev.financial.funding,
                                    uses: newUses,
                                  },
                                },
                              };
                            });
                          }}
                          className="absolute top-2 right-2 p-1 text-red-500 hover:text-red-700 transition-colors opacity-0 group-hover:opacity-100"
                          aria-label="Remove funding use"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
        
    case 'roadmap':
        return (
           <div className="bg-white p-6 rounded-xl shadow-lg space-y-8">
              <h3 className="text-2xl font-bold mb-5 text-gray-800">Strategic Implementation Roadmap</h3>
              
              <div className="space-y-6">
                <h4 className="font-semibold text-gray-800 mb-4 flex items-center justify-between">
                  Launch Phases
                  {editMode && (
                    <button
                      onClick={() => addArrayItem('roadmap', 'launch', { month: 'New Phase', focus: 'New Focus', tasks: ['New task'] })}
                      className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                      aria-label="Add new launch phase"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  )}
                </h4>
                {businessPlan.roadmap.launch.map((phase, idx) => {
                  const colors = ['green', 'blue', 'purple'];
                  const currentColor = colors[idx % colors.length];
                  return (
                    <div key={idx} className={`group border-l-4 border-${currentColor}-500 pl-6 relative pb-4 hover:bg-gray-50 rounded-r-lg transition-colors`}>
                      <div className={`absolute -left-3 top-0 w-6 h-6 rounded-full bg-${currentColor}-500 border-4 border-white flex items-center justify-center text-white font-bold text-xs`}>
                        {idx + 1}
                      </div>
                      <div className="mb-2 flex flex-wrap items-center">
                        <span className={`text-${currentColor}-600 font-bold text-lg mr-3`}>
                          <EditableText value={phase.month} onChange={(v) => updateArrayItem('roadmap', 'launch', idx, { month: v })} editMode={editMode} />
                        </span>
                        <span className="text-gray-600">• <EditableText value={phase.focus} onChange={(v) => updateArrayItem('roadmap', 'launch', idx, { focus: v })} editMode={editMode} /></span>
                      </div>
                      <div className="space-y-2">
                        <h5 className="font-semibold text-gray-800 flex items-center justify-between">
                          Tasks
                          {editMode && (
                            <button
                              onClick={(e) => { e.stopPropagation(); updateNestedArrayItem('roadmap', 'launch', idx, 'tasks', phase.tasks.length, 'New task'); }}
                              className="p-1 bg-blue-400 text-white rounded-full hover:bg-blue-500 transition-colors"
                              aria-label="Add new task"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          )}
                        </h5>
                        {phase.tasks.map((task, taskIdx) => (
                          <div key={taskIdx} className="flex items-start space-x-2 text-sm group relative py-1 px-2 rounded-md hover:bg-gray-100">
                            <CheckCircle className={`w-4 h-4 text-${currentColor}-600 flex-shrink-0 mt-0.5`} />
                            <span className="flex-1">
                              <EditableText value={task} onChange={(v) => updateNestedArrayItem('roadmap', 'launch', idx, 'tasks', taskIdx, v)} editMode={editMode} />
                            </span>
                            {editMode && (
                              <button
                                onClick={(e) => { e.stopPropagation(); 
                                  setBusinessPlan(prev => {
                                    const newLaunch = [...prev.roadmap.launch];
                                    const newTasks = newLaunch[idx].tasks.filter((_: string, i: number) => i !== taskIdx);
                                    newLaunch[idx] = { ...newLaunch[idx], tasks: newTasks };
                                    return { ...prev, roadmap: { ...prev.roadmap, launch: newLaunch } };
                                  });
                                }}
                                className="absolute right-2 p-1 text-red-500 hover:text-red-700 transition-colors opacity-0 group-hover:opacity-100"
                                aria-label="Remove task"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                      {editMode && (
                        <button
                          onClick={() => removeArrayItem('roadmap', 'launch', idx)}
                          className="absolute top-2 right-2 p-1 text-red-500 hover:text-red-700 transition-colors opacity-0 group-hover:opacity-100"
                          aria-label="Remove phase"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4 flex items-center justify-between">
                  Product Roadmap
                  {editMode && (
                    <button
                      onClick={() => addArrayItem('roadmap', 'productRoadmap', { quarter: 'New Quarter', items: ['New item'] })}
                      className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                      aria-label="Add new product roadmap quarter"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  )}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {businessPlan.roadmap.productRoadmap.map((quarter, idx) => (
                    <div key={idx} className="group bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative">
                      <h5 className="font-bold text-blue-800 mb-2">
                        <EditableText value={quarter.quarter} onChange={(v) => updateArrayItem('roadmap', 'productRoadmap', idx, { quarter: v })} editMode={editMode} />
                      </h5>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <h6 className="font-semibold text-gray-800 flex items-center justify-between">
                          Items
                          {editMode && (
                            <button
                              onClick={(e) => { e.stopPropagation(); updateNestedArrayItem('roadmap', 'productRoadmap', idx, 'items', quarter.items.length, 'New item'); }}
                              className="p-1 bg-blue-400 text-white rounded-full hover:bg-blue-500 transition-colors"
                              aria-label="Add new item"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          )}
                        </h6>
                        {quarter.items.map((item, itemIdx) => (
                          <li key={itemIdx} className="flex items-start space-x-2 group relative py-1 px-2 rounded-md hover:bg-gray-50">
                            <CheckCircle className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                            <span className="flex-1">
                              <EditableText value={item} onChange={(v) => updateNestedArrayItem('roadmap', 'productRoadmap', idx, 'items', itemIdx, v)} editMode={editMode} />
                            </span>
                            {editMode && (
                              <button
                                onClick={(e) => { e.stopPropagation(); 
                                  setBusinessPlan(prev => {
                                    const newRoadmap = [...prev.roadmap.productRoadmap];
                                    const newItems = newRoadmap[idx].items.filter((_: string, i: number) => i !== itemIdx);
                                    newRoadmap[idx] = { ...newRoadmap[idx], items: newItems };
                                    return { ...prev, roadmap: { ...prev.roadmap, productRoadmap: newRoadmap } };
                                  });
                                }}
                                className="absolute right-2 p-1 text-red-500 hover:text-red-700 transition-colors opacity-0 group-hover:opacity-100"
                                aria-label="Remove item"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </li>
                        ))}
                      </ul>
                      {editMode && (
                        <button
                          onClick={() => removeArrayItem('roadmap', 'productRoadmap', idx)}
                          className="absolute top-2 right-2 p-1 text-red-500 hover:text-red-700 transition-colors opacity-0 group-hover:opacity-100"
                          aria-label="Remove quarter"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4 flex items-center justify-between">
                  Team Building
                  {editMode && (
                    <button
                      onClick={() => addArrayItem('roadmap', 'teamBuilding', { department: 'New Dept', hires: { y1: 0, y2: 0, y3: 0 }, key: ['New Key Hire'] })}
                      className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                      aria-label="Add new department"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  )}
                </h4>
                <div className="space-y-4">
                  {businessPlan.roadmap.teamBuilding.map((dept, idx) => (
                    <div key={idx} className="group bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative">
                      <h5 className="font-bold text-indigo-800 mb-2">
                        <EditableText value={dept.department} onChange={(v) => updateArrayItem('roadmap', 'teamBuilding', idx, { department: v })} editMode={editMode} />
                      </h5>
                      <div className="grid grid-cols-3 gap-2 text-sm text-gray-700 mb-2">
                        <div>Y1 Hires: <EditableText value={String(dept.hires.y1)} onChange={v => updateArrayItem('roadmap', 'teamBuilding', idx, { hires: {...dept.hires, y1: parseInt(v) || 0} })} editMode={editMode} /></div>
                        <div>Y2 Hires: <EditableText value={String(dept.hires.y2)} onChange={v => updateArrayItem('roadmap', 'teamBuilding', idx, { hires: {...dept.hires, y2: parseInt(v) || 0} })} editMode={editMode} /></div>
                        <div>Y3 Hires: <EditableText value={String(dept.hires.y3)} onChange={v => updateArrayItem('roadmap', 'teamBuilding', idx, { hires: {...dept.hires, y3: parseInt(v) || 0} })} editMode={editMode} /></div>
                      </div>
                      <h6 className="font-semibold text-gray-800 flex items-center justify-between">
                        Key Hires
                        {editMode && (
                          <button
                            onClick={(e) => { e.stopPropagation(); updateNestedArrayItem('roadmap', 'teamBuilding', idx, 'key', dept.key.length, 'New Key Hire'); }}
                            className="p-1 bg-blue-400 text-white rounded-full hover:bg-blue-500 transition-colors"
                            aria-label="Add new key hire"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        )}
                      </h6>
                      <ul className="text-sm text-gray-700 space-y-1">
                        {dept.key.map((hire, hireIdx) => (
                          <li key={hireIdx} className="flex items-start space-x-2 group relative py-1 px-2 rounded-md hover:bg-gray-50">
                            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                            <span className="flex-1">
                              <EditableText value={hire} onChange={(v) => updateNestedArrayItem('roadmap', 'teamBuilding', idx, 'key', hireIdx, v)} editMode={editMode} />
                            </span>
                            {editMode && (
                              <button
                                onClick={(e) => { e.stopPropagation(); 
                                  setBusinessPlan(prev => {
                                    const newTeamBuilding = [...prev.roadmap.teamBuilding];
                                    const newKey = newTeamBuilding[idx].key.filter((_: string, i: number) => i !== hireIdx);
                                    newTeamBuilding[idx] = { ...newTeamBuilding[idx], key: newKey };
                                    return { ...prev, roadmap: { ...prev.roadmap, teamBuilding: newTeamBuilding } };
                                  });
                                }}
                                className="absolute right-2 p-1 text-red-500 hover:text-red-700 transition-colors opacity-0 group-hover:opacity-100"
                                aria-label="Remove key hire"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </li>
                        ))}
                      </ul>
                      {editMode && (
                        <button
                          onClick={() => removeArrayItem('roadmap', 'teamBuilding', idx)}
                          className="absolute top-2 right-2 p-1 text-red-500 hover:text-red-700 transition-colors opacity-0 group-hover:opacity-100"
                          aria-label="Remove department"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4 flex items-center justify-between">
                  Key Performance Indicators (KPIs)
                  {editMode && (
                    <button
                      onClick={() => addArrayItem('roadmap', 'kpis', { metric: 'New KPI', target: 'New Target' })}
                      className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                      aria-label="Add new KPI"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  )}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {businessPlan.roadmap.kpis.map((kpi, idx) => (
                    <div key={idx} className="group bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative">
                      <h5 className="font-bold text-gray-900">
                        <EditableText value={kpi.metric} onChange={(v) => updateArrayItem('roadmap', 'kpis', idx, { metric: v })} editMode={editMode} />
                      </h5>
                      <p className="text-sm text-gray-700">Target: <EditableText value={kpi.target} onChange={(v) => updateArrayItem('roadmap', 'kpis', idx, { target: v })} editMode={editMode} /></p>
                      {editMode && (
                        <button
                          onClick={() => removeArrayItem('roadmap', 'kpis', idx)}
                          className="absolute top-2 right-2 p-1 text-red-500 hover:text-red-700 transition-colors opacity-0 group-hover:opacity-100"
                          aria-label="Remove KPI"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
        );
        
    case 'risks':
        return (
           <div className="space-y-8">
             <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-2xl font-bold mb-5 text-gray-800 flex items-center justify-between">
                  Risks & Mitigation Strategies
                  {editMode && (
                    <button
                      onClick={() => addTopLevelArrayItem('risks', { risk: 'New Risk', level: 'Medium', description: 'Description here.', mitigation: ['New mitigation'] })}
                      className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                      aria-label="Add new risk"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  )}
                </h3>
               <div className="space-y-4">
                {businessPlan.risks.map((r, idx) => {
                  const isExpanded = expandedItems[`risk-${idx}`];
                  const levelColor = r.level === 'High' ? 'red' : r.level === 'Medium' ? 'yellow' : 'green';
                  return (
                    <div key={idx} className={`border-2 border-${levelColor}-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow`}>
                      <div 
                        className={`p-4 cursor-pointer bg-${levelColor}-50 hover:bg-${levelColor}-100 transition-colors flex items-center justify-between`}
                        onClick={() => toggleExpand(`risk-${idx}`)}
                      >
                        <div className="flex-1 pr-4">
                          <div className="flex items-center space-x-3 mb-2">
                            <div className={`px-3 py-1 rounded-full text-xs font-bold bg-${levelColor}-200 text-${levelColor}-800`}>
                              {editMode ? (
                                <select
                                  value={r.level}
                                  onChange={(e) => {
                                    setBusinessPlan(prev => {
                                      const newRisks = [...prev.risks];
                                      newRisks[idx] = {...newRisks[idx], level: e.target.value};
                                      return {...prev, risks: newRisks};
                                    });
                                  }}
                                  className={`bg-transparent text-xs font-bold focus:outline-none text-${levelColor}-800`}
                                >
                                  <option>Low</option>
                                  <option>Medium</option>
                                  <option>High</option>
                                </select>
                              ) : (
                                `${r.level} Risk`
                              )}
                            </div>
                            <div className="font-bold text-lg text-gray-900">
                              <EditableText value={r.risk} onChange={(v) => setBusinessPlan(prev => {
                                const newRisks = [...prev.risks];
                                newRisks[idx] = {...newRisks[idx], risk: v};
                                return {...prev, risks: newRisks};
                              })} editMode={editMode} />
                            </div>
                          </div>
                          <div className="text-sm text-gray-700">
                            <EditableText value={r.description} onChange={(v) => setBusinessPlan(prev => {
                                const newRisks = [...prev.risks];
                                newRisks[idx] = {...newRisks[idx], description: v};
                                return {...prev, risks: newRisks};
                              })} editMode={editMode} multiline />
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          {isExpanded ? 
                            <ChevronDown className="w-5 h-5 text-gray-600" /> : 
                            <ChevronRight className="w-5 h-5 text-gray-600" />
                          }
                          {editMode && (
                            <button
                              onClick={(e) => { e.stopPropagation(); removeTopLevelArrayItem('risks', idx); }}
                              className="p-1 text-red-500 hover:text-red-700 transition-colors"
                              aria-label="Remove risk"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                      {isExpanded && (
                        <div className="p-4 bg-white border-t border-gray-100">
                          <h4 className="font-semibold mb-2 text-gray-800 flex items-center justify-between">
                            Mitigation Strategies
                            {editMode && (
                              <button
                                onClick={(e) => { e.stopPropagation(); 
                                  setBusinessPlan(prev => {
                                    const newRisks = [...prev.risks];
                                    newRisks[idx] = { ...newRisks[idx], mitigation: [...newRisks[idx].mitigation, 'New mitigation step'] };
                                    return { ...prev, risks: newRisks };
                                  });
                                }}
                                className="p-1 bg-blue-400 text-white rounded-full hover:bg-blue-500 transition-colors"
                                aria-label="Add new mitigation step"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            )}
                          </h4>
                          <div className="space-y-2">
                            {r.mitigation.map((m, mIdx) => (
                              <div key={mIdx} className="flex items-start space-x-2 text-sm group relative py-1 px-2 rounded-md hover:bg-gray-50">
                                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                                <span className="flex-1">
                                  <EditableText value={m} onChange={(v) => {
                                      setBusinessPlan(prev => {
                                        const newRisks = [...prev.risks];
                                        const newMitigation = [...newRisks[idx].mitigation];
                                        newMitigation[mIdx] = v;
                                        newRisks[idx] = {...newRisks[idx], mitigation: newMitigation};
                                        return {...prev, risks: newRisks};
                                      });
                                  }} editMode={editMode} />
                                </span>
                                {editMode && (
                                  <button
                                    onClick={(e) => { e.stopPropagation(); 
                                      setBusinessPlan(prev => {
                                        const newRisks = [...prev.risks];
                                        const newMitigation = newRisks[idx].mitigation.filter((_: string, i: number) => i !== mIdx);
                                        newRisks[idx] = {...newRisks[idx], mitigation: newMitigation};
                                        return {...prev, risks: newRisks};
                                      });
                                    }}
                                    className="absolute right-2 p-1 text-red-500 hover:text-red-700 transition-colors opacity-0 group-hover:opacity-100"
                                    aria-label="Remove mitigation step"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold mb-5 text-gray-800 flex items-center justify-between">
                Critical Success Factors
                {editMode && (
                  <button
                    onClick={() => addTopLevelArrayItem('successFactors', { factor: 'New Factor', description: 'Description here.' })}
                    className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                    aria-label="Add new success factor"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                )}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {businessPlan.successFactors.map((sf, idx) => (
                  <div key={idx} className="group flex items-start space-x-3 bg-green-50 p-4 rounded-lg border border-green-200 hover:shadow-md transition-shadow">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">
                        <EditableText 
                          value={sf.factor}
                          onChange={(v) => setBusinessPlan(prev => {
                            const newSuccessFactors = [...prev.successFactors];
                            newSuccessFactors[idx] = {...newSuccessFactors[idx], factor: v};
                            return {...prev, successFactors: newSuccessFactors};
                          })}
                          editMode={editMode}
                        />
                      </div>
                      <div className="text-sm text-gray-700 mt-1">
                        <EditableText 
                          value={sf.description}
                          onChange={(v) => setBusinessPlan(prev => {
                            const newSuccessFactors = [...prev.successFactors];
                            newSuccessFactors[idx] = {...newSuccessFactors[idx], description: v};
                            return {...prev, successFactors: newSuccessFactors};
                          })}
                          editMode={editMode}
                          multiline
                        />
                      </div>
                    </div>
                    {editMode && (
                      <button
                        onClick={() => removeTopLevelArrayItem('successFactors', idx)}
                        className="p-1 text-red-500 hover:text-red-700 transition-colors"
                        aria-label="Remove success factor"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
           </div>
        );

    default:
      return null;
  }
};

const App = () => {
  const [activeSection, setActiveSection] = useState('executive');
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  const [selectedYear, setSelectedYear] = useState(1);
  const [editMode, setEditMode] = useState(false);
  const [businessPlan, setBusinessPlan] = useState<BusinessPlan>(initialBusinessPlan);

  const toggleExpand = (id: string) => {
    setExpandedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const exportPlan = () => {
    const dataStr = JSON.stringify(businessPlan, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${businessPlan.companyName.replace(/\s+/g, '_')}_BusinessPlan.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const importPlan = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const imported = JSON.parse(e.target?.result as string);
          setBusinessPlan(imported);
          alert('Business plan imported successfully!');
        } catch (error) {
          alert('Error importing file. Please make sure it\'s a valid JSON file.');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 p-4 sm:p-6 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
            <div className="flex-1 mb-4 sm:mb-0">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
                <EditableText 
                  value={businessPlan.companyName}
                  onChange={(v) => setBusinessPlan(prev => ({...prev, companyName: v}))}
                  editMode={editMode}
                  className="text-gray-800"
                />
              </h1>
              <p className="text-gray-600 text-base sm:text-lg">Interactive Strategic Overview</p>
            </div>
            <div className="text-left sm:text-right">
              <div className="text-2xl sm:text-3xl font-bold text-blue-600">
                <EditableText 
                  value={businessPlan.targetValuation}
                  onChange={(v) => setBusinessPlan(prev => ({...prev, targetValuation: v}))}
                  editMode={editMode}
                />
              </div>
              <div className="text-sm text-gray-600">Target Valuation</div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 mt-6 pt-4 border-t border-gray-100">
            <button
              onClick={() => setEditMode(!editMode)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold transition-all duration-200 shadow-md ${
                editMode
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {editMode ? <Save className="w-5 h-5" /> : <Edit3 className="w-5 h-5" />}
              <span>{editMode ? 'Save & View' : 'Edit Mode'}</span>
            </button>
            
            <button
              onClick={exportPlan}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-800 transition-all duration-200 shadow-md"
            >
              <Download className="w-5 h-5" />
              <span>Export JSON</span>
            </button>
            
            <label className="flex items-center space-x-2 px-4 py-2 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-800 transition-all duration-200 shadow-md cursor-pointer">
              <Upload className="w-5 h-5" />
              <span>Import JSON</span>
              <input
                type="file"
                accept=".json"
                onChange={importPlan}
                className="hidden"
              />
            </label>
            
            {editMode && (
              <div className="text-sm bg-yellow-100 text-yellow-800 px-3 py-2 rounded-lg border border-yellow-300 animate-pulse flex-1 text-center md:flex-none">
                <strong>Edit Mode:</strong> Click any text to modify
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="bg-white rounded-xl shadow-lg p-3 sm:p-4 mb-6 sticky top-4 z-10">
          <div className="flex flex-nowrap overflow-x-auto custom-scrollbar-hidden py-1 sm:justify-center -mx-2 sm:mx-0"> {/* custom-scrollbar-hidden for aesthetic on webkit browsers */}
            {sections.map((section) => {
              const IconComponent = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center flex-shrink-0 space-x-2 px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base rounded-lg font-semibold transition-all duration-200 mx-1 ${
                    activeSection === section.id
                      ? 'bg-blue-600 text-white shadow-lg scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  aria-label={section.name}
                >
                  <IconComponent className="w-5 h-5" />
                  <span className="hidden sm:inline">{section.name}</span>
                  <span className="sm:hidden text-center">{section.name.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="transition-all duration-300">
          <SectionContent 
            sectionId={activeSection} 
            businessPlan={businessPlan}
            setBusinessPlan={setBusinessPlan}
            editMode={editMode}
            expandedItems={expandedItems}
            toggleExpand={toggleExpand}
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
          />
        </div>

        {/* Footer */}
        <div className="mt-8 bg-gradient-to-r from-gray-800 to-blue-900 text-white rounded-xl p-6 sm:p-8 text-center shadow-lg">
          <h3 className="text-2xl sm:text-3xl font-bold mb-2">BMMS Capital LLC</h3>
          <p className="mb-4 text-base sm:text-lg opacity-90">A unique convergence of institutional media authority, capital markets expertise, and artificial intelligence innovation.</p>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <div className="bg-white/20 px-6 py-3 rounded-lg backdrop-blur-sm">
              <div className="font-bold text-lg">Industry</div>
              <div className="text-sm">
                <EditableText 
                  value={businessPlan.industry}
                  onChange={(v) => setBusinessPlan(prev => ({...prev, industry: v}))}
                  className="bg-transparent text-white text-center"
                  editMode={editMode}
                />
              </div>
            </div>
             <div className="bg-white/20 px-6 py-3 rounded-lg backdrop-blur-sm">
              <div className="font-bold text-lg">Location</div>
              <div className="text-sm">New York, NY (Global)</div>
            </div>
            <div className="bg-white/20 px-6 py-3 rounded-lg backdrop-blur-sm">
              <div className="font-bold text-lg">Founded</div>
              <div className="text-sm">March 2022</div>
            </div>
          </div>
        </div>
      </div>
       {/* Tailwind CSS JIT Safelist - expanded for dynamic colors */}
      <div className="hidden 
          from-green-100 to-green-200 text-green-700 bg-green-50 bg-green-100 border-green-200 text-green-600 bg-green-200 text-green-800 border-green-500
          from-blue-100 to-blue-200 text-blue-700 bg-blue-50 bg-blue-100 border-blue-200 text-blue-600 bg-blue-200 text-blue-800 border-blue-500
          from-purple-100 to-purple-200 text-purple-700 bg-purple-50 bg-purple-100 border-purple-200 text-purple-600 bg-purple-200 text-purple-800 border-purple-500
          from-yellow-100 to-yellow-200 text-yellow-700 bg-yellow-50 bg-yellow-100 border-yellow-200 text-yellow-600 bg-yellow-200 text-yellow-800 border-yellow-500
          from-orange-100 to-orange-200 text-orange-700 bg-orange-50 bg-orange-100 border-orange-200 text-orange-600 bg-orange-200 text-orange-800 border-orange-500
          from-red-100 to-red-200 text-red-700 bg-red-50 bg-red-100 border-red-200 text-red-600 bg-red-200 text-red-800 border-red-500
          from-indigo-100 to-indigo-200 text-indigo-700 bg-indigo-50 bg-indigo-100 border-indigo-200 text-indigo-600 bg-indigo-200 text-indigo-800 border-indigo-500
      "></div>
    </div>
  );
};

export default App;