import { cn } from "@/shared/utils/tw-merge";
import { motion } from "motion/react";

interface Props {
  w?: number;
  h?: number;
  className?: string;
}

export const LoadingCircleSpinner = ({ w = 48, h = 48, className }: Props) => {
  return (
    <div className={cn("flex justify-center items-center p-10 rounded-[8px]", className)}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        style={{ width: w, height: h }}
        className="rounded-[50%] border-4 border-[#e9e9e9] border-t-base-accent will-change-transform"
      />
    </div>
  );
};
