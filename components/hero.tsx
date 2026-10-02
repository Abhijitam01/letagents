import { WaitlistForm } from "@/components/waitlist-form"

export function Hero() {
  return (
    <section id="waitlist" className="relative flex min-h-svh flex-col px-6 pb-12 pt-28 md:px-12 md:pb-16 lg:px-20">
      <div className="mx-auto grid w-full max-w-6xl flex-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="hero-enter max-w-xl">
          <p className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.22em] text-foreground/60">
            <span className="h-px w-8 bg-foreground/30" aria-hidden="true" />
            Agent cloud
          </p>
          <h1 className="mt-5 font-display text-[clamp(3.25rem,6.6vw,5.75rem)] font-light leading-[0.92] tracking-[-0.045em] text-foreground">
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

        <figure className="hero-enter overflow-hidden rounded-[1.75rem] border border-foreground/10 bg-white shadow-[0_30px_80px_-36px_rgba(17,17,17,0.45)]">
          <img
            src="/images/hero.jpg"
            alt="Pale stone terraces fading into fog, with a few thin cables and small amber lights."
            className="h-[34vh] w-full object-cover object-[center_70%] sm:h-[42vh] lg:h-[min(76vh,780px)]"
          />
        </figure>
      </div>
    </section>
  )
}
