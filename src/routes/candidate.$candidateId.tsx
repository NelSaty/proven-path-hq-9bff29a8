import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowLeft,
  Sparkles,
  Loader2,
  BriefcaseBusiness,
  MapPin,
  Award,
  Wallet,
  Briefcase,
  Target,
} from "lucide-react";
import { toast } from "react-hot-toast";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { BadgeChip } from "@/components/ui/badge-chip";
import { candidates, type Candidate } from "@/data/mockData";

export const Route = createFileRoute("/candidate/$candidateId")({
  head: ({ params }) => ({
    meta: [
      { title: `Candidate Analysis — Talent Forge` },
      {
        name: "description",
        content: `AI-generated hiring-ready summary for candidate ${params.candidateId}.`,
      },
    ],
  }),
  loader: ({ params }): { candidate: Candidate } => {
    const id = Number(params.candidateId);
    const candidate = candidates.find((c) => c.id === id);
    if (!candidate) throw notFound();
    return { candidate };
  },
  component: CandidateAnalysisPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-xl px-6 py-20 text-center">
      <h1 className="text-2xl font-bold">Candidate not found</h1>
      <Link to="/dashboard/employer" className="mt-4 inline-block text-primary underline">
        Back to dashboard
      </Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="mx-auto max-w-xl px-6 py-20 text-center">
      <h1 className="text-2xl font-bold">Something went wrong</h1>
      <p className="mt-2 text-muted-foreground">{error.message}</p>
    </div>
  ),
});

function CandidateAnalysisPage() {
  const { candidate } = Route.useLoaderData();
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [roleContext, setRoleContext] = useState("");

  const initials = candidate.name
    .split(" ")
    .map((w) => w[0])
    .join("");

  const run = async () => {
    setLoading(true);
    setSummary(null);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/analyze-candidate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            name: candidate.name,
            domain: candidate.domain,
            tier: candidate.tier,
            skills: candidate.skills,
            tfes: candidate.tfes,
            projects: candidate.projects,
            badges: candidate.badges,
            earned: candidate.earned,
            location: candidate.location,
            roleContext: roleContext.trim() || undefined,
          }),
        }
      );

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "Analysis failed" }));
        throw new Error(err.error || `Error ${res.status}`);
      }

      const data = await res.json();
      setSummary(data.summary);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to analyze candidate");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <Link
        to="/dashboard/employer"
        className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Employer Dashboard
      </Link>

      {/* Candidate header card */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
        <div className="flex flex-wrap items-start gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-button text-lg font-bold text-primary-foreground shadow-glow">
            {initials}
          </div>
          <div className="flex-1 min-w-[200px]">
            <p className="label-eyebrow text-coral">Hiring-ready summary</p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight">
              {candidate.name}
            </h1>
            <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" /> {candidate.location}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <BadgeChip variant={candidate.tier}>{candidate.tier}</BadgeChip>
              <BadgeChip variant={candidate.domain}>{candidate.domain}</BadgeChip>
            </div>
          </div>
          <div className="rounded-xl bg-gradient-button px-4 py-2 text-center">
            <div className="text-2xl font-bold leading-none text-primary-foreground">
              {candidate.tfes}
            </div>
            <div className="mt-1 text-[10px] font-semibold tracking-widest text-primary-foreground/80">
              TFES
            </div>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-3 border-t border-border pt-4 text-xs">
          <Stat icon={Wallet} label="Earned" value={candidate.earned} />
          <Stat icon={Briefcase} label="Projects" value={String(candidate.projects)} />
          <Stat icon={Award} label="Badges" value={String(candidate.badges)} />
        </div>

        <div className="mt-5">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Verified Skills
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {candidate.skills.map((s) => (
              <span
                key={s}
                className="rounded-md bg-secondary px-2 py-0.5 text-[11px] font-medium text-secondary-foreground"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Role context + analyze */}
      <div className="mt-6 rounded-2xl border border-border bg-card p-6 shadow-card">
        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
          <Target className="mr-1 inline h-3.5 w-3.5" />
          Role you're hiring for (optional)
        </label>
        <input
          value={roleContext}
          onChange={(e) => setRoleContext(e.target.value)}
          placeholder="e.g. Embedded Firmware Engineer, 0–2 yrs, Bengaluru"
          className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
        />

        <Button
          size="lg"
          onClick={run}
          disabled={loading}
          className="mt-4 w-full bg-gradient-button text-primary-foreground shadow-glow hover:opacity-95"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Generating hiring summary…
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-5 w-5" /> Analyze Candidate
            </>
          )}
        </Button>
      </div>

      {/* Summary */}
      {summary && (
        <div className="mt-6 rounded-2xl border border-border bg-card p-6 shadow-card animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-foreground">
            <BriefcaseBusiness className="h-5 w-5 text-primary" /> Hiring-Ready Summary
          </h2>
          <div className="prose prose-sm max-w-none text-muted-foreground prose-headings:text-foreground prose-strong:text-foreground prose-li:marker:text-primary">
            <ReactMarkdown>{summary}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Wallet;
  label: string;
  value: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-1 text-muted-foreground">
        <Icon className="h-3 w-3" /> {label}
      </div>
      <div className="mt-0.5 font-semibold text-foreground">{value}</div>
    </div>
  );
}
