import { ReactNode, useContext } from "react";
import { DropdownContext } from "./DropdownContext";

interface Props {
  className?: string;
  children: ReactNode;
}

export const DropdownButton = ({ children, className }: Props) => {
  const { open, setOpen } = useContext(DropdownContext);

  function toggleOpen() {
    setOpen(!open);
  }

  return (
    <button onClick={toggleOpen} className={className}>
      {children}
    </button>
  );
};
