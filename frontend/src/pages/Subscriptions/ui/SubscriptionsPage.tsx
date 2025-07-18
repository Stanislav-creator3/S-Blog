import { SubscriptionsList } from "@/widgets/subscriptions";
import { Outlet } from "react-router";

const SubscriptionsPage = () => {
  return (
    <div>
      <SubscriptionsList className="my-2" />
      <Outlet />
    </div>
  );
};

export default SubscriptionsPage;
