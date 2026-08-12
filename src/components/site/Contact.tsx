import { ArrowUpRight } from "lucide-react";
import { SOCIALS } from "@/lib/site";

const MARQUEE = "Web & mobile apps · UX & product design · Product development · Award-class web design · Communication design · ";

export function Contact() {
  return (
    <footer id="contact" className="grain relative overflow-hidden bg-background pt-24">
      <div className="border-y border-border py-6">
        <div className="flex w-max" style={{ animation: "marquee 32s linear infinite" }}>
          {[0, 1].map((k) => (
            <span
              key={k}
              className="font-display px-4 text-3xl font-extrabold whitespace-nowrap text-muted-foreground/40 md:text-5xl"
            >
              {MARQUEE.repeat(2)}
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-24 text-center">
        <h2 className="text-5xl leading-[0.95] font-extrabold md:text-8xl">
          Got an idea?
          <br />
          <span className="marker-lime rounded-[6px]">Let's build it.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-lg text-muted-foreground">
          Message us on WhatsApp and you'll hear back from a human today — no forms, no sales funnel.
        </p>
        <a
          href={SOCIALS.whatsapp}
          target="_blank"
          rel="noreferrer"
          className="sticker group mt-10 inline-flex items-center gap-2 rounded-full bg-lime px-8 py-4 text-sm font-bold text-ink"
        >
          Chat on WhatsApp
          <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 border-t border-border px-6 py-8 text-sm text-muted-foreground md:flex-row">
        <span className="font-display text-base font-extrabold text-foreground">0XSTUDIO</span>
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          <a className="hover:text-lime" href={SOCIALS.instagram} target="_blank" rel="noreferrer">
            Instagram
          </a>
          <a className="hover:text-lime" href={SOCIALS.x} target="_blank" rel="noreferrer">
            X / Twitter
          </a>
          <a className="hover:text-lime" href={SOCIALS.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a className="hover:text-lime" href={SOCIALS.whatsapp} target="_blank" rel="noreferrer">
            WhatsApp
          </a>
        </nav>
        <span>© {new Date().getFullYear()} 0xStudio</span>
      </div>
    </footer>
  );
}
