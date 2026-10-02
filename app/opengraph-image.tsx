import { OgCard, ogContentType, ogSize } from "@/lib/og-card"

export const alt = "LetAgents — Let agents run the cloud."
export const size = ogSize
export const contentType = ogContentType

export default function Image() {
  return OgCard()
}
