import { ModulrHttpClient, type ModulrClientOptions } from "./client";
import { AuditModule } from "./modules/audit";
import { TokenLaunchModule } from "./modules/token-launch";
import { WalletRiskModule } from "./modules/wallet-risk";

export class Modulr {
  readonly walletRisk: WalletRiskModule;
  readonly tokenLaunch: TokenLaunchModule;
  readonly audit: AuditModule;

  constructor(options: ModulrClientOptions) {
    const http = new ModulrHttpClient(options);
    this.walletRisk = new WalletRiskModule(http);
    this.tokenLaunch = new TokenLaunchModule(http);
    this.audit = new AuditModule(http);
  }
}

export { ModulrError } from "./client";
export type { ModulrClientOptions } from "./client";

export type * from "./types/wallet-risk";
export type * from "./types/token-launch";
export type * from "./types/audit";
