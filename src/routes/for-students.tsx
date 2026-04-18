import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  UserPlus,
  Brain,
  Gauge,
  Trophy,
  Briefcase,
  Brain as BrainIcon,
  Gamepad2,
  Coins,
  Award,
  Bot,
  Users,
  PieChart,
  Rocket,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";

export const Route = createFileRoute("/for-students")({
  head: () => ({
    meta: [
      { title: "For Students — Talent Forge" },
      { name: "description", content: "From graduate to hired in weeks. Get AI-assessed, earn project income, build a blockchain portfolio." },
      { property: "og:title", content: "For Students — Talent Forge" },
      { property: "og:description", content: "AI assessment, project income, NFT badges, direct job matching for engineering graduates." },
    ],
  }),
  component: ForStudentsPage,
});

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
};

function ForStudentsPage() {
  const notify = () => toast("Join the waitlist — launching soon! 🚀");

  return (
    <>
      <section className="bg-gradient-hero py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <motion.h1 {...fadeUp} className="text-5xl font-extrabold tracking-tight sm:text-6xl">
            From Graduate to <span className="text-gradient">Hired</span> — In Weeks, Not Months
          </motion.h1>
          <motion.p {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }} className="mt-6 text-lg text-muted-foreground">
            Get AI-assessed, earn real project income, build a blockchain portfolio, and get matched to jobs — all in one place.
          </motion.p>
          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.2 }} className="mt-8">
            <Button asChild size="lg" className="bg-gradient-button text-primary-foreground shadow-glow">
              <Link to="/auth" search={{ mode: "signup" }}>
                Start Free Assessment <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Journey />
      <EarningsCalculator />
      <FeaturesGrid />
    </>
  );
}

function Journey() {
  const steps = [
    { icon: UserPlus, title: "Sign Up Free" },
    { icon: Brain, title: "Take AI Assessment" },
    { icon: Gauge, title: "Get TFES Score" },
    { icon: Trophy, title: "Complete Missions" },
    { icon: Briefcase, title: "Get Project + Job Matches" },
  ];

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h2 {...fadeUp} className="text-center text-4xl font-bold tracking-tight">
          Your <span className="text-gradient">5-Step Journey</span>
        </motion.h2>

        <div className="mt-14 relative">
          <div className="absolute left-0 right-0 top-7 hidden h-0.5 bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0 md:block" />
          <div className="relative grid gap-8 md:grid-cols-5">
            {steps.map((s, i) => (
              <motion.div
                key={s.title}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.08 }}
                className="flex flex-col items-center text-center"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-button text-primary-foreground shadow-glow">
                  <s.icon className="h-6 w-6" />
                </div>
                <p className="mt-3 text-xs font-bold text-primary">STEP {i + 1}</p>
                <p className="mt-1 text-sm font-semibold text-foreground">{s.title}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const tierMultiplier: Record<string, number> = {
  Explorer: 80,
  Apprentice: 180,
  Practitioner: 320,
  Expert: 600,
};
const domainMultiplier: Record<string, number> = {
  ECE: 1.0,
  Mechanical: 0.9,
  CS: 1.2,
  Business: 0.85,
};

function EarningsCalculator() {
  const [hours, setHours] = useState(15);
  const [domain, setDomain] = useState("CS");
  const [tier, setTier] = useState("Practitioner");

  const monthly = Math.round(hours * 4 * tierMultiplier[tier] * domainMultiplier[domain]);
  const projects = Math.max(1, Math.round(hours / 5));
  const avgDuration = tier === "Explorer" ? 4 : tier === "Apprentice" ? 6 : tier === "Practitioner" ? 9 : 14;

  return (
    <section className="bg-secondary/40 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.h2 {...fadeUp} className="text-center text-4xl font-bold tracking-tight">
          Calculate Your <span className="text-gradient">Earning Potential</span>
        </motion.h2>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <div className="rounded-2xl border border-border bg-card p-7 shadow-card">
            <div className="space-y-6">
              <div>
                <label className="flex items-center justify-between text-sm font-semibold">
                  <span>Hours available per week</span>
                  <span className="text-primary">{hours} hrs</span>
                </label>
                <input
                  type="range"
                  min={5}
                  max={40}
                  value={hours}
                  onChange={(e) => setHours(Number(e.target.value))}
                  className="mt-3 w-full accent-primary"
                />
              </div>

              <div>
                <label className="text-sm font-semibold">Domain</label>
                <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {Object.keys(domainMultiplier).map((d) => (
                    <button
                      key={d}
                      onClick={() => setDomain(d)}
                      className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                        domain === d
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border bg-background hover:border-primary/40"
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold">Your Tier</label>
                <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {Object.keys(tierMultiplier).map((t) => (
                    <button
                      key={t}
                      onClick={() => setTier(t)}
                      className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                        tier === t
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border bg-background hover:border-primary/40"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-gradient-dark p-7 text-white shadow-glow">
            <p className="label-eyebrow text-amber-soft">Estimated Monthly Earnings</p>
            <p className="mt-2 text-5xl font-extrabold">
              ₹{monthly.toLocaleString("en-IN")}
            </p>
            <p className="mt-1 text-sm text-white/70">based on your inputs</p>

            <div className="mt-8 space-y-4 border-t border-white/10 pt-6">
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/70">Projects available</span>
                <span className="text-lg font-bold">{projects}+</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/70">Avg project duration</span>
                <span className="text-lg font-bold">{avgDuration} days</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturesGrid() {
  const features = [
    { icon: BrainIcon, title: "Adaptive AI Assessment" },
    { icon: Gamepad2, title: "Gamified Skill Missions" },
    { icon: Coins, title: "Earn While Learning" },
    { icon: Award, title: "NFT Skill Badges" },
    { icon: Bot, title: "AI Career Coaching" },
    { icon: Users, title: "Peer Community" },
    { icon: PieChart, title: "Portfolio Dashboard" },
    { icon: Rocket, title: "Direct Job Matching" },
  ];

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h2 {...fadeUp} className="text-center text-4xl font-bold tracking-tight">
          Everything You Need to <span className="text-gradient">Stand Out</span>
        </motion.h2>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.04 }}
              className="rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-glow"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-button text-primary-foreground">
                <f.icon className="h-5 w-5" />
              </div>
              <p className="mt-4 text-sm font-semibold text-foreground">{f.title}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
