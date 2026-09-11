import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Drawer } from "vaul";
import { Loader2, CheckCircle2, X, Star, ArrowUpRight } from "lucide-react";
import { toast } from "sonner";
import { submitReview } from "@/lib/supabase";
import { SERVICES } from "@/lib/site";
import { useReviewDrawer } from "@/hooks/use-review-drawer";

// ─── Schema ───────────────────────────────────────────────────────────────────

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  company: z.string().optional(),
  rating: z.number().min(1, "Please select a rating").max(5),
  service: z.string().min(1, "Please select a service"),
  review: z.string().min(20, "Tell us a bit more (min 20 chars)"),
  project_url: z.string().url("Enter a valid URL").or(z.literal("")).optional(),
});

type FormValues = z.infer<typeof schema>;

// ─── Star Picker ─────────────────────────────────────────────────────────────

function StarPicker({
  value,
  onChange,
  error,
}: {
  value: number;
  onChange: (v: number) => void;
  error?: string;
}) {
  const [hovered, setHovered] = useState(0);
  const display = hovered || value;

  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        Your Rating *
      </label>
      <div className="flex items-center gap-1.5 pt-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            id={`star-${star}`}
            type="button"
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            onClick={() => onChange(star)}
            className="transition-transform duration-100 hover:scale-110 focus:outline-none"
            aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
          >
            <Star
              className={[
                "size-8 transition-colors duration-150",
                display >= star
                  ? "fill-lime text-lime"
                  : "fill-white/5 text-white/20",
              ].join(" ")}
            />
          </button>
        ))}
        {value > 0 && (
          <span className="ml-2 text-xs text-muted-foreground">
            {["", "Poor", "Fair", "Good", "Great", "Excellent"][value]}
          </span>
        )}
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function ReviewForm() {
  const { isOpen, close } = useReviewDrawer();
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { rating: 0, service: "" },
  });

  async function onSubmit(data: FormValues) {
    try {
      await submitReview({
        name: data.name,
        company: data.company || undefined,
        rating: data.rating,
        service: data.service,
        review: data.review,
        project_url: data.project_url || undefined,
      });
      setSubmitted(true);
      window.dispatchEvent(new CustomEvent("review-submitted"));
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    }
  }

  function handleClose() {
    close();
    setTimeout(() => {
      reset();
      setSubmitted(false);
    }, 400);
  }

  return (
    <Drawer.Root open={isOpen} onOpenChange={(o) => !o && handleClose()}>
      <Drawer.Portal>
        {/* Overlay */}
        <Drawer.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" />

        {/* Panel */}
        <Drawer.Content
          className="fixed inset-x-0 bottom-0 z-50 mx-auto flex max-h-[92dvh] w-full max-w-[560px] flex-col rounded-t-[28px] bg-[oklch(0.09_0_0)] outline-none"
          style={{ boxShadow: "0 -30px 80px -20px rgba(0,0,0,0.9)" }}
        >
          {/* Drag handle */}
          <div className="mx-auto mt-3 h-1.5 w-10 shrink-0 rounded-full bg-white/20" />

          {/* Header */}
          <div className="grain relative border-b border-white/8 px-6 pb-5 pt-4">
            <div className="flex items-start justify-between">
              <div>
                <Drawer.Title className="font-display text-2xl font-extrabold tracking-tight text-foreground">
                  Leave a Review
                </Drawer.Title>
                <p className="mt-1 text-sm text-muted-foreground">
                  Share your experience working with 0xStudio.
                </p>
              </div>
              <button
                onClick={handleClose}
                aria-label="Close"
                className="ml-4 mt-0.5 rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            {submitted ? (
              <SuccessState onClose={handleClose} />
            ) : (
              <form id="review-form" onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>

                {/* Row: Name + Company */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Your name *" error={errors.name?.message}>
                    <input
                      id="review-field-name"
                      {...register("name")}
                      placeholder="Alex Johnson"
                      className={inputCls(!!errors.name)}
                    />
                  </Field>
                  <Field label="Company / Role" error={errors.company?.message}>
                    <input
                      id="review-field-company"
                      {...register("company")}
                      placeholder="Acme Inc. (optional)"
                      className={inputCls(false)}
                    />
                  </Field>
                </div>

                {/* Star Rating */}
                <Controller
                  name="rating"
                  control={control}
                  render={({ field }) => (
                    <StarPicker
                      value={field.value}
                      onChange={field.onChange}
                      error={errors.rating?.message}
                    />
                  )}
                />

                {/* Service */}
                <Controller
                  name="service"
                  control={control}
                  render={({ field }) => (
                    <Field label="Service you used *" error={errors.service?.message}>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {SERVICES.map((s) => {
                          const active = field.value === s.id;
                          return (
                            <button
                              id={`review-service-chip-${s.id}`}
                              key={s.id}
                              type="button"
                              onClick={() => field.onChange(active ? "" : s.id)}
                              className={[
                                "rounded-full border px-3 py-1.5 text-xs font-semibold transition-all duration-200",
                                active
                                  ? "border-lime bg-lime text-ink"
                                  : "border-white/15 bg-white/5 text-muted-foreground hover:border-white/30 hover:text-foreground",
                              ].join(" ")}
                            >
                              {s.title}
                            </button>
                          );
                        })}
                      </div>
                    </Field>
                  )}
                />

                {/* Review text */}
                <Field label="Your review *" error={errors.review?.message}>
                  <textarea
                    id="review-field-text"
                    {...register("review")}
                    rows={4}
                    placeholder="Tell us about your experience working with 0xStudio..."
                    className={inputCls(!!errors.review) + " resize-none"}
                  />
                </Field>

                {/* Project URL */}
                <Field label="Project URL" error={errors.project_url?.message}>
                  <input
                    id="review-field-url"
                    {...register("project_url")}
                    placeholder="https://yourproject.com (optional)"
                    className={inputCls(!!errors.project_url)}
                  />
                </Field>
              </form>
            )}
          </div>

          {/* Footer CTA */}
          {!submitted && (
            <div className="shrink-0 border-t border-white/8 px-6 py-4">
              <button
                id="submit-review"
                type="submit"
                form="review-form"
                disabled={isSubmitting}
                className="sticker group flex w-full items-center justify-center gap-2 rounded-full bg-lime px-6 py-3.5 text-sm font-bold text-ink disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Submitting…
                  </>
                ) : (
                  <>
                    Submit Review
                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </>
                )}
              </button>
              <p className="mt-2.5 text-center text-xs text-muted-foreground/60">
                Your review will be shared publicly on our site.
              </p>
            </div>
          )}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

// ─── Success state ────────────────────────────────────────────────────────────

function SuccessState({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="flex size-16 items-center justify-center rounded-full bg-lime/15">
        <CheckCircle2 className="size-8 text-lime" strokeWidth={1.5} />
      </div>
      <h3 className="font-display mt-6 text-2xl font-extrabold">Thanks for your review!</h3>
      <p className="mt-3 max-w-xs text-sm text-muted-foreground">
        Your review has been published on the site. We truly appreciate your feedback!
      </p>
      <button
        id="review-success-close-btn"
        onClick={onClose}
        className="sticker mt-8 rounded-full bg-lime px-6 py-3 text-sm font-bold text-ink"
      >
        Back to site
      </button>
    </div>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
      </label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

function inputCls(hasError: boolean) {
  return [
    "w-full rounded-xl border bg-white/5 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50",
    "outline-none transition-all duration-150",
    "focus:bg-white/8 focus:ring-2 focus:ring-lime/60",
    hasError ? "border-destructive/60" : "border-white/10 hover:border-white/20",
  ].join(" ");
}
