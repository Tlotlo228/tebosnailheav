import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqs, policies } from "@/lib/site-data";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ & Policies — Tebo's Nail Heaven" },
      { name: "description", content: "Booking, deposits, cancellations and what to expect at your appointment." },
      { property: "og:title", content: "FAQ — Tebo's Nail Heaven" },
      { property: "og:description", content: "Booking, deposits and cancellation policies." },
    ],
  }),
  component: FAQ,
});

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <header className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Help</p>
        <h1 className="mt-2 font-script text-5xl text-wine md:text-6xl">FAQ & Policies</h1>
      </header>

      <div className="mt-10 divide-y divide-border rounded-3xl border border-border bg-card shadow-soft">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={i}>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 p-5 text-left"
                aria-expanded={isOpen}
              >
                <span className="font-semibold text-wine">{f.question}</span>
                <ChevronDown className={`h-5 w-5 flex-none text-gold transition-transform ${isOpen ? "rotate-180" : ""}`} />
              </button>
              {isOpen && <div className="px-5 pb-5 text-sm text-foreground/85">{f.answer}</div>}
            </div>
          );
        })}
      </div>

      <div className="mt-10 rounded-3xl bg-wine p-6 text-primary-foreground shadow-luxe md:p-8">
        <h2 className="font-script text-3xl text-accent">Work Policy</h2>
        <ul className="mt-4 space-y-2 text-sm opacity-90">
          {policies.map((p, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-accent">•</span> <span>{p}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
