import { ArrowUpRight } from "lucide-react";
import { SOCIALS } from "@/lib/site";
import workApp from "@/assets/work-app.jpg";
import workWeb from "@/assets/work-web.jpg";
import workBrand from "@/assets/work-brand.jpg";
import workUx from "@/assets/work-ux.jpg";
import workAbstract from "@/assets/work-abstract.jpg";

const CARDS = [
  { src: workApp, alt: "Dark mobile app interface", rotate: -13, y: 28, tag: "@mobile apps" },
  { src: workWeb, alt: "Website design on a laptop", rotate: -7, y: 8, tag: null },
  { src: workUx, alt: "UX wireframes on a monitor", rotate: -2, y: 22, tag: "@ux research" },
  { src: workBrand, alt: "Brand identity stationery", rotate: 6, y: 4, tag: null },
  { src: workAbstract, alt: "Abstract glass render", rotate: 12, y: 26, tag: "@award-class web" },
];

export function Hero() {
  return (
    <section id="top" className="grain relative overflow-hidden bg-background pt-36 pb-24">
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 left-1/2 h-[420px] w-[900px] -translate-x-1/2 rounded-full bg-lime/12 blur-[140px]"
      />
      <div className="relative mx-auto max-w-6xl px-6 text-center">
        <p className="animate-fade-in text-[11px] font-semibold tracking-[0.3em] text-muted-foreground uppercase">
          Design &amp; Product Studio — India, worldwide
        </p>

        <h1 className="animate-fade-in mt-6 text-[13vw] leading-[0.88] font-extrabold md:text-[104px]">
          <span className="block">Minimal effort.</span>
          <span className="mt-2 block">
            <span className="marker-lime rounded-[6px]">Maximum</span> impact.
          </span>
        </h1>

        <div className="relative mt-14 h-[240px] sm:h-[320px] md:h-[400px]">
          <div className="absolute inset-x-0 top-0 flex items-start justify-center">
            {CARDS.map((c, i) => (
              <div
                key={c.alt}
                className="animate-scale-in relative -mx-4 sm:-mx-6"
                style={{
                  transform: `rotate(${c.rotate}deg) translateY(${c.y}px)`,
                  zIndex: i === 2 ? 5 : 4 - Math.abs(2 - i),
                  animationDelay: `${i * 90}ms`,
                }}
              >
                <div
                  className="w-[110px] overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-float)] transition-transform duration-300 hover:-translate-y-3 sm:w-[160px] md:w-[210px]"
                  style={{ animation: `float-slow ${6 + i}s ease-in-out ${i * 0.4}s infinite` }}
                >
                  <img
                    src={c.src}
                    alt={c.alt}
                    loading={i > 1 ? "lazy" : undefined}
                    className="h-[150px] w-full object-cover sm:h-[210px] md:h-[270px]"
                  />
                </div>
                {c.tag && (
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 rounded-full bg-paper px-3 py-1 text-[10px] font-semibold whitespace-nowrap text-ink shadow-lg md:text-xs">
                    {c.tag}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-base text-muted-foreground md:text-lg">
          0xStudio builds digital products end to end — strategy, design, engineering. One team, one
          point of contact, work that looks like it cost far more than it did.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <a
            href={SOCIALS.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="sticker group inline-flex items-center gap-2 rounded-full bg-lime px-7 py-4 text-sm font-bold text-ink"
          >
            Book a free consult
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            href="#work"
            className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-4 text-sm font-semibold transition-colors hover:border-lime hover:text-lime"
          >
            See the work
          </a>
        </div>

        <div className="mt-20 flex flex-col items-center gap-3">
          <span className="flex h-12 w-7 items-start justify-center rounded-full border border-border pt-2">
            <span
              className="size-1.5 rounded-full bg-lime"
              style={{ animation: "scroll-dot 1.6s ease-in-out infinite" }}
            />
          </span>
          <span className="text-[10px] tracking-[0.4em] text-muted-foreground uppercase">
            Scroll
          </span>
        </div>
      </div>
    </section>
  );
}
