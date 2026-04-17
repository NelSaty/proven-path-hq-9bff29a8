import { createFileRoute, Link } from "@tanstack/react-router";
import { Home, Target, Briefcase, Gauge, Trophy, Wallet, Users, Settings, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { DashboardSidebar, type SidebarItem } from "@/components/dashboard/DashboardSidebar";
import { TFESGauge } from "@/components/ui/tfes-gauge";
import { BadgeChip } from "@/components/ui/badge-chip";
import { Button } from "@/components/ui/button";
import { missions, projects } from "@/data/mockData";
import { ProjectCard } from "@/components/marketplace/ProjectCard";
import { toast } from "react-hot-toast";

export const Route = createFileRoute("/dashboard/student")({
  head: () => ({
    meta: [
      { title: "Student Dashboard — Talent Forge" },
      { name: "description", content: "Track your TFES score, active missions, projects, and earnings." },
    ],
  }),
  component: StudentDashboard,
});

const items: SidebarItem[] = [
  { label: "Home", to: "/dashboard/student", icon: Home },
  { label: "My Missions", to: "/dashboard/student", icon: Target },
  { label: "My Projects", to: "/dashboard/student", icon: Briefcase },
  { label: "My Score", to: "/dashboard/student", icon: Gauge },
  { label: "My Badges", to: "/dashboard/student", icon: Trophy },
  { label: "Earnings", to: "/dashboard/student", icon: Wallet },
  { label: "Community", to: "/dashboard/student", icon: Users },
  { label: "Settings", to: "/dashboard/student", icon: Settings },
];

function StudentDashboard() {
  const notify = () => toast("Join the waitlist — launching soon! 🚀");

  return (
    <div className="flex">
      <DashboardSidebar items={items} brand="Arjun K." subtitle="Practitioner · L3" />

      <main className="flex-1 px-4 py-8 sm:px-6 lg:px-10">
        <div className="mb-8">
          <p className="label-eyebrow text-coral">Dashboard</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight">Welcome back, <span className="text-gradient">Arjun</span></h1>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-card flex items-center gap-4">
            <TFESGauge score={82} size={88} />
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">TFES Score</p>
              <p className="text-2xl font-extrabold">82<span className="text-base text-muted-foreground">/100</span></p>
            </div>
          </div>
          <StatCard label="Total Earned" value="₹47,500" accent="success" />
          <StatCard label="Projects Completed" value="14" />
          <StatCard label="Badges Earned" value="6" accent="primary" />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">Active Missions</h2>
              <Link to="/marketplace" className="text-xs font-semibold text-primary hover:underline">View all →</Link>
            </div>
            <div className="mt-4 space-y-3">
              {missions.map((m) => (
                <div key={m.id} className="rounded-xl border border-border bg-secondary/40 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-semibold text-foreground">{m.title}</h3>
                      <p className="mt-0.5 text-xs text-muted-foreground">Due in {m.due} · +{m.xp} XP · {m.reward}</p>
                    </div>
                    <Button onClick={notify} size="sm" className="bg-gradient-button text-primary-foreground">
                      Continue →
                    </Button>
                  </div>
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-background">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${m.progress}%` }} transition={{ duration: 1 }} className="h-full bg-gradient-button" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <p className="text-xs font-bold uppercase tracking-widest text-coral">Level Progress</p>
              <p className="mt-1 font-bold text-foreground">Practitioner → Expert</p>
              <div className="mt-4">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-muted-foreground">3,400 / 5,000 XP</span>
                  <span className="text-primary">68%</span>
                </div>
                <div className="mt-2 h-3 overflow-hidden rounded-full bg-secondary">
                  <motion.div initial={{ width: 0 }} animate={{ width: "68%" }} transition={{ duration: 1.2 }} className="h-full bg-gradient-button" />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-amber-soft/40 bg-[oklch(0.96_0.04_75)] p-6 shadow-card">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Recent NFT Badge</p>
              <div className="mt-3 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-button text-2xl shadow-glow">🏆</div>
                <div>
                  <p className="font-bold text-foreground">Circuit Simulation Pro</p>
                  <a href="#" className="text-xs font-semibold text-primary hover:underline">View on Polygon →</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold flex items-center gap-2"><Sparkles className="h-4 w-4 text-primary" /> Recommended for you</h2>
            <Link to="/marketplace" className="text-xs font-semibold text-primary hover:underline flex items-center gap-1">Browse marketplace <ArrowRight className="h-3 w-3" /></Link>
          </div>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {projects.slice(0, 3).map((p) => (
              <div key={p.id} className="relative">
                <div className="absolute -top-2 -right-2 z-10 rounded-full bg-gradient-button px-2.5 py-1 text-[10px] font-bold text-primary-foreground shadow-glow">
                  AI Match 94%
                </div>
                <ProjectCard project={p} />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({ label, value, accent }: { label: string; value: string; accent?: "primary" | "success" }) {
  const cls = accent === "success" ? "text-success" : accent === "primary" ? "text-primary" : "text-foreground";
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
      <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className={`mt-2 text-3xl font-extrabold ${cls}`}>{value}</p>
    </div>
  );
}
