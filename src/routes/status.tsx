import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Clock, CheckCircle2, AlertCircle, MessageCircle } from "lucide-react";
import { business } from "@/lib/site-data";

export const Route = createFileRoute("/status")({
  head: () => ({
    meta: [
      { title: "Booking Status — Tebo's Nail Heaven" },
      { name: "description", content: "Check the verification status of your booking request using your transaction reference." },
      { property: "og:title", content: "Booking Status — Tebo's Nail Heaven" },
      { property: "og:description", content: "Track your pending or confirmed appointment." },
    ],
  }),
  component: StatusPage,
});

type Stage = "idle" | "pending" | "confirmed" | "notfound";

function StatusPage() {
  const [ref, setRef] = useState("");
  const [stage, setStage] = useState<Stage>("idle");

  const check = (e: React.FormEvent) => {
    e.preventDefault();
    const v = ref.trim();
    if (!v) return;
    // Heuristic preview: until backend verification, every submitted ref is pending.
    // The studio confirms manually on WhatsApp after seeing your proof.
    setStage("pending");
  };

  const waUrl = `https://wa.me/${business.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(
    `Hi Tebo! Checking the status of my booking. Reference: ${ref}`
  )}`;

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <header className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Track</p>
        <h1 className="mt-2 font-script text-4xl text-wine md:text-5xl">Booking status</h1>
        <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
          Enter the transaction reference you used at checkout. We'll show your current
          verification stage and open a WhatsApp chat so you can confirm with Tebo directly.
        </p>
      </header>

      <form
        onSubmit={check}
        className="mt-8 rounded-3xl border border-border bg-card p-6 shadow-soft"
      >
        <label className="block text-sm font-semibold text-wine">
          Transaction reference
          <span className="ml-1 text-xs font-normal text-muted-foreground">(letters &amp; numbers)</span>
        </label>
        <div className="mt-2 flex gap-2">
          <input
            value={ref}
            onChange={(e) => setRef(e.target.value)}
            placeholder="e.g. PTC-AX2389 or your txn ID"
            className="flex-1 rounded-xl border border-border bg-card px-4 py-2.5 text-sm outline-none focus:border-ring"
          />
          <button
            type="submit"
            className="inline-flex items-center gap-1 rounded-xl bg-wine px-4 py-2.5 text-sm font-semibold text-primary-foreground"
          >
            <Search className="h-4 w-4" /> Check
          </button>
        </div>

        {stage !== "idle" && (
          <div className="mt-6 space-y-3">
            <StageRow
              icon={<CheckCircle2 className="h-5 w-5" />}
              label="Request received"
              done
            />
            <StageRow
              icon={<Clock className="h-5 w-5" />}
              label="Awaiting deposit verification"
              active={stage === "pending"}
              done={stage === "confirmed"}
            />
            <StageRow
              icon={<CheckCircle2 className="h-5 w-5" />}
              label="Slot confirmed — see you soon"
              done={stage === "confirmed"}
            />

            <div className="mt-5 rounded-2xl border border-gold/40 bg-accent/10 p-4">
              <p className="flex items-center gap-2 text-sm font-bold text-wine">
                <AlertCircle className="h-4 w-4 text-gold" /> Final confirmation is manual
              </p>
              <p className="mt-2 text-sm text-foreground/85">
                Tebo cross-checks your payment screenshot on WhatsApp before flipping your slot
                from pending to confirmed. If you've already sent proof and don't see a reply,
                tap below to nudge her.
              </p>
              <a
                href={waUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-wine px-5 py-2 text-xs font-semibold text-primary-foreground"
              >
                <MessageCircle className="h-4 w-4" /> Message Tebo on WhatsApp
              </a>
            </div>
          </div>
        )}
      </form>

      <p className="mt-6 text-center text-sm">
        <Link to="/book" className="font-semibold text-wine underline-offset-4 hover:underline">
          ← Back to booking
        </Link>
      </p>
    </div>
  );
}

function StageRow({
  icon,
  label,
  done,
  active,
}: {
  icon: React.ReactNode;
  label: string;
  done?: boolean;
  active?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-3 rounded-xl border p-3 ${
        done
          ? "border-gold/50 bg-accent/15 text-wine"
          : active
          ? "border-wine/40 bg-secondary text-wine"
          : "border-border bg-card text-muted-foreground"
      }`}
    >
      <span
        className={`flex h-9 w-9 flex-none items-center justify-center rounded-full ${
          done ? "bg-gold text-accent-foreground" : active ? "bg-wine text-primary-foreground" : "bg-secondary"
        }`}
      >
        {icon}
      </span>
      <span className="text-sm font-semibold">{label}</span>
    </div>
  );
}
