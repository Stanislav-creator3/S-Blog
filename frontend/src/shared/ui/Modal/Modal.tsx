import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import { createPortal } from "react-dom";
import { IoClose } from "react-icons/io5";

export interface ModalProps {
  width: "md" | "full";
  className?: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

interface ModalSectionProps {
  children: React.ReactNode;
  className?: string;
}

export function Modal({
  width,
  className,
  children,
  isOpen = false,
  onClose,
}: ModalProps) {
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const isModal =
      (e.target as Element).closest("div[data-id='modal']") !== null;
    if (isModal) return;
    onClose();
  };

  const modal = (
    <motion.div
      initial={{
        opacity: 0,
        transition: { duration: 0.3, delay: 0.4 },
      }}
      animate={{
        opacity: 1,
        transition: {
          duration: 0.3,
          delayChildren: 0.4,
        },
      }}
      exit={{
        opacity: 0,
        transition: { duration: 0.3, delay: 0.4 },
      }}
      onClick={(e) => handleOverlayClick(e)}
      className="fixed z-50 flex items-center justify-center inset-0 
    bg-slate-900/60 backdrop-blur p-10 overflow-auto"
    >
      <motion.div
        data-id="modal"
        initial={{ y: "100vh" }}
        animate={{ y: 0 }}
        exit={{ y: "100vh" }}
        transition={{ duration: 0.5 }}
        className={clsx(
          "flex flex-col relative bg-base-white rounded-[8px] min-h-[320px] mx-auto",
          {
            md: "max-w-[640px] w-full",
            full: "w-full mx-5",
          }[width],
          className
        )}
      >
        {children}
        <button
          onClick={onClose}
          className="w-8 h-8 flex rounded-[8px] 
        items-center justify-center 
        bg-white/10 cursor-pointer 
        absolute top-0 left-[calc(100%+12px)]
        transition-colors duration-300 
        hover:bg-white/40"
        >
          <IoClose className="w-4 h-4 text-base-white" />
        </button>
      </motion.div>
    </motion.div>
  );

  return createPortal(
    <AnimatePresence mode="wait">{isOpen && modal}</AnimatePresence>,
    document.getElementById("portal")!
  );
}

Modal.Header = function ModalHeader({
  children,
  className,
}: ModalSectionProps) {
  return (
    <div className={clsx(className, "px-6 pt-6 pb-6 text-2xl")}>{children}</div>
  );
};

Modal.Body = function ModalBody({ children, className }: ModalSectionProps) {
  return <div className={clsx(className, "px-6")}>{children}</div>;
};

Modal.Footer = function ModalFooter({
  children,
  className,
}: ModalSectionProps) {
  return (
    <div className={clsx(className, "mt-auto p-6 flex gap-4 justify-end")}>
      {children}
    </div>
  );
};
