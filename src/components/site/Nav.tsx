import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { SOCIALS } from "@/lib/site";

const LINKS = [
  { label: "Why us", href: "#why" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
        <nav className="flex w-full max-w-xl items-center justify-between gap-2 rounded-full bg-paper p-1.5 pl-4 text-ink shadow-[0_20px_50px_-25px_rgba(0,0,0,0.8)]">
          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase"
            aria-label="Open menu"
          >
            <Menu className="size-4" strokeWidth={2.5} />
            <span className="hidden sm:inline">Menu</span>
          </button>

          <a href="#top" className="font-display text-lg font-extrabold tracking-tight">
            0X<span className="marker-lime rounded-[4px]">STUDIO</span>
          </a>

          <a
            href={SOCIALS.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-1.5 rounded-full bg-ink px-4 py-2.5 text-xs font-semibold text-paper transition-colors hover:bg-lime hover:text-ink"
          >
            <span className="hidden sm:inline">Start a project</span>
            <span className="sm:hidden">Start</span>
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </nav>
      </header>

      {open && (
        <div className="fixed inset-0 z-60 grain animate-fade-in bg-ink px-6 py-6">
          <div className="flex items-center justify-between">
            <span className="font-display text-lg font-extrabold">0XSTUDIO</span>
            <button onClick={() => setOpen(false)} aria-label="Close menu">
              <X className="size-6" />
            </button>
          </div>
          <ul className="mt-16 space-y-2">
            {LINKS.map((l, i) => (
              <li key={l.href} style={{ animationDelay: `${i * 60}ms` }} className="animate-fade-in">
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="font-display block text-5xl font-extrabold tracking-tight transition-colors hover:text-lime md:text-7xl"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-16 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
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
          </div>
        </div>
      )}
    </>
  );
}
