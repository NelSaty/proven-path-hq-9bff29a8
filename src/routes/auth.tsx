import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Eye, EyeOff, Lock, Mail, User, Zap } from "lucide-react";
import { z } from "zod";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/auth")({
  validateSearch: (search: Record<string, unknown>) => ({
    mode: (search.mode === "login" ? "login" : "signup") as "login" | "signup",
  }),
  head: () => ({
    meta: [
      { title: "Sign Up or Log In — Talent Forge" },
      {
        name: "description",
        content:
          "Create your free Talent Forge account to start your AI assessment, build a verified portfolio, and get matched to projects.",
      },
      { property: "og:title", content: "Join Talent Forge — Free Account" },
      {
        property: "og:description",
        content: "Sign up free. Take the assessment. Get hired.",
      },
    ],
  }),
  component: AuthPage,
});

const signupSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(80, { message: "Name must be less than 80 characters" }),
  email: z
    .string()
    .trim()
    .email({ message: "Enter a valid email address" })
    .max(255),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(72, { message: "Password is too long" }),
});

const loginSchema = z.object({
  email: z.string().trim().email({ message: "Enter a valid email address" }).max(255),
  password: z.string().min(1, { message: "Password is required" }),
});

type SignupErrors = Partial<Record<keyof z.infer<typeof signupSchema>, string>>;
type LoginErrors = Partial<Record<keyof z.infer<typeof loginSchema>, string>>;

