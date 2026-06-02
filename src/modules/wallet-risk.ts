import type { ModulrHttpClient } from "../client";
import type { WalletAnalysisReport } from "../types/wallet-risk";

const SOLANA_ADDRESS_REGEX = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;

export class WalletRiskModule {
  constructor(private readonly http: ModulrHttpClient) {}

  async analyze(address: string): Promise<WalletAnalysisReport> {
    if (!address || typeof address !== "string") {
      throw new Error("address is required");
    }
    if (!SOLANA_ADDRESS_REGEX.test(address.trim())) {
      throw new Error("Invalid Solana wallet address");
    }
    return this.http.post<WalletAnalysisReport>("/api/generate/wallet-risk", { address: address.trim() });
  }
}
