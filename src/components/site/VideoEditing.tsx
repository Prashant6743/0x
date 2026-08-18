import { useEffect, useRef, useState } from "react";
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  Maximize2,
  X,
  Sparkles,
  ArrowUpRight,
  Zap,
  TrendingUp,
  Film,
  Layers,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SOCIALS } from "@/lib/site";

interface VideoItem {
  id: string;
  title: string;
  category: string;
  tag: string;
  src: string;
  poster: string;
  metrics: string;
  description: string;
  highlights: string[];
}

const REELS: VideoItem[] = [
  {
    id: "reel-1",
    title: "High-Paced Kinetic SaaS & Creator Showcase",
    category: "Short-Form & Motion Hooks",
    tag: "@viral_editing",
    src: "/videos/reel-1.mp4",
    poster: "/videos/reel-1-poster.jpg",
    metrics: "1.4M+ Views · 88% Retention",
    description:
      "Rapid pattern interrupts, snappy motion graphics, dynamic subtitles, and precision sound design engineered for maximum viral engagement.",
    highlights: ["Kinetic Typography", "Micro-SFX & Risers", "Sub-second Pacing"],
  },
  {
    id: "reel-2",
    title: "Narrative & Emotional Storytelling Reel",
    category: "Storytelling & Documentary",
    tag: "@narrative_cut",
    src: "/videos/reel-2.mp4",
    poster: "/videos/reel-2-poster.jpg",
    metrics: "960K+ Views · 4.8x Share Rate",
    description:
      "Deep storytelling, emotive pacing, immersive B-roll layering, and cinematic color grading that builds connection with the audience.",
    highlights: ["Cinematic Grading", "Atmospheric Foley", "Pacing & Tone"],
  },
];

const FEATURES = [
  {
    icon: Zap,
    title: "Scroll-Stopping Hooks",
    description:
      "Engineered first 3 seconds with dynamic text reveals, audio risers, and high-energy visual cues.",
  },
  {
    icon: TrendingUp,
    title: "Retention Pacing",
    description:
      "Eliminating dead air, inserting visual pattern interrupts, and structuring beats for high watch-through rates.",
  },
  {
    icon: Layers,
    title: "Custom Sound & SFX",
    description:
      "Every cut layered with whooshes, subtle bass hits, cinematic Foley, and master-level audio leveling.",
  },
  {
    icon: Film,
    title: "Cinematic Color Grade",
    description:
      "Rich tonal curves, skin-tone preservation, and sleek contrast matching modern high-end studio aesthetics.",
  },
];

