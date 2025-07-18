import { useAppSelector } from "@/app/appStore";
import { useMeQuery } from "@/entities/auth/api/authApi";
import { tabsHeader } from "@/shared/constants";
import { AvatarSkeleton } from "@/shared/ui/Avatar/AvatarSkeleton";
import { Button } from "@/shared/ui/Button/Button";
import { Tabs } from "@/shared/ui/Tabs/Tabs";
import { Menu } from "@/widgets/Menu";
import { Link, useLocation } from "react-router";
import Logo from "@/shared/ui/Logo/Logo";
import { Separator } from "@/shared/ui/Separator/Separator";
import { FormSearchHeader } from "@/features/search";

const Header = () => {
  const { isLoading } = useMeQuery();

  const location = useLocation();
  const { auth } = useAppSelector((state) => state.auth);

  const index = tabsHeader.findIndex((item) => item.href === location.pathname);
  const currentIndex = index === -1 ? 0 : index;

  return (
    <header
      className={
        "flex background-header justify-between items-center py-3 px-1"
      }
    >
      <div className="flex h-[10vh] relative gap-2 items-center z-5">
        <Logo className="px-3" />
        <Separator orientation="vertical" />
      </div>
      <Tabs tabs={tabsHeader} index={currentIndex} />
      <div className="flex gap-5 items-center">
        <FormSearchHeader />
        {isLoading ? (
          <AvatarSkeleton />
        ) : auth ? (
          <div className="flex justify-between items-center gap-2">
            <Menu username={auth.username} avatar={auth.avatar} />
          </div>
        ) : (
          <div className="flex gap-2">
            <Link to="account/register">
              <Button intent="secondary">Регистрация</Button>
            </Link>
            <Link to="account/login">
              <Button>Войти</Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
