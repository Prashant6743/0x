import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import workApp from "@/assets/work-app.jpg";
import workWeb from "@/assets/work-web.jpg";
import workBrand from "@/assets/work-brand.jpg";
import workUx from "@/assets/work-ux.jpg";
import workAbstract from "@/assets/work-abstract.jpg";

const ITEMS = [
  { img: workWeb, tag: "Award-class web design", title: "A marketing site that closes on scroll", year: "2026" },
  { img: workApp, tag: "Web & mobile apps", title: "A dark-mode fintech app, built in six weeks", year: "2026" },
  { img: workUx, tag: "UX & product design", title: "Turning a messy dashboard into one clear flow", year: "2025" },
  { img: workBrand, tag: "Communication design", title: "An identity system that survives every channel", year: "2025" },
  { img: workAbstract, tag: "Product development", title: "Real-time 3D configurator for a hardware brand", year: "2025" },
];

export function Work() {
  return (
    <section id="work" className="grain relative bg-background py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-6">
          <h2 className="text-4xl font-extrabold md:text-6xl">Selected work</h2>
          <p className="max-w-sm text-sm text-muted-foreground">
            A sample of what we build. Full case studies on request.
          </p>
        </div>

        <div className="mt-12 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((it, i) => (
            <Reveal key={it.title} delay={(i % 3) * 100}>
              <article className="group">
                <div className="overflow-hidden rounded-2xl border border-border bg-card">
                  <img
                    src={it.img}
                    alt={it.title}
                    loading="lazy"
                    className="h-64 w-full object-cover grayscale transition-all duration-700 group-hover:scale-[1.04] group-hover:grayscale-0"
                  />
                </div>
                <span className="mt-5 inline-block rounded-full border border-border px-3 py-1 text-[11px] text-muted-foreground">
                  {it.tag}
                </span>
                <h3 className="mt-3 flex items-start gap-2 text-xl leading-snug font-bold">
                  {it.title}
                  <ArrowUpRight className="mt-1 size-4 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{it.year}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
