import { useEffect, useRef, useState } from "react";

export function useCountUp(end: number, duration = 1500, start = 0) {
  const [value, setValue] = useState(start);
  const ref = useRef<HTMLSpanElement | null>(null);
  const started = useRef(false);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            const startTime = performance.now();
            const tick = (now: number) => {
              const t = Math.min((now - startTime) / duration, 1);
              const eased = 1 - Math.pow(1 - t, 3);
              setValue(start + (end - start) * eased);
              if (t < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration, start]);

  return { ref, value };
}
