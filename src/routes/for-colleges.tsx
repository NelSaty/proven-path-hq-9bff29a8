import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, GraduationCap, BarChart3, Users, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";

export const Route = createFileRoute("/for-colleges")({
  head: () => ({
    meta: [
      { title: "For Colleges — Talent Forge" },
      { name: "description", content: "Boost placements by 38%. Integrate Talent Forge into your campus and give every student a verified, AI-assessed skill profile." },
      { property: "og:title", content: "For Colleges — Talent Forge" },
      { property: "og:description", content: "B2B SaaS for engineering colleges to verify, train and place students faster." },
    ],
  }),
  component: ForCollegesPage,
});

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
};

function ForCollegesPage() {
  const notify = () => toast("Join the waitlist — launching soon! 🚀");

  const features = [
    { icon: GraduationCap, title: "Campus Assessment Suite", desc: "AI tests across all engineering branches, mapped to NEP outcomes." },
    { icon: BarChart3, title: "Placement Analytics", desc: "Live dashboards for TPOs: skill gaps, batch readiness, employer feedback." },
    { icon: Users, title: "White-label Portal", desc: "Your branding, your domain. Students log in to your TalentForge instance." },
    { icon: ShieldCheck, title: "Verified Credentials", desc: "Issue blockchain-backed badges and transcripts that employers trust." },
  ];

  return (
    <>
      <section className="bg-gradient-hero py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <motion.h1 {...fadeUp} className="text-5xl font-extrabold tracking-tight sm:text-6xl">
            Boost Placements by <span className="text-gradient">38%</span>
          </motion.h1>
          <motion.p {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }} className="mt-6 text-lg text-muted-foreground">
            Give every student a verified, AI-assessed skill profile. Track readiness in real-time. Connect directly with hiring partners.
          </motion.p>
          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.2 }} className="mt-8 flex flex-wrap justify-center gap-3">
            <Button size="lg" onClick={notify} className="bg-gradient-button text-primary-foreground shadow-glow">
              Book a Campus Demo <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" onClick={notify}>Download Brochure</Button>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.h2 {...fadeUp} className="text-center text-4xl font-bold tracking-tight">
            Built for <span className="text-gradient">Institutions</span>
          </motion.h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.05 }}
                className="rounded-2xl border border-border bg-card p-7 shadow-card transition-all hover:-translate-y-1 hover:shadow-glow"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-button text-primary-foreground shadow-glow">
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-xl font-bold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary/40 py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="rounded-3xl bg-gradient-dark p-10 text-center shadow-glow lg:p-16">
            <p className="label-eyebrow text-amber-soft">Case Study</p>
            <p className="mt-4 text-3xl font-bold leading-snug text-white sm:text-4xl">
              "Our placement rate jumped <span className="text-amber-soft">38%</span> in one semester after integrating Talent Forge."
            </p>
            <p className="mt-6 text-sm text-white/70">— Dr. Anitha K., TPO · Engineering College, Madurai</p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
