import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres"
import { Pool } from "pg"
import { getDatabaseUrl } from "@/lib/env"
import * as schema from "./schema"

type Database = NodePgDatabase<typeof schema>

const globalForDb = globalThis as unknown as {
  waitlistPool?: Pool
  waitlistDb?: Database
}

export function getDb() {
  const connectionString = getDatabaseUrl()
  if (!connectionString) return null

  if (!globalForDb.waitlistDb) {
    const pool = globalForDb.waitlistPool ?? new Pool({ connectionString, max: 5 })
    globalForDb.waitlistPool = pool
    globalForDb.waitlistDb = drizzle(pool, { schema })
  }

  return globalForDb.waitlistDb
}
