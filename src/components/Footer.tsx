import { Link } from "@tanstack/react-router";
import { Instagram, MessageCircle, MapPin, Clock } from "lucide-react";
import { business } from "@/lib/site-data";

export function Footer() {
  const waLink = `https://wa.me/${business.whatsapp.replace(/\D/g, "")}`;
  return (
    <footer className="mt-24 bg-wine text-primary-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <h3 className="font-script text-3xl text-accent">{business.name}</h3>
          <p className="mt-2 text-sm opacity-80">{business.tagline}</p>
          <p className="mt-4 max-w-sm text-sm opacity-80">
            Premium gel, polygel and cluster lash services in Gaborone — booked by appointment,
            secured with a P{business.depositAmount} deposit.
          </p>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent">Visit</h4>
          <p className="flex items-start gap-2 text-sm opacity-90">
            <MapPin className="mt-0.5 h-4 w-4 flex-none" /> {business.address}
          </p>
          <p className="mt-2 flex items-start gap-2 text-sm opacity-90">
            <Clock className="mt-0.5 h-4 w-4 flex-none" /> {business.hours}
          </p>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent">Connect</h4>
          <div className="flex flex-col gap-2 text-sm">
            <a href={waLink} target="_blank" rel="noreferrer" className="flex items-center gap-2 opacity-90 hover:text-accent">
              <MessageCircle className="h-4 w-4" /> {business.whatsappDisplay}
            </a>
            <a href={business.instagramUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 opacity-90 hover:text-accent">
              <Instagram className="h-4 w-4" /> @{business.instagram}
            </a>
            <Link to="/book" className="mt-2 inline-block rounded-full bg-accent px-4 py-2 text-center font-semibold text-accent-foreground">
              Book Now
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs opacity-70 md:flex-row">
          <p>© {new Date().getFullYear()} {business.name}. All rights reserved.</p>
          <p>By appointment only · P{business.depositAmount} deposit secures your slot</p>
        </div>
      </div>
    </footer>
  );
}
