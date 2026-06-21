import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { X } from "lucide-react";

const IMG = {
  img1: "https://i.postimg.cc/qB3WG9zC/Whats-App-Image-2026-06-21-at-11-48-48-(1).jpg",
  img2: "https://i.postimg.cc/y6Z2TwkF/Whats-App-Image-2026-06-21-at-11-48-48-(2).jpg",
  img3: "https://i.postimg.cc/MZQgYhv0/Whats-App-Image-2026-06-21-at-11-48-48-(3).jpg",
  img4: "https://i.postimg.cc/jq7BhGLQ/Whats-App-Image-2026-06-21-at-11-48-48-(4).jpg",
  img5: "https://i.postimg.cc/zDg4k9VC/Whats-App-Image-2026-06-21-at-11-48-48-(5).jpg",
  img6: "https://i.postimg.cc/mgwbsVF2/57ff07e6-7640-49a9-9f58-6623f17af825.jpg",
  img7: "https://i.postimg.cc/VNZmS6RW/c445313a-b5b1-4924-9236-5d4e85f6c3c0.jpg",
  img8: "https://i.postimg.cc/NMvbk8pt/2ce392ff-8fff-49ad-8d6f-d47ed0484db6.jpg",
  img9: "https://i.postimg.cc/qv9GpXfY/57ff07e6-7640-49a9-9f58-6623f17af825.jpg",
  img10: "https://i.postimg.cc/hjRM18pg/d413edce-8530-4155-af5e-8730a35bafe3.jpg",
};

type Item = { url: string; alt: string; category: "Gel" | "Polygel" | "Color" };

const items: Item[] = [
  { url: IMG.img1, alt: "Pink & white French gel with gold trim", category: "Gel" },
  { url: IMG.img2, alt: "Deep red marble gel extensions", category: "Gel" },
  { url: IMG.img3, alt: "Red ombré almond polygel", category: "Polygel" },
  { url: IMG.img4, alt: "Glossy magenta gel manicure", category: "Color" },
  { url: IMG.img5, alt: "Lilac purple gel manicure", category: "Color" },
  { url: IMG.img6, alt: "Nail art by Tebo's Nail Heaven", category: "Gel" },
  { url: IMG.img7, alt: "Nail art by Tebo's Nail Heaven", category: "Polygel" },
  { url: IMG.img8, alt: "Nail art by Tebo's Nail Heaven", category: "Color" },
  { url: IMG.img9, alt: "Nail art by Tebo's Nail Heaven", category: "Gel" },
  { url: IMG.img10, alt: "Nail art by Tebo's Nail Heaven", category: "Polygel" },
];

const categories = ["All", "Gel", "Polygel", "Color"] as const;

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Tebo's Nail Heaven" },
      { name: "description", content: "Recent nail sets — gel, polygel, and color manicures by Tebo." },
      { property: "og:title", content: "Gallery — Tebo's Nail Heaven" },
      { property: "og:description", content: "Browse recent nail art and lash sets." },
      { property: "og:image", content: IMG.img1 },
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
