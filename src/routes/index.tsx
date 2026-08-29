import { createFileRoute, Link } from "@tanstack/react-router";
import { Star, Sparkles, Calendar, Award } from "lucide-react";
import { business, services, reviews } from "@/lib/site-data";

import img28 from "../assets/WA0028.jpg";
import img30 from "../assets/WA0030.jpg";
import img31 from "../assets/WA0031.jpg";
import img32 from "../assets/WA0032.jpg";
import img33 from "../assets/WA0033.jpg";

const IMG = {
  img1: img28,
  img2: img30,
  img3: img31,
  img4: img32,
  img5: img33,
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tebo's Nail Heaven — Gaborone Nail Studio" },
      { name: "description", content: "Gel, polygel, acrylics, lashes & makeup in Gaborone. Book your appointment online." },
      { property: "og:title", content: "Tebo's Nail Heaven" },
      { property: "og:description", content: "Gaborone's premium nail & beauty studio." },
      { property: "og:image", content: IMG.img1 },
    ],
  }),
  component: Home,
});

function Home() {
  const featured = services.slice(0, 3);
  const topReviews = reviews.slice(0, 3);

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden bg-blush px-4 text-center">
        <div className="absolute inset-0 grid grid-cols-3 opacity-20">
          {[IMG.img1, IMG.img2, IMG.img3].map((src, i) => (
            <img key={i} src={src} alt="" className="h-full w-full object-cover" />
          ))}
        </div>
        <div className="relative z-10 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">Gaborone's Premier Nail Studio</p>
          <h1 className="mt-3 font-script text-6xl text-wine md:text-8xl">Tebo's Nail Heaven</h1>
          <p className="mt-4 text-base text-foreground/70 md:text-lg">
            Gel · Polygel · Acrylics · Lashes · Makeup
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/book"
              className="rounded-full bg-wine px-8 py-3 text-sm font-semibold text-white shadow-soft transition-opacity hover:opacity-90"
            >
              Book Now
            </Link>
            <Link
              to="/gallery"
              className="rounded-full border border-wine px-8 py-3 text-sm font-semibold text-wine transition-colors hover:bg-wine/10"
            >
              View Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="bg-white px-4 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Why Choose Us</p>
          <h2 className="mt-2 font-script text-4xl text-wine">Crafted with Care</h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {[
              { icon: Sparkles, title: "Premium Products", body: "Only top-tier gel and polygel brands for lasting results." },
              { icon: Award, title: "Skilled Artist", body: "Tebo brings precision and artistry to every set." },
              { icon: Calendar, title: "Easy Booking", body: "Book your slot online in under a minute." },
            ].map(({ icon: Icon, title, body }) => (
              <div key={title} className="flex flex-col items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blush">
                  <Icon className="h-5 w-5 text-wine" />
                </div>
                <h3 className="font-semibold text-foreground">{title}</h3>
                <p className="text-sm text-foreground/60">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured services */}
      <section className="bg-secondary/30 px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Services</p>
            <h2 className="mt-2 font-script text-4xl text-wine">Popular Treatments</h2>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {featured.map((s) => (
              <div key={s.id} className="overflow-hidden rounded-2xl bg-card shadow-soft">
                {s.image && (
                  <img src={s.image} alt={s.name} className="h-48 w-full object-cover" />
                )}
                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gold">{s.category}</p>
                  <h3 className="mt-1 font-semibold text-foreground">{s.name}</h3>
                  <p className="mt-1 text-sm text-foreground/60">{s.description}</p>
                  <p className="mt-3 text-sm font-bold text-wine">P{s.price}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              to="/services"
              className="rounded-full border border-wine px-8 py-3 text-sm font-semibold text-wine transition-colors hover:bg-wine/10"
            >
              See All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Mini gallery */}
      <section className="bg-white px-4 py-16">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Portfolio</p>
          <h2 className="mt-2 font-script text-4xl text-wine">Recent Work</h2>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[IMG.img1, IMG.img2, IMG.img4, IMG.img5].map((src, i) => (
              <img key={i} src={src} alt="Nail art" className="aspect-square w-full rounded-2xl object-cover shadow-soft" />
            ))}
          </div>
          <Link
            to="/gallery"
            className="mt-6 inline-block rounded-full bg-wine px-8 py-3 text-sm font-semibold text-white shadow-soft transition-opacity hover:opacity-90"
          >
            Full Gallery
          </Link>
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-blush px-4 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Testimonials</p>
          <h2 className="mt-2 font-script text-4xl text-wine">What Clients Say</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {topReviews.map((r, i) => (
              <div key={i} className="rounded-2xl bg-white p-6 shadow-soft">
                <div className="flex justify-center gap-1">
                  {Array.from({ length: r.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-gold text-gold" />
                  ))}
                </div>
                <p className="mt-3 text-sm text-foreground/70">"{r.text}"</p>
                <p className="mt-3 text-xs font-semibold text-wine">— {r.name}</p>
              </div>
            ))}
          </div>
          <Link
            to="/reviews"
            className="mt-8 inline-block rounded-full border border-wine px-8 py-3 text-sm font-semibold text-wine transition-colors hover:bg-wine/10"
          >
            All Reviews
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-wine px-4 py-16 text-center text-white">
        <h2 className="font-script text-4xl">Ready for Your Next Set?</h2>
        <p className="mt-3 text-white/80">Book online — it takes less than a minute.</p>
        <Link
          to="/book"
          className="mt-6 inline-block rounded-full bg-white px-8 py-3 text-sm font-semibold text-wine shadow-soft transition-opacity hover:opacity-90"
        >
          Book Now
        </Link>
      </section>
    </div>
  );
}

