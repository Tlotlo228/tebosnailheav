import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Clock, MessageCircle, Instagram } from "lucide-react";
import { business } from "@/lib/site-data";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Tebo's Nail Heaven" },
      { name: "description", content: "Find us in Gaborone. WhatsApp, Instagram, hours and location." },
      { property: "og:title", content: "Contact Tebo's Nail Heaven" },
      { property: "og:description", content: "Get in touch via WhatsApp or Instagram." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const waLink = `https://wa.me/${business.whatsapp.replace(/\D/g, "")}`;
  return (
    <div className="mx-auto max-w-5xl px-4 py-14">
      <header className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Get in touch</p>
        <h1 className="mt-2 font-script text-5xl text-wine md:text-6xl">Contact</h1>
      </header>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <InfoCard icon={<MapPin className="h-5 w-5" />} title="Address" body={business.address} />
        <InfoCard icon={<Clock className="h-5 w-5" />} title="Hours" body={business.hours} />
        <a href={waLink} target="_blank" rel="noreferrer" className="block">
          <InfoCard icon={<MessageCircle className="h-5 w-5" />} title="WhatsApp" body={business.whatsappDisplay} cta="Message us →" />
        </a>
        <a href={business.instagramUrl} target="_blank" rel="noreferrer" className="block">
          <InfoCard icon={<Instagram className="h-5 w-5" />} title="Instagram" body={`@${business.instagram}`} cta="Follow →" />
        </a>
      </div>

      <div className="mt-10 overflow-hidden rounded-3xl shadow-luxe">
        <iframe
          title="Map of Gaborone"
          src="https://www.google.com/maps?q=Gaborone+Botswana&output=embed"
          loading="lazy"
          className="aspect-[16/10] w-full border-0"
        />
      </div>
    </div>
  );
}

function InfoCard({ icon, title, body, cta }: { icon: React.ReactNode; title: string; body: string; cta?: string }) {
  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-soft transition-colors hover:bg-secondary/40">
      <div className="flex items-center gap-3">
        <div className="rounded-full bg-accent/20 p-2 text-wine">{icon}</div>
        <p className="font-semibold text-wine">{title}</p>
      </div>
      <p className="mt-3 text-sm text-foreground/85">{body}</p>
      {cta && <p className="mt-2 text-sm font-semibold text-gold">{cta}</p>}
    </div>
  );
}
