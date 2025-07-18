import { LayoutContainer } from "@/shared/ui/Layout/Layout";
import { Header } from "@/widgets/haeader";
import Sidebar from "@/widgets/sidebar/ui/Sidebar";
import { Outlet } from "react-router";
function BaseLayout() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex-1">
        <div className="sticky top-0 z-50">
          <Header />
        </div>
        <Sidebar />
        <LayoutContainer>
          <Outlet />
        </LayoutContainer>
      </div>
    </div>
  );
}

export default BaseLayout;
