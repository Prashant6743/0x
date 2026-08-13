import { Reveal } from "@/components/Reveal";

export function Why() {
  return (
    <section id="why" className="grain relative overflow-hidden bg-paper py-20 text-ink md:py-28">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <Reveal>
          <p className="text-[11px] font-semibold tracking-[0.3em] uppercase opacity-50">
            Sound familiar?
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="relative mt-6 select-none md:mt-10">
            <h2 className="font-display text-[20vw] leading-[0.85] font-extrabold md:text-[220px]">
              WHY 0X
            </h2>
            <h2
              aria-hidden
              className="font-display absolute inset-x-0 top-[70%] hidden text-[20vw] leading-[0.85] font-extrabold md:block md:text-[220px]"
              style={{
                transform: "scaleY(-1)",
                maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.35), transparent 55%)",
                WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.35), transparent 55%)",
              }}
            >
              WHY 0X
            </h2>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <p className="mx-auto mt-10 max-w-3xl text-xl leading-snug font-medium md:mt-44 md:text-3xl">
            Agencies hand you decks. Freelancers vanish. Templates look like everyone else. We do
            the thinking, the design and the code — and you get{" "}
            <span className="marker-lime rounded-[4px]">one thing that actually ships</span>.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-4 text-left sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["No hand-offs", "Designers and engineers sit on the same call."],
            ["Fixed scope", "You know the price and the date before we start."],
            ["Built to keep", "Clean code, docs, and full ownership handed over."],
            ["Motion first", "Interaction is designed, never bolted on later."],
          ].map(([title, body], i) => (
            <Reveal key={title} delay={i * 90}>
              <div
                className={`sticker h-full rounded-2xl p-5 ${i % 2 === 0 ? "bg-lime" : "bg-paper-2"}`}
              >
                <span className="inline-flex size-6 items-center justify-center rounded-full bg-ink text-[11px] font-bold text-paper">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-lg font-bold">{title}</h3>
                <p className="mt-2 text-sm opacity-70">{body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
