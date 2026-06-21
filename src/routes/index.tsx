import { createFileRoute, Link } from "@tanstack/react-router";
import { Star, Sparkles, Calendar, Award } from "lucide-react";
import { business, services, reviews } from "@/lib/site-data";

const IMG = {
  img1: "https://i.postimg.cc/qB3WG9zC/Whats-App-Image-2026-06-21-at-11-48-48-(1).jpg",
  img2: "https://i.postimg.cc/y6Z2TwkF/Whats-App-Image-2026-06-21-at-11-48-48-(2).jpg",
  img3: "https://i.postimg.cc/MZQgYhv0/Whats-App-Image-2026-06-21-at-11-48-48-(3).jpg",
  img4: "https://i.postimg.cc/jq7BhGLQ/Whats-App-Image-2026-06-21-at-11-48-48-(4).jpg",
  img5: "https://i.postimg.cc/zDg4k9VC/Whats-App-Image-2026-06-21-at-11-48-48-(5).jpg",
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tebo's Nail Heaven — Gel, Polygel & Lash Studio · Gaborone" },
      { name: "description", content: "Premium gel nails, polygel extensions and cluster lashes." },
    ],
  }),
  component: Home,
});

function Home() {
  // ✅ SAFE FEATURED PICKS (no crashes)
  const featured = services.slice(0, 3);

  const gallery = [IMG.img1, IMG.img2, IMG.img3, IMG.img4];

  return (
    <div>
      <section>
        <h1>{business.name}</h1>
        <p>{business.tagline}</p>
      </section>

      <section>
        <h2>Featured Services</h2>
        <div>
          {featured.map((s) => (
            <Link key={s.id} to="/book" search={{ service: s.id }}>
              <h3>{s.name}</h3>
              <p>P{s.price}</p>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2>Reviews</h2>
        {reviews.map((r) => (
          <div key={r.name}>
            <p>{"⭐".repeat(r.rating)}</p>
            <p>{r.text}</p>
            <p>- {r.name}</p>
          </div>
        ))}
      </section>

      <section>
        <h2>Gallery</h2>
        {gallery.map((img, i) => (
          <img key={i} src={img} alt="nail work" />
        ))}
      </section>
    </div>
  );
}
