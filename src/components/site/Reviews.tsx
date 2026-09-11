import { useEffect, useState } from "react";
import { Star, Quote, ArrowUpRight } from "lucide-react";
import { fetchReviews, type Review } from "@/lib/supabase";
import { useReviewDrawer } from "@/hooks/use-review-drawer";
import { Reveal } from "@/components/Reveal";

// ─── Service label map ────────────────────────────────────────────────────────

const SERVICE_LABELS: Record<string, string> = {
  "01": "Web & Mobile Apps",
  "02": "UX & Product Design",
  "03": "Product Development",
  "04": "Award-Class Web Design",
  "05": "Communication Design",
  "06": "Video & Motion Editing",
};

// ─── Single card ──────────────────────────────────────────────────────────────

function ReviewCard({ review }: { review: Omit<Review, "id" | "approved" | "created_at"> }) {
  return (
    <article className="relative w-[320px] shrink-0 rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm mx-3 hover:border-lime/30 transition-colors duration-300">
      {/* Quote icon */}
      <Quote className="absolute top-5 right-5 size-6 text-lime/20" />

      {/* Stars */}
      <div className="flex items-center gap-0.5 mb-4">
        {[1, 2, 3, 4, 5].map((s) => (
          <Star
            key={s}
            className={[
              "size-3.5",
              s <= review.rating
                ? "fill-lime text-lime"
                : "fill-white/10 text-white/10",
            ].join(" ")}
          />
        ))}
      </div>

      {/* Review text */}
      <p className="text-sm leading-relaxed text-foreground/80 line-clamp-4">
        "{review.review}"
      </p>

      {/* Footer */}
      <div className="mt-5 flex items-end justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-foreground">{review.name}</p>
          {review.company && (
            <p className="text-xs text-muted-foreground mt-0.5">{review.company}</p>
          )}
        </div>
        {review.service && (
          <span className="shrink-0 rounded-full border border-white/10 px-2.5 py-1 text-[10px] font-medium text-muted-foreground">
            {SERVICE_LABELS[review.service] ?? review.service}
          </span>
        )}
      </div>
    </article>
  );
}

// ─── Marquee row ──────────────────────────────────────────────────────────────

function MarqueeRow({
  reviews,
  reverse = false,
}: {
  reviews: Omit<Review, "id" | "approved" | "created_at">[];
  reverse?: boolean;
}) {
  // Ensure enough cards for a continuous marquee loop
  const minCards = 8;
  const repeatTimes = Math.max(2, Math.ceil(minCards / Math.max(1, reviews.length)));
  const items = Array.from({ length: repeatTimes }, () => reviews).flat();

  return (
    <div className="relative overflow-hidden">
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />

      <div
        className="flex w-max"
        style={{
          animation: `marquee ${reverse ? "45s" : "50s"} linear infinite ${reverse ? "reverse" : ""}`,
        }}
      >
        {items.map((review, i) => (
          <ReviewCard key={i} review={review} />
        ))}
      </div>
    </div>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────

function EmptyState({ onOpen }: { onOpen: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="flex size-16 items-center justify-center rounded-full bg-white/5 border border-white/10">
        <Star className="size-7 text-lime/60" />
      </div>
      <p className="mt-5 text-lg font-semibold text-foreground">No reviews yet</p>
      <p className="mt-2 max-w-xs text-sm text-muted-foreground">
        Be the first to share your experience working with 0xStudio.
      </p>
      <button
        onClick={onOpen}
        className="sticker group mt-6 inline-flex items-center gap-2 rounded-full bg-lime px-6 py-3 text-sm font-bold text-ink"
      >
        Leave the first review
        <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </button>
    </div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────

export function Reviews({ initialReviews = [] }: { initialReviews?: Review[] }) {
  const { open } = useReviewDrawer();
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [loading, setLoading] = useState(initialReviews.length === 0);

  const loadReviews = () => {
    fetchReviews()
      .then((data) => {
        setReviews(data);
      })
      .catch((err) => {
        console.error("Error fetching reviews:", err);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadReviews();
    window.addEventListener("review-submitted", loadReviews);
    return () => window.removeEventListener("review-submitted", loadReviews);
  }, []);

  useEffect(() => {
    if (initialReviews && initialReviews.length > 0) {
      setReviews(initialReviews);
      setLoading(false);
    }
  }, [initialReviews]);

  // Split into two rows (both rows populated even if only 1 review)
  const mid = Math.ceil(reviews.length / 2);
  const rowA = reviews.length > 1 ? reviews.slice(0, mid) : reviews;
  const rowB = reviews.length > 1 ? reviews.slice(mid) : reviews;

  return (
    <section id="reviews" className="grain relative bg-background py-28 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6 border-b border-border pb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-lime">
                Client Reviews
              </span>
              <h2 className="mt-2 text-4xl font-extrabold md:text-6xl">
                What clients say
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <p className="max-w-xs text-sm text-muted-foreground">
                Real words from the founders, teams, and creators we've shipped with.
              </p>
              <button
                id="leave-review-btn"
                onClick={open}
                className="sticker group shrink-0 inline-flex items-center gap-2 rounded-full bg-lime px-5 py-2.5 text-xs font-bold text-ink"
              >
                Leave a Review
                <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Content */}
      {loading ? (
        /* Loading skeleton */
        <div className="mt-12 flex justify-center gap-4 px-6 overflow-hidden">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-[320px] shrink-0 rounded-2xl border border-white/8 bg-white/[0.02] h-48 animate-pulse"
            />
          ))}
        </div>
      ) : reviews.length === 0 ? (
        <EmptyState onOpen={open} />
      ) : (
        <>
          {/* Marquee rows — full bleed */}
          <div className="mt-12 space-y-5">
            {rowA.length > 0 && <MarqueeRow reviews={rowA} />}
            {rowB.length > 0 && <MarqueeRow reviews={rowB} reverse />}
          </div>

          {/* Bottom CTA */}
          <Reveal>
            <div className="mx-auto mt-12 max-w-7xl px-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <span className="size-1.5 rounded-full bg-lime animate-pulse" />
              {reviews.length} verified client review{reviews.length > 1 ? "s" : ""}
              <button
                onClick={open}
                className="ml-1 underline underline-offset-2 text-lime hover:text-lime/80 transition-colors"
              >
                Share yours →
              </button>
            </div>
          </Reveal>
        </>
      )}
    </section>
  );
}
