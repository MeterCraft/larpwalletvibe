import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { makeId } from '../lib/generators'
import { dexieStorage } from '../db/database'
import type { Asset, BrandMark, LayoutMode, ThemeMode, TransactionType, WalletState, WalletTransaction } from '../types/wallet'

const seedAssets: Asset[] = [
  { id: 'btc', name: 'Bitcoin', symbol: 'BTC', balance: 0.1842, price: 64280, change: 2.84, color: '#f7931a', icon: '₿', precision: 6, history: [48, 51, 49, 58, 55, 64, 62, 70, 68, 77] },
  { id: 'eth', name: 'Ethereum', symbol: 'ETH', balance: 2.84, price: 3120, change: 1.62, color: '#8091ff', icon: '◆', precision: 4, history: [38, 43, 40, 47, 50, 48, 57, 55, 61, 66] },
  { id: 'sol', name: 'Solana', symbol: 'SOL', balance: 18.7, price: 148, change: -0.42, color: '#a78bfa', icon: '≋', precision: 3, history: [70, 62, 66, 59, 65, 61, 55, 58, 53, 57] },
  { id: 'usdc', name: 'USD Coin', symbol: 'USDC', balance: 1240, price: 1, change: 0.01, color: '#2775ca', icon: '$', precision: 2, history: [50, 51, 50, 50, 51, 50, 50, 51, 50, 50] },
  { id: 'link', name: 'Chainlink', symbol: 'LINK', balance: 42.5, price: 14.2, change: 4.15, color: '#2a5ada', icon: '⬡', precision: 3, history: [32, 35, 34, 38, 41, 39, 45, 48, 46, 52] },
]

const seedTransactions: WalletTransaction[] = [
  { id: 'tx-1', type: 'Received', assetId: 'eth', assetSymbol: 'ETH', amount: 0.84, fiatValue: 2620, date: 'Today, 09:42', status: 'Completed', address: 'larp_eth_7f42d1', note: 'Studio settlement' },
  { id: 'tx-2', type: 'Swapped', assetId: 'usdc', assetSymbol: 'USDC', amount: 620, fiatValue: 620, date: 'Yesterday, 18:16', status: 'Completed', address: 'larp_swap_21ab90' },
  { id: 'tx-3', type: 'Sent', assetId: 'sol', assetSymbol: 'SOL', amount: 2.5, fiatValue: 370, date: 'Sep 20, 14:08', status: 'Completed', address: 'larp_sol_8c03ef', note: 'Character prop' },
  { id: 'tx-4', type: 'Bought', assetId: 'btc', assetSymbol: 'BTC', amount: 0.012, fiatValue: 771, date: 'Sep 18, 11:30', status: 'Completed', address: 'larp_buy_3bd811' },
]

const initialState: Omit<WalletState, 'hydrated'> = {
  theme: 'dark', layout: 'relay',
  appName: 'LarpWallet', brandMark: 'spark',
  walletName: 'Midnight Relay', walletAddress: 'larp_wallet_4c8a21', fiat: 'EUR', fiatRate: 0.92,
  portfolioMode: 'calculated', fixedPortfolioValue: 24500, assets: seedAssets, transactions: seedTransactions,
}

interface WalletActions {
  hydrate: () => void
  setTheme: (theme: ThemeMode) => void
  setLayout: (layout: LayoutMode) => void
  setAppName: (appName: string) => void
  setBrandMark: (brandMark: BrandMark) => void
  setWalletName: (walletName: string) => void
  setFiat: (fiat: WalletState['fiat']) => void
  setPortfolioMode: (mode: WalletState['portfolioMode']) => void
  setFixedPortfolioValue: (value: number) => void
  addAsset: (asset: Omit<Asset, 'id' | 'history'>) => void
  updateAsset: (id: string, changes: Partial<Asset>) => void
  deleteAsset: (id: string) => void
  moveAsset: (id: string, direction: -1 | 1) => void
  addTransaction: (transaction: Omit<WalletTransaction, 'id'>) => void
  deleteTransaction: (id: string) => void
  reset: () => void
}

export const useWalletStore = create<WalletState & WalletActions>()(persist((set) => ({
  ...initialState, hydrated: false,
  hydrate: () => set({ hydrated: true }),
  setTheme: (theme) => set({ theme }),
  setLayout: (layout) => set({ layout }),
  setAppName: (appName) => set({ appName }),
  setBrandMark: (brandMark) => set({ brandMark }),
  setWalletName: (walletName) => set({ walletName }),
  setFiat: (fiat) => set({ fiat }),
  setPortfolioMode: (portfolioMode) => set({ portfolioMode }),
  setFixedPortfolioValue: (fixedPortfolioValue) => set({ fixedPortfolioValue }),
  addAsset: (asset) => set((state) => ({ assets: [...state.assets, { ...asset, id: makeId('asset'), history: [40, 44, 42, 48, 46, 50] }] })),
  updateAsset: (id, changes) => set((state) => ({ assets: state.assets.map((asset) => asset.id === id ? { ...asset, ...changes } : asset) })),
  deleteAsset: (id) => set((state) => ({ assets: state.assets.filter((asset) => asset.id !== id), transactions: state.transactions.filter((transaction) => transaction.assetId !== id) })),
  moveAsset: (id, direction) => set((state) => { const index = state.assets.findIndex((asset) => asset.id === id); const target = index + direction; if (index < 0 || target < 0 || target >= state.assets.length) return state; const assets = [...state.assets]; [assets[index], assets[target]] = [assets[target], assets[index]]; return { assets } }),
  addTransaction: (transaction) => set((state) => ({ transactions: [{ ...transaction, id: makeId('tx') }, ...state.transactions] })),
  deleteTransaction: (id) => set((state) => ({ transactions: state.transactions.filter((transaction) => transaction.id !== id) })),
  reset: () => set({ ...initialState, hydrated: true }),
}), { name: 'larpwallet-state', storage: createJSONStorage(() => dexieStorage), partialize: (state) => { const { hydrated: _hydrated, ...persisted } = state; return persisted }, onRehydrateStorage: () => (state) => state?.hydrate() }))

export const transactionTypeOptions: TransactionType[] = ['Received', 'Sent', 'Swapped', 'Bought', 'Sold']