import { cn } from "@/shared/utils/tw-merge";
import { motion } from "motion/react";
import React, { useState } from "react";
import { Link } from "react-router";

interface Props {
  className?: string;
  index?: number;
  tabs: {
    name: string;
    label: string;
    href: string;
  }[];
}

export const Tabs: React.FC<Props> = ({ className, tabs, index }) => {
  const [activeTab, setActiveTab] = useState(index ? tabs[index] : tabs[0]);

  const isSelected = (tab: (typeof tabs)[0]) => activeTab.name === tab.name;

  return (
    <div
      className={cn(
        className,
        "flex items-center overflow-hidden flex-col p-1"
      )}
    >
      <div className={"flex p-2.5"}>
        {tabs.map((tab) => (
          <div key={tab.name} className={"relative px-10"}>
            <Link
              to={tab.href}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-7",
                isSelected(tab) ? "text-base-black font-b" : "opacity-50"
              )}
            >
              {tab.label}
            </Link>

            {isSelected(tab) && (
              <motion.div
                layoutId="indicator"
                className="absolute top-9 left-0 right-0 h-0.5 bg-base-accent"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
