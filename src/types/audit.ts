export type ContractLanguage = "Solidity" | "Rust / Anchor" | "Move" | "Other / Notes";
export type ReviewDepth = "Quick Review" | "Standard Review" | "Deep Review";
export type SeverityLevel = "Critical" | "High" | "Medium" | "Low" | "Informational";
export type AuditRiskLevel = "Low Risk" | "Medium Risk" | "High Risk" | "Critical Risk";
export type CheckStatus = "Pass" | "Warning" | "Fail" | "Unknown";
export type AuditConfidenceLevel = "Low" | "Medium" | "High";
export type DeployRecommendation = "Deploy" | "Deploy with caution" | "Address findings first" | "Do not deploy";
export type GasFindingImpact = "High" | "Medium" | "Low";

export interface AuditInput {
  contractText: string;
  language?: ContractLanguage;
  reviewDepth?: ReviewDepth;
  projectContext?: string;
}

export interface AuditFinding {
  id: string;
  severity: SeverityLevel;
  category: string;
  title: string;
  description: string;
}

export interface SecurityChecklistItem {
  check: string;
  status: CheckStatus;
  note?: string;
}

export interface GasFinding {
  id: string;
  title: string;
  description: string;
  impact: GasFindingImpact;
}

export interface AuditReport {
  language: ContractLanguage;
  reviewDepth: ReviewDepth;
  projectContext: string;
  riskLevel: AuditRiskLevel;
  confidenceLevel: AuditConfidenceLevel;
  riskScore: number;
  codeQualityScore: number;
  severityCounts: Record<SeverityLevel, number>;
  findings: AuditFinding[];
  securityChecklist: SecurityChecklistItem[];
  suggestedFixes: string[];
  positiveSignals: string[];
  linesAnalyzed: number;
  generatedAt: string;
  gasFindings?: GasFinding[];
  executiveSummary?: string;
  deployRecommendation?: DeployRecommendation;
}
