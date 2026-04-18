import { cn } from "@/lib/utils";

const styles: Record<string, string> = {
  // Domain chips
  ECE: "bg-[#DBEAFE] text-[#1D4ED8]",
  EEE: "bg-[#FEF3C7] text-[#92400E]",
  Mechanical: "bg-[#DCFCE7] text-[#15803D]",
  CS: "bg-[#EDE9FE] text-[#6D28D9]",
  "CS / Data": "bg-[#EDE9FE] text-[#6D28D9]",
  Business: "bg-[#FFE4E6] text-[#BE123C]",
  AI: "bg-[#CCFBF1] text-[#0F766E]",
  // Tier chips
  Explorer: "bg-[#F0F9FF] text-[#0369A1]",
  Apprentice: "bg-[#DCFCE7] text-[#15803D]",
  Practitioner: "bg-[#FEF3C7] text-[#92400E]",
  Expert: "bg-[#EDE9FE] text-[#6D28D9]",
  Master: "bg-[#FFE4E6] text-[#BE123C]",
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
