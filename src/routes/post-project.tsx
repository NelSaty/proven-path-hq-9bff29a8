import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { ArrowLeft, Briefcase, IndianRupee, Calendar, Sparkles, X } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BadgeChip } from "@/components/ui/badge-chip";

export const Route = createFileRoute("/post-project")({
  head: () => ({
    meta: [
      { title: "Post a Project — Talent Forge" },
      {
        name: "description",
        content:
          "Post a project on Talent Forge and get matched with verified, work-ready talent across engineering and business domains.",
      },
    ],
  }),
  component: PostProjectPage,
});

const domains = ["ECE", "EEE", "Mechanical", "CS", "Business", "AI / Data"] as const;
const tiers = ["Apprentice", "Practitioner", "Expert", "Master"] as const;
const durations = ["3 days", "5 days", "7 days", "10 days", "14 days", "21 days", "30 days"] as const;

const projectSchema = z.object({
  title: z
    .string()
    .trim()
    .min(8, "Title must be at least 8 characters")
    .max(120, "Title must be under 120 characters"),
  domain: z.enum(domains, { message: "Select a domain" }),
  tier: z.enum(tiers, { message: "Select a tier" }),
  duration: z.enum(durations, { message: "Select duration" }),
  budgetMin: z
    .number({ message: "Enter minimum budget" })
    .int()
    .positive("Budget must be positive")
    .max(10_000_000, "Budget too large"),
  budgetMax: z
    .number({ message: "Enter maximum budget" })
    .int()
    .positive("Budget must be positive")
    .max(10_000_000, "Budget too large"),
  skills: z
    .array(z.string().trim().min(1).max(40))
    .min(1, "Add at least one skill")
    .max(10, "Up to 10 skills only"),
  description: z
    .string()
    .trim()
    .min(30, "Describe the project in at least 30 characters")
    .max(2000, "Description must be under 2000 characters"),
  deliverables: z
    .string()
    .trim()
    .min(10, "List at least one deliverable")
    .max(1000, "Deliverables must be under 1000 characters"),
});

function PostProjectPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [domain, setDomain] = useState<string>("");
  const [tier, setTier] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [budgetMin, setBudgetMin] = useState("");
  const [budgetMax, setBudgetMax] = useState("");
  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [deliverables, setDeliverables] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const addSkill = () => {
    const s = skillInput.trim();
    if (!s) return;
    if (skills.includes(s)) {
      setSkillInput("");
      return;
    }
    if (skills.length >= 10) {
      toast.error("Maximum 10 skills");
      return;
    }
    setSkills([...skills, s]);
    setSkillInput("");
  };

  const removeSkill = (s: string) => setSkills(skills.filter((x) => x !== s));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const parsed = projectSchema.safeParse({
      title,
      domain,
      tier,
      duration,
      budgetMin: Number(budgetMin),
      budgetMax: Number(budgetMax),
      skills,
      description,
      deliverables,
    });

    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please fix the form");
      return;
    }

    if (parsed.data.budgetMax < parsed.data.budgetMin) {
      toast.error("Max budget must be greater than min budget");
      return;
    }

    setSubmitting(true);
    // Mock submission — store locally so the dashboard could read it later
    try {
      const existing = JSON.parse(localStorage.getItem("tf_projects") ?? "[]");
      const next = [
        {
          ...parsed.data,
          id: Date.now(),
          posted: "just now",
          applicants: 0,
          status: "Active",
        },
        ...existing,
      ];
      localStorage.setItem("tf_projects", JSON.stringify(next));
    } catch {
      /* ignore */
    }

    setTimeout(() => {
      setSubmitting(false);
      toast.success("Project posted! Matching talent now ✨");
      navigate({ to: "/dashboard/employer" });
    }, 600);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <Button asChild variant="ghost" size="sm" className="mb-4 -ml-2">
          <Link to="/dashboard/employer">
            <ArrowLeft className="h-4 w-4" />
            Back to dashboard
          </Link>
        </Button>

        <div className="mb-8">
          <p className="label-eyebrow text-coral">Employer · New Project</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
            Post a <span className="text-gradient">Project</span>
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Describe what you need built. We'll match you with tier-verified talent within hours.
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="space-y-6 rounded-2xl border border-border bg-card p-6 shadow-card sm:p-8"
        >
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-primary" />
              Project Title
            </Label>
            <Input
              id="title"
              placeholder="e.g. ESP32 IoT Dashboard for Factory Monitoring"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={120}
              required
            />
            <p className="text-xs text-muted-foreground">{title.length}/120</p>
          </div>

          {/* Domain + Tier */}
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="domain">Domain</Label>
              <Select value={domain} onValueChange={setDomain}>
                <SelectTrigger id="domain">
                  <SelectValue placeholder="Select domain" />
                </SelectTrigger>
                <SelectContent>
                  {domains.map((d) => (
                    <SelectItem key={d} value={d}>
                      {d}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tier">Required Tier</Label>
              <Select value={tier} onValueChange={setTier}>
                <SelectTrigger id="tier">
                  <SelectValue placeholder="Select tier" />
                </SelectTrigger>
                <SelectContent>
                  {tiers.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Budget + Duration */}
          <div className="grid gap-5 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="budgetMin" className="flex items-center gap-2">
                <IndianRupee className="h-4 w-4 text-primary" />
                Budget Min (₹)
              </Label>
              <Input
                id="budgetMin"
                type="number"
                inputMode="numeric"
                min={0}
                placeholder="15000"
                value={budgetMin}
                onChange={(e) => setBudgetMin(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="budgetMax" className="flex items-center gap-2">
                <IndianRupee className="h-4 w-4 text-primary" />
                Budget Max (₹)
              </Label>
              <Input
                id="budgetMax"
                type="number"
                inputMode="numeric"
                min={0}
                placeholder="25000"
                value={budgetMax}
                onChange={(e) => setBudgetMax(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration" className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                Duration
              </Label>
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger id="duration">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {durations.map((d) => (
                    <SelectItem key={d} value={d}>
                      {d}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Skills */}
          <div className="space-y-2">
            <Label htmlFor="skills" className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              Required Skills
            </Label>
            <div className="flex gap-2">
              <Input
                id="skills"
                placeholder="Type a skill and press Enter (e.g. ESP32)"
                value={skillInput}
                maxLength={40}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === ",") {
                    e.preventDefault();
                    addSkill();
                  }
                }}
              />
              <Button type="button" variant="outline" onClick={addSkill}>
                Add
              </Button>
            </div>
            {skills.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {skills.map((s) => (
                  <span
                    key={s}
                    className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-foreground"
                  >
                    {s}
                    <button
                      type="button"
                      onClick={() => removeSkill(s)}
                      className="rounded-full p-0.5 hover:bg-background"
                      aria-label={`Remove ${s}`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
            <p className="text-xs text-muted-foreground">{skills.length}/10 skills</p>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Project Description</Label>
            <Textarea
              id="description"
              placeholder="What needs to be built? Provide context, goals, and constraints."
              rows={5}
              maxLength={2000}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <p className="text-xs text-muted-foreground">{description.length}/2000</p>
          </div>

          {/* Deliverables */}
          <div className="space-y-2">
            <Label htmlFor="deliverables">Deliverables</Label>
            <Textarea
              id="deliverables"
              placeholder="e.g. Working firmware, schematic PDF, demo video, GitHub repo"
              rows={3}
              maxLength={1000}
              value={deliverables}
              onChange={(e) => setDeliverables(e.target.value)}
              required
            />
            <p className="text-xs text-muted-foreground">{deliverables.length}/1000</p>
          </div>

          {/* Preview chips */}
          {(domain || tier) && (
            <div className="flex flex-wrap gap-2 rounded-xl border border-dashed border-border p-3">
              <span className="text-xs font-semibold text-muted-foreground">Preview:</span>
              {domain && <BadgeChip variant="ECE">{domain}</BadgeChip>}
              {tier && <BadgeChip variant={tier}>{tier}</BadgeChip>}
              {duration && <BadgeChip>{duration}</BadgeChip>}
            </div>
          )}

          <div className="flex flex-col-reverse gap-3 border-t border-border pt-6 sm:flex-row sm:justify-end">
            <Button asChild type="button" variant="outline">
              <Link to="/dashboard/employer">Cancel</Link>
            </Button>
            <Button
              type="submit"
              disabled={submitting}
              className="bg-gradient-button text-primary-foreground shadow-glow hover:opacity-95"
            >
              {submitting ? "Posting…" : "Post Project"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
