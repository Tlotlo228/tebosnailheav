import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { X } from "lucide-react";
type Item = { url: string; alt: string; category: "Gel" | "Polygel" | "Color" };
import wa0028 from "../assets/WA0028.jpg";
import wa0030 from "../assets/WA0030.jpg";
import wa0031 from "../assets/WA0031.jpg";
import wa0032 from "../assets/WA0032.jpg";
import wa0033 from "../assets/WA0033.jpg";

const items: Item[] = [
  { url: "https://drive.google.com/uc?export=view&id=1jpffaJOBNdhsSxmzM6hA8JC6eHWa8vy9", alt: "Pink & white French gel with gold trim", category: "Gel" },
  { url: "https://drive.google.com/uc?export=view&id=1Glb1ba18HyGobwdB1cBM8BtKjb6IfO0Y", alt: "Deep red marble gel extensions", category: "Gel" },
  { url: "https://drive.google.com/uc?export=view&id=1j4OimcZWJTICkpzNq5Jpa-VVgC5jHB2V", alt: "Red ombré almond polygel", category: "Polygel" },
  { url: "https://drive.google.com/uc?export=view&id=1g1ilPHs9zgpLGdgUAfW9M9o4sbPt1WbX", alt: "Glossy magenta gel manicure", category: "Color" },
  { url: "https://drive.google.com/uc?export=view&id=1KWxSpMNX0pkuQc3rxX0E2Ma8S9NuakPr", alt: "Lilac purple gel manicure", category: "Color" },
  { url: "https://drive.google.com/uc?export=view&id=12S-vubjIk796FdZ6GQIJ9V7X5Z5Rfpoj", alt: "French tip gel set", category: "Gel" },
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

