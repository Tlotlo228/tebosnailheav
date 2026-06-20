import { createFileRoute, Link } from "@tanstack/react-router";
import { Star, Sparkles, Calendar, Award } from "lucide-react";
import { business, services, reviews } from "@/lib/site-data";

const IMG = {
  WA0028: "https://drive.google.com/uc?export=view&id=1KWxSpMNX0pkuQc3rxX0E2Ma8S9NuakPr",
  WA0030: "https://drive.google.com/uc?export=view&id=1jpffaJOBNdhsSxmzM6hA8JC6eHWa8vy9",
  WA0031: "https://drive.google.com/uc?export=view&id=1j4OimcZWJTICkpzNq5Jpa-VVgC5jHB2V",
  WA0032: "https://drive.google.com/uc?export=view&id=1g1ilPHs9zgpLGdgUAfW9M9o4sbPt1WbX",
  WA0033: "https://drive.google.com/uc?export=view&id=1Glb1ba18HyGobwdB1cBM8BtKjb6IfO0Y",
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tebo's Nail Heaven — Gel, Polygel & Lash Studio · Gaborone" },
      { name: "description", content: "Premium gel nails, polygel extensions and cluster lashes by Tebo. Book online — P50 secures your slot." },
      { property: "og:title", content: "Tebo's Nail Heaven" },
      { property: "og:description", content: "the alluring beauty care — premium gel, polygel & lashes in Gaborone." },
      { property: "og:image", content: IMG.WA0030 },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BeautySalon",
          name: business.name,
          image: IMG.WA0030,
          telephone: business.whatsapp,
          address: { "@type": "PostalAddress", addressLocality: business.address, addressCountry: "BW" },
          priceRange: "P50 – P420",
          aggregateRating: { "@type": "AggregateRating", ratingValue: business.stats.rating, reviewCount: reviews.length },
        }),
      },
    ],
  }),
  component: Home,
});

function Home() {
  const featured = [services[2], services[14], services[31]];
  const gallery = [IMG.WA0033, IMG.WA0031, IMG.WA0032, IMG.WA0028];

  return (
    <div>
      <section className="relative overflow-hidden bg-hero">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-16 pt-12 md:grid-cols-2 md:pt-20">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-accent/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-wine">
              <Sparkles className="h-3.5 w-3.5" /> Now booking
            </span>
            <h1 className="mt-5 font-script text-5xl leading-[1.05] text-wine sm:text-6xl md:text-7xl">
              Tebo's Nail Heaven
            </h1>
            <p className="mt-3 text-lg italic text-muted-foreground">{business.tagline}</p>
            <p className="mt-6 max-w-md text-base text-foreground/80">
              Hand-crafted gel, polygel and cluster lashes — designed to make you feel as luxurious
              as you look. By appointment in Gaborone.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/book"
                className="rounded-full bg-wine px-7 py-3 text-sm font-semibold text-primary-foreground shadow-luxe transition-transform hover:scale-105"
              >
                Book Now
              </Link>
              <Link
                to="/services"
                className="rounded-full border border-wine/30 bg-background px-7 py-3 text-sm font-semibold text-wine hover:bg-secondary"
              >
                View Services
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-gold opacity-20 blur-2xl" />
            <img
              src={IMG.WA0030}
              alt="Premium pink and white French gel nails with gold trim by Tebo's Nail Heaven"
              className="aspect-[3/4] w-full rounded-[2rem] object-cover shadow-luxe"
              width={900}
              height={1200}
            />
          </div>
        </div>

        <div className="border-y border-border bg-background/60">
          <div className="mx-auto grid max-w-6xl grid-cols-3 gap-4 px-4 py-6 text-center">
            <Stat icon={<Award className="h-5 w-5" />} value={`${business.stats.yearsExperience}+`} label="Years" />
            <Stat icon={<Sparkles className="h-5 w-5" />} value={`${business.stats.clientsServed}+`} label="Clients served" />
            <Stat icon={<Star className="h-5 w-5" />} value={business.stats.rating.toFixed(1)} label="Avg rating" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20">
        <SectionHeader eyebrow="Signature Services" title="Booked & loved" />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {featured.map((s) => (
            <Link
              key={s.id}
              to="/book"
              search={{ service: s.id }}
              className="group rounded-3xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-luxe"
            >
              <p className="text-xs uppercase tracking-widest text-gold">{s.category.split("—")[0].trim()}</p>
              <h3 className="mt-2 text-xl font-semibold text-wine">{s.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.description}</p>
              <div className="mt-5 flex items-end justify-between">
                <span className="text-2xl font-bold text-wine">P{s.price}</span>
                <span className="text-xs font-semibold text-gold">Book →</span>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link to="/services" className="text-sm font-semibold text-wine underline-offset-4 hover:underline">
            See full menu →
          </Link>
        </div>
      </section>

      <section className="bg-secondary/40 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeader eyebrow="Our Work" title="Recent sets" />
          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
            {gallery.map((url, i) => (
              <img
                key={i}
                src={url}
                alt="Nail art by Tebo's Nail Heaven"
                loading="lazy"
                className="aspect-square w-full rounded-2xl object-cover shadow-soft transition-transform hover:scale-[1.02]"
                width={600}
                height={600}
              />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link to="/gallery" className="text-sm font-semibold text-wine underline-offset-4 hover:underline">
              See full gallery →
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20">
        <SectionHeader eyebrow="Client Love" title="What they're saying" />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {reviews.slice(0, 3).map((r, i) => (
            <article key={i} className="rounded-3xl border border-border bg-card p-6 shadow-soft">
              <div className="flex gap-0.5">
                {Array.from({ length: r.rating }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-gold text-gold" />
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-foreground/85">"{r.text}"</p>
              <p className="mt-4 text-sm font-semibold text-wine">— {r.name}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20">
        <div className="overflow-hidden rounded-3xl bg-wine p-10 text-center text-primary-foreground shadow-luxe md:p-16">
          <Calendar className="mx-auto h-10 w-10 text-accent" />
          <h2 className="mt-4 font-script text-4xl text-accent md:text-5xl">Ready for your set?</h2>
          <p className="mx-auto mt-3 max-w-md text-sm opacity-85">
            Slots fill fast — secure yours with a P{business.depositAmount} deposit and we'll
            confirm via WhatsApp.
          </p>
          <Link
            to="/book"
            className="mt-7 inline-block rounded-full bg-accent px-8 py-3 text-sm font-semibold text-accent-foreground shadow-soft transition-transform hover:scale-105"
          >
            Book Your Appointment
          </Link>
        </div>
      </section>
    </div>
  );
}

function Stat({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="text-gold">{icon}</div>
      <p className="text-2xl font-bold text-wine">{value}</p>
      <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
    </div>
  );
}

function SectionHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">{eyebrow}</p>
      <h2 className="mt-2 font-script text-4xl text-wine md:text-5xl">{title}</h2>
    </div>
  );
}
