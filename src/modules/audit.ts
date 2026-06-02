import type { ModulrHttpClient } from "../client";
import type { AuditInput, AuditReport } from "../types/audit";

export class AuditModule {
  constructor(private readonly http: ModulrHttpClient) {}

  async scan(input: AuditInput): Promise<AuditReport> {
    if (!input.contractText?.trim()) {
      throw new Error("contractText is required");
    }
    return this.http.post<AuditReport>("/api/audit/smart-contract", input);
  }
}
