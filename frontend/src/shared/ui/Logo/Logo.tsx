import { Link } from "react-router";
import LogoWhite from "../../../../public/LogoWhite.svg?react";
import { useState } from "react";
import { cn } from "@/shared/utils/tw-merge";

interface Props {
  className?: string;
}

const Logo = ({ className }: Props) => {
  const [isAnimate, setIsAnimate] = useState(false);
  const animate = () => {
    setIsAnimate(true);
    setTimeout(() => {
      setIsAnimate(false);
    }, 200);
  };
  return (
    <Link to="/" className={cn(className)}>
      <LogoWhite
        onClick={animate}
        className={cn(
          "w-15 h-15 rounded-[4px] transition-[border-radius,scale] hover:rounded-2xl",
          isAnimate ? " scale-80" : "scale-100"
        )}
      />
    </Link>
  );
};

export default Logo;
