import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Home, ClipboardList, Users, BarChart3, CreditCard, Settings, Calendar, IndianRupee, Sparkles } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { DashboardSidebar, type SidebarItem } from "@/components/dashboard/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { BadgeChip } from "@/components/ui/badge-chip";
import { TalentCard } from "@/components/marketplace/TalentCard";
import { candidates, spendData } from "@/data/mockData";
import { toast } from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type PostedProject = {
  id: number;
  title: string;
  domain?: string;
  tier?: string;
  duration?: string;
  budgetMin: number;
  budgetMax: number;
  skills?: string[];
  description?: string;
  deliverables?: string;
  status: string;
  applicants: number;
  posted: string;
};

type ProjectRow = {
  id: string;
  name: string;
  budget: string;
  applicants: number;
  status: string;
  isNew?: boolean;
  detail?: PostedProject;
};

const formatINR = (n: number) =>
  new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(n);

export const Route = createFileRoute("/dashboard/employer")({
  head: () => ({
    meta: [
      { title: "Employer Dashboard — Talent Forge" },
      { name: "description", content: "Manage projects, review verified candidates, and track hiring ROI." },
    ],
  }),
  component: EmployerDashboard,
});

const items: SidebarItem[] = [
  { label: "Overview", to: "/dashboard/employer", icon: Home },
  { label: "My Projects", to: "/dashboard/employer", icon: ClipboardList },
  { label: "Candidates", to: "/dashboard/employer", icon: Users },
  { label: "Analytics", to: "/dashboard/employer", icon: BarChart3 },
  { label: "Billing", to: "/dashboard/employer", icon: CreditCard },
  { label: "Settings", to: "/dashboard/employer", icon: Settings },
];

const seedRows: ProjectRow[] = [
  { id: "seed-1", name: "ESP32 IoT Dashboard", budget: "₹22,000", applicants: 12, status: "Active" },
  { id: "seed-2", name: "ML Churn Prediction", budget: "₹35,000", applicants: 18, status: "In Review" },
  { id: "seed-3", name: "React HR Dashboard", budget: "₹28,000", applicants: 9, status: "Completed" },
];

const statusColors: Record<string, string> = {
  Active: "Practitioner",
  "In Review": "ECE",
  Completed: "Apprentice",
};

