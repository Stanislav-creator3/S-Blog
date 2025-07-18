import { motion } from "motion/react";

const MenuToggle = ({ isOpen }: { isOpen: boolean }) => (
  <div
    className="flex items-center justify-center outline-none border-none cursor-pointer 
   rounded-2xl"
  >
    <svg width="23" height="23" viewBox="0 0 23 23">
      <motion.path
        strokeWidth="3"
        stroke="hsl(0, 0%, 18%)"
        strokeLinecap="round"
        animate={{
          d: isOpen ? "M 3 16.5 L 17 2.5" : "M 2 2.5 L 20 2.5",
        }}
      />
      <motion.path
        d="M 2 9.423 L 20 9.423"
        strokeWidth="3"
        stroke="hsl(0, 0%, 18%)"
        strokeLinecap="round"
        animate={{
          opacity: isOpen ? 0 : 1,
        }}
        transition={{ duration: 0.1 }}
      />
      <motion.path
        animate={{
          d: isOpen ? "M 3 2.5 L 17 16.346" : "M 2 16.346 L 20 16.346",
        }}
        strokeWidth="3"
        stroke="hsl(0, 0%, 18%)"
        strokeLinecap="round"
      />
    </svg>
  </div>
);

export default MenuToggle;
