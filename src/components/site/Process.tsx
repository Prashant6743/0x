import { Reveal } from "@/components/Reveal";
import { useIsMobile } from "@/hooks/use-mobile";

const COLUMNS = ["Discovery", "Design", "Build", "Polish", "Go live"];

const STEPS = [
  {
    n: 1,
    col: 0,
    title: "Kickoff",
    body: "One call. You tell us the business, the users, the vibe.",
  },
  { n: 2, col: 1, title: "Blueprint", body: "Flows, wireframes and a moodboard you sign off on." },
  {
    n: 3,
    col: 2,
    title: "First look",
    body: "The real interface, in your hands, early. Flag anything.",
  },
  {
    n: 4,
    col: 3,
    title: "Engineering",
    body: "Design turns into fast, accessible, production code.",
  },
  { n: 5, col: 4, title: "Launch", body: "We ship, hand over the keys and stay on call." },
];

export function Process() {
  const isMobile = useIsMobile();

  return (
    <section id="process" className="grain relative bg-paper py-20 text-ink md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="text-center">
          <p className="text-[11px] font-semibold tracking-[0.3em] uppercase opacity-50">
            Backed by a team that has shipped for founders worldwide
          </p>
          <h2 className="mt-4 text-4xl font-extrabold md:mt-6 md:text-7xl">
            Meet <span className="marker-lime rounded-[6px]">0xStudio</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base opacity-70 md:mt-6 md:text-lg">
            We design it, we build it, we ship it. A five-step process that gets you a product you
            can't wait to show off.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:mt-16 md:grid-cols-5 md:gap-4">
          {COLUMNS.map((c, i) => (
            <div key={c} className="md:min-h-[420px]">
              <p className="rounded-md bg-paper-2 py-2 text-center text-[10px] font-semibold tracking-[0.2em] uppercase">
                {c}
              </p>
              <Reveal delay={i * 120}>
                <div
                  className={`sticker mt-3 rounded-2xl p-5 ${i % 2 === 0 ? "bg-lime" : "bg-paper-2"}`}
                  style={isMobile ? undefined : { marginTop: `${16 + i * 34}px` }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-bold">{STEPS[i]!.title}</h3>
                    <span className="inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-ink text-[10px] font-bold text-paper">
                      {STEPS[i]!.n}
                    </span>
                  </div>
                  <p className="mt-3 text-sm opacity-70">{STEPS[i]!.body}</p>
                </div>
              </Reveal>
            </div>
          ))}
        </div>

        <p className="font-hand mt-10 text-center text-xl opacity-60 md:text-2xl">
          — all of it inside a two-week sprint
        </p>
      </div>
    </section>
  );
}
