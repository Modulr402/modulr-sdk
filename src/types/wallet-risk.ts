export type WalletRiskLevel = "Low Risk" | "Medium Risk" | "High Risk";
export type WalletActivityClassification = "New Wallet" | "Active Wallet" | "Dormant Wallet" | "High Activity Wallet";
export type ConfidenceLevel = "Low" | "Medium" | "High";
export type WalletTypeClassification =
  | "DeFi Trader"
  | "NFT Collector"
  | "Pump.fun Trader"
  | "Whale"
  | "Bot / Automated"
  | "Fresh Wallet"
  | "Dormant Wallet"
  | "Regular User";

export interface ScoreBreakdown {
  walletAge: number;
  activity: number;
  tokenDiversity: number;
  balanceConsistency: number;
  dormancy: number;
}

export interface DimensionConfidence {
  walletAge: ConfidenceLevel;
  activity: ConfidenceLevel;
  tokenDiversity: ConfidenceLevel;
  balanceConsistency: ConfidenceLevel;
  dormancy: ConfidenceLevel;
}

export interface ActivityTimelineEntry {
  label: string;
  count: number;
}

export interface WalletAnalysisReport {
  walletAddress: string;
  rpcSource: string;
  solBalance: number;
  tokenAccountCount: number;
  recentTransactionCount: number;
  transactionsLast30Days: number;
  latestTransactionTimestamp: string | null;
  activityFrequency: string;
  walletAgeDays: number | null;
  walletAgeLabel: string;
  activityClassification: WalletActivityClassification;
  riskLevel: WalletRiskLevel;
  riskScore: number;
  scoreBreakdown: ScoreBreakdown;
  confidenceLevel: ConfidenceLevel;
  activitySummary: string;
  positiveSignals: string[];
  warningSignals: string[];
  explainability: string[];
  generatedAt: string;
  walletType?: WalletTypeClassification;
  detectedProtocols?: string[];
  nftCount?: number;
  fundingSource?: string;
  verdict?: string;
  dimensionConfidence?: DimensionConfidence;
  activityTimeline?: ActivityTimelineEntry[];
  uniqueCounterparties?: number;
  counterpartyPattern?: string;
}
