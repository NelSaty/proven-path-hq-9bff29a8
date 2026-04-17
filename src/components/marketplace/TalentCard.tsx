import { MapPin, Award, Briefcase, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BadgeChip } from "@/components/ui/badge-chip";
import { toast } from "react-hot-toast";
import type { Candidate } from "@/data/mockData";

export function TalentCard({ candidate }: { candidate: Candidate }) {
  const initials = candidate.name
    .split(" ")
    .map((w) => w[0])
    .join("");

  const notify = () => toast("Join the waitlist — launching soon! 🚀");

  return (
    <article className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-glow">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-button text-sm font-bold text-primary-foreground">
            {initials}
          </div>
          <div>
            <h3 className="text-base font-semibold text-foreground">{candidate.name}</h3>
            <p className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" /> {candidate.location}
            </p>
          </div>
        </div>
        <div className="rounded-xl bg-gradient-button px-3 py-1.5 text-center">
          <div className="text-lg font-bold leading-none text-primary-foreground">{candidate.tfes}</div>
          <div className="text-[9px] font-semibold tracking-widest text-primary-foreground/80">TFES</div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <BadgeChip variant={candidate.tier}>{candidate.tier}</BadgeChip>
        <BadgeChip variant={candidate.domain}>{candidate.domain}</BadgeChip>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {candidate.skills.map((s) => (
          <span
            key={s}
            className="rounded-md bg-secondary px-2 py-0.5 text-[11px] font-medium text-secondary-foreground"
          >
            {s}
          </span>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3 border-t border-border pt-4 text-xs">
        <div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Wallet className="h-3 w-3" /> Earned
          </div>
          <div className="mt-0.5 font-semibold text-foreground">{candidate.earned}</div>
        </div>
        <div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Briefcase className="h-3 w-3" /> Projects
          </div>
          <div className="mt-0.5 font-semibold text-foreground">{candidate.projects}</div>
        </div>
        <div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Award className="h-3 w-3" /> Badges
          </div>
          <div className="mt-0.5 font-semibold text-foreground">{candidate.badges}</div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2">
        <Button variant="outline" onClick={notify} className="text-xs">
          View Profile
        </Button>
        <Button onClick={notify} className="bg-gradient-button text-primary-foreground text-xs">
          Invite
        </Button>
      </div>
    </article>
  );
}
