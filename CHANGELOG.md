# Changelog

## 0.2.0 — 2026-06-02

- Retry on 503/529 with linear backoff (up to 3 attempts, configurable via `maxRetries`)
- Request timeout with `AbortController` (default 30s, configurable via `timeoutMs`)
- Client-side Solana address validation in `walletRisk.analyze()`
- Added `agent` module (ready for when AI Agent Generator ships)
- All agent types exported from package

## 0.1.0 — 2026-06-02

- Initial release
- `walletRisk.analyze()` — Solana wallet risk report
- `tokenLaunch.check()` — token launch readiness checklist
- `audit.scan()` — smart contract static analysis
