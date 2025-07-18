import { useAppSelector } from "@/app/appStore";
import { cn } from "@/shared/utils/tw-merge";
import React from "react";

interface Props {
  className?: string;
  children: React.ReactNode;
}

export const LayoutContainer: React.FC<Props> = ({ className, children }) => {
  const isOpen = useAppSelector((state) => state.sidebar.isOpen);
  return (
    <main
      className={cn(
        className,
        "flex-1 px-5 py-3 h-full",
        isOpen ? "ml-16 lg:ml-50" : "ml-18"
      )}
    >
      {children}
    </main>
  );
};
