import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb, Flag, Clock, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TFESGauge } from "@/components/ui/tfes-gauge";
import { sampleQuestions } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { toast } from "react-hot-toast";

export const Route = createFileRoute("/assessment")({
  head: () => ({
    meta: [
      { title: "Assessment Demo — Talent Forge" },
      { name: "description", content: "Experience our AI-adaptive assessment. Answer 3 sample questions and see your TFES score build in real time." },
      { property: "og:title", content: "Assessment Demo — Talent Forge" },
      { property: "og:description", content: "Try our AI-adaptive psychometric assessment for engineers." },
    ],
  }),
  component: AssessmentPage,
});

function AssessmentPage() {
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(18 * 60 + 42);

  useEffect(() => {
    const t = setInterval(() => setSecondsLeft((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, []);

  const q = sampleQuestions[qIndex];
  const progress = (qIndex / sampleQuestions.length) * 100;

  const handleNext = () => {
    if (selected === null) return;
    const newAnswers = [...answers, selected];
    setAnswers(newAnswers);
    const correct = selected === q.correct;
    setScore((s) => Math.min(100, s + (correct ? 28 : 12)));
    setSelected(null);

    if (qIndex < sampleQuestions.length - 1) {
      setQIndex(qIndex + 1);
    } else {
      setTimeout(() => setShowResults(true), 400);
    }
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const r = s % 60;
    return `${m}:${r.toString().padStart(2, "0")}`;
  };

  return (
    <section className="bg-secondary/30 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[260px_1fr_280px]">
          <aside className="rounded-2xl border border-border bg-card p-5 shadow-card">
            <p className="label-eyebrow text-primary">Question</p>
            <p className="mt-1 text-2xl font-bold">{qIndex + 1} / {sampleQuestions.length} <span className="text-sm font-normal text-muted-foreground">(demo · 20 in real test)</span></p>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-secondary">
              <div className="h-full rounded-full bg-gradient-button transition-all" style={{ width: `${progress}%` }} />
            </div>

            <div className="mt-6 flex items-center gap-2 rounded-xl border border-coral/30 bg-[oklch(0.96_0.04_25)] px-3 py-2">
              <Clock className="h-4 w-4 text-coral" />
              <span className="text-sm font-bold text-foreground">{formatTime(secondsLeft)}</span>
              <span className="text-xs text-muted-foreground">remaining</span>
            </div>

            <div className="mt-4 inline-block rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-foreground">
              {q.domain}
            </div>

            <div className="mt-6">
              <p className="label-eyebrow text-muted-foreground">Sections</p>
              <ul className="mt-2 space-y-1.5 text-sm">
                {["Aptitude", "Technical", "Psychometric", "Simulation"].map((s, i) => (
                  <li key={s} className={cn("flex items-center gap-2 rounded-lg px-2 py-1.5", i === 1 && "bg-primary/10 text-primary font-semibold")}>
                    <span className={cn("h-1.5 w-1.5 rounded-full", i === 1 ? "bg-primary" : "bg-muted-foreground/40")} />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <main className="rounded-2xl border border-border bg-card p-8 shadow-card">
            <AnimatePresence mode="wait">
              <motion.div
                key={qIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <p className="label-eyebrow text-primary">Question {qIndex + 1}</p>
                <h2 className="mt-3 text-2xl font-bold leading-snug">{q.question}</h2>

                <div className="mt-7 space-y-3">
                  {q.options.map((opt, i) => (
                    <button
                      key={opt}
                      onClick={() => setSelected(i)}
                      className={cn(
                        "flex w-full items-center gap-4 rounded-xl border-2 px-5 py-4 text-left text-base transition-all",
                        selected === i
                          ? "border-primary bg-primary/5 shadow-glow"
                          : "border-border bg-background hover:border-primary/40 hover:bg-secondary",
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border-2 font-bold",
                          selected === i ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground",
                        )}
                      >
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span className="font-medium text-foreground">{opt}</span>
                    </button>
                  ))}
                </div>

                <div className="mt-8 flex items-center justify-between border-t border-border pt-5">
                  <Button variant="outline" onClick={() => toast("Marked for review")}>
                    <Flag className="h-4 w-4 mr-1" /> Mark for Review
                  </Button>
                  <Button
                    onClick={handleNext}
                    disabled={selected === null}
                    className="bg-gradient-button text-primary-foreground shadow-glow disabled:opacity-50"
                  >
                    {qIndex === sampleQuestions.length - 1 ? "See My Score →" : "Next Question →"}
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          </main>

          <aside className="rounded-2xl border border-border bg-card p-5 shadow-card">
            <p className="label-eyebrow text-primary">Your TFES Score</p>
            <div className="mt-4 flex justify-center">
              <TFESGauge score={score} />
            </div>
            <p className="mt-2 text-center text-xs text-muted-foreground">
              Updates as you answer
            </p>

            <Button
              variant="outline"
              className="mt-5 w-full border-coral/40 bg-[oklch(0.96_0.04_25)] text-foreground hover:bg-[oklch(0.94_0.05_25)]"
              onClick={() => toast("AI hint: Think about resonance frequency 💡")}
            >
              <Lightbulb className="h-4 w-4 mr-1 text-coral" /> Get AI Hint
            </Button>

            <div className="mt-5 rounded-xl border border-border bg-secondary p-3 text-xs text-muted-foreground leading-relaxed">
              <strong className="text-foreground">We're also measuring:</strong> response confidence, time patterns, and revision behavior — all factor into your TFES.
            </div>
          </aside>
        </div>
      </div>

      <AnimatePresence>
        {showResults && (
          <ResultsModal score={score} onClose={() => { setShowResults(false); setQIndex(0); setAnswers([]); setScore(0); }} />
        )}
      </AnimatePresence>
    </section>
  );
}

function ResultsModal({ score, onClose }: { score: number; onClose: () => void }) {
  const finalScore = Math.max(72, Math.min(92, Math.round(score) + 8));
  const tier = finalScore >= 85 ? "Expert" : "Practitioner";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 px-4 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative w-full max-w-md rounded-3xl bg-card p-8 shadow-glow"
      >
        <button onClick={onClose} className="absolute right-4 top-4 rounded-lg p-1.5 text-muted-foreground hover:bg-secondary">
          <X className="h-4 w-4" />
        </button>

        <p className="label-eyebrow text-coral">Sample Results</p>
        <h2 className="mt-2 text-3xl font-bold">Your TFES Score</h2>

        <div className="mt-6 flex justify-center">
          <TFESGauge score={finalScore} size={180} />
        </div>

        <div className="mt-6 space-y-2.5">
          {[
            { label: "Technical", value: 82 },
            { label: "Aptitude", value: 75 },
            { label: "Behavioral", value: 77 },
          ].map((b) => (
            <div key={b.label}>
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-muted-foreground">{b.label}</span>
                <span className="text-foreground">{b.value}/100</span>
              </div>
              <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-secondary">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${b.value}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="h-full bg-gradient-button"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-secondary p-3">
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Recommended Tier</p>
            <p className="mt-1 font-bold text-foreground">{tier}</p>
          </div>
          <div className="rounded-xl bg-secondary p-3">
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Top Domain</p>
            <p className="mt-1 font-bold text-foreground">Embedded Sys.</p>
          </div>
        </div>

        <Button
          onClick={() => toast("Join the waitlist — launching soon! 🚀")}
          className="mt-6 w-full bg-gradient-button text-primary-foreground shadow-glow"
        >
          Get Your Real Score — Sign Up Free
        </Button>
      </motion.div>
    </motion.div>
  );
}
