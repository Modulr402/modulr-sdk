export interface ModulrClientOptions {
  apiKey: string;
  baseUrl?: string;
}

export class ModulrHttpClient {
  private readonly apiKey: string;
  private readonly baseUrl: string;

  constructor(options: ModulrClientOptions) {
    this.apiKey = options.apiKey;
    this.baseUrl = (options.baseUrl ?? "https://modulr.xyz").replace(/\/$/, "");
  }

  async post<T>(path: string, body: unknown): Promise<T> {
    const res = await fetch(`${this.baseUrl}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-modulr-api-key": this.apiKey,
      },
      body: JSON.stringify(body),
    });

    const data = (await res.json()) as T & { error?: string };

    if (!res.ok) {
      throw new ModulrError(
        (data as { error?: string }).error ?? `Request failed with status ${res.status}`,
        res.status
      );
    }

    return data;
  }
}

export class ModulrError extends Error {
  constructor(message: string, public readonly status: number) {
    super(message);
    this.name = "ModulrError";
  }
}
