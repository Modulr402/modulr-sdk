# Changelog

## 0.1.0 — 2026-06-02

- Initial release
- `walletRisk.analyze()` — Solana wallet risk report with client-side address validation
- `tokenLaunch.check()` — token launch readiness checklist
- `audit.scan()` — smart contract static analysis
- `agent` module ready (activates when AI Agent Generator ships)
- Retry on 503/529 with linear backoff (up to 3 attempts, configurable via `maxRetries`)
- Request timeout with `AbortController` (default 30s, configurable via `timeoutMs`)
