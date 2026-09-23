export type Tab = 'home' | 'wallet' | 'activity' | 'swap' | 'settings'
export type TransactionType = 'Received' | 'Sent' | 'Swapped' | 'Bought' | 'Sold'
export type TransactionStatus = 'Completed' | 'Pending' | 'Failed'
export type PortfolioMode = 'calculated' | 'fixed'
export type BrandMark = 'spark' | 'shield' | 'hex'

export interface Asset {
  id: string
  name: string
  symbol: string
  balance: number
  price: number
  change: number
  color: string
  icon: string
  precision: number
  history: number[]
}

export interface WalletTransaction {
  id: string
  type: TransactionType
  assetId: string
  assetSymbol: string
  amount: number
  fiatValue: number
  date: string
  status: TransactionStatus
  address: string
  note?: string
}

export interface WalletState {
  appName: string
  brandMark: BrandMark
  walletName: string
  walletAddress: string
  fiat: 'EUR' | 'USD' | 'GBP'
  fiatRate: number
  portfolioMode: PortfolioMode
  fixedPortfolioValue: number
  assets: Asset[]
  transactions: WalletTransaction[]
  hydrated: boolean
}