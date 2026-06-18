import { createFileRoute } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { reviews, business } from "@/lib/site-data";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Reviews — Tebo's Nail Heaven" },
      { name: "description", content: `Real reviews from real clients. Average rating ${business.stats.rating}/5.` },
      { property: "og:title", content: "Reviews — Tebo's Nail Heaven" },
      { property: "og:description", content: "What clients are saying about Tebo's Nail Heaven." },
    ],
  }),
  component: Reviews,
});

function Reviews() {
  const avg = (reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(1);
  return (
    <div className="mx-auto max-w-5xl px-4 py-14">
      <header className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Reviews</p>
        <h1 className="mt-2 font-script text-5xl text-wine md:text-6xl">Client love</h1>
        <div className="mt-4 flex items-center justify-center gap-2">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-gold text-gold" />
            ))}
          </div>
          <span className="text-sm font-semibold text-wine">{avg} · {reviews.length} reviews</span>
        </div>
      </header>

      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {reviews.map((r, i) => (
          <article key={i} className="rounded-3xl border border-border bg-card p-6 shadow-soft">
            <div className="flex items-center justify-between">
              <div className="flex gap-0.5">
                {Array.from({ length: r.rating }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-gold text-gold" />
                ))}
              </div>
              <time className="text-xs text-muted-foreground">{r.date}</time>
            </div>
            <p className="mt-4 leading-relaxed text-foreground/85">"{r.text}"</p>
            <p className="mt-4 text-sm font-semibold text-wine">— {r.name}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
