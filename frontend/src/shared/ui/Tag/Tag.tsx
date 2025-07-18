import { cn } from "@/shared/utils/tw-merge";
import React, { useRef } from "react";

import { Link } from "react-router";
import styles from "./styles.module.css";

interface Props {
  className?: string;
  href: string;
  text: string;
}

export const Tag: React.FC<Props> = ({ className, href, text }) => {
  const myRef = useRef<HTMLSpanElement>(null);

  return (
    <Link
      to={`/tags/${href}`}
      className={cn(className, styles.HOVER, "py-2 px-3 glass text-lg")}
    >
      <span ref={myRef}></span>
      <p className={styles.text}>{text}</p>
    </Link>
  );
};
