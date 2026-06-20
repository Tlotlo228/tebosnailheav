import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { X } from "lucide-react";

type Item = { url: string; alt: string; category: "Gel" | "Polygel" | "Color" };
const items: Item[] = [
  { url: "/src/assets/WA0030.jpg", alt: "Pink & white French gel with gold trim", category: "Gel" },
  { url: "/src/assets/WA0033.jpg", alt: "Deep red marble gel extensions", category: "Gel" },
  { url: "/src/assets/WA0031.jpg", alt: "Red ombré almond polygel", category: "Polygel" },
  { url: "/src/assets/WA0032.jpg", alt: "Glossy magenta gel manicure", category: "Color" },
  { url: "/src/assets/WA0028.jpg", alt: "Lilac purple gel manicure", category: "Color" },
  { url: "/src/assets/WA0030.jpg", alt: "French tip gel set", category: "Gel" },
  { url: "/src/assets/WA0031.jpg", alt: "Almond polygel set", category: "Polygel" },
  { url: "/src/assets/WA0033.jpg", alt: "Burgundy marble nails", category: "Gel" },
];
const categories = ["All", "Gel", "Polygel", "Color"] as const;
export const Route = createFileRoute("/gallery")({
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
            <img src={it.url} alt={it.alt}
