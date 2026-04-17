import { useCountUp } from "@/hooks/useCountUp";

export function StatCounter({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  label,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
}) {
  const { ref, value: v } = useCountUp(value, 1600);
  const formatted = v.toLocaleString("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <div className="text-center">
      <div className="text-4xl font-bold tracking-tight text-gradient sm:text-5xl">
        <span ref={ref}>
          {prefix}
          {formatted}
          {suffix}
        </span>
      </div>
      <p className="mt-2 label-eyebrow text-muted-foreground">{label}</p>
    </div>
  );
}
