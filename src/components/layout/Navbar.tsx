import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { to: "/for-students", label: "For Students" },
  { to: "/for-employers", label: "For Employers" },
  { to: "/for-colleges", label: "For Colleges" },
  { to: "/pricing", label: "Pricing" },
  { to: "/about", label: "About" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);


  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "border-b border-border/60 bg-background/70 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="group flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-button shadow-glow transition-transform group-hover:scale-105">
            <Zap className="h-5 w-5 text-primary-foreground" fill="currentColor" />
          </div>
          <div className="leading-tight">
            <div className="text-base font-bold tracking-tight text-foreground">Talent Forge</div>
            <div className="text-[10px] font-medium text-coral">by ResourceIndia.co</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "text-foreground bg-secondary" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Button asChild variant="ghost" className="font-medium">
            <Link to="/auth" search={{ mode: "login" }}>Login</Link>
          </Button>
          <Button asChild className="bg-gradient-button text-primary-foreground shadow-glow hover:opacity-95">
            <Link to="/auth" search={{ mode: "signup" }}>Get Started Free</Link>
          </Button>
        </div>

        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background/95 backdrop-blur-xl lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground hover:bg-secondary"
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-2 border-t border-border pt-3">
              <Button asChild variant="outline">
                <Link to="/auth" search={{ mode: "login" }} onClick={() => setOpen(false)}>Login</Link>
              </Button>
              <Button asChild className="bg-gradient-button text-primary-foreground">
                <Link to="/auth" search={{ mode: "signup" }} onClick={() => setOpen(false)}>Get Started Free</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
