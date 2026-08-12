import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, MessageCircle } from "lucide-react";
import { services, addOns, business } from "@/lib/site-data";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Book an Appointment — Tebo's Nail Heaven" },
      {
        name: "description",
        content:
          "Book your appointment at Tebo's Nail Heaven. Select multiple services, choose your appointment time and confirm via WhatsApp.",
      },
    ],
  }),
  component: BookingPage,
});

const steps = [
  "Services",
  "Add-ons",
  "Details",
  "Pick a Slot",
  "Deposit",
  "Confirm",
] as const;

type Step = (typeof steps)[number];

function BookingPage() {
  const [step, setStep] = useState(0);

  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");

  const [agreed, setAgreed] = useState(false);

  const selectedServiceObjects = useMemo(
    () => services.filter((service) => selectedServices.includes(service.id)),
    [selectedServices]
  );

  const selectedAddOnObjects = useMemo(
    () => addOns.filter((addon) => selectedAddOns.includes(addon.id)),
    [selectedAddOns]
  );

  const servicesTotal = selectedServiceObjects.reduce(
    (total, service) => total + service.price,
    0
  );

  const addOnsTotal = selectedAddOnObjects.reduce(
    (total, addon) => total + addon.price,
    0
  );

  const total = servicesTotal + addOnsTotal;

  const totalDuration = selectedServiceObjects.reduce(
    (total, service) => total + service.duration,
    0
  );

  const deposit = business.depositAmount;
  const remaining = Math.max(total - deposit, 0);

  const toggleService = (serviceId: string) => {
    setSelectedServices((current) =>
      current.includes(serviceId)
        ? current.filter((id) => id !== serviceId)
        : [...current, serviceId]
    );
  };

  const toggleAddOn = (addOnId: string) => {
    setSelectedAddOns((current) =>
      current.includes(addOnId)
        ? current.filter((id) => id !== addOnId)
        : [...current, addOnId]
    );
  };

  const groupedServices = services.reduce<Record<string, typeof services>>(
    (groups, service) => {
      if (!groups[service.category]) {
        groups[service.category] = [];
      }

      groups[service.category].push(service);
      return groups;
    },
    {}
  );

  const canContinue = () => {
    if (step === 0) {
      return selectedServices.length > 0;
    }

    if (step === 2) {
      return name.trim().length > 0 && phone.trim().length > 0;
    }

    if (step === 3) {
      return appointmentDate !== "" && appointmentTime !== "";
    }

    if (step === 5) {
      return agreed;
    }

    return true;
  };

  const nextStep = () => {
    if (!canContinue()) return;

    setStep((current) => Math.min(current + 1, steps.length - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const previousStep = () => {
    setStep((current) => Math.max(current - 1, 0));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const buildWhatsAppMessage = () => {
    const serviceText = selectedServiceObjects
      .map((service) => `• ${service.name} — P${service.price}`)
      .join("\n");

    const addOnText =
      selectedAddOnObjects.length > 0
        ? selectedAddOnObjects
            .map((addon) => `• ${addon.name} — P${addon.price}`)
            .join("\n")
        : "None";

    return `Hello Tebo's Nail Heaven! 💅🏽

I would like to confirm my appointment.

CUSTOMER
Name: ${name}
Phone: ${phone}

SERVICES
${serviceText}

ADD-ONS
${addOnText}

APPOINTMENT
Date: ${appointmentDate}
Time: ${appointmentTime}

TOTAL
Services + Add-ons: P${total}
Deposit required: P${deposit}
Remaining balance: P${remaining}
Duration: ${totalDuration} minutes

${notes ? `Notes:\n${notes}\n\n` : ""}I understand that the P${deposit} booking deposit is non-refundable.

I will make the deposit and send my proof of payment manually on WhatsApp for verification.

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
    <div className="mx-auto max-w-5xl px-4 py-10 md:py-14">
      {/* HEADER */}
      <header className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
          Appointments
        </p>

        <h1 className="mt-2 font-script text-5xl text-wine md:text-6xl">
          Book Your Appointment
        </h1>

        <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
          Select everything you need, choose your appointment time and confirm
          your booking through WhatsApp.
        </p>
      </header>

      {/* STEP INDICATOR */}
      <div className="mt-10 overflow-x-auto pb-2">
        <div className="mx-auto flex min-w-max items-center justify-center">
          {steps.map((stepName, index) => {
            const active = index === step;
            const complete = index < step;

            return (
              <div key={stepName} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold ${
                      active
                        ? "bg-wine text-primary-foreground"
                        : complete
                          ? "bg-gold text-white"
                          : "border border-border bg-card text-muted-foreground"
                    }`}
                  >
                    {complete ? <Check className="h-4 w-4" /> : index + 1}
                  </div>

                  <span
                    className={`mt-2 text-[10px] font-semibold uppercase tracking-wide ${
                      active ? "text-wine" : "text-muted-foreground"
                    }`}
                  >
                    {stepName}
                  </span>
                </div>

                {index < steps.length - 1 && (
                  <div
                    className={`mx-2 h-px w-8 md:w-12 ${
                      index < step ? "bg-gold" : "bg-border"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* MAIN CARD */}
      <div className="mt-10 rounded-3xl border border-border bg-card p-5 shadow-soft md:p-8">
        {/* STEP 1 — SERVICES */}
        {step === 0 && (
          <section>
            <div className="mb-6">
              <h2 className="font-script text-3xl text-wine">
                Select Your Services
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                You can select multiple services for the same appointment.
              </p>
            </div>

            <div className="space-y-8">
              {Object.entries(groupedServices).map(([category, items]) => (
                <div key={category}>
                  <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-wine">
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
                          className={`rounded-2xl border p-4 text-left transition-all ${
                            selected
                              ? "border-wine bg-wine/5 ring-2 ring-wine/20"
                              : "border-border bg-background hover:bg-secondary/50"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${
                                selected
                                  ? "border-wine bg-wine text-white"
                                  : "border-border"
                              }`}
                            >
                              {selected && <Check className="h-3.5 w-3.5" />}
                            </div>

                            <div className="min-w-0 flex-1">
                              <div className="flex items-start justify-between gap-3">
                                <p className="font-semibold text-wine">
                                  {service.name}
                                </p>

                                <span className="shrink-0 font-bold text-wine">
                                  P{service.price}
                                </span>
                              </div>

                              <p className="mt-1 text-sm text-muted-foreground">
                                {service.description}
                              </p>

                              <p className="mt-2 text-xs font-medium text-gold">
                                {service.duration} minutes
                              </p>
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
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold">
                    {selectedServices.length} service
                    {selectedServices.length === 1 ? "" : "s"} selected
                  </span>

                  <span className="font-bold text-wine">
                    P{servicesTotal}
                  </span>
                </div>
              </div>
            )}
          </section>
        )}

        {/* STEP 2 — ADD ONS */}
        {step === 1 && (
          <section>
            <div className="mb-6">
              <h2 className="font-script text-3xl text-wine">
                Add-ons
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Add anything extra you would like. You can also continue
                without selecting an add-on.
              </p>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              {addOns.map((addon) => {
                const selected = selectedAddOns.includes(addon.id);

                return (
                  <button
                    key={addon.id}
                    type="button"
                    onClick={() => toggleAddOn(addon.id)}
                    className={`flex items-center justify-between gap-4 rounded-2xl border p-4 text-left transition-all ${
                      selected
                        ? "border-wine bg-wine/5 ring-2 ring-wine/20"
                        : "border-border bg-background hover:bg-secondary/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${
                          selected
                            ? "border-wine bg-wine text-white"
                            : "border-border"
                        }`}
                      >
                        {selected && <Check className="h-3.5 w-3.5" />}
                      </div>

                      <span className="font-medium">{addon.name}</span>
                    </div>

                    <span className="font-bold text-wine">
                      P{addon.price}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {/* STEP 3 — DETAILS */}
        {step === 2 && (
          <section>
            <div className="mb-6">
              <h2 className="font-script text-3xl text-wine">
                Your Details
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Enter your contact information so we can reach you about your
                appointment.
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
              <span className="text-sm font-semibold">
                Additional Notes
              </span>

              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Anything we should know about your appointment?"
                rows={5}
                className="mt-2 w-full resize-none rounded-xl border border-border bg-background px-4 py-3 outline-none transition focus:border-wine"
              />
            </label>
          </section>
        )}

        {/* STEP 4 — SLOT */}
        {step === 3 && (
          <section>
            <div className="mb-6">
              <h2 className="font-script text-3xl text-wine">
                Pick Your Slot
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Select the date and time you would like to request.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <label className="block">
                <span className="text-sm font-semibold">Date *</span>

                <input
                  type="date"
                  value={appointmentDate}
                  onChange={(e) => setAppointmentDate(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:border-wine"
                />
              </label>

              <label className="block">
                <span className="text-sm font-semibold">Time *</span>

                <input
                  type="time"
                  value={appointmentTime}
                  onChange={(e) => setAppointmentTime(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:border-wine"
                />
              </label>
            </div>

            <div className="mt-6 rounded-2xl bg-secondary/50 p-5">
              <p className="font-semibold text-wine">
                Studio Hours
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                {business.hours}
              </p>

              <p className="mt-3 text-xs text-muted-foreground">
                Your selected time will be sent to Tebo's Nail Heaven for
                confirmation.
              </p>
            </div>
          </section>
        )}

        {/* STEP 5 — DEPOSIT */}
        {step === 4 && (
          <section>
            <div className="mb-6">
              <h2 className="font-script text-3xl text-wine">
                Deposit Information
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Please review the payment information before confirming.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="rounded-2xl border border-border bg-background p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Deposit Required
                </p>

                <p className="mt-2 text-4xl font-bold text-wine">
                  P{deposit}
                </p>

                <p className="mt-2 text-sm text-muted-foreground">
                  The P{deposit} booking fee is non-refundable.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-background p-5">
                <p className="font-semibold text-wine">
                  Payment Details
                </p>

                <div className="mt-4 space-y-3 text-sm">
                  <div>
                    <p className="text-muted-foreground">
                      Mobile Money
                    </p>
                    <p className="font-semibold">
                      {business.bankDetails.mobileMoneyProvider}
                    </p>
                  </div>

                  <div>
                    <p className="text-muted-foreground">
                      Number
                    </p>
                    <p className="font-semibold">
                      {business.bankDetails.mobileMoneyNumber}
                    </p>
                  </div>

                  <div>
                    <p className="text-muted-foreground">
                      Account Name
                    </p>
                    <p className="font-semibold">
                      {business.bankDetails.accountName}
                    </p>
                  </div>

                  <div>
                    <p className="text-muted-foreground">
                      Bank
                    </p>
                    <p className="font-semibold">
                      {business.bankDetails.bankName}
                    </p>
                  </div>

                  <div>
                    <p className="text-muted-foreground">
                      Account Number
                    </p>
                    <p className="font-semibold">
                      {business.bankDetails.accountNumber}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-gold/30 bg-gold/5 p-5">
              <p className="font-semibold text-wine">
                Important
              </p>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                After making your P{deposit} deposit, please send your proof
                of payment <strong>manually on WhatsApp</strong>. There is no
                proof-of-payment upload required on this website.
              </p>

              <a
                href={`https://wa.me/${business.whatsapp.replace(/\D/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-wine px-5 py-3 text-sm font-semibold text-primary-foreground"
              >
                <MessageCircle className="h-4 w-4" />
                Send Proof on WhatsApp
              </a>
            </div>
          </section>
        )}

        {/* STEP 6 — CONFIRM */}
        {step === 5 && (
          <section>
            <div className="mb-6 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold text-white">
                <Check className="h-7 w-7" />
              </div>

              <h2 className="mt-5 font-script text-3xl text-wine">
                Review Your Booking
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Check everything below before sending your booking to WhatsApp.
              </p>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl border border-border p-5">
                <h3 className="font-semibold text-wine">
                  Services
                </h3>

                <div className="mt-3 space-y-2">
                  {selectedServiceObjects.map((service) => (
                    <div
                      key={service.id}
                      className="flex justify-between gap-4 text-sm"
                    >
                      <span>{service.name}</span>
                      <span className="font-semibold">
                        P{service.price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {selectedAddOnObjects.length > 0 && (
                <div className="rounded-2xl border border-border p-5">
                  <h3 className="font-semibold text-wine">
                    Add-ons
                  </h3>

                  <div className="mt-3 space-y-2">
                    {selectedAddOnObjects.map((addon) => (
                      <div
                        key={addon.id}
                        className="flex justify-between gap-4 text-sm"
                      >
                        <span>{addon.name}</span>
                        <span className="font-semibold">
                          P{addon.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="rounded-2xl bg-secondary/50 p-5">
                <div className="flex justify-between">
                  <span>Total Duration</span>
                  <span className="font-semibold">
                    {totalDuration} minutes
                  </span>
                </div>

                <div className="mt-3 flex justify-between">
                  <span>Total</span>
                  <span className="text-xl font-bold text-wine">
                    P{total}
                  </span>
                </div>

                <div className="mt-2 flex justify-between text-sm">
                  <span>Deposit</span>
                  <span>P{deposit}</span>
                </div>

                <div className="mt-2 flex justify-between text-sm">
                  <span>Remaining Balance</span>
                  <span>P{remaining}</span>
                </div>

                <div className="mt-3 border-t border-border pt-3 text-sm">
                  <p>
                    <strong>Date:</strong> {appointmentDate}
                  </p>

                  <p className="mt-1">
                    <strong>Time:</strong> {appointmentTime}
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-border p-5">
                <p>
                  <strong>Name:</strong> {name}
                </p>

                <p className="mt-1">
                  <strong>Phone:</strong> {phone}
                </p>

                {notes && (
                  <p className="mt-3 text-sm text-muted-foreground">
                    <strong>Notes:</strong> {notes}
                  </p>
                )}
              </div>

              <label className="flex cursor-pointer gap-3 rounded-2xl border border-border p-4">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-1 h-4 w-4"
                />

                <span className="text-sm leading-6">
                  I understand that the P{deposit} booking fee is
                  non-refundable and that I must send my proof of payment
                  manually through WhatsApp after making the deposit.
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
            to="/services"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold"
          >
            <ArrowLeft className="h-4 w-4" />
            Services
          </Link>
        )}

        {step < steps.length - 1 ? (
          <button
            type="button"
            onClick={nextStep}
            disabled={!canContinue()}
            className="inline-flex items-center gap-2 rounded-full bg-wine px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft disabled:cursor-not-allowed disabled:opacity-50"
          >
            Continue
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
      {selectedServices.length > 0 && step < 5 && (
        <div className="mt-6 rounded-3xl border border-border bg-card p-5 shadow-soft">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Booking Summary
              </p>

              <p className="mt-1 font-semibold text-wine">
                {selectedServices.length} service
                {selectedServices.length === 1 ? "" : "s"}
                {selectedAddOns.length > 0 &&
                  ` + ${selectedAddOns.length} add-on${
                    selectedAddOns.length === 1 ? "" : "s"
                  }`}
              </p>
            </div>

            <div className="text-right">
              <p className="text-xl font-bold text-wine">
                P{total}
              </p>

              <p className="text-xs text-muted-foreground">
                {totalDuration} min
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
