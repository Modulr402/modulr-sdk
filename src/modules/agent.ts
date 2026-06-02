import type { ModulrHttpClient } from "../client";
import type { AgentInput, AgentOutput } from "../types/agent";

export class AgentModule {
  constructor(private readonly http: ModulrHttpClient) {}

  async generate(input: AgentInput): Promise<AgentOutput> {
    if (!input.agentName?.trim()) throw new Error("agentName is required");
    if (!input.description?.trim()) throw new Error("description is required");
    return this.http.post<AgentOutput>("/api/generate/agent", input);
  }
}
