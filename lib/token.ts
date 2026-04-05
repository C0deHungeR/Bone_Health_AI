// lib/token.ts

const KEY = "auth_token"

export const tokenStore = {
  set: (token: string) => localStorage.setItem(KEY, token),
  get: () => localStorage.getItem(KEY),
  clear: () => localStorage.removeItem(KEY),
}