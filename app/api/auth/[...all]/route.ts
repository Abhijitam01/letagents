import { toNextJsHandler } from "better-auth/next-js"
import { getAuth } from "@/lib/auth"

function databaseUnavailable() {
  return Response.json({ error: "Database is not configured" }, { status: 503 })
}

function withAuth(method: "GET" | "POST" | "PATCH" | "PUT" | "DELETE") {
  return (request: Request) => {
    const auth = getAuth()
    if (!auth) return databaseUnavailable()
    return toNextJsHandler(auth)[method](request)
  }
}

export const GET = withAuth("GET")
export const POST = withAuth("POST")
export const PATCH = withAuth("PATCH")
export const PUT = withAuth("PUT")
export const DELETE = withAuth("DELETE")
