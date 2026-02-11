# Rain SDK — Required Capabilities

Complete feature set the Rain TypeScript/JavaScript SDK must expose for builders to integrate prediction markets into their applications.

Status legend: ✅ Implemented | 🔲 Not started

---

## 1. Wallet & Account Management

| Method | Description | Status |
|--------|-------------|--------|
| `connectWallet(provider)` | Connect via injected wallet, WalletConnect, or private key | 🔲 |
| `deriveSmartAccount(eoa)` | Derive the Rain smart account address from an EOA wallet | 🔲 |
| `getSmartAccountBalance(address)` | Get USDC / token balances for a smart account | 🔲 |
| `getEOAFromSmartAccount(smartAccount)` | Reverse-lookup: get the EOA that owns a smart account | 🔲 |
| `depositToSmartAccount(amount, token)` | Deposit funds from EOA into the Rain smart account | 🔲 |
| `withdrawFromSmartAccount(amount, token)` | Withdraw funds from smart account back to EOA | 🔲 |

## 2. Market Creation & Management

| Method | Description | Status |
|--------|-------------|--------|
| `createMarket(params)` | Create a new market: title, options, resolution source, end date, category, initial liquidity | ✅ |
| `resolveMarket(marketId, outcome)` | Submit resolution for a market (admin/oracle) | 🔲 |
| `getMarketDetails(marketId)` | Full market data: status, options, prices, volume, liquidity, timestamps | 🔲 |
| `listMarkets(filters)` | Query markets by status, category, creator, date range | ✅ |
| `getMarketPrices(marketId)` | Current prices / implied probabilities for all options | 🔲 |
| `getMarketVolume(marketId)` | Total volume, 24h volume, and volume per option | 🔲 |
| `getMarketLiquidity(marketId)` | Current liquidity depth and pool composition | 🔲 |

## 3. Trading & Position Management

| Method | Description | Status |
|--------|-------------|--------|
| `buyOutcome(marketId, option, amount)` | Buy shares of a specific outcome with USDC | 🔲 |
| `sellOutcome(marketId, option, shares)` | Sell shares back to the pool | 🔲 |
| `claimWinnings(marketId)` | Claim payout from resolved market for winning positions | 🔲 |
| `getPositions(address)` | Get all open positions for a wallet across all markets | 🔲 |
| `getPositionByMarket(address, marketId)` | Get position details for a specific market | 🔲 |

## 4. Transaction Reading & History

| Method | Description | Status |
|--------|-------------|--------|
| `getTransactions(address, filters)` | Get tx history for a wallet: type, market, date range, pagination | 🔲 |
| `getTransactionDetails(txHash)` | Full tx details: type, market, amounts, fees, timestamp, status | 🔲 |
| `getMarketTransactions(marketId)` | All trades on a specific market, with pagination and sorting | 🔲 |
| `getTradeHistory(address, marketId)` | User's trade history on a specific market | 🔲 |
| `streamTransactions(marketId, callback)` | WebSocket / event listener for real-time trades on a market | 🔲 |

## 5. Data Feeds & Analytics

| Method | Description | Status |
|--------|-------------|--------|
| `getPriceHistory(marketId, interval)` | OHLC / time-series price data for charting | 🔲 |
| `getLeaderboard(timeframe)` | Top traders by PnL, volume, or win rate | 🔲 |
| `getPortfolioValue(address)` | Total portfolio value across all positions | 🔲 |
| `getPnL(address, marketId?)` | Realized + unrealized PnL, per-market or aggregate | 🔲 |
| `subscribePriceUpdates(marketId, cb)` | Real-time price feed via WebSocket | 🔲 |
| `getProtocolStats()` | TVL, total volume, active markets, unique traders | 🔲 |

## 6. Liquidity Provision (if AMM-based)

| Method | Description | Status |
|--------|-------------|--------|
| `addLiquidity(marketId, amount)` | Provide liquidity to a market's AMM pool | 🔲 |
| `removeLiquidity(marketId, shares)` | Withdraw liquidity and receive proportional tokens | 🔲 |
| `getLPPosition(address, marketId)` | Current LP position: share of pool, fees earned, impermanent loss | 🔲 |

---

**Target:** TypeScript SDK with full type definitions, published to npm. All methods should support both promise-based and callback patterns. WebSocket subscriptions should auto-reconnect.

### Naming convention

The SDK uses **"market"** in all public-facing types and methods (e.g. `Market`, `getPublicMarkets`, `createMarket`). The Rain API underneath uses **"pool"** (e.g. `/pools/public-pools`, `/pools/create-pool`). The SDK translates between the two at the boundary. New methods should follow this convention — use "market" externally, "pool" only in API paths.

### Implementation notes

- `createMarket` → `Rain.createMarket()` via `POST /pools/create-pool` (authenticated)
- `listMarkets` → `Rain.getPublicMarkets()` via `GET /pools/public-pools`
- Existing tx builders (`buildBuyOptionRawTx`, `buildApprovalTx`, `buildLimitBuyOptionTx`) are lower-level raw transaction helpers — not direct equivalents of the `buyOutcome` capability above
