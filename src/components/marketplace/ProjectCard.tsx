import { useState } from "react";
import { Clock, Users, Wallet, Calendar, Building2, ListChecks, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BadgeChip } from "@/components/ui/badge-chip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "react-hot-toast";
import type { Project } from "@/data/mockData";

const DEFAULT_DESCRIPTION =
  "This project will be executed under Talent Forge's verified-work framework. The selected engineer will collaborate directly with the company to deliver scoped outcomes within the agreed timeline, with milestone-based escrow payouts.";

const DEFAULT_DELIVERABLES =
  "• Functional, tested deliverable matching the brief\n• Source files / repository handover\n• Brief documentation & demo walkthrough";

export function ProjectCard({ project, isNew = false }: { project: Project; isNew?: boolean }) {
  const [open, setOpen] = useState(false);

  const initials = project.company
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

  const description = project.description?.trim() || DEFAULT_DESCRIPTION;
  const deliverables = project.deliverables?.trim() || DEFAULT_DELIVERABLES;
  const deliverableLines = deliverables
    .split(/\r?\n|•/)
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <>
      <article className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-glow">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-button text-sm font-bold text-primary-foreground">
              {initials}
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">{project.company}</p>
              <p className="text-xs text-muted-foreground">{project.posted}</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1.5">
            {isNew && (
              <span className="inline-flex items-center rounded-full bg-coral/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-coral">
                New
              </span>
            )}
            <BadgeChip variant={project.tier}>{project.tier}+</BadgeChip>
          </div>
        </div>

        <h3 className="mt-4 line-clamp-2 text-base font-semibold leading-snug text-foreground">
          {project.title}
        </h3>

        <div className="mt-3 flex flex-wrap gap-2">
          <BadgeChip variant={project.domain}>{project.domain}</BadgeChip>
          {project.skills.slice(0, 3).map((s) => (
            <span
              key={s}
              className="rounded-md bg-secondary px-2 py-0.5 text-[11px] font-medium text-secondary-foreground"
            >
              {s}
            </span>
          ))}
        </div>

        <div className="mt-5 grid grid-cols-3 gap-3 border-t border-border pt-4 text-xs">
          <div className="flex flex-col gap-0.5">
            <span className="flex items-center gap-1 text-muted-foreground">
              <Wallet className="h-3 w-3" /> Budget
            </span>
            <span className="font-semibold text-foreground">{project.budget}</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-3 w-3" /> Duration
            </span>
            <span className="font-semibold text-foreground">{project.duration}</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="flex items-center gap-1 text-muted-foreground">
              <Users className="h-3 w-3" /> Applicants
            </span>
            <span className="font-semibold text-foreground">{project.applicants}</span>
          </div>
        </div>

        <Button
          onClick={() => setOpen(true)}
          className="mt-5 w-full bg-gradient-button text-primary-foreground hover:opacity-95"
        >
          Apply Now →
        </Button>
      </article>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Building2 className="h-3.5 w-3.5" />
              <span className="font-medium text-foreground">{project.company}</span>
              <span>•</span>
              <span>Posted {project.posted}</span>
              {isNew && (
                <span className="ml-1 inline-flex items-center rounded-full bg-coral/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-coral">
                  New
                </span>
              )}
            </div>
            <DialogTitle className="text-2xl leading-tight">{project.title}</DialogTitle>
            <DialogDescription className="sr-only">
              Full project details including description, deliverables, skills, tier, and budget.
            </DialogDescription>
            <div className="flex flex-wrap gap-2 pt-2">
              <BadgeChip variant={project.domain}>{project.domain}</BadgeChip>
              <BadgeChip variant={project.tier}>{project.tier}+</BadgeChip>
            </div>
          </DialogHeader>

          <div className="grid grid-cols-3 gap-3 rounded-xl border border-border bg-secondary/40 p-4 text-xs">
            <div className="flex flex-col gap-1">
              <span className="flex items-center gap-1 text-muted-foreground">
                <Wallet className="h-3.5 w-3.5" /> Budget
              </span>
              <span className="font-semibold text-foreground">{project.budget}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="flex items-center gap-1 text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" /> Duration
              </span>
              <span className="font-semibold text-foreground">{project.duration}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="flex items-center gap-1 text-muted-foreground">
                <Users className="h-3.5 w-3.5" /> Applicants
              </span>
              <span className="font-semibold text-foreground">{project.applicants}</span>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <FileText className="h-4 w-4 text-primary" /> Project Description
            </h4>
            <p className="whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <ListChecks className="h-4 w-4 text-primary" /> Deliverables
            </h4>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              {deliverableLines.map((line, i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-foreground">Required Skills</h4>
            <div className="flex flex-wrap gap-2">
              {project.skills.map((s) => (
                <span
                  key={s}
                  className="rounded-md bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Close
            </Button>
            <Button
              onClick={() => {
                toast.success("Application submitted! The employer will review shortly. 🚀");
                setOpen(false);
              }}
              className="bg-gradient-button text-primary-foreground hover:opacity-95"
            >
              Submit Application →
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
