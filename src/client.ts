export interface ModulrClientOptions {
  apiKey?: string;
  baseUrl?: string;
  timeoutMs?: number;
  maxRetries?: number;
}

export class ModulrHttpClient {
  private readonly apiKey: string | undefined;
  private readonly baseUrl: string;
  private readonly timeoutMs: number;
  private readonly maxRetries: number;

  constructor(options: ModulrClientOptions = {}) {
    this.apiKey = options.apiKey;
    this.baseUrl = (options.baseUrl ?? "https://modulr402.com").replace(/\/$/, "");
    this.timeoutMs = options.timeoutMs ?? 30000;
    this.maxRetries = options.maxRetries ?? 3;
  }

  async post<T>(path: string, body: unknown): Promise<T> {
    let lastError: unknown;

    for (let attempt = 0; attempt < this.maxRetries; attempt++) {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), this.timeoutMs);

      try {
        const headers: Record<string, string> = { "Content-Type": "application/json" };
        if (this.apiKey) headers["x-modulr-api-key"] = this.apiKey;

        const res = await fetch(`${this.baseUrl}${path}`, {
          method: "POST",
          headers,
          body: JSON.stringify(body),
          signal: controller.signal,
        });

        clearTimeout(timer);
        const data = (await res.json()) as T & { error?: string };

        if (res.status === 503 || res.status === 529) {
          lastError = new ModulrError(
            (data as { error?: string }).error ?? "Service temporarily unavailable",
            res.status
          );
          await sleep((attempt + 1) * 2000);
          continue;
        }

        if (!res.ok) {
          throw new ModulrError(
            (data as { error?: string }).error ?? `Request failed with status ${res.status}`,
            res.status
          );
        }

        return data;
      } catch (err) {
        clearTimeout(timer);
        if (err instanceof ModulrError) throw err;
        if (isAbortError(err)) {
          throw new ModulrError(`Request timed out after ${this.timeoutMs}ms`, 408);
        }
        lastError = err;
        if (attempt < this.maxRetries - 1) await sleep((attempt + 1) * 2000);
      }
    }

    throw lastError instanceof ModulrError
      ? lastError
      : new ModulrError("Request failed after retries", 503);
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

function isAbortError(err: unknown): boolean {
  return err instanceof Error && err.name === "AbortError";
}

export class ModulrError extends Error {
  constructor(message: string, public readonly status: number) {
    super(message);
    this.name = "ModulrError";
  }
}
