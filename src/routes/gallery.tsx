import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { X } from "lucide-react";
const g1 = { url: "https://drive.google.com/uc?export=view&id=1jpffaJOBNdhsSxmzM6hA8JC6eHWa8vy9" };
const g2 = { url: "https://drive.google.com/uc?export=view&id=1Glb1ba18HyGobwdB1cBM8BtKjb6IfO0Y" };
const g3 = { url: "https://drive.google.com/uc?export=view&id=1j4OimcZWJTICkpzNq5Jpa-VVgC5jHB2V" };
const g4 = { url: "https://drive.google.com/uc?export=view&id=1g1ilPHs9zgpLGdgUAfW9M9o4sbPt1WbX" };
const g5 = { url: "https://drive.google.com/uc?export=view&id=1KWxSpMNX0pkuQc3rxX0E2Ma8S9NuakPr" };

type Item = { url: string; alt: string; category: "Gel" | "Polygel" | "Color" };

const items: Item[] = [
  { url: g1.url, alt: "Pink & white French gel with gold trim", category: "Gel" },
  { url: g2.url, alt: "Deep red marble gel extensions", category: "Gel" },
  { url: g3.url, alt: "Red ombré almond polygel", category: "Polygel" },
  { url: g4.url, alt: "Glossy magenta gel manicure", category: "Color" },
  { url: g5.url, alt: "Lilac purple gel manicure", category: "Color" },
  { url: g1.url, alt: "French tip gel set", category: "Gel" },
  { url: g3.url, alt: "Almond polygel set", category: "Polygel" },
  { url: g2.url, alt: "Burgundy marble nails", category: "Gel" },
];

const categories = ["All", "Gel", "Polygel", "Color"] as const;

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Tebo's Nail Heaven" },
      { name: "description", content: "Recent nail sets — gel, polygel, and color manicures by Tebo." },
      { property: "og:title", content: "Gallery — Tebo's Nail Heaven" },
      { property: "og:description", content: "Browse recent nail art and lash sets." },
      { property: "og:image", content: g1.url },
    ],
  }),
  component: Gallery,
});

function Gallery() {
  const [filter, setFilter] = useState<(typeof categories)[number]>("All");
  const [lightbox, setLightbox] = useState<Item | null>(null);
  const filtered = filter === "All" ? items : items.filter((i) => i.category === filter);

  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <header className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Portfolio</p>
        <h1 className="mt-2 font-script text-5xl text-wine md:text-6xl">Gallery</h1>
      </header>

      <div className="mt-8 flex flex-wrap justify-center gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
              filter === c
                ? "bg-wine text-primary-foreground"
                : "border border-border bg-card text-foreground/70 hover:bg-secondary"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-10 columns-2 gap-3 md:columns-3 lg:columns-4 [&>*]:mb-3">
        {filtered.map((it, i) => (
          <button
            key={i}
            onClick={() => setLightbox(it)}
            className="block w-full overflow-hidden rounded-2xl shadow-soft transition-transform hover:scale-[1.01]"
          >
            <img src={it.url} alt={it.alt} loading="lazy" className="w-full" />
          </button>
        ))}
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            aria-label="Close"
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white"
            onClick={() => setLightbox(null)}
          >
            <X className="h-6 w-6" />
          </button>
          <img src={lightbox.url} alt={lightbox.alt} className="max-h-[90vh] max-w-full rounded-2xl" />
        </div>
      )}
    </div>
  );
}
