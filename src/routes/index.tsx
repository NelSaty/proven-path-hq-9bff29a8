import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Sparkles,
  Brain,
  Gamepad2,
  Rocket,
  Zap,
  Plug,
  Cog,
  Code2,
  BarChart3,
  Bot,
  ShieldCheck,
  Eye,
  Globe,
  Trophy,
  Bell,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatCounter } from "@/components/ui/stat-counter";
import { TFESGauge } from "@/components/ui/tfes-gauge";
import { BadgeChip } from "@/components/ui/badge-chip";
import { domains, tiers } from "@/data/mockData";
import { toast } from "react-hot-toast";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Talent Forge — Prove Your Skills. Get Hired." },
      {
        name: "description",
        content:
          "India's first AI + blockchain talent platform. Gamified assessments, real-world simulations, and verified credentials connecting engineers to top companies.",
      },
      { property: "og:title", content: "Talent Forge — Prove Your Skills. Get Hired." },
      { property: "og:description", content: "AI-powered marketplace connecting skill-verified engineers with top companies." },
    ],
  }),
  component: LandingPage,
});

const domainIcons: Record<string, typeof Zap> = {
  Zap, Plug, Cog, Code: Code2, BarChart3, Bot,
};

function LandingPage() {
  return (
    <>
      <Hero />
      <StatsStrip />
      <HowItWorks />
      <DomainCoverage />
      <Gamification />
      <Blockchain />
      <Testimonials />
      <CTABanner />
    </>
  );
}

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
};

function Hero() {
  const notify = () => toast("Join the waitlist — launching soon! 🚀");

  return (
    <section className="relative overflow-hidden bg-gradient-hero">
      <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-primary/15 blur-3xl" />
      <div className="absolute -bottom-32 -right-24 h-[28rem] w-[28rem] rounded-full bg-coral/15 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-8 lg:py-28 lg:px-8">
        <motion.div {...fadeUp}>
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card/70 px-3 py-1.5 text-xs font-semibold backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span className="text-foreground">India's First AI + Blockchain Talent Platform</span>
          </div>

          <h1 className="mt-6 text-5xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-[64px]">
            Hire Smarter.
            <br />
            <span className="text-gradient">Prove Your Skills.</span>
            <br />
            Get Hired Faster.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            The AI-powered marketplace that connects skill-verified engineers with top companies — using gamified assessments, real-world simulations, and blockchain credentials.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button
              size="lg"
              onClick={notify}
              className="bg-gradient-button text-primary-foreground shadow-glow hover:opacity-95"
            >
              Start Your Free Assessment <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" onClick={notify} className="border-foreground/20">
              Post a Project
            </Button>
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            Trusted by{" "}
            <span className="font-semibold text-foreground">500+ Companies</span> ·{" "}
            <span className="font-semibold text-foreground">50,000+ Students</span> ·{" "}
            <span className="font-semibold text-foreground">200+ Colleges</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative"
        >
          <HeroDashboardMock />
        </motion.div>
      </div>
    </section>
  );
}

