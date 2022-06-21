import { createGlobalState, useStorage } from '@vueuse/core'


export const UI = createGlobalState(() => useStorage('ui', { isLoading: false }))
export const USER = createGlobalState(() => useStorage('user', { token: '' }))