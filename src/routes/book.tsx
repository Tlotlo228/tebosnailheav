import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { z } from "zod";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { Check, Copy, ChevronLeft, ChevronRight, Sparkles, AlertCircle, Calendar as CalIcon } from "lucide-react";
import { services, addOns, business, policies, type Service, type AddOn } from "@/lib/site-data";

const searchSchema = z.object({
  service: fallback(z.string().optional(), undefined),
});

export const Route = createFileRoute("/book")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "Book an Appointment — Tebo's Nail Heaven" },
      { name: "description", content: "Book your gel, polygel or lash appointment. P50 deposit secures your slot." },
      { property: "og:title", content: "Book — Tebo's Nail Heaven" },
      { property: "og:description", content: "Multi-step booking with deposit instructions." },
    ],
  }),
  component: BookingPage,
});

type Booking = {
  serviceId: string | null;
  addOnIds: string[];
  inspoFileName: string | null;
  name: string;
  phone: string;
  notes: string;
  txRef: string;
  proofFileName: string | null;
  agreed: boolean;
};

const steps = ["Service", "Add-ons", "Details", "Deposit", "Confirm", "Pick slot"] as const;

function BookingPage() {
  const { service: serviceParam } = Route.useSearch();
  const [step, setStep] = useState(0);
  const [b, setB] = useState<Booking>({
    serviceId: serviceParam ?? null,
    addOnIds: [],
    inspoFileName: null,
    name: "",
    phone: "",
    notes: "",
    txRef: "",
    proofFileName: null,
    agreed: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const service = useMemo(() => services.find((s) => s.id === b.serviceId) ?? null, [b.serviceId]);
  const selectedAddOns = useMemo(
    () => addOns.filter((a) => b.addOnIds.includes(a.id)),
    [b.addOnIds]
  );
  const total = (service?.price ?? 0) + selectedAddOns.reduce((s, a) => s + a.price, 0);

  const canNext = () => {
    if (step === 0) return !!b.serviceId;
    if (step === 1) return true;
    if (step === 2) return b.name.trim().length > 1 && b.phone.trim().length > 5;
    if (step === 3) return b.txRef.trim().length > 0 && b.agreed;
    return true;
  };

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <header className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Booking</p>
        <h1 className="mt-2 font-script text-4xl text-wine md:text-5xl">Reserve your slot</h1>
      </header>

      {/* Progress */}
      <ol className="mt-8 flex items-center justify-between gap-1 overflow-x-auto pb-2">
        {steps.map((label, i) => (
          <li key={label} className="flex flex-1 items-center gap-1">
            <div
              className={`flex h-7 w-7 flex-none items-center justify-center rounded-full text-xs font-bold ${
                i < step
                  ? "bg-gold text-accent-foreground"
                  : i === step
                  ? "bg-wine text-primary-foreground"
                  : "border border-border bg-card text-muted-foreground"
              }`}
            >
              {i < step ? <Check className="h-4 w-4" /> : i + 1}
            </div>
            {i < steps.length - 1 && (
              <div className={`h-px flex-1 ${i < step ? "bg-gold" : "bg-border"}`} />
            )}
          </li>
        ))}
      </ol>
      <p className="mt-2 text-center text-sm font-medium text-wine">{steps[step]}</p>

      <div className="mt-8 rounded-3xl border border-border bg-card p-6 shadow-soft md:p-8">
        {step === 0 && <StepService booking={b} set={setB} />}
        {step === 1 && <StepAddons booking={b} set={setB} />}
        {step === 2 && <StepDetails booking={b} set={setB} />}
        {step === 3 && <StepDeposit booking={b} set={setB} total={total} />}
        {step === 4 && (
          <StepConfirm
            booking={b}
            service={service}
            selectedAddOns={selectedAddOns}
            total={total}
            submitted={submitted}
            onSubmit={() => setSubmitted(true)}
          />
        )}
        {step === 5 && <StepSlot booking={b} service={service} total={total} />}
      </div>

      {step < steps.length - 1 && (
        <div className="mt-6 flex items-center justify-between gap-3">
          <button
            onClick={back}
            disabled={step === 0}
            className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground/80 disabled:opacity-40"
          >
            <ChevronLeft className="h-4 w-4" /> Back
          </button>
          <button
            onClick={() => {
              if (step === 4 && !submitted) return;
              next();
            }}
            disabled={!canNext() || (step === 4 && !submitted)}
            className="inline-flex items-center gap-1 rounded-full bg-wine px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft disabled:opacity-40"
          >
            {step === 4 ? "Pick your slot" : "Continue"} <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}

/* ---------------- STEP 1: Service ---------------- */
function StepService({ booking, set }: { booking: Booking; set: (b: Booking) => void }) {
  const grouped = services.reduce<Record<string, typeof services>>((acc, s) => {
    (acc[s.category] ||= []).push(s);
    return acc;
  }, {});
  return (
    <div>
      <h2 className="font-script text-2xl text-wine">Choose your service</h2>
      <p className="mt-1 text-sm text-muted-foreground">All prices in {business.currency}ula.</p>
      <div className="mt-6 space-y-6">
        {Object.entries(grouped).map(([cat, items]) => (
          <div key={cat}>
            <p className="text-xs font-semibold uppercase tracking-wider text-gold">{cat}</p>
            <div className="mt-2 grid gap-2">
              {items.map((s) => {
                const active = booking.serviceId === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => set({ ...booking, serviceId: s.id })}
                    className={`flex items-center justify-between gap-3 rounded-xl border p-3 text-left transition-all ${
                      active ? "border-wine bg-secondary shadow-soft" : "border-border hover:bg-secondary/40"
                    }`}
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-wine">{s.name}</p>
                      <p className="text-xs text-muted-foreground">{s.duration} min</p>
                    </div>
                    <span className="text-base font-bold text-wine">P{s.price}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- STEP 2: Add-ons ---------------- */
function StepAddons({ booking, set }: { booking: Booking; set: (b: Booking) => void }) {
  const toggle = (id: string) =>
    set({
      ...booking,
      addOnIds: booking.addOnIds.includes(id)
        ? booking.addOnIds.filter((x) => x !== id)
        : [...booking.addOnIds, id],
    });
  return (
    <div>
      <h2 className="font-script text-2xl text-wine">Add-ons</h2>
      <p className="mt-1 text-sm text-muted-foreground">Optional. Art is FREE in combo sets.</p>
      <div className="mt-6 grid gap-2">
        {addOns.map((a) => {
          const active = booking.addOnIds.includes(a.id);
          return (
            <button
              key={a.id}
              onClick={() => toggle(a.id)}
              className={`flex items-center justify-between gap-3 rounded-xl border p-3 text-left transition-all ${
                active ? "border-wine bg-secondary" : "border-border hover:bg-secondary/40"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-5 w-5 flex-none items-center justify-center rounded-md border ${
                    active ? "border-wine bg-wine text-primary-foreground" : "border-border"
                  }`}
                >
                  {active && <Check className="h-3 w-3" />}
                </div>
                <span className="text-sm text-foreground/90">{a.name}</span>
              </div>
              <span className="text-sm font-bold text-wine">+P{a.price}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------- STEP 3: Details ---------------- */
function StepDetails({ booking, set }: { booking: Booking; set: (b: Booking) => void }) {
  return (
    <div>
      <h2 className="font-script text-2xl text-wine">Your details</h2>
      <div className="mt-6 grid gap-4">
        <Field label="Full name" required>
          <input
            value={booking.name}
            onChange={(e) => set({ ...booking, name: e.target.value })}
            className="input"
            placeholder="Lerato Moeng"
          />
        </Field>
        <Field label="WhatsApp number" required>
          <input
            value={booking.phone}
            onChange={(e) => set({ ...booking, phone: e.target.value })}
            className="input"
            placeholder="+267 7X XXX XXX"
            inputMode="tel"
          />
        </Field>
        <Field label="Notes (optional)">
          <textarea
            value={booking.notes}
            onChange={(e) => set({ ...booking, notes: e.target.value })}
            className="input min-h-[90px]"
            placeholder="Any allergies, preferences, special requests…"
          />
        </Field>
        <Field label="Inspiration photo (optional)">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => set({ ...booking, inspoFileName: e.target.files?.[0]?.name ?? null })}
            className="block w-full text-sm file:mr-3 file:rounded-full file:border-0 file:bg-wine file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary-foreground"
          />
          {booking.inspoFileName && <p className="mt-1 text-xs text-muted-foreground">Selected: {booking.inspoFileName}</p>}
          <p className="mt-1 text-xs text-muted-foreground">
            Note: WhatsApp can't auto-attach files via a link — please send this photo in the WhatsApp
            chat we'll open at the end.
          </p>
        </Field>
      </div>
      <style>{`.input{width:100%;border:1px solid var(--color-border);background:var(--color-card);padding:0.65rem 0.85rem;border-radius:0.75rem;font-size:0.95rem;color:var(--color-foreground);outline:none;}
.input:focus{border-color:var(--color-ring);box-shadow:0 0 0 3px color-mix(in oklab, var(--color-ring) 25%, transparent);} `}</style>
    </div>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-wine">
        {label}
        {required && <span className="text-destructive"> *</span>}
      </span>
      {children}
    </label>
  );
}

/* ---------------- STEP 4: Deposit ---------------- */
function StepDeposit({ booking, set, total }: { booking: Booking; set: (b: Booking) => void; total: number }) {
  const [copied, setCopied] = useState<string | null>(null);
  const copy = (val: string, k: string) => {
    navigator.clipboard?.writeText(val);
    setCopied(k);
    setTimeout(() => setCopied(null), 1500);
  };
  return (
    <div>
      <h2 className="font-script text-2xl text-wine">Pay your deposit</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Estimated total: <span className="font-semibold text-wine">P{total}</span> · Deposit due now:{" "}
        <span className="font-semibold text-wine">P{business.depositAmount}</span>
      </p>

      <div className="mt-5 rounded-2xl border border-gold/40 bg-accent/10 p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-wine">Pay via Mobile Money</p>
        <div className="mt-3 space-y-2 text-sm">
          <CopyRow label="Provider" value={business.bankDetails.mobileMoneyProvider} copied={copied === "p"} onCopy={() => copy(business.bankDetails.mobileMoneyProvider, "p")} />
          <CopyRow label="Number" value={business.bankDetails.mobileMoneyNumber} copied={copied === "n"} onCopy={() => copy(business.bankDetails.mobileMoneyNumber, "n")} />
          <CopyRow label="Account name" value={business.bankDetails.accountName} copied={copied === "a"} onCopy={() => copy(business.bankDetails.accountName, "a")} />
          <CopyRow label="Amount" value={`P${business.depositAmount}`} copied={copied === "amt"} onCopy={() => copy(String(business.depositAmount), "amt")} />
        </div>
        <ol className="mt-4 list-decimal space-y-1 pl-5 text-xs text-foreground/80">
          <li>Open your mobile money app or dial your provider's USSD.</li>
          <li>Send <strong>P{business.depositAmount}</strong> to <strong>{business.bankDetails.mobileMoneyNumber}</strong>.</li>
          <li>Copy the reference/confirmation code you receive.</li>
        </ol>
      </div>

      <div className="mt-6 grid gap-4">
        <Field label="Transaction reference number" required>
          <input
            value={booking.txRef}
            onChange={(e) => set({ ...booking, txRef: e.target.value })}
            className="input"
            placeholder="e.g. OM123456789"
          />
          <p className="mt-1 text-xs text-muted-foreground">
            This is the unique code from your payment confirmation — we cross-check it against our statement.
          </p>
        </Field>
        <Field label="Proof of payment screenshot (optional but recommended)">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => set({ ...booking, proofFileName: e.target.files?.[0]?.name ?? null })}
            className="block w-full text-sm file:mr-3 file:rounded-full file:border-0 file:bg-wine file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary-foreground"
          />
          {booking.proofFileName && <p className="mt-1 text-xs text-muted-foreground">Selected: {booking.proofFileName}</p>}
          <p className="mt-1 text-xs text-muted-foreground">
            Please send this screenshot in the WhatsApp chat we open at the end.
          </p>
        </Field>
      </div>

      <div className="mt-6 rounded-2xl border border-destructive/30 bg-destructive/5 p-4">
        <div className="flex items-start gap-2">
          <AlertCircle className="mt-0.5 h-4 w-4 flex-none text-destructive" />
          <div className="text-xs leading-relaxed text-foreground/85">
            <p className="font-semibold text-destructive">Cancellation policy</p>
            <p className="mt-1">
              Your slot is held on a pending basis and only secured once we verify your deposit.
              Deposits are non-refundable on no-shows or cancellations inside 24 hours, but
              transferable if you reschedule with 24+ hours notice. Failure to secure a slot in 30
              minutes means it can be given away. Late coming is +P70; 15+ minutes late is automatic
              cancellation.
            </p>
            {policies.slice(0, 2).map((p, i) => (
              <p key={i} className="mt-1">• {p}</p>
            ))}
          </div>
        </div>
        <label className="mt-3 flex cursor-pointer items-start gap-2 text-sm">
          <input
            type="checkbox"
            checked={booking.agreed}
            onChange={(e) => set({ ...booking, agreed: e.target.checked })}
            className="mt-0.5 h-4 w-4 accent-wine"
          />
          <span className="text-foreground/90">I understand and agree to the cancellation and booking policy.</span>
        </label>
      </div>
    </div>
  );
}

function CopyRow({ label, value, copied, onCopy }: { label: string; value: string; copied: boolean; onCopy: () => void }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl bg-card px-3 py-2">
      <div className="min-w-0">
        <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
        <p className="truncate text-sm font-semibold text-wine">{value}</p>
      </div>
      <button onClick={onCopy} className="inline-flex items-center gap-1 rounded-full bg-wine px-3 py-1.5 text-xs font-semibold text-primary-foreground">
        {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}

/* ---------------- STEP 5: Confirm ---------------- */
function StepConfirm({
  booking,
  service,
  selectedAddOns,
  total,
  submitted,
  onSubmit,
}: {
  booking: Booking;
  service: ReturnType<typeof services.find>;
  selectedAddOns: typeof addOns;
  total: number;
  submitted: boolean;
  onSubmit: () => void;
}) {
  const summary = buildSummary({ booking, service, selectedAddOns, total });
  const waUrl = `https://wa.me/${business.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(summary)}`;

  if (!submitted) {
    return (
      <div>
        <h2 className="font-script text-2xl text-wine">Review your request</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          This is a <strong className="text-wine">booking request pending verification</strong> — not
          a confirmed slot yet. We'll confirm via WhatsApp once your deposit is received.
        </p>
        <dl className="mt-6 divide-y divide-border rounded-2xl border border-border bg-secondary/40 p-4 text-sm">
          <Row k="Service" v={service ? `${service.name} (${service.duration} min)` : "—"} />
          <Row k="Add-ons" v={selectedAddOns.length ? selectedAddOns.map((a) => a.name).join(", ") : "None"} />
          <Row k="Service total" v={`P${service?.price ?? 0}`} />
          <Row k="Add-ons total" v={`P${selectedAddOns.reduce((s, a) => s + a.price, 0)}`} />
          <Row k="Estimated total" v={`P${total}`} bold />
          <Row k="Deposit paid" v={`P${business.depositAmount}`} />
          <Row k="Transaction ref" v={booking.txRef || "—"} />
          <Row k="Proof file" v={booking.proofFileName || "Will send on WhatsApp"} />
          <Row k="Inspo file" v={booking.inspoFileName || "—"} />
          <Row k="Name" v={booking.name} />
          <Row k="Phone" v={booking.phone} />
          {booking.notes && <Row k="Notes" v={booking.notes} />}
        </dl>

        <button
          onClick={onSubmit}
          className="mt-6 w-full rounded-full bg-wine px-6 py-3 text-sm font-semibold text-primary-foreground shadow-luxe"
        >
          Send request via WhatsApp & pick my slot
        </button>
      </div>
    );
  }

  return (
    <div className="text-center">
      <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground">
        <Check className="h-7 w-7" />
      </div>
      <h2 className="mt-4 font-script text-3xl text-wine">Request sent</h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
        Your request has been prepared. You'll receive confirmation once your deposit is verified.
        We'll follow up via WhatsApp the day before to confirm your appointment.
      </p>

      <div className="mt-6 flex flex-col gap-3">
        <a
          href={waUrl}
          target="_blank"
          rel="noreferrer"
          className="rounded-full bg-wine px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft"
        >
          Open WhatsApp to send proof & confirm
        </a>
        <p className="text-xs text-muted-foreground">
          Next: pick your preferred date & time on the calendar (next step).
        </p>
      </div>
    </div>
  );
}

function Row({ k, v, bold }: { k: string; v: string; bold?: boolean }) {
  return (
    <div className="flex items-start justify-between gap-3 py-2">
      <dt className="text-xs uppercase tracking-wider text-muted-foreground">{k}</dt>
      <dd className={`max-w-[60%] text-right ${bold ? "text-base font-bold text-wine" : "text-sm text-foreground/90"}`}>{v}</dd>
    </div>
  );
}

/* ---------------- STEP 6: Pick Slot via Google Calendar ---------------- */
function StepSlot({ booking, service, total }: { booking: Booking; service: ReturnType<typeof services.find>; total: number }) {
  const summary = buildSummary({ booking, service, selectedAddOns: addOns.filter((a) => booking.addOnIds.includes(a.id)), total });
  const waUrl = `https://wa.me/${business.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(summary)}`;

  return (
    <div>
      <div className="flex items-center gap-2 text-wine">
        <CalIcon className="h-5 w-5" />
        <h2 className="font-script text-2xl">Pick your slot</h2>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">
        Only available times are shown. Booked slots are hidden automatically.
        After picking your slot, please <strong>add it to your phone's calendar</strong> so you don't
        forget — Google Calendar will send you a reminder.
      </p>

      <div className="mt-5 overflow-hidden rounded-2xl border border-border shadow-soft">
        <iframe
          title="Book a slot with Tebo's Nail Heaven"
          src={business.bookingEmbedUrl}
          style={{ border: 0 }}
          width="100%"
          height="720"
        />
      </div>

      <div className="mt-6 rounded-2xl border border-gold/40 bg-accent/10 p-4 text-sm">
        <p className="flex items-center gap-2 font-semibold text-wine">
          <Sparkles className="h-4 w-4" /> Don't forget
        </p>
        <ul className="mt-2 space-y-1 text-xs text-foreground/80">
          <li>• Send your proof of payment & inspo photos on WhatsApp.</li>
          <li>• Add the appointment to your calendar — we'll confirm via WhatsApp the day before.</li>
          <li>• Arrive on time — late by 15+ minutes is an automatic cancellation.</li>
        </ul>
        <a
          href={waUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-block rounded-full bg-wine px-5 py-2 text-xs font-semibold text-primary-foreground"
        >
          Open WhatsApp
        </a>
      </div>

      <Link to="/" className="mt-6 block text-center text-sm font-semibold text-wine underline-offset-4 hover:underline">
        Back to home
      </Link>
    </div>
  );
}

function buildSummary({
  booking,
  service,
  selectedAddOns,
  total,
}: {
  booking: Booking;
  service: ReturnType<typeof services.find>;
  selectedAddOns: typeof addOns;
  total: number;
}) {
  return [
    `Hi Tebo! New booking request (pending verification):`,
    ``,
    `Name: ${booking.name}`,
    `Phone: ${booking.phone}`,
    `Service: ${service?.name ?? "—"} (${service?.duration ?? 0} min)`,
    `Add-ons: ${selectedAddOns.length ? selectedAddOns.map((a) => a.name).join(", ") : "None"}`,
    `Estimated total: P${total}`,
    `Deposit paid: P${business.depositAmount}`,
    `Transaction ref: ${booking.txRef}`,
    booking.proofFileName ? `Proof of payment: ${booking.proofFileName} (sending in this chat)` : `Proof of payment: sending in this chat`,
    booking.inspoFileName ? `Inspo photo: ${booking.inspoFileName} (sending in this chat)` : ``,
    booking.notes ? `Notes: ${booking.notes}` : ``,
    ``,
    `I've also picked my slot on the Google Calendar link.`,
  ]
    .filter(Boolean)
    .join("\n");
}
