import { ArrowUpRight, ExternalLink } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import workNorthpeak from "@/assets/northpeak.png";
import workCodeusagi from "@/assets/work-codeusagi.png";
import workNexify from "@/assets/work-nexify.png";
import workNextstep from "@/assets/work-nextstep.png";
import workMasterstudent from "@/assets/work-masterstudent.png";
import workMaxworth from "@/assets/work-maxworth.png";

interface WorkItem {
  title: string;
  url: string;
  tag: string;
  description: string;
  year: string;
  img: string;
}

const ITEMS: WorkItem[] = [
  {
    title: "NorthPeak Digital",
    url: "https://northpeakdev.vercel.app/",
    tag: "Web Engineering & E-Commerce",
    description:
      "Sub-second performance, bespoke React/Shopify engineering, and high-conversion storefronts.",
    year: "2026",
    img: workNorthpeak,
  },
  {
    title: "CodeUsagi",
    url: "https://code-usagi.vercel.app/",
    tag: "AI & Developer Tools",
    description:
      "Line-by-line AI pull request reviewer, codebase semantic lookups, and automated Git fixes.",
    year: "2026",
    img: workCodeusagi,
  },
  {
    title: "Nexify '26",
    url: "https://nexify26.vercel.app/",
    tag: "Cosmic Hackathon Platform",
    description:
      "Space-age cosmic 24-hour hackathon portal featuring live countdown timers, roadmap, and sponsors.",
    year: "2026",
    img: workNexify,
  },
  {
    title: "MasterStudent",
    url: "https://www.masterstudent.live/",
    tag: "EdTech & Learning Portal",
    description:
      "Premium study notes & exam preparation platform for top CBSE, JEE, NEET, and UPSC performers.",
    year: "2026",
    img: workMasterstudent,
  },
  {
    title: "The Maxworth-Global",
    url: "https://themaxworthglobal.com/",
    tag: "Fintech & Corporate Advisory",
    description:
      "Enterprise audit, tax compliance, risk management, and corporate financial advisory platform.",
    year: "2025",
    img: workMaxworth,
  },
  {
    title: "NextStep Careers",
    url: "https://nextstepcareers24.com/",
    tag: "Personal Branding & Growth",
    description:
      "LinkedIn optimization, ATS-compliant resume building, and career growth acceleration platform.",
    year: "2025",
    img: workNextstep,
  },
];

export function Work() {
  return (
    <section id="work" className="grain relative bg-background py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-lime">
              Our Client Portfolio
            </span>
            <h2 className="mt-2 text-4xl font-extrabold md:text-6xl">Selected Work</h2>
          </div>
          <p className="max-w-md text-sm text-muted-foreground">
            Explore live digital products, web platforms, and applications designed and engineered
            by 0xStudio.
          </p>
        </div>

        <div className="mt-12 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((it, i) => (
            <Reveal key={it.title} delay={(i % 3) * 100}>
              <a
                href={it.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block h-full rounded-2xl transition-transform duration-300 hover:-translate-y-1.5"
              >
                <article className="flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-4 transition-colors group-hover:border-lime/50 group-hover:shadow-[var(--shadow-float)]">
                  <div>
                    <div className="relative overflow-hidden rounded-xl border border-border/60 bg-background">
                      <img
                        src={it.img}
                        alt={it.title}
                        loading="lazy"
                        className="h-56 w-full object-cover transition-all duration-700 group-hover:scale-[1.05]"
                      />
                      <div className="absolute top-3 right-3 rounded-full bg-background/80 px-2.5 py-1 text-[11px] font-mono text-foreground backdrop-blur-md border border-border/80 flex items-center gap-1.5">
                        <span className="size-2 rounded-full bg-lime animate-pulse" />
                        <span>Live Site</span>
                      </div>
                    </div>

                    <div className="mt-5 flex items-center justify-between gap-2">
                      <span className="inline-block rounded-full border border-border px-3 py-1 text-[11px] font-medium text-muted-foreground group-hover:border-lime/40 group-hover:text-lime">
                        {it.tag}
                      </span>
                      <span className="text-xs font-mono text-muted-foreground">{it.year}</span>
                    </div>

                    <h3 className="mt-3 flex items-center gap-2 text-xl font-bold leading-snug group-hover:text-lime transition-colors">
                      {it.title}
                      <ArrowUpRight className="size-4 shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 text-lime" />
                    </h3>

                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                      {it.description}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center gap-2 text-xs font-mono text-lime/90 opacity-90 group-hover:opacity-100">
                    <ExternalLink className="size-3.5" />
                    <span className="truncate">
                      {it.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                    </span>
                  </div>
                </article>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
