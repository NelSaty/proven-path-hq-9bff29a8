import { Clock, Users, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BadgeChip } from "@/components/ui/badge-chip";
import { toast } from "react-hot-toast";
import type { Project } from "@/data/mockData";

export function ProjectCard({ project }: { project: Project }) {
  const initials = project.company
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

  return (
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
        <BadgeChip variant={project.tier}>{project.tier}+</BadgeChip>
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
        onClick={() => toast("Join the waitlist — launching soon! 🚀")}
        className="mt-5 w-full bg-gradient-button text-primary-foreground hover:opacity-95"
      >
        Apply Now →
      </Button>
    </article>
  );
}
