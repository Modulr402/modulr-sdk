import type { ModulrHttpClient } from "../client";
import type { WalletAnalysisReport } from "../types/wallet-risk";

export class WalletRiskModule {
  constructor(private readonly http: ModulrHttpClient) {}

  async analyze(address: string): Promise<WalletAnalysisReport> {
    if (!address || typeof address !== "string") {
      throw new Error("address is required");
    }
    return this.http.post<WalletAnalysisReport>("/api/generate/wallet-risk", { address });
  }
}
