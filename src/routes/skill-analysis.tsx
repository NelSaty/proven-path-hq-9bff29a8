import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { BrainCircuit, Sparkles, Loader2, ArrowLeft } from "lucide-react";
import { toast } from "react-hot-toast";
import ReactMarkdown from "react-markdown";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { BadgeChip } from "@/components/ui/badge-chip";

export const Route = createFileRoute("/skill-analysis")({
  head: () => ({
    meta: [
      { title: "AI Skill Analyzer — Talent Forge" },
      {
        name: "description",
        content:
          "Get AI-powered insights on your skill portfolio with personalized recommendations.",
      },
    ],
  }),
  component: SkillAnalysisPage,
});

function SkillAnalysisPage() {
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
        <BrainCircuit className="h-16 w-16 text-primary/40" />
        <h2 className="text-2xl font-bold text-foreground">Sign in to analyze your skills</h2>
        <p className="max-w-md text-muted-foreground">
          Create a profile with your skills, then let AI analyze your portfolio and suggest improvements.
        </p>
        <Button
          className="bg-gradient-button text-primary-foreground shadow-glow"
          onClick={() => navigate({ to: "/auth", search: { mode: "signup" } })}
        >
          Get Started Free
        </Button>
      </div>
    );
  }

  const hasSkills = profile?.skills && profile.skills.length > 0;

  const runAnalysis = async () => {
    setAnalyzing(true);
    setAnalysis(null);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/analyze-skills`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            skills: profile?.skills ?? [],
            bio: profile?.bio ?? "",
            domain: profile?.domain ?? "",
            tier: profile?.tier ?? "Apprentice",
            fullName: profile?.full_name ?? "",
          }),
        }
      );

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "Analysis failed" }));
        throw new Error(err.error || `Error ${res.status}`);
      }

      const data = await res.json();
      setAnalysis(data.analysis);
    } catch (e: any) {
      toast.error(e.message || "Failed to analyze skills");
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      {/* Header */}
      <div className="mb-8">
        <Link
          to="/profile"
          className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Profile
        </Link>
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-button shadow-glow">
            <BrainCircuit className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">AI Skill Analyzer</h1>
            <p className="text-sm text-muted-foreground">
              Get personalized portfolio insights powered by AI
            </p>
          </div>
        </div>
      </div>

      {/* Current Skills Card */}
      <div className="mb-6 rounded-2xl border border-border bg-card p-6 shadow-card">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Your Current Skills
        </h2>
        {hasSkills ? (
          <div className="flex flex-wrap gap-2">
            {profile!.skills!.map((s) => (
              <BadgeChip key={s}>{s}</BadgeChip>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            No skills added yet.{" "}
            <Link to="/profile" className="text-primary underline">
              Add some on your profile
            </Link>{" "}
            for a better analysis.
          </p>
        )}

        {profile?.domain && (
          <p className="mt-3 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Domain:</span> {profile.domain}
          </p>
        )}
        {profile?.tier && (
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Tier:</span> {profile.tier}
          </p>
        )}
      </div>

      {/* Analyze Button */}
      <Button
        size="lg"
        className="mb-8 w-full bg-gradient-button text-primary-foreground shadow-glow hover:opacity-95"
        onClick={runAnalysis}
        disabled={analyzing}
      >
        {analyzing ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Analyzing your portfolio…
          </>
        ) : (
          <>
            <Sparkles className="mr-2 h-5 w-5" /> Analyze My Skills
          </>
        )}
      </Button>

      {/* Results */}
      {analysis && (
        <div className="rounded-2xl border border-border bg-card p-6 shadow-card animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-foreground">
            <Sparkles className="h-5 w-5 text-primary" /> AI Analysis
          </h2>
          <div className="prose prose-sm prose-invert max-w-none text-muted-foreground prose-headings:text-foreground prose-strong:text-foreground prose-li:marker:text-primary">
            <ReactMarkdown>{analysis}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}
