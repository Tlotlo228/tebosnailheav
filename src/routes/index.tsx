import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { X } from "lucide-react";

const IMG = {
  img1: "/images/WA0030.jpg",
  img2: "/images/WA0033.jpg",
  img3: "/images/WA0032.jpg",
  img4: "/images/WA0031.jpg",
  img5: "/images/WA0028.jpg",

  img6: "/images/bob-1.jpg",
  img7: "/images/bob-2.jpg",
  img8: "/images/french-nails.jpg",
  img9: "/images/lashes.jpg",
  img10: "/images/makeup-1.jpg",
  img11: "/images/makeup-2.jpg",
  img12: "/images/owner.jpg",
  img13: "/images/red-nails.jpg",
  img14: "/images/red-nails-2.jpg",
};

type Category = "Gel" | "Polygel" | "Color" | "All";

type Item = {
  url: string;
  alt: string;
  category: Category;
};

const items: Item[] = [
  {
    url: IMG.img1,
    alt: "Pink and white nail set by Tebo's Nail Heaven",
    category: "Gel",
  },
  {
    url: IMG.img2,
    alt: "Red nail set by Tebo's Nail Heaven",
    category: "Color",
  },
  {
    url: IMG.img3,
    alt: "Purple nail set by Tebo's Nail Heaven",
    category: "Color",
  },
  {
    url: IMG.img4,
    alt: "Pink nail set by Tebo's Nail Heaven",
    category: "Gel",
  },
  {
    url: IMG.img5,
    alt: "Red nail set by Tebo's Nail Heaven",
    category: "Gel",
  },
  {
    url: IMG.img6,
    alt: "Beauty look by Tebo's Nail Heaven",
    category: "Polygel",
  },
  {
    url: IMG.img7,
    alt: "Beauty look by Tebo's Nail Heaven",
    category: "Polygel",
  },
  {
    url: IMG.img8,
    alt: "French nail set by Tebo's Nail Heaven",
    category: "Gel",
  },
  {
    url: IMG.img9,
    alt: "Lash and beauty look by Tebo's Nail Heaven",
    category: "All",
  },
  {
    url: IMG.img10,
    alt: "Makeup look by Tebo's Nail Heaven",
    category: "All",
  },
  {
    url: IMG.img11,
    alt: "Makeup look by Tebo's Nail Heaven",
    category: "All",
  },
  {
    url: IMG.img12,
    alt: "Tebo's Nail Heaven beauty look",
    category: "All",
  },
  {
    url: IMG.img13,
    alt: "Red manicure by Tebo's Nail Heaven",
    category: "Color",
  },
  {
    url: IMG.img14,
    alt: "Red manicure by Tebo's Nail Heaven",
    category: "Color",
  },
];

const categories = ["All", "Gel", "Polygel", "Color"] as const;

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      {
        title: "Gallery — Tebo's Nail Heaven",
      },
      {
        name: "description",
        content:
          "Recent nail sets, lashes and beauty looks by Tebo's Nail Heaven.",
      },
      {
        property: "og:title",
        content: "Gallery — Tebo's Nail Heaven",
      },
      {
        property: "og:description",
        content:
          "Browse recent nail art, lashes and beauty looks.",
      },
      {
        property: "og:image",
        content: IMG.img1,
      },
    ],
  }),

  component: Gallery,
});

function Gallery() {
  const [filter, setFilter] =
    useState<(typeof categories)[number]>("All");

  const [lightbox, setLightbox] =
    useState<Item | null>(null);

  const filtered =
    filter === "All"
      ? items
      : items.filter((i) => i.category === filter);

  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <header className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
          Portfolio
        </p>

        <h1 className="mt-2 font-script text-5xl text-wine md:text-6xl">
          Gallery
        </h1>
      </header>

      <div className="mt-8 flex flex-wrap justify-center gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
              filter === category
                ? "bg-wine text-primary-foreground"
                : "border border-border bg-card text-foreground/70 hover:bg-secondary"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="mt-10 columns-2 gap-3 md:columns-3 lg:columns-4 [&>*]:mb-3">
        {filtered.map((item, index) => (
          <button
            key={`${item.url}-${index}`}
            onClick={() => setLightbox(item)}
            className="block w-full overflow-hidden rounded-2xl shadow-soft transition-transform hover:scale-[1.01]"
          >
            <img
              src={item.url}
              alt={item.alt}
              loading="lazy"
              className="w-full"
            />
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

          <img
            src={lightbox.url}
            alt={lightbox.alt}
            className="max-h-[90vh] max-w-full rounded-2xl object-contain"
          />
        </div>
      )}
    </div>
  );
}
