import { Link } from "@tanstack/react-router";
import { Linkedin, Twitter, Youtube, MessageCircle, Zap } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50 mt-24">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-button">
                <Zap className="h-5 w-5 text-primary-foreground" fill="currentColor" />
              </div>
              <span className="text-base font-bold">Talent Forge</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Prove Your Skills. Get Hired. India's first AI + blockchain talent platform.
            </p>
            <div className="mt-5 flex items-center gap-3">
              {[Linkedin, Twitter, Youtube, MessageCircle].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <FooterCol
            title="Platform"
            links={[
              { label: "Assessment", to: "/assessment" },
              { label: "Marketplace", to: "/marketplace" },
              { label: "Credentials", to: "/about" },
              { label: "Sandbox Lab", to: "/about" },
            ]}
          />
          <FooterCol
            title="Company"
            links={[
              { label: "About", to: "/about" },
              { label: "Blog", to: "/about" },
              { label: "Careers", to: "/about" },
              { label: "Press", to: "/about" },
            ]}
          />
          <FooterCol
            title="Contact"
            links={[
              { label: "hello@resourceindia.co", to: "/about" },
              { label: "WhatsApp +91 98xxx xxxxx", to: "/about" },
              { label: "Book a Demo", to: "/about" },
            ]}
          />
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>© 2025 ResourceIndia.co · Talent Forge</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-foreground">Privacy Policy</a>
            <a href="#" className="hover:text-foreground">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; to: string }[] }) {
  return (
    <div>
      <h4 className="label-eyebrow text-foreground">{title}</h4>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.label}>
            <Link to={l.to} className="text-sm text-muted-foreground transition-colors hover:text-primary">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
