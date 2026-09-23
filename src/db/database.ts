import Dexie, { type Table } from 'dexie'
import type { StateStorage } from 'zustand/middleware'

interface PersistedState {
  key: string
  value: string
}

class LarpWalletDatabase extends Dexie {
  state!: Table<PersistedState, string>

  constructor() {
    super('larpwallet-local')
    this.version(1).stores({ state: 'key' })
  }
}

export const walletDatabase = new LarpWalletDatabase()

export const dexieStorage: StateStorage = {
  getItem: async (name) => (await walletDatabase.state.get(name))?.value ?? null,
  setItem: async (name, value) => { await walletDatabase.state.put({ key: name, value }) },
  removeItem: async (name) => { await walletDatabase.state.delete(name) },
}