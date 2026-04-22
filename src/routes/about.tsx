import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";
import { StatCounter } from "@/components/ui/stat-counter";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Talent Forge" },
      { name: "description", content: "Every engineer in India deserves a fair shot. Meet the team building the future of skill-verified hiring." },
      { property: "og:title", content: "About — Talent Forge" },
      { property: "og:description", content: "Our mission, our team, and the investors backing Talent Forge." },
    ],
  }),
  component: AboutPage,
});

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
};

function AboutPage() {
  const team = [
    { name: "Nelson M Sathya", role: "Founder & CEO", bio: "15 years scaling EdTech across India.", initials: "NS" },
    { name: "Meera Nair", role: "CTO & AI Lead", bio: "Ex-Google ML, IIT Madras alum.", initials: "MN" },
    { name: "Rohan Singh", role: "Head of Product", bio: "Built products at Razorpay & Unacademy.", initials: "RS" },
    { name: "Anaya Reddy", role: "Head of Partnerships", bio: "200+ college tie-ups across South India.", initials: "AR" },
  ];

  return (
    <>
      <section className="bg-gradient-hero py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="rounded-3xl bg-card/80 p-10 text-center shadow-glow backdrop-blur-md lg:p-14">
            <p className="label-eyebrow text-primary">Our Mission</p>
            <p className="mt-4 text-3xl font-bold leading-snug text-foreground sm:text-4xl">
              "We believe every engineer in India deserves a <span className="text-gradient">fair shot</span> — regardless of their city, college, or connections."
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <motion.div {...fadeUp}>
            <p className="label-eyebrow text-coral">The Problem</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">India produces 1.5M engineers a year. Only 20% are job-ready.</h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Resumes lie. Interviews are biased. Tier-3 colleges get ignored. Companies waste lakhs on bad hires while talented students from smaller cities never get a chance to prove themselves.
            </p>
          </motion.div>
          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }}>
            <p className="label-eyebrow text-primary">Our Solution</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">A platform where skills speak louder than pedigree.</h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              AI-adaptive assessments. Real-world simulations. Blockchain-verified credentials. Direct job and project matches based on what you can actually do — not where you studied.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-secondary/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.h2 {...fadeUp} className="text-center text-3xl font-bold sm:text-4xl">
            Meet the <span className="text-gradient">Team</span>
          </motion.h2>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m, i) => (
              <motion.div
                key={m.name}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.06 }}
                className="rounded-2xl border border-border bg-card p-6 text-center shadow-card card-hover"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-button text-lg font-bold text-primary-foreground shadow-glow">
                  {m.initials}
                </div>
                <h3 className="mt-4 font-bold text-foreground">{m.name}</h3>
                <p className="text-xs font-semibold text-coral">{m.role}</p>
                <p className="mt-2 text-xs text-muted-foreground">{m.bio}</p>
                <a href="#" className="mt-4 inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground hover:border-primary hover:text-primary">
                  <Linkedin className="h-4 w-4" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <motion.p {...fadeUp} className="label-eyebrow text-primary">Backed by</motion.p>
          <motion.h3 {...fadeUp} className="mt-3 text-xl font-semibold text-muted-foreground">
            Angel investors from IIM, IIT, and leading EdTech exits
          </motion.h3>
        </div>
      </section>

      <section className="border-y border-border bg-card/50">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          <StatCounter value={50} suffix="M+" label="Target Graduate Market" />
          <StatCounter value={120} prefix="₹" suffix=" Cr" label="Y3 Revenue Projection" />
          <StatCounter value={95} suffix="%" label="Quality Assurance Rate" />
          <StatCounter value={48} suffix=" hrs" label="Avg Project Start Time" />
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <p className="label-eyebrow text-coral">As Featured In</p>
          <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {["YourStory", "Inc42", "ET Tech", "Mint"].map((n) => (
              <div key={n} className="rounded-xl border border-border bg-card px-4 py-6 text-center font-bold text-muted-foreground shadow-card">
                {n}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
