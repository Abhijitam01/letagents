import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Privacy — LetAgents",
  description: "What LetAgents stores when you join the waitlist.",
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#F5F4F0] px-6 py-16 text-[#111] md:px-12">
      <article className="mx-auto max-w-2xl">
        <Link
          href="/"
          className="font-pixel text-xs tracking-[0.22em] text-black/50 rounded-sm hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4"
        >
          LETAGENTS
        </Link>
        <h1 className="mt-10 text-4xl font-light tracking-tight">Privacy</h1>
        <div className="mt-8 space-y-5 text-sm leading-relaxed text-black/70">
          <p>The waitlist form stores the email address you submit, and the time it was submitted.</p>
          <p>We use that address to tell you when access opens. We do not sell it, and we do not use it for unrelated mail.</p>
          <p>To leave the list, reply to our note from the same address and ask to be removed. We delete the row.</p>
        </div>
      </article>
    </main>
  )
}
