import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  MessageCircle,
  CalendarDays,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { services, addOns, business } from "@/lib/site-data";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Book an Appointment — Tebo's Nail Heaven" },
      {
        name: "description",
        content:
          "Book your appointment at Tebo's Nail Heaven. Select your services, choose your appointment slot, provide your details and confirm through WhatsApp.",
      },
    ],
  }),
  component: BookingPage,
});

const steps = [
  "Services",
  "Add-ons",
  "Slot",
  "Deposit",
  "Details",
  "WhatsApp",
] as const;

const GOOGLE_CALENDAR_URL =
  "https://calendar.google.com/calendar/appointments/schedules/AcZssZ1W7FLd7QNWhruyqWof_L1WoMzuXqtY4PXYI32JyuiMr9o9nkqGBgcnJiq6VE_BTLZk7Q6f7WRh?gv=true";

function BookingPage() {
  const [step, setStep] = useState(0);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [txRef, setTxRef] = useState("");
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    const timer = window.setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }, 100);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [step]);

  const selectedServiceObjects = useMemo(
    () => services.filter((s) => selectedServices.includes(s.id)),
    [selectedServices]
  );

  const selectedAddOnObjects = useMemo(
    () => addOns.filter((a) => selectedAddOns.includes(a.id)),
    [selectedAddOns]
  );

  const hasCombo = selectedServiceObjects.some((s) =>
    s.category.toLowerCase().includes("combo")
  );

  const servicesTotal = selectedServiceObjects.reduce(
    (sum, s) => sum + s.price,
    0
  );

  const addOnsTotal = hasCombo
    ? 0
    : selectedAddOnObjects.reduce((sum, a) => sum + a.price, 0);

  const total = servicesTotal + addOnsTotal;

  const totalDuration = selectedServiceObjects.reduce(
    (sum, s) => sum + s.duration,
    0
  );

  const deposit = business.depositAmount;
  const remaining = Math.max(total - deposit, 0);

  const toggleService = (id: string) => {
    setSelectedServices((curr) =>
      curr.includes(id) ? curr.filter((s) => s !== id) : [...curr, id]
    );
  };

  const toggleAddOn = (id: string) => {
    setSelectedAddOns((curr) =>
      curr.includes(id) ? curr.filter((a) => a !== id) : [...curr, id]
    );
  };

  const groupedServices = services.reduce<Record<string, typeof services>>(
    (groups, service) => {
      if (!groups[service.category]) groups[service.category] = [];
      groups[service.category].push(service);
      return groups;
    },
    {}
  );

  const canContinue = () => {
    if (step === 0) return selectedServices.length > 0;
    if (step === 1) return true; // add-ons optional
    if (step === 2) return true; // slot — calendar handles it
    if (step === 3) return txRef.trim().length > 0;
    if (step === 4) return name.trim().length > 0 && phone.trim().length > 0;
    if (step === 5) return agreed;
    return true;
  };

  const nextStep = () => {
    if (!canContinue()) return;
    setStep((curr) => Math.min(curr + 1, steps.length - 1));
  };

  const previousStep = () => {
    setStep((curr) => Math.max(curr - 1, 0));
  };

  const buildWhatsAppMessage = () => {
    const serviceText = selectedServiceObjects
      .map((s) => `• ${s.name} — P${s.price}`)
      .join("\n");

    const addOnText =
      selectedAddOnObjects.length > 0
        ? `\nADD-ONS\n${
            hasCombo
              ? selectedAddOnObjects.map((a) => `• ${a.name} — FREE (included in combo)`).join("\n")
              : selectedAddOnObjects.map((a) => `• ${a.name} — P${a.price}`).join("\n")
          }\n`
        : "";

    return `Hello Tebo's Nail Heaven! 💅🏽

I would like to confirm my appointment.

CUSTOMER
Name: ${name}
Phone: ${phone}

SERVICES
${serviceText}
${addOnText}
BOOKING SUMMARY
Total: P${total}
Deposit required: P${deposit}
Remaining balance: P${remaining}
Total duration: ${totalDuration} minutes

PAYMENT REFERENCE
Transaction reference: ${txRef}

${notes ? `NOTES\n${notes}\n\n` : ""}I understand that the P${deposit} booking deposit is non-refundable.

I will send my proof of payment manually on WhatsApp for verification.

Thank you!`;
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent(buildWhatsAppMessage());
    const whatsappNumber = business.whatsapp.replace(/\D/g, "");
    window.open(
      `https://wa.me/${whatsappNumber}?text=${message}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 md:px-6 md:py-14">
      {/* HEADER */}
      <header className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Reserve</p>
        <h1 className="mt-2 font-script text-5xl text-wine md:text-6xl">Book Your Appointment</h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-muted-foreground md:text-base">
          Select your services, choose your add-ons, pick your slot and confirm through WhatsApp.
        </p>
        <div className="mx-auto mt-6 max-w-2xl rounded-full bg-secondary/70 px-4 py-3 text-sm text-muted-foreground">
          {business.hours}
        </div>
      </header>

      {/* STEP INDICATOR */}
      <div className="mt-8 overflow-x-auto pb-2">
        <div className="mx-auto flex min-w-max items-start justify-center">
          {steps.map((stepName, index) => {
            const active = index === step;
            const complete = index < step;
            return (
              <div key={stepName} className="flex items-start">
                <button
                  type="button"
                  onClick={() => { if (index < step) setStep(index); }}
                  disabled={index > step}
                  className="flex w-[72px] flex-col items-center"
                >
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl text-sm font-bold transition-all ${
                      active
                        ? "bg-wine text-primary-foreground shadow-soft"
                        : complete
                        ? "bg-gold text-white"
                        : "border border-border bg-card text-muted-foreground"
                    }`}
                  >
                    {complete ? <Check className="h-5 w-5" /> : index + 1}
                  </div>
                  <span className={`mt-2 text-[11px] font-semibold ${active ? "text-wine" : "text-muted-foreground"}`}>
                    {stepName}
                  </span>
                </button>
                {index < steps.length - 1 && (
                  <div className={`mt-7 h-px w-5 md:w-8 ${index < step ? "bg-gold" : "bg-border"}`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* MAIN CARD */}
      <div className="mt-8 overflow-hidden rounded-3xl border border-border bg-card shadow-soft">

        {/* STEP 1 — SERVICES */}
        {step === 0 && (
          <section className="p-5 md:p-8">
            <div className="mb-6">
              <h2 className="font-script text-3xl text-wine">Select Your Services</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Start by selecting every service you would like. You can combine multiple services.
              </p>
            </div>

            <div className="space-y-8">
              {Object.entries(groupedServices).map(([category, items]) => (
                <div key={category}>
                  <h3 className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-wine">
                    {category}
                  </h3>
                  <div className="grid gap-3 md:grid-cols-2">
                    {items.map((service) => {
                      const selected = selectedServices.includes(service.id);
                      return (
                        <button
                          key={service.id}
                          type="button"
                          onClick={() => toggleService(service.id)}
                          aria-pressed={selected}
                          className={`rounded-2xl border p-4 text-left transition-all ${
                            selected
                              ? "border-wine bg-wine/5 ring-2 ring-wine/20"
                              : "border-border bg-background hover:bg-secondary/50"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${selected ? "border-wine bg-wine text-white" : "border-border"}`}>
                              {selected && <Check className="h-3.5 w-3.5" />}
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-start justify-between gap-3">
                                <p className="font-semibold text-wine">{service.name}</p>
                                <span className="shrink-0 font-bold text-wine">P{service.price}</span>
                              </div>
                              {service.description && (
                                <p className="mt-1 text-sm leading-5 text-muted-foreground">{service.description}</p>
                              )}
                              <p className="mt-2 text-xs font-medium text-gold">{service.duration} minutes</p>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {selectedServices.length > 0 && (
              <div className="mt-6 rounded-2xl bg-secondary/50 p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold">
                      {selectedServices.length} service{selectedServices.length === 1 ? "" : "s"} selected
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">{totalDuration} minutes total</p>
                  </div>
                  <p className="text-xl font-bold text-wine">P{servicesTotal}</p>
                </div>
              </div>
            )}

            <div className="mt-6 rounded-2xl border border-gold/30 bg-gold/5 p-5">
              <p className="font-semibold text-wine">Next: Choose your art add-ons</p>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                After services, you'll be able to add nail art extras to your appointment.
              </p>
            </div>
          </section>
        )}

        {/* STEP 2 — ADD-ONS */}
        {step === 1 && (
          <section className="p-5 md:p-8">
            <div className="mb-6">
              <div className="flex items-center gap-3">
                <Sparkles className="h-6 w-6 text-wine" />
                <h2 className="font-script text-3xl text-wine">Nail Art Add-ons</h2>
              </div>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Would you like to add nail art to your appointment? This step is optional — skip it if you don't want any art.
              </p>
            </div>

            {hasCombo && (
              <div className="mb-5 rounded-2xl border border-gold/40 bg-gold/5 p-4">
                <p className="flex items-center gap-2 text-sm font-bold text-gold">
                  <Sparkles className="h-4 w-4" /> Art is FREE with your combo set
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  You've selected a combo set — nail art is included at no extra charge. Select your preferred art level below.
                </p>
              </div>
            )}

            <div className="space-y-3">
              {addOns.map((addOn) => {
                const selected = selectedAddOns.includes(addOn.id);
                return (
                  <button
                    key={addOn.id}
                    type="button"
                    onClick={() => toggleAddOn(addOn.id)}
                    aria-pressed={selected}
                    className={`w-full rounded-2xl border p-5 text-left transition-all ${
                      selected
                        ? "border-wine bg-wine/5 ring-2 ring-wine/20"
                        : "border-border bg-background hover:bg-secondary/50"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${selected ? "border-wine bg-wine text-white" : "border-border"}`}>
                        {selected && <Check className="h-3.5 w-3.5" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <p className="font-semibold text-wine">{addOn.name}</p>
                          <span className="shrink-0 font-bold text-wine">
                            {hasCombo ? <span className="text-gold">FREE</span> : `P${addOn.price}`}
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 rounded-2xl bg-secondary/50 p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold">Services subtotal</p>
                  {selectedAddOnObjects.length > 0 && !hasCombo && (
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      + {selectedAddOnObjects.length} add-on{selectedAddOnObjects.length === 1 ? "" : "s"}
                    </p>
                  )}
                </div>
                <p className="text-xl font-bold text-wine">P{total}</p>
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-gold/30 bg-gold/5 p-5">
              <p className="text-sm font-semibold text-wine">Note from Tebo</p>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                Art is <strong>free in combo sets</strong>. An extra P20 applies if you do extensions on both hands and toes for a combo.
              </p>
            </div>
          </section>
        )}

        {/* STEP 3 — SLOT */}
        {step === 2 && (
          <section className="p-5 md:p-8">
            <div className="mb-6">
              <div className="flex items-center gap-3">
                <CalendarDays className="h-6 w-6 text-wine" />
                <h2 className="font-script text-3xl text-wine">Pick Your Booking Slot</h2>
              </div>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Choose your preferred date and time using the booking calendar below.
              </p>
            </div>

            <div className="mb-6 rounded-2xl bg-secondary/50 p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Your Booking
                  </p>
                  <p className="mt-1 font-semibold text-wine">
                    {selectedServices.length} service{selectedServices.length === 1 ? "" : "s"}
                    {selectedAddOnObjects.length > 0 && ` + ${selectedAddOnObjects.length} add-on${selectedAddOnObjects.length === 1 ? "" : "s"}`}
                    {" · "}{totalDuration} minutes
                  </p>
                </div>
                <p className="text-xl font-bold text-wine">P{total}</p>
              </div>
              <div className="mt-3 space-y-1">
                {selectedServiceObjects.map((service) => (
                  <div key={service.id} className="flex justify-between gap-4 text-sm">
                    <span>{service.name}</span>
                    <span className="font-medium">P{service.price}</span>
                  </div>
                ))}
                {selectedAddOnObjects.map((addOn) => (
                  <div key={addOn.id} className="flex justify-between gap-4 text-sm text-muted-foreground">
                    <span>{addOn.name}</span>
                    <span className="font-medium">{hasCombo ? "FREE" : `P${addOn.price}`}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl border border-border bg-background">
              <iframe
                src={GOOGLE_CALENDAR_URL}
                title="Tebo's Nail Heaven Appointment Calendar"
                className="block h-[900px] w-full border-0 md:h-[850px]"
                loading="lazy"
                allow="fullscreen"
              />
            </div>

            <div className="mt-6 rounded-2xl border border-gold/30 bg-gold/5 p-5">
              <p className="font-semibold text-wine">Select your slot in the calendar above</p>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                Once you've chosen your date and time in the calendar, click Continue to proceed to the deposit step.
              </p>
            </div>
          </section>
        )}

        {/* STEP 4 — DEPOSIT */}
        {step === 3 && (
          <section className="p-5 md:p-8">
            <div className="mb-6">
              <h2 className="font-script text-3xl text-wine">Deposit</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Review the payment details, make your deposit, then enter your transaction reference below.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="rounded-2xl border border-border bg-background p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Deposit Required</p>
                <p className="mt-2 text-4xl font-bold text-wine">P{deposit}</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">This booking deposit is non-refundable.</p>
                <div className="mt-5 border-t border-border pt-4">
                  <div className="flex justify-between text-sm">
                    <span>Total booking</span>
                    <span className="font-semibold">P{total}</span>
                  </div>
                  <div className="mt-2 flex justify-between text-sm">
                    <span>Remaining balance</span>
                    <span className="font-semibold">P{remaining}</span>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-background p-6">
                <p className="font-semibold text-wine">Payment Details</p>
                <div className="mt-4 space-y-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Mobile Money</p>
                    <p className="font-semibold">{business.bankDetails.mobileMoneyProvider}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Number</p>
                    <p className="font-semibold">{business.bankDetails.mobileMoneyNumber}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Account Name</p>
                    <p className="font-semibold">{business.bankDetails.accountName}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Bank</p>
                    <p className="font-semibold">{business.bankDetails.bankName}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Account Number</p>
                    <p className="font-semibold">{business.bankDetails.accountNumber}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* TRANSACTION REFERENCE */}
            <div className="mt-6 rounded-2xl border-2 border-wine/30 bg-wine/5 p-6">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-wine" />
                <p className="font-bold text-wine">What is a transaction reference?</p>
              </div>
              <p className="mt-3 text-sm leading-6 text-foreground/85">
                When you pay via Pay-to-Cell or bank transfer, your bank or mobile money provider sends you a{" "}
                <strong>confirmation SMS or notification</strong>. Inside that message is a unique code — that's your{" "}
                <strong>transaction reference</strong>.
              </p>
              <p className="mt-2 text-sm leading-6 text-foreground/85">
                We use this code to <strong>match your payment to your booking</strong>. Without it, we have no way of knowing the deposit came from you — and your slot{" "}
                <strong>cannot be confirmed</strong>.
              </p>
              <div className="mt-4 rounded-xl bg-card p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-wine">Where to find it</p>
                <ul className="mt-3 space-y-2 text-sm text-foreground/85">
                  <li className="flex items-start gap-2">
                    <span>📱</span>
                    <span><strong>Orange Money / Pay-to-Cell:</strong> Check the SMS you receive immediately after paying. The reference starts with something like <strong>PTC-</strong> or <strong>OM-</strong>.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>🏦</span>
                    <span><strong>Absa / bank transfer:</strong> Check your banking app notification or email. It usually looks like <strong>FT2308XXXXX</strong>.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>📋</span>
                    <span><strong>Can't find it?</strong> Just send your payment screenshot on WhatsApp and we'll locate it together.</span>
                  </li>
                </ul>
              </div>
              <div className="mt-5">
                <label className="block">
                  <span className="text-sm font-bold text-wine">Paste your transaction reference here *</span>
                  <input
                    value={txRef}
                    onChange={(e) => setTxRef(e.target.value)}
                    placeholder="e.g. PTC-AX2389 or FT23081234"
                    className="mt-2 w-full rounded-xl border border-wine/40 bg-background px-4 py-3 text-sm outline-none transition focus:border-wine focus:ring-2 focus:ring-wine/20"
                  />
                  <p className="mt-2 text-xs text-muted-foreground">
                    Copy and paste it exactly as it appears in your SMS or banking app. You cannot continue without this.
                  </p>
                </label>
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-gold/30 bg-gold/5 p-5">
              <p className="font-semibold text-wine">Also send your proof of payment</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                After completing this booking, send a <strong>screenshot</strong> of your payment confirmation{" "}
                <strong>manually on WhatsApp</strong>. No upload required on this website.
              </p>
            </div>
          </section>
        )}

        {/* STEP 5 — DETAILS */}
        {step === 4 && (
          <section className="p-5 md:p-8">
            <div className="mb-6">
              <h2 className="font-script text-3xl text-wine">Your Details</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Enter your details so Tebo's Nail Heaven can contact you about your appointment.
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <label className="block">
                <span className="text-sm font-semibold">Full Name *</span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 outline-none transition focus:border-wine"
                />
              </label>
              <label className="block">
                <span className="text-sm font-semibold">Phone Number *</span>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+267..."
                  type="tel"
                  className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 outline-none transition focus:border-wine"
                />
              </label>
            </div>
            <label className="mt-5 block">
              <span className="text-sm font-semibold">Additional Notes</span>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any allergies, preferences, special requests…"
                rows={5}
                className="mt-2 w-full resize-none rounded-xl border border-border bg-background px-4 py-3 outline-none transition focus:border-wine"
              />
            </label>
          </section>
        )}

        {/* STEP 6 — WHATSAPP */}
        {step === 5 && (
          <section className="p-5 md:p-8">
            <div className="mb-6 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold text-white">
                <Check className="h-7 w-7" />
              </div>
              <h2 className="mt-5 font-script text-3xl text-wine">Review Your Booking</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Review everything below, then send your booking through WhatsApp.
              </p>
            </div>

            <div className="space-y-4">
              {/* SERVICES */}
              <div className="rounded-2xl border border-border p-5">
                <h3 className="font-semibold text-wine">Selected Services</h3>
                <div className="mt-3 space-y-3">
                  {selectedServiceObjects.map((service) => (
                    <div key={service.id} className="flex justify-between gap-4 text-sm">
                      <span>{service.name}</span>
                      <span className="font-semibold">P{service.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ADD-ONS */}
              {selectedAddOnObjects.length > 0 && (
                <div className="rounded-2xl border border-border p-5">
                  <h3 className="font-semibold text-wine">Nail Art Add-ons</h3>
                  <div className="mt-3 space-y-3">
                    {selectedAddOnObjects.map((addOn) => (
                      <div key={addOn.id} className="flex justify-between gap-4 text-sm">
                        <span>{addOn.name}</span>
                        <span className="font-semibold">
                          {hasCombo ? <span className="text-gold">FREE</span> : `P${addOn.price}`}
                        </span>
                      </div>
                    ))}
                  </div>
                  {hasCombo && (
                    <p className="mt-2 text-xs text-gold font-medium">Art is free with your combo set.</p>
                  )}
                </div>
              )}

              {/* TOTAL */}
              <div className="rounded-2xl bg-secondary/50 p-5">
                <div className="flex justify-between">
                  <span>Total</span>
                  <span className="text-xl font-bold text-wine">P{total}</span>
                </div>
                <div className="mt-2 flex justify-between text-sm">
                  <span>Deposit Required</span>
                  <span>P{deposit}</span>
                </div>
                <div className="mt-2 flex justify-between text-sm">
                  <span>Remaining Balance</span>
                  <span>P{remaining}</span>
                </div>
              </div>

              {/* TRANSACTION REF */}
              <div className="rounded-2xl border border-wine/20 bg-wine/5 p-5">
                <h3 className="font-semibold text-wine">Transaction Reference</h3>
                <p className="mt-2 font-mono text-sm font-bold text-wine">{txRef}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Included in your WhatsApp message so we can verify your deposit.
                </p>
              </div>

              {/* CUSTOMER */}
              <div className="rounded-2xl border border-border p-5">
                <h3 className="font-semibold text-wine">Your Details</h3>
                <p className="mt-3 text-sm"><strong>Name:</strong> {name}</p>
                <p className="mt-1 text-sm"><strong>Phone:</strong> {phone}</p>
                {notes && (
                  <p className="mt-3 text-sm text-muted-foreground"><strong>Notes:</strong> {notes}</p>
                )}
              </div>

              {/* PAYMENT NOTICE */}
              <div className="rounded-2xl border border-gold/30 bg-gold/5 p-5">
                <p className="font-semibold text-wine">Proof of Payment</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  After sending this WhatsApp message, also send a{" "}
                  <strong>screenshot of your payment confirmation</strong> in the same chat. Your slot is only confirmed once we verify both.
                </p>
              </div>

              {/* AGREEMENT */}
              <label className="flex cursor-pointer gap-3 rounded-2xl border border-border p-4">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-1 h-4 w-4"
                />
                <span className="text-sm leading-6">
                  I understand that the P{deposit} booking deposit is non-refundable and that I must send my proof of payment manually through WhatsApp after making the deposit.
                </span>
              </label>
            </div>
          </section>
        )}
      </div>

      {/* NAVIGATION */}
      <div className="mt-6 flex items-center justify-between gap-3">
        {step > 0 ? (
          <button
            type="button"
            onClick={previousStep}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
        ) : (
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold"
          >
            <ArrowLeft className="h-4 w-4" />
            Home
          </Link>
        )}

        {step < steps.length - 1 ? (
          <button
            type="button"
            onClick={nextStep}
            disabled={!canContinue()}
            className="inline-flex items-center gap-2 rounded-full bg-wine px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft disabled:cursor-not-allowed disabled:opacity-50"
          >
            {step === 1 && selectedAddOns.length === 0 ? "Skip Add-ons" : "Continue"}
            <ArrowRight className="h-4 w-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={openWhatsApp}
            disabled={!agreed}
            className="inline-flex items-center gap-2 rounded-full bg-wine px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft disabled:cursor-not-allowed disabled:opacity-50"
          >
            <MessageCircle className="h-4 w-4" />
            Confirm via WhatsApp
          </button>
        )}
      </div>

      {/* BOOKING SUMMARY */}
      {selectedServices.length > 0 && (
        <div className="mt-6 rounded-3xl border border-border bg-card p-5 shadow-soft">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Booking Summary</p>
              <p className="mt-1 font-semibold text-wine">
                {selectedServices.length} service{selectedServices.length === 1 ? "" : "s"}
                {selectedAddOnObjects.length > 0 && ` + ${selectedAddOnObjects.length} add-on${selectedAddOnObjects.length === 1 ? "" : "s"}`}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-wine">P{total}</p>
              <p className="text-xs text-muted-foreground">{totalDuration} min</p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
