import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Terms — LetAgents",
  description: "Terms for the LetAgents waitlist.",
}

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#F5F4F0] px-6 py-16 text-[#111] md:px-12">
      <article className="mx-auto max-w-2xl">
        <Link
          href="/"
          className="font-pixel text-xs tracking-[0.22em] text-black/50 rounded-sm hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4"
        >
          LETAGENTS
        </Link>
        <h1 className="mt-10 text-4xl font-light tracking-tight">Terms</h1>
        <div className="mt-8 space-y-5 text-sm leading-relaxed text-black/70">
          <p>Joining the waitlist asks us to contact you about LetAgents. It does not reserve a seat, a price, or a launch date.</p>
          <p>The product is not available yet. Pages, copy, and the waitlist itself can change or close without notice.</p>
          <p>You are responsible for the address you submit. Do not sign up someone else.</p>
        </div>
      </article>
    </main>
  )
}
