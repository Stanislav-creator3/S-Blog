import { tooltipVariants } from "@/shared/utils/tooltipVariants";
import { cn } from "@/shared/utils/tw-merge";
import { cva, VariantProps } from "cva";
import { AnimatePresence, motion } from "motion/react";
import { FC, useRef, useState } from "react";

interface Props extends VariantProps<typeof directionsVariants> {
  delay?: number;
  children: React.ReactNode;
  content: string | React.ReactNode;
  className?: string;
}

const directionsVariants = cva({
  base: "absolute z-50 p-2 text-sm font-semibold text-base-white bg-base-black rounded-[8px]",
  variants: {
    direction: {
      top: "top-[-100%] left-1/2 -translate-x-1/2",
      bottom: "bottom-[-100%] left-1/2 -translate-x-1/2",
      left: "top-1/2 right-[calc(100%+10px)] -translate-y-1/2",
      right: "top-1/2 left-[calc(100%+10px)] -translate-y-1/2",
    },
  },
  defaultVariants: {
    direction: "right",
  },
});

const Tooltip: FC<Props> = ({
  delay = 350,
  children,
  content,
  direction,
  className,
}) => {
  const refSetTimeout = useRef<null | NodeJS.Timeout>(null);
  const [showTooltip, setShowTooltip] = useState(false);

  const show = () =>
    (refSetTimeout.current = setTimeout(() => setShowTooltip(true), delay));

  const hidden = () => {
    clearTimeout(refSetTimeout.current as NodeJS.Timeout);
    setShowTooltip(false);
  };

  return (
    <div
      className="inline-block relative"
      onMouseEnter={show}
      onMouseLeave={hidden}
    >
      {children}

      <AnimatePresence mode="wait">
        {showTooltip && (
          <motion.div
            variants={tooltipVariants({ direction })}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{
              type: "spring",
              duration: delay / 1000,
            }}
            className={cn(directionsVariants({ direction }), className)}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export { Tooltip, directionsVariants };
