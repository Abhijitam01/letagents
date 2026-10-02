export function getDatabaseUrl() {
  const url = process.env.DATABASE_URL?.trim()
  return url ? url : null
}

export function getSiteUrl() {
  const url = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://letagents.dev"
  return url.replace(/\/$/, "")
}
