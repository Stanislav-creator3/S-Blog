import { DropdownContext } from "@/shared/ui/Dropdown/DropdownContext";
import { PropsWithChildren, useContext } from "react";

export const DropdownContent = ({ children }: PropsWithChildren) => {
  const { open } = useContext(DropdownContext);
  return (
    <div
      className={`absolute
        left-[50%]
        translate-x-[-50%]
        z-20 
        rounded border border-gray-300 bg-white overflow-hidden my-1 overflow-y-auto ${
          open ? "shadow-md" : "hidden"
        }`}
    >
      {children}
    </div>
  );
};
