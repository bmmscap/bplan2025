
export interface ExecutiveProblem {
  title: string;
  description: string;
}

export interface ExecutiveAdvantage {
  metric: string;
  description: string;
}

export interface ExecutiveSection {
  marketSize: string;
  yearThreeRevenue: string;
  uniqueValue: string;
  problems: ExecutiveProblem[];
  solution: string;
  advantages: ExecutiveAdvantage[];
}

export interface CustomerSegment {
  segment: string;
  size: string;
  arr: string;
  priority: string;
}

export interface CompetitiveAdvantage {
  feature: string;
  us: boolean;
  competitor1: boolean;
  competitor2: boolean;
}

export interface OpportunitySection {
  marketSize: string;
  marketGrowth: string;
  targetPercent: string;
  targetDescription: string;
  growthDrivers: string[];
  customerSegments: CustomerSegment[];
  competitiveAdvantages: CompetitiveAdvantage[];
}

export interface SolutionFeature {
  name: string;
  description: string;
  capabilities: string[];
  revenue: string;
}

export interface TechStackLayer {
  layer: string;
  technologies: string[];
}

export interface SolutionSection {
  description: string;
  features: SolutionFeature[];
  techStack: TechStackLayer[];
}

export interface RevenueStream {
  stream: string;
  model: string;
  pricing: string;
  margin: string;
  split: string;
}

export interface PricingTier {
  tier: string;
  price: string;
  target: string;
  includes: string[];
}

export interface UnitEconomics {
  arr: string;
  cac: string;
  ltv: string;
  payback: string;
}

export interface BusinessSection {
  revenueStreams: RevenueStream[];
  pricingTiers: PricingTier[];
  unitEconomics: UnitEconomics;
}

export interface GTMPhase {
  name: string;
  duration: string;
  target: string;
  channels: string;
  offer: string;
  focus: string;
}

export interface GTMChannel {
  channel: string;
  investment: string;
  roi: string;
  timeframe: string;
}

export interface SalesProcessStage {
  stage: string;
  duration: string;
  conversion: string;
}

export interface Partnership {
  partner: string;
  value: string;
  type: string;
}

export interface GTMSection {
  phases: GTMPhase[];
  channels: GTMChannel[];
  salesProcess: SalesProcessStage[];
  partnerships: Partnership[];
}

export interface FinancialYear {
  revenue: string;
  clients: string;
  arr: string;
  margin: string;
  team: string;
  milestones: string[];
}

export interface FinancialYears {
  [key: number]: FinancialYear;
}

export interface RevenueBreakdown {
  stream: string;
  y1: number;
  y2: number;
  y3: number;
}

export interface Cost {
  category: string;
  percent: string;
}

export interface FundingUse {
  use: string;
  amount: string;
}

export interface Funding {
  amount: string;
  uses: FundingUse[];
}

export interface FinancialSection {
  years: FinancialYears;
  revenueBreakdown: RevenueBreakdown[];
  costs: Cost[];
  funding: Funding;
}

export interface LaunchPhase {
  month: string;
  focus: string;
  tasks: string[];
}

export interface RoadmapQuarter {
  quarter: string;
  items: string[];
}

export interface TeamBuildingDepartment {
  department: string;
  hires: { y1: number; y2: number; y3: number };
  key: string[];
}

export interface KPI {
  metric: string;
  target: string;
}

export interface RoadmapSection {
  launch: LaunchPhase[];
  productRoadmap: RoadmapQuarter[];
  teamBuilding: TeamBuildingDepartment[];
  kpis: KPI[];
}

export interface Risk {
  risk: string;
  level: string;
  description: string;
  mitigation: string[];
}

export interface SuccessFactor {
  factor: string;
  description: string;
}

export interface BusinessPlan {
  companyName: string;
  tagline: string;
  industry: string;
  targetValuation: string;
  executive: ExecutiveSection;
  opportunity: OpportunitySection;
  solution: SolutionSection;
  business: BusinessSection;
  gtm: GTMSection;
  financial: FinancialSection;
  roadmap: RoadmapSection;
  risks: Risk[];
  successFactors: SuccessFactor[];
}