export function VideoEditing() {
  const [activeModal, setActiveModal] = useState<VideoItem | null>(null);

  return (
    <section
      id="video"
      className="grain relative overflow-hidden bg-background py-28 border-t border-border"
    >
      {/* Ambient background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/4 right-0 h-[450px] w-[500px] rounded-full bg-lime/10 blur-[150px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-1/4 -left-20 h-[450px] w-[500px] rounded-full bg-lime/8 blur-[160px]"
      />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-border pb-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-lime/30 bg-lime/10 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.2em] text-lime">
              <Sparkles className="size-3.5" />
              <span>Video Production &amp; Motion</span>
            </div>
            <h2 className="mt-4 text-4xl font-extrabold md:text-6xl">
              Stop the scroll.
              <br />
              <span className="text-muted-foreground">Edit to hold attention.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm text-muted-foreground leading-relaxed">
            From viral short-form reels and podcast cutdowns to high-conversion product trailers, we
            craft videos that grip audiences from frame one.
          </p>
        </div>

        {/* Video Showcase Grid */}
        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {REELS.map((reel, idx) => (
            <VideoCard
              key={reel.id}
              reel={reel}
              index={idx}
              onExpand={() => setActiveModal(reel)}
            />
          ))}
        </div>

        {/* Video Features Grid */}
        <div className="mt-20">
          <div className="text-center md:text-left mb-10">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-lime">
              The 0x Video Standard
            </span>
            <h3 className="mt-2 text-2xl font-extrabold md:text-3xl">
              Why our videos convert and retain
            </h3>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f, i) => {
              const Icon = f.icon;
              return (
                <Reveal key={f.title} delay={i * 80}>
                  <div className="sticker h-full rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-lime/40">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-lime/15 text-lime border border-lime/30">
                      <Icon className="size-5" />
                    </div>
                    <h4 className="mt-4 text-lg font-bold">{f.title}</h4>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                      {f.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* Quick Turnaround Banner & CTA */}
        <div className="mt-14 rounded-3xl border border-border bg-card/80 p-8 backdrop-blur-xl md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[var(--shadow-float)]">
          <div className="text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              <span className="rounded-full bg-lime px-3 py-1 text-xs font-bold text-ink">
                48h Fast-Track
              </span>
              <span className="text-xs font-mono text-muted-foreground">
                Unlimited Revisions · 4K 60FPS Native
              </span>
            </div>
            <h3 className="mt-3 text-2xl font-extrabold md:text-3xl">
              Need video editing for your brand or podcast?
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Send us your raw footage. We turn it into high-converting assets in days.
            </p>
          </div>

          <a
            href={SOCIALS.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="sticker group shrink-0 inline-flex items-center gap-2 rounded-full bg-lime px-7 py-4 text-sm font-bold text-ink"
          >
            Start video project
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>

      {/* Expanded Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-70 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-border bg-card p-4 shadow-2xl">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-6 right-6 z-10 flex size-9 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur-md border border-border transition-colors hover:bg-lime hover:text-ink"
              aria-label="Close preview"
            >
              <X className="size-5" />
            </button>

            <div className="relative mx-auto aspect-[9/16] max-h-[70vh] w-auto overflow-hidden rounded-2xl bg-black">
              <video
                src={activeModal.src}
                controls
                autoPlay
                playsInline
                className="h-full w-full object-contain"
              />
            </div>

            <div className="mt-4 px-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-lime">
                  {activeModal.category}
                </span>
                <span className="text-xs font-mono text-muted-foreground">
                  {activeModal.metrics}
                </span>
              </div>
              <h3 className="mt-1 text-lg font-bold">{activeModal.title}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{activeModal.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function VideoCard({
  reel,
  index,
  onExpand,
}: {
  reel: VideoItem;
  index: number;
  onExpand: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-play / pause when scrolled into view (Buffer-free Instant Playback)
  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.35) {
            // Buffer-free play attempt
            video
              .play()
              .then(() => setIsPlaying(true))
              .catch(() => {
                // Browser policy fallback
                setIsPlaying(false);
              });
          } else {
            video.pause();
            setIsPlaying(false);
          }
        });
      },
      {
        threshold: [0, 0.35, 0.7],
      },
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, []);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    setProgress((video.currentTime / video.duration) * 100);
  };

  return (
    <Reveal delay={index * 120}>
      <div
        ref={containerRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card p-5 md:p-6 transition-all duration-300 hover:border-lime/50 hover:shadow-[var(--shadow-float)]"
      >
        {/* Card Header Info */}
        <div className="flex items-center justify-between gap-3 border-b border-border/70 pb-4">
          <div className="flex items-center gap-2">
            <span className="flex size-2.5 rounded-full bg-lime animate-pulse" />
            <span className="text-xs font-mono font-medium text-muted-foreground uppercase tracking-wider">
              {reel.category}
            </span>
          </div>
          <span className="rounded-full border border-border bg-background/50 px-2.5 py-0.5 text-[11px] font-mono text-lime">
            {reel.tag}
          </span>
        </div>

        {/* Video Player Box */}
        <div className="relative mt-5 aspect-[9/14] sm:aspect-[9/13] w-full overflow-hidden rounded-2xl border border-border/80 bg-black">
          <video
            ref={videoRef}
            src={reel.src}
            poster={reel.poster}
            playsInline
            muted={isMuted}
            loop
            preload="auto"
            onTimeUpdate={handleTimeUpdate}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          />

          {/* Subtle Top Gradient for Badges */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/80 via-black/30 to-transparent" />

          {/* Top Overlay Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
            <span className="rounded-full bg-background/80 px-2.5 py-1 text-[11px] font-mono text-foreground backdrop-blur-md border border-border/70 flex items-center gap-1.5 shadow-md">
              <span
                className={`size-2 rounded-full ${isPlaying ? "bg-lime animate-pulse" : "bg-muted-foreground"}`}
              />
              <span>{isPlaying ? "Playing" : "Paused"}</span>
            </span>

            <span className="rounded-full bg-background/80 px-2.5 py-1 text-[11px] font-mono text-lime backdrop-blur-md border border-border/70 shadow-md">
              {reel.metrics}
            </span>
          </div>

          {/* Center Play Button Overlay (when paused or hover) */}
          <div
            onClick={togglePlay}
            className={`absolute inset-0 flex items-center justify-center cursor-pointer transition-opacity duration-300 ${
              !isPlaying || isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="flex size-14 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur-md border border-border shadow-xl transition-transform hover:scale-110 hover:bg-lime hover:text-ink">
              {isPlaying ? (
                <Pause className="size-6" />
              ) : (
                <Play className="size-6 ml-0.5" fill="currentColor" />
              )}
            </div>
          </div>

          {/* Bottom Controls Bar */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4">
            {/* Playback Progress Track */}
            <div className="mb-3 h-1 w-full overflow-hidden rounded-full bg-white/20">
              <div
                className="h-full bg-lime transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                {/* Play/Pause icon button */}
                <button
                  onClick={togglePlay}
                  className="flex size-8 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md border border-white/10 hover:bg-lime hover:text-ink transition-colors"
                  aria-label={isPlaying ? "Pause video" : "Play video"}
                >
                  {isPlaying ? <Pause className="size-4" /> : <Play className="size-4 ml-0.5" />}
                </button>

                {/* Mute/Unmute audio button */}
                <button
                  onClick={toggleMute}
                  className={`flex size-8 items-center justify-center rounded-full backdrop-blur-md border transition-colors ${
                    isMuted
                      ? "bg-white/10 text-white/80 border-white/10 hover:text-white"
                      : "bg-lime text-ink border-lime font-bold shadow-[0_0_12px_rgba(200,255,0,0.5)]"
                  }`}
                  aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                >
                  {isMuted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
                </button>

                <span className="text-[11px] font-mono text-white/70">
                  {isMuted ? "Audio muted (tap to hear)" : "Audio on"}
                </span>
              </div>

              {/* Expand Fullscreen */}
              <button
                onClick={onExpand}
                className="flex size-8 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md border border-white/10 hover:bg-lime hover:text-ink transition-colors"
                aria-label="Expand preview"
              >
                <Maximize2 className="size-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Video Description & Highlights */}
        <div className="mt-5 flex flex-1 flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold text-foreground group-hover:text-lime transition-colors">
              {reel.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{reel.description}</p>
          </div>

          <div className="mt-5 flex flex-wrap gap-2 pt-4 border-t border-border/70">
            {reel.highlights.map((h) => (
              <span
                key={h}
                className="rounded-lg bg-paper-2/10 border border-border px-2.5 py-1 text-[11px] font-medium text-muted-foreground"
              >
                {h}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}
