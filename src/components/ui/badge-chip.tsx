import { cn } from "@/lib/utils";

const styles: Record<string, string> = {
  ECE: "bg-[oklch(0.94_0.04_295)] text-[oklch(0.4_0.18_295)]",
  EEE: "bg-[oklch(0.94_0.05_75)] text-[oklch(0.4_0.18_75)]",
  Mechanical: "bg-[oklch(0.93_0.05_165)] text-[oklch(0.35_0.15_165)]",
  CS: "bg-[oklch(0.94_0.05_230)] text-[oklch(0.4_0.18_230)]",
  Business: "bg-[oklch(0.94_0.06_25)] text-[oklch(0.45_0.18_25)]",
  AI: "bg-[oklch(0.94_0.04_320)] text-[oklch(0.4_0.18_320)]",
  Explorer: "bg-[oklch(0.94_0.05_230)] text-[oklch(0.4_0.18_230)]",
  Apprentice: "bg-[oklch(0.93_0.05_165)] text-[oklch(0.35_0.15_165)]",
  Practitioner: "bg-[oklch(0.94_0.05_75)] text-[oklch(0.42_0.15_75)]",
  Expert: "bg-[oklch(0.94_0.06_25)] text-[oklch(0.45_0.18_25)]",
  Master: "bg-[oklch(0.94_0.04_295)] text-[oklch(0.4_0.18_295)]",
};

export function BadgeChip({
  children,
  variant,
  className,
}: {
  children: React.ReactNode;
  variant?: keyof typeof styles | string;
  className?: string;
}) {
  const style = (variant && styles[variant]) || "bg-secondary text-secondary-foreground";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide",
        style,
        className,
      )}
    >
      {children}
    </span>
  );
}
