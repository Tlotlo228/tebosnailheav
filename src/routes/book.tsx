import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  MessageCircle,
  CalendarDays,
} from "lucide-react";
import { services, business } from "@/lib/site-data";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      {
        title: "Book an Appointment — Tebo's Nail Heaven",
      },
      {
        name: "description",
        content:
          "Book your appointment at Tebo's Nail Heaven. Choose your appointment slot, select multiple services, provide your details and confirm through WhatsApp.",
      },
    ],
  }),
  component: BookingPage,
});

const steps = [
  "Slot",
  "Services",
  "Deposit",
  "Details",
  "WhatsApp",
] as const;

type Step = (typeof steps)[number];

const GOOGLE_CALENDAR_URL =
  "https://calendar.google.com/calendar/appointments/schedules/AcZssZ1W7FLd7QNWhruyqWof_L1WoMzuXqtY4PXYI32JyuiMr9o9nkqGBgcnJiq6VE_BTLZk7Q6f7WRh?gv=true";

function BookingPage() {
  const [step, setStep] = useState(0);

  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");

  const [agreed, setAgreed] = useState(false);

  /*
   * Always open the booking page at the very top.
   * This prevents Safari/iPhone from restoring the previous scroll position.
   */
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });

    const timer = window.setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto",
      });
    }, 100);

    return () => window.clearTimeout(timer);
  }, []);

  /*
   * Scroll to the top whenever the booking step changes.
   */
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, [step]);

  const selectedServiceObjects = useMemo(
    () =>
      services.filter((service) =>
        selectedServices.includes(service.id)
      ),
    [selectedServices]
  );

  const total = selectedServiceObjects.reduce(
    (sum, service) => sum + service.price,
    0
  );

  const totalDuration = selectedServiceObjects.reduce(
    (sum, service) => sum + service.duration,
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

  /*
   * Group services by category.
   */
  const groupedServices = services.reduce<
    Record<string, typeof services>
  >((groups, service) => {
    if (!groups[service.category]) {
      groups[service.category] = [];
    }

    groups[service.category].push(service);

    return groups;
  }, {});

  /*
   * Validation for each step.
   */
  const canContinue = () => {
    // Step 1 — Slot
    if (step === 0) {
      return appointmentDate !== "" && appointmentTime !== "";
    }

    // Step 2 — Services
    if (step === 1) {
      return selectedServices.length > 0;
    }

    // Step 3 — Deposit
    if (step === 2) {
      return true;
    }

    // Step 4 — Details
    if (step === 3) {
      return (
        name.trim().length > 0 &&
        phone.trim().length > 0
      );
    }

    // Step 5 — WhatsApp
    if (step === 4) {
      return agreed;
    }

    return true;
  };

  const nextStep = () => {
    if (!canContinue()) return;

    setStep((current) =>
      Math.min(current + 1, steps.length - 1)
    );
  };

  const previousStep = () => {
    setStep((current) =>
      Math.max(current - 1, 0)
    );
  };

  /*
   * WhatsApp message.
   */
  const buildWhatsAppMessage = () => {
    const serviceText = selectedServiceObjects
      .map(
        (service) =>
          `• ${service.name} — P${service.price}`
      )
      .join("\n");

    return `Hello Tebo's Nail Heaven! 💅🏽

I would like to confirm my appointment.

CUSTOMER
Name: ${name}
Phone: ${phone}

SERVICES
${serviceText}

APPOINTMENT
Date: ${appointmentDate}
Time: ${appointmentTime}

BOOKING SUMMARY
Total: P${total}
Deposit required: P${deposit}
Remaining balance: P${remaining}
Total duration: ${totalDuration} minutes

${
  notes
    ? `NOTES
${notes}

`
    : ""
}I understand that the P${deposit} booking deposit is non-refundable.

I will make the deposit and send my proof of payment manually on WhatsApp for verification.

Thank you!`;
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent(
      buildWhatsAppMessage()
    );

    const whatsappNumber =
      business.whatsapp.replace(/\D/g, "");

    window.open(
      `https://wa.me/${whatsappNumber}?text=${message}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 md:px-6 md:py-14">
      {/* =========================
          HEADER
      ========================== */}
      <header className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
          Reserve
        </p>

        <h1 className="mt-2 font-script text-5xl text-wine md:text-6xl">
          Book Your Appointment
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-muted-foreground md:text-base">
          Choose your appointment slot first, then select your
          services, review your deposit, provide your details and
          confirm through WhatsApp.
        </p>

        <div className="mx-auto mt-6 max-w-2xl rounded-full bg-secondary/70 px-4 py-3 text-sm text-muted-foreground">
          {business.hours}
        </div>
      </header>

      {/* =========================
          STEP INDICATOR
      ========================== */}
      <div className="mt-8 overflow-x-auto pb-2">
        <div className="mx-auto flex min-w-max items-start justify-center">
          {steps.map((stepName, index) => {
            const active = index === step;
            const complete = index < step;

            return (
              <div
                key={stepName}
                className="flex items-start"
              >
                <button
                  type="button"
                  onClick={() => {
                    if (index < step) {
                      setStep(index);
                    }
                  }}
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
                    {complete ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      index + 1
                    )}
                  </div>

                  <span
                    className={`mt-2 text-[11px] font-semibold ${
                      active
                        ? "text-wine"
                        : "text-muted-foreground"
                    }`}
                  >
                    {stepName}
                  </span>
                </button>

                {index < steps.length - 1 && (
                  <div
                    className={`mt-7 h-px w-7 md:w-12 ${
                      index < step
                        ? "bg-gold"
                        : "bg-border"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* =========================
          MAIN CARD
      ========================== */}
      <div className="mt-8 overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
        {/* =========================
            STEP 1 — CALENDAR
        ========================== */}
        {step === 0 && (
          <section className="p-5 md:p-8">
            <div className="mb-6">
              <div className="flex items-center gap-3">
                <CalendarDays className="h-6 w-6 text-wine" />

                <h2 className="font-script text-3xl text-wine">
                  Pick Your Booking Slot
                </h2>
              </div>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Choose your preferred date and time using the
                booking calendar below. Your selected appointment
                slot will then be used for the rest of your booking.
              </p>
            </div>

            {/* GOOGLE APPOINTMENT CALENDAR */}
            <div className="overflow-hidden rounded-3xl border border-border bg-background">
              <iframe
                src={GOOGLE_CALENDAR_URL}
                title="Tebo's Nail Heaven Appointment Calendar"
                className="block h-[900px] w-full border-0 md:h-[850px]"
                loading="lazy"
                allow="fullscreen"
              />
            </div>

            {/* Manual date/time fields */}
            <div className="mt-6 rounded-2xl bg-secondary/50 p-5">
              <p className="font-semibold text-wine">
                Appointment details
              </p>

              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                After selecting your appointment in the calendar,
                enter the date and time below so it can also be
                included in your WhatsApp booking message.
              </p>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-semibold">
                    Selected Date *
                  </span>

                  <input
                    type="date"
                    value={appointmentDate}
                    onChange={(e) =>
                      setAppointmentDate(e.target.value)
                    }
                    className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 outline-none transition focus:border-wine"
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-semibold">
                    Selected Time *
                  </span>

                  <input
                    type="time"
                    value={appointmentTime}
                    onChange={(e) =>
                      setAppointmentTime(e.target.value)
                    }
                    className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 outline-none transition focus:border-wine"
                  />
                </label>
              </div>
            </div>
          </section>
        )}

        {/* =========================
            STEP 2 — SERVICES
        ========================== */}
        {step === 1 && (
          <section className="p-5 md:p-8">
            <div className="mb-6">
              <h2 className="font-script text-3xl text-wine">
                Select Your Services
              </h2>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Select multiple services if you would like to
                combine them into the same appointment.
              </p>
            </div>

            <div className="space-y-8">
              {Object.entries(groupedServices).map(
                ([category, items]) => (
                  <div key={category}>
                    <h3 className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-wine">
                      {category}
                    </h3>

                    <div className="grid gap-3 md:grid-cols-2">
                      {items.map((service) => {
                        const selected =
                          selectedServices.includes(
                            service.id
                          );

                        return (
                          <button
                            key={service.id}
                            type="button"
                            onClick={() =>
                              toggleService(service.id)
                            }
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
                                {selected && (
                                  <Check className="h-3.5 w-3.5" />
                                )}
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

                                {service.description && (
                                  <p className="mt-1 text-sm leading-5 text-muted-foreground">
                                    {service.description}
                                  </p>
                                )}

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
                )
              )}
            </div>

            {selectedServices.length > 0 && (
              <div className="mt-6 rounded-2xl bg-secondary/50 p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold">
                      {selectedServices.length} service
                      {selectedServices.length === 1
                        ? ""
                        : "s"}{" "}
                      selected
                    </p>

                    <p className="mt-1 text-xs text-muted-foreground">
                      {totalDuration} minutes total
                    </p>
                  </div>

                  <p className="text-xl font-bold text-wine">
                    P{total}
                  </p>
                </div>
              </div>
            )}
          </section>
        )}

        {/* =========================
            STEP 3 — DEPOSIT
        ========================== */}
        {step === 2 && (
          <section className="p-5 md:p-8">
            <div className="mb-6">
              <h2 className="font-script text-3xl text-wine">
                Deposit
              </h2>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Review the deposit and payment information before
                continuing.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="rounded-2xl border border-border bg-background p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Deposit Required
                </p>

                <p className="mt-2 text-4xl font-bold text-wine">
                  P{deposit}
                </p>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  This booking deposit is non-refundable.
                </p>

                <div className="mt-5 border-t border-border pt-4">
                  <div className="flex justify-between text-sm">
                    <span>Total booking</span>
                    <span className="font-semibold">
                      P{total}
                    </span>
                  </div>

                  <div className="mt-2 flex justify-between text-sm">
                    <span>Remaining balance</span>
                    <span className="font-semibold">
                      P{remaining}
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-background p-6">
                <p className="font-semibold text-wine">
                  Payment Details
                </p>

                <div className="mt-4 space-y-4 text-sm">
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
                After making your P{deposit} deposit, please send
                your proof of payment <strong>manually on WhatsApp</strong>.
                You do not need to upload proof of payment on this
                website.
              </p>
            </div>
          </section>
        )}

        {/* =========================
            STEP 4 — DETAILS
        ========================== */}
        {step === 3 && (
          <section className="p-5 md:p-8">
            <div className="mb-6">
              <h2 className="font-script text-3xl text-wine">
                Your Details
              </h2>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Enter your details so Tebo's Nail Heaven can
                contact you about your appointment.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <label className="block">
                <span className="text-sm font-semibold">
                  Full Name *
                </span>

                <input
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  placeholder="Your full name"
                  className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 outline-none transition focus:border-wine"
                />
              </label>

              <label className="block">
                <span className="text-sm font-semibold">
                  Phone Number *
                </span>

                <input
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value)
                  }
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
                onChange={(e) =>
                  setNotes(e.target.value)
                }
                placeholder="Anything we should know about your appointment?"
                rows={5}
                className="mt-2 w-full resize-none rounded-xl border border-border bg-background px-4 py-3 outline-none transition focus:border-wine"
              />
            </label>
          </section>
        )}

        {/* =========================
            STEP 5 — WHATSAPP
        ========================== */}
        {step === 4 && (
          <section className="p-5 md:p-8">
            <div className="mb-6 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold text-white">
                <Check className="h-7 w-7" />
              </div>

              <h2 className="mt-5 font-script text-3xl text-wine">
                Review Your Booking
              </h2>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Review everything below, then send your booking
                through WhatsApp.
              </p>
            </div>

            <div className="space-y-4">
              {/* SERVICES */}
              <div className="rounded-2xl border border-border p-5">
                <h3 className="font-semibold text-wine">
                  Selected Services
                </h3>

                <div className="mt-3 space-y-3">
                  {selectedServiceObjects.map(
                    (service) => (
                      <div
                        key={service.id}
                        className="flex justify-between gap-4 text-sm"
                      >
                        <span>
                          {service.name}
                        </span>

                        <span className="font-semibold">
                          P{service.price}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* APPOINTMENT */}
              <div className="rounded-2xl border border-border p-5">
                <h3 className="font-semibold text-wine">
                  Appointment
                </h3>

                <div className="mt-3 space-y-2 text-sm">
                  <p>
                    <strong>Date:</strong>{" "}
                    {appointmentDate}
                  </p>

                  <p>
                    <strong>Time:</strong>{" "}
                    {appointmentTime}
                  </p>

                  <p>
                    <strong>Duration:</strong>{" "}
                    {totalDuration} minutes
                  </p>
                </div>
              </div>

              {/* TOTAL */}
              <div className="rounded-2xl bg-secondary/50 p-5">
                <div className="flex justify-between">
                  <span>Total</span>

                  <span className="text-xl font-bold text-wine">
                    P{total}
                  </span>
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

              {/* CUSTOMER */}
              <div className="rounded-2xl border border-border p-5">
                <h3 className="font-semibold text-wine">
                  Your Details
                </h3>

                <p className="mt-3 text-sm">
                  <strong>Name:</strong> {name}
                </p>

                <p className="mt-1 text-sm">
                  <strong>Phone:</strong> {phone}
                </p>

                {notes && (
                  <p className="mt-3 text-sm text-muted-foreground">
                    <strong>Notes:</strong>{" "}
                    {notes}
                  </p>
                )}
              </div>

              {/* PAYMENT NOTICE */}
              <div className="rounded-2xl border border-gold/30 bg-gold/5 p-5">
                <p className="font-semibold text-wine">
                  Payment & Proof of Payment
                </p>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  After making your P{deposit} deposit, send
                  your proof of payment <strong>manually on
                  WhatsApp</strong>. No upload is required on
                  this website.
                </p>
              </div>

              {/* AGREEMENT */}
              <label className="flex cursor-pointer gap-3 rounded-2xl border border-border p-4">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) =>
                    setAgreed(e.target.checked)
                  }
                  className="mt-1 h-4 w-4"
                />

                <span className="text-sm leading-6">
                  I understand that the P{deposit} booking
                  deposit is non-refundable and that I must
                  send my proof of payment manually through
                  WhatsApp after making the deposit.
                </span>
              </label>
            </div>
          </section>
        )}
      </div>

      {/* =========================
          NAVIGATION
      ========================== */}
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

      {/* =========================
          BOOKING SUMMARY
      ========================== */}
      {selectedServices.length > 0 && (
        <div className="mt-6 rounded-3xl border border-border bg-card p-5 shadow-soft">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Booking Summary
              </p>

              <p className="mt-1 font-semibold text-wine">
                {selectedServices.length} service
                {selectedServices.length === 1
                  ? ""
                  : "s"} selected
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
    </main>
  );
}
