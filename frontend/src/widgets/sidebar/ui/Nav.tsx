import { SidebarItem } from "./Sidebartem";
import { AiOutlineHome } from "react-icons/ai";
import { CiUser } from "react-icons/ci";
import { TfiWrite } from "react-icons/tfi";
import { IoStatsChartOutline } from "react-icons/io5";
import { IconType } from "react-icons/lib";
import { MdFavoriteBorder } from "react-icons/md";
import { PiBookmarkSimpleLight } from "react-icons/pi";


export interface Route {
  label: string;
  href: string;
  icon: IconType;
}

export const Nav = () => {
  const routes: Route[] = [
    {
      label: "Главная",
      href: "/",
      icon: AiOutlineHome,
    },
    {
      label: "Подписчики",
      href: "/followers",
      icon: CiUser,
    },
    {
      label: "Понравившиеся",
      href: "/like/posts",
      icon: MdFavoriteBorder,
    },
    {
      label: "Закладки",
      href: "/bookmarks",
      icon: PiBookmarkSimpleLight,
    },
    {
      label: "Написать",
      href: "/write",
      icon: TfiWrite,
    },
    {
      label: "Статистика",
      href: "/stats",
      icon: IoStatsChartOutline,
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      {routes.map((route) => (
        <SidebarItem
          key={route.label}
          Icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};
