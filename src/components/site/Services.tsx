import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { SERVICES } from "@/lib/site";
import { SOCIALS } from "@/lib/site";
import { Reveal } from "@/components/Reveal";
import { DotFunnel } from "./DotFunnel";

export function Services() {
  const [active, setActive] = useState(0);
  const current = SERVICES[active]!;

  return (
    <section id="services" className="grain relative bg-background py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-end justify-between border-b border-border pb-4">
          <p className="text-[11px] font-semibold tracking-[0.3em] text-muted-foreground uppercase">
            Our service
          </p>
          <p className="text-[11px] tracking-[0.3em] text-muted-foreground">
            0{active + 1}/0{SERVICES.length}
          </p>
        </div>

        <div className="grid items-center gap-12 pt-14 lg:grid-cols-2">
          <div>
            <Reveal key={current.id}>
              <h2 className="text-5xl leading-[0.92] font-extrabold md:text-7xl">
                {current.title}
              </h2>
              <p className="mt-6 max-w-lg text-base text-muted-foreground md:text-lg">
                {current.blurb}
              </p>
            </Reveal>

            <a
              href={SOCIALS.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="group mt-8 inline-flex items-center gap-3 rounded-full border border-border px-7 py-4 text-sm font-semibold transition-colors hover:border-lime hover:text-lime"
            >
              Talk about this
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>

            <ul className="mt-14 border-t border-border">
              {SERVICES.map((s, i) => (
                <li key={s.id}>
                  <button
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    className={`flex w-full items-center gap-5 border-b border-border py-5 text-left text-xl font-semibold transition-colors md:text-2xl ${
                      i === active
                        ? "text-foreground"
                        : "text-muted-foreground/60 hover:text-foreground"
                    }`}
                  >
                    <span className="text-[11px] tracking-widest">{s.id}</span>
                    {s.title}
                    <span
                      className={`ml-auto size-1.5 rounded-full bg-lime transition-opacity ${i === active ? "opacity-100" : "opacity-0"}`}
                    />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative hidden justify-center lg:flex">
            <DotFunnel className="w-full max-w-[460px]" />
            <div className="absolute inset-0">
              {["Attract", "Engage", "Convert", "Retain"].map((label, i) => (
                <span
                  key={label}
                  className="absolute rounded-md bg-card px-2 py-1 text-[10px] tracking-wider text-muted-foreground uppercase"
                  style={{ top: `${16 + i * 22}%`, right: `${4 + i * 5}%` }}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
