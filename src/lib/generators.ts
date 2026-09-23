export const makeId = (prefix: string) =>
  `${prefix}-${Math.random().toString(36).slice(2, 8)}-${Date.now().toString(36).slice(-4)}`

export const fictionalAddress = () => `larp_${Math.random().toString(36).slice(2, 8)}_${Date.now().toString(36).slice(-6)}`