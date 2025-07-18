import {
  animate,
  KeyframeOptions,
  useInView,
  useIsomorphicLayoutEffect,
} from "motion/react";
import { useRef } from "react";

interface AnimatedCounterProps {
  from: number;
  to: number;
  animationOptions?: KeyframeOptions;
}
const AnimatedCounter = ({
  from,
  to,
  animationOptions,
}: AnimatedCounterProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useIsomorphicLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (!inView) return;

    element.textContent = String(from);

    const controls = animate(from, to, {
      duration: 1.5,
      ease: "easeOut",
      ...animationOptions,
      onUpdate(value) {
        element.textContent = String(value.toFixed(0));
      },
    });

    return () => controls.stop();
  }, [ref, inView, from, to, animationOptions]);
  return <span ref={ref}></span>;
};

export default AnimatedCounter;
