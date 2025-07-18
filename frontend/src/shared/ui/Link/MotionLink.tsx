import { cn } from "@/shared/utils/tw-merge";
import { motion } from "motion/react";
import { Link } from "react-router";

interface Props {
  className?: string;
  href: string;
  children: React.ReactNode;
}

export const textMotion = {
  hidden: {
    x: 0,
    transition: {
      duration: 0.2,
      type: "tween",
      ease: "easeIn",
    },
  },
  show: {
    x: 20,
    transition: {
      duration: 0.4,
      type: "tween",
      ease: "easeOut",
    },
  },
  tap: {
    scale: 0.9,
  },
};

export const slashMotion = {
  hidden: { opacity: 0, ease: "easeOut", duration: 0.2, type: "tween" },
  show: {
    opacity: 1,
    transition: {
      duration: 0.4,
      type: "tween",
      ease: "easeIn",
    },
  },
  tap: {
    scale: 0.8,
  },
};

const MotionLink = ({ className, href, children }: Props) => {
  return (
    <motion.div
      className={cn(className, "relative")}
      initial="hidden"
      whileHover="show"
      whileTap="tap"
      animate="hidden"
    >
      <Link to={`${href}`}>
        <motion.div variants={textMotion}>{children}</motion.div>
        <motion.span
          variants={slashMotion}
          className="h-2 w-2 bg-base-accent absolute top-1/2 left-0 right-0 -translate-y-1/2
          rounded-full"
        ></motion.span>
      </Link>
    </motion.div>
  );
};

export default MotionLink;
