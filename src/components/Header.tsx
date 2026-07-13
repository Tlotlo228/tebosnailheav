import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logoAsset from "@/assets/logo.png";
import { business } from "@/lib/site-data";
import { useLocation } from "@tanstack/react-router";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/gallery", label: "Gallery" },
  { to: "/about", label: "About" },
  { to: "/reviews", label: "Reviews" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
  { to: "/status", label: "Status" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
const location = useLocation();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
useEffect(() => {
  setOpen(false);
}, [location.pathname]);
  useEffect(() => {
  document.body.style.overflow = open ? "hidden" : "";

  return () => {
    document.body.style.overflow = "";
  };
}, [open]);
  return (
<header
  className={`sticky top-0 z-40 transition-all ${
        scrolled ? "glass shadow-soft" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2" aria-label={business.name}>
          <img src={logoAsset} alt={business.name} className="h-10 w-auto" />
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
              activeProps={{ className: "text-primary" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/book"
            className="rounded-full bg-wine px-5 py-2 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:scale-105"
          >
            Book Now
          </Link>
        </nav>
        <button
          aria-label="Open menu"
          className="rounded-md p-2 md:hidden"
          onClick={() => setOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

    {/* Mobile drawer */}
{open && (
  <div className="fixed inset-0 z-[100] md:hidden">
    <div
      className="absolute inset-0 bg-black/40"
      onClick={() => setOpen(false)}
    />

    <aside className="absolute right-0 top-0 h-full w-[82%] max-w-sm bg-background p-6 shadow-luxe">
      <div className="mb-8 flex items-center justify-between">
        <img src={logoAsset} alt="" className="h-10 w-auto" />
        <button
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className="rounded-md p-2"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      <nav className="flex flex-col gap-1">
        {navLinks.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            onClick={() => setOpen(false)}
            className="rounded-lg px-3 py-3 text-lg font-medium text-foreground/90 hover:bg-secondary"
            activeProps={{ className: "text-primary bg-secondary" }}
            activeOptions={{ exact: l.to === "/" }}
          >
            {l.label}
          </Link>
        ))}

        <Link
          to="/book"
          onClick={() => setOpen(false)}
          className="mt-4 rounded-full bg-wine px-5 py-3 text-center text-base font-semibold text-primary-foreground shadow-soft"
        >
          Book Now
        </Link>
      </nav>
    </aside>
  </div>
)}
    </header>
  );
}
