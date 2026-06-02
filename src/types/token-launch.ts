export type LaunchChain = "Solana" | "Ethereum" | "Base" | "BNB Chain" | "Arbitrum" | "Other";
export type LaunchStage = "Ideation" | "Development" | "Pre-launch" | "Launch Ready";
export type LaunchStatusValue = "Not Started" | "In Progress" | "Complete";
export type ReadinessLevel = "Not Ready" | "Needs Work" | "Almost Ready" | "Launch Ready";
export type ChecklistItemStatus = "Complete" | "In Progress" | "Missing";
export type DiscrepancySeverity = "High" | "Medium" | "Low";
export type SectionBlockerImpact = "Critical" | "High" | "Medium";

export interface TokenLaunchInput {
  projectName: string;
  tokenTicker?: string;
  chain?: LaunchChain;
  launchStage?: LaunchStage;
  tokenomicsStatus?: LaunchStatusValue;
  contractAuditStatus?: LaunchStatusValue;
  liquidityStatus?: LaunchStatusValue;
  dexListingStatus?: LaunchStatusValue;
  websiteStatus?: LaunchStatusValue;
  socialsStatus?: LaunchStatusValue;
  mintAddress?: string;
}

export interface ChecklistItem {
  task: string;
  status: ChecklistItemStatus;
}

export interface ChecklistSection {
  title: string;
  completionRate: number;
  items: ChecklistItem[];
}

export interface SectionBlocker {
  section: string;
  impact: SectionBlockerImpact;
  blockers: string[];
}

export interface DiscrepancyFlag {
  field: string;
  claimed: string;
  actual: string;
  severity: DiscrepancySeverity;
}

export interface OnChainTokenData {
  mintAddress: string;
  name: string | null;
  symbol: string | null;
  decimals: number | null;
  supply: string | null;
  mintAuthorityRevoked: boolean;
  freezeAuthorityRevoked: boolean;
  hasLiquidity: boolean;
  liquidityPool: string | null;
  fetchedAt: string;
}

export interface LaunchChecklistReport {
  projectName: string;
  tokenTicker: string;
  chain: LaunchChain;
  launchStage: LaunchStage;
  readinessScore: number;
  readinessLevel: ReadinessLevel;
  sections: ChecklistSection[];
  riskFlags: string[];
  nextSteps: string[];
  generatedAt: string;
  onChainData?: OnChainTokenData;
  discrepancyFlags?: DiscrepancyFlag[];
  verdict?: string;
  sectionBlockers?: SectionBlocker[];
}
