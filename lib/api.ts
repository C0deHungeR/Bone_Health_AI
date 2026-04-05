// lib/api.ts

const BASE_URL = "http://localhost:8080/api"

export interface AuthResponse {
  token: string
  email: string
  name: string
  role: "PATIENT" | "DOCTOR"
}

export interface SignupPayload {
  name: string
  email: string
  password: string
  role: "PATIENT" | "DOCTOR"
}

export interface LoginPayload {
  email: string
  password: string
}

export interface ProfileResponse {
  id: number
  name: string
  email: string
  role: "PATIENT" | "DOCTOR"
}

export const api = {
  signup: async (payload: SignupPayload): Promise<AuthResponse> => {
    const res = await fetch(`${BASE_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    if (!res.ok) {
      const err = await res.text()
      throw new Error(err || "Signup failed")
    }
    return res.json()
  },

  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    if (!res.ok) {
      const err = await res.text()
      throw new Error(err || "Invalid credentials")
    }
    return res.json()
  },

  getProfile: async (token: string): Promise<ProfileResponse> => {
    const res = await fetch(`${BASE_URL}/user/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!res.ok) throw new Error("Failed to fetch profile")
    return res.json()
  },
}