import useDimensions from "@/shared/hooks/useDimensions";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import Navigation from "./Navigation";
import { cn } from "@/shared/utils/tw-merge";
import { useOutsideClick } from "@/shared/hooks/useOutsideClick";
import MenuToggle from "./MenuToggle";
import { Avatar } from "@/shared/ui/Avatar/Avatar";

const sidebarVariants = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 80% 20px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(30px at 80% 20px)",
    transition: {
      delay: 0.2,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

interface Props {
  className?: string;
  username?: string;
  avatar?: string;
}

const Menu = ({ className, username, avatar }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const ref = useOutsideClick(() => setIsOpen(false));
  const { height } = useDimensions(containerRef);

  return (
    <div ref={ref} className={cn(className, "relative")}>
      <button
        className="relative z-5 flex items-center 
        justify-center p-1 gap-2 border-none cursor-pointer rounded-2xl"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <MenuToggle isOpen={isOpen} />
        <Avatar username={username || ""} src={avatar} />
      </button>
      <motion.nav
        initial={false}
        animate={isOpen ? "open" : "closed"}
        custom={height}
        ref={containerRef}
        className={cn(
          "w-50 h-100 absolute -top-2 right-0 transition-visibility duration-500",
          isOpen ? "visible" : "invisible"
        )}
      >
        <motion.div
          className={cn("absolute top-0 right-0 bottom-0 w-55 glass")}
          variants={sidebarVariants}
        />
        <Navigation onClose={() => setIsOpen(false)} isOpen={isOpen} />
      </motion.nav>
    </div>
  );
};

export default Menu;
