# LarpWallet Project Specification

## 1. Product Definition

LarpWallet is a polished, mobile-first fictional crypto-wallet simulator for roleplay, UI experimentation, screenshots, and testing. It is local-only and must never connect to real financial services, blockchains, exchanges, payment providers, or real wallets.

The application must clearly communicate that all values, addresses, prices, balances, and transactions are fictional. It must never claim that simulated transactions are real.

### Safety boundary

Never implement or request:

- Blockchain, exchange, payment, bank, or crypto-provider integrations.
- Wallet-connect functionality or real wallet integrations such as Phantom, Ledger, or MetaMask.
- Seed phrases, private keys, authentication credentials, or real wallet credentials.
- Live prices, live exchange rates, transaction lookups, broadcasting, or on-chain activity.

All identifiers and data are generated or configured locally. The persistent Settings/About notice must say:

> LarpWallet is a fictional wallet simulator. It does not hold, transfer, or manage real assets.

The Larp Editor must prominently display:

> SIMULATION / LARP MODE

## 2. Technology

Use:

- React and TypeScript.
- Vite.
- Tailwind CSS and shadcn/ui where appropriate.
- Zustand for application state.
- Dexie with IndexedDB for versioned local persistence.
- Recharts for portfolio and asset charts.
- Lucide React for icons.
- `qrcode` or an equivalent local QR-code library.
- `vite-plugin-pwa` for the PWA and offline app shell.

Keep dependencies reasonable. Prefer native browser APIs when they are sufficient.

## 3. Product Shell and Navigation

The five main tabs are:

1. Home
2. Wallet
3. Activity
4. Swap
5. Settings

The app is dark-first, mobile-first, responsive, installable as a PWA, usable on iPhone and desktop, persistent across reloads, and functional offline after installation. Use iPhone safe-area insets, especially around bottom navigation and sheets.

Desktop should use a responsive application shell rather than merely stretching the mobile layout. Support small phones, tablets, desktop, and large desktop. Check navigation, sheet sizes, charts, long names and identifiers, large balances, keyboard behavior, landscape layouts, and clipping.

## 4. Home

Build a polished portfolio dashboard showing:

- Wallet name and avatar.
- Total portfolio value.
- 24-hour absolute and percentage change.
- Portfolio history chart.
- Quick actions.
- Asset list.

Quick actions are Send, Receive, Swap, and Buy. All are simulated. Buy opens the fictional purchase flow and never connects to a provider.

Asset cards show token icon, name, symbol, balance, fictional token price, fiat value, portfolio allocation, and 24-hour change. Initial demo assets should include fictional representations of Bitcoin/BTC, Ethereum/ETH, Solana/SOL, USD Coin/USDC, and Chainlink/LINK. Users can change, remove, and replace them.

## 5. Wallet and Assets

The Wallet view is an asset-management interface. Users can add, edit, delete, and reorder assets.

Each asset detail view contains:

- Icon, name, symbol, balance, fictional price, fiat value, allocation, and 24-hour change.
- Price chart.
- Related transactions.

Asset editor fields:

- Name and symbol.
- Balance and fictional price.
- 24-hour percentage change.
- Icon and icon/background appearance.
- Decimal precision.

## 6. Activity and Transactions

Create a realistic fictional transaction feed. Supported types are Received, Sent, Swapped, Bought, and Sold.

Each transaction contains an ID, type, asset, amount, fiat value, date, time, status, fictional address, fictional transaction hash, and optional note. All identifiers are generated locally.

Users can create, edit, delete, and view transaction details. Transaction editing must preserve valid local state and derived display values.

## 7. Simulated Flows

### Send

Fields: asset, amount, recipient address, network, and optional note. On confirmation, validate the fictional input, update the local simulated balance, create a fictional transaction, and add it to Activity. Clearly treat recipient addresses as fictional simulator data. Do not broadcast anything.

### Receive

Display the selected asset, a locally generated fictional wallet address, a QR code, and a copy button. Addresses must use clearly fictional/non-real formats. QR codes contain only local fictional data and never query an external service.

### Swap

Allow source asset, destination asset, and amount selection. Calculate the fictional received amount from locally configured prices. Show exchange rate, estimated received amount, fictional network fee, and price impact. Confirmation modifies local balances and creates a Swap transaction.

### Buy

Simulate buying an asset with fictional fiat, for example `EUR 1,000 -> 0.42 ETH`. The flow must not connect to banks, cards, exchanges, payment providers, or crypto providers. It only updates the local simulated wallet and creates a fictional transaction.

## 8. Larp Editor

Create a dedicated Larp Mode / Editor that controls nearly everything displayed by the simulator. It must prominently display `SIMULATION / LARP MODE`.

Editor sections:

### Wallet

Wallet name, avatar, fiat currency, display mode, and portfolio calculation mode.

### Assets

Add, edit, delete, and reorder assets.

### Prices

Fictional token prices, 24-hour changes, and historical chart values.

### Transactions

Create, edit, and delete transactions. Configure type, amount, date, time, status, address, and transaction ID.

### Addresses

Configure fictional wallet addresses.

### Appearance

Configure light/dark/system theme, accent color, display density, wallet style, chart style, and animations.

### Preview

Provide previews for Home, Wallet, Asset detail, Activity, Send, Receive, and Swap. Preview values must update as editor values change.

## 9. Portfolio and Fiat Rules

