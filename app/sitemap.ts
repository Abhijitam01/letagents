import type { MetadataRoute } from "next"
import { getSiteUrl } from "@/lib/env"

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl()
  const lastModified = new Date("2026-10-03")

  return ["", "/privacy", "/terms"].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified,
  }))
}
