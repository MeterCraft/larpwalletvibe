import type { Asset, WalletState } from '../types/wallet'

export const assetValue = (asset: Asset) => asset.balance * asset.price

export const calculatedPortfolioValue = (assets: Asset[]) =>
  assets.reduce((total, asset) => total + assetValue(asset), 0)

export const displayedPortfolioValue = (state: WalletState) =>
  state.portfolioMode === 'fixed'
    ? state.fixedPortfolioValue
    : calculatedPortfolioValue(state.assets)

export const allocation = (asset: Asset, portfolioValue: number) =>
  portfolioValue > 0 ? (assetValue(asset) / portfolioValue) * 100 : 0

export const formatMoney = (value: number, currency: string) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: value < 10 ? 2 : 0,
  }).format(value)

export const formatToken = (value: number, precision = 4) =>
  new Intl.NumberFormat('en-US', { maximumFractionDigits: precision }).format(value)