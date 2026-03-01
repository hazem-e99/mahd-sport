import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  /** The target number to count up to */
  value: number | undefined;
  /** Animation duration in ms (default 900) */
  duration?: number;
  /**
   * When this flips from false → true the counter resets and runs.
   * Defaults to true so the counter fires on mount.
   */
  trigger?: boolean;
  className?: string;
}

/**
 * Renders a number that counts up from 0 to `value` whenever `trigger`
 * transitions to true (or on mount if trigger is always true).
 */
const CountUp: React.FC<CountUpProps> = ({
  value = 0,
  duration = 900,
  trigger = true,
  className,
}) => {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number | null>(null);
  const prevTrigger = useRef(false);

  useEffect(() => {
    // Run on first mount if trigger is already true, or whenever trigger rises
    const shouldRun = trigger && !prevTrigger.current;
    prevTrigger.current = trigger;

    if (!trigger) {
      // reset while hidden so next time it starts from 0
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      setCount(0);
      return;
    }

    if (!shouldRun) return;

    const target = value;
    const startTime = performance.now();

    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic   
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(target * eased));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      }
    };

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger, value]);

  return <span className={className}>{count}</span>;
};

export default CountUp;
