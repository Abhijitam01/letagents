"use client"

import { createAuthClient } from "better-auth/react"

const baseURL = typeof window !== "undefined" ? window.location.origin : process.env.NEXT_PUBLIC_SITE_URL

export const authClient = createAuthClient({
  baseURL,
})
