import { WaitlistForm } from "@/components/waitlist-form"

export function Hero() {
  return (
    <section id="waitlist" className="relative min-h-svh overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        poster="/images/hero.jpg"
        className="hero-video absolute inset-0 z-0 h-full w-full object-cover"
        src="/videos/hero.mp4"
      />

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10"
        style={{
          height: "65%",
          background:
            "linear-gradient(to top, #F5F4F0 0%, #F5F4F0 18%, rgba(245,244,240,0.85) 35%, rgba(245,244,240,0.5) 55%, rgba(245,244,240,0.15) 75%, transparent 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10"
        style={{
          height: "55%",
          backdropFilter: "blur(2px)",
          WebkitBackdropFilter: "blur(2px)",
          maskImage: "linear-gradient(to top, black 0%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to top, black 0%, transparent 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10"
        style={{
          height: "38%",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          maskImage: "linear-gradient(to top, black 0%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to top, black 0%, transparent 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10"
        style={{
          height: "20%",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          maskImage: "linear-gradient(to top, black 0%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to top, black 0%, transparent 100%)",
        }}
      />

      <div className="relative z-30 flex min-h-svh flex-col justify-end px-6 pb-10 pt-28 md:px-12 md:pb-14 lg:px-20">
        <div className="hero-enter max-w-3xl">
          <p className="mb-5 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.22em] text-foreground/60">
            <span className="h-px w-8 bg-foreground/30" aria-hidden="true" />
            Agent cloud
          </p>
          <h1 className="max-w-4xl font-display text-[clamp(3.25rem,8vw,7.5rem)] font-light leading-[0.9] tracking-[-0.05em] text-foreground">
            Let agents
            <br />
            run the cloud.
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-foreground/75">
            A calm layer for deploying, watching, and operating the infrastructure your agents depend on.
          </p>
          <div className="mt-8">
            <WaitlistForm idPrefix="hero" />
          </div>
        </div>
      </div>
    </section>
  )
}
