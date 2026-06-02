import type { ModulrHttpClient } from "../client";
import type { LaunchChecklistReport, TokenLaunchInput } from "../types/token-launch";

export class TokenLaunchModule {
  constructor(private readonly http: ModulrHttpClient) {}

  async check(input: TokenLaunchInput): Promise<LaunchChecklistReport> {
    if (!input.projectName?.trim()) {
      throw new Error("projectName is required");
    }
    return this.http.post<LaunchChecklistReport>("/api/generate/token-launch", input);
  }
}