function EmployerDashboard() {
  const notify = () => toast("Join the waitlist — launching soon! 🚀");
  const [posted, setPosted] = useState<ProjectRow[]>([]);
  const [selected, setSelected] = useState<PostedProject | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("tf_projects");
      if (!raw) return;
      const parsed: PostedProject[] = JSON.parse(raw);
      const rows: ProjectRow[] = parsed.map((p) => ({
        id: `posted-${p.id}`,
        name: p.title,
        budget: `₹${formatINR(p.budgetMin)}–₹${formatINR(p.budgetMax)}`,
        applicants: p.applicants ?? 0,
        status: p.status ?? "Active",
        isNew: true,
        detail: p,
      }));
      setPosted(rows);
    } catch {
      /* ignore */
    }
  }, []);

  const allRows: ProjectRow[] = [...posted, ...seedRows];
  const activeCount = allRows.filter((r) => r.status === "Active").length;

  return (
    <div className="flex">
      <DashboardSidebar items={items} brand="AutoSense Labs" subtitle="Pune · Series A" />

      <main className="flex-1 px-4 py-8 sm:px-6 lg:px-10">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="label-eyebrow text-coral">Employer Dashboard</p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight">Hiring <span className="text-gradient">Overview</span></h1>
          </div>
          <Button asChild className="bg-gradient-button text-primary-foreground shadow-glow">
            <Link to="/post-project">+ Post New Project</Link>
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Stat label="Active Projects" value={String(activeCount)} />
          <Stat label="Candidates in Pipeline" value="47" accent="primary" />
          <Stat label="Projects Completed" value="18" />
          <Stat label="Total Spend" value="₹3,24,000" accent="success" />
        </div>

        <div className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-card">
          <h2 className="text-lg font-bold">Active Projects</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="px-3 py-2 font-semibold text-muted-foreground">Project</th>
                  <th className="px-3 py-2 font-semibold text-muted-foreground">Budget</th>
                  <th className="px-3 py-2 font-semibold text-muted-foreground">Applicants</th>
                  <th className="px-3 py-2 font-semibold text-muted-foreground">Status</th>
                  <th className="px-3 py-2"></th>
                </tr>
              </thead>
              <tbody>
                {allRows.map((p) => (
                  <tr key={p.id} className="border-b border-border/60 last:border-0">
                    <td className="px-3 py-3 font-semibold text-foreground">
                      <div className="flex items-center gap-2">
                        <span>{p.name}</span>
                        {p.isNew && (
                          <span className="rounded-full bg-gradient-button px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary-foreground">
                            New
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-3 py-3">{p.budget}</td>
                    <td className="px-3 py-3">{p.applicants}</td>
                    <td className="px-3 py-3"><BadgeChip variant={statusColors[p.status]}>{p.status}</BadgeChip></td>
                    <td className="px-3 py-3 text-right">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => (p.detail ? setSelected(p.detail) : notify())}
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <h2 className="text-lg font-bold">Spend Analytics</h2>
            <p className="text-sm text-muted-foreground">Monthly hiring spend vs industry average</p>
            <div className="mt-4 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={spendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.01 295)" />
                  <XAxis dataKey="month" stroke="oklch(0.5 0.03 290)" fontSize={12} />
                  <YAxis stroke="oklch(0.5 0.03 290)" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      background: "oklch(1 0 0)",
                      border: "1px solid oklch(0.92 0.01 295)",
                      borderRadius: 12,
                      fontSize: 12,
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Line type="monotone" dataKey="industry" name="Industry Avg" stroke="oklch(0.72 0.17 25)" strokeWidth={2} />
                  <Line type="monotone" dataKey="talentForge" name="Talent Forge" stroke="oklch(0.55 0.22 295)" strokeWidth={3} />
                  <Line type="monotone" dataKey="savings" name="Savings" stroke="oklch(0.65 0.15 155)" strokeWidth={2} strokeDasharray="4 4" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <h2 className="text-lg font-bold">Top Matched Candidates</h2>
            <div className="mt-4 space-y-4">
              {candidates.slice(0, 3).map((c) => (
                <div key={c.id} className="flex items-center gap-3 rounded-xl border border-border p-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-button text-xs font-bold text-primary-foreground">
                    {c.name.split(" ").map((w) => w[0]).join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate">{c.name}</p>
                    <p className="text-xs text-muted-foreground">{c.tier} · {c.domain}</p>
                  </div>
                  <div className="rounded-lg bg-gradient-button px-2 py-1 text-xs font-bold text-primary-foreground">{c.tfes}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-lg font-bold">Recommended Talent Pool</h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {candidates.map((c) => <TalentCard key={c.id} candidate={c} />)}
          </div>
        </div>
      </main>

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-2xl">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selected.title}</DialogTitle>
                <DialogDescription>
                  Posted {selected.posted} · {selected.applicants} applicants
                </DialogDescription>
              </DialogHeader>

              <div className="flex flex-wrap gap-2">
                {selected.domain && <BadgeChip variant="ECE">{selected.domain}</BadgeChip>}
                {selected.tier && <BadgeChip variant={selected.tier}>{selected.tier}</BadgeChip>}
                <BadgeChip variant={statusColors[selected.status]}>{selected.status}</BadgeChip>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <DetailStat icon={IndianRupee} label="Budget" value={`₹${formatINR(selected.budgetMin)}–₹${formatINR(selected.budgetMax)}`} />
                <DetailStat icon={Calendar} label="Duration" value={selected.duration ?? "—"} />
                <DetailStat icon={Sparkles} label="Skills" value={`${selected.skills?.length ?? 0} required`} />
              </div>

              {selected.skills && selected.skills.length > 0 && (
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Skills</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selected.skills.map((s) => (
                      <span key={s} className="rounded-full bg-secondary px-3 py-1 text-xs font-medium">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selected.description && (
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Description</p>
                  <p className="mt-1 whitespace-pre-wrap text-sm text-foreground">{selected.description}</p>
                </div>
              )}

              {selected.deliverables && (
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Deliverables</p>
                  <p className="mt-1 whitespace-pre-wrap text-sm text-foreground">{selected.deliverables}</p>
                </div>
              )}

              <div className="flex justify-end gap-2 border-t border-border pt-4">
                <Button variant="outline" onClick={() => setSelected(null)}>Close</Button>
                <Button
                  className="bg-gradient-button text-primary-foreground shadow-glow"
                  onClick={notify}
                >
                  View Applicants
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function DetailStat({ icon: Icon, label, value }: { icon: typeof Calendar; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border p-3">
      <div className="flex items-center gap-1.5 text-muted-foreground">
        <Icon className="h-3.5 w-3.5" />
        <p className="text-[11px] font-bold uppercase tracking-widest">{label}</p>
      </div>
      <p className="mt-1 text-sm font-semibold text-foreground">{value}</p>
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: "primary" | "success" }) {
  const cls = accent === "success" ? "text-success" : accent === "primary" ? "text-primary" : "text-foreground";
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
      <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className={`mt-2 text-3xl font-extrabold ${cls}`}>{value}</p>
    </div>
  );
}
