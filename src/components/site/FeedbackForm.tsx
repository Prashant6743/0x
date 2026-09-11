import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Drawer } from "vaul";
import { Loader2, CheckCircle2, X, ArrowUpRight } from "lucide-react";
import { toast } from "sonner";
import { submitLead } from "@/lib/supabase";
import { sendLeadEmail } from "@/lib/email";
import { SERVICES } from "@/lib/site";
import { useFeedbackDrawer } from "@/hooks/use-feedback-drawer";

// ─── Schema ──────────────────────────────────────────────────────────────────

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Enter a valid email"),
  company: z.string().optional(),
  services: z.array(z.string()).min(1, "Pick at least one service"),
  budget: z.string().optional(),
  message: z.string().min(10, "Tell us a bit more (min 10 chars)"),
  referral: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

const BUDGETS = ["< $2k", "$2k – $5k", "$5k – $15k", "$15k – $50k", "$50k +"];
const REFERRALS = ["Google / Search", "Instagram", "X / Twitter", "LinkedIn", "Friend / Referral", "Other"];

// ─── Main component ───────────────────────────────────────────────────────────

export function FeedbackForm() {
  const { isOpen, close } = useFeedbackDrawer();
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { services: [] },
  });

  const selectedServices = watch("services");

  async function onSubmit(data: FormValues) {
    try {
      await submitLead({
        name: data.name,
        email: data.email,
        company: data.company || undefined,
        services: data.services,
        budget: data.budget || undefined,
        message: data.message,
        referral: data.referral || undefined,
      });

      // Send email alert via EmailJS
      sendLeadEmail({
        name: data.name,
        email: data.email,
        company: data.company,
        services: data.services
          .map((id) => SERVICES.find((s) => s.id === id)?.title || id)
          .join(", "),
        budget: data.budget,
        message: data.message,
        referral: data.referral,
      }).catch((emailErr) => {
        console.error("EmailJS dispatch failed:", emailErr);
      });

      setSubmitted(true);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again or WhatsApp us directly.");
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

          {/* Header with grain */}
          <div className="grain relative border-b border-white/8 px-6 pb-5 pt-4">
            <div className="flex items-start justify-between">
              <div>
                <Drawer.Title className="font-display text-2xl font-extrabold tracking-tight text-foreground">
                  Start a Project
                </Drawer.Title>
                <p className="mt-1 text-sm text-muted-foreground">
                  Tell us about your idea — we'll be back within 24 h.
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
              <form id="project-brief-form" onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>

                {/* Row: Name + Email */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Your name *" error={errors.name?.message}>
                    <input
                      id="field-name"
                      {...register("name")}
                      placeholder="Alex Johnson"
                      className={inputCls(!!errors.name)}
                    />
                  </Field>
                  <Field label="Email *" error={errors.email?.message}>
                    <input
                      id="field-email"
                      type="email"
                      {...register("email")}
                      placeholder="alex@company.com"
                      className={inputCls(!!errors.email)}
                    />
                  </Field>
                </div>

                {/* Company */}
                <Field label="Company / Project name" error={errors.company?.message}>
                  <input
                    id="field-company"
                    {...register("company")}
                    placeholder="Acme Inc. (optional)"
                    className={inputCls(false)}
                  />
                </Field>

                {/* Services */}
                <Controller
                  name="services"
                  control={control}
                  render={({ field }) => (
                    <Field label="What do you need? *" error={errors.services?.message}>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {SERVICES.map((s) => {
                          const active = field.value.includes(s.id);
                          return (
                            <button
                              id={`service-chip-${s.id}`}
                              key={s.id}
                              type="button"
                              onClick={() =>
                                field.onChange(
                                  active
                                    ? field.value.filter((v) => v !== s.id)
                                    : [...field.value, s.id],
                                )
                              }
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

                {/* Budget */}
                <Field label="Rough budget" error={errors.budget?.message}>
                  <select
                    id="field-budget"
                    {...register("budget")}
                    className={inputCls(false) + " cursor-pointer"}
                  >
                    <option value="">Select a range (optional)</option>
                    {BUDGETS.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </Field>

                {/* Message */}
                <Field label="Project brief *" error={errors.message?.message}>
                  <textarea
                    id="field-message"
                    {...register("message")}
                    rows={4}
                    placeholder="Describe your idea, goals, and timeline..."
                    className={inputCls(!!errors.message) + " resize-none"}
                  />
                </Field>

                {/* Referral */}
                <Field label="How did you find us?" error={errors.referral?.message}>
                  <select
                    id="field-referral"
                    {...register("referral")}
                    className={inputCls(false) + " cursor-pointer"}
                  >
                    <option value="">Select an option (optional)</option>
                    {REFERRALS.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </Field>
              </form>
            )}
          </div>

          {/* Footer CTA */}
          {!submitted && (
            <div className="shrink-0 border-t border-white/8 px-6 py-4">
              <button
                id="submit-project-brief"
                type="submit"
                form="project-brief-form"
                disabled={isSubmitting}
                className="sticker group flex w-full items-center justify-center gap-2 rounded-full bg-lime px-6 py-3.5 text-sm font-bold text-ink disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    Send Brief
                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </>
                )}
              </button>
              <p className="mt-2.5 text-center text-xs text-muted-foreground/60">
                No spam. We reply within one business day.
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
      <h3 className="font-display mt-6 text-2xl font-extrabold">You're in the queue!</h3>
      <p className="mt-3 max-w-xs text-sm text-muted-foreground">
        We've received your brief and will reach out within 24 hours. Meanwhile, feel free to
        browse our work.
      </p>
      <button
        id="success-close-btn"
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
