import { createFileRoute, Link } from "@tanstack/react-router";
import { services, business } from "@/lib/site-data";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services & Prices — Tebo's Nail Heaven" },
      { name: "description", content: "Full menu: gel nails, polygel, cluster lashes. Transparent pricing in Pula." },
      { property: "og:title", content: "Services & Prices — Tebo's Nail Heaven" },
      { property: "og:description", content: "Gel, polygel & lash menu with transparent Pula pricing." },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const grouped = services.reduce<Record<string, typeof services>>((acc, s) => {
    (acc[s.category] ||= []).push(s);
    return acc;
  }, {});

  return (
    <div className="mx-auto max-w-5xl px-4 py-14">
      <header className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Menu</p>
        <h1 className="mt-2 font-script text-5xl text-wine md:text-6xl">Services & Prices</h1>
        <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
          All prices in {business.currency}ula. Art is free in combo sets. Tap a service to start booking.
        </p>
      </header>

      <div className="mt-12 space-y-12">
        {Object.entries(grouped).map(([category, items]) => (
          <section key={category}>
            <h2 className="font-script text-3xl text-wine">{category}</h2>
            <div className="mt-4 divide-y divide-border rounded-3xl border border-border bg-card shadow-soft">
              {items.map((s) => (
                <Link
  key={s.id}
  to="/book"
  search={{ service: s.id }}
  className="flex items-center justify-between gap-4 p-5 transition-colors hover:bg-secondary/60"
>
  <div className="flex items-center gap-4">
    {s.image && (
      <img
        src={s.image}
        alt={s.name}
        className="h-20 w-20 rounded-2xl object-cover"
      />
    )}

    <div className="min-w-0">
      <p className="font-semibold text-wine">{s.name}</p>
      <p className="mt-1 text-sm text-muted-foreground">
        {s.description}
      </p>
    </div>
  </div>

  <div className="flex flex-col items-end">
    <span className="text-xl font-bold text-wine">
      P{s.price}
    </span>
    <span className="mt-1 text-xs font-semibold text-gold">
      Book →
    </span>
  </div>
</Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
