import { cn } from "@/shared/utils/tw-merge";
import React from "react";
import SidebarHeader from "./SidebarHeader";
import { useAppSelector } from "@/app/appStore";
import { Nav } from "./Nav";
import { SidebarItem } from "./Sidebartem";
import { IoSettingsOutline } from "react-icons/io5";


interface Props {
  className?: string;
}

const Sidebar: React.FC<Props> = ({ className }) => {
  const isOpen = useAppSelector((state) => state.sidebar.isOpen);
  return (
    <aside
      className={cn(
        className,
        "fixed background-sidebar top-19 py-10 z-40 flex flex-col h-full transition-all duration-100 ease-in-out",
        isOpen ? "w-50" : "w-16"
      )}
    >
      <Nav />
      <hr  className="text-gray-terliary my-15"/>
      <div className="flex flex-col gap-4">
        <SidebarItem Icon={IoSettingsOutline} label="Настройки" href="/dashboard/settings" />
        <SidebarHeader />
      </div>
    </aside>
  );
};

export default Sidebar;