function HeroDashboardMock() {
  return (
    <div className="relative">
      <div className="rounded-3xl border border-border bg-card/90 p-6 shadow-glow backdrop-blur-md">
        <div className="flex items-center gap-3 border-b border-border pb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-button text-sm font-bold text-primary-foreground">
            AK
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold">Arjun K.</p>
            <p className="text-xs text-muted-foreground">ECE · Coimbatore</p>
          </div>
          <BadgeChip variant="Expert">🔥 Expert</BadgeChip>
        </div>

        <div className="mt-5 flex items-center gap-5">
          <TFESGauge score={87} size={120} />
          <div className="flex-1 space-y-2">
            <div className="text-xs font-semibold text-muted-foreground">Talent Score</div>
            <div className="text-sm">
              <span className="font-bold text-foreground">Top 8%</span>
              <span className="text-muted-foreground"> nationally</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {["STM32", "FreeRTOS", "Embedded C"].map((s) => (
                <span key={s} className="rounded-md bg-secondary px-2 py-0.5 text-[10px] font-semibold">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2">
          {[
            { name: "IoT Pro", color: "oklch(0.94 0.04 295)" },
            { name: "RTOS", color: "oklch(0.93 0.05 165)" },
            { name: "Sim+", color: "oklch(0.94 0.06 25)" },
          ].map((b) => (
            <div
              key={b.name}
              className="relative rounded-xl border border-border p-3 text-center"
              style={{ background: b.color }}
            >
              <Trophy className="mx-auto h-5 w-5 text-foreground/80" />
              <div className="mt-1 text-[11px] font-bold text-foreground">{b.name}</div>
              <div className="absolute right-1 top-1 h-2 w-2 rounded-full bg-success animate-pulse" />
            </div>
          ))}
        </div>

        <div className="mt-5 flex items-center gap-3 rounded-xl border border-primary/20 bg-primary/5 p-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <Bell className="h-4 w-4 text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-semibold text-foreground">New Match Found · 94%</p>
            <p className="text-[11px] text-muted-foreground">ESP32 IoT Dashboard · ₹22,000 · 10 days</p>
          </div>
        </div>
      </div>

      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-6 -top-4 hidden rounded-2xl border border-border bg-card px-4 py-3 shadow-card sm:block"
      >
        <div className="text-[10px] font-semibold text-muted-foreground">EARNED</div>
        <div className="text-lg font-bold text-success">₹35,000</div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-4 -right-4 hidden rounded-2xl border border-border bg-card px-4 py-3 shadow-card sm:block"
      >
        <div className="text-[10px] font-semibold text-muted-foreground">PROJECTS</div>
        <div className="text-lg font-bold text-foreground">12 Active</div>
      </motion.div>
    </div>
  );
}

function StatsStrip() {
  return (
    <section className="border-y border-border bg-card/50">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        <StatCounter value={50} suffix="M+" label="Target Graduate Market" />
        <StatCounter value={120} prefix="₹" suffix=" Cr" label="Y3 Revenue Projection" />
        <StatCounter value={95} suffix="%" label="Quality Assurance Rate" />
        <StatCounter value={48} suffix=" hrs" label="Avg Project Start Time" />
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { icon: Brain, emoji: "🧠", title: "Assess", desc: "Take our AI-adaptive psychometric test. Get your Talent Forge Employability Score (TFES)." },
    { icon: Gamepad2, emoji: "🎮", title: "Prove", desc: "Complete real-world simulations and missions. Earn blockchain-verified NFT badges." },
    { icon: Rocket, emoji: "🚀", title: "Get Hired", desc: "Get AI-matched to projects and jobs. Employers see your proof, not just your resume." },
  ];

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeUp} className="text-center">
          <p className="label-eyebrow text-primary">How it works</p>
          <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            One Platform. <span className="text-gradient">Three Superpowers.</span>
          </h2>
        </motion.div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.1 }}
              className="group relative rounded-2xl border border-border bg-card p-7 shadow-card transition-all hover:-translate-y-1 hover:shadow-glow"
            >
              <div className="absolute -top-4 left-7 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-button text-xs font-bold text-primary-foreground shadow-glow">
                {i + 1}
              </div>
              <div className="text-4xl">{s.emoji}</div>
              <h3 className="mt-4 text-xl font-bold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DomainCoverage() {
  return (
    <section className="bg-secondary/40 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeUp} className="text-center">
          <p className="label-eyebrow text-primary">Domains</p>
          <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Built for Every <span className="text-gradient">Engineer</span>
          </h2>
        </motion.div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {domains.map((d, i) => {
            const Icon = domainIcons[d.icon] || Zap;
            return (
              <motion.div
                key={d.name}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.05 }}
                className="group rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-glow"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-button text-primary-foreground shadow-glow">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-bold">{d.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{d.desc}</p>
                <button className="mt-4 inline-flex items-center text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                  View Challenges →
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Gamification() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeUp} className="text-center">
          <p className="label-eyebrow text-primary">Gamification</p>
          <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Level Up Your <span className="text-gradient">Career</span>
          </h2>
        </motion.div>

        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          <motion.div {...fadeUp} className="rounded-2xl border border-border bg-card p-8 shadow-card">
            <h3 className="text-sm font-semibold text-muted-foreground label-eyebrow">Tier Progression</h3>
            <div className="mt-6 space-y-4">
              {tiers.map((t) => (
                <div key={t.level} className="flex items-center gap-4">
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-base font-bold text-white shadow-card"
                    style={{ background: t.color }}
                  >
                    L{t.level}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">Earnings: {t.earnings}</p>
                  </div>
                  {t.level === 3 && <BadgeChip variant="Practitioner">You're here</BadgeChip>}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div {...fadeUp} className="space-y-4">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground">CURRENT TIER</p>
                  <p className="text-xl font-bold text-foreground">Practitioner → Expert</p>
                </div>
                <BadgeChip variant="Practitioner">Level 3</BadgeChip>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-muted-foreground">3,400 / 5,000 XP</span>
                  <span className="text-primary">75%</span>
                </div>
                <div className="mt-2 h-3 overflow-hidden rounded-full bg-secondary">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "75%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="h-full rounded-full bg-gradient-button"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <p className="text-xs font-semibold text-muted-foreground">ACTIVE MISSION</p>
              <h4 className="mt-1 text-lg font-bold">Design a Low-Pass Filter</h4>
              <div className="mt-3 flex items-center justify-between text-sm">
                <span className="text-coral font-semibold">⏱ 2 days left</span>
                <span className="font-semibold text-success">+250 XP</span>
              </div>
            </div>

            <div className="rounded-2xl border border-amber-soft/40 bg-[oklch(0.96_0.04_75)] p-6 shadow-card">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-button text-2xl shadow-glow">
                  🏆
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground">RECENT BADGE</p>
                  <p className="text-lg font-bold text-foreground">Embedded Systems Pro</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Blockchain() {
  const features = [
    { icon: ShieldCheck, title: "Tamper-proof", desc: "Cannot be faked or altered" },
    { icon: Eye, title: "Instant Verification", desc: "Employers verify in one click" },
    { icon: Globe, title: "Universally Accepted", desc: "Works on LinkedIn, NSDC, job portals" },
  ];

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeUp} className="overflow-hidden rounded-3xl bg-gradient-dark p-10 shadow-glow lg:p-16">
          <div className="text-center">
            <p className="label-eyebrow text-amber-soft">Blockchain Credentials</p>
            <h2 className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Your Proof. Forever. <span className="text-amber-soft">On-Chain.</span>
            </h2>
          </div>

          <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
            <div className="flex justify-center">
              <NFTBadgeMock />
            </div>
            <div className="space-y-5">
              {features.map((f) => (
                <div key={f.title} className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-button text-primary-foreground">
                    <f.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">{f.title}</h4>
                    <p className="mt-0.5 text-sm text-white/70">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function NFTBadgeMock() {
  return (
    <div className="relative animate-float">
      <svg width="220" height="240" viewBox="0 0 220 240" className="drop-shadow-2xl">
        <defs>
          <linearGradient id="nft-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="oklch(0.7 0.18 295)" />
            <stop offset="100%" stopColor="oklch(0.72 0.17 25)" />
          </linearGradient>
        </defs>
        <polygon
          points="110,10 200,60 200,180 110,230 20,180 20,60"
          fill="url(#nft-grad)"
          stroke="oklch(0.95 0.02 295)"
          strokeWidth="3"
        />
        <polygon
          points="110,30 180,70 180,170 110,210 40,170 40,70"
          fill="oklch(0.22 0.03 290 / 0.4)"
          stroke="oklch(0.95 0.02 295 / 0.5)"
          strokeWidth="1"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
        <Trophy className="h-10 w-10 text-amber-soft" />
        <p className="mt-2 text-xs font-bold tracking-widest">EMBEDDED PRO</p>
        <p className="text-lg font-extrabold">Tier IV</p>
        <p className="mt-1 text-[10px] text-white/70">Issued · Apr 2025</p>
        <div className="mt-3 inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-0.5 text-[9px] font-semibold backdrop-blur-sm">
          <CheckCircle2 className="h-3 w-3 text-mint" />
          Verified on Polygon
        </div>
      </div>
    </div>
  );
}

function Testimonials() {
  const items = [
    {
      quote: "I got my first ₹25,000 project within 3 weeks of joining. The AI matched me perfectly.",
      name: "Priya R.",
      role: "ECE Graduate, Coimbatore",
      tag: "Student",
      color: "oklch(0.94 0.04 295)",
    },
    {
      quote: "We hired 4 interns through Talent Forge. Zero bad hires. The skill scores are actually real.",
      name: "Rahul M.",
      role: "CTO, SaaS Startup, Pune",
      tag: "Employer",
      color: "oklch(0.93 0.05 165)",
    },
    {
      quote: "Our placement rate jumped 38% in one semester after integrating Talent Forge.",
      name: "Dr. Anitha K.",
      role: "TPO, Engineering College, Madurai",
      tag: "College",
      color: "oklch(0.94 0.06 25)",
    },
  ];

  return (
    <section className="bg-secondary/40 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeUp} className="text-center">
          <p className="label-eyebrow text-primary">Testimonials</p>
          <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            What They're <span className="text-gradient">Saying</span>
          </h2>
        </motion.div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {items.map((t, i) => (
            <motion.div
              key={t.name}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.1 }}
              className="rounded-2xl border border-border bg-card p-7 shadow-card"
            >
              <span
                className="inline-block rounded-full px-3 py-1 text-[11px] font-bold tracking-wide text-foreground"
                style={{ background: t.color }}
              >
                {t.tag}
              </span>
              <p className="mt-5 text-base leading-relaxed text-foreground">"{t.quote}"</p>
              <div className="mt-6 border-t border-border pt-4">
                <p className="font-semibold text-foreground">{t.name}</p>
                <p className="text-sm text-muted-foreground">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTABanner() {
  const notify = () => toast("Join the waitlist — launching soon! 🚀");
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <motion.div
        {...fadeUp}
        className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-dark p-12 text-center shadow-glow lg:p-16"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,oklch(0.78_0.13_75/0.25),transparent_50%)]" />
        <div className="relative">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Ready to Transform Your <span className="text-amber-soft">Career or Hiring?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/80">
            Join 50,000+ engineers and 500+ companies already on Talent Forge.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button size="lg" onClick={notify} className="bg-gradient-button text-primary-foreground shadow-glow">
              I'm a Student
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={notify}
              className="border-white/30 bg-white/10 text-white hover:bg-white/20"
            >
              I'm an Employer
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
