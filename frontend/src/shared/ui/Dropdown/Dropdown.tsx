import { ReactNode, useState } from "react";
import { DropdownContext } from "./DropdownContext";
import { DropdownButton } from "./DropdownButton";
import { DropdownContent } from "./DropdownContent";
import { DropdownList } from "./DropdownList";
import { DropdownItem } from "./DropdownItem";
import { useOutsideClick } from "@/shared/hooks/useOutsideClick";
import { cn } from "@/shared/utils/tw-merge";

interface Dropdown {
  children: ReactNode;
  className?: string;
}

interface DropdownComponent extends React.FC<Dropdown> {
  Button: typeof DropdownButton;
  Content: typeof DropdownContent;
  List: typeof DropdownList;
  Item: typeof DropdownItem;
}

export const Dropdown: DropdownComponent = ({ children, className }) => {
  const [open, setOpen] = useState(false);
  const ref = useOutsideClick(() => setOpen(false));

  return (
    <DropdownContext.Provider value={{ open, setOpen }}>
      <div ref={ref} className={cn(className, "relative")}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
};

Dropdown.Button = DropdownButton;
Dropdown.Content = DropdownContent;
Dropdown.List = DropdownList;
Dropdown.Item = DropdownItem;
