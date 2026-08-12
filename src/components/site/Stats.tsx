import { Reveal } from "@/components/Reveal";
import { DotSphere } from "./DotFunnel";

const PLATFORMS = [
  { label: "REACT", x: 40, y: 16, size: "text-xl md:text-2xl", dim: false },
  { label: "NEXT.JS", x: 12, y: 30, size: "text-sm md:text-base", dim: true },
  { label: "FIGMA", x: 68, y: 26, size: "text-lg md:text-xl", dim: false },
  { label: "SWIFT", x: 26, y: 44, size: "text-xs md:text-sm", dim: true },
  { label: "WEBGL", x: 58, y: 47, size: "text-2xl md:text-3xl", dim: false },
  { label: "SUPABASE", x: 8, y: 58, size: "text-sm md:text-base", dim: true },
  { label: "MOTION", x: 44, y: 62, size: "text-base md:text-lg", dim: true },
  { label: "SHOPIFY", x: 70, y: 68, size: "text-lg md:text-xl", dim: false },
  { label: "AI", x: 34, y: 78, size: "text-sm md:text-base", dim: true },
];

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
        <div className="relative mx-auto aspect-square w-full max-w-[520px]">
          <DotSphere className="absolute inset-0 h-full w-full opacity-70" />
          {PLATFORMS.map((p) => (
            <span
              key={p.label}
              className={`absolute font-display tracking-[0.15em] ${p.size} ${p.dim ? "text-muted-foreground/45" : "text-foreground/90"}`}
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
            >
              {p.label}
            </span>
          ))}
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