Implement two explicit portfolio modes:

- **Calculated mode:** portfolio value is the sum of `asset balance * fictional asset price` for every asset.
- **Fixed display mode:** the user specifies a custom displayed portfolio value. Keep this separate from calculated values so changing assets does not silently rewrite the configured fixed value.

Derived values should be calculated rather than redundantly stored whenever practical:

- `assetFiatValue = balance * price`
- `portfolioValue = sum(assetFiatValue)` in calculated mode
- `allocation = assetFiatValue / portfolioValue`

Support EUR, USD, and GBP. Fiat conversion rates are fictional/local and configurable. Never request live rates. Changes to balance, price, assets, or fiat settings must update dependent displays consistently.

## 10. Presets and Demo Data

Provide these presets:

- Empty Wallet
- Small Portfolio
- Large Portfolio
- Custom

Presets contain fictional local data. Resetting to a preset must require confirmation and must not overwrite existing data without it.

On first launch only, seed several assets, portfolio history, several transactions, and a fictional wallet address. Persist all changes afterward; never reseed on every reload. Settings must provide a reset function.

## 11. Data Model and Persistence

Use a versioned Dexie/IndexedDB database. Suggested entities:

- `WalletProfile`
- `Asset`
- `Transaction`
- `AppearanceSettings`
- `Preferences`
- `PresetSnapshot`

Store all simulator state locally. No account, backend, or authentication is required. Include a schema version and migrations for future compatibility.

## 12. Import and Export

Implement Export JSON and Import JSON for the complete simulator state. Exported data must include a schema version.

Validate imported data before replacing current data. For malformed or invalid JSON:

- Show a clear error.
- Leave existing data untouched.
- Allow cancellation.

## 13. PWA and Offline

Implement a proper PWA with:

- Web manifest.
- Original app icon and appropriate multiple icon sizes.
- Standalone display mode.
- Theme and background colors.
- iPhone metadata and viewport configuration.
- Safe-area support.
- Service worker and offline app shell.

Register the service worker only in production. Do not register it during development or preview in a way that creates stale-cache problems. After installation, the core app and local wallet data must work without an internet connection.

## 14. Visual and Interaction Direction

The visual language is dark-first, premium, compact, modern, mobile-native, subtle, and clean. Use rounded cards, restrained borders, subtle depth, smooth transitions, responsive charts, consistent iconography, and clear hierarchy.

Avoid generic SaaS dashboards, excessive gradients, giant headings, clutter, unnecessary tables, stock imagery, and excessive animation. Use familiar icons and tooltips for unfamiliar icon-only actions. Keep controls accessible and stable in size. Do not let long names, balances, IDs, or labels overlap or resize surrounding layout.

## 15. Suggested Architecture

```text
src/
├── components/
│   ├── wallet/
│   │   ├── WalletHeader
│   │   ├── PortfolioValue
│   │   ├── AssetCard
│   │   ├── AssetList
│   │   └── QuickActions
│   ├── charts/
│   │   ├── PortfolioChart
│   │   └── AssetChart
│   ├── transactions/
│   │   ├── TransactionRow
│   │   └── TransactionDetails
│   ├── editor/
│   │   ├── LarpEditor
│   │   ├── AssetEditor
│   │   └── TransactionEditor
│   └── ui/
├── pages/
│   ├── Home.tsx
│   ├── Wallet.tsx
│   ├── Activity.tsx
│   ├── Swap.tsx
│   └── Settings.tsx
├── db/
│   ├── database.ts
│   └── migrations.ts
├── store/
│   └── walletStore.ts
├── lib/
│   ├── calculations.ts
│   ├── generators.ts
│   ├── presets.ts
│   └── validation.ts
├── types/
│   └── wallet.ts
└── App.tsx
```

Keep business logic separate from UI components. Use TypeScript types throughout. Avoid large monolithic components.

## 16. Incremental Delivery

Build and validate incrementally:

1. Vite, React, TypeScript, Tailwind, and shadcn/ui foundation.
2. Navigation and responsive shell.
3. Basic wallet data model, Zustand state, and IndexedDB persistence.
4. Home screen and derived portfolio calculations.
5. Wallet asset management and detail view.
6. Activity feed and transaction management.
7. Send, Receive, Swap, and Buy flows.
8. Larp Editor and live previews.
9. Import/export and validation.
10. PWA, manifest, icons, and production-only service worker.
11. Offline behavior and responsive/mobile polish.
12. Testing, type checking, build validation, and cleanup.

After each milestone, verify that the app starts and TypeScript/build checks remain clean. Do not leave major buttons as fake placeholders.

## 17. Definition of Done

Before considering the application complete, verify:

- App starts correctly and production build succeeds.
- TypeScript has no errors.
- Home, Wallet, Activity, Settings, and all simulated flows work locally.
- Assets and transactions can be added, edited, deleted, and reordered where applicable.
- Balances and derived portfolio values update correctly.
- Calculated and fixed portfolio modes work independently.
- Presets, editor previews, theme settings, fiat settings, and reload persistence work.
- JSON export/import works; malformed imports cannot destroy existing data.
- QR generation and copy buttons work.
- PWA manifest, icons, production-only service worker, and offline reload work.
- iPhone safe areas, mobile layouts, desktop responsiveness, long content, and keyboard/input behavior are checked.
- No external financial, blockchain, payment, exchange, wallet, or live-data services are referenced.
