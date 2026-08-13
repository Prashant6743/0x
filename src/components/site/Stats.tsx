import { Reveal } from "@/components/Reveal";
import { TechGlobe3D } from "./TechGlobe3D";

const STATS = [
  ["40", "+", "Products shipped"],
  ["4.9", "/5", "Average client rating"],
  ["14", " days", "Typical first launch"],
  ["92", "%", "Clients who come back"],
];

export function Stats() {
  return (
    <section className="grain relative bg-background py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">
        <div className="relative mx-auto hidden aspect-square w-full max-w-[620px] lg:block">
          <TechGlobe3D className="h-full w-full" />
        </div>

        <div>
          <Reveal>
            <p className="text-[11px] font-semibold tracking-[0.3em] text-muted-foreground uppercase">
              Studio information
            </p>
            <div className="mt-4 h-px bg-border" />
            <h2 className="mt-8 text-4xl leading-[1.02] font-extrabold md:text-6xl">
              Whatever the stack,
              <br />
              <span className="text-muted-foreground">we build it end to end.</span>
            </h2>
          </Reveal>

          <div className="mt-12 grid grid-cols-2 gap-x-10 gap-y-10 border-t border-border pt-10">
            {STATS.map(([n, unit, label], i) => (
              <Reveal key={label} delay={i * 80}>
                <p className="font-display text-5xl font-extrabold md:text-6xl">
                  {n}
                  <span className="ml-1 text-lg font-semibold text-muted-foreground">{unit}</span>
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
