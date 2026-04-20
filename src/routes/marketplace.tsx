import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { ProjectCard } from "@/components/marketplace/ProjectCard";
import { TalentCard } from "@/components/marketplace/TalentCard";
import { projects as seedProjects, candidates, type Project } from "@/data/mockData";
import { cn } from "@/lib/utils";

type PostedProject = {
  id: number;
  title: string;
  domain: string;
  tier: string;
  duration: string;
  budgetMin: number;
  budgetMax: number;
  skills: string[];
  description?: string;
  posted?: string;
  applicants?: number;
};

function formatINR(n: number) {
  return `₹${n.toLocaleString("en-IN")}`;
}

function toMarketplaceProject(p: PostedProject): Project {
  return {
    id: p.id,
    title: p.title,
    domain: p.domain,
    budget: `${formatINR(p.budgetMin)}–${formatINR(p.budgetMax)}`,
    budgetMin: p.budgetMin,
    duration: p.duration,
    tier: p.tier,
    skills: Array.isArray(p.skills) ? p.skills : [],
    applicants: p.applicants ?? 0,
    company: "Your Company",
    posted: p.posted ?? "just now",
  };
}

export const Route = createFileRoute("/marketplace")({
  head: () => ({
    meta: [
      { title: "Marketplace — Talent Forge" },
      { name: "description", content: "Browse skill-verified projects and engineers across India. AI-matched, escrow-protected, blockchain-credentialed." },
      { property: "og:title", content: "Marketplace — Talent Forge" },
      { property: "og:description", content: "Live marketplace of engineering projects and verified talent." },
    ],
  }),
  component: MarketplacePage,
});

const filters = ["All", "ECE", "EEE", "Mechanical", "CS", "Business"] as const;
type Filter = (typeof filters)[number];

function MarketplacePage() {
  const [tab, setTab] = useState<"projects" | "talent">("projects");
  const [filter, setFilter] = useState<Filter>("All");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("Newest");
  const [budget, setBudget] = useState(500000);

  const filteredProjects = useMemo(() => {
    let r = projects.filter((p) => filter === "All" || p.domain === filter);
    if (query) {
      const q = query.toLowerCase();
      r = r.filter((p) => p.title.toLowerCase().includes(q) || p.skills.some((s) => s.toLowerCase().includes(q)));
    }
    r = r.filter((p) => p.budgetMin <= budget);
    if (sort === "Highest Pay") r = [...r].sort((a, b) => b.budgetMin - a.budgetMin);
    return r;
  }, [filter, query, sort, budget]);

  const filteredCandidates = useMemo(() => {
    let r = candidates.filter((c) => filter === "All" || c.domain === filter);
    if (query) {
      const q = query.toLowerCase();
      r = r.filter((c) => c.name.toLowerCase().includes(q) || c.skills.some((s) => s.toLowerCase().includes(q)));
    }
    return r;
  }, [filter, query]);

  return (
    <section className="py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Talent Forge <span className="text-gradient">Marketplace</span>
          </h1>
          <p className="mt-2 text-muted-foreground">Live projects and verified engineers — matched by AI in 48 hours.</p>
        </div>

        <div className="mb-6 inline-flex rounded-xl border border-border bg-card p-1 shadow-card">
          {(["projects", "talent"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "rounded-lg px-5 py-2 text-sm font-semibold capitalize transition-all",
                tab === t ? "bg-gradient-button text-primary-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="sticky top-16 z-30 rounded-2xl border border-border bg-card/80 p-4 shadow-card backdrop-blur-md">
          <div className="grid gap-3 lg:grid-cols-[1fr_auto_auto]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects or skills..."
                className="w-full rounded-lg border border-border bg-background py-2.5 pl-10 pr-3 text-sm focus:border-primary focus:outline-none"
              />
            </div>
            <div className={cn(tab !== "projects" && "invisible pointer-events-none")} aria-hidden={tab !== "projects"}>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="h-full w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm font-medium focus:border-primary focus:outline-none"
              >
                <option>Newest</option>
                <option>Highest Pay</option>
                <option>Best Match</option>
              </select>
            </div>
            <div className={cn("flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm", tab !== "projects" && "invisible pointer-events-none")} aria-hidden={tab !== "projects"}>
              <span className="text-xs font-semibold text-muted-foreground whitespace-nowrap">Up to ₹{(budget / 1000).toFixed(0)}K</span>
              <input
                type="range"
                min={5000}
                max={500000}
                step={5000}
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-32 accent-primary"
              />
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "rounded-full border px-3 py-1 text-xs font-semibold transition-all",
                  filter === f
                    ? "border-primary bg-gradient-button text-primary-foreground shadow-glow"
                    : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground",
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8">
          {tab === "projects" ? (
            filteredProjects.length === 0 ? (
              <EmptyState key="empty-projects" />
            ) : (
              <div key="grid-projects" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProjects.map((p) => <ProjectCard key={`p-${p.id}`} project={p} />)}
              </div>
            )
          ) : filteredCandidates.length === 0 ? (
            <EmptyState key="empty-talent" />
          ) : (
            <div key="grid-talent" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredCandidates.map((c) => <TalentCard key={`c-${c.id}`} candidate={c} />)}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function EmptyState() {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-card p-16 text-center">
      <p className="text-2xl font-bold">No matches found</p>
      <p className="mt-2 text-muted-foreground">Try adjusting your filters or search query.</p>
    </div>
  );
}
