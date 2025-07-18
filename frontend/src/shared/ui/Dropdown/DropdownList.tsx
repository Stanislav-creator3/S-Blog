import { ReactNode, useContext } from "react";
import { DropdownContext } from "./DropdownContext";
import { cn } from "@/shared/utils/tw-merge";

interface Props {
  className?: string;
  children: ReactNode;
}

export const DropdownList = ({ children, className, ...props }: Props) => {
  const { setOpen } = useContext(DropdownContext);

  return (
    <ul
      onClick={() => setOpen(false)}
      className={cn(className, "divide-y divide-gray-200 text-gray-700")}
      {...props}
    >
      {children}
    </ul>
  );
};
