export type AgentType =
  | "Trading Bot"
  | "Wallet Monitor"
  | "Price Alert"
  | "DeFi Automation"
  | "NFT Sniper"
  | "Portfolio Tracker"
  | "Liquidity Manager"
  | "Custom";

export type AgentChain = "Solana" | "Ethereum" | "Base" | "Arbitrum" | "Other";
export type AgentFramework = "Vanilla TypeScript" | "Anchor (Solana)" | "Ethers.js" | "Viem";

export interface AgentInput {
  agentType: AgentType;
  agentName: string;
  description: string;
  targetChain: AgentChain;
  framework: AgentFramework;
  parameters?: string;
  triggerCondition?: string;
  additionalContext?: string;
}

export interface AgentOutput {
  agentName: string;
  agentType: AgentType;
  targetChain: AgentChain;
  framework: AgentFramework;
  scriptContent: string;
  setupInstructions: string[];
  requiredEnvVars: string[];
  generatedAt: string;
}
