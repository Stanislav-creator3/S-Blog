import { useAppDispatch, useAppSelector } from "@/app/appStore";
import { LuArrowLeftToLine, LuArrowRightToLine } from "react-icons/lu";
import { close, open } from "../model/sidebarSlice";
import { motion } from "motion/react";
import { Tooltip } from "@/shared/ui/Tooltip/Tooltip";

const SidebarHeader = () => {
  const isOpen = useAppSelector((state) => state.sidebar.isOpen);
  const dispatch = useAppDispatch();

  return isOpen ? (
    <motion.div
      className="flex w-full items-center justify-between px-3 "
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.8 }}
    >
      <button
        onClick={() => dispatch(close())}
        className="flex cursor-pointer w-full items-center px-2 gap-x-4 h-11 
        border border-transparent hover:rounded-[5px] hover:shadow-lg"
      >
        <LuArrowLeftToLine className="size-6 text-base-accent" />
        Скрыть
      </button>
    </motion.div>
  ) : (
    <motion.div
      className="mb-4 hidden w-full items-center justify-center lg:flex"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.8 }}
    >
      <Tooltip direction="right" content="Открыть">
        <motion.button
          onClick={() => dispatch(open())}
          className="flex items-center 
          justify-center px-2 h-11 cursor-pointer 
          border border-transparent hover:rounded-[5px] hover:shadow-lg"
        >
          <LuArrowRightToLine className="size-6 text-base-accent" />
        </motion.button>
      </Tooltip>
    </motion.div>
  );
};

export default SidebarHeader;
