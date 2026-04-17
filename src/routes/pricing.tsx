import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight, Sparkles, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Talent Forge" },
      { name: "description", content: "Simple, transparent pricing. Start free. Pay only when you see value." },
      { property: "og:title", content: "Pricing — Talent Forge" },
      { property: "og:description", content: "Free for students. Pay-per-hire for employers. Enterprise plans for institutions." },
    ],
  }),
  component: PricingPage,
});

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
};

function PricingPage() {
  const [yearly, setYearly] = useState(false);
  const notify = () => toast("Join the waitlist — launching soon! 🚀");

  const tiers = [
    {
      name: "Free",
      audience: "Students",
      price: "₹0",
      period: "forever",
      features: ["Basic AI assessment", "TFES score", "1 project application/month", "Community access"],
      cta: "Start Free",
      highlight: false,
    },
    {
      name: "Pro",
      audience: "Students",
      price: yearly ? "₹3,999" : "₹499",
      period: yearly ? "/year" : "/month",
      strike: yearly ? "₹5,988" : undefined,
      features: ["Unlimited applications", "AI career coaching", "Priority matching", "Advanced analytics", "NFT badge minting included"],
      cta: "Start Pro Trial",
      highlight: true,
    },
    {
      name: "Employer",
      audience: "Pay Per Hire",
      price: "₹0",
      period: "+ 12% on success",
      features: ["AI matching", "Escrow protection", "Quality guarantee", "Verification API access"],
      cta: "Post First Project",
      highlight: false,
    },
  ];

  const faqs = [
    { q: "Can I cancel my Pro subscription anytime?", a: "Yes — cancel from your dashboard. You keep Pro access until the end of the billing cycle, no questions asked." },
    { q: "Are NFT minting fees included?", a: "Yes. Pro students get unlimited badge minting on Polygon at no additional cost. Free users pay a one-time ₹49 minting fee per badge." },
    { q: "How does the employer 12% fee work?", a: "We only charge when a project is successfully completed and the candidate is paid. No upfront fees, no monthly contracts." },
    { q: "Do you offer refunds?", a: "Yes — every employer hire comes with a 60-day money-back guarantee. Pro student plans have a 14-day refund window." },
    { q: "What about institutional contracts?", a: "Annual SaaS contracts for colleges include unlimited students, dedicated support, and quarterly placement analytics reviews." },
  ];

  return (
    <>
      <section className="bg-gradient-hero py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <motion.h1 {...fadeUp} className="text-5xl font-extrabold tracking-tight sm:text-6xl">
            Simple, <span className="text-gradient">Transparent</span> Pricing
          </motion.h1>
          <motion.p {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }} className="mt-5 text-lg text-muted-foreground">
            Start free. Pay only when you see value.
          </motion.p>

          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.2 }} className="mt-8 inline-flex items-center gap-1 rounded-full border border-border bg-card p-1 shadow-card">
            <button
              onClick={() => setYearly(false)}
              className={cn("rounded-full px-4 py-2 text-sm font-semibold transition-all", !yearly ? "bg-gradient-button text-primary-foreground" : "text-muted-foreground")}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              className={cn("rounded-full px-4 py-2 text-sm font-semibold transition-all", yearly ? "bg-gradient-button text-primary-foreground" : "text-muted-foreground")}
            >
              Annual <span className="ml-1 rounded-full bg-success/20 px-2 py-0.5 text-[10px] text-success">Save 33%</span>
            </button>
          </motion.div>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-3">
          {tiers.map((t, i) => (
            <motion.div
              key={t.name}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.08 }}
              className={cn(
                "relative flex flex-col rounded-3xl border bg-card p-8 shadow-card",
                t.highlight ? "border-primary/40 shadow-glow" : "border-border",
              )}
            >
              {t.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-gradient-button px-3 py-1 text-[11px] font-bold text-primary-foreground shadow-glow">
                    <Sparkles className="h-3 w-3" /> MOST POPULAR
                  </span>
                </div>
              )}
              <p className="text-xs font-bold uppercase tracking-widest text-coral">{t.audience}</p>
              <h3 className="mt-2 text-2xl font-bold">{t.name}</h3>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-5xl font-extrabold text-foreground">{t.price}</span>
                <span className="text-sm text-muted-foreground">{t.period}</span>
              </div>
              {t.strike && <p className="mt-1 text-sm text-muted-foreground line-through">{t.strike}</p>}

              <ul className="mt-6 space-y-3">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                    <span className="text-foreground">{f}</span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={notify}
                className={cn(
                  "mt-8",
                  t.highlight
                    ? "bg-gradient-button text-primary-foreground shadow-glow hover:opacity-95"
                    : "bg-foreground text-background hover:bg-foreground/90",
                )}
              >
                {t.cta} <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-secondary/40 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.h2 {...fadeUp} className="text-center text-3xl font-bold sm:text-4xl">
            For <span className="text-gradient">Institutions</span>
          </motion.h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-muted-foreground">
            White-label SaaS plans built for engineering colleges and universities.
          </p>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-7 shadow-card">
              <p className="text-xs font-bold uppercase tracking-widest text-primary">Starter</p>
              <p className="mt-2 text-3xl font-extrabold">₹5L<span className="text-base font-medium text-muted-foreground">/year</span></p>
              <ul className="mt-5 space-y-2 text-sm">
                <li className="flex gap-2"><Check className="h-4 w-4 text-success mt-0.5" />Up to 500 students</li>
                <li className="flex gap-2"><Check className="h-4 w-4 text-success mt-0.5" />Basic placement analytics</li>
                <li className="flex gap-2"><Check className="h-4 w-4 text-success mt-0.5" />Email support</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-primary/40 bg-card p-7 shadow-glow">
              <p className="text-xs font-bold uppercase tracking-widest text-coral">Enterprise</p>
              <p className="mt-2 text-3xl font-extrabold">₹15L<span className="text-base font-medium text-muted-foreground">/year</span></p>
              <ul className="mt-5 space-y-2 text-sm">
                <li className="flex gap-2"><Check className="h-4 w-4 text-success mt-0.5" />Unlimited students</li>
                <li className="flex gap-2"><Check className="h-4 w-4 text-success mt-0.5" />White-label portal</li>
                <li className="flex gap-2"><Check className="h-4 w-4 text-success mt-0.5" />API integration</li>
                <li className="flex gap-2"><Check className="h-4 w-4 text-success mt-0.5" />Dedicated success manager</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <motion.h2 {...fadeUp} className="text-center text-3xl font-bold sm:text-4xl">
            Frequently Asked <span className="text-gradient">Questions</span>
          </motion.h2>
          <div className="mt-10 space-y-3">
            {faqs.map((f) => <FAQItem key={f.q} {...f} />)}
          </div>
        </div>
      </section>
    </>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-border bg-card shadow-card">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span className="font-semibold text-foreground">{q}</span>
        <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform", open && "rotate-180")} />
      </button>
      <div className={cn("grid overflow-hidden transition-all duration-300", open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
        <div className="overflow-hidden">
          <p className="px-5 pb-5 text-sm text-muted-foreground">{a}</p>
        </div>
      </div>
    </div>
  );
}
