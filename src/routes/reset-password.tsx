import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect, type FormEvent } from "react";
import { Lock, ArrowRight } from "lucide-react";
import { toast } from "react-hot-toast";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Reset Password — Talent Forge" },
      { name: "description", content: "Set a new password for your Talent Forge account." },
    ],
  }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash.includes("type=recovery")) {
      setReady(true);
    }
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (password.length < 8) { toast.error("Password must be at least 8 characters"); return; }
    if (password !== confirm) { toast.error("Passwords don't match"); return; }
    setSubmitting(true);

    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Password updated! Redirecting...");
      setTimeout(() => navigate({ to: "/dashboard/student" }), 1500);
    }
    setSubmitting(false);
  };

  if (!ready) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="max-w-sm text-center">
          <h1 className="text-2xl font-bold">Invalid Reset Link</h1>
          <p className="mt-2 text-sm text-muted-foreground">This link may have expired. Please request a new one.</p>
          <Button asChild className="mt-4 bg-gradient-button text-primary-foreground">
            <a href="/auth?mode=login">Back to Login</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4 rounded-2xl border border-border bg-card p-6 shadow-card">
        <h1 className="text-2xl font-bold">Set New Password</h1>
        <div>
          <label className="mb-1.5 block text-sm font-medium">New Password</label>
          <div className="flex items-center gap-2 rounded-lg border border-border bg-input px-3 py-2.5 text-sm focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15">
            <Lock className="h-4 w-4 text-muted-foreground" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full bg-transparent outline-none" />
          </div>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium">Confirm Password</label>
          <div className="flex items-center gap-2 rounded-lg border border-border bg-input px-3 py-2.5 text-sm focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15">
            <Lock className="h-4 w-4 text-muted-foreground" />
            <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="••••••••" className="w-full bg-transparent outline-none" />
          </div>
        </div>
        <Button type="submit" disabled={submitting} className="w-full bg-gradient-button text-primary-foreground shadow-glow" size="lg">
          {submitting ? "Updating..." : "Update Password"}
          {!submitting && <ArrowRight className="ml-1 h-4 w-4" />}
        </Button>
      </form>
    </div>
  );
}
