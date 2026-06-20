import { createFileRoute } from "@tanstack/react-router";
import { Sparkles, ShieldCheck, Heart } from "lucide-react";

const heroUrl = "https://drive.google.com/uc?export=view&id=1jpffaJOBNdhsSxmzM6hA8JC6eHWa8vy9";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Tebo — Tebo's Nail Heaven" },
      { name: "description", content: "Meet Tebo — certified nail technician behind the alluring beauty care. Hygiene, craft and obsession with detail." },
      { property: "og:title", content: "About Tebo" },
      { property: "og:description", content: "Certified nail technician based in Gaborone." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-14">
      <header className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">About</p>
        <h1 className="mt-2 font-script text-5xl text-wine md:text-6xl">Meet Tebo</h1>
      </header>

      <div className="mt-12 grid gap-10 md:grid-cols-2 md:items-center">
        <img
          src={heroUrl}
          alt="Tebo's nail work"
          loading="lazy"
          className="aspect-[3/4] w-full rounded-3xl object-cover shadow-luxe"
        />
        <div>
          <h2 className="font-script text-3xl text-wine">The alluring beauty care</h2>
          <p className="mt-4 text-foreground/85">
            Tebo's Nail Heaven was born from a love of detail and the belief that every woman
            deserves to feel taken care of. From classic French tips to chrome marble combos,
            every set is hand-crafted in a calm, sanitised studio in Gaborone.
          </p>
          <p className="mt-3 text-foreground/85">
            Five years in, and over a thousand clients later, the philosophy hasn't changed:
            premium products, generous time, no rushing — and finishes that last.
          </p>
        </div>
      </div>

      <div className="mt-16 grid gap-5 md:grid-cols-3">
        <Feature icon={<Sparkles className="h-6 w-6" />} title="Premium products" body="Top-tier gel, polygel and lash brands — no shortcuts." />
        <Feature icon={<ShieldCheck className="h-6 w-6" />} title="Strict hygiene" body="Single-use files, sanitised tools, autoclave-clean implements." />
        <Feature icon={<Heart className="h-6 w-6" />} title="Personal touch" body="Bring your inspo — we'll customise art to suit you." />
      </div>
    </div>
  );
}

function Feature({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="rounded-3xl border border-border bg-card p-6 text-center shadow-soft">
      <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent/20 text-wine">{icon}</div>
      <h3 className="mt-4 font-semibold text-wine">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{body}</p>
    </div>
  );
}
