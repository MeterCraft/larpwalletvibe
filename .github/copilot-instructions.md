# LarpWallet Architectural Instructions

## Product Boundary

- Treat LarpWallet as a fictional, local-only simulator at all times.
- Never add integrations with blockchains, exchanges, banks, payment providers, live price feeds, transaction explorers, or real wallets.
- Never request, generate, store, or transmit seed phrases, private keys, authentication credentials, or real wallet credentials.
- Never broadcast transactions or imply that simulated activity is real.
- Keep addresses, hashes, prices, fees, rates, balances, and transaction IDs explicitly fictional and locally generated.
- Preserve the persistent simulator notice: `LarpWallet is a fictional wallet simulator. It does not hold, transfer, or manage real assets.`
- Keep `SIMULATION / LARP MODE` prominent in the Larp Editor.

## Architecture

- Use React + TypeScript + Vite with Tailwind CSS and shadcn/ui where appropriate.
- Use Zustand for in-memory application state and Dexie/IndexedDB for versioned persistence.
- Use Recharts for charts, Lucide React for icons, and a local QR-code library for receive screens.
- Keep domain types in `src/types`, persistence and migrations in `src/db`, state orchestration in `src/store`, pure business logic in `src/lib`, and rendering in components/pages.
- Keep business logic out of presentational components. Prefer small, composable components over monolithic pages.
- Preserve public APIs and established local patterns when extending the app.
- Add dependencies only when the existing browser APIs or installed stack cannot reasonably solve the problem.

## State and Data Integrity

- Treat the IndexedDB schema as versioned. Add migrations for schema changes; do not silently invalidate existing local data.
- Seed demo data only on first launch. Never reseed on reload or overwrite user data implicitly.
- Derive values instead of storing duplicated values when safe: asset fiat value is `balance * price`, calculated portfolio value is the sum of asset fiat values, and allocation is asset fiat value divided by portfolio value.
- Keep calculated portfolio mode and fixed display mode explicitly separate.
- Validate all user input at the domain boundary before mutating balances or creating transactions.
- Generate all identifiers locally and make fictional formats obvious.
- Preserve existing data if import parsing or validation fails.
- Destructive resets and preset replacement require explicit confirmation.

## Simulated Flows

- Send, receive, swap, and buy flows must only mutate local state and create local fictional activity records.
- A confirmed send must validate the amount, prevent invalid or excessive balance changes, update the simulated balance, and create an Activity record.
- A confirmed swap must use locally configured prices, show its fictional fee and impact, update both balances consistently, and create one swap record.
- Buy must use fictional fiat and local conversion values only; it must never invoke a payment or exchange service.
- Receive QR codes may contain only local fictional data.

## UI and Responsive Behavior

- Design mobile-first with a polished dark-first wallet experience; support iPhone safe-area insets and desktop responsive shells.
- Keep bottom navigation usable around the home indicator.
- Use stable dimensions for cards, charts, controls, and icon buttons so content cannot shift layout unexpectedly.
- Prevent long token names, balances, transaction IDs, and addresses from overlapping or clipping. Use wrapping, truncation, or responsive sizing intentionally.
- Use Lucide icons in buttons when available. Add accessible labels and tooltips for unfamiliar icon-only controls.
- Avoid fake placeholder buttons, generic SaaS dashboard patterns, excessive gradients, giant headings, unnecessary tables, and excessive animation.
- Keep user-facing copy clear that data is simulated.

## PWA and Offline Rules

- Use `vite-plugin-pwa` for the manifest, icons, service worker, and offline app shell.
- Register the service worker only in production. Never introduce development or preview registration that can cause stale-cache confusion.
- Do not make core wallet behavior depend on a network request. The installed app must work offline with IndexedDB data.
- Keep app icons original and avoid third-party brand assets.

## Verification

- After each meaningful change, run the narrowest relevant typecheck, test, lint, or build command available.
- Before completion, verify the production build, persistence across reloads, import/export failure safety, calculated and fixed portfolio modes, all simulated flows, QR generation, responsive layouts, PWA metadata, and production-only service-worker registration.
- When changing shared calculations, state, persistence, or validation, add or update focused tests.
- Do not fix unrelated failures or reformat unrelated files.
- Do not commit or create branches unless explicitly requested.