function AuthPage() {
  const { mode } = Route.useSearch();
  const navigate = useNavigate();
  const isSignup = mode === "signup";

  const setMode = (next: "signup" | "login") =>
    navigate({ to: "/auth", search: { mode: next }, replace: true });

  return (
    <section className="relative min-h-[calc(100vh-4rem)] overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% -10%, oklch(0.95 0.04 295) 0%, transparent 60%)",
        }}
        aria-hidden
      />

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:py-20 lg:px-8">
        {/* Left column — value prop */}
        <div className="hidden flex-col justify-center lg:flex">
          <Link to="/" className="mb-8 inline-flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-button shadow-glow">
              <Zap className="h-5 w-5 text-primary-foreground" fill="currentColor" />
            </div>
            <span className="text-lg font-bold tracking-tight">Talent Forge</span>
          </Link>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Prove your skills.
            <br />
            <span className="text-gradient">Get hired faster.</span>
          </h1>
          <p className="mt-4 max-w-md text-base text-muted-foreground">
            Join 50,000+ engineers using Talent Forge to take AI assessments, earn
            blockchain-verified badges, and land real paying projects.
          </p>

          <ul className="mt-8 space-y-3 text-sm">
            {[
              "Free TFES Score in under 20 minutes",
              "Get matched to projects in 48 hours",
              "Earn ₹8,000 – ₹80,000+ per month",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#DCFCE7] text-[13px] text-[#15803D]">
                  ✓
                </span>
                <span className="text-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right column — auth card */}
        <div className="flex items-center justify-center">
          <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-card sm:p-8">
            <div className="mb-6 flex items-center justify-center lg:hidden">
              <Link to="/" className="inline-flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-button shadow-glow">
                  <Zap className="h-5 w-5 text-primary-foreground" fill="currentColor" />
                </div>
                <span className="text-base font-bold tracking-tight">Talent Forge</span>
              </Link>
            </div>

            <div className="mb-6 inline-flex w-full rounded-xl border border-border bg-muted p-1">
              {(["signup", "login"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMode(m)}
                  className={cn(
                    "flex-1 rounded-lg px-4 py-2 text-sm font-semibold capitalize transition-all",
                    mode === m
                      ? "bg-card text-foreground shadow-soft"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {m === "signup" ? "Sign Up" : "Log In"}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {isSignup ? (
                <motion.div
                  key="signup"
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.18 }}
                >
                  <SignupForm />
                </motion.div>
              ) : (
                <motion.div
                  key="login"
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.18 }}
                >
                  <LoginForm />
                </motion.div>
              )}
            </AnimatePresence>

            <p className="mt-6 text-center text-xs text-muted-foreground">
              By continuing you agree to our{" "}
              <span className="font-medium text-foreground">Terms</span> and{" "}
              <span className="font-medium text-foreground">Privacy Policy</span>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function SignupForm() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [errors, setErrors] = useState<SignupErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const result = signupSchema.safeParse({ name, email, password });
    if (!result.success) {
      const fieldErrors: SignupErrors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof SignupErrors;
        if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setSubmitting(true);

    // Mock signup — store profile (name only, no password) in localStorage.
    try {
      localStorage.setItem(
        "tf_user",
        JSON.stringify({ name: result.data.name, email: result.data.email }),
      );
    } catch {
      // ignore storage errors
    }

    setTimeout(() => {
      toast.success(`Welcome to Talent Forge, ${result.data.name.split(" ")[0]}! 🎉`);
      setSubmitting(false);
      navigate({ to: "/dashboard/student" });
    }, 600);
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h2 className="text-2xl font-bold tracking-tight">Create your free account</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Start your AI assessment in under a minute.
      </p>

      <div className="mt-6 space-y-4">
        <Field
          id="name"
          label="Full name"
          icon={<User className="h-4 w-4" />}
          error={errors.name}
        >
          <input
            id="name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Priya Sharma"
            className="w-full bg-transparent outline-none"
            maxLength={80}
          />
        </Field>

        <Field
          id="email"
          label="Email"
          icon={<Mail className="h-4 w-4" />}
          error={errors.email}
        >
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full bg-transparent outline-none"
            maxLength={255}
          />
        </Field>

        <Field
          id="password"
          label="Password"
          icon={<Lock className="h-4 w-4" />}
          error={errors.password}
          hint={!errors.password ? "At least 8 characters" : undefined}
        >
          <input
            id="password"
            type={showPwd ? "text" : "password"}
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full bg-transparent outline-none"
            maxLength={72}
          />
          <button
            type="button"
            onClick={() => setShowPwd((v) => !v)}
            className="text-muted-foreground hover:text-foreground"
            aria-label={showPwd ? "Hide password" : "Show password"}
          >
            {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </Field>
      </div>

      <Button
        type="submit"
        disabled={submitting}
        className="mt-6 w-full bg-gradient-button text-primary-foreground shadow-glow hover:opacity-95"
        size="lg"
      >
        {submitting ? "Creating account..." : "Create Free Account"}
        {!submitting && <ArrowRight className="ml-1 h-4 w-4" />}
      </Button>
    </form>
  );
}

function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [errors, setErrors] = useState<LoginErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      const fieldErrors: LoginErrors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof LoginErrors;
        if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setSubmitting(true);

    try {
      const stored = localStorage.getItem("tf_user");
      const profile = stored ? (JSON.parse(stored) as { name?: string; email?: string }) : null;
      const name = profile?.name || result.data.email.split("@")[0];
      localStorage.setItem("tf_user", JSON.stringify({ name, email: result.data.email }));
    } catch {
      // ignore
    }

    setTimeout(() => {
      toast.success("Welcome back! 👋");
      setSubmitting(false);
      navigate({ to: "/dashboard/student" });
    }, 500);
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h2 className="text-2xl font-bold tracking-tight">Welcome back</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Log in to continue your missions and projects.
      </p>

      <div className="mt-6 space-y-4">
        <Field
          id="login-email"
          label="Email"
          icon={<Mail className="h-4 w-4" />}
          error={errors.email}
        >
          <input
            id="login-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full bg-transparent outline-none"
            maxLength={255}
          />
        </Field>

        <Field
          id="login-password"
          label="Password"
          icon={<Lock className="h-4 w-4" />}
          error={errors.password}
        >
          <input
            id="login-password"
            type={showPwd ? "text" : "password"}
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full bg-transparent outline-none"
          />
          <button
            type="button"
            onClick={() => setShowPwd((v) => !v)}
            className="text-muted-foreground hover:text-foreground"
            aria-label={showPwd ? "Hide password" : "Show password"}
          >
            {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </Field>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => toast("Password reset launching soon.")}
            className="text-xs font-medium text-primary hover:underline"
          >
            Forgot password?
          </button>
        </div>
      </div>

      <Button
        type="submit"
        disabled={submitting}
        className="mt-6 w-full bg-gradient-button text-primary-foreground shadow-glow hover:opacity-95"
        size="lg"
      >
        {submitting ? "Signing in..." : "Log In"}
        {!submitting && <ArrowRight className="ml-1 h-4 w-4" />}
      </Button>
    </form>
  );
}

function Field({
  id,
  label,
  icon,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  icon: React.ReactNode;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-foreground">
        {label}
      </label>
      <div
        className={cn(
          "flex items-center gap-2 rounded-lg border bg-input px-3 py-2.5 text-sm transition-colors",
          "focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15",
          error ? "border-destructive" : "border-border",
        )}
      >
        <span className="text-muted-foreground">{icon}</span>
        {children}
      </div>
      {error ? (
        <p className="mt-1 text-xs text-destructive">{error}</p>
      ) : hint ? (
        <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  );
}
