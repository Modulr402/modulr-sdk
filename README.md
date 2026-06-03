# @modulr/sdk

Official TypeScript SDK for the [Modulr](https://modulr402.com) API.

## Install

```bash
npm install @modulr/sdk
```

## Setup

```ts
import { Modulr } from '@modulr/sdk'

const modulr = new Modulr() // no API key required

// optional config
const modulr = new Modulr({
  timeoutMs: 30000, // default 30s
  maxRetries: 3,    // default 3
})
```

---

## Wallet Risk

Analyze a Solana wallet address and get a full risk report. Address is validated client-side before the request is sent.

```ts
const report = await modulr.walletRisk.analyze('9apA5U8...')

console.log(report.riskLevel)      // "Low Risk" | "Medium Risk" | "High Risk"
console.log(report.riskScore)      // 0–100
console.log(report.walletType)     // "DeFi Trader" | "Whale" | ...
console.log(report.warningSignals) // string[]
console.log(report.positiveSignals)// string[]
```

---

## Token Launch Checklist

Generate a launch readiness report for a token project.

```ts
const report = await modulr.tokenLaunch.check({
  projectName: 'MyToken',
  tokenTicker: 'MTK',
  chain: 'Solana',
  launchStage: 'Pre-launch',
  tokenomicsStatus: 'Complete',
  contractAuditStatus: 'In Progress',
  liquidityStatus: 'Not Started',
  dexListingStatus: 'Not Started',
  websiteStatus: 'Complete',
  socialsStatus: 'Complete',
})

console.log(report.readinessScore) // 0–100
console.log(report.readinessLevel) // "Not Ready" | "Needs Work" | "Almost Ready" | "Launch Ready"
console.log(report.riskFlags)      // string[]
console.log(report.nextSteps)      // string[]
```

Only `projectName` is required. All other fields default to sensible values.

---

## Smart Contract Audit

Run a static analysis audit on contract code.

```ts
const report = await modulr.audit.scan({
  contractText: `// SPDX-License-Identifier: MIT\npragma solidity ^0.8.0;\n...`,
  language: 'Solidity',           // "Solidity" | "Rust / Anchor" | "Move" | "Other / Notes"
  reviewDepth: 'Standard Review', // "Quick Review" | "Standard Review" | "Deep Review"
  projectContext: 'ERC-20 token with staking',
})

console.log(report.riskLevel)            // "Low Risk" | "Medium Risk" | "High Risk" | "Critical Risk"
console.log(report.riskScore)            // 0–100
console.log(report.findings)             // AuditFinding[]
console.log(report.deployRecommendation) // "Deploy" | "Deploy with caution" | ...
```

Only `contractText` is required.

---

## AI Agent Generator

Generate a complete, production-ready TypeScript agent script. Specify the agent type, target chain, framework, trigger conditions and parameters — the API returns a full runnable script with setup instructions, required environment variables and a dependency list.

```ts
const agent = await modulr.agent.generate({
  agentType: 'Wallet Monitor',       // "Trading Bot" | "Wallet Monitor" | "Price Alert" | "DeFi Automation" | "NFT Sniper" | "Portfolio Tracker" | "Liquidity Manager" | "Custom"
  agentName: 'SOL Whale Watcher',
  description: 'Monitor a Solana wallet for large SOL movements above a configurable threshold',
  targetChain: 'Solana',             // "Solana" | "Ethereum" | "Base" | "Arbitrum" | "Other"
  framework: 'Vanilla TypeScript',   // "Vanilla TypeScript" | "Anchor (Solana)" | "Ethers.js" | "Viem"
  triggerCondition: 'Poll every 60 seconds',
  parameters: 'walletAddress, thresholdSOL',
})

console.log(agent.scriptContent)      // complete .ts file ready to run
console.log(agent.setupInstructions)  // string[] — step-by-step setup guide
console.log(agent.requiredEnvVars)    // string[] — env vars needed to run
console.log(agent.dependencies)       // string[] — npm packages with exact versions
```

Only `agentName` and `description` are required.

---

## Error handling

Requests automatically retry up to 3 times on 503/529 responses. On timeout or final failure a `ModulrError` is thrown.

```ts
import { Modulr, ModulrError } from '@modulr/sdk'

try {
  const report = await modulr.walletRisk.analyze('invalid-address')
} catch (err) {
  if (err instanceof ModulrError) {
    console.error(err.message) // API error message
    console.error(err.status)  // HTTP status code (408 = timeout)
  }
}
```

---

## Types

All input and output types are exported directly from the package.

```ts
import type {
  WalletAnalysisReport,
  LaunchChecklistReport,
  AuditReport,
  AgentOutput,
} from '@modulr/sdk'
```
