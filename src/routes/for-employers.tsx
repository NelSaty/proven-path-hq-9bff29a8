import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, FileText, ClipboardCheck, ShieldCheck, TrendingUp, Clock, Wallet, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";

export const Route = createFileRoute("/for-employers")({
  head: () => ({
    meta: [
      { title: "For Employers — Talent Forge" },
      { name: "description", content: "Stop interviewing. Start verifying. Access India's largest pool of AI-assessed, blockchain-verified engineering talent." },
      { property: "og:title", content: "For Employers — Talent Forge" },
      { property: "og:description", content: "Skill-verified, blockchain-credentialed engineers matched to your projects in 48 hours." },
    ],
  }),
  component: ForEmployersPage,
});

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
};

function ForEmployersPage() {
  const notify = () => toast("Join the waitlist — launching soon! 🚀");

  return (
    <>
      <section className="bg-gradient-hero py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <motion.h1 {...fadeUp} className="text-5xl font-extrabold tracking-tight sm:text-6xl">
            Stop Interviewing. <span className="text-gradient">Start Verifying.</span>
          </motion.h1>
          <motion.p {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }} className="mt-6 text-lg text-muted-foreground">
            Access India's largest pool of AI-assessed, blockchain-verified engineering talent. Post a project and get matched candidates in 48 hours.
          </motion.p>
          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.2 }} className="mt-8 flex flex-wrap justify-center gap-3">
            <Button size="lg" onClick={notify} className="bg-gradient-button text-primary-foreground shadow-glow">
              Post a Project Free <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" onClick={notify}>Book a Demo</Button>
          </motion.div>
        </div>
      </section>

      <ROICalculator />
      <HowHiringWorks />
      <TrustSignals />
    </>
  );
}

function ROICalculator() {
  const [hires, setHires] = useState(8);
  const [costPerHire, setCostPerHire] = useState(40000);

  const annualHires = hires * 4;
  const currentSpend = annualHires * costPerHire;
  const tfSpend = Math.round(currentSpend * 0.35);
  const savings = currentSpend - tfSpend;

  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.h2 {...fadeUp} className="text-center text-4xl font-bold tracking-tight">
          See Your <span className="text-gradient">Hiring ROI</span>
        </motion.h2>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
          <div className="rounded-2xl border border-border bg-card p-7 shadow-card">
            <div className="space-y-6">
              <div>
                <label className="flex items-center justify-between text-sm font-semibold">
                  <span>Hires per quarter</span>
                  <span className="text-primary">{hires}</span>
                </label>
                <input
                  type="range" min={1} max={50} value={hires}
                  onChange={(e) => setHires(Number(e.target.value))}
                  className="mt-3 w-full accent-primary"
                />
              </div>
              <div>
                <label className="text-sm font-semibold">Current cost per hire (₹)</label>
                <input
                  type="number"
                  value={costPerHire}
                  onChange={(e) => setCostPerHire(Math.max(0, Number(e.target.value)))}
                  className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 text-base font-semibold focus:border-primary focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Stat label="Current annual hiring spend" value={`₹${currentSpend.toLocaleString("en-IN")}`} muted />
            <Stat label="With Talent Forge" value={`₹${tfSpend.toLocaleString("en-IN")}`} accent="primary" />
            <Stat label="Annual savings" value={`₹${savings.toLocaleString("en-IN")}`} accent="success" big />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value, muted, accent, big }: { label: string; value: string; muted?: boolean; accent?: "primary" | "success"; big?: boolean }) {
  const valueClass = accent === "success"
    ? "text-success"
    : accent === "primary"
    ? "text-primary"
    : muted ? "text-muted-foreground" : "text-foreground";
  return (
    <div className={`rounded-2xl border ${accent === "success" ? "border-success/30 bg-[oklch(0.95_0.05_155)]" : "border-border bg-card"} p-5 shadow-card`}>
      <p className="text-sm font-semibold text-muted-foreground">{label}</p>
      <p className={`mt-1 font-extrabold tracking-tight ${valueClass} ${big ? "text-4xl" : "text-2xl"}`}>{value}</p>
    </div>
  );
}

function HowHiringWorks() {
  const steps = [
    { icon: FileText, title: "Post Project", desc: "Define scope, budget, required tier. AI scopes feasibility automatically." },
    { icon: ClipboardCheck, title: "Review Scorecards", desc: "See AI-generated skill profiles, TFES scores, and past project results. No resumes." },
    { icon: ShieldCheck, title: "Hire & Pay", desc: "Escrow-protected. Pay on milestone completion. 60-day money-back guarantee." },
  ];
  return (
    <section className="bg-secondary/40 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h2 {...fadeUp} className="text-center text-4xl font-bold tracking-tight">
          How Hiring <span className="text-gradient">Works</span>
        </motion.h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <motion.div key={s.title} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.1 }} className="rounded-2xl border border-border bg-card p-7 shadow-card">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-button text-primary-foreground">
                <s.icon className="h-5 w-5" />
              </div>
              <p className="mt-4 text-xs font-bold text-primary">STEP {i + 1}</p>
              <h3 className="mt-1 text-xl font-bold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrustSignals() {
  const items = [
    { icon: TrendingUp, value: "80%", label: "First-Pass Acceptance" },
    { icon: ShieldCheck, value: "<3%", label: "Dispute Rate" },
    { icon: Clock, value: "48 hrs", label: "Avg Candidate Match" },
    { icon: Wallet, value: "₹15K", label: "vs ₹40K Industry Standard" },
  ];
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it) => (
            <motion.div key={it.label} {...fadeUp} className="rounded-2xl border border-border bg-card p-6 text-center shadow-card">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-button text-primary-foreground">
                <it.icon className="h-6 w-6" />
              </div>
              <p className="mt-3 text-3xl font-extrabold text-gradient">{it.value}</p>
              <p className="mt-1 text-xs font-semibold text-muted-foreground">{it.label}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-12 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Zap className="h-4 w-4 text-primary" />
          Average employer saves <span className="font-bold text-foreground">62%</span> on hiring costs
        </div>
      </div>
    </section>
  );
}
