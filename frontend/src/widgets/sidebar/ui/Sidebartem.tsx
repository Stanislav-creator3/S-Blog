import { useAppSelector } from "@/app/appStore";
import { Tooltip } from "@/shared/ui/Tooltip/Tooltip";
import { motion } from "motion/react";
import React from "react";
import { IconType } from "react-icons/lib";
import { Link } from "react-router";

interface Props {
  Icon: IconType;
  label: string;
  href: string;
}

export const SidebarItem: React.FC<Props> = ({ Icon, label, href }) => {
  const isOpen = useAppSelector((state) => state.sidebar.isOpen);
  return isOpen ? (
    <motion.div
      className="flex w-full items-center justify-between px-3 "
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.8 }}
    >
      <Link
        to={href}
        className="flex cursor-pointer w-full items-center px-2 gap-x-4 h-11 
        border border-transparent hover:rounded-[5px] hover:shadow-lg"
      >
        <Icon className="mr-0 size-6 text-base-accent" />
        {label}
      </Link>
    </motion.div>
  ) : (
    <motion.div
      className="hidden w-full items-center justify-center lg:flex"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.8 }}
    >
      <Tooltip direction="right" content={label}>
        <Link to={href}>
          <motion.div
            className="flex items-center 
         justify-center px-2 h-11 cursor-pointer 
         border border-transparent hover:rounded-[5px] hover:shadow-lg"
          >
            <Icon className="mr-0 size-6 text-base-accent" />
          </motion.div>
        </Link>
      </Tooltip>
    </motion.div>
  );
};
